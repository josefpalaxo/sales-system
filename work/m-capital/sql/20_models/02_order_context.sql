/*---
kind: view
project_id: m-capital
database: sandbox
name: sandbox.m_capital__order_context
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
CREATE VIEW sandbox.m_capital__order_context SQL SECURITY INVOKER AS
SELECT o.*, cust.commercial_partner_id AS end_customer_id, cust.identity_status AS customer_identity_status,
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
       multiIf(o.subscription_state!='3_progress' OR o.state!='sale' OR NOT o.is_subscription,'not_in_progress_subscription',
               o.start_date IS NULL,'missing_start',o.start_date > o.source_cutoff,'future_start',
               o.end_date < o.source_cutoff,'expired_in_progress','effective_candidate') AS portfolio_eligibility
FROM sandbox.m_capital__g176_20260925_sale_order AS o
LEFT JOIN sandbox.m_capital__customer_mapping AS cust ON o.partner_id=cust.partner_id
LEFT JOIN sandbox.m_capital__customer_mapping AS bill ON o.partner_invoice_id=bill.partner_id
LEFT JOIN sandbox.m_capital__g176_20260925_sale_subscription_plan AS pl ON o.plan_id=pl.id
SETTINGS join_use_nulls=1;

