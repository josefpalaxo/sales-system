/*---
kind: frozen_table
project_id: m-capital
database: sandbox
name: sandbox.m_capital__r1_20260925_fx
status: internal review; limitations retained
purpose: Frozen fx supporting reproducible investor review Excel
grain: source-model record; validated stable ordinal preserves exact extraction order
as_of_date: 2026-09-06
source: [generation-176 frozen project sources and approved decisions]
depends_on: [evidence/m_capital_20260925_g176/investor-model/fx.json]
scope: {company_ids: [2,3,5], intercompany_exclusions: [8,9,10,11,663]}
source_cutoff: 2026-09-06
reporting_cutoff: 2026-08-31
owner: Finance / Revenue Operations
created_for: M-Capital investor analysis
materialization: immutable run-specific table; no TTL; one bounded batch
---*/
CREATE TABLE sandbox.m_capital__r1_20260925_fx (
    row_number UInt32,
    `company_id` UInt32,
    `currency_id` UInt32,
    `fx_date` Date32,
    `company_currency_id` UInt32,
    `source_rate_id` Nullable(UInt32),
    `source_rate_date` Nullable(Date32),
    `source_rate` Nullable(Decimal(38,12)),
    `usd_rate_id` Nullable(UInt32),
    `usd_rate_date` Nullable(Date32),
    `usd_rate` Nullable(Decimal(38,12)),
    `rate_to_usd` Nullable(Decimal(38,12)),
    `fx_status` LowCardinality(String),
    analysis_run_id LowCardinality(String),
    source_cutoff Date,
    reporting_cutoff Date,
    created_at DateTime('UTC'),
    source_extracted_at Date,
    model_version LowCardinality(String),
    file_sha256 String,
    source_json String
) ENGINE=MergeTree ORDER BY (analysis_run_id,row_number);
