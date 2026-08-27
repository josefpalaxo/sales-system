---
name: circularo-slides
description: Create, revise, and quality-check professional Circularo PowerPoint or Google Slides presentations. Use for Circularo-branded decks, internal strategy presentations, sales or product decks, slide templates, branded presentation systems, or any request that mentions Circularo slide design, Spartan headings, Mulish body text, Circularo logos, or Circularo presentation standards.
---

# Circularo Slides

Create clear, high-trust Circularo presentations from the bundled design system. Treat brand consistency and projection readability as hard requirements.

## Required companion skill

Use the `presentations` skill for PPTX authoring, rendering, inspection, and overflow testing. Follow its artifact-tool workflow and citation rules. For native Google Slides, follow its Google Slides routing.

## Read before authoring

Read [references/brand-system.md](references/brand-system.md) for visual tokens, typography, logo rules, and layout patterns. Read [references/production-workflow.md](references/production-workflow.md) for the build and QA sequence. When working in the Circularo sales repository, also read [references/repository-storage.md](references/repository-storage.md) before choosing an output path or filename.

Use bundled resources instead of recreating them:

- `assets/fonts/` — Spartan Bold, Mulish Regular, and Mulish Bold.
- `assets/logos/` — authentic Circularo symbol and logotype variants.
- `assets/icons/` — approved Circularo and Sovereign icon families.
- `assets/templates/circularo-slide-system-specimen.pptx` — reference specimen.
- `scripts/circularo-slide-system.mjs` — reusable artifact-tool helpers and tokens.

Behavior and routing examples are maintained in `evals/fixtures.yaml`; update them when storage, naming, or production behavior changes.

## Core workflow

1. Establish the audience, purpose, decision, and central takeaway.
2. Read all user-provided source documents before outlining.
3. Draft a slide-by-slide Markdown outline when the user wants content approval before design.
4. Choose a narrative arc and assign one job and one claim to each slide.
5. Build with `@oai/artifact-tool`; use the bundled helper instead of reimplementing chrome and typography.
6. Use Spartan Bold for headings and Mulish for all supporting text.
7. Use only authentic bundled Circularo logos and icons.
8. Render every slide, inspect each at full size, run overflow tests, and review a montage for consistency.
9. Put temporary builds under the repository's single `work/slides/<task>/` tree. Promote a durable deck only to the governed topic path defined in the repository storage rules.

## Non-negotiable logo rule

Use the bundled background-matched `*-slide.png` symbol for standard slide chrome. These slide-ready assets remove alpha-channel dependence: the light variant uses an exact white field and the dark variant uses exact Circularo dark blue. Do not use the SVG or original transparent PNG symbol in exported PPTX/Google Slides chrome because renderer differences can produce white squares or missing images.

Place the symbol in the same compact 40×40 px frame at `(48, 24)` on every 1280×720 slide. Preserve aspect ratio. Place the mini-title or eyebrow at `(104, 31)` so it aligns optically with the symbol. Start normal slide titles at `y=96`; reserve larger offsets only when a deliberate cover or chapter composition requires them. The visible mark must never be smaller than 20 px. Use the blue-on-white slide asset on light backgrounds and the white-on-dark-blue slide asset on dark backgrounds.

## Typography guardrails

- Deck title: Spartan Bold, normally 64–72 px.
- Slide title: Spartan Bold, normally 48 px.
- Section title: Spartan Bold, normally 32 px.
- Body: Mulish Regular, normally 22 px; never below 21.33 px / 16 pt to make copy fit.
- Labels and notes: Mulish; keep them readable in a meeting room.

Shorten copy, change layout, or split a slide before reducing type.

## Output quality

Reject the deck until all of these are true:

- Every logo is visible without an opaque square or halo.
- Every slide uses the same logo frame and position.
- Headings resolve to Spartan and body text resolves to Mulish.
- No unintended overlap, clipping, overflow, or unresolved placeholder remains.
- Adjacent slides vary their silhouette while retaining one coherent system.
- The deck is readable at normal presentation scale, not only when zoomed in.
