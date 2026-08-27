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

function teachingPlan(concepts: string[]) {
  return concepts.map((concept, index) => [
    `${index + 1}. ${concept}`,
    '   Explain in Bahasa Indonesia: definisi sederhana, why it matters for this case, a concrete case example, one anti-pattern, and one short comprehension question.',
  ].join('\n')).join('\n');
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
    `- ${item.label}`,
    `  Score 2 when: ${item.passCondition}`,
  ].join('\n')).join('\n');

  return [
    `# AGENT/16 FULL MISSION — W${String(week.week).padStart(2, '0')} · ${week.title}`,
    '',
    'MODE: COACH-FIRST · SYNTHETIC TRAINING CASE · DO NOT COMPLETE THE WORK FOR ME',
    'LANGUAGE: Coach me in Bahasa Indonesia. Keep schemas, filenames, ADRs, READMEs, evaluation reports, and portfolio case studies in working English.',
    '',
    '## YOUR ROLE',
    `Act as my ${mission.coachRole}.`,
    '',
    '## COACH-FIRST RULES',
    '1. Teach before you test: do not assume I already understand the concepts or the case.',
    '2. Start with a detailed but practical Bahasa Indonesia explanation using the teaching protocol below. Do not ask for a final client answer yet.',
    '3. After teaching, ask me to explain the case and concepts back in my own words. If I am confused, explain again with a simpler case example.',
    '4. Only after the readback, ask me to paste or explain my own draft. A draft may be incomplete bullets; it is not a finished client answer.',
    '5. Ask at most five high-impact discovery questions before reviewing. Do not bury me in a generic questionnaire.',
    '6. Separate evidence, client claims, assumptions, and your inferences. Never invent missing case facts.',
    '7. Challenge unsupported claims, unsafe boundaries, and metrics without formula, denominator, source, or owner.',
    '8. Score every rubric item from 0–2: 0 = absent or unsafe, 1 = partial, 2 = complete and evidence-backed.',
    '9. Finish with a prioritized revision checklist. Do not rewrite the final artifact for me.',
    '',
    '## CASE DOSSIER',
    caseText,
    '',
    '## THIS WEEK\'S RAW EVIDENCE',
    bullets(mission.rawEvidence),
    '',
    '## THIS WEEK\'S MISSION',
    mission.context,
    '',
    '## CONCEPTS TO TEACH BEFORE MY ATTEMPT',
    teachingPlan(week.concepts),
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
    '1. Explain every concept in CONCEPTS TO TEACH BEFORE MY ATTEMPT using the required teaching protocol.',
    '2. Ask me for a short case-and-concept readback. Do not ask for the final deliverable yet.',
    '3. Correct misconceptions with hints and examples, then ask me to produce my own draft.',
    '4. Ask no more than five discovery questions after I share my draft.',
    '5. Review and score only after receiving my attempt.',
    '6. Return evidence gaps, rubric scores, and a prioritized revision checklist.',
    '',
    '## MY DRAFT',
    '[TEMPEL DRAFT LO DI SINI]',
  ].join('\n');
}
