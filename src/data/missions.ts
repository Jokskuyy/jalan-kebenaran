export type CaseId = 'regularag' | 'invoiceops';

export type LearningResource = {
  id: string;
  title: string;
  provider: string;
  url: string;
  minutes: number;
  why: string;
};

export type StarterAsset = {
  label: string;
  path: string;
  kind: 'brief' | 'data' | 'template';
  description: string;
};

export type RubricItem = {
  id: string;
  label: string;
  passCondition: string;
};

export type MissionDeliverable = {
  title: string;
  language: 'English' | 'Mixed';
  format: string;
  sections: string[];
};

export type WeeklyMission = {
  caseIds: CaseId[];
  context: string;
  rawEvidence: string[];
  resources: LearningResource[];
  starterAssets: StarterAsset[];
  deliverable: MissionDeliverable;
  rubric: RubricItem[];
  coachRole: string;
  coachFocus: string[];
};

export type CaseDossier = {
  id: CaseId;
  title: string;
  client: string;
  label: string;
  brief: string;
  facts: string[];
  constraints: string[];
  weeks: string;
};

export const caseDossiers: Record<CaseId, CaseDossier> = {
  regularag: {
    id: 'regularag',
    title: 'RegulaRAG ID',
    client: 'PT Arunika Digital Nusantara',
    label: 'SYNTHETIC FINTECH · KNOWLEDGE SYSTEM',
    brief: 'Head of Compliance Operations meminta “AI chatbot regulasi” karena jawaban untuk tim operasional lambat, sumbernya tersebar, dan senior analyst menjadi bottleneck.',
    facts: [
      '12 compliance dan operations specialists menangani sekitar 45 pertanyaan internal per minggu.',
      'Corpus awal terdiri dari sekitar 220 dokumen publik dan 35 SOP internal sintetis.',
      'Waktu jawab yang dilaporkan berkisar 15–90 menit dan sumber tidak selalu dicatat.',
      'Belum ada query log yang konsisten, version owner, atau quality baseline.',
    ],
    constraints: [
      'Demo hanya boleh memakai regulasi publik dan SOP sintetis.',
      'Jawaban bukan legal advice dan interpretasi tetap membutuhkan approval manusia.',
      'Setiap factual claim wajib punya page-level evidence atau sistem harus abstain.',
      'Teks dokumen adalah untrusted input dan tidak boleh mengubah system policy.',
    ],
    weeks: 'W01—W08',
  },
  invoiceops: {
    id: 'invoiceops',
    title: 'InvoiceOps Agent',
    client: 'PT Sembada Distribusi Indonesia',
    label: 'SYNTHETIC DISTRIBUTOR · OPERATIONAL AGENT',
    brief: 'Finance Operations ingin mengurangi waktu pencocokan invoice, purchase order, dan goods receipt tanpa memberi model wewenang untuk menghitung pajak atau melakukan pembayaran.',
    facts: [
      'Enam staf AP memproses sekitar 2.400 invoice sintetis per bulan dari 85 vendor.',
      'Kasus normal membutuhkan 8–12 menit; exception dapat memakan 25–50 menit.',
      'Duplicate upload, missing PO, quantity mismatch, dan scan buruk adalah failure umum.',
      'Workflow saat ini tersebar di email, spreadsheet, dan mock ERP tanpa audit trail terpadu.',
    ],
    constraints: [
      'Business calculation harus deterministic dan diuji sebagai pure rules.',
      'Tidak ada write action tanpa approval token dan idempotency key.',
      'Low-confidence extraction selalu masuk reviewer queue.',
      'Semua invoice, vendor, PO, dan receipt adalah data sintetis.',
    ],
    weeks: 'W09—W13',
  },
};

const resources = {
  discovery: {
    id: 'google-pair-user-needs',
    title: 'User Needs + Defining Success',
    provider: 'Google PAIR',
    url: 'https://pair.withgoogle.com/chapter/user-needs/',
    minutes: 25,
    why: 'Menghubungkan kebutuhan pengguna, failure cost, dan ukuran sukses sebelum memilih solusi.',
  },
  measuring: {
    id: 'google-pair-worksheets',
    title: 'User Needs Worksheet',
    provider: 'Google PAIR',
    url: 'https://pair.withgoogle.com/worksheet/People%20%2B%20AI%20Guidebook%20-%20All%20Worksheets.pdf',
    minutes: 20,
    why: 'Memberi struktur untuk mengubah interview notes menjadi kebutuhan, asumsi, dan success criteria.',
  },
  agentGuide: {
    id: 'openai-agent-guide',
    title: 'A practical guide to building AI agents',
    provider: 'OpenAI',
    url: 'https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/',
    minutes: 30,
    why: 'Membandingkan agent dengan workflow yang lebih deterministic dan sederhana.',
  },
  structuredOutputs: {
    id: 'openai-structured-outputs',
    title: 'Structured model outputs',
    provider: 'OpenAI API Docs',
    url: 'https://developers.openai.com/api/docs/guides/structured-outputs',
    minutes: 25,
    why: 'Menjadikan output model kontrak yang bisa divalidasi sistem lain.',
  },
  functionCalling: {
    id: 'openai-function-calling',
    title: 'Function calling',
    provider: 'OpenAI API Docs',
    url: 'https://developers.openai.com/api/docs/guides/function-calling',
    minutes: 25,
    why: 'Memahami schema, tool boundary, dan error path sebelum menulis prompt.',
  },
  agents: {
    id: 'openai-running-agents',
    title: 'Running agents',
    provider: 'OpenAI Agents SDK',
    url: 'https://openai.github.io/openai-agents-python/running_agents/',
    minutes: 25,
    why: 'Memetakan tools, control flow, dan guardrails sebagai satu sistem.',
  },
  retrieval: {
    id: 'openai-retrieval',
    title: 'Retrieval',
    provider: 'OpenAI API Docs',
    url: 'https://developers.openai.com/api/docs/guides/retrieval',
    minutes: 30,
    why: 'Memahami ingestion, semantic search, attributes, dan result ranking.',
  },
  evals: {
    id: 'stanford-unranked-retrieval',
    title: 'Evaluation of unranked retrieval sets',
    provider: 'Stanford IR Book',
    url: 'https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-of-unranked-retrieval-sets-1.html',
    minutes: 20,
    why: 'Memahami precision dan recall dari definisi, bukan sekadar membaca angka dari library.',
  },
  evalPractice: {
    id: 'openai-eval-practice',
    title: 'Evaluation best practices',
    provider: 'OpenAI API Docs',
    url: 'https://developers.openai.com/api/docs/guides/evaluation-best-practices',
    minutes: 25,
    why: 'Mencegah test set lemah, metric vanity, dan klaim yang tidak terdukung.',
  },
  promptInjection: {
    id: 'owasp-prompt-injection',
    title: 'LLM Prompt Injection Prevention Cheat Sheet',
    provider: 'OWASP Cheat Sheet Series',
    url: 'https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html',
    minutes: 20,
    why: 'Mengenali indirect injection dan batas antara instruction dengan data.',
  },
  traces: {
    id: 'openai-agent-tracing',
    title: 'Tracing',
    provider: 'OpenAI Agents SDK',
    url: 'https://openai.github.io/openai-agents-python/tracing/',
    minutes: 20,
    why: 'Memahami span, context, dan hubungan antar-step dalam satu agent run.',
  },
  bpmn: {
    id: 'microsoft-process-mining',
    title: 'Overview of process mining',
    provider: 'Microsoft Learn',
    url: 'https://learn.microsoft.com/en-us/power-automate/process-mining-overview',
    minutes: 25,
    why: 'Memetakan event, decision, exception, dan terminal state secara eksplisit.',
  },
  pydantic: {
    id: 'pydantic-models',
    title: 'Pydantic models',
    provider: 'Pydantic Docs',
    url: 'https://pydantic.dev/docs/validation/latest/concepts/models/',
    minutes: 25,
    why: 'Membuat typed contract dan validation boundary di Python.',
  },
  fastapi: {
    id: 'fastapi-nested-models',
    title: 'Body — Nested Models',
    provider: 'FastAPI Docs',
    url: 'https://fastapi.tiangolo.com/tutorial/body-nested-models/',
    minutes: 20,
    why: 'Menghubungkan typed schema ke HTTP tool contract yang dapat diuji.',
  },
  n8nWebhook: {
    id: 'n8n-webhook',
    title: 'Webhook node',
    provider: 'n8n Docs',
    url: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/',
    minutes: 20,
    why: 'Menjadikan n8n integration edge, bukan tempat menyembunyikan business logic.',
  },
  humanApproval: {
    id: 'openai-human-loop',
    title: 'Human-in-the-loop',
    provider: 'OpenAI Agents SDK',
    url: 'https://openai.github.io/openai-agents-python/human_in_the_loop/',
    minutes: 25,
    why: 'Mendesain pause, review, approval, dan resume secara eksplisit.',
  },
  retries: {
    id: 'google-cloud-retries',
    title: 'Retry strategy',
    provider: 'Google Cloud Docs',
    url: 'https://docs.cloud.google.com/storage/docs/retry-strategy',
    minutes: 25,
    why: 'Mendesain retry yang terbatas, idempotent, dan tidak memperparah dependency failure.',
  },
  idempotency: {
    id: 'stripe-idempotency',
    title: 'Idempotent requests',
    provider: 'Stripe Docs',
    url: 'https://docs.stripe.com/api/idempotent_requests',
    minutes: 15,
    why: 'Memastikan retry atau duplicate webhook tidak membuat side effect kedua.',
  },
  readmes: {
    id: 'github-readmes',
    title: 'About READMEs',
    provider: 'GitHub Docs',
    url: 'https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes',
    minutes: 15,
    why: 'Menyusun entry point portfolio yang cepat dipahami reviewer.',
  },
  technicalWriting: {
    id: 'google-tech-writing-documents',
    title: 'Documents',
    provider: 'Google for Developers',
    url: 'https://developers.google.com/tech-writing/one/documents',
    minutes: 35,
    why: 'Membuat penjelasan arsitektur dan trade-off lebih ringkas serta presisi.',
  },
  githubProfile: {
    id: 'github-profile-resume',
    title: 'Using your GitHub profile to enhance your resume',
    provider: 'GitHub Docs',
    url: 'https://docs.github.com/en/account-and-profile/tutorials/using-your-github-profile-to-enhance-your-resume',
    minutes: 15,
    why: 'Menyusun bukti kerja agar mudah ditemukan recruiter dari halaman profil.',
  },
  feedbackControl: {
    id: 'google-pair-feedback-control', title: 'Feedback + Control', provider: 'Google PAIR',
    url: 'https://pair.withgoogle.com/guidebook-v2/chapter/feedback-controls/', minutes: 20,
    why: 'Menentukan kapan user perlu mengoreksi, mengendalikan, atau menghentikan sistem AI.',
  },
  gracefulFailure: {
    id: 'google-pair-graceful-failure', title: 'Errors + Graceful Failure', provider: 'Google PAIR',
    url: 'https://pair.withgoogle.com/chapter/errors-failing/', minutes: 20,
    why: 'Mendesain error state yang membantu user pulih tanpa menyembunyikan ketidakpastian.',
  },
  pgvector: {
    id: 'pgvector', title: 'pgvector', provider: 'pgvector',
    url: 'https://github.com/pgvector/pgvector', minutes: 20,
    why: 'Memahami baseline vector search, indexing, distance, dan filtering dari implementasi primernya.',
  },
  rankedRetrieval: {
    id: 'stanford-ranked-retrieval', title: 'Evaluation of ranked retrieval results', provider: 'Stanford IR Book',
    url: 'https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-of-ranked-retrieval-results-1.html', minutes: 20,
    why: 'Mengukur kualitas ranking dan memahami mengapa posisi evidence memengaruhi hasil.',
  },
  ragSecurity: {
    id: 'owasp-rag-security', title: 'RAG Security Cheat Sheet', provider: 'OWASP Cheat Sheet Series',
    url: 'https://cheatsheetseries.owasp.org/cheatsheets/RAG_Security_Cheat_Sheet.html', minutes: 25,
    why: 'Memetakan ancaman ingestion, retrieval, access control, dan knowledge-base poisoning.',
  },
  redTeaming: {
    id: 'openai-red-teaming', title: 'Red teaming', provider: 'OpenAI API Docs',
    url: 'https://developers.openai.com/api/docs/guides/red-teaming', minutes: 20,
    why: 'Mengubah threat hypothesis menjadi repeatable adversarial evaluation.',
  },
  latency: {
    id: 'openai-latency', title: 'Latency optimization', provider: 'OpenAI API Docs',
    url: 'https://developers.openai.com/api/docs/guides/latency-optimization', minutes: 20,
    why: 'Membaca trace sebagai dasar mengurangi critical-path latency.',
  },
  cost: {
    id: 'openai-cost', title: 'Cost optimization', provider: 'OpenAI API Docs',
    url: 'https://developers.openai.com/api/docs/guides/cost-optimization', minutes: 20,
    why: 'Mengurangi biaya berdasarkan workload dan measurement, bukan tebakan.',
  },
  authorization: {
    id: 'owasp-authorization', title: 'Authorization Cheat Sheet', provider: 'OWASP Cheat Sheet Series',
    url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html', minutes: 25,
    why: 'Memisahkan identitas, permission, approval, dan least privilege pada workflow finansial.',
  },
  sessions: {
    id: 'openai-agent-sessions', title: 'Sessions', provider: 'OpenAI Agents SDK',
    url: 'https://openai.github.io/openai-agents-python/sessions/', minutes: 20,
    why: 'Memahami state persistence dan resume boundary tanpa mengandalkan hidden chat history.',
  },
  logging: {
    id: 'owasp-logging', title: 'Logging Cheat Sheet', provider: 'OWASP Cheat Sheet Series',
    url: 'https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html', minutes: 20,
    why: 'Mendesain audit event yang berguna tanpa membocorkan secret atau sensitive payload.',
  },
  deadLetter: {
    id: 'aws-sqs-dlq', title: 'Using dead-letter queues in Amazon SQS', provider: 'AWS Docs',
    url: 'https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html', minutes: 20,
    why: 'Memberi terminal path dan recovery workflow untuk message yang gagal diproses.',
  },
  signals: {
    id: 'otel-signals', title: 'Signals', provider: 'OpenTelemetry',
    url: 'https://opentelemetry.io/docs/concepts/signals/', minutes: 20,
    why: 'Menghubungkan traces, metrics, dan logs ke operating scorecard.',
  },
  adr: {
    id: 'azure-adr', title: 'Maintain an architecture decision record', provider: 'Microsoft Azure Well-Architected',
    url: 'https://learn.microsoft.com/en-us/azure/well-architected/architect-role/architecture-decision-record', minutes: 20,
    why: 'Mendokumentasikan constraint, alternatives, decision, dan consequence yang dapat direview.',
  },
  c4: {
    id: 'c4-diagrams', title: 'C4 diagrams', provider: 'C4 model',
    url: 'https://c4model.com/diagrams', minutes: 20,
    why: 'Memilih level diagram yang dapat dipahami recruiter dan technical reviewer.',
  },
  audience: {
    id: 'google-tech-writing-audience', title: 'Audience', provider: 'Google for Developers',
    url: 'https://developers.google.com/tech-writing/one/audience', minutes: 20,
    why: 'Menyesuaikan detail dan bahasa untuk recruiter, engineer, serta client stakeholder.',
  },
  star: {
    id: 'uk-star-method', title: 'The STAR method', provider: 'UK National Careers Service',
    url: 'https://nationalcareers.service.gov.uk/careers-advice/interview-advice/the-star-method', minutes: 15,
    why: 'Mengubah pengalaman delivery menjadi jawaban yang ringkas, spesifik, dan berbukti.',
  },
  profileReadme: {
    id: 'github-profile-readme', title: 'Managing your profile README', provider: 'GitHub Docs',
    url: 'https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme', minutes: 15,
    why: 'Mengarahkan recruiter dari profil ke dua case study dan bukti terkuat.',
  },
} satisfies Record<string, LearningResource>;

const regularag = {
  brief: { label: 'Synthetic client brief', path: '/cases/regularag/client-brief.md', kind: 'brief', description: 'Permintaan awal client, scope, dan constraint.' },
  interviews: { label: 'Interview notes', path: '/cases/regularag/interview-notes.md', kind: 'brief', description: 'Catatan sponsor, analyst, risk, dan IT.' },
  workflow: { label: 'Workflow log', path: '/cases/regularag/workflow-log.csv', kind: 'data', description: 'Sample event untuk menghitung baseline.' },
  inventory: { label: 'Document inventory', path: '/cases/regularag/document-inventory.csv', kind: 'data', description: 'Metadata corpus publik dan sintetis.' },
  questions: { label: 'Golden questions starter', path: '/cases/regularag/golden-questions-starter.csv', kind: 'data', description: 'Answerable, unanswerable, dan adversarial cases.' },
  problemTemplate: { label: 'Problem brief template', path: '/cases/regularag/problem-brief-template.md', kind: 'template', description: 'Struktur artifact discovery W01.' },
  fitTemplate: { label: 'Agent-fit scorecard', path: '/cases/regularag/agent-fit-scorecard-template.md', kind: 'template', description: 'Perbandingan rules, automation, RAG, dan agent.' },
  contractTemplate: { label: 'Tool contract template', path: '/cases/regularag/tool-contract-template.json', kind: 'template', description: 'Input, output, dan explicit error states.' },
  threatTemplate: { label: 'Threat model template', path: '/cases/regularag/threat-model-template.md', kind: 'template', description: 'Assets, boundaries, abuse paths, dan mitigations.' },
  evalTemplate: { label: 'Evaluation report template', path: '/cases/regularag/evaluation-report-template.md', kind: 'template', description: 'Baseline, method, results, dan limitations.' },
} satisfies Record<string, StarterAsset>;

const invoiceops = {
  brief: { label: 'Synthetic client brief', path: '/cases/invoiceops/client-brief.md', kind: 'brief', description: 'Volume, pain, scope, dan non-negotiable rules.' },
  process: { label: 'Process notes', path: '/cases/invoiceops/process-notes.md', kind: 'brief', description: 'Raw notes dari AP, finance controller, dan IT.' },
  scenarios: { label: 'Invoice scenarios starter', path: '/cases/invoiceops/invoice-scenarios-starter.csv', kind: 'data', description: 'Normal, exception, duplicate, dan adversarial cases.' },
  permissions: { label: 'Permission matrix', path: '/cases/invoiceops/permission-matrix.csv', kind: 'data', description: 'Read, propose, approve, dan write boundaries.' },
  taxonomy: { label: 'Exception taxonomy starter', path: '/cases/invoiceops/exception-taxonomy-starter.csv', kind: 'data', description: 'Expected route, owner, dan terminal state.' },
  failureTemplate: { label: 'Failure matrix template', path: '/cases/invoiceops/failure-matrix-template.md', kind: 'template', description: 'Injection, recovery, dan rollback plan.' },
  scorecardTemplate: { label: 'Scorecard template', path: '/cases/invoiceops/scorecard-template.md', kind: 'template', description: 'Quality, latency, cost, risk, dan simulated ROI.' },
} satisfies Record<string, StarterAsset>;

const portfolio = {
  caseStudy: { label: 'Client case-study template', path: '/cases/portfolio/case-study-template.md', kind: 'template', description: 'Problem, constraint, decision, evidence, dan limitation.' },
  interview: { label: 'Interview scorecard', path: '/cases/portfolio/interview-scorecard.md', kind: 'template', description: 'System-design dan English explanation rubric.' },
  funnel: { label: 'Application funnel template', path: '/cases/portfolio/application-funnel-template.csv', kind: 'template', description: 'Target, stage, signal, dan next experiment.' },
} satisfies Record<string, StarterAsset>;

function rubric(id: string, label: string, passCondition: string): RubricItem {
  return { id, label, passCondition };
}

export const weeklyMissions: Record<number, WeeklyMission> = {
  1: {
    caseIds: ['regularag'],
    context: 'Client meminta “AI chatbot regulasi”, tetapi belum ada problem definition, reliable baseline, atau decision owner.',
    rawEvidence: [
      'Manager memperkirakan jawaban “sekitar satu jam”, tetapi sample workflow menunjukkan variasi 15–90 menit.',
      'Analyst memakai Drive search, bookmark pribadi, dan bertanya ke senior analyst.',
      'Beberapa jawaban tidak memiliki source attachment dan request yang sama dapat dibuka ulang.',
    ],
    resources: [resources.discovery, resources.measuring],
    starterAssets: [regularag.brief, regularag.interviews, regularag.workflow, regularag.problemTemplate],
    deliverable: {
      title: 'RegulaRAG one-page problem brief', language: 'Mixed', format: 'Markdown + Mermaid process map',
      sections: ['Business problem', 'Users and as-is workflow', 'Baseline KPI and data source', 'Constraints and non-goals', 'Assumptions and open questions', 'Decision owners'],
    },
    rubric: [
      rubric('w1-problem', 'Problem before solution', 'Problem statement tidak menyebut AI, RAG, model, atau framework.'),
      rubric('w1-evidence', 'Evidence traceability', 'Setiap baseline punya formula, sample, dan sumber data.'),
      rubric('w1-owner', 'Operational ownership', 'Setiap handoff dan keputusan memiliki owner.'),
      rubric('w1-scope', 'Scope discipline', 'Constraints, non-goals, dan unknowns dipisahkan dengan jelas.'),
    ],
    coachRole: 'client-discovery coach dan solution architect reviewer',
    coachFocus: ['hidden assumptions', 'unmeasurable KPI', 'missing workflow owner', 'premature AI solutioning'],
  },
  2: {
    caseIds: ['regularag'],
    context: 'Problem brief sudah tersedia. Client perlu keputusan apakah pain ini membutuhkan rules, search, RAG assistant, atau tool-using agent.',
    rawEvidence: ['Mayoritas kebutuhan adalah menemukan policy yang tepat.', 'Interpretasi dan policy exception tetap milik manusia.', 'Corpus berubah setiap bulan dan sumber wajib ditampilkan.'],
    resources: [resources.agentGuide, resources.feedbackControl],
    starterAssets: [regularag.brief, regularag.interviews, regularag.fitTemplate],
    deliverable: { title: 'Agent-fit assessment', language: 'English', format: 'Decision memo + weighted scorecard', sections: ['Options', 'Decision criteria', 'Scores and evidence', 'Recommended approach', 'Human boundary', 'Rejected complexity'] },
    rubric: [rubric('w2-options', 'Real alternatives', 'Rules, automation, search/RAG, dan agent dibandingkan secara adil.'), rubric('w2-boundary', 'Human boundary', 'Interpretation dan exception approval tetap eksplisit di manusia.'), rubric('w2-tradeoff', 'Evidence-based trade-off', 'Cost, latency, reliability, dan risk punya alasan yang dapat diuji.')],
    coachRole: 'skeptical architecture review board',
    coachFocus: ['when not to use an LLM', 'unnecessary agency', 'hidden operating cost'],
  },
  3: {
    caseIds: ['regularag'],
    context: 'RegulaRAG dipilih sebagai evidence-grounded assistant. Sebelum prompting, retrieval dan citation tools membutuhkan kontrak ketat.',
    rawEvidence: ['Document inventory memiliki version, status, page, dan authority metadata.', 'Missing evidence harus menjadi explicit error state.', 'Caller membutuhkan machine-readable citation records.'],
    resources: [resources.structuredOutputs, resources.functionCalling, resources.pydantic],
    starterAssets: [regularag.inventory, regularag.contractTemplate],
    deliverable: { title: 'Typed retrieval tool contract', language: 'English', format: 'JSON Schema + contract tests', sections: ['Input schema', 'Success output', 'Error union', 'Validation rules', 'Audit fields', 'Negative tests'] },
    rubric: [rubric('w3-invalid', 'Fail closed', 'Malformed atau incomplete output tidak diteruskan.'), rubric('w3-errors', 'Explicit errors', 'No evidence, timeout, invalid filter, dan dependency failure berbeda.'), rubric('w3-audit', 'Auditability', 'Document, page, query, dan trace identifiers dapat ditelusuri.')],
    coachRole: 'strict API and tool-contract reviewer',
    coachFocus: ['ambiguous fields', 'unsafe defaults', 'missing error states', 'unauditable output'],
  },
  4: {
    caseIds: ['regularag'],
    context: 'Tool contracts ada. Sekarang batasi state, retries, terminal states, dan approval sebelum assistant dipakai.',
    rawEvidence: ['Retrieval dapat timeout atau mengembalikan zero evidence.', 'User dapat meminta interpretasi di luar corpus.', 'Run harus berhenti sebelum melakukan action yang bukan read-only.'],
    resources: [resources.agents, resources.humanApproval, resources.gracefulFailure],
    starterAssets: [regularag.brief, regularag.contractTemplate, regularag.threatTemplate],
    deliverable: { title: 'RegulaRAG control-plane ADR', language: 'English', format: 'ADR + state diagram + failure matrix', sections: ['Decision', 'State machine', 'Permission boundary', 'Retry budget', 'Escalation', 'Rollback'] },
    rubric: [rubric('w4-terminal', 'Terminal states', 'Success, abstain, escalation, dan failed states tidak ambigu.'), rubric('w4-budget', 'Bounded execution', 'Timeout, retry, dan maximum steps mempunyai angka.'), rubric('w4-approval', 'Approval integrity', 'Semua non-read side effect diblokir atau meminta approval.')],
    coachRole: 'agent control-plane red-team reviewer',
    coachFocus: ['infinite loop', 'retry storm', 'excessive agency', 'approval bypass'],
  },
  5: {
    caseIds: ['regularag'],
    context: 'Architecture disepakati. Bangun ingestion dan retrieval baseline yang sederhana sebelum hybrid search atau reranking.',
    rawEvidence: ['Corpus mencampur dokumen aktif, superseded, table-heavy, dan OCR-required.', 'Setiap chunk harus kembali ke source document dan page.', 'Golden set harus memuat answerable dan unanswerable questions.'],
    resources: [resources.retrieval, resources.pgvector],
    starterAssets: [regularag.inventory, regularag.questions, regularag.evalTemplate],
    deliverable: { title: 'RegulaRAG baseline repository', language: 'English', format: 'Runnable code + data manifest + baseline note', sections: ['Ingestion', 'Chunking decision', 'Metadata', 'Retrieval baseline', 'Golden set', 'Known limitations'] },
    rubric: [rubric('w5-lineage', 'Source lineage', 'Setiap chunk menyimpan document, version, dan page.'), rubric('w5-repeat', 'Repeatable ingestion', 'Re-ingest tidak membuat duplicate chunk.'), rubric('w5-baseline', 'Honest baseline', 'Vector-only result dicatat sebelum optimasi.')],
    coachRole: 'retrieval engineering reviewer',
    coachFocus: ['lost metadata', 'duplicate chunks', 'context fragmentation', 'unversioned corpus'],
  },
  6: {
    caseIds: ['regularag'],
    context: 'Baseline berjalan. Sekarang bandingkan retrieval variants dengan golden labels dan metric yang dapat direproduksi.',
    rawEvidence: ['Golden starter memuat direct, multi-document, unanswerable, dan adversarial questions.', 'Client peduli source correctness, bukan jawaban yang terdengar yakin.', 'Result perlu dibandingkan pada dataset yang sama.'],
    resources: [resources.evals, resources.rankedRetrieval, resources.evalPractice],
    starterAssets: [regularag.questions, regularag.evalTemplate, regularag.inventory],
    deliverable: { title: 'Retrieval evaluation notebook and report', language: 'English', format: 'Jupyter notebook + Markdown report', sections: ['Dataset', 'Baseline', 'Variants', 'Recall@k', 'Citation precision', 'Error analysis'] },
    rubric: [rubric('w6-label', 'Independent labels', 'Gold relevance ditetapkan sebelum melihat final result.'), rubric('w6-compare', 'Controlled comparison', 'Variants memakai corpus, queries, dan sampling yang sama.'), rubric('w6-errors', 'Error analysis', 'Metric disertai contoh false positive dan false negative.')],
    coachRole: 'RAG evaluation scientist',
    coachFocus: ['test leakage', 'weak labels', 'vanity metrics', 'unsupported quality claims'],
  },
  7: {
    caseIds: ['regularag'],
    context: 'Retrieval membaik, tetapi dokumen dan pertanyaan sekarang diperlakukan sebagai adversarial input.',
    rawEvidence: ['Satu synthetic SOP berisi instruksi untuk mengabaikan system policy.', 'Beberapa questions tidak punya evidence di corpus.', 'User mencoba meminta dokumen di luar allowed collection.'],
    resources: [resources.ragSecurity, resources.promptInjection, resources.redTeaming],
    starterAssets: [regularag.questions, regularag.threatTemplate, regularag.brief],
    deliverable: { title: 'RegulaRAG threat model and adversarial suite', language: 'English', format: 'Threat model + regression dataset', sections: ['Assets', 'Trust boundaries', 'Attacker capabilities', 'Abuse paths', 'Mitigations', 'Regression results'] },
    rubric: [rubric('w7-boundary', 'Trust boundaries', 'Document text tidak pernah menjadi trusted instruction.'), rubric('w7-abstain', 'Safe abstention', 'Unsupported questions ditolak tanpa fabricated source.'), rubric('w7-regress', 'Regression evidence', 'Mitigations diuji pada repeatable adversarial cases.')],
    coachRole: 'application-security threat modeler',
    coachFocus: ['indirect prompt injection', 'data exfiltration', 'policy conflict', 'false confidence'],
  },
  8: {
    caseIds: ['regularag'],
    context: 'RegulaRAG harus dipaketkan sebagai client evidence: demo, trace, cost, quality report, dan honest limitations.',
    rawEvidence: ['Stakeholder punya waktu lima menit untuk memahami nilai sistem.', 'P95 latency dan cost per query belum terlihat di README.', 'Normal flow saja tidak membuktikan abstention atau recovery.'],
    resources: [resources.traces, resources.latency, resources.cost],
    starterAssets: [regularag.evalTemplate, regularag.threatTemplate, portfolio.caseStudy],
    deliverable: { title: 'RegulaRAG delivery packet', language: 'English', format: 'Live demo + README + case study + video', sections: ['Problem', 'Architecture', 'Evaluation', 'Failure demo', 'Cost and latency', 'Limitations'] },
    rubric: [rubric('w8-run', 'Reproducible', 'Fresh clone menjalankan demo dan eval.'), rubric('w8-proof', 'Claims have evidence', 'Setiap claim menunjuk metric, dataset, atau trace.'), rubric('w8-limit', 'Honest limitations', 'Known failures dan non-goals mudah ditemukan.')],
    coachRole: 'prospective client and technical due-diligence reviewer',
    coachFocus: ['unsupported claims', 'hidden limitation', 'unclear value', 'demo-only reliability'],
  },
  9: {
    caseIds: ['invoiceops'],
    context: 'Finance meminta automation untuk invoice matching. Mulai dari process dan exception taxonomy, bukan agent framework.',
    rawEvidence: ['Normal case dan exception sekarang bercampur di inbox yang sama.', 'Tax dan tolerance rules sudah ada tetapi tidak terdokumentasi konsisten.', 'Payment approval hanya boleh dilakukan finance controller.'],
    resources: [resources.bpmn, resources.authorization],
    starterAssets: [invoiceops.brief, invoiceops.process, invoiceops.taxonomy],
    deliverable: { title: 'InvoiceOps process and exception map', language: 'Mixed', format: 'BPMN/Mermaid + exception taxonomy', sections: ['As-is flow', 'States', 'Exceptions', 'Owner', 'Human decisions', 'Baseline KPI'] },
    rubric: [rubric('w9-terminal', 'Terminal ownership', 'Setiap exception punya owner dan terminal state.'), rubric('w9-rules', 'Rules vs judgment', 'Calculation rules dipisahkan dari model judgment.'), rubric('w9-risk', 'Financial boundary', 'Agent tidak dapat approve atau execute payment.')],
    coachRole: 'finance operations discovery reviewer',
    coachFocus: ['missing exception', 'overlapping category', 'ownerless state', 'unsafe financial decision'],
  },
  10: {
    caseIds: ['invoiceops'],
    context: 'Process map stabil. Bangun mock ERP tools dan deterministic reconciliation rules dengan typed HTTP boundaries.',
    rawEvidence: ['Invoice dapat datang ulang lewat email dan webhook.', 'PO total, tax, dan receipt quantity adalah deterministic evidence.', 'n8n hanya boleh menerima event dan memanggil service API.'],
    resources: [resources.functionCalling, resources.fastapi, resources.n8nWebhook],
    starterAssets: [invoiceops.scenarios, invoiceops.permissions, invoiceops.taxonomy],
    deliverable: { title: 'InvoiceOps integration layer', language: 'English', format: 'FastAPI tools + pure rules + contract tests', sections: ['Tool schemas', 'Mock ERP', 'Deterministic rules', 'Webhook boundary', 'Errors', 'Tests'] },
    rubric: [rubric('w10-pure', 'Deterministic math', 'Model tidak menghitung total, tax, atau tolerance.'), rubric('w10-contract', 'Typed contracts', 'Input, output, timeout, dan errors divalidasi.'), rubric('w10-edge', 'Thin integration edge', 'n8n tidak menyimpan hidden business logic.')],
    coachRole: 'backend integration and contract reviewer',
    coachFocus: ['business logic in prompts', 'ambiguous tool output', 'duplicate event', 'missing timeout'],
  },
  11: {
    caseIds: ['invoiceops'],
    context: 'Tools bekerja. Sekarang workflow harus pause, persist, meminta approval, resume, dan menghasilkan audit trail.',
    rawEvidence: ['Reviewer dapat terlambat beberapa jam sehingga approval bisa stale.', 'Case dapat berubah saat menunggu review.', 'Write action harus membawa approval token dan idempotency key.'],
    resources: [resources.sessions, resources.humanApproval, resources.logging],
    starterAssets: [invoiceops.permissions, invoiceops.process, invoiceops.failureTemplate],
    deliverable: { title: 'Resumable approval workflow', language: 'English', format: 'Stateful implementation + reviewer queue + audit log', sections: ['Checkpoint model', 'Approval token', 'State validation', 'Audit event', 'Resume path', 'Replay test'] },
    rubric: [rubric('w11-pause', 'Durable pause', 'Case dapat restart tanpa kehilangan evidence.'), rubric('w11-stale', 'Stale approval defense', 'Approval terikat version dan current state.'), rubric('w11-write', 'Authorized writes only', 'Write action gagal tanpa valid approval dan idempotency key.')],
    coachRole: 'workflow security and human-approval reviewer',
    coachFocus: ['stale approval', 'race condition', 'privilege escalation', 'unaudited state change'],
  },
  12: {
    caseIds: ['invoiceops'],
    context: 'Happy path selesai. Lakukan failure injection pada duplicate input, provider timeout, malformed output, dan ERP outage.',
    rawEvidence: ['Webhook delivery menggunakan at-least-once semantics.', 'Dependency dapat merespons setelah caller timeout.', 'Partial failure dapat terjadi setelah state tersimpan tetapi sebelum response terkirim.'],
    resources: [resources.idempotency, resources.retries, resources.deadLetter],
    starterAssets: [invoiceops.scenarios, invoiceops.failureTemplate, invoiceops.permissions],
    deliverable: { title: 'Failure-injection report and recovery runbook', language: 'English', format: 'Automated tests + Markdown runbook', sections: ['Failure hypothesis', 'Injection method', 'Expected state', 'Observed result', 'Recovery', 'Rollback'] },
    rubric: [rubric('w12-idem', 'Zero duplicate action', 'Replayed input menghasilkan satu case dan satu side effect.'), rubric('w12-budget', 'Retry budget', 'Retry count, timeout, backoff, dan terminal path eksplisit.'), rubric('w12-recover', 'Proven recovery', 'Tiga injected failures pulih atau masuk dead-letter path dengan benar.')],
    coachRole: 'site-reliability chaos-test designer',
    coachFocus: ['partial failure', 'retry storm', 'late response', 'dead-letter recovery'],
  },
  13: {
    caseIds: ['invoiceops'],
    context: 'Workflow reliable. Ukur extraction, routing, escalation, latency, cost, dan simulated human-touch reduction.',
    rawEvidence: ['Dataset starter memuat normal, mismatch, duplicate, low-confidence, dan malicious cases.', 'Manual baseline harus dihitung dengan metode yang dijelaskan.', 'Low confidence tidak boleh disembunyikan oleh aggregate accuracy.'],
    resources: [resources.evalPractice, resources.discovery, resources.signals],
    starterAssets: [invoiceops.scenarios, invoiceops.scorecardTemplate, invoiceops.taxonomy],
    deliverable: { title: 'InvoiceOps operating scorecard', language: 'English', format: 'Evaluation notebook + scorecard + simulated ROI model', sections: ['Dataset', 'Quality', 'Escalation', 'Reliability', 'Latency and cost', 'Simulated ROI', 'Limitations'] },
    rubric: [rubric('w13-split', 'Honest dataset split', 'Test cases tidak digunakan untuk tuning.'), rubric('w13-risk', 'Risk-visible metrics', 'Low-confidence dan unauthorized-write results dilaporkan terpisah.'), rubric('w13-roi', 'Defensible simulation', 'ROI menyebut baseline, formula, assumptions, dan tidak diklaim sebagai client result.')],
    coachRole: 'AI evaluation and business-impact auditor',
    coachFocus: ['test leakage', 'averages hiding risk', 'unfair baseline', 'unsupported ROI'],
  },
  14: {
    caseIds: ['regularag', 'invoiceops'],
    context: 'Dua systems sudah punya evidence. Ubah technical work menjadi client stories yang dapat dipahami dalam lima menit.',
    rawEvidence: ['Recruiter membuka README sebelum menjalankan code.', 'Architecture diagram tanpa decision rationale tidak cukup.', 'Setiap metric membutuhkan dataset, method, dan limitation.'],
    resources: [resources.adr, resources.c4, resources.readmes],
    starterAssets: [portfolio.caseStudy, regularag.evalTemplate, invoiceops.scorecardTemplate],
    deliverable: { title: 'Two recruiter-ready client case studies', language: 'English', format: 'README + case-study pages + 3–5 minute demos', sections: ['Problem', 'Constraints', 'Architecture decisions', 'Evaluation evidence', 'Failure handling', 'Business interpretation', 'Limitations'] },
    rubric: [rubric('w14-scan', 'Five-minute scan', 'Problem, decision, evidence, dan demo link ditemukan cepat.'), rubric('w14-claim', 'Evidence-backed claims', 'Semua angka punya dataset dan method.'), rubric('w14-honest', 'Synthetic honesty', 'Simulated data dan ROI dilabeli jelas.')],
    coachRole: 'global recruiter and prospective client editor',
    coachFocus: ['jargon', 'buried evidence', 'weak narrative', 'hidden limitation'],
  },
  15: {
    caseIds: ['regularag', 'invoiceops'],
    context: 'Portfolio siap dibaca. Latih kemampuan mempertahankan setiap architecture, safety, evaluation, cost, dan rollback decision.',
    rawEvidence: ['Interviewer akan mengganti constraint saat diskusi.', 'Framework name bukan penjelasan architecture.', 'English walkthrough perlu tetap presisi saat ditanya failure modes.'],
    resources: [resources.technicalWriting, resources.audience, resources.star],
    starterAssets: [portfolio.interview, portfolio.caseStudy],
    deliverable: { title: 'Interview defense packet', language: 'English', format: 'Recorded walkthrough + design answers + STAR bank', sections: ['Ten-minute walkthrough', 'Trade-offs', 'Failure modes', 'Evaluation', 'Cost', 'Rollback', 'Six STAR stories'] },
    rubric: [rubric('w15-why', 'Decision reasoning', 'Setiap komponen dijelaskan dengan constraint dan alternative.'), rubric('w15-failure', 'Operational depth', 'Failure, detection, recovery, dan rollback dapat dijelaskan.'), rubric('w15-language', 'Working English', 'Jawaban ringkas, structured, dan tidak bergantung jargon.')],
    coachRole: 'demanding AI systems interviewer',
    coachFocus: ['why this architecture', 'what breaks first', 'how quality is known', 'what changes at scale'],
  },
  16: {
    caseIds: ['regularag', 'invoiceops'],
    context: 'Jalankan pencarian kerja sebagai measurable funnel. Portfolio evidence menjadi input; market response menjadi evaluation signal.',
    rawEvidence: ['Target title bervariasi walau job description serupa.', 'No screening, failed technical, dan failed final membutuhkan eksperimen berbeda.', 'Application volume tanpa targeting tidak menghasilkan useful signal.'],
    resources: [resources.githubProfile, resources.profileReadme, resources.audience],
    starterAssets: [portfolio.funnel, portfolio.caseStudy, portfolio.interview],
    deliverable: { title: 'Application operating system', language: 'Mixed', format: 'Target list + funnel dashboard + 30-day experiment backlog', sections: ['Role clusters', 'Application evidence', 'Outreach', 'Stage conversion', 'Failure diagnosis', 'Next experiment'] },
    rubric: [rubric('w16-target', 'Targeted funnel', 'Setiap application dipetakan ke role cluster dan evidence relevan.'), rubric('w16-signal', 'Stage diagnosis', 'Bottleneck CV, technical, dan storytelling dibedakan.'), rubric('w16-loop', 'Actionable feedback', 'Setiap failure signal menghasilkan eksperimen dua minggu yang spesifik.')],
    coachRole: 'career funnel analyst for an AI application engineer',
    coachFocus: ['weak targeting', 'portfolio-evidence mismatch', 'technical gap', 'storytelling gap'],
  },
};
