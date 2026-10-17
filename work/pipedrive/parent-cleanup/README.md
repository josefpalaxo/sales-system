# Pipedrive Parent migration

One-time maintenance, governed by the task document in this folder. Analysis is read-only. **Obtain approval of the exact analysis before running apply.** Keep the custom Parent field until the user separately deletes it.

## Files and handling

- `migrate.py`: Python standard-library script; no installation or new infrastructure.
- `test_migrate.py`: offline migration safety checks.
- `source.sql`: query used to back up the ClickHouse source, after schema discovery.
- `local/source-mapping.csv`: original 176 populated Parent mappings, including invalid references, raw values, names and source timestamps.
- `local/analysis.csv`, `local/plan.json`, `local/summary.json`: direct API analysis and approval plan.
- `local/native-before.json`: original native relationships in the inspected scope.
- `local/execution-*.csv`, `local/verification.csv`: created only during approved migration.

`local/` and `../.env-pipedrive` are ignored by Git. These contain confidential operational data or credentials. Do not force-add them. The CSV is a backup/review file, not a Pipedrive import template.

## Access

The official connected ClickHouse tools can read Circularo Analytics (`cec663cc-aeb1-4899-84f5-fb804e2eeac7`). No local ClickHouse credential is required. The Pipedrive connector can read organizations but does not expose relationship endpoints. Its `ids` array also has conflicting wrapper/server types, so direct API access is used for the migration.

The script reads `PIPEDRIVE_API_TOKEN` from the process environment or `../.env-pipedrive`. It sends the token only in the `x-api-token` header to `https://api.pipedrive.com`. It checks that the authenticated user is active and belongs to `circularo`. The supplied token was verified against an administrator account. GET access to organization relationships was confirmed; write access is not tested by creating disposable CRM data.

## Run

From the repository root:

```sh
rtk proxy python3 -m unittest discover -s work/pipedrive/parent-cleanup -p test_migrate.py -v
rtk proxy python3 work/pipedrive/parent-cleanup/migrate.py
```

The second command only reads Pipedrive and saves the plan. Review `local/analysis.csv` and `local/summary.json`, and obtain human approval. Then pass the exact `plan_sha256` from that approved summary:

```sh
rtk proxy python3 work/pipedrive/parent-cleanup/migrate.py --apply-plan APPROVED_PLAN_SHA256
```

The hash identifies the plan; it is not itself evidence of human approval. Apply reruns analysis, refuses mappings that changed or became conflicting, and creates only approved `ready` mappings. Each write rechecks the live Parent value, native parents, lateral conflicts and native ancestry. Matching relationships are skipped. Requests are sequential and paced; read failures use bounded retries, while ambiguous writes are logged without automatic retry. Individual write failures do not stop subsequent records. Execution logs are flushed after every record. Final verification reads every valid approved mapping directly from Pipedrive; any verification exception or mismatch returns a failing exit code. Rerunning an approved plan skips relationships already created.

Use `type=parent`, `rel_owner_org_id=parent_id`, `rel_linked_org_id=child_id`. See the [official Organization Relationships API](https://developers.pipedrive.com/docs/api/v1/OrganizationRelationships). The native relationship scan covers source children, source parents, and their accessible native ancestors; its count is **not** an account-wide relationship count. A source parent referencing itself does not invalidate otherwise valid daughters; only the self-reference is excluded.

There is no transaction spanning Pipedrive reads and writes. Avoid concurrent hierarchy edits during execution. An unexpected POST failure can have an unknown result; the fresh verification pass and a later rerun resolve that without blindly retrying the write.

## Dependencies before custom-field deletion

Direct references found in ClickHouse table/view definitions:

- `raw_pipedrive.organizations`: replicated custom-field column `_b45e902759f6fb356e939c4b6d45245ecfedb637`.
- `analytics.pipedrive_fact_organizations`: exposes the custom field as `parent_organization`.
- `mcp_analytics_sales._candidate_pipedrive_organizations_v1`: decodes/resolves the custom Parent into parent ID/name/reference state.
- `mcp_analytics_sales.pipedrive_organizations`: publishes these parent fields and documents the custom field code.

Before deletion, arrange ingestion of native relationships and update the affected views and downstream consumers to use those relationships. Review the Pipedrive-to-ClickHouse/Airbyte schema and any external workflows; their configurations were not available in this repository. A repository search found no pre-existing reference outside the task document. This inspection does not establish that all external integrations have been found. No database schema changes are part of this task.

Recommend deleting the custom field only after migration verification, disposition of the excluded records, and dependency updates. Deletion remains a separate user action.

## Source analysis method

The source snapshot contained 5,228 unique organization IDs, no deleted organizations, and 176 populated Parent values. Extraction timestamps ranged from 2026-10-16 13:08:29.307 to 13:08:37.917 (ClickHouse values). A subsequent complete connector read returned 5,229 live organizations; all 176 source Parent values matched. Parent IDs 1578 and 1640 were unavailable through direct organization reads, rather than assumed deleted. Four source mappings reference those two IDs. Fourteen source mappings reference themselves. The remaining 158 require native conflict/cycle checks in the saved analysis.

Per ClickHouse skills `agent-connect-mcp`, `agent-discovery-schema` and `agent-query-safety`, inspect schema before querying and cap execution, scans and results. These source tables use `_airbyte_raw_id` as sort key and have no skipping indexes; the small complete scan is intentional to detect all references. Queries used a 30-second execution limit and a 20,000-row scan cap for the 5,228-row source. No ClickHouse data was modified.
