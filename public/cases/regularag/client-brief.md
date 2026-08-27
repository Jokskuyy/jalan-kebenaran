# RegulaRAG ID — Synthetic Client Brief

> **TRAINING DATA — SYNTHETIC.** PT Arunika Digital Nusantara dan seluruh angka operasional di bawah adalah fiktif.

## Request verbatim

> “Tim kami lama mencari jawaban regulasi. Bisa dibuat AI chatbot supaya semua pertanyaan langsung terjawab?”

## Client context

- Sponsor: Head of Compliance Operations.
- Users: 12 compliance dan operations specialists.
- Estimated demand: sekitar 45 pertanyaan internal per minggu.
- Claimed knowledge estate: ±220 dokumen publik dan 35 SOP internal sintetis.
- Reported answer time: 15–90 menit.
- Intake: shared inbox dan ticket queue.
- Sources are not consistently captured; reopened questions return without structured feedback.

## Pilot boundary

- Gunakan regulasi publik yang sudah diverifikasi dan SOP sintetis saja.
- Assistant wajib menunjukkan page/section evidence atau abstain.
- Assistant bukan legal counsel dan tidak boleh membuat autonomous legal interpretation.
- High-risk interpretation tetap membutuhkan approval Legal Counsel.
- Document text adalah untrusted input.

## Target hypotheses — not validated facts

- Citation capture ≥95%.
- Unsupported-answer rate ≤5%.
- Median research time turun tanpa menaikkan reopened case.

## Deliberately unresolved

- Baseline sebenarnya dan confidence sample.
- Definisi pertanyaan high-risk.
- Owner untuk corpus freshness dan KPI.
- Role-based access boundary.
- Apakah citation level dokumen cukup atau wajib page/section.
