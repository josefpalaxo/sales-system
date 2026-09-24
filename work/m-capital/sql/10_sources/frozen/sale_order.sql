/*---
kind: table
project_id: m-capital
database: sandbox
name: sandbox.m_capital__g176_20260925_sale_order
status: source-frozen; financial-validation-pending
purpose: Preserve approved narrow September 6 source rows without mutable-source dependence
grain: id
as_of_date: 2026-09-06
source: [raw_odoo.sale_order]
depends_on: []
scope: {company_ids: [2, 3, 5], reference_tables: complete}
source_cutoff: 2026-09-06 generation 176
reporting_cutoff: 2026-08-31 provisional; not a row filter
owner: Finance / Revenue Operations
created_for: M-Capital investor analysis
materialization: frozen table
validation: exact typed field equality with hash-verified local source; unique keys
---*/
-- Key design: entity/source-parent then ID for fact reconciliation; currency/date
-- for rate lookups. No partitions/TTL for these small immutable run snapshots.
-- Preserve source Decimal precision and semantic nulls. Validated keys fit UInt32.
CREATE TABLE sandbox.m_capital__g176_20260925_sale_order
(
    `id` UInt32,
    `name` Nullable(String),
    `state` Nullable(String),
    `company_id` Nullable(Int64),
    `partner_id` Nullable(Int64),
    `partner_invoice_id` Nullable(Int64),
    `partner_shipping_id` Nullable(Int64),
    `plan_id` Nullable(Int64),
    `currency_id` Nullable(Int64),
    `date_order` Nullable(DateTime64(3)),
    `start_date` Nullable(Date32),
    `end_date` Nullable(Date32),
    `first_contract_date` Nullable(Date32),
    `origin_order_id` Nullable(Int64),
    `subscription_id` Nullable(Int64),
    `is_subscription` Nullable(Bool),
    `subscription_state` Nullable(String),
    `recurring_total` Nullable(Decimal(38, 9)),
    `recurring_monthly` Nullable(Decimal(38, 9)),
    `x_studio_arr_usd` Nullable(Decimal(38, 9)),
    `x_studio_recurring_price_usd` Nullable(Decimal(38, 9)),
    `amount_untaxed` Nullable(Decimal(38, 9)),
    `x_studio_direct_sale` Nullable(Bool),
    `x_studio_reseller` Nullable(Int64),
    `x_studio_circularo_distributor` Nullable(Int64),
    `x_studio_reseller_total` Nullable(Decimal(38, 9)),
    `x_studio_distributor_total` Nullable(Decimal(38, 9)),
    `x_studio_contract_renewal_date` Nullable(Date32),
    `next_invoice_date` Nullable(Date32),
    `opportunity_id` Nullable(Int64),
    `signed_on` Nullable(DateTime64(3)),
    `require_signature` Nullable(Bool),
    `x_studio_probability` Nullable(Decimal(38, 9)),
    `x_studio_expected_invoice_date` Nullable(Date32),
    `x_studio_weighted_total_usd` Nullable(Decimal(38, 9)),
    `x_studio_subscription_id` Nullable(String),
    `write_date` Nullable(DateTime64(3)),
    `_airbyte_extracted_at` DateTime64(3),
    `_airbyte_generation_id` UInt32,
    `_airbyte_meta` String,
    analysis_run_id LowCardinality(String),
    source_cutoff Date,
    reporting_cutoff Date,
    created_at DateTime64(3, 'UTC'),
    source_file_sha256 String
)
ENGINE = MergeTree
ORDER BY (ifNull(company_id, 0), id);

