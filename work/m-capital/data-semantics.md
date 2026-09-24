# M-Capital — data structure and semantics

Status: internal working notes; preparation evidence, not investor-ready metrics.
Inspected on: 2026-09-24.
Business scope and authoritative task decisions: [analysis-decisions.md](analysis-decisions.md).
Live query evidence: [semantic-evidence.json](semantic-evidence.json).

## Confirmed scope and evidence boundary

Methodology update after the user's headline clarification and supplied PDF: Circularo's net contractual ARR/MRR is the headline; end-customer contract value is separate. Historical subscription MRR/retention follows posted recurring invoice lines allocated over validated service periods with invoice-date FX fixed. Contract dates remain tenure/context evidence, not replacement historical financial amounts. See codex-odoo-data-brief.md and execution-plan.md for the proposed implementation, including flagged provisional FX=1 treatment and service-period timing reconciliation. These are pending review; the dated field observations below remain evidence, not completed investor analysis.

Use only issuing-company IDs 2 (Circularo International Ltd), 3 (Circularo Europe s.r.o.), and 5 (Circularo Mena - FZE). Exclude intercompany transactions and all other issuing-company IDs, including Odoo records 4 and 8. This is an issuer scope, not an ownership classification. International's parent-company role is confirmed by Josef; the live res_company.parent_id values are null, so the hierarchy is not established by that column.

Ownership correction from Josef: the company-8 record does not mean Circularo Digital is a group entity. It is an external reseller (partner 231). The company-8 exclusion applies to issuing-company scope only; sales from issuers 2/3/5 billed to partner 231 remain eligible external indirect sales. The description above refers to Odoo records, not a verified ownership classification. Do not use the entire res_company partner list as an intercompany exclusion list.

September 25 decision overlay: Josef explicitly confirmed old Europe commercial partner 10 and PALAXO AUSTRALIA commercial partner 663 as intercompany. The reviewed exclusion set is 8/9/10/11/663. Billing cutoff is August 31, 2026 and contractual portfolio date September 6, 2026. These supersede the earlier unresolved scope/date notes below; see analysis-decisions.md and the run's approved-decisions.json. Other methodological limitations remain open.

Use all available permitted contract history for tenure. Invoice reporting starts at 2019-01-01. Analyse ARR/MRR and invoiced revenue, with end-customer attribution and direct/indirect segmentation. Excel is the eventual deliverable.

**Excluded source: raw_odoo.sale_order_log.** Josef explicitly states it cannot be used. Do not use event-log-derived history, movements, churn, retention, or any downstream dataset that depends on this source. Initial discovery occurred before that instruction; event-log results are deliberately absent from the retained analytical evidence.

Repository descriptions establish intended behavior. Live metadata establishes the actual custom-field definitions; view definitions establish deployed transformations. Neither alone proves historical completeness or business reporting suitability.

## Structure and grains

| Layer/object | Grain and role | Important relationships |
|---|---|---|
| raw_odoo.sale_order | Odoo sales-order record: quotations, confirmed orders, subscription contracts, renewals, and upsells | id; partner_id; partner_invoice_id; company_id; plan_id; origin_order_id; subscription_id |
| raw_odoo.sale_order_line | Sold product/component line | order_id -> sale_order.id; product_id -> product_product.id |
| raw_odoo.sale_subscription_plan | Recurring plan, billing interval, and Edition | sale_order.plan_id -> plan.id |
| raw_odoo.res_partner | Contacts and commercial organizations, including end customers and channel parties | commercial_partner_id is the commercial-entity rollup; parent_id is a contact/organization hierarchy |
| raw_odoo.res_company | Issuing/legal company and associated partner record | company IDs 2/3/5 have partner IDs 8/9/11, respectively |
| raw_odoo.account_move | Accounting document; only out_invoice/out_refund are customer invoices/credit notes | id; company_id; partner_id is the accounting/billed partner |
| raw_odoo.account_move_line | Accounting/invoice line | move_id -> account_move.id; product lines use display_type='product' |
| raw_odoo.sale_order_line_invoice_rel | Many-to-many bridge, one relationship per order_line_id/invoice_line_id pair | invoice line -> sold line -> sales order |
| raw_odoo.product_product / product_template | Product variant and product template | product_product.product_tmpl_id -> product_template.id |
| analytics.odoo_fact_orders | Enriched order view, intended one row per order | Carries source ARR, calculated USD MRR, customer, invoice party, Edition, and channel |
| analytics.odoo_fact_customer_invoice_lines | Enriched customer invoice product-line view | Sales context aggregated per invoice line; inspect attribution multiplicity |
| analytics.odoo_fact_customer_invoices | Customer invoice header and aggregated linked-order context | Linked contract ARR is contextual and must not be summed across repeated invoices |
| mart / mart_sales / mart_finance | Reporting views/projections | Reuse only after checking actual definitions and row grain |

The full sales-order population has 2,665 rows and 2,665 distinct IDs in the inspected snapshot. This includes out-of-scope companies, quotations, and cancelled records; it is not a customer or active-contract count.

Raw tables are SharedMergeTree ordered by _airbyte_raw_id, not by business ID. Do not assume the engine enforces unique source records. Check duplicate IDs and bridge pairs on every extraction; apply a documented current-record selection if required.

A key schema difference: Odoo metadata exposes sale.order.line.recurring_invoice and recurring_monthly, but neither is physically present in the inspected raw_odoo.sale_order_line. Recurring-product classification is available via product_id -> product_product.product_tmpl_id -> product_template.recurring_invoice. Do not write SQL against non-existent raw fields. Invoice lines do physically contain subscription_id, subscription_mrr, deferred_start_date, and deferred_end_date; their completeness is still to be tested.

## Customer and channel semantics

### End customer and billed party

The deployed order view resolves customer from sale_order.partner_id -> res_partner.name. It resolves the column called partner from sale_order.partner_invoice_id. Therefore the latter means invoice recipient; it does not universally mean a channel partner.

For analysis, preserve end_customer_partner_id, end_customer_commercial_partner_id, invoice_partner_id, reseller_id, distributor_id, and company_id as separate identifiers. Roll up the identified end customer through its own commercial_partner_id. Do not roll up the billed reseller and call that entity the end customer.

The invoice-line view follows the sales-line bridge to the order customer. If that link is missing, it falls back to the accounting partner's name. That fallback does not prove end-customer identity on indirect invoices. Retain an explicit unresolved-attribution category until an independent mapping is supported. Invoice partner_shipping_id is labelled Delivery Address; its presence alone is not sufficient to certify a universal end-customer fallback.

Customer identity across companies, aliases, and multiple contracts still requires reconciliation. Customer name alone is not a safe key.

### Direct Sales — verified computation

Odoo field metadata ID 16736, sale.order.x_studio_direct_sale:

- True when partner_id == partner_invoice_id.
- False when those Odoo records differ.
- The live snapshot has no nulls or disagreements with that equality test across all 2,665 orders.

This is exact record equality. Different billing-address records within the same commercial organization can consequently be classified as indirect. Such cases exist outside the current in-progress population. Preserve the source flag and flag exceptions; do not silently overwrite its meaning with a guessed classification.

The same field name on account.move (metadata ID 16738) uses a different pair: partner_id == partner_shipping_id. Order-level and invoice-level flags therefore are not interchangeable.

### Reseller and distributor

- sale_order.x_studio_reseller: separately populated many2one reference to res.partner; no custom computation is recorded in metadata.
- sale_order.x_studio_circularo_distributor: computed as partner_invoice_id when both customer and invoice recipient exist and differ; otherwise empty.
- This distributor field therefore follows the same identity distinction as the order Direct Sales flag; it does not independently classify a firm's partner-program role.
- res_partner.x_studio_is_partner exists as a Boolean, but metadata contains no help or computation establishing its operational use. Do not substitute it for the order channel flag.

## Edition, plan, and other custom fields

| Business field | Verified source and meaning | Reporting treatment |
|---|---|---|
| Edition | sale_order.plan_id -> sale_subscription_plan.x_studio_circularo_edition; Odoo selection field ID 47290 | Preserve source value: Start, Pro, Business, Enterprise, Ultimate, Support, Other, PoC |
| Billing interval | plan.billing_period_value + billing_period_unit; units week/month/year | Separate cadence from Edition and from overall contract duration |
| Subscription Type | x_studio_circularo_type_subscription; first order-line category whose ID is 6, 5, or 14 | Not synonymous with Edition; category labels and historical behavior require separate validation |
| Subscription ID | x_studio_subscription_id; generated CLI identifier, with inheritance from origin contract on renewal | Not the integer subscription_id foreign key; check nulls and uniqueness before using it as a stable contract-family key |
| Priority | x_studio_customer_priority is related to partner_id.x_studio_priority | Customer priority, not revenue or lifecycle state |
| Hosting Region | x_studio_hosting_region, selection | Hosting location, not necessarily customer's country or sales region |
| Renewal Status | x_studio_status is 'To Renew' when x_studio_renewal_triggered is true, else empty | Operational renewal flag, not subscription_state |
| Custom Subscription Status | x_studio_circularo_status_subscription maps subscription_state to its displayed label | Use raw state code for stable filtering |
| Is Expired | x_studio_is_expired compares end_date with today's date in custom code | Do not use a stored time-dependent flag to reconstruct past status |
| Contract Renewal Date | x_studio_contract_renewal_date: end of multi-year period requiring renewal/renegotiation | Not the ordinary annual billing date |
| Expected Invoice/Payment Date | Custom commercial estimates | Not actual invoice or payment dates |
| Standard Terms | x_studio_standard_terms | Terms flag, not a recurring-revenue classification |

Plan names must not replace Edition. Live examples: StarterPack Business (Annual) is Edition Start; DigiSign (Annual) and GovSign (Annual) are Edition Ultimate. Some legacy plans have null Edition. All 198 in-progress subscription orders in scoped companies have non-null Edition in the inspected snapshot; this does not certify historical Edition assignments.

## ARR, MRR, pricing, and FX

### Source custom ARR

The live metadata gives the exact computation:

1. x_studio_recurring_price_usd converts recurring_total from order currency to USD using Odoo _convert, the order company, and start_date. If currency is USD, it copies recurring_total.
2. x_studio_arr_usd annualizes that recurring price:
   - year plans: recurring_price_usd / billing_period_value;
   - month plans: recurring_price_usd * 12 / billing_period_value;
   - week plans: recurring_price_usd * 52.14 / billing_period_value.

This is a normalized recurring run-rate, not total contract value, invoice value, or recognized revenue. Multi-year billing must not be mistaken for annual revenue.

### Deployed MRR view differs in FX basis

analytics.odoo_fact_orders.mrr is sale_order.recurring_monthly. Its mrr_usd divides by sale_order.currency_rate and applies company-to-USD FX selected as of date_order. Its arr_usd passes through the custom Odoo ARR field above, which uses start_date FX.

The metric guide proposes snapshot-date FX for active recurring metrics. Three different FX anchors are consequently present: start_date, date_order, and snapshot date. Do not silently mix them or assume deployed arr_usd = 12 * mrr_usd. Preserve source ARR, reconcile the difference, and choose a clearly labelled reporting basis before final metrics.

The order view also defaults missing company-to-USD FX to 1. This is not sufficient evidence of a valid conversion for a non-USD company; missing rates must be counted and resolved.

### Channel economics

Live custom-field definitions distinguish end-user price and channel prices:

- Line reseller price = price_subtotal * (1 - x_studio_reseller_disc / 100).
- Line distributor price = price_subtotal * (1 - x_studio_distributor_disc / 100).
- Each is calculated from price_subtotal, not compounded from the other.
- Header reseller/distributor totals sum the respective line values.
- Header x_studio_reseller_discount and x_studio_distributor_discount are display toggles for quotation PDFs, not discount percentages.

Custom ARR's dependency is recurring_total, via recurring_price_usd, and does not explicitly reference the custom reseller/distributor totals. Before calling it Circularo's net revenue ARR, reconcile actual invoice economics with the recurring end-customer contract values. Josef has confirmed net contractual recurring revenue as the headline and end-customer value separately. Exact net-price selection remains to be reconciled. The supplied PDF additionally reports separate negative reseller-discount lines; verify live usage and do not double-deduct their effect.

## Lifecycle and tenure without the excluded log

Live selection values for subscription_state:

| Code | Label | Interpretation |
|---|---|---|
| 1_draft | Quotation | Not active recurring revenue |
| 2_renewal | Renewal Quotation | Proposed renewal, not a second active contract |
| 3_progress | In Progress | Candidate active contract; also validate start/end dates |
| 4_paused | Paused | Keep separate; reporting policy is not yet finalized |
| 5_renewed | Renewed | Historical predecessor, not customer churn |
| 6_churn | Churned | Closed contract state; does not prove customer-level churn if another contract remains |
| 7_upsell | Upsell | Amendment/upsell document; avoid counting as a separate customer/subscription |

first_contract_date is explicitly documented in live metadata as the start date of the first contract in a sequence, shared by the subscription and its renewals. origin_order_id points to the first contract; subscription_id points to the parent contract.

Customer tenure should use the earliest supported first-contract date across that end customer's qualifying contract families. Calculate age at a fixed reporting cutoff. Do not equate long tenure with uninterrupted service or retention.

The custom x_studio_age_months calculates elapsed days since start_date divided by 30.4. x_studio_contract_age uses the immediate parent contract's start_date when available, otherwise the current start date. Neither is a dependable substitute for full customer tenure across multiple renewals.

Live scoped checks establish:

- Earliest first-contract date: 2016-01-01 in MENA.
- 198 orders are state=sale, is_subscription=true, subscription_state=3_progress (37 Europe, 161 MENA); this is a validation population, not the finalized active portfolio.
- All have first_contract_date and start_date.
- Eight have start_date after the 2026-09-06 extraction day; four MENA in-progress orders have end_date before that day. Date/state exceptions require resolution before an as-of active metric.
- No paused rows appeared in this snapshot.
- There are also confirmed is_subscription=true records with null subscription_state and missing start_date. Preserve and investigate them as historical exceptions.

Historical invoice-backed MRR/ARR, subscription logo retention, revenue retention, churn, and expansion will be reported only where posted recurring invoice/service-period coverage supports the relevant periods, following the supplied PDF. Contract history supplies attribution and tenure context. Do not treat today's status or mutable order amount as a historical snapshot or replace the historical monetary source with it.

## Invoice semantics and material view issues

The proposed invoiced-revenue measure is posted out_invoice/out_refund amounts excluding tax, with credit notes reducing revenue, from 2019-01-01 through an explicit cutoff. Customer identity comes from validated end-customer attribution; intercompany exclusion is applied separately.

1. **Credit-note double sign reversal:** live analytics.odoo_fact_customer_invoices computes net_invoice_untaxed_signed by negating amount_untaxed_signed for out_refund. The raw data already has negative amount_untaxed_signed for all observed customer refunds. The view therefore reverses these to positive. The same pattern affects net_invoice_total_signed. Do not consume those measures as net revenue.
2. **Header repetition:** invoice-line views repeat header amounts on every line. Never sum header totals across product lines. Reconcile line-level net revenue to unique invoice headers.
3. **Context is not revenue:** linked_arr_usd_sum on invoice headers sums linked order ARR; the same contract may recur across many invoices. It is not an additive billed-revenue measure.
4. **Customer/channel aggregation:** invoice-line customer fields can concatenate multiple order customers and channel uses max(direct_flag). Multiple end customers or mixed channels require an explicit allocation/exception, not a single synthetic customer.
5. **Fallback attribution:** accounting partner fallback may be a reseller; do not certify it as an end customer without a validated mapping.
6. **FX-date difference:** invoice-line USD conversions use accounting_date. The metric guide proposes invoice_date with accounting_date fallback. Reconcile these dates before adopting a policy.
7. **Legacy mart dependency:** mart.odoo_customer_invoice_analysis points at analytics.odoo_invoice_analysis, which is absent from the live table inventory. Other legacy mart schemas have older aliases. Inspect modern analytics/mart_sales/mart_finance views before selecting a reusable base.
8. **Posting scope:** the inspected customer invoice views include draft/cancelled documents unless explicitly filtered. Apply posted scope in task extraction.

No warehouse schema or production view was changed. These are findings to accommodate in task-local analysis, not an authorization to repair the platform.

## Coverage, freshness, and intercompany checks

- The canonical `raw_odoo.sale_order` table used by deployed analytics views was extracted on 2026-09-06 13:32:46.972 UTC and contains 2,665 unique orders. A newer Airbyte-generated full copy, `raw_odoo.raw_odoosale_order689610d66db10629507fbdb2a9dc9f0d`, was extracted on 2026-09-20 13:33:18.728 UTC and contains 2,695 unique orders. Its latest source `write_date` is 2026-09-20 07:07:50.528 UTC. The canonical table's latest source `write_date` is 2026-09-06 07:00:12.525 UTC. Treat the production analytics views as stale relative to this newer copy until the Airbyte destination/table transition is understood.
- One posted MENA invoice is dated 2018-08-30. Keep it outside the agreed 2019-onward invoice window and disclose the coverage exception; its existence does not establish complete pre-2019 billing history.
- Twelve posted customer documents in companies 2/3 are dated after 2026-09-24, with dates reaching 2026-12-31. These counts are before intercompany exclusion. Future-dated postings are not evidence of future actual revenue.
- Scope IDs are 2/3/5. The associated company partner IDs are 8/9/11. Use these as initial intercompany identity anchors, also checking commercial-parent relationships and related group entities. Do not exclude an external end-customer sale merely because a reseller is billed; reseller sales are in scope.
- The full intercompany identity set, invoice-to-end-customer coverage, currency reconciliations, and historical period continuity remain analysis-stage validation tasks.
- Report cutoff, external customer-name disclosure, paused-contract policy, exact net-channel price selection/FX implementation, and the authoritative Airbyte table set are not yet finalized. The headline net contractual ARR basis itself is now user-confirmed.

## Sources and verification method

Primary verification: live raw_odoo.ir_model_fields (including compute/depends/help), ir_model_fields_selection, system.columns, system.tables/create_table_query, and bounded aggregate checks of permitted source tables. See semantic-evidence.json for exact queries/results.

Repository context:
- project-data/clickhouse/README.md
- project-data/knowledge/odoo/README.md
- project-data/knowledge/odoo/current_bi_decisions.md
- project-data/knowledge/odoo/metric_definitions.md
- project-data/knowledge/odoo/odoo_information_repository_grounding.md
- project-data/clickhouse/raw/raw_odoo/sale_order.sql and sale_subscription_plan.sql
- project-data/clickhouse/analytics/analytics.odoo_fact_orders.sql and customer-invoice views

Applied ClickHouse skill rules: agent-connect-mcp, agent-discovery-schema, and agent-query-safety. Used the connected read-only service, live schema and compute metadata, bounded result sets, scan caps, and execution limits. This was semantic preparation and limited source profiling, not a completed investor financial analysis.
