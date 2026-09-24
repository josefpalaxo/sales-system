/*---
kind: frozen_table
project_id: m-capital
database: sandbox
name: sandbox.m_capital__r1_20260925_contracts
status: internal review; limitations retained
purpose: Frozen contracts supporting reproducible investor review Excel
grain: source-model record; validated stable ordinal preserves exact extraction order
as_of_date: 2026-09-06
source: [generation-176 frozen project sources and approved decisions]
depends_on: [evidence/m_capital_20260925_g176/investor-model/contracts.json]
scope: {company_ids: [2,3,5], intercompany_exclusions: [8,9,10,11,663]}
source_cutoff: 2026-09-06
reporting_cutoff: 2026-08-31
owner: Finance / Revenue Operations
created_for: M-Capital investor analysis
materialization: immutable run-specific table; no TTL; one bounded batch
---*/
CREATE TABLE sandbox.m_capital__r1_20260925_contracts (
    row_number UInt32,
    `order_id` UInt32,
    `customer_id` LowCardinality(String),
    `issuer_id` UInt32,
    `billed_partner_id` UInt32,
    `reseller_id` Nullable(UInt32),
    `distributor_id` Nullable(UInt32),
    `family_id` UInt32,
    `lifecycle` LowCardinality(String),
    `eligibility` LowCardinality(String),
    `scope` LowCardinality(String),
    `plan_id` UInt32,
    `recurring_plan` LowCardinality(String),
    `raw_edition` LowCardinality(String),
    `edition` LowCardinality(String),
    `channel` LowCardinality(String),
    `same_org_channel_exception` Bool,
    `start_date` Nullable(Date32),
    `end_date` Nullable(Date32),
    `first_contract_date` Nullable(Date32),
    `currency` LowCardinality(String),
    `billing_unit` LowCardinality(String),
    `billing_interval` UInt32,
    `recurring_net_txn` Decimal(38,12),
    `channel_discount_txn` Decimal(38,12),
    `end_customer_period_txn` Decimal(38,12),
    `annualizer` Decimal(38,12),
    `snapshot_fx` Decimal(38,12),
    `net_arr_usd` LowCardinality(String),
    `end_customer_arr_usd` LowCardinality(String),
    `source_arr_usd` Decimal(38,12),
    `price_status` LowCardinality(String),
    `current_portfolio` Bool,
    `source_recurring_total` Decimal(38,12),
    analysis_run_id LowCardinality(String),
    source_cutoff Date,
    reporting_cutoff Date,
    created_at DateTime('UTC'),
    source_extracted_at Date,
    model_version LowCardinality(String),
    file_sha256 String,
    source_json String
) ENGINE=MergeTree ORDER BY (analysis_run_id,row_number);
