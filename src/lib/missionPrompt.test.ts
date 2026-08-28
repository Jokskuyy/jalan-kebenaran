import { describe, expect, it } from 'vitest';
import { roadmapWeeks } from '../data/roadmap';
import { buildMissionPrompt } from './missionPrompt';

const requiredHeadings = [
  '## YOUR ROLE',
  '## COACH-FIRST RULES',
  '## STORY-FIRST PROTOCOL',
  '## MISSION KIT · CASE REFERENCE',
  "## THIS WEEK'S RAW EVIDENCE",
  "## THIS WEEK'S MISSION",
  '## STORY SETUP',
  '## STORY BEATS — INTERNAL COACH GUIDE',
  '## NON-NEGOTIABLE CONSTRAINTS',
  '## LEARN FIRST — JUST IN TIME',
  '## STARTER FILES',
  '## DELIVERABLE',
  '## REVIEW RUBRIC',
  '## QUALITY GATE',
  '## INTERACTION SEQUENCE',
  '## MISSION DEBRIEF RECEIPT — ONLY AFTER REVIEW',
  '## MY DRAFT',
];

const expectedRubricIds: Record<number, string[]> = {
  1: ['w1-problem', 'w1-evidence', 'w1-owner', 'w1-scope'],
  2: ['w2-options', 'w2-boundary', 'w2-tradeoff'],
  3: ['w3-invalid', 'w3-errors', 'w3-audit'],
  4: ['w4-terminal', 'w4-budget', 'w4-approval'],
  5: ['w5-lineage', 'w5-repeat', 'w5-baseline'],
  6: ['w6-label', 'w6-compare', 'w6-errors'],
  7: ['w7-boundary', 'w7-abstain', 'w7-regress'],
  8: ['w8-run', 'w8-proof', 'w8-limit'],
  9: ['w9-terminal', 'w9-rules', 'w9-risk'],
  10: ['w10-pure', 'w10-contract', 'w10-edge'],
  11: ['w11-pause', 'w11-stale', 'w11-write'],
  12: ['w12-idem', 'w12-budget', 'w12-recover'],
  13: ['w13-split', 'w13-risk', 'w13-roi'],
  14: ['w14-scan', 'w14-claim', 'w14-honest'],
  15: ['w15-why', 'w15-failure', 'w15-language'],
  16: ['w16-target', 'w16-signal', 'w16-loop'],
};

function parseAssessmentTemplate(prompt: string) {
  const match = prompt.match(
    /AGENT16_ASSESSMENT_V1_START\n([\s\S]*?)\nAGENT16_ASSESSMENT_V1_END/,
  );

  expect(match, 'assessment template must be a marked JSON block').not.toBeNull();
  return JSON.parse(match![1]) as Record<string, unknown>;
}

describe('buildMissionPrompt', () => {
  it('builds deterministic, self-contained prompts for every week', () => {
    for (const week of roadmapWeeks) {
      const first = buildMissionPrompt(week);
      const second = buildMissionPrompt(week);

      expect(first).toBe(second);
      expect(first).not.toMatch(/undefined|null|\[object Object\]/);
      expect(first.match(/\[TEMPEL DRAFT LO DI SINI\]/g)).toHaveLength(1);
      expect(first).toContain(week.title);
      expect(first).toContain(week.gate);
      expect(first).toContain(week.mission.deliverable.title);
      expect(first).toContain('DO NOT COMPLETE THE WORK FOR ME');
      expect(first).toContain('interactive client simulation');
      expect(first).toContain('Use exactly one story beat per turn');
      expect(first).toContain('case-and-concept readback');
      expect(first).toContain('150–220 words');
      expect(first).toContain('**Giliran lo:**');
      expect(first).toContain('Do not reveal the concept name before I answer');
      expect(first).toContain('## USER CONTROLS');
      expect(first).toContain('ulang adegan');
      expect(first).not.toContain('## INTERMEZZO PROTOCOL');
      expect(first).not.toContain('Analogi:');
      expect(first).not.toMatch(/\\$/m);
      for (const heading of requiredHeadings) expect(first).toContain(heading);
    }
  });

  it('makes W01 usable in a new chat without hidden UI context', () => {
    const prompt = buildMissionPrompt(roadmapWeeks[0]);

    expect(prompt).toContain('RegulaRAG ID');
    expect(prompt).toContain('12 compliance');
    expect(prompt).toContain('45 pertanyaan');
    expect(prompt).toContain('220 dokumen publik');
    expect(prompt).toContain('35 SOP');
    expect(prompt).toContain('15–90 menit');
    expect(prompt).toContain('at most five high-impact discovery questions');
    expect(prompt).toContain('Do not rewrite the final artifact for me.');
    expect(prompt).toContain('/cases/regularag/interview-notes.md');
    expect(prompt).toContain('Problem before solution');
    expect(prompt).toContain('BEAT 1 — Satu pertanyaan, banyak tempat mencari');
    expect(prompt).toContain('Concept to reveal only after an adequate learner answer: workflow mapping');
    expect(prompt).toContain('Decision question: Informasi dan langkah apa yang perlu lo catat');
    expect(prompt).toContain('Do not reveal the concept, explain terminology, or request the deliverable.');
  });

  it('keeps case continuity across discovery, delivery, and career weeks', () => {
    const invoicePrompt = buildMissionPrompt(roadmapWeeks[8]);
    expect(invoicePrompt).toContain('InvoiceOps Agent');
    expect(invoicePrompt).toContain('BEAT 1 — Invoice yang berpindah tanpa jejak terpadu');

    for (const weekNumber of [14, 15, 16]) {
      const prompt = buildMissionPrompt(roadmapWeeks[weekNumber - 1]);
      expect(prompt).toContain('RegulaRAG ID');
      expect(prompt).toContain('InvoiceOps Agent');
    }
  });

  it('includes a parseable, week-bound assessment contract for all 16 missions', () => {
    for (const week of roadmapWeeks) {
      const prompt = buildMissionPrompt(week);
      const assessment = parseAssessmentTemplate(prompt);
      const rubricResults = assessment.rubricResults as Array<Record<string, unknown>>;

      expect(prompt.match(/AGENT16_ASSESSMENT_V1_START/g)).toHaveLength(1);
      expect(prompt.match(/AGENT16_ASSESSMENT_V1_END/g)).toHaveLength(1);
      expect(Object.keys(assessment)).toEqual([
        'kind',
        'schemaVersion',
        'rubricRevision',
        'weekId',
        'weekNumber',
        'rubricResults',
        'weekSummary',
      ]);
      expect(assessment.kind).toBe('agent16-weekly-assessment');
      expect(assessment.schemaVersion).toBe(1);
      expect(assessment.rubricRevision).toBe(1);
      expect(assessment.weekId).toBe(week.id);
      expect(assessment.weekNumber).toBe(week.week);
      expect(rubricResults.map((result) => result.rubricId)).toEqual(expectedRubricIds[week.week]);
      expect(rubricResults).toHaveLength(week.week === 1 ? 4 : 3);

      for (const result of rubricResults) {
        expect(Object.keys(result)).toEqual([
          'rubricId',
          'score',
          'finding',
          'evidence',
          'nextAction',
        ]);
        expect(result.score).toBe(0);
        expect(result.finding).toBeTypeOf('string');
        expect(result.evidence).toBeTypeOf('string');
        expect(result.nextAction).toBeTypeOf('string');
      }

      expect(assessment).not.toHaveProperty('overallScore');
      expect(assessment).not.toHaveProperty('readinessScore');
      expect(assessment).not.toHaveProperty('capabilityClassification');
    }
  });

  it('emits an assessment only after draft review and repeats it for revised reviews', () => {
    for (const week of roadmapWeeks) {
      const prompt = buildMissionPrompt(week);

      expect(prompt).toContain('Never emit the assessment in the first response');
      expect(prompt).toContain('only after you have reviewed my draft');
      expect(prompt).toContain('Emit a fresh assessment after every later revised-draft review');
      expect(prompt).toContain('story beats, hints, concept debriefs, readback, or discovery questions');
      expect(prompt).toContain('Do not add an overall score, readiness score, or capability classification');
    }
  });

  it('uses an explicit preview origin without losing prompt purity', () => {
    const previewOrigin = 'https://jalan-kebenaran-feature-example.vercel.app/';
    const prompt = buildMissionPrompt(roadmapWeeks[0], previewOrigin);

    expect(prompt).toContain('https://jalan-kebenaran-feature-example.vercel.app/cases/regularag/client-brief.md');
    expect(prompt).not.toContain('https://jalan-kebenaran.vercel.app/cases/');
    expect(buildMissionPrompt(roadmapWeeks[0], previewOrigin)).toBe(prompt);
  });
});
