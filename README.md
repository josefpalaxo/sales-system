# Circularo Sales System

This repository is the governed source for Circularo sales knowledge, messaging, methodologies, plays, templates, proof, and agent procedures.

## Repository model

The repository has three content zones:

- [`shared/`](shared/README.md) contains canonical knowledge and messaging used across sales domains.
- [`domains/`](domains/README.md) contains modular sales domains such as direct sales and partnerships.
- [`work/`](work/README.md) is the single non-canonical working directory for drafts and situational output.

Governed binary artifacts live in topic folders under `shared/assets/` or `domains/<domain>/assets/`. Their normal revisions replace one stable file; Git history carries earlier versions.

The user-authorized [`investors/`](investors/README.md) workspace is also versioned here for investor context and relationship preparation, subject to its local governance and the investor workspace exception in `GOVERNANCE.md`.

Agents and humans must treat only current, approved records as canonical. Draft, reviewed, expired, or conflicted material must remain visibly qualified.

Full active master documents are the business authority for their approved scopes. Smaller structured records are derived representations for agent use. Start with the [master document library](shared/master-documents/README.md), including the Commercial Model and Add-On Model; use the [partner document library](domains/partnerships/master-documents/README.md) for the imported partner program, pricing, and enablement material.

## Start here

1. Read [GOVERNANCE.md](GOVERNANCE.md).
2. Read the relevant shared records and domain README.
3. Make changes through the workflow in [CONTRIBUTING.md](CONTRIBUTING.md).
4. Run `rtk make validate` before review.

## Current state

The repository includes:

- shared and domain-extensible information architecture;
- governance, ownership, lifecycle, evidence, and conflict rules;
- active master documents, a source register, and historical input snapshots;
- initial records for the known commercial-model conflicts;
- deterministic structural validation and a generated catalogue; and
- domain definitions for direct sales and partnerships, with imported partner-program documents retaining their draft limitations.

The Commercial Model and Add-On Model remain active full master documents. Structured commercial records support agent use and track the master revisions they represent. Importing the remaining sales-repo documents does not approve draft prices, programs, or external content. See the [migration report](work/commercial-master-migration/README.md) for coverage, differences, and dependencies still to migrate.

## Key documents

- [Repository architecture proposal](REPOSITORY_PROPOSAL.md)
- [Governance](GOVERNANCE.md)
- [Contributing](CONTRIBUTING.md)
- [Agent instructions](AGENTS.md)
- [Domain model](domains/README.md)
- [Schema conventions](schemas/README.md)
