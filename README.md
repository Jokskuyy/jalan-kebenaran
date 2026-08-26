# AGENT/16 — Client Solution Roadmap

[![CI](https://github.com/Jokskuyy/jalan-kebenaran/actions/workflows/ci.yml/badge.svg)](https://github.com/Jokskuyy/jalan-kebenaran/actions/workflows/ci.yml)

> **Bukan belajar coding dari nol. Belajar mengirim solusi agentic AI yang bisa dipercaya client.**

**[Open the live roadmap](https://jalan-kebenaran.vercel.app)**

![AGENT/16 social preview](public/og.png)

AGENT/16 is an interactive 16-week operating system for an informatics graduate targeting AI Engineer, AI Application Engineer, Agentic AI Developer, or AI Automation roles. It prioritizes the work clients actually need: discovery, architecture, integration, evaluation, reliability, safety, and measurable business outcomes. Python, FastAPI, SQL, Docker, and CI are treated as supporting delivery skills—not the destination.

## What this repository proves

- A client problem can be framed before a framework is selected.
- Agent actions can be bounded by typed contracts, state, permissions, and human approval.
- RAG quality can be evaluated with retrieval, citation, and abstention metrics.
- Business workflows can survive retries, duplicate events, and partial failures.
- Portfolio claims can be backed by evaluation reports, threat models, demos, and limitations.

## Product features

- Mission Control with start date, automatically calculated current week, progress, and next milestone.
- Clickable delivery loop: `Discover → Design → Orchestrate → Evaluate → Operate → Prove`.
- Sixteen execution weeks with tasks, evidence, quality gates, and copyable agent briefs.
- Filter-aware skill map that separates core capabilities from supporting engineering.
- Two scoped portfolio labs: **RegulaRAG ID** and **InvoiceOps Agent**.
- Job-ready evidence checklist, role radar, and weekly application cadence.
- Browser-only persistence with graceful recovery from corrupted local data.
- Keyboard-accessible controls, visible focus states, responsive layout, and reduced-motion support.

## Roadmap structure

| Weeks | Mission | Primary evidence |
| --- | --- | --- |
| 1–2 | Client problem framing and agent-fit assessment | Problem brief, workflow map, decision scorecard |
| 3–4 | Tool contracts and the agent control plane | Contract tests, state machine, failure matrix |
| 5–8 | RegulaRAG ID and evaluation | RAG demo, golden set, evaluation report, threat model |
| 9–13 | InvoiceOps Agent and operations | Typed integrations, approval queue, failure report, scorecard |
| 14–16 | Case studies, communication, interviews, applications | Two polished cases and a measurable job-search loop |

The typed source of truth lives in [`src/data/roadmap.ts`](src/data/roadmap.ts).

## Local development

Requirements: Node.js 22.13+ and pnpm 11.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Open `http://localhost:5173`.

## Validate the project

```bash
pnpm typecheck
pnpm test
pnpm build
```

The GitHub Actions workflow runs the same checks on every push and pull request. Roadmap structure and progress parsing are covered by unit tests.

## Deployment

The site is a React/Vite SPA hosted on Vercel. The repository is connected through the official GitHub–Vercel integration:

- Every branch and pull request receives a Preview Deployment.
- Merges to `main` update Production.
- Vercel builds with `pnpm build` and serves `dist`.
- [`vercel.json`](vercel.json) rewrites all routes to `index.html`, so direct refreshes do not return 404.

No deployment secret is stored in GitHub.

## Privacy and data

Progress is stored only in the visitor's browser under `agent16-progress:v1`. There is no account, backend, database, analytics payload, or client data. Resetting progress asks for confirmation.

The portfolio project specifications use public or synthetic data. Any benchmark or ROI claim produced while following this roadmap must be labeled as a simulation unless it comes from an authorized real-world engagement.

## License

[MIT](LICENSE)
