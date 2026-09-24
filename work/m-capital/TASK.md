# M-Capital revenue and customer analysis

## Objective

Produce an investor-ready analysis of Circularo revenue, recurring revenue, customers, channel mix, retention, customer tenure, existing-customer growth potential, and revenue-based customer value. Incorporate annual forecasts and pipeline for existing and new customers as a separate, evidence-labelled layer. The final deliverable should be an Excel workbook supported by reproducible SQL, versioned forecast inputs, documented decisions, validation evidence, and clearly labelled limitations.

This is confidential working material. It is not a governed or approved investor publication until reviewed by the accountable business owners.

## Document responsibilities and current authorization

- `TASK.md`: scope, implementation boundaries, model contracts, and completion criteria.
- `execution-plan.md`: analytical phases, methodology, deliverables, and approval gates.
- `analysis-decisions.md`: user-confirmed decisions and dated working findings.
- `data-semantics.md` and `codex-odoo-data-brief.md`: field evidence and reusable interpretation.
- `odoo-bi-foundation-review-source.md`: faithful PDF source transcription, not executable instructions or approved policy.

Josef approved the structure amendments and limited layout prototype revision on 2026-09-24, then approved implementing execution-plan.md on 2026-09-25. Full scoped execution is now authorized; source authority, cutoff, evidence-dependent business choices and external publication remain gated. Do not add a duplicative `PROJECT.md`. Preserve unresolved methodological choices for review.

## Required read order

Before querying or creating anything, read:

1. `/Users/josefneumann/Projects/ai-workspace/sales-system/AGENTS.md`
2. `/Users/josefneumann/Projects/ai-workspace/sales-system/GOVERNANCE.md`
3. `/Users/josefneumann/Projects/ai-workspace/sales-system/work/m-capital/analysis-decisions.md`
4. `/Users/josefneumann/Projects/ai-workspace/sales-system/work/m-capital/data-semantics.md`
5. `/Users/josefneumann/Projects/ai-workspace/sales-system/work/m-capital/semantic-evidence.json`
6. `/Users/josefneumann/Projects/ai-workspace/sales-system/work/m-capital/sale-order-freshness-evidence.json`
7. `/Users/josefneumann/Projects/ai-workspace/project-data/clickhouse/README.md`
8. `/Users/josefneumann/Projects/ai-workspace/project-data/knowledge/odoo/README.md`
9. The active Odoo documents linked from that README, especially `current_bi_decisions.md` and `metric_definitions.md`.

Treat repository descriptions as contextual evidence. Confirm material fields, formulas, table freshness, row grains, and deployed view logic against live ClickHouse before relying on them.

## File boundary

Create or edit task files only under:

`/Users/josefneumann/Projects/ai-workspace/sales-system/work/m-capital`

Do not create files elsewhere. The `work/` directory is non-canonical and Git-ignored under repository governance. If durable version-controlled SQL is later required, propose a governed promotion separately; do not perform that promotion without explicit instruction.

## ClickHouse safety boundary

- Source databases such as `raw_odoo`, `analytics`, `mart`, `mart_sales`, and `mart_finance` are read-only for this task.
- Create views or tables only in the existing `sandbox` database.
- Every project-owned ClickHouse object must start with `m_capital__`.
- Use fully qualified object names in all SQL.
- Do not create another database.
- Do not change, replace, or drop source or production analytical objects.
- Maintain cleanup SQL that lists every object created by this project.
- Use bounded discovery queries, execution timeouts, result limits, and scan limits.

## Business scope

### Companies

Include only:

- `company_id = 2`: Circularo International Ltd; parent company per Josef.
- `company_id = 3`: Circularo Europe s.r.o.; current Europe entity.
- `company_id = 5`: Circularo Mena - FZE.

Exclude all other companies, including:

- `company_id = 4`: NEPOUZIVAT Circularo Europe s.r.o.
- `company_id = 8`: CIRCULARO DIGITAL INFORMATION TECHNOLOGY L.L.C.

Exclude intercompany transactions. Include external end-customer business even when a reseller or distributor is the billed party.

**Circularo Digital is an external reseller, not a group company (Josef-confirmed).** Its company record 8 is excluded only as an issuer. Eligible sales issued by companies 2/3/5 and billed to its partner record 231 remain included external indirect business, attributed to the end customer. Presence in `res_company` or a Circularo-like name does not establish group ownership.

### Time coverage

- Use all available permitted sales-order/subscription history. First-contract dates reach 2016.
- Invoice reporting starts on 2019-01-01.
- Apply an explicit reporting cutoff; never infer it from the current date.
- Exclude future-dated documents beyond the selected cutoff.
- Record the source extraction timestamp and business cutoff independently.

### Metrics

Analyse:

- Circularo's net contractual ARR and MRR as the headline; end-customer recurring value separately labelled.
- Invoice-backed historical MRR and retention, kept distinct from contractual snapshots.
- Invoiced revenue from posted customer invoices and credit notes, excluding tax.
- Customer counts and concentration.
- Customer tenure supported by permitted contract history.
- Direct versus indirect sales.
- Edition, entity, customer, geography, product, and channel mix where supported.
- Odoo Recurring Plan in customer reporting, distinct from Edition, billing cadence, and contract duration.
- Historical existing-customer expansion and downside, including key-account growth evidence.
- Annual forecasts and existing/new-customer pipeline, with signed, open, and assumption-driven values separated.
- Revenue-based customer value/CLV, distinguishing observed history from finite-horizon forward revenue.

All monetary measures, including forecasts, pipeline, end-customer value and CLV, exclude VAT and other sales taxes. CLV is based on Circularo's net revenue, not profit or margin.

Accounting-recognized revenue and cash collections are outside the initial scope unless added explicitly.

### Prohibited source

Do not query, reference, derive from, or use:

`raw_odoo.sale_order_log`

Do not use any downstream dataset whose relevant metric depends on `sale_order_log`. Historical ARR movement, churn, expansion, contraction, or retention must be reported only when permitted contract and invoice sources support the relevant periods. Otherwise mark the metric unsupported.

## Source selection — resolved 2026-09-25

Josef approved the September 6 canonical snapshot, clearly dated. Reinspection on September 25 found the previously populated September 20 copy empty. Use only the coherent September 6 generation 176 sources for this run. The comparison below records the earlier discovery, not current row counts. Local frozen extracts and hashes are in evidence/m_capital_20260925_g176/source-manifest.json. Josef confirmed September 6 portfolio and August 31 billing cutoffs. Scoped sandbox access is verified and all 13 source tables are frozen and reconciled there; warehouse-manifest.json records completion. The approved intercompany exclusion set is commercial partners 8/9/10/11/663; Circularo Digital 231 remains external. Apply approved-decisions.json over earlier provisional annotations. No alternate warehouse database is authorized.

### Earlier freshness evidence

Two complete physical `sale_order` tables were discovered:

| Table | Unique IDs | Latest Airbyte extraction | Latest Odoo `write_date` |
| --- | ---: | --- | --- |
| `raw_odoo.sale_order` | 2,665 | 2026-09-06 13:32:46.972 UTC | 2026-09-06 07:00:12.525 UTC |
| `raw_odoo.raw_odoosale_order689610d66db10629507fbdb2a9dc9f0d` | 2,695 | 2026-09-20 13:33:18.728 UTC | 2026-09-20 07:07:50.528 UTC |

Deployed analytics views reference the older canonical table. Establish why the newer Airbyte-generated table exists, whether similar parallel tables exist for all required sources, and which coherent Airbyte table set is authoritative. Do not combine generations opportunistically. Record the chosen source set and evidence before building metrics.

`_airbyte_extracted_at` is replication time. Odoo `write_date` is source-record update time. Preserve both concepts.

## Confirmed semantics

### Customer and channel

- `sale_order.partner_id` is the order customer and intended end-customer identity.
- `sale_order.partner_invoice_id` is the invoice recipient.
- Roll the end customer through its own `res_partner.commercial_partner_id` where present.
- Preserve end customer, commercial partner, invoice party, reseller, distributor, and issuing company as separate identifiers.
- Never use customer name as the identity key.
- If invoice-to-order linkage is unavailable, do not automatically certify the billed party as the end customer. Put unresolved cases into an explicit exception set.

`sale_order.x_studio_direct_sale` is computed as:

- `true` when `partner_id = partner_invoice_id`;
- `false` otherwise.

This is exact Odoo record equality. Different addresses under the same commercial organization can therefore appear indirect. Preserve the source flag and expose such exceptions separately.

`account_move.x_studio_direct_sale` uses a different computation based on invoice partner versus shipping partner. Do not treat it as interchangeable with the order-level flag.

### Reseller and distributor

- `sale_order.x_studio_reseller` is a separately assigned partner reference.
- `sale_order.x_studio_circularo_distributor` is computed from a differing invoice recipient.
- Line reseller and distributor price fields apply their respective discounts to the end-user line subtotal.
- Header reseller/distributor totals sum those line values.
- Header fields named `x_studio_reseller_discount` and `x_studio_distributor_discount` are PDF display toggles, not percentage measures.

### Edition and plan

Edition comes from:

`sale_order.plan_id -> sale_subscription_plan.x_studio_circularo_edition`

Known values are:

- Start
- Pro
- Business
- Enterprise
- Ultimate
- Support
- Other
- PoC

Keep Edition separate from plan name, billing cadence, subscription type, product category, and contract duration.

Recurring Plan comes from `sale_order.plan_id -> sale_subscription_plan.name` (use the appropriate readable translation). Billing cadence uses `billing_period_value` and `billing_period_unit`, not the name alone. Add Recurring Plan to Customers. If an end customer has multiple active plans at the reporting cutoff, show the distinct plan names and preserve exact contract-to-plan mappings in Contracts; do not pick an arbitrary plan or duplicate customer totals. For the limited sample, label the plan as belonging to the selected contract, including churned examples.

### Lifecycle and tenure

- `first_contract_date` is the first contract start date shared by a subscription and its renewal sequence.
- `origin_order_id` points to the first contract.
- `subscription_id` points to the parent contract.
- `x_studio_subscription_id` is a generated CLI identifier and is different from the integer `subscription_id` relationship.

Relevant `subscription_state` values:

| Code | Label |
| --- | --- |
| `1_draft` | Quotation |
| `2_renewal` | Renewal Quotation |
| `3_progress` | In Progress |
| `4_paused` | Paused |
| `5_renewed` | Renewed |
| `6_churn` | Churned |
| `7_upsell` | Upsell |

Do not count renewal or upsell documents as separate active customers. A churned contract does not establish customer-level churn if another contract remains active.

Customer tenure should use the earliest supported first-contract date across qualifying contract families for the resolved end customer. It does not prove uninterrupted service.

### ARR and MRR

Odoo computes `x_studio_recurring_price_usd` by converting `recurring_total` to USD using the order company and `start_date`.

Odoo computes `x_studio_arr_usd` by annualizing the USD recurring price according to the plan interval:

- year: recurring price divided by billing-period value;
- month: recurring price multiplied by 12 and divided by billing-period value;
- week: recurring price multiplied by 52.14 and divided by billing-period value.

The deployed order view calculates `mrr_usd` using order-date FX, while source ARR uses start-date FX. Existing metric guidance proposes snapshot-date FX for active recurring metrics. Do not mix these measures silently. Reconcile source ARR against calculated MRR and document the selected reporting basis.

For indirect sales, the headline basis is confirmed: Circularo's net contractual recurring revenue after applicable channel discounts. End-customer contract value is a separately labelled secondary measure. The exact payable price and FX basis still need validation. Do not describe source contract ARR as net company revenue until reconciled to invoices and channel prices.

### Invoiced revenue

Initial definition:

- customer documents only: `out_invoice` and `out_refund`;
- posted only;
- invoice date on or after 2019-01-01;
- invoice date on or before the explicit reporting cutoff;
- exclude tax;
- credit notes reduce revenue;
- exclude intercompany transactions;
- attribute to the validated end customer.

Known issue: the deployed customer-invoice header view negates `amount_untaxed_signed` for credit notes even though raw refund signed amounts are already negative. Do not use its `net_invoice_untaxed_signed` or corresponding total measure without correcting and reconciling the sign in project-local SQL.

Do not sum invoice-header amounts from invoice-line views because the header repeats across lines. Do not sum linked contract ARR across invoices because a contract can appear on many invoices.

## Repository layout

All paths are relative to `work/m-capital/`:

```text
AGENTS.md
TASK.md
execution-plan.md
analysis-decisions.md
data-semantics.md
codex-odoo-data-brief.md
odoo-bi-foundation-review-source.md
sql/
  00_discovery/
  10_sources/
  20_models/
  30_analysis/
  40_validation/
  90_cleanup/
evidence/
scripts/
sample-data/
previews/
outputs/
```

The listed directories were created at Josef's request on 2026-09-24. SQL and evidence now contain the implemented frozen-source and financial-foundation models, validation scripts and run manifests. See sql/90_cleanup/object-inventory.md for deployed objects and superseded views. Downstream analytical and workbook completion must be checked separately. Add further directories only when needed. Local AGENTS.md gives folder-specific agent instructions.

Keep existing evidence at its stable path; the `evidence/` directory is for new run evidence when needed. `scripts/` owns extraction/validation/workbook generation. `outputs/` is the existing delivery location; do not create a competing `output/` tree.

## Annual forecast and customer-value model contract

- Forecast entry: one customer/prospect or opportunity component × year × scenario/version, keyed by stable economic-event IDs. Full replacement renewals and incremental expansion are different amount bases.
- Forecast results: one end customer/prospect × year × scenario/version, with opening and closing net ARR, retained base, expansion, contraction/churn, new business, and projected in-year recurring revenue. Preserve issuer/channel components underneath without double counting end customers.
- Use yearly inputs and outputs. Monthly historical facts remain available for historical MRR and retention; no manually maintained monthly forecast is required.
- Preserve a service start/end date or explicit part-year assumption. In-year revenue is time-weighted; closing ARR is a point-in-time annualized rate. Do not equate annual revenue to closing ARR or sum ARR across years to obtain CLV.
- Use an explicit calendar/fiscal-year convention, cutoff and horizon. The revised prototype uses illustrative calendar years 2027–2029; these do not select the final reporting cutoff or forecast horizon. Split a partial cutoff year into actual-to-date and forecast remainder if used in the final model.
- Keep historical actuals, the contractual baseline, signed future changes, named pipeline, and additional modeled growth separate. Probability weighting applies once and is not evidence of signature. Link replacements and overlapping opportunities so each economic component enters only once.
- Existing-customer growth evidence: historical expansion/contraction, comparable cohorts, sample sizes, risks, and documented account headroom. Revenue growth alone does not establish addressable seats or departments.
- Customer value: observed net revenue and expected forward net revenue separately, combined only on a consistent basis without advance-billing overlap. Label finite-horizon value as such; do not invent a lifetime tail.
- Missing inputs remain explicit. A zero probability is valid; a missing probability is not zero. Preserve original currencies and a reviewed forecast FX policy.

Keep the initial input form practical: stable IDs, year, component, net annual amount, probability, service timing, inclusion, amount basis, evidence/source and overlap links. Import supporting metadata where available rather than requiring repeated manual entry. Scenario selection should drive one calculation model, with separately identified retained versions.

## SQL metadata contract

Every SQL file that creates or defines an analytical object must start with YAML-style metadata inside a block comment:

```sql
/*---
kind: view
project_id: m-capital
database: sandbox
name: sandbox.m_capital__subscription_contracts
status: exploratory
purpose: >
  Produce one validated subscription-contract row for investor analysis.
grain: "1 row per Odoo sales order"
as_of_date: "YYYY-MM-DD"
source:
  - raw_odoo.<authoritative_source_table>
depends_on:
  - sandbox.m_capital__customer_mapping
scope:
  company_ids: [2, 3, 5]
exclusions:
  - intercompany transactions
  - raw_odoo.sale_order_log
owner: Finance / Revenue Operations
created_for: M-Capital investor analysis
materialization: view
---*/
```

Include, as applicable:

- purpose;
- grain;
- source and dependencies;
- source cutoff and reporting cutoff;
- metric definition and sign convention;
- currency and FX-date policy;
- company and customer scope;
- known exclusions;
- validation expectations;
- project owner and status;
- whether the object is a view or frozen table.

## ClickHouse object naming

Suggested views:

- `sandbox.m_capital__source_sale_orders`
- `sandbox.m_capital__source_invoice_headers`
- `sandbox.m_capital__source_invoice_lines`
- `sandbox.m_capital__customer_mapping`
- `sandbox.m_capital__subscription_contracts`
- `sandbox.m_capital__invoice_revenue`
- `sandbox.m_capital__arr_mrr_snapshot`
- `sandbox.m_capital__forecast_inputs`
- `sandbox.m_capital__forecast_customer_year`
- `sandbox.m_capital__customer_growth_evidence`
- `sandbox.m_capital__customer_revenue_value`
- `sandbox.m_capital__validation_exceptions`

Use views for transparent transformations. Use sandbox tables only for frozen reporting snapshots, expensive intermediates, or reproducible Excel inputs. Frozen tables must include:

- `analysis_run_id`;
- `source_cutoff`;
- `reporting_cutoff`;
- `created_at`;
- relevant source extraction timestamps.

Freeze forecast inputs, assumptions, scenario/version IDs, forecast FX rates, transformation/workbook-builder versions, validation results and an object/file manifest alongside actuals. A live view alone is not a reproducible reporting snapshot. The prototype remains a local sample, not a certified frozen sandbox dataset.

## Implementation sequence

1. Inventory parallel Airbyte-generated and canonical tables for every required source.
2. Select one coherent authoritative source set and record the evidence.
3. Profile uniqueness, deletion/tombstone behavior, extraction generations, and freshness.
4. Create narrow project source views in `sandbox` that deduplicate source records and apply the company scope.
5. Resolve company-partner identities and define an explicit intercompany exclusion set.
6. Build end-customer and channel mapping, including unresolved exceptions.
7. Build subscription-contract and customer-tenure models without `sale_order_log`.
8. Reconcile source ARR, calculated MRR, FX bases, and channel economics.
9. Build invoiced revenue with correct credit-note signs and customer attribution.
10. Build invoice-backed historical service-period KPIs and existing-customer growth evidence only where coverage supports them.
11. Build annual forecast inputs/results for existing/new customers, with timing, probabilities, replacement/overlap controls, and revenue-based customer value.
12. Produce analytical summaries only after grain and reconciliation tests pass; keep unsupported outputs unavailable.
13. Freeze the approved project dataset and forecast inputs/assumptions in sandbox with a run ID, cutoffs, versions, and manifest.
14. Generate the Excel workbook from the frozen dataset and versioned model.
15. Verify the cleanup inventory and preserve reproducibility metadata. Do not automatically execute cleanup or delete snapshots/dependencies supporting an issued workbook; obtain approval for the exact deletion scope and retention treatment.

## Required validations

At minimum, test and report:

- one current source record per expected business ID after deduplication;
- duplicate order IDs, invoice IDs, invoice-line IDs, and bridge pairs;
- missing or conflicting end customers;
- direct/indirect flag exceptions at commercial-partner level;
- unresolved reseller or distributor attribution;
- intercompany exclusions and amounts;
- missing Edition, plan, company, currency, or FX;
- invalid or future lifecycle dates;
- active-state versus start/end-date conflicts;
- renewal and upsell double counting;
- ARR versus 12 × MRR reconciliation;
- source ARR versus net channel economics;
- posted invoice and credit-note sign reconciliation;
- unique-header totals versus line totals;
- future-dated and pre-2019 invoice exceptions;
- counts and amounts by company before and after exclusions;
- source extraction timestamps and reporting cutoff;
- confirmation that no prohibited `sale_order_log` dependency exists;
- confirmation that every created object is in `sandbox` and starts with `m_capital__`;
- Recurring Plan coverage and distinct-plan aggregation without duplicating customer revenue;
- opening-to-closing annual ARR bridges and partial-year revenue timing, including leap years;
- probability zero versus missing, duplicate keys, replacement renewals, and opportunity overlap;
- annual customer totals versus component and portfolio totals, without summing closing ARR over years;
- historical actuals unchanged when forecast inputs change;
- observed/forward customer-value basis and advance-billing overlap;
- frozen forecast inputs, FX, assumptions and model versions sufficient to reproduce outputs.

Keep exceptions visible. Do not silently impute or discard material records.

## Excel deliverable

The workbook should be generated from an identified frozen sandbox dataset and contain, subject to data support and review:

- methodology, cutoffs, scope, and limitations;
- executive overview;
- ARR/MRR by entity, Edition, channel, customer, and geography;
- invoiced revenue trends from 2019 onward;
- direct versus indirect sales;
- end-customer concentration;
- customer tenure and cohorts supported by contract history;
- Customers with Recurring Plan, Edition and exact contract-plan supporting detail;
- annual forecast inputs and customer-year results, including existing/new-customer growth and closing ARR versus in-year revenue;
- historical growth evidence, key-account opportunities and downside;
- observed revenue and finite-horizon forward customer revenue value, separately labelled;
- product and Edition mix;
- reconciliation and data-quality summary;
- detailed supporting data suitable for audit.

Do not expose customer names in the investor-facing workbook until disclosure treatment is decided. A restricted internal version may retain names if explicitly requested.

## Completion criteria

### Internal-review delivery — 2026-09-25

The evidence-supported implementation is delivered in `outputs/investor-analysis/`: one 18-sheet Excel workbook, native-export verification, formula/scenario test evidence and a frozen annual result snapshot. Contract details include exact Recurring Plan IDs/names, billing cadence, reseller/distributor IDs and eligibility. Sources and prepared facts/inputs are frozen in sandbox; the final scenario and release evidence are tracked in `evidence/m_capital_20260925_g176/investor-model/warehouse-review-manifest.json`. The final release manifest binds the workbook, source/model hashes, input versions, validation and reproduction scripts.

Financial controls and forecast tests pass. Presentation-only additions preserve the exact native financial-formula fingerprint from the full scenario-tested build. All sheets were rendered and reviewed; the saved file contains no cached formula errors. Native Excel recalculation was not exercised.

This is an **internal-review deliverable, not investor publication approval**. Five contracts require price review; net ARR is provisional. Historical coverage does not support portfolio retention or lifetime CLV, so those metrics are unavailable. Annual 2027–2029 scenarios are usable but not approved forecasts; account headroom is not invented. These evidence-dependent limitations and review actions are in evidence/investor-review-findings.md.

The task is complete when:

- the authoritative source set and cutoff are documented;
- all SQL is stored under `work/m-capital` with metadata;
- all created ClickHouse objects are project-labelled and in `sandbox`;
- metrics reconcile at their stated grains;
- exclusions and unresolved exceptions are visible;
- no metric depends on `sale_order_log`;
- the Excel workbook is reproducible from a frozen sandbox dataset;
- annual forecast inputs, assumptions, FX policy and model versions are frozen with the dataset;
- yearly forecast and Recurring Plan requirements are present, with actual/forecast separation and revenue-based customer-value labels;
- limitations and evidence are understandable to a reviewer who did not participate in this conversation;
- no files or ClickHouse objects were created outside the authorized boundaries.
