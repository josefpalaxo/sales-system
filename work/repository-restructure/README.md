# Repository restructure

## Outcome

Reusable knowledge and materials now live by subject in `shared/`; organization-specific context lives in `relationships/`; projects and local builds remain in `work/`. The root README is the main entry point.

The Circularo narrative, Unified Trust API sales pack and competitive analysis were relocated as maintained **draft** packages. Investor common context moved into company, product, commercial, market and proof subjects, with its executive index in shared investor preparation. Individual partner and investor folders moved under relationships. Former domain material is now partner playbooks and commercial guidance. Original IDs, approval states and evidence limitations are preserved.

## Provenance and compatibility

- [Complete path map](path-map.json) resolves old tracked locations against the baseline Git revision.
- Original narrative sources, investor setup mandate, historical inspection manifest and supplied API sources remain preserved. The manifest's historical paths and hashes describe the original inspection; use the path map to resolve current locations.
- The imported partner-library introduction is preserved under `sources/archived-snapshots/`; the maintained library index links to the split playbook and commercial folders without repeating precise rules.
- Imported master IDs and legacy domain metadata remain unchanged. A filesystem move is not a business-policy revision or approval.
- Existing ignored partner research, local dependencies, untracked project files and temporary files were preserved. Root temporary output moved under `work/local-scratch/` and `work/local-output/`.

## Promotion still requiring content decisions

- Narrative: reconcile the proposed category, terminology, product scope and earlier positioning framework; retain roadmap and verification boundaries.
- API pack: reconcile the commercial correction and capability evidence before approval or external production.
- Competition: resolve overlapping editions and refresh dated comparisons with an accountable reviewer before approval.
- Presentations: retain source projects and selected deliverables under work until content approval and visual QA justify a maintained asset. Existing shared decks keep their status.
- Corporate, financial and proof records: unassigned ownership and missing evidence remain visible; moving investor context does not fill those gaps.

## Validation and integrity

- `rtk make catalog` and `rtk make validate` pass: active links, record metadata, source/relationship resolution, catalogue freshness, investor provenance and 14 focused regression tests.
- [Integrity audit](integrity.json): all 66 original catalogue records and 46 investor-context records retain their IDs and approval metadata; 24 original source inputs and 1,106 binary assets match their original fingerprints.
- 674 previously tracked cache, render, dependency and standalone-tooling entries are now excluded from version control, with local copies preserved. The path map records their destinations and the original standalone generator commit.
- The API offline reader rebuilds from the relocated package with 11 documents. Its six deliberately omitted source/team-message references remain marked in the self-contained edition; the complete source files remain in the repository.
- The slide skill passes its quick validator, all 10 routing fixtures parse, and all 155 reusable records parse as full YAML. Routing, metadata and template-copy regression checks cover the new layout.

A clean export of the staged repository also passes `rtk make validate`, including all 14 regression tests. Placement and structural validation do not grant business approval to draft material.
