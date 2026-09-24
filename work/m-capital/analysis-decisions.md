# M-Capital investor analysis — decisions and working notes

Status: internal working material; not a governed or approved investor publication.
Decision date: 2026-09-24.
Source of agreed scope: Josef's instructions in this task.

## Confirmed scope

1. Use all available subscription/sales-order history. First contract dates may reach 2016; verify the actual coverage. Preserve this history to measure existing-customer tenure.
2. Invoice history is reported by Josef to begin on 2019-01-01. Validate observed coverage separately; do not use invoice history to truncate contract tenure.
3. Include only Circularo International Ltd (`company_id=2`, parent company per Josef), Circularo Europe s.r.o. (`company_id=3`, current Europe), and Circularo Mena - FZE (`company_id=5`). Report consolidated USD figures with entity breakdowns available. Josef explicitly excluded historical company 4 (`NEPOUZIVAT Circularo Europe s.r.o.`) and company 8 (`CIRCULARO DIGITAL INFORMATION TECHNOLOGY L.L.C`) after reviewing the discovered entities. Other entities are also outside scope. Historical links outside these three entities can be flagged as lineage questions, but their transactions must not enter the totals.
4. Exclude intercompany transactions. The commercial population is external end customers.
5. Analyse ARR/MRR and invoiced revenue. Accounting-recognized revenue and cash collections are outside the requested initial scope.
6. Always attribute customer reporting to the end customer and preserve direct versus indirect sales analysis. Keep reseller/distributor and billing-party identities separately for traceability.
7. Deliver the eventual analysis in Excel. This preparation stage records decisions and validates semantics before producing investor metrics.
8. Create all task files exclusively in `/Users/josefneumann/Projects/ai-workspace/sales-system/work/m-capital`.
9. Explicitly exclude `raw_odoo.sale_order_log` and any metrics derived from it. Josef states this data cannot be used. An initial discovery check preceded this instruction; its results are not evidence for this analysis. Do not query or use this source further.
10. Headline ARR/MRR must represent Circularo's net contractual recurring revenue. End-customer recurring contract value is a separately labelled secondary measure. Josef confirmed this explicitly after reviewing the investor brief.
11. `/Users/josefneumann/Downloads/Active-all.xlsx` and `/Users/josefneumann/Downloads/Churned-all.xlsx` are sample exports, not authoritative historical subscription snapshots. Inspection found aggregate year-grouped ARR/count tables with no customer/order IDs. Treat them as reconciliation references only, with unknown export filters and business as-of dates.
12. Prepare a detailed execution plan for review. Execution of the investor analysis and workbook build is pending Josef's confirmation of `execution-plan.md`.
13. Prepare a separate reusable Codex brief explaining how to read the Odoo data and custom fields, for Josef to review and confirm. Follow the supplied `Odoo BI Foundation Review & MRR_KPI Layer Design (1).pdf`. The brief is a draft under work/m-capital, not an installed skill or approved shared record.
14. Store a faithful Markdown transcription of that PDF within work/m-capital as source reference, not approved policy. Preserve its original claims and unresolved questions separately from our interpretation; leave the original PDF unchanged.
15. Extend the execution plan/model to incorporate forecast and pipeline for both existing and new customers, especially key-account growth. Historical actuals remain the foundation; signed commitments, open pipeline, and modeled assumptions must be separate.
16. Include a dedicated existing-customer growth-potential analysis grounded in observed historical expansion/retention, with customer-value/CLV framing. Forward potential is not an actual or guaranteed result. The forecast horizon, scenarios and finite-horizon revenue-value methods are for review, not user-confirmed numeric assumptions; yearly frequency is now confirmed below.
17. CLV must be revenue-based, as clarified by Josef; remove the optional profit-based extension from this scope. Use Circularo's net customer revenue, keeping observed history and forward scenarios distinct and reconciling advance-billing/basis differences before combining them. A finite forecast horizon is not an established complete customer lifetime.
18. All monetary analysis, forecasts, pipeline, end-customer value, and revenue-based CLV exclude VAT and other sales taxes. Credit notes reduce revenue; net contractual consideration also reflects applicable channel discounts, not costs/profit margins.
19. Prepare a limited Excel sample/test run to review fields, grains, actual-data layout, and practical forecast inputs. This authorizes the prototype, not the full investor analysis. Clearly distinguish sampled actual records from illustrative forecast cases.
20. **Ownership/channel correction from Josef:** CIRCULARO DIGITAL INFORMATION TECHNOLOGY L.L.C is an external reseller, not part of the group. Sales issued by companies 2/3/5 and billed to its partner record 231 remain eligible external indirect sales, attributed to their end customers. Its Odoo company record 8 remains excluded as an issuing company under the agreed scope. Do not infer intercompany status from presence in res_company, a name containing Circularo, or a computed distributor field. The earlier preparation-stage suggestion that bills to 231 were intercompany is withdrawn.

21. **Yearly forecast:** Josef requested annual, not monthly, forecast inputs and outputs. Keep monthly historical detail where needed for historical MRR/retention. Separate closing net ARR from timing-weighted in-year revenue. Final year convention, reporting cutoff and horizon remain open; 2027–2029 calendar years in the revised prototype are illustrative only.
22. **Recurring Plan:** add Odoo Recurring Plan to Customers, separately from raw/reporting Edition. Use the selected contract's plan in the limited sample. In the full model show distinct active plan names at the cutoff and retain exact contract-plan mappings; never choose an arbitrary plan or duplicate customer amounts.
23. **Structure revision approved:** Josef's “do that” approves the TASK.md amendments and annual layout-sample update described in the review. TASK.md owns boundaries/model contracts; execution-plan.md owns phases/deliverables; this file owns decisions. Keep existing outputs/ and evidence paths, add scripts/ and staged SQL folders only as needed, and do not create duplicate PROJECT.md. Freeze inputs/assumptions/FX/model versions with final actuals and retain issued-workbook dependencies. Full investor analysis and external publication remain unstarted/pending their approval gates.

24. **Execution authorized (2026-09-25):** Josef approved implementing execution-plan.md. Proceed through the scoped analysis and Excel delivery. This supersedes earlier preparation-only gates, not source/coverage review, entity restrictions, excluded-source rules or publication restrictions. Source and production data remain read-only; project sandbox work follows TASK.md.

## Working methodology

- Read existing Odoo knowledge and analytical SQL as evidence; check the live schemas, field metadata, selection values, and implemented views before reusing them.
- Keep the grains of customer, contract, order line, invoice, and invoice line explicit. Avoid duplicate revenue when traversing many-to-many sale-line/invoice-line relationships.
- Distinguish a customer's earliest known relationship date from uninterrupted retention and from their current contract's start date.
- Separate current recurring run-rate from historical recurring revenue. Current subscription status alone does not reconstruct a historical portfolio.
- Assess tenure through contract dates and `origin_order_id` / `subscription_id` renewal relationships. Following the supplied PDF, use posted recurring invoice lines allocated over service periods for historical MRR/retention, with invoice-date FX fixed across contributions. Contract context must not replace the historical financial source. Do not publish historical KPIs where invoice/service coverage is insufficient.
- Keep headline net contractual ARR/MRR distinct from invoice-backed historical MRR and its annualized equivalent. This interpretation reconciles the user's headline instruction with the PDF and is documented for review, not represented as an already-approved implementation.
- Proposed invoiced revenue basis from existing metric documentation: posted customer invoices less credit notes, excluding tax. Verify signs and posting scope in the live views.
- Preserve original currencies and FX lineage alongside USD values. Reconcile custom source ARR against calculated MRR rather than assuming the two agree.
- Missing or conflicting customer/channel assignments remain explicit exceptions until resolved.
- Retain negative reseller-discount/adjustment lines where present; validate recurring allocation and avoid double deduction. The PDF reports this pattern; its live usage still needs validation.
- Proposed PDF implementation details for review: retain FX=1 fallback amounts as flagged provisional values separate from validated USD totals; conserve recurring invoice value over the full service horizon and reconcile calendar-period billing/allocation with a timing bridge.

## Preparation checklist and remaining decisions

- Verified the field mappings for order customer, invoice recipient, reseller, and distributor. Invoice-to-end-customer coverage, customer rollup exceptions, and cross-entity deduplication remain to be validated.
- Verified Edition and Direct Sales types, selection values/computations, and current coverage. Historical assignment preservation remains unproven.
- Verified source ARR computation and deployed MRR/FX logic. Headline net channel economics is now confirmed; exact contractual price selection and FX implementation still require reconciliation. Proposed FX conventions are documented in the execution plan for review.
- Verified contract relationship fields, first-contract-date meaning, lifecycle labels, and earliest dates. Historical continuity must still be assessed using permitted sources; subscription-event logs are excluded.
- Verified scoped company IDs 2/3/5 and their partner IDs 8/9/11. Full intercompany identity mapping and transaction exclusions remain to be tested.
- Verified the older canonical extraction date 2026-09-06, newer full copy dated 2026-09-20 (see freshness correction below), and earliest contract date 2016-01-01. No final investor reporting cutoff has been selected; historical completeness remains to be assessed.
- Treatment of paused subscriptions; the existing metric guide includes them by default but flags finance validation as open.
- Whether the investor-facing workbook should display customer names; not decided yet.

## Preparation findings (2026-09-24)

- Live access succeeded after the ClickHouse service woke from idle; initial query timeouts were transient.
- Earliest observed sales-order first-contract date is 2016-01-01.
- **Freshness correction:** the canonical `raw_odoo.sale_order` table used by deployed analytics views was extracted on 2026-09-06, but a separate Airbyte-generated table, `raw_odoo.raw_odoosale_order689610d66db10629507fbdb2a9dc9f0d`, contains a full 2,695-row/2,695-ID sale-order copy extracted on 2026-09-20. Its latest Odoo `write_date` is 2026-09-20 07:07:50.528 UTC. The canonical table has 2,665 rows and a latest Odoo `write_date` of 2026-09-06 07:00:12.525 UTC. Deployed analytics currently point to the older canonical table. Establish why the hashed table exists and which Airbyte destination is authoritative before final extraction; do not claim September 6 is the latest Odoo source update.
- One posted MENA customer invoice predates 2019 (2018-08-30). Preserve it as a coverage exception; the requested invoice reporting window remains 2019-01-01 onward unless changed explicitly.
- The permitted companies also contain future-dated posted invoices. Posting status alone is insufficient: apply an explicit reporting-date cutoff.
- `x_studio_direct_sale` is a computed record-ID equality flag, not an independently maintained channel designation. Preserve the source flag and examine same-organization address differences separately.
- Custom ARR uses recurring price converted at `start_date`, while the deployed order view's calculated USD MRR uses order-date FX. Reconcile these bases before presenting ARR/MRR together.
- Reseller/distributor line prices apply additional discounts to the end-user subtotal. Investor ARR must represent Circularo's net contractual recurring revenue, as now confirmed. Verify which price is actually payable to Circularo and avoid applying already-included discounts twice. Preserve end-customer contract value separately.
- A deployed customer-invoice header view negates already-negative signed credit-note amounts. Do not use its `net_invoice_*_signed` measures without correcting the sign in task-local extraction logic and reconciling to source. No production changes are authorized or required at this preparation stage.
- See `data-semantics.md` for the verified field dictionary, lineage, and limitations. `semantic-evidence.json` preserves the permitted live query evidence.

## Initial layout prototype completed (2026-09-24; annual revision below supersedes forecast layout)

- Workbook: `outputs/layout-sample/Circularo Data and Forecast Layout Sample.xlsx`. Prototype only; full analysis remains pending approval.
- Real sample: seven end customers/seven selected contracts, eight posted customer invoices, 28 product lines. Includes Circularo Digital as an external reseller. Issuers in this sample are 3/5; these records do not represent the full scoped 2/3/5 portfolio.
- Sources use the known September 6 canonical snapshot consistently for the layout test; newer-copy authority is still unresolved. Source extracts and query lineage are retained in `sample-data/layout-sample-extract.json`.
- Forecast: six illustrative economic events for three explicitly fictional DEMO customers. One editable expected case, 12 monthly periods, replacement renewal versus incremental expansion examples, and an excluded overlapping growth assumption. No forecasts have been invented for real accounts.
- Actual billing remains in original AED/CZK. Unvalidated net contractual USD ARR and historical USD MRR are unavailable, not substituted with source custom ARR. All financial measures exclude tax.
- Service allocation demonstrates line/customer/month grain with inclusive-day proration, explicitly not the final approved MRR convention. Nine recurring-product lines lack valid service dates; no dates were invented. One ITHRA invoice line has unresolved customer attribution; it is retained in invoice totals and the customer subtotal is flagged incomplete.
- Checks passed: all eight invoice line/header original-currency ties, full-horizon service allocation conservation, forecast zero/blank probability, delayed start, excluded missing input, input-row reorder, actuals unchanged by forecast edits, formula error scan, exported chart/validation/panes and cached results. Every sheet was visually reviewed. Native Excel recalculation was not separately exercised.
- The spreadsheet skill guided input/formula separation and recalculation tests. ClickHouse `agent-discovery-schema` and `agent-query-safety` guided bounded, read-only source inspection; the excluded sales-order log was not used.

## Annual prototype and local layout revision (2026-09-24)

- Updated TASK.md, execution-plan.md and codex-odoo-data-brief.md to reflect yearly forecasting, customer Recurring Plan, net revenue/tax/CLV scope, Circularo Digital's reseller role, document responsibilities and frozen-run reproducibility requirements.
- Updated the existing sample workbook in place. Customers now includes the Odoo Recurring Plan for each selected contract. Forecast Inputs has 18 event-year rows for three fictional customers across illustrative calendar years 2027–2029; Annual Forecast replaces the monthly forecast sheet and reports nine customer-year rows. There is no monthly forecast grid. Monthly historical customer/service detail remains intact.
- Opening ARR, time-weighted annual recurring revenue, closing ARR, and net ARR change are separate. Daily timing includes leap-year handling. First-year opening value is illustrative; subsequent opening ARR links to the prior year close. The sample net-change bridge is not a full expansion/churn decomposition. One-time fees, forecast billing and a full scenario selector remain proposed final-model extensions.
- Existing-customer growth evidence and real customer CLV remain full-analysis deliverables, not invented sample findings. The demo three-year total is finite-horizon expected revenue, not lifetime CLV. Final horizon and reporting cutoff remain unselected.
- Validation passed: independent annual calculations; annual ARR bridges; zero versus missing probability; missing excluded inputs; later-year driver changes and carry-forward; delayed start; one-day leap-year timing; invalid dates; duplicate/missing event keys; input row reorder; overlapping renewal and overlapping growth rejection; eight invoice reconciliations; full-horizon allocation conservation; source-detail values/formulas and original customer values unchanged; Recurring Plan mappings checked.
- All nine affected rendered ranges were reviewed. Saved XLSX verified: nine sheets, Annual Forecast present, Customers table extended to column N, four validation rules, seven frozen panes, correctly linked/styled annual chart, and no cached formula errors. Native Excel recalculation was not exercised.
- The spreadsheet skill guided preservation, annual input/build separation, recalculation and visual/export checks. No fresh ClickHouse queries, database mutations or full investor analysis were performed in this revision.
- Implemented sql/00_discovery, 10_sources, 20_models, 30_analysis, 40_validation and 90_cleanup, plus evidence/. Existing scripts/, sample-data/, previews/ and outputs/ remain in place. SQL/evidence folders are intentionally empty until authorized implementation. Existing evidence JSON paths were preserved.
- Added local AGENTS.md (Codex's recognized instructions filename), covering scope, read order, agreed semantics, authorization gates, data safety, folder responsibilities and verification. No duplicate PROJECT.md, output/ directory or files outside work/m-capital were created by this work.

## September 6 source selection approved (2026-09-25)

- Josef explicitly chose: “Use the September 6 snapshot, clearly dated.” The selected canonical raw_odoo sources are generation 176, extracted on 2026-09-06. This supersedes the earlier unresolved source-choice gate, not the historical evidence about September 20.
- Live reinspection found the previously populated September 20 hashed sale-order table empty. The cause is unknown; no restoration or source changes were attempted. Canonical core tables remain populated and coherent. Full discovery evidence is in evidence/2026-09-25-discovery.json.
- Narrow source extracts are frozen under evidence/m_capital_20260925_g176/source, with per-file/query SHA-256 hashes, source times, expected grains and a manifest. All 13 selected sources passed uniqueness, generation and Airbyte changes-array checks. No sales-order log was queried or used.
- Contractual portfolio date is September 6, 2026, not today and not a reconstructed August 31 snapshot. August 31 remains the provisional billing cutoff (latest completed calendar month); it does not prove historical source completeness.
- The configured cli_codex_user can read raw_odoo but has no sandbox grants. No project warehouse objects were created. Its CREATE VIEW grant in codex_reports does not authorize using that database for this task. Local extraction/reconciliation can proceed; final sandbox deployment remains blocked pending access or a user-approved local-freeze substitution.
- Live recurring product-line sums already contain negative recurring channel-discount lines. Custom reseller/distributor price fields must not be deducted again automatically. Order-level price reconciliation and exceptions are required before publishing net ARR.

## Sandbox remains required (2026-09-25)

- Josef chose “Keep sandbox required; arrange access” instead of the offered local-only frozen-file substitution.
- Preserve the local extracts as staging evidence. Warehouse deployment and final delivery remain blocked until an administrator grants project-scoped access to cli_codex_user. Do not use codex_reports or treat local files as satisfying the frozen-sandbox completion condition.
- Prepared evidence/sandbox-access-request.sql for an administrator: SELECT, INSERT, CREATE TABLE and CREATE VIEW on sandbox.m_capital__* only. No permissions were changed, no objects created, and no deletion rights requested.

## Access verified, source freeze completed, and business dates approved (2026-09-25)

- Josef confirmed scoped access for cli_codex_user. CHECK GRANT without a session read-only override verified the requested grants. Thirteen run-specific sandbox source tables were created and every source field reconciled to the local hashed evidence. Warehouse-manifest.json records completion. Earlier access-blocker entries above are historical, superseded by this result.
- Josef confirmed **old Europe commercial partner 10 and PALAXO AUSTRALIA commercial partner 663 are intercompany exclusions**. The current reviewed exclusion set is **8, 9, 10, 11, 663**. This excludes transactions, not source evidence; frozen rows remain available for reconciliation. Circularo Digital commercial partner **231 remains an external reseller**.
- Josef approved **August 31, 2026 billing/YTD** and **September 6, 2026 contractual portfolio**. Invoice history starts January 1, 2019. These are separate business dates, not a reconstructed August contractual snapshot and not current-day revenue. Approval of dates does not certify completeness.
- The immutable source/warehouse manifests retain their original provisional annotations. `evidence/m_capital_20260925_g176/approved-decisions.json` is the dated decision overlay. Use the approved scope fields in invoice_analysis and order_scope for downstream work; older intermediate ownership labels are retained for traceability.
- All 1,148 posted invoice/credit headers reconcile to product-line totals in transaction and company currencies within 0.02. Controlled exact order-reference matching resolves 245 additional product lines across the full frozen extract. Delivery-address agreement is not universal, so it is not an approved automatic end-customer fallback.
- Historical attribution and service-period gaps remain material. The source freeze and financial foundation are implemented; final contractual price certification, historical KPI feasibility, annual forecasts, CLV and the investor workbook are not complete. No investor publication is authorized.

## Investor review model implementation (2026-09-25)

- The approved population contains 186 currently effective subscriptions across 181 end customers at September 6. Recurring product-line sums reconcile to all 186 order recurring totals. No active renewal-family overlap was found. Candidate net ARR is USD 2,465,952.30; it remains provisional pending five price cases (orders 1720, 2150, 2285, 2371, 2393; candidate ARR exposure USD 124,581.30). Four other custom-price cases match posted recurring invoice amounts. No custom discount was deducted a second time.
- End-customer recurring value is a separately labelled USD 2,704,461.84 proxy, adding back explicit recurring channel-discount products, not independently verified reseller resale value. Issuer company 8 remains out of scope; billed reseller partner 231 remains external.
- All 1,148 posted header controls pass. January–August billing is USD 2,175,749.93 in 2026 versus USD 1,784,637.59 in 2025. Total billing includes 648 unresolved end-customer lines; no unsupported identity fallback is used. All 2019–2021 lines lack controlled end-customer attribution.
- Full service-horizon allocation uses weight 1 for complete months and covered days/month days for partial months, normalized over the whole period. It is analytical service allocation, not accounting recognition. All dated-line amounts are conserved; 983 recurring lines without usable service dates and 17 negative customer-month totals remain visible. Portfolio retention, logo churn and lifetime CLV are unavailable rather than fabricated.
- Historical growth compares attributed 2024/2025 and matched January–August periods, including inactive customers and decreases. Missing attributed observations are not certified zeros. Observed billed customer value and modeled finite-horizon service value remain separate because advance-billing overlap has not been reconciled.
- Calendar 2027–2029 is an explicit working forecast horizon for review, not a new user-approved assumption. The default flat case carries September ARR through year-end and assumes unchanged renewals beyond term ends. Management and Downside assumptions are blank. Source quotations start excluded; reviewed annual inputs are required. Eight future-start confirmed orders are visible but not silently added to opening ARR.
- Renewal replacements remove retained baseline in the customer-year calculation. Input validation and event amounts do not depend on forecast outputs. Probability applies once; one-time amounts do not affect ARR. Each included event/overlap key is unique across the horizon and entered in its service-start year. Named events suppress generic expansion for that customer/year. Calculated Annual Forecast rows retain generated customer/year order with a prior-key guard; edit the separate input sheets.
- The partner custom field `x_studio_parent_company` is free text in this extract, not a relational corporate-group ID. No corporate-group mapping or account headroom is inferred from it.
- Fifteen prepared analytical/input datasets were frozen as immutable sandbox.m_capital__r1_20260925_* tables and verified field-for-field, including exact source JSON and SHA-256 hashes. Workbook and final scenario release checks are recorded separately in outputs/investor-analysis. Native Excel recalculation and investor publication are not claimed.

## Initial references

- `/Users/josefneumann/Projects/ai-workspace/project-data/clickhouse/README.md`
- `/Users/josefneumann/Projects/ai-workspace/project-data/knowledge/odoo/README.md`
- `/Users/josefneumann/Projects/ai-workspace/project-data/knowledge/odoo/current_bi_decisions.md`
- `/Users/josefneumann/Projects/ai-workspace/project-data/knowledge/odoo/metric_definitions.md`
- `/Users/josefneumann/Downloads/Odoo BI Foundation Review & MRR_KPI Layer Design (1).pdf`
- Live ClickHouse organization: Circularo; service: Circularo Analytics (`cec663cc-aeb1-4899-84f5-fb804e2eeac7`).

`data-semantics.md` records the preparation findings and remaining uncertainties. `codex-odoo-data-brief.md` is the standalone reusable interpretation for review. Execution of `execution-plan.md` was approved on September 25; the evidence-supported internal-review deliverable is now implemented. Working documents remain non-canonical, and investor publication is not approved.
