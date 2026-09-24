/*---
kind: view
project_id: m-capital
database: sandbox
name: sandbox.m_capital__invoice_attribution
status: exploratory
purpose: Add conservative exact-order-origin attribution without billing-party or delivery-address assumptions
grain: one invoice product line
as_of_date: 2026-09-06
source: [sandbox.m_capital__invoice_facts, sandbox.m_capital__orders, sandbox.m_capital__g176_20260925_account_move, sandbox.m_capital__g176_20260925_sale_order_line]
depends_on: [sandbox.m_capital__invoice_facts, sandbox.m_capital__orders, sandbox.m_capital__g176_20260925_account_move, sandbox.m_capital__g176_20260925_sale_order_line]
scope: {company_ids: [2, 3, 5]}
owner: Finance / Revenue Operations
created_for: M-Capital investor analysis
materialization: view over frozen sources
validation: fallback only for unlinked lines, unique exact reference, matching company/billed organization/product and no contradictory customer link
---*/
CREATE VIEW sandbox.m_capital__invoice_attribution SQL SECURITY INVOKER AS
WITH unique_names AS (
 SELECT company_id, name, min(id) AS order_id
 FROM sandbox.m_capital__orders GROUP BY company_id,name HAVING count()=1
), invoice_customers AS (
 SELECT invoice_id, uniqExactIf(end_customer_id,attribution_status='resolved') AS known_customer_count,
        minIf(end_customer_id,attribution_status='resolved') AS known_customer_id,
        countIf(attribution_status NOT IN ('resolved','unlinked')) AS conflicting_lines
 FROM sandbox.m_capital__invoice_facts GROUP BY invoice_id
), order_products AS (
 SELECT order_id,product_id,count() AS product_lines
 FROM sandbox.m_capital__g176_20260925_sale_order_line
 WHERE display_type IS NULL AND product_id IS NOT NULL GROUP BY order_id,product_id
)
SELECT f.`invoice_line_id` AS `invoice_line_id`, f.`invoice_id` AS `invoice_id`, f.`company_id` AS `company_id`, f.`invoice_date` AS `invoice_date`, f.`accounting_date` AS `accounting_date`, f.`state` AS `state`, f.`move_type` AS `move_type`, f.`currency_id` AS `currency_id`, f.`company_currency_id` AS `company_currency_id`, f.`billed_partner_id` AS `billed_partner_id`, f.`billed_commercial_partner_id` AS `billed_commercial_partner_id`, f.`billed_ownership_status` AS `billed_ownership_status`, f.`end_customer_id` AS `end_customer_id`, f.`order_ids` AS `order_ids`, f.`source_channel` AS `source_channel`, f.`recurring_plans` AS `recurring_plans`, f.`attribution_status` AS `attribution_status`, f.`transaction_scope` AS `transaction_scope`, f.`reporting_status` AS `reporting_status`, f.`revenue_txn` AS `revenue_txn`, f.`ledger_revenue_txn` AS `ledger_revenue_txn`, f.`ledger_revenue_company` AS `ledger_revenue_company`, f.`source_subtotal` AS `source_subtotal`, f.`quantity` AS `quantity`, f.`product_id` AS `product_id`, f.`recurring_product` AS `recurring_product`, f.`deferred_start_date` AS `deferred_start_date`, f.`deferred_end_date` AS `deferred_end_date`, f.`x_studio_subs_start_date` AS `x_studio_subs_start_date`, f.`x_studio_subs_end_date` AS `x_studio_subs_end_date`, f.`subscription_id` AS `subscription_id`, f.`subscription_mrr` AS `subscription_mrr`, f.`reversed_entry_id` AS `reversed_entry_id`, f.`analysis_run_id` AS `analysis_run_id`, f.`source_cutoff` AS `source_cutoff`, f.`reporting_cutoff` AS `reporting_cutoff`, f.`source_extracted_at` AS `source_extracted_at`,
       ifNull(f.attribution_status='unlinked' AND o.customer_identity_status='resolved'
              AND f.billed_commercial_partner_id=o.billed_commercial_partner_id
              AND op.product_lines>0 AND ic.conflicting_lines=0 AND ic.known_customer_count<=1
              AND (ic.known_customer_count=0 OR ic.known_customer_id=o.end_customer_id),false) AS origin_fallback_valid,
       if(f.attribution_status='resolved',f.end_customer_id,if(origin_fallback_valid,o.end_customer_id,NULL)) AS resolved_end_customer_id,
       multiIf(f.attribution_status='resolved','order_line_or_subscription_link',origin_fallback_valid,'exact_order_origin_with_controls','unresolved') AS attribution_method,
       if(f.attribution_status='resolved' OR origin_fallback_valid,'resolved',f.attribution_status) AS final_attribution_status,
       if(origin_fallback_valid,o.source_channel,f.source_channel) AS resolved_channel,
       if(origin_fallback_valid,o.recurring_plan,f.recurring_plans) AS resolved_recurring_plans,
       if(origin_fallback_valid,o.id,NULL) AS origin_order_id,
       if(origin_fallback_valid AND o.transaction_scope!='external_candidate',o.transaction_scope,f.transaction_scope) AS final_transaction_scope
FROM sandbox.m_capital__invoice_facts AS f
LEFT JOIN sandbox.m_capital__g176_20260925_account_move AS h ON f.invoice_id=h.id
LEFT JOIN unique_names AS un ON h.company_id=un.company_id AND h.invoice_origin=un.name
LEFT JOIN sandbox.m_capital__orders AS o ON un.order_id=o.id
LEFT JOIN order_products AS op ON o.id=op.order_id AND f.product_id=op.product_id
LEFT JOIN invoice_customers AS ic ON f.invoice_id=ic.invoice_id
SETTINGS join_use_nulls=1;

