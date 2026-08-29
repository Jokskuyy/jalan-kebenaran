function normalizeConceptLabel(value: string) {
  return value
    .normalize('NFKD')
    .toLocaleLowerCase('id-ID')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export function formatConceptLabel(plainConcept: string, concept: string) {
  const plain = plainConcept.trim();
  const canonical = concept.trim();
  const plainNormalized = normalizeConceptLabel(plain);
  const canonicalNormalized = normalizeConceptLabel(canonical);
  const alreadyNamesCanonical = ` ${plainNormalized} `.includes(` ${canonicalNormalized} `);

  if (!canonical || plainNormalized === canonicalNormalized || alreadyNamesCanonical) {
    return plain;
  }

  return `${plain} (${canonical})`;
}
