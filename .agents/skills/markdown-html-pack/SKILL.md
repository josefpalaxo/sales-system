---
name: markdown-html-pack
description: Convert Markdown files or folders into a single self-contained offline HTML reader with navigation, search, source downloads and print styling. Use for browsable document packs, not website implementation or publishing.
---

# Markdown HTML Pack

Use the bundled [generator](scripts/build.py) and [template](assets/template.html) rather than duplicating a renderer in each working folder. Python 3 and local Pandoc are required; the resulting HTML needs neither.

This repository-local skill is maintained with the sales-system tooling. It contains no Circularo product or commercial facts. It can render other repositories without applying Circularo branding.

## Build

Inventory the requested Markdown inputs, check local agent instructions, and carry forward the user's exclusions. For governed inputs, check their status, review date, classification, evidence and conflicts before selecting them for the intended audience. Rendering preserves source metadata; it does not establish that a claim is current, canonical or approved for sharing.

From the sales-system repository root:

```bash
rtk proxy python3 .agents/skills/markdown-html-pack/scripts/build.py /absolute/path/to/folder --output /absolute/path/to/reader.html --title "Document pack" --exclude "private/**"
```

Pass multiple folders or individual Markdown files as positional inputs. Folder discovery is recursive; dependency, build and VCS directories are skipped. Exclusions and optional `--include` patterns match paths relative to each input folder. Individual file inputs are relative to their parent. Use absolute paths when operating from another repository. In this repository, situational output belongs under `work/`.

For a recurring pack, save a JSON config beside its source files and pass `--config /absolute/path/to/reader-config.json`. CLI values override presentation settings. Config fields:

- `title`, `brand`, `subtitle`: plain text; branding defaults to neutral.
- `edition`: plain text appended to the document count.
- `footer`: plain text for audience/review instructions.
- `notes`: a list of plain-text paragraphs under “About this edition”.
- `include`, `exclude`: lists of glob patterns; combined with CLI patterns.
- `groups`: ordered objects with `label` and `documents`. Each document has a relative `path`, optional `label`, `description`, and `id`. A configured list must cover exactly the selected files; the build fails if new files are unaccounted for. Relative paths must be unique across inputs when using groups.

Without groups, documents are sorted by relative path, with README first. A label comes from the source's YAML title, first heading, or filename. Status, classification, evidence state and review date are displayed as supplied; missing metadata is not invented. Original UTF-8 Markdown, including frontmatter, is embedded for download. This means hidden frontmatter is also shared—check it along with the visible body.

## Output and verification

The reader embeds its styles and JavaScript. It rewrites links between included Markdown files and headings; omitted or unresolved local references remain visibly marked. Local PNG, JPEG, GIF and WebP images within input scope are embedded unless excluded. Remote or unsupported images are marked, without fetching them. Source HTML and unsafe URL schemes do not execute. External web links need a connection.

An existing output produced by this generator is refreshed in place. An unrelated existing file requires `--force`; inspect it before deciding to overwrite. Source Markdown is never edited. Conversion does not publish, send, commit or modify governed records.

After a build, open the file and check navigation, a cross-document link, search, a source download, narrow-screen layout, and print view. The output must work without network access. Report any omitted assets or references, and give the user a clickable absolute output path. For generator changes, run the executable checks and review routing fixtures:

```bash
rtk proxy python3 .agents/skills/markdown-html-pack/evals/test_build.py
```

Routing and behavior cases are maintained in [evals/fixtures.yaml](evals/fixtures.yaml). Keep per-project labels, ordering and review notes in the project's config, not in this skill.
