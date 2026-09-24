# Circularo investor customer revenue and retention analysis — execution plan

Status: APPROVED FOR EXECUTION by Josef on 2026-09-25. Source freeze and financial foundation implemented; source/cutoff decisions confirmed. Remaining price, historical coverage and forecast gates are stated below. Not approved for investor publication.
Prepared: 2026-09-24.
Working directory: /Users/josefneumann/Projects/ai-workspace/sales-system/work/m-capital.
Primary deliverable: Circularo Investor Customer Revenue & Retention Analysis.xlsx.

## 1. Goal and completion outcome

Produce a reproducible, investor-ready Excel analysis that answers:

> How predictable, durable, scalable, and expandable is Circularo's external-customer revenue base, and what forward growth is supported by existing-customer history, signed commitments, and the pipeline for existing and new customers?

Test the investment thesis that customers stay for long periods, expand over time, and adopt higher-value enterprise/shared-service offerings, with partner distribution contributing to growth. Present evidence that supports, qualifies, or contradicts each proposition.

The financial headline is **Circularo's net contractual recurring revenue**, annualized as net ARR and normalized as net MRR. Present end-customer contract value separately with an explicit label. Pair this with historical **net invoiced revenue**, excluding tax and reducing revenue for credit notes.

Following the supplied Odoo BI review, historical subscription KPIs and retention will use **invoice-backed MRR**: posted recurring invoice lines allocated across their service months at fixed invoice-date FX. Its annualized equivalent is **invoice-backed ARR = 12 × invoice-backed MRR**, not the contractual headline ARR. Keep these measures distinct throughout the workbook; never connect an invoice-backed opening balance to a contractual closing balance in one bridge. Service-month allocation is an analytical measure, not a claim of accounting revenue recognition.

The model must also be **forecast-ready and incorporate supported forecast/pipeline inputs**, for both existing and new customers. A dedicated existing-customer growth and customer-value analysis will distinguish expansion already demonstrated in history from forward growth inferred from that history, named opportunities, and management assumptions. Future potential is not a booked result or a guaranteed outcome. Actuals, current contractual run-rate, signed future commitments, open pipeline, and assumption-driven scenarios remain separate and traceable.

Completion means:

- reconciled source extracts and explicit source/cutoff choices;
- a normalized end-customer, invoice-line, contract, and customer-period dataset;
- clearly defined net ARR/MRR and invoiced-revenue measures;
- historical retention and recurring-revenue movements wherever the permitted evidence supports them;
- an existing-customer expansion and forward customer-value analysis grounded in observed retention and expansion, including key-account evidence and downside;
- an editable annual forecast model with existing/new-customer pipeline inputs, signed commitments, scenario assumptions, and explicit actual-to-forecast boundaries;
- approximately ten primary investor exhibits with supporting customer detail;
- an explicit account of missing coverage, unresolved exceptions, source differences, and methodology;
- a validated Excel workbook whose headline figures trace to source records and documented calculations.

A missing historical measure is reported as unavailable with its reason. It is not estimated silently or replaced with a different metric.

## 2. Agreed scope

| Topic | Agreed treatment |
|---|---|
| Legal entities | Only company 2: Circularo International Ltd; company 3: current Circularo Europe s.r.o.; company 5: Circularo Mena - FZE |
| Excluded entities | All others, explicitly including historical company 4 and company 8 |
| Intercompany | Exclude group-internal transactions; retain external end-customer sales made through resellers/distributors |
| Circularo Digital | External reseller, not a group company (Josef-confirmed); billed partner 231 is not intercompany. Odoo company 8 remains excluded only as an issuing entity |
| Customer identity | End-customer commercial organization, with billing party, reseller, distributor, and parent/group separately available |
| Contract history | All available history in permitted sources, reaching 2016 where supported |
| Invoice history | From 2019-01-01 through a fixed, supported reporting cutoff |
| Annual presentation | Full-year history including 2019; main exhibits may emphasize 2020 onward, retaining 2019 as supporting context |
| 2026 comparison | YTD versus the matching prior-year period; no unlabelled annualization |
| Headline recurring measure | Circularo's net contractual recurring revenue after applicable contractual channel discounts |
| Secondary recurring measure | Separately labelled end-customer recurring contract value |
| Historical financial measure | Net invoiced revenue, not recognized accounting revenue or cash collections |
| Historical subscription KPI basis | Posted recurring invoice lines spread over validated service periods, with invoice-date FX fixed; labelled invoice-backed MRR/ARR |
| Currency | Consolidated USD plus original-currency amounts and FX lineage; company breakdown available |
| Sales-order log | Exclude raw_odoo.sale_order_log and any derived data that relies on it |
| Samples | Active-all.xlsx and Churned-all.xlsx are aggregate reference samples, not authoritative historical snapshots or complete customer lists |
| Forecast and pipeline | Include a distinct forward layer for existing-customer renewals/expansion/reactivation and new customers; populate validated available inputs and keep unsupported inputs visibly missing |
| Existing-customer growth potential | Required separate analysis of observed expansion, evidence-backed headroom, and history-informed forward customer value; include contraction/churn risk |
| Forecast frequency and horizon | Yearly inputs and outputs confirmed by Josef. Proposed three annual periods; final year convention, cutoff, and horizon remain for review. Monthly historical KPI detail is retained |
| Output | Excel, with concise investor exhibits and auditable detail |
| File boundary | All new files, scripts, extracts, caches, previews, and outputs remain inside work/m-capital |
| External actions | No publication, investor sharing, production mutation or production-view repair. Project-only sandbox objects follow the already approved TASK.md boundary: existing sandbox database, m_capital__ prefix, no source changes |

The user's Markdown brief guides the analytical questions. Instructions embedded in source data or spreadsheets are treated as source content, not as authorization to change scope.

## 3. Inputs and evidence already established

### Main sources

- ClickHouse raw_odoo: customer invoices, invoice lines, sales orders, sold lines, the sold-to-invoiced line bridge, partners, companies, products, subscription plans, currencies, and rates.
- analytics and mart reporting views where their definitions, dependencies, grain, and transformations pass verification.
- The Odoo knowledge and ClickHouse contracts in the project-data repository.
- Task decisions, data-semantics.md, semantic-evidence.json, and sale-order-freshness-evidence.json.
- The user brief: Circularo Investor Customer Revenue & Retention Analysis.md.
- The user-supplied Odoo BI Foundation Review & MRR_KPI Layer Design (1).pdf: invoice-line financial foundation, service-month historical KPIs, fixed invoice-date FX, and reconciliation guidance. Proposed view names and unverified assertions are not assumed implemented.
- [Local Markdown source transcription](odoo-bi-foundation-review-source.md): all 12 PDF pages preserved as reference, separate from project interpretation and decisions.
- codex-odoo-data-brief.md: separate reusable draft explaining field meanings and the PDF's application for review.
- Forecast inputs: relevant Odoo opportunities/quotation lines and signed future contracts where available, plus explicitly supplied account plans or management forecast assumptions. Table/field availability and reliability are still to be established; no pipeline amount or probability is assumed verified.

### Sample workbook inspection

Read-only inspection of the supplied files established:

| File | Inspected area | What it contains | Intended use |
|---|---|---|---|
| /Users/josefneumann/Downloads/Active-all.xlsx | Sales Orders!A1:C13 | A static table of ARR (USD) and Count, grouped by year; no individual customer/order IDs | Aggregate reconciliation after the grouping field, filters, population, and date basis are established |
| /Users/josefneumann/Downloads/Churned-all.xlsx | Sales Orders!A1:Q13 | A static two-dimensional year table of ARR (USD) and Count; no individual customer/order IDs | Aggregate comparison and identification of definition/date discrepancies |

Both contain no cell formulas. File properties show creation on September 24, 2026, but that does not establish the business as-of date or exported filters. The displayed Count must not be assumed to be distinct customer logos.

The Churned table has a nonzero cell at the row labelled 2022 and column labelled 2021. Since the grouping fields themselves are not labelled, do not assume these are acquisition year and churn year without verification. If they are, the combination is a chronology exception to investigate, not silently repair.

The samples will not be used to force warehouse results to match unexplained totals.

### Known issues to address

1. The canonical sale_order table used by deployed views reflects September 6; a separate Airbyte-generated copy contains newer records extracted September 20. Its authority and compatibility with other raw tables are unresolved.
2. An existing invoice-header view reverses already-negative signed credit notes to positive.
3. Source custom ARR uses start-date FX while the deployed calculated USD MRR uses order-date FX.
4. Order Direct Sales is customer-record equality with invoice-recipient record. Invoice Direct Sales uses different fields. Neither is interchangeable without checking.
5. Some legacy mart aliases/dependencies are stale.
6. Order-line recurring fields present in Odoo metadata are absent from the raw replicated order-line schema; product-template and invoice-line alternatives need validation.
7. Some posted invoices are future-dated, and one MENA invoice precedes the agreed 2019 reporting start.
8. Current subscription statuses, dates, and source snapshot timing contain exceptions that affect as-of ARR.
9. Product/deployment taxonomy in the investor brief differs from the raw Edition labels.
10. Invoice-line service dates exist physically, but completeness and meaning must be verified before historical MRR/retention is feasible.
11. The PDF reports separate negative reseller-discount lines; live usage and recurring allocation must be tested. Positive-only/quantity filters can overstate net revenue.
12. Opportunity/quotation probabilities, weighted amounts, expected dates, forecast net-price basis, and links to won contracts require validation. Current pipeline is not evidence of what was known at historical dates.

These issues are inputs to Phase 1 and subsequent local calculations. The plan does not include modifying production data or analytical views.

## 4. Execution sequence and review points

| Phase | Work | Concrete output | Completion condition |
|---|---|---|---|
| 1. Establish trustworthy sources | Resolve table versions, source freshness, lineage, coverage, and reporting cutoff | Source register, extraction manifest, initial issue register, metric feasibility matrix | Every selected source has a documented role/date; no excluded log dependency; unresolved source authority is explicit |
| 2. Resolve customers and classifications | Build identities, intercompany exclusions, channel/product/geographic mappings | Customer master and mapping tables with evidence and exceptions | End-customer attribution and grouping are traceable; unresolved records remain visible |
| 3. Reconcile invoiced revenue | Build signed tax-exclusive invoice-line facts and independent header controls | Monthly/annual billing baseline and coverage reconciliation | Invoice/credit-note signs and totals reconcile by entity, period, and currency |
| 4. Establish net contractual ARR/MRR | Determine actual channel pricing, recurrence, contract intervals, FX, and current portfolio | Net/end-customer recurring-value schedule and source-ARR reconciliation | Net ARR basis is evidenced; no duplicate renewal/upsell value; dated portfolio is defensible |
| 5. Build invoice-backed MRR and retention | Allocate recurring invoice lines to service months; derive movements, retention, and cohorts; use contracts for tenure context | Customer-month facts, invoice-backed bridges/retention, service-period coverage and longevity | Allocations reconcile to lines; historical zeros are distinguished from missing data; unsupported outputs withheld |
| 6. Model growth potential and forecast | Quantify observed expansion; build customer-level forward assumptions, signed commitments and existing/new-customer pipeline scenarios | Key-account growth scorecards, annual forecast inputs and customer-year scenarios, finite-horizon customer value | Actuals remain intact; inputs have evidence/as-of dates; no renewal/opportunity double counting; unsupported assumptions are explicit |
| 7. Answer investor questions | Analyse mix, concentration, expansion, longevity, channels, geographies, strategic accounts, and forecast drivers | Approximately ten primary exhibits and balanced findings | Claims trace to metrics; actual versus forward evidence, denominators, coverage, and sample sizes are visible |
| 8. Build and verify Excel | Assemble linked outputs, calculations, scenario controls, detail, mapping, and checks; render and inspect | Completed Excel workbook and concise findings/methodology notes | Numerical, forecast, formula, chart, layout, and provenance checks pass |

Sequence dependencies are deliberate: retain the full invoice baseline even if attribution or historical ARR has gaps, and progress with unaffected analyses while exceptions are resolved.

**Current review point (2026-09-25):** the internal-review workbook and model are implemented. Thirteen source datasets and fifteen prepared analytical/input datasets are frozen in sandbox and reconciled field-for-field to hashed evidence; final scenario results and release-manifest verification are tracked in investor-model/warehouse-review-manifest.json. The 18-sheet workbook includes contractual ARR/MRR, historical billing, customer plans, growth, tenure, observed customer value and editable 2027–2029 annual scenarios. Source controls, forecast behavior, rendered sheets and native export checks pass; native Excel recalculation was not exercised. Five price cases keep ARR provisional. Historical attribution/service gaps make portfolio retention and lifetime CLV unavailable. Management forecasts and investor publication still require business review. This completes the evidence-supported review implementation, not certification of unsupported metrics.

After approval, routine extraction, reconciliation, and documented calculation choices proceed within this scope. Additional user decisions are needed only where evidence cannot determine a material business treatment, source authority, or scope change. These are review points, not repeated permission requests for ordinary steps.

## 5. Phase 1 — source readiness and fixed reporting periods

1. Inventory only relevant tables/views and their dependencies. Reject any selected measure whose lineage uses the excluded sales-order log.
2. Compare the canonical and newer sales-order copies by schema, IDs, extraction generation, dates, updates, and compatibility with linked order lines/partners/plans. Do not union snapshots and double-count orders or assume newer means authoritative.
3. Check corresponding freshness for invoices, lines, bridge, partners, products, plans, and FX. Distinguish extraction time from source write time, transaction date, service date, and accounting date.
4. Establish source history coverage by entity and year/month, nulls, duplicates, deletions where exposed, and known changes in replication.
5. Apply the user-approved August 31, 2026 billing cutoff and separately labelled September 6, 2026 contractual portfolio date. Test completeness independently; approval of a cutoff does not fill historical evidence gaps.
6. Confirm the contractual headline's effective state at its stated date is supportable and invoice-backed service months are sufficiently complete. An extraction after month-end is not itself a month-end snapshot. Record both the service period and the document/extraction knowledge cutoff; later invoices or credits can restate history.
7. Keep actual invoice dates after the cutoff outside historical/YTD totals; preserve those records in an exception/forward-document view.
8. Record original source paths/tables, query text, extraction time, counts, relevant file hashes, and calculation version in a local manifest.
9. Create a metric feasibility matrix by period and scope: supported, supported with stated limitations, or unavailable. Record the missing evidence and affected coverage.
10. Inventory permitted pipeline/quotation/forecast inputs, their as-of dates and linkage to orders/customers. Test whether stage history exists independently of the excluded log. Do not require unavailable historical pipeline snapshots to build a current forward scenario, or fabricate them for a backtest.

**Readiness output:** source/cutoff memo and issue register. If the newer table's authority cannot be established, present the concrete comparison for a source choice; continue unaffected invoice and mapping work.

## 6. Phase 2 — normalized data and classification

### Datasets and grains

| Dataset | One row represents | Required lineage |
|---|---|---|
| Customer master | One normalized end-customer commercial organization | Odoo partner IDs, commercial-parent IDs, aliases, group ID, mapping evidence |
| Contract schedule | One distinct contract component/price interval where supportable | Company, order, order line, contract family, applicable dates, product, currency, price basis |
| Invoice facts | One eligible invoice product line | Company, invoice, line, credit-note relationship, date, currency, original/signed values |
| Invoice allocation | One allocation of an invoice line to a customer/contract component | Bridge IDs, allocation method/weight, ambiguity status |
| Service allocations | One invoice-line/customer/service-month allocation | Signed recurring value, service dates, weight, frozen invoice-date FX, attribution and coverage flags |
| Customer periods | One customer per service month, with separate dated contractual snapshots if supported | Invoice-backed MRR/ARR, billing totals, coverage, movements; explicitly separate contractual net/end-customer ARR columns |
| Forecast inputs | One versioned opportunity/contract component or explicit customer-growth assumption per year and scenario | Stable economic-event and customer/prospect IDs, year, source IDs, type, net amount/currency, cadence, dates or part-year assumption, stage/probability, owner, evidence/as-of date, scenario, overlap group |
| Forecast customer periods | One customer/prospect per forecast year and scenario, with component-level supporting detail | Opening/closing net ARR, retained base, signed changes, renewal/churn risk, expansion, new business, in-year recurring revenue, separate projected billing, assumptions and source links |
| Customer growth evidence | One observed expansion pattern or supported account growth driver | Customer/peer population, observation window, metric basis, counts/dispersion, driver evidence, limitations, linked forecast assumption |
| Mapping tables | One explicit identity/classification/FX rule | Raw value, reported value, effective dates if known, evidence, decision status |
| Data-quality issues | One defined exception or issue group | Affected IDs, population/amount, method affected, treatment, owner decision if needed |

This is a project-normalized dataset, not a promotion of new canonical business facts or warehouse models.

### Identity and intercompany rules

- Start from the sales order's end-customer partner and roll up through its commercial organization.
- Keep billed-party identity separately. Never substitute a reseller for an unresolved end customer.
- Use IDs and corroborating fields to resolve renamed organizations and duplicates; do not merge on name similarity alone. 
- Preserve customer and corporate-group rollups separately. Primary logo counts are end-customer commercial organizations; group concentration is an additional view.
- Shared-service beneficiaries remain deployment reach, not additional paying logos without evidence of distinct contractual customers.
- Exclude internal counterparties using validated group-entity and commercial-parent mappings, not just names or the issuing company filter.
- Circularo Digital (partner 231) is a confirmed external reseller despite also having Odoo company record 8. Retain scoped issuers' sales billed to it. A res_company row does not establish ownership; distinguish excluded issuer IDs from intercompany counterparty IDs.
- The three-company scope also applies to contract and revenue totals. Flag any excluded-entity predecessor that might affect group-wide tenure; do not silently broaden the reporting scope.

### Classification rules

- Preserve raw Edition and add reporting Edition/Plan separately. Apply the brief's Ultimate plan -> Enterprise reporting Edition rule through an explicit mapping, retaining the raw Ultimate label.
- Separate deployment model, shared-service arrangement, API capability, and pricing basis. API is not necessarily a mutually exclusive deployment category.
- Retain Support, Other, PoC, and unmapped values explicitly where they do not fit the four core reporting editions.
- Map Government, Enterprise, SME, Service Provider, Partner/OEM, and Other only from supported classifications. Keep unknown cases separate and proposed manual mappings reviewable.
- Geographic groups: UAE, KSA, Other GCC (Bahrain, Kuwait, Oman, Qatar), EU, Rest of World, and Unknown; use end-customer geography, not reseller geography or hosting region.
- Preserve source Direct Sales and derive any corrected reporting channel only from explicit evidence. Record same-organization billing-address differences and partner-assisted direct sales as separate qualifications.
- Use historically effective classifications when available. If only current classifications exist, label the resulting historical mix as classified using current attributes.
- Attribute retention cuts to the opening-period segment/channel/plan, so later migrations do not create artificial churn.

## 7. Phase 3 — net invoiced revenue

1. Select posted customer invoices and credit notes for company IDs 2/3/5, invoice dates from 2019-01-01 to the cutoff, and external transactions.
2. Use tax-exclusive line amounts with a single, verified sign convention. Do not negate already-signed refunds a second time.
3. Reconcile to unique invoice-header controls by entity, invoice, transaction currency, and period. Do not sum repeated header totals from line-level views.
4. Convert to USD using verified Odoo rates as of invoice date; if invoice_date is absent, use accounting date only as a flagged fallback. Preserve company and transaction currency amounts.
5. Follow the PDF's missing-FX fallback of 1 only in a separately labelled provisional amount with FALLBACK_TO_ONE; keep the row, original currency exposure, and unresolved flag. Do not silently include provisional non-USD conversions in validated USD investor totals. Quantify coverage and withhold a complete headline if material exposure is unresolved. This separation is proposed for approval.
6. Map invoice lines through the sold-line bridge to contracts and end customers. Deduplicate relationship pairs and prevent many-to-many multiplication.
7. For multi-customer lines, allocate only where a documented amount/quantity basis is supported. Otherwise retain unresolved revenue with the original line value intact.
8. Classify recurring/non-recurring from validated product/contract evidence. Keep unclassified amounts separate; do not define every linked subscription invoice as entirely recurring.
9. Produce monthly and annual net invoiced revenue, recurring share, growth, customer mix, and concentration. Show how fully reconciled totals partition into attributed and unresolved amounts.
10. Never interpret multi-year advance billing as a one-year recurring run-rate or use invoice gaps alone as proof of churn.
11. Preserve commercial adjustment/negative discount lines. Separate recurring and one-time discount allocation only with supported rules. Invoice amounts already represent Circularo's billing; do not subtract reseller/distributor discounts again.
12. Preserve custom USD fields beside recalculated amounts. Use the PDF's proposed >1% variance flag as a diagnostic, with absolute variance and zero-denominator handling, not an automatic materiality clearance.

**Control:** classified recurring + non-recurring + unclassified equals total net invoiced revenue; attributed + unresolved equals the same total.

## 8. Phase 4 — net contractual recurring revenue

### Price basis

For each recurring component, identify the contractual amount payable to Circularo:
- direct sale: the documented Circularo contractual recurring charge;
- indirect sale: the amount after the applicable contractual reseller/distributor discount, supported by commercial terms and invoiced economics;
- distinguish discounts already included in source prices from additional channel discounts;
- never subtract both reseller and distributor discounts by default. Their source computations are separate adjustments to the end-user subtotal, not automatically a compounded discount chain;
- retain separate negative commercial discount lines where present and test whether their effect is already in recurring totals/custom prices;
- do not deduct one-time services, arbitrary partner costs, or commissions again without evidence of their contractual treatment.

Maintain:
- net_recurring_period_amount_txn;
- end_customer_recurring_period_amount_txn;
- recurring period and effective dates;
- net_arr_usd and net_mrr_usd;
- end_customer_arr_usd and end_customer_mrr_usd;
- source_odoo_arr_usd;
- price_basis_source, fx_date, fx_rate, and reconciliation difference.

### Normalization and eligibility

- Annualize recurring charges by the actual supported billing interval: monthly interval n -> amount * 12/n; yearly interval n -> amount/n. Any weekly/custom cadence must have its convention explicitly documented.
- Net MRR = net ARR / 12 on the same pricing and FX basis.
- Keep billed amount, total contract value, and annualized recurring value distinct.
- Include recurring support/add-ons where contract evidence supports recurrence. Assess PoC and one-off/fixed projects individually.
- Use effective contract dates and lifecycle/renewal relationships to avoid double counting predecessor renewals or upsell documents.
- Separate future contracted starts from effective ARR at the cutoff.
- Resolve in-progress-but-expired contracts against renewal/contract evidence; do not silently extend service.
- For paused contracts, include recurring charges only where evidence shows the contractual recurring commitment continues; otherwise show them separately as unresolved/suspended rather than silently applying a generic active flag.

### Currency basis

Proposed reporting convention for approval with this plan:
- invoiced revenue: transaction-date conversion as described in Phase 3;
- contractual ARR/MRR: the stated snapshot-date FX on the contractual transaction-currency run-rate;
- historical invoice-backed MRR/ARR: invoice-date FX locked for every service-month contribution, as specified in the PDF;
- primary historical retention and bridges: the same invoice-backed basis at both endpoints, with no monthly revaluation of a contribution;
- a supplementary constant-currency sensitivity may separate renewal FX effects from commercial changes where the original-currency evidence supports it. Label the alternative basis and reconcile it to primary results. Do not replace the invoice-backed series with period-end contract FX.

Keep source Odoo ARR unchanged as a reconciliation reference. Its start-date FX and possible end-customer pricing basis need not match net period-end ARR.

**Output:** a customer/contract reconciliation that explains source ARR versus investor net ARR through eligibility, price basis, recurrence, normalization, and FX.

## 9. Phase 5 — invoice-backed historical MRR, retention, and cohorts

### Construct service-month recurring facts

1. Use the signed posted recurring invoice lines from Phase 3 as the historical financial source, not current contract amounts or statuses.
2. Validate deferred_start_date/deferred_end_date against actual service intervals. Test boundary inclusivity, partial months, multi-year periods, and whether subscription_id/subscription_mrr are usable supporting context. Do not assume the PDF's generic start_date/end_date names are physical invoice-line columns.
3. Allocate each line across its complete service horizon. A full-year USD 12,000 invoice covering January–December contributes USD 1,000 per month. Document the partial-month/day convention before applying it.
4. Preserve original-currency allocations and invoice-date USD conversions; freeze that FX across the contribution's service months. Allocation weights must sum to one.
5. Allocate refunds, rebills, and recurring discount lines to their evidenced service scope. Do not clamp negative customer-month values to zero; investigate and resolve their KPI treatment before publication.
6. Preserve invoice_line_id, end_customer_id, service_month, allocation weight, recurring value, date evidence, FX quality, and attribution quality for every contribution.
7. Aggregate to customer × month, with invoice-backed MRR and invoice-backed ARR (=12×MRR). Missing dates/classification/attribution remain explicit exceptions, not zero MRR or fabricated service periods.
8. Test late billing, arrears, and recent-month completeness. A missing bill is not enough to establish churn. Record restatements when later documents change an earlier service period.

Contract families, first-contract dates, renewal relationships, and sold lines provide attribution and longevity context. They must not replace posted invoice lines as the historical KPI monetary source. Current mutable order prices/statuses cannot establish past values.

Across a line's full service horizon, allocations must equal its signed recurring invoice amount. Within a calendar period, service allocation and invoice-date billing may differ: reconcile through an explicit opening/closing timing bridge, not forced equality. A ledger control must also explain relevant deferred postings, manual journals, tax/rounding, FX, and non-recurring differences; this work does not certify accounting-recognized revenue.

Publish portfolio-wide historical retention only where coverage is adequate and quantified. A fully observed subset may be shown with explicit coverage and selection limitations; it must not masquerade as total-company NRR. Pre-2019 contract tenure does not establish pre-2019 financial KPI coverage, and missing opening service balances limit early-period retention.

### Monthly movements and annual endpoint bridge

Compare consecutive supported customer-month totals for monthly movement analysis. For annual presentation, use a **customer-level endpoint bridge of invoice-backed ARR**, not a claim to reproduce every within-year event:

Opening invoice-backed ARR
+ New-customer closing invoice-backed ARR
+ Reactivated-customer closing invoice-backed ARR
+ Expansion of opening customers
- Contraction of opening customers
- Churn of opening customers
= Closing invoice-backed ARR.

- Aggregate a customer's invoice-backed service contributions before classifying movement.
- New: zero opening MRR, positive closing MRR, and first supported recurring relationship during the period.
- Reactivated: zero opening MRR, positive closing MRR, and evidence of an earlier recurring relationship.
- Expansion/contraction: positive MRR at both endpoints, classified by the change.
- Churn: positive opening MRR and a supported zero closing MRR, after distinguishing service cessation from missing/late documents.
- Preserve an unresolved new-versus-reactivated category where earlier history is incomplete. Do not silently assign unknown movements to new business.
- Keep data corrections separate from commercial changes and explain any historical restatement.
- Invoice-date FX changes on later invoices can affect observed USD movements; quantify where feasible. A supplementary constant-currency bridge must reconcile separately and retain the primary invoice-date-fixed series.
- Show USD amounts and percentages of opening ARR. Zero opening ARR gives an unavailable percentage, not zero percent.
- Customers acquired and lost within the same year contribute no closing ARR to this endpoint bridge; show monthly flows separately where coverage supports them.
- Do not count a same-year churn/reactivation of an opening customer as both an outside-cohort reactivation and retained closing ARR.
- This bridge must not be labelled a reconciliation to the headline contractual ARR. Explain the two measures' pricing, timing, coverage, and FX differences separately.

### Retention and logo reconciliation

Let O be customers with supported positive opening invoice-backed MRR; R0/R1 are their opening/closing MRR on the same invoice-date-fixed FX basis. Formulas below require supported nonnegative customer-month values; resolve credit/allocation exceptions before classifying them. Unknown R1 is not zero.

- NRR = sum(R1 for O) / sum(R0 for O).
- GRR = sum(min(R0, R1) for O) / sum(R0 for O).
- New customers and reactivations outside O are excluded from both ratios.
- Opening-cohort subscription logo retention = opening customers with positive supported closing MRR / opening positive-MRR customers.
- Logo churn requires an evidenced departure and no return by close; report unresolved coverage separately from departures.
- Label this as invoice-backed subscription retention. Keep contractual customer status and non-recurring/free relationships separate.
- A supplementary constant-currency result must use the identical opening cohort and state its normalization; it must not silently replace the PDF-based result.
- Reconcile opening/closing logo counts using mutually exclusive endpoint entrants, returning customers, and departures. Present within-period acquisition/departure flows separately if supported.

### Cohorts, longevity, and historical customer value

- Acquisition cohort: first supported contract year, preserving 2016 onward.
- Revenue development: net invoiced revenue for the original cohort, with elapsed-year labels and partial Year 0 clearly defined.
- Subscription survival at anniversaries: use supported invoice-backed service intervals, keep the eligible denominator and observation coverage visible. Distinguish active at anniversary from uninterrupted survival. Earlier contract tenure is separate context, not evidence of complete subscription survival history.
- Unobserved pre-2019 billing and not-yet-reached future cohort years remain unavailable.
- Longevity: average/median active age; 3+/4+/5+ proportions and related net ARR; observed completed lifetime of churned customers where dates are supported.
- Treat current customers as ongoing relationships; do not mix their incomplete lives into completed churned-customer lifetime.
- Historical Customer Value: cumulative observed net invoiced revenue from 2019 onward, with coverage start and partial-life label where required.
- Extend this observed customer-value analysis with the required history-informed expansion and revenue-based CLV model in Phase 6. Use Circularo's net revenue after contractual channel discounts, not profit or margin. Keep finite-horizon estimates distinct from full-lifetime estimates.

## 10. Phase 6 — existing-customer growth potential, forecast, and customer value

### A. Demonstrate existing-customer expansion from historical evidence

This is a dedicated deliverable, not only a pipeline summary. Assess what the historical record supports before applying assumptions about future growth.

1. Measure customer-level and original-cohort recurring-value development on the invoice-backed basis: expansion frequency, magnitude, timing after acquisition/renewal, repeat expansion, contraction, churn, and retained cohort value. Use comparable observation windows and show counts, medians/ranges, and concentration rather than only an average growth rate.
2. Include lost and contracting customers in the eligible historical populations; show survivor-only development separately and label it. Do not present growth among today's largest accounts as the expected result for all customers.
3. Where evidenced, distinguish volume/seats/usage growth, product upgrades, added modules/entities, pricing changes, and FX. Do not infer seats, user adoption, product penetration, or addressable departments from revenue alone.
4. Identify comparable customer groups by relevant business characteristics and tenure, subject to sample size. Map cohort/peer expansion patterns to each key customer's current stage as a **history-informed scenario**, not a causal prediction or a guaranteed entitlement to grow.
5. Create key-account scorecards: observed billing/recurring trajectory, relationship age, current net contractual ARR, products/deployment, past expansion events, supported growth drivers, renewal/downside risks, named opportunities, and forecast value by scenario. Select key accounts using transparent concentration/strategic criteria, with management nominations labelled.
6. Quantify remaining account headroom only where evidence supports a denominator, such as licensed versus addressable seats/entities or a documented rollout. Historical growth alone supports a scenario range, not a precise account market size. Leave unsupported headroom unknown.
7. Show existing-base growth potential separately from new-logo acquisition: retained baseline, signed expansion, open expansion pipeline, and additional history-informed potential. The latter is not automatically added on top of the former; apply the overlap rules below.

**Output:** a separate existing-customer growth exhibit, key-account growth evidence table, and traceable assumptions for the forward customer-value model. Report evidence that weakens the growth thesis as well as evidence supporting it.

### B. Build a separate forecast layer

Confirmed frequency: yearly forecast inputs and outputs, not monthly forecast maintenance. Proposed default: three annual periods with cumulative one-/two-/three-year revenue-value views and downside/base/upside scenarios; final year convention, cutoff, and horizon remain subject to review. The revised layout sample uses fictional calendar-year 2027–2029 examples, not an approved business forecast. For a partial cutoff year, separate actual-to-date from forecast remainder. Keep monthly historical service-period facts for retention; they do not require a monthly forward input grid. Use a dated forecast version; preserve historical actuals unchanged when assumptions change.

| Evidence layer | Meaning | Treatment |
|---|---|---|
| Historical actuals | Posted billing and invoice-backed service-month KPIs through the cutoff | Read-only historical facts; never populated from pipeline |
| Current contractual baseline | Effective net recurring commitments at the stated baseline date | Opening contractual forecast run-rate; reconcile to the headline, not directly to a differently based historical MRR close |
| Signed forward changes | Evidenced future starts, expansions, price steps, terminations, and contractual renewals | Separate signed schedule; apply actual effective dates and conditions, not a generic sales probability |
| Open pipeline | Named opportunities/quotes for renewals, expansion, reactivation, and new logos | Separate unweighted and probability-weighted scenarios, with source/stage/as-of date |
| Additional modeled growth | History-informed or management-provided assumptions not already represented above | Explicit assumptions with ranges and provenance, never presented as committed pipeline |

Maintain a bridge explaining differences between the last historical invoice-backed MRR and the opening contractual forecast MRR (billing/service timing, attribution coverage, current price, and FX). Do not splice them into an apparently homogeneous series. Forecast in-year service revenue and invoicing are projected measures, not invoice-backed actuals or accounting-recognized revenue. Service dates or an explicit part-year assumption determine annual revenue; a midyear start does not generate a full year of revenue even when its full annualized value is included in year-end ARR.

Required forecast input fields:

- stable economic-event, source record and customer/prospect IDs; forecast year/version/scenario; end-customer identity, issuing entity, and channel;
- source type and evidence level: signed contract, CRM opportunity, quotation, management assumption, or historical model;
- deal type: baseline renewal, incremental expansion/cross-sell, reactivation, or new logo;
- net recurring amount payable to Circularo, separately labelled end-customer value, currency, billing interval, and one-time amounts;
- whether the quoted amount is a full replacement contract or an incremental uplift;
- expected close date, service start date, contract term/end date, renewal timing, and billing cadence; preserve unknown dates;
- probability, probability meaning/scale, stage, forecast category, source owner, as-of date, and last review date;
- linked quote/opportunity/order/contract IDs, replacement or mutually exclusive group, and scenario inclusion/overrides.

Validate x_studio_probability and weighted fields before use; never multiply an already weighted amount by probability again. Separate expected close from service start: an opportunity does not generate a full year of revenue merely because it is expected to close during that year. A 100% CRM probability alone is not proof of a signed contract.

For new prospects, preserve a prospect key and unresolved end-customer status until identity is known; do not count the reseller as the new logo. Missing net channel economics remains unresolved, not a default conversion from end-customer price.

### C. Calculation and overlap rules

- Start the contractual run-rate forecast from the reconciled current net contractual baseline. Apply signed changes, supported term/renewal assumptions, contraction/churn risk, incremental expansion, reactivation, and new business at their effective dates. Do not roll all expiring contracts indefinitely without an explicit renewal assumption.
- Show existing-base renewal separately from incremental growth. Replacing a 100-value contract with a 120-value renewal adds 20 of expansion, not 120 on top of the retained 100.
- Link duplicate CRM opportunities, quotations, amendments, and signed orders. One economic event may enter each scenario only once; signed conversion removes/replaces its pipeline representation.
- Do not stack a generic historical expansion rate on the same customer/year/components already covered by named growth. Either use a baseline-only history scenario or explicitly identify residual, non-overlapping additional opportunity. Show the chosen method.
- Model renewal survival and expansion consistently. Do not apply both a historical NRR multiplier and separate churn/expansion assumptions to the same baseline. Do not count a renewed customer as a new logo.
- For a simple opportunity, expected annual incremental revenue is probability of realization × incremental net annual recurring value × the supported in-year service fraction. Closing incremental ARR separately tests whether the component is active at year-end. Model close/start timing separately where evidence permits. Weight conditional expansion consistently with customer retention, rather than treating retained base and lost-customer expansion independently.
- Use transparent low/base/high assumptions for probability, start delays, renewal, expansion, and contraction. These are scenarios, not statistical confidence intervals unless justified. Preserve source probabilities and management overrides separately; do not invent probability values to fill missing data.
- Show unweighted named pipeline, weighted expected contribution, signed-only schedule, and the final selected scenario separately. These are alternative views/layers, not amounts to sum indiscriminately. Mutually exclusive opportunities must not produce impossible combined outcomes.
- Keep recurring run-rate, forecast in-year service revenue, and forecast invoice-date billing separate. ARR is a point-in-time annualized rate, not additive revenue over years. Derive billing only from supported billing schedules or labelled assumptions; cash collections remain outside scope. Reconcile annual opening ARR plus changes to closing ARR; use timing-weighted revenue for the year, not closing ARR as a revenue substitute.
- Use an explicit forecast FX assumption, proposed constant rates at the forecast baseline date with optional sensitivity; preserve original currency and do not alter historical invoice-date FX.
- Reconcile customer-year forecast details to existing/new-customer summaries, annual scenario bridges, and concentration metrics. Show how much forward growth depends on the largest accounts and on uncertain assumptions.

### D. Revenue-based customer value / CLV framing

CLV in this project is **revenue-based**, as clarified by Josef. It measures Circularo's net customer revenue, not gross profit, contribution margin, cash flow, or end-customer gross spend. Cost/margin modeling is outside scope.

Present three separate panels per customer/cohort:

1. **Observed Historical Customer Value:** cumulative net invoiced revenue within available coverage, with partial-life disclosure.
2. **Forecast Customer Revenue Value (annual and cumulative horizon):** expected future net service-period revenue under each scenario, separating retained base, expansion, and other sources. Proposed cumulative one-/two-/three-year views must label exact dates and any partial year. This is finite-horizon modeled revenue, not proven lifetime value.
3. **Revenue CLV / modeled total customer revenue:** observed customer revenue plus expected remaining customer revenue, only after aligning the measurement basis and removing overlap. A full-lifetime estimate requires defensible remaining-lifetime/retention and expansion assumptions; any tail beyond the explicit forecast horizon must be separate and reviewable. If those are not supportable, report **observed revenue plus modeled finite-horizon value**, with partial historical coverage and exact forecast dates explicit, rather than claiming a complete lifetime estimate. No invented pre-2019 revenue or arbitrary perpetual growth.

Keep historical billing and forward service revenue side by side. Do not add them into a single lifetime total without reconciling their basis, coverage, and advance-billing overlap. Prefer a common service-period revenue basis for a combined value if supported; otherwise retain separate panels. The primary revenue-value view is undiscounted and labelled accordingly; a discounted revenue sensitivity is not needed for the initial scope. Do not sum ARR values over time to produce CLV. Do not use ARPA/churn as a substitute for the customer-level evidence in a heterogeneous, concentrated portfolio.

Use history to calibrate retention/expansion with adequate observation and sample size; include current customers as right-censored/ongoing rather than completed lifetimes. Backtest simple history-informed projections against later observed periods only where the needed inputs were knowable at the original cutoff, without the excluded log or future-data leakage. Compare with a transparent flat/retention-only baseline; if evidence is inadequate, label the forecast unvalidated rather than promising predictive accuracy.

**Completion condition:** the workbook can ingest reviewed pipeline/forecast inputs and recompute customer/scenario outputs without rewriting the historical model. Populate supported available inputs after source validation. Missing account plans or probability history do not justify fabricated forecasts: deliver explicit gaps, editable inputs, and separately labelled scenarios, with material business assumptions routed for review before investor use.

## 11. Phase 7 — investor questions and exhibits

| Exhibit | Main question | Measures and supporting detail |
|---|---|---|
| 1. Revenue and recurring value | How much revenue is recurring and contractual? | Headline net contractual ARR, separately labelled end-customer ARR; historical billing and invoice-backed MRR/ARR trends, YoY and matched YTD |
| 2. Historical recurring bridge | Does growth come from new or existing customers? | Invoice-backed new, reactivated, expanded, contracted, churned; FX sensitivity if feasible; clearly dated and reconciled |
| 3. Retention | How durable is the opening customer base? | Invoice-backed GRR/NRR and subscription logo retention/churn; optional constant-currency sensitivity; populations and coverage |
| 4. Cohorts and expansion | Do original customers expand over time? | Cohort billing development, supported logo survival, expanding/stable/contracting customers |
| 5. Longevity and historical value | How long and how valuable are relationships? | Median/average age, 3+/4+/5+ net ARR, observed cumulative invoiced value |
| 6. Revenue mix and contract quality | What makes the revenue predictable? | Recurring/services, reporting Edition/Plan, deployment/API, cadence, term, advance billing where verified |
| 7. Concentration | Where does revenue dependency sit? | Top 1/3/5/10, end customer and group, country, segment, partner, shared-service context |
| 8. Geographic and channel development | Where is growth strongest and best retained? | UAE, KSA, Other GCC, EU, Rest of World; Direct/Indirect; partner contributions and eligible retention |
| 9. Existing-customer growth potential and value | What does customer history support about future expansion? | Observed expansion/retention, key-account drivers and risks, comparable-cohort evidence, supported headroom, annual and cumulative finite-horizon customer revenue value |
| 10. Forecast and pipeline bridge | How could the business grow from the current base? | Signed versus open/modelled growth; existing versus new customers; net ARR/MRR and projected revenue/billing by downside/base/upside; timing, concentration, and assumption sensitivities |

Supporting analyses:
- end-customer revenue and recurring-value histories;
- channel economics and the difference between end-customer value and Circularo's net value;
- cross-dimensional cuts requested in the brief;
- strategic accounts and shared-service environments, with actuals, signed forward commitments, and qualitative expansion potential separated;
- recurring versus one-time item classification;
- contract duration distinct from billing cadence and prepayment;
- a traceable response to each of the brief's 20 investor questions.

Label invoice-date billing movements, service-month recurring movements, and contractual run-rate comparisons separately. Propose a clearly disclosed stability tolerance based on rounding/measurement precision; show raw changes, and do not use an arbitrary commercial threshold to hide contraction.

Always display customer count and relevant ARR/revenue denominator with segment comparisons. Flag small groups, inspect outlier dependence, and avoid causal or statistical claims the sample cannot support. Assess the investment thesis component by component rather than assigning a predetermined conclusion.

## 12. Phase 8 — Excel design and delivery

One primary workbook, provisionally named:
**Circularo Investor Customer Revenue & Retention Analysis.xlsx**

Proposed worksheet groups, consolidated where that improves usability:

| Worksheets | Purpose |
|---|---|
| Overview | Concise findings, contractual headline, historical invoice-backed trends/bridge, selected period and units; bases clearly separated |
| Retention & Cohorts | Retention, cohort development, longevity and existing-customer expansion |
| Mix & Concentration | Revenue quality, concentration, geography, channels, product/deployment mix |
| Strategic Accounts | Major-account history, net recurring value, context and explicitly separate opportunities |
| Growth & Customer Value | Historical expansion evidence, key-account growth potential, and separately labelled observed/forward customer value |
| Forecast & Scenarios | Annual existing/new-customer forecast, opening/closing net ARR versus in-year revenue, signed/pipeline/modelled components, scenario selection, bridges and sensitivities |
| Pipeline Inputs | Editable/importable named opportunities and quotes, probabilities, amounts, dates, source links and overlap controls |
| Forecast Assumptions | Versioned history-informed and management assumptions, downside/base/upside parameters, FX/horizon controls, and evidence/approval status |
| Forecast Detail | Customer/component/year/scenario calculations, timing assumptions, separate recurring and one-time amounts, and lineage back to each input |
| Customers | End-customer master and customer-level summary, including Odoo Recurring Plan names separate from raw/reporting Edition; distinct active-plan list for customers with multiple contracts |
| Customer Periods | Invoice-backed customer-month facts and visible retention/bridge calculations; contractual snapshots separately labelled |
| Contracts | Eligible intervals, net/end-customer pricing, cadence, dates, source ARR comparison |
| Invoice Lines | Scoped line-level net revenue, attribution, original values and lineage |
| Service Allocations | Invoice-line/customer/month allocation, recurring discounts/credits, date and FX quality; full-horizon and timing checks |
| Mappings & FX | Source-to-reporting classifications, identity decisions, currency rates, controls |
| Checks | Independent reconciliations and data-quality exceptions |
| Methodology | Definitions, sources, coverage, source-selection rationale, refresh method and limitations |

This is a proposed structure, not a requirement to create a tab for every question or duplicate finished tables.

Preserve exact plan IDs/names and billing intervals on Contracts. Customer-level multiple-plan display must not multiply monetary measures. The limited sample labels its plan as selected-contract context, not a complete current-plan inventory.

Repository implementation follows TASK.md: staged `sql/` folders, `scripts/` for reproducible generation, existing `outputs/`, and stable evidence paths. No duplicate PROJECT.md or competing output/ folder is needed. Freeze actuals, annual forecast inputs, assumptions, FX and model versions under one run manifest. Cleanup is an inventory/review step, not automatic deletion of reporting evidence or dependencies.

Workbook principles:

- outputs first, useful calculations and detail afterward;
- typed dates, numbers, currencies and percentages;
- visible formulas for workbook-level aggregation, bridges, and rates;
- substantial source normalization/reconstruction retained as reproducible local code and clearly labelled imported facts;
- original source values preserved alongside transformations;
- zero, unknown, unavailable, and not applicable kept distinct;
- readable tables, filters, freeze panes where useful, and clear printed/exportable exhibits;
- supported, editable Excel charts or an export-compatible bridge presentation;
- no hidden assumptions, spreadsheet macros, live credentials, or unexplained external links;
- customer names allowed in the internal review workbook; external disclosure is not yet approved.
- separate actual/forecast styling and a visible cutoff, with consistent legends and monetary-basis labels;
- editable forecast inputs clearly distinguished from formulas and historical actuals; scenario changes must not overwrite source facts;
- a documented refresh/import workflow for pipeline and assumptions, preserving forecast versions and source dates within the working folder.

Local supporting work will remain under work/m-capital in purpose-specific subfolders such as sources, queries, scripts, derived, and previews. Runtime/dependency symlinks, temporary files, and caches must also stay within this boundary. Source Downloads workbooks are read-only; any retained copies belong inside this folder. No additional top-level repository trees or production datasets are created.

## 13. Validation and acceptance criteria

### Data and scope

- Only company IDs 2/3/5 enter financial totals.
- Intercompany exclusions have explicit IDs and evidence.
- No queried analytical source or selected downstream dependency uses sale_order_log.
- Record IDs/bridge pairs are unique at their declared grains, or duplication is resolved through documented source-version logic.
- Every eligible invoice line is represented once in the revenue baseline, including an unresolved-attribution category where needed.
- Allocation weights sum to one for allocated lines; total revenue is conserved.
- Unknown classifications and missing FX remain visible with affected counts and amounts.
- Missing-FX fallback amounts are flagged provisional and distinguished from validated USD amounts; no material missing exposure is disguised as a complete headline.

### Financial and lifecycle

- Header/line invoice totals reconcile in original currency within documented currency rounding rules.
- Credit notes reduce revenue exactly once; header amounts are not multiplied across lines.
- Recurring + non-recurring + unclassified equals invoiced revenue.
- Net contractual prices reconcile to actual commercial/billing evidence; no duplicated channel discount.
- MRR * 12 equals ARR on the same selected basis within calculation precision.
- Full-horizon service allocations reconcile to each recurring invoice line; calendar-period timing differences and applicable ledger differences are explained separately.
- Each historical invoice contribution retains its invoice-date FX across service months.
- Opening invoice-backed ARR matches the previous close on the same basis, with explicit restatement treatment.
- Invoice-backed bridge balances; logo counts reconcile under the declared endpoint convention. Contractual headline and invoice-backed ARR are never substituted for one another.
- NRR/GRR use the same opening cohort and invoice-backed FX basis; supplementary constant-currency results are labelled. GRR cannot exceed 100% under the chosen nonnegative-MRR definition.
- Negative customer-month values and missing service periods are resolved or excluded with quantified coverage, never silently clamped or treated as zero.
- Historical results do not carry current price/state backward without evidence.
- Renewal predecessors, upsells, multiple simultaneous contracts, pauses, reactivations, and future starts are handled explicitly.
- Small-cohort/partial-period and pre-coverage limitations are disclosed.

### Workbook and investor claims

- Spot-check source-to-exhibit traceability for direct and indirect deals, multiple contracts, renewals, refunds, multi-year billing, missing links, and multiple currencies.
- Independently recompute representative headline totals and rates.
- Recalculate formulas, scan errors, verify chart ranges and totals, and inspect every worksheet visually.
- Confirm blank versus zero handling, period cutoff boundaries, stable IDs after sorting, and currency precision.
- Preserve aggregate sample discrepancies in a reconciliation table; matching the samples is not a substitute for source correctness.
- Quantify material unresolved issues and withhold affected investor metrics rather than implying completeness.
- Finish with findings that distinguish observed facts, derived measures, and inference.

### Forecast and customer-growth analysis

- Forecast opening contractual run-rate reconciles to its dated headline baseline; the difference from invoice-backed historical MRR is explained, not hidden.
- Historical outputs are unchanged when forecast inputs or scenarios change.
- Annual opening-to-closing ARR bridges reconcile; partial-year and leap-year revenue timing is tested, with no sum of ARR across years.
- Customers show sourced Recurring Plan names and preserve multiple-plan context without duplicated revenue.
- Every forecast contribution has customer/prospect, component, scenario, source/evidence, amount basis, and effective-date lineage.
- Probability scale/meaning is verified; missing probability is flagged; already-weighted source values are never weighted again.
- Quotation/opportunity/order representations, renewals, and full-value versus incremental uplifts do not duplicate baseline or growth.
- Signed changes, pipeline, and history-informed growth have explicit overlap rules. Generic NRR/growth assumptions are not stacked with their own churn/expansion components.
- Revenue starts on the supported assumed service date, billing follows its separate schedule, and one-time fees never enter ARR.
- Customer-level calculations reconcile to aggregate scenarios; zero-pipeline, delayed-start, renewal-loss, and no-growth test cases behave as documented.
- Existing-customer growth evidence includes churn/contraction, comparable periods, sample sizes, concentration, and survivor-bias limitations.
- Customer value/CLV is revenue-based, never profit-based. Finite-horizon versus full-lifetime estimates, historical coverage, survival/expansion assumptions, and any modeled tail are explicit; historical/forecast advance-billing overlap and ARR summation cannot inflate value.
- Forecast accuracy claims require valid out-of-time testing; unsupported inputs and unvalidated scenarios remain visible, not certified investor expectations.

## 14. Decisions handled during execution

The goal and principal scope are clear. These evidence-dependent matters do not prevent approving this plan:

| Matter | Proposed handling |
|---|---|
| Authoritative sales-order copy | Confirmed: September 6, 2026 canonical generation 176; frozen and verified in sandbox |
| Final cutoff | Confirmed: August 31, 2026 billing; September 6, 2026 contractual portfolio. Completeness remains independently assessed |
| Net channel pricing | Follow actual Circularo contractual consideration; reconcile source fields to invoices and terms |
| FX | Invoice-date FX for billing and historical service contributions; stated snapshot-date FX for contractual ARR; optional separately reconciled constant-currency sensitivity |
| Missing FX | PDF fallback=1 retained as flagged provisional data, not silently included in validated USD totals |
| Historical KPI availability | Prove invoice/service-month coverage period-by-period; publish unavailable/subset coverage honestly; contracts alone do not establish past financial KPI values |
| Service-period edges and credits | Validate inclusive dates, partial-month allocation, discount allocation, reversals/rebills, and late billing; surface material unresolved choices |
| Billing versus service reconciliation | Conserve value over the full service horizon and explain calendar-period differences through a timing bridge |
| Sample export filters and year axes | Investigate only as needed for aggregate comparison; do not block source-supported work |
| Customer/segment exceptions | Propose named mappings with evidence; seek business judgment only for material unresolved cases |
| Paused and expired-but-in-progress contracts | Use actual contractual obligation/renewal evidence; keep unsupported cases separate |
| External customer-name disclosure | Decide before investor distribution; internal review remains confidential |
| Forecast horizon | Yearly frequency confirmed; proposed three annual periods, with exact calendar/fiscal-year convention, cutoff, and horizon still to confirm |
| Forecast/pipeline source | Validate available Odoo opportunity/quotation/contract inputs; add only explicitly supplied management/account-plan inputs |
| Forecast probability and timing | Preserve source values; calibrate from valid history where available; material overrides/ranges require business review |
| Key-customer growth | Use observed expansion and comparable cohorts; quantify headroom only with evidence, otherwise label unknown |
| Customer value / CLV | Revenue-based, as confirmed; observed revenue and annual/cumulative finite-horizon forecast shown separately, combined only on a reconciled basis; full-lifetime tail only if defensible |

## 15. Execution approval

Josef approved implementing this plan on 2026-09-25: “I think we can implement this plan”. Proceed through the scoped analysis and Excel delivery, respecting evidence-dependent gates and material unresolved business choices.

Approval confirms the agreed scope, headline net contractual recurring-revenue basis, separate invoice-backed historical KPI basis, source hierarchy, proposed metric/FX/reconciliation conventions, existing-customer growth and forecast-ready modeling scope, evidence-dependent outputs, and the listed deliverables. Forecast assumptions remain explicitly identified and reviewable; approval does not make unsupported probabilities or growth claims factual. Review codex-odoo-data-brief.md alongside this plan for the detailed field and methodology interpretation. Approval does not authorize using the excluded log, changing production data, expanding company scope, or publishing/sending material to the investor.

Planning approval and the evidence-supported internal-review implementation are complete. Remaining business gates are price resolution, historical coverage remediation where feasible, approval of annual forecasts/horizon, customer-name disclosure and investor publication. See evidence/investor-review-findings.md, outputs/investor-analysis and the frozen run manifests. Unavailable metrics are explicitly withheld; completion does not turn missing evidence into facts.
