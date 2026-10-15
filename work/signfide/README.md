---
id: signfide:readme
title: "SignFide project workspace"
kind: overview
status: draft
owner: unassigned
updated: "2026-10-14"
classification: confidential
sources:
  - "MASTER-PLAN.md"
  - "DECISIONS.md"
---

# SignFide project workspace

SignFide is the proposed US legal-market agreement and eSignature business powered by Circularo. Circularo supplies technology and operates the starting Option A service; REDA supplies the US commercial team and customer lifecycle. SignFide LLC is the proposed US legal and sales entity, with the founder-directed ownership proposal recorded in [DECISIONS](DECISIONS.md).

This is the primary working workspace for project coordination inside the existing parent Git repository. It remains internal and non-canonical under parent governance. Formation, contracts, operating appointments, account readiness, targets and public launch are not presumed completed.

## Start here

1. [MASTER-PLAN](MASTER-PLAN.md): direction, scope, operating boundaries and launch gates.
2. [ROADMAP](ROADMAP.md): proposed phases; Day 0 has not been approved.
3. [TASKS](TASKS.md): the single implementation backlog and completion criteria.
4. [DECISIONS](DECISIONS.md): confirmed instructions and their limits.
5. [OPEN-QUESTIONS](OPEN-QUESTIONS.md): unresolved rights, risks and evidence gaps.
6. [AGENTS](AGENTS.md): contribution rules, metadata and context retrieval.

## Find information

| Area | Read for |
| --- | --- |
| [Company](company/README.md) | Structure, ownership, contracts, operating options, RACI and contribution framework |
| [Brand](brand/README.md) | Selected Good Faith identity, positioning, motto and concept history |
| [Product](product/README.md) | Existing Circularo editions, SignFide packaging choices and shared product roadmap |
| [Commercial](commercial/README.md) | Offer experiments, unit economics, sales stages and channel boundaries |
| [Marketing](marketing/README.md) | Acquisition hypotheses, website messaging, content and publication gates |
| [Operations](operations/README.md) | Shared infrastructure, business data ownership, Odoo Quote-to-Cash, support and CRM |
| [Research](research/README.md) | Discovery questions, evidence handling and source freshness |
| [Assets](assets/README.md) | Brand boards and prompts; production-asset limitations |
| [Archive](archive/README.md) | Historical strategies and the workspace migration record |
| [Website prototype](website-prototype/README.md) | Working local eight-page site, build commands and QA |

The website remains a local prototype. Forms send nothing, and it provides no live signup, payment or signing service. The selected oxblood/parchment identity and serif wordmark supersede the older navy/teal direction; final logo masters remain unfinished.

## Contribute

Read the relevant area and linked question/decision before editing. Keep one owning document per subject; link rather than copying commitments. Add YAML frontmatter to first-party Markdown, preserve stable IDs, qualify proposals and reported facts, and record human decisions with their scope and evidence. Put actions in TASKS and unresolved choices in OPEN-QUESTIONS. Document owners remain unassigned until appointed.

Keep private notes, credentials, customer records, dependencies and generated outputs out of version control. Reorganization does not approve business commitments or public deployment. See [migration and verification](archive/workspace-migration.md).

## Local checks and exports

From this project root, run the dependency-free metadata/link/registry check:

```sh
rtk proxy python3 scripts/check_workspace.py
```

The ignored company/brand XML includes company documents, the linked wholesale-pricing methodology, the relocated question registry and the preserved internal brand strategy source. Rebuild it with the installed Repomix CLI:

```sh
rtk proxy repomix . --include 'company/**,commercial/wholesale-pricing.md,OPEN-QUESTIONS.md,archive/internal-brand-strategy-source.md' --style xml --parsable-style --no-git-sort-by-changes --output signfide-company-repomix.xml
```

That selection excludes private notes and the wider launch workspace. The selected current visual identity is in [Brand](brand/README.md); the preserved source explicitly marks its older palette superseded. Use the project navigation for the full workspace rather than treating a limited export as complete context.
