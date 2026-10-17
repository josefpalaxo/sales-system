# Circularo Slides Skill Audit

**Date:** 9 September 2026  
**Scope:** Read-only comparison of the current Circularo Slides skill, its PPTX generation approach, and the referenced Figma presentation designs.  
**Canonical Figma reference:** [Graphic Design & Sales Material, node 11426:3154](https://www.figma.com/design/u6EZyJ6uPmwiIkJEi5JSzj/Graphic-Design---Sales-Material?node-id=11426-3154&p=f&t=mSiktadLvhKCGJHV-0)

> The user designated node `11426:3154` as canonical after the initial audit. Earlier visual measurements were preliminary observations from the broader file and must be revalidated against this canonical node before implementation.

## Executive conclusion

The current approach is a good foundation, but it should be redesigned if the goal is precise Figma fidelity and repeatable editable PPTX output.

Keep the governance, asset bundling, `@oai/artifact-tool` generation, and quality-assurance workflow. Replace the current generic specimen and hard-coded slide chrome with a curated Figma-derived master and layout library, supported by a machine-readable layout manifest and practical structural and visual checks.

## What is already good

The following elements should be retained:

- `@oai/artifact-tool` for editable PowerPoint generation.
- Bundled Spartan and Mulish fonts, logos, and icons.
- Rendering, overflow testing, montage review, and visual inspection.
- Repository governance and stable deck paths.
- The reusable JavaScript helper concept.
- Native editable text, tables, charts, and diagrams.

These foundations are documented in the current Circularo Slides skill and its production workflow.

## Why the current implementation needs to change

The current system is a code-defined interpretation of Circularo branding rather than a precise implementation of the referenced Figma slides.

| Area | Current skill | Figma reference |
|---|---|---|
| Design canvas | 1280×720 | Preliminary observations showed primarily 1920×1080; confirm against the canonical node |
| Standard logo | 40×40 symbol at `(48,24)` | Preliminary observations showed a full logotype; confirm exact treatment against the canonical node |
| Footer | Generated page number and signature line | Preliminary observations showed a different footer treatment; confirm against the canonical node |
| Layout system | Informal list of slide patterns | Concrete compositions and artwork |
| PPTX structure | One master and one generic layout | Should contain named reusable PowerPoint layouts |
| Testing | Routing and storage fixtures | Needs brand-rule, layout, overflow, and rendered-slide checks |

The current brand-system reference mandates fixed chrome that differed from the initially inspected Figma frames. Confirm the final replacement rules against canonical node `11426:3154` before implementation.

### PPTX package findings

- The specimen contains 10 slides but only one master and one layout.
- Both existing governed decks also contain only one master and one layout.
- Fonts are referenced as Spartan and Mulish but are not embedded in the PPTX packages.
- The specimen is an example deck, not a genuine PowerPoint template library.
- Consistency therefore depends on the agent reconstructing every slide correctly.

### Figma source findings

The broader Figma file needs curation. An initially inspected `Circularo Presentation` group mixed slides, icons, components, and imagery, and included inconsistent frame dimensions. These observations are not a substitute for inspecting canonical node `11426:3154`. Converting the whole file without a curated canonical scope would preserve historical inconsistencies rather than establish a controlled presentation system.

## Recommended architecture

### 1. Make Figma the visual source of truth

Maintain a curated list of approved Figma frame IDs. Normalize approved slide frames to 1920×1080. Do not treat every historical deck or loose component on the page as canonical.

### 2. Build a real editable PPTX template

Create a `.pptx` or `.potx` containing named masters and layouts such as:

- Cover
- Section divider
- Title and body
- Title with right image
- Full-bleed image
- Statement
- Two-column comparison
- Process
- Map
- Architecture or diagram
- Closing slide

Each layout should contain properly named editable placeholders rather than only finished sample slides.

### 3. Maintain a machine-readable layout manifest

Each layout definition should include:

- Figma frame ID
- PowerPoint layout name
- Exact geometry
- Allowed content slots
- Typography and color tokens
- Logo and footer variant
- Required image aspect ratio
- Maximum text lengths
- Overflow fallback behavior
- RTL support where applicable

### 4. Generate with the template plus code

The agent should select a named layout, duplicate it, fill its placeholders, and add editable evidence objects. The JavaScript helper should provide tokens, asset loading, content fitting, charts, tables, and validation. It should not invent the basic slide composition for every new deck.

Approved brand chrome and layout geometry should be allowed as native PowerPoint shapes. Illustrative or decorative artwork should remain sourced imagery or approved brand assets rather than improvised programmatic drawings.

### 5. Add practical layout and brand validation

Pixel-level or perceptual regression against Figma is not required. It would add maintenance overhead and could reject legitimate PowerPoint-specific adjustments that improve editability, compatibility, or readability.

For every approved layout, use lightweight checks that verify:

1. The slide uses the correct 16:9 page geometry.
2. Fonts, colors, margins, spacing, logo treatment, and footer treatment follow the approved layout specification.
3. Text does not overflow and remains readable at presentation scale.
4. Text, tables, charts, and required diagrams remain editable.
5. Images have sufficient source resolution and preserve their intended crop and proportions.
6. The rendered slide has no clipping, font substitution, broken assets, or unintended overlaps.
7. The deck remains compatible with PowerPoint and LibreOffice.

Maintain a rendered reference montage of the approved PowerPoint layouts for quick human comparison. Use Figma as design guidance and an approval reference rather than as a pixel-perfect automated test target.

## LibreOffice and output resolution

LibreOffice is useful as a deterministic renderer and compatibility check. It should not become the primary authoring engine unless template import proves unreliable.

PPTX content is resolution-independent when text, shapes, tables, charts, and diagrams remain native. High-resolution output depends on:

- Native PowerPoint objects.
- Properly sized source images.
- Exact 16:9 page geometry.
- Exporting delivery images at 1920×1080 or 3840×2160.

Using 1920×1080 coordinates internally would make matching the Figma source easier. A 1280×720 coordinate system is not inherently lower quality when scaled proportionally, but the current geometry and layout rules differ from the Figma designs.

## Recommended decision

Retain:

- Repository governance.
- Bundled approved assets.
- `@oai/artifact-tool` authoring.
- Native editable PowerPoint objects.
- Render, overflow, and montage QA.

Replace or extend:

- Generic hard-coded slide chrome.
- The example-only specimen deck.
- Informal layout descriptions.
- Routing-only evaluation fixtures.

Add:

- A curated approved Figma frame catalog.
- A real `.pptx` or `.potx` master and layout library.
- A layout manifest with content constraints.
- Font embedding or a documented font-deployment strategy.
- Structural checks for brand tokens, layout geometry, editability, overflow, and asset resolution.
- A rendered reference montage for human visual comparison.
- PowerPoint and LibreOffice compatibility checks.
