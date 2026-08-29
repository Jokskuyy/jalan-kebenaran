import { caseDossiers } from '../data/missions';
import type { AnswerPrompt, GuidedTaskKind, StarterAsset } from '../data/missions';
import type { RoadmapWeek } from '../data/roadmap';
import { formatConceptLabel } from './conceptLabels';

const DEFAULT_MISSION_ORIGIN = 'https://jalan-kebenaran.vercel.app';

function bullets(items: string[]) {
  return items.map((item) => `- ${item}`).join('\n');
}

function numbered(items: string[]) {
  return items.map((item, index) => `${index + 1}. ${item}`).join('\n');
}

function uniqueStrings(items: string[]) {
  return [...new Set(items)];
}

function uniqueAssets(items: StarterAsset[]) {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.path)) return false;
    seen.add(item.path);
    return true;
  });
}

const taskKindLabels: Record<GuidedTaskKind, string> = {
  'find-evidence': 'Cari fakta dari cerita',
  'make-decision': 'Buat keputusan desain',
  calculate: 'Hitung dari data',
  explain: 'Jelaskan dengan kata lo sendiri',
};

function answerTemplate(prompt: AnswerPrompt) {
  return prompt.fields.map((field) => `- ${field}: [isi lo]`).join('\n');
}

function storyGuide(week: RoadmapWeek) {
  return week.mission.story.beats.map((beat, index) => (
    [
      `### BEAT ${index + 1} — ${beat.title}`,
      `Plain concept label: ${beat.guided.plainConcept}`,
      `Industry concept: ${beat.concept}`,
      `Display concept label — copy exactly: ${formatConceptLabel(beat.guided.plainConcept, beat.concept)}`,
      `Scene seed — rewrite in everyday Indonesian: ${beat.situation}`,
      `Meaning — explain without unexplained jargon: ${beat.guided.meaning}`,
      'Terms to introduce inline exactly once as "plain meaning (industry term)" before asking:',
      beat.guided.termGlosses.length > 0
        ? bullets(beat.guided.termGlosses.map((entry) => `${entry.plainMeaning} (${entry.term})`))
        : '- No supporting industry term is required in this guided reply.',
      'Guided worked step — copy these bullets verbatim:',
      bullets(beat.guided.workedStep),
      `Guided task label: ${taskKindLabels[beat.guided.taskKind]}`,
      beat.guided.evidenceHint ? `Evidence hint: ${beat.guided.evidenceHint}` : 'Evidence hint: none needed; this task asks for reasoning from the supplied case.',
      'Guided answer fields — render as vertical blanks:',
      answerTemplate(beat.guided.guidedTry),
      `Guided question: ${beat.guided.guidedTry.question}`,
      'Independent answer fields — render as vertical blanks:',
      answerTemplate(beat.independentTry),
      `Independent question: ${beat.independentTry.question}`,
      `Warning after independent success: ${beat.guided.warning}`,
    ].join('\n')
  )).join('\n\n');
}

function assessmentTemplate(week: RoadmapWeek) {
  return JSON.stringify({
    kind: 'agent16-weekly-assessment',
    schemaVersion: 1,
    rubricRevision: 1,
    weekId: week.id,
    weekNumber: week.week,
    rubricResults: week.mission.rubric.map((item) => ({
      rubricId: item.id,
      score: 0,
      finding: '[Temuan spesifik dari draft dan review.]',
      evidence: '[Evidence dari draft atau case; tulis gap bila belum ada.]',
      nextAction: '[Satu tindakan revisi yang konkret.]',
    })),
    weekSummary: '[Ringkasan hasil review minggu ini.]',
  }, null, 2);
}

export function buildMissionPrompt(
  week: RoadmapWeek,
  assetOrigin = DEFAULT_MISSION_ORIGIN,
) {
  const { mission } = week;
  const normalizedOrigin = assetOrigin.replace(/\/+$/, '');
  if (mission.caseIds.length === 0) {
    throw new Error(`Week ${week.week} must reference at least one case dossier.`);
  }

  const dossiers = mission.caseIds.map((caseId) => {
    const dossier = caseDossiers[caseId];
    if (!dossier) throw new Error(`Unknown case dossier: ${caseId}`);
    return dossier;
  });

  const constraints = uniqueStrings(dossiers.flatMap((dossier) => dossier.constraints));
  const assets = uniqueAssets(mission.starterAssets);
  const caseText = dossiers.map((dossier) => [
    `### ${dossier.title} — ${dossier.client}`,
    `DATA LABEL: ${dossier.label}`,
    dossier.brief,
    '',
    'Known facts:',
    bullets(dossier.facts),
  ].join('\n')).join('\n\n');

  const learningText = mission.resources.map((resource) => [
    `- ${resource.title} — ${resource.provider} (${resource.minutes} menit)`,
    `  ${resource.url}`,
    `  Why: ${resource.why}`,
  ].join('\n')).join('\n');

  const starterText = assets.map((asset) => [
    `- ${asset.label} [${asset.kind.toUpperCase()}]`,
    `  ${normalizedOrigin}${asset.path}`,
    `  ${asset.description}`,
  ].join('\n')).join('\n');

  const rubricText = mission.rubric.map((item) => [
    `- [${item.id}] ${item.label}`,
    `  Score 2 when: ${item.passCondition}`,
  ].join('\n')).join('\n');

  return [
    `# AGENT/16 GUIDED MISSION — W${String(week.week).padStart(2, '0')} · ${week.title}`,
    '',
    'MODE: GUIDED-TO-INDEPENDENT · SYNTHETIC TRAINING CASE · DO NOT COMPLETE THE WORK FOR ME',
    'LANGUAGE: Coach me in Bahasa Indonesia. Keep schemas, filenames, ADRs, READMEs, evaluation reports, and portfolio case studies in working English.',
    '',
    '## YOUR ROLE',
    `Act as my ${mission.coachRole}.`,
    `Place me in the story as ${mission.story.learnerRole}.`,
    '',
    '## GUIDED COACH RULES',
    '1. Assume I understand everyday computer use but do not yet know business-operations or AI-engineering jargon.',
    '2. Teach each concept before testing me. Say its supplied Indonesian plain label first, followed by the industry term in parentheses.',
    '3. Every story beat has two stages in order: GUIDED TRY, then INDEPENDENT TRY. Never show both questions in one reply.',
    '4. Treat MISSION KIT and RAW EVIDENCE as the source of truth. Do not introduce new names, numbers, policies, constraints, or decision-relevant facts.',
    '5. Introduce only the supplied term glosses. Write each exactly once as plain meaning first and industry term in parentheses; weave it into a normal sentence, never a glossary section.',
    '6. Do not use other supporting jargon in the guided reply. Replace an unsupplied specialist term with everyday Indonesian instead of defining it with more jargon.',
    '7. Name the concept, explain it in at most two plain sentences, and copy only the supplied partial worked step. The worked step demonstrates case or step A; never complete the guided task B.',
    '8. State the supplied task label so I know whether to find evidence, make a decision, calculate, or explain. Show the evidence hint when one is supplied.',
    '9. Ask exactly one question per reply. Make **Giliran lo:** the final non-empty line, then stop and wait.',
    '10. If my guided answer is incomplete, give one directional hint and repeat the same 1–3 fields and question. Do not advance or show the independent question.',
    '11. After an adequate guided answer, give feedback in 2–4 sentences and present the independent try without another worked example.',
    '12. If my independent answer is incomplete, give one directional hint and repeat the same independent fields and question. If adequate, give feedback, state the supplied warning, and continue to the next guided beat.',
    '13. “Belum diketahui—perlu dicatat” is valid when the case lacks evidence. Distinguish an evidence gap from a concept I have not understood.',
    '14. After all three beats, ask for a readback in no more than three bullets. Only after the readback, ask me to paste my own draft or partial draft.',
    '15. Treat my draft as work to review, not permission to write it for me. Ask at most five high-impact discovery questions only when genuinely needed.',
    '16. Separate evidence, client claims, assumptions, and your inferences. Challenge unsupported claims, unsafe boundaries, and metrics without formula, denominator, source, or owner.',
    '17. Score every rubric item from 0–2: 0 = absent or unsafe, 1 = partial, 2 = complete and evidence-backed. Finish with a prioritized revision checklist without rewriting the final artifact.',
    '',
    '## GUIDED LEARNING PROTOCOL',
    'Write the first guided reply for each beat in conversational Bahasa Indonesia, second-person point of view, and 140–210 words total including fields and question.',
    'Begin with a compact orientation grounded in the scene seed, rewritten in everyday Indonesian. Introduce every supplied term gloss inline before the task.',
    'Then use this exact order: **Yang lo pelajari: [display concept label]** → supplied meaning → **Contoh satu bagian** → supplied worked-step bullets → **Tugas kecil lo: [task label]** → optional **Petunjuk sumber:** → vertical guided fields → final **Giliran lo:** guided question.',
    'Copy the supplied display concept label exactly; it already prevents duplicated industry terms.',
    'Copy every supplied worked-step bullet verbatim. It is the only answer content you may demonstrate; do not solve the adjacent guided task or the independent answer.',
    'Render every supplied field vertically as `- [field]: [isi lo]`. Guided try has 1–3 fields; never add another field.',
    'After the vertical frame, write: `Tidak perlu sempurna. Jika datanya belum ada, tulis “belum diketahui—perlu dicatat”.`',
    'Insert exactly one blank line before the single bold **Giliran lo:** question. It must be the final non-empty line, then stop.',
    'Do not show the independent fields, independent question, deliverable, resources, rubric, later beats, or assessment in a guided reply.',
    'For the independent stage, give 2–4 sentences of feedback, write **Sekarang coba sendiri**, render the supplied 3–5 independent fields vertically, ask its question once as the final **Giliran lo:** line, and stop. Do not provide a second worked example.',
    'After an adequate independent answer, write **Waspada:** followed by the supplied warning before moving to the next guided beat.',
    'Do not create an Analogi, Glossary, or Istilah section. Do not explain ordinary terms that are absent from the supplied term glosses.',
    'Use normal Markdown paragraphs and lists. Never emit a trailing backslash to force a line break.',
    '',
    '## MISSION KIT · CASE REFERENCE',
    caseText,
    '',
    '## THIS WEEK\'S RAW EVIDENCE',
    bullets(mission.rawEvidence),
    '',
    '## THIS WEEK\'S MISSION',
    mission.context,
    '',
    '## STORY SETUP',
    `Opening: ${mission.story.opening}`,
    `Learner role: ${mission.story.learnerRole}`,
    '',
    '## STORY BEATS — INTERNAL COACH GUIDE',
    storyGuide(week),
    '',
    'Work to complete:',
    numbered(week.tasks.map((task) => task.label)),
    '',
    'Review focus:',
    bullets(mission.coachFocus),
    '',
    '## NON-NEGOTIABLE CONSTRAINTS',
    bullets(constraints),
    '',
    '## LEARN FIRST — JUST IN TIME',
    learningText,
    '',
    '## STARTER FILES',
    starterText,
    '',
    '## DELIVERABLE',
    `Title: ${mission.deliverable.title}`,
    `Format: ${mission.deliverable.format}`,
    `Artifact language: ${mission.deliverable.language}`,
    'Required sections:',
    bullets(mission.deliverable.sections),
    '',
    '## REVIEW RUBRIC',
    'Use the 0–2 scale defined above.',
    rubricText,
    '',
    '## QUALITY GATE',
    week.gate,
    '',
    '## INTERACTION SEQUENCE',
    '1. First reply: place me in my learner role, then present only BEAT 1 GUIDED TRY using the exact beginner-friendly structure in 140–210 words.',
    '2. Use the plain concept before the industry term, introduce only the supplied inline glosses, copy one partial worked step, state the task label and optional evidence hint, render only the 1–3 guided fields, ask only the guided question, and stop.',
    '3. Guided answer: if incomplete, give one hint and repeat the same task label, guided fields, and question. If adequate, give 2–4 sentences of feedback and present that beat\'s INDEPENDENT TRY.',
    '4. Independent answer: if incomplete, give one hint and repeat the same 3–5 independent fields and question. If adequate, give 2–4 sentences of feedback, show the warning, then start the next beat\'s GUIDED TRY.',
    '5. After the third independent answer is adequate, give feedback and its warning, then ask for my three-bullet case-and-concept readback. Do not ask for the deliverable in that same reply.',
    '6. After the readback, invite my own draft or partial attempt. Ask no more than five discovery questions after I share it, and only when the missing information materially affects review.',
    '7. Review and score only after receiving my attempt. Return evidence gaps, rubric scores, and a prioritized revision checklist, then follow the Mission Debrief Receipt contract below.',
    '',
    '## MISSION DEBRIEF RECEIPT — ONLY AFTER REVIEW',
    'Use this contract only after you have reviewed my draft. Complete the story beats, readback, draft submission, any needed discovery questions, and the human-readable review first.',
    'Never emit the assessment in the first response, during story beats, hints, concept debriefs, readback, or discovery questions, or before reviewing my draft.',
    'After the human-readable review, emit exactly one assessment block. Emit a fresh assessment after every later revised-draft review so the newest receipt can replace the previous one.',
    'Replace every bracketed placeholder with concise, draft-specific Bahasa Indonesia. Replace each example score 0 with the earned integer 0, 1, or 2; do not default every rubric to 0. Scores must match the human-readable rubric review.',
    'Keep every listed rubricId exactly once and in the listed order. Do not add, remove, rename, or duplicate fields or rubric results.',
    'Do not add an overall score, readiness score, or capability classification. The website calculates all derived results locally.',
    'Return raw valid JSON between the marker lines exactly as shown. Do not wrap the JSON in a Markdown code fence and do not write commentary inside the markers.',
    'AGENT16_ASSESSMENT_V1_START',
    assessmentTemplate(week),
    'AGENT16_ASSESSMENT_V1_END',
    '',
    '## USER CONTROLS',
    'If I say “jelaskan [term]”, explain only that term in everyday Indonesian in at most three bullets, then return to the current question. If I say “beri hint”, give one directional hint without completing the answer, repeat the current task label, same fields, and same **Giliran lo:** question, then stop. If I say “ulang adegan”, restate only the current context with simpler words and no new facts, repeat the current task label, same fields, and same **Giliran lo:** question, then stop. If I say “lanjut”, move only to the next eligible stage after an adequate answer; never invent or bypass my answer. If I say “stop”, wait for my next instruction.',
    '',
    '## MY DRAFT',
    '[TEMPEL DRAFT LO DI SINI]',
  ].join('\n');
}
