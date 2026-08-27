import { weeklyMissions, type WeeklyMission } from './missions';

export type PhaseId =
  | 'discover'
  | 'design'
  | 'orchestrate'
  | 'evaluate'
  | 'operate'
  | 'prove';

export type RoadmapTask = {
  id: string;
  label: string;
};

export type RoadmapWeek = {
  id: string;
  week: number;
  phaseId: PhaseId;
  title: string;
  clientOutcome: string;
  concepts: string[];
  tasks: RoadmapTask[];
  evidence: string;
  gate: string;
  hours: string;
  mission: WeeklyMission;
};

export type DeliveryPhase = {
  id: PhaseId;
  label: string;
  verb: string;
  description: string;
};

export const phases: DeliveryPhase[] = [
  { id: 'discover', label: 'Discover', verb: 'Pahami', description: 'Masalah, proses, dan nilai bisnis.' },
  { id: 'design', label: 'Design', verb: 'Batasi', description: 'Keputusan agent, tools, dan izin.' },
  { id: 'orchestrate', label: 'Orchestrate', verb: 'Hubungkan', description: 'State, tools, dan human approval.' },
  { id: 'evaluate', label: 'Evaluate', verb: 'Ukur', description: 'Kualitas, failure, latency, dan cost.' },
  { id: 'operate', label: 'Operate', verb: 'Jaga', description: 'Reliability, safety, dan observability.' },
  { id: 'prove', label: 'Prove', verb: 'Buktikan', description: 'Outcome, case study, dan delivery.' },
];

export const roadmapWeeks: RoadmapWeek[] = [
  {
    id: 'week-1', week: 1, phaseId: 'discover', title: 'Frame the client problem',
    clientOutcome: 'Mengubah keluhan kabur menjadi masalah operasional yang dapat diukur.',
    concepts: ['workflow mapping', 'stakeholder', 'baseline KPI'],
    tasks: [
      { id: 'w1-process-map', label: 'Petakan proses as-is dan bottleneck utama.' },
      { id: 'w1-kpi', label: 'Tentukan baseline, target KPI, dan sumber datanya.' },
      { id: 'w1-risk', label: 'Catat risiko, data sensitif, dan pemilik keputusan.' },
    ],
    evidence: 'One-page problem brief + process map.',
    gate: 'Masalah dapat dijelaskan tanpa menyebut framework AI.',
    hours: '28–34 jam',
    mission: weeklyMissions[1],
  },
  {
    id: 'week-2', week: 2, phaseId: 'discover', title: 'Run the agent-fit test',
    clientOutcome: 'Memilih solusi paling sederhana yang tetap mencapai outcome client.',
    concepts: ['agent vs workflow', 'RAG fit', 'human boundary'],
    tasks: [
      { id: 'w2-options', label: 'Bandingkan rules, automation, RAG, dan agent.' },
      { id: 'w2-boundary', label: 'Tandai keputusan yang wajib tetap di manusia.' },
      { id: 'w2-scorecard', label: 'Buat decision scorecard untuk memilih pendekatan.' },
    ],
    evidence: 'Agent-fit assessment dengan alasan teknis dan bisnis.',
    gate: 'Bisa menjelaskan kapan tidak memakai LLM.',
    hours: '28–34 jam',
    mission: weeklyMissions[2],
  },
  {
    id: 'week-3', week: 3, phaseId: 'design', title: 'Contract before prompt',
    clientOutcome: 'Setiap keluaran agent dapat divalidasi dan dipakai sistem lain.',
    concepts: ['structured output', 'tool schema', 'validation'],
    tasks: [
      { id: 'w3-schema', label: 'Definisikan input, output, dan error schema.' },
      { id: 'w3-tool', label: 'Implementasikan satu tool dengan strict contract.' },
      { id: 'w3-invalid', label: 'Uji malformed output dan missing fields.' },
    ],
    evidence: 'Tool contract + executable contract tests.',
    gate: 'Output invalid selalu gagal dengan jelas, tidak diteruskan diam-diam.',
    hours: '30–36 jam',
    mission: weeklyMissions[3],
  },
  {
    id: 'week-4', week: 4, phaseId: 'design', title: 'Design the control plane',
    clientOutcome: 'Agent memiliki batas tindakan, state, dan jalur eskalasi yang jelas.',
    concepts: ['state machine', 'retry', 'approval'],
    tasks: [
      { id: 'w4-state', label: 'Gambar state machine dan terminal states.' },
      { id: 'w4-failure', label: 'Definisikan timeout, retry, dan max-step policy.' },
      { id: 'w4-approval', label: 'Pasang approval sebelum side effect.' },
    ],
    evidence: 'Architecture decision record + failure matrix.',
    gate: 'Setiap side effect memiliki permission dan audit path.',
    hours: '30–36 jam',
    mission: weeklyMissions[4],
  },
  {
    id: 'week-5', week: 5, phaseId: 'orchestrate', title: 'Build the RAG baseline',
    clientOutcome: 'Staf dapat menemukan jawaban berbasis regulasi dan SOP tanpa menelusuri puluhan dokumen.',
    concepts: ['ingestion', 'chunking', 'vector retrieval'],
    tasks: [
      { id: 'w5-corpus', label: 'Kurasi regulasi publik dan SOP sintetis beserta metadata.' },
      { id: 'w5-baseline', label: 'Bangun ingestion dan vector retrieval baseline.' },
      { id: 'w5-evalset', label: 'Tulis 40 pertanyaan answerable dan unanswerable.' },
    ],
    evidence: 'RegulaRAG baseline + versioned evaluation set.',
    gate: 'Setiap chunk dapat ditelusuri kembali ke dokumen dan halaman.',
    hours: '32–38 jam',
    mission: weeklyMissions[5],
  },
  {
    id: 'week-6', week: 6, phaseId: 'evaluate', title: 'Make retrieval measurable',
    clientOutcome: 'Kualitas pencarian dapat dibandingkan dengan angka, bukan impresi demo.',
    concepts: ['hybrid search', 'reranking', 'Recall@k'],
    tasks: [
      { id: 'w6-labels', label: 'Labeli dokumen relevan untuk setiap golden question.' },
      { id: 'w6-compare', label: 'Bandingkan vector-only dengan hybrid + reranker.' },
      { id: 'w6-citation', label: 'Ukur citation precision dan supported claims.' },
    ],
    evidence: 'Baseline-versus-final evaluation report.',
    gate: 'Recall@5 ≥80% dan citation precision ≥90% pada demo set.',
    hours: '32–38 jam',
    mission: weeklyMissions[6],
  },
  {
    id: 'week-7', week: 7, phaseId: 'operate', title: 'Defend the knowledge boundary',
    clientOutcome: 'Assistant menolak spekulasi dan mengabaikan instruksi berbahaya di dalam dokumen.',
    concepts: ['abstention', 'prompt injection', 'data boundary'],
    tasks: [
      { id: 'w7-abstain', label: 'Implementasikan evidence threshold dan abstention path.' },
      { id: 'w7-attacks', label: 'Tambahkan adversarial documents dan malicious questions.' },
      { id: 'w7-policy', label: 'Pisahkan trusted instruction dari untrusted document text.' },
    ],
    evidence: 'Threat model + adversarial regression suite.',
    gate: '≥90% unsupported questions ditolak dan document injection tidak mengubah policy.',
    hours: '30–36 jam',
    mission: weeklyMissions[7],
  },
  {
    id: 'week-8', week: 8, phaseId: 'prove', title: 'Ship RegulaRAG evidence',
    clientOutcome: 'Stakeholder dapat mencoba sistem dan melihat bukti kualitas, biaya, serta keterbatasannya.',
    concepts: ['tracing', 'latency', 'cost per query'],
    tasks: [
      { id: 'w8-trace', label: 'Trace alur ingest → retrieve → rerank → answer.' },
      { id: 'w8-metrics', label: 'Catat p50/p95 latency, token, dan cost per query.' },
      { id: 'w8-demo', label: 'Deploy demo dan rekam walkthrough 3–5 menit.' },
    ],
    evidence: 'Live demo + eval dashboard + first client case study.',
    gate: 'Fresh clone dapat menjalankan demo dan seluruh regression eval.',
    hours: '32–40 jam',
    mission: weeklyMissions[8],
  },
  {
    id: 'week-9', week: 9, phaseId: 'discover', title: 'Map the invoice exception flow',
    clientOutcome: 'Tim finance memiliki definisi jelas untuk match, exception, escalation, dan approval.',
    concepts: ['process mining', 'exception taxonomy', 'permission map'],
    tasks: [
      { id: 'w9-states', label: 'Petakan invoice → PO → receipt → approval states.' },
      { id: 'w9-rules', label: 'Pisahkan calculation rules dari judgment agent.' },
      { id: 'w9-kpi', label: 'Tentukan accuracy, human-touch time, dan risk KPI.' },
    ],
    evidence: 'InvoiceOps process map + exception taxonomy.',
    gate: 'Setiap exception memiliki owner dan terminal state.',
    hours: '28–34 jam',
    mission: weeklyMissions[9],
  },
  {
    id: 'week-10', week: 10, phaseId: 'orchestrate', title: 'Connect tools, preserve rules',
    clientOutcome: 'Agent mengumpulkan bukti dari sistem, sementara hitungan bisnis tetap deterministik.',
    concepts: ['typed tools', 'mock ERP', 'n8n webhook'],
    tasks: [
      { id: 'w10-erp', label: 'Bangun mock ERP dengan PO, receipt, dan vendor tools.' },
      { id: 'w10-rules', label: 'Implementasikan total, tax, dan mismatch sebagai pure rules.' },
      { id: 'w10-webhook', label: 'Gunakan n8n hanya sebagai inbound integration layer.' },
    ],
    evidence: 'Contract-tested tools + deterministic reconciliation engine.',
    gate: 'LLM tidak menghitung atau memutuskan pembayaran.',
    hours: '34–40 jam',
    mission: weeklyMissions[10],
  },
  {
    id: 'week-11', week: 11, phaseId: 'orchestrate', title: 'Persist state, require approval',
    clientOutcome: 'Case dapat dihentikan, ditinjau manusia, dilanjutkan, dan diaudit tanpa kehilangan konteks.',
    concepts: ['checkpoint', 'human-in-the-loop', 'audit trail'],
    tasks: [
      { id: 'w11-state', label: 'Persist workflow state dan evidence per transition.' },
      { id: 'w11-approval', label: 'Wajibkan approval token sebelum write action.' },
      { id: 'w11-replay', label: 'Tambahkan audit log dan replay untuk setiap run.' },
    ],
    evidence: 'Resumable workflow + reviewer queue.',
    gate: '100% risky scenarios berhenti pada approval.',
    hours: '34–40 jam',
    mission: weeklyMissions[11],
  },
  {
    id: 'week-12', week: 12, phaseId: 'operate', title: 'Engineer for ugly failures',
    clientOutcome: 'Gangguan provider atau input duplikat tidak menghasilkan aksi ganda maupun case hilang.',
    concepts: ['idempotency', 'backoff', 'dead-letter queue'],
    tasks: [
      { id: 'w12-duplicate', label: 'Uji duplicate webhook dan replayed file.' },
      { id: 'w12-failure', label: 'Inject timeout, rate limit, malformed output, dan ERP outage.' },
      { id: 'w12-recovery', label: 'Implementasikan retry budget dan dead-letter path.' },
    ],
    evidence: 'Failure-injection report + recovery runbook.',
    gate: 'Zero duplicate side effect dan tiga injected failures pulih dengan benar.',
    hours: '34–40 jam',
    mission: weeklyMissions[12],
  },
  {
    id: 'week-13', week: 13, phaseId: 'evaluate', title: 'Measure the operating outcome',
    clientOutcome: 'Client dapat melihat apakah automation mengurangi kerja manual tanpa menaikkan risiko.',
    concepts: ['routing accuracy', 'human-touch time', 'cost per case'],
    tasks: [
      { id: 'w13-dataset', label: 'Jalankan minimal 100 synthetic invoice scenarios.' },
      { id: 'w13-metrics', label: 'Ukur extraction, routing, escalation, latency, dan cost.' },
      { id: 'w13-roi', label: 'Bandingkan simulated manual baseline dengan assisted workflow.' },
    ],
    evidence: 'InvoiceOps scorecard + simulated ROI model.',
    gate: 'Routing ≥90%, key fields ≥95%, low-confidence selalu dieskalasi.',
    hours: '32–38 jam',
    mission: weeklyMissions[13],
  },
  {
    id: 'week-14', week: 14, phaseId: 'prove', title: 'Package the client story',
    clientOutcome: 'Recruiter atau client memahami problem, keputusan, dan bukti dalam lima menit.',
    concepts: ['case study', 'architecture narrative', 'limitations'],
    tasks: [
      { id: 'w14-readme', label: 'Tulis English-first README untuk kedua proyek.' },
      { id: 'w14-diagram', label: 'Rapikan architecture, data flow, dan threat model.' },
      { id: 'w14-video', label: 'Rekam demo yang menampilkan normal flow dan failure flow.' },
    ],
    evidence: 'Two polished repos + two concise client case studies.',
    gate: 'Semua klaim kualitas memiliki metric, dataset, dan limitation.',
    hours: '30–36 jam',
    mission: weeklyMissions[14],
  },
  {
    id: 'week-15', week: 15, phaseId: 'prove', title: 'Defend every decision',
    clientOutcome: 'Kandidat mampu menjelaskan arsitektur dan failure handling tanpa berlindung di balik framework.',
    concepts: ['system design', 'English walkthrough', 'STAR stories'],
    tasks: [
      { id: 'w15-design', label: 'Latihan dua agent-system-design interviews.' },
      { id: 'w15-english', label: 'Rekam penjelasan proyek 10 menit dalam English.' },
      { id: 'w15-stories', label: 'Siapkan enam cerita STAR berbasis bukti proyek.' },
    ],
    evidence: 'Interview packet + recorded English walkthrough.',
    gate: 'Bisa menjelaskan agent vs workflow, evaluation, safety, cost, dan rollback.',
    hours: '28–34 jam',
    mission: weeklyMissions[15],
  },
  {
    id: 'week-16', week: 16, phaseId: 'prove', title: 'Run the application system',
    clientOutcome: 'Pencarian kerja berjalan sebagai feedback loop terukur, bukan aktivitas acak.',
    concepts: ['target roles', 'funnel diagnosis', 'iteration backlog'],
    tasks: [
      { id: 'w16-apply', label: 'Kirim 12–15 targeted applications dengan dua CV variants.' },
      { id: 'w16-outreach', label: 'Lakukan lima outreach relevan dan satu portfolio post.' },
      { id: 'w16-review', label: 'Review screening, interview, dan rejection signals.' },
    ],
    evidence: 'Application dashboard + next-30-day improvement backlog.',
    gate: 'Setiap kegagalan funnel menghasilkan perubahan positioning atau skill yang spesifik.',
    hours: '28–34 jam',
    mission: weeklyMissions[16],
  },
];

export type SkillNode = {
  id: string;
  title: string;
  kind: 'core' | 'support';
  description: string;
  capabilities: string[];
  weeks: number[];
  proof: string;
};

export const skillNodes: SkillNode[] = [
  {
    id: 'client-discovery', title: 'Client discovery', kind: 'core',
    description: 'Mengubah proses berantakan menjadi problem, boundary, KPI, dan decision owner yang jelas.',
    capabilities: ['workflow mapping', 'agent-fit test', 'risk & permission map'],
    weeks: [1, 2, 9], proof: 'Problem brief yang tetap masuk akal tanpa jargon AI.',
  },
  {
    id: 'agent-architecture', title: 'Agent architecture', kind: 'core',
    description: 'Mendesain kontrak, state, tool boundary, deterministic logic, dan approval path.',
    capabilities: ['structured output', 'tool calling', 'state machine'],
    weeks: [3, 4, 10, 11], proof: 'Agent dapat dihentikan, diaudit, dan dijelaskan.',
  },
  {
    id: 'knowledge-systems', title: 'Knowledge systems', kind: 'core',
    description: 'Membangun retrieval yang bersumber, terukur, dan mampu menolak ketika bukti tidak cukup.',
    capabilities: ['ingestion', 'hybrid retrieval', 'citations & abstention'],
    weeks: [5, 6, 7, 8], proof: 'Evaluation set dan report baseline-versus-final.',
  },
  {
    id: 'integration', title: 'Integration & automation', kind: 'core',
    description: 'Menghubungkan agent ke API, webhook, dan workflow bisnis tanpa kehilangan kontrol.',
    capabilities: ['REST & webhook', 'n8n last-mile', 'typed tool contracts'],
    weeks: [3, 10, 11, 12], proof: 'Integration tests dan explicit side-effect boundary.',
  },
  {
    id: 'reliability', title: 'Reliability & safety', kind: 'core',
    description: 'Menghadapi failure, duplicate input, prompt injection, excessive agency, dan recovery.',
    capabilities: ['retry & idempotency', 'guardrails', 'observability'],
    weeks: [4, 7, 11, 12, 13], proof: 'Failure-injection report dan threat model.',
  },
  {
    id: 'evaluation', title: 'Evaluation & impact', kind: 'core',
    description: 'Menghubungkan kualitas model dengan latency, cost, human effort, dan business outcome.',
    capabilities: ['golden dataset', 'quality metrics', 'ROI narrative'],
    weeks: [1, 6, 8, 13, 14], proof: 'Scorecard dengan baseline, metric, dan limitation.',
  },
  {
    id: 'engineering', title: 'Supporting engineering', kind: 'support',
    description: 'Kode adalah kendaraan delivery: cukup kuat untuk membuat solusi dapat diuji dan dioperasikan.',
    capabilities: ['Python/FastAPI', 'SQL/Postgres', 'Docker, CI, tests'],
    weeks: [3, 5, 8, 10, 12, 13], proof: 'Fresh clone berjalan, CI hijau, dan failure tertangani.',
  },
];

export type ProjectLab = {
  id: string;
  label: string;
  title: string;
  problem: string;
  workflow: string[];
  constraint: string;
  metrics: string[];
  acceptance: string[];
  weeks: string;
};

export const projectLabs: ProjectLab[] = [
  {
    id: 'regularag', label: 'PROJECT LAB A · KNOWLEDGE SYSTEM', title: 'RegulaRAG ID',
    problem: 'Tim compliance sulit menemukan jawaban lintas regulasi Indonesia dan SOP internal.',
    workflow: ['ingest', 'retrieve', 'rerank', 'answer', 'cite / abstain'],
    constraint: 'Semua jawaban faktual wajib memiliki bukti; dokumen diperlakukan sebagai untrusted input.',
    metrics: ['Recall@5 ≥80%', 'citation precision ≥90%', 'abstention ≥90%'],
    acceptance: ['No duplicate chunks', 'Page-level citation', 'Injection regression suite'],
    weeks: 'W01—W08',
  },
  {
    id: 'invoiceops', label: 'PROJECT LAB B · OPERATIONAL AGENT', title: 'InvoiceOps Agent',
    problem: 'Tim finance menghabiskan waktu mencocokkan invoice, PO, receipt, dan exception secara manual.',
    workflow: ['receive', 'extract', 'match', 'review', 'approve / reject'],
    constraint: 'Agent tidak menghitung pajak atau melakukan pembayaran; seluruh write action membutuhkan approval.',
    metrics: ['key fields ≥95%', 'routing ≥90%', 'zero duplicate action'],
    acceptance: ['Persistent audit trail', 'Idempotent webhook', 'Recovery from 3 failures'],
    weeks: 'W09—W13',
  },
];

export type EvidenceItem = {
  id: string;
  label: string;
  description: string;
  week: number;
};

export const evidenceItems: EvidenceItem[] = [
  { id: 'evidence-repos', label: 'Two polished repositories', description: 'Quickstart, typed contracts, tests, CI, architecture, dan limitations.', week: 14 },
  { id: 'evidence-demos', label: 'Two live demos', description: 'Normal flow, failure flow, trace, dan human approval terlihat.', week: 14 },
  { id: 'evidence-evals', label: 'Evaluation reports', description: 'Golden datasets, baseline comparison, latency, cost, dan sampling method.', week: 13 },
  { id: 'evidence-threat', label: 'Threat models', description: 'Prompt injection, data leakage, duplicate action, dan permission boundaries.', week: 12 },
  { id: 'evidence-cases', label: 'Client case studies', description: 'Problem → constraint → decision → evidence → limitation → next iteration.', week: 14 },
  { id: 'evidence-english', label: 'English walkthrough', description: 'Penjelasan arsitektur dan trade-off selama 10 menit tanpa bergantung pada framework.', week: 15 },
];

export const targetRoles = [
  'Junior AI Engineer',
  'Applied AI Engineer',
  'AI Application Engineer',
  'GenAI / LLM Engineer',
  'AI Solutions Engineer',
  'Python Backend — AI Integration',
];
