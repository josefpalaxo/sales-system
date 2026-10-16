# Circularo Investor Repository — Initial Setup Brief

## 1. Objective

Create a clean, maintainable repository for all Circularo investor-related work.

The repository must serve two purposes:

1. Maintain a **single authoritative source of truth** for Circularo investor information.
2. Maintain a dedicated workspace for **each individual investor / strategic partner opportunity**.

The repository should make it easy for AI agents and humans to create investor decks, teasers, briefs, valuation materials, meeting preparation, follow-ups and due-diligence responses without repeatedly reconstructing Circularo's story or introducing inconsistent facts.

This is not primarily a conventional VC fundraising repository.

Circularo is currently focused on identifying a **strategic shareholder / partner** capable of materially accelerating the company's growth, particularly through GCC market access, sovereign/shared-service opportunities, enterprise distribution and international expansion.

---

# 2. Core Principle

There must be a strict distinction between:

### Common Circularo facts

Authoritative company information that should remain consistent regardless of investor.

Examples:

- company description
- financial metrics
- ARR
- customers
- deployments
- product architecture
- market positioning
- strategic vision
- competitive differentiation
- sovereign/shared-service references
- roadmap
- strategic transaction parameters

These belong under `/master`.

### Investor-specific information

Information that changes depending on who Circularo is speaking with.

Examples:

- investor profile
- strategic rationale
- companies/assets controlled by investor
- potential Circularo synergies
- introductions and contacts
- meeting notes
- investor-specific valuation logic
- investor-specific revenue opportunities
- tailored pitch/deck
- correspondence
- questions and objections
- next actions

These belong under `/investors/<investor-name>`.

**Never duplicate authoritative Circularo facts inside investor folders unless required in a generated deliverable. Investor-specific analysis should reference the master.**

---

# 3. Proposed Repository Structure

```text
investors/
│
├── README.md
├── AGENTS.md
│
├── master/
│   ├── README.md
│   ├── investor-materials-master.md
│   │
│   ├── company/
│   │   ├── company-snapshot.md
│   │   ├── company-history.md
│   │   ├── founders-and-team.md
│   │   └── ownership-and-funding-history.md
│   │
│   ├── business/
│   │   ├── business-model.md
│   │   ├── products-and-deployment-models.md
│   │   ├── go-to-market.md
│   │   └── pricing-and-commercial-model.md
│   │
│   ├── strategy/
│   │   ├── strategic-vision.md
│   │   ├── investment-thesis.md
│   │   ├── growth-strategy.md
│   │   ├── sovereign-shared-services.md
│   │   └── strategic-partnership-thesis.md
│   │
│   ├── product/
│   │   ├── product-positioning.md
│   │   ├── product-roadmap.md
│   │   ├── next-generation-architecture.md
│   │   ├── edoc.md
│   │   ├── trusted-records.md
│   │   └── agentic-trusted-execution.md
│   │
│   ├── traction/
│   │   ├── key-metrics.md
│   │   ├── customers.md
│   │   ├── sovereign-deployments.md
│   │   ├── strategic-partnerships.md
│   │   └── case-studies.md
│   │
│   ├── financials/
│   │   ├── historical-financials.md
│   │   ├── arr-analysis.md
│   │   ├── revenue-quality.md
│   │   ├── forecasts.md
│   │   └── valuation-context.md
│   │
│   ├── market/
│   │   ├── market-opportunity.md
│   │   ├── gcc-opportunity.md
│   │   ├── competitive-landscape.md
│   │   └── industry-trends.md
│   │
│   ├── transaction/
│   │   ├── strategic-investment-opportunity.md
│   │   ├── transaction-structure.md
│   │   ├── use-of-strategic-partner.md
│   │   └── long-term-exit-and-ipo.md
│   │
│   └── risks/
│       ├── investor-questions.md
│       ├── risks-and-mitigation.md
│       └── due-diligence-issues.md
│
├── materials/
│   ├── teaser/
│   ├── pitch-deck/
│   ├── one-pager/
│   ├── investment-memo/
│   ├── talking-points/
│   ├── faq/
│   └── data-room-index/
│
├── investors/
│   ├── _template/
│   │   ├── README.md
│   │   ├── investor-profile.md
│   │   ├── strategic-fit.md
│   │   ├── opportunity-map.md
│   │   ├── contacts.md
│   │   ├── interaction-log.md
│   │   ├── meeting-prep.md
│   │   ├── questions-and-objections.md
│   │   ├── next-actions.md
│   │   ├── research/
│   │   ├── meetings/
│   │   ├── correspondence/
│   │   ├── analysis/
│   │   └── deliverables/
│   │
│   └── <investor-name>/
│
├── research/
│   ├── market/
│   ├── competitors/
│   ├── transactions/
│   ├── valuation/
│   └── strategic-investors/
│
├── sources/
│   ├── internal/
│   ├── external/
│   └── archive/
│
└── archive/
```

---

# 4. Investor Materials Master

Create:

`/master/investor-materials-master.md`

This should be the **executive index and canonical investor context for Circularo**.

It should not become a 100-page document.

Instead, it should contain the most important current facts and point to detailed master files.

Structure it as follows.

## Company Snapshot

Maintain:

- Company: Circularo
- HQ
- founding history
- founders
- ownership
- funding history
- concise description
- one-line investor positioning

## Business Model & Products

Cover:

- SaaS
- Ultimate / self-hosted
- sovereign/private cloud
- multi-tenant Shared Services
- API / embedded model
- recurring revenue model
- key commercial characteristics

## Market Opportunity

Cover:

- GCC
- UAE
- KSA
- government
- regulated enterprise
- shared services
- digital trust
- trusted records
- AI/agentic execution opportunity

Separate externally verified market data from internal estimates.

## Traction & Metrics

Maintain the latest authoritative values for:

- ARR
- revenue
- YoY growth
- EBITDA
- gross margin
- NRR
- churn
- customer count
- SaaS ARR
- on-prem ARR
- Shared Services ARR
- geographic revenue concentration
- pipeline where appropriate

Every metric should include:

**Value | period/date | source | status**

Example:

`ARR | USD X | Dec 2025 | management accounts | CONFIRMED`

Never silently replace one reporting period with another.

## Strategic Deployments

Maintain the key proof points separately.

Examples include:

- TDRA / GovSign
- Digital Dubai / DigitalSign
- Sharjah / Sharjah Sign
- e& / DigiSign
- TCC / Mokham
- ICD
- EDGE
- RTA
- Emaar
- other strategically important references

For each maintain:

- relationship
- deployment
- scale
- strategic significance
- commercially safe claims
- supporting source

## Competitive Position

Explain Circularo relative to:

- DocuSign
- Adobe Acrobat Sign
- regional providers
- other relevant digital agreement/trust platforms

Focus particularly on:

- sovereign deployment
- self-hosting
- multi-tenancy
- Arabic/RTL
- national identity
- UAE/KSA regulatory adaptation
- API/integration
- evidence
- trusted records
- shared services
- strategic partner distribution

## Product & Technology Evolution

Investor materials should communicate the evolution:

**Digital Signatures  
→ Digital Trust  
→ Trusted Execution  
→ Trusted Records / Institutional Evidence  
→ Agentic Trusted Execution**

Capture the emerging architecture around:

- eDoc
- trusted records
- authority
- organizational context
- trusted execution
- AI interaction/orchestration
- agentic execution

Clearly distinguish:

**LIVE / PRODUCTION**

from

**ROADMAP**

from

**LONG-TERM VISION**

Do not present future architecture as current production capability.

## Financials

Maintain authoritative historical and forecast financial data.

Separate:

- actual
- contracted
- pipeline
- management forecast
- scenario
- strategic upside

Never mix these categories.

## Strategic Investment Opportunity

Current strategic proposition should be maintained centrally.

Capture:

- type of investor sought
- rationale
- strategic contribution expected
- proposed ownership range
- indicative transaction value
- primary vs secondary transaction
- founders' objectives
- expected growth contribution
- potential future rounds
- long-term IPO ambition

This file is authoritative for all investor-specific materials.

---

# 5. Strategic Investor Thesis

Create a dedicated:

`/master/strategy/strategic-partnership-thesis.md`

The central idea should be:

Circularo is not primarily looking for passive financial capital.

Circularo wants a strategic shareholder capable of accelerating the company's next stage through distribution, market access, sovereign opportunities, enterprise relationships and international expansion.

Investor analysis should therefore evaluate more than financial capacity.

For each potential investor consider:

- strategic fit
- UAE/GCC influence
- enterprise distribution
- government relationships
- technology ecosystem
- portfolio companies
- ability to generate Circularo revenue
- international reach
- potential sovereign/shared-service opportunities
- potential SaaS distribution
- ability to support future international expansion
- alignment with long-term IPO ambitions

Do not create an arbitrary numerical investor score unless specifically requested.

---

# 6. Investor-Specific Folder

Whenever a new investor becomes relevant:

Copy:

`/investors/_template/`

to:

`/investors/<normalized-investor-name>/`

Example:

```text
investors/
    eand/
    g42/
    mubadala/
    icd/
    <future-investor>/
```

Each investor folder should answer six questions:

### 1. Who are they?

`investor-profile.md`

### 2. Why could they care about Circularo?

`strategic-fit.md`

### 3. How could they materially accelerate Circularo?

`opportunity-map.md`

### 4. Who are we speaking with and what has happened?

`contacts.md`
`interaction-log.md`

### 5. What should we tell them?

`meeting-prep.md`
`deliverables/`

### 6. What happens next?

`next-actions.md`

---

# 7. Opportunity Map

This is particularly important for strategic investors.

For each investor create:

`opportunity-map.md`

Map concrete opportunities such as:

```text
Investor
   ↓
Owned companies / portfolio
   ↓
Potential Circularo deployment
   ↓
Distribution opportunities
   ↓
Government / sovereign opportunities
   ↓
International expansion
   ↓
Potential ARR impact
```

Where possible quantify opportunities.

However, clearly classify numbers as:

- existing revenue
- contracted
- qualified pipeline
- identified opportunity
- scenario
- speculative strategic upside

Never present a scenario as pipeline.

---

# 8. Interaction Log

Every investor should have:

`interaction-log.md`

Use chronological entries:

```markdown
## YYYY-MM-DD

### Participants

### Context

### What was discussed

### Investor reaction

### Questions raised

### Information requested

### Commitments made by Circularo

### Commitments made by investor

### Follow-up

### Status
```

This should become the persistent memory of the investor relationship.

---

# 9. Investor Deliverables

Investor-specific deliverables belong in:

`/investors/<investor>/deliverables/`

Examples:

```text
teaser.md
investment-brief.md
pitch-deck.md
meeting-talking-points.md
follow-up-email.md
valuation-analysis.md
strategic-opportunity.md
```

These can use master information but should be tailored to the investor.

Never modify the master solely to make an investor-specific narrative work.

---

# 10. Common Materials

`/materials/` contains the best current generic investor assets.

Maintain canonical versions of:

- investor teaser
- strategic investor deck
- investor one-pager
- investment thesis
- executive talking points
- investor FAQ
- data-room index

Investor-specific versions are derived from these but live in the investor folder.

---

# 11. Source Hierarchy

The repository must protect against stale or contradictory information.

Use the following hierarchy:

### Tier 1 — Authoritative current data

Management-confirmed numbers, current financial reports, signed agreements, current internal strategy.

### Tier 2 — Current master

Information already reconciled and accepted into `/master`.

### Tier 3 — Current internal supporting material

Product strategy, sales material, business strategy, customer documentation.

### Tier 4 — External verified sources

Company websites, government sources, market research, filings, credible research.

### Tier 5 — Historical Circularo materials

Old decks, teasers and investment briefs.

Historical material is useful for context but **must never override newer authoritative information**.

---

# 12. Fact Governance

Create a simple convention for important facts.

Use labels where useful:

`CONFIRMED`

`MANAGEMENT ESTIMATE`

`FORECAST`

`SCENARIO`

`PIPELINE`

`ROADMAP`

`VISION`

`HISTORICAL`

`NEEDS VERIFICATION`

Investor-facing materials should preferentially use CONFIRMED facts.

Any important contradiction should be surfaced rather than silently resolved.

---

# 13. Current Circularo Investor Narrative

Use the following as the starting strategic narrative.

Circularo started by solving secure digital signatures and document workflows.

That created deep expertise in:

- identity
- authority
- approvals
- digital signatures
- trusted workflows
- evidence
- records
- sovereign deployment

Circularo has subsequently become embedded in strategically important government, enterprise and shared-service environments in the GCC.

The company should therefore not be positioned merely as an eSignature SaaS vendor.

The emerging investor thesis is:

> Circularo is evolving into a digital trust and trusted execution platform built around identity, authority, verifiable workflows, institutional evidence and trusted records — providing foundations for secure human, system and eventually AI-agent transactions.

The investment story should connect:

```text
Profitable recurring business
        ↓
Enterprise + government customer base
        ↓
Sovereign / shared-service deployments
        ↓
Platform multiplication
        ↓
Digital Trust
        ↓
Trusted Records + Institutional Evidence
        ↓
Trusted Execution
        ↓
Agentic Trusted Execution
```

The future story must remain credible because it grows from capabilities and deployments Circularo already possesses.

Avoid presenting Circularo as an entirely new AI startup disconnected from its existing business.

---

# 14. Repository README

Create a concise root `README.md` explaining:

- purpose of repository
- repository structure
- master vs investor-specific content
- where authoritative facts live
- how to create a new investor workspace
- how to update company facts
- how investor deliverables should be generated

---

# 15. AGENTS.md

Create `AGENTS.md` containing instructions for Codex/AI agents.

Key rules:

1. Read `/master/investor-materials-master.md` before preparing investor materials.
2. Read the relevant investor folder before preparing investor-specific work.
3. Prefer current master facts over historical source documents.
4. Never invent financial or customer metrics.
5. Never silently reconcile conflicting figures.
6. Clearly distinguish actuals, pipeline, forecasts and scenarios.
7. Clearly distinguish current product capabilities from roadmap and vision.
8. Preserve confidentiality.
9. Update the master when management provides a newer authoritative fact.
10. Do not update common facts based solely on investor-specific assumptions.
11. Keep investor-specific research out of the master unless it becomes generally relevant.
12. Prefer concise executive/investor language over marketing language.
13. Preserve evidence/source references for material claims.

---

# 16. Initial Setup Task

For the first implementation:

1. Create the complete repository/folder structure.
2. Create `README.md`.
3. Create `AGENTS.md`.
4. Create all proposed master Markdown files with headings/placeholders.
5. Create `/investors/_template/`.
6. Create the first version of `investor-materials-master.md`.
7. Populate it only from authoritative information available in the repository.
8. Identify conflicting/stale information rather than guessing.
9. Create:

`/master/data-quality-and-open-questions.md`

with:

- conflicting metrics
- outdated information
- missing information
- facts requiring management confirmation
- market claims requiring external verification

10. Do not yet create polished investor decks.

The first objective is to establish a **clean investor knowledge architecture and authoritative source of truth** from which all future materials can be generated consistently.