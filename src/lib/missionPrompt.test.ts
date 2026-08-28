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
  '## MY DRAFT',
];

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

  it('uses an explicit preview origin without losing prompt purity', () => {
    const previewOrigin = 'https://jalan-kebenaran-feature-example.vercel.app/';
    const prompt = buildMissionPrompt(roadmapWeeks[0], previewOrigin);

    expect(prompt).toContain('https://jalan-kebenaran-feature-example.vercel.app/cases/regularag/client-brief.md');
    expect(prompt).not.toContain('https://jalan-kebenaran.vercel.app/cases/');
    expect(buildMissionPrompt(roadmapWeeks[0], previewOrigin)).toBe(prompt);
  });
});
