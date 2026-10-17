# Partner classification migration

**Completed and verified.** Three fields were created and 274 organizations updated: 258 received one unambiguous primary Partner type and 30 received mapped Partner roles (some records received both). All 331 candidates passed fresh direct API verification; all 5,229 organizations were re-read. Every Partner tier remains blank and no original custom-field value, Organization Type, EndCustomer/BillingEntity Role, name, owner, website or label selection changed. This implements the user's explicit request and decisions; broader partner policy and commercial terms remain drafts.

| Verified result | Count |
| --- | ---: |
| Primary Referral / Affiliate | 1 |
| Primary Reseller | 215 |
| Primary Distributor | 42 |
| Organizations with Partner roles | 30 |
| Role selections: Integration / Technology / On-Premise Solution / Co-Branded / Service Provider | 9 / 4 / 1 / 18 / 0 |
| Tier assignments | 0 |
| Multiple-commercial-model records left for review by the migration | 2 |
| Candidate verification failures / original-value changes | 0 / 0 |

**Current field status, verified through the Pipedrive API on 2026-10-17:** the user deleted Partner type (legacy). Its key is absent from the complete field listing. The surviving single-select field is named **Partner type**, with options **Affiliate**, **Reseller** and **Distributor**. Partner roles and Partner tier remain active with their approved options and original new-field keys. The original migration totals above are historical results, not a new census after these owner changes.

At migration completion, primary type and roles were configured for creation and detail views, and tier for detail only. The legacy field was initially retained for reference; the later user deletion supersedes that configuration. No UI preview or forced group reassignment was performed.

## Field structure

| Dimension | Type | Stable field key | Options |
| --- | --- | --- | --- |
| Partner type | Single option | `cd569fe5329e8bbf415aaa33472cbecd51f2a684` | 400 Affiliate; 401 Reseller; 402 Distributor |
| Partner roles | Multiple options | `347ded3ea6ad55931f54392ec2a01b096c62d709` | 403 Integration; 404 Technology; 405 On-Premise Solution; 406 Co-Branded; 407 Service Provider / Operator |
| Partner tier | Single option | `3a961bca78607f537fbb60e3767876c5f10635be` | 408 Authorized; 409 Advanced; 410 Strategic |
| Partner type (legacy), deleted by user | Historical multiple options | `5df6908fdaef780d7159613c33be664c8239c30e` | Original definitions and values retained in the ignored migration backup only |

The primary type was created temporarily as `Partner type (primary)`. The user subsequently confirmed the final name `Partner type` and deleted the legacy field; live metadata verifies that final state. Option 400 is now labeled Affiliate, retaining its numeric ID. New fields received new keys and option IDs; old IDs were not transferred between fields. The deleted field's definitions remain historical evidence in the backup.

## Approved mapping

| Legacy option | Destination |
| --- | --- |
| 344 Referral | Primary 400 Affiliate (initially labeled Referral / Affiliate), only when no other commercial model is selected |
| 345 Reseller | Primary 401 Reseller, only when no other commercial model is selected |
| 346 Distributor | Primary 402 Distributor, only when no other commercial model is selected |
| 347 Integration | Partner roles 403 |
| 353 Technology | Partner roles 404 |
| 348 On-Premise | Partner roles 405 On-Premise Solution |
| 349 Co-Branded | Partner roles 406 |

Service Provider / Operator is not inferred. Every Partner tier stays blank. Multi-model and capability-only records receive no guessed primary type. Existing Organization Type, Status, Priority, EndCustomer/BillingEntity Role, legacy values and unrelated fields remain outside the write payload.

## Initial live scope

The complete live backup contains 5,229 organizations and 275 populated legacy classifications. There are 220 Organization Type=Partner records; their union with classified records contains 331 candidates. The plan assigns 258 unambiguous primary types and existing capability roles to 30 organizations, affecting 274 distinct records. Fifteen classified organizations have only capability tags; 56 Type=Partner organizations have no existing classification to map.

Two primary assignments were initially left for owner review:

- S.S. Lootah Group (4198): Reseller + Distributor.
- IntelliSoft Services DMCC (7484): Referral + Reseller; Integration can still be mapped to Partner roles.

The authorization explicitly chose preservation of these ambiguous combinations for review, not an arbitrary primary choice.

The user subsequently resolved both records. Direct Pipedrive API readback on 2026-10-17 confirmed **Reseller** (401) for both S.S. Lootah Group and IntelliSoft Services DMCC; IntelliSoft also retains **Integration** (403) in Partner roles. Neither primary decision remains pending. The table above records the original migration results, not a new full census. Before the later legacy-field deletion, S.S. Lootah's legacy selections were Reseller + Distributor and IntelliSoft's legacy selection was Reseller. The original ignored backup preserves the pre-migration values.

## Evidence and execution

`local/` is confidential and Git-ignored. It contains original field definitions, complete live custom-field values, the creation-time `field-map.json`, per-record plan, write logs, `verification.json`, `summary.json`, unchanged-value comparison and final `fields-after-v1.json` / `fields-after-v2.json`. The final field metadata contains the canonical names after cutover. Credentials remain in the ignored parent `.env-pipedrive`; no token is copied into this folder. Do not force-add snapshots or logs. The execution log records 274 successful updates and no failed or ambiguous writes.

`migrate_partner_fields.py` uses the Python standard library and the existing project's credential loader. It validates the company, creates the three fields, rechecks each legacy value before updating only new fields, logs individual failures, reads every organization again, and verifies every planned mapping plus unchanged original values. It then renames fields and applies creation/detail visibility. Ambiguous network write outcomes require readback before any retry; no mutation is blindly repeated.

```sh
rtk proxy python3 -m unittest discover -s work/pipedrive/partner-classification -p test_partner_fields.py -v
rtk proxy python3 work/pipedrive/partner-classification/migrate_partner_fields.py
rtk proxy python3 work/pipedrive/partner-classification/migrate_partner_fields.py --apply
rtk proxy python3 work/pipedrive/partner-classification/migrate_partner_fields.py --verify
```

The `--apply` operation is authorized for this recorded migration only; it is not a general cleanup approval. Six focused offline safety tests cover primary selection, multi-model exceptions, role mapping, source preservation, unknown IDs and no inferred service-provider assignment.

The commands above document the completed migration. Do not rerun its mutation or original verification plan after the owner corrections and legacy-field deletion without reconciling it first: the source field no longer exists and the two expected blank primary values are historical. No field recreation is authorized by this record.

## Dependency disposition

Before the user deleted the legacy field, ClickHouse metadata queries on 2026-10-17 identified references in `analytics.pipedrive_fact_organizations`, `mcp_analytics_sales._candidate_pipedrive_organizations_v1`, `mcp_analytics_sales.pipedrive_organizations`, and raw storage. That is historical dependency evidence, not a post-deletion verification. The user explicitly excluded ClickHouse from further work; no post-deletion ClickHouse queries or changes were made, and downstream reconciliation is outside this task's scope.

All 19 accessible Organization filters and their conditions were inspected during migration. None referenced the legacy partner field key or numeric field ID 4048. Filters were left unchanged. External automations/integrations were not fully inventoried; their compatibility after deletion is unverified. The current CRM classification uses the three surviving field keys above.

Official API reference: [Organization Fields](https://developers.pipedrive.com/docs/api/v1/OrganizationFields). Current commercial definitions are in the [classification recommendation](../partner-management-classification-recommendation.md); user instructions override its earlier statement that migration had not been authorized.
