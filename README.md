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

## Start here

1. Read [GOVERNANCE.md](GOVERNANCE.md).
2. Read the relevant shared records and domain README.
3. Make changes through the workflow in [CONTRIBUTING.md](CONTRIBUTING.md).
4. Run `rtk make validate` before review.

## Current state

This is the initial repository foundation. It includes:

- shared and domain-extensible information architecture;
- governance, ownership, lifecycle, evidence, and conflict rules;
- a source register and archived input snapshots;
- initial records for the known commercial-model conflicts;
- deterministic structural validation and a generated catalogue; and
- initial domain definitions for direct sales and partnerships, without replicated content scaffolding.

The commercial model has not yet been fully decomposed into plans, editions, add-ons, and entitlement records.

## Key documents

- [Repository architecture proposal](REPOSITORY_PROPOSAL.md)
- [Governance](GOVERNANCE.md)
- [Contributing](CONTRIBUTING.md)
- [Agent instructions](AGENTS.md)
- [Domain model](domains/README.md)
- [Schema conventions](schemas/README.md)
