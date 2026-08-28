import { useCallback, useEffect, useRef, useState } from 'react';
import { roadmapWeeks } from '../data/roadmap';
import {
  ASSESSMENT_KEY,
  ASSESSMENT_VERSION,
  initialAssessmentState,
  parseAssessmentState,
  serializeAssessmentState,
  validateAssessment,
  type AssessmentState,
  type StoredWeeklyAssessment,
  type WeeklyAssessmentInput,
} from '../lib/assessment';

function loadAssessments() {
  if (typeof window === 'undefined') return initialAssessmentState;
  try {
    return parseAssessmentState(window.localStorage.getItem(ASSESSMENT_KEY));
  } catch {
    return initialAssessmentState;
  }
}

export function useAssessments() {
  const [state, setState] = useState<AssessmentState>(loadAssessments);
  const skipNextPersist = useRef(false);

  useEffect(() => {
    if (skipNextPersist.current) {
      skipNextPersist.current = false;
      return;
    }
    try {
      window.localStorage.setItem(ASSESSMENT_KEY, serializeAssessmentState(state));
    } catch {
      // Debrief forms remain usable when browser storage is disabled or full.
    }
  }, [state]);

  const saveAssessment = useCallback((input: WeeklyAssessmentInput) => {
    const week = roadmapWeeks.find((candidate) => candidate.id === input.weekId);
    if (!week) return false;
    const validated = validateAssessment(input, week);
    if (!validated.ok) return false;

    const stored: StoredWeeklyAssessment = {
      ...validated.value,
      savedAt: new Date().toISOString(),
    };
    setState((current) => ({
      version: ASSESSMENT_VERSION,
      assessments: { ...current.assessments, [week.id]: stored },
    }));
    return true;
  }, []);

  const deleteAssessment = useCallback((weekId: string) => {
    setState((current) => {
      if (!current.assessments[weekId]) return current;
      const assessments = { ...current.assessments };
      delete assessments[weekId];
      return { version: ASSESSMENT_VERSION, assessments };
    });
  }, []);

  const reset = useCallback(() => {
    skipNextPersist.current = true;
    try {
      window.localStorage.removeItem(ASSESSMENT_KEY);
    } catch {
      // State still resets in-memory when browser storage is unavailable.
    }
    setState({ version: ASSESSMENT_VERSION, assessments: {} });
  }, []);

  return {
    assessments: state.assessments,
    saveAssessment,
    deleteAssessment,
    reset,
  };
}
