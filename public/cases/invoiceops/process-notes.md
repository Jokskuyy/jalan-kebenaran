# InvoiceOps Agent — Synthetic Process Notes

> Training data only. Names, companies, systems, and figures are fictional.

## AP analyst interview

- Invoices arrive through `ap-inbox@example.invalid` and a mock webhook.
- The analyst searches for the vendor, PO, and goods receipt, then retypes invoice fields into a spreadsheet.
- “Same invoice number” is not enough for duplicate detection because some vendors reset numbering each year.
- A clean three-way match can be prepared in roughly 8–12 minutes.
- A missing receipt, unreadable line, or mismatched tax code can take 25–50 minutes and several emails.
- Analysts currently use personal notes to decide who owns an exception.

## Finance Controller interview

- The Controller approves or rejects a payment-ready recommendation; the system must never make that decision.
- An approval becomes stale if invoice content, PO data, receipt data, or the recommended route changes.
- The Controller wants the evidence snapshot, rule results, exception category, and actor history on one screen.
- Replayed webhooks must not create a second case or a second ERP write.

## IT integration notes

- The mock ERP exposes read endpoints for vendor, PO, and receipt records.
- A separate write endpoint can attach an approved reconciliation result to an invoice case.
- Dependency calls can time out after the downstream system has already accepted the write.
- Webhooks use at-least-once delivery; event order is not guaranteed.
- Authentication, authorization, timeout, retry, error mapping, and audit logging belong at explicit boundaries.

## Observed as-is flow

1. Receive invoice through email or webhook.
2. Check whether it might be a duplicate.
3. Extract header and line-item fields manually.
4. Find vendor, PO, and goods receipt in the mock ERP.
5. Recalculate totals and compare quantities, prices, tax, and currency.
6. If clean, prepare a payment-ready recommendation for the Controller.
7. If not clean, email an owner and track the exception in a spreadsheet.
8. After approval, attach the reconciliation result to the mock ERP case.

## Open questions

- What combination of vendor, invoice number, date, currency, and amount defines a duplicate?
- Which tolerance rules vary by vendor, currency, or business unit?
- How long may a case wait before an approval token expires?
- Who owns each exception, and what is its terminal state?
- Which events are required for audit and operational metrics?
