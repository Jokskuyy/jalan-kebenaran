import { useCallback, useEffect, useMemo, useState } from 'react';
import { evidenceItems, roadmapWeeks } from '../data/roadmap';
import {
  PROGRESS_KEY,
  calculateCompletion,
  calculateCurrentWeek,
  initialProgress,
  parseProgress,
  serializeProgress,
  toggleArrayValue,
  type PhaseFilter,
  type ProgressState,
} from '../lib/progress';

function loadProgress() {
  if (typeof window === 'undefined') return initialProgress;
  try {
    return parseProgress(window.localStorage.getItem(PROGRESS_KEY));
  } catch {
    return initialProgress;
  }
}

export function useProgress() {
  const [state, setState] = useState<ProgressState>(loadProgress);

  useEffect(() => {
    try {
      window.localStorage.setItem(PROGRESS_KEY, serializeProgress(state));
    } catch {
      // The roadmap remains usable when browser storage is disabled or full.
    }
  }, [state]);

  const setStartDate = useCallback((startDate: string) => {
    setState((current) => ({ ...current, startDate }));
  }, []);

  const setSelectedPhase = useCallback((selectedPhase: PhaseFilter) => {
    setState((current) => ({ ...current, selectedPhase }));
  }, []);

  const toggleTask = useCallback((taskId: string) => {
    setState((current) => ({
      ...current,
      completedTaskIds: toggleArrayValue(current.completedTaskIds, taskId),
    }));
  }, []);

  const toggleGate = useCallback((gateId: string) => {
    setState((current) => ({
      ...current,
      completedGateIds: toggleArrayValue(current.completedGateIds, gateId),
    }));
  }, []);

  const toggleEvidence = useCallback((evidenceId: string) => {
    setState((current) => ({
      ...current,
      completedEvidenceIds: toggleArrayValue(current.completedEvidenceIds, evidenceId),
    }));
  }, []);

  const reset = useCallback(() => setState(initialProgress), []);

  const totals = useMemo(() => ({
    tasks: roadmapWeeks.reduce((total, week) => total + week.tasks.length, 0),
    gates: roadmapWeeks.length,
    evidence: evidenceItems.length,
  }), []);

  const progress = calculateCompletion(state, totals);
  const currentWeek = calculateCurrentWeek(state.startDate);

  return {
    state,
    progress,
    currentWeek,
    setStartDate,
    setSelectedPhase,
    toggleTask,
    toggleGate,
    toggleEvidence,
    reset,
  };
}
