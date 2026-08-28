import {
  evidenceItems as defaultEvidenceItems,
  roadmapWeeks,
  type EvidenceItem,
  type RoadmapWeek,
} from '../data/roadmap';
import type { ProgressState } from './progress';

export const ASSESSMENT_KEY = 'agent16-assessments:v1';
export const ASSESSMENT_VERSION = 1;
export const ASSESSMENT_START_MARKER = 'AGENT16_ASSESSMENT_V1_START';
export const ASSESSMENT_END_MARKER = 'AGENT16_ASSESSMENT_V1_END';
export const MAX_ASSESSMENT_PASTE_BYTES = 25 * 1024;

const MAX_FINDING_LENGTH = 600;
const MAX_EVIDENCE_LENGTH = 1_000;
const MAX_NEXT_ACTION_LENGTH = 600;
const MAX_SUMMARY_LENGTH = 1_200;

export type RubricScore = 0 | 1 | 2;

export type WeeklyRubricResult = {
  rubricId: string;
  score: RubricScore;
  finding: string;
  evidence: string;
  nextAction: string;
};

export type WeeklyAssessmentInput = {
  kind: 'agent16-weekly-assessment';
  schemaVersion: 1;
  rubricRevision: 1;
  weekId: string;
  weekNumber: number;
  rubricResults: WeeklyRubricResult[];
  weekSummary: string;
};

export type AssessmentPreview = WeeklyAssessmentInput;

export type StoredWeeklyAssessment = WeeklyAssessmentInput & {
  savedAt: string;
};

export type AssessmentState = {
  version: 1;
  assessments: Record<string, StoredWeeklyAssessment>;
};

export const initialAssessmentState: AssessmentState = {
  version: ASSESSMENT_VERSION,
  assessments: {},
};

export type ValidationResult<T = AssessmentPreview> =
  | { ok: true; value: T }
  | { ok: false; error: string };

export type DimensionId =
  | 'client-discovery'
  | 'agent-architecture'
  | 'knowledge-systems'
  | 'integration-automation'
  | 'reliability-safety'
  | 'evaluation-impact'
  | 'supporting-engineering'
  | 'portfolio-communication'
  | 'career-execution';

export type DimensionDefinition = {
  id: DimensionId;
  label: string;
  rubricIds: readonly string[];
};

export const DIMENSIONS: readonly DimensionDefinition[] = [
  {
    id: 'client-discovery',
    label: 'Client Discovery',
    rubricIds: ['w1-problem', 'w1-owner', 'w1-scope', 'w2-options', 'w9-terminal'],
  },
  {
    id: 'agent-architecture',
    label: 'Agent Architecture',
    rubricIds: ['w2-boundary', 'w4-terminal', 'w9-rules', 'w10-pure', 'w11-pause'],
  },
  {
    id: 'knowledge-systems',
    label: 'Knowledge Systems',
    rubricIds: ['w5-lineage', 'w5-baseline', 'w6-compare', 'w7-abstain'],
  },
  {
    id: 'integration-automation',
    label: 'Integration & Automation',
    rubricIds: ['w3-audit', 'w10-contract', 'w10-edge', 'w12-idem'],
  },
  {
    id: 'reliability-safety',
    label: 'Reliability & Safety',
    rubricIds: [
      'w4-budget',
      'w4-approval',
      'w7-boundary',
      'w7-regress',
      'w9-risk',
      'w11-stale',
      'w11-write',
      'w12-budget',
      'w13-risk',
      'w15-failure',
    ],
  },
  {
    id: 'evaluation-impact',
    label: 'Evaluation & Impact',
    rubricIds: [
      'w1-evidence',
      'w2-tradeoff',
      'w6-label',
      'w6-errors',
      'w8-proof',
      'w8-limit',
      'w13-split',
      'w13-roi',
    ],
  },
  {
    id: 'supporting-engineering',
    label: 'Supporting Engineering',
    rubricIds: ['w3-invalid', 'w3-errors', 'w5-repeat', 'w8-run', 'w12-recover'],
  },
  {
    id: 'portfolio-communication',
    label: 'Portfolio & Communication',
    rubricIds: ['w14-scan', 'w14-claim', 'w14-honest', 'w15-why', 'w15-language'],
  },
  {
    id: 'career-execution',
    label: 'Career Execution',
    rubricIds: ['w16-target', 'w16-signal', 'w16-loop'],
  },
] as const;

export const CRITICAL_RUBRIC_IDS = new Set([
  'w3-invalid',
  'w4-approval',
  'w7-boundary',
  'w7-abstain',
  'w9-risk',
  'w10-pure',
  'w11-stale',
  'w11-write',
  'w12-idem',
  'w13-risk',
]);

export type WeeklyScore = {
  weekId: string;
  weekNumber: number;
  score: number;
};

export type ScoredRubricResult = WeeklyRubricResult & {
  weekId: string;
  weekNumber: number;
  dimensionId: DimensionId;
  critical: boolean;
};

export type DimensionScore = {
  id: DimensionId;
  label: string;
  score: number | null;
  zeroCount: number;
  criticalZero: boolean;
  rubricResults: ScoredRubricResult[];
};

export type StrengthInsight = {
  dimensionId: DimensionId;
  label: string;
  score: number;
  evidence: ScoredRubricResult[];
};

export type ImprovementInsight = {
  dimensionId: DimensionId;
  label: string;
  score: number;
  criticalZero: boolean;
  zeroCount: number;
  items: ScoredRubricResult[];
};

export type ReadinessBand =
  | 'Strong delivery evidence'
  | 'Portfolio-ready with targeted gaps'
  | 'Developing delivery capability'
  | 'Foundation needs reinforcement';

export type MissingReadinessWork = {
  tasks: number;
  gates: number;
  assessments: number;
  taskIds: string[];
  gateWeekIds: string[];
  assessmentWeekIds: string[];
};

export type FinalReadinessReport = {
  unlocked: boolean;
  missing: MissingReadinessWork;
  weeklyScores: WeeklyScore[];
  dimensionScores: DimensionScore[];
  masteryScore: number | null;
  evidenceScore: number;
  readinessScore: number | null;
  baseBand: ReadinessBand | null;
  band: ReadinessBand | null;
  safetyFloor: boolean;
  strengths: StrengthInsight[];
  improvements: ImprovementInsight[];
  evidenceGaps: EvidenceItem[];
  conclusion: string;
  stretchRecommendation: string | null;
};

export type FinalReportInput = {
  progress: ProgressState;
  assessments: Record<string, StoredWeeklyAssessment>;
  evidenceItems?: readonly EvidenceItem[];
};

const weekById = new Map(roadmapWeeks.map((week) => [week.id, week]));
const rubricDimension = new Map<string, DimensionId>();
for (const dimension of DIMENSIONS) {
  for (const rubricId of dimension.rubricIds) rubricDimension.set(rubricId, dimension.id);
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function occurrences(text: string, marker: string) {
  let count = 0;
  let index = 0;
  while ((index = text.indexOf(marker, index)) !== -1) {
    count += 1;
    index += marker.length;
  }
  return count;
}

function plainText(value: unknown, label: string, maxLength: number): ValidationResult<string> {
  if (typeof value !== 'string') return { ok: false, error: `${label} harus berupa teks.` };

  const normalized = value
    .replace(/\r\n?/g, '\n')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim();

  if (!normalized) return { ok: false, error: `${label} tidak boleh kosong.` };
  if (normalized.length > maxLength) {
    return { ok: false, error: `${label} melebihi batas ${maxLength} karakter.` };
  }

  return { ok: true, value: normalized };
}

function validateAssessmentObject(value: unknown, week: RoadmapWeek): ValidationResult {
  if (!isPlainObject(value)) return { ok: false, error: 'Assessment harus berupa JSON object.' };
  if (value.kind !== 'agent16-weekly-assessment') {
    return { ok: false, error: 'kind assessment tidak dikenali.' };
  }
  if (value.schemaVersion !== ASSESSMENT_VERSION) {
    return { ok: false, error: 'schemaVersion assessment harus 1.' };
  }
  if (value.rubricRevision !== 1) {
    return { ok: false, error: 'rubricRevision assessment harus 1.' };
  }
  if (value.weekId !== week.id || value.weekNumber !== week.week) {
    return { ok: false, error: `Assessment ini bukan untuk W${String(week.week).padStart(2, '0')}.` };
  }
  if (!Array.isArray(value.rubricResults)) {
    return { ok: false, error: 'rubricResults harus berupa array.' };
  }

  const expectedRubrics = week.mission.rubric.map((rubric) => rubric.id);
  if (value.rubricResults.length !== expectedRubrics.length) {
    return { ok: false, error: `Assessment harus memuat tepat ${expectedRubrics.length} rubric.` };
  }

  const resultsById = new Map<string, WeeklyRubricResult>();
  for (const rawResult of value.rubricResults) {
    if (!isPlainObject(rawResult) || typeof rawResult.rubricId !== 'string') {
      return { ok: false, error: 'Setiap rubric result harus memiliki rubricId.' };
    }
    if (!expectedRubrics.includes(rawResult.rubricId)) {
      return { ok: false, error: `rubricId ${rawResult.rubricId} tidak berlaku untuk minggu ini.` };
    }
    if (resultsById.has(rawResult.rubricId)) {
      return { ok: false, error: `rubricId ${rawResult.rubricId} muncul lebih dari sekali.` };
    }
    if (!Number.isInteger(rawResult.score) || ![0, 1, 2].includes(rawResult.score as number)) {
      return { ok: false, error: `Score ${rawResult.rubricId} harus integer 0, 1, atau 2.` };
    }

    const finding = plainText(rawResult.finding, `Finding ${rawResult.rubricId}`, MAX_FINDING_LENGTH);
    if (!finding.ok) return finding;
    const evidence = plainText(rawResult.evidence, `Evidence ${rawResult.rubricId}`, MAX_EVIDENCE_LENGTH);
    if (!evidence.ok) return evidence;
    const nextAction = plainText(rawResult.nextAction, `Next action ${rawResult.rubricId}`, MAX_NEXT_ACTION_LENGTH);
    if (!nextAction.ok) return nextAction;

    resultsById.set(rawResult.rubricId, {
      rubricId: rawResult.rubricId,
      score: rawResult.score as RubricScore,
      finding: finding.value,
      evidence: evidence.value,
      nextAction: nextAction.value,
    });
  }

  const missingRubric = expectedRubrics.find((rubricId) => !resultsById.has(rubricId));
  if (missingRubric) return { ok: false, error: `rubricId ${missingRubric} belum dinilai.` };

  const weekSummary = plainText(value.weekSummary, 'Week summary', MAX_SUMMARY_LENGTH);
  if (!weekSummary.ok) return weekSummary;

  return {
    ok: true,
    value: {
      kind: 'agent16-weekly-assessment',
      schemaVersion: ASSESSMENT_VERSION,
      rubricRevision: 1,
      weekId: week.id,
      weekNumber: week.week,
      rubricResults: expectedRubrics.map((rubricId) => resultsById.get(rubricId) as WeeklyRubricResult),
      weekSummary: weekSummary.value,
    },
  };
}

export function validateAssessment(
  value: unknown,
  week: RoadmapWeek,
): ValidationResult {
  return validateAssessmentObject(value, week);
}

export function parseAssessmentPaste(text: string, week: RoadmapWeek): ValidationResult {
  if (new TextEncoder().encode(text).byteLength > MAX_ASSESSMENT_PASTE_BYTES) {
    return { ok: false, error: 'Paste assessment melebihi batas 25 KB.' };
  }
  if (
    occurrences(text, ASSESSMENT_START_MARKER) !== 1 ||
    occurrences(text, ASSESSMENT_END_MARKER) !== 1
  ) {
    return { ok: false, error: 'Paste harus memuat tepat satu assessment block.' };
  }

  const start = text.indexOf(ASSESSMENT_START_MARKER) + ASSESSMENT_START_MARKER.length;
  const end = text.indexOf(ASSESSMENT_END_MARKER);
  if (end <= start) return { ok: false, error: 'Urutan marker assessment tidak valid.' };

  let jsonText = text.slice(start, end).trim();
  if (jsonText.startsWith('```')) {
    jsonText = jsonText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
  }

  try {
    return validateAssessmentObject(JSON.parse(jsonText), week);
  } catch {
    return { ok: false, error: 'JSON assessment tidak valid.' };
  }
}

export function parseAssessmentState(raw: string | null): AssessmentState {
  if (!raw) return initialAssessmentState;

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!isPlainObject(parsed) || parsed.version !== ASSESSMENT_VERSION || !isPlainObject(parsed.assessments)) {
      return initialAssessmentState;
    }

    const assessments: Record<string, StoredWeeklyAssessment> = {};
    for (const [storageWeekId, storedValue] of Object.entries(parsed.assessments)) {
      const week = weekById.get(storageWeekId);
      if (!week || !isPlainObject(storedValue)) continue;

      const validated = validateAssessmentObject(storedValue, week);
      if (!validated.ok || typeof storedValue.savedAt !== 'string') continue;

      const savedAt = storedValue.savedAt.trim();
      if (!savedAt || Number.isNaN(Date.parse(savedAt))) continue;
      assessments[week.id] = { ...validated.value, savedAt };
    }

    return { version: ASSESSMENT_VERSION, assessments };
  } catch {
    return initialAssessmentState;
  }
}

export function serializeAssessmentState(state: AssessmentState) {
  return JSON.stringify(state);
}

export function calculateWeeklyScore(
  assessment: Pick<WeeklyAssessmentInput, 'rubricResults'>,
) {
  if (assessment.rubricResults.length === 0) return 0;
  const earned = assessment.rubricResults.reduce((sum, result) => sum + result.score, 0);
  return (earned / (assessment.rubricResults.length * 2)) * 100;
}

function validStoredAssessments(
  assessments: Record<string, StoredWeeklyAssessment>,
) {
  const valid = new Map<string, StoredWeeklyAssessment>();
  for (const week of roadmapWeeks) {
    const candidate = assessments[week.id];
    if (!candidate) continue;
    const result = validateAssessmentObject(candidate, week);
    if (!result.ok || typeof candidate.savedAt !== 'string' || Number.isNaN(Date.parse(candidate.savedAt))) {
      continue;
    }
    valid.set(week.id, { ...result.value, savedAt: candidate.savedAt });
  }
  return valid;
}

function bandFor(score: number): ReadinessBand {
  if (score >= 85) return 'Strong delivery evidence';
  if (score >= 70) return 'Portfolio-ready with targeted gaps';
  if (score >= 50) return 'Developing delivery capability';
  return 'Foundation needs reinforcement';
}

function assessmentResults(
  assessments: Map<string, StoredWeeklyAssessment>,
): ScoredRubricResult[] {
  const results: ScoredRubricResult[] = [];
  for (const week of roadmapWeeks) {
    const assessment = assessments.get(week.id);
    if (!assessment) continue;
    for (const result of assessment.rubricResults) {
      const dimensionId = rubricDimension.get(result.rubricId);
      if (!dimensionId) continue;
      results.push({
        ...result,
        weekId: week.id,
        weekNumber: week.week,
        dimensionId,
        critical: CRITICAL_RUBRIC_IDS.has(result.rubricId),
      });
    }
  }
  return results;
}

function makeDimensionScores(results: ScoredRubricResult[]): DimensionScore[] {
  return DIMENSIONS.map((dimension) => {
    const rubricResults = results.filter((result) => result.dimensionId === dimension.id);
    return {
      id: dimension.id,
      label: dimension.label,
      score: rubricResults.length
        ? (rubricResults.reduce((sum, result) => sum + result.score, 0) / (rubricResults.length * 2)) * 100
        : null,
      zeroCount: rubricResults.filter((result) => result.score === 0).length,
      criticalZero: rubricResults.some((result) => result.critical && result.score === 0),
      rubricResults,
    };
  });
}

function compareImprovementItems(a: ScoredRubricResult, b: ScoredRubricResult) {
  const aCriticalZero = a.critical && a.score === 0 ? 1 : 0;
  const bCriticalZero = b.critical && b.score === 0 ? 1 : 0;
  return (
    bCriticalZero - aCriticalZero ||
    a.score - b.score ||
    a.weekNumber - b.weekNumber ||
    a.rubricId.localeCompare(b.rubricId)
  );
}

function readinessConclusion(
  unlocked: boolean,
  missing: MissingReadinessWork,
  band: ReadinessBand | null,
  safetyFloor: boolean,
) {
  if (!unlocked) {
    return `Final report terkunci: selesaikan ${missing.tasks} task, ${missing.gates} gate, dan ${missing.assessments} mission debrief.`;
  }
  if (safetyFloor) {
    return `${band}. SAFETY FLOOR ACTIVE: perkuat reliability, permission, dan failure handling sebelum mengklaim strong delivery evidence.`;
  }
  return `${band}. Gunakan evidence dan priority improvements di laporan ini sebagai backlog latihan berikutnya.`;
}

export function buildFinalReport({
  progress,
  assessments,
  evidenceItems = defaultEvidenceItems,
}: FinalReportInput): FinalReadinessReport {
  const knownTaskIds = roadmapWeeks.flatMap((week) => week.tasks.map((task) => task.id));
  const knownGateIds = roadmapWeeks.map((week) => week.id);
  const completedTaskIds = new Set(progress.completedTaskIds.filter((id) => knownTaskIds.includes(id)));
  const completedGateIds = new Set(progress.completedGateIds.filter((id) => knownGateIds.includes(id)));
  const validAssessments = validStoredAssessments(assessments);

  const missing: MissingReadinessWork = {
    tasks: knownTaskIds.length - completedTaskIds.size,
    gates: knownGateIds.length - completedGateIds.size,
    assessments: roadmapWeeks.length - validAssessments.size,
    taskIds: knownTaskIds.filter((id) => !completedTaskIds.has(id)),
    gateWeekIds: knownGateIds.filter((id) => !completedGateIds.has(id)),
    assessmentWeekIds: knownGateIds.filter((id) => !validAssessments.has(id)),
  };
  const unlocked = missing.tasks === 0 && missing.gates === 0 && missing.assessments === 0;

  const weeklyScores: WeeklyScore[] = roadmapWeeks.flatMap((week) => {
    const assessment = validAssessments.get(week.id);
    return assessment
      ? [{ weekId: week.id, weekNumber: week.week, score: calculateWeeklyScore(assessment) }]
      : [];
  });
  const masteryScore = weeklyScores.length === roadmapWeeks.length
    ? weeklyScores.reduce((sum, week) => sum + week.score, 0) / roadmapWeeks.length
    : null;

  const evidenceIdSet = new Set(evidenceItems.map((item) => item.id));
  const completedEvidenceIds = new Set(
    progress.completedEvidenceIds.filter((id) => evidenceIdSet.has(id)),
  );
  const evidenceScore = evidenceItems.length
    ? (completedEvidenceIds.size / evidenceItems.length) * 100
    : 0;
  const evidenceGaps = evidenceItems.filter((item) => !completedEvidenceIds.has(item.id));

  const allResults = assessmentResults(validAssessments);
  const dimensionScores = makeDimensionScores(allResults);
  const reliability = dimensionScores.find((dimension) => dimension.id === 'reliability-safety');
  const criticalZero = allResults.some((result) => result.critical && result.score === 0);
  const safetyFloor = masteryScore !== null && ((reliability?.score ?? 0) < 70 || criticalZero);
  const readinessScore = masteryScore === null ? null : (masteryScore * 0.8) + (evidenceScore * 0.2);
  const baseBand = readinessScore === null ? null : bandFor(readinessScore);
  const band = safetyFloor && baseBand === 'Strong delivery evidence'
    ? 'Portfolio-ready with targeted gaps'
    : baseBand;

  const strengths: StrengthInsight[] = dimensionScores
    .filter((dimension): dimension is DimensionScore & { score: number } => dimension.score !== null)
    .sort((a, b) => b.score - a.score || DIMENSIONS.findIndex((item) => item.id === a.id) - DIMENSIONS.findIndex((item) => item.id === b.id))
    .slice(0, 2)
    .map((dimension) => ({
      dimensionId: dimension.id,
      label: dimension.label,
      score: dimension.score,
      evidence: dimension.rubricResults
        .filter((result) => result.score === 2)
        .sort((a, b) => a.weekNumber - b.weekNumber || a.rubricId.localeCompare(b.rubricId))
        .slice(0, 2),
    }));

  const improvements: ImprovementInsight[] = dimensionScores
    .filter((dimension): dimension is DimensionScore & { score: number } => (
      dimension.score !== null && dimension.rubricResults.some((result) => result.score <= 1)
    ))
    .sort((a, b) => (
      Number(b.criticalZero) - Number(a.criticalZero) ||
      a.score - b.score ||
      b.zeroCount - a.zeroCount ||
      DIMENSIONS.findIndex((item) => item.id === a.id) - DIMENSIONS.findIndex((item) => item.id === b.id)
    ))
    .slice(0, 3)
    .map((dimension) => ({
      dimensionId: dimension.id,
      label: dimension.label,
      score: dimension.score,
      criticalZero: dimension.criticalZero,
      zeroCount: dimension.zeroCount,
      items: dimension.rubricResults.filter((result) => result.score <= 1).sort(compareImprovementItems),
    }));

  const allRubricsMastered = allResults.length === rubricDimension.size && allResults.every((result) => result.score === 2);
  const stretchRecommendation = allRubricsMastered
    ? 'No critical improvement area detected. Stretch next: validate the portfolio with a real stakeholder pilot or structured market feedback.'
    : null;
  const conclusion = readinessConclusion(unlocked, missing, band, safetyFloor);

  return {
    unlocked,
    missing,
    weeklyScores,
    dimensionScores,
    masteryScore,
    evidenceScore,
    readinessScore,
    baseBand,
    band,
    safetyFloor,
    strengths,
    improvements,
    evidenceGaps,
    conclusion,
    stretchRecommendation,
  };
}

function rounded(score: number | null) {
  return score === null ? '—' : `${Math.round(score)}/100`;
}

function markdownText(value: string) {
  return value
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/([\\`*_[\]#|])/g, '\\$1')
    .replace(/\s*\n\s*/g, ' ');
}

export function buildReportMarkdown(report: FinalReadinessReport) {
  if (!report.unlocked) {
    return [
      '# AGENT/16 Final After-Action Report',
      '',
      '> Assessment AI coach ini bukan sertifikasi atau jaminan siap kerja.',
      '',
      '## Report locked',
      '',
      `- Tasks remaining: ${report.missing.tasks}`,
      `- Gates remaining: ${report.missing.gates}`,
      `- Mission debriefs remaining: ${report.missing.assessments}`,
    ].join('\n');
  }

  const lines = [
    '# AGENT/16 Final After-Action Report',
    '',
    '> Assessment AI coach ini bukan sertifikasi atau jaminan siap kerja.',
    '',
    `**Final readiness:** ${rounded(report.readinessScore)}`,
    `**Mastery:** ${rounded(report.masteryScore)}`,
    `**Portfolio evidence:** ${rounded(report.evidenceScore)}`,
    `**Band:** ${report.band}`,
    `**Safety floor:** ${report.safetyFloor ? 'ACTIVE' : 'Clear'}`,
    '',
    markdownText(report.conclusion),
    '',
    '## Mission Trace',
    '',
    '| Week | Mastery |',
    '| --- | ---: |',
    ...report.weeklyScores.map((week) => `| W${String(week.weekNumber).padStart(2, '0')} | ${Math.round(week.score)}/100 |`),
    '',
    '## Capability Dimensions',
    '',
    ...report.dimensionScores.map((dimension) => `- **${dimension.label}:** ${rounded(dimension.score)}`),
    '',
    '## Strengths',
    '',
    ...report.strengths.map((strength) => `- **${strength.label} (${Math.round(strength.score)}/100):** ${strength.evidence.map((item) => markdownText(item.evidence)).join('; ') || 'Consistent rubric performance.'}`),
    '',
    '## Priority Improvements',
    '',
  ];

  if (report.improvements.length === 0 && report.stretchRecommendation) {
    lines.push(`- ${markdownText(report.stretchRecommendation)}`);
  } else {
    for (const improvement of report.improvements) {
      lines.push(`### ${improvement.label} — ${Math.round(improvement.score)}/100`);
      lines.push('');
      for (const item of improvement.items) {
        lines.push(`- **W${String(item.weekNumber).padStart(2, '0')} · ${item.rubricId}:** ${markdownText(item.finding)} Next: ${markdownText(item.nextAction)}`);
      }
      lines.push('');
    }
  }

  lines.push('## Evidence Gaps', '');
  if (report.evidenceGaps.length === 0) {
    lines.push('- None. All six portfolio evidence items are recorded.');
  } else {
    lines.push(...report.evidenceGaps.map((item) => `- **${markdownText(item.label)}:** ${markdownText(item.description)}`));
  }

  return lines.join('\n').trimEnd();
}
