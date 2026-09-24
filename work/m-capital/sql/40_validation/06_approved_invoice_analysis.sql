/*---
kind: validation
project_id: m-capital
database: sandbox
name: approved_invoice_analysis_check
status: internal validation
purpose: Verify approved ownership scope, cutoff and invoice-date USD at product-line grain
grain: one invoice product line
as_of_date: 2026-09-06
source: [sandbox.m_capital__invoice_analysis]
depends_on: [sandbox.m_capital__invoice_analysis]
scope: {company_ids: [2, 3, 5]}
source_cutoff: 2026-09-06
reporting_cutoff: 2026-08-31
owner: Finance / Revenue Operations
created_for: M-Capital investor analysis
materialization: JSON evidence extract
---*/
SELECT * FROM sandbox.m_capital__invoice_analysis WHERE company_id IN (2,3,5)
ORDER BY invoice_line_id LIMIT 100001
SETTINGS max_execution_time=30,max_rows_to_read=1000000,result_overflow_mode='throw',output_format_json_quote_decimals=1
FORMAT JSON;
