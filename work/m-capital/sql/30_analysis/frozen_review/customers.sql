/*---
kind: frozen_table
project_id: m-capital
database: sandbox
name: sandbox.m_capital__r1_20260925_customers
status: internal review; limitations retained
purpose: Frozen customers supporting reproducible investor review Excel
grain: source-model record; validated stable ordinal preserves exact extraction order
as_of_date: 2026-09-06
source: [generation-176 frozen project sources and approved decisions]
depends_on: [evidence/m_capital_20260925_g176/investor-model/customers.json]
scope: {company_ids: [2,3,5], intercompany_exclusions: [8,9,10,11,663]}
source_cutoff: 2026-09-06
reporting_cutoff: 2026-08-31
owner: Finance / Revenue Operations
created_for: M-Capital investor analysis
materialization: immutable run-specific table; no TTL; one bounded batch
---*/
CREATE TABLE sandbox.m_capital__r1_20260925_customers (
    row_number UInt32,
    `customer_id` LowCardinality(String),
    `current_contracts` UInt32,
    `net_arr_usd` LowCardinality(String),
    `end_customer_arr_usd` LowCardinality(String),
    `first_contract_date` Nullable(Date32),
    `tenure_years` Nullable(Decimal(38,12)),
    `cohort` Nullable(UInt32),
    `country` LowCardinality(String),
    `region` LowCardinality(String),
    `recurring_plans` LowCardinality(String),
    `editions` LowCardinality(String),
    `channels` LowCardinality(String),
    `observed_billing_usd` Decimal(38,12),
    `billing_lines` UInt32,
    `price_review_contracts` UInt32,
    `known_term_ends` UInt32,
    `headroom` LowCardinality(String),
    `group_id` Nullable(String),
    `status` LowCardinality(String),
    analysis_run_id LowCardinality(String),
    source_cutoff Date,
    reporting_cutoff Date,
    created_at DateTime('UTC'),
    source_extracted_at Date,
    model_version LowCardinality(String),
    file_sha256 String,
    source_json String
) ENGINE=MergeTree ORDER BY (analysis_run_id,row_number);
