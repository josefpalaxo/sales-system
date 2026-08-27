# Governance

## Authority model

The repository is canonical only for records that are:

1. structurally valid;
2. `approved` for the stated scope;
3. owned by a registered role or team;
4. within their review period;
5. supported by traceable sources; and
6. unaffected by an open blocking conflict.

Git history records what changed. Approval metadata records whether the resulting content may be reused.

## Content lifecycle

| Status | Meaning | Reuse |
| --- | --- | --- |
| `draft` | Being authored | Not authoritative |
| `reviewed` | Domain review has occurred, but final approval or evidence is incomplete | Qualified internal use only |
| `approved` | Canonical for its scope and allowed uses | Permitted subject to classification |
| `deprecated` | Retained for history; new use prohibited | Use successor if present |

## Evidence lifecycle

| Evidence state | Meaning |
| --- | --- |
| `verified` | Directly supported for the stated scope by an authoritative source |
| `reported` | Attributed to a person or system but not independently verified |
| `inferred` | Reasoned conclusion from cited evidence |
| `hypothesis` | Testable possibility, not a conclusion |
| `unknown` | Not supportable from available evidence |
| `contradicted` | Material sources or approved passages disagree |

Confidence never upgrades evidence state.

## Classification

| Classification | Intended handling |
| --- | --- |
| `public` | Approved for public reuse |
| `internal` | Circularo internal use |
| `confidential` | Restricted business information; limited audience |
| `restricted` | Explicitly controlled access; do not place in broad context packs |

Classification is not publication approval. Customer-facing use must also be permitted by status, evidence, scope, and claim boundaries.

## Ownership

Every durable record has one accountable `owner`. Owners and approval roles are registered in [`governance/owners.yaml`](governance/owners.yaml). Initial role assignments are provisional until the named business owners confirm them.

The owner is accountable for correctness and review. Approvers provide domain authority. Repository maintainers enforce structure but may not make product, commercial, legal, or messaging decisions on behalf of domain owners.

## Stable IDs and revisions

- IDs use `namespace:slug`, for example `plan:business`.
- IDs are globally unique and immutable after approval.
- Approved semantic changes increment the integer `revision`.
- Typographic corrections do not require a revision increment.
- Deprecated records remain addressable and identify a successor where one exists.

## Sources

Important sources have records under `governance/source-register/`. Source authority is domain-specific. A document may be authoritative for a product capability but not price, or for what a buyer said but not objective truth.

Never resolve a conflict merely by selecting the newest source. Preserve the disagreement and route it to the accountable owner.

## Conflicts

Conflicts live under `governance/conflicts/` and use `open`, `resolved`, or `accepted-risk` status.

- `blocking` conflicts prevent affected records from being approved for external use.
- `material` conflicts require owner disposition but may not block unrelated use.
- `advisory` conflicts record ambiguity with limited commercial impact.

Resolution requires a decision record, updated canonical records, and impact review of their consumers.

## Reviews

Suggested maximum review intervals:

| Record type | Interval |
| --- | --- |
| Plans, eligibility, add-ons, prices, commercial rules | 90 days or commercial release |
| Competitors and battlecards | 60–90 days |
| Positioning, narratives, objections, ICPs, use cases, proof | 180 days |
| Methodology and plays | 365 days or process change |
| Agent skills | Dependency change and at least annually |

Owners may set shorter periods. Expired approved records are not automatically deleted; they become ineligible for unqualified reuse until reviewed.

## Pull requests and approvals

Changes to `main` should use pull requests with:

- changed stable IDs;
- business reason and effective date;
- source and evidence changes;
- dependency impact and disposition;
- required business approvals; and
- validation/evaluation results.

GitHub rules should require passing checks and CODEOWNER review. `CODEOWNERS` itself must be protected.

## Working material

`work/` is the only working directory. It is ignored except for its README. Do not add `tmp`, `.work`, domain-specific work folders, or account-output trees.

Durable learning from working material is promoted by extracting the smallest reusable claim or pattern into a normal record, preserving provenance, and submitting it for review.

## Governed binary assets

Reusable sales artifacts such as slide decks may be committed under `shared/assets/` or `domains/<domain>/assets/`. Each committed artifact must have a companion governed Markdown record that states its stable path, audience, purpose, owner, status, classification, review dates, and source lineage.

Normal revisions replace the file at its stable path; Git history stores prior revisions. Do not create `v2`, `final`, dated, or similarly versioned copies unless an explicitly requested frozen edition is a distinct governed artifact. Real audience, language, legal-scope, or domain variants use descriptive stable filenames and separate records.

Binary artifacts do not become canonical merely by being committed. Their companion record must be current and `approved`, and every substantive claim inside the artifact remains subject to the repository's evidence, conflict, and classification rules.
