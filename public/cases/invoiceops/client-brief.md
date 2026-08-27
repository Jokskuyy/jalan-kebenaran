# InvoiceOps Agent — Synthetic Client Brief

> Training data only. PT Sembada Distribusi Indonesia and every invoice, vendor, purchase order, receipt, person, and metric in this pack are fictional. Do not treat the material as financial advice or production data.

## Request from the sponsor

Finance Operations wants to reduce the manual effort required to reconcile supplier invoices against purchase orders (POs) and goods receipts in a mock ERP. The sponsor initially calls the request an “AI invoice agent.” Your job is to define a safe operational system before choosing how much agency it needs.

## Known operating context

- Six accounts-payable (AP) staff process approximately 2,400 invoices per month from 85 vendors.
- A normal case takes 8–12 minutes. An exception commonly takes 25–50 minutes.
- Inputs arrive through a shared inbox and a webhook; duplicate delivery is possible.
- Frequent exceptions include duplicate upload, missing PO, quantity mismatch, tax mismatch, poor scan quality, and vendor master mismatch.
- Current coordination is split across email, spreadsheets, and a mock ERP.
- The Finance Controller is the only role allowed to approve a payment-ready case.

## Non-negotiable controls

- Totals, tax, tolerances, and matching rules must be deterministic code—not model arithmetic.
- The system may read records and propose a route. It may not approve or execute payment.
- Every write requires a valid approval token and idempotency key.
- Low-confidence extraction must enter a human review queue.
- Every state change must create an immutable audit event.

## Desired evidence

The sponsor needs a measurable baseline, an exception taxonomy with owners, typed tool contracts, a resumable approval workflow, failure-injection evidence, and an operating scorecard. A persuasive demo without those controls does not satisfy the request.

## Out of scope

- Connecting to a real ERP, bank, vendor inbox, or payment rail.
- Processing personally identifiable or confidential financial data.
- Replacing AP analysts, tax specialists, or the Finance Controller.
- Claiming real client savings from synthetic evaluation results.
