/*---
kind: view
project_id: m-capital
database: sandbox
name: sandbox.m_capital__invoice_line_context
status: exploratory
purpose: Deduplicated candidate order links; ambiguity retained, never allocated by arbitrary ANY join
grain: one linked invoice_line_id
as_of_date: 2026-09-06
source: ["sandbox.m_capital__g176_20260925_sale_order_line_invoice_rel","sandbox.m_capital__g176_20260925_sale_order_line","sandbox.m_capital__g176_20260925_account_move_line","sandbox.m_capital__order_context"]
depends_on: ["sandbox.m_capital__g176_20260925_sale_order_line_invoice_rel","sandbox.m_capital__g176_20260925_sale_order_line","sandbox.m_capital__g176_20260925_account_move_line","sandbox.m_capital__order_context"]
scope: {company_ids: [2, 3, 5]}
source_cutoff: 2026-09-06 generation 176
reporting_cutoff: 2026-08-31 provisional
owner: Finance / Revenue Operations
created_for: M-Capital investor analysis
materialization: view over frozen sources
---*/
CREATE VIEW sandbox.m_capital__invoice_line_context SQL SECURITY INVOKER AS
WITH links AS (
    SELECT r.invoice_line_id AS invoice_line_id, l.order_id AS order_id
    FROM sandbox.m_capital__g176_20260925_sale_order_line_invoice_rel AS r
    LEFT JOIN sandbox.m_capital__g176_20260925_sale_order_line AS l ON r.order_line_id=l.id
    WHERE r.invoice_line_id IN (SELECT id FROM sandbox.m_capital__g176_20260925_account_move_line WHERE display_type='product')
    UNION DISTINCT
    SELECT id AS invoice_line_id, subscription_id AS order_id
    FROM sandbox.m_capital__g176_20260925_account_move_line
    WHERE display_type='product' AND subscription_id IS NOT NULL
)
SELECT links.invoice_line_id,
       count() AS candidate_links, countIf(o.id IS NULL OR o.customer_identity_status!='resolved') AS unresolved_links,
       uniqExact(o.end_customer_id) AS end_customer_count,
       if(uniqExact(o.end_customer_id)=1,min(o.end_customer_id),NULL) AS end_customer_id,
       arrayStringConcat(arrayMap(x->toString(x),arraySort(groupUniqArray(o.id))),',') AS order_ids,
       if(uniqExact(o.source_channel)=1,min(o.source_channel),'mixed') AS source_channel,
       if(uniqExact(o.transaction_scope)=1,min(o.transaction_scope),'mixed') AS order_transaction_scope,
       if(uniqExact(o.company_id)=1,min(o.company_id),NULL) AS linked_company_id,
       arrayStringConcat(arraySort(groupUniqArray(o.recurring_plan)),' | ') AS recurring_plans
FROM links
LEFT JOIN sandbox.m_capital__order_context AS o ON links.order_id=o.id
GROUP BY links.invoice_line_id
SETTINGS join_use_nulls=1;

