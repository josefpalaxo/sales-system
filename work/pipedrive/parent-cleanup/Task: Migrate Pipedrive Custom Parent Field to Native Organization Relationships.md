# Task: Migrate Pipedrive Custom Parent Field to Native Organization Relationships

Perform a **one-time migration** of existing Pipedrive organization parent references to Pipedrive's native Organization Relationships functionality.

Keep the implementation simple and practical. This is a one-time maintenance operation, not a reusable integration or production application.

## 1. Context

Circularo currently has a custom Organization field named `Parent`, which references another Pipedrive organization.

We want to replace this custom field with Pipedrive's native parent–daughter organization relationships.

Existing data is available in ClickHouse:

- Database: `raw_pipedrive`
- Table: `organizations`
- Custom Parent field: `b45e902759f6fb356e939c4b6d45245ecfedb637`
- Field definition: `raw_pipedrive.organization_fields`

Use ClickHouse for source analysis and the Pipedrive API for reading and updating relationships.

## 2. Preparation

1. Inspect the existing repository and available ClickHouse/Pipedrive credentials and integrations.
2. Verify the current Pipedrive Organization Relationships API documentation, including relationship direction and request parameters.
3. Query ClickHouse to identify organizations with populated Parent values.
4. Resolve parent and child organization IDs.
5. Check existing native relationships in Pipedrive.
6. Identify invalid references, missing organizations, self-references, circular relationships, and conflicting existing relationships.

Produce a concise summary:

- Total organizations
- Organizations with Parent populated
- Valid relationships ready for migration
- Existing native relationships
- Invalid or conflicting relationships

Save the source mapping as CSV for backup.

## 3. Migration

Create a simple one-time script using existing project dependencies.

For each valid parent-child mapping:

1. Check whether the native relationship already exists.
2. Skip existing matching relationships.
3. Create the native parent–daughter relationship using the Pipedrive API.
4. Preserve the correct parent-child direction.
5. Record success or failure.

Requirements:

- Do not create duplicate relationships.
- Do not overwrite conflicting relationships.
- Respect API rate limits.
- Continue processing if an individual record fails.
- Log results to CSV.
- Do not modify unrelated organization data.

**Before making changes, show me the migration summary and request approval.**

## 4. Verification

After execution:

1. Re-read relationships directly from Pipedrive.
2. Compare them against the original source mapping.
3. Identify missing, incorrect, or conflicting relationships.
4. Produce a final migration report with counts and exceptions.

The migration is successful only when every valid source relationship has been verified in Pipedrive.

## 5. Cleanup

Once migration is verified:

- Identify integrations or scripts referencing the custom Parent field.
- Report any dependencies that must be updated.
- Recommend deleting the obsolete custom field.

**Do not automatically delete the custom field.** I will handle deletion separately after reviewing the results.

## 6. Implementation Guidelines

- Prefer existing repository tooling and credentials.
- Use a straightforward script rather than building a framework.
- No UI, database schema changes, scheduled jobs, or unnecessary abstractions.
- No new infrastructure.
- Keep temporary files together in a clearly named migration directory.
- Use direct Pipedrive API reads for final verification because ClickHouse synchronization may be delayed.

## Expected Deliverables

1. Migration analysis and counts.
2. CSV backup of original parent-child mappings.
3. One-time migration script.
4. Execution results and verification report.
5. List of unresolved issues, if any.

**Workflow: Analyze → Report → Get Approval → Migrate → Verify → Report.**

Do not proceed with migration until I approve the analysis.