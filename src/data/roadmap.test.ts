import { describe, expect, it } from 'vitest';
import { evidenceItems, phases, roadmapWeeks } from './roadmap';

describe('roadmap data', () => {
  it('contains sixteen sequential weeks with complete delivery fields', () => {
    expect(roadmapWeeks).toHaveLength(16);
    expect(roadmapWeeks.map((week) => week.week)).toEqual(
      Array.from({ length: 16 }, (_, index) => index + 1),
    );

    for (const week of roadmapWeeks) {
      expect(week.tasks.length).toBeGreaterThanOrEqual(3);
      expect(week.clientOutcome.trim()).not.toBe('');
      expect(week.evidence.trim()).not.toBe('');
      expect(week.gate.trim()).not.toBe('');
      expect(week.agentBrief.trim()).not.toBe('');
    }
  });

  it('uses valid phases and globally unique identifiers', () => {
    const validPhases = new Set(phases.map((phase) => phase.id));
    const weekIds = roadmapWeeks.map((week) => week.id);
    const taskIds = roadmapWeeks.flatMap((week) => week.tasks.map((task) => task.id));
    const evidenceIds = evidenceItems.map((item) => item.id);

    expect(roadmapWeeks.every((week) => validPhases.has(week.phaseId))).toBe(true);
    expect(new Set(weekIds).size).toBe(weekIds.length);
    expect(new Set(taskIds).size).toBe(taskIds.length);
    expect(new Set(evidenceIds).size).toBe(evidenceIds.length);
  });
});

