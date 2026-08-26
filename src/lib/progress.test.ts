import { describe, expect, it } from 'vitest';
import {
  PROGRESS_VERSION,
  calculateCompletion,
  calculateCurrentWeek,
  initialProgress,
  parseProgress,
  toggleArrayValue,
} from './progress';

describe('parseProgress', () => {
  it('returns the initial state for empty or corrupted storage', () => {
    expect(parseProgress(null)).toEqual(initialProgress);
    expect(parseProgress('{definitely-not-json')).toEqual(initialProgress);
    expect(parseProgress(JSON.stringify({ version: 99 }))).toEqual(initialProgress);
  });

  it('accepts valid state and removes duplicate identifiers', () => {
    const parsed = parseProgress(JSON.stringify({
      version: PROGRESS_VERSION,
      startDate: '2026-08-27',
      completedTaskIds: ['a', 'a', 'b'],
      completedGateIds: ['week-1'],
      completedEvidenceIds: [],
      selectedPhase: 'discover',
    }));

    expect(parsed.completedTaskIds).toEqual(['a', 'b']);
    expect(parsed.selectedPhase).toBe('discover');
  });
});

describe('calculateCurrentWeek', () => {
  it('clamps dates before the start to week one', () => {
    expect(calculateCurrentWeek('2026-08-27', new Date(2026, 7, 20, 12))).toBe(1);
  });

  it('advances every seven calendar days', () => {
    expect(calculateCurrentWeek('2026-08-27', new Date(2026, 7, 27, 12))).toBe(1);
    expect(calculateCurrentWeek('2026-08-27', new Date(2026, 8, 3, 12))).toBe(2);
  });

  it('clamps dates after the program to week sixteen', () => {
    expect(calculateCurrentWeek('2026-01-01', new Date(2026, 7, 27, 12))).toBe(16);
  });
});

describe('progress helpers', () => {
  it('calculates a bounded percentage across tasks, gates, and evidence', () => {
    expect(calculateCompletion({
      ...initialProgress,
      completedTaskIds: ['a', 'b'],
      completedGateIds: ['g'],
    }, { tasks: 4, gates: 2, evidence: 2 })).toBe(38);

    expect(calculateCompletion({
      ...initialProgress,
      completedTaskIds: ['a', 'b', 'c'],
    }, { tasks: 1, gates: 0, evidence: 0 })).toBe(100);
  });

  it('toggles an identifier without mutating the input', () => {
    const original = ['a'];
    expect(toggleArrayValue(original, 'b')).toEqual(['a', 'b']);
    expect(toggleArrayValue(original, 'a')).toEqual([]);
    expect(original).toEqual(['a']);
  });
});

