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

export type GuidedScaffold = {
  meaning: string;
  workedStep: string[];
  microQuestion: string;
  microAnswerFrame: string;
  warning: string;
};

export type StoryBeat = {
  concept: string;
  title: string;
  situation: string;
  guided: GuidedScaffold;
  decisionQuestion: string;
  answerFrame: string;
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
  decisionQuestion: string,
  answerFrame: string,
  guided: GuidedScaffold,
): StoryBeat {
  return { concept, title, situation, guided, decisionQuestion, answerFrame };
}

function guide(
  meaning: string,
  workedStep: string[],
  microQuestion: string,
  microAnswerFrame: string,
  warning: string,
): GuidedScaffold {
  return { meaning, workedStep, microQuestion, microAnswerFrame, warning };
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
    'junior solution architect yang baru bergabung di discovery RegulaRAG',
    'Lo masuk ke tim sebelum solusi dipilih. Tugas lo adalah memahami pekerjaan compliance sebagaimana berlangsung sekarang, bukan membenarkan permintaan chatbot.',
    [
      beat('workflow mapping', 'Satu pertanyaan, banyak tempat mencari', 'Seorang analyst menerima pertanyaan dari shared inbox atau ticket queue. Ia mencari lewat Drive, bookmark pribadi, dan kadang bertanya ke senior analyst sebelum jawaban dikirim; sample menunjukkan 15–90 menit dan pencatatan waktunya belum konsisten.', 'Informasi dan langkah apa yang perlu lo catat dari satu tiket agar bisa menemukan di mana waktu hilang?', 'hal yang ingin diamati → catatan yang dikumpulkan → alasan catatan itu berguna', guide(
        'Workflow mapping adalah peta urutan kerja dari pemicu sampai hasil.',
        [
          'Pelaku: compliance analyst.',
          'Tindakan: menerima dan membaca pertanyaan.',
          'Sumber/tool: shared inbox atau ticket queue.',
          'Waktu: catat waktu masuk dan saat mulai dibaca.',
          'Belum diketahui: berapa lama tiket menunggu sebelum diambil.',
        ],
        'Setelah analyst membaca pertanyaan, tindakan berikutnya apa yang terlihat?',
        'pelaku → tindakan → sumber/tool → waktu yang perlu dicatat → hal yang belum diketahui',
        'Catat pekerjaan client yang berlangsung sekarang, bukan fitur chatbot.',
      )),
      beat('stakeholder', 'Semua peduli, tetapi tidak semua memutuskan', 'Operations ingin jawaban lebih cepat, analyst menjalankan pekerjaan, dan Legal wajib menyetujui interpretasi berisiko. Senior analyst sering dimintai bantuan, sementara owner cycle time dan owner versi dokumen belum terverifikasi.', 'Bagaimana lo membedakan primary user, process owner, risk approver, dan knowledge owner tanpa menebak jabatan?', 'pihak yang terlibat → bukti peran dalam proses → jenis keputusan atau tanggung jawab → hal yang masih perlu diverifikasi', guide(
        'Bedakan setiap pihak dari tindakan, keputusan, risiko, atau hasil yang benar-benar menjadi tanggung jawabnya.',
        [
          'Analyst terbukti menjalankan pencarian dan menyusun jawaban; itu bukti penggunaan proses.',
          'Legal terbukti wajib menyetujui interpretasi berisiko; itu bukti kewenangan risiko.',
          'Owner cycle time dan versi dokumen masih perlu diverifikasi, bukan ditebak dari jabatan.',
        ],
        'Dari evidence ini, siapa yang menjalankan pekerjaan dan siapa yang memutuskan interpretasi berisiko?',
        'pihak → tindakan yang terlihat → keputusan yang dimiliki → bukti dari kasus',
        'Jangan menganggap requester, pengguna, approver, dan pemilik keputusan adalah pihak yang sama.',
      )),
      beat('baseline KPI', 'Angka satu jam yang belum menjadi baseline', 'Manager menyebut jawaban biasanya sekitar satu jam, tetapi workflow sample bervariasi 15–90 menit dan source attachment tidak selalu ada. Belum ada periode, denominator, atau owner data yang disepakati.', 'Pilih satu KPI awal: bagaimana formula, unit, sample, sumber, owner, dan confidence-nya harus ditulis?', 'ukuran yang dipilih → cara hitung dan unit → cakupan sampel serta sumber data → pemilik data → tingkat keyakinan', guide(
        'Ukuran kondisi sekarang perlu formula, unit, cakupan data, sumber, pemilik, dan tingkat keyakinan yang jelas.',
        [
          'Perkiraan “sekitar satu jam” berasal dari manager, jadi belum cukup sebagai angka final.',
          'Sample menunjukkan rentang 15–90 menit, tetapi periode dan denominator belum disepakati.',
          'Mulai dari satu hal terukur: durasi total satu tiket dari masuk sampai jawaban dikirim.',
        ],
        'Kalau memilih durasi total satu tiket, bagaimana lo menulis formula dan unitnya?',
        'event mulai → event selesai → cara hitung → unit',
        'Jangan menulis target “lebih cepat” tanpa baseline, denominator, sumber, dan pemilik data.',
      )),
    ],
  ),
  2: story(
    'junior solution architect yang harus menilai apakah RegulaRAG benar-benar membutuhkan agent',
    'Problem brief sudah tersedia. Sekarang lo harus menahan dorongan memilih teknologi sebelum membandingkan pilihan yang lebih sederhana.',
    [
      beat('agent vs workflow', 'Chatbot bukan satu-satunya jawaban', 'Client meminta chatbot, tetapi mayoritas pekerjaan adalah menemukan policy yang tepat dan menampilkan sumber. Sebagian langkah mengikuti aturan tetap; hanya bagian tertentu yang mungkin membutuhkan keputusan dinamis.', 'Bagian mana yang cukup dijalankan sebagai rules, search, atau workflow, dan bagian mana yang benar-benar membutuhkan keputusan agent?', 'bagian pekerjaan yang dinilai → pola atau ketidakpastian yang terlihat → pendekatan paling sederhana yang memadai → alasan dan batas penggunaannya', guide(
        'Langkah yang tetap dapat dijalankan secara terprediksi, sedangkan keputusan dinamis baru dibutuhkan ketika jalurnya bergantung pada input yang belum pasti.',
        [
          'Menemukan policy yang tepat dan menampilkan sumber adalah outcome berulang dengan evidence yang dikenal.',
          'Interpretasi dan exception tetap menjadi keputusan manusia, bukan sistem.',
          'Celah yang perlu diuji adalah apakah ada langkah yang benar-benar harus memilih jalur secara dinamis.',
        ],
        'Untuk langkah menemukan policy aktif, apakah pendekatan sederhana sudah cukup atau perlu keputusan dinamis?',
        'langkah → ketidakpastian input → pendekatan paling sederhana → alasan',
        'Jangan memakai keputusan dinamis untuk alur tetap yang lebih mudah diuji dengan aturan.',
      )),
      beat('RAG fit', 'Jawaban harus membawa bukti', 'Corpus RegulaRAG berisi regulasi publik dan SOP sintetis yang berubah setiap bulan. Client membutuhkan sumber, sedangkan interpretasi dan exception tetap bukan kewenangan sistem.', 'Outcome apa yang layak dibantu retrieval dan generation, serta bukti minimum apa yang harus menyertai jawaban?', 'hasil yang ingin dibantu → sumber yang perlu ditemukan → bukti minimum pada respons → kondisi ketika sistem tidak boleh menjawab', guide(
        'Pendekatan ini membantu menyusun respons dari evidence yang perlu ditemukan kembali, bukan mengambil keputusan hukum.',
        [
          'Corpus berubah setiap bulan dan client membutuhkan sumber pada jawaban.',
          'Sistem dapat dibatasi untuk menemukan passage relevan dan membawanya ke respons.',
          'Interpretasi dan policy exception tetap berada di luar kewenangan sistem.',
        ],
        'Untuk satu jawaban faktual, outcome apa yang boleh dibantu dan bukti lokasi apa yang harus terlihat?',
        'outcome yang dibantu → identitas sumber → lokasi evidence → kondisi berhenti',
        'Jangan menganggap evidence yang ditemukan otomatis membuat jawaban benar atau mutakhir.',
      )),
      beat('human boundary', 'Pertanyaan yang tidak boleh diselesaikan sendiri', 'Sebuah pertanyaan dapat meminta interpretasi berisiko atau membahas policy exception. Sistem boleh mengumpulkan evidence, tetapi approval tetap berada pada manusia yang berwenang.', 'Pada titik mana sistem harus pause, evidence apa yang ditampilkan, dan siapa yang boleh menyetujui kelanjutannya?', 'pemicu penghentian → informasi yang diserahkan untuk diperiksa → pihak yang berwenang memutuskan → kondisi untuk melanjutkan', guide(
        'Batas manusia menetapkan keputusan atau tindakan mana yang tidak boleh diselesaikan sistem sendiri.',
        [
          'Pemicu yang sudah diketahui adalah permintaan interpretasi berisiko atau policy exception.',
          'Sistem boleh mengumpulkan evidence sebelum berhenti.',
          'Kelanjutan tetap membutuhkan keputusan dari manusia yang berwenang.',
        ],
        'Saat permintaan berisi interpretasi berisiko, apa yang dilakukan sistem dan apa yang perlu dilihat reviewer?',
        'pemicu → tindakan sistem → evidence untuk reviewer → keputusan manusia',
        'Jangan memakai “human in the loop” sebagai slogan tanpa titik berhenti dan kewenangan yang jelas.',
      )),
    ],
  ),
  3: story(
    'junior AI solution engineer yang merancang kontrak tool RegulaRAG',
    'Pendekatan evidence-grounded sudah dipilih. Sebelum menulis prompt, lo harus memastikan output dapat diperiksa dan digunakan sistem lain.',
    [
      beat('structured output', 'Citation yang terlihat rapi tetapi tidak dapat dipercaya', 'Caller membutuhkan document ID, page, passage, dan confidence. Jawaban model yang hanya berupa teks atau JSON bebas dapat kehilangan field penting tanpa terlihat gagal.', 'Struktur output minimum apa yang harus diwajibkan agar missing evidence menjadi error yang jelas?', 'bagian respons yang wajib ada → tipe atau batas nilai tiap bagian → kondisi yang dianggap tidak lengkap → bentuk kegagalan yang diterima caller', guide(
        'Respons mengikuti bentuk tetap yang dapat diperiksa mesin sebelum dipakai komponen lain.',
        [
          'Caller sudah membutuhkan document ID, page, passage, dan confidence.',
          'Modelkan dulu satu citation record, bukan seluruh jawaban akhir.',
          'Jika satu field wajib hilang, hasil harus terlihat gagal dan tidak diteruskan sebagai sukses.',
        ],
        'Untuk satu citation record, field mana yang mengikat passage ke sumber dan apa hasilnya jika field itu hilang?',
        'field sumber → field lokasi → isi passage → hasil saat field hilang',
        'Jangan mempercayai JSON yang terlihat rapi tanpa bentuk wajib dan pemeriksaan yang nyata.',
      )),
      beat('tool schema', 'Tool pencarian membutuhkan pagar', 'Document inventory mempunyai version, status, page, dan authority metadata. Tool retrieval perlu menerima filter yang terbatas dan membedakan success, no evidence, invalid filter, timeout, serta dependency failure.', 'Input, output, permission, dan error apa yang harus menjadi kontrak eksplisit tool ini?', 'permintaan yang diterima → hasil sukses yang dikembalikan → batas akses → ragam kegagalan yang harus dibedakan', guide(
        'Kontrak tool menetapkan permintaan yang diterima, hasil yang dikembalikan, izin yang berlaku, dan kegagalan yang harus dibedakan.',
        [
          'Filter dapat dibatasi pada metadata inventory seperti version, status, page, dan authority.',
          'Hasil sukses perlu membawa citation yang dapat ditelusuri.',
          'Mulai dari satu jalur gagal: no evidence tidak boleh tampak seperti success dengan jawaban kosong.',
        ],
        'Saat pencarian tidak menemukan evidence, apa yang perlu diterima caller agar hasil itu tidak disangka sukses?',
        'status hasil → alasan ringkas → evidence yang tersedia → tindakan caller',
        'Jangan menerima input bebas atau menyembunyikan beberapa jenis kegagalan dalam satu pesan teks.',
      )),
      beat('validation', 'Output valid secara bentuk, salah secara bisnis', 'Sebuah citation record dapat lolos sebagai JSON tetapi menunjuk dokumen superseded atau kehilangan page evidence. Sistem berikutnya tidak boleh memperbaiki kekurangan itu diam-diam.', 'Validasi mana yang berasal dari schema dan mana yang harus memeriksa aturan corpus serta provenance?', 'pemeriksaan bentuk data → pemeriksaan status dan asal dokumen → penanganan saat pemeriksaan gagal → pihak atau komponen yang bertanggung jawab', guide(
        'Pemeriksaan bentuk data berbeda dari pemeriksaan aturan corpus dan asal evidence; keduanya harus lolos sebelum hasil diteruskan.',
        [
          'Citation berbentuk JSON masih dapat menunjuk dokumen superseded.',
          'Field page yang hilang adalah masalah kelengkapan bentuk dan provenance.',
          'Status dokumen aktif atau superseded perlu diperiksa terhadap inventory corpus.',
        ],
        'Kelompokkan dua kasus ini: page hilang dan dokumen superseded diperiksa di lapisan mana?',
        'kasus → jenis pemeriksaan → hasil lolos atau gagal → penanganan',
        'Jangan memperbaiki output yang gagal diam-diam karena jejak error akan hilang.',
      )),
    ],
  ),
  4: story(
    'junior AI solution engineer yang membatasi control plane RegulaRAG',
    'Tool sudah memiliki kontrak. Kini lo menentukan bagaimana satu run bergerak, berhenti, pulih, atau meminta bantuan manusia.',
    [
      beat('state machine', 'Run yang tidak tahu kapan selesai', 'Retrieval dapat berhasil, timeout, atau mengembalikan zero evidence; user juga dapat meminta sesuatu di luar corpus. Tanpa state dan terminal path, assistant dapat terus mencoba atau menghasilkan jawaban ambigu.', 'State, event, dan terminal state apa yang diperlukan untuk membedakan success, abstain, escalation, dan failed?', 'tahap yang mungkin dilalui → kejadian yang memindahkan tahap → kondisi berhenti → hasil akhir untuk tiap kondisi', guide(
        'Satu run perlu tahap yang jelas, kejadian yang boleh memindahkannya, dan hasil akhir yang menghentikan proses.',
        [
          'Run dimulai dari permintaan lalu masuk ke pencarian evidence.',
          'Pencarian dapat menghasilkan success, timeout, atau zero evidence.',
          'Modelkan dulu jalur zero evidence agar run tidak berakhir dengan jawaban ambigu.',
        ],
        'Jika pencarian mengembalikan zero evidence, tahap berikut dan hasil akhirnya seharusnya apa?',
        'tahap sekarang → event → tahap berikut → hasil akhir',
        'Jangan menyimpan status sebagai label bebas tanpa aturan perpindahan dan kondisi berhenti.',
      )),
      beat('retry', 'Timeout bukan izin mencoba selamanya', 'Dependency retrieval dapat mengalami gangguan sementara. Retry mungkin membantu, tetapi percobaan tanpa batas dapat memperpanjang latency dan memperburuk outage.', 'Error mana yang layak dicoba ulang, berapa batasnya, dan kapan run harus berhenti atau dieskalasi?', 'jenis gangguan → syarat boleh mencoba lagi → jumlah atau durasi maksimum → kondisi berhenti → jalur setelah batas habis', guide(
        'Percobaan ulang hanya untuk gangguan sementara dan selalu memiliki batas waktu, jumlah, serta jalur akhir.',
        [
          'Timeout retrieval dapat menandakan gangguan sementara pada dependency.',
          'Zero evidence adalah hasil pencarian, bukan otomatis gangguan yang pulih jika diulang.',
          'Setiap percobaan tambahan perlu batas dan kondisi berhenti yang eksplisit.',
        ],
        'Dari timeout dan zero evidence, mana yang boleh dicoba lagi dan mana yang harus berhenti?',
        'jenis error → sementara atau tetap → boleh mencoba lagi → kondisi berhenti',
        'Jangan mencoba ulang semua error atau membiarkan percobaan berjalan tanpa batas.',
      )),
      beat('approval', 'Batas sebelum tindakan non-read-only', 'RegulaRAG dirancang untuk mencari dan menyusun evidence. Jika sebuah permintaan mengarah pada action di luar read-only, run harus berhenti sebelum side effect terjadi.', 'Apa yang harus terikat pada approval agar keputusan tidak stale dan tidak dapat digunakan untuk case lain?', 'tindakan yang dibatasi → identitas kasus dan versi bukti → pemberi izin serta masa berlaku → pemeriksaan sebelum tindakan dijalankan', guide(
        'Izin manusia harus eksplisit dan terikat pada tindakan serta kondisi kasus yang sedang diperiksa.',
        [
          'RegulaRAG pada dasarnya hanya mencari dan menyusun evidence.',
          'Permintaan non-read-only harus berhenti sebelum side effect terjadi.',
          'Izin perlu mengacu pada kasus, tindakan, dan versi evidence saat keputusan dibuat.',
        ],
        'Sebutkan tiga hal yang harus terikat pada satu izin agar tidak dapat dipakai ulang untuk kasus lain.',
        'identitas kasus → tindakan yang diminta → versi evidence → masa berlaku',
        'Jangan memakai izin yang tidak terikat pada kasus, versi, dan pihak yang berwenang.',
      )),
    ],
  ),
  5: story(
    'junior retrieval engineer yang membangun baseline RegulaRAG',
    'Architecture telah disepakati. Lo mulai dari ingestion dan retrieval sederhana yang dapat diulang sebelum menambahkan optimasi.',
    [
      beat('ingestion', 'Corpus yang tidak semuanya boleh dipakai', 'Document inventory mencampur dokumen aktif, superseded, table-heavy, dan OCR-required. Semua sumber tetap harus memiliki version, owner, status, serta page lineage.', 'Metadata dan pemeriksaan apa yang menentukan sebuah dokumen boleh masuk retrieval aktif?', 'atribut dokumen yang diperiksa → syarat boleh dipakai → perlakuan untuk dokumen bermasalah → catatan asal dan versi yang dipertahankan', guide(
        'Sumber perlu diterima, diperiksa, diberi metadata, dan disiapkan secara berulang sebelum boleh dipakai dalam pencarian.',
        [
          'Inventory mencampur dokumen aktif, superseded, table-heavy, dan OCR-required.',
          'Mulai dari satu gerbang: status aktif menentukan apakah dokumen boleh menjadi sumber pencarian aktif.',
          'Version, owner, status, dan page lineage tetap disimpan meskipun dokumen belum boleh dipakai.',
        ],
        'Untuk satu dokumen superseded, apa keputusan pemakaiannya dan metadata apa yang tetap disimpan?',
        'status dokumen → keputusan pemakaian → alasan → metadata yang dipertahankan',
        'Jangan memasukkan semua file tanpa provenance, pemeriksaan duplikasi, dan aturan akses.',
      )),
      beat('chunking', 'Potongan yang kehilangan asalnya', 'SOP dan regulasi perlu dipecah agar dapat dicari, tetapi potongan terlalu kecil kehilangan konteks dan potongan terlalu besar menghasilkan retrieval yang noisy. Citation tetap harus kembali ke page atau section asal.', 'Batas pemotongan apa yang lo pilih dan metadata apa yang wajib ikut pada setiap chunk?', 'unit pemotongan yang dipilih → aturan menjaga konteks → metadata asal yang dibawa → cara menilai trade-off ukuran potongan', guide(
        'Dokumen dipecah menjadi unit pencarian yang tetap mempertahankan makna dan hubungan ke sumber aslinya.',
        [
          'Potongan terlalu kecil kehilangan konteks, sedangkan potongan terlalu besar membuat hasil noisy.',
          'Gunakan batas section sebagai kandidat awal karena SOP dan regulasi memiliki struktur.',
          'Setiap potongan tetap membawa document, version, page, atau section asal.',
        ],
        'Untuk satu section SOP yang melintasi dua halaman, unit apa yang dipakai dan asal apa yang disimpan?',
        'unit potongan → batas konteks → document dan version → page atau section',
        'Jangan memilih ukuran potongan tanpa menguji kehilangan konteks dan noise pencarian.',
      )),
      beat('vector retrieval', 'Mirip secara makna belum tentu boleh dipakai', 'Pertanyaan compliance dapat menemukan passage yang mirip secara semantic, termasuk dokumen yang salah versi atau tidak sesuai collection. Similarity score tidak membuktikan authority maupun kebenaran.', 'Filter apa yang harus diterapkan sebelum ranking, dan output baseline apa yang perlu dicatat sebelum optimasi?', 'penyaringan sebelum pengurutan → sinyal yang dipakai mengurutkan → hasil yang dicatat per pertanyaan → keterbatasan yang belum terjawab', guide(
        'Pencarian makna mengembalikan kandidat yang mirip, tetapi kemiripan tidak membuktikan authority, izin, atau kebenaran.',
        [
          'Passage yang mirip dapat berasal dari versi dokumen atau collection yang salah.',
          'Batasi kandidat ke dokumen aktif dan collection yang diizinkan sebelum mengurutkan kemiripan.',
          'Catat kandidat terurut per pertanyaan sebagai hasil awal sebelum optimasi.',
        ],
        'Sebelum ranking, dua filter metadata apa yang lo terapkan dan risiko apa yang dicegah?',
        'filter metadata → nilai yang diizinkan → risiko yang dicegah',
        'Jangan memperlakukan similarity score sebagai bukti authority atau kebenaran.',
      )),
    ],
  ),
  6: story(
    'junior evaluation engineer yang membandingkan retrieval RegulaRAG',
    'Baseline berjalan. Tugas lo adalah membuktikan apakah perubahan retrieval benar-benar memperbaiki evidence, bukan sekadar membuat demo terasa lebih bagus.',
    [
      beat('hybrid search', 'Nomor regulasi yang hilang dalam pencarian semantic', 'Sebagian golden questions memakai istilah konseptual, sedangkan sebagian lain menyebut nomor regulasi atau frasa exact. Vector-only dan lexical search dapat gagal pada jenis query yang berbeda.', 'Bagaimana lo membandingkan vector-only dengan kombinasi lexical dan semantic pada dataset yang sama?', 'varian yang dibandingkan → kondisi eksperimen yang disamakan → ukuran hasil → cara membaca perbedaan → dasar memilih varian', guide(
        'Pencarian berbasis kata dan pencarian berbasis makna dapat digabungkan untuk menangani pola pertanyaan yang berbeda.',
        [
          'Golden questions memuat istilah konseptual, nomor regulasi, dan frasa exact.',
          'Tetapkan vector-only dan kombinasi lexical-semantic sebagai dua varian yang dibandingkan.',
          'Gunakan corpus, pertanyaan, dan sampling yang sama sebelum membaca perbedaannya.',
        ],
        'Untuk slice pertanyaan nomor regulasi, ukuran apa yang lo bandingkan pada kedua varian?',
        'slice pertanyaan → varian A dan B → ukuran hasil → sinyal keputusan',
        'Jangan menggabungkan skor tanpa normalisasi atau evaluasi pada setiap slice pertanyaan.',
      )),
      beat('reranking', 'Dua puluh kandidat, lima tempat untuk evidence', 'Retrieval awal dapat menghasilkan banyak passage kandidat. Reranker mungkin menaikkan passage relevan ke posisi atas, tetapi juga menambah latency dan belum tentu memperbaiki corpus yang buruk.', 'Kapan reranking dianggap memberi nilai, dan metric serta latency apa yang harus dibandingkan?', 'kondisi awal yang perlu diperbaiki → perubahan posisi kandidat yang diukur → tambahan waktu proses → ambang manfaat → keputusan pakai atau tidak', guide(
        'Kandidat awal dapat diurutkan kembali dengan penilaian yang lebih cermat, tetapi langkah ini menambah waktu proses.',
        [
          'Pencarian awal menghasilkan hingga dua puluh passage kandidat untuk lima tempat evidence.',
          'Bandingkan urutan sebelum dan sesudah pada kumpulan kandidat yang sama.',
          'Catat perubahan kualitas posisi evidence bersama tambahan waktu proses.',
        ],
        'Dua perubahan apa yang perlu terlihat agar pengurutan ulang dianggap bernilai?',
        'posisi sebelum → posisi sesudah → perubahan kualitas → tambahan waktu → keputusan',
        'Jangan menganggap pengurutan ulang dapat memperbaiki corpus yang buruk.',
      )),
      beat('Recall@k', 'Metric tinggi yang belum menjamin jawaban benar', 'Client peduli source correctness. Passage gold yang muncul dalam top five membantu, tetapi tidak membuktikan citation yang dipakai benar atau generated claim didukung evidence.', 'Apa yang diukur Recall@5, apa yang tidak diukur, dan metric pendamping apa yang dibutuhkan?', 'definisi ukuran → cakupan hasil yang dinilai → hal yang tidak dibuktikan → ukuran pendamping → implikasi untuk keputusan', guide(
        'Ukuran ini menunjukkan apakah evidence relevan muncul di antara sejumlah hasil teratas, bukan apakah jawaban akhir sudah benar.',
        [
          'Passage gold pada posisi empat berarti evidence relevan ditemukan dalam lima kandidat awal.',
          'Hasil itu belum membuktikan citation yang dipakai mendukung generated claim.',
          'Karena client peduli source correctness, tambahkan pemeriksaan ketepatan citation.',
        ],
        'Jika passage gold ada di posisi empat tetapi jawaban memakai citation salah, bagaimana dua ukurannya dibaca?',
        'posisi gold → hit atau miss → citation benar atau salah → kesimpulan',
        'Jangan menyebut nilai retrieval tinggi sebagai bukti bahwa jawaban akhir selalu benar.',
      )),
    ],
  ),
  7: story(
    'junior AI security engineer yang menguji knowledge boundary RegulaRAG',
    'Retrieval membaik. Sekarang lo memperlakukan pertanyaan dan dokumen sebagai input yang dapat salah atau sengaja berbahaya.',
    [
      beat('abstention', 'Pertanyaan yang tidak punya dasar jawaban', 'Beberapa golden questions tidak memiliki evidence di corpus dan dua versi SOP dapat berkonflik. Jawaban yang terdengar yakin tetapi tidak bersumber menimbulkan risiko compliance.', 'Signal apa yang membuat sistem harus menolak menjawab, dan jalur aman apa yang diberikan kepada user?', 'sinyal kekurangan atau konflik bukti → keputusan respons → pesan aman untuk pengguna → jalur tindak lanjut', guide(
        'Sistem perlu memilih tidak menjawab ketika evidence, keyakinan, atau izin tidak cukup, lalu memberi jalur aman berikutnya.',
        [
          'Tidak ada evidence dan konflik dua versi SOP adalah dua pemicu yang sudah terlihat.',
          'Respons aman tidak boleh membuat sumber atau menyamarkan konflik.',
          'User tetap membutuhkan pesan yang jelas dan jalur ke pemeriksa manusia.',
        ],
        'Jika dua versi SOP berkonflik, apa keputusan respons dan ke mana user diarahkan?',
        'signal konflik → keputusan respons → pesan untuk user → jalur tindak lanjut',
        'Jangan menganggap penolakan menjawab sebagai kegagalan tanpa mengukur apakah eskalasinya aman.',
      )),
      beat('prompt injection', 'Instruksi tersembunyi di dalam SOP', 'Satu SOP sintetis berisi instruksi agar model mengabaikan system policy. Teks itu masuk melalui retrieval sebagai data, bukan sebagai instruksi yang berwenang.', 'Bagaimana arsitektur memisahkan trusted instruction dari untrusted document text dan membuktikannya lewat test?', 'asal instruksi dan data → aturan prioritas antar-sumber → kontrol saat dokumen memuat perintah → skenario uji dan hasil yang diharapkan', guide(
        'Perintah berbahaya dapat disisipkan dalam pertanyaan atau dokumen untuk mencoba mengubah perilaku model.',
        [
          'SOP sintetis memuat teks yang meminta model mengabaikan system policy.',
          'Teks hasil retrieval diperlakukan sebagai data tidak tepercaya, bukan instruksi berwenang.',
          'Satu test perlu membuktikan bahwa system policy tetap berlaku saat teks itu ditemukan.',
        ],
        'Dalam satu test, input berbahaya, perilaku yang harus diblokir, dan bukti lulusnya apa?',
        'teks berbahaya → aturan tepercaya → perilaku yang diblokir → bukti test',
        'Jangan pernah memperlakukan teks hasil retrieval sebagai instruksi tepercaya.',
      )),
      beat('data boundary', 'Permintaan di luar collection yang diizinkan', 'User mencoba meminta dokumen di luar allowed collection. Prompt, secret, dan sensitive payload juga tidak boleh muncul pada citation atau trace.', 'Data apa yang boleh masuk, dilihat, disimpan, dan keluar pada setiap boundary sistem?', 'jenis data → titik masuk dan pihak yang boleh melihat → aturan penyimpanan → keluaran yang diizinkan → perlakuan untuk data terlarang', guide(
        'Setiap batas sistem perlu menyatakan data yang boleh masuk, dilihat, disimpan, dan dikeluarkan.',
        [
          'Demo hanya mengizinkan regulasi publik dan SOP sintetis dalam collection yang disetujui.',
          'Permintaan dokumen di luar collection harus ditolak sebelum isi dokumen terlihat.',
          'Prompt, secret, dan sensitive payload tidak boleh muncul dalam citation atau trace.',
        ],
        'Untuk permintaan di luar allowed collection, apa keputusan akses dan hasil apa yang aman terlihat?',
        'jenis data → status collection → keputusan akses → hasil pada citation atau trace',
        'Jangan menulis “aman” tanpa menyebut kelas data dan lokasi kontrolnya.',
      )),
    ],
  ),
  8: story(
    'junior AI solution engineer yang menyiapkan delivery packet RegulaRAG',
    'Sistem harus dapat dipahami stakeholder dalam lima menit dan tetap menunjukkan evidence ketika normal flow gagal.',
    [
      beat('tracing', 'Demo gagal tanpa petunjuk di langkah mana', 'Normal flow dapat terlihat baik, tetapi retrieval kosong, reranker, abstention, atau dependency error tidak dapat dijelaskan jika hanya output akhir yang dicatat.', 'Event dan span apa yang harus tersambung agar satu run dapat direkonstruksi dari ingest sampai answer atau abstain?', 'tahap run yang dicatat → identitas penghubung antar-event → input atau hasil ringkas tiap tahap → kondisi akhir → cara menelusuri kegagalan', guide(
        'Satu run perlu rekaman terstruktur yang menghubungkan langkah, pemanggilan tool, waktu, error, dan keputusan.',
        [
          'Run dapat melewati retrieval kosong lalu berakhir tanpa jawaban berbasis evidence.',
          'Gunakan satu trace ID untuk menghubungkan event pencarian, keputusan, dan hasil akhir.',
          'Output akhir saja tidak cukup untuk menunjukkan langkah pertama yang gagal.',
        ],
        'Untuk jalur retrieval kosong, tiga event apa yang dicatat dengan identifier yang sama?',
        'run ID → event retrieval → event keputusan → event akhir',
        'Jangan hanya mencatat output final karena jalur kegagalan tidak akan dapat direkonstruksi.',
      )),
      beat('latency', 'Rata-rata cepat, sebagian user tetap menunggu lama', 'README belum menunjukkan p50 dan p95. Waktu total berasal dari retrieval, reranking, model, queue, dan kemungkinan human wait yang memiliki owner berbeda.', 'Boundary latency apa yang relevan, percentile apa yang dilaporkan, dan bagaimana lo menemukan komponen paling lambat?', 'titik awal dan akhir pengukuran → kelompok waktu yang dilaporkan → kontribusi tiap komponen → cara menemukan penyebab ekor lambat', guide(
        'Waktu perlu diukur dari event awal ke hasil pada batas yang disepakati, lalu dibaca sebagai distribusi dan kontribusi komponen.',
        [
          'README belum menunjukkan p50 dan p95.',
          'Waktu total mencakup retrieval, reranking, model, queue, dan kemungkinan human wait.',
          'Pisahkan kontribusi tiap komponen agar owner hambatan dapat ditemukan.',
        ],
        'Untuk respons RegulaRAG ke user, event awal, event akhir, dan dua percentile apa yang lo pilih?',
        'event mulai → event selesai → p50 dan p95 → komponen terlambat',
        'Jangan mengoptimalkan rata-rata sambil menyembunyikan ekor waktu yang lambat.',
      )),
      beat('cost per query', 'Harga model bukan seluruh biaya', 'Satu query dapat memakai retrieval, reranking, model, storage, retry, dan human escalation. Cost claim tanpa workload dan trace akan sulit dipercaya client.', 'Komponen biaya apa yang dihitung per query dan asumsi apa yang harus terlihat pada laporan?', 'komponen pengeluaran → satuan pemakaian tiap komponen → rumus per permintaan → asumsi beban kerja → keterbatasan perhitungan', guide(
        'Biaya satu permintaan mencakup semua pemakaian incremental dari awal sampai hasil, bukan harga model saja.',
        [
          'Satu query dapat memakai retrieval, reranking, model, storage, retry, dan human escalation.',
          'Tetapkan satu query sebagai batas perhitungan agar komponen dapat dijumlahkan konsisten.',
          'Ambil satuan pemakaian dari trace lalu pisahkan asumsi workload dan kerja manusia.',
        ],
        'Untuk satu query, pilih tiga komponen biaya dan satuan pemakaian masing-masing.',
        'komponen → satuan pemakaian → asumsi tarif → subtotal per query',
        'Jangan menghitung harga model saja lalu melupakan retry dan human escalation.',
      )),
    ],
  ),
  9: story(
    'junior operations solution architect yang memetakan InvoiceOps',
    'Lo pindah ke case finance. Sebelum membuat agent, lo harus memahami jalur invoice normal dan exception yang saat ini bercampur.',
    [
      beat('process mining', 'Invoice yang berpindah tanpa jejak terpadu', 'Tim AP menerima invoice melalui email dan spreadsheet lalu mencocokkannya dengan PO serta goods receipt di mock ERP. Normal case dan exception bercampur, sementara audit trail belum terpadu.', 'Event minimum apa yang perlu dicatat agar satu invoice dapat direkonstruksi dari intake sampai terminal state?', 'event penanda → aktor dan waktu tiap event → data yang berubah → hubungan antar-event → kondisi akhir', guide('Ini cara membaca alur nyata dari jejak event untuk menemukan variasi dan titik macet, bukan menggambar proses ideal.', ['Mulai dari satu invoice yang diterima tim AP melalui email.', 'Catat satu perpindahan awal: invoice diterima → pencocokan PO dimulai.', 'Biarkan event setelah pencocokan terbuka sampai lo menentukan penanda berikutnya.'], 'Dua timestamp apa yang paling dulu lo butuhkan untuk mengukur waktu dari intake ke awal pencocokan?', 'timestamp invoice diterima → timestamp pencocokan dimulai → selisih waktunya', 'Jangan menggambar alur ideal tanpa mengecek event yang benar-benar terjadi.')),
      beat('exception taxonomy', 'Empat masalah, empat jalur penanganan', 'Duplicate upload, missing PO, quantity mismatch, dan scan buruk mempunyai signal, owner, recovery, serta risiko berbeda. Kategori yang terlalu umum akan membuat routing dan SLA tidak actionable.', 'Bagaimana lo membedakan kategori exception dan menentukan owner, allowed action, serta terminal state-nya?', 'dasar membedakan kasus → signal pemicu → owner penanganan → tindakan yang dibolehkan → kondisi akhir', guide('Ini cara memisahkan masalah ke kategori yang punya signal, owner, tindakan aman, dan akhir penanganan yang berbeda.', ['Ambil satu kasus quantity mismatch dari daftar exception InvoiceOps.', 'Tandai signal awalnya sebagai selisih jumlah antara invoice dan goods receipt.', 'Owner dan kondisi akhirnya sengaja belum diisi untuk lo putuskan.'], 'Siapa yang perlu menerima kasus quantity mismatch untuk pemeriksaan pertama, dan kapan kasus itu dianggap selesai?', 'kasus yang dipilih → owner pertama → tanda kasus selesai', 'Jangan membuat satu kategori umum yang mencampur masalah dengan owner atau recovery berbeda.')),
      beat('permission map', 'Yang memproses bukan yang boleh membayar', 'Staf AP menjalankan workflow dan Finance Controller memegang payment approval. Agent boleh membaca evidence atau mengusulkan route, tetapi tidak boleh menghitung pajak atau melakukan pembayaran.', 'Capability mana yang boleh read, propose, approve, write, atau harus selalu deny untuk setiap role?', 'role atau sistem → kebutuhan tugas → capability yang diminta → wewenang yang diberikan → batas yang ditolak', guide('Ini cara menuliskan wewenang setiap role terhadap satu capability agar batas read, propose, approve, write, dan deny dapat diperiksa.', ['Pilih capability melakukan pembayaran pada InvoiceOps.', 'Evidence menetapkan Finance Controller memegang approval, sedangkan agent tidak boleh melakukan pembayaran.', 'Hak staf AP untuk capability ini sengaja belum ditetapkan.'], 'Untuk capability pembayaran, wewenang apa yang harus dicatat untuk Finance Controller dan agent?', 'role → capability → status wewenang', 'Jangan mengandalkan nama role tanpa pemeriksaan wewenang di boundary sistem.')),
    ],
  ),
  10: story(
    'junior agentic automation engineer yang menghubungkan InvoiceOps ke tools',
    'Process map stabil. Lo membangun integration layer sambil menjaga calculation rules tetap deterministic dan dapat diuji.',
    [
      beat('typed tools', 'Tool mengembalikan data yang tidak dapat dibedakan dari error', 'InvoiceOps perlu membaca PO, receipt, dan vendor dari mock ERP. Caller harus dapat membedakan success, not found, invalid input, timeout, dan dependency failure tanpa menebak dari teks.', 'Kontrak input, output, permission, timeout, dan error apa yang diperlukan untuk setiap tool?', 'tujuan operasi → input wajib → output saat berhasil → bentuk error → aturan akses dan timeout', guide('Ini kontrak yang membuat caller dapat memeriksa bentuk input, hasil sukses, permission, timeout, dan setiap jenis error tanpa menebak dari teks.', ['Ambil satu operasi membaca PO dari mock ERP.', 'Tetapkan input awalnya sebagai identitas PO dan hasil suksesnya sebagai data PO yang ditemukan.', 'Permission, timeout, dan bentuk error sengaja belum diisi.'], 'Jika PO tidak ditemukan, hasil kecil apa yang harus berbeda dari timeout?', 'kondisi → jenis hasil → informasi minimum', 'Jangan menyatukan not found dan dependency timeout dalam pesan bebas yang sama.')),
      beat('mock ERP', 'Dependency aman untuk dibuat gagal', 'Lo tidak boleh menyentuh ERP nyata, tetapi tetap perlu menguji missing PO, quantity mismatch, timeout, dan outage. Simulator yang selalu happy path akan memberi confidence palsu.', 'Behavior normal dan failure apa yang harus disediakan mock ERP agar contract dan recovery dapat diuji?', 'skenario normal → kondisi gagal yang disimulasikan → respons dependency → state yang diharapkan → bukti test', guide('Ini simulator dependency yang meniru respons normal dan gagal supaya integrasi InvoiceOps dapat diuji tanpa menyentuh ERP nyata.', ['Gunakan satu skenario missing PO dari InvoiceOps.', 'Atur simulator menerima identitas PO lalu mengembalikan hasil tidak ditemukan.', 'Jalur pemulihan caller sengaja belum ditentukan.'], 'Setelah hasil tidak ditemukan, state case apa yang seharusnya terlihat oleh test?', 'hasil simulator → state case → bukti test', 'Jangan membuat simulator yang hanya selalu mengembalikan happy path.')),
      beat('n8n webhook', 'Event yang datang dua kali', 'Invoice dapat dikirim ulang melalui email atau webhook. n8n hanya menjadi inbound integration layer dan tidak boleh menyimpan hidden business logic.', 'Apa yang harus divalidasi, dicatat, dan di-dedupe sebelum webhook mengakui event sebagai diterima?', 'identitas event → validasi sebelum diterima → catatan yang disimpan → cara mengenali kiriman ulang → hasil penerimaan', guide('Ini batas penerima event HTTP yang memeriksa payload, mengenali kiriman ulang, mencatat penerimaan, lalu memberi acknowledgement.', ['Pakai satu invoice yang dikirim ulang melalui webhook.', 'Baca identitas event sebelum service API dipanggil.', 'Aturan menerima atau menolak kiriman kedua sengaja belum diputuskan.'], 'Pemeriksaan pertama apa yang menentukan event ini baru atau kiriman ulang?', 'identitas event → catatan penerimaan sebelumnya → keputusan awal', 'Jangan meneruskan payload sebelum schema dan duplikasinya diperiksa.')),
    ],
  ),
  11: story(
    'junior agentic automation engineer yang membuat approval workflow dapat dilanjutkan',
    'Tools bekerja. Sekarang satu case harus mampu pause berjam-jam, ditinjau, lalu resume tanpa kehilangan evidence atau memakai approval lama.',
    [
      beat('checkpoint', 'Case berhenti saat menunggu reviewer', 'Low-confidence extraction harus masuk reviewer queue. Selama menunggu, service dapat restart dan case dapat berubah, sehingga chat history saja tidak cukup sebagai state.', 'State, evidence snapshot, dan version apa yang harus disimpan agar case dapat dilanjutkan dengan aman?', 'state case saat pause → evidence yang dibekukan → version yang ditautkan → syarat resume → penanganan jika data berubah', guide('Ini snapshot state dan evidence yang membuat case bisa pause lalu resume dengan versi yang masih dapat dipercaya.', ['Ambil case low-confidence yang masuk reviewer queue.', 'Simpan state menunggu review dan snapshot extracted fields yang sedang diperiksa.', 'Versi case serta syarat resume sengaja belum diisi.'], 'Versi apa yang harus dibandingkan sebelum case dilanjutkan setelah reviewer selesai?', 'versi saat pause → versi saat resume → keputusan lanjut atau tahan', 'Jangan mengandalkan chat history yang tidak versioned sebagai state untuk resume.')),
      beat('human-in-the-loop', 'Reviewer membutuhkan lebih dari tombol approve', 'Reviewer harus melihat extracted fields, source region, deterministic calculations, confidence, dan alasan escalation. Tanpa context itu, approval hanya memindahkan risiko ke manusia.', 'Informasi dan tindakan minimum apa yang harus tersedia agar reviewer dapat memeriksa, mengoreksi, atau menolak case?', 'context yang dilihat reviewer → keputusan yang tersedia → koreksi yang boleh dibuat → alasan keputusan → hasil setelah review', guide('Ini titik ketika reviewer mendapat context cukup untuk memeriksa, mengoreksi, menolak, atau menyetujui langkah berikutnya.', ['Gunakan satu case low-confidence dari reviewer queue.', 'Tampilkan extracted fields dan source region yang mendasarinya.', 'Pilihan tindakan reviewer dan hasil setelah koreksi sengaja belum diisi.'], 'Dua tindakan apa selain approve yang harus tersedia bagi reviewer?', 'tindakan reviewer → alasan memilih → perubahan pada case', 'Jangan menjadikan reviewer tombol approve tanpa evidence dan context.')),
      beat('audit trail', 'Pertanyaan setelah write terjadi', 'Tim perlu menjawab siapa mengubah route, evidence version mana yang dilihat, approval token apa yang dipakai, dan apakah write terjadi sekali. Log sensitif juga tidak boleh membocorkan secret.', 'Event apa yang harus immutable agar urutan actor, decision, state change, dan side effect dapat direkonstruksi?', 'event yang direkam → actor dan timestamp → evidence serta version yang dipakai → perubahan state → hasil side effect', guide('Ini urutan event yang membuat actor, waktu, evidence version, keputusan, perubahan state, dan side effect dapat ditelusuri kembali.', ['Mulai dari satu route InvoiceOps yang diubah setelah review.', 'Catat actor, timestamp, dan state sebelum perubahan.', 'Approval token serta hasil write sengaja belum dicatat.'], 'Field apa yang menghubungkan keputusan reviewer dengan write yang terjadi sesudahnya?', 'keputusan reviewer → penghubung yang dicatat → write terkait', 'Jangan membuat log yang dapat diubah atau membocorkan secret.')),
    ],
  ),
  12: story(
    'junior reliability engineer yang menguji failure InvoiceOps',
    'Happy path selesai. Lo sengaja membuat duplicate input, timeout, malformed output, dan outage untuk memastikan tidak ada aksi ganda atau case hilang.',
    [
      beat('idempotency', 'Webhook yang diputar ulang', 'Delivery menggunakan at-least-once semantics sehingga event yang sama dapat datang lebih dari sekali. Dependency juga dapat berhasil setelah caller menganggap request timeout.', 'Key dan state check apa yang memastikan replay menghasilkan satu case dan satu side effect?', 'identitas request → pemeriksaan state → keputusan sebelum action → hasil saat request diulang', guide('Ini sifat yang memastikan request sama dapat diproses ulang tanpa membuat case atau side effect kedua.', ['Gunakan satu event invoice yang tiba lagi setelah caller mengalami timeout.', 'Bandingkan identitas request dengan operasi yang sudah tercatat sebelum action baru.', 'Hasil ketika state sebelumnya belum pasti sengaja belum diputuskan.'], 'Jika identitas request sudah tercatat selesai, action apa yang harus terjadi pada replay?', 'status request sebelumnya → keputusan action → hasil replay', 'Jangan menganggap retry aman hanya karena endpoint pernah mengembalikan success.')),
      beat('backoff', 'Semua worker mencoba lagi bersamaan', 'ERP outage atau rate limit dapat bersifat sementara. Retry serentak tanpa batas akan memperparah dependency failure dan meningkatkan latency.', 'Bagaimana menentukan timeout, retry count, delay yang meningkat, jitter, dan kondisi berhenti?', 'jenis kegagalan → timeout tiap percobaan → pola jeda dan variasinya → batas percobaan → kondisi berhenti', guide('Ini jeda retry yang meningkat dan diberi variasi agar dependency sempat pulih tanpa semua worker mencoba bersamaan.', ['Ambil kegagalan ERP sementara pada satu case InvoiceOps.', 'Tetapkan bahwa hanya error sementara yang boleh masuk percobaan berikutnya.', 'Jumlah retry, pola jeda, dan kondisi berhenti sengaja belum diisi.'], 'Setelah satu kegagalan sementara, apakah percobaan berikutnya dilakukan langsung atau setelah jeda?', 'jenis error → waktu percobaan berikutnya → alasannya', 'Jangan membuat semua worker retry serentak atau tanpa batas.')),
      beat('dead-letter queue', 'Message yang tidak pernah berhasil', 'Malformed payload atau dependency failure dapat tetap gagal setelah retry budget habis. Message tidak boleh hilang atau diputar tanpa akhir.', 'Informasi apa yang masuk dead-letter path, siapa owner-nya, dan syarat apa yang membuat replay aman?', 'message yang dialihkan → alasan dan riwayat kegagalan → data untuk investigasi → owner penanganan → syarat replay', guide('Ini jalur terminal untuk message yang tetap gagal setelah retry habis agar tidak hilang dan bisa diperiksa sebelum replay.', ['Gunakan satu payload invoice malformed yang terus gagal divalidasi.', 'Simpan payload reference dan riwayat kegagalannya di jalur terpisah.', 'Owner serta syarat replay sengaja belum diisi.'], 'Siapa yang harus menerima alert pertama untuk message ini, dan bukti apa yang perlu dilihat?', 'message gagal → owner alert → bukti kegagalan', 'Jangan membiarkan jalur gagal menjadi tempat tanpa owner, alert, atau aturan replay.')),
    ],
  ),
  13: story(
    'junior evaluation engineer yang mengukur outcome InvoiceOps',
    'Workflow sudah reliable. Lo harus membuktikan apakah automation mengurangi kerja manual tanpa menyembunyikan low-confidence atau risiko finansial.',
    [
      beat('routing accuracy', 'Accuracy tinggi yang menyembunyikan exception berisiko', 'Dataset sintetis memuat normal, mismatch, duplicate, low-confidence, dan malicious cases. Satu aggregate accuracy dapat menutupi kegagalan pada category berisiko tinggi.', 'Bagaimana gold label, metric per category, dan error analysis disusun agar routing claim dapat dipercaya?', 'cara menetapkan gold label → pembagian jenis case → metric per jenis → pola salah route → dasar menerima klaim', guide('Ini ukuran ketepatan route sistem terhadap label acuan, dibaca per jenis case agar kegagalan berisiko tidak tertutup rata-rata.', ['Pilih slice quantity mismatch dari dataset sintetis InvoiceOps.', 'Bandingkan route hasil sistem dengan label acuan untuk slice itu.', 'Jenis salah route dan ringkasan metric sengaja belum dihitung.'], 'Untuk satu case quantity mismatch, dua label apa yang perlu dibandingkan?', 'label acuan → route sistem → cocok atau tidak', 'Jangan memakai satu accuracy aggregate yang menyembunyikan kegagalan kategori berisiko.')),
      beat('human-touch time', 'Kerja manual hilang atau hanya berpindah', 'Assisted workflow dapat mengurangi pencarian, tetapi low-confidence case tetap masuk reviewer queue. Handoff dan waktu tunggu tidak boleh dihapus dari pengukuran.', 'Touch manusia apa yang dihitung dari intake sampai terminal state dan bagaimana dibandingkan dengan manual baseline?', 'langkah yang masih dikerjakan manusia → waktu aktif dan waktu tunggu → titik handoff → manual baseline → cara membandingkan perubahan', guide('Ini waktu dan jumlah interaksi manusia yang benar-benar terjadi dari intake sampai terminal state.', ['Ambil satu low-confidence case yang masuk reviewer queue.', 'Catat waktu aktif reviewer secara terpisah dari waktu case menunggu.', 'Perbandingan dengan alur manual sengaja belum dihitung.'], 'Untuk case ini, dua jenis waktu apa yang harus dipisahkan sebelum dibandingkan dengan baseline?', 'waktu aktif → waktu menunggu → total yang dilaporkan', 'Jangan menghapus handoff dari pengukuran ketika kerja hanya berpindah ke reviewer.')),
      beat('cost per case', 'ROI sintetis yang terlihat terlalu pasti', 'Cost mencakup model, tools, storage, retries, dan loaded human review time. Manual baseline dan volume memakai data sintetis sehingga tidak boleh diklaim sebagai savings client nyata.', 'Formula, asumsi, sensitivity, dan limitation apa yang wajib terlihat pada simulated ROI?', 'komponen biaya → baseline dan volume → formula simulasi → perubahan asumsi → batas klaim hasil', guide('Ini total biaya pada satu case di boundary yang jelas, termasuk komponen sistem dan kerja manusia yang relevan.', ['Pilih satu case InvoiceOps yang membutuhkan human review.', 'Catat biaya model dan loaded review time sebagai dua komponen awal.', 'Volume, retry, storage, dan sensitivity sengaja belum dimasukkan.'], 'Untuk simulasi awal, dua komponen biaya mana yang lo jumlahkan pada case ini?', 'komponen pertama → komponen kedua → subtotal simulasi', 'Jangan menyebut simulated ROI sebagai savings client nyata.')),
    ],
  ),
  14: story(
    'AI solution engineer yang mengubah dua project menjadi evidence untuk recruiter dan client',
    'RegulaRAG dan InvoiceOps sudah memiliki artifact teknis. Kini lo harus membuat pembaca memahami problem, keputusan, bukti, dan batasannya dalam lima menit.',
    [
      beat('case study', 'Recruiter membuka README sebelum code', 'Pembaca pertama kali melihat dua repository dan belum mengetahui konteks client. Feature list tidak menjelaskan pain, constraint, atau bukti bahwa sistem bekerja.', 'Urutan informasi apa yang membuat problem, action lo, result, dan evidence dapat dipahami dalam lima menit?', 'konteks problem → peran serta tindakan lo → result → evidence pendukung → urutan penyampaian', guide('Ini narasi berbukti yang menghubungkan problem, constraint, keputusan, kontribusi, hasil, dan batas project.', ['Pilih RegulaRAG dan mulai dari lambatnya pencarian sumber serta citation gap.', 'Hubungkan satu keputusan teknis dengan evidence evaluasinya.', 'Result dan limitation yang akan ditonjolkan sengaja belum dipilih.'], 'Satu evidence apa yang paling langsung mendukung problem pembuka RegulaRAG?', 'problem pembuka → evidence pendukung → kenapa relevan', 'Jangan mengubah halaman menjadi feature list tanpa baseline, failure, atau trade-off.')),
      beat('architecture narrative', 'Diagram yang tidak menjelaskan keputusan', 'RegulaRAG memisahkan evidence retrieval dari interpretasi manusia; InvoiceOps memisahkan model extraction dari deterministic calculations dan payment approval. Diagram saja tidak menunjukkan alasan trade-off itu.', 'Bagaimana lo menjelaskan context, alternatives, decision, dan consequence untuk satu keputusan penting?', 'context keputusan → alternatif yang dipertimbangkan → alasan memilih → consequence → evidence pendukung', guide('Ini cara menjelaskan keputusan sistem melalui context, alternatives, constraint, alasan memilih, dan consequence.', ['Pilih keputusan InvoiceOps untuk memisahkan model extraction dari deterministic calculations.', 'Context-nya: total, tax, dan tolerance harus tetap berupa rules yang dapat diuji.', 'Alternative yang ditolak serta consequence keputusan sengaja belum ditulis.'], 'Apa risiko utama jika calculation rules dipindahkan ke prompt model?', 'pilihan yang ditolak → risiko utamanya → alasan tetap memisahkan', 'Jangan hanya menyebut diagram atau framework tanpa alasan keputusan.')),
      beat('limitations', 'Demo sintetis yang terlihat seperti hasil client nyata', 'Evaluation dan ROI memakai data publik atau sintetis. Known failures dan non-goals harus terlihat agar metric tidak berubah menjadi klaim bisnis yang berlebihan.', 'Klaim apa yang boleh dibuat, apa yang harus diberi limitation, dan bukti apa yang masih belum tersedia?', 'claim yang ingin dibuat → evidence yang mendukung → kondisi berlakunya → batasan atau uncertainty → evidence yang masih kurang', guide('Ini batas validitas, data gap, failure mode, dan hal yang belum dibuktikan oleh project.', ['Ambil simulated ROI InvoiceOps sebagai satu claim yang perlu dibatasi.', 'Tandai bahwa baseline dan volume berasal dari data sintetis.', 'Claim yang masih aman serta evidence yang belum tersedia sengaja belum dirumuskan.'], 'Kalimat batas apa yang harus menyertai simulated ROI agar tidak terdengar seperti hasil client nyata?', 'jenis data → hal yang belum dibuktikan → batas klaim', 'Jangan menyembunyikan batas agar demo terlihat seperti production result.')),
    ],
  ),
  15: story(
    'AI engineer candidate yang mempertahankan keputusan project dalam interview',
    'Portfolio siap dibaca. Interviewer akan mengubah constraint dan meminta alasan di balik architecture, evaluation, safety, cost, serta rollback.',
    [
      beat('system design', 'Constraint berubah saat diagram belum selesai', 'Interviewer menaikkan workload atau mengubah reliability requirement. Menyebut framework tidak menjelaskan boundary, state, tool permission, eval, dan recovery.', 'Pertanyaan klarifikasi dan keputusan architecture apa yang lo prioritaskan ketika constraint berubah?', 'constraint awal dan perubahannya → pertanyaan klarifikasi → boundary yang terdampak → keputusan prioritas → trade-off dan cara mengeceknya', guide('Ini latihan memilih boundary, data flow, reliability, dan trade-off berdasarkan constraint yang diberikan.', ['Gunakan InvoiceOps lalu ubah satu constraint: workload meningkat.', 'Pertahankan payment approval di Finance Controller sebagai boundary tetap.', 'Komponen yang perlu diubah dan cara mengujinya sengaja belum dipilih.'], 'Saat workload meningkat, komponen mana yang pertama perlu lo ukur sebelum mengubah architecture?', 'constraint yang berubah → komponen yang diukur → signal keputusan', 'Jangan menggambar architecture generik tanpa workload atau failure scenario.')),
      beat('English walkthrough', 'Penjelasan teknis yang kehilangan alur', 'Lo harus menjelaskan problem, evidence, architecture, evaluation, failure, dan limitation dalam working English. Jargon panjang akan sulit dipertahankan saat interviewer bertanya why.', 'Bagaimana lo menyusun walkthrough sepuluh menit dan menjelaskan satu trade-off dalam tiga kalimat sederhana?', 'pembagian waktu → alur problem dan constraint → keputusan serta alasan → evidence dan failure → tiga kalimat trade-off', guide('Ini penjelasan lisan terstruktur dalam working English yang menjaga alur problem, keputusan, evidence, failure, dan limitation.', ['Pilih RegulaRAG dan buka dengan problem yang sudah terukur.', 'Kalimat awal: “Analysts spend 15–90 minutes finding evidence, and citations are inconsistent.”', 'Architecture trade-off serta limitation sengaja belum dijelaskan.'], 'Dalam satu kalimat English, keputusan apa yang menghubungkan problem itu dengan evidence-grounded assistant?', 'decision in English → reason in English → human boundary in English', 'Jangan menghafal jargon yang tidak bisa lo jelaskan saat ditanya why.')),
      beat('STAR stories', 'Aktivitas banyak, kontribusi pribadi tidak terlihat', 'Project mempunyai momen ketika evaluation menemukan citation failure atau failure test menemukan duplicate action. Interviewer perlu memahami situasi, tanggung jawab lo, tindakan, dan result berbukti.', 'Pengalaman mana yang lo pilih dan evidence apa yang membuat action serta result pribadi terlihat jelas?', 'situasi yang dipilih → tanggung jawab pribadi → action spesifik → result terukur → evidence pendukung', guide('Ini struktur Situation, Task, Action, Result untuk menunjukkan kontribusi pribadi dengan bukti yang spesifik.', ['Pilih momen ketika failure test InvoiceOps menemukan duplicate action.', 'Tetapkan situasinya sebagai replay event dan tugas lo sebagai menemukan batas yang gagal.', 'Action pribadi serta result terukurnya sengaja belum ditulis.'], 'Apa satu action pribadi yang lo lakukan setelah duplicate action ditemukan?', 'masalah yang ditemukan → action lo → perubahan yang terjadi', 'Jangan menceritakan aktivitas tim panjang tanpa action pribadi atau result berbukti.')),
    ],
  ),
  16: story(
    'AI engineer candidate yang menjalankan pencarian kerja sebagai eksperimen terukur',
    'Lo tidak mengirim aplikasi secara acak. Portfolio evidence menjadi input dan respons market menjadi signal untuk menentukan eksperimen berikutnya.',
    [
      beat('target roles', 'Judul berbeda, kebutuhan mirip', 'Lowongan memakai title AI Solutions Engineer, Agentic Developer, atau Automation Specialist, tetapi capability yang diminta dapat tumpang tindih. Satu positioning untuk semua role membuat evidence kurang relevan.', 'Bagaimana lo mengelompokkan role berdasarkan problem dan capability, lalu memilih evidence portfolio untuk tiap cluster?', 'aturan pengelompokan lowongan → problem utama tiap kelompok → capability yang dicari → evidence portfolio yang dipasangkan → signal kecocokan', guide('Ini cara mengelompokkan lowongan berdasarkan problem dan capability yang diminta, bukan title semata.', ['Ambil dua title: AI Solutions Engineer dan Automation Specialist.', 'Tandai capability overlap yang benar-benar muncul pada deskripsi, bukan dari nama role.', 'Evidence portfolio untuk tiap kelompok sengaja belum dipasangkan.'], 'Untuk satu kelompok yang menekankan workflow automation, evidence mana yang lebih relevan: RegulaRAG atau InvoiceOps?', 'problem kelompok → project yang dipilih → evidence utama', 'Jangan mengirim positioning dan evidence yang sama ke semua lowongan.')),
      beat('funnel diagnosis', 'Banyak aplikasi, sedikit pembelajaran', 'Tidak mendapat screening, gagal technical interview, dan gagal final interview menunjukkan kemungkinan bottleneck yang berbeda. Menambah volume saja tidak menjelaskan penyebabnya.', 'Metric dan signal apa yang membedakan masalah targeting, CV, technical depth, dan storytelling?', 'tahap yang diukur → metric konversi → signal kegagalan → dugaan penyebab → cara memvalidasi dugaan', guide('Ini cara membaca conversion dan signal pada tiap tahap aplikasi untuk memilih bottleneck yang perlu diuji.', ['Pilih signal tidak mendapat screening.', 'Hubungkan dulu ke area CV atau targeting sebagai hipotesis, bukan kesimpulan.', 'Metric pembanding dan test hipotesis sengaja belum dipilih.'], 'Metric sederhana apa yang menunjukkan apakah perubahan CV meningkatkan screening?', 'jumlah aplikasi relevan → jumlah screening → conversion rate', 'Jangan menambah volume aplikasi tanpa menguji penyebab di tahap yang macet.')),
      beat('iteration backlog', 'Semua terasa perlu diperbaiki sekaligus', 'Funnel menghasilkan beberapa gap, sementara waktu lo terbatas. Mempercantik landing page belum tentu mengurangi risiko terbesar jika evidence failure handling masih lemah.', 'Bagaimana lo memprioritaskan eksperimen dua minggu berdasarkan uncertainty, impact, effort, dan learning value?', 'gap atau asumsi → risiko dan impact → effort → learning value → urutan eksperimen dua minggu', guide('Ini daftar eksperimen yang diurutkan menurut uncertainty, impact, effort, dan learning value.', ['Bandingkan dua gap: landing page kurang rapi dan evidence failure handling masih lemah.', 'Tandai evidence failure handling sebagai risiko yang lebih dekat ke technical review.', 'Effort serta success signal eksperimennya sengaja belum dinilai.'], 'Dari dua gap itu, mana yang diuji lebih dulu dan signal apa yang menunjukkan perbaikan?', 'gap terpilih → alasan prioritas → signal keberhasilan', 'Jangan mengubah daftar ini menjadi backlog fitur tanpa hypothesis dan success signal.')),
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
