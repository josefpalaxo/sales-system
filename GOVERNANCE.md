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

## Master documents and derived records

Full master documents live with their subject in `shared/`, identified by `kind: master-document` and `record_role: master`. A current approved master is the authoritative business definition for its stated scope. Reusable drafts may also live in the library; placement does not approve their contents or external use.

Structured records provide smaller, agent-readable representations of a master. They carry `record_role: derived`, a `derives_from` relation, `master_id`, and the reconciled `master_revision`. Their own approvals and review dates remain necessary for reuse. An approved structured representation cannot independently supersede its governing master.

Change the master first, increment its revision for semantic changes, review affected derived records, and update their master revision references after reconciliation. A revision mismatch blocks unqualified reuse of the affected representation. If a master and a derived record disagree, preserve and register the discrepancy; do not silently select a rule. An approved decision may authorize a change, but the affected master and representations must be reconciled before the new rule is reused.

Historical snapshots preserve superseded evidence, not the active master. The source register identifies the active document and any retained historical snapshot. Existing conflicts still constrain the relevant passages of an otherwise approved master.

Imported documents retain their source approval evidence and draft limitations. A migration/integrity review does not establish business approval, refresh a commercial review date, or authorize external sharing. Legacy `external` audience labels do not imply public classification. See [the master-document authority decision](governance/decisions/master-document-authority.md).

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

Source descriptions and preserved inputs live together under `sources/`, indexed by [sources/README.md](sources/README.md). A maintained description uses a `<name>.source.md` filename and retains the shared record metadata and stable source ID. Original inputs and historical editions stay separate from the maintained description, under `originals/` or `snapshots/` where helpful. There is one source index; do not create topic-specific or governance source registers.

Source authority is scope-specific. A document may be authoritative for a product capability but not price, or for what a buyer said but not objective truth. A durable external reference can be sufficient; preserving a copy is optional and subject to access and handling rules. Relocation does not refresh reviews or approve new claims.

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

## Content locations

`shared/` contains reusable knowledge and materials by subject. `relationships/` contains permitted organization-specific context. `work/` contains projects, experiments, preparation and temporary output. Direct sales and partnerships are sales motions, not separate knowledge roots. Do not recreate retired standalone roots.

A reusable draft may be promoted to a maintained shared location without being approved. Preserve its status, evidence, classification and provenance. Working and relationship material remains non-canonical whether or not it is versioned. Supporting navigation needs no record envelope; unknown owners and review dates may be explicit null/unassigned for drafts only. Review and approval require the existing accountability and evidence controls.

The approved `work/m-capital/` exception versions original project documentation and explicitly allowlisted source files without sanitization. Its local `.gitignore` denies all other files by default, including raw/customer data, detailed evidence, generated workbooks, previews, dependencies and local connection configuration. These local artifacts must not be force-added. Adding another source file requires explicit allowlist review. Versioning is for internal traceability, not investor publication approval. This exception neither audits nor changes existing tracking in other working projects.

Durable learning from working material is promoted by extracting the smallest reusable claim or pattern into a normal record, preserving provenance, and submitting it for review.

## Relationship records and investor outreach

Partner and investor workspaces live under `relationships/`, with local agent instructions and the applicable handling rules. Common investor context is maintained by subject under `shared/`; [investor preparation](shared/playbooks/investors/README.md) indexes it and links its evidence rules. Relationship records remain operational context, outside the reusable knowledge catalogue. Local profiles and sources retain their approval and confidentiality states.

The explicit 2026-10-03 investor-outreach authorization continues at `relationships/investors/outreach/`: the requested research, contact lists/register, saved conversations, evidence, scripts and outputs may remain versioned as confidential drafts. This exception does not extend to unrelated CRM exports, customer dumps, credentials or other correspondence. Versioning never authorizes sending or publication. Other relationship material follows the existing exclusions and local rules. Use the parent repository history, not nested Git repositories.

## Governed binary assets

Reusable sales artifacts such as slide decks may be committed under `shared/assets/`, including partner-focused artifacts. Each committed artifact must have a companion governed Markdown record that states its stable path, audience, purpose, owner, status, classification, review dates, and source lineage.

For slide decks, `domain` and singular `topic` are first-class organizational metadata. `topic` mirrors the one folder below `assets/slides/`. The Markdown record and PPTX use the same stable basename. A deck therefore has one authoritative physical location; use tags for flexible discovery and typed relations for secondary, governed associations rather than copied files.

## Topics, tags, and relationships

Every slide deck has one primary `topic`; other record kinds may add one when it provides a useful canonical home. `tags` are optional, free-form discovery labels and do not carry governance semantics.

Use relationship-named fields under `relations` for meaningful, traceable connections. Each link is declared once with a stable record ID; the generated dependency graph derives its inverse automatically. For example:

```yaml
relations:
  based_on:
    - source:commercial-model-2026
  constrained_by:
    - conflict:pricing-scope
```

The permitted relationship names are registered in `governance/vocabularies.yaml`. Do not manually duplicate an inverse relationship merely to make navigation easier.

Normal revisions replace the file at its stable path; Git history stores prior revisions. Do not create `v2`, `final`, dated, or similarly versioned copies unless an explicitly requested frozen edition is a distinct governed artifact. Real audience, language, legal-scope, or domain variants use descriptive stable filenames and separate records.

Binary artifacts do not become canonical merely by being committed. Their companion record must be current and `approved`, and every substantive claim inside the artifact remains subject to the repository's evidence, conflict, and classification rules.
