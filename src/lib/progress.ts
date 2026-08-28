import type { PhaseId } from '../data/roadmap';

export const PROGRESS_KEY = 'agent16-progress:v1';
export const PROGRESS_VERSION = 1;

export type PhaseFilter = PhaseId | 'all';

export type ProgressState = {
  version: 1;
  startDate: string;
  completedTaskIds: string[];
  completedGateIds: string[];
  completedEvidenceIds: string[];
  selectedPhase: PhaseFilter;
};

export const initialProgress: ProgressState = {
  version: PROGRESS_VERSION,
  startDate: '',
  completedTaskIds: [],
  completedGateIds: [],
  completedEvidenceIds: [],
  selectedPhase: 'all',
};

const validPhases = new Set<PhaseFilter>([
  'all',
  'discover',
  'design',
  'orchestrate',
  'evaluate',
  'operate',
  'prove',
]);

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function unique(values: string[]) {
  return [...new Set(values)];
}

export function parseProgress(raw: string | null): ProgressState {
  if (!raw) return initialProgress;

  try {
    const value = JSON.parse(raw) as Partial<ProgressState>;
    if (
      value.version !== PROGRESS_VERSION ||
      typeof value.startDate !== 'string' ||
      !isStringArray(value.completedTaskIds) ||
      !isStringArray(value.completedGateIds) ||
      !isStringArray(value.completedEvidenceIds) ||
      !value.selectedPhase ||
      !validPhases.has(value.selectedPhase)
    ) {
      return initialProgress;
    }

    return {
      version: PROGRESS_VERSION,
      startDate: value.startDate,
      completedTaskIds: unique(value.completedTaskIds),
      completedGateIds: unique(value.completedGateIds),
      completedEvidenceIds: unique(value.completedEvidenceIds),
      selectedPhase: value.selectedPhase,
    };
  } catch {
    return initialProgress;
  }
}

export function serializeProgress(state: ProgressState) {
  return JSON.stringify(state);
}

export function calculateCurrentWeek(startDate: string, now = new Date()) {
  if (!startDate) return 1;

  const start = new Date(`${startDate}T00:00:00`);
  if (Number.isNaN(start.getTime())) return 1;

  const current = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffDays = Math.floor((current.getTime() - start.getTime()) / 86_400_000);
  return Math.min(16, Math.max(1, Math.floor(diffDays / 7) + 1));
}

export function calculateCompletion(
  state: ProgressState,
  knownIds: { tasks: readonly string[]; gates: readonly string[]; evidence: readonly string[] },
) {
  const total = knownIds.tasks.length + knownIds.gates.length + knownIds.evidence.length;
  if (total === 0) return 0;

  const completedTasks = new Set(state.completedTaskIds);
  const completedGates = new Set(state.completedGateIds);
  const completedEvidence = new Set(state.completedEvidenceIds);
  const completed =
    knownIds.tasks.filter((id) => completedTasks.has(id)).length +
    knownIds.gates.filter((id) => completedGates.has(id)).length +
    knownIds.evidence.filter((id) => completedEvidence.has(id)).length;

  return Math.min(100, Math.round((completed / total) * 100));
}

export function toggleArrayValue(values: string[], value: string) {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}
