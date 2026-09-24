# M-Capital analysis project

Internal, non-canonical working project for Circularo's investor customer revenue, retention and annual forecast analysis. Git inclusion is not approval for external disclosure or certification of the analysis.

## Git boundary

The local [.gitignore](.gitignore) is an explicit, default-deny allowlist. It preserves original files without sanitizing, rewriting or duplicating them. Documents may contain internal financial context and identifiers; treat the repository accordingly and review before external sharing.

Included: the existing root-level project Markdown documents, individually listed Python/JavaScript source scripts, SQL definitions and the SQL object inventory. No dependency manifest currently exists in this project. A future manifest or source file must be reviewed and explicitly added to the allowlist.

Excluded: `node_modules/`, `previews/`, `outputs/`, `sample-data/`, all `evidence/`, root evidence JSON, caches, temporary files, logs, credentials and local connection configuration. The detailed issue register stays in local `evidence/issue-register.md`; no sanitized copy has been created. New files remain ignored even inside the source directories unless explicitly listed. Never bypass this boundary with `git add -f`.

`scripts/warehouse.py` remains local because it contains machine-specific connection configuration. The other warehouse scripts import that adapter. A fresh checkout therefore is source documentation/code, not a self-contained runnable analysis: it also needs the approved local adapter, authorized credentials outside Git, the appropriate runtimes/libraries and the separately retained evidence/input datasets. Do not copy secrets or customer extracts into tracked files to make a checkout runnable.

## Original analysis instructions and reproduction

Read [AGENTS.md](AGENTS.md), [TASK.md](TASK.md), [analysis-decisions.md](analysis-decisions.md), [execution-plan.md](execution-plan.md), [data-semantics.md](data-semantics.md) and [codex-odoo-data-brief.md](codex-odoo-data-brief.md). Their original wording and issued-release hashes are preserved. References to local-only evidence are intentional and will not resolve in a source-only checkout.

The repository-root governance now permits this source-only Git exception; it supersedes older blanket statements about ignoring working material. Existing prohibitions on production changes, raw-data commits and external publication still apply. Root governance/ignore changes for this exception are explicitly authorized; routine analysis outputs remain confined to this folder.

Keep frozen source evidence and issued workbooks in the approved restricted storage independently of Git. Git is not a backup of the complete analysis. Do not overwrite issued artifacts or frozen dependencies; substantive analytical changes require a new versioned run and reconciliation.

## Check before staging

From the repository root:

```sh
rtk proxy git status --short --untracked-files=all -- work/m-capital
rtk proxy git check-ignore -v work/m-capital/node_modules work/m-capital/previews/example.png work/m-capital/outputs/example.xlsx work/m-capital/evidence/example.json work/m-capital/.env
rtk proxy git diff --cached --stat
```

Review the exact staged paths and content before committing. Ignore rules do not remove files already tracked; this project had no tracked files when the boundary was introduced. Do not commit or push automatically.
