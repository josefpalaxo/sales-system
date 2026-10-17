---
title: Pipedrive organization fields audit
status: draft
classification: confidential
owner: role:cso
---

# Pipedrive organization fields audit

**Historical baseline.** The later user-approved partner migration separates primary Partner type, Partner roles and Partner tier. The user subsequently deleted the old mixed field; its definitions and values remain in the ignored migration backup. The counts and original configuration below remain the audit snapshot. Use the [current guide](../pipedrive-crm-user-guide.md) and [partner implementation record](../partner-classification/README.md) for the revised structure; the original broad Partner profile recommendation is superseded.

Read-only review for owner approval. ClickHouse is the primary evidence source, following the user's explicit instruction; Pipedrive API reads verify metadata and selected records. This audit made no CRM, field, option, database or configuration changes. Earlier approved Parent cleanup is separate.

## Scope, evidence and freshness

- Primary field inventory: `raw_pipedrive.organization_fields`, 53 definitions: **19 custom and 34 standard/system fields**. Every definition, option ID and available configuration column was retrieved.
- Primary value population: `raw_pipedrive.organizations`, **5,228 rows / unique IDs**, no deleted rows. Extraction values span 2026-10-16 13:08:29.307–13:08:37.917; field metadata spans approximately 13:08:38. These are snapshot statistics, not a fresh live account census. The earlier live census contained 5,229 organizations.
- Verification: live v2 metadata contains the same 53 field codes, names, types and option definitions with **no differences**. Legacy v1 returns 57 entries, including address subfields and alternate representations. The union has 68 API keys; this is version/representation coverage, not 15 missing custom fields.
- Actual values: complete distinct-value frequency distributions for every custom field, with up to three example organization IDs per value; no sampling was used to calculate population or uniqueness.
- All raw values, definitions, model SQL, statistics and API verification evidence live in ignored [local evidence](local/). No raw contact lists or credential files are included in the proposed documents.
- Targeted live reads checked ten organizations selected from anomalies, plus a system-counter example. These confirm the selected findings, not the current population statistics for every organization.
- Relevant Odoo source snapshot: `raw_odoo.res_partner`, 3,225 unique records, extracted 2026-10-16 13:32:07.233; 1,207 company records. `raw_odoo.sale_order` has 2,760 records, including 2,422 with `is_subscription=true`. These snapshots are not perfectly simultaneous.

The prior migration created 153 native parent relationships, verified those plus 3 pre-existing matches, and separately cleared 14 self-referencing custom Parent values. The primary snapshot still shows the original 176 Parent values. That is known synchronization lag. Six source mappings remain unresolved. See the [migration final report](../parent-cleanup/local/final-report.md); do not reclassify its completed work as pending migration.

## Definitions used for statistics

“Populated” means non-null, non-empty stored text after the source column is converted to text; zero and false can be legitimate values for system fields. Percentages use all 5,228 organizations. Distinct values are exact raw representations; multi-option fields count distinct selection combinations, not individual options. Option tables below count organizations selecting each ID and therefore may sum above population. Literal `false` in VAT is a populated placeholder, not a valid tax ID.

For Labels, raw `[]` exists on 4,388 rows: **840 organizations actually have label selections**, despite all 5,228 having non-null serialized label values. Native Address has 1,215 non-empty values. Flattened native `address_country` and `address_locality` columns are entirely null, but the nested Address JSON contains 553 countries and 361 cities. Use nested values when assessing address usage.

## Complete custom-field inventory

| Field / inferred purpose | API key | Type | Populated / 5,228 | Distinct raw values | Recommendation |
| --- | --- | --- | --- | --- | --- |
| City — Legacy custom city text | `6cf03850357f142a028c04b6422c983ee7e35018` | varchar | 767 (14.67%) | 135 | Consolidate into native address after reconciliation |
| Country — Legacy custom country text | `626443f79e2b6af665b1f8f0aecd79c70829d6bd` | varchar | 799 (15.28%) | 58 | Consolidate into native address after reconciliation |
| Email — Company or shared mailbox contact | `df3765bea5f07ac3c158594bd41a9d781759b8eb` | varchar | 154 (2.95%) | 153 | Keep conditionally / rename to Company email |
| Mobile — Company-owned or individual mobile | `7877e44363e02eaef45e476d55b3f7daad8a0078` | phone | 40 (0.77%) | 40 | Review; retain until ownership and contact migration resolved |
| Parent — Legacy corporate parent organization | `b45e902759f6fb356e939c4b6d45245ecfedb637` | org | 176 (3.37%) | 128 | Replace with native relationships; retire after dependencies |
| Partner type — Partner models, capabilities and deployment tags | `5df6908fdaef780d7159613c33be664c8239c30e` | set | 275 (5.26%) | 14 | Rename to Partner profile; document facets |
| Phone — Company switchboard or business phone | `bd678b2acb8661dad8ea0948005021ada755db49` | phone | 196 (3.75%) | 194 | Keep / rename to Company phone |
| Priority — Sales account attention priority | `fcc4f09a33d88f75cc249ba7a67fefbfa6cf22c8` | enum | 508 (9.72%) | 3 | Keep / rename to Account priority |
| Role — Possible end-customer and bill-to participation | `5b49c60371576e156fe1c7aceda3090aba59164a` | set | 460 (8.80%) | 3 | Keep / rename to Commercial roles |
| Short Title — Convenient organization abbreviation | `af56dae7d1ec4927eee0de202a3d8fece9650cd6` | varchar | 515 (9.85%) | 502 | Keep / rename to Short name |
| State — Legacy custom state / region text | `282b246ef32afb4b5aa34b6d64f301973c85b254` | varchar | 74 (1.42%) | 37 | Consolidate into native address after reconciliation |
| Status — Overall account engagement lifecycle | `4592424ed0f12e2e40ea9d0eac26f3de724e409d` | enum | 1142 (21.84%) | 7 | Keep / rename to Relationship status |
| Street — Legacy custom street / address line | `e65d976692839a18283c192e78b66f0a27fd29f5` | varchar | 692 (13.24%) | 677 | Consolidate into native address after reconciliation |
| Street 2 — Legacy custom additional address line | `e3e5cbc73bc4dcaaa1e977d0407170da5b9d21aa` | varchar | 20 (0.38%) | 20 | Preserve in lossless address mapping before retirement |
| Subscription — Pointer to one Circularo subscription | `6765ba9a76a06eaf1b1202c44027a7ea70d1106d` | varchar | 213 (4.07%) | 213 | Modify / rename to Primary subscription link |
| Synchronize — Intent to include account in Odoo sync | `111c175d27ece5be4a0f5ca30baabe463acd4d10` | enum | 725 (13.87%) | 1 | Keep / rename to Sync to Odoo |
| Type — Business relationship classes | `9f4d8f04d3e18a2c781b0bf3ab2cfcaa582f3c26` | set | 1135 (21.71%) | 12 | Keep / rename to Relationship types |
| VAT — Organization tax registration reference | `52a5a7a7c65560044f194d6dfbfe2b91a77584d5` | varchar | 150 (2.87%) | 144 | Keep / rename to VAT / tax ID |
| Zip — Legacy custom postal code | `dafe7fc005fc9bed3831ff5c303dac78910a94a6` | varchar | 241 (4.61%) | 218 | Consolidate into native address after reconciliation |

All 19 custom fields are in use. Low usage alone does not justify deletion, particularly for contact, tax and integration fields. No invalid option IDs were found in any of the six custom option fields.

## Actual configuration

ClickHouse has null values for all replicated group, active, required, important and visibility flags. Null means unavailable, not false or inactive. The following configuration is verified through live legacy v1 reads. All 19 custom fields are active, editable, searchable, filterable and visible in detail; all have no description, are optional and are not marked important. Creation-form visibility varies:

| Custom field | Group ID | Creation form | Required | Important | Detail view | Active |
| --- | --- | --- | --- | --- | --- | --- |
| City | 12 | No | No | No | Yes | Yes |
| Country | 12 | No | No | No | Yes | Yes |
| Email | 12 | No | No | No | Yes | Yes |
| Mobile | 12 | No | No | No | Yes | Yes |
| Parent | 6 | Yes | No | No | Yes | Yes |
| Partner type | 15 | Yes | No | No | Yes | Yes |
| Phone | 12 | No | No | No | Yes | Yes |
| Priority | 15 | Yes | No | No | Yes | Yes |
| Role | 15 | No | No | No | Yes | Yes |
| Short Title | 15 | Yes | No | No | Yes | Yes |
| State | 12 | No | No | No | Yes | Yes |
| Status | 15 | Yes | No | No | Yes | Yes |
| Street | 12 | No | No | No | Yes | Yes |
| Street 2 | 12 | No | No | No | Yes | Yes |
| Subscription | 15 | No | No | No | Yes | Yes |
| Synchronize | 12 | No | No | No | Yes | Yes |
| Type | 15 | Yes | No | No | Yes | Yes |
| VAT | 12 | No | No | No | Yes | Yes |
| Zip | 12 | No | No | No | Yes | Yes |

Group IDs 6, 12 and 15 are verified; **their display names are not returned by the inspected documented field APIs and have not been verified**. Do not infer names from the fields they contain. Group membership and all other raw flags are preserved in [live v1 metadata](local/v1-organizationFields.json), including ordering, edit, bulk-edit, filtering and sort flags. Live v2 writable/optional-response flags are in [v2 metadata](local/v2-organizationFields.json).

The documented v2 `include_fields=ui_visibility,important_fields,required_fields` request returned HTTP 403; base v2 metadata and v1 flags were readable. This audit uses those available v1 flags and does not claim independent v2 namespace or UI verification. No custom field is marked important, so no stage-specific importance requirement was demonstrated. Legacy system `mandatory_flag=true` on counters or IDs is system metadata, not an instruction to ask users to enter counters.

## Complete standard/system inventory

The following are all 34 standard/system definitions from ClickHouse/v2. Raw null counters are extraction coverage gaps, **not evidence of no activities, deals or contacts**. For example, organization 1179 has null replicated counters but live Pipedrive reports 9 people, 16 activities, 6 notes and 1 won deal.

| Standard field | API key | Type | CH populated raw | Distinct raw | V2 optional response | Live add form / required flag |
| --- | --- | --- | --- | --- | --- | --- |
| Total activities | `activities_count` | int | 0 | 0 | Yes | No / true |
| Organization created | `add_time` | date | 5228 | 4240 | No | No / true |
| Address | `address` | address | 1215 | 1018 | No | Yes / false |
| Annual revenue | `annual_revenue` | enum | 419 | 5 | No | No / false |
| Closed deals | `closed_deals_count` | int | 0 | 0 | Yes | No / true |
| Done activities | `done_activities_count` | int | 0 | 0 | Yes | No / true |
| Email messages count | `email_messages_count` | int | 0 | 0 | Yes | No / true |
| Number of employees | `employee_count` | int | 448 | 239 | No | No / false |
| Files count | `files_count` | int | 0 | 0 | Yes | not returned in v1 |
| Followers count | `followers_count` | int | 0 | 0 | Yes | not returned in v1 |
| ID | `id` | int | 5228 | 5228 | No | No / true |
| Industry | `industry` | enum | 639 | 20 | No | No / false |
| Is deleted | `is_deleted` | boolean | 5228 | 1 | No | not returned in v1 |
| Labels | `label_ids` | set | 5228 | 72 | No | Yes / false |
| Last activity | `last_activity_id` | activity | 0 | 0 | Yes | not returned in v1 |
| LinkedIn profile | `linkedin` | varchar | 492 | 487 | No | Yes / false |
| Lost deals | `lost_deals_count` | int | 0 | 0 | Yes | No / true |
| Name | `name` | varchar | 5228 | 5121 | No | Yes / true |
| Next activity | `next_activity_id` | activity | 0 | 0 | Yes | not returned in v1 |
| Notes count | `notes_count` | int | 0 | 0 | Yes | not returned in v1 |
| Open deals | `open_deals_count` | double | 0 | 0 | Yes | No / true |
| Owner | `owner_id` | user | 5228 | 21 | No | Yes / true |
| People | `people_count` | double | 0 | 0 | Yes | No / true |
| Profile picture | `picture_id` | picture | 0 | 0 | No | No / true |
| Related closed deals | `related_closed_deals_count` | int | 0 | 0 | Yes | not returned in v1 |
| Related lost deals | `related_lost_deals_count` | int | 0 | 0 | Yes | not returned in v1 |
| Related open deals | `related_open_deals_count` | int | 0 | 0 | Yes | not returned in v1 |
| Related won deals | `related_won_deals_count` | int | 0 | 0 | Yes | not returned in v1 |
| Smart BCC email | `smart_bcc_email` | varchar | 0 | 0 | Yes | not returned in v1 |
| Activities to do | `undone_activities_count` | int | 0 | 0 | Yes | No / true |
| Update time | `update_time` | date | 5228 | 2731 | No | No / true |
| Visible to | `visible_to` | visible_to | 5228 | 1 | No | Yes / true |
| Website | `website` | varchar | 2775 | 2658 | No | Yes / false |
| Won deals | `won_deals_count` | int | 0 | 0 | Yes | No / true |

Additional live v1 keys, not separate custom fields:

| Live v1 additional key | Name | Type | Interpretation |
| --- | --- | --- | --- |
| `next_activity_date` | Next activity date | date | Legacy/alternate representation; not a new custom field |
| `last_activity_date` | Last activity date | date | Legacy/alternate representation; not a new custom field |
| `label` | Label | enum | Legacy/alternate representation; not a new custom field |
| `address_lat` | Latitude of Address | double | Native Address component; v2 stores in nested address |
| `address_long` | Longitude of Address | double | Native Address component; v2 stores in nested address |
| `address_subpremise` | Apartment/suite no of Address | varchar | Native Address component; v2 stores in nested address |
| `address_street_number` | House number of Address | varchar | Native Address component; v2 stores in nested address |
| `address_route` | Street/road name of Address | varchar | Native Address component; v2 stores in nested address |
| `address_sublocality` | District/sublocality of Address | varchar | Native Address component; v2 stores in nested address |
| `address_locality` | City/town/village/locality of Address | varchar | Native Address component; v2 stores in nested address |
| `address_admin_area_level_1` | State/county of Address | varchar | Native Address component; v2 stores in nested address |
| `address_admin_area_level_2` | Region of Address | varchar | Native Address component; v2 stores in nested address |
| `address_country` | Country of Address | varchar | Native Address component; v2 stores in nested address |
| `address_postal_code` | ZIP/Postal code of Address | varchar | Native Address component; v2 stores in nested address |
| `address_formatted_address` | Full/combined address of Address | varchar | Native Address component; v2 stores in nested address |

Latitude/longitude and activity-date usage were not supplied by the primary snapshot. Do not invent zero usage or delete these standard fields. The native address components should inherit the Address field's UI configuration rather than being configured as independent custom fields.

## Every configured option and observed usage

All current IDs below match between ClickHouse and base live v2 metadata. No options were created, relabeled or deleted.

### Annual revenue

| ID | Current label | Organizations selecting |
| --- | --- | --- |
| 1 | 0 | 0 |
| 2 | 1 - 10M USD | 95 |
| 3 | 10 - 100M USD | 142 |
| 4 | 100 - 1000M USD | 107 |
| 5 | 1 - 10B USD | 57 |
| 6 | 10+B USD | 18 |

### Industry

| ID | Current label | Organizations selecting |
| --- | --- | --- |
| 1 | Accommodation services | 23 |
| 2 | Administrative and support services | 8 |
| 3 | Construction | 33 |
| 4 | Consumer services | 7 |
| 5 | Education | 33 |
| 6 | Entertainment providers | 9 |
| 7 | Farming, ranching, forestry | 4 |
| 8 | Financial services | 86 |
| 9 | Government administration | 90 |
| 10 | Holding companies | 16 |
| 11 | Hospitals and health care | 29 |
| 12 | Manufacturing | 31 |
| 13 | Oil, gas, and mining | 11 |
| 14 | Professional services | 9 |
| 15 | Real estate and equipment rental services | 64 |
| 16 | Retail | 23 |
| 17 | Technology, information and media | 105 |
| 18 | Transportation, logistics, supply chain and storage | 29 |
| 19 | Utilities | 5 |
| 20 | Wholesale | 24 |

### Labels

| ID | Current label | Organizations selecting |
| --- | --- | --- |
| 47 | Customer | 191 |
| 393 | Strategic Deal | 3 |
| 371 | Imp Deal | 43 |
| 48 | Hot Deal | 27 |
| 49 | Warm Deal | 44 |
| 50 | Cold Deal | 84 |
| 61 | Reseller | 91 |
| 63 | Distributor | 4 |
| 158 | Gitex-2025 | 28 |
| 207 | LEAP2024 | 1 |
| 301 | GITEX-2024 | 1 |
| 309 | T1 | 44 |
| 310 | T2 | 66 |
| 311 | T3 | 112 |
| 313 | Prospect | 402 |
| 314 | GovSign | 1 |
| 315 | Supplier | 14 |
| 316 | Internal | 1 |
| 366 | Competitor | 19 |
| 367 | On hold | 41 |
| 368 | No Requirement | 2 |
| 369 | Lost | 19 |
| 370 | Re-Initiate | 15 |
| 388 | No Response | 7 |
| 389 | Initial Discussion | 4 |
| 394 | Lead In | 1 |

### Partner type

| ID | Current label | Organizations selecting |
| --- | --- | --- |
| 344 | Referral | 2 |
| 345 | Reseller | 217 |
| 346 | Distributor | 43 |
| 347 | Integration | 9 |
| 348 | On-Premise | 1 |
| 349 | Co-Branded | 18 |
| 353 | Technology | 4 |

### Priority

| ID | Current label | Organizations selecting |
| --- | --- | --- |
| 358 | T1 | 191 |
| 359 | T2 | 175 |
| 360 | T3 | 142 |

### Role

| ID | Current label | Organizations selecting |
| --- | --- | --- |
| 354 | EndCustomer | 445 |
| 355 | BillingEntity | 136 |

### Status

| ID | Current label | Organizations selecting |
| --- | --- | --- |
| 333 | Lead | 486 |
| 334 | Active | 220 |
| 335 | Re-engage | 16 |
| 336 | Dormant | 228 |
| 337 | Disqualified | 97 |
| 338 | Former | 38 |
| 365 | Prospect | 57 |

### Synchronize

| ID | Current label | Organizations selecting |
| --- | --- | --- |
| 306 | Yes | 725 |

### Type

| ID | Current label | Organizations selecting |
| --- | --- | --- |
| 14 | Customer | 231 |
| 12 | Partner | 220 |
| 18 | Prospect | 676 |
| 351 | Supplier | 2 |
| 352 | Internal | 9 |
| 357 | Competitor | 21 |

### Visible to

| ID | Current label | Organizations selecting |
| --- | --- | --- |
| 1 | Item owner | 0 |
| 3 | All users | 5228 |

The Annual revenue option “0” is a configured label, unused in the snapshot; it must not be treated as verified zero revenue. Industry and revenue are enrichment/context, not Circularo customer revenue. Visibility option 3 is selected on all source records; changing visibility is a separate access-control decision.

## Confirmed observations and implications

| Finding | Evidence | Assessment / recommendation |
| --- | --- | --- |
| Weak classification coverage | Type 1,135/5,228; Status 1,142/5,228 | Confirmed missing values; whether historical accounts need classification requires owner scope. Improve active-workflow completeness rather than mass defaulting all imports. |
| Partner fields disagree | 111 with Partner type selections but no Partner Type ID 12; 56 with ID 12 but no Partner type selections | Confirmed field mismatch, not proof that all 167 are wrong. Potential partners may carry a prospective profile. Approve semantics before reconciling. |
| Customer / Prospect overlap | 3 select both IDs 14 and 18; 24 select multiple Type values overall | Multiple relationships are valid, particularly Customer + Partner (16). Review only the prospect/customer overlap against the proposed meanings. |
| Active is not “paying customer” | 42 select Prospect and Active, including 1 also selecting Customer | Define Active as engagement/relationship state or review these records; never derive customer status or ARR from it alone. |
| Labels duplicate classification | 35 Customer-labelled accounts lack Customer Type; 75 Customer-Type accounts lack Customer label; reseller/distributor labels disagree with profiles on 26/1 accounts | Counts overlap. Labels should carry campaigns/tactical tags; governed classifications should use their own fields. No automatic winner. |
| Priority duplicates labels | T1/T2/T3 labels disagree with custom Priority on 3/7/6 records, including missing Priority | Use one accountable account-priority field. Labels are not partner-program tiers. |
| Partner type mixes concepts | Referral/Reseller/Distributor are commercial models; Integration/Technology capabilities; On-Premise deployment; Co-Branded a route/brand model | Rename to Partner profile and document these as typed profile tags. Do not use a mixed profile to infer pricing/eligibility. A separate capability field is a future option only if a workflow needs it. |
| Geography cannot simply be deleted | 588 custom countries and 658 custom cities lack corresponding native components | Migration must retain those values. 42 of 211 records containing both countries differ textually. |
| Some country differences are aliases | 29 Czech Republic/Czechia, 1 USA/United States and 1 Albania/Albanien pairs | Of 42 textual disagreements, 31 are recognizable same-country aliases. The remaining 11 need review, not a presumption that one source is wrong. |
| Custom Country contains non-country content | Literal “2” on 4 records; two multi-country strings; spelling/case/whitespace variants | Confirmed format issues. Review code “2”; do not interpret it as a country ID without lineage. Represent operating territories separately from one physical address. |
| Tax placeholder | VAT literal `false` on 3 records; confirmed live for 5229 | Treat as an import placeholder and propose clearing only after approval. Of 150 populated values, 147 are non-placeholder; distinct non-placeholder values = 143. Other format checks are not jurisdictional validation. |
| Company email quality | 154 populated; 3 fail a basic single-email syntax check | Review before correction; a syntax check does not prove deliverability. Some entries are individual mailboxes, so contact ownership requires review. |
| Subscription is an incomplete pointer | 210 URLs + 3 bare CLI IDs; 213 distinct extracted tokens, all found exactly in Odoo reference values | Preserve links and normalize representation after approval; do not treat one field as a complete contract register. Odoo has 489 distinct references across 1,270 sale-order rows; revision/lineage counts are not subscription counts. |
| Sync selection is intent, not result | 725 Yes selections; 1 lacks an Odoo company reference; 7 linked CRM organizations lack Yes | These are cross-system observations, not proven sync failures. Match status and last success belong to integration monitoring. |
| Cross-system IDs are not one-to-one | 740 matched Odoo company rows map to 731 CRM IDs; 7 CRM accounts have multiple Odoo company records | Preserve a mapping table and legal-entity grain. Do not force all links into one CRM Odoo ID or merge entities by name/domain. |
| Corporate Parent is superseded operationally | Prior approved migration verified 156 native mappings; custom field still exists; source still has 176 pre-cleanup values | Native relationships are the intended hierarchy. Resolve six exceptions and ingest relationships before field retirement. |
| Legacy analytics labels drift | `analytics.pipedrive_fact_organizations` has 57 rows showing `unknown(...)` labels | Its hardcoded dictionary misses current IDs such as 371, 388, 389, 393 and 394, and retains old labels such as Hot/Warm/Cold “lead” while current labels say “Deal”. Use current field-option metadata. |

Website values are present on 2,775 records (53.08%). Parsing them with a scheme when omitted and removing `www.` yields 2,479 hostnames; 215 hostnames occur on 511 records. This demonstrates why domain is useful for candidate matching but unsafe as a unique organization/legal-entity key. No populated website failed this basic hostname-shape check; ownership and validity were not verified.

Short Title has 515 populated values, 502 unique values and 13 repeated-value groups. These may be group acronyms, not errors. Keep it optional and never use it as an identity key. Phone has 196 populated values, Mobile 40 and Street 2 only 20; their business/individual ownership and integration use matter more than percentages.

## Dependencies and source ownership

All 19 custom field codes occur in:
- `raw_pipedrive.organizations` (source storage);
- `analytics.pipedrive_fact_organizations`;
- `mcp_analytics_sales._candidate_pipedrive_organizations_v1`;
- `mcp_analytics_sales.pipedrive_organizations` (metadata/comments and published columns).

Changing display names while preserving field codes/options is lower risk than recreating fields, but UI filters, automations, forms and external integrations still need review. Definitions were inspected; presence of a definition is not proof of runtime use, and query-log/dashboard/integration inventories were not available. Further consumers include the published organization-link and Odoo/subscription models; dependency arrays in system metadata are empty for these views, so do not mistake them for proof of no consumers.

`mcp_analytics_sales.organization_links` reports 740 matched company rows, 450 unlinked and 17 references not found; no invalid-reference or ambiguous-source-identity rows occurred in this snapshot. A CRM account can legitimately represent several Odoo company records. `raw_odoo.res_partner` contains the explicit `x_studio_pipedrive_id` reference, legal/tax/address and commercial-partner structure. Across 740 explicitly matched company pairs, both sides have VAT on 147; their tax strings all agree after case/punctuation normalization. Pair counts are not distinct CRM counts.

`raw_odoo.sale_order` contains bill-to, ship-to, reseller/distributor, subscription reference and state. Bill-to differs from order customer on 990 rows; ship-to on 46. These are order roles and cannot be replaced by a single organization-level BillingEntity flag. `analytics.circularo_dim_organizations` uses product organization/region/tenant identity and surfaces subscription legal/billing names; it is not a universal CRM organization identity map.

Recommended authority is Pipedrive for CRM relationship/engagement/account ownership, Odoo for verified legal billing/tax and commercial contract facts, product systems for technical subscription state, and the explicit cross-system mapping for identity links. These are proposed ownership rules, not claims that every current value has business approval.

## Representative records and retained evidence

The local value files retain every distinct actual custom value, its count and up to three source IDs. Examples below are traceable without copying customer addresses, phone numbers or tax IDs into this document.

| Field | Representative organization IDs | Evidence file |
| --- | --- | --- |
| City | [1179](https://circularo.pipedrive.com/organization/1179), [1207](https://circularo.pipedrive.com/organization/1207), [1238](https://circularo.pipedrive.com/organization/1238) | [values](local/values-6cf03850357f142a028c04b6422c983ee7e35018.json) |
| Country | [1179](https://circularo.pipedrive.com/organization/1179), [1194](https://circularo.pipedrive.com/organization/1194), [1186](https://circularo.pipedrive.com/organization/1186) | [values](local/values-626443f79e2b6af665b1f8f0aecd79c70829d6bd.json) |
| Email | [2468](https://circularo.pipedrive.com/organization/2468), [5231](https://circularo.pipedrive.com/organization/5231), [1988](https://circularo.pipedrive.com/organization/1988) | [values](local/values-df3765bea5f07ac3c158594bd41a9d781759b8eb.json) |
| Mobile | [7240](https://circularo.pipedrive.com/organization/7240), [6807](https://circularo.pipedrive.com/organization/6807), [4461](https://circularo.pipedrive.com/organization/4461) | [values](local/values-7877e44363e02eaef45e476d55b3f7daad8a0078.json) |
| Parent | [2729](https://circularo.pipedrive.com/organization/2729), [2748](https://circularo.pipedrive.com/organization/2748), [2755](https://circularo.pipedrive.com/organization/2755) | [values](local/values-b45e902759f6fb356e939c4b6d45245ecfedb637.json) |
| Partner type | [1379](https://circularo.pipedrive.com/organization/1379), [1386](https://circularo.pipedrive.com/organization/1386), [1414](https://circularo.pipedrive.com/organization/1414) | [values](local/values-5df6908fdaef780d7159613c33be664c8239c30e.json) |
| Phone | [1865](https://circularo.pipedrive.com/organization/1865), [3246](https://circularo.pipedrive.com/organization/3246), [2468](https://circularo.pipedrive.com/organization/2468) | [values](local/values-bd678b2acb8661dad8ea0948005021ada755db49.json) |
| Priority | [1207](https://circularo.pipedrive.com/organization/1207), [1258](https://circularo.pipedrive.com/organization/1258), [1290](https://circularo.pipedrive.com/organization/1290) | [values](local/values-fcc4f09a33d88f75cc249ba7a67fefbfa6cf22c8.json) |
| Role | [1179](https://circularo.pipedrive.com/organization/1179), [1194](https://circularo.pipedrive.com/organization/1194), [1207](https://circularo.pipedrive.com/organization/1207) | [values](local/values-5b49c60371576e156fe1c7aceda3090aba59164a.json) |
| Short Title | [3776](https://circularo.pipedrive.com/organization/3776), [5399](https://circularo.pipedrive.com/organization/5399), [4444](https://circularo.pipedrive.com/organization/4444) | [values](local/values-af56dae7d1ec4927eee0de202a3d8fece9650cd6.json) |
| State | [1179](https://circularo.pipedrive.com/organization/1179), [1290](https://circularo.pipedrive.com/organization/1290), [1952](https://circularo.pipedrive.com/organization/1952) | [values](local/values-282b246ef32afb4b5aa34b6d64f301973c85b254.json) |
| Status | [1180](https://circularo.pipedrive.com/organization/1180), [1173](https://circularo.pipedrive.com/organization/1173), [1190](https://circularo.pipedrive.com/organization/1190) | [values](local/values-4592424ed0f12e2e40ea9d0eac26f3de724e409d.json) |
| Street | [2928](https://circularo.pipedrive.com/organization/2928), [3117](https://circularo.pipedrive.com/organization/3117), [4569](https://circularo.pipedrive.com/organization/4569) | [values](local/values-e65d976692839a18283c192e78b66f0a27fd29f5.json) |
| Street 2 | [2984](https://circularo.pipedrive.com/organization/2984), [2057](https://circularo.pipedrive.com/organization/2057), [4264](https://circularo.pipedrive.com/organization/4264) | [values](local/values-e3e5cbc73bc4dcaaa1e977d0407170da5b9d21aa.json) |
| Subscription | [7052](https://circularo.pipedrive.com/organization/7052), [7392](https://circularo.pipedrive.com/organization/7392), [7491](https://circularo.pipedrive.com/organization/7491) | [values](local/values-6765ba9a76a06eaf1b1202c44027a7ea70d1106d.json) |
| Synchronize | [1179](https://circularo.pipedrive.com/organization/1179), [1194](https://circularo.pipedrive.com/organization/1194), [1186](https://circularo.pipedrive.com/organization/1186) | [values](local/values-111c175d27ece5be4a0f5ca30baabe463acd4d10.json) |
| Type | [1180](https://circularo.pipedrive.com/organization/1180), [1175](https://circularo.pipedrive.com/organization/1175), [1182](https://circularo.pipedrive.com/organization/1182) | [values](local/values-9f4d8f04d3e18a2c781b0bf3ab2cfcaa582f3c26.json) |
| VAT | [2985](https://circularo.pipedrive.com/organization/2985), [2984](https://circularo.pipedrive.com/organization/2984), [4204](https://circularo.pipedrive.com/organization/4204) | [values](local/values-52a5a7a7c65560044f194d6dfbfe2b91a77584d5.json) |
| Zip | [2123](https://circularo.pipedrive.com/organization/2123), [3033](https://circularo.pipedrive.com/organization/3033), [3444](https://circularo.pipedrive.com/organization/3444) | [values](local/values-dafe7fc005fc9bed3831ff5c303dac78910a94a6.json) |

Live verification additionally covered IDs 5229, 1414, 4228, 1179, 1674, 7052, 1386, 3172, 5268 and 6910. Examples: 1414 still has Reseller profile with Prospect Type; 4228 has Customer + Prospect; 5229 stores the literal VAT string `false`; 3172's Parent is now null. See [live record evidence](local/live-record-verification.json).

## Limits and review status

This is a confidential draft, not an approved policy or canonical dictionary. Group display names, v2 extended-namespace configuration, UI-only access restrictions, inactive/deleted field history, per-user visibility, actual automation dependencies and live population statistics are not fully verified. Current returned fields are active where v1 exposes the flag; no inactive custom field was returned. No alternative disappeared field history is inferred.

Per ClickHouse rules `agent-connect-mcp`, `agent-discovery-schema` and `agent-query-safety`, schema and storage context were inspected first. Source tables use Airbyte-row sorting and have no useful business-ID pruning for complete inventory. Scans were intentionally bounded: 30-second execution limits, generally 20,000 source rows or 500,000 rows for enriched view/join queries, explicit result limits and overflow failure where completeness matters. No schema or data mutations were run.

Official verification references: [Organization Fields API](https://developers.pipedrive.com/docs/api/v1/OrganizationFields), [Field groups](https://support.pipedrive.com/en/article/field-groups), [Custom fields](https://support.pipedrive.com/en/article/custom-fields). User/source data determines findings; these pages support API/configuration interpretation.

Continue with the [proposed field dictionary](pipedrive-organization-target-model.md) and [cleanup plan](pipedrive-organization-cleanup-plan.md).
