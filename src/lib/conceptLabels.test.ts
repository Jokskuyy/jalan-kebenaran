import { describe, expect, it } from 'vitest';
import { formatConceptLabel } from './conceptLabels';

describe('formatConceptLabel', () => {
  it('keeps an Indonesian-first label without duplicating an existing industry term', () => {
    expect(formatConceptLabel('peta alur kerja (workflow mapping)', 'workflow mapping'))
      .toBe('peta alur kerja (workflow mapping)');
  });

  it('appends the industry term when the plain label does not already name it', () => {
    expect(formatConceptLabel('batas keputusan manusia', 'human boundary'))
      .toBe('batas keputusan manusia (human boundary)');
  });
});
