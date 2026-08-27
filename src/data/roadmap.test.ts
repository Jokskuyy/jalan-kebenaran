import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { caseDossiers, weeklyMissions, type CaseId } from './missions';
import { evidenceItems, phases, projectLabs, roadmapWeeks } from './roadmap';

const expectedCases: Record<number, CaseId[]> = {
  1: ['regularag'], 2: ['regularag'], 3: ['regularag'], 4: ['regularag'],
  5: ['regularag'], 6: ['regularag'], 7: ['regularag'], 8: ['regularag'],
  9: ['invoiceops'], 10: ['invoiceops'], 11: ['invoiceops'], 12: ['invoiceops'],
  13: ['invoiceops'],
  14: ['regularag', 'invoiceops'], 15: ['regularag', 'invoiceops'],
  16: ['regularag', 'invoiceops'],
};

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
      expect(week.mission).toBe(weeklyMissions[week.week]);
      expect(week.mission.caseIds).toEqual(expectedCases[week.week]);
      expect(week.mission.resources.length).toBeGreaterThanOrEqual(1);
      expect(week.mission.resources.length).toBeLessThanOrEqual(3);
      expect(week.mission.starterAssets.length).toBeGreaterThanOrEqual(2);
      expect(week.mission.rubric.length).toBeGreaterThanOrEqual(3);
      expect(week.mission.deliverable.sections.length).toBeGreaterThanOrEqual(4);
    }
  });

  it('uses valid phases, cases, HTTPS resources, and globally unique identifiers', () => {
    const validPhases = new Set(phases.map((phase) => phase.id));
    const validCases = new Set(Object.keys(caseDossiers));
    const weekIds = roadmapWeeks.map((week) => week.id);
    const taskIds = roadmapWeeks.flatMap((week) => week.tasks.map((task) => task.id));
    const evidenceIds = evidenceItems.map((item) => item.id);
    const rubricIds = roadmapWeeks.flatMap((week) => week.mission.rubric.map((item) => item.id));

    expect(roadmapWeeks.every((week) => validPhases.has(week.phaseId))).toBe(true);
    expect(roadmapWeeks.every((week) => week.mission.caseIds.every((id) => validCases.has(id)))).toBe(true);
    expect(roadmapWeeks.every((week) => week.mission.resources.every((item) => item.url.startsWith('https://')))).toBe(true);
    expect(new Set(weekIds).size).toBe(weekIds.length);
    expect(new Set(taskIds).size).toBe(taskIds.length);
    expect(new Set(evidenceIds).size).toBe(evidenceIds.length);
    expect(new Set(rubricIds).size).toBe(rubricIds.length);
  });

  it('ships every referenced starter file in public/cases', () => {
    const assets = roadmapWeeks.flatMap((week) => week.mission.starterAssets);

    for (const asset of assets) {
      const assetUrl = new URL(`../../public${asset.path}`, import.meta.url);
      expect(existsSync(assetUrl), `Missing starter asset: ${asset.path}`).toBe(true);
    }
  });

  it('keeps project-lab week labels aligned with the anchor dossiers', () => {
    for (const lab of projectLabs) {
      const dossier = caseDossiers[lab.id as CaseId];
      expect(dossier, `Unknown project lab case: ${lab.id}`).toBeDefined();
      expect(lab.weeks).toBe(dossier.weeks);
    }
  });

  it('labels every downloadable CSV with its data classification', () => {
    const csvPaths = new Set(
      roadmapWeeks
        .flatMap((week) => week.mission.starterAssets)
        .map((asset) => asset.path)
        .filter((path) => path.endsWith('.csv')),
    );

    for (const path of csvPaths) {
      const assetUrl = new URL(`../../public${path}`, import.meta.url);
      const lines = readFileSync(assetUrl, 'utf8').trim().split(/\r?\n/);
      const header = lines[0];
      expect(header, `Missing data label in: ${path}`).toContain('data_classification');
      expect(
        lines.slice(1).every((line) => /,(synthetic|public-metadata-candidate)$/.test(line)),
        `Unlabeled CSV row in: ${path}`,
      ).toBe(true);
    }
  });

  it('resolves every InvoiceOps duplicate reference to a scenario', () => {
    const scenariosUrl = new URL(
      '../../public/cases/invoiceops/invoice-scenarios-starter.csv',
      import.meta.url,
    );
    const [header, ...rows] = readFileSync(scenariosUrl, 'utf8').trim().split(/\r?\n/);
    const columns = header.split(',');
    const idIndex = columns.indexOf('scenario_id');
    const duplicateIndex = columns.indexOf('duplicate_of');
    const values = rows.map((row) => row.split(','));
    const ids = new Set(values.map((row) => row[idIndex]));

    for (const row of values) {
      const duplicateOf = row[duplicateIndex];
      if (duplicateOf) {
        expect(ids.has(duplicateOf), `Missing duplicate target: ${duplicateOf}`).toBe(true);
      }
    }
  });
});
