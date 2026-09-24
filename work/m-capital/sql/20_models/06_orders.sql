/*---
kind: view
project_id: m-capital
database: sandbox
name: sandbox.m_capital__orders
status: exploratory
purpose: End-customer, billed party, Odoo channel and Recurring Plan on each frozen order
grain: one order id
as_of_date: 2026-09-06
source: ["sandbox.m_capital__g176_20260925_sale_order","sandbox.m_capital__customer_mapping","sandbox.m_capital__g176_20260925_sale_subscription_plan"]
depends_on: ["sandbox.m_capital__g176_20260925_sale_order","sandbox.m_capital__customer_mapping","sandbox.m_capital__g176_20260925_sale_subscription_plan"]
scope: {company_ids: [2, 3, 5]}
source_cutoff: 2026-09-06 generation 176
reporting_cutoff: 2026-08-31 provisional
owner: Finance / Revenue Operations
created_for: M-Capital investor analysis
materialization: view over frozen sources
---*/
CREATE VIEW sandbox.m_capital__orders SQL SECURITY INVOKER AS
SELECT o.`id` AS `id`, o.`name` AS `name`, o.`state` AS `state`, o.`company_id` AS `company_id`, o.`partner_id` AS `partner_id`, o.`partner_invoice_id` AS `partner_invoice_id`, o.`partner_shipping_id` AS `partner_shipping_id`, o.`plan_id` AS `plan_id`, o.`currency_id` AS `currency_id`, o.`date_order` AS `date_order`, o.`start_date` AS `start_date`, o.`end_date` AS `end_date`, o.`first_contract_date` AS `first_contract_date`, o.`origin_order_id` AS `origin_order_id`, o.`subscription_id` AS `subscription_id`, o.`is_subscription` AS `is_subscription`, o.`subscription_state` AS `subscription_state`, o.`recurring_total` AS `recurring_total`, o.`recurring_monthly` AS `recurring_monthly`, o.`x_studio_arr_usd` AS `x_studio_arr_usd`, o.`x_studio_recurring_price_usd` AS `x_studio_recurring_price_usd`, o.`amount_untaxed` AS `amount_untaxed`, o.`x_studio_direct_sale` AS `x_studio_direct_sale`, o.`x_studio_reseller` AS `x_studio_reseller`, o.`x_studio_circularo_distributor` AS `x_studio_circularo_distributor`, o.`x_studio_reseller_total` AS `x_studio_reseller_total`, o.`x_studio_distributor_total` AS `x_studio_distributor_total`, o.`x_studio_contract_renewal_date` AS `x_studio_contract_renewal_date`, o.`next_invoice_date` AS `next_invoice_date`, o.`opportunity_id` AS `opportunity_id`, o.`signed_on` AS `signed_on`, o.`require_signature` AS `require_signature`, o.`x_studio_probability` AS `x_studio_probability`, o.`x_studio_expected_invoice_date` AS `x_studio_expected_invoice_date`, o.`x_studio_weighted_total_usd` AS `x_studio_weighted_total_usd`, o.`x_studio_subscription_id` AS `x_studio_subscription_id`, o.`write_date` AS `write_date`, o.`_airbyte_extracted_at` AS `_airbyte_extracted_at`, o.`_airbyte_generation_id` AS `_airbyte_generation_id`, o.`_airbyte_meta` AS `_airbyte_meta`, o.`analysis_run_id` AS `analysis_run_id`, o.`source_cutoff` AS `source_cutoff`, o.`reporting_cutoff` AS `reporting_cutoff`, o.`created_at` AS `created_at`, o.`source_file_sha256` AS `source_file_sha256`, cust.commercial_partner_id AS end_customer_id, cust.identity_status AS customer_identity_status,
       cust.ownership_status AS customer_ownership_status, bill.commercial_partner_id AS billed_commercial_partner_id,
       bill.ownership_status AS billed_ownership_status,
       multiIf(cust.ownership_status='confirmed_group' OR bill.ownership_status='confirmed_group','intercompany',
               cust.ownership_status='ownership_review' OR bill.ownership_status='ownership_review','ownership_review',
               'external_candidate') AS transaction_scope,
       multiIf(o.x_studio_direct_sale IS NULL,'unknown',o.x_studio_direct_sale,'direct','indirect') AS source_channel,
       (o.partner_id != o.partner_invoice_id AND cust.commercial_partner_id=bill.commercial_partner_id) AS same_organization_channel_exception,
       JSONExtractString(ifNull(pl.name,'{}'),'en_US') AS recurring_plan,
       pl.x_studio_circularo_edition AS raw_edition,
       if(pl.x_studio_circularo_edition='Ultimate','Enterprise',pl.x_studio_circularo_edition) AS reporting_edition,
       pl.billing_period_value, pl.billing_period_unit,
       multiIf(NOT ifNull(o.subscription_state='3_progress' AND o.state='sale' AND o.is_subscription, false),'not_in_progress_subscription',
               o.start_date IS NULL,'missing_start',o.start_date > o.source_cutoff,'future_start',
               o.end_date < o.source_cutoff,'expired_in_progress','effective_candidate') AS portfolio_eligibility
FROM sandbox.m_capital__g176_20260925_sale_order AS o
LEFT JOIN sandbox.m_capital__customer_mapping AS cust ON o.partner_id=cust.partner_id
LEFT JOIN sandbox.m_capital__customer_mapping AS bill ON o.partner_invoice_id=bill.partner_id
LEFT JOIN sandbox.m_capital__g176_20260925_sale_subscription_plan AS pl ON o.plan_id=pl.id
SETTINGS join_use_nulls=1;


