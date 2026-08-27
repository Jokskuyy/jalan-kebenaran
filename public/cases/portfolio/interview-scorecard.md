# AI Solution Delivery Interview Scorecard

> Use this with RegulaRAG ID and InvoiceOps Agent. Ask the candidate to answer in working English, then give feedback in Bahasa Indonesia if useful.

Score each criterion from 0–2: **0** absent/unsafe, **1** partial, **2** clear and evidence-backed.

| Criterion | Score | Evidence heard | Revision target |
|---|---:|---|---|
| Starts from client problem and baseline—not technology |  |  |  |
| Explains architecture through constraints and alternatives |  |  |  |
| Defines tool, state, permission, and human-approval boundaries |  |  |  |
| Explains evaluation dataset, metrics, slices, and limitations |  |  |  |
| Identifies the first likely failure and its detection signal |  |  |  |
| Gives a credible recovery, rollback, and operating plan |  |  |  |
| Connects technical evidence to qualified business impact |  |  |  |
| Communicates concisely in working English without hiding in jargon |  |  |  |

## Constraint-change probes

1. The client cuts the latency budget in half. What changes first, and what evidence would you gather?
2. The corpus doubles and contains conflicting versions. How does retrieval and evaluation change?
3. A reviewer approval may wait 24 hours. How do you prevent stale authorization?
4. Model cost doubles. Which calls are essential, cached, deterministic, or removable?
5. A red-team case passes the happy-path test. How do you contain and regress it?

## STAR story bank

Prepare six short stories: ambiguous problem, rejected complexity, evaluation failure, safety boundary, production-style incident, and stakeholder disagreement. For each, record Situation, Task, Action, Result, evidence, and what you would change.
