import { caseDossiers } from '../data/missions';
import type { StarterAsset } from '../data/missions';
import type { RoadmapWeek } from '../data/roadmap';

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

function frameSlots(frame: string) {
  return frame.split('→').map((slot) => slot.trim()).filter(Boolean);
}

function frameTemplate(frame: string) {
  return frameSlots(frame).map((slot) => `- ${slot}: [isi lo]`).join('\n');
}

function storyGuide(week: RoadmapWeek) {
  return week.mission.story.beats.map((beat, index) => (
    [
      `### BEAT ${index + 1} — ${beat.title}`,
      `Concept to teach before asking: ${beat.concept}`,
      `Scene seed: ${beat.situation}`,
      `Guided meaning: ${beat.guided.meaning}`,
      'Guided worked step — copy these bullets verbatim:',
      bullets(beat.guided.workedStep),
      'Guided micro-answer frame — render these as vertical blanks:',
      frameTemplate(beat.guided.microAnswerFrame),
      `Guided micro-question: ${beat.guided.microQuestion}`,
      'Independent answer frame — render these as vertical blanks:',
      frameTemplate(beat.answerFrame),
      `Independent decision question: ${beat.decisionQuestion}`,
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
    '1. Teach each concept before testing me on it. Use the client story as context, not as a substitute for explanation.',
    '2. Every story beat has two stages in order: GUIDED TRY, then INDEPENDENT TRY. Never show both questions in the same reply.',
    '3. Treat MISSION KIT and RAW EVIDENCE as the source of truth. Do not introduce new names, numbers, policies, constraints, or decision-relevant facts.',
    '4. At the start of every guided stage, name the concept, explain it in at most two plain-language sentences, and copy only the supplied partial worked step.',
    '5. Ask exactly one question per reply. Make **Giliran lo:** the final non-empty line, then stop and wait.',
    '6. If my guided answer is incomplete, give one directional hint and repeat the same micro-frame and micro-question. Do not advance or show the independent question.',
    '7. After an adequate guided answer, give feedback in 2–4 sentences and present the independent try without another worked example.',
    '8. If my independent answer is incomplete, give one directional hint and repeat the same independent frame and question. If adequate, give feedback, state the supplied warning, and continue to the next guided beat.',
    '9. “Belum diketahui—perlu dicatat” is a valid response when the case lacks evidence. Distinguish a real evidence gap from a concept I have not understood.',
    '10. After all three beats, ask for a readback in no more than three bullets. Only after the readback, ask me to paste my own draft or partial draft.',
    '11. Treat my draft as work to review, not permission to write the artifact for me. Ask at most five high-impact discovery questions only when genuinely needed.',
    '12. Separate evidence, client claims, assumptions, and your inferences. Challenge unsupported claims, unsafe boundaries, and metrics without formula, denominator, source, or owner.',
    '13. Score every rubric item from 0–2: 0 = absent or unsafe, 1 = partial, 2 = complete and evidence-backed. Finish with a prioritized revision checklist without rewriting the final artifact.',
    '',
    '## GUIDED LEARNING PROTOCOL',
    'Write the first guided reply for each beat in conversational Bahasa Indonesia, second-person point of view, and 180–260 words total including the frame and question.',
    'Begin with a short scene orientation grounded in the supplied scene seed. Keep the story compact so the learning sequence is easy to follow.',
    'Then use this exact order: **Yang lo pelajari: [concept]** → its supplied meaning → **Contoh satu langkah** → supplied worked-step bullets → **Sekarang coba satu langkah** → vertical answer frame → final **Giliran lo:** micro-question.',
    'Copy every supplied worked-step bullet verbatim. It is the only answer content you may demonstrate; do not complete another step or the full independent answer.',
    'Render every answer-frame slot vertically as `- [slot]: [isi lo]`. Never compress the slots into an arrow-separated sentence.',
    'After the vertical frame, write: `Tidak perlu sempurna. Jika datanya belum ada, tulis “belum diketahui—perlu dicatat”.`',
    'Insert exactly one blank line before the single bold **Giliran lo:** question. It must be the final non-empty line, then stop.',
    'Do not show the independent frame, independent question, deliverable, resources, rubric, later beats, or assessment in a guided reply.',
    'For the independent stage, give 2–4 sentences of feedback, write **Sekarang coba sendiri**, render the supplied independent frame vertically, ask its decision question once as the final **Giliran lo:** line, and stop. Do not provide a second worked example.',
    'After an adequate independent answer, write **Waspada:** followed by the supplied warning before moving to the next guided beat.',
    'Do not create an Analogi section. Common terms such as user, owner, source, target, data, KPI, API, and JSON need only a short parenthetical gloss when first used, not a separate lesson.',
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
    '1. First reply: place me in my learner role, then present only BEAT 1 GUIDED TRY using the exact guided structure and a total of 180–260 words.',
    '2. Reveal the concept and meaning, copy its one partial worked step, render only the guided micro-frame vertically, ask only the guided micro-question, and stop. Do not show the independent question or request the deliverable.',
    '3. Guided answer: if incomplete, give one hint and repeat the same guided vertical frame and micro-question. If adequate, give 2–4 sentences of feedback and present that beat\'s INDEPENDENT TRY.',
    '4. Independent answer: if incomplete, give one hint and repeat the same independent vertical frame and decision question. If adequate, give 2–4 sentences of feedback, show the warning, then start the next beat\'s GUIDED TRY.',
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
    'If I say “jelaskan [term]”, explain only that term in at most three bullets, then return to the current question. If I say “beri hint”, give one directional hint without completing the answer, repeat the current stage\'s vertical frame and same **Giliran lo:** question, then stop. If I say “ulang adegan”, restate only the current context more simply without adding facts, repeat the current stage\'s vertical frame and same **Giliran lo:** question, then stop. If I say “lanjut”, move only to the next eligible stage after an adequate answer; never invent or bypass my answer. If I say “stop”, wait for my next instruction.',
    '',
    '## MY DRAFT',
    '[TEMPEL DRAFT LO DI SINI]',
  ].join('\n');
}
