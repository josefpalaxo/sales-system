---
title: Circularo Sales Repository Architecture Proposal
status: accepted
classification: internal
owner: proposed:commercial-operations
date: 2026-08-27
scope: Accepted repository structure and governance; implementation initiated 2026-08-27
---

# Circularo Sales Repository Architecture Proposal

## Executive recommendation

Build a **layered, entity-backed documentation repository**, not a large library of sales documents and not a fully atomized knowledge graph.

The repository should have one small canonical record for every durable concept that must remain consistent—products, editions, plans, subscription models, ICPs, use cases, competitors, proof, and positioning. Messaging, methodologies, plays, templates, and agent skills should reference those records by stable ID. They may translate or operationalize approved facts, but they must not become alternative sources of those facts.

The key design rule is:

> **Facts are authored once; interpretations declare their dependencies; generated outputs are never silently promoted to truth.**

Start with Markdown plus YAML frontmatter, JSON Schema validation, a small dependency graph, and GitHub pull-request governance. Do not introduce a database, vector store, MCP server, Backstage instance, or complex publishing platform in the first phase. These can later consume the repository; they should not replace it as the source of truth.

### Recommended decisions

| Decision | Recommendation |
| --- | --- |
| Canonical format | Typed Markdown with structured YAML frontmatter |
| Canonical unit | One durable concept per record, but only where independent ownership/reuse justifies it |
| Stable references | Namespaced IDs such as `plan:business` and `icp:regulated-enterprise` |
| Approval states | `draft`, `reviewed`, `approved`, `deprecated` |
| Evidence states | `verified`, `reported`, `inferred`, `hypothesis`, `unknown`, `contradicted` |
| Agent consumption | Approved records selected for the task; skills contain procedure, not company facts |
| Change propagation | Declared dependencies plus generated reverse-impact reports |
| Human governance | Pull requests, CODEOWNERS, required checks, and named business approvers |
| Versions | Git history and release tags for the repository; integer `revision` for approved entities |
| Working output | External destination or the single ignored `work/` directory; promotion requires a normal PR |
| Initial scale | A narrow commercial and messaging spine, then expand from demonstrated use |

## Why this model fits Circularo

The current approved commercial document already contains several distinct kinds of information:

- market-facing product names;
- functional editions;
- priced plans;
- mutually exclusive subscription models and allowed variants;
- deployment modes;
- add-ons, support, storage, and transaction rules;
- explanatory sales narratives; and
- examples of subscriptions and invoice items.

Keeping all of this in one master document makes it readable, but it makes precise reuse and change-impact analysis difficult. It also currently contains material tensions that must not be flattened by an agent. Examples include:

1. **Automated transactions:** the transaction-based sections say that transaction-based subscriptions include manual and automated/API transactions, while the later “Automated Transactions” section says automated transactions are not included in either subscription model and always require add-ons.
2. **Transactional storage:** one section says standard storage is not unlimited and is governed by plan limits, while the storage section says transactional documents are never subject to storage limits.

These are not merely editorial problems. They can change a quote, proposal, entitlement, or customer commitment. The new repository should represent them as unresolved conflicts with owners and block affected facts from customer-facing use until resolved.

## Design principles

1. **One authority per concept.** A plan's allowed subscription variants belong to the plan record, not in a battlecard, play, skill, and pricing narrative.
2. **Stable identity over stable filenames.** Files may move; IDs must remain stable.
3. **Evidence and approval are different axes.** A statement can be directly sourced but not approved for reuse, or approved as a bounded inference.
4. **Dependencies are declared in one direction.** Authors declare what their record depends on; reverse “used by” relationships are generated.
5. **Approved does not mean timeless.** Every approved record has an owner and review date appropriate to its volatility.
6. **Agents consume knowledge; they do not own it.** A skill may select, transform, and check facts, but never silently update or replace an approved fact.
7. **Unknown and contradicted remain visible.** Repetition by agents must never turn an inference or conflict into a fact.
8. **Human readability remains primary.** A seller should be able to browse and understand the repository without specialized software.
9. **Automation enforces structure and traceability, not business judgment.** CI can prove a reference exists; it cannot decide the correct licensing policy.
10. **Earn complexity.** Add entity types, tools, and skills only after a repeated use case proves their value.

## Recommended architecture

```text
sales-system/
├── README.md
├── AGENTS.md
├── CONTRIBUTING.md
├── GOVERNANCE.md
├── CHANGELOG.md
│
├── shared/
│   ├── knowledge/
│   │   ├── company/
│   │   ├── commercial/
│   │   ├── market/
│   │   ├── competition/
│   │   └── proof/
│   ├── messaging/
│   └── templates/
│
├── domains/
│   ├── direct-sales/
│   │   └── README.md
│   └── partnerships/
│       └── README.md
│
├── work/
│   └── README.md
│
├── .agents/
│   └── skills/
│       └── <skill-name>/
│           ├── SKILL.md
│           ├── references/
│           ├── assets/
│           ├── scripts/
│           └── evals/
│
├── governance/
│   ├── owners.yaml
│   ├── vocabularies.yaml
│   ├── conflicts/
│   ├── decisions/
│   └── source-register/
│
├── schemas/
│   ├── common.schema.json
│   ├── entity-types/
│   └── skill-eval.schema.json
│
├── scripts/
│   ├── validate
│   ├── build-catalog
│   ├── impact-report
│   └── check-freshness
│
├── tests/
│   ├── fixtures/
│   ├── assertions/
│   └── journeys/
│
├── generated/
│   ├── catalog.json
│   ├── dependency-graph.json
│   ├── indexes/
│   └── context-packs/
│
├── sources/
│   ├── README.md
│   └── archived-snapshots/
│
└── .github/
    ├── CODEOWNERS
    ├── PULL_REQUEST_TEMPLATE.md
    └── workflows/
        └── validate.yml
```

Domains deliberately begin as README-only scope definitions. They do not mirror the `shared/` layers. Add concept-oriented directories only when governed domain-specific records require them; the initial implementation should create only directories needed by approved entities and validation rules.

### Layer responsibilities

| Layer | Owns | Must not own |
| --- | --- | --- |
| `shared/knowledge/` | Cross-domain facts, definitions, commercial constraints, market entities, evidence | Persuasive prose or task instructions |
| `shared/messaging/` | Cross-domain positioning, narratives, messages, objections, and competitive guidance | Original product/commercial facts copied from knowledge |
| `domains/<domain>/` | Domain-specific knowledge, messaging, methodology, plays, and templates | Duplicated shared facts or another working directory |
| `work/` | The single non-canonical area for temporary and situational output | Approved knowledge or committed customer/account material |
| `.agents/skills/` | Repeatable agent procedure, input/output contracts, selection rules, safeguards | Circularo's canonical facts or hidden policy decisions |
| `governance/` | Ownership, vocabularies, conflicts, decisions, source registration | Seller-facing content |
| `generated/` | Deterministic catalogues, graphs, indexes, impact reports, compiled context | Human-authored truth |
| `sources/` | Evidence inventory and immutable migration snapshots | A competing active source of truth after cutover |

## Canonical records

### Common metadata envelope

Every durable record should use a shared envelope. Entity-specific fields live under `spec`.

```yaml
---
schema_version: 1
id: plan:business
kind: plan
title: Business Plan
status: approved
revision: 3
classification: internal
owner: team:commercial
approvers:
  - team:product
  - team:finance
last_reviewed: 2026-08-15
review_by: 2026-11-15
effective_from: 2026-08-15
aliases: []
tags: [saas, core-plan]
sources:
  - ref: source:commercial-model-2026
    locator: "Part B / Editions vs Plans and permitted combinations"
    observed_at: 2026-08-27
relations:
  based_on:
    - edition:business
  allows:
    - subscription-variant:regular-user-120
spec:
  deployment_modes:
    - deployment:saas
  add_on_availability: broad
---
```

Required common fields should be:

- `schema_version`
- `id`
- `kind`
- `title`
- `status`
- `revision` once approved
- `classification`
- `owner`
- `last_reviewed`
- `review_by`
- `sources`
- `relations`

### IDs and references

Use lowercase namespaced IDs:

```text
company:circularo
product:business-esignature
edition:business
plan:business
subscription-model:transaction-based
subscription-variant:esign-unlimited-users
commercial-rule:automated-transaction-entitlement
icp:regulated-enterprise
buying-role:security-owner
use-case:digital-customer-onboarding
competitor:example-x
proof:customer-onboarding-cycle-time
positioning:enterprise-trust-platform
objection:self-hosting-security
play:sovereign-shared-signing
```

Rules:

- IDs are never renamed after approval. Add aliases if terminology changes.
- A deprecated entity stays in the repository with `successor` when applicable.
- Filenames should usually match the ID suffix, but references resolve by ID.
- Store only forward relations. `used_by` is generated.
- An approved record cannot depend on a draft record unless the dependency is explicitly non-authoritative and the approver accepts it.

### Evidence at claim level

Entity approval alone is not precise enough for sensitive commercial assertions. High-risk facts and claims should carry an evidence state:

| State | Meaning |
| --- | --- |
| `verified` | Directly supported for the stated scope by an authoritative source |
| `reported` | Attributed to a person or system but not independently verified |
| `inferred` | A reasoned conclusion from cited evidence |
| `hypothesis` | A testable possibility used for research or discovery |
| `unknown` | Not supportable with available evidence |
| `contradicted` | Material sources or approved passages disagree |

For high-risk commercial rules, represent the operative assertion in structured `spec` fields and attach a source locator. For less critical prose, cite the source in the body and avoid restating the same rule in multiple records.

Confidence must not replace evidence state. A highly confident inference remains an inference.

### Approval and evidence are separate

Examples:

- An externally reported competitor price may be `reported` evidence in a `reviewed` competitor record.
- A Circularo licensing rule should be `verified` and `approved` before a skill may use it in a quote or proposal.
- A new ICP may be `inferred` but `approved` for testing, provided the allowed use says “discovery hypothesis” rather than “established market fact.”

### Source register and precedence

`governance/source-register/` should contain one metadata record per important internal or external source: owner, system/path, authority by domain, effective dates, access classification, snapshot/hash where appropriate, and whether the repository has replaced it as the active authority.

Precedence must be domain-specific. A product configuration source may be authoritative for technical capability but not price; an executed agreement may govern one customer but not the standard offer; a call transcript may be authoritative for what a buyer said but not whether the statement is objectively true. Never resolve a conflict merely by choosing the newest file. Preserve both claims and send the decision to the owner of the affected domain.

## Proposed entity model

### Standalone from the beginning

These entities have independent ownership, reuse, volatility, or compliance impact and should be standalone records.

| Entity | Why standalone | Typical relations |
| --- | --- | --- |
| `company` | One durable company baseline and approved descriptors | `offers`, `operates_in` |
| `product` | Market-facing offering used across messages and plays | `maps_to`, `supports` |
| `edition` | Hard capability boundary | `enables`, `deployed_as` |
| `plan` | Commercial packaging and allowed variants | `based_on`, `allows` |
| `subscription-model` | Mutually exclusive licensing model | `available_in`, `governed_by` |
| `subscription-variant` | Specific cap/allowance combination quoted and enforced | `variant_of`, `allowed_by` |
| `add-on` | Independent capability or consumption entitlement | `available_in`, `requires` |
| `commercial-rule` | Cross-cutting entitlement, storage, API, or transaction rule | `constrains`, `applies_to` |
| `ICP` | Target-company definition with fit/exclusion logic | `values`, `has_pain`, `uses` |
| `use-case` | Reusable problem/outcome pattern | `for_icp`, `uses_product`, `supported_by` |
| `competitor` | Volatile alternative requiring separate ownership and review | `competes_with`, `relevant_to` |
| `proof-point` | Atomic, bounded evidence that claims may cite | `supports`, `derived_from` |
| `customer-story` | Governed narrative with permissions and scope | `supports`, `for_icp`, `for_use_case` |
| `positioning` | Approved strategic frame used by many narratives | `for_product`, `for_icp`, `supported_by` |
| `narrative` | Approved story arc for an audience/context | `derives_from`, `uses` |
| `objection` | Reused across plays, calls, and training | `about`, `answered_by`, `supported_by` |
| `sales-play` | Executable go-to-market motion | `targets`, `uses`, `follows` |

### Embedded initially, promotable when reused

To avoid an entity explosion, the following should initially be identified subsections inside their owning record. Give each a local stable key. Promote one to a standalone record only when it needs an independent owner/review cadence or is referenced by at least three durable consumers.

| Concept | Initial home | Promote when |
| --- | --- | --- |
| `pain-point` | ICP or use-case | Used across several ICPs/use cases or independently researched |
| `value-driver` | ICP or positioning | Shared across products or owned/measured separately |
| `differentiator` | Positioning or competitor record | Used across several narratives/battlecards |
| `discovery-question` | Methodology or play | Reused in several plays with measurable intent |
| `qualification-criterion` | Qualification methodology | Independently governed or used by multiple qualification frameworks |
| `persona` | ICP/message map | Same persona recurs across multiple ICPs with distinct research |

### Standalone buying roles

Buying roles should be standalone because they describe decision responsibility rather than personality. Examples include `economic-buyer`, `security-owner`, `legal-reviewer`, `technical-evaluator`, `champion`, and `end-user`. A persona may combine a role with an ICP and situational context; it should not redefine the underlying role.

### Circularo-specific additions

The generic entity list in the [original architecture brief](sources/archived-snapshots/repository-architecture-brief.md) is not enough to represent the commercial model safely. Circularo should additionally model:

- edition;
- plan;
- subscription model;
- subscription variant;
- user type;
- transaction category/type;
- deployment mode;
- add-on;
- support plan;
- subscription item; and
- cross-cutting commercial rule.

Not every invoice SKU needs a prose record. When the authoritative SKU catalogue exists, it may be a structured registry linked from plan/add-on records.

## Separating facts from situational and generated content

### Canonical content

Only these may be treated as repository truth:

1. records in canonical directories;
2. with valid schema;
3. in `approved` state;
4. with an owner and non-expired review date; and
5. with no unresolved blocking conflict.

### Draft content

Drafts may live next to their eventual canonical location with `status: draft`. This keeps review diffs clear. Agents must label draft-derived output and may not use it for external claims without explicit instruction.

### Situational output

Account briefs, deal strategies, emails, proposals, and call notes are not durable company knowledge by default. Save them in the destination system that owns the work, or in the single ignored `work/` directory during local generation.

Promotion requires a deliberate extraction step:

```text
customer/deal evidence
        ↓ human-reviewed synthesis
candidate proof, objection, or ICP update
        ↓ pull request and owner approval
approved canonical record
```

Never promote a full generated document. Extract the smallest durable claim or pattern, preserve its provenance, and review it.

### Generated repository artifacts

Files under `generated/` are reproducible views. They should carry a generated header and must never be edited manually. CI should fail if regeneration changes committed generated output.

## Cross-references without duplication

Use three mechanisms:

1. **Structured relations** in frontmatter for machine-readable dependencies.
2. **Normal relative Markdown links** where a human needs to navigate.
3. **Generated indexes** for inverse lookups and browsing.

Do not store both sides of a relationship. For example, a battlecard declares that it uses a competitor and a positioning record. The competitor record does not maintain a handwritten list of battlecards. The generated catalogue supplies that list.

Writers may summarize an upstream concept for flow, but they must not copy its precise limits, numbers, or regulated claims. Use a short reference such as:

> Commercial eligibility: see `plan:business` and `commercial-rule:api-automation`.

This is preferable to restating every allowed combination in the play.

## Change propagation and drift prevention

### Dependency edges

Use a small controlled vocabulary:

| Relation | Meaning | Change effect |
| --- | --- | --- |
| `based_on` / `derives_from` | Consumer meaning materially depends on target | Consumer requires review on semantic change |
| `uses` | Consumer uses target facts or claims | Impact notification; blocking for high-risk facts |
| `supports` / `supported_by` | Evidence supports a claim or narrative | Loss/deprecation may invalidate approval |
| `constrains` / `constrained_by` | Rule limits target behavior, or a consumer declares that a rule limits it | Blocking impact |
| `applies_to` | Scoped applicability | Impact notification |
| `targets` | Play/message targets ICP, role, or use case | Review when target definition changes |
| `supersedes` | New record replaces an old one | Deprecation and migration check |

Each dependency to an approved record records the `reviewed_revision`. When an upstream semantic change increments its revision, the impact checker identifies stale consumers.

### Change-impact workflow

For a positioning change:

1. The author changes `positioning:enterprise-trust-platform` and increments its revision.
2. CI reads the dependency graph.
3. The PR receives an impact report listing dependent narratives, message maps, objections, battlecards, plays, templates with embedded examples, and skills/evals.
4. Owners either update each affected record or explicitly acknowledge “reviewed, no change required.”
5. Required business approvers review the positioning change and its acknowledged impact set.
6. After merge, generated indexes and context packs are refreshed.

Do not automatically downgrade every dependent record to draft. That creates noise and encourages blanket approvals. Instead, require explicit impact disposition for blocking dependencies and record it in the PR.

### Expected impact routes

| Changed concept | At minimum review |
| --- | --- |
| Company/category definition | Positioning, narratives, message maps, public templates, relevant skills |
| Product capability or edition | Plans, add-ons, use cases, demos, objections, plays, commercial-fit skills |
| Plan, price logic, or commercial rule | Quote/proposal templates, commercial messaging, plays, negotiation and commercial-fit skills |
| ICP or buying role | Personas, use cases, message maps, discovery guidance, qualification, targeted plays |
| Positioning or differentiator | Narratives, battlecards, objections, decks, outbound guidance, message-related skills |
| Competitor | Battlecards, competitive objections, relevant plays and competitive-brief evals |
| Proof point or customer-story permission | Every claim, narrative, objection, battlecard, or template that cites it |
| Sales process or qualification criterion | Plays, stage guidance, CRM mappings, methodology-dependent skills |

### Automated checks

The first CI suite should remain deterministic and fast:

- parse frontmatter;
- validate files against JSON Schema Draft 2020-12;
- enforce unique IDs and allowed vocabularies;
- resolve all relation targets and Markdown links;
- prevent approved records from depending on unapproved or expired blocking facts;
- check `review_by` dates;
- require a successor for deprecated records where appropriate;
- reject unresolved placeholders in approved records;
- detect duplicate IDs, titles, and high-similarity candidate text;
- identify contradictory structured commercial rules;
- generate and compare catalog/dependency output;
- validate Agent Skills format;
- validate skill routing/output fixtures;
- scan for secrets and prohibited customer data.

Similarity detection should initially warn, not block. Two records can legitimately discuss the same topic. Hard conflict detection should be limited to structured values where the scope is comparable—for example, whether a plan allows a subscription variant.

### Review cadence

Use risk-based defaults, configurable in `governance/vocabularies.yaml`:

| Record type | Suggested maximum review interval |
| --- | --- |
| Pricing, plan eligibility, add-ons, commercial rules | 90 days or on commercial release |
| Competitors and battlecards | 60–90 days |
| Positioning, narratives, objections | 180 days or after strategy change |
| ICPs, personas, use cases | 180 days |
| Customer proof and permissions | 180 days or permission expiry |
| Methodology and plays | 365 days or after process change |
| Agent skills | On dependency change and at least annually |

These are starting points, not policy until owners agree.

## Governance model

### Roles

Every record has one accountable owner. Several teams may approve it.

| Domain | Suggested accountable owner | Typical required approvers |
| --- | --- | --- |
| Product capabilities and editions | Product | Product, Engineering where needed |
| Plans, subscription models, add-ons, pricing logic | Commercial/Finance | Commercial, Finance, Legal for terms |
| Company/market/ICP/use case | Product Marketing | Sales leadership, Product Marketing |
| Positioning and narratives | Product Marketing | CSO and relevant product owner |
| Proof/customer stories | Customer Marketing/CS | Customer owner, Legal/Privacy where needed |
| Sales methodology and plays | Sales Enablement/Operations | Sales leadership |
| Skills and automation behavior | Sales Operations/AI owner | Domain owner for facts used |
| Repository governance and schemas | Repository maintainer | Domain governance owner |

### Status transitions

```text
draft → reviewed → approved → deprecated
  ↑        │           │
  └────────┴── revision┘
```

- `draft`: being authored; not reusable as fact.
- `reviewed`: domain review occurred, but final approval or evidence is incomplete.
- `approved`: canonical for its stated scope and allowed uses.
- `deprecated`: retained for history; new use prohibited; successor identified if one exists.

Rejected ideas remain in PR history or decision records rather than becoming a permanent content status.

### Pull-request rules

Every PR should state:

- business reason;
- changed entity IDs;
- whether the change is factual, narrative, procedural, structural, or generated;
- source/evidence changes;
- impact report and disposition;
- approvals required;
- validation/evals run;
- effective date and rollout notes.

Configure GitHub rules to require:

- a pull request for `main`;
- passing validation;
- CODEOWNER review for affected paths;
- dismissal of stale approvals when relevant files change;
- no force pushes to `main`; and
- protection of `.github/CODEOWNERS` itself.

GitHub's documentation confirms that CODEOWNERS can automatically request responsible reviewers and that rulesets can require both reviews and passing status checks. The proposal should use these native controls before inventing a separate approval system.

### Decisions and conflicts

Use small decision records under `governance/decisions/` for choices that explain repository or commercial architecture. Each decision records context, decision, alternatives, consequences, owner, and date.

Use `governance/conflicts/` for unresolved business truth:

```yaml
id: conflict:automated-transactions-inclusion
status: open
severity: blocking
affects:
  - subscription-model:transaction-based
  - commercial-rule:api-automation
sources:
  - ref: source:commercial-model-2026
    locator: "Transaction-Based Subscriptions / Transaction Types"
  - ref: source:commercial-model-2026
    locator: "Manual vs Automated Transactions / Automated Transactions"
decision_owner: team:commercial
review_by: 2026-09-15
```

An open blocking conflict prevents the affected record from being approved for external use. Resolving it requires a decision record and updates to every affected canonical entity.

## Versioning

Use three complementary mechanisms:

1. **Git commits** provide exact history and authorship.
2. **Integer entity revisions** (`revision: 4`) identify semantic versions of durable records and enable dependency review.
3. **Repository release tags** use Semantic Versioning once skills or external consumers rely on stable repository behavior.

Do not apply full semantic versions to every knowledge record. The distinction between a “minor” and “patch” ICP change is unlikely to be consistently useful. Increment the integer revision for any semantic approved change; typo-only changes need not increment it.

At repository level:

- major: incompatible schema, ID, or agent contract change;
- minor: new backward-compatible entity type, capability, or skill;
- patch: backward-compatible correction or validation improvement.

## Agent architecture

### Global context versus skills

`AGENTS.md` should be short and operational. It should contain:

- repository purpose and canonicality rules;
- which directories contain which kinds of information;
- status/evidence rules;
- prohibition on inventing or silently promoting facts;
- required validation commands;
- write/approval boundaries; and
- how to resolve stable IDs.

It should not contain Circularo positioning, pricing, ICP definitions, competitor claims, or a sales methodology. Those change independently and belong in canonical records.

### Agent Skills

Use the open [Agent Skills specification](https://agentskills.io/specification) for `.agents/skills/`. A skill directory contains a required `SKILL.md` and optional `references/`, `assets/`, and `scripts/`. Keep the main skill concise and load detailed resources only when needed.

Each local skill should declare:

- the job and trigger boundary;
- required and optional inputs;
- which entity kinds/IDs it may resolve;
- allowed evidence/status rules;
- procedure and stop conditions;
- output contract;
- external-action approval boundary;
- failure modes; and
- eval fixtures.

Skills should request a context pack, not read the entire repository. Initially this can be a deterministic local selector. Later the same selector can be exposed through MCP without changing canonical storage.

### Recommended initial skills

Do not begin with dozens of skills. Start with four or five that exercise the architecture:

1. `resolve-sales-context` — select approved, current records for a task and expose conflicts.
2. `check-commercial-fit` — evaluate a requested plan/subscription/add-on combination without inventing eligibility.
3. `build-competitive-brief` — assemble evidence-backed guidance from a competitor, positioning, objections, and proof.
4. `prepare-discovery` — use ICP, role, use case, methodology, and play context.
5. `check-message-consistency` — compare situational content with current approved positioning and claims.

The first skill is infrastructure for safe context. The next four test commercial correctness, messaging reuse, methodology, and drift detection.

### Skill tests

For each skill, keep:

- natural requests that should trigger it;
- near-neighbor requests that should not;
- realistic input fixtures;
- required output assertions;
- prohibited behavior assertions;
- at least one sparse/conflicting-input case; and
- for material skills, an end-to-end journey showing state preservation across handoffs.

For Circularo, the commercial-fit eval must include the current automated-transaction and storage conflicts and require the agent to surface uncertainty instead of selecting a convenient passage.

## External repositories and standards

### Recommended reuse decisions

| Source | Useful patterns | Recommendation |
| --- | --- | --- |
| [Agent Skills specification](https://agentskills.io/specification) | Portable `SKILL.md` structure, progressive disclosure, reference validator | **Adopt** as the skill packaging standard |
| [nthnclrk/enablement-skills](https://github.com/nthnclrk/enablement-skills) | Shared context states, source/freshness metadata, central house style, per-skill eval definitions, validation, version/change discipline | **Adapt** governance and eval patterns; do not import the full skill catalogue |
| [OpenAI role-specific sales plugin](https://github.com/openai/role-specific-plugins/tree/main/plugins/sales) | Bounded workflows, structured request/output contracts, source priority, evidence gaps, connector-aware fallbacks | **Adapt** contracts and selected workflows; keep company truth outside skills |
| [shaunmarsden/practical-ai-sales-workflows](https://github.com/shaunmarsden/practical-ai-sales-workflows) | Approval-gated workflows, output rubrics, examples, handoff contracts, usability/evaluation records | **Adopt/adapt** approval and handoff patterns; treat recipes as workflow examples, not source truth |
| [zarif3624/gtm-skills](https://github.com/zarif3624/gtm-skills) | Evidence/status contract, structured GTM/evidence schemas, adversarial per-skill cases, cross-skill journeys, generated digests | **Adapt strongly**; merge the evidence vocabulary with Circularo governance after terminology review |
| [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills/tree/main/skills/sales-enablement) | Progressive references, per-skill evals, message-consistency and sales-asset patterns | **Selectively adapt**; reject a single shared product-marketing document as the canonical model |
| [Product Marketing Alliance skills](https://github.com/pmalliance/product-marketing-skills) | Claim checking, message consistency, customer-language extraction | **Adapt three review workflows**; do not adopt its small shared context template as source truth |
| [LeadMagic/gtm-skills](https://github.com/LeadMagic/gtm-skills) | Broad task taxonomy, references/templates, repository quality documentation | **Use as discovery catalogue only**; 205 skills are premature for Circularo and create review surface |
| [louisblythe/Sales-Skills](https://github.com/louisblythe/Sales-Skills) | Broad sales and AI-SDR taxonomy | **Reject wholesale adoption**; overlapping micro-skills increase routing and narrative consistency risk |
| [Backstage catalog entity model](https://backstage.io/docs/features/software-catalog/descriptor-format/) | Typed entity envelope, stable names, lifecycle, owner, relations and generated graph | **Adapt the conceptual envelope**; do not install Backstage |
| [JSON Schema 2020-12](https://json-schema.org/specification) | Machine validation for typed YAML/JSON-compatible metadata | **Adopt** for repository schemas |
| [GitHub CODEOWNERS and rulesets](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners) | Native ownership, required review, and protected merge gates | **Adopt** |
| [Architectural Decision Records](https://adr.github.io/) | Small durable decision/rationale records | **Adapt** for repository and commercial decisions |

### What to merge rather than duplicate

The best local synthesis is:

- evidence states and handoff invariants from evidence-first GTM repositories;
- context freshness, sensitivity, and reuse boundaries from enablement context patterns;
- input/output and source-priority contracts from the OpenAI sales plugin;
- approval gates and practical examples from practical sales workflows;
- per-skill trigger/output evals from the stronger skill libraries; and
- typed ownership/dependency concepts from Backstage.

These should become one Circularo vocabulary and validation model. Do not keep separate “house rules” copied from each source.

### What not to adopt now

- A monolithic `product-marketing-context.md` as the source of all product, market, proof, and messaging truth.
- Hundreds of imported skills before Circularo has owners and eval capacity.
- A separate skill for every sales micro-behavior.
- A graph database or vector database as canonical storage.
- Automated semantic approval or automatic conflict resolution by an LLM.
- MCP as a knowledge model. MCP is a useful transport/integration convention, not a replacement for schemas and governance.
- A fixed proprietary sales methodology encoded throughout the repository. Model the selected methodology locally and keep skills adaptable.

### Licensing and pinning

Before copying any external skill or reference text:

1. verify its license at the selected commit;
2. record repository, commit/tag, source path, and local modifications;
3. prefer conceptual adaptation over copying large prose blocks;
4. add attribution where the license or internal policy requires it; and
5. make upstream updates deliberate rather than automatic.

## Alternative architectures

### Alternative A: Document-centric handbook

```text
knowledge/
messaging/
methodology/
plays/
templates/
.agents/skills/
```

Authors maintain a small number of broad Markdown documents with ordinary links.

**Advantages:** fastest to start, easy for non-technical contributors, low schema burden.

**Disadvantages:** facts get copied into multiple documents; granular ownership, freshness, and impact analysis remain weak; agent retrieval tends to load large context blocks.

**Use if:** the repository will remain small, with one or two maintainers and little autonomous agent use.

**Assessment:** viable as a three-month pilot, but insufficient for Circularo's commercial combinations and stated long-term agent goal.

### Alternative B: Fully atomic knowledge graph

Every pain, role, claim, capability, rule, proof point, and relation is a separate YAML/JSON node; Markdown views are generated.

**Advantages:** strongest machine reasoning, precise impact analysis, easy API/MCP exposure.

**Disadvantages:** high authoring friction, fragmented reading experience, complex migrations, large taxonomy/governance burden, temptation to build tooling before knowledge is mature.

**Use if:** many products, regions, languages, and autonomous agents already depend on the model, with dedicated knowledge engineering capacity.

**Assessment:** a possible future evolution, not a suitable starting point.

### Alternative C: Skills-first operating repository

Organize around tasks such as discovery, battlecards, outbound, qualification, and proposals. Each skill bundles its required knowledge and templates.

**Advantages:** quick agent utility, portable installation, clear task ownership.

**Disadvantages:** repeated company facts in every skill, updates require editing multiple packages, and agents become de facto sources of truth.

**Use if:** distributing generic methods without company-specific canonical knowledge.

**Assessment:** appropriate for public skill libraries, but specifically contrary to Circularo's drift-prevention objective.

### Trade-off summary

| Architecture | Human ease | Drift control | Agent precision | Initial effort | Long-term fit |
| --- | ---: | ---: | ---: | ---: | ---: |
| Recommended entity-backed layers | High | High | High | Medium | High |
| Document-centric handbook | Very high | Low | Medium | Low | Medium-low |
| Fully atomic graph | Low-medium | Very high | Very high | Very high | Potentially high later |
| Skills-first | Medium | Low | High for generic tasks | Medium | Low for canonical company knowledge |

## Illustrative concept flow

The following is illustrative and must not be treated as an approved Circularo ICP. It shows how a concept moves without duplication.

### 1. Knowledge

`shared/knowledge/market/icps/regulated-enterprise.md`

```yaml
id: icp:regulated-enterprise
kind: icp
status: draft
owner: team:product-marketing
sources:
  - ref: source:commercial-model-2026
    locator: "Self-Hosted — typical for governments and regulated entities"
relations:
  uses:
    - deployment:self-hosted
spec:
  fit_hypothesis:
    evidence_status: inferred
    text: Organizations requiring dedicated or sovereign deployment may fit the Ultimate plan.
  exclusions: []
```

This record owns the company-fit hypothesis. It does not contain a pitch.

### 2. Messaging

`shared/messaging/narratives/sovereign-trust-control.md`

```yaml
id: narrative:sovereign-trust-control
status: draft
relations:
  targets:
    - icp:regulated-enterprise
  based_on:
    - product:enterprise-trust-platform
  constrained_by:
    - plan:ultimate
```

The narrative translates the ICP and product into an approved story. It references eligibility rather than copying every Ultimate-plan rule.

### 3. Play

`domains/direct-sales/regulated-selling/sovereign-shared-signing.md`

The play references the ICP, narrative, buying roles, deployment facts, qualification method, and relevant proof. It defines triggers, discovery goals, stage gates, disqualifiers, and handoffs. If the ICP or plan changes, the impact report lists the play.

### 4. Agent skill

`.agents/skills/prepare-regulated-discovery/SKILL.md`

The skill instructs the agent to:

1. resolve the approved ICP, play, narrative, and plan facts;
2. surface any conflict or expired record;
3. create questions using the selected discovery methodology;
4. distinguish hypotheses from known customer facts; and
5. avoid promising deployment or commercial eligibility not present in approved records.

The skill contains no permanent statement that governments require self-hosting or that a particular plan is eligible. It resolves current records at execution time.

## Proposed change and review workflow

### Normal change

1. Contributor opens a branch and changes the smallest authoritative record.
2. Local validation checks schema, references, status rules, and generated output.
3. The impact tool lists affected consumers.
4. Contributor updates or disposition-reviews affected files.
5. PR requests CODEOWNERS and business approvers.
6. CI validates structure, links, graph, freshness, and relevant skill evals.
7. Approvers merge; generated indexes publish automatically.

### Urgent correction

For a commercially harmful error:

1. mark the affected record `reviewed` or add a blocking conflict immediately;
2. publish an internal notice through the normal operational channel;
3. correct and approve through an expedited PR;
4. run impact analysis on dependent artifacts; and
5. record the incident and preventive validation rule if deterministic detection is possible.

### Scheduled review

A weekly CI job reports:

- records expiring within 30 days;
- expired approved records;
- open blocking conflicts;
- orphaned records with no owner;
- deprecated records still referenced; and
- skills whose reviewed dependency revisions are stale.

It should open or update one tracking issue, not generate notification spam per file.

## Phased implementation plan

This proposal does not implement the repository. If approved, implementation should proceed in narrow phases.

### Phase 0 — resolve design authority

- Name the repository owner and business domain owners.
- Decide the external-vs-repository source-of-truth cutover.
- Resolve or formally record the two known commercial contradictions.
- Obtain the Add-On catalogue and any SKU/price authority needed for modelling.
- Agree the initial status/evidence vocabulary and classification levels.

### Phase 1 — minimum canonical spine

- Initialize Git and governance files.
- Implement the common schema and 6–8 required entity schemas.
- Import the commercial model as typed product, edition, plan, subscription, deployment, add-on, and commercial-rule records.
- Preserve the original document as a source snapshot, then designate the typed records as canonical after approval.
- Add ID/reference/link/freshness validation and a generated catalogue.

### Phase 2 — market, message, and proof

- Add the first ICPs, buying roles, use cases, positioning, narratives, objections, and proof records.
- Add dependency impact reporting and review dispositions.
- Add customer-proof permissions and classification controls.

### Phase 3 — plays and first skills

- Add one high-value sales play and the four or five initial skills.
- Add routing, adversarial, and end-to-end journey evals.
- Measure seller usefulness and maintenance cost before expanding.

### Phase 4 — integrations only when justified

- Compile task-specific context packs.
- Expose read-only selection through MCP or another client adapter if needed.
- Integrate CRM, call intelligence, or document systems as evidence sources with explicit promotion workflows.
- Add publishing surfaces for sellers if repository browsing is insufficient.

## Risks and likely failure modes

| Risk | Likely symptom | Mitigation |
| --- | --- | --- |
| Taxonomy explosion | Dozens of tiny records nobody maintains | Embed concepts initially; promotion threshold; architecture owner review |
| YAML overwhelms sellers | Contributors bypass the repo | Templates, clear examples, editor support, minimal required fields |
| Duplicate prose becomes duplicate truth | Same limit differs across docs | Structured high-risk facts, reference lint, similarity warnings |
| Approval theatre | Owners bulk-approve impact reports | Small PRs, blocking edges only, explicit “no change” rationale |
| Review dates become noise | Everything expires together | Risk-based cadences, rolling reviews, one consolidated issue |
| Agents use drafts as facts | External claims cite unapproved work | Context selector defaults to approved/current only; adversarial evals |
| Conflict detector creates false positives | Contributors ignore warnings | Block only structured comparable fields; semantic checks warn first |
| Skills fork the narrative | Each skill embeds different claims | Skills resolve IDs at runtime; facts forbidden in SKILL.md |
| External skill updates change behavior | Outputs drift after upgrades | Pin source commits, local evals, deliberate update PRs |
| Customer information leaks into Git | Sensitive call/account data becomes permanent | No live account output in canonical repo; classification and secret/PII scans |
| Methodology becomes dogma | Skills force one framework on every deal | Separate methodology from task procedure; support explicit adapters |
| Generated artifacts become authority | Humans edit catalogue/index | Generated headers, overwrite-only scripts, CI reproducibility |
| Repository is correct but unused | Sellers rely on old decks and chat copies | Clear publishing/search experience, deprecation notices, field feedback loop |

## Open design decisions before implementation

1. Who is the accountable repository owner?
2. Which GitHub organization, teams, and branch/ruleset capabilities will host it?
3. Which system is authoritative during migration: the existing Google Docs, this repository, or a time-bounded dual-control phase?
4. Who can approve product capability, commercial entitlement, pricing, legal terms, positioning, proof, and methodology?
5. What information classifications are required beyond `public`, `internal`, `confidential`, and `restricted`?
6. May approved customer proof be stored in Git, or only referenced from a controlled system?
7. What are the final rules for automated transactions and transactional-document storage?
8. Where is the authoritative Add-On/SKU/price catalogue, and can it be exported deterministically?
9. Which sales methodology is currently official, and which elements are mandatory versus optional guidance?
10. Which first ICP/use case/play will provide the best pilot?
11. Which agent clients must be supported initially: Codex only, or other Agent Skills clients too?
12. Should generated catalogues be committed for easy browsing or produced only in CI/releases?
13. What constitutes approval for an inferred ICP or competitive claim?
14. What seller-facing publishing/search surface is needed beyond GitHub?

## Acceptance criteria for the eventual implementation

The first implementation should not be considered complete until it can demonstrate all of the following with a small sample corpus:

- one fact has one authoritative record;
- every approved record has an owner, source, revision, and review date;
- conflicting commercial facts remain visible and block unsafe use;
- changing an upstream entity produces a correct dependent-file impact report;
- an approved messaging artifact cannot silently depend on a draft or expired critical fact;
- a skill retrieves only relevant approved context and preserves evidence status;
- generated indexes are reproducible;
- a non-technical reviewer can understand and approve a change in GitHub; and
- the maintenance burden is acceptable to the named owners.

## Research basis

The recommendation is based on direct repository inspection of the six references named in the [original architecture brief](sources/archived-snapshots/repository-architecture-brief.md), two additional sales/PMM skill repositories, and the following primary standards and platform documentation:

- [Agent Skills specification](https://agentskills.io/specification)
- [OpenAI role-specific sales plugin](https://github.com/openai/role-specific-plugins/tree/main/plugins/sales)
- [Enablement Skills](https://github.com/nthnclrk/enablement-skills)
- [Practical AI Sales Workflows](https://github.com/shaunmarsden/practical-ai-sales-workflows)
- [Evidence-first GTM Skills](https://github.com/zarif3624/gtm-skills)
- [Product Marketing Alliance skills](https://github.com/pmalliance/product-marketing-skills)
- [Marketing Skills sales enablement](https://github.com/coreyhaines31/marketingskills/tree/main/skills/sales-enablement)
- [LeadMagic GTM Skills](https://github.com/LeadMagic/gtm-skills)
- [Sales-Skills](https://github.com/louisblythe/Sales-Skills)
- [Backstage catalog descriptor model](https://backstage.io/docs/features/software-catalog/descriptor-format/)
- [JSON Schema specification](https://json-schema.org/specification)
- [GitHub CODEOWNERS](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)
- [GitHub repository rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets)
- [Semantic Versioning 2.0.0](https://semver.org/)
- [Architectural Decision Records](https://adr.github.io/)

## Final recommendation

Approve the **entity-backed layered architecture** as the target direction, but implement only the minimum commercial spine first. Circularo's commercial model is complex enough to justify typed records and dependency checks, yet the repository is new enough that a large framework would be premature.

The first proof of value should be concrete: model the commercial rules, expose and resolve contradictions, generate a usable catalogue, change one plan rule, and show exactly which messages, plays, and skills require review. If that workflow is understandable to the business owners and maintainable without specialist intervention, the architecture is sound enough to expand.
