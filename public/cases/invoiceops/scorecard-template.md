# InvoiceOps Operating Scorecard

> Synthetic training template. Label every result as simulated. Do not represent this scorecard as a real client outcome.

## Evaluation identity

- System version:
- Dataset version and split:
- Evaluation date:
- Baseline period / method:
- Known limitations:

## Quality

| Metric | Formula | Slice | Baseline | Result | Target | Evidence |
|---|---|---|---:|---:|---:|---|
| Required-field accuracy | correct required fields / labeled required fields | overall + scan quality |  |  |  |  |
| Exception routing precision | correct routed exceptions / all routed exceptions | exception code |  |  |  |  |
| Exception routing recall | correct routed exceptions / all labeled exceptions | exception code |  |  |  |  |
| Safe escalation rate | correctly escalated risky cases / risky cases | low confidence + auth + security |  |  |  |  |

## Reliability and safety

| Metric | Formula | Result | Target | Evidence |
|---|---|---:|---:|---|
| Duplicate side effects | duplicate writes after replay |  | 0 |  |
| Unauthorized writes | writes without valid approval and permission |  | 0 |  |
| Recovery success | recovered or dead-lettered injected failures / injected failures |  |  |  |
| Audit completeness | required audit events present / expected events |  |  |  |

## Operations

| Metric | p50 | p95 | Unit | Measurement boundary |
|---|---:|---:|---|---|
| End-to-end latency |  |  | seconds | intake to proposed route |
| Model cost |  |  | USD/case | all model calls in one case |
| Human touches |  |  | touches/case | simulated reviewer actions |

## Simulated impact model

Document the manual baseline, eligible case volume, automation/escalation rate, time assumptions, loaded labor-rate assumption, and formula. Present a range and sensitivity analysis—not one confident number. Explicitly state that the result is a synthetic estimate, not verified savings.

## Decision and next experiment

- What is safe to pilot?
- What remains human-only?
- Which failure slice blocks release?
- What two-week experiment would reduce the largest uncertainty?
