---
title: Pipedrive CRM user guide
status: draft
classification: confidential
owner: role:cso
---

# Pipedrive CRM user guide

Use this guide for everyday CRM entry and review. It consolidates the Organization instructions in the [CRM Data Hygiene and Customization Log](https://circularo.atlassian.net/wiki/spaces/Sales/pages/735182849/CRM+Data+Hygiene+Customization+Log) against the October 16, 2026 audit and completed Parent migration. Current Pipedrive field names are used throughout.

**Draft for owner review.** This is the replacement guide prepared for the repository; the Confluence page remains unchanged as historical context. Organization configuration and usage were audited. The user subsequently authorized the separate Partner type, Partner roles and Partner tier structure described below; see its [implementation record](partner-classification/README.md). The short Persons and Deals sections carry forward recorded instructions that still require their own entity audits. Other proposed field renames and retirements remain unimplemented.

## Create or review an organization

1. Search for an existing organization before creating one. Check the specific business/legal entity and location; a shared name or website does not by itself make two records duplicates.
2. Enter a recognizable **Name**, assign the correct **Owner**, and add **Website** and a useful **Address** when known. Leave unknown values blank.
3. Choose **Type** for the organization's relationship to Circularo and **Status** for its current engagement. Use the actual labels below.
4. Assign **Priority** to customers, qualified prospects and partners under the recorded strategic-priority rule; early-stage leads are excluded from that rule.
5. For partners, review primary **Partner type** and multi-select **Partner roles**. Assign **Partner tier** only when confirmed. For customers and billing arrangements, review the separate **Role** field against the actual commercial arrangement.
6. Use **Related organizations** to record an evidenced corporate parent or daughter. Keep billing responsibility tied to the relevant contract/order.

Do not merge a subsidiary into its corporate group or a billing entity into an end customer solely to simplify the CRM.

## Type describes the relationship

**Type** supports multiple selections. The current options are **Customer, Partner, Prospect, Supplier, Internal and Competitor**.

| Type | Use |
| --- | --- |
| Customer | An established customer relationship supported by the commercial record |
| Partner | A partner relationship managed by Circularo |
| Prospect | A potential customer or partner relationship being developed |
| Supplier | An organization supplying Circularo |
| Internal | Circularo's own/internal organization context |
| Competitor | An identified competitive organization |

Customer + Partner is a legitimate combination. The log explicitly records Customer + Partner and Role = EndCustomer for partners that also consume Circularo; check the actual product/commercial arrangement before applying that rule. A Partner type tag alone does not establish signed partner status, a paid subscription or commercial eligibility.

Review Customer + Prospect combinations with the account owner rather than changing them automatically. Internal or competitor classifications can coexist with another independently supported relationship.

## Status describes engagement

**Status** is a single-select Organization field, independent of deal stages.

| Current option | Working guidance |
| --- | --- |
| Lead | A potential relationship in its early discussion or qualification stage |
| Prospect | An additional live option omitted from the old log's lifecycle list; its precise distinction from Lead needs owner confirmation |
| Active | Ongoing commercial or operational engagement, including an engaged prospect or partner |
| Re-engage | Under the recorded log rule, inactive for at least 12 months and worth reactivation |
| Dormant | A parked relationship with no current engagement; do not include it in automated outreach merely because it exists in CRM |
| Former | A past relationship that has ended |
| Disqualified | A relationship explicitly marked not to pursue |

**Active does not prove a current paid subscription.** Check the relevant contract and subscription records before making billing, customer-revenue or renewal conclusions.

The log describes one allowed automatic transition: Active → Re-engage after at least 12 months of inactivity. Its detailed trigger and follow-up instructions are inconsistent, and the live automations were not audited. Treat the rule as recorded intent, not proof that an automation is configured or safe to enable. Ask the CRM administrator to confirm it. Keep Former/Disqualified changes and reactivation of parked relationships under explicit owner control.

## Priority describes strategic importance

The current **Priority** values are:

| Priority | Recorded meaning |
| --- | --- |
| T1 | Top strategic priority |
| T2 | Medium strategic priority |
| T3 | Lower strategic priority |

Assess long-term customer lifetime value potential, reference/brand value and strategic relevance to Circularo. Priority applies to the organization, including partners; it is independent of deal stage, Hot/Warm labels and partner-program tiers.

The log's business rule requires Priority for Customers, Prospects and Partners, excluding early-stage leads. **The field is technically optional in Pipedrive** and was populated on 508 of 5,228 audited organizations. Optional configuration does not cancel the recorded business rule. Assign a considered value for the relevant accounts; leave genuinely unassigned values visible for review rather than bulk defaulting them.

## Partner type roles and tier are separate

Use these three fields independently. The existing **Role** field remains reserved for EndCustomer and BillingEntity.

| Field | Selections | How to use it |
| --- | --- | --- |
| Partner type | One primary value: Affiliate, Reseller or Distributor | Record the principal commercial model under the agreement. Leave blank for capability-only partners or an unresolved multi-model arrangement. |
| Partner roles | Any supported combination: Integration, Technology, On-Premise Solution, Co-Branded, Service Provider / Operator | Record what the partner delivers. Integration and Technology can coexist; Co-Branded and operating a service are different responsibilities. |
| Partner tier | One confirmed value: Authorized, Advanced or Strategic | All assignments were intentionally left blank during migration. Do not infer a tier from Priority, type, roles or paid plans. |

 Affiliate introduces the customer while Circularo contracts with and invoices that customer. A Reseller buys/resells and contracts with/invoices its end customer. A Distributor manages a downstream reseller channel. Apply the actual agreement; no type grants exclusivity or a program tier automatically.

Integration means delivering integration services; Technology means complementary products/connectors. On-Premise Solution describes self-hosted deployment/support capability. Co-Branded describes an agreed jointly branded offering. Service Provider / Operator means operating a service for customer organizations, whether independent or group companies. This role does not establish corporate ownership, invoice responsibility or EndCustomer status.

The migration maps existing capability tags rather than inventing new qualifications. No Service Provider / Operator assignments were inferred. The owner resolved the two initially ambiguous primary choices: S.S. Lootah Group (4198) and IntelliSoft Services DMCC (7484) both have **Reseller** as their primary Partner type, verified by API on 2026-10-17. IntelliSoft also has the **Integration** role.

The user deleted **Partner type (legacy)** and finalized the new field name **Partner type**. A complete live field listing on 2026-10-17 confirms the deletion and the current choices Affiliate, Reseller and Distributor. Use Partner type, Partner roles and Partner tier for classification; original mixed selections are preserved in the ignored migration backup. The audit's 111 organizations with profile tags but without Organization Type=Partner were not automatically reclassified; prospective and established relationships still need the partner owner's judgment. See the [classification definitions](partner-management-classification-recommendation.md).

## Role distinguishes who uses and who is billed

**Role** supports **EndCustomer**, **BillingEntity**, or both.

- **EndCustomer** identifies an organization actually using Circularo under a particular subscription, whether it pays directly or another group company pays on its behalf.
- **BillingEntity** identifies the legal organization receiving Circularo's invoices for that subscription.
- Select both when the same organization receives the invoices and also uses Circularo.

One enterprise subscription can serve multiple companies within a group. Create a separate **Organization** record for each known consuming company and track it as **Type = Customer**, **Role = EndCustomer**, even when it has no separate contract or invoice. Record the verified subscription association for the billing entity and every consuming company.

For example, one shared subscription can cover:

| Organization | Role | Subscription association |
| --- | --- | --- |
| Group Holding Ltd | BillingEntity | Subscription A |
| Group Manufacturing Ltd | EndCustomer | Subscription A |
| Group Services Ltd | EndCustomer | Subscription A |

If Group Holding also uses Circularo, select both roles on its record. Count the subscription's revenue once; track the number of consuming companies separately from billing entities and subscriptions. Do not copy the full subscription revenue onto every EndCustomer record.

Use native parent–daughter relationships for corporate ownership. The shared subscription association identifies which companies receive service under the billing arrangement; corporate hierarchy alone does not establish that association.

The existing **Subscription** field remains integration-managed and must not be edited manually. Have the integration owner maintain the verified links. Where an organization uses several subscriptions, this single field can only provide a primary link: the complete mapping must support multiple organizations per subscription and multiple subscriptions per organization. This guide does not imply that the complete mapping is already implemented in CRM.

**Corporate parenthood does not establish who pays for every order.** Confirm the contracting entity and invoice recipient from the actual arrangement. Odoo stores order customer, bill-to and ship-to separately; the audit found 990 orders whose bill-to differs from the order customer. Do not infer billing or ARR allocation from a native parent relationship or Role alone.

## Use native organization relationships for hierarchy

Manage corporate groups, subsidiaries and branches through **Related organizations** and the native Parent/Daughter choices.

The approved migration created **153 relationships** and verified **156 valid mappings**, including three existing matches. Fourteen self-referencing custom Parent values were cleared separately. The old custom **Parent** field still exists for legacy dependencies; use native hierarchy for the migrated relationships. Do not delete the field or resolve conflicting legacy values without the recorded cleanup decisions.

Six source mappings remain unresolved: four reference unavailable parent records, one reverses an existing native hierarchy, and one overlaps an existing Related relationship. Escalate these to the CRM owner; the [migration report](parent-cleanup/local/final-report.md) has the exact records.

## Track service provision separately from corporate ownership

A service provider can deliver Circularo to independent companies as well as companies within its own group. A company may therefore belong to one corporate group while receiving service through an unrelated provider. The group example above also applies to shared-service arrangements between independent organizations.

Keep the following relationships distinct:

| Relationship | Example | Recommended representation |
| --- | --- | --- |
| Corporate ownership | Holding A owns Company B | Native Parent/Daughter between the organizations |
| Service provision | Provider C delivers Circularo to Company B | Separate directed provider-to-end-customer association |
| Billing | Provider C receives Circularo's invoices for Subscription S | BillingEntity associated with that subscription |
| Service consumption | Companies B and D use Subscription S | EndCustomer associations with that subscription |

**Reserve native Parent/Daughter for corporate structure.** Do not place an independent end customer beneath its service provider in the corporate hierarchy merely because it receives service from that provider. Likewise, a technical parent/child tenant structure does not establish corporate ownership or billing responsibility.

### Recommended service association

Keep a separate Organization record for each provider and consuming company. The service association should identify the **Provider organization**, **EndCustomer organization** and **Subscription reference**. Include **tenant identity** where needed to distinguish the technical service environment; a tenant ID is not a substitute for a subscription reference.

Support several end customers per provider/subscription and, where applicable, several providers or subscriptions per end customer. Start with these directed associations. Introduce a service hierarchy only if nested providers or tenants create a real navigation or reporting need.

Keep **Role** focused on billing and consumption. BillingEntity does not automatically mean service provider, and providing a service does not automatically make the provider an EndCustomer. Assign both existing roles only when the organization actually receives Circularo's invoices and consumes the service in the relevant arrangement. These recommendations do not require a new Role option.

Do not ignore provider-to-customer relationships when tracking end customers, or infer them from shared corporate ownership. The existing Role selections and single Subscription field cannot express the complete association by themselves. The CRM/integration owner should approve where these associations are maintained and how users can view them. This is a model recommendation; no separate service-association feature or tenant hierarchy is claimed to be implemented in Pipedrive.

## Contact address and integration fields

| Current field | What users should do |
| --- | --- |
| Short Title | Use a helpful abbreviation if needed. It is optional and is not a unique identifier. |
| Website / LinkedIn profile | Enter verified organization URLs. A shared domain may belong to several legitimate entities. |
| Address | Record the intended business location. Distinguish office location from registered/billing address. |
| Country, City, State, Street, Street 2, Zip | Preserve existing custom values until the address migration is approved. Do not clear these as duplicates: 588 custom countries and 658 custom cities lack corresponding native components. |
| VAT | Use the exact identifier for the correct legal entity, confirmed with Finance/Odoo. Preserve prefixes and leading zeros. Do not enter `false` as a placeholder. |
| Email / Phone / Mobile | Use verified contact details. Confirm whether they belong to the organization or an individual; do not move or delete personal details as part of this Organization-only cleanup. |
| Subscription | **Do not edit manually.** The log identifies this as a managed link to Subscription Details Preview. It points to one subscription, not the full customer portfolio. Ask the integration owner to fix a missing or wrong link. |
| Synchronize | Coordinate changes with the integration owner. Yes records an integration selection/request; it does not prove that synchronization succeeded. |
| Industry / Annual revenue / Number of employees | Enter sourced organization-level enrichment when known. Annual revenue is the organization's revenue band, not revenue earned by Circularo. |
| Labels | Existing labels mix campaigns, classification, status and priority. Do not use a conflicting label as an automatic reason to overwrite Type, Status or Priority. Have the owner reconcile the discrepancy. |

Several Odoo company records can map to one CRM organization. Never replace the explicit mapping with a guessed single company ID or overwrite legal/tax information from an arbitrary linked entity.

## Persons and Deals instructions awaiting their own audits

These are carried forward from the log, not newly verified field definitions or current population statistics.

**Person email.** The recorded rule allows automated communication only for **Email Status = valid**. Other recorded values are invalid, disposable, unknown and accept_all_unverifiable. Do not treat unknown or accept-all as confirmed valid. The log's email-validation totals are historical and internally inconsistent, so no current contact counts are carried into this guide.

**Deal Commercial Volume.** The log instructs users to record the licensed-user count and/or annual transaction volume supporting the deal's pricing, for example **100 users**, **8,000 transactions per year**, or **5,000 transactions per year with 25 users**. The Deal field's current existence, type and usage still need verification in the planned Deals audit.

The Organization audit does not establish that Persons use the same Status options or that the contact/deal automations described in the log are deployed.

## What has changed since the Confluence log

Comparison is with **version 14, last saved March 9, 2026**. Its Last Reviewed entry is blank.

| Log statement or omission | Audited position |
| --- | --- |
| Type simplified to three values in one summary, six in another section | Six values are live. This guide uses that complete list. |
| An older twelve-value Type list remains in the page | Historical description; it does not describe the current field. |
| Lifecycle list contains six statuses | Seven are live, including Prospect. Its definition needs clarification. |
| Priority is mandatory | Recorded business requirement, but the live mandatory flag is false and usage is incomplete. |
| Partner type used only with Partner Type | This is recorded intent, not consistent current data; 111 tagged organizations lack Partner. |
| Parent/billing hierarchy is presented as a complete billing model | Native hierarchy migration is complete for 156 valid mappings; actual billing roles remain transaction-specific. |
| Subscription must not be edited | Still applicable guidance. The audit found 213 populated references: 210 URLs and three bare identifiers, all resolving to Odoo reference tokens. |
| Only Active → Re-engage automation is allowed, followed by broader conditions and campaign suggestions | Internally inconsistent instructions; live automation implementation remains unverified. |
| Person email-validation figures are presented as totals | Different totals are mixed and validation categories do not reconcile exactly; do not reuse as current statistics. |
| Named CRM admin list includes a deactivated account | Confirm current administrator responsibility; do not rely on the old list. |

## Proposed changes are still separate

The original no-new-fields / broad-Partner-profile proposal has been superseded by the user-approved three-field partner structure above. Other proposed field renames, native address consolidation and eventual retirement of legacy Parent/address fields remain unimplemented. Use the current UI names in this guide.

For the full evidence, proposed dictionary and implementation sequence, see the [field audit](organization-fields-audit/pipedrive-organization-fields-audit.md), [target model](organization-fields-audit/pipedrive-organization-target-model.md), and [cleanup plan](organization-fields-audit/pipedrive-organization-cleanup-plan.md). Sales Operations/CSO should confirm the working definitions and Priority rule; Finance should confirm billing/tax usage; the CRM/integration owner should confirm automation and managed-field behavior before this draft becomes the maintained operating guide.
