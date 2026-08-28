import { describe, expect, it } from 'vitest';
import { evidenceItems, roadmapWeeks, type RoadmapWeek } from '../data/roadmap';
import { initialProgress, type ProgressState } from './progress';
import {
  ASSESSMENT_END_MARKER,
  ASSESSMENT_KEY,
  ASSESSMENT_START_MARKER,
  CRITICAL_RUBRIC_IDS,
  DIMENSIONS,
  MAX_ASSESSMENT_PASTE_BYTES,
  buildFinalReport,
  buildReportMarkdown,
  calculateWeeklyScore,
  initialAssessmentState,
  parseAssessmentPaste,
  parseAssessmentState,
  serializeAssessmentState,
  type StoredWeeklyAssessment,
  type WeeklyAssessmentInput,
} from './assessment';

function assessmentFor(
  week: RoadmapWeek,
  score: 0 | 1 | 2 = 2,
  overrides: Partial<WeeklyAssessmentInput> = {},
): WeeklyAssessmentInput {
  return {
    kind: 'agent16-weekly-assessment',
    schemaVersion: 1,
    rubricRevision: 1,
    weekId: week.id,
    weekNumber: week.week,
    rubricResults: week.mission.rubric.map((rubric) => ({
      rubricId: rubric.id,
      score,
      finding: `Finding for ${rubric.id}`,
      evidence: `Evidence for ${rubric.id}`,
      nextAction: `Next action for ${rubric.id}`,
    })),
    weekSummary: `Summary for ${week.id}`,
    ...overrides,
  };
}

function receipt(value: unknown, fenced = false) {
  const json = JSON.stringify(value, null, 2);
  return [
    'Coach review complete.',
    ASSESSMENT_START_MARKER,
    fenced ? `\`\`\`json\n${json}\n\`\`\`` : json,
    ASSESSMENT_END_MARKER,
    'Keep revising the artifact.',
  ].join('\n');
}

function storedAssessment(
  week: RoadmapWeek,
  score: 0 | 1 | 2 = 2,
  rubricScores: Record<string, 0 | 1 | 2> = {},
): StoredWeeklyAssessment {
  const input = assessmentFor(week, score);
  return {
    ...input,
    rubricResults: input.rubricResults.map((result) => ({
      ...result,
      score: rubricScores[result.rubricId] ?? result.score,
    })),
    savedAt: '2026-08-28T12:00:00.000Z',
  };
}

function allAssessments(
  score: 0 | 1 | 2 = 2,
  rubricScores: Record<string, 0 | 1 | 2> = {},
) {
  return Object.fromEntries(
    roadmapWeeks.map((week) => [week.id, storedAssessment(week, score, rubricScores)]),
  );
}

function completeProgress(evidenceCount = evidenceItems.length): ProgressState {
  return {
    ...initialProgress,
    completedTaskIds: roadmapWeeks.flatMap((week) => week.tasks.map((task) => task.id)),
    completedGateIds: roadmapWeeks.map((week) => week.id),
    completedEvidenceIds: evidenceItems.slice(0, evidenceCount).map((item) => item.id),
  };
}

describe('assessment receipt parser', () => {
  it('accepts W01 with four rubrics and strips unknown fields/control characters', () => {
    const week = roadmapWeeks[0];
    const input = {
      ...assessmentFor(week),
      generatedAt: 'AI timestamp must not be trusted',
      overallScore: 100,
      weekSummary: '  Good\u0000 summary  ',
    };
    const result = parseAssessmentPaste(receipt(input, true), week);

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.rubricResults).toHaveLength(4);
    expect(result.value.weekSummary).toBe('Good summary');
    expect(result.value).not.toHaveProperty('generatedAt');
    expect(result.value).not.toHaveProperty('overallScore');
  });

  it('accepts exactly three rubric results for W02–W16', () => {
    for (const week of roadmapWeeks.slice(1)) {
      const result = parseAssessmentPaste(receipt(assessmentFor(week)), week);
      expect(result.ok, week.id).toBe(true);
      if (result.ok) expect(result.value.rubricResults).toHaveLength(3);
    }
  });

  it.each([
    ['missing rubric', (week: RoadmapWeek) => ({
      ...assessmentFor(week),
      rubricResults: assessmentFor(week).rubricResults.slice(1),
    })],
    ['duplicate rubric', (week: RoadmapWeek) => {
      const input = assessmentFor(week);
      return { ...input, rubricResults: [input.rubricResults[0], input.rubricResults[0], ...input.rubricResults.slice(2)] };
    }],
    ['unknown rubric', (week: RoadmapWeek) => {
      const input = assessmentFor(week);
      return { ...input, rubricResults: [{ ...input.rubricResults[0], rubricId: 'unknown-rubric' }, ...input.rubricResults.slice(1)] };
    }],
    ['wrong schema version', (week: RoadmapWeek) => ({ ...assessmentFor(week), schemaVersion: 2 })],
    ['out-of-range score', (week: RoadmapWeek) => {
      const input = assessmentFor(week);
      return { ...input, rubricResults: [{ ...input.rubricResults[0], score: 3 }, ...input.rubricResults.slice(1)] };
    }],
    ['non-integer score', (week: RoadmapWeek) => {
      const input = assessmentFor(week);
      return { ...input, rubricResults: [{ ...input.rubricResults[0], score: 1.5 }, ...input.rubricResults.slice(1)] };
    }],
    ['empty text', (week: RoadmapWeek) => {
      const input = assessmentFor(week);
      return { ...input, rubricResults: [{ ...input.rubricResults[0], finding: '   ' }, ...input.rubricResults.slice(1)] };
    }],
  ])('rejects %s', (_label, mutate) => {
    const week = roadmapWeeks[0];
    expect(parseAssessmentPaste(receipt(mutate(week)), week).ok).toBe(false);
  });

  it('rejects a receipt for the wrong week', () => {
    expect(parseAssessmentPaste(receipt(assessmentFor(roadmapWeeks[0])), roadmapWeeks[1])).toEqual({
      ok: false,
      error: 'Assessment ini bukan untuk W02.',
    });
  });

  it('rejects missing, reversed, or multiple blocks', () => {
    const week = roadmapWeeks[0];
    const validReceipt = receipt(assessmentFor(week));
    expect(parseAssessmentPaste('{}', week).ok).toBe(false);
    expect(parseAssessmentPaste(`${ASSESSMENT_END_MARKER}\n{}\n${ASSESSMENT_START_MARKER}`, week).ok).toBe(false);
    expect(parseAssessmentPaste(`${validReceipt}\n${validReceipt}`, week).ok).toBe(false);
  });

  it('rejects paste larger than 25 KB, measured as UTF-8 bytes', () => {
    const week = roadmapWeeks[0];
    const oversized = `😀`.repeat(MAX_ASSESSMENT_PASTE_BYTES / 2) + receipt(assessmentFor(week));
    expect(parseAssessmentPaste(oversized, week)).toEqual({
      ok: false,
      error: 'Paste assessment melebihi batas 25 KB.',
    });
  });
});

describe('assessment persistence contract', () => {
  it('uses a separate versioned key and round-trips valid state', () => {
    const stored = storedAssessment(roadmapWeeks[0]);
    const state = { version: 1 as const, assessments: { [stored.weekId]: stored } };
    expect(ASSESSMENT_KEY).toBe('agent16-assessments:v1');
    expect(parseAssessmentState(serializeAssessmentState(state))).toEqual(state);
  });

  it('isolates corrupted, unknown, and invalid-timestamp entries', () => {
    const valid = storedAssessment(roadmapWeeks[0]);
    const badText = { ...storedAssessment(roadmapWeeks[1]), weekSummary: '' };
    const badDate = { ...storedAssessment(roadmapWeeks[2]), savedAt: 'not-a-date' };
    const parsed = parseAssessmentState(JSON.stringify({
      version: 1,
      assessments: {
        [valid.weekId]: valid,
        [badText.weekId]: badText,
        [badDate.weekId]: badDate,
        'week-99': { ...valid, weekId: 'week-99' },
      },
    }));

    expect(Object.keys(parsed.assessments)).toEqual(['week-1']);
    expect(parsed.assessments['week-1']).toEqual(valid);
  });

  it('recovers from a corrupted state envelope', () => {
    expect(parseAssessmentState('{broken')).toEqual(initialAssessmentState);
    expect(parseAssessmentState(JSON.stringify({ version: 2, assessments: {} }))).toEqual(initialAssessmentState);
  });
});

describe('readiness calculations', () => {
  it('calculates weekly mastery from the rubric denominator', () => {
    const assessment = assessmentFor(roadmapWeeks[0]);
    assessment.rubricResults[0].score = 0;
    assessment.rubricResults[1].score = 1;
    expect(calculateWeeklyScore(assessment)).toBe(62.5);
  });

  it('maps every roadmap rubric exactly once across nine dimensions', () => {
    const roadmapRubrics = roadmapWeeks.flatMap((week) => week.mission.rubric.map((rubric) => rubric.id));
    const mappedRubrics = DIMENSIONS.flatMap((dimension) => dimension.rubricIds);
    expect(DIMENSIONS).toHaveLength(9);
    expect(mappedRubrics).toHaveLength(49);
    expect(new Set(mappedRubrics).size).toBe(mappedRubrics.length);
    expect([...mappedRubrics].sort()).toEqual([...roadmapRubrics].sort());
    expect([...CRITICAL_RUBRIC_IDS].sort()).toEqual([
      'w10-pure', 'w11-stale', 'w11-write', 'w12-idem', 'w13-risk',
      'w3-invalid', 'w4-approval', 'w7-abstain', 'w7-boundary', 'w9-risk',
    ]);
  });

  it('unlocks only at exactly 48 known tasks, 16 known gates, and 16 valid assessments', () => {
    const report = buildFinalReport({ progress: completeProgress(), assessments: allAssessments() });
    expect(roadmapWeeks.flatMap((week) => week.tasks)).toHaveLength(48);
    expect(report.unlocked).toBe(true);
    expect(report.missing).toMatchObject({ tasks: 0, gates: 0, assessments: 0 });

    const oneMissing = completeProgress();
    oneMissing.completedTaskIds.pop();
    expect(buildFinalReport({ progress: oneMissing, assessments: allAssessments() }).unlocked).toBe(false);
    const missingAssessment = allAssessments();
    delete missingAssessment['week-16'];
    expect(buildFinalReport({ progress: completeProgress(), assessments: missingAssessment }).unlocked).toBe(false);
  });

  it('does not let unknown or duplicate progress IDs inflate completion or evidence', () => {
    const report = buildFinalReport({
      progress: {
        ...initialProgress,
        completedTaskIds: ['unknown', 'unknown'],
        completedGateIds: ['week-99', 'week-99'],
        completedEvidenceIds: ['evidence-unknown', 'evidence-unknown'],
      },
      assessments: {},
    });
    expect(report.unlocked).toBe(false);
    expect(report.missing).toMatchObject({ tasks: 48, gates: 16, assessments: 16 });
    expect(report.evidenceScore).toBe(0);
  });

  it('weights every week equally, then applies the 80/20 mastery/evidence formula', () => {
    const assessments = allAssessments();
    assessments['week-1'] = storedAssessment(roadmapWeeks[0], 0);
    const report = buildFinalReport({ progress: completeProgress(3), assessments });

    expect(report.masteryScore).toBe(93.75);
    expect(report.evidenceScore).toBe(50);
    expect(report.readinessScore).toBe(85);
    expect(report.baseBand).toBe('Strong delivery evidence');
  });

  it('activates the safety floor below 70 reliability without changing the readiness number', () => {
    const reliabilityScores: Record<string, 0 | 1 | 2> = Object.fromEntries(
      DIMENSIONS.find((dimension) => dimension.id === 'reliability-safety')!.rubricIds.map((id) => [id, 1]),
    );
    const report = buildFinalReport({
      progress: completeProgress(),
      assessments: allAssessments(2, reliabilityScores),
    });
    expect(report.readinessScore).toBeGreaterThan(85);
    expect(report.safetyFloor).toBe(true);
    expect(report.baseBand).toBe('Strong delivery evidence');
    expect(report.band).toBe('Portfolio-ready with targeted gaps');
  });

  it('activates the safety floor for a critical zero outside the reliability dimension', () => {
    const report = buildFinalReport({
      progress: completeProgress(),
      assessments: allAssessments(2, { 'w3-invalid': 0 }),
    });
    expect(report.safetyFloor).toBe(true);
    expect(report.conclusion).toContain('SAFETY FLOOR ACTIVE');
  });

  it('sorts improvement ties by the fixed dimension order', () => {
    const report = buildFinalReport({
      progress: completeProgress(),
      assessments: allAssessments(1),
    });
    expect(report.improvements.map((item) => item.dimensionId)).toEqual([
      'client-discovery',
      'agent-architecture',
      'knowledge-systems',
    ]);
  });

  it('prioritizes a critical zero before a lower non-critical dimension', () => {
    const scores: Record<string, 0 | 1 | 2> = Object.fromEntries(
      DIMENSIONS.find((dimension) => dimension.id === 'client-discovery')!.rubricIds.map((id) => [id, 0]),
    );
    scores['w12-idem'] = 0;
    const report = buildFinalReport({
      progress: completeProgress(),
      assessments: allAssessments(2, scores),
    });
    expect(report.improvements[0].dimensionId).toBe('integration-automation');
    expect(report.improvements[0].criticalZero).toBe(true);
  });

  it('returns a stretch recommendation when every rubric is mastered', () => {
    const report = buildFinalReport({ progress: completeProgress(), assessments: allAssessments() });
    expect(report.improvements).toEqual([]);
    expect(report.stretchRecommendation).toContain('No critical improvement area detected');
    expect(report.strengths.map((item) => item.dimensionId)).toEqual([
      'client-discovery',
      'agent-architecture',
    ]);
  });
});

describe('Markdown report', () => {
  it('builds a useful locked report without leaking derived scores', () => {
    const report = buildFinalReport({ progress: initialProgress, assessments: {} });
    const markdown = buildReportMarkdown(report);
    expect(markdown).toContain('## Report locked');
    expect(markdown).toContain('Tasks remaining: 48');
  });

  it('includes scores and escapes imported HTML/Markdown as text', () => {
    const assessments = allAssessments();
    assessments['week-1'].rubricResults[0].evidence = '<script>alert(1)</script> **fake**';
    const report = buildFinalReport({ progress: completeProgress(), assessments });
    const markdown = buildReportMarkdown(report);
    expect(markdown).toContain('# AGENT/16 Final After-Action Report');
    expect(markdown).toContain('## Mission Trace');
    expect(markdown).not.toContain('<script>');
    expect(markdown).toContain('&lt;script&gt;');
  });
});
