# Source consolidation

Source descriptions and preserved inputs now share `sources/`. The [single source index](../../sources/README.md) replaces the governance register and current investor-specific register.

Maintained descriptions use `.source.md` filenames. Raw originals and snapshots remain evidence, outside the active catalogue. The investor inspection notes are preserved unchanged as a dated snapshot; current lookup uses the single source index. Original narrative inputs are now beside their source description. Empty investor source scaffolding was removed without deleting ignored local evidence.

[Path map](path-map.json) records the relocations against the baseline Git revision. The previous restructuring report and its integrity evidence remain historical records of that earlier operation. No source ID, approval state, review date, classification, semantic revision or original input is changed by this consolidation. The investor mandate description documents its pre-existing historical label without creating a second source record.

## Checks

- `rtk make catalog` and `rtk make validate` pass, including 16 regression tests.
- [Integrity audit](integrity.json) confirms all 155 record IDs and their approval metadata remain unchanged, all seven source records are relocated, and all 22 preserved source inputs retain their exact fingerprints.
- The dependency graph is unchanged; only catalogue paths are updated.
- New checks prevent snapshots with copied source IDs from entering the active catalogue and report malformed maintained source descriptions.

A clean export also passes `rtk make validate`, including all 16 regression tests. Pre-existing untracked work and ignored local evidence remain separate.
