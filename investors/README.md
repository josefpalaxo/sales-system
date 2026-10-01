# Circularo Investor Repository

A dedicated investor workspace within the sales-system repository for Circularo's strategic shareholder and partner work. Start with the [investor materials master](master/investor-materials-master.md) and the [open questions](master/data-quality-and-open-questions.md).

## Structure

| Path | Purpose |
| --- | --- |
| [master/](master/README.md) | Common company facts and investor context; detailed records hold facts, the executive index points to them |
| [materials/](materials/README.md) | Current generic investor assets derived from the master |
| [investors/_template/](investors/_template/README.md) | Reusable workspace for each investor relationship |
| [research/](research/README.md) | Evidence and analysis awaiting reconciliation |
| [sources/](sources/README.md) | Source provenance and access guidance |
| [archive/](archive/README.md) | Superseded materials, never current authority |
| [setup.md](setup.md) | Original setup brief, retained unchanged |

This folder is versioned as part of sales-system and uses its Git history and remote. It has no nested Git repository. Paths in this workspace's instructions are relative to this folder. Source IDs, repository revisions and paths in the source register preserve the provenance of shared sales-system evidence.

## Authority and confidentiality

The master is the sole entry point for common investor facts. A file's presence in the master does not approve its contents. Initial records are **draft / confidential**, with missing values marked **NEEDS VERIFICATION**. Source-backed commercial context references the sales system's existing stable IDs instead of replicating exact rules.

The setup brief establishes the working strategic direction. It does not verify financial results, customer relationships, market claims or production capabilities. See [governance](GOVERNANCE.md) for evidence, approval and source precedence.

## Create an investor workspace

Copy `investors/_template/` to `investors/<normalized-investor-name>/`, using lowercase names separated by hyphens. Do not overwrite an existing folder. Replace the template's name and owner placeholders, then fill the profile, strategic fit, opportunity map, interactions and next actions. The relative links to the master already work at that depth.

Adapt the structure to the relationship. Brokers and advisers need concise engagement records; use the investor-assessment template only where relevant, and add files when there is substantive content.

Use master links for common facts. Store investor-specific research, analysis and deliverables in that investor's folder. Keep personal contact information and raw correspondence in the approved business system or ignored local files; the versioned contact/log templates hold references and non-sensitive summaries.

## Update company facts

Register the evidence, reporting date, scope and source owner. Update the smallest detailed master file, retain earlier reporting periods, record any conflict, and update dependent materials or mark them for review. Approval must be attributable to an accountable owner; agents cannot infer it from a request to import data.

## Prepare deliverables

Read [AGENTS.md](AGENTS.md), the master, open questions and the relevant investor workspace. Use only eligible claims for the audience, preserve source IDs and reporting periods, separate actuals from forecasts and scenarios, and label roadmap/vision explicitly. Record the master revision, source IDs, as-of date, intended audience and approval state with every deliverable. Human approval is required before external sharing.

No polished decks have been created.

## Active relationship workspaces

- [Qubit Capital](investors/qubit-capital/README.md) — fundraising broker, similar to M-Capital; role clarified by the user on 2026-10-01.

## Validation

Run `rtk make validate` from this directory. It checks required scaffold files, local links and basic master metadata. It does not validate business truth or grant publication approval.
