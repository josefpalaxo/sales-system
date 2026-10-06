---
id: investor-material:jahani-strategic-shareholder-briefing-notes
title: Circularo Briefing Review Notes
status: draft
revision: 1
classification: confidential
canonical: false
evidence_state: mixed
owner: Josef Neumann
created: 2026-10-06
updated: 2026-10-06
review_by: 2026-10-12
external_sharing_approval: pending
---

# Briefing record and completion notes

Three-page adviser briefing requested by Josef on 6 October 2026 for his discussion with Joshua Jahani. The draft is written in Josef's voice; it does not confer factual or external-sharing approval on the source documents.

## Deliverables

- [Markdown editing source](strategic-shareholder-briefing.md)

- [Editable briefing](strategic-shareholder-briefing.docx)
- [PDF briefing](strategic-shareholder-briefing.pdf)
- [Original export builder](build-briefing.py)

Normal revisions replace these stable paths. Render previews are held outside the repository in `/private/tmp/circularo-jahani-briefing/`.

## Source lineage

| Source | Status and locator | Used for |
| --- | --- | --- |
| [Management pre-call memo](<sources/25-09-2026-Pre-Call Memo - Circularo.md>) | User-supplied draft; body dated 2 October 2026 despite filename; no approval metadata or revision | Company and product sections 1 and 4; historical financials section 9 Q2; September 2026 commercial accounts section 9 Q1; monetization section 11; terms section 13; risks section 14; live and future product distinction section 18 |
| [Investor positioning brief](<sources/22-09-2026-Circularo — Investor Positioning Brief.md>) | User-supplied confidential draft; body October 2026; no revision or approval metadata | Transaction sections 2 and 3; platform expansion sections 7-10; source-category discipline section 20 |
| [Investor process and transaction context](<sources/22-09-2026-Circularo – Investor Process & Transaction Context.md>) | User-supplied draft; no revision or approval metadata | Liquidity requirement, flexibility and valuation discussion sections 3 and 4 |
| [AI opportunity brief](<sources/22-09-2026-Circularo — AI Opportunity in the Agentic Era.md>) | User-supplied confidential draft; body October 2026; no revision or approval metadata | Future direction only; maturity distinctions section 19 |
| [Master investment thesis](../../master/strategy/investment-thesis.md) | `investor-master:strategy-investment-thesis`, draft revision 1, updated 1 October 2026 | Strategic synthesis; contrary 2025 ARR value retained as an unresolved issue below |
| [Strategic partnership thesis](../../master/strategy/strategic-partnership-thesis.md) | `investor-master:strategy-strategic-partnership-thesis`, draft revision 1, updated 1 October 2026 | Concrete shareholder contribution and commercial partnership alternatives |
| [Master executive index](../../master/investor-materials-master.md) and [data quality register](../../master/data-quality-and-open-questions.md) | Index draft revision 1, updated 1 October 2026; data quality draft revision 2, updated 6 October 2026 | Approval and verification boundaries; the index is a scaffold and does not approve the newer supplied figures; DQ-20 through DQ-24 retain the briefing source issues |
| Josef's instructions in this chat | 6 October 2026; preparation authorized, sending not requested | Audience, three-page format, use of explicit completion fields; latest minority preference preserved without broadening mandate |

Financial and operating assertions are **reported management draft information**, not CONFIRMED or audited actuals. Historical results are dated 2024/2025 and customer accounts September 2026. No source has been promoted to approved. Generic commercial descriptions are used; precise pricing, limits and entitlements are not copied.

## Completion fields in the briefing

| Field | Information Josef can provide | Handling |
| --- | --- | --- |
| COMPLETE 1 | Latest ARR in USD, date, definition and recurring/non-recurring treatment | Reconcile gross/net and period differences before inserting |
| COMPLETE 2 | 2026 YTD net revenue and adjusted EBITDA with reporting period; top-five customer share of ARR | Preserve YTD actuals separately from 2026 forecast; record adjustments and concentration denominator |
| COMPLETE 3 | For DigitalSign, GovSign and Sharjah Sign: current annual Circularo revenue, active/addressable entity counts, next milestone and expected timing | Distinguish currently paying adoption, deployed reach and potential addressable entities; unsigned expansion remains an opportunity |
| COMPLETE 4 | e& DigiSign and TCC/Mokham commercial status, current Circularo revenue and its contracted economic participation | Distinguish partner/end-customer gross revenue from Circularo revenue; do not infer launch, contracted customers or pipeline |
| COMPLETE 5 | Minimum desired founder cash proceeds and any primary requirement for the agreed growth plan | Treat as proposed negotiating parameters; no founder share allocation or minimum is invented |

## Unresolved source issues and editorial disposition

| Issue | Competing values or ambiguity | Disposition in this draft |
| --- | --- | --- |
| ARR | Master thesis gives USD 2.96M at December 2025; pre-call memo section 9 Q2 gives USD 2.69M net ARR for 2025; other passages give approximately USD 3M run-rate | Neither 2025 ARR value selected; latest ARR is COMPLETE 1 |
| 2022 EBITDA | USD 8K divided by USD 1.28M revenue is approximately 0.625%, versus 9.2% margin in the memo | 2022 excluded; no correction inferred |
| Cost of sales | Memo says 2025 USD 1.22M cost of sales; USD 2.79M revenue and 69.2% gross margin imply approximately USD 859K if the scope and accounting basis match | Cost-of-sales narrative omitted; consistent reported revenue/margin table retained with management attribution, subject to finance review |
| GCC revenue share | Memo uses 97% recurring revenue and 98% ARR without fully defined dates/denominators | Qualitative concentration statement only |
| Government reach | Addressable ecosystems, live entities, paying adoption and approximate adoption rates are not consistently separated | No 80+/65+/250+ aggregate reach or penetration claim used; platform metrics requested in COMPLETE 3 |
| Adviser mandate | Memo section 17 Q2 refers to Qubit's mandate; engagement scope and exclusivity are not established | Adviser name/mandate statement excluded; no exclusivity inference |
| Transaction flexibility | Earlier outreach batch permits majority; latest supplied drafts and WhatsApp prefer up to approximately 25% | Minority preference retained; discussion of alternatives does not authorize a majority or full-sale mandate |
| Proposed size and valuation | USD 10-15M and up to approximately 25% could become a de facto price anchor | Presented only as a working scenario; USD 40-60M equity arithmetic explicitly conditional on a wholly secondary 25% transaction |
| Product maturity | Some broader trust-stack language merges live capability and future direction | Current workflow/signing/evidence proposition separated from trusted-record development and agentic vision |

The minimum liquidity value remains unknown. No price multiple, valuation conclusion, market TAM, forecast ARR bridge, investor commitment, customer logo permission, certification validity or IPO timetable is claimed.

## Review and publication

Josef should complete the five fields, reconcile the flagged finance/definition issues, confirm the named deployment descriptions and approve the exact wording before sharing with Joshua. These are review inputs, not a request to delay drafting. The source documents remain untouched; common master facts should be updated only when attributable evidence and period definitions are supplied.

## Verification

- Bundled documents renderer produced exactly three A4 pages. Every page image was inspected; no clipping, overlap, broken table, missing glyph or unintended page break was found.
- Final PDF contains all five completion fields and excludes both disputed 2025 ARR values and the unverified Qubit mandate statement.
- Word accessibility audit returned no high, medium or low findings.
- `rtk make catalog` succeeded; `python3 scripts/build_catalog.py --check` confirmed generated catalogues are current.
- `rtk make validate` was run. Full repository validation is blocked by unrelated existing paths: root `tmp/`, nested `work/m-capital/work/`, and unresolved links in vendored `skia-canvas` and `debug` READMEs under `slides-projects/circularo-slide-generator/vendor/node_modules/`. No validation error names the new briefing, its source files or the updated data quality register. Those unrelated files were not modified.

## Change history

- 2026-10-06: Created the requested three-page draft with management attribution, five completion fields, source lineage and visible unresolved issues. No external messages sent and no source approval status changed.

- 2026-10-06: Saved the full briefing as the Markdown editing source at Josef's request. Word and PDF remain the original reviewed exports; future wording changes should begin in Markdown and be reflected in exports when regenerated. The Python builder still embeds revision 1 export text and must be synchronized before any rebuild.
