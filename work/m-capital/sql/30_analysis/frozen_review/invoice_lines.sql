/*---
kind: frozen_table
project_id: m-capital
database: sandbox
name: sandbox.m_capital__r1_20260925_invoice_lines
status: internal review; limitations retained
purpose: Frozen invoice_lines supporting reproducible investor review Excel
grain: source-model record; validated stable ordinal preserves exact extraction order
as_of_date: 2026-09-06
source: [generation-176 frozen project sources and approved decisions]
depends_on: [evidence/m_capital_20260925_g176/investor-model/invoice_lines.json]
scope: {company_ids: [2,3,5], intercompany_exclusions: [8,9,10,11,663]}
source_cutoff: 2026-09-06
reporting_cutoff: 2026-08-31
owner: Finance / Revenue Operations
created_for: M-Capital investor analysis
materialization: immutable run-specific table; no TTL; one bounded batch
---*/
CREATE TABLE sandbox.m_capital__r1_20260925_invoice_lines (
    row_number UInt32,
    `invoice_line_id` UInt32,
    `invoice_id` UInt32,
    `invoice_date` Nullable(Date32),
    `issuer_id` UInt32,
    `customer_id` LowCardinality(String),
    `billed_partner_id` UInt32,
    `channel` LowCardinality(String),
    `recurring_plan` LowCardinality(String),
    `attribution` LowCardinality(String),
    `method` LowCardinality(String),
    `scope` LowCardinality(String),
    `reporting_status` LowCardinality(String),
    `in_reporting_total` Bool,
    `currency` LowCardinality(String),
    `revenue_txn` Decimal(38,12),
    `invoice_fx` Nullable(Decimal(38,12)),
    `revenue_usd` Nullable(Decimal(38,12)),
    `product_id` Nullable(UInt32),
    `recurrence` LowCardinality(String),
    `service_start` Nullable(Date32),
    `service_end` Nullable(Date32),
    `service_dates_valid` Bool,
    `move_type` LowCardinality(String),
    `state` LowCardinality(String),
    `source_rate_id` Nullable(UInt32),
    `usd_rate_id` Nullable(UInt32),
    analysis_run_id LowCardinality(String),
    source_cutoff Date,
    reporting_cutoff Date,
    created_at DateTime('UTC'),
    source_extracted_at Date,
    model_version LowCardinality(String),
    file_sha256 String,
    source_json String
) ENGINE=MergeTree ORDER BY (analysis_run_id,row_number);
