/*---
kind: view
project_id: m-capital
database: sandbox
name: sandbox.m_capital__invoice_facts
status: exploratory
purpose: Signed tax-exclusive invoice facts with explicit scope and attribution; no hidden billing-party fallback
grain: one invoice product line
as_of_date: 2026-09-06
source: ["sandbox.m_capital__g176_20260925_account_move_line","sandbox.m_capital__g176_20260925_account_move","sandbox.m_capital__invoice_links","sandbox.m_capital__customer_mapping","sandbox.m_capital__g176_20260925_product_product","sandbox.m_capital__g176_20260925_product_template"]
depends_on: ["sandbox.m_capital__g176_20260925_account_move_line","sandbox.m_capital__g176_20260925_account_move","sandbox.m_capital__invoice_links","sandbox.m_capital__customer_mapping","sandbox.m_capital__g176_20260925_product_product","sandbox.m_capital__g176_20260925_product_template"]
scope: {company_ids: [2, 3, 5]}
source_cutoff: 2026-09-06 generation 176
reporting_cutoff: 2026-08-31 provisional
owner: Finance / Revenue Operations
created_for: M-Capital investor analysis
materialization: view over frozen sources
---*/
CREATE VIEW sandbox.m_capital__invoice_facts SQL SECURITY INVOKER AS
SELECT l.id AS invoice_line_id, h.id AS invoice_id, h.company_id AS company_id, h.invoice_date AS invoice_date, h.date AS accounting_date,
       h.state, h.move_type, h.currency_id AS currency_id, l.company_currency_id, h.partner_id AS billed_partner_id,
       bill.commercial_partner_id AS billed_commercial_partner_id, bill.ownership_status AS billed_ownership_status,
       ctx.end_customer_id, ctx.order_ids, ctx.source_channel, ctx.recurring_plans,
       multiIf(ctx.invoice_line_id IS NULL,'unlinked',ctx.unresolved_links>0,'unresolved_link',
               ctx.end_customer_count!=1,'ambiguous_customer',ctx.linked_company_id IS NULL OR ctx.linked_company_id!=h.company_id,'company_conflict',
               'resolved') AS attribution_status,
       multiIf(bill.ownership_status='confirmed_group' OR ctx.order_transaction_scope='intercompany','intercompany',
               bill.ownership_status='ownership_review' OR ctx.order_transaction_scope IN ('ownership_review','mixed'),'ownership_review',
               'external_candidate') AS transaction_scope,
       multiIf(h.state!='posted','not_posted',h.invoice_date IS NULL,'missing_invoice_date',
               h.invoice_date<'2019-01-01','pre_2019',h.invoice_date>h.reporting_cutoff,'after_cutoff','in_window') AS reporting_status,
       if(h.move_type='out_refund',-l.price_subtotal,l.price_subtotal) AS revenue_txn,
       -l.amount_currency AS ledger_revenue_txn, -l.balance AS ledger_revenue_company,
       l.price_subtotal AS source_subtotal, l.quantity, l.product_id, pt.recurring_invoice AS recurring_product,
       l.deferred_start_date, l.deferred_end_date, l.x_studio_subs_start_date, l.x_studio_subs_end_date,
       l.subscription_id, l.subscription_mrr, h.reversed_entry_id,
       l.analysis_run_id AS analysis_run_id, l.source_cutoff AS source_cutoff, l.reporting_cutoff AS reporting_cutoff, l._airbyte_extracted_at AS source_extracted_at
FROM (SELECT * FROM sandbox.m_capital__g176_20260925_account_move_line WHERE display_type='product') AS l
INNER JOIN sandbox.m_capital__g176_20260925_account_move AS h ON l.move_id=h.id
LEFT JOIN sandbox.m_capital__customer_mapping AS bill ON h.partner_id=bill.partner_id
LEFT JOIN sandbox.m_capital__invoice_links AS ctx ON l.id=ctx.invoice_line_id
LEFT JOIN sandbox.m_capital__g176_20260925_product_product AS pp ON l.product_id=pp.id
LEFT JOIN sandbox.m_capital__g176_20260925_product_template AS pt ON pp.product_tmpl_id=pt.id
SETTINGS join_use_nulls=1;


