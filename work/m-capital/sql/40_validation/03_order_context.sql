SELECT id, company_id, end_customer_id, customer_identity_status, billed_commercial_partner_id,
       transaction_scope, source_channel, same_organization_channel_exception, portfolio_eligibility,
       recurring_plan, raw_edition, reporting_edition, plan_id, billing_period_value, billing_period_unit,
       currency_id, start_date, end_date, first_contract_date, subscription_state, is_subscription, state,
       recurring_total, x_studio_arr_usd, origin_order_id, subscription_id, analysis_run_id, source_cutoff
FROM sandbox.m_capital__orders
WHERE company_id IN (2,3,5)
ORDER BY id LIMIT 100001
SETTINGS max_execution_time=30, max_rows_to_read=1000000, result_overflow_mode='throw', output_format_json_quote_decimals=1
FORMAT JSON;
