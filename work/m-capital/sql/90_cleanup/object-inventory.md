# Project warehouse object inventory

Run: `m_capital_20260925_g176`. **43 tracked objects**, all in sandbox; no objects deleted. The 41 source/foundation/prepared-model objects passed field verification. Final scenario/release verification is recorded in `evidence/m_capital_20260925_g176/investor-model/warehouse-review-manifest.json`; that manifest is authoritative for deployment completion. Internal working evidence, not publication approval.

## Frozen source tables (13)

Each table depends only on its corresponding generation-176 raw_odoo source extract. Exact extraction/DDL paths, row counts, SHA-256 hashes and field-for-field verification are in `evidence/m_capital_20260925_g176/source-manifest.json` and `warehouse-manifest.json`. Each table carries run ID, cutoffs, creation time and source-file hash.

- sandbox.m_capital__g176_20260925_sale_order
- sandbox.m_capital__g176_20260925_sale_order_line
- sandbox.m_capital__g176_20260925_account_move
- sandbox.m_capital__g176_20260925_account_move_line
- sandbox.m_capital__g176_20260925_sale_order_line_invoice_rel
- sandbox.m_capital__g176_20260925_res_partner
- sandbox.m_capital__g176_20260925_res_company
- sandbox.m_capital__g176_20260925_sale_subscription_plan
- sandbox.m_capital__g176_20260925_product_product
- sandbox.m_capital__g176_20260925_product_template
- sandbox.m_capital__g176_20260925_res_currency
- sandbox.m_capital__g176_20260925_res_currency_rate
- sandbox.m_capital__g176_20260925_res_country

## Current views (9)

SQL paths are relative to sql/20_models. Exact SQL hashes and timestamps are in model-deployment.json; full deployed DDL is in warehouse-object-evidence.json in the run evidence directory. SQL metadata contains the authoritative dependency lists.

| Exact object | SQL | Use |
| --- | --- | --- |
| sandbox.m_capital__customer_mapping | 01_customer_mapping.sql | Frozen partner/company identity; initial ownership labels are historical |
| sandbox.m_capital__orders | 06_orders.sql | Frozen orders/plans and mapping; order lifecycle/plan context |
| sandbox.m_capital__invoice_links | 07_invoice_links.sql | Frozen bridge, lines and order context; controlled link aggregation |
| sandbox.m_capital__invoice_facts | 08_invoice_facts.sql | Frozen invoice/product sources, mapping and links; product-line financial grain |
| sandbox.m_capital__invoice_controls | 09_invoice_controls.sql | Frozen headers and invoice_facts; header reconciliation |
| sandbox.m_capital__fx_context | 10_fx_context.sql | Frozen source dates, company/rate references; date/currency FX |
| sandbox.m_capital__invoice_attribution | 11_invoice_attribution.sql | invoice_facts, orders and frozen sale lines; controlled origin attribution |
| sandbox.m_capital__invoice_analysis | 12_invoice_analysis.sql | invoice_attribution and fx_context; approved invoice scope and USD |
| sandbox.m_capital__order_scope | 13_order_scope.sql | orders; approved contractual intercompany scope |

Use **approved_transaction_scope** in invoice_analysis and order_scope downstream. Do not interpret intermediate ownership-review labels for partners 10/663 as the current decision. approved-decisions.json records the override without modifying historical manifests.

## Superseded views — retain, do not consume (4)

These initial views exposed qualified column names from joined source fields; later views use explicit aliases and corrected lifecycle handling. They have no role in current analysis. Original SQL/hashes remain preserved; no ALTER, replacement or deletion was attempted.

| Exact object | Historical SQL | Replacement |
| --- | --- | --- |
| sandbox.m_capital__order_context | 02_order_context.sql | sandbox.m_capital__orders + sandbox.m_capital__order_scope |
| sandbox.m_capital__invoice_line_context | 03_invoice_line_context.sql | sandbox.m_capital__invoice_links |
| sandbox.m_capital__invoice_revenue | 04_invoice_revenue.sql | sandbox.m_capital__invoice_facts + sandbox.m_capital__invoice_analysis |
| sandbox.m_capital__invoice_reconciliation | 05_invoice_reconciliation.sql | sandbox.m_capital__invoice_controls |

## Frozen review model and forecast inputs (15)

Every field, including exact source JSON, is reconciled to the corresponding SHA-256-verified local dataset. The authoritative row counts, file/DDL paths and hashes are in `evidence/m_capital_20260925_g176/investor-model/warehouse-review-manifest.json`. Definitions are under `sql/30_analysis/frozen_review`. Values remain internal-review evidence, not investor certification.

- sandbox.m_capital__r1_20260925_contracts
- sandbox.m_capital__r1_20260925_contract_lines
- sandbox.m_capital__r1_20260925_customers
- sandbox.m_capital__r1_20260925_growth
- sandbox.m_capital__r1_20260925_invoice_lines
- sandbox.m_capital__r1_20260925_service_allocations
- sandbox.m_capital__r1_20260925_customer_months
- sandbox.m_capital__r1_20260925_price_reviews
- sandbox.m_capital__r1_20260925_missing_service_periods
- sandbox.m_capital__r1_20260925_allocation_controls
- sandbox.m_capital__r1_20260925_pipeline
- sandbox.m_capital__r1_20260925_fx
- sandbox.m_capital__r1_20260925_forecast_inputs
- sandbox.m_capital__r1_20260925_forecast_assumptions
- sandbox.m_capital__r1_20260925_summary

## Retention and cleanup

The final release additionally tracks:

- sandbox.m_capital__r1_20260925_forecast_results — 1,260 customer-year rows for the flat review case.
- sandbox.m_capital__r1_20260925_release_manifest — workbook/source/model/validation hashes and limitations.

Do not delete any listed object without explicit approval of exact targets and retention treatment. `review-only-cleanup.sql` contains commented exact targets, not executable cleanup. Preserve frozen sources and all dependencies of the issued internal-review workbook. If cleanup is later approved, review the complete deployed dependency graph first, remove only approved dependents before dependencies, and retain manifests and issued-output reproducibility. No wildcard drop or database-level cleanup is authorized.
