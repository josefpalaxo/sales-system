# Signfide design direction

## Chosen identity

Use Good Faith, alternative A: the serif wordmark without a separate symbol. The supplied [wordmark board](references/a-wordmark-reference.png) is the visual reference. The user prefers this alternative and its palette; final production lettering remains unfinished.

The earlier navy/teal recommendation in the [strategy snapshot](references/website-strategy-source.md) is superseded for this prototype. The parchment palette is an explicit user choice: retain it even when a design skill cautions against generic cream backgrounds. Make this identity distinctive through composition, type, content and product demonstrations.

## Color roles

| Role | Value | Usage |
| --- | --- | --- |
| Oxblood | `#4B2432` | Wordmark, key headings, primary buttons and selected strong surfaces |
| Parchment | `#F5F0E6` | Main light canvas and light text on oxblood |
| Warm graphite | `#29272A` | Body copy and functional text |
| Clay | `#C38D70` | Selective supporting accents and illustration details |

Use these exact reference colors as the token anchors; derived shades must remain recognizably related. Verify contrast for actual foreground/background pairs. Do not assume clay is suitable for small text on parchment. Keep color values in centralized CSS tokens; use equivalent OKLCH tokens if required by the chosen workflow. Do not randomly seed a new brand palette.

## Typography and logo

Use Newsreader for editorial headings and Inter for body, navigation and interface labels. Keep reading text comfortably sized with generous line height and controlled line lengths. Bundle redistributable webfont assets and their licenses inside the project; include sensible system fallbacks.

The wordmark board is not a final logo master. Do not place the full board in the navigation or crop its background into a makeshift logo. For the prototype, create a clean live-text lowercase wordmark in a closely matching serif, with careful kerning and an honest note in the project documentation that it is a provisional typographic rendering. Final custom lettering can be supplied later. No leading ring, circular loop, extra signature symbol, or decorative checkmark.

Use the tagline near the wordmark only where it remains readable; it may be omitted in the compact mobile header. A serif s in an oxblood square is the provisional favicon direction. Do not claim the font-based rendering reproduces the generated board exactly.

## Layout and visual language

The visitor is a busy legal professional evaluating a new service on a laptop during the working day or briefly on a phone. The page should feel clear, composed and trustworthy, with enough product detail to explain what the service proposes to do.

Build a light editorial site with a confident typographic hero, generous but purposeful spacing, restrained rules, and selective oxblood sections. Use a clear alignment system and varied section structures. Pair the hero with a legible illustrative legal-agreement workflow, not generic legal stock imagery. Make the workflow feel like software through precise labels and coherent interaction, while identifying it as a concept demonstration.

Avoid endless identical feature cards, oversized ornamental logos, faux paper grain, gold luxury cues, gavels, courthouse columns, scales, shields, gratuitous gradients, decorative glass, and repetitive scroll reveals. Do not turn the site into a law-firm brochure: its purpose is to explain an agreement product.

Use real product screenshots only if separately provided and authorized. The absence of screenshots is a reason to design a clearly labeled conceptual demonstration, not to fabricate a real-looking screen and present it as shipped software.

## Interaction and accessibility

Use semantic HTML, visible keyboard focus, accessible menus/dialogs and form labels, sufficient contrast, and comfortable touch targets. Respect reduced motion. Animate only where it helps explain a state change or adds measured polish. Content must remain visible without animation.

Review at approximately 390px, 768px and 1440px widths, and check 320px for overflow. Headings, wordmarks, comparison tables and menus must remain usable. Test real copy rather than short placeholders. Keep decorative assets subordinate to the reading and conversion path.
