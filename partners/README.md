---
schema_version: 1
id: partner-workspace:index
kind: workspace-index
domain: partnerships
title: Partner workspace
status: draft
classification: internal
owner: null
updated: 2026-10-02
---

# Partner workspace

Manage each partner relationship in one folder within the sales-system repository. Start with the partner profile; it owns partner type, geography and relationship metadata. Other documents reference that profile instead of maintaining duplicate values.

| Partner | Profile | Strategy | Communication | Activity | Materials |
| --- | --- | --- | --- | --- | --- |
| PromaSecure | [Profile and status](promasecure/README.md) | [Strategy](promasecure/strategy.md) | [Communication plan](promasecure/communication.md) | [Activity](promasecure/activity.md) | [Partnership brief](promasecure/content/partnership-brief.md) |

## Market-entry research and outreach

The local [Australia and US partner research package](market-entry-aus/README.md) covers 29 prospective organisations, their fit, synergies, qualification risks and LinkedIn profiles. It also contains [all 15 Australian LinkedIn introduction drafts](market-entry-aus/australian-partner-linkedin-introductions.md), [recommendations](market-entry-aus/market-entry-partner-summary.md) and [observations and lessons](market-entry-aus/market-entry-partner-research-log.md). Contact and research artifacts remain ignored by Git; preparation does not establish an active partnership or approve sending.

The [TechnologyOne prospect profile](market-entry-aus/technologyone/README.md) owns its partner metadata and links the detailed assessment. Investor research remains in the separate [investor workspace](../investors/outreach/README.md).

## Folder structure

```text
partners/
├── README.md
├── AGENTS.md
├── GOVERNANCE.md
└── <partner-slug>/
    ├── README.md          # Profile, type, geography, relationship stage and next action
    ├── strategy.md        # Rationale, objectives, cooperation models and open questions
    ├── communication.md   # Audiences, messages, channels and planned follow-up
    ├── activity.md        # Dated, permitted summaries, decisions and actions
    └── content/           # Authored briefs, proposals and presentations
```

Use lowercase hyphenated partner slugs and stable filenames. Add files only when they contain useful content. Every Markdown file requires YAML frontmatter, including README and instruction files. See [metadata and handling rules](GOVERNANCE.md).

Reusable partner programs, templates and playbooks belong in [the partnerships domain](../domains/partnerships/README.md). Cross-domain facts remain under [shared knowledge](../shared/README.md). Do not initialize a Git repository inside this folder.
