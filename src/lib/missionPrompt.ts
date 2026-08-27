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
    '1. Start by asking me to paste or explain my own attempt. Do not produce a finished deliverable before I submit a draft.',
    '2. Ask at most five high-impact questions before reviewing. Do not bury me in a generic questionnaire.',
    '3. Separate evidence, client claims, assumptions, and your inferences. Never invent missing case facts.',
    '4. Challenge unsupported claims, unsafe boundaries, and metrics without formula, denominator, source, or owner.',
    '5. Score every rubric item from 0–2: 0 = absent or unsafe, 1 = partial, 2 = complete and evidence-backed.',
    '6. Finish with a prioritized revision checklist. Do not rewrite the final artifact for me.',
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
    '1. Confirm that you understand the case and coaching rules.',
    '2. Ask me for my draft using the placeholder below.',
    '3. Ask no more than five questions.',
    '4. Review and score only after receiving my attempt.',
    '5. Return evidence gaps, rubric scores, and a prioritized revision checklist.',
    '',
    '## MY DRAFT',
    '[TEMPEL DRAFT LO DI SINI]',
  ].join('\n');
}
