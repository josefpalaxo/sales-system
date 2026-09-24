/*---
kind: frozen_table
project_id: m-capital
database: sandbox
name: sandbox.m_capital__r1_20260925_forecast_results
status: internal review; limitations retained
purpose: Frozen forecast_results supporting reproducible investor review Excel
grain: source-model record; validated stable ordinal preserves exact extraction order
as_of_date: 2026-09-06
source: [generation-176 frozen project sources and approved decisions]
depends_on: [evidence/m_capital_20260925_g176/investor-model/forecast_results.json]
scope: {company_ids: [2,3,5], intercompany_exclusions: [8,9,10,11,663]}
source_cutoff: 2026-09-06
reporting_cutoff: 2026-08-31
owner: Finance / Revenue Operations
created_for: M-Capital investor analysis
materialization: immutable run-specific table; no TTL; one bounded batch
---*/
CREATE TABLE sandbox.m_capital__r1_20260925_forecast_results (
    row_number UInt32,
    `closing_arr_usd` Decimal(38,12),
    `customer_id` LowCardinality(String),
    `customer_year_key` LowCardinality(String),
    `input_status` LowCardinality(String),
    `lost_arr_usd` Decimal(38,12),
    `modeled_expansion_arr_usd` Decimal(38,12),
    `modeled_expansion_revenue_usd` Decimal(38,12),
    `named_event_arr_change_usd` Decimal(38,12),
    `named_event_recurring_change_usd` Decimal(38,12),
    `one_time_revenue_usd` Decimal(38,12),
    `opening_arr_usd` Decimal(38,12),
    `retained_arr_usd` Decimal(38,12),
    `retained_base_revenue_usd` Decimal(38,12),
    `retention_factor` Decimal(38,12),
    `scenario` LowCardinality(String),
    `scenario_version` LowCardinality(String),
    `total_scenario_revenue_usd` Decimal(38,12),
    `year` UInt32,
    analysis_run_id LowCardinality(String),
    source_cutoff Date,
    reporting_cutoff Date,
    created_at DateTime('UTC'),
    source_extracted_at Date,
    model_version LowCardinality(String),
    file_sha256 String,
    source_json String
) ENGINE=MergeTree ORDER BY (analysis_run_id,row_number);
