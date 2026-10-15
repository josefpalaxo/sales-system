---
name: markdown-html-pack
description: Convert selected Markdown files or recursive folders into one offline HTML reader with static Mermaid diagrams, navigation, search, exact source downloads and print styling. Use for browsable document packs, not website implementation or publishing.
---

# Markdown HTML Pack

Use the bundled [generator](scripts/build.py) and [template](assets/template.html) rather than duplicating a renderer in each working folder. Python 3.10+ and local Pandoc are required. Mermaid additionally needs Node.js 22+, Chrome/Chromium, and the skill's pinned npm dependencies. The resulting HTML needs no build tools, server, or Mermaid runtime.

This repository-local skill is maintained with the sales-system tooling. It contains no Circularo product or commercial facts. It can render other repositories without applying Circularo branding.

## Local dependency setup

Install once, or after a lockfile change, from the repository root:

```bash
rtk proxy npm ci --prefix .agents/skills/markdown-html-pack --ignore-scripts --no-audit --no-fund
```

The [manifest](package.json) and [lockfile](package-lock.json) pin Mermaid and Puppeteer Core in this skill's ignored `node_modules/`. No browser is downloaded. The renderer uses installed Chrome on macOS or Chrome/Chromium on Linux; for another location set `MARKDOWN_HTML_PACK_CHROME` to its executable. Keep the browser sandbox enabled. If the agent execution sandbox blocks Chrome, request the normal tool escalation for this local render; do not disable browser security. Never use another project's dependencies or install a global copy of the skill.

## Build

Inventory the requested Markdown inputs, check local agent instructions, and carry forward the user's exclusions. For governed inputs, check their status, review date, classification, evidence and conflicts before selecting them for the intended audience. Rendering preserves source metadata; it does not establish that a claim is current, canonical or approved for sharing.

From the sales-system repository root:

```bash
rtk proxy python3 .agents/skills/markdown-html-pack/scripts/build.py /absolute/path/to/folder --output /absolute/path/to/reader.html --title "Document pack" --exclude "private/**"
```

Pass multiple folders or individual Markdown files as positional inputs. Folder discovery is recursive; dependency, build and VCS directories are skipped. Exclusions and optional `--include` patterns match paths relative to each input folder. Individual file inputs are relative to their parent. The skill is discoverable in this repository and its subfolders as `$markdown-html-pack`; use the absolute generator path when the working directory is elsewhere. In this repository, situational output belongs under `work/`.

For a recurring pack, save a JSON config beside its source files and pass `--config /absolute/path/to/reader-config.json`. CLI values override presentation settings. Config fields:

- `title`, `brand`, `subtitle`: plain text; branding defaults to neutral.
- `edition`: plain text appended to the document count.
- `navigation`: `folders` mirrors the selected sources' real folder hierarchy; `groups` uses the curated group labels below. Defaults to folders unless groups are configured. Set `navigation: "folders"` to retain a configured document inventory/order while browsing by real folders.
- `footer`: plain text for audience/review instructions.
- `notes`: a list of plain-text paragraphs under “About this edition”.
- `include`, `exclude`: lists of glob patterns; combined with CLI patterns.
- `groups`: ordered objects with `label` and `documents`. Each document has a relative `path`, optional `label`, `description`, and `id`. A configured list must cover exactly the selected files; the build fails if new files are unaccounted for. Relative paths must be unique across inputs when using groups.

Without groups, documents are sorted by relative path, with README first. Navigation uses collapsible folders with larger labels and native keyboard controls. Root files live under the input folder, nested folders retain their hierarchy, and excluded/empty folders are absent. Curated groups are also collapsible. Only the initial document's ancestors start expanded; opening a document from search, a cross-link or a direct fragment expands its ancestors without closing other folders. Document titles remain readable; link tooltips show relative filenames. A label comes from the source's YAML title, first heading, or filename. Status, classification, evidence state and review date are displayed as supplied; missing metadata is not invented. Original UTF-8 Markdown, including frontmatter, is embedded for download. This means hidden frontmatter is also shared—check it along with the visible body.

## Mermaid diagrams

Fenced `mermaid` blocks become embedded static SVG images at build time. Flowcharts (`flowchart`/`graph`, TB/TD/BT/LR/RL) and sequence diagrams are supported. Quoted flowchart `\n` labels are rendered as line breaks; source downloads retain the original bytes. Each diagram has a caption from its surrounding heading, text alternatives from SVG labels and Mermaid `accTitle`/`accDescr`, and an inspect/copy source disclosure. Large diagrams scroll horizontally in a keyboard-focusable region on narrow screens and fit the print page. Use `accDescr` when the relationships need a richer accessible explanation; do not invent or change source claims to improve a caption.

For a predictable secure subset, reject configuration directives/frontmatter, HTML labels and entities (including HTML line breaks), URLs, clickable links/callbacks, custom `style`/`classDef`, extended `@{...}` shapes, images/icons, and other diagram types. Ordinary shapes, subgraphs, arrows, labels, and sequence messages are supported. The checks are deliberately conservative and can reject these reserved words in plain labels; rephrase only with user authorization. No source directives or configuration are accepted. At most 100 diagrams per pack, 50,000 characters and 500 edges per diagram are allowed. The offline browser blocks requests; output SVG is checked for static elements/local references and embedded in inert image contexts with isolated IDs. No remote assets are fetched.

An unsupported or invalid diagram fails the entire build with its source path, diagram number, and source line where available. The previous output is preserved; never suppress the error and present an incomplete replacement. [scripts/diagrams.py](scripts/diagrams.py) defines these constraints and [scripts/render-mermaid.mjs](scripts/render-mermaid.mjs) runs the local renderer.

## Output and verification

The reader embeds its styles and JavaScript. When a brand is configured, its wordmark is a keyboard-accessible home link to the output HTML filename, without a document fragment. Opening it restores the initial document and clears search/read-all state. The relative link keeps the reader portable. It rewrites links between included Markdown files and headings; omitted or unresolved local references remain visibly marked. Local PNG, JPEG, GIF and WebP images within input scope are embedded unless excluded. Remote or unsupported images are marked, without fetching them. Source HTML and unsafe URL schemes do not execute. External web links need a connection.

An existing output produced by this generator is refreshed atomically in place. An unrelated existing file requires `--force`; inspect it before deciding to overwrite. Source Markdown is never edited. Preserve confidentiality markings, draft status, evidence qualifications, and open conflicts in the output; use title/subtitle/edition/footer notes for pack-wide qualifications where sources lack frontmatter. Conversion does not authorize publication, sending, committing, pushing, or changes to governed records.

After a build, open the file and check folder expansion/collapse with mouse and keyboard, the active document's ancestors after search/direct-fragment navigation, the wordmark's return home from another document or search (including keyboard activation), a cross-document link, search, a source download, narrow-screen layout, and print view. The output must work without network access. Report any omitted assets or references, and give the user a clickable absolute output path. For generator changes, run the executable checks and review routing fixtures:

```bash
rtk proxy python3 .agents/skills/markdown-html-pack/evals/test_build.py
```

For skill metadata validation, run the installed skill-creator's `scripts/quick_validate.py` with PyYAML available. On this Mac the isolated command is `rtk proxy uv run --no-project --with PyYAML==6.0.3 python /Users/josefneumann/.codex/skills/.system/skill-creator/scripts/quick_validate.py .agents/skills/markdown-html-pack`.

Routing and behavior cases are maintained in [evals/fixtures.yaml](evals/fixtures.yaml). Keep per-project labels, ordering and review notes in the project's config, not in this skill.
