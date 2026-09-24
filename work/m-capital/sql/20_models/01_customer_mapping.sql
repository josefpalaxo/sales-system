/*---
kind: view
project_id: m-capital
database: sandbox
name: sandbox.m_capital__customer_mapping
status: exploratory
purpose: One Odoo partner with commercial identity and explicit related-party review status
grain: one partner_id
as_of_date: 2026-09-06
source: ["sandbox.m_capital__g176_20260925_res_partner"]
depends_on: ["sandbox.m_capital__g176_20260925_res_partner"]
scope: {company_ids: [2, 3, 5]}
source_cutoff: 2026-09-06 generation 176
reporting_cutoff: 2026-08-31 provisional
owner: Finance / Revenue Operations
created_for: M-Capital investor analysis
materialization: view over frozen sources
---*/
CREATE VIEW sandbox.m_capital__customer_mapping SQL SECURITY INVOKER AS
SELECT p.id AS partner_id, p.name AS partner_name, p.commercial_partner_id AS source_commercial_partner_id,
       coalesce(p.commercial_partner_id, toInt64(p.id)) AS commercial_partner_id,
       c.name AS commercial_partner_name, c.country_id AS commercial_country_id,
       if(c.id IS NULL, 'missing_commercial_partner', if(coalesce(c.commercial_partner_id,toInt64(c.id)) != c.id, 'nonterminal_commercial_partner', 'resolved')) AS identity_status,
       multiIf(coalesce(p.commercial_partner_id,toInt64(p.id)) IN (8,9,11), 'confirmed_group',
               coalesce(p.commercial_partner_id,toInt64(p.id)) = 231, 'confirmed_external_reseller',
               coalesce(p.commercial_partner_id,toInt64(p.id)) IN (1,10,465,663,1672,2124), 'ownership_review',
               'no_known_group_flag') AS ownership_status,
       p.parent_id, p.x_studio_is_partner, p.analysis_run_id, p.source_cutoff, p.reporting_cutoff
FROM sandbox.m_capital__g176_20260925_res_partner AS p
LEFT JOIN sandbox.m_capital__g176_20260925_res_partner AS c ON coalesce(p.commercial_partner_id,toInt64(p.id)) = c.id
SETTINGS join_use_nulls=1;

