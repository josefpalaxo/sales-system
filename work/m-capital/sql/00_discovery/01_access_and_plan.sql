-- Read-only capability and execution-plan evidence; no grants are changed.
SHOW GRANTS FORMAT JSON;
EXPLAIN indexes=1 SELECT id, invoice_date, amount_untaxed FROM raw_odoo.account_move WHERE company_id IN (2,3,5) AND move_type IN ('out_invoice','out_refund') AND state='posted' AND invoice_date BETWEEN '2019-01-01' AND '2026-08-31' LIMIT 10000 SETTINGS max_execution_time=20, max_rows_to_read=1000000;
