/*---
kind: extract
project_id: m-capital
status: source-approved; calculations-not-certified
grain: one source business ID
source: [raw_odoo.sale_order]
source_cutoff: 2026-09-06 (generation 176)
reporting_cutoff: 2026-08-31 candidate; applied in model, not extraction
scope: company 2/3/5 facts; complete narrow reference tables
purpose: Frozen read-only source evidence, including excluded-date/state exceptions
---*/
SELECT `id`, `name`, `state`, `company_id`, `partner_id`, `partner_invoice_id`, `partner_shipping_id`, `plan_id`, `currency_id`, `date_order`, `start_date`, `end_date`, `first_contract_date`, `origin_order_id`, `subscription_id`, `is_subscription`, `subscription_state`, `recurring_total`, `recurring_monthly`, `x_studio_arr_usd`, `x_studio_recurring_price_usd`, `amount_untaxed`, `x_studio_direct_sale`, `x_studio_reseller`, `x_studio_circularo_distributor`, `x_studio_reseller_total`, `x_studio_distributor_total`, `x_studio_contract_renewal_date`, `next_invoice_date`, `opportunity_id`, `signed_on`, `require_signature`, `x_studio_probability`, `x_studio_expected_invoice_date`, `x_studio_weighted_total_usd`, `x_studio_subscription_id`, `write_date`, `_airbyte_extracted_at`, `_airbyte_generation_id`, `_airbyte_meta`
FROM raw_odoo.sale_order
WHERE company_id IN (2,3,5)
ORDER BY id
LIMIT 100001
SETTINGS max_execution_time=30, max_rows_to_read=1000000, timeout_before_checking_execution_speed=0, max_result_rows=100001, result_overflow_mode='throw', output_format_json_quote_decimals=1
FORMAT JSON;

