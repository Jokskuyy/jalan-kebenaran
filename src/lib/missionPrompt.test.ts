import { describe, expect, it } from 'vitest';
import { roadmapWeeks } from '../data/roadmap';
import { buildMissionPrompt } from './missionPrompt';

const requiredHeadings = [
  '## YOUR ROLE',
  '## GUIDED COACH RULES',
  '## GUIDED LEARNING PROTOCOL',
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
      expect(first).not.toContain('undefined');
      expect(first).not.toContain('[object Object]');
      expect(first.match(/\[TEMPEL DRAFT LO DI SINI\]/g)).toHaveLength(1);
      expect(first).toContain(week.title);
      expect(first).toContain(week.gate);
      expect(first).toContain(week.mission.deliverable.title);
      expect(first).toContain('DO NOT COMPLETE THE WORK FOR ME');
      expect(first).toContain('MODE: GUIDED-TO-INDEPENDENT');
      expect(first).toContain('Every story beat has two stages in order: GUIDED TRY, then INDEPENDENT TRY');
      expect(first).toContain('case-and-concept readback');
      expect(first).toContain('140–210 words');
      expect(first).toContain('**Yang lo pelajari: [display concept label]**');
      expect(first).toContain('**Contoh satu bagian**');
      expect(first).toContain('**Tugas kecil lo: [task label]**');
      expect(first).toContain('**Sekarang coba sendiri**');
      expect(first).toContain('plain meaning first and industry term in parentheses');
      expect(first).toContain('Guided try has 1–3 fields');
      expect(first).toContain('Belum diketahui—perlu dicatat');
      expect(first).toContain('**Giliran lo:**');
      expect(first).toContain('## USER CONTROLS');
      expect(first).toContain('ulang adegan');
      expect(first).not.toContain('## INTERMEZZO PROTOCOL');
      expect(first).not.toContain('Do not reveal the concept name before I answer');
      expect(first).not.toContain('Concept to reveal only after');
      expect(first).not.toContain('Analogi:');
      expect(first).not.toContain('→ [');
      expect(first).not.toMatch(/\\$/m);
      expect(first.match(/^Plain concept label: /gm)).toHaveLength(3);
      expect(first.match(/^Guided question: /gm)).toHaveLength(3);
      expect(first.match(/^Independent question: /gm)).toHaveLength(3);
      expect(first.match(/^Guided task label: /gm)).toHaveLength(3);
      for (const heading of requiredHeadings) expect(first).toContain(heading);
    }
  });

  it('serializes each guided scaffold before its independent check', () => {
    for (const week of roadmapWeeks) {
      const prompt = buildMissionPrompt(week);

      for (const [index, beat] of week.mission.story.beats.entries()) {
        const heading = `### BEAT ${index + 1} — ${beat.title}`;
        const nextHeading = week.mission.story.beats[index + 1]
          ? `### BEAT ${index + 2} — ${week.mission.story.beats[index + 1].title}`
          : '\n\nWork to complete:';
        const start = prompt.indexOf(heading);
        const end = prompt.indexOf(nextHeading, start + heading.length);
        const block = prompt.slice(start, end);
        const plainConceptIndex = block.indexOf(`Plain concept label: ${beat.guided.plainConcept}`);
        const conceptIndex = block.indexOf(`Industry concept: ${beat.concept}`);
        const displayConceptIndex = block.indexOf('Display concept label — copy exactly:');
        const seedIndex = block.indexOf(`Scene seed — rewrite in everyday Indonesian: ${beat.situation}`);
        const meaningIndex = block.indexOf(`Meaning — explain without unexplained jargon: ${beat.guided.meaning}`);
        const glossIndex = block.indexOf('Terms to introduce inline exactly once');
        const workedIndex = block.indexOf('Guided worked step — copy these bullets verbatim:');
        const taskIndex = block.indexOf(`Guided task label:`);
        const guidedFrameIndex = block.indexOf('Guided answer fields — render as vertical blanks:');
        const guidedQuestionIndex = block.indexOf(`Guided question: ${beat.guided.guidedTry.question}`);
        const independentFrameIndex = block.indexOf('Independent answer fields — render as vertical blanks:');
        const independentQuestionIndex = block.indexOf(`Independent question: ${beat.independentTry.question}`);
        const warningIndex = block.indexOf(`Warning after independent success: ${beat.guided.warning}`);

        expect(start, `${week.id} beat ${index + 1} heading`).toBeGreaterThanOrEqual(0);
        expect(end, `${week.id} beat ${index + 1} end`).toBeGreaterThan(start);
        expect(plainConceptIndex).toBeGreaterThanOrEqual(0);
        expect(conceptIndex).toBeGreaterThan(plainConceptIndex);
        expect(displayConceptIndex).toBeGreaterThan(conceptIndex);
        expect(seedIndex).toBeGreaterThan(displayConceptIndex);
        expect(meaningIndex).toBeGreaterThan(seedIndex);
        expect(glossIndex).toBeGreaterThan(meaningIndex);
        expect(workedIndex).toBeGreaterThan(glossIndex);
        expect(taskIndex).toBeGreaterThan(workedIndex);
        expect(guidedFrameIndex).toBeGreaterThan(taskIndex);
        expect(guidedQuestionIndex).toBeGreaterThan(guidedFrameIndex);
        expect(independentFrameIndex).toBeGreaterThan(guidedQuestionIndex);
        expect(independentQuestionIndex).toBeGreaterThan(independentFrameIndex);
        expect(warningIndex).toBeGreaterThan(independentQuestionIndex);

        for (const item of beat.guided.workedStep) expect(block).toContain(`- ${item}`);
        for (const entry of beat.guided.termGlosses) {
          expect(block).toContain(`- ${entry.plainMeaning} (${entry.term})`);
        }
        for (const field of beat.guided.guidedTry.fields) expect(block).toContain(`- ${field}: [isi lo]`);
        for (const field of beat.independentTry.fields) expect(block).toContain(`- ${field}: [isi lo]`);
      }
    }
  });

  it('enforces one-question guided and independent retries', () => {
    for (const week of roadmapWeeks) {
      const prompt = buildMissionPrompt(week);

      expect(prompt).toContain('Ask exactly one question per reply');
      expect(prompt).toContain('Never show both questions in one reply');
      expect(prompt).toContain('Do not advance or show the independent question');
      expect(prompt).toContain('present the independent try without another worked example');
      expect(prompt).toContain('repeat the same task label, guided fields, and question');
      expect(prompt).toContain('repeat the same 3–5 independent fields and question');
      expect(prompt).toContain('Do not show the independent fields, independent question, deliverable, resources, rubric, later beats, or assessment in a guided reply');
      expect(prompt).toContain('repeat the current task label, same fields, and same **Giliran lo:** question');
      expect(prompt).toContain('move only to the next eligible stage after an adequate answer');
      expect(prompt).toContain('Insert exactly one blank line before the single bold **Giliran lo:** question');
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
    expect(prompt).toContain('without rewriting the final artifact');
    expect(prompt).toContain('/cases/regularag/interview-notes.md');
    expect(prompt).toContain('Problem before solution');
    expect(prompt).toContain('BEAT 1 — Satu pertanyaan, banyak tempat mencari');
    expect(prompt).toContain('Display concept label — copy exactly: peta alur kerja (workflow mapping)');
    expect(prompt).toContain('- pertanyaan kerja yang dicatat dan dilacak sampai selesai (ticket)');
    expect(prompt).toContain('- staf kepatuhan (compliance analyst)');
    expect(prompt).toContain('- kotak masuk bersama (shared inbox)');
    expect(prompt).toContain('- Siapa yang bekerja: staf kepatuhan.');
    expect(prompt).toContain('Guided task label: Cari fakta dari cerita');
    expect(prompt).toContain('Guided question: Berdasarkan cerita, apa yang terjadi setelah staf kepatuhan membaca pertanyaan?');
    expect(prompt).toContain('- langkah berikutnya: [isi lo]');
    expect(prompt).toContain('- tempat mencari informasi: [isi lo]');
    expect(prompt).toContain('- orang yang mungkin dimintai bantuan: [isi lo]');
    expect(prompt).toContain('Independent question: Untuk memetakan seluruh alur');
    expect(prompt).toContain('Do not show the independent fields, independent question, deliverable, resources, rubric, later beats, or assessment in a guided reply.');
  });

  it('locks representative beginner fixtures across discovery, engineering, and career weeks', () => {
    const fixtures = [
      {
        week: 1,
        plainConcept: 'peta alur kerja (workflow mapping)',
        terms: ['ticket', 'compliance analyst', 'shared inbox'],
        taskKind: 'find-evidence',
        fields: ['langkah berikutnya', 'tempat mencari informasi', 'orang yang mungkin dimintai bantuan'],
      },
      {
        week: 3,
        plainConcept: 'keluaran dengan bentuk tetap (structured output)',
        terms: ['field', 'JSON', 'citation'],
        taskKind: 'make-decision',
        fields: ['bagian penghubung', 'hasil saat hilang'],
      },
      {
        week: 6,
        plainConcept: 'gabungan pencarian kata dan makna (hybrid search)',
        terms: ['lexical search', 'semantic search', 'hybrid search'],
        taskKind: 'make-decision',
        fields: ['cara pencarian', 'alasan'],
      },
      {
        week: 9,
        plainConcept: 'membaca jejak proses (process mining)',
        terms: ['invoice', 'purchase order / PO', 'goods receipt'],
        taskKind: 'explain',
        fields: ['waktu mulai', 'waktu selesai', 'selisih waktu'],
      },
      {
        week: 12,
        plainConcept: 'aman saat permintaan diulang (idempotency)',
        terms: ['idempotency key', 'replay', 'at-least-once delivery'],
        taskKind: 'make-decision',
        fields: ['data yang diperiksa', 'keputusan sementara'],
      },
      {
        week: 15,
        plainConcept: 'latihan merancang sistem (system design)',
        terms: ['workload', 'reliability', 'rollback'],
        taskKind: 'make-decision',
        fields: ['bagian yang diukur', 'petunjuk yang dicari'],
      },
      {
        week: 16,
        plainConcept: 'kelompok peran sasaran (target roles)',
        terms: ['role cluster', 'capability', 'positioning'],
        taskKind: 'find-evidence',
        fields: ['proyek', 'bukti utama'],
      },
    ] as const;

    for (const fixture of fixtures) {
      const beat = roadmapWeeks[fixture.week - 1].mission.story.beats[0];
      const prompt = buildMissionPrompt(roadmapWeeks[fixture.week - 1]);

      expect(beat.guided.plainConcept).toBe(fixture.plainConcept);
      expect(beat.guided.termGlosses.map((entry) => entry.term)).toEqual(fixture.terms);
      expect(beat.guided.taskKind).toBe(fixture.taskKind);
      expect(beat.guided.guidedTry.fields).toEqual(fixture.fields);
      expect(prompt).toContain(`Display concept label — copy exactly: ${fixture.plainConcept}`);
      for (const field of fixture.fields) expect(prompt).toContain(`- ${field}: [isi lo]`);
    }
  });

  it('keeps case continuity across discovery, delivery, and career weeks', () => {
    const invoicePrompt = buildMissionPrompt(roadmapWeeks[8]);
    expect(invoicePrompt).toContain('InvoiceOps Agent');
    expect(invoicePrompt).toContain('BEAT 1 — Tagihan berpindah tanpa jejak yang utuh');

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
