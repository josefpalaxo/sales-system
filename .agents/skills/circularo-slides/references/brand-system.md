# Circularo presentation brand system

## Canvas and grid

- Canvas: 1280×720 px, 16:9.
- Outer margin: 48 px.
- Primary content area: `(48, 48, 1184, 624)`; the compact logo may occupy the top chrome band above it.
- Base spacing: 8 px; preferred steps are 8, 16, 24, 32, 48, 64, and 96 px.
- Keep equal left and right margins unless a deliberate full-bleed composition requires otherwise.

## Color tokens

| Role | Hex |
|---|---|
| Circularo purple | `#7000FF` |
| Circularo dark blue | `#1D0090` |
| Body gray | `#3D3D3D` |
| White | `#FFFFFF` |
| Neutral 50 | `#F8F9FC` |
| Neutral 100 | `#F2F4F7` |
| Neutral 200 | `#E4E7EC` |
| Neutral 300 | `#D0D5DD` |
| Neutral 500 | `#667085` |
| Neutral 700 | `#344054` |
| Neutral 900 | `#101828` |
| Soft purple | `#F5EDFF` |

Use purple for emphasis and momentum, dark blue for authority, body gray for reading, and neutrals for structure. Avoid introducing unapproved accent colors.

## Typography

- Spartan Bold: display titles, slide titles, section titles, and major facts.
- Mulish Regular: body copy, captions, labels, and notes.
- Mulish Bold: emphasized body copy, labels, and page chrome.
- Default body size: 22 px. The absolute floor is 21.33 px / 16 pt.
- Keep titles to one or two lines. Do not shrink a title to rescue an overfilled layout.

## Logo and transparency

- Standard chrome uses the symbol, not the full logotype.
- Use `circularo-logo-symbol-blue-circle-slide.png` on light slides.
- Use `circularo-logo-symbol-white-circle-slide.png` on dark slides.
- Both PNGs use an opaque field that exactly matches the supported slide background. This removes alpha-channel dependence while remaining visually seamless.
- Do not use the SVG or original transparent PNG symbol for PowerPoint or Google Slides chrome; renderer differences can expose a white square or omit the image.
- Use a consistent 40×40 px image frame at `(48, 24)` on all slides.
- Place the mini-title / eyebrow at `(104, 31)` in a 20–24 px-high text box.
- Start standard slide titles at `y=96`. This compact chrome preserves more vertical space for content while maintaining a clear separation from the logo band.
- The slide-ready PNGs are tightly cropped deterministic rasterizations of the authentic vector paths with background-matched fields. Use contain positioning; never distort or redraw the mark.
- Minimum visible mark: 20 px. Never rotate, recolor, shadow, outline, or decorate it.

## Core slide patterns

- Minimal cover: compact symbol, short title, one-line descriptor, restrained color field.
- Brand overview: headline, short explanation, palette and typography samples.
- Chapter divider: short transition statement with a strong color field.
- Highlight statement: one large claim with one supporting fact or implication.
- Contrast slide: dark claim area paired with a concise light explanation area.
- Comparison: two or three equal columns with direct headings and sparse bullets.
- Process: one calm baseline, four or fewer stages, short parallel labels.
- Layered architecture: no more than three layers and six total nodes.
- Ranking: direct labels, one focus bar, and an already-visible conclusion.
- Decision close: resolve the opening tension and state the next action.

Prefer flat compositions over dense cards, dashboards, pills, or decorative UI patterns.
