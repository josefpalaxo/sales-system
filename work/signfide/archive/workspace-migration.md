---
id: signfide:workspace-migration
title: SignFide workspace inventory and migration
kind: migration-record
status: draft
owner: unassigned
updated: "2026-10-14"
classification: confidential
sources: []
---

# SignFide workspace inventory and migration

## Inventory before migration

The project contains 20 first-party Markdown documents outside private notes and installed/generated files: a root overview, two strategy documents, a branding overview, seven company documents, and nine prototype instruction/evidence documents. Brand boards and generation prompts accompany the branding overview. The eight-page website is an independently runnable local prototype with its own build and QA. An ignored XML bundle contains the previous company/brand selection.

Josef approved the proposed workspace structure and metadata conventions on 2026-10-14. That approval authorizes organization and documentation work; it does not approve the proposed launch strategy, pricing, targets, contracts, or unresolved ownership rights.

## Migration plan

| Existing material | Destination and handling |
| --- | --- |
| Root overview | Replace with project navigation and current status |
| Internal brand strategy | Preserve in `archive/internal-brand-strategy-source.md`; extract current identity and strategy into functional documents |
| US website strategy | Preserve in `archive/website-strategy-source.md`; use current prototype and marketing brief for active work |
| Branding overview | Move to `brand/concept-history.md`; add a current brand overview |
| Branding boards and generation prompts | Move intact to `assets/brand/` |
| Company brief and cooperation documents | Retain paths and substantive content; add metadata and updated navigation |
| Company open questions | Move to root `OPEN-QUESTIONS.md`, retain SF-OQ IDs, extend with project-wide gaps |
| Supplied launch planning material | Preserve a historical launch-plan source in archive; extract active strategy, roadmap, tasks and functional briefs |
| Prototype | Keep runnable folder and source unchanged; add Markdown metadata and central question links |
| Private notes | Remain local and ignored; no tracked document depends on their paths |
| Company/brand XML | Regenerate locally using the migrated source paths |

## Working controls

Keep one task backlog in TASKS, one decision log in DECISIONS, and one project question register in OPEN-QUESTIONS. Historical snapshots are not live trackers. Preserve source bodies, except for path repairs and a visibly separated historical-status notice; add metadata without treating source proposals as approved. Maintain the parent repository and current branch. No publication, new repository, commit, or push is part of this migration.

## Verification to complete

Check metadata, unique document IDs, relative links and relevant anchors, preserved question IDs, decision evidence, private-note exclusion, binary preservation, prototype build and navigation, parent catalog/validation, and the regenerated XML file set. Record completion and remaining issues here after verification.

## Verification results

Completed 2026-10-14. The project has 35 first-party Markdown documents with valid YAML, unique IDs, required fields, resolving local source/navigation links and checked explicit anchors. The repeatable Python checker validates the project's deliberately small metadata subset; a separate Ruby standard-library YAML parse also passed for every document. No documentation framework or package installation was needed.

The single backlog has 25 task IDs, the decision log has eight scoped internal directions, and the question register has 40 open issues. Original SF-OQ-001 through SF-OQ-023 retain their IDs. Additional issues include the unresolved migration-priority conflict and launch-specific product, legal, service, finance, proof and publication gaps. Website launch questions now form a navigation view into that registry. No source-plan targets, prices, legal positions or contracts were approved by consolidation.

Original brand and website strategy text is preserved below archival notices; the supplied launch-plan body is retained intact in its historical snapshot. All 12 moved brand image/prompt files matched their pre-move SHA-256 hashes. Private notes remain untouched, ignored, untracked, absent from tracked-document dependencies and excluded from the XML selection. No new Git repository was created; no commit or push was performed.

The prototype source and local reference assets remain in place. Its eight-route build passed, reviewed external-link policy checks passed, and all eight routes returned HTTP 200 with rendered HTML on the restarted loopback preview at port 4173. A fresh complete browser regression was not completed: the first attempt failed at sandboxed Chrome launch; the outside-sandbox attempt reached a stopped preview server. The server was then restarted and HTTP route checks passed. Earlier browser evidence is retained as historical evidence, not relabelled as a fresh pass. No UI implementation changed during this migration.

Parent catalog generation and freshness checks passed with no generated-record change. Parent validation reports 174 issues outside SignFide, including existing layout/link failures and dependency README links in other concurrent work. None concerns this project; the full log is saved in ignored local QA artefacts. These failures were not repaired as part of the SignFide migration.

The ignored Repomix XML was regenerated and parsed successfully. It includes exactly the same eight logical company/brand inputs after relocation: six company documents, root OPEN-QUESTIONS and the archived internal brand strategy. It excludes private notes and is not a full-workspace pack. Reproduction commands are in the [root README](../README.md#local-checks-and-exports).

Machine evidence is saved locally under `archive/qa/`: `workspace-verification.json` and `parent-validation.log`. These generated artefacts are intentionally ignored. The repeatable check is `rtk proxy python3 scripts/check_workspace.py` from the project root.

## Remaining decisions

SF-OQ-024 preserves the P0/P1 migration conflict. Pilot targets and actual kickoff, launch channel sequencing, assisted/self-service scope, offer economics, entity/IP/performance terms and publication remain open in [OPEN-QUESTIONS](../OPEN-QUESTIONS.md). Document owners and execution leads require human appointment. Reorganization does not settle those decisions or create customer-facing commitments.

## Product framing correction

Following Josef's review on 2026-10-14, the product overview was replaced with his existing-platform strategy and the agreed metadata/operating-model/tracker additions. The earlier assistant readiness matrix is preserved as a deprecated draft, not an active product checklist. Product navigation, the master-plan workstream description, agent ownership rules and SF-T-010 now use the Circularo edition/SignFide packaging framing. SF-D-009 records the direction; SF-OQ-041 and SF-T-026 track future freemium adoption separately from Circularo's roadmap target.

This follow-up adds one historical Markdown record, one question, one task and one decision; the earlier verification totals describe the original migration. The broader launch-plan framing was reviewed for discussion, not silently rewritten as part of this correction. No private note paths were added to project records.

## Operations strategy clarification

On 2026-10-14 Josef supplied the replacement operations strategy, the system-of-record architecture and the immediate Odoo Quote-to-Cash priority. Operations/README.md now owns that overview, with YAML metadata and links to existing tasks/questions. No separate CRM, billing or support implementation documents were created. The existing Circularo systems/capabilities are recorded as Josef-supplied context; the SignFide configuration remains implementation work.

SF-D-010 records the shared-infrastructure/separate-business direction, architecture and phased execution. SF-T-015 is the immediate Odoo implementation priority; CRM selection and Zoho Desk configuration are SF-T-016/SF-T-019; SF-T-017 is the later self-service extension. Direct references in navigation, master plan, roadmap, company RACI/options and related questions now preserve Odoo financial-billing ownership and Circularo entitlement ownership. Initial website/pilot tasks no longer require Phase 2 self-service. No live Odoo, Stripe, bank, CRM or support account was configured by this documentation change.

## Distribution and wholesale pricing clarification

On 2026-10-14 Josef authorized the distribution/services brief update with a fixed SignFide buy-price basis and supplied the wholesale methodology. The company agreement brief now has metadata, precise party/rights/channel treatment, Option A scope, buy-price independence, separate REDA/brand arrangements and an open initial term with explicit exit/continuity discussion. The old retail/reference-price discount example was replaced.

Commercial/wholesale-pricing.md owns the method and illustrative inputs. Actual prices, cost allocations, service and IP remuneration, billing/review mechanics and tax/contract acceptance remain open. SF-D-011 records the internal principle and SF-T-027 is the actual-input model task. Related commercial, company, operational and open-question references were aligned; no empty retail-pricing or financial-model files were created. Private notes remain unchanged and unreferenced by path.

The local XML selection now also includes the wholesale methodology so the new agreement's owning pricing reference is present in the pack. The documented selection is in the root README. This export remains confidential internal working material, not a populated approved buy-price list.
