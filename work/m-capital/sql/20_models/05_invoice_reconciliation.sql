/*---
kind: view
project_id: m-capital
database: sandbox
name: sandbox.m_capital__invoice_reconciliation
status: exploratory
purpose: Unique header control totals versus product-line values; credit-note sign applied once
grain: one invoice header
as_of_date: 2026-09-06
source: ["sandbox.m_capital__g176_20260925_account_move","sandbox.m_capital__invoice_revenue"]
depends_on: ["sandbox.m_capital__g176_20260925_account_move","sandbox.m_capital__invoice_revenue"]
scope: {company_ids: [2, 3, 5]}
source_cutoff: 2026-09-06 generation 176
reporting_cutoff: 2026-08-31 provisional
owner: Finance / Revenue Operations
created_for: M-Capital investor analysis
materialization: view over frozen sources
---*/
CREATE VIEW sandbox.m_capital__invoice_reconciliation SQL SECURITY INVOKER AS
SELECT h.id AS invoice_id, h.company_id, h.currency_id, h.invoice_date, h.state, h.move_type,
       if(h.move_type='out_refund',-h.amount_untaxed,h.amount_untaxed) AS header_revenue_txn,
       h.amount_untaxed_signed AS header_revenue_company,
       l.line_count, l.line_revenue_txn, l.line_revenue_company,
       l.line_revenue_txn-header_revenue_txn AS difference_txn,
       l.line_revenue_company-header_revenue_company AS difference_company,
       l.ledger_difference_txn, l.unresolved_lines,
       h.analysis_run_id, h.source_cutoff, h.reporting_cutoff
FROM sandbox.m_capital__g176_20260925_account_move AS h
LEFT JOIN (
 SELECT invoice_id,count() AS line_count,sum(revenue_txn) AS line_revenue_txn,
        sum(ledger_revenue_company) AS line_revenue_company,
        sum(revenue_txn-ledger_revenue_txn) AS ledger_difference_txn,
        countIf(attribution_status!='resolved') AS unresolved_lines
 FROM sandbox.m_capital__invoice_revenue GROUP BY invoice_id
) AS l ON h.id=l.invoice_id
SETTINGS join_use_nulls=1;

