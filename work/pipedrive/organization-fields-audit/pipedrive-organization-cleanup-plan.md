---
title: Pipedrive organization cleanup plan
status: draft
classification: confidential
owner: role:cso
---

# Pipedrive organization cleanup plan

This remains a cleanup proposal except for the subsequently user-approved partner classification change: primary Partner type, Partner roles and Partner tier. See its [implementation record](../partner-classification/README.md) for status. The original audit did not authorize changes; the later explicit user request and field decisions authorize that partner migration only. Other cleanup and Persons changes still require separate approval.

## Proposed disposition of every custom field

| Existing field | Action | Proposed name / destination | Priority | Risk | Prerequisite |
| --- | --- | --- | --- | --- | --- |
| Type | Retain, rename, define | Relationship types | P1 | Medium: semantic consumers | Approve meanings and review overlapping labels / 3 Customer+Prospect records |
| Status | Retain, rename, define | Relationship status | P1 | Medium | Define lifecycle independently of contract activity; retain all 7 IDs |
| Priority | Retain, rename, reconcile | Account priority | P1 | Medium | Approve rubric; reconcile 3/7/6 T1/T2/T3 label discrepancies |
| Partner type | Replacement completed; user deleted legacy field | Single-select Partner type + multi-select Partner roles | Approved partner scope | Medium | Original data is in the ignored backup; both multi-model primary choices were resolved by the owner as Reseller |
| New Partner roles | Create with five approved options | Integration, Technology, On-Premise Solution, Co-Branded, Service Provider / Operator | Approved partner scope | Medium | Map only existing capability tags; do not infer service operation |
| New Partner tier | Create; leave every assignment blank | Authorized, Advanced, Strategic | Approved partner scope | Medium | Assign tiers only on later confirmation; do not derive from Priority or roles |
| Role | Retain, rename, scope | Commercial roles | P1 | Medium | Finance confirms definitions; retain Odoo order-level roles |
| Short Title | Retain, rename | Short name | P2 | Low | Check display-name consumers; no uniqueness rule |
| Subscription | Retain, rename, normalize representation | Primary subscription link | P1 | Medium / integration sensitive | Preserve exact CLI identifier; verify links and organization association before updating 3 bare IDs |
| Synchronize | Retain, rename, clarify intent | Sync to Odoo | P1 | High if integration behavior changes | Owner confirms meaning and allowed trigger behavior; preserve key and ID 306 |
| VAT | Retain, rename, review placeholders | VAT / tax ID | P1 | High for billing correctness | Finance validates the linked entity; review 3 literal false values before clearing |
| Email | Retain, scope, review syntax | Company email | P2 | Medium / personal contact risk | Review 3 basic syntax exceptions and mailbox ownership; no blind corrections |
| Phone | Retain, scope | Company phone | P2 | Medium | Preserve valid extensions/calling codes and integration use |
| Mobile | Retain pending ownership review | Company mobile | P2 | Medium | Review 40 values; do not move individual data to Persons under this scope |
| Parent | Replace, eventually retire | Native organization relationships | P0 dependency / P2 deletion | High / loss of hierarchy | Verified migration already done; resolve six exceptions and update consumers first |
| Country | Consolidate, eventually retire | Native Address country | P2 | High / data loss | Preserve 588 custom-only values and resolve alias/location/territory differences |
| City | Consolidate, eventually retire | Native Address locality | P2 | High / data loss | Preserve 658 custom-only values and establish location semantics |
| State | Consolidate, eventually retire | Native Address administrative region | P2 | Medium–high | Map 74 values without losing country/context information |
| Street | Consolidate, eventually retire | Native Address value / components | P2 | High / data loss | Reconcile 692 values against the chosen physical-location meaning |
| Street 2 | Consolidate only if lossless | Native additional/unit/formatted address, otherwise keep existing field | P2 | High / semantic loss | Review all 20 values; retained custom field is acceptable if native mapping is insufficient |
| Zip | Consolidate, eventually retire | Native Address postal code | P2 | Medium–high | Preserve 241 values as text, including leading zeros and meaningful spaces |

P0 = prerequisite for safe interpretation or retirement; P1 = operational semantics/data quality; P2 = simplification after dependencies are understood. Risk reflects downstream impact, not the number of populated records.

Retain native Name, Owner, Website, Address, Industry, Annual revenue, Number of employees, LinkedIn, Labels, visibility and system fields. The partner approval introduces three custom fields, including the replacement primary type; no other field creation, database schema changes, new infrastructure or scheduled jobs are proposed. Derived domains, legal names, complete subscriptions, sync outcomes and many-to-many Odoo links stay in their appropriate sources/models.

## Phase 0 — approve boundaries and preserve evidence

Accountable: CSO/Sales Operations, with Finance and integration owner.

1. Approve the candidate dictionary, including definitions, permitted unknowns, partner-profile facets and the meaning of each address. Confirm who maintains each field and which workflows actually need it.
2. Preserve a fresh complete source snapshot, live metadata with options/settings/group IDs, record IDs and explicit source timestamps in ignored local storage. Preserve the existing audit snapshot as historical evidence; do not overwrite it with later values.
3. Confirm the live target company and read/write role for any later approved execution. Record exact field codes and option IDs. Avoid simultaneously editing integrations or fields while a migration runs.
4. For each proposed write, prepare an exact record-level diff and rollback mapping, then obtain the normal approval for that material scope. A field-model approval does not automatically authorize deletion of historical values or options.

Acceptance: a named owner approves the target and exceptions; original values and IDs are recoverable; sensitive exports/credentials remain excluded from Git.

## Phase 1 — repair audit/reporting coverage before drawing operational conclusions

Accountable: data/integration owner. Priority P0; no CRM field changes required.

| Gap | Proposed action | Acceptance check |
| --- | --- | --- |
| Snapshot predates Parent changes | Refresh ingestion and preserve source extraction timestamps in reports | 14 cleared source Parent values reconcile with live; do not expect the custom field to contain newly created native edges |
| Native hierarchy not available as an inspected source/model | Verify connector capability; ingest or otherwise provide explicit native relationship IDs, type, parent and daughter using existing infrastructure | All 156 valid migrated mappings reconcile with direct Pipedrive verification; six exceptions remain explicit |
| Field configuration columns all null | Capture available configuration rather than interpreting null as disabled; base v2 definitions and v1 flags are currently readable | 19 custom fields' active/group/creation/required/important settings compare with live evidence; unknown group display names remain labeled |
| Optional system fields entirely null in raw organizations | Review extraction include-fields and version mapping; retain unknown versus zero | Sample 1179 reconciles 9 people / 16 activities / 6 notes / 1 won deal from live; no silent backfill of unknowns to zero |
| Native address flattened columns empty | Parse/use nested native Address components or fix their mapping | Country and city usage reconcile to 553/361 in the audit snapshot, not zero |
| Legacy label dictionary stale | Decode IDs using field metadata; audit impacts of current “Deal” labels versus older “lead” strings | Eliminate 57 unknown-label rows in the audit snapshot without discarding IDs; preserve provenance of label renames |
| External dependencies not inventoried | Ask integration/dashboard/form owners for exact references and inspect their configurations | Confirm relevant owners/consumers before any retirements; no assumption that missing metadata dependencies means no dependency |

The three direct view dependencies across all custom fields are `analytics.pipedrive_fact_organizations`, `mcp_analytics_sales._candidate_pipedrive_organizations_v1`, and `mcp_analytics_sales.pipedrive_organizations`, plus raw storage. Related `organization_links`, Odoo and subscription publications must be checked for semantic impact. System dependency arrays were empty for views; inspect definitions and the consumers themselves.

The existing `analytics.circularo_dim_organizations` is product-region-tenant scoped. Do not repurpose it as a deduplicated CRM legal-entity map merely because its name says organizations.

## Phase 2 — definitions and low-risk presentation

Accountable: Sales Operations/CSO, partner owner and Finance. Priority P1/P2.

- Add approved field descriptions; all 19 current custom descriptions are empty.
- Rename retained fields using the existing keys. Preserve all existing option IDs and current associations.
- Keep a simple creation form: Name, Owner/default visibility, Website, optional Address, Relationship types, Relationship status, Account priority, optional primary Partner type and Partner roles. Keep Partner tier in detail views until assignments are confirmed. The user deleted the legacy mixed partner field; historical source values remain in the ignored backup.
- Keep only native Name and valid Owner universally required. Preserve the subsequently reviewed log's business requirement to assign Priority for Customers, qualified Prospects and Partners except early-stage leads; its current UI flag is optional. Apply qualified-workflow completeness rules rather than mass enabling mandatory flags. See the [replacement user guide](../pipedrive-crm-user-guide.md).
- Group fields into identity/relationship and integration/billing areas only after actual group display names are verified. Current IDs 6/12/15 are evidence; no display-name assumptions.
- Do not relabel Distributor as Master Distributor, add a partner tier or change program eligibility based on the imported draft partner policy.

Acceptance: the same field keys and option IDs remain, current integration payloads still resolve them, users understand the definitions, and records outside commercial workflows are not forced into invented status values.

Rollback: restore prior display names, descriptions, creation visibility and group membership from the captured live metadata; no value migration should be needed for pure presentation changes.

## Phase 3 — approved classification and contact/tax corrections

Accountable: relevant business owner. Priority P1/P2.

Use review queues with source evidence, proposed value, reason and accountable reviewer. Counts below overlap and must not be summed into a “total bad accounts” number.

| Queue | Audit evidence | Safe treatment |
| --- | --- | --- |
| Customer / Prospect overlap | 3 accounts | Decide whether existing customer history is established; represent expansion at Deal level. Preserve other valid simultaneous relationships. |
| Partner classification/profile mismatch | 111 profile-without-Partner; 56 Partner-without-profile | A prospective profile can be valid. Review account intent; do not bulk assign Partner from profile tags. |
| Active + Prospect | 42 accounts, including one also Customer | Confirm “Active” means engagement rather than paid contract; do not infer revenue or auto-downgrade status. |
| Customer/Reseller/Distributor labels | 35/75 customer mismatch directions; 26/1 reseller/distributor discrepancies | Decide field authority per account; stop new duplicate tag use only after dependent views/filters are updated. Retain label history until disposition. |
| Priority labels | 3 T1, 7 T2, 6 T3 discrepancies | Owner selects one account-priority value. Do not let labels or color automatically win. |
| On-Premise profile | One account, ID 6910 | Determine actual meaning; preserve until capability/deployment disposition is approved. |
| VAT placeholders | Three literal false strings, IDs 5229/5287/5339 | Finance verifies no real tax value is lost, then approve clearing/replacing placeholders. Validate against the specific Odoo entity. |
| Email syntax/ownership | Three basic syntax exceptions; individual addresses also observed | Review original source, not auto-correct domains or infer addresses. Company mailboxes remain Organizations; person migrations are separate. |
| Mobile ownership | 40 values | Determine company-owned versus individual. Low usage alone is not sufficient reason to delete. |

Preserve Organization Type, Partner roles and the existing EndCustomer/BillingEntity Role as multiple options: 16 audited accounts selected Customer + Partner; 121 had both billing/consumption roles. Primary Partner type is now the separately approved single-select exception. These dimensions are not duplicates.

Acceptance: each changed record has an explicit before/after decision; unknowns remain unknown; no option IDs change; spot checks verify intended classifications; no inferred customer status is fed into revenue/eligibility reports.

## Phase 4 — integration references and commercial roles

Accountable: integration owner and Finance. Priority P1.

1. Preserve the explicit Odoo-to-CRM map. Current `organization_links` has 740 matched company rows across 731 CRM organizations, 450 unlinked and 17 dangling references. Seven CRM organizations have multiple Odoo company records; do not replace that map with a single-value CRM Odoo ID.
2. Review the one Sync=Yes account without an Odoo company reference and seven linked CRM accounts without Yes. These observations do not prove an integration error. Confirm whether Yes means requested, allowed or an operational trigger before any change.
3. Keep ID 306 and the Synchronize key. Rename only after checking display-name-based workflows. Record actual success/error/last-run in the existing integration monitoring.
4. Extract and preserve CLI tokens from 210 subscription URLs and three bare IDs. All 213 tokens occur exactly in Odoo reference values, but that alone does not prove the correct account/contract association. Verify associations before normalizing bare IDs into links.
5. Retain the complete Odoo contract/subscription lineage and product technical state. Do not move 489 Odoo reference values or 1,270 order rows into a single organization text field.
6. Confirm Company email/phone and VAT synchronization direction. Matched VAT pairs currently agree textually after normalization; this is not independent tax validation or permission to overwrite CRM with an arbitrary linked Odoo row.
7. Use Odoo order customer, bill-to, ship-to, reseller/distributor references per transaction. The 990 orders with a different bill-to demonstrate why Role is a capability/participation flag, not a substitute for order relationships.

Acceptance: payloads use existing IDs/keys, no many-to-one mapping is collapsed, every normalized subscription link opens the intended subscription, sync behavior is unchanged unless separately approved, and invoice identity remains tied to the correct legal entity.

## Phase 5 — geography consolidation

Accountable: Sales Operations, Finance and integration owner. Priority P2; high data-loss risk.

1. Compare every populated custom address fragment with the nested native address and any explicitly linked Odoo legal entity. Do not compare only the currently null flattened native columns.
2. Separate alias normalization from meaningful conflict. Of 42 paired country text disagreements, 31 are recognizable aliases; the remaining 11 need manual review. Four custom Country values are the literal “2”; do not map to a nation by guessing. Two strings list multiple countries and may mean operating territory rather than physical location.
3. Preserve the 588 custom-only country values and 658 custom-only city values. Backfill native addresses only after defining which location the native field should represent.
4. Review State, Street and Zip component mappings; preserve postal codes as text and avoid damaging parsed addresses by writing arbitrary text into one component.
5. Review all 20 Street 2 values. If a semantic equivalent cannot be represented losslessly in native address data, keep Street 2 as an explicitly documented exception rather than forcing the desired field count.
6. Freeze writes to legacy fragments only after all writers move to the approved representation. Update raw ingestion and the three direct views plus downstream reports. Keep aliases/versioned compatibility views during transition where practical.
7. Reconcile before/after row counts, complete value preservation, every conflict disposition and integration round-trip. Obtain deletion approval only after these checks.

Acceptance: zero unexplained lost values, all paired discrepancies approved, non-billing office locations not overwritten by billing data, a known rollback mapping exists, and downstream filters/reporting operate on the intended representation.

## Phase 6 — final Parent retirement and controlled field deletion

Accountable: user/CSO with integration owner. Priority P2, high risk.

The completed native migration must not be rerun as a new cleanup operation. It created 153 relationships and verified 156 valid mappings; 14 self-references were separately cleared. Six original source mappings remain:

- Child 1190 references unavailable parent 1640.
- Children 1348, 1481 and 1482 reference unavailable parent 1578. The children themselves exist; direct reads of the parent IDs return 404.
- Child 3008 / parent 7359 reverses existing native hierarchy 24.
- Child 7396 / parent 7395 overlaps existing lateral relationship 25.

Require an explicit owner decision for each. Do not delete, reverse or convert native relationships based only on the legacy custom field. Once exceptions and native ingestion/reporting are resolved, the user can separately approve/delete Parent. This audit does not change the earlier rule that field deletion is a separate human action.

For all eventual custom-field deletion: preserve complete field definition/options/configuration and original values, verify every writer and reader migrated, archive an exact record-level rollback mapping, and approve the exact fields. Deleting/recreating a custom field can change its stable key; restoring values alone is not a complete rollback for integrations. Prefer hide/freeze first, validate, then delete under explicit authorization. See [Pipedrive's deletion guidance](https://support.pipedrive.com/en/article/custom-fields).

## Completion criteria for a later implementation

- Approved dictionary has a named accountable owner, real approval/review dates and explicit exception decisions.
- All 19 current custom fields have documented disposition; no field/option IDs were silently replaced.
- Classification and reporting checks distinguish missing, false, empty arrays and system counters unavailable from extraction.
- All originally populated values in retired fields are either preserved in an approved replacement or explicitly dispositioned.
- Native hierarchy, Odoo company mappings, subscription associations and address roles are verified against the correct source.
- API responses and a focused direct readback verify each approved write; failures remain visible in audit logs.
- UI forms/filters and documented integrations pass targeted checks; no broad “all integrations verified” claim without coverage evidence.
- Generated repository files remain current and validation passes if any maintained records are promoted.

All non-partner phases remain proposals. The original audit stays read-only historical evidence; the later partner migration has its own authorization, original backup, option mapping and verification record.
