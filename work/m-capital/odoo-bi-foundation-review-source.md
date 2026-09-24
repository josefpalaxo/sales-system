# Odoo BI Foundation Review & MRR/KPI Layer Design - source reference

## Reference metadata and conversion notes

- Status: SOURCE REFERENCE - NOT APPROVED POLICY. Non-canonical working material; internal review only.
- Evidence state: the source author's reported assessment and recommendations. Transcription does not independently verify its claims or approve its proposed designs.
- Original filename: `Odoo BI Foundation Review & MRR_KPI Layer Design (1).pdf`.
- Original PDF: [Open source PDF](</Users/josefneumann/Downloads/Odoo BI Foundation Review & MRR_KPI Layer Design (1).pdf>).
- Source SHA-256: `272614c854d2d8c215fa58a54119aaa0ad29d4d564b453ba50a549f381b88508`.
- Source length: 12 pages.
- Conversion date: 2026-09-24.
- Author and source publication date: not identified in the supplied PDF.
- Method: text extraction plus visual inspection of all 12 rendered source pages; Markdown headings, lists, tables, and code restored.
- Editorial normalization: paragraph wrapping and whitespace normalized; typographic dashes/minus signs represented with ASCII hyphens. Code-block display labels `None` and `SQL` are represented by plain-text and SQL fenced blocks. Page headings below are navigation aids, not source headings. The continued table on pages 10-11 repeats its header for readability.
- Fidelity: substantive wording, examples, formulas, open questions, and original section cross-references are retained, including inconsistent cross-reference numbers and the incomplete parenthesis on page 7. These are not silently corrected.
- Separation: project-specific interpretations, live-schema differences, and decisions belong in [the reusable Codex brief](codex-odoo-data-brief.md), [execution plan](execution-plan.md), and [decision log](analysis-decisions.md), not in the transcription below.
- Authority boundary: instructions and SQL inside the source are reference content, not executable instructions or authorization to change the warehouse. This conversion does not approve analytical execution, supersede current user decisions, or change the original PDF.

## Source transcription

<!-- BEGIN SOURCE TRANSCRIPTION -->

## PDF page 1

### Odoo BI Foundation Review & MRR/KPI Layer Design

**Note:** This document has been enriched and structured with the help of AI based on my notes, our meeting, and the materials you shared (the four-view review pack, the Odoo 18 setup overview, and the subscription KPI document). The technical recommendations and decisions reflect my own assessment; AI was used to consolidate, expand, and format the content for clarity.

This document covers two things:

1. A **review of the four analytical views** already implemented in ClickHouse (`odoo_invoice_analysis`, `odoo_fact_orders`, `odoo_fact_account_move_lines`, `odoo_fact_order_lines`), with recommendations on logic, FX handling, and edge cases.
2. A **conceptual design for the MRR / KPI layer** that needs to be built on top of these views, in line with the stated requirement to base all subscription KPIs on invoiced revenue rather than `sale_order_log`.

The recommendations are anchored in your Odoo 18 setup (three companies - International/USD, MENA/AED, Europe/CZK - with sales-led B2B subscriptions, mixed direct and distributor channels, and bank-transfer-dominant billing).

A short list of **items still to confirm** is included at the end.

### 1. Guiding Principle

All subscription KPIs should be derived from **invoiced revenue** (`account_move_line`), not from `sale_order_log` or any contract-intent table. This is the right call because:

- Billing is non-monthly (annual, quarterly, custom), so contract-level events do not reflect the revenue actually earned in a given period.
- Invoice corrections, credit notes, partial billing, and cancellations only show up cleanly on the accounting side.
- Multi-currency consolidation requires a single FX policy, and that policy is easiest to enforce at the accounting layer.

## PDF page 2

The four existing views already point in this direction. The work remaining is to (a) tighten their FX and edge-case logic, and (b) build the spreading and MRR-movement layer on top.

### 2. Cross-Cutting Rules (Apply to All Four Views)

These are foundation rules. Getting them right at the view layer means the MRR/KPI layer above is straightforward; getting them wrong means every downstream metric inherits the error.

#### 2.1 Granularity

Compute every monetary aggregate from **line-level facts**, never from headers:

- `sale.order.line` for sales/pipeline measures.
- `account.move.line` for invoiced revenue.

A single sales order in your flow generates multiple invoices over time (subscription billing, upsell, renewal). Header-to-header joins double-count. Header amounts should be kept as **context fields** only, never used as the basis for KPIs.

#### 2.2 Currency layering

Every monetary value carries through three currencies, and all three should be preserved as distinct measures in every fact view:

| Layer | Source | Authority |
|---|---|---|
| Document currency | `amount_currency`, `price_subtotal` | What was agreed with the customer |
| Company currency | `balance = debit - credit` on `account_move_line` | What was posted to the ledger (statutory) |
| USD (reporting) | Derived per §2.3 | Consolidated reporting only |

For accounting lines, `debit`, `credit`, and `balance` are **always in company currency**. The document-currency amount lives in `amount_currency` (signed). USD is never stored on the line, thus it must be derived.

#### 2.3 The double-hop FX formula

`sale_order.currency_rate` and `account_move.invoice_currency_rate` represent **document → company** currency, not document → USD. Since two of the three companies are

## PDF page 3

non-USD (MENA in AED, Europe in CZK), a second conversion is always required for those companies:

```text
amount_usd = amount_document / currency_rate * company_to_usd_rate
```

`company_to_usd_rate` is read from `res.currency.rate` for the company currency on the document date.

For International (USD as company currency), the second factor degenerates to 1, and the formula still holds. Implementing only the first hop produces silently wrong values for MENA and Europe.

#### 2.4 Historical rate selection

Use **latest rate on or before the document date**, with **company-specific rates preferred over global (null-company) rates**:

```sql
SELECT rate
FROM res_currency_rate
WHERE currency_id = :doc_currency_id
  AND name <= :doc_date
  AND (company_id = :company_id OR company_id IS NULL)
ORDER BY
  CASE WHEN company_id = :company_id THEN 0 ELSE 1 END,
  name DESC
LIMIT 1
```

The `historical_company_rate_lookup` and `historical_usd_rate_lookup` CTEs referenced in the four views should both follow this pattern. *(This still needs to be confirmed - see §6, item 2.)*

#### 2.5 Missing or zero FX rate

When no rate is found, **fall back to 1.0 and flag the row** rather than excluding it or returning NULL.

- Excluding distorts totals silently.
- NULL propagates through KPIs.

## PDF page 4

- Fallback-to-1 with a `fx_rate_quality` flag (`OK` / `FALLBACK_TO_ONE` / `STALE`) keeps the row visible and audit-able.

This rule should be applied uniformly across all four views, not just at the order-line view where the `subtotal_usd IS NOT NULL` filter currently lives.

#### 2.6 Sign handling

Odoo's amount conventions need to be normalised before they reach the BI layer:

- `debit` and `credit` are always **positive**. Sign comes from which column is non-zero.
- `balance = debit - credit`. Use `balance` whenever a signed amount is needed.
- `amount_currency` is signed: positive on debit, negative on credit. Revenue (credit account) appears as **negative** `amount_currency` - multiply by -1 if "positive = revenue" semantics are desired.
- Credit notes invert these signs. If the calculation preserves the sign, credit notes will automatically reduce totals - which is exactly the behaviour required for accurate revenue.

**Recommendation:** try to centralize the sign and FX logic, so that it has to be correct in one place.

#### 2.7 Custom USD fields

Fields such as `x_studio_arr_usd` are convenient but should be treated as **trusted inputs to be reconciled**, not as untouchable source-of-truth values.

The reason is that `invoice_currency_rate` on `account_move` is **user-editable** - Odoo allows overriding the rate when a vendor used a different one. This makes the stored USD value occasionally legitimate even when it disagrees with the rate table, but it also means it can be wrong from user error.

Recommended pattern:

- Keep `x_studio_*_usd` as the displayed value so existing reports do not break.
- Compute `*_usd_recalc` in parallel from `balance × company_to_usd_rate`.
- Expose a variance flag (`abs(displayed - recalc) / recalc > 1%`) for audit.

### 3. Review of the Four Existing Views

#### 3.1 `analytics.odoo_invoice_analysis` - invoice-header grain

## PDF page 5

**Design is sound.** Anchoring on `account_move`, bridging to sales orders through `sale_order_line_invoice_rel`, and aggregating commercial context back to invoice grain is the correct pattern. Direct joins from `sale_order` to `account_move` would silently double-count.

**Confirmations:**

- `sale_order_line_invoice_rel` is the right bridge, and is populated automatically when invoices are created through Odoo's normal flow (Subscription → Create Invoice, or SO → Create Invoice).
- Invoices created manually with no SO reference will have no entries in this bridge. They appear as **orphan invoices** and should be flagged in a data-quality view rather than dropped.
- Credit notes against linked invoices inherit the bridge entries, so they correctly attribute to the originating SO.
- Excluding non-product lines (`display_type = 'product'`) inside the bridge CTE is correct for commercial-context aggregation.

**Recommendations:**

- The `linked_sale_order_amount_total_sum` field is not suitable for reliable aggregation and must not be used as a measure for KPIs. It should be kept only for reference, and this restriction must be clearly documented in the view's comment.
- Add a flag `has_so_link` (boolean) so orphan invoices are immediately filterable.
- Vendor bills (move types `in_invoice`, `in_refund`) are correctly excluded by the `move_type IN ('out_invoice', 'out_refund')` filter. Vendor bills triggered by SO-driven POs should remain out of this view - purchase-side facts belong in their own model.

**Caveats:**

- "Single-value" enrichment fields (those not wrapped in `groupUniqArray`) are only safe when uniqueness is confirmed. If one invoice can legitimately span multiple plans or partners, those fields need to become arrays or be moved to a separate detail view.

#### 3.2 `analytics.odoo_fact_orders` - sales-order-header grain

**Design is sound.** Anchoring on `sale_order` and avoiding joins to `sale_order_line` preserves the header grain. Dimension joins (partner, country, industry, company, plan, pricelist) are all naturally many-to-one and safe.

**Confirmations:**

## PDF page 6

- Including both quotations and confirmed sales orders in the same fact is the right approach. `state` (`draft`, `sent`, `sale`, `done`, `cancel`) becomes a key dimension that lets you compute pipeline (quotations), committed revenue (confirmed), and churn signal (cancelled renewal quotes - see §3.2 Caveats).
- `plan_id` is mandatory at quotation creation in your process and carries through to the subscription. It is reliable at order-header level. *(Confirm there are no orders where `plan_id` differs between quotation and subscription - see §6, item 5.)*
- `sale_order.currency_rate` is safe for the first FX hop. The double-hop in §2.3 still applies for non-USD companies.

**Recommendations:**

- Expose `partner_id` and `partner_invoice_id` as **separate dimensions** rather than picking one. They legitimately diverge in the indirect-sales flow, where the invoice partner is the distributor and the sales partner is the end client. A **contact-hierarchy dimension** built on top of both - rolling child contacts up to their parent company - removes the need to choose at query time.
- The custom fields `x_studio_subscription_id`, `x_studio_probability`, and the distributor/reseller fields should each have a documented business meaning. *(See §6, item 8.)*
- Margin structure (end-customer price, distributor discount, reseller discount) is non-trivial in your setup. The reseller-discount line is itself a `sale_order_line` with a negative amount - see §3.4. At the order-header level, recommend exposing `amount_gross` (before partner discounts) and `amount_net` (after) as separate measures when the underlying data supports it.

**Caveats:**

- Draft and cancelled orders are included, which is correct for pipeline analysis but must be filtered downstream for revenue. Standard reporting layers should expose a `state IN ('sale', 'done')` filter prominently.
- In a multi-company environment with three different base currencies, FX is the biggest numerical risk here. Validate against a small sample covering each company × currency combination.

#### 3.3 `analytics.odoo_fact_account_move_lines` - accounting-line grain

**Design is sound.** The pre-aggregation pattern (build `aml_sale_context` first, then left-join back to `account_move_line`) is exactly right. Joining sales context directly to `account_move_line` without pre-aggregation would multiply rows whenever an invoice line links to multiple SO lines.

## PDF page 7

**Confirmations:**

- `display_type = 'product'` is the correct filter for commercial-revenue analysis (when we’re talking about `account_move_line`.
- The filter does exclude tax lines (`display_type = 'tax'`) and rounding lines (`display_type = 'rounding'`). For revenue/ARR KPIs this is fine. For accounting reconciliation against the GL, those lines are needed.
- The `price_total` field provides the total tax-included amount for a given `account_move_line` commercial line.

**Recommendations:**

- **Split into two complementary views:**
  - `fct_invoice_line_commercial` - current logic with `display_type = 'product'`, for revenue and KPI work.
  - `fct_account_move_line` - no `display_type` filter, posted moves only (`parent_state = 'posted'`), for accounting reconciliation and capturing non-invoice impacts (manual journals, FX adjustments, write-offs).
- Resolve the customer/partner field. Currently both `rp` (customer) and `rp_invoice` join on `am.partner_id`, which means they always return the same record. Invoice partner should likely come from `am.partner_id` (which is the AR partner - typically the invoicing entity), while customer context comes from the sales-order link via `sale_order.partner_id`. The `coalesce(sales_ctx.customer, rp.name)` fallback is the right idea - but the `rp_invoice` join needs to actually pull a different field, or be removed.
- Add `has_so_link` and `fx_rate_quality` flags consistent with §2.5.
- The concatenated string fields (`sales_orders`, `customer`, `partner`, `plan`) are useful for descriptive analysis but unsuitable for dimensional filtering. Recommend keeping them as display fields and adding boolean/count fields (`linked_sales_order_count` already exists - good) for filter logic.

**Caveats:**

- The view mixes accounting truth with commercial enrichment. This is valuable, but downstream users need clear guidance: **balance is authoritative for accounting; the sales-context fields are descriptive only**.
- Whether `balance` reflects company currency depends on Odoo storing it that way (it does, by default). Confirm against a known multi-currency invoice before trusting it in production.

#### 3.4 `analytics.odoo_fact_order_lines` - sales-order-line grain

## PDF page 8

**Design is sound** in its anchor and joins, but the line-level filters need adjustment.

**Confirmations:**

- `display_type IS NULL` is correct for identifying real commercial lines. Section headers (`'line_section'`) and notes (`'line_note'`) are correctly excluded.
- All order-header attributes repeating on each line is standard star-schema practice - fine.

**Recommendations:**

- **Re-evaluate the necessity of the `product_uom_qty > 0` filter.** While removing this filter is recommended to include negative and zero-quantity lines (as detailed below), we must first confirm if there are any legitimate use cases requiring it to remain
- **Reconsider the final `subtotal_usd IS NOT NULL` filter.** Once the FX fallback-to-1 rule (§2.5) is in place, this filter could become redundant
- Add `is_recurring` (derived from product configuration or `plan_id`) as a first-class field. This is a hard prerequisite for the MRR layer (§4) - recurring revenue must be cleanly separable from one-off fees.

**Caveats:**

- `qty_invoiced` is null until invoicing starts. Formulas using it should `coalesce(qty_invoiced, 0)` rather than relying on null-safety from the join.
- This view inherits FX from the order header (`sale_order.currency_rate`). That is consistent with how Odoo stores line amounts in document currency, but it means a partial invoice with a different rate will not be reflected here - only on the accounting side.

### 4. MRR / KPI Layer (Conceptual Design)

The four views above provide the **revenue foundation**. The KPI layer sits above them and is where the SaaS metrics (MRR, ARR, NRR, churn, LTV) are computed. This section describes the shape of that layer at a conceptual level; concrete formulas, edge cases, and reconciliation rules belong in a follow-up specification.

#### 4.1 Source of truth

The KPI layer reads from `fct_invoice_line_commercial` (the revenue-focused split of `odoo_fact_account_move_lines`), not from sales orders or `sale_order_log`. This aligns with the stated principle that all KPIs reflect invoiced reality, not contract intent.

## PDF page 9

#### 4.2 Product classification

A clean **recurring vs. one-off** classification on every product is the hard prerequisite. Without it, MRR is wrong because one-off fees (onboarding, implementation, services) leak into recurring metrics.

The classification needs to be deterministic and stored on the product or product category - not inferred at query time. *(This is item 6 in §6.)*

#### 4.3 Revenue spreading

Invoiced revenue must be **spread across the service period**, not recognised in the month of invoice. For an annual subscription invoiced in January at $12,000, the MRR contribution is $1,000 per month from January through December - not $12,000 in January and zero afterwards.

The spreading rule is driven by `start_date` and `end_date` on the invoice line (which your process docs confirm are filled in for recurring products and left empty for one-off fees - a usefully explicit convention).

Spread amounts should be computed in USD, using the FX rate at the invoice date (not the service-month date), so that retrospective FX movements do not retroactively change recognised MRR.

#### 4.4 Customer × month MRR fact

The output of the spreading step is a single fact table at **customer × month** grain. Each row carries:

- `customer_id` (resolved through the contact hierarchy - see §3.2)
- `month`
- `mrr_usd` (recurring revenue earned that month)
- `arr_usd` (MRR × 12, redundant but convenient)
- attribution back to the source invoice lines (for audit)

This table is the foundation everything else reads from.

#### 4.5 MRR movement engine

For each customer × month pair, compare against the prior month and classify the delta:

- **New** - first non-zero MRR for the customer.
- **Expansion** - MRR increased vs. prior month (upsell, additional seats).
- **Contraction** - MRR decreased but not to zero (downsell, partial cancellation).
- **Churn** - MRR went to zero.

## PDF page 10

The classification feeds NRR, churn rates, and retention cohort analysis directly. Edge cases (multi-month gaps, reactivations, customer mergers) need explicit rules - those belong in the follow-up spec.

#### 4.6 KPIs derived from this layer

Once the customer × month fact and the movement classification exist, the standard SaaS metrics fall out:

- **ARR** - current MRR × 12.
- **NRR** - retention including expansion/contraction (formula in the follow-up spec).
- **Churn** - logo and revenue, percentage and absolute.
- **ACV** - annualised value of new business.
- **LTV** - total invoiced revenue per customer, or modelled via ARPA / churn.

#### 4.7 Reconciliation

The KPI layer must reconcile against two anchors:

1. **Total invoiced revenue** - sum of MRR contributions across all customers and months should equal total recurring invoiced revenue from `fct_invoice_line_commercial` for the same period.
2. **Accounting GL** - recurring revenue reported via the KPI layer should tie to revenue account balances from `fct_account_move_line` (with non-recurring revenue accounted for separately).

A small reconciliation dashboard should be standing once the layer is built - discrepancies above a threshold trigger investigation.

### 5. Data Quality Checks

A small set of checks should be exposed continuously:

| Check | What it catches | Where it lives |
|---|---|---|
| Orphan invoices (no SO link) | Manual invoices bypassing the standard flow | Invoice fact |
| FX fallback rows (`FALLBACK_TO_ONE`) | Missing or stale rates | All facts with USD measures |

## PDF page 11

| Check | What it catches | Where it lives |
|---|---|---|
| USD variance vs `x_studio_*_usd` | User-edited rates or rate-table drift | Invoice and SO facts |
| Cancelled renewal quotes | Churn signal that doesn't reach the accounting side | SO fact, `tag = Renewal QTN` + `state = cancel` |
| Invoice with no `start_date` / `end_date` on a recurring product | MRR will not spread | KPI input layer |
| Products without recurring/one-off classification | MRR misclassification | Product dimension |
| Multi-currency invoice with no rate found | FX gap | Invoice fact |

### 6. Items to Confirm

The following need input before the model can be considered final. None are blockers - each affects a specific filter, join, or measure.

1. **`historical_usd_rate_lookup` and `historical_company_rate_lookup` definitions.** These CTEs are referenced in all four views but not shown. Confirm they implement the rule in §2.4 (latest rate on or before date, company-specific preferred over global).
2. **Cancelled / draft documents.** Confirm we keep cancelled SOs and draft invoices in the fact tables and rely on `state` filtering downstream. For financial measures, only `parent_state = 'posted'` should count. -> already confirmed in previous meeting
3. **Vendor-side coupling.** Confirm vendor bills triggered by SO-driven POs are intentionally not linked back to the originating SO in BI.
4. **`plan_id` edge cases.** Any orders where `plan_id` is null, or where the plan differs between quotation and subscription? If yes, which side is authoritative.
5. **Product classification - recurring vs. one-off.** Where is this stored today? On the product, the category, or inferred from `plan_id`? This is the hard prerequisite for MRR.
6. **`currency_rate` direction sanity check.** Confirm a known multi-currency invoice produces the expected company-currency value with `amount / currency_rate`. This validates the formula in §2.3.
7. **Custom `x_studio_*` fields.** Particularly `x_studio_subscription_id`, `x_studio_probability`, `x_studio_arr_usd`, and the distributor/reseller fields. Each needs a documented business meaning so the views can interpret them correctly.

## PDF page 12

8. **Sample reconciliation.** A small sample of invoices covering each active company × currency combination, to validate USD formulas against finance's expected values.

<!-- END SOURCE TRANSCRIPTION -->
