# Circularo slide production workflow

## Build

1. Load the bundled presentation runtime; never install alternate slide libraries.
2. Use `@oai/artifact-tool` from a JavaScript ES module.
3. Import `scripts/circularo-slide-system.mjs` for canvas, colors, typography, chrome, bullets, dividers, and source-note helpers.
4. Put temporary renders and layout JSON under a task-specific build directory in `work/slides/<task>/` when operating in the Circularo sales repository.
5. Export the final PPTX to the user-requested path. If the deck is being promoted as a durable sales asset, follow `repository-storage.md` and update the existing stable path when one exists.

## Logo implementation

Use byte-backed PNG images with `contentType: "image/png"`. Select the blue or white asset based on background. Keep the frame exactly 40×40 px at `(48, 24)`. Align the mini-title / eyebrow at `(104, 31)` and start standard slide titles at `y=96`.

The slide-ready artwork is an opaque 72×72 PNG rasterized from the authentic vector path with a tight view box. The light asset uses white and the dark asset uses `#1D0090`, exactly matching the supported slide backgrounds. Use it without an additional crop. Do not convert the logo to JPEG.

The helper also inserts unique non-visual PNG metadata for each slide before embedding the asset. This avoids renderer-specific media de-duplication failures without changing any logo pixels.

## Visual QA

1. Export an artifact-tool PNG and layout JSON for every slide.
2. Render the final PPTX with the presentation renderer.
3. Inspect every rendered slide individually at full size.
4. Inspect light and dark slides specifically for visible logo fields, missing images, or color mismatches.
5. Build and inspect a montage for deck-level rhythm and logo consistency.
6. Run `slides_test.py` and fix every overflow.
7. Inspect the final deck and confirm each logo image has the same frame.

## Failure patterns learned during the pilot

- SVG transparency can render as a white square in PowerPoint even when an internal PNG preview looks correct.
- Reusing the same raster asset may expose renderer-specific issues; verify the exported PPTX, not only the artifact-tool preview.
- Keep the logo compact. Use the 40 px frame and the 96 px title start so the top chrome does not consume unnecessary content space.
- Fonts can silently fall back. Install or bundle Spartan and Mulish and verify rendered output.
- A technically valid deck can still be unreadable. Shorten copy before reducing font size.

## Handoff

Return only the final deck and a concise summary. Mention validation results. Do not expose scratch renders, layout JSON, or build notes unless requested.
