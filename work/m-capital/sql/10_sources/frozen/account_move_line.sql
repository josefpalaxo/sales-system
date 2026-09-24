/*---
kind: table
project_id: m-capital
database: sandbox
name: sandbox.m_capital__g176_20260925_account_move_line
status: source-frozen; financial-validation-pending
purpose: Preserve approved narrow September 6 source rows without mutable-source dependence
grain: id
as_of_date: 2026-09-06
source: [raw_odoo.account_move_line]
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
CREATE TABLE sandbox.m_capital__g176_20260925_account_move_line
(
    `id` UInt32,
    `move_id` Nullable(Int64),
    `product_id` Nullable(Int64),
    `name` Nullable(String),
    `display_type` Nullable(String),
    `company_id` Nullable(Int64),
    `currency_id` Nullable(Int64),
    `company_currency_id` Nullable(Int64),
    `partner_id` Nullable(Int64),
    `account_id` Nullable(Int64),
    `account_type` Nullable(String),
    `date` Nullable(Date32),
    `invoice_date` Nullable(Date32),
    `parent_state` Nullable(String),
    `quantity` Nullable(Decimal(38, 9)),
    `price_unit` Nullable(Decimal(38, 9)),
    `discount` Nullable(Decimal(38, 9)),
    `price_subtotal` Nullable(Decimal(38, 9)),
    `balance` Nullable(Decimal(38, 9)),
    `amount_currency` Nullable(Decimal(38, 9)),
    `subscription_id` Nullable(Int64),
    `subscription_mrr` Nullable(Decimal(38, 9)),
    `deferred_start_date` Nullable(Date32),
    `deferred_end_date` Nullable(Date32),
    `x_studio_subs_start_date` Nullable(Date32),
    `x_studio_subs_end_date` Nullable(Date32),
    `is_downpayment` Nullable(Bool),
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
ORDER BY (ifNull(move_id, 0), id);

