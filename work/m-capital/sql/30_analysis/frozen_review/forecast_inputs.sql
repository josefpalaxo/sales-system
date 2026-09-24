/*---
kind: frozen_table
project_id: m-capital
database: sandbox
name: sandbox.m_capital__r1_20260925_forecast_inputs
status: internal review; limitations retained
purpose: Frozen forecast_inputs supporting reproducible investor review Excel
grain: source-model record; validated stable ordinal preserves exact extraction order
as_of_date: 2026-09-06
source: [generation-176 frozen project sources and approved decisions]
depends_on: [evidence/m_capital_20260925_g176/investor-model/forecast_inputs.json]
scope: {company_ids: [2,3,5], intercompany_exclusions: [8,9,10,11,663]}
source_cutoff: 2026-09-06
reporting_cutoff: 2026-08-31
owner: Finance / Revenue Operations
created_for: M-Capital investor analysis
materialization: immutable run-specific table; no TTL; one bounded batch
---*/
CREATE TABLE sandbox.m_capital__r1_20260925_forecast_inputs (
    row_number UInt32,
    `event_id` LowCardinality(String),
    `customer_id` LowCardinality(String),
    `year` Nullable(UInt32),
    `component` LowCardinality(String),
    `layer` LowCardinality(String),
    `arr_usd` Nullable(String),
    `probability` Nullable(Decimal(38,12)),
    `service_start` Nullable(Date32),
    `service_end` Nullable(Date32),
    `one_time_usd` Nullable(String),
    `include` UInt32,
    `reviewed` UInt32,
    `overlap_key` LowCardinality(String),
    `source_order_id` Nullable(UInt32),
    `evidence` LowCardinality(String),
    analysis_run_id LowCardinality(String),
    source_cutoff Date,
    reporting_cutoff Date,
    created_at DateTime('UTC'),
    source_extracted_at Date,
    model_version LowCardinality(String),
    file_sha256 String,
    source_json String
) ENGINE=MergeTree ORDER BY (analysis_run_id,row_number);
