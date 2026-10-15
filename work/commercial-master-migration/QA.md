# Migration verification

Date: 2026-10-14

## Checks

- All 34 non-cache files in the source canonical folder are accounted for in the manifest and retained in sales-system. The additional approved Add-On master was restored from the existing sales-system snapshot.
- Original source-folder hashes and existing snapshot hashes remain unchanged.
- The two CSVs, Python generator, binary workbook, and historical sales-repo Commercial Model input are checked for exact byte fidelity.
- Imported Markdown links resolve locally after relocation; outside-folder dependencies are visibly qualified.
- The 27 existing derived records retain their content and stable IDs, with master relationships/revision references added. Approved representation revisions are incremented; their business review dates are preserved.
- Seven focused master-dependency tests pass, including revision drift, an unapproved master, missing relationships, and actual repository dependencies.
- Generated catalogues are rebuilt and checked for freshness.
- No source TODO action, workbook generation, external-system action, commit, or push was performed.

## Reproduce

```bash
rtk proxy python3 -B scripts/test_master_dependencies.py
rtk proxy python3 -B work/commercial-master-migration/check_migration.py
rtk make catalog
rtk make validate
```

## Repository validation limitation

The full validator reports 174 pre-existing, unrelated directory and Markdown-link failures: root tmp, a nested m-capital work directory, incomplete partner/investor paths, and dependency documentation under the Markdown HTML skill and slide-generator vendor tree. These are outside this migration's scope. The scoped migration check reports zero new errors in shared, domains, governance, sources, schemas, and scripts; it reports the current unrelated-error count separately. The full command output is saved in [repository-validation.txt](repository-validation.txt).

## Clean main integration verification

The migration was applied separately to a clean checkout based on origin/main, preserving main's existing investor-workspace governance and excluding unrelated work-branch changes. In that checkout, `rtk make validate` passes in full, generated catalogues are current, all seven master-dependency tests pass, and the migration integrity check reports 34 source files, 27 derived records, zero new errors, and zero unrelated errors. The 174-error output retained above is evidence from the original busy work checkout, not a failure of the main integration.

## Remaining business and dependency work

Confirm current approval/review dates for the source-approved API licensing rationale. Review draft sales and partner documents, prices, and workbook before operational/external use. Resolve the existing Add-On Workspace-scope conflict. Separately migrate the catalogue inputs and any necessary quotation/design tooling, then adapt and validate the workbook rebuild workflow. No commercial rules were chosen to resolve these outstanding items during migration.
