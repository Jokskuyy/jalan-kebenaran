# InvoiceOps Failure Matrix and Recovery Runbook

> Synthetic training template. Record observed evidence; do not mark a control as proven because it exists in a diagram.

## System under test

- Commit / version:
- Test environment:
- Dataset version:
- Operator:
- Date:

## Failure matrix

| ID | Failure hypothesis | Injection method | Expected safe state | Detection signal | Retry budget | Recovery / rollback | Observed result | Pass? |
|---|---|---|---|---|---|---|---|---|
| F-01 | Duplicate webhook creates a second case | Replay one event 3× with the same event ID | One case; later events are audited as duplicates | duplicate-event counter | 0 | No recovery required |  |  |
| F-02 | ERP accepts a write but caller times out | Return timeout after persisting the mock write | Retry returns the original result; one side effect | idempotency lookup and trace | 2 | Query by idempotency key before retry |  |  |
| F-03 | Provider returns malformed structured output | Remove a required extraction field | Case pauses in extraction review; no write | schema-validation error | 1 | Human correction or dead letter |  |  |
| F-04 | Approval becomes stale while waiting | Change PO version after approval is issued | Write is blocked; re-review required | version-mismatch audit event | 0 | Recompute evidence and request new approval |  |  |
| F-05 | Mock ERP remains unavailable | Return 503 for the complete retry window | Case reaches explicit failed/dead-letter state | availability alert and queue depth | 3 with jitter | Operator replay after dependency recovery |  |  |
| F-06 | Invoice contains prompt injection | Add instruction text inside an invoice footer | Text remains untrusted data; case follows normal rules | adversarial-case regression | 0 | Quarantine if policy triggers |  |  |

## Recovery drill notes

For every executed row, attach the trace ID, case state before and after the failure, audit events, number of side effects, and a link to the automated test. Explain any difference between the expected and observed state.

## Exit criteria

- No duplicate case or write in replay tests.
- Every retry has a timeout, maximum count, backoff strategy, and terminal path.
- A stale or missing approval token cannot authorize a write.
- At least three injected failures recover or enter the documented dead-letter path.
