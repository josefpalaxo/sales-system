---
title: Partner management classification recommendation
status: draft
classification: confidential
owner: role:cso
---

# Partner management classification recommendation

Separate **Partner type**, which describes the commercial model, from **Partner roles**, which describe what the partner delivers. The user agreed to this classification direction in this conversation and requested that it be saved for future Codex reference.

This is the classification basis for the user's subsequently authorized CRM implementation: a single-select primary Partner type, multi-select Partner roles, and Partner tier options Authorized, Advanced and Strategic with all tier assignments left blank. See the [implementation record](partner-classification/README.md) for execution status, stable keys, mappings and exceptions. The classification approval does not establish approved commercial terms; broader partner-management policies remain in development.

## Partner type defines the commercial model

| Recommended value | Meaning |
| --- | --- |
| Affiliate | Introduces customers and earns an agreed commission. Circularo contracts with and invoices the end customer; the referral partner does not invoice that customer for the Circularo subscription. |
| Reseller | Buys from Circularo and resells to, contracts with and invoices the end customer under the applicable agreement. |
| Distributor | Supplies and manages a downstream reseller channel. Direct sales may also be permitted under its agreement; distributor status does not automatically establish exclusivity or a particular program tier. |

The user chose one **primary Partner type** at Organization level, reflecting the principal commercial agreement. If a partner is authorized for several commercial models, preserve those arrangements and identify the model applicable to each deal. Leave ambiguous primary assignments blank until reviewed; do not arbitrarily choose one old selection.

A technology-only or delivery-only partner can have Partner roles without a commercial Partner type. Leave the commercial type unassigned where none of the three models applies; do not classify such a partner as a Reseller merely to fill the field.

## Partner roles describe delivery and capabilities

**Partner roles should support multiple selections.**

| Recommended value | Meaning |
| --- | --- |
| Integration | Implements or maintains integrations for customers, including project-specific systems integration. |
| Technology | Provides complementary technology, products or reusable connectors that work with Circularo. |
| On-Premise Solution | Deploys and supports self-hosted Circularo environments. This describes a partner capability, not every customer's deployment preference. |
| Co-Branded | Delivers an offering under an agreed joint brand. The tag alone grants no branding rights and does not establish who hosts the service. |
| Service Provider / Operator | Operates a Circularo-based service for multiple customer organizations, including independent companies as well as group companies. It does not imply corporate ownership of those end customers. |

Integration and Technology may coexist when the partner both provides a product/connector and delivers integration services. Co-Branded and Service Provider may also coexist; branding and service operation are separate responsibilities.

For example:

| Field | Example value |
| --- | --- |
| Organization Type | Partner |
| Partner type | Reseller |
| Partner roles | Integration, On-Premise Solution, Co-Branded |

## Keep the other classifications independent

| Classification | Purpose |
| --- | --- |
| Organization Type | Customer, Partner, Prospect, Supplier, Internal or Competitor; multiple relationships may coexist. |
| Partner type | Commercial route: Affiliate, Reseller or Distributor. |
| Partner roles | Delivery, technology, branding and service-operation responsibilities; multiple roles may coexist. |
| Existing Role field | EndCustomer and/or BillingEntity in the relevant subscription arrangement. Keep this separate from Partner roles. |
| Partner tier | Authorized, Advanced or Strategic options, explicitly approved for field creation. Assignments remain blank until confirmed; creating the options does not approve qualification rules or commercial benefits. |
| Account Priority | Strategic account attention expressed as T1/T2/T3; not a partner-program tier. |

A service provider is not automatically an EndCustomer, and a BillingEntity is not automatically a service provider. Corporate Parent/Daughter relationships, provider-to-end-customer associations, and subscription/billing associations remain separate. See the [CRM user guide](pipedrive-crm-user-guide.md#track-service-provision-separately-from-corporate-ownership).

## Migration considerations

The original audit recorded a mixed multi-select Partner type containing Referral, Reseller, Distributor, Integration, On-Premise, Co-Branded and Technology. Preserve that audit as historical evidence. The migration initially retained that field as Partner type (legacy). The user subsequently deleted it and finalized the surviving single-select field name as Partner type. API verification on 2026-10-17 confirms Affiliate, Reseller and Distributor as its options, alongside the active Partner roles and Partner tier fields. Original values and definitions remain in the ignored migration backup.

For the user-approved migration:

1. Retain Referral, Reseller and Distributor as commercial classifications; move the meanings of Integration, Technology, On-Premise and Co-Branded into the separate Partner roles dimension.
2. Review the existing Reseller + Distributor combination before choosing a single primary type. Where multiple commercial models are legitimate, retain the agreement/deal context.
3. Review Service Provider / Operator assignments from actual service arrangements rather than deriving them automatically from Co-Branded or corporate hierarchy.
4. Verify current API capabilities and dependencies before deciding how to reuse or replace the existing field. Do not assume a field type can be changed in place or that option IDs transfer between fields.
5. Preserve original field keys, option IDs, values and mappings for traceability. Reconcile integrations, analytics, filters and partner-policy terminology before retiring old selections.

## Reference precedence and remaining decisions

This user-endorsed separation **replaces the earlier recommendation to retain one broad Partner profile field**. The [target model](organization-fields-audit/pipedrive-organization-target-model.md), [cleanup plan](organization-fields-audit/pipedrive-organization-cleanup-plan.md) and [CRM user guide](pipedrive-crm-user-guide.md) have been reconciled with it. The [field audit](organization-fields-audit/pipedrive-organization-fields-audit.md) remains historical evidence of the earlier configuration, not a competing target design.

The user-supplied [local partner-management README](/Users/josefneumann/Projects/ai-workspace/sales-repo/canonical/partner-management/README.md) describes a draft SaaS Reseller and Master Distributor program. The broader [Google partner-program draft](https://docs.google.com/document/d/16QLAr0qiijKRf-Ym_3SDWFURzXGUwQslUkXspvXklbg/edit) mixes commercial types with technical/operating categories. Reconcile its general partner-invoicing language with its Referral definition: the reseller invoicing model must not be applied to Referral partners.

The primary CRM field is now single-select by user decision; historical multi-model selections remain preserved in the migration backup and require deal/agreement context. Both initially ambiguous primary choices were resolved by the owner as Reseller. Policy owners still need to settle Distributor versus Master Distributor terminology, role qualification criteria and tier assignments/eligibility. Commission rates, margins, territory rights, exclusivity and contractual eligibility remain governed by separately approved agreements and policies; none are inferred from the field selections.
