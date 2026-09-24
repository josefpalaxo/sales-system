SELECT * FROM sandbox.m_capital__invoice_attribution WHERE company_id IN (2,3,5)
ORDER BY invoice_line_id LIMIT 100001
SETTINGS max_execution_time=30,max_rows_to_read=1000000,result_overflow_mode='throw',output_format_json_quote_decimals=1
FORMAT JSON;
