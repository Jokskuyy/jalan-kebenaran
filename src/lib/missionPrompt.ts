import { caseDossiers } from '../data/missions';
import type { StarterAsset } from '../data/missions';
import type { RoadmapWeek } from '../data/roadmap';

const DEFAULT_MISSION_ORIGIN = 'https://jalan-kebenaran.vercel.app';

function bullets(items: string[]) {
  return items.map((item) => `- ${item}`).join('\n');
}

function numbered(items: string[]) {
  return items.map((item, index) => `${index + 1}. ${item}`).join('\n');
}

function uniqueStrings(items: string[]) {
  return [...new Set(items)];
}

function uniqueAssets(items: StarterAsset[]) {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.path)) return false;
    seen.add(item.path);
    return true;
  });
}

type TeachingNote = {
  definition: string;
  example: string;
  trap: string;
  check: string;
};

const teachingNotes: Record<string, TeachingNote> = {
  'workflow mapping': { definition: 'Peta urutan kerja dari trigger, actor, input, keputusan, handoff, sampai outcome.', example: 'Untuk RegulaRAG, ikuti pertanyaan masuk → analyst mencari sumber → legal review bila berisiko → jawaban dikirim.', trap: 'Menggambar fitur aplikasi, bukan pekerjaan client yang sedang berlangsung.', check: 'Di langkah mana waktu paling banyak hilang, dan siapa owner langkah itu?' },
  stakeholder: { definition: 'Orang atau role yang memakai, memutuskan, memiliki risiko, atau terkena dampak sistem.', example: 'Analyst memakai workflow; Operations Lead memiliki target cycle time; Legal Counsel menyetujui interpretasi berisiko.', trap: 'Menganggap requester, user, approver, dan decision owner adalah orang yang sama.', check: 'Siapa yang boleh menyetujui keputusan berisiko dan siapa yang hanya memberi input?' },
  'baseline KPI': { definition: 'Ukuran kondisi sekarang dengan formula, unit, periode, denominator, sumber, dan confidence.', example: 'Median research minutes dari workflow log, bukan klaim “sekitar satu jam”.', trap: 'Menulis target “lebih cepat” tanpa baseline, denominator, atau owner data.', check: 'Kalau angka berubah minggu depan, data apa yang membuktikan perubahan itu?' },
  'agent vs workflow': { definition: 'Workflow mengikuti langkah deterministic; agent memilih langkah atau tool saat input tidak sepenuhnya diketahui.', example: 'Mencari policy aktif bisa workflow/search; memilih pertanyaan klarifikasi mungkin agent.', trap: 'Memakai agent untuk alur tetap yang lebih mudah diuji dengan rules.', check: 'Bagian mana yang benar-benar membutuhkan keputusan dinamis?' },
  'RAG fit': { definition: 'Kecocokan retrieval-augmented generation dinilai dari kebutuhan evidence yang berubah, bukan dari tren teknologi.', example: 'RegulaRAG cocok untuk menemukan passage policy dan cite sumber; ia tidak cocok membuat keputusan hukum.', trap: 'Mengira RAG otomatis membuat jawaban benar atau fresh.', check: 'Apa bukti yang wajib tampil agar jawaban boleh dipercaya?' },
  'human boundary': { definition: 'Batas eksplisit untuk keputusan atau tindakan yang tetap membutuhkan manusia.', example: 'Legal interpretation dan InvoiceOps payment approval tidak boleh dilakukan model.', trap: 'Menaruh “human in the loop” sebagai slogan tanpa titik pause dan permission.', check: 'Apa tepatnya yang dilihat dan disetujui manusia sebelum side effect?' },
  'structured output': { definition: 'Output model mengikuti schema machine-readable yang dapat divalidasi sebelum dipakai sistem.', example: 'Extraction invoice harus punya field, confidence, source region, dan explicit error.', trap: 'Mengandalkan JSON yang tampak rapi tanpa schema validation.', check: 'Apa yang terjadi saat satu required field hilang?' },
  'tool schema': { definition: 'Kontrak nama tool, input, output, permission, dan error yang membatasi tindakan agent.', example: 'Tool citation hanya mengembalikan document ID, page, passage, dan confidence.', trap: 'Tool menerima blob bebas atau menggabungkan read dan write dalam satu fungsi.', check: 'Input apa yang harus ditolak sebelum tool menyentuh sistem?' },
  validation: { definition: 'Pemeriksaan tipe, range, required fields, dan business invariant sebelum output diteruskan.', example: 'Total invoice dihitung ulang oleh rules dan output model ditolak jika currency tidak valid.', trap: 'Memperbaiki output invalid diam-diam sehingga error hilang dari audit.', check: 'Validasi mana yang berasal dari schema dan mana yang berasal dari aturan bisnis?' },
  'state machine': { definition: 'Daftar state, event yang sah, transition, dan terminal state sebuah pekerjaan.', example: 'Invoice dapat bergerak dari received → extracted → review → approved, atau failed/dead-letter.', trap: 'Menyimpan status sebagai satu string tanpa aturan transition.', check: 'State terminal apa yang mencegah sistem mencoba ulang tanpa batas?' },
  retry: { definition: 'Percobaan ulang terbatas setelah failure transient dengan timeout dan terminal path.', example: 'ERP timeout boleh dicoba ulang, tetapi hanya setelah idempotency check.', trap: 'Retry semua error atau retry tanpa batas hingga terjadi retry storm.', check: 'Error mana yang transient dan berapa maksimum percobaannya?' },
  approval: { definition: 'Keputusan eksplisit dari role berwenang sebelum tindakan yang berisiko atau irreversible.', example: 'Finance Controller menyetujui reconciliation result dengan evidence snapshot yang fresh.', trap: 'Approval token tidak terikat ke case version atau actor.', check: 'Apa yang membuat approval menjadi stale?' },
  ingestion: { definition: 'Proses menerima, menormalisasi, memberi metadata, dan menyimpan sumber untuk retrieval.', example: 'Dokumen RegulaRAG diberi status aktif/arsip, version, owner, dan page count.', trap: 'Memasukkan semua file tanpa provenance, deduplication, atau access policy.', check: 'Metadata apa yang menentukan dokumen boleh dipakai?' },
  chunking: { definition: 'Memecah dokumen menjadi unit retrieval yang mempertahankan makna dan provenance.', example: 'SOP dipotong berdasarkan heading dan section agar citation menunjuk passage yang utuh.', trap: 'Chunk terlalu besar sehingga retrieval noisy atau terlalu kecil sehingga konteks hilang.', check: 'Bagaimana chunk masih dapat dilacak ke page atau section asal?' },
  'vector retrieval': { definition: 'Mencari unit teks yang mirip secara semantic embedding lalu mengembalikan kandidat.', example: 'Pertanyaan compliance dicocokkan ke passage SOP dan regulasi yang relevan.', trap: 'Menganggap similarity score adalah bukti kebenaran atau authorization.', check: 'Filter metadata apa yang harus dilakukan sebelum similarity ranking?' },
  'hybrid search': { definition: 'Menggabungkan lexical matching dan semantic retrieval untuk menangkap istilah exact serta makna.', example: 'Nomor regulasi exact match digabung dengan pencarian semantic atas istilah retention.', trap: 'Menggabungkan skor tanpa normalisasi atau evaluasi per slice.', check: 'Query seperti apa yang terbantu lexical search tetapi gagal vector-only?' },
  reranking: { definition: 'Mengurutkan ulang kandidat retrieval menggunakan signal relevansi yang lebih mahal atau lebih cermat.', example: 'Top 20 passage disaring menjadi top 5 yang benar-benar menjawab question.', trap: 'Reranker dianggap memperbaiki corpus buruk tanpa mengukur precision/recall.', check: 'Kapan reranking menambah latency tetapi belum menambah answer quality?' },
  'Recall@k': { definition: 'Proporsi query yang memiliki evidence relevan di antara k hasil teratas.', example: 'Recall@5 RegulaRAG menjawab apakah passage gold muncul di lima kandidat awal.', trap: 'Menyebut Recall@5 tinggi sebagai bukti jawaban akhir selalu benar.', check: 'Apa yang tidak diukur Recall@k tentang citation dan generation?' },
  abstention: { definition: 'Keputusan sistem untuk tidak menjawab ketika evidence, confidence, atau permission tidak cukup.', example: 'Jika dua versi SOP konflik, RegulaRAG berhenti dan meminta escalation.', trap: 'Menganggap abstain sebagai failure tanpa mengukur safe escalation.', check: 'Signal apa yang memicu abstention dan bagaimana user melanjutkan?' },
  'prompt injection': { definition: 'Instruksi berbahaya yang disisipkan di input atau dokumen untuk mengubah perilaku model.', example: 'Footer dokumen vendor InvoiceOps menyuruh agent mengabaikan policy dan approve.', trap: 'Menganggap teks hasil retrieval adalah instruksi terpercaya.', check: 'Bagaimana sistem memperlakukan instruksi di dokumen sebagai data tak terpercaya?' },
  'data boundary': { definition: 'Batas data yang boleh masuk, keluar, dilihat role tertentu, atau disimpan di log.', example: 'Demo hanya memakai public regulation dan SOP sintetis; prompt dan secrets tidak boleh masuk citation.', trap: 'Menulis “aman” tanpa daftar data class dan control location.', check: 'Data apa yang harus di-redact sebelum trace atau log disimpan?' },
  tracing: { definition: 'Rekaman terstruktur tentang langkah, tool call, latency, error, dan decision dalam satu run.', example: 'Trace RegulaRAG menunjukkan retrieval kosong lalu abstention, bukan hanya jawaban akhir.', trap: 'Log hanya output final sehingga failure path tidak dapat direkonstruksi.', check: 'Trace field mana yang membantu menemukan bottleneck pertama?' },
  latency: { definition: 'Waktu dari event awal sampai hasil pada boundary yang disepakati, sering dilihat p50/p95.', example: 'Ukur intake-to-proposed-route InvoiceOps dan pecah waktu model, ERP, queue, dan human wait.', trap: 'Mengoptimalkan rata-rata sambil menyembunyikan p95 yang buruk.', check: 'Boundary dan percentile apa yang relevan bagi client?' },
  'cost per query': { definition: 'Biaya incremental untuk memproses satu query termasuk model, retrieval, storage, dan retry.', example: 'Bandingkan cost query RegulaRAG ketika reranking atau long context dinyalakan.', trap: 'Menghitung harga model saja dan lupa retries atau human escalation.', check: 'Komponen biaya apa yang dapat diukur dari trace?' },
  'process mining': { definition: 'Mengekstrak pola proses, bottleneck, dan variasi dari event log nyata.', example: 'Gunakan event invoice untuk melihat jalur clean match versus exception.', trap: 'Menggambar ideal process tanpa membandingkan event aktual.', check: 'Event minimum apa yang diperlukan agar satu case dapat direkonstruksi?' },
  'exception taxonomy': { definition: 'Daftar kategori exception dengan signal, owner, allowed action, SLA, dan terminal state.', example: 'EX-QTY route ke warehouse; EX-AUTH memblokir write dan membuat audit event.', trap: 'Kategori terlalu umum sehingga routing dan KPI tidak actionable.', check: 'Apa yang membuat dua exception berbeda owner atau recovery-nya?' },
  'permission map': { definition: 'Matriks capability × role yang menyatakan read, propose, approve, write, dan deny.', example: 'System agent boleh propose route tetapi Finance Controller satu-satunya approver.', trap: 'Mengandalkan role name tanpa authorization check di boundary.', check: 'Capability mana yang harus selalu deny meskipun model memintanya?' },
  'typed tools': { definition: 'Tool dengan input/output type eksplisit, validation, permission, timeout, dan error contract.', example: 'get_purchase_order menerima PO ID terformat dan mengembalikan typed line items.', trap: 'Tool wrapper tipis yang menyembunyikan side effect dan error.', check: 'Bagaimana caller membedakan not-found dari dependency timeout?' },
  'mock ERP': { definition: 'Simulator dependency eksternal untuk menguji kontrak dan failure tanpa menyentuh sistem nyata.', example: 'InvoiceOps membaca PO dan receipt dari mock ERP lalu menginjeksikan timeout.', trap: 'Mock selalu happy path sehingga confidence palsu.', check: 'Failure behavior apa yang wajib disimulasikan?' },
  'n8n webhook': { definition: 'Boundary penerima event HTTP yang memvalidasi auth, dedupe, schema, dan acknowledgement.', example: 'Invoice webhook dapat datang dua kali atau tidak berurutan, jadi event ID wajib dicatat.', trap: 'Meneruskan payload langsung ke model tanpa validation atau idempotency.', check: 'Kapan webhook boleh membalas success?' },
  checkpoint: { definition: 'Titik penyimpanan state dan evidence yang memungkinkan proses pause/resume dengan aman.', example: 'Invoice case menyimpan extraction snapshot sebelum menunggu Controller.', trap: 'Resume hanya mengandalkan chat history yang tidak versioned.', check: 'Data apa yang harus immutable di checkpoint?' },
  'human-in-the-loop': { definition: 'Pola interaksi di mana manusia memeriksa, mengoreksi, mengapprove, atau mengambil alih langkah agent.', example: 'Reviewer memperbaiki low-confidence field lalu workflow melanjutkan dari checkpoint.', trap: 'Manusia hanya menjadi tombol approve tanpa evidence dan context.', check: 'Informasi minimum apa yang harus dilihat reviewer?' },
  'audit trail': { definition: 'Urutan event yang dapat menjelaskan actor, timestamp, input version, decision, dan side effect.', example: 'Catat siapa mengubah route, approval token mana dipakai, dan apakah write terjadi sekali.', trap: 'Log verbose yang bocor secret atau tidak immutable.', check: 'Event apa yang dibutuhkan untuk menjawab “siapa melakukan apa dan kapan”?' },
  idempotency: { definition: 'Sifat bahwa request yang sama diproses ulang tanpa membuat side effect kedua.', example: 'Webhook INV-S13 dan INV-S14 menghasilkan satu reconciliation case berdasarkan event/idempotency key.', trap: 'Mengira retry aman hanya karena endpoint mengembalikan 200.', check: 'Key apa yang mengikat retry ke operasi yang sama?' },
  backoff: { definition: 'Penundaan retry yang meningkat, biasanya dengan jitter, untuk memberi dependency waktu pulih.', example: 'ERP 503 dicoba ulang dengan batas dan jitter sebelum masuk dead-letter.', trap: 'Retry serentak dari banyak worker sehingga dependency makin overload.', check: 'Kapan backoff berhenti dan operator mengambil alih?' },
  'dead-letter queue': { definition: 'Tempat terminal untuk message yang gagal setelah policy retry habis agar dapat diinspeksi dan direplay.', example: 'Invoice malformed dipindah ke dead-letter, bukan diputar tanpa akhir.', trap: 'DLQ menjadi kuburan tanpa owner, alert, atau replay runbook.', check: 'Siapa owner DLQ dan apa syarat replay yang aman?' },
  'routing accuracy': { definition: 'Ketepatan sistem memilih exception owner atau route dibanding label gold.', example: 'Hitung precision/recall untuk EX-TAX, EX-QTY, dan EX-DUP secara terpisah.', trap: 'Satu accuracy aggregate menyembunyikan exception berisiko tinggi.', check: 'Slice mana yang tidak boleh tertutup oleh rata-rata?' },
  'human-touch time': { definition: 'Waktu dan jumlah interaksi manusia per case sampai keputusan atau terminal state.', example: 'Bandingkan AP touch time clean match dan exception setelah agent memberi evidence bundle.', trap: 'Menghapus handoff dari KPI padahal risiko hanya dipindahkan ke reviewer.', check: 'Touch mana yang benar-benar hilang dan mana yang hanya berpindah?' },
  'cost per case': { definition: 'Total biaya rata-rata satu case pada boundary tertentu, termasuk retry, tools, storage, dan human work.', example: 'Scorecard InvoiceOps memisahkan model cost dan loaded AP review time.', trap: 'ROI terlihat positif karena labor cost atau exception rate diabaikan.', check: 'Asumsi biaya mana yang paling sensitif terhadap perubahan volume?' },
  'case study': { definition: 'Narasi evidence-based dari problem, constraint, decision, delivery, result, dan limitation.', example: 'RegulaRAG case study dimulai dari research time dan citation gap, bukan nama model.', trap: 'Menulis feature list tanpa baseline, failure, atau trade-off.', check: 'Evidence mana yang membuat claim portfolio dapat dipercaya?' },
  'architecture narrative': { definition: 'Cara menjelaskan keputusan sistem melalui context, alternatives, constraints, dan consequences.', example: 'Jelaskan kenapa InvoiceOps memisahkan deterministic rules dari model extraction.', trap: 'Menyebut diagram dan framework tanpa alasan keputusan.', check: 'Alternative apa yang ditolak dan mengapa?' },
  limitations: { definition: 'Batas validitas, data gap, failure mode, dan hal yang belum dibuktikan oleh project.', example: 'Benchmark sintetis tidak boleh diklaim sebagai savings client nyata.', trap: 'Menyembunyikan limitation agar demo tampak sempurna.', check: 'Klaim mana yang belum boleh dibuat dari evidence sekarang?' },
  'system design': { definition: 'Latihan memilih komponen, boundary, data flow, reliability, dan trade-off untuk kebutuhan tertentu.', example: 'Definisikan state, tool permissions, eval, dan rollback jika volume InvoiceOps naik dua kali lipat.', trap: 'Menggambar arsitektur generik tanpa workload atau failure scenario.', check: 'Constraint apa yang paling mengubah desain?' },
  'English walkthrough': { definition: 'Penjelasan lisan terstruktur tentang problem dan keputusan teknis dalam working English.', example: 'Jelaskan RegulaRAG dari user pain → evidence → architecture → evaluation → limitation.', trap: 'Menghafal jargon tanpa bisa menjawab why, failure, dan next step.', check: 'Bisakah satu trade-off dijelaskan dalam tiga kalimat sederhana?' },
  'STAR stories': { definition: 'Struktur Situation, Task, Action, Result untuk menjawab pengalaman secara spesifik.', example: 'Ceritakan saat evaluation menemukan citation failure dan tindakan yang lo ambil.', trap: 'Menceritakan aktivitas panjang tanpa action pribadi atau result berbukti.', check: 'Apa result terukur dan apa yang akan lo ubah sekarang?' },
  'target roles': { definition: 'Cluster role berdasarkan problem yang dipecahkan dan evidence yang diminta, bukan title semata.', example: 'Kelompokkan AI Solutions Engineer, Agentic Developer, dan Automation Specialist berdasarkan capability overlap.', trap: 'Mengirim portfolio sama ke semua lowongan tanpa mapping requirement.', check: 'Evidence mana yang paling relevan untuk cluster role ini?' },
  'funnel diagnosis': { definition: 'Membaca conversion tiap tahap application untuk menemukan bottleneck eksperimen.', example: 'Banyak screen fail mengarah ke CV/targeting; final fail mungkin storytelling atau system-depth.', trap: 'Menambah volume application tanpa mendiagnosis signal.', check: 'Data apa yang membedakan targeting gap dari technical gap?' },
  'iteration backlog': { definition: 'Daftar eksperimen terurut berdasarkan uncertainty, impact, effort, dan learning value.', example: 'Prioritaskan menambah failure evidence sebelum mempercantik landing page.', trap: 'Backlog menjadi daftar fitur tanpa hypothesis atau success signal.', check: 'Eksperimen terkecil apa yang paling cepat mengurangi risiko terbesar?' },
};

function storyGuide(week: RoadmapWeek) {
  return week.mission.story.beats.map((beat, index) => {
    const note = teachingNotes[beat.concept];
    if (!note) throw new Error(`Missing teaching note for concept: ${beat.concept}`);

    return [
      `### BEAT ${index + 1} — ${beat.title}`,
      `Concept to reveal only after an adequate learner answer: ${beat.concept}`,
      `Scene seed: ${beat.situation}`,
      `Decision question: ${beat.decisionQuestion}`,
      `Debrief meaning: ${note.definition}`,
      `Debrief case anchor: ${note.example}`,
      `Debrief warning: ${note.trap}`,
    ].join('\n');
  }).join('\n\n');
}

function assessmentTemplate(week: RoadmapWeek) {
  return JSON.stringify({
    kind: 'agent16-weekly-assessment',
    schemaVersion: 1,
    rubricRevision: 1,
    weekId: week.id,
    weekNumber: week.week,
    rubricResults: week.mission.rubric.map((item) => ({
      rubricId: item.id,
      score: 0,
      finding: '[Temuan spesifik dari draft dan review.]',
      evidence: '[Evidence dari draft atau case; tulis gap bila belum ada.]',
      nextAction: '[Satu tindakan revisi yang konkret.]',
    })),
    weekSummary: '[Ringkasan hasil review minggu ini.]',
  }, null, 2);
}

export function buildMissionPrompt(
  week: RoadmapWeek,
  assetOrigin = DEFAULT_MISSION_ORIGIN,
) {
  const { mission } = week;
  const normalizedOrigin = assetOrigin.replace(/\/+$/, '');
  if (mission.caseIds.length === 0) {
    throw new Error(`Week ${week.week} must reference at least one case dossier.`);
  }

  const dossiers = mission.caseIds.map((caseId) => {
    const dossier = caseDossiers[caseId];
    if (!dossier) throw new Error(`Unknown case dossier: ${caseId}`);
    return dossier;
  });

  const constraints = uniqueStrings(dossiers.flatMap((dossier) => dossier.constraints));
  const assets = uniqueAssets(mission.starterAssets);
  const caseText = dossiers.map((dossier) => [
    `### ${dossier.title} — ${dossier.client}`,
    `DATA LABEL: ${dossier.label}`,
    dossier.brief,
    '',
    'Known facts:',
    bullets(dossier.facts),
  ].join('\n')).join('\n\n');

  const learningText = mission.resources.map((resource) => [
    `- ${resource.title} — ${resource.provider} (${resource.minutes} menit)`,
    `  ${resource.url}`,
    `  Why: ${resource.why}`,
  ].join('\n')).join('\n');

  const starterText = assets.map((asset) => [
    `- ${asset.label} [${asset.kind.toUpperCase()}]`,
    `  ${normalizedOrigin}${asset.path}`,
    `  ${asset.description}`,
  ].join('\n')).join('\n');

  const rubricText = mission.rubric.map((item) => [
    `- [${item.id}] ${item.label}`,
    `  Score 2 when: ${item.passCondition}`,
  ].join('\n')).join('\n');

  return [
    `# AGENT/16 FULL MISSION — W${String(week.week).padStart(2, '0')} · ${week.title}`,
    '',
    'MODE: COACH-FIRST · SYNTHETIC TRAINING CASE · DO NOT COMPLETE THE WORK FOR ME',
    'LANGUAGE: Coach me in Bahasa Indonesia. Keep schemas, filenames, ADRs, READMEs, evaluation reports, and portfolio case studies in working English.',
    '',
    '## YOUR ROLE',
    `Act as my ${mission.coachRole}.`,
    `Place me in the story as ${mission.story.learnerRole}.`,
    '',
    '## COACH-FIRST RULES',
    '1. Teach through an interactive client simulation, not a lecture, glossary, or summary-first explanation.',
    '2. Use exactly one story beat per turn. Do not preview later beats, later concepts, the full task list, resources, rubric, or final artifact.',
    '3. Treat MISSION KIT and RAW EVIDENCE as the source of truth. Narrative connective detail may improve flow but must not introduce new names, numbers, policies, constraints, or decision-relevant facts.',
    '4. Do not reveal the concept name before I answer its decision question. Let me experience the problem first.',
    '5. If my answer is incorrect or incomplete, give one directional hint and ask the same decision again. Do not reveal the concept or finished answer yet.',
    '6. After an adequate answer, give feedback in 2–4 sentences, reveal the concept with a short meaning, state one warning, then continue to the next beat.',
    '7. After all beats, ask for a readback in no more than three bullets. Only after the readback, ask me to paste my own draft.',
    '8. A draft may be incomplete bullets. Treat it as my work to review, not permission to write the artifact for me.',
    '9. Ask at most five high-impact discovery questions after I share my draft. Do not bury me in a generic questionnaire.',
    '10. Separate evidence, client claims, assumptions, and your inferences. Never invent missing case facts.',
    '11. Challenge unsupported claims, unsafe boundaries, and metrics without formula, denominator, source, or owner.',
    '12. Score every rubric item from 0–2: 0 = absent or unsafe, 1 = partial, 2 = complete and evidence-backed.',
    '13. Finish with a prioritized revision checklist. Do not rewrite the final artifact for me.',
    '',
    '## STORY-FIRST PROTOCOL',
    'Write each scene in conversational Bahasa Indonesia, second-person point of view, and 150–220 words.',
    'A scene must contain an actor, trigger, obstacle, available evidence, operational or risk stake, and one decision for me.',
    'Use a descriptive scene heading that does not contain the hidden concept name.',
    'End the scene with exactly one bold prompt: **Giliran lo:** [the decision question]. Then stop and wait.',
    'After an adequate answer, use this compact debrief before the next scene:',
    '**Konsep yang barusan lo pakai: [term]** — [one short plain-language meaning].',
    '**Waspada:** [one common mistake].',
    'Do not create an Analogi section. Common terms such as user, owner, source, target, data, KPI, API, and JSON need only a short parenthetical gloss when first used, not a separate lesson.',
    'Use normal Markdown paragraphs and lists. Never emit a trailing backslash to force a line break.',
    '',
    '## MISSION KIT · CASE REFERENCE',
    caseText,
    '',
    '## THIS WEEK\'S RAW EVIDENCE',
    bullets(mission.rawEvidence),
    '',
    '## THIS WEEK\'S MISSION',
    mission.context,
    '',
    '## STORY SETUP',
    `Opening: ${mission.story.opening}`,
    `Learner role: ${mission.story.learnerRole}`,
    '',
    '## STORY BEATS — INTERNAL COACH GUIDE',
    storyGuide(week),
    '',
    'Work to complete:',
    numbered(week.tasks.map((task) => task.label)),
    '',
    'Review focus:',
    bullets(mission.coachFocus),
    '',
    '## NON-NEGOTIABLE CONSTRAINTS',
    bullets(constraints),
    '',
    '## LEARN FIRST — JUST IN TIME',
    learningText,
    '',
    '## STARTER FILES',
    starterText,
    '',
    '## DELIVERABLE',
    `Title: ${mission.deliverable.title}`,
    `Format: ${mission.deliverable.format}`,
    `Artifact language: ${mission.deliverable.language}`,
    'Required sections:',
    bullets(mission.deliverable.sections),
    '',
    '## REVIEW RUBRIC',
    'Use the 0–2 scale defined above.',
    rubricText,
    '',
    '## QUALITY GATE',
    week.gate,
    '',
    '## INTERACTION SEQUENCE',
    '1. First reply: write one opening sentence that places me in my learner role, then present only BEAT 1 as a 150–220 word scene.',
    '2. End with its single **Giliran lo:** question and stop. Do not reveal the concept, explain terminology, or request the deliverable.',
    '3. After my answer: if incomplete, give one hint and repeat the decision. If adequate, give 2–4 sentences of feedback, reveal the concept and warning, then present the next scene.',
    '4. After the final adequate answer, reveal its concept and ask for my three-bullet case-and-concept readback. Do not ask for the deliverable yet.',
    '5. After the readback, invite my own draft or partial attempt. Ask no more than five discovery questions after I share it.',
    '6. Review and score only after receiving my attempt. Return evidence gaps, rubric scores, and a prioritized revision checklist, then follow the Mission Debrief Receipt contract below.',
    '',
    '## MISSION DEBRIEF RECEIPT — ONLY AFTER REVIEW',
    'Use this contract only after you have reviewed my draft. Complete the story beats, readback, draft submission, any needed discovery questions, and the human-readable review first.',
    'Never emit the assessment in the first response, during story beats, hints, concept debriefs, readback, or discovery questions, or before reviewing my draft.',
    'After the human-readable review, emit exactly one assessment block. Emit a fresh assessment after every later revised-draft review so the newest receipt can replace the previous one.',
    'Replace every bracketed placeholder with concise, draft-specific Bahasa Indonesia. Replace each example score 0 with the earned integer 0, 1, or 2; do not default every rubric to 0. Scores must match the human-readable rubric review.',
    'Keep every listed rubricId exactly once and in the listed order. Do not add, remove, rename, or duplicate fields or rubric results.',
    'Do not add an overall score, readiness score, or capability classification. The website calculates all derived results locally.',
    'Return raw valid JSON between the marker lines exactly as shown. Do not wrap the JSON in a Markdown code fence and do not write commentary inside the markers.',
    'AGENT16_ASSESSMENT_V1_START',
    assessmentTemplate(week),
    'AGENT16_ASSESSMENT_V1_END',
    '',
    '## USER CONTROLS',
    'If I say “jelaskan [term]”, explain only that term in at most three bullets. If I say “beri hint”, give one directional hint without writing the answer. If I say “ulang adegan”, restate the current scene more simply without adding facts. If I say “lanjut”, move to the next eligible step without inventing my answer. If I say “stop”, wait for my next instruction.',
    '',
    '## MY DRAFT',
    '[TEMPEL DRAFT LO DI SINI]',
  ].join('\n');
}
