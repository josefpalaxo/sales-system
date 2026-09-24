/*---
kind: view
project_id: m-capital
database: sandbox
name: sandbox.m_capital__invoice_analysis
status: reconciled financial foundation; customer coverage incomplete
purpose: Approved intercompany scope and fixed invoice-date USD conversion on net tax-exclusive invoice lines
grain: one invoice product line
as_of_date: 2026-09-06
source: [sandbox.m_capital__invoice_attribution, sandbox.m_capital__fx_context]
depends_on: [sandbox.m_capital__invoice_attribution, sandbox.m_capital__fx_context]
scope: {company_ids: [2, 3, 5], excluded_commercial_partners: [8, 9, 10, 11, 663]}
source_cutoff: 2026-09-06
reporting_cutoff: 2026-08-31 approved by Josef 2026-09-25
owner: Finance / Revenue Operations
created_for: M-Capital investor analysis
materialization: view over frozen sources
---*/
CREATE VIEW sandbox.m_capital__invoice_analysis SQL SECURITY INVOKER AS
SELECT a.`invoice_line_id` AS `invoice_line_id`, a.`invoice_id` AS `invoice_id`, a.`company_id` AS `company_id`, a.`invoice_date` AS `invoice_date`, a.`accounting_date` AS `accounting_date`, a.`state` AS `state`, a.`move_type` AS `move_type`, a.`currency_id` AS `currency_id`, a.`company_currency_id` AS `company_currency_id`, a.`billed_partner_id` AS `billed_partner_id`, a.`billed_commercial_partner_id` AS `billed_commercial_partner_id`, a.`billed_ownership_status` AS `billed_ownership_status`, a.`end_customer_id` AS `end_customer_id`, a.`order_ids` AS `order_ids`, a.`source_channel` AS `source_channel`, a.`recurring_plans` AS `recurring_plans`, a.`attribution_status` AS `attribution_status`, a.`transaction_scope` AS `transaction_scope`, a.`reporting_status` AS `reporting_status`, a.`revenue_txn` AS `revenue_txn`, a.`ledger_revenue_txn` AS `ledger_revenue_txn`, a.`ledger_revenue_company` AS `ledger_revenue_company`, a.`source_subtotal` AS `source_subtotal`, a.`quantity` AS `quantity`, a.`product_id` AS `product_id`, a.`recurring_product` AS `recurring_product`, a.`deferred_start_date` AS `deferred_start_date`, a.`deferred_end_date` AS `deferred_end_date`, a.`x_studio_subs_start_date` AS `x_studio_subs_start_date`, a.`x_studio_subs_end_date` AS `x_studio_subs_end_date`, a.`subscription_id` AS `subscription_id`, a.`subscription_mrr` AS `subscription_mrr`, a.`reversed_entry_id` AS `reversed_entry_id`, a.`analysis_run_id` AS `analysis_run_id`, a.`source_cutoff` AS `source_cutoff`, a.`reporting_cutoff` AS `reporting_cutoff`, a.`source_extracted_at` AS `source_extracted_at`, a.`origin_fallback_valid` AS `origin_fallback_valid`, a.`resolved_end_customer_id` AS `resolved_end_customer_id`, a.`attribution_method` AS `attribution_method`, a.`final_attribution_status` AS `final_attribution_status`, a.`resolved_channel` AS `resolved_channel`, a.`resolved_recurring_plans` AS `resolved_recurring_plans`, a.`origin_order_id` AS `origin_order_id`, a.`final_transaction_scope` AS `final_transaction_scope`,
       multiIf(a.billed_commercial_partner_id IN (8,9,10,11,663) OR a.resolved_end_customer_id IN (8,9,10,11,663) OR a.final_transaction_scope='intercompany','intercompany',
               a.billed_commercial_partner_id IN (1,465,1672,2124) OR a.resolved_end_customer_id IN (1,465,1672,2124),'ownership_review',
               'external_candidate') AS approved_transaction_scope,
       fx.rate_to_usd AS invoice_rate_to_usd, fx.fx_status AS invoice_fx_status,
       fx.source_rate_id AS invoice_source_rate_id, fx.usd_rate_id AS invoice_usd_rate_id,
       toDecimal128(a.revenue_txn*fx.rate_to_usd,9) AS revenue_usd
FROM sandbox.m_capital__invoice_attribution AS a
LEFT JOIN sandbox.m_capital__fx_context AS fx
ON a.company_id=fx.company_id AND a.currency_id=fx.currency_id AND a.invoice_date=fx.fx_date
SETTINGS join_use_nulls=1;

