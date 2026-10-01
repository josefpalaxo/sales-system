# Investor information governance

## Authority

The master is the central investor knowledge layer. Detailed master records own facts; the executive master indexes them. Upstream sales-system commercial records remain authoritative for their own scopes and are referenced by stable ID, not copied as a competing rulebook.

A reusable factual assertion needs an attributable source, reporting/effective date, defined scope, current review, accountable approval and no unresolved material contradiction affecting the assertion. All initial master records are drafts pending owner assignment. Suggested reviewers in the open-questions register are not appointed owners.

Document status (`draft`, `reviewed`, `approved`, `deprecated`) is separate from evidence state and the labels below. Approved forecasts remain forecasts. Classification (`public`, `internal`, `confidential`, `restricted`) is separate from approval for external sharing.

## Source precedence

1. Current authoritative management data, financial reports, signed agreements and internal strategy, within their actual scope.
2. Reconciled, accepted current master records with traceable Tier 1 or other suitable evidence.
3. Current supporting internal material, preserving its source approval/evidence state.
4. Verified external evidence such as filings, official company/government sources and credible research.
5. Historical decks, teasers and briefs, for context.

Tier ranking does not erase contradictions or make a source authoritative outside its scope. Newer data does not silently replace another reporting period. Current approved typed sales records take precedence over their archived commercial source snapshots. If upstream evidence cannot be accessed or has expired, record that limitation and withhold unqualified reuse.

## Claim labels

| Label | Meaning |
| --- | --- |
| CONFIRMED | Direct evidence checked for the stated scope and date, with accountable approval recorded |
| MANAGEMENT ESTIMATE | Attributed management estimate; not an audited actual |
| FORECAST | Forward-looking management expectation |
| SCENARIO | Conditional calculation with explicit assumptions |
| PIPELINE | Identified opportunity supported by a dated commercial qualification record |
| ROADMAP | Planned capability; not a production claim |
| VISION | Long-term strategic direction; not a delivery commitment |
| HISTORICAL | Prior-period/contextual information, not a current value |
| NEEDS VERIFICATION | Missing, unapproved, stale or insufficiently supported assertion |

Preserve evidence states such as reported, inferred, hypothesis, unknown or contradicted alongside these labels where applicable. Confidence does not upgrade evidence. A confirmed contractual amount is still contracted, not automatically recognized revenue.

Financial/opportunity categories are explicit: actual/existing revenue, contracted, qualified pipeline, identified opportunity, management forecast, scenario, speculative strategic upside. Never aggregate different categories into a single revenue or ARR claim. Record currency, period, ARR definition, recurring/non-recurring treatment and overlaps before comparing values.

## Updates, conflicts and dependencies

Update the smallest master record. Record source ID and locator, effective/reporting date, received date, reviewer, approval evidence and review deadline. Increment revision for semantic changes; retain historical periods and explain restatements. Add changed upstream revisions to the deliverable dependency note and mark affected materials for review.

Log competing claims in [data quality and open questions](master/data-quality-and-open-questions.md), including sources, periods, definitions, owner and disposition. Do not resolve them without an attributable decision. Expired material requires review before unqualified reuse.

## Handling and publication

This initial repository is confidential internal working material. References to named deployments in the setup brief are verification targets, not permission to use logos, customer names or quantified proof.

Do not commit credentials, personal contact data, raw CRM exports, raw correspondence or customer dumps. Each source/workspace has a `local/` directory convention, ignored by Git, for necessary local material; prefer the approved business system. Redacted summaries and evidence locators may be versioned. A private Git repository is not itself permission to copy personal or contractual information.

External sharing requires human approval for the exact deliverable and audience. Keep one stable file per durable deliverable, with provenance and approval state. Archive superseded evidence without deleting its history.
