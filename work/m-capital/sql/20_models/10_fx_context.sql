/*---
kind: view
project_id: m-capital
database: sandbox
name: sandbox.m_capital__fx_context
status: exploratory; source-math-validated-separately
purpose: Point-in-time company-specific transaction-to-USD FX for invoice and contract anchors
grain: company_id + currency_id + fx_date
as_of_date: 2026-09-06
source: [sandbox.m_capital__g176_20260925_account_move, sandbox.m_capital__g176_20260925_sale_order, sandbox.m_capital__g176_20260925_res_currency_rate, sandbox.m_capital__g176_20260925_res_company]
depends_on: [sandbox.m_capital__g176_20260925_account_move, sandbox.m_capital__g176_20260925_sale_order, sandbox.m_capital__g176_20260925_res_currency_rate, sandbox.m_capital__g176_20260925_res_company]
scope: {company_ids: [2, 3, 5]}
owner: Finance / Revenue Operations
created_for: M-Capital investor analysis
materialization: view over frozen sources
fx_policy: latest positive company rate on/before metric date; native currency identity; no missing-rate substitution
---*/
CREATE VIEW sandbox.m_capital__fx_context SQL SECURITY INVOKER AS
WITH keys AS (
 SELECT DISTINCT assumeNotNull(company_id) AS company_id, assumeNotNull(currency_id) AS currency_id, assumeNotNull(invoice_date) AS fx_date
 FROM sandbox.m_capital__g176_20260925_account_move WHERE company_id IS NOT NULL AND currency_id IS NOT NULL AND invoice_date IS NOT NULL
 UNION DISTINCT
 SELECT DISTINCT assumeNotNull(company_id) AS company_id, assumeNotNull(currency_id) AS currency_id, toDate32(source_cutoff) AS fx_date
 FROM sandbox.m_capital__g176_20260925_sale_order WHERE company_id IS NOT NULL AND currency_id IS NOT NULL
 UNION DISTINCT
 SELECT DISTINCT assumeNotNull(company_id) AS company_id, assumeNotNull(currency_id) AS currency_id, assumeNotNull(start_date) AS fx_date
 FROM sandbox.m_capital__g176_20260925_sale_order WHERE company_id IS NOT NULL AND currency_id IS NOT NULL AND start_date IS NOT NULL
), rates AS (
 SELECT assumeNotNull(company_id) AS rate_company_id, assumeNotNull(currency_id) AS rate_currency_id,
        assumeNotNull(name) AS rate_date, id AS rate_id, assumeNotNull(rate) AS rate
 FROM sandbox.m_capital__g176_20260925_res_currency_rate
 WHERE company_id IN (2,3,5) AND currency_id IS NOT NULL AND name IS NOT NULL AND rate>0
 ORDER BY rate_company_id, rate_currency_id, rate_date
)
SELECT k.company_id AS company_id, k.currency_id AS currency_id, k.fx_date AS fx_date,
       c.currency_id AS company_currency_id,
       src.rate_id AS source_rate_id, src.rate_date AS source_rate_date, src.rate AS source_rate,
       usd.rate_id AS usd_rate_id, usd.rate_date AS usd_rate_date, usd.rate AS usd_rate,
       if(k.currency_id=2,toDecimal128(1,9),
          if(c.currency_id=2,toDecimal128(1,9),usd.rate) /
          nullIf(if(k.currency_id=c.currency_id,toDecimal128(1,9),src.rate),0)) AS rate_to_usd,
       multiIf(k.currency_id=2,'native_USD',
               c.currency_id IS NULL,'missing_company_currency',
               k.currency_id!=c.currency_id AND src.rate IS NULL,'missing_source_rate',
               c.currency_id!=2 AND usd.rate IS NULL,'missing_USD_rate',
               'company_specific_asof') AS fx_status
FROM keys AS k
LEFT JOIN sandbox.m_capital__g176_20260925_res_company AS c ON k.company_id=c.id
LEFT ASOF JOIN rates AS src ON k.company_id=src.rate_company_id AND k.currency_id=src.rate_currency_id AND k.fx_date>=src.rate_date
LEFT ASOF JOIN (SELECT * FROM rates WHERE rate_currency_id=2) AS usd ON k.company_id=usd.rate_company_id AND k.fx_date>=usd.rate_date
SETTINGS join_use_nulls=1;

