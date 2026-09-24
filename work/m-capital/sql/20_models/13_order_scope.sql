/*---
kind: view
project_id: m-capital
database: sandbox
name: sandbox.m_capital__order_scope
status: approved ownership scope; contractual economics remain under review
purpose: Apply confirmed intercompany exclusions consistently to every order
grain: one order id
as_of_date: 2026-09-06
source: [sandbox.m_capital__orders]
depends_on: [sandbox.m_capital__orders]
scope: {company_ids: [2, 3, 5], excluded_commercial_partners: [8, 9, 10, 11, 663]}
source_cutoff: 2026-09-06
reporting_cutoff: 2026-08-31 approved by Josef 2026-09-25
owner: Finance / Revenue Operations
created_for: M-Capital investor analysis
materialization: view over frozen sources
---*/
CREATE VIEW sandbox.m_capital__order_scope SQL SECURITY INVOKER AS
SELECT id AS order_id, end_customer_id, billed_commercial_partner_id,
       multiIf(end_customer_id IN (8,9,10,11,663) OR billed_commercial_partner_id IN (8,9,10,11,663) OR transaction_scope='intercompany','intercompany',
               end_customer_id IN (1,465,1672,2124) OR billed_commercial_partner_id IN (1,465,1672,2124),'ownership_review',
               'external_candidate') AS approved_transaction_scope,
       portfolio_eligibility, analysis_run_id, source_cutoff, reporting_cutoff
FROM sandbox.m_capital__orders;
