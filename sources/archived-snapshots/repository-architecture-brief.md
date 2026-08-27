# Objective

Explore and evaluate how to structure a version-controlled sales repository that is usable by both humans and AI agents before implementing anything.

The repository should become the canonical source for sales knowledge, messaging, methodologies, plays, proof, and agent skills. The main concern is long-term maintainability: clear ownership, controlled evolution, low duplication, and mechanisms that prevent narrative or factual drift.

# What to investigate

Review existing agent-skill and sales-enablement repositories and use them as reference material, not as fixed requirements.

Known references include:

- https://github.com/nthnclrk/enablement-skills
- https://github.com/openai/role-specific-plugins/tree/main/plugins/sales
- https://github.com/louisblythe/Sales-Skills
- https://github.com/coreyhaines31/marketingskills/tree/main/skills/sales-enablement
- https://github.com/shaunmarsden/practical-ai-sales-workflows
- https://github.com/LeadMagic/gtm-skills

Also search GitHub and other credible sources for additional:

- sales enablement skills
- GTM skills
- revenue enablement frameworks
- sales playbooks
- Agent Skills / `SKILL.md` repositories
- sales methodology implementations
- knowledge-management patterns for agentic systems
- examples of canonical context repositories
- governance and drift-prevention approaches

Codex should decide which sources are useful.

Do not assume any of the repositories above are architecturally correct. Compare them, extract useful patterns, reject weak ones, and recommend other sources if they are better.

# Key questions

Determine:

1. What should be the canonical repository structure?
2. What belongs in:
   - knowledge
   - messaging
   - methodology
   - plays
   - templates
   - agent skills
3. How should canonical facts be separated from generated or situational sales content?
4. How should files reference each other without duplicating the same information?
5. What metadata/schema should core sales entities use?
6. How should changes propagate when positioning, ICP, products, competitors, or narratives change?
7. How do we prevent different documents and agents from slowly producing conflicting narratives?
8. What should be reusable global context versus task-specific agent instructions?
9. How should approvals, ownership, status, versioning, and review dates work?
10. Which existing skills should be adopted, adapted, merged, or rejected?
11. Are there better existing skill ecosystems or standards we should use instead?

# Drift prevention

Pay particular attention to governance.

Explore mechanisms such as:

- one canonical source per concept
- stable IDs for sales entities
- explicit references rather than copied text
- `draft / reviewed / approved / deprecated` states
- owner and last-reviewed metadata
- dependency relationships
- automated validation
- duplicate/conflicting-content detection
- review workflows through pull requests
- change-impact analysis
- generated indexes/catalogues
- tests or lint rules for the sales repository

A positioning change, for example, should make it possible to identify which narratives, battlecards, objections, use cases, plays, and agent skills may need review.

# Agent architecture

Evaluate a model where agents consume repository knowledge rather than becoming the source of truth themselves.

A possible starting point is:

```text
sales/
  knowledge/
  messaging/
  methodology/
  plays/
  templates/

.agents/
  skills/
```

Do not assume this structure is final. Challenge it and propose something better if appropriate.

Also evaluate whether standards such as Agent Skills, `SKILL.md`, `AGENTS.md`, MCP-related patterns, or other emerging agent conventions should influence the design.

# Core entities to evaluate

At minimum consider:

```text
company
product
ICP
persona
buying-role
pain-point
value-driver
use-case
narrative
positioning
differentiator
proof-point
customer-story
competitor
objection
discovery-question
qualification-criterion
sales-play
```

Determine which should be standalone entities and which should remain embedded in broader documents.

# Deliverables

Do not implement the repository yet.

Produce an evaluation containing:

- recommended architecture
- 2–3 viable alternative architectures and their trade-offs
- recommended external repositories and skills to reuse
- additional skills/repositories discovered during research
- explanation of what should be adopted, adapted, merged, or rejected
- proposed canonical entity model
- proposed metadata conventions
- governance and drift-prevention model
- proposed change/review workflow
- risks and likely failure modes
- open design decisions to resolve before implementation
- a small illustrative example showing how one concept, such as an ICP or competitor, flows through knowledge → messaging → play → agent skill

Codex should make independent architectural recommendations based on the evidence rather than optimizing around the initial proposal.

Prefer simplicity over creating a large framework prematurely.

The target is an internal, practical sales operating repository that can evolve over years and later support increasingly autonomous agents without losing control over approved sales knowledge.