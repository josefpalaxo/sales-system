---
title: Proposed Pipedrive organization target model
status: draft
classification: confidential
owner: role:cso
---

# Proposed Pipedrive organization target model

**Candidate CRM field dictionary for approval.** This document becomes an operational standard only after accountable Sales Operations/CSO, Finance and integration-owner review. It is not approved merely because it is called a dictionary. After approval, promote one maintained version to the shared library with approval, review dates and source lineage; point integrations and future agents to that version.

Evidence: [complete audit](pipedrive-organization-fields-audit.md), based primarily on ClickHouse with live Pipedrive verification. The user subsequently authorized the [partner classification structure](../partner-management-classification-recommendation.md), a single-select primary Partner type, and Authorized/Advanced/Strategic tier options with no inferred tier assignments. That approved change supersedes the original broad Partner profile recommendation; the other cleanup proposals remain drafts. See the [implementation record](../partner-classification/README.md) for execution status and field keys.

## Model decisions

1. Keep one Pipedrive organization per managed business organization or independently managed regional legal entity. Preserve meaningful subsidiaries/branches using native parent–daughter relationships. A brand, product tenant, legal bill-to and corporate parent are different identities.
2. Keep CRM Name as the recognizable organization name. Odoo owns verified legal billing name, tax identity and invoice address for the linked legal entity. Do not overwrite CRM names with an inferred legal name or merge records sharing a website.
3. Separate Organization Type, engagement Status, primary commercial Partner type, Partner roles, Partner tier, account Priority and order-specific commercial Role. Organization Type and Partner roles remain multi-select; primary Partner type is single-select.
4. Preserve existing keys, option IDs and legacy values. Because field types cannot be changed in place, the approved primary Partner type uses a new field/key and new option IDs. Partner roles and Partner tier also have their own keys and options. Do not transfer old numeric IDs between fields.
5. Use native Address and native organization relationships, with a lossless transition from legacy address/Parent fields. Keep Odoo billing addresses distinct if they represent a different location or legal entity.
6. The approved partner change adds three fields: primary Partner type, Partner roles and Partner tier. The user subsequently deleted the mixed Partner type (legacy) field; its original values remain in the ignored migration backup. Do not add other speculative legal-name, domain, Odoo-ID or sync-status fields. Parent/address retirement and Mobile ownership review remain separate proposals.

## Core identity and native fields

“Required” below is proposed business process validation, not a claim about current API enforcement. Only Name and a valid Owner should be unconditional human-workflow requirements. Conditional requirements should be enforced at the relevant qualification/billing/sync step, without inventing defaults for historical records.

| Recommended name | API / native representation | Definition and allowed values | Type / kind | Required | On creation form | Source of truth | Action / migration |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Organization name | `name` | Recognizable name of the specific managed organization/entity; not a unique key | Text, standard | Yes | Yes | Pipedrive owner; verified legal name remains Odoo | Keep; investigate duplicates with IDs, entity evidence and mappings |
| Owner | `owner_id` | Accountable CRM account owner; valid active Pipedrive user ID | User, standard | Yes, may default to creator | Yes | Pipedrive | Keep; review reassignment separately |
| Website | `website` | Official organization website, preferably canonical HTTPS URL | Text, standard | When known; not globally required | Yes | Verified organization source/enrichment, curated in CRM | Keep; preserve original before normalization |
| Address | `address` and native components | One explicitly chosen business location; nested country, locality, region, street, postal code, unit and formatted value | Address, standard | Before workflows needing a physical location; never fabricate | Yes, optional | Pipedrive for CRM business location; Odoo for bill-to/registered address | Keep; reconcile custom fragments before retirement |
| Industry | `industry` | Primary industry using existing 20 native categories; current IDs 1–20 | Single option, standard | No | No | Verified enrichment / account owner | Keep options and IDs; no sector inference from company name alone |
| Annual revenue band | `annual_revenue` | Organization's external annual-revenue band, not revenue paid to Circularo | Single option, standard | No | No | Dated verified enrichment | Keep 2–6 current bands; do not use option 1 (“0”) as unknown or genuine zero without verification |
| Number of employees | `employee_count` | Organization/entity headcount as a non-negative integer with source/date | Integer, standard | No | No | Dated verified enrichment | Keep; do not confuse group headcount with subsidiary headcount |
| LinkedIn profile | `linkedin` | Organization's company page URL | Text, standard | No | No | Verified company profile | Keep; move off creation form for a simpler first entry |
| Labels | `label_ids` | Tactical campaigns, event/source participation or temporary working tags | Multiple options, standard | No | No | Pipedrive campaign/account owner | Keep facility; gradually remove duplicate classification/priority labels after reconciliation |
| Visible to | `visible_to` | Approved Pipedrive record visibility option | System visibility, standard | System default under access policy | Default only; preserve current policy | CRM administrator | Keep; do not change source-wide “All users” as part of field cleanup |
| Corporate hierarchy | Native organization relationships | Directed parent–daughter structure between organization IDs; lateral Related is separate | Native relationship, not a new field | Only where evidenced | No; manage after creation | Pipedrive native relationships | Keep completed migration; resolve six exceptions and ingest native edges before deleting legacy Parent |

Registered/legal billing addresses are not interchangeable with office locations. If a custom field currently means country of operation or registration rather than the native address country, preserve that distinction in the approved mapping. Do not silently overwrite a legitimate location difference.

## Retained custom fields and stable keys

The partner fields below are the user-approved replacement structure. Other display-name proposals do not change existing keys or option IDs.

| Recommended name | Existing name | Stable API key | Type | Business definition | Required / creation form | Authority and cleanup |
| --- | --- | --- | --- | --- | --- | --- |
| Relationship types | Type | `9f4d8f04d3e18a2c781b0bf3ab2cfcaa582f3c26` | Multiple options | Organization's supported relationship classes with Circularo; several may coexist | Before qualification / Yes | Sales owner, supported by commercial evidence; review conflicting labels and 3 Customer+Prospect selections |
| Relationship status | Status | `4592424ed0f12e2e40ea9d0eac26f3de724e409d` | Single option | Current overall relationship/engagement lifecycle; not contract activity or revenue recognition | Before qualification for sales/partner-managed accounts / Yes | Sales owner; preserve unknown on legacy imports |
| Account priority | Priority | `fcc4f09a33d88f75cc249ba7a67fefbfa6cf22c8` | Single option | Strategic importance of the account | Recorded rule: Customers, qualified Prospects and Partners, excluding early-stage leads / Yes | Sales leadership; technically optional in current UI; reconcile T1/T2/T3 labels and retain IDs |
| Partner type | New primary field | `cd569fe5329e8bbf415aaa33472cbecd51f2a684` | Single option | Primary commercial model: Affiliate, Reseller or Distributor | Where a commercial model is evidenced / Yes, optional | Partner owner; ambiguous or capability-only organizations remain unassigned |
| Partner roles | New field | `347ded3ea6ad55931f54392ec2a01b096c62d709` | Multiple options | Integration, Technology, On-Premise Solution, Co-Branded, Service Provider / Operator | When evidenced / Yes, optional | Existing capability selections are mapped; service operation is not inferred from branding or hierarchy |
| Partner tier | New field | `3a961bca78607f537fbb60e3767876c5f10635be` | Single option | Authorized, Advanced or Strategic program level | No / No | User approved the options and explicitly left every assignment blank pending confirmation |
| Commercial roles | Role | `5b49c60371576e156fe1c7aceda3090aba59164a` | Multiple options | Account can participate as end customer and/or bill-to entity | For relevant customer/billing handoff / No | Finance/contract owner confirms; order-specific roles remain Odoo |
| Short name | Short Title | `af56dae7d1ec4927eee0de202a3d8fece9650cd6` | Text | Optional human-friendly abbreviation/acronym | No / No | Account owner; no uniqueness requirement |
| Primary subscription link | Subscription | `6765ba9a76a06eaf1b1202c44027a7ea70d1106d` | Text | Convenient link to one explicitly selected Circularo subscription; not the complete portfolio | No / No | Integration-managed from authoritative subscription identity; preserve CLI token and normalize 3 bare IDs after approval |
| Sync to Odoo | Synchronize | `111c175d27ece5be4a0f5ca30baabe463acd4d10` | Single option | Explicit request/eligibility to include organization in the Odoo integration | Before that integration only / No | Integration owner; Yes is request, not proof of successful sync |
| VAT / tax ID | VAT | `52a5a7a7c65560044f194d6dfbfe2b91a77584d5` | Text | Exact tax identifier for the specific linked legal entity, including meaningful prefixes/leading zeros | When billing process requires it / No | Odoo/Finance for linked legal entity; clear 3 literal false placeholders only after approval |
| Company email | Email | `df3765bea5f07ac3c158594bd41a9d781759b8eb` | Text | Shared company-level mailbox, where genuinely organization-owned | No / No | Account owner; review 3 syntax exceptions and personal addresses; no bulk contact migration in this audit |
| Company phone | Phone | `bd678b2acb8661dad8ea0948005021ada755db49` | Phone | Organization switchboard or shared business number | No / No | Account owner / linked verified business record; retain calling code and extensions |
| Company mobile | Mobile | `7877e44363e02eaef45e476d55b3f7daad8a0078` | Phone | Shared organization-owned mobile only | No / No | Keep existing data pending owner review of 40 records; individual mobiles belong to Persons in a separately approved scope |

Required-field configuration must respect the distinction between a business rule and UI/API behavior. Define descriptions, field ownership and validation first; avoid enabling global mandatory flags that block unrelated internal, supplier or competitor records. Do not set unclassified records to Prospect or all accounts to T3 merely to reach completeness.

## Allowed classifications and their meanings

These are **proposed definitions**, not claims that existing records already conform.

### Relationship types

| Existing ID | Value | Proposed meaning |
| --- | --- | --- |
| 14 | Customer | Organization has an established customer relationship, supported by contracts, orders or approved historical customer evidence; not necessarily currently subscribed |
| 12 | Partner | Organization participates in a commercially managed partner relationship; neither this selection nor a profile tag establishes a signed agreement or pricing eligibility |
| 18 | Prospect | Potential future customer/partner organization being developed without established customer status |
| 351 | Supplier | Organization supplies goods/services to Circularo; an Odoo supplier flag alone is evidence to review, not an automatic CRM classification |
| 352 | Internal | Circularo's own organization/entity or a deliberately internal account |
| 357 | Competitor | Identified competitive organization; it can also have another independently evidenced relationship |

Customer + Partner is valid. Prefer removing Prospect after a customer relationship is established; expansion opportunities belong in Deals. Review the three current Customer+Prospect accounts individually. Competitor + Partner can be a deliberate business relationship and should not be auto-corrected.

### Relationship status

| Existing ID | Value | Proposed meaning |
| --- | --- | --- |
| 333 | Lead | Unqualified or early relationship awaiting qualification |
| 365 | Prospect | Qualified relationship/opportunity under development; this is lifecycle stage, while Type indicates the relationship class |
| 334 | Active | Current ongoing engagement/relationship, including an active partner or prospect; **not** evidence of active paid subscription |
| 335 | Re-engage | Explicitly selected for a re-engagement effort, backed by an owner and a next activity |
| 336 | Dormant | No active engagement currently, without confirmed closure/disqualification |
| 337 | Disqualified | Owner has determined no relevant fit or disqualifying condition; preserve reason in normal account notes |
| 338 | Former | Previously established relationship has ended; preserve historical Type and contract records |

Retain all seven IDs initially. Re-engage is an action-oriented state; its continued usefulness should be reviewed after the owner defines a next-activity rule. Do not merge its 16 records wholesale into Dormant. For Internal/Supplier/Competitor accounts outside managed commercial engagement, Status may remain blank; exclude them from sales-status completeness KPIs when appropriate.

### Account priority

| Existing ID | Value | Proposed meaning |
| --- | --- | --- |
| 358 | T1 | Top strategic priority |
| 359 | T2 | Medium strategic priority |
| 360 | T3 | Lower strategic priority |

Blank means unassigned. The subsequently reviewed [Confluence log](https://circularo.atlassian.net/wiki/spaces/Sales/pages/735182849/CRM+Data+Hygiene+Customization+Log), version 14, records Priority as required for Customers, Prospects and Partners except early-stage leads, with long-term customer lifetime value potential, reference/brand value and strategic relevance as criteria. The live field is technically optional; that does not cancel the recorded business rule. Confirm the rule and review cadence with Sales leadership rather than replacing it with an optional business policy. Do not infer priority from company size, label color, customer status or annual revenue alone. T1/T2/T3 are account priorities, not partner-program tiers. See the [replacement user guide](../pipedrive-crm-user-guide.md).

### Partner commercial model roles and tier

The user-approved [classification recommendation](../partner-management-classification-recommendation.md) replaces the earlier broad Partner profile proposal.

| Field | New option ID | Value | Meaning / safeguard |
| --- | --- | --- | --- |
| Partner type | 400 | Affiliate | Introduces customers for agreed commission; Circularo invoices the end customer under the agreement |
| Partner type | 401 | Reseller | Buys/resells and contracts with/invoices the end customer under the agreement |
| Partner type | 402 | Distributor | Supplies/manages a downstream reseller channel; no inferred exclusivity or tier |
| Partner roles | 403 | Integration | Delivers implementation/integration services |
| Partner roles | 404 | Technology | Provides complementary products, technology or reusable connectors |
| Partner roles | 405 | On-Premise Solution | Deploys/supports self-hosted environments; existing On-Premise tag mapped here |
| Partner roles | 406 | Co-Branded | Delivers an agreed jointly branded offering; no automatic branding rights |
| Partner roles | 407 | Service Provider / Operator | Operates a service for customer organizations; no automatic ownership or EndCustomer role |
| Partner tier | 408 | Authorized | Available tier option; assignment requires confirmation |
| Partner tier | 409 | Advanced | Available tier option; assignment requires confirmation |
| Partner tier | 410 | Strategic | Available tier option; assignment requires confirmation |

The migration assigned one primary commercial type where the legacy selections contained exactly one commercial model. Capability-only organizations received no guessed commercial type. The owner subsequently selected Reseller for S.S. Lootah Group and IntelliSoft Services DMCC; IntelliSoft also retains Integration in Partner roles. The old mixed field was deleted by the user, confirmed by API on 2026-10-17. Its historical key is `5df6908fdaef780d7159613c33be664c8239c30e`; use the new keys above. Organization Type and the existing EndCustomer/BillingEntity Role were not changed by this migration.

Partner roles support multiple selections. Service Provider / Operator and tier assignments are not inferred from old tags, corporate hierarchy, account Priority or paid plans. A prospective partner can retain evidenced roles without being automatically reclassified as Partner.

The [partner-program policy](../../../shared/playbooks/partners/Circularo%20Partner%20Program%20Policy.md) remains a draft. Creating tier options does not approve eligibility, prices, margins, commissions, territory rights or a Distributor-to-Master-Distributor relabeling. Historical field/option IDs remain preserved in the migration manifest and ignored backup.

### Commercial roles and synchronization

| Field | Existing ID | Allowed value | Meaning |
| --- | --- | --- | --- |
| Commercial roles | 354 | EndCustomer | Organization may be an end-user/customer entity in a commercial arrangement |
| Commercial roles | 355 | BillingEntity | Organization may be an invoice recipient/payer in an arrangement |
| Sync to Odoo | 306 | Yes | Explicitly included/requested for integration |
| Sync to Odoo | null | Unspecified | No affirmative request recorded; not proof that no Odoo record exists |

Commercial roles are multi-select: 121 existing accounts have both roles. Which entity pays for a specific order remains `partner_invoice_id`; order customer, ship-to, reseller and distributor references remain on the Odoo order/contract. No organization-level role identifies another organization's bill-to or fully represents a transaction.

## Fields to consolidate or retire

| Existing field | Key | Proposed final representation | Required / creation / authority | Migration requirement |
| --- | --- | --- | --- | --- |
| Parent | `b45e902759f6fb356e939c4b6d45245ecfedb637` | Native parent–daughter relationship | Evidenced only / No / Pipedrive native hierarchy | Migration of 156 valid mappings verified previously; resolve 6 exceptions, ingest native relationships, update consumers; user deletes field separately |
| Country | `626443f79e2b6af665b1f8f0aecd79c70829d6bd` | Native Address country, with country code derived in analytics | Conditional / under Address / verified location source | Preserve 588 custom-only countries; normalize aliases; review literal “2”, territories and conflicts |
| City | `6cf03850357f142a028c04b6422c983ee7e35018` | Native Address locality | Conditional / under Address / verified location source | Preserve 658 custom-only cities; reconcile roles and aliases |
| State | `282b246ef32afb4b5aa34b6d64f301973c85b254` | Native Address administrative region | Conditional / under Address / verified location source | Preserve 74 values; distinguish country-appended labels from names |
| Street | `e65d976692839a18283c192e78b66f0a27fd29f5` | Native Address value/route and number | Conditional / under Address / verified location source | Preserve all 692 values; no mechanical overwrite of parsed components |
| Street 2 | `e3e5cbc73bc4dcaaa1e977d0407170da5b9d21aa` | Lossless native unit/additional formatted address text where appropriate | No / under Address / verified location source | All 20 values need semantic review; if native representation cannot preserve them, keep this existing custom field as a documented exception |
| Zip | `dafe7fc005fc9bed3831ff5c303dac78910a94a6` | Native Address postal code | Country/process dependent / under Address / verified location source | Preserve all 241 values and leading zeros/spaces; do not coerce to numbers |

Six custom address-field retirements are a **desired final state**, not permission to delete now. If country/registration/territory meanings differ, or Street 2 cannot be represented losslessly, retain the affected existing field and revise the approved target rather than discarding meaning.

## Derived or external information — no new CRM fields

| Information | Representation / allowed values | Requirement / creation | Authority / reason |
| --- | --- | --- | --- |
| Normalized company domain | Derived hostname from Website; nullable; preserve source URL | No / No | Analytics/enrichment; 215 shared hostnames show it cannot be a unique legal-entity key |
| Registered legal name | Verified legal-entity name on the explicit Odoo/company mapping; product billing legal name is separately scoped evidence | At billing handoff, outside CRM global creation | Finance/Odoo; no demonstrated need for an independently editable CRM copy |
| Odoo identity | Existing `res_partner.id` and explicit `x_studio_pipedrive_id` mapping | At sync/billing handoff / No | Integration mapping; seven CRM accounts link to multiple Odoo companies |
| Complete subscriptions | Explicit subscription/contract lineage and organization links; retain all child records | At commercial workflow / No | Odoo contracts for commercial state, product source for technical state; CRM link is a convenience |
| Sync success/error/last run | Integration monitoring/logs and explicit match state | At integration operations / No | Integration service; a Yes option does not record outcome |
| Partner program eligibility | Approved agreement/program record; confirmed level may be recorded in the new Partner tier field | No inferred assignment | Tier options were user-approved; qualification rules and contractual eligibility remain governed separately |

If a separate CRM Legal Name field becomes necessary for quoting before Odoo exists, require evidence of that workflow, a defined owner and a synchronization rule before adding it. Do not introduce it merely because it is common in other CRMs.

## Retained system fields

Retain all standard/system fields in the [audit inventory](pipedrive-organization-fields-audit.md#complete-standardsystem-inventory). They remain Pipedrive-managed, not extra user-entered custom fields:

- `id`: immutable CRM record identity; not an external company's legal identifier.
- `add_time`, `update_time`: system creation/update provenance; preserve historical meaning even where import supports creation time.
- `is_deleted`: system deletion state; do not edit as part of this cleanup.
- `picture_id`: optional organization image, not mandatory input.
- `people_count`, `open_deals_count`, `won_deals_count`, `lost_deals_count`, `closed_deals_count`: related-contact/deal counts.
- `activities_count`, `done_activities_count`, `undone_activities_count`, `email_messages_count`, `notes_count`, `files_count`, `followers_count`: system rollups.
- `related_open_deals_count`, `related_won_deals_count`, `related_lost_deals_count`, `related_closed_deals_count`: Pipedrive's related-deal rollups; preserve native scope.
- `last_activity_id`, `next_activity_id` and legacy `last_activity_date`, `next_activity_date`: references/context, not manually maintained account facts.
- `smart_bcc_email`: Pipedrive routing metadata; not Company email.
- Legacy `label` and Address's 12 subfields remain native/alternate representations. Use modern `label_ids` and nested Address in integrations.

For all these system items: no additional human mandatory rule, no new creation-form input, native type/value semantics, source of truth Pipedrive. Optional response fields must be requested by the extractor if needed for reporting; null replicated values must remain unknown until extraction is fixed.

## Approval and maintenance

CSO/Sales Operations approve classification and priority meanings; Finance approves tax/legal/billing roles; the integration owner approves IDs, sync, address mappings and reporting changes. Record accepted exceptions, accountable ownership and real review dates before promoting this draft. This document does not authorize any bulk update, field rename, option-ID change or deletion.

The [cleanup plan](pipedrive-organization-cleanup-plan.md) specifies the sequence and acceptance checks.
