# Investor repository agent instructions

This folder is the investor workspace within the sales-system Git repository. Paths such as `master/` are relative to this folder. Stage, commit and push through the sales-system repository; do not initialize a nested Git repository.

1. Read [GOVERNANCE.md](GOVERNANCE.md), [master/investor-materials-master.md](master/investor-materials-master.md), and [master/data-quality-and-open-questions.md](master/data-quality-and-open-questions.md) before preparing investor materials.
2. Read the relevant investor folder before investor-specific work.
   Adapt each workspace to the actual relationship. For brokers and advisers, keep engagement terms, introductions, materials and follow-ups; omit investor-fit/portfolio scaffolding and empty placeholder files. The investor template is a starting point, not a mandatory structure for every counterparty.
3. Prefer current accepted master facts to historical documents. Reopen a master record when newer authoritative evidence conflicts; never silently reconcile figures or select a side of an unresolved conflict.
4. Never invent financial/customer metrics, zero-fill unknowns, or claim that a reporting period is current without evidence. Preserve value, currency/unit, period, definition, source, evidence label and approval state.
5. Separate actual, contracted, qualified pipeline, management forecast, scenario and speculative strategic upside. A scenario is never pipeline.
6. Separate LIVE / PRODUCTION, ROADMAP and LONG-TERM VISION. Unknown maturity stays unknown.
7. Preserve confidentiality. Do not commit credentials, raw CRM exports, personal contact data, customer dumps or raw correspondence except for the explicitly user-authorised investor outreach artifacts below. Use approved system references or ignored local files otherwise. Human approval is required for external sharing.
8. When management supplies a newer authoritative fact, update the smallest master record with provenance, reporting period and change history. Preserve earlier periods and escalate unresolved contradictions. Do not infer business approval.
9. Never change common facts solely for an investor narrative or assumption. Keep investor research in its workspace unless it becomes generally relevant and passes review.
10. Keep common facts in the master; investor analyses link to them. Generated deliverables may quote approved facts with source and revision provenance.
11. Preserve stable upstream IDs for commercial rules, limits, prices and claims. Resolve them through [the source register](sources/internal/sales-system-register.md); do not copy precise rules into a second maintained record.
12. Use concise executive language. Preserve evidence/source references for material claims. Evaluate strategic fit qualitatively; do not invent numerical investor scores.
13. Treat `setup.md` as the setup mandate and attributed strategic direction, not proof of financials, customers, legal compliance or production capability.
14. Use one stable path per deliverable; normal revisions belong in Git history. Archive only explicitly superseded material.
15. Use `apply_patch` for edits and prefix shell commands with `rtk`. Run `rtk make validate` after changes. If changing upstream sales records, follow their governance and run their catalog and validation commands too.

Initial master owners are unassigned. Suggested review roles are routing suggestions, not appointments. Never promote a draft to approved or mark a claim CONFIRMED without documented authority.

## Versioned outreach workspace

On 2026-10-03 Josef directed that all existing investor outreach work move from `work/` to `outreach/` and that all of it be under Git. Version the research batches, contact lists/register, saved LinkedIn conversations, evidence, scripts and derived outputs under `outreach/`. This is a specific exception to the personal-contact/raw-correspondence exclusion for those requested investor outreach artifacts. Keep credentials, unrelated CRM/customer dumps, dependencies and OS metadata excluded. Retain draft/confidential/evidence states and stable IDs; versioning does not authorise external sharing. Use `outreach/` for future investor outreach batches and actual outreach tracking.
