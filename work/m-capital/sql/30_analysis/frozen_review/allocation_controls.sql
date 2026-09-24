/*---
kind: frozen_table
project_id: m-capital
database: sandbox
name: sandbox.m_capital__r1_20260925_allocation_controls
status: internal review; limitations retained
purpose: Frozen allocation_controls supporting reproducible investor review Excel
grain: source-model record; validated stable ordinal preserves exact extraction order
as_of_date: 2026-09-06
source: [generation-176 frozen project sources and approved decisions]
depends_on: [evidence/m_capital_20260925_g176/investor-model/allocation_controls.json]
scope: {company_ids: [2,3,5], intercompany_exclusions: [8,9,10,11,663]}
source_cutoff: 2026-09-06
reporting_cutoff: 2026-08-31
owner: Finance / Revenue Operations
created_for: M-Capital investor analysis
materialization: immutable run-specific table; no TTL; one bounded batch
---*/
CREATE TABLE sandbox.m_capital__r1_20260925_allocation_controls (
    row_number UInt32,
    `invoice_line_id` UInt32,
    `line_usd` Decimal(38,12),
    `allocated_usd` Decimal(38,12),
    `difference` Decimal(38,12),
    analysis_run_id LowCardinality(String),
    source_cutoff Date,
    reporting_cutoff Date,
    created_at DateTime('UTC'),
    source_extracted_at Date,
    model_version LowCardinality(String),
    file_sha256 String,
    source_json String
) ENGINE=MergeTree ORDER BY (analysis_run_id,row_number);
