/*---
kind: frozen_table
project_id: m-capital
database: sandbox
name: sandbox.m_capital__r1_20260925_summary
status: internal review; limitations retained
purpose: Frozen summary supporting reproducible investor review Excel
grain: source-model record; validated stable ordinal preserves exact extraction order
as_of_date: 2026-09-06
source: [generation-176 frozen project sources and approved decisions]
depends_on: [evidence/m_capital_20260925_g176/investor-model/summary.json]
scope: {company_ids: [2,3,5], intercompany_exclusions: [8,9,10,11,663]}
source_cutoff: 2026-09-06
reporting_cutoff: 2026-08-31
owner: Finance / Revenue Operations
created_for: M-Capital investor analysis
materialization: immutable run-specific table; no TTL; one bounded batch
---*/
CREATE TABLE sandbox.m_capital__r1_20260925_summary (
    row_number UInt32,
    `run_id` LowCardinality(String),
    `forecast_years` LowCardinality(String),
    `billing_cutoff` Date32,
    `portfolio_date` Date32,
    `status` LowCardinality(String),
    `candidate_net_arr` Decimal(38,12),
    `candidate_end_customer_arr` Decimal(38,12),
    `price_review_contracts` LowCardinality(String),
    `active_family_overlap_ids` LowCardinality(String),
    `channel_product_ids` LowCardinality(String),
    `recurring_billing_usd` Decimal(38,12),
    `missing_period_usd` Decimal(38,12),
    `allocation_timing` LowCardinality(String),
    `negative_customer_months` UInt32,
    `counts` LowCardinality(String),
    `source_hashes` LowCardinality(String),
    `files` LowCardinality(String),
    `model_sha256` LowCardinality(String),
    `limitations` LowCardinality(String),
    analysis_run_id LowCardinality(String),
    source_cutoff Date,
    reporting_cutoff Date,
    created_at DateTime('UTC'),
    source_extracted_at Date,
    model_version LowCardinality(String),
    file_sha256 String,
    source_json String
) ENGINE=MergeTree ORDER BY (analysis_run_id,row_number);
