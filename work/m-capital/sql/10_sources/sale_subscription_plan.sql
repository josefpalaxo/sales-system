/*---
kind: extract
project_id: m-capital
status: source-approved; calculations-not-certified
grain: one source business ID
source: [raw_odoo.sale_subscription_plan]
source_cutoff: 2026-09-06 (generation 176)
reporting_cutoff: 2026-08-31 candidate; applied in model, not extraction
scope: company 2/3/5 facts; complete narrow reference tables
purpose: Frozen read-only source evidence, including excluded-date/state exceptions
---*/
SELECT `id`, `name`, `active`, `billing_period_value`, `billing_period_unit`, `x_studio_circularo_edition`, `write_date`, `_airbyte_extracted_at`, `_airbyte_generation_id`, `_airbyte_meta`
FROM raw_odoo.sale_subscription_plan
WHERE 1
ORDER BY id
LIMIT 100001
SETTINGS max_execution_time=30, max_rows_to_read=1000000, timeout_before_checking_execution_speed=0, max_result_rows=100001, result_overflow_mode='throw', output_format_json_quote_decimals=1
FORMAT JSON;

