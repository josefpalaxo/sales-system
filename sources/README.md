# Sources

One home for source descriptions, original inputs and historical snapshots. Start here when checking where reusable material came from.

| Source | Description and scope | Preserved input |
| --- | --- | --- |
| `source:commercial-model-2026` | [Commercial Model source](commercial/commercial-model-2026.source.md) | [Historical model](<commercial/snapshots/Circularo Commercial Model.md>) |
| `source:add-on-model-2026` | [Add-On Model source](commercial/add-on-model-2026.source.md) | [Historical model](<commercial/snapshots/Circularo Add-On Model and How it Works.md>) |
| `source:sales-repo-canonical` | [Imported sales library](commercial/sales-repo-canonical.source.md) | Original external location and import inventory are recorded in its description |
| `source:repository-architecture-brief` | [Repository architecture source](repository/repository-architecture-brief.source.md) | [Original brief](repository/snapshots/repository-architecture-brief.md) |
| `source:circularo-narrative-working-set` | [Narrative working sources](messaging/circularo-narrative.source.md) | [Original narratives and evolution notes](messaging/circularo-narrative/README.md) |
| `source:unified-trust-api-working-pack` | [API working sources](api/unified-trust-api/unified-trust-api.source.md) | [Specification](api/unified-trust-api/unified-trust-api.json) and [changelog](<api/unified-trust-api/26.1.0 - API Changelog.md>) |
| `source:investor-workspace-mandate` | [Investor setup mandate](investor-context/investor-workspace-mandate.source.md) | [Original brief and historical inspection](investor-context/README.md) |

The [competitive-research request](competitive-analysis/task.md) is retained as original working context. The complete machine-readable record index is [generated/catalog.json](../generated/catalog.json).

## Maintain a source

Use a descriptive `<name>.source.md` file beside the relevant inputs or external references. Preserve its stable ID, source location, scope, authority, owner, status, classification and review metadata. A source can point to a durable business-system URL; copying the original is optional and subject to handling restrictions.

Keep original files unchanged. Use `snapshots/` or `originals/` for preserved editions; these files never become active catalogue records, even if they contain copied metadata. Do not maintain a second source register within a business topic or under `governance/`.

Source evidence and maintained knowledge have separate jobs: current sales material belongs in `shared/`; descriptions here explain what its evidence supports. Approval of a source record does not approve every claim or a new use. Preserve reporting dates, uncertainty, open conflicts and confidentiality. Reviewed or draft sources remain qualified; snapshots never override current approved definitions.

Keep credentials, raw CRM exports and personal/customer material in approved systems or existing permitted local storage. After source-record changes, run `rtk make catalog` and `rtk make validate`.
