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

export type TermGloss = {
  term: string;
  plainMeaning: string;
};

export type GuidedTaskKind =
  | 'find-evidence'
  | 'make-decision'
  | 'calculate'
  | 'explain';

export type AnswerPrompt = {
  question: string;
  fields: string[];
};

export type GuidedScaffold = {
  plainConcept: string;
  meaning: string;
  termGlosses: TermGloss[];
  workedStep: string[];
  taskKind: GuidedTaskKind;
  evidenceHint?: string;
  guidedTry: AnswerPrompt;
  warning: string;
};

export type StoryBeat = {
  concept: string;
  title: string;
  situation: string;
  guided: GuidedScaffold;
  independentTry: AnswerPrompt;
};

export type MissionStory = {
  learnerRole: string;
  opening: string;
  beats: StoryBeat[];
};

export type WeeklyMission = {
  caseIds: CaseId[];
  context: string;
  rawEvidence: string[];
  story: MissionStory;
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

function beat(
  concept: string,
  title: string,
  situation: string,
  independentTry: AnswerPrompt,
  guided: GuidedScaffold,
): StoryBeat {
  return { concept, title, situation, guided, independentTry };
}

function answer(question: string, fields: string[]): AnswerPrompt {
  return { question, fields };
}

function term(term: string, plainMeaning: string): TermGloss {
  return { term, plainMeaning };
}

function guide(scaffold: GuidedScaffold): GuidedScaffold {
  return scaffold;
}

function story(
  learnerRole: string,
  opening: string,
  beats: StoryBeat[],
): MissionStory {
  return { learnerRole, opening, beats };
}

const missionStories: Record<number, MissionStory> = {
  1: story(
    'junior solution architect yang baru bergabung dalam tahap memahami masalah RegulaRAG',
    'Lo masuk sebelum solusi dipilih. Tugas lo adalah memahami cara tim kepatuhan bekerja sekarang, bukan langsung membenarkan permintaan chatbot.',
    [
      beat(
        'workflow mapping',
        'Satu pertanyaan, banyak tempat mencari',
        'Satu pertanyaan kerja yang dilacak sampai selesai masuk ke kotak masuk bersama. Staf kepatuhan membacanya, lalu mencari informasi lewat Drive dan penanda halaman pribadi. Ia kadang meminta bantuan staf senior sebelum jawaban dikirim. Waktu penyelesaian yang terlihat adalah 15–90 menit, tetapi waktu tiap langkah belum dicatat dengan rapi.',
        answer(
          'Untuk memetakan seluruh alur, informasi apa yang perlu lo catat dari pertanyaan masuk sampai jawaban dikirim?',
          ['urutan langkah', 'pelaku setiap langkah', 'alat atau sumber yang dipakai', 'waktu mulai dan selesai', 'hal yang belum diketahui'],
        ),
        guide({
          plainConcept: 'peta alur kerja (workflow mapping)',
          meaning: 'Peta alur kerja menunjukkan urutan pekerjaan dari permintaan masuk sampai hasil dikirim. Peta ini membantu menemukan langkah yang lama, tertunda, atau diulang.',
          termGlosses: [
            term('ticket', 'pertanyaan kerja yang dicatat dan dilacak sampai selesai'),
            term('compliance analyst', 'staf kepatuhan'),
            term('shared inbox', 'kotak masuk bersama'),
          ],
          workedStep: [
            'Siapa yang bekerja: staf kepatuhan.',
            'Apa yang dilakukan: menerima dan membaca pertanyaan.',
            'Alat yang dipakai: kotak masuk bersama.',
            'Waktu yang dicatat: saat pertanyaan masuk dan saat mulai dibaca.',
          ],
          taskKind: 'find-evidence',
          evidenceHint: 'Cari kalimat setelah staf kepatuhan selesai membaca pertanyaan.',
          guidedTry: answer(
            'Berdasarkan cerita, apa yang terjadi setelah staf kepatuhan membaca pertanyaan?',
            ['langkah berikutnya', 'tempat mencari informasi', 'orang yang mungkin dimintai bantuan'],
          ),
          warning: 'Catat pekerjaan yang berlangsung sekarang, bukan fitur chatbot yang mungkin dibuat nanti.',
        }),
      ),
      beat(
        'stakeholder',
        'Semua peduli, tetapi tidak semua memutuskan',
        'Tim operasional ingin jawaban lebih cepat. Staf kepatuhan mencari sumber dan menyusun jawaban. Tim Legal wajib menyetujui penafsiran yang berisiko. Staf senior sering membantu, tetapi penanggung jawab waktu penyelesaian dan versi dokumen belum diketahui.',
        answer(
          'Bagaimana lo memetakan pihak yang memakai proses, bertanggung jawab atas proses, menyetujui risiko, dan menjaga pengetahuan tanpa menebak dari jabatan?',
          ['pihak', 'peran dalam proses', 'bukti dari cerita', 'keputusan yang dimiliki', 'hal yang perlu ditanyakan'],
        ),
        guide({
          plainConcept: 'peta pihak dan tanggung jawab (stakeholder map)',
          meaning: 'Peta ini membedakan orang yang memakai proses, menjalankan pekerjaan, dan berhak mengambil keputusan. Peran ditentukan dari bukti tindakan, bukan dari tebakan jabatan.',
          termGlosses: [
            term('stakeholder', 'pihak yang terlibat atau terdampak'),
            term('owner', 'orang yang bertanggung jawab atas hasil atau keputusan'),
            term('risk approver', 'orang yang berwenang menyetujui risiko'),
          ],
          workedStep: [
            'Pihak: tim operasional.',
            'Bukti: mereka menunggu dan memakai jawaban.',
            'Peran yang terlihat: penerima hasil, bukan otomatis pemilik keputusan.',
          ],
          taskKind: 'find-evidence',
          evidenceHint: 'Gunakan dua kalimat yang menjelaskan siapa yang mencari sumber dan siapa yang wajib menyetujui penafsiran berisiko.',
          guidedTry: answer(
            'Siapa yang menjalankan pekerjaan dan siapa yang menyetujui risiko?',
            ['pelaksana pekerjaan', 'pemberi persetujuan risiko'],
          ),
          warning: 'Jangan menganggap peminta, pengguna, pemberi persetujuan, dan penanggung jawab adalah orang yang sama.',
        }),
      ),
      beat(
        'baseline KPI',
        'Angka satu jam yang belum menjadi ukuran awal',
        'Manajer memperkirakan jawaban biasanya selesai sekitar satu jam. Data contoh justru menunjukkan rentang 15–90 menit dan sumber jawaban tidak selalu dicatat. Periode pengamatan, jumlah pertanyaan yang dihitung, serta penanggung jawab datanya belum disepakati.',
        answer(
          'Bagaimana lo mendefinisikan satu ukuran awal yang dapat dihitung ulang dan dipercaya?',
          ['nama ukuran', 'rumus dan satuan', 'cakupan data', 'sumber dan penanggung jawab data', 'tingkat keyakinan'],
        ),
        guide({
          plainConcept: 'ukuran kondisi awal (baseline KPI)',
          meaning: 'Ukuran kondisi awal menunjukkan keadaan sebelum solusi diubah. Ukuran ini harus memiliki rumus, satuan, cakupan data, dan sumber yang jelas.',
          termGlosses: [
            term('baseline', 'angka kondisi awal untuk pembanding'),
            term('KPI', 'ukuran yang dipakai untuk menilai hasil'),
            term('sample', 'sebagian data yang diperiksa'),
          ],
          workedStep: [
            'Klaim awal: “sekitar satu jam”.',
            'Masalahnya: angka itu baru perkiraan manajer.',
            'Bukti yang tersedia: beberapa waktu penyelesaian berada pada rentang 15–90 menit.',
          ],
          taskKind: 'explain',
          evidenceHint: 'Gunakan saat pertanyaan masuk sebagai awal dan saat jawaban dikirim sebagai akhir. Durasi diukur dalam menit.',
          guidedTry: answer(
            'Bagaimana rumus durasi penyelesaian satu pertanyaan?',
            ['rumus', 'satuan'],
          ),
          warning: 'Jangan memakai target “lebih cepat” sebelum kondisi awal, sumber data, dan cara menghitungnya jelas.',
        }),
      ),
    ],
  ),
  2: story(
    'junior solution architect yang harus menilai bentuk solusi RegulaRAG',
    'Ringkasan masalah sudah tersedia. Sekarang lo membandingkan pilihan sederhana sebelum memutuskan apakah sistem benar-benar perlu mengambil keputusan sendiri.',
    [
      beat(
        'agent vs workflow',
        'Chatbot bukan satu-satunya jawaban',
        'Client meminta chatbot. Namun, sebagian pekerjaan hanya mencari aturan yang berlaku dan menampilkan sumbernya. Penafsiran berisiko tetap harus diputuskan manusia. Lo perlu memilih cara paling sederhana yang cukup untuk setiap bagian pekerjaan.',
        answer(
          'Bagaimana lo membagi pekerjaan antara aturan tetap, pencarian, alur otomatis, keputusan sistem, dan keputusan manusia?',
          ['bagian pekerjaan', 'tingkat ketidakpastian', 'cara paling sederhana', 'alasan', 'batas penggunaan'],
        ),
        guide({
          plainConcept: 'memilih aturan tetap, alur, atau sistem pengambil keputusan (agent vs workflow)',
          meaning: 'Langkah yang selalu mengikuti pola sama cukup memakai aturan atau alur tetap. Sistem yang memilih langkah berikutnya baru berguna ketika jalur berubah sesuai keadaan.',
          termGlosses: [
            term('workflow', 'urutan langkah kerja yang sudah ditentukan'),
            term('agent', 'sistem yang dapat memilih langkah berikutnya dalam batas tertentu'),
            term('rules', 'aturan tetap yang hasilnya dapat diprediksi'),
          ],
          workedStep: [
            'Bagian pekerjaan: persetujuan penafsiran berisiko.',
            'Keputusan: tetap dilakukan manusia.',
            'Alasan: sistem tidak memiliki kewenangan menyetujui risiko.',
          ],
          taskKind: 'make-decision',
          guidedTry: answer(
            'Untuk menemukan aturan yang masih berlaku dan menampilkan sumbernya, cara paling sederhana apa yang cukup?',
            ['cara yang dipilih', 'alasan'],
          ),
          warning: 'Jangan memakai sistem pengambil keputusan untuk langkah tetap yang lebih mudah diuji dengan aturan sederhana.',
        }),
      ),
      beat(
        'RAG fit',
        'Jawaban harus membawa bukti',
        'Kumpulan dokumen RegulaRAG berisi regulasi publik dan SOP sintetis yang berubah setiap bulan. Client membutuhkan jawaban yang menunjukkan sumber. Sistem tidak boleh menafsirkan risiko atau menyetujui pengecualian aturan.',
        answer(
          'Bagian hasil apa yang layak dibantu pencarian dan penyusunan jawaban berbasis sumber?',
          ['hasil yang dibantu', 'sumber yang dicari', 'bukti pada jawaban', 'kondisi tidak menjawab'],
        ),
        guide({
          plainConcept: 'kecocokan pencarian dan penyusunan jawaban berbasis sumber (RAG fit)',
          meaning: 'Pendekatan ini mencari bagian dokumen yang relevan lalu memakainya untuk menyusun jawaban. Tujuannya membantu jawaban berbasis bukti, bukan mengambil keputusan hukum.',
          termGlosses: [
            term('corpus', 'kumpulan dokumen yang boleh dicari'),
            term('retrieval', 'proses mencari bagian dokumen yang relevan'),
            term('citation', 'rujukan yang menunjukkan asal informasi'),
          ],
          workedStep: [
            'Permintaan A: menyetujui pengecualian sebuah SOP.',
            'Keputusan: sistem tidak menyetujuinya.',
            'Batas aman: kumpulkan sumber lalu serahkan keputusan kepada manusia.',
          ],
          taskKind: 'make-decision',
          guidedTry: answer(
            'Untuk pertanyaan fakta tentang aturan yang berlaku, hasil apa yang boleh dibantu dan bukti apa yang harus ditampilkan?',
            ['hasil yang dibantu', 'bukti yang ditampilkan', 'kondisi berhenti'],
          ),
          warning: 'Sumber yang ditemukan belum otomatis benar, mutakhir, atau cukup untuk mendukung jawaban.',
        }),
      ),
      beat(
        'human boundary',
        'Pertanyaan yang tidak boleh diselesaikan sendiri',
        'Sistem dapat menemukan sumber untuk pertanyaan biasa. Namun, permintaan yang membutuhkan penafsiran berisiko atau pengecualian aturan harus berhenti sebelum keputusan dibuat. Manusia yang berwenang tetap memegang keputusan akhir.',
        answer(
          'Bagaimana lo menentukan titik berhenti sistem dan penyerahan keputusan kepada manusia?',
          ['pemicu berhenti', 'informasi yang diserahkan', 'pemberi keputusan', 'syarat melanjutkan'],
        ),
        guide({
          plainConcept: 'batas keputusan manusia (human boundary)',
          meaning: 'Batas ini menetapkan keputusan yang tidak boleh dibuat sistem sendiri. Sistem berhenti, menunjukkan informasi pendukung, lalu menunggu manusia yang berwenang.',
          termGlosses: [
            term('approval', 'persetujuan resmi untuk melanjutkan'),
            term('reviewer', 'orang yang memeriksa hasil sebelum keputusan'),
            term('exception', 'kasus yang menyimpang dari aturan biasa'),
          ],
          workedStep: [
            'Kasus A: pencarian tidak menemukan sumber yang cukup.',
            'Tindakan sistem: tidak membuat jawaban sendiri.',
            'Langkah aman: minta staf kepatuhan memeriksa pertanyaannya.',
          ],
          taskKind: 'make-decision',
          guidedTry: answer(
            'Jika pertanyaan meminta penafsiran berisiko, kapan sistem berhenti dan apa yang diserahkan kepada pemeriksa?',
            ['titik berhenti', 'informasi yang diserahkan', 'pemberi keputusan'],
          ),
          warning: 'Jangan sekadar menulis “ada manusia”; tentukan kapan sistem berhenti dan siapa yang berwenang.',
        }),
      ),
    ],
  ),
  3: story(
    'junior AI solution engineer yang menentukan aturan pertukaran data RegulaRAG',
    'Jawaban berbasis sumber sudah dipilih. Sebelum menulis prompt, lo memastikan data yang masuk dan keluar dapat diperiksa oleh sistem lain.',
    [
      beat(
        'structured output',
        'Rujukan terlihat rapi, tetapi datanya belum lengkap',
        'Komponen berikutnya membutuhkan identitas dokumen, halaman, kutipan pendukung, dan tingkat keyakinan. Jika model hanya menulis teks bebas, bagian penting dapat hilang tanpa terlihat sebagai kegagalan.',
        answer(
          'Bentuk data apa yang wajib dipenuhi agar rujukan yang tidak lengkap ditolak dengan jelas?',
          ['bagian wajib', 'jenis atau batas nilai', 'kondisi tidak lengkap', 'hasil kegagalan'],
        ),
        guide({
          plainConcept: 'keluaran dengan bentuk tetap (structured output)',
          meaning: 'Keluaran dengan bentuk tetap memiliki bagian wajib yang dapat diperiksa mesin. Data yang tidak lengkap harus ditolak sebelum dipakai komponen berikutnya.',
          termGlosses: [
            term('field', 'satu bagian bernama dalam data'),
            term('JSON', 'format teks terstruktur untuk pertukaran data'),
            term('citation', 'catatan asal informasi atau rujukan'),
          ],
          workedStep: [
            'Bagian yang diperiksa: nomor halaman.',
            'Aturan: harus berupa bilangan bulat positif.',
            'Jika hilang: tandai data tidak lengkap dan hentikan pemakaian hasil.',
          ],
          taskKind: 'make-decision',
          evidenceHint: 'Lihat daftar empat bagian yang dibutuhkan komponen berikutnya pada situasi.',
          guidedTry: answer(
            'Bagian mana yang menghubungkan kutipan ke dokumen asal, dan apa hasilnya jika bagian itu hilang?',
            ['bagian penghubung', 'hasil saat hilang'],
          ),
          warning: 'Teks yang tampak seperti JSON belum tentu lengkap atau aman dipakai tanpa pemeriksaan.',
        }),
      ),
      beat(
        'tool schema',
        'Alat pencarian membutuhkan aturan yang jelas',
        'Daftar dokumen menyimpan versi, status, halaman, dan tingkat kewenangan sumber. Alat pencarian hanya boleh menerima penyaring yang dibatasi. Hasilnya harus membedakan berhasil, tidak ada bukti, penyaring tidak valid, waktu habis, dan layanan pendukung gagal.',
        answer(
          'Bagaimana lo menulis aturan lengkap untuk permintaan, hasil, batas akses, dan kegagalan alat pencarian?',
          ['permintaan yang diterima', 'hasil ketika berhasil', 'batas akses', 'jenis kegagalan'],
        ),
        guide({
          plainConcept: 'aturan masukan dan keluaran alat (tool schema)',
          meaning: 'Aturan alat menjelaskan data yang boleh masuk, hasil yang keluar, batas izin, dan bentuk kegagalan. Dengan begitu, komponen pemanggil tidak perlu menebak arti respons.',
          termGlosses: [
            term('tool', 'fungsi atau layanan yang dipanggil sistem'),
            term('caller', 'komponen yang memanggil fungsi atau layanan'),
            term('timeout', 'kegagalan karena batas waktu terlewati'),
          ],
          workedStep: [
            'Masukan A: penyaring status dokumen.',
            'Nilai yang diizinkan: status yang dikenal oleh daftar dokumen.',
            'Jika nilainya tidak dikenal: kembalikan penyaring tidak valid.',
          ],
          taskKind: 'make-decision',
          evidenceHint: 'Gunakan jenis hasil “tidak ada bukti” yang disebutkan dalam situasi, bukan kegagalan waktu atau layanan.',
          guidedTry: answer(
            'Saat pencarian selesai tetapi tidak menemukan bukti, informasi apa yang harus diterima komponen pemanggil?',
            ['status hasil', 'alasan singkat', 'langkah yang boleh dilakukan berikutnya'],
          ),
          warning: 'Jangan menyatukan semua kegagalan menjadi satu pesan umum karena penanganannya berbeda.',
        }),
      ),
      beat(
        'validation',
        'Bentuknya benar, isinya tetap tidak boleh dipakai',
        'Satu rujukan dapat memiliki format JSON yang benar tetapi menunjuk dokumen lama yang sudah diganti. Rujukan lain dapat kehilangan nomor halaman. Kedua masalah harus ditemukan sebelum hasil diteruskan.',
        answer(
          'Pemeriksaan apa yang dilakukan pada bentuk data dan apa yang dilakukan pada aturan dokumen?',
          ['pemeriksaan bentuk', 'pemeriksaan aturan dokumen', 'tindakan saat gagal', 'penanggung jawab pemeriksaan'],
        ),
        guide({
          plainConcept: 'pemeriksaan bentuk dan aturan data (validation)',
          meaning: 'Pemeriksaan bentuk memastikan bagian data lengkap dan bertipe benar. Pemeriksaan aturan memastikan isinya masih sah untuk proses bisnis.',
          termGlosses: [
            term('schema validation', 'pemeriksaan bentuk dan jenis data'),
            term('business rule', 'aturan kelayakan yang berlaku pada pekerjaan'),
            term('provenance', 'catatan asal dan riwayat sumber'),
          ],
          workedStep: [
            'Kasus A: nomor halaman hilang.',
            'Jenis pemeriksaan: bentuk data, karena bagian wajib tidak ada.',
            'Hasil: tolak rujukan dan laporkan bagian yang hilang.',
          ],
          taskKind: 'make-decision',
          evidenceHint: 'Kasus kedua pada situasi adalah dokumen lama yang sudah diganti, bukan bagian data yang hilang.',
          guidedTry: answer(
            'Dokumen lama yang sudah diganti harus diperiksa sebagai masalah apa, dan apa tindakan saat ditemukan?',
            ['jenis pemeriksaan', 'tindakan saat gagal'],
          ),
          warning: 'Jangan memperbaiki data gagal secara diam-diam karena penyebab kegagalan akan hilang.',
        }),
      ),
    ],
  ),
  4: story(
    'junior AI solution engineer yang mengatur perjalanan satu proses RegulaRAG',
    'Alat sudah memiliki aturan. Kini lo menentukan bagaimana satu proses bergerak, berhenti, mencoba pulih, atau meminta bantuan manusia.',
    [
      beat(
        'state machine',
        'Proses yang tidak tahu kapan selesai',
        'Pencarian dapat berhasil, melewati batas waktu, atau tidak menemukan bukti. Pengguna juga dapat meminta sesuatu di luar kumpulan dokumen. Tanpa tahap dan hasil akhir yang jelas, sistem dapat terus mencoba atau memberi jawaban yang membingungkan.',
        answer(
          'Tahap, kejadian pemindah tahap, dan hasil akhir apa yang dibutuhkan untuk semua jalur utama?',
          ['tahap', 'kejadian', 'tahap berikutnya', 'kondisi berhenti', 'hasil akhir'],
        ),
        guide({
          plainConcept: 'aturan perpindahan tahap (state machine)',
          meaning: 'Satu proses dibagi menjadi tahap yang jelas. Kejadian tertentu memindahkan proses ke tahap berikutnya sampai mencapai hasil akhir.',
          termGlosses: [
            term('state', 'tahap proses saat ini'),
            term('event', 'kejadian yang memindahkan proses'),
            term('terminal state', 'hasil akhir yang menghentikan proses'),
          ],
          workedStep: [
            'Tahap awal: mencari bukti.',
            'Kejadian A: bukti yang cukup ditemukan.',
            'Tahap berikutnya: menyusun jawaban berbasis sumber.',
            'Hasil akhir: jawaban siap diperiksa.',
          ],
          taskKind: 'make-decision',
          guidedTry: answer(
            'Jika pencarian tidak menemukan bukti, proses pindah ke tahap apa dan berakhir dengan hasil apa?',
            ['tahap berikutnya', 'hasil akhir'],
          ),
          warning: 'Setiap tahap harus memiliki aturan masuk, aturan keluar, dan kondisi berhenti.',
        }),
      ),
      beat(
        'retry',
        'Batas waktu bukan izin mencoba selamanya',
        'Layanan pencarian dapat mengalami gangguan sementara. Mencoba lagi mungkin membantu, tetapi percobaan tanpa batas menambah waktu tunggu dan dapat memperburuk gangguan. Tidak menemukan bukti adalah hasil yang sah, bukan selalu gangguan.',
        answer(
          'Bagaimana lo membedakan kegagalan yang boleh dicoba ulang dari hasil yang harus berhenti?',
          ['jenis kegagalan', 'boleh dicoba ulang atau tidak', 'batas percobaan', 'kondisi berhenti', 'jalur setelah berhenti'],
        ),
        guide({
          plainConcept: 'percobaan ulang yang dibatasi (retry)',
          meaning: 'Percobaan ulang hanya dipakai untuk gangguan yang mungkin pulih. Jumlah percobaan dan hasil setelah batas habis harus ditentukan sejak awal.',
          termGlosses: [
            term('retry', 'mencoba operasi yang sama sekali lagi'),
            term('timeout', 'operasi gagal karena melewati batas waktu'),
            term('outage', 'layanan sedang terganggu atau tidak tersedia'),
          ],
          workedStep: [
            'Kasus A: pencarian selesai dan tidak menemukan bukti.',
            'Keputusan: jangan mengulang pencarian yang sama tanpa perubahan.',
            'Hasil: berhenti aman dan jelaskan bahwa bukti belum tersedia.',
          ],
          taskKind: 'make-decision',
          guidedTry: answer(
            'Jika layanan pencarian melewati batas waktu, bagaimana aturan percobaan ulang yang aman?',
            ['keputusan mencoba lagi', 'batas percobaan', 'hasil setelah batas habis'],
          ),
          warning: 'Jangan mencoba ulang semua jenis kegagalan atau membiarkannya berjalan tanpa batas.',
        }),
      ),
      beat(
        'approval',
        'Batas sebelum sistem mengubah sesuatu',
        'RegulaRAG dirancang hanya untuk membaca sumber dan menyusun bukti. Jika permintaan mengarah pada perubahan data atau tindakan lain, proses harus berhenti sebelum perubahan terjadi dan menunggu izin manusia.',
        answer(
          'Apa yang harus tercantum pada izin agar tidak dipakai untuk kasus atau bukti yang berbeda?',
          ['tindakan yang diizinkan', 'identitas kasus', 'versi bukti', 'pemberi izin', 'masa berlaku'],
        ),
        guide({
          plainConcept: 'izin sebelum tindakan (approval)',
          meaning: 'Izin manusia harus diberikan sebelum sistem melakukan tindakan yang mengubah sesuatu. Izin tersebut hanya berlaku untuk kasus, tindakan, dan bukti tertentu.',
          termGlosses: [
            term('read-only', 'hanya membaca tanpa mengubah data'),
            term('side effect', 'perubahan yang terjadi di luar proses, seperti mengubah data'),
            term('approval', 'izin resmi dari pihak yang berwenang'),
          ],
          workedStep: [
            'Kasus A: sistem hanya mencari dan membaca dokumen.',
            'Keputusan: proses boleh berjalan tanpa izin untuk mengubah data.',
            'Alasan: tidak ada perubahan di sistem lain.',
          ],
          taskKind: 'make-decision',
          guidedTry: answer(
            'Jika permintaan akan mengubah data, apa tiga informasi minimum yang harus terikat pada izinnya?',
            ['identitas kasus', 'tindakan yang diizinkan', 'versi bukti'],
          ),
          warning: 'Jangan memakai izin umum yang dapat digunakan ulang untuk kasus, tindakan, atau versi bukti lain.',
        }),
      ),
    ],
  ),
  5: story(
    'junior retrieval engineer yang membangun pencarian awal RegulaRAG',
    'Rancangan sistem sudah disepakati. Lo mulai dengan menyiapkan dokumen dan pencarian sederhana yang hasilnya dapat diulang sebelum menambahkan peningkatan lain.',
    [
      beat(
        'ingestion',
        'Tidak semua dokumen boleh ikut dicari',
        'Daftar dokumen mencampur dokumen aktif, dokumen lama yang sudah diganti, dokumen dengan tabel rumit, dan hasil pindai yang perlu dibaca mesin. Semua dokumen tetap membutuhkan versi, penanggung jawab, status, serta catatan halaman asal.',
        answer(
          'Pemeriksaan dan keterangan apa yang menentukan apakah dokumen boleh masuk pencarian aktif?',
          ['keterangan dokumen', 'syarat boleh dipakai', 'perlakuan saat bermasalah', 'catatan asal yang disimpan'],
        ),
        guide({
          plainConcept: 'menyiapkan dokumen untuk pencarian (ingestion)',
          meaning: 'Dokumen perlu diterima, diperiksa, dan diberi keterangan sebelum masuk pencarian. Proses yang sama harus menghasilkan kumpulan dokumen yang konsisten.',
          termGlosses: [
            term('ingestion', 'proses memasukkan dan menyiapkan dokumen'),
            term('superseded', 'dokumen lama yang sudah diganti versi baru'),
            term('lineage', 'catatan asal dan perjalanan data'),
          ],
          workedStep: [
            'Kasus A: dokumen berstatus aktif dan memiliki versi serta penanggung jawab.',
            'Keputusan: boleh masuk pencarian aktif.',
            'Catatan yang disimpan: identitas, versi, status, penanggung jawab, dan halaman asal.',
          ],
          taskKind: 'make-decision',
          evidenceHint: 'Gunakan jenis dokumen “lama yang sudah diganti” pada kalimat pertama situasi.',
          guidedTry: answer(
            'Untuk dokumen lama yang sudah diganti, apa keputusan pemakaiannya dan keterangan apa yang tetap disimpan?',
            ['keputusan pemakaian', 'alasan', 'keterangan yang disimpan'],
          ),
          warning: 'Jangan memasukkan semua berkas tanpa memeriksa asal, versi, duplikasi, dan izin aksesnya.',
        }),
      ),
      beat(
        'chunking',
        'Potongan dokumen yang kehilangan asal',
        'SOP dan regulasi perlu dipecah agar mudah dicari. Potongan terlalu kecil kehilangan konteks, sedangkan potongan terlalu besar membawa terlalu banyak informasi yang tidak relevan. Setiap potongan harus tetap menunjuk halaman atau bagian asal.',
        answer(
          'Bagaimana lo menentukan batas potongan dan menjaga hubungannya dengan dokumen asal?',
          ['unit potongan', 'cara menjaga konteks', 'keterangan asal', 'cara menguji ukuran'],
        ),
        guide({
          plainConcept: 'memecah dokumen menjadi bagian pencarian (chunking)',
          meaning: 'Dokumen dipecah menjadi bagian yang cukup kecil untuk dicari tetapi cukup utuh untuk dipahami. Setiap bagian tetap membawa hubungan ke sumber aslinya.',
          termGlosses: [
            term('chunk', 'satu potongan dokumen yang dapat dicari'),
            term('section', 'bagian dokumen berdasarkan judul atau topik'),
            term('citation', 'rujukan kembali ke dokumen asal'),
          ],
          workedStep: [
            'Kasus A: satu bagian SOP lengkap berada pada satu halaman.',
            'Unit potongan: satu bagian berdasarkan judulnya.',
            'Asal yang disimpan: identitas dokumen, versi, judul bagian, dan halaman.',
          ],
          taskKind: 'make-decision',
          guidedTry: answer(
            'Jika satu bagian SOP berlanjut ke dua halaman, bagaimana lo memotongnya tanpa kehilangan hubungan ke sumber?',
            ['unit potongan', 'halaman asal', 'alasan'],
          ),
          warning: 'Jangan memilih ukuran hanya berdasarkan jumlah karakter; uji apakah konteks tetap utuh dan hasil pencarian tetap relevan.',
        }),
      ),
      beat(
        'vector retrieval',
        'Mirip makna belum berarti boleh dipakai',
        'Pencarian makna dapat menemukan paragraf yang terdengar relevan tetapi berasal dari versi dokumen lama atau kelompok dokumen yang tidak diizinkan. Nilai kemiripan tidak membuktikan sumber itu sah atau benar.',
        answer(
          'Penyaring apa yang dipakai sebelum hasil diurutkan, dan hasil awal apa yang perlu dicatat?',
          ['penyaring awal', 'cara mengurutkan', 'hasil per pertanyaan', 'keterbatasan'],
        ),
        guide({
          plainConcept: 'pencarian berdasarkan kemiripan makna (vector retrieval)',
          meaning: 'Pencarian ini menemukan bagian dokumen yang maknanya mirip dengan pertanyaan. Hasil tetap harus disaring berdasarkan status dan izin dokumen sebelum dipakai.',
          termGlosses: [
            term('vector search', 'pencarian berdasarkan kemiripan makna'),
            term('filter', 'aturan untuk menyisihkan hasil yang tidak boleh dipakai'),
            term('ranking', 'urutan hasil dari yang paling relevan'),
          ],
          workedStep: [
            'Kasus A: paragraf mirip berasal dari dokumen lama yang sudah diganti.',
            'Penyaring: hanya izinkan status aktif.',
            'Risiko yang dicegah: jawaban memakai aturan versi lama.',
          ],
          taskKind: 'make-decision',
          evidenceHint: 'Situasi menyebut risiko kedua selain versi lama: kelompok dokumen yang tidak diizinkan.',
          guidedTry: answer(
            'Untuk hasil dari kelompok dokumen yang tidak diizinkan, penyaring apa yang dipakai dan risiko apa yang dicegah?',
            ['penyaring', 'nilai yang diizinkan', 'risiko yang dicegah'],
          ),
          warning: 'Jangan menganggap nilai kemiripan sebagai bukti bahwa sumber berwenang atau jawabannya benar.',
        }),
      ),
    ],
  ),
  6: story(
    'junior evaluation engineer yang membandingkan cara pencarian RegulaRAG',
    'Pencarian awal sudah berjalan. Tugas lo adalah menguji apakah perubahan benar-benar membantu menemukan bukti, bukan sekadar membuat demo terasa lebih bagus.',
    [
      beat(
        'hybrid search',
        'Nomor regulasi hilang dalam pencarian makna',
        'Sebagian pertanyaan uji memakai konsep, sedangkan pertanyaan lain menyebut nomor regulasi atau frasa yang harus cocok persis. Pencarian makna dan pencarian kata dapat gagal pada jenis pertanyaan yang berbeda.',
        answer(
          'Bagaimana lo membandingkan pencarian makna saja dengan gabungan pencarian kata dan makna secara adil?',
          ['cara yang dibandingkan', 'kondisi yang disamakan', 'ukuran hasil', 'hasil per jenis pertanyaan', 'dasar keputusan'],
        ),
        guide({
          plainConcept: 'gabungan pencarian kata dan makna (hybrid search)',
          meaning: 'Pencarian kata cocok untuk istilah yang harus sama persis. Pencarian makna membantu ketika pertanyaan memakai kata berbeda dengan maksud serupa.',
          termGlosses: [
            term('lexical search', 'pencarian berdasarkan kecocokan kata'),
            term('semantic search', 'pencarian berdasarkan kemiripan makna'),
            term('hybrid search', 'gabungan pencarian kata dan makna'),
          ],
          workedStep: [
            'Kasus A: pertanyaan memakai konsep yang sama dengan kata berbeda.',
            'Cara yang diuji: pencarian makna.',
            'Alasan: kecocokan maksud lebih penting daripada kata yang persis sama.',
          ],
          taskKind: 'make-decision',
          guidedTry: answer(
            'Untuk pertanyaan yang menyebut nomor regulasi persis, cara pencarian mana yang perlu diuji dan mengapa?',
            ['cara pencarian', 'alasan'],
          ),
          warning: 'Bandingkan cara pencarian pada dokumen dan pertanyaan yang sama, lalu baca hasil per jenis pertanyaan.',
        }),
      ),
      beat(
        'reranking',
        'Banyak hasil, hanya sedikit tempat teratas',
        'Pencarian awal dapat menghasilkan sampai dua puluh paragraf calon sumber, sedangkan jawaban hanya memakai lima hasil teratas. Pengurutan kedua mungkin menaikkan sumber yang relevan, tetapi menambah waktu proses dan tidak memperbaiki dokumen yang buruk.',
        answer(
          'Kapan pengurutan kedua layak dipakai setelah mempertimbangkan kualitas dan tambahan waktu?',
          ['masalah awal', 'perubahan posisi sumber', 'tambahan waktu', 'batas manfaat', 'keputusan'],
        ),
        guide({
          plainConcept: 'mengurutkan kembali calon sumber (reranking)',
          meaning: 'Pengurutan kedua menilai ulang hasil pencarian agar sumber paling relevan naik ke posisi atas. Langkah ini hanya berguna jika peningkatan kualitas sepadan dengan waktu tambahan.',
          termGlosses: [
            term('candidate', 'calon hasil dari pencarian awal'),
            term('reranking', 'mengurutkan kembali calon hasil dengan penilaian kedua'),
            term('latency', 'waktu yang dibutuhkan sistem untuk merespons'),
          ],
          workedStep: [
            'Kasus A: hasil pencarian buruk karena dokumen penting belum masuk kumpulan sumber.',
            'Keputusan: jangan menambahkan pengurutan kedua terlebih dahulu.',
            'Alasan: mengubah urutan tidak dapat memunculkan dokumen yang memang tidak tersedia.',
          ],
          taskKind: 'explain',
          guidedTry: answer(
            'Dua perubahan apa yang harus dibandingkan untuk memutuskan apakah pengurutan kedua berguna?',
            ['perubahan kualitas', 'perubahan waktu'],
          ),
          warning: 'Pengurutan kedua tidak dapat memperbaiki kumpulan dokumen yang salah atau tidak lengkap.',
        }),
      ),
      beat(
        'Recall@k',
        'Nilai pencarian tinggi belum menjamin jawaban benar',
        'Pada pertanyaan uji A, sumber acuan berada di posisi keempat dan jawaban memakai rujukan yang benar. Pada pertanyaan uji B, sumber acuan berada di posisi kedua tetapi jawaban akhir memakai rujukan yang salah. Keduanya dinilai pada lima hasil teratas.',
        answer(
          'Apa yang diukur Recall@5, apa yang tidak diukur, dan pemeriksaan pendamping apa yang dibutuhkan?',
          ['arti ukuran', 'hasil yang dinilai', 'hal yang tidak dibuktikan', 'pemeriksaan pendamping'],
        ),
        guide({
          plainConcept: 'tingkat ditemukannya sumber dalam hasil teratas (Recall@k)',
          meaning: 'Recall@k memeriksa apakah sumber acuan muncul dalam sejumlah hasil teratas. Ukuran ini tidak membuktikan bahwa jawaban akhir memilih dan memakai sumber dengan benar.',
          termGlosses: [
            term('gold passage', 'bagian dokumen acuan yang seharusnya ditemukan'),
            term('top five', 'lima hasil dengan urutan tertinggi'),
            term('source correctness', 'ketepatan sumber yang dipakai untuk mendukung jawaban'),
          ],
          workedStep: [
            'Pertanyaan A: sumber acuan berada pada posisi keempat.',
            'Karena posisi empat termasuk lima hasil teratas, Recall@5 dihitung berhasil.',
            'Rujukan jawaban juga benar, jadi pencarian dan pemakaian sumber sama-sama berhasil.',
          ],
          taskKind: 'calculate',
          evidenceHint: 'Gunakan data pertanyaan B: sumber acuan berada di posisi kedua, sedangkan jawaban memakai rujukan yang salah.',
          guidedTry: answer(
            'Bagaimana lo menilai hasil pencarian dan hasil jawaban akhir pada pertanyaan B?',
            ['hasil Recall@5', 'hasil ketepatan rujukan', 'kesimpulan'],
          ),
          warning: 'Jangan menyebut nilai pencarian tinggi sebagai bukti bahwa jawaban akhir selalu benar.',
        }),
      ),
    ],
  ),
  7: story(
    'junior AI security engineer yang menguji batas pengetahuan RegulaRAG',
    'Pencarian sudah membaik. Sekarang lo menganggap pertanyaan dan dokumen dapat salah, tidak cukup, atau sengaja berbahaya.',
    [
      beat(
        'abstention',
        'Pertanyaan yang tidak memiliki dasar jawaban',
        'Beberapa pertanyaan uji tidak memiliki sumber dalam kumpulan dokumen. Pada kasus lain, dua versi SOP saling bertentangan. Jawaban yang terdengar yakin tanpa dasar dapat menimbulkan risiko bagi tim kepatuhan.',
        answer(
          'Kapan sistem harus memilih tidak menjawab dan jalur aman apa yang diberikan kepada pengguna?',
          ['tanda bukti tidak cukup', 'keputusan respons', 'pesan kepada pengguna', 'jalur tindak lanjut'],
        ),
        guide({
          plainConcept: 'memilih tidak menjawab dengan aman (abstention)',
          meaning: 'Sistem tidak menjawab ketika sumber, keyakinan, atau izin tidak cukup. Sistem tetap menjelaskan alasannya dan memberikan langkah aman berikutnya.',
          termGlosses: [
            term('abstention', 'keputusan sistem untuk tidak menjawab'),
            term('evidence', 'bukti yang mendukung jawaban'),
            term('escalation', 'menyerahkan kasus kepada pihak yang lebih berwenang'),
          ],
          workedStep: [
            'Kasus A: tidak ada sumber yang mendukung pertanyaan.',
            'Keputusan: jangan membuat jawaban atau sumber baru.',
            'Langkah aman: jelaskan kekurangan sumber dan serahkan ke staf kepatuhan.',
          ],
          taskKind: 'make-decision',
          evidenceHint: 'Gunakan kasus kedua pada situasi: dua versi SOP memberikan informasi yang bertentangan.',
          guidedTry: answer(
            'Jika dua versi SOP bertentangan, apa keputusan respons dan ke mana pengguna diarahkan?',
            ['keputusan respons', 'pesan singkat', 'jalur tindak lanjut'],
          ),
          warning: 'Tidak menjawab adalah perilaku aman ketika bukti tidak cukup; ukur juga apakah penyerahannya benar.',
        }),
      ),
      beat(
        'prompt injection',
        'Perintah tersembunyi di dalam dokumen',
        'Satu SOP sintetis memuat teks yang menyuruh model mengabaikan aturan utama sistem. Teks tersebut ditemukan saat pencarian dokumen. Isinya harus diperlakukan sebagai data untuk dibaca, bukan perintah yang boleh mengubah perilaku sistem.',
        answer(
          'Bagaimana lo memisahkan aturan sistem dari teks dokumen dan membuktikannya lewat pengujian?',
          ['asal aturan atau data', 'urutan kewenangan', 'perilaku yang diblokir', 'hasil pengujian yang diharapkan'],
        ),
        guide({
          plainConcept: 'serangan lewat perintah tersembunyi (prompt injection)',
          meaning: 'Teks berbahaya dapat mencoba menyamar sebagai perintah untuk mengubah perilaku model. Aturan sistem yang tepercaya harus tetap lebih berwenang daripada isi dokumen.',
          termGlosses: [
            term('prompt injection', 'upaya menyisipkan perintah berbahaya melalui masukan atau dokumen'),
            term('system instruction', 'aturan utama yang mengendalikan perilaku sistem'),
            term('retrieved text', 'teks dokumen yang ditemukan oleh pencarian'),
          ],
          workedStep: [
            'Sumber A: aturan utama sistem.',
            'Sumber B: teks SOP yang ditemukan dari pencarian.',
            'Urutan kewenangan: aturan utama tetap berlaku; teks SOP hanya menjadi data.',
          ],
          taskKind: 'make-decision',
          guidedTry: answer(
            'Untuk menguji perlindungan ini, perilaku apa yang harus diblokir dan tanda lulusnya apa?',
            ['perilaku yang diblokir', 'tanda pengujian lulus'],
          ),
          warning: 'Jangan pernah menganggap perintah di dalam dokumen sebagai aturan sistem yang tepercaya.',
        }),
      ),
      beat(
        'data boundary',
        'Permintaan di luar kumpulan yang diizinkan',
        'Demo hanya boleh memakai regulasi publik dan SOP sintetis dalam kumpulan yang disetujui. Pengguna mencoba meminta dokumen di luar kumpulan itu. Aturan internal sistem, kunci rahasia, dan isi sensitif juga tidak boleh muncul pada rujukan atau catatan proses.',
        answer(
          'Data apa yang boleh masuk, dilihat, disimpan, dan keluar pada setiap batas sistem?',
          ['jenis data', 'pihak yang boleh melihat', 'aturan penyimpanan', 'keluaran yang diizinkan', 'perlakuan data terlarang'],
        ),
        guide({
          plainConcept: 'batas keluar-masuk data (data boundary)',
          meaning: 'Batas data menetapkan jenis informasi yang boleh masuk, diproses, disimpan, dan ditampilkan. Kontrolnya harus ditempatkan sebelum data terlarang terlihat atau tercatat.',
          termGlosses: [
            term('collection', 'kelompok dokumen yang diizinkan untuk dicari'),
            term('secret', 'informasi rahasia seperti kunci akses'),
            term('trace', 'catatan urutan langkah yang dijalankan sistem'),
          ],
          workedStep: [
            'Kasus A: pengguna meminta dokumen di luar kumpulan yang disetujui.',
            'Keputusan: tolak akses sebelum isi dokumen dibaca.',
            'Hasil aman: tampilkan penolakan tanpa membocorkan isi atau keberadaan dokumen.',
          ],
          taskKind: 'make-decision',
          evidenceHint: 'Kalimat terakhir situasi menyebut tiga jenis informasi yang tidak boleh muncul pada rujukan atau catatan proses.',
          guidedTry: answer(
            'Informasi apa yang harus disembunyikan dari catatan proses, dan apa yang aman dicatat sebagai gantinya?',
            ['informasi yang disembunyikan', 'tempat perlindungan', 'catatan pengganti yang aman'],
          ),
          warning: 'Jangan hanya menulis “data aman”; sebutkan jenis data, batas, dan kontrolnya.',
        }),
      ),
    ],
  ),
  8: story(
    'junior AI solution engineer yang menyiapkan paket bukti RegulaRAG',
    'Sistem harus dapat dipahami pihak terkait dalam lima menit dan tetap menunjukkan apa yang terjadi ketika alur normal gagal.',
    [
      beat(
        'tracing',
        'Demo gagal tanpa petunjuk langkahnya',
        'Alur normal dapat terlihat baik, tetapi pencarian kosong atau layanan pendukung gagal. Jika hanya hasil akhir yang dicatat, tim tidak dapat menemukan langkah pertama yang bermasalah.',
        answer(
          'Catatan apa yang harus terhubung agar satu proses dapat dilacak dari awal sampai jawaban atau penolakan?',
          ['tahap proses', 'identitas penghubung', 'hasil ringkas tiap tahap', 'hasil akhir', 'cara menemukan kegagalan'],
        ),
        guide({
          plainConcept: 'jejak langkah sistem (tracing)',
          meaning: 'Jejak sistem menghubungkan langkah, waktu, hasil, kesalahan, dan keputusan dalam satu proses. Identitas yang sama membuat urutan kegagalan dapat dibangun kembali.',
          termGlosses: [
            term('trace', 'catatan lengkap perjalanan satu proses'),
            term('event', 'satu kejadian yang dicatat dalam proses'),
            term('trace ID', 'identitas yang menghubungkan semua catatan dalam satu proses'),
          ],
          workedStep: [
            'Kejadian A: pertanyaan diterima.',
            'Kejadian B: pencarian dimulai.',
            'Keduanya memakai identitas proses yang sama agar urutannya dapat dilacak.',
          ],
          taskKind: 'make-decision',
          guidedTry: answer(
            'Jika pencarian tidak menemukan bukti, dua kejadian berikutnya apa yang perlu dicatat dengan identitas yang sama?',
            ['kejadian keputusan', 'kejadian hasil akhir'],
          ),
          warning: 'Jangan hanya mencatat hasil akhir karena langkah pertama yang gagal tidak akan terlihat.',
        }),
      ),
      beat(
        'latency',
        'Rata-rata cepat, sebagian pengguna tetap menunggu lama',
        'Laporan belum menunjukkan waktu tengah dan waktu lambat yang dialami sebagian kecil pengguna. Waktu total berasal dari pencarian, pengurutan kedua, model, antrean, dan kemungkinan menunggu pemeriksa manusia.',
        answer(
          'Bagaimana lo menetapkan batas pengukuran, melaporkan sebaran waktu, dan menemukan bagian paling lambat?',
          ['awal dan akhir pengukuran', 'angka waktu yang dilaporkan', 'waktu tiap bagian', 'cara menemukan penyebab lambat'],
        ),
        guide({
          plainConcept: 'waktu respons dan sebarannya (latency)',
          meaning: 'Waktu respons diukur dari kejadian awal sampai hasil pada batas yang disepakati. Nilai tengah dan nilai lambat perlu dilaporkan agar rata-rata tidak menyembunyikan pengalaman buruk.',
          termGlosses: [
            term('latency', 'waktu dari permintaan sampai hasil'),
            term('p50', 'waktu yang lebih cepat daripada atau sama dengan separuh hasil'),
            term('p95', 'waktu yang mencakup 95 persen hasil dan menunjukkan bagian yang lambat'),
          ],
          workedStep: [
            'Batas pengukuran A dimulai saat pertanyaan diterima.',
            'Batas itu berakhir saat jawaban atau pesan tidak dapat menjawab dikirim.',
            'Hasil total perlu dipisahkan dari waktu tiap bagian proses.',
          ],
          taskKind: 'find-evidence',
          evidenceHint: 'Situasi menyebut pencarian, pengurutan kedua, model, antrean, dan waktu menunggu manusia sebagai penyusun waktu total.',
          guidedTry: answer(
            'Dari situasi, pilih tiga bagian waktu yang perlu diukur terpisah agar penyebab lambat terlihat.',
            ['bagian waktu pertama', 'bagian waktu kedua', 'bagian waktu ketiga'],
          ),
          warning: 'Jangan hanya memperbaiki rata-rata sambil menyembunyikan sebagian respons yang sangat lambat.',
        }),
      ),
      beat(
        'cost per query',
        'Harga model bukan seluruh biaya',
        'Satu pertanyaan dapat memakai pencarian, pengurutan kedua, model, penyimpanan, percobaan ulang, dan bantuan manusia. Klaim biaya sulit dipercaya jika batas perhitungan dan asumsi jumlah penggunaan tidak ditulis.',
        answer(
          'Komponen dan asumsi apa yang harus masuk perhitungan biaya satu pertanyaan?',
          ['komponen biaya', 'satuan pemakaian', 'rumus per pertanyaan', 'asumsi jumlah penggunaan'],
        ),
        guide({
          plainConcept: 'biaya per pertanyaan (cost per query)',
          meaning: 'Biaya satu pertanyaan mencakup semua pemakaian tambahan dari awal sampai hasil, bukan hanya harga model. Setiap komponen membutuhkan satuan pemakaian yang dapat dicatat.',
          termGlosses: [
            term('query', 'satu pertanyaan atau permintaan ke sistem'),
            term('incremental cost', 'biaya tambahan yang muncul karena satu permintaan'),
            term('workload', 'jumlah dan pola permintaan yang harus ditangani'),
          ],
          workedStep: [
            'Komponen A: pemakaian model.',
            'Satuan: jumlah token masukan dan keluaran.',
            'Komponen B: pencarian dokumen, dengan satuan jumlah operasi pencarian.',
          ],
          taskKind: 'explain',
          guidedTry: answer(
            'Selain model dan pencarian, komponen apa yang muncul saat proses diulang atau diserahkan kepada manusia?',
            ['komponen biaya', 'satuan pemakaian', 'alasan dimasukkan'],
          ),
          warning: 'Jangan menghitung harga model saja lalu melupakan percobaan ulang dan waktu manusia.',
        }),
      ),
    ],
  ),
  9: story(
    'junior operations solution architect yang memetakan InvoiceOps',
    'Lo pindah ke kasus operasional keuangan. Sebelum membuat agent, lo harus memahami alur tagihan normal dan kasus bermasalah yang saat ini masih bercampur.',
    [
      beat(
        'process mining',
        'Tagihan berpindah tanpa jejak yang utuh',
        'Tim utang usaha menerima tagihan lewat email dan spreadsheet, lalu mencocokkannya dengan surat pesanan dan catatan barang diterima di sistem keuangan tiruan. Kasus normal dan bermasalah masih bercampur, sementara catatan urutan kerjanya belum menyatu.',
        answer(
          'Catatan apa yang diperlukan agar perjalanan satu tagihan bisa ditelusuri dari masuk sampai selesai?',
          ['kejadian penting', 'siapa yang menangani', 'waktu kejadian', 'perubahan data atau status', 'kondisi akhir'],
        ),
        guide({
          plainConcept: 'membaca jejak proses (process mining)',
          meaning: 'Membaca jejak proses berarti menyusun alur nyata dari catatan kejadian, bukan dari dugaan tentang cara kerja yang ideal.',
          termGlosses: [
            term('invoice', 'tagihan dari pemasok'),
            term('purchase order / PO', 'surat pesanan perusahaan'),
            term('goods receipt', 'catatan bahwa barang sudah diterima'),
          ],
          workedStep: [
            'Bagian contoh: tagihan diterima melalui email.',
            'Catatan awal: waktu tagihan diterima.',
            'Catatan berikutnya: waktu staf mulai mencocokkan surat pesanan.',
          ],
          taskKind: 'explain',
          evidenceHint: 'Gunakan dua waktu yang disebut pada contoh: saat tagihan diterima dan saat pencocokan surat pesanan dimulai.',
          guidedTry: answer(
            'Kalau dua waktu itu tersedia, apa yang lo hitung untuk mengetahui lama tagihan menunggu?',
            ['waktu mulai', 'waktu selesai', 'selisih waktu'],
          ),
          warning: 'Jangan menggambar alur ideal tanpa memeriksa kejadian yang benar-benar tercatat.',
        }),
      ),
      beat(
        'exception taxonomy',
        'Masalah berbeda membutuhkan jalur berbeda',
        'Unggahan ganda, surat pesanan yang hilang, jumlah barang yang tidak cocok, dan hasil pindai buruk memiliki tanda, penanggung jawab, cara pemulihan, serta risiko yang berbeda.',
        answer(
          'Bagaimana lo membedakan setiap jenis masalah agar kasus bisa dikirim ke penanggung jawab dan berakhir dengan jelas?',
          ['jenis masalah', 'tanda yang terlihat', 'penanggung jawab', 'tindakan yang boleh dilakukan', 'tanda kasus selesai'],
        ),
        guide({
          plainConcept: 'pengelompokan kasus bermasalah (exception taxonomy)',
          meaning: 'Pengelompokan ini memisahkan masalah berdasarkan tanda, penanggung jawab, dan cara penyelesaiannya supaya semuanya tidak masuk satu keranjang.',
          termGlosses: [
            term('exception', 'kasus yang tidak dapat mengikuti alur normal'),
            term('owner', 'orang atau tim yang bertanggung jawab menanganinya'),
            term('terminal state', 'kondisi akhir yang menandakan kasus selesai atau dihentikan'),
          ],
          workedStep: [
            'Bagian contoh: hasil pindai buruk menjadi satu kategori tersendiri.',
            'Tandanya: isi tagihan tidak dapat dibaca dengan cukup yakin.',
            'Kasus tidak boleh diteruskan seolah datanya lengkap.',
          ],
          taskKind: 'find-evidence',
          evidenceHint: 'Cerita menyebut perbedaan jumlah antara tagihan dan catatan barang diterima sebagai masalah lain.',
          guidedTry: answer(
            'Apa tanda yang membedakan masalah jumlah barang yang tidak cocok dari hasil pindai buruk?',
            ['tanda masalah'],
          ),
          warning: 'Jangan mencampur masalah yang memiliki penanggung jawab atau cara pemulihan berbeda ke satu kategori umum.',
        }),
      ),
      beat(
        'permission map',
        'Yang memproses belum tentu boleh menyetujui pembayaran',
        'Staf utang usaha menjalankan proses, sedangkan pengawas keuangan memegang persetujuan pembayaran. Agent boleh membaca bukti dan mengusulkan jalur penanganan, tetapi tidak boleh menghitung pajak atau melakukan pembayaran.',
        answer(
          'Bagaimana wewenang setiap pihak ditulis agar sistem dapat memeriksanya sebelum menjalankan tindakan?',
          ['pihak', 'tindakan yang dibutuhkan', 'wewenang yang diberikan', 'wewenang yang ditolak'],
        ),
        guide({
          plainConcept: 'peta wewenang (permission map)',
          meaning: 'Peta wewenang mencatat tindakan apa yang boleh dan tidak boleh dilakukan setiap orang atau sistem.',
          termGlosses: [
            term('read', 'melihat data'),
            term('approve', 'memberi persetujuan'),
            term('write', 'mengubah atau mengirim data ke sistem lain'),
          ],
          workedStep: [
            'Bagian contoh: tindakan yang dinilai adalah menyetujui pembayaran.',
            'Pengawas keuangan boleh memberi persetujuan pembayaran.',
            'Hak melakukan pembayaran tetap berbeda dari hak memberi persetujuan.',
          ],
          taskKind: 'find-evidence',
          evidenceHint: 'Kasus menyatakan agent hanya boleh membaca bukti atau mengusulkan jalur dan tidak boleh melakukan pembayaran.',
          guidedTry: answer(
            'Untuk agent, apa yang boleh dilakukan dan apa yang wajib ditolak?',
            ['tindakan yang boleh', 'tindakan yang ditolak'],
          ),
          warning: 'Jangan mengandalkan nama jabatan; periksa wewenang pada saat tindakan akan dijalankan.',
        }),
      ),
    ],
  ),
  10: story(
    'junior agentic automation engineer yang menghubungkan InvoiceOps ke tools',
    'Peta proses sudah stabil. Sekarang lo menghubungkan InvoiceOps ke ERP tiruan sambil menjaga aturan hitung tetap pasti dan dapat diuji.',
    [
      beat(
        'typed tools',
        'Hasil gagal harus berbeda dari hasil kosong',
        'InvoiceOps perlu membaca surat pesanan, catatan barang diterima, dan pemasok dari ERP tiruan. Komponen pemanggil harus dapat membedakan data ditemukan, data tidak ada, input salah, waktu tunggu habis, dan ERP bermasalah.',
        answer(
          'Kontrak apa yang membuat setiap pemanggilan alat dapat diperiksa tanpa menebak arti teks?',
          ['tujuan alat', 'input wajib', 'hasil saat berhasil', 'jenis kegagalan', 'batas waktu dan akses'],
        ),
        guide({
          plainConcept: 'kontrak alat bertipe jelas (typed tools)',
          meaning: 'Kontrak alat menetapkan bentuk permintaan, hasil sukses, dan tiap kegagalan agar komponen lain dapat menanganinya secara pasti.',
          termGlosses: [
            term('caller', 'komponen yang memanggil alat'),
            term('not found', 'data yang dicari memang tidak ada'),
            term('timeout', 'batas waktu menunggu sudah habis'),
          ],
          workedStep: [
            'Bagian contoh: alat mencari surat pesanan memakai nomor PO.',
            'Jika ditemukan, hasil sukses membawa data surat pesanan.',
            'Jika tidak ditemukan, hasil harus berstatus “not found”, bukan sukses dengan data kosong.',
          ],
          taskKind: 'make-decision',
          guidedTry: answer(
            'Apa yang harus berbeda ketika surat pesanan tidak ada dibandingkan ketika ERP terlalu lama merespons?',
            ['status hasil', 'informasi untuk pemanggil'],
          ),
          warning: 'Jangan menyatukan data tidak ditemukan dan gangguan ERP dalam satu pesan bebas.',
        }),
      ),
      beat(
        'mock ERP',
        'ERP tiruan harus bisa dibuat gagal',
        'Lo tidak boleh memakai ERP nyata, tetapi tetap perlu menguji surat pesanan yang hilang, jumlah barang berbeda, waktu tunggu habis, dan layanan yang sedang mati.',
        answer(
          'Perilaku normal dan gagal apa yang harus tersedia di ERP tiruan agar pemulihan sistem dapat diuji?',
          ['skenario', 'respons ERP tiruan', 'status kasus yang diharapkan', 'cara membuktikannya'],
        ),
        guide({
          plainConcept: 'tiruan sistem ERP (mock ERP)',
          meaning: 'ERP tiruan meniru respons sistem keuangan tanpa menyentuh data atau layanan perusahaan yang nyata.',
          termGlosses: [
            term('ERP', 'sistem perusahaan untuk menyimpan data operasi dan keuangan'),
            term('mock', 'tiruan yang perilakunya dapat diatur untuk pengujian'),
          ],
          workedStep: [
            'Bagian contoh: ERP tiruan menerima nomor PO yang memang tersedia.',
            'ERP mengembalikan data surat pesanan dengan bentuk yang sesuai kontrak.',
            'Pengujian memastikan kasus dapat melanjutkan pencocokan.',
          ],
          taskKind: 'make-decision',
          guidedTry: answer(
            'Sekarang untuk surat pesanan yang hilang, respons apa yang diberikan ERP tiruan dan status apa yang harus terlihat pada kasus?',
            ['respons ERP tiruan', 'status kasus'],
          ),
          warning: 'Jangan membuat ERP tiruan yang hanya berhasil karena jalur pemulihan tidak akan pernah teruji.',
        }),
      ),
      beat(
        'n8n webhook',
        'Kiriman yang sama dapat datang dua kali',
        'Tagihan dapat dikirim ulang melalui email atau alamat penerima otomatis. n8n hanya menerima kiriman dan meneruskan data ke layanan utama; aturan bisnis tidak boleh disembunyikan di dalam alur n8n.',
        answer(
          'Apa yang harus diperiksa dan dicatat sebelum kiriman diakui sebagai diterima?',
          ['identitas kiriman', 'pemeriksaan isi', 'catatan penerimaan', 'hasil jika kiriman berulang'],
        ),
        guide({
          plainConcept: 'pintu masuk kiriman otomatis (n8n webhook)',
          meaning: 'Webhook adalah alamat digital yang menerima pemberitahuan saat suatu kejadian terjadi; n8n menjadi pintu masuk sederhana sebelum layanan utama bekerja.',
          termGlosses: [
            term('webhook', 'alamat penerima pemberitahuan otomatis'),
            term('payload', 'isi data yang dikirim'),
            term('deduplication', 'pemeriksaan agar kiriman yang sama tidak diproses dua kali'),
          ],
          workedStep: [
            'Bagian contoh: n8n menerima satu kiriman tagihan.',
            'Bentuk isi kiriman diperiksa sebelum data diteruskan ke layanan utama.',
            'Identitas kiriman disimpan sebagai catatan penerimaan.',
          ],
          taskKind: 'make-decision',
          evidenceHint: 'Kasus menyebut tagihan dapat dikirim ulang lewat email atau webhook, jadi identitas kiriman harus dibandingkan dengan catatan sebelumnya.',
          guidedTry: answer(
            'Saat kiriman kedua datang, apa yang diperiksa dan apa keputusan awalnya?',
            ['pemeriksaan', 'keputusan awal'],
          ),
          warning: 'Jangan menaruh aturan pajak, toleransi, atau pembayaran di n8n; simpan aturan itu di layanan yang dapat diuji.',
        }),
      ),
    ],
  ),
  11: story(
    'junior agentic automation engineer yang membuat approval workflow dapat dilanjutkan',
    'Alat sudah bekerja. Sekarang satu kasus harus dapat berhenti beberapa jam, diperiksa manusia, lalu dilanjutkan tanpa kehilangan bukti atau memakai persetujuan yang sudah tidak berlaku.',
    [
      beat(
        'checkpoint',
        'Kasus berhenti saat menunggu pemeriksa',
        'Hasil pembacaan yang keyakinannya rendah harus masuk antrean pemeriksa. Selama menunggu, layanan dapat dimulai ulang dan isi kasus dapat berubah, sehingga riwayat chat saja tidak cukup.',
        answer(
          'Data apa yang harus disimpan agar kasus bisa dilanjutkan dengan aman setelah pemeriksa selesai?',
          ['status saat berhenti', 'salinan bukti', 'versi kasus', 'syarat melanjutkan', 'tindakan jika versi berubah'],
        ),
        guide({
          plainConcept: 'titik simpan proses (checkpoint)',
          meaning: 'Titik simpan merekam status, bukti, dan versi kasus agar proses dapat berhenti lalu dilanjutkan dari kondisi yang benar.',
          termGlosses: [
            term('checkpoint', 'titik simpan yang tetap ada saat layanan dimulai ulang'),
            term('snapshot', 'salinan data pada satu waktu tertentu'),
            term('version', 'penanda perubahan pada data kasus'),
          ],
          workedStep: [
            'Bagian contoh: kasus berhenti dengan status “menunggu pemeriksaan”.',
            'Salinan bagian data yang dibaca dari tagihan disimpan bersama bukti sumbernya.',
            'Versi kasus saat berhenti ikut disimpan.',
          ],
          taskKind: 'make-decision',
          guidedTry: answer(
            'Sebelum kasus dilanjutkan, versi mana yang dibandingkan dan apa yang dilakukan jika berbeda?',
            ['versi yang dibandingkan', 'tindakan jika berbeda'],
          ),
          warning: 'Jangan memakai riwayat chat sebagai satu-satunya tempat menyimpan status kasus.',
        }),
      ),
      beat(
        'human-in-the-loop',
        'Pemeriksa membutuhkan lebih dari tombol setuju',
        'Pemeriksa harus melihat data yang dibaca, bagian gambar sumber, hasil hitung aturan, tingkat keyakinan, dan alasan kasus dikirim kepadanya. Tanpa itu, persetujuan hanya memindahkan risiko ke manusia.',
        answer(
          'Apa yang harus dilihat dan dapat dilakukan pemeriksa agar keputusannya bermakna?',
          ['informasi yang dilihat', 'pilihan keputusan', 'koreksi yang diizinkan', 'alasan keputusan', 'hasil setelah pemeriksaan'],
        ),
        guide({
          plainConcept: 'pemeriksaan manusia di tengah proses (human-in-the-loop)',
          meaning: 'Pemeriksaan manusia adalah titik berhenti terencana ketika sistem membutuhkan keputusan dari orang yang berwenang.',
          termGlosses: [
            term('reviewer', 'orang yang memeriksa kasus'),
            term('confidence', 'tingkat keyakinan sistem terhadap hasil baca'),
            term('escalation', 'pengiriman kasus ke pihak yang lebih berwenang'),
          ],
          workedStep: [
            'Bagian contoh: pemeriksa menerima kasus dengan tingkat keyakinan rendah.',
            'Ia melihat data hasil baca dan bagian gambar tagihan yang menjadi sumber.',
            'Pilihan “setuju” belum cukup jika datanya ternyata salah.',
          ],
          taskKind: 'make-decision',
          guidedTry: answer(
            'Selain menyetujui, dua tindakan apa yang perlu tersedia bagi pemeriksa?',
            ['tindakan pertama', 'tindakan kedua'],
          ),
          warning: 'Jangan menjadikan manusia sekadar tombol setuju tanpa bukti dan pilihan koreksi atau penolakan.',
        }),
      ),
      beat(
        'audit trail',
        'Sesudah data diubah, tim harus tahu alasannya',
        'Tim perlu mengetahui siapa mengubah jalur kasus, versi bukti yang dilihat, persetujuan yang dipakai, dan apakah perubahan ke ERP hanya terjadi sekali. Catatan juga tidak boleh membocorkan rahasia.',
        answer(
          'Catatan kejadian apa yang diperlukan agar urutan keputusan dan perubahan dapat ditelusuri kembali?',
          ['kejadian', 'pelaku dan waktu', 'versi bukti', 'perubahan status', 'hasil perubahan ke sistem lain'],
        ),
        guide({
          plainConcept: 'jejak pemeriksaan yang tidak dapat diubah (audit trail)',
          meaning: 'Jejak pemeriksaan adalah urutan catatan permanen tentang siapa melakukan apa, kapan, berdasarkan bukti mana, dan dengan hasil apa.',
          termGlosses: [
            term('audit trail', 'riwayat tindakan yang dapat ditelusuri'),
            term('approval token', 'bukti digital bahwa tindakan tertentu sudah disetujui'),
            term('side effect', 'perubahan nyata pada sistem lain'),
          ],
          workedStep: [
            'Bagian contoh: pemeriksa mengubah jalur satu kasus.',
            'Catatan menyimpan identitas pemeriksa, waktu, status lama, dan status baru.',
            'Versi bukti yang dilihat ikut dicatat.',
          ],
          taskKind: 'make-decision',
          guidedTry: answer(
            'Apa yang menghubungkan keputusan pemeriksa dengan perubahan ke ERP yang terjadi sesudahnya?',
            ['bukti persetujuan', 'hasil perubahan'],
          ),
          warning: 'Jangan membuat catatan yang dapat diedit atau memasukkan kata sandi dan rahasia akses.',
        }),
      ),
    ],
  ),
  12: story(
    'junior reliability engineer yang menguji failure InvoiceOps',
    'Alur normal sudah selesai. Sekarang lo sengaja mengirim data berulang, membuat batas waktu habis, memberi data rusak, dan mematikan ERP tiruan untuk memastikan tidak ada tindakan ganda atau kasus hilang.',
    [
      beat(
        'idempotency',
        'Kiriman ulang tidak boleh membuat tindakan kedua',
        'Sistem pengirim menjamin sebuah kiriman datang setidaknya sekali, bukan tepat sekali. Akibatnya, kiriman yang sama bisa datang lagi, termasuk setelah ERP berhasil tetapi InvoiceOps lebih dulu menganggap waktu tunggunya habis.',
        answer(
          'Pemeriksaan apa yang memastikan kiriman ulang tetap menghasilkan satu kasus dan satu perubahan?',
          ['identitas kiriman', 'status yang sudah tercatat', 'keputusan sebelum bertindak', 'hasil saat dikirim ulang'],
        ),
        guide({
          plainConcept: 'aman saat permintaan diulang (idempotency)',
          meaning: 'Idempotency berarti permintaan yang sama dapat diulang tanpa membuat hasil tambahan seperti kasus atau pembayaran kedua.',
          termGlosses: [
            term('idempotency key', 'identitas unik untuk mengenali operasi yang sama'),
            term('replay', 'pengiriman ulang permintaan yang pernah diterima'),
            term('at-least-once delivery', 'kiriman dijamin tiba, tetapi bisa tiba lebih dari sekali'),
          ],
          workedStep: [
            'Bagian contoh: kiriman pertama membawa identitas operasi yang unik.',
            'Sebelum mengubah data, sistem menyimpan identitas itu bersama status proses.',
            'Jika statusnya sudah selesai, sistem mengembalikan hasil lama tanpa membuat perubahan baru.',
          ],
          taskKind: 'make-decision',
          evidenceHint: 'Kasus menyebut ERP mungkin sudah berhasil walau InvoiceOps melihat timeout; karena itu status “belum pasti” tidak sama dengan “belum pernah diproses”.',
          guidedTry: answer(
            'Jika identitas operasi ditemukan tetapi status akhirnya belum pasti, apa yang harus diperiksa sebelum mencoba perubahan lagi?',
            ['data yang diperiksa', 'keputusan sementara'],
          ),
          warning: 'Jangan menganggap percobaan ulang aman hanya karena pemanggil tidak menerima respons sukses.',
        }),
      ),
      beat(
        'backoff',
        'Semua pekerja jangan mencoba lagi bersamaan',
        'ERP yang sedang mati atau membatasi jumlah permintaan dapat pulih. Namun, percobaan ulang serentak tanpa batas justru menambah beban dan memperlambat pemulihan.',
        answer(
          'Bagaimana aturan percobaan ulang membatasi waktu, jumlah, jarak antarpercobaan, dan kondisi berhenti?',
          ['kegagalan yang boleh dicoba ulang', 'batas waktu', 'pola jeda', 'jumlah maksimum', 'hasil setelah batas habis'],
        ),
        guide({
          plainConcept: 'jeda percobaan ulang bertahap (backoff)',
          meaning: 'Backoff memberi jeda yang makin panjang sebelum mencoba lagi, sementara variasi kecil mencegah semua pekerja mencoba pada waktu yang sama.',
          termGlosses: [
            term('retry', 'mencoba operasi yang gagal sekali lagi'),
            term('backoff', 'jeda yang bertambah sebelum percobaan berikutnya'),
            term('jitter', 'variasi kecil pada jeda agar percobaan tidak serentak'),
          ],
          workedStep: [
            'Bagian contoh: input salah tidak dicoba ulang karena hasilnya tidak akan berubah.',
            'Gangguan ERP sementara boleh masuk percobaan berikutnya.',
            'Percobaan berikutnya tidak dilakukan langsung, tetapi setelah jeda.',
          ],
          taskKind: 'make-decision',
          guidedTry: answer(
            'Untuk gangguan ERP sementara, bagaimana pola jeda dan batas akhirnya harus ditulis?',
            ['pola jeda', 'batas akhir'],
          ),
          warning: 'Jangan mencoba ulang semua jenis kegagalan atau membiarkan semua pekerja mencoba bersamaan.',
        }),
      ),
      beat(
        'dead-letter queue',
        'Kiriman yang terus gagal perlu tempat aman',
        'Data tagihan yang rusak atau gangguan ERP dapat tetap gagal setelah jatah percobaan ulang habis. Kiriman itu tidak boleh hilang dan tidak boleh diputar tanpa akhir.',
        answer(
          'Apa yang disimpan dan siapa yang bertanggung jawab ketika kiriman dipindahkan ke jalur gagal?',
          ['kiriman yang dipindahkan', 'alasan dan riwayat gagal', 'data untuk pemeriksaan', 'penanggung jawab', 'syarat kirim ulang'],
        ),
        guide({
          plainConcept: 'antrean khusus kiriman gagal (dead-letter queue)',
          meaning: 'Dead-letter queue adalah tempat terpisah untuk kiriman yang tetap gagal setelah batas percobaan habis agar dapat diperiksa dan dipulihkan dengan aman.',
          termGlosses: [
            term('dead-letter queue / DLQ', 'antrean terpisah untuk kiriman yang tidak berhasil diproses'),
            term('retry budget', 'batas jumlah atau waktu percobaan ulang'),
            term('replay', 'mengirim ulang kiriman setelah penyebabnya diperbaiki'),
          ],
          workedStep: [
            'Bagian contoh: data tagihan rusak terus gagal diperiksa sampai jatah percobaan habis.',
            'Referensi data dan riwayat kesalahan dipindahkan ke antrean gagal.',
            'Kasus tidak dianggap selesai dan tidak dicoba ulang otomatis tanpa batas.',
          ],
          taskKind: 'make-decision',
          guidedTry: answer(
            'Siapa yang menerima pemberitahuan dan bukti apa yang perlu tersedia untuk mulai memeriksa kasus ini?',
            ['penanggung jawab', 'bukti kegagalan'],
          ),
          warning: 'Jangan membuat antrean gagal tanpa penanggung jawab, pemberitahuan, dan syarat pengiriman ulang.',
        }),
      ),
    ],
  ),
  13: story(
    'junior evaluation engineer yang mengukur outcome InvoiceOps',
    'Alur sudah tahan terhadap kegagalan yang diuji. Sekarang lo membuktikan apakah otomatisasi mengurangi kerja manual tanpa menyembunyikan hasil berkeyakinan rendah atau risiko keuangan.',
    [
      beat(
        'routing accuracy',
        'Angka ketepatan tinggi dapat menyembunyikan kasus berisiko',
        'Data uji sintetis memuat kasus normal, data tidak cocok, unggahan ganda, hasil berkeyakinan rendah, dan input berbahaya. Satu angka rata-rata dapat menutupi kegagalan pada kelompok yang paling berisiko.',
        answer(
          'Bagaimana ketepatan jalur penanganan dinilai per kelompok kasus?',
          ['cara menentukan jawaban acuan', 'kelompok kasus', 'ukuran per kelompok', 'pola salah jalur', 'dasar menerima hasil'],
        ),
        guide({
          plainConcept: 'ketepatan jalur penanganan (routing accuracy)',
          meaning: 'Ukuran ini membandingkan jalur yang dipilih sistem dengan jalur acuan yang sudah ditetapkan manusia, lalu membacanya per kelompok risiko.',
          termGlosses: [
            term('gold label', 'jawaban acuan yang sudah diperiksa manusia'),
            term('slice', 'kelompok kecil data dengan ciri yang sama'),
            term('false route', 'kasus yang dikirim ke jalur yang salah'),
          ],
          workedStep: [
            'Bagian contoh: satu kasus normal memiliki jalur acuan “lanjut pencocokan”.',
            'Sistem juga memilih “lanjut pencocokan”.',
            'Untuk kasus itu, pilihan sistem cocok dengan acuan.',
          ],
          taskKind: 'find-evidence',
          evidenceHint: 'Gunakan kasus “jumlah barang tidak cocok” dan bandingkan jalur acuan dengan jalur yang dipilih sistem.',
          guidedTry: answer(
            'Dua nilai apa yang dibandingkan untuk menilai satu kasus jumlah barang tidak cocok?',
            ['jalur acuan', 'jalur sistem'],
          ),
          warning: 'Jangan memakai satu angka gabungan yang menyembunyikan kegagalan pada kelompok berisiko.',
        }),
      ),
      beat(
        'human-touch time',
        'Kerja manual bisa berkurang atau hanya berpindah',
        'Sistem dapat mengurangi pencarian, tetapi kasus berkeyakinan rendah tetap masuk antrean pemeriksa. Waktu kerja aktif dan waktu menunggu tidak boleh dicampur atau dihilangkan.',
        answer(
          'Waktu manusia apa yang dihitung dari tagihan masuk sampai kasus selesai, lalu dibandingkan dengan proses manual?',
          ['langkah manusia', 'waktu kerja aktif', 'waktu menunggu', 'titik perpindahan', 'perbandingan dengan proses manual'],
        ),
        guide({
          plainConcept: 'waktu kerja manusia per kasus (human-touch time)',
          meaning: 'Human-touch time adalah waktu ketika manusia benar-benar mengerjakan kasus; angka ini dipisahkan dari waktu kasus hanya menunggu.',
          termGlosses: [
            term('human-touch time', 'waktu kerja aktif manusia'),
            term('handoff', 'perpindahan tanggung jawab ke orang atau tim lain'),
            term('baseline', 'ukuran proses lama sebagai pembanding'),
          ],
          workedStep: [
            'Bagian contoh: pemeriksa aktif membaca kasus selama beberapa menit.',
            'Waktu aktif itu dicatat sebagai waktu kerja manusia.',
            'Waktu sebelum pemeriksa membuka kasus dicatat terpisah sebagai waktu menunggu.',
          ],
          taskKind: 'explain',
          guidedTry: answer(
            'Mengapa waktu aktif dan waktu menunggu harus dilaporkan terpisah?',
            ['alasan pemisahan', 'risiko jika dicampur'],
          ),
          warning: 'Jangan menyebut kerja manual berkurang jika sebenarnya hanya berpindah ke antrean pemeriksa.',
        }),
      ),
      beat(
        'cost per case',
        'Biaya satu kasus bukan hanya harga model',
        'Biaya InvoiceOps dapat mencakup model, alat, penyimpanan, percobaan ulang, dan waktu pemeriksa. Data dasar serta jumlah kasus masih sintetis, sehingga hasilnya adalah simulasi, bukan penghematan nyata client.',
        answer(
          'Bagaimana biaya dan manfaat simulasi dihitung tanpa membuat klaim berlebihan?',
          ['komponen biaya', 'rumus per kasus', 'data dasar dan volume', 'asumsi yang diuji', 'batas klaim'],
        ),
        guide({
          plainConcept: 'biaya rata-rata per kasus (cost per case)',
          meaning: 'Cost per case menjumlahkan seluruh biaya yang relevan untuk menyelesaikan satu kasus pada batas proses yang sudah ditentukan.',
          termGlosses: [
            term('loaded human cost', 'biaya waktu kerja manusia termasuk beban perusahaan'),
            term('sensitivity analysis', 'menguji bagaimana hasil berubah saat asumsi diubah'),
            term('simulated ROI', 'perkiraan hasil investasi berbasis data simulasi'),
          ],
          workedStep: [
            'Bagian contoh: biaya satu kasus normal terdiri dari pemakaian model dan alat.',
            'Rumus awalnya adalah biaya model ditambah biaya alat.',
            'Biaya pemeriksa tidak dimasukkan karena kasus normal tidak memerlukan pemeriksaan.',
          ],
          taskKind: 'explain',
          guidedTry: answer(
            'Bagaimana rumusnya berubah untuk kasus yang membutuhkan pemeriksa manusia?',
            ['komponen tambahan', 'rumus biaya per kasus'],
          ),
          warning: 'Jangan menyebut hasil simulasi sebagai penghematan client nyata; angka contoh hanya dipakai untuk memahami rumus.',
        }),
      ),
    ],
  ),
  14: story(
    'AI solution engineer yang mengubah dua project menjadi evidence untuk recruiter dan client',
    'RegulaRAG dan InvoiceOps sudah memiliki hasil kerja teknis. Kini lo membuat pembaca memahami masalah, keputusan, bukti, dan batasannya dalam lima menit.',
    [
      beat(
        'case study',
        'Perekrut membuka README sebelum kode',
        'Pembaca baru melihat dua repository dan belum mengetahui konteks client. Daftar fitur tidak menjelaskan masalah, batasan, tindakan lo, atau bukti bahwa sistem bekerja.',
        answer(
          'Bagaimana urutan cerita membuat masalah, kontribusi, hasil, dan bukti mudah dipahami dalam lima menit?',
          ['masalah dan konteks', 'peran serta tindakan lo', 'hasil', 'bukti', 'urutan penyampaian'],
        ),
        guide({
          plainConcept: 'cerita proyek berbasis bukti (case study)',
          meaning: 'Case study menghubungkan masalah client, batasan, keputusan, kontribusi, hasil, dan keterbatasan menjadi satu cerita yang dapat diperiksa.',
          termGlosses: [
            term('case study', 'cerita proyek yang menunjukkan cara masalah diselesaikan'),
            term('evidence', 'data atau hasil uji yang mendukung klaim'),
            term('limitation', 'batas hal yang sudah berhasil dibuktikan'),
          ],
          workedStep: [
            'Bagian contoh RegulaRAG dibuka dengan pencarian sumber yang memakan 15–90 menit.',
            'Masalah itu didukung data waktu dan catatan bahwa sumber tidak selalu dicantumkan.',
            'Pembaca langsung memahami masalah sebelum melihat fitur.',
          ],
          taskKind: 'find-evidence',
          evidenceHint: 'Untuk InvoiceOps, gunakan perbedaan waktu kasus normal 8–12 menit dan kasus bermasalah 25–50 menit.',
          guidedTry: answer(
            'Bagaimana lo membuka cerita InvoiceOps dengan satu masalah dan satu bukti?',
            ['masalah pembuka', 'bukti pendukung'],
          ),
          warning: 'Jangan mengubah case study menjadi daftar fitur tanpa ukuran awal, kegagalan, dan keputusan.',
        }),
      ),
      beat(
        'architecture narrative',
        'Diagram belum menjelaskan alasan keputusan',
        'RegulaRAG memisahkan pencarian bukti dari interpretasi manusia. InvoiceOps memisahkan pembacaan model dari perhitungan pasti dan persetujuan pembayaran. Diagram saja belum menjelaskan mengapa batas itu dipilih.',
        answer(
          'Bagaimana satu keputusan arsitektur dijelaskan dari konteks sampai akibatnya?',
          ['konteks', 'pilihan lain', 'keputusan', 'alasan dan akibat', 'bukti pendukung'],
        ),
        guide({
          plainConcept: 'cerita keputusan arsitektur (architecture narrative)',
          meaning: 'Cerita arsitektur menjelaskan masalah yang dihadapi, pilihan yang dipertimbangkan, keputusan yang dipilih, dan akibatnya.',
          termGlosses: [
            term('alternative', 'pilihan lain yang sempat dipertimbangkan'),
            term('trade-off', 'manfaat yang didapat dengan konsekuensi yang harus diterima'),
            term('consequence', 'akibat dari keputusan yang dipilih'),
          ],
          workedStep: [
            'Bagian contoh InvoiceOps: total dan pajak harus dapat diuji dengan hasil yang sama.',
            'Keputusan: perhitungan ditempatkan pada aturan kode, bukan prompt model.',
            'Akibat: sistem lebih mudah diuji, tetapi aturan perlu dipelihara secara eksplisit.',
          ],
          taskKind: 'explain',
          guidedTry: answer(
            'Untuk RegulaRAG, mengapa interpretasi tetap dipisahkan dari pencarian bukti?',
            ['alasan keputusan', 'akibatnya'],
          ),
          warning: 'Jangan menyebut framework atau diagram tanpa menjelaskan batasan yang membuat keputusan itu perlu.',
        }),
      ),
      beat(
        'limitations',
        'Demo sintetis bukan hasil client nyata',
        'Evaluasi dan perkiraan hasil investasi memakai data publik atau sintetis. Kegagalan yang diketahui dan hal yang bukan tujuan proyek harus terlihat agar angka tidak berubah menjadi klaim bisnis berlebihan.',
        answer(
          'Bagaimana klaim dibatasi sesuai bukti yang benar-benar tersedia?',
          ['klaim', 'bukti pendukung', 'kondisi berlakunya', 'batas atau ketidakpastian', 'bukti yang masih kurang'],
        ),
        guide({
          plainConcept: 'batas hal yang sudah dibuktikan (limitations)',
          meaning: 'Limitations menjelaskan kondisi, kekurangan data, dan kegagalan yang membuat hasil proyek belum dapat digeneralisasi.',
          termGlosses: [
            term('synthetic data', 'data buatan yang menyerupai kasus nyata'),
            term('non-goal', 'hal yang sengaja tidak diselesaikan proyek'),
            term('known failure', 'kegagalan yang sudah diketahui dari pengujian'),
          ],
          workedStep: [
            'Bagian contoh: RegulaRAG diuji dengan dokumen publik dan SOP sintetis.',
            'Klaim aman: sistem menunjukkan metode evaluasi pada data tersebut.',
            'Klaim tidak aman: hasilnya membuktikan performa pada data rahasia perusahaan nyata.',
          ],
          taskKind: 'explain',
          guidedTry: answer(
            'Batas apa yang harus menyertai perkiraan hasil investasi InvoiceOps?',
            ['asal data', 'hal yang belum dibuktikan'],
          ),
          warning: 'Jangan menyembunyikan batas agar demo terlihat seperti hasil produksi nyata.',
        }),
      ),
    ],
  ),
  15: story(
    'AI engineer candidate yang mempertahankan keputusan project dalam interview',
    'Portfolio siap dibaca. Pewawancara akan mengubah batasan kasus dan meminta alasan di balik rancangan sistem, evaluasi, keamanan, biaya, serta cara kembali ke kondisi aman.',
    [
      beat(
        'system design',
        'Batasan berubah saat rancangan dibahas',
        'Pewawancara menaikkan jumlah pekerjaan atau mengubah kebutuhan keandalan. Menyebut nama framework tidak menjelaskan batas sistem, aliran data, izin alat, pengujian, dan pemulihan.',
        answer(
          'Apa yang lo klarifikasi dan putuskan ketika satu batasan sistem berubah?',
          ['perubahan batasan', 'pertanyaan klarifikasi', 'bagian yang terdampak', 'keputusan prioritas', 'konsekuensi dan cara menguji'],
        ),
        guide({
          plainConcept: 'latihan merancang sistem (system design)',
          meaning: 'System design adalah proses memilih bagian sistem, hubungan, batas, dan cara pemulihan berdasarkan kebutuhan yang diberikan.',
          termGlosses: [
            term('workload', 'jumlah pekerjaan yang harus ditangani sistem'),
            term('reliability', 'kemampuan sistem tetap bekerja dan pulih saat gagal'),
            term('rollback', 'kembali ke kondisi aman setelah perubahan gagal'),
          ],
          workedStep: [
            'Bagian contoh: jumlah tagihan InvoiceOps meningkat.',
            'Batas persetujuan pembayaran oleh Finance Controller tetap dipertahankan.',
            'Sebelum mengubah rancangan, ukur antrean dan waktu proses per bagian.',
          ],
          taskKind: 'make-decision',
          guidedTry: answer(
            'Petunjuk terukur apa yang lo lihat untuk menentukan bagian mana yang kewalahan lebih dulu?',
            ['bagian yang diukur', 'petunjuk yang dicari'],
          ),
          warning: 'Jangan menggambar rancangan generik tanpa jumlah pekerjaan dan skenario gagal yang jelas.',
        }),
      ),
      beat(
        'English walkthrough',
        'Penjelasan bahasa Inggris harus tetap runtut',
        'Lo perlu menjelaskan masalah, bukti, rancangan, evaluasi, kegagalan, dan batas proyek dalam bahasa Inggris kerja. Kalimat sederhana lebih kuat daripada jargon yang sulit dipertahankan saat ditanya alasannya.',
        answer(
          'Bagaimana lo menyusun penjelasan sepuluh menit dan menerangkan satu keputusan dalam tiga kalimat sederhana?',
          ['urutan bagian', 'problem and constraint', 'decision and reason', 'evidence and failure', 'limitation'],
        ),
        guide({
          plainConcept: 'penjelasan teknis bahasa Inggris (English walkthrough)',
          meaning: 'Walkthrough adalah penjelasan lisan terstruktur yang membawa pendengar dari masalah menuju keputusan, bukti, kegagalan, dan batas proyek.',
          termGlosses: [
            term('walkthrough', 'penjelasan langkah demi langkah'),
            term('working English', 'bahasa Inggris yang jelas untuk komunikasi kerja'),
            term('trade-off', 'manfaat keputusan beserta konsekuensinya'),
          ],
          workedStep: [
            'Bagian contoh membuka RegulaRAG dengan kalimat: “Analysts spend 15–90 minutes finding evidence, and citations are inconsistent.”',
            'Kalimat itu menyebut masalah dan bukti tanpa istilah rumit.',
            'Keputusan sistem belum dijelaskan pada contoh pembuka ini.',
          ],
          taskKind: 'explain',
          guidedTry: answer(
            'Tulis satu kalimat English yang menjelaskan keputusan utama RegulaRAG setelah kalimat pembuka itu.',
            ['decision sentence in English'],
          ),
          warning: 'Jangan menghafal istilah yang tidak dapat lo jelaskan kembali dengan kalimat sederhana.',
        }),
      ),
      beat(
        'STAR stories',
        'Kontribusi pribadi harus terlihat',
        'Proyek memiliki momen ketika evaluasi menemukan sumber jawaban yang salah atau uji kegagalan menemukan tindakan ganda. Pewawancara perlu memahami situasi, tanggung jawab lo, tindakan pribadi, dan hasil yang dapat dibuktikan.',
        answer(
          'Bagaimana satu pengalaman disusun agar kontribusi pribadi dan hasilnya terlihat?',
          ['Situation', 'Task', 'Action', 'Result', 'evidence'],
        ),
        guide({
          plainConcept: 'cerita pengalaman dengan STAR (STAR stories)',
          meaning: 'STAR menyusun jawaban interview menjadi Situation, Task, Action, dan Result agar konteks, tanggung jawab, tindakan pribadi, serta hasil tidak bercampur.',
          termGlosses: [
            term('Situation', 'kondisi atau masalah yang terjadi'),
            term('Task', 'tanggung jawab pribadi lo'),
            term('Action and Result', 'tindakan yang lo lakukan dan hasilnya'),
          ],
          workedStep: [
            'Situation: uji pengiriman ulang InvoiceOps menemukan tindakan ganda.',
            'Task: lo bertanggung jawab menemukan batas sistem yang gagal.',
            'Action dan Result sengaja belum diisi pada contoh ini.',
          ],
          taskKind: 'explain',
          guidedTry: answer(
            'Apa satu tindakan pribadi yang lo lakukan setelah tindakan ganda ditemukan, dan perubahan apa yang dihasilkan?',
            ['Action', 'Result'],
          ),
          warning: 'Jangan menceritakan aktivitas seluruh tim tanpa menunjukkan tindakan pribadi dan bukti hasilnya.',
        }),
      ),
    ],
  ),
  16: story(
    'AI engineer candidate yang menjalankan pencarian kerja sebagai eksperimen terukur',
    'Lo tidak mengirim lamaran secara acak. Bukti portfolio menjadi bahan utama, sedangkan respons perusahaan menjadi petunjuk untuk menentukan perbaikan berikutnya.',
    [
      beat(
        'target roles',
        'Judul berbeda dapat meminta kemampuan serupa',
        'Lowongan memakai judul AI Solutions Engineer, Agentic Developer, atau Automation Specialist. Isi pekerjaannya dapat tumpang tindih, tetapi satu pesan dan bukti yang sama untuk semua lowongan akan terasa kurang relevan.',
        answer(
          'Bagaimana lowongan dikelompokkan berdasarkan masalah dan kemampuan, lalu dipasangkan dengan bukti portfolio?',
          ['aturan kelompok', 'masalah utama', 'kemampuan yang dicari', 'bukti portfolio', 'tanda kecocokan'],
        ),
        guide({
          plainConcept: 'kelompok peran sasaran (target roles)',
          meaning: 'Peran sasaran dikelompokkan berdasarkan masalah yang harus diselesaikan dan kemampuan yang diminta, bukan hanya berdasarkan judul.',
          termGlosses: [
            term('role cluster', 'kelompok lowongan dengan kebutuhan serupa'),
            term('capability', 'kemampuan yang dibutuhkan untuk melakukan pekerjaan'),
            term('positioning', 'cara singkat menjelaskan nilai yang lo tawarkan'),
          ],
          workedStep: [
            'Bagian contoh: dua lowongan sama-sama meminta kemampuan membangun pencarian berbasis bukti.',
            'Keduanya masuk kelompok solusi pengetahuan meski judulnya berbeda.',
            'RegulaRAG menjadi bukti yang paling dekat untuk kelompok itu.',
          ],
          taskKind: 'find-evidence',
          evidenceHint: 'InvoiceOps menunjukkan otomatisasi alur, integrasi ERP tiruan, pemeriksaan manusia, dan penanganan kegagalan.',
          guidedTry: answer(
            'Untuk kelompok lowongan yang menekankan otomatisasi alur kerja, proyek dan bukti apa yang lo pilih?',
            ['proyek', 'bukti utama'],
          ),
          warning: 'Jangan mengirim pesan dan bukti yang sama ke semua lowongan tanpa memeriksa kebutuhan pekerjaannya.',
        }),
      ),
      beat(
        'funnel diagnosis',
        'Tahap macet menunjukkan masalah yang berbeda',
        'Tidak mendapat panggilan awal, gagal wawancara teknis, dan gagal wawancara akhir menunjukkan kemungkinan masalah yang berbeda. Menambah jumlah lamaran saja tidak menjelaskan penyebabnya.',
        answer(
          'Angka dan petunjuk apa yang membedakan masalah target lowongan, CV, kemampuan teknis, dan cara bercerita?',
          ['tahap', 'angka perpindahan tahap', 'petunjuk kegagalan', 'dugaan penyebab', 'cara menguji dugaan'],
        ),
        guide({
          plainConcept: 'mencari titik macet lamaran (funnel diagnosis)',
          meaning: 'Funnel adalah urutan tahap dari lamaran sampai penawaran; diagnosis mencari tahap dengan penurunan terbesar sebelum memilih perbaikan.',
          termGlosses: [
            term('funnel', 'urutan tahap yang dilalui kandidat'),
            term('screening', 'seleksi awal sebelum wawancara teknis'),
            term('conversion rate', 'persentase yang berhasil berpindah ke tahap berikutnya'),
          ],
          workedStep: [
            'Bagian contoh: hitung jumlah panggilan awal dibagi jumlah lamaran relevan.',
            'Ubah hasil pembagian menjadi persentase perpindahan tahap.',
            'Angka itu menunjukkan besarnya perpindahan, tetapi belum membuktikan penyebabnya.',
          ],
          taskKind: 'explain',
          guidedTry: answer(
            'Bagaimana lo membandingkan hasil sebelum dan sesudah CV diperbaiki?',
            ['rumus persentase', 'perbandingan yang dicatat'],
          ),
          warning: 'Jangan menyimpulkan penyebab hanya dari satu angka; gunakan perubahan sebagai petunjuk untuk eksperimen berikutnya.',
        }),
      ),
      beat(
        'iteration backlog',
        'Tidak semua perbaikan perlu dikerjakan bersamaan',
        'Hasil pencarian kerja menunjukkan beberapa kekurangan, sementara waktu terbatas. Mempercantik landing page belum tentu mengurangi risiko terbesar jika bukti penanganan kegagalan masih lemah.',
        answer(
          'Bagaimana eksperimen dua minggu diurutkan berdasarkan ketidakpastian, dampak, usaha, dan nilai pembelajaran?',
          ['kekurangan atau dugaan', 'risiko dan dampak', 'usaha', 'hal yang ingin dipelajari', 'urutan eksperimen'],
        ),
        guide({
          plainConcept: 'daftar eksperimen perbaikan (iteration backlog)',
          meaning: 'Iteration backlog adalah daftar eksperimen kecil yang diurutkan agar waktu dipakai untuk mengurangi ketidakpastian paling penting.',
          termGlosses: [
            term('backlog', 'daftar pekerjaan yang belum dikerjakan'),
            term('hypothesis', 'dugaan yang dapat diuji'),
            term('success signal', 'bukti yang menunjukkan eksperimen memberi perbaikan'),
          ],
          workedStep: [
            'Bagian contoh membandingkan landing page yang kurang rapi dengan bukti penanganan kegagalan yang lemah.',
            'Bukti kegagalan lebih dekat dengan risiko gagal pada wawancara teknis.',
            'Karena itu, kekurangan teknis menjadi kandidat prioritas pertama.',
          ],
          taskKind: 'make-decision',
          guidedTry: answer(
            'Eksperimen dua minggu apa yang lo jalankan untuk memperkuat bukti penanganan kegagalan?',
            ['eksperimen', 'tanda berhasil'],
          ),
          warning: 'Jangan mengubah daftar eksperimen menjadi daftar fitur tanpa dugaan dan tanda keberhasilan yang jelas.',
        }),
      ),
    ],
  ),
};

export const weeklyMissions: Record<number, WeeklyMission> = {
  1: {
    caseIds: ['regularag'],
    context: 'Client meminta “AI chatbot regulasi”, tetapi belum ada problem definition, reliable baseline, atau decision owner.',
    rawEvidence: [
      'Manager memperkirakan jawaban “sekitar satu jam”, tetapi sample workflow menunjukkan variasi 15–90 menit.',
      'Analyst memakai Drive search, bookmark pribadi, dan bertanya ke senior analyst.',
      'Beberapa jawaban tidak memiliki source attachment dan request yang sama dapat dibuka ulang.',
    ],
    story: missionStories[1],
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
    story: missionStories[2],
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
    story: missionStories[3],
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
    story: missionStories[4],
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
    story: missionStories[5],
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
    story: missionStories[6],
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
    story: missionStories[7],
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
    story: missionStories[8],
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
    story: missionStories[9],
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
    story: missionStories[10],
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
    story: missionStories[11],
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
    story: missionStories[12],
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
    story: missionStories[13],
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
    story: missionStories[14],
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
    story: missionStories[15],
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
    story: missionStories[16],
    resources: [resources.githubProfile, resources.profileReadme, resources.audience],
    starterAssets: [portfolio.funnel, portfolio.caseStudy, portfolio.interview],
    deliverable: { title: 'Application operating system', language: 'Mixed', format: 'Target list + funnel dashboard + 30-day experiment backlog', sections: ['Role clusters', 'Application evidence', 'Outreach', 'Stage conversion', 'Failure diagnosis', 'Next experiment'] },
    rubric: [rubric('w16-target', 'Targeted funnel', 'Setiap application dipetakan ke role cluster dan evidence relevan.'), rubric('w16-signal', 'Stage diagnosis', 'Bottleneck CV, technical, dan storytelling dibedakan.'), rubric('w16-loop', 'Actionable feedback', 'Setiap failure signal menghasilkan eksperimen dua minggu yang spesifik.')],
    coachRole: 'career funnel analyst for an AI application engineer',
    coachFocus: ['weak targeting', 'portfolio-evidence mismatch', 'technical gap', 'storytelling gap'],
  },
};
