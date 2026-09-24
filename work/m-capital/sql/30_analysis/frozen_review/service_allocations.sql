/*---
kind: frozen_table
project_id: m-capital
database: sandbox
name: sandbox.m_capital__r1_20260925_service_allocations
status: internal review; limitations retained
purpose: Frozen service_allocations supporting reproducible investor review Excel
grain: source-model record; validated stable ordinal preserves exact extraction order
as_of_date: 2026-09-06
source: [generation-176 frozen project sources and approved decisions]
depends_on: [evidence/m_capital_20260925_g176/investor-model/service_allocations.json]
scope: {company_ids: [2,3,5], intercompany_exclusions: [8,9,10,11,663]}
source_cutoff: 2026-09-06
reporting_cutoff: 2026-08-31
owner: Finance / Revenue Operations
created_for: M-Capital investor analysis
materialization: immutable run-specific table; no TTL; one bounded batch
---*/
CREATE TABLE sandbox.m_capital__r1_20260925_service_allocations (
    row_number UInt32,
    `invoice_line_id` UInt32,
    `customer_id` LowCardinality(String),
    `service_month` Date32,
    `weight` Decimal(38,12),
    `revenue_txn` LowCardinality(String),
    `revenue_usd` LowCardinality(String),
    `invoice_date` Date32,
    `invoice_fx` Decimal(38,12),
    `period_bucket` LowCardinality(String),
    `attribution` LowCardinality(String),
    analysis_run_id LowCardinality(String),
    source_cutoff Date,
    reporting_cutoff Date,
    created_at DateTime('UTC'),
    source_extracted_at Date,
    model_version LowCardinality(String),
    file_sha256 String,
    source_json String
) ENGINE=MergeTree ORDER BY (analysis_run_id,row_number);
