# M.O.B Signal — Brand System

Package version 1.6.0 · source version 4.0.0 (`design-tokens.json` `meta.version`) · derived from
`design-system-neon-tech` · registered as `user:product` · archive sha256
`8d9e46cb6d28432e8b6808417b0770b227f81a2f425d9a1601993f06a25c50d1`

This document is a specification. It states values, roles and limits in the present tense; it does
not record who asked for a change or when, and `CHANGELOG.md` is the only place release history lives.
Sections 1-10 are what the archive proves. Sections 11-18 close the eleven gaps the archive left open:
icons, component coverage, overlay motion, data visualisation, measured accessibility, layout grid,
brand assets and licensing. Within every section each value carries its own label — `measured`,
`authored` or `corrected` — and an authored value may never be cited as a source measurement.

The reading order follows the usual divisions of a design system:

| Part | Sections |
| --- | --- |
| Provenance | 1-10 base, 11-18 additions, both labelled per value |
| Foundations | 1 colour, 2 typography, 3 space/shape/elevation, 16 layout grid, 11 iconography |
| Components and patterns | 4 component contract, 12 overlays and feedback, 13 motion, 14 data visualisation, 5 voice and copy |
| Quality and brand assets | 6 do and don't, 15 accessibility, 17 brand assets |
| Governance and reference | 7 engine seed, 8 and 20 measured versus generated, 9 reuse layer, 18 licensing and versioning, 10 source deviations, 19 open items |

## Provenance

Current token values are defined in `tokens.measured.json`; shared component sources implement
those rules. Historical source names and digests are recorded in `context/provenance.json`.
Original archives and extracted reference files are not included in the package.

Provenance labels distinguish recorded source values (`measured`), designed additions (`authored`)
and verified corrections (`corrected`). These labels describe origin, not a dependency on an old
source folder. Local fonts, supplied logos and authored icons have their own asset manifests.
Current contrast measurements and verification scope are recorded in `context/contrast-measured.md`
and `context/verification.md`.

## 1. Color system

Registered engine roles (these drive `brand.json.colors`):

| Role | Hex | Source token | Contract |
| --- | --- | --- | --- |
| `background` | `#0a0a0a` | `--color-background` | Page canvas. Matte charcoal, never pure black. Inputs sit on this same value. |
| `surface` | `#121212` | `--color-surface` | Card body, primary nav, table container. One step above canvas. |
| `foreground` | `#ededed` | `--color-text-primary` | Headings, body, primary figures. Measures 16.91:1 on canvas, 16.00:1 on surface (AAA). |
| `muted` | `#737373` | `--color-text-muted` | **Restricted.** Measures 4.18:1 on canvas — AA large, not AA — so it may carry disabled/decorative text or large text at 24px regular / 18.667px bold, with at least 3:1 contrast. 12-14px metadata uses `text-secondary`. |
| `border` | `#262626` | `--color-border` | Every 1px rule: cards, inputs, cell separators. Measures 1.31:1 on canvas, so a rule alone never identifies a control — see section 15. |
| `accent` | `#00cc5c` | `--color-primary` | **Corrected, not measured** — see section 1.1. Neon green, functional accent only. 9.23:1 on canvas, and banded to the same luminance as info and warning. |
| `accent-secondary` | `#38bdf8` | `--color-info` | The informational blue, filed here because the engine has no `info` role. Never a primary action — see section 1.2. |
| `success` | `#00cc5c` | `--color-success` | **An alias of `--color-primary`, not a second colour.** Operational health shares the accent hue; the word, the 6px square and the icon carry the difference — see section 1.1. 9.23:1 on canvas. |

Extended neutrals and states that have no engine role. They live in `brand.json.seed`
and in this file; the kit must use these exact values, not approximations:

| Token | Value | Use |
| --- | --- | --- |
| `surface-subtle` | `#181818` | Table headers, alternating rows, secondary button fill, ghost hover |
| `surface-elevated` | `#202020` | Dropdown, popup menu, modal |
| `surface-hover` | `#222222` | Secondary button hover |
| `border-strong` | `#383838` | Card hover border, major section divider |
| `border-focus` | `#00cc5c` | Input focus border |
| `primary-hover` | `#00e065` | Primary button hover — 1.21:1 against the base, the floor for a step a viewer can see |
| `primary-active` | `#00b853` | Primary button pressed — 1.23:1 against the base |
| `primary-subtle` | `rgba(0, 204, 92, 0.1)` | Selected table row, selected chip — 1.16:1 on surface, so it is decoration and never the indicator |
| `success-subtle` | `rgba(0, 204, 92, 0.1)` | Operational badge fill — the same value as `primary-subtle`; kept as a separate name so a recipe states its intent |
| `text-on-primary` | `#000000` | Text on accent fill — measures 9.79:1, AAA (11.85:1 on hover, 7.98:1 on active; the source quoted 14.2:1 for the old volt, which measured 12.43:1). `#ededed` on the accent is 1.83:1 and fails at any size |
| `text-secondary` | `#a1a1a1` | Labels, column headers, form hints, `<kbd>` text — 7.66:1 on canvas, 6.87:1 on surface-subtle, AA and above everywhere |
| `warning` | `#f59e0b` | Resource warning, elevated latency — 9.22:1 on canvas |
| `error` | `#ef4444` | System failure, destructive action — 5.26:1 on canvas, 4.98:1 on surface, 4.33:1 on surface-elevated (below AA at 12px there: small error copy uses error-text and a red marker) |
| `row-hover` | `rgba(255, 255, 255, 0.02)` | Data-table row hover |

**Dark-only declaration.** This system publishes no light theme, and that is now a rule rather than
an absence. `colors_and_type.css` carries a `prefers-color-scheme: light` block that re-asserts
`color-scheme: dark` and holds the canvas and foreground, so a light OS preference cannot re-map
anything. The light surfaces that do exist in the package — `brand.html`, `system/kit.html` — are
engine viewer chrome, declared as such in `brand.html` itself, and are not brand deliverables. A
request for "the light version of this kit" is answered with this paragraph, not with a new palette.

**How the non-role colors are enforced.** The engine accepts exactly seven color roles, so
`surface-subtle`, `surface-elevated`, `surface-hover`, `border-strong`, `text-secondary`,
`text-on-primary`, the accent hover/active steps and the warning and error hues have no role to live
in. They are now enforced through three files instead of prose alone:

| File | Job |
| --- | --- |
| `tokens.measured.json` | Machine-readable source of truth for every value, each tagged `measured`, `authored` or `corrected`, with the archive digest. |
| `colors_and_type.css` | The CSS surface every deliverable loads; nothing may hardcode what this sheet already names. |
| `context/token-check.mjs` | Resolves every `var(--x)` in the package against the contract and reports any reference no sheet defines. Run `node context/token-check.mjs`. |

**The accent rule.** `#00cc5c` appears in exactly four situations: the primary CTA fill, the
selected/active indicator, the keyboard focus ring, and the Operational marker. A fifth use is
a bug. It is never a background wash, never a gradient stop, never a glow, and — because a
full-saturation green halates, throwing a coloured fringe off the edge of small glyphs — never
text below 14px. Small accent text sits on a `primary-subtle` chip, not bare on the canvas.

### 1.1 Accent

The primary accent is `#00cc5c`, with hover `#00e065`, active `#00b853` and a 10% subtle tint.
Use it for primary actions, selection, keyboard focus, selected chart series and Operational markers.
Use `text-on-primary` (`#000000`) on filled primary controls. Their measured contrast is 9.79:1
at rest, 11.85:1 on hover and 7.98:1 while pressed. Foreground `#ededed` on the base fill is only
1.83:1 and must not label a primary button. Avoid accent text below 14px as a brand readability rule.

The selected edge and focus ring carry visible state; a subtle tint is decorative. Hover-to-default
contrast is not a separate WCAG requirement. Evaluate each state's text and essential indicators
against their actual adjacent colors.

Success aliases primary. A health state includes a visible status word and marker or icon.
No color alone identifies an action or status. Do not add glow, gradient washes or large accent fills.

### 1.2 Information colour

`#38bdf8` is the informational role for links, informational messages and ordinary chart series.
Its compatibility name `accent-secondary` is an engine slot; use `info` in components.
Color roles do not have to share a hue. There is no WCAG rule requiring an analogous,
complementary or other color-wheel relationship. Contrast, non-color cues and consistent meaning
are the relevant requirements. Underline text links in prose. Label chart series and distinguish
them with markers or line patterns as well as color.

The palette is a brand specification, not an industry-standard palette. Source values and authored
corrections are identified in `tokens.measured.json` and the provenance records.

## 2. Typography

| Face | Role | Weights | Source |
| --- | --- | --- | --- |
| Space Grotesk | Display — H1–H3, hero, large metric counters | 500, 600, 700 | `fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700` |
| Plus Jakarta Sans | Body — paragraphs, labels, buttons, nav | 400, 500, 600, 700 | `…family=Plus+Jakarta+Sans:wght@400;500;600;700` |
| JetBrains Mono | Code, hashes, IPs, numeric tables | 400, 500, 600 | `…family=JetBrains+Mono:wght@400;500;600` |

All three load from Google Fonts in one `@import`; ship the declared fallback chain
(`system-ui, -apple-system, …` for text, `SFMono-Regular, Consolas, monospace` for code)
when the webfont is unavailable. Headings carry `letter-spacing: -0.02em` at weight 600.

Scale, from `design-tokens.json.typography.scale`:

| Step | Size / line-height | Assignment |
| --- | --- | --- |
| `xs` | 12 / 16 | Badges, `<kbd>`, micro metadata |
| `sm` | 14 / 20 | Form labels, table cells, secondary buttons |
| `base` | 16 / 24 | Body, default inputs, nav links |
| `lg` | 18 / 28 | Sub-headings, card titles |
| `xl` | 20 / 28 | Section headers, modal titles |
| `2xl` | 24 / 32 | Page titles, major stat counters |
| `3xl` | 32 / 36 | Hero titles, top-level dashboard metric |

Numeric content gets `font-variant-numeric: tabular-nums` — required on stats and table
cells so values do not jitter while updating.

## 3. Space, shape, elevation

- **Grid:** 4px base unit. Steps `4, 8, 12, 16, 20, 24, 32, 40, 48`. 8px baseline rhythm.
- **Radius:** `0px` on UI controls; supplied platform icon backing plates are an artwork exception. The source CSS enforces `border-radius: 0 !important`
  in the universal reset, so per-component rounding is not available by design.
  `brand.json.seed.borderRadius` is set to `0` explicitly — a `"0px"` layout string alone
  is read as "unset" and falls back to the engine default of 8.
- **Border width:** 1px default, 2px thick (focus/emphasis only).
- **Shadows:** black alpha only. `sm 0 1px 2px rgba(0,0,0,.4)` · `md 0 4px 6px -1px rgba(0,0,0,.5)` ·
  `lg 0 10px 15px -3px rgba(0,0,0,.6)`. No colored shadow, no neon bloom.
- **Focus ring (identical everywhere):** `box-shadow: 0 0 0 2px #0a0a0a, 0 0 0 4px #00cc5c`.
- **Motion:** one value — `0.12s cubic-bezier(0.16, 1, 0.3, 1)`, applied to
  `background-color`, `border-color`, `color` only.
- **Control height:** 32px, from the source arithmetic 8 + 14 + 8 + 2.
- **Pointer target:** at least 24px for fine pointers; coarse-pointer controls grow to 44px without overlapping hit areas (section 15).
- **Grid:** the source measures two widths only — a 1200px console container and a 48px navigation
  band. Everything else about the grid is authored and recorded in section 16.
- **Motion:** one measured value, and one documented amendment for overlays. Section 13 states both
  and says exactly which sentence of the source the amendment modifies.

## 4. Component contract

| Component | Current recipe |
| --- | --- |
| Button | Shared .btn; 32px minimum fine-pointer height, 44px coarse-pointer height. Padding 8px 16px, square corners, primary black ink, secondary control-border. Danger uses readable foreground and the error border. |
| Card | Surface fill, decorative border, 24px padding; an interactive card also needs an accessible name, focus and a visible interaction cue. |
| Input | Canvas fill, control-border, foreground text, secondary placeholder. Label above, connected hint/error below. Focus uses the shared offset ring. Error text uses error-text and an error marker. |
| Table | Locally scrollable wrapper; scoped header cells; 12px 16px cell padding. Numeric columns use tabular figures and right alignment. |
| Badge | 4px 8px padding, 12px text with readable foreground/secondary. Status is a visible word plus a 6px semantic marker. Borders and tints are decorative. |
| Kbd | Mono 12px, secondary text on surface-subtle, 4px 8px padding. |
| Navigation | Wrapping links/buttons, explicit current state, accent edge and visible keyboard focus. |

### 4.1 Coverage and ownership

| Source | Owns |
| --- | --- |
| tokens.measured.json | Canonical token values and provenance |
| colors_and_type.css | Generated token variables and public aliases |
| components.css | Button, card, input, table, badge, kbd and control recipes |
| overlays.css | Floating surfaces, feedback and overlay recipes |
| assets/components.js | Framework-neutral tabs with linked panels and keyboard navigation |
| ui_kits/app/console.css | Console layout only; no separate control recipes |

The console loads the shared sheets and bundles its editable React source locally. A gallery
state specimen demonstrates appearance; it does not imply an implemented data service.
Tabs and the console actions have explicit behavior. Use native controls for their native semantics.

Visual state coverage: **default / hover / `:focus-visible` / pressed / disabled**, plus**error** wherever a control can be invalid. Two deliberate non-states are recorded rather than
invented — a tooltip trigger has no pressed state (it is a question, not an action), and there is no
indeterminate progress anywhere in this system (section 13).

| Card | Demonstrates |
| --- | --- |
| `preview/components-controls.html` | every control in every state, keyboard operation, measured-versus-authored table |
| `preview/components-overlays.html` | operable modal, drawer, menu, popover, tooltip, toast, command palette, plus the static feedback patterns |
| `preview/icons.html` | the icon family at three sizes with pairing and status rules |
| `preview/data-viz.html` | line, bar and sparkline drawn from the chart tokens |
| `preview/layout-grid.html` | grid, breakpoints, region widths, layering, sticky reserve |
| `preview/motion.html` | the measured hover trio against the overlay amendment, with reduced motion |
| `preview/content-patterns.html` | copy formulas, the status map, formatting rules |
| `preview/accessibility.html` | the measured matrix, focus order, keymap, target sizes |

## 5. Voice and copy

The five rules the archive states, then the formulas it never wrote. The rules are measured; the
formulas in 5.1-5.3 are **authored** from those rules and from the vocabulary the source does
supply.

- Sentence case on every label, header, nav item and button. `"Create database"`, not `"CREATE DATABASE"`.
- Button text starts with a verb: *Deploy new service*, *Save changes*, *View audit log*.
- Statuses read *Operational / Degraded / Failed / Pending*.
- State the number instead of praising it. No *blazing*, *seamless*, *cutting-edge*.
- Line length under 80 characters; high density, minimal chrome.

### 5.1 Sentence formulas

| Situation | Formula | Worked example |
| --- | --- | --- |
| Empty state | Name the thing, then the one action that fills it. No joke, no mascot. | "No services deployed yet. Deploy your first service to see latency here." |
| Field error | What is wrong, in the field's own terms, then the constraint. Never "Invalid input". | "Region must be one of the 8 available regions." |
| Action failure | What failed, what the system did with the request, what the user can do next. | "Rollback failed. The previous commit is still live. Retry or open the audit log." |
| Destructive confirm | Verb + object, the consequence, and the recovery window in numbers. | "Delete service `api-edge`. All 3 deployments and their logs go immediately and cannot be recovered." |
| Success | State the change, not a compliment. Past tense, one clause. | "Deployed commit `7f3ac2d` to 2 regions." |
| Long wait | What is happening and the measured expectation, or nothing at all. | "Provisioning replica in `eu-central-1`. Usually 40 seconds." |
| Unknown state | Say it is unknown. Never guess a status word. | "Last health check 12 minutes ago. Status unknown." |

Never: an exclamation mark, a first-person plural cheer ("We're done!"), an apology for the machine's
behaviour, or a status word without its marker (see 5.2).

### 5.2 Status map

A hue never carries status alone — the pairing is shape, word and icon at once. The measurements that
force this are in section 15: the 1px rule is 1.31:1 and the selected-row tint is 1.16:1, so neither
can be the only indicator.

| Status | Color | Marker | Icon | Text size | Where it may appear |
| --- | --- | --- | --- | --- | --- |
| Operational | `success #00cc5c` (alias of accent) | 6px solid square | `i-check` | 12px badge | badge, table cell, stat label |
| Degraded | `warning #f59e0b` | 6px solid square | `i-alert` | 12px badge | badge, table cell, toast |
| Failed | `error #ef4444` | 6px solid square | `i-close` | 12px badge | badge, table cell, field error, destructive action |
| Pending | `text-secondary #a1a1a1` | 6px **outline** square | `i-clock` | 12px badge | badge, table cell — never the accent, it has not happened yet |
| Paused | word in `text-secondary #a1a1a1`, marker in `muted #737373` | 6px outline square | `i-minus` | 12px badge | muted measures 4.18:1, so it may be the **marker** (3.36-3.95:1, above the 3:1 non-text floor) but never the 12px word |
| Selected | `accent #00cc5c` as a 2px leading edge | edge, not a dot | `i-check` in the row action | n/a | table row, menu item, segmented tab, chart series |

`Selected` and `Operational` both use the accent and mean different things, which is why selection is
always an **edge** and health is always a **dot plus word**.

Size decides whether the icon column applies. A 12px badge keeps the measured 6px square marker only —
a 16px glyph would grow the badge off its `2px 8px` padding, and the dot is the measured recipe. The
icon joins the word wherever the type is 14px or larger: a stat cell, a table row action, a toast, an
empty state, a panel header. The map's icon column is therefore the pairing **at 14px and above**, and
`preview/icons.html` renders both forms.

### 5.3 Formatting rules

| Data | Rule | Rendered |
| --- | --- | --- |
| Commit hash | 7 characters, mono, never uppercased, monospace figures | `7f3ac2d` |
| Full hash | Only in a detail panel, broken at 8 characters with `word-break` | `7f3ac2d4 9b1e0f8a` |
| Latency | Integer + unit, one significant decimal above 100ms, `tabular-nums` | `42ms` · `318ms` |
| Uptime / quota | Percentage to one decimal, threshold stated beside it | `99.9% of 99.95%` |
| Count | Plain integer with `tabular-nums`; thousands separator follows the locale | `1,204` |
| Timestamp | 24-hour, no seconds in a table, seconds in an audit row, always the zone once per view | `14:22 UTC` |
| Relative time | Allowed only beside an absolute time, never alone | `3 min ago (14:22 UTC)` |
| Size | One unit per column, chosen for the largest value | `1.4 GB` |
| Region | The region id in mono, not a marketing name | `eu-central-1` |
| Plural | One and many both spelled out; no `service(s)` | `1 service` · `3 services` |
| Truncation | Ellipsis plus the full value reachable in one action, never a silent cut | `api-edge-…` in a tooltip |
| Numbers that move | `font-variant-numeric: tabular-nums` is mandatory; it is in the body `font-feature-settings` already |

## 6. Do and don't

**Do**
- Keep one accent per viewport competing for the primary action.
- Reach contrast before you reach decoration: AAA on primary text and on accent fills.
- Give every interactive element the `:focus-visible` ring above.
- Pair status color with a word — never hue alone.
- Use `surface-elevated #202020` for anything that floats above the page.
- Give essential controls the control-border token. Decorative low-contrast rules and subtle fill differences do not establish a 3:1 boundary.
- Route every color, size, duration and z-index through `colors_and_type.css`; run `node context/token-check.mjs` when you add a token.
- Label a chart series at its end rather than only in a legend, and cap the series count at four.
- Use the icon family for status, and give any standalone icon button an `aria-label`.
- Reuse a recipe from `components.css` or `overlays.css` before authoring one; if neither has it, the component is unspecified and must be flagged, not guessed.

**Don't**
- Round anything. A 4px radius on one component breaks the whole language.
- Add glow, bloom, light trails, radial-gradient blobs, or blurred colored circles.
- Tint a shadow, or use a shadow to mean emphasis — step the border instead.
- Turn hover text gray or lighter; hover changes fill and border, not foreground.
- Hand-draw a logo. None exists in the source; leave the mark unset until a real asset arrives.
- Put the accent behind body copy, or use `#38bdf8` for a primary action.
- Use `muted #737373` for 12-14px text anywhere. It measures 4.18:1 and the source's claim of 4.6:1 is wrong.
- Animate anything but `opacity` on an overlay, and never slide, scale, parallax or stagger — that includes a shimmer on a skeleton and an indeterminate spinner.
- Introduce a fifth hue into a chart. The series ramp is secondary blue plus the neutral scale.
- Use an emoji as an icon, mix stroke weights inside the icon family, or ship a filled variant of an outlined glyph.
- Give a `z-index` that is not a token, or stack a drawer on a modal.
- Duplicate a component recipe across sheets — one owner per component, listed in 4.1.
- Publish a light theme, or accept `system/kit.html`'s light surface as the brand's light mode.

## 7. Engine seed

Persisted in `brand.json.seed`. The finalize step accepts exactly these 20 keys plus
`algorithm`; every other token in the kit is **derived** from them (section 8), so writing
an alias token such as `colorBorder` into the seed is silently ignored.

`colorPrimary #00cc5c` · `colorSuccess #00cc5c` · `colorWarning #f59e0b` · `colorError #ef4444` ·
`colorInfo #38bdf8` · `colorLink #38bdf8` · `colorBgBase #0a0a0a` · `colorTextBase #ededed` ·
`fontSize 16` · `borderRadius 0` · `sizeUnit 4` · `sizeStep 4` · `controlHeight 32` · `lineWidth 1` ·
`motionUnit 0.12` · `algorithm dark`.

`borderRadius` must be the **number** `0`. The layout string `"0px"` in `brand.json.layout.radius`
is read as unset and reverts to the engine default of 8.

## 8. Canonical values and compatibility exports

`tokens.measured.json` is the token authority. Its `css` entries reference semantic values rather
than duplicating them. `npm run build` emits `colors_and_type.css`, aligns compatibility tokens in
`system/`, builds the local console and exports logo PNGs. These are generated outputs.

An external template generator can overwrite files without running this project's build. Run the
project build after such a change, then run `npm run check:tokens`. The checker fails on canonical
value drift, missing loaded variables, missing local resources, remote runtime assets and known
obsolete scaffold. Project scripts cannot change the host application's generator or registry.

## 9. Reuse layer (project root)

`system/**` is the engine's antd derivation. The root-level reuse layer is what a human or a
future agent actually loads to build something new, so it is held to the **measured** values, not
the derived ones:

| File | Contents | Owner |
| --- | --- | --- |
| `colors_and_type.css` | Full token contract: accent + hover/active/subtle, the five charcoal steps, three text steps, both border steps, four semantic states, display/body/mono stacks with source fallbacks, the 7-step type scale with line heights, the 4px spacing scale, `0px` radius on every step, black-only elevation, the focus ring, control heights, component padding pairs, motion, and the public `--color-*` / `--space-*` / `--radius-*` aliases that `preview/` and `ui_kits/` consume. | Hand-maintained |
| `index.html`, `preview/*.html` | Entry page plus eighteen review cards on the dark canvas: `0px` radius everywhere, Space Grotesk headings with `-0.02em`, sentence-case labels, `#000000` on volt fills, 4px-step gaps, focus rings on `:focus-visible`. The shape card states the 0px scale instead of advertising 6/10/16px, the light-theme card states that no light theme exists, and the new cards cover icons, controls, overlays, charts, grid, motion, content patterns and accessibility. | Hand-maintained |
| `components.css`, `overlays.css` | The component recipes, split by ownership so one component never has two sheets (4.1). Zero color literals: both load the contract first. | Hand-maintained |
| `assets/icons/icons.css`, `assets/icons/icons.svg` | The icon family: 65 symbols on a 24 grid, 1.5px stroke, square joins, `currentColor`. | Hand-maintained |
| `tokens.measured.json` | The non-derived token source, with provenance per entry and the archive digest. | Hand-maintained |
| `context/contrast.mjs`, `context/contrast-measured.md` | The measured contrast matrix and the numbers that replace the source's claims. | Hand-maintained |
| `context/design-md-from-brand.mjs` | Regenerates `DESIGN.md` from `brand.json` in the engine's document shape, so a registry edit does not have to wait for a finalize. | Hand-maintained |
| `context/token-check.mjs` | Proves every `var(--x)` in the package resolves against the contract. | Hand-maintained |
| `CHANGELOG.md` | Package version history and what each version changed. | Hand-maintained |
| `fonts/fonts.css`, `fonts/manifest.json`, `fonts/licenses.json`, `fonts/licenses/*.OFL.txt` | Three local variable fonts with English/Vietnamese glyphs, their provenance, and the OFL 1.1 text that must travel with them. | Hand-maintained |
| `ui_kits/app/` | Applied service console. Class anatomy transcribed from the source preview; no component carries a literal color. | Hand-maintained |
| `assets/logo.svg` | Compatibility copy of the supplied dark lockup; originals in `logos/mob-logo/`. | Supplied artwork |

**Re-apply after finalize.** `od brand finalize` regenerates this whole layer from engine templates,
and those templates emit generic light-mode defaults regardless of `brand.json`: `color-scheme: light`,
`--surface: #fff`, `--muted: #706b65`, cream `#f3f1ec`, radius `4/7/8/10/16px`, Inter, an uppercase
eyebrow, `#fff` text on the accent fill, and font faces resolved to a non-latin subset with one URL
reused for every weight. Any file in the table above that a finalize has overwritten must be restored
from this section's contract rather than trusted as generated, and `context/engine-token-sync.mjs`
re-run. `od brand preview` does not touch this layer — it re-renders `brand.html` and regenerates
`DESIGN.md` from `brand.json`.

Why the generator does this: the app's design-system viewer keeps **fixed-light chrome by intent**.
The rule is written into `brand.html` itself — *"Logo / brand-asset tiles always sit on a LIGHT
neutral. The kit chrome itself is fixed-light (`--paper` / `--surface` are hard-coded light tokens)
… never flip the stage dark"* — with `surface` and `accent` falling back to `#ffffff` and `#c96442`
when a role is missing. A light `brand.html` is therefore correct behaviour and must not be
"fixed". What is wrong is that the same light values reach `colors_and_type.css`, `preview/` and
`ui_kits/`, which are the **reusable contract** and must carry the brand's own dark values. The line
this section draws: viewer chrome stays light, deliverable-facing tokens stay dark.

## 10. Deviations inside the source itself

The archive disagrees with itself in four places. These are recorded rather than smoothed over, so a
deliverable never presents an assumption as a measured fact.

| Item | Source prose | Source code | Resolution used here |
| --- | --- | --- | --- |
| Focus ring | `shadows.focus` = `0 0 0 2px #0a0a0a, 0 0 0 4px #00cc5c` | `.input:focus` sets `box-shadow: 0 0 0 1px #00cc5c` plus the accent border | Two recipes, both real: the 2px/4px ring for keyboard focus (`:focus-visible`), the 1px inset ring plus accent border for a focused text field. Never mix them on one element. |
| Off-scale padding | "Spacing comes from the 4px scale" | Table header `10px 16px`, badge `2px 8px`, kbd `1px 5px` | Kept verbatim where the source defines the component, because those three are the only measured values for them. Everything else stays on the 4px grid. |
| Shadow anatomy | `design-system.md` lists one layer per elevation | `--shadow-md` and `--shadow-lg` each carry a second black layer | Use the CSS pair (`.card-box`, `.app-container` and `.toast` in the kit); it is the rendered form, the prose is the summary. |
| Missing recipes | Component contract names form and badge states | No error-field, disabled-field, select or checkbox recipe exists in the archive | Error field = `#ef4444` border plus the standard accent focus ring; disabled = `opacity .4` from the button rule. Both are **authored**, flagged in `preview/components-inputs.html`. Select and checkbox are unspecified — do not claim a measured style. |
| Zebra rows | Prose says alternating rows use `#181818` | The rendered table never alternates; it only applies the `rgba(255,255,255,0.02)` row hover | Follow the rendered table. `surface-subtle` is used for panel headers and hover fills, not striped rows. |
| Radius tokens | `borders.radius` defines five steps, all `0px` | `design-system.css` also carries a blanket `border-radius: 0 !important` reset | The reset is why no component can opt into rounding. Any rounded element is a bug against this system, not a token choice. |
| Hover and foreground | `design-system.md` prose and `BRAND.md` 6: hover changes fill and border, never the text color | `.btn-ghost:hover` sets `color: #EDEDED` from `#A1A1A1`, and the rendered `.app-tab:hover` does the same | Both are measured code, so the recipe ships as measured and the contradiction is recorded here. Reading: the ban targets **dimming** on hover (the baseline's "hover that turns text gray"). Ghost and tab labels brighten to full foreground because their idle state is deliberately secondary. Do not extend this to a third case, and do not let it become a lighter-than-`#ededed` value. |
| Toast elevation | `shadows.lg` is documented for "Modals, popovers, dropdowns" | `.toast-box` renders with `--shadow-md`, padding `10px 18px`, `transition: opacity 0.15s ease`, `z-index: 1000`, on `#202020` with a `#383838` border | The kit keeps the measured fill and border, normalizes padding to `12px 16px`, timing to the enter/exit pair, and layer to `z-toast`, because a toast floats and belongs on the ladder with the others. `shadow-lg` replaces the measured `md`. The four measured values are recorded here so the override is visible rather than silent. |
| Kbd text | `.kbd` sets `color: var(--color-text-muted)` | the chip's own fill is `#181818`, where `#737373` measures 3.74:1 | `text-secondary` at 6.87:1. The source value fails the source's own stated floor, so measurement wins over both. |

## 11. Icon family — AUTHORED

The archive ships one decorative `<svg>` and no icon system, so the family was drawn for this
package. It is authored brand work and must never be cited as a source measurement.

| Property | Value | Reason |
| --- | --- | --- |
| Grid | 24×24, live area 20×20 | one grid, three render sizes |
| Stroke | 1.5px, never scaled with the box | a 1px rule is 1.31:1 and reads as a hairline; 2px is the emphasis weight |
| Caps / joins | butt / miter | round caps are the rounded-corner failure in a different coat |
| Geometry | orthogonal plus exact 45° | matches the square architecture; no organic curves |
| Fill | none, except solid square markers | a filled glyph in an outlined set is the mixed-weight failure |
| Color | `currentColor` | the icon inherits the text role, so it can never introduce a hue |
| Sizes | 16 inline in 14px text, 20 default control and nav, 24 empty state and drop target | three steps, no in-between |

`assets/icons/icons.svg` (65 symbols) and `assets/icons/icons.css` (`.mob-icon`, `--16/--20/--24`)
carry the set; `preview/icons.html` renders it. Status glyphs come from the map in 5.2 —
`check`, `alert`, `close`, `clock`, `minus` — and never appear without their word.

Rules an agent will otherwise get wrong:

- A standalone icon button is unnamed to a screen reader unless it carries an `aria-label`. "Settings"
  as a bare gear is not a label.
- An icon inside a text label is `aria-hidden`; the label already names it.
- No icon may be the only carrier of a state. The 1px rule and the selection tint are both below 3:1,
  so state is word + marker, with the icon as reinforcement.
- No animated icon: no spinner, no draw-in, no morph. The source permits motion on three color
  properties and nothing else.
- No emoji, no icon font, no third-party set with round joins, no filled variant of an outlined glyph,
  no accent-colored icon outside the selected and healthy states.
- The clock is a square with two orthogonal hands, not a circle. That is the family's test case: if a
  glyph needs a curve to read, redraw it rather than breaking the rule.

## 12. Overlays and feedback — AUTHORED

Nothing floating exists in the archive except `.toast-box`. `overlays.css` now specifies modal,
destructive confirm, drawer, menu, popover, tooltip bubble, toast, command palette, pagination,
breadcrumbs, avatar, skeleton and empty state, each on its z-index step, each with the focus contract
below.

| Surface | Fill | Elevation | Layer | Scrim |
| --- | --- | --- | --- | --- |
| Modal | `#202020` | `shadow-lg` | `z-modal` | `rgba(0,0,0,.6)` |
| Drawer | `#202020` | `shadow-lg` | `z-drawer` | same |
| Menu / dropdown | `#202020` | `shadow-lg` | `z-dropdown` | none |
| Popover | `#202020` | `shadow-lg` | `z-popover` | none |
| Tooltip | `#202020` | `shadow-lg` | `z-popover` | none |
| Toast | `#202020` | `shadow-lg` | `z-toast` | none |
| Command palette | `#202020` | `shadow-lg` | `z-palette` | `rgba(0,0,0,.6)` |
| Sticky nav | `#121212` | none, 1px bottom rule | `z-sticky` | none |

**The floating frame is `border-strong`, not `border`.** The one measured floating surface,
`.toast-box`, draws its 1px rule at `#383838`, so every layer that lifts off the page — modal, drawer,
menu, the select listbox, the date panel, popover, tooltip, toast, palette — frames at `#383838`.
Inline structure (cards, fields, cells, kbd, checkbox, avatar, pagination, empty state) stays at
`#262626`, which is what the source measures for those. Two sheets disagreed on this during
integration — `.menu` was `#262626` while `.popover` was `#383838` — and the three affected rules were
normalized rather than left as a preference.

A scrim is black alpha held in one token — `--mob-signal-scrim`, `rgba(0,0,0,0.6)` — and the
scrim element fades to full opacity rather than painting a per-component alpha. It never blurs: `backdrop-filter` is banned for the same reason a blurred
gradient blob is. Emphasis steps the border to `#383838`; it never deepens the shadow. A drawer does
not open on top of a modal, and a tooltip never contains an action — that is a popover.

Focus contract, identical for modal, drawer and palette: focus moves to the first control on open,
`Tab` is trapped inside, `Escape` closes, focus returns to the invoker, and the surface carries
`role="dialog"`/`aria-modal` with a labelled heading. Menus and popovers close on `Escape` and on
outside click and keep the trigger's focus. A disabled control receives no pointer or focus event, so
its tooltip's trigger is the wrapper, not the control.

Destructive confirm is the one place the accent is absent: the object is named, the consequence and
recovery window are stated in numbers, the primary action drops to secondary, and the confirm button
takes `#ef4444` on a 30% border with a 10% fill on hover.

## 13. Motion — measured rule plus one amendment

Measured, from `design-system.css`: `--transition-fast: 0.12s cubic-bezier(0.16, 1, 0.3, 1)` on
`background-color`, `border-color` and `color`, and the source sentence *"No scale, no parallax, no
entrance choreography."*

That sentence left overlays undefined, so a dialog appeared with no transition at all. The amendment
is deliberately the smallest one that closes the hole:

| Event | Duration | Easing | Properties allowed |
| --- | --- | --- | --- |
| Hover, press, focus | 0.12s | `cubic-bezier(0.16,1,0.3,1)` | background-color, border-color, color |
| Overlay enter | 0.12s | same | opacity only |
| Overlay exit | 0.08s — 67% of enter | `cubic-bezier(0.7,0,0.84,0)` | opacity only |
| Determinate progress | 0.24s | `cubic-bezier(0.16,1,0.3,1)` | width only |
| List stagger | 0s | — | none |

Reading applied: *opacity is a color channel*, so a fade is inside the measured property list rather
than an exception to it, and no element changes position or size. The amendment modifies the source
sentence's third clause only — choreography (staged multi-element entrances) stays banned, and so do
scale, slide, parallax and blur. The general baseline asks for staggered list entrances at 30-50ms;
this system declines it, which is a recorded departure from the baseline, not from the archive.

`prefers-reduced-motion: reduce` collapses all five rows to 0.01ms through the contract, and nothing
depends on an animation to convey state, so no layout or information changes.

Deliberate absences, stated rather than left to be rediscovered: no indeterminate spinner (a spinner
is an animation that is not `opacity`), no skeleton shimmer (a gradient moving across a block), no
route transition, no count-up on metrics, no scroll-linked effect. Where progress must be shown, the
bar is determinate; where duration is unknown, the copy says so ("Usually 40 seconds", 5.1).

## 14. Data visualisation — AUTHORED

A latency console needs charts and the archive contains none, so the ramp was built from the
registered palette only. No fifth hue may enter a chart.

| Role | Token | Value | Contrast on `#121212` |
| --- | --- | --- | --- |
| Series 1 | `--chart-series-1` | `#38bdf8` | 8.74:1 |
| Series 2 | `--chart-series-2` | `#a1a1a1` | 7.25:1 |
| Series 3 | `--chart-series-3` | `#737373` | 3.95:1 |
| Series 4 | `--chart-series-4` | `#ededed` | 16.00:1 |
| Selected series / threshold crossed | `--chart-series-selected` | `#00cc5c` | 8.73:1 on surface |
| Axis line | `--chart-axis` | `#383838` | 1.60:1 — structural, not information-bearing |
| Gridline | `--chart-grid` | `#181818` | 1.19:1 — same |
| Tick and series label | `--chart-label` | `#a1a1a1` | 7.25:1 |
| Area fill | `--chart-area-fill` | `rgba(56,189,248,0.12)` | under a line, never alone |

Why the accent is excluded from ordinary series: pillar one says the neon marks the action, the
selection and the focus *and nothing else*. A chart where the default line is green
makes the accent decorative. So green means **this is the series you selected** or **this is the
crossing that needs an action** — both are selection or action, never a mood. A chart that reports
health uses the same green and marks the series with its word; a chart that reports a decision
uses the accent as the selected series.

Geometry: 2px lines (a 1px line vanishes against a 1.31:1 rule), 4px **square** markers, square bars
with a 4px minimum gap, 4 y ticks maximum, at most one area fill per plot, no 3D, no gradient, no
rounded anything. Text is JetBrains Mono with `tabular-nums`, right-aligned on the axis, units in the
label rather than repeated in every tick, timestamps in the 12px step at `--chart-label`.

Legibility rule: name the series at the end of the line, not only in a legend — the ramp is three
greys and a blue, and color alone cannot carry identity. Past four series, aggregate or facet; the
pattern fallbacks (`--chart-dash-2`, `--chart-dash-3`) exist for the third and fourth series when a
direct label will not fit, and a dashed error-colored threshold always carries the word (5.1).

`preview/data-viz.html` renders a multi-series line with a selected series, an SLO threshold, a bar
chart with one selected bar, and two sparklines in stat cells.

## 15. Accessibility

### Text and non-text contrast

- Normal text: at least 4.5:1 for WCAG 2.2 AA. Large text: at least 3:1, at 24 CSS px regular or
  18.667 CSS px bold (700+) or larger. A 14px or 18px regular label does not qualify as large text.
- Use foreground or text-secondary for small labels, metadata, placeholders, timestamps and kbd.
  Muted is restricted to disabled/decorative content or qualifying large text with measured 3:1.
- Error `#ef4444` on elevated `#202020` is 4.33:1 and fails normal-text AA. Use `error-text`
  (`#ededed`) for the message with an error-colored marker and explicit corrective words.
- Essential control boundaries use `control-border` (`#737373`), which clears 3:1 on the published
  neutral surfaces. Decorative `border` and `border-strong` do not identify controls on their own.
  The canvas/surface fill difference is only 1.06:1; a different fill alone does not solve this.
- Primary fills use black text. Focus uses the shared 2px canvas offset and 4px accent ring.
- Status includes text and a marker or icon. Selected rows include the accent edge, not tint alone.

### Targets, keyboard and responsive behavior

Fine-pointer targets are at least 24 by 24 CSS px (SC 2.5.8, subject to its exceptions). Coarse-pointer
controls grow to 44px minimum; overlapping invisible extensions are avoided. Decorative 1px rules,
icon metrics and the 6px status marker are not layout spacing or interactive target dimensions.

Native form controls retain their keyboard semantics. Tabs use roving tabindex, linked panels,
Left/Right arrows and Home/End, skipping disabled tabs. Native dialogs support Escape, modal focus
containment and focus restoration. All controls have visible focus and accessible names.

At 320 CSS px, content reflows; dense data tables scroll within their own labelled region.
English and Vietnamese are supported. Vietnamese samples retain complete diacritics, wrapping and
readable line height. Docs are English; CJK and translation are outside the current scope.

The contrast report measures color pairs. Automated checks and demo interactions are evidence
for their tested scope, not a claim of complete WCAG conformance. Manual screen-reader and
magnification testing remain separate activities. Current execution results are in `context/verification.md`.

References: [W3C text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html),
[W3C non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html),
[W3C tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/).

## 16. Layout grid — AUTHORED

The archive supplies a spacing scale but no grid. Two widths are measured — the 1200px console
container and the 48px navigation band — and the rest is authored so a new page stops inventing them.

| Token | Value | Note |
| --- | --- | --- |
| `--breakpoint-sm` | 640px | gutter 48→24, columns 12→8 |
| `--breakpoint-md` | 768px | stat row 4→2, sidebar becomes an overlay drawer |
| `--breakpoint-lg` | 1024px | sidebar returns docked at 240px |
| `--breakpoint-xl` | 1280px | table shows all columns |
| `--breakpoint-2xl` | 1536px | container caps at 1200px; the surplus becomes margin |
| `--container-app` | 1200px | measured |
| `--container-prose` | 920px | under 80 characters at the 16px step |
| `--columns` / `--grid-gap` | 12 / 24px | gap is one step from the measured card padding |
| `--gutter` | 48 / 24 / 16px | three steps, matched to the breakpoints |
| `--nav-height` | 48px | 12 + 24 + 12 |
| `--sidebar-width` | 240px | 60 × 4; wide variant 280px for a filter rail |
| `--drawer-width` | 360px | one column of the 12-grid plus padding |
| `--modal-sm/md/lg` | 480 / 640 / 880px | lg holds a dense table |
| `--popover-max` / `--tooltip-max` | 320 / 240px | |
| `--z-*` | 1 / 10 / 40 / 50 / 100 / 110 / 120 / 130 | raised, sticky, drawer, dropdown, modal, popover, toast, palette |

Fixed chrome reserves its own height: a sticky nav is `position: sticky` with `--nav-height` of
matching padding on the content it covers, so nothing lands under it on scroll. Absolute positioning
stays reserved for corner badges and overlays inside a positioned parent — never for stacking two
content regions. Variable text wraps in an auto-sized block with a clamp, truncates with the full
value reachable in one action, or moves behind a disclosure; a bare `overflow: hidden` is not a plan.

## 17. Brand assets

The supplied M.O.B identity kit in `logos/mob-logo/` is the logo source for M.O.B Signal. The artwork spells M.O.B; the full product name remains M.O.B Signal in interface text. Preserve the supplied outlined letterforms. Do not append Signal to the vector wordmark or reconstruct it using a font. The supplied kit replaces the earlier square placeholder.

### 17.1 Asset selection

| Use | Supplied file | Intrinsic canvas |
| --- | --- | --- |
| Horizontal logo on dark surfaces | `vectors/mob-lockup-dark.svg` | 884 x 256 |
| Horizontal logo on light surfaces | `vectors/mob-lockup-light.svg` | 884 x 256 |
| Single-colour lockups | `vectors/mob-lockup-mono-black.svg`, `vectors/mob-lockup-mono-white.svg` | 884 x 256 |
| Stacked logo | `vectors/mob-lockup-stacked.svg` | 644 x 512 |
| Standalone symbol | `vectors/mob-symbol.svg`, `mob-symbol-dark.svg`, `mob-symbol-light.svg` | 256 x 256 |
| Outlined wordmark | `vectors/mob-wordmark.svg` | 644 x 200 |
| Social cover | `vectors/og-cover.svg` | 1200 x 630 |
| Browser icons | `web-icons/favicon.svg`, `favicon.ico`, `favicon-16.png`, `favicon-32.png`, `favicon-48.png` | SVG 256 x 256; PNG 16/32/48 |
| Apple touch icon | `web-icons/apple-touch-icon.png` | 180 x 180 |
| PWA icons | `web-icons/icon-192.png`, `icon-512.png`, `maskable-512.png` | 192/512/512 square |

Paths above are relative to `logos/mob-logo/`. `logos/manifest.json` records all supplied files and hashes. `assets/logo.svg` is a compatibility copy of the supplied dark lockup. The registered primary uses the light-surface lockup because the brand viewer uses a light tile; this does not introduce a light UI theme.

### 17.2 Usage rules

- Keep natural aspect ratios; horizontal means 884:256, stacked means 644:512. A 1:1 scale means uniform scaling, not forcing every asset into a square. Use height auto and never crop content-bearing artwork.
- Clear space is the pillar width: 40 source units on the 256-unit symbol grid, scaled uniformly. It replaces the provisional fixed 18px rule.
- Minimum widths from the supplied guide: symbol 16px, horizontal lockup 96px, stacked lockup 64px. Print minimums: symbol 6mm, horizontal lockup 25mm.
- Preserve flat fills, square geometry and outlined wordmark paths. No glow, blur, shadow, gradient, rotation, distortion or substituted typography.
- Use supplied monochrome variants, including the full symbol and wordmark. The earlier name-only monochrome restriction no longer applies. Pure white in the supplied mono variants is an asset-specific exception; UI tokens are unchanged.
- Logo artwork uses its supplied 16px construction grid; application layout retains its existing 4px spacing grid.

### 17.3 Integration and limitations

Use relative local paths. `logos/site.webmanifest` adapts the supplied root-absolute icon URLs to this package; the original manifest and head snippet remain unchanged as supplied source files.

All five supplied `png/` files measure 1200 x 1200, including both horizontal lockups and `og-cover.png`. Use the SVG lockups and SVG social cover to preserve the intended canvas. No corrected 1200 x 630 PNG has been produced. The supplied SVGs use shape primitives and outlined paths with no live text; they do not require the placeholder's path-only or font-based reconstruction rules. No AI/PDF print master, rendered clear-space proof or misuse sheet is included. Redistribution licensing is unspecified; record permission before distributing the asset kit separately.

### 17.4 Imagery boundary

The supplied logo kit is permitted identity artwork. Photography and decorative illustration remain outside this design system's imagery policy.

## 18. Licensing and versioning

- **Font licences.** All three localized faces are Google Fonts builds under the **SIL Open Font
  License 1.1**, and OFL requires the notice to travel with the files, so the text is stored verbatim:
  `fonts/licenses/spacegrotesk.OFL.txt`, `plusjakartasans.OFL.txt`, `jetbrainsmono.OFL.txt`, indexed
  by `fonts/licenses.json` with authors, upstream repositories and the reserved-name obligation.
  Space Grotesk — Florian Karsten; Plus Jakarta Sans — Tokotype; JetBrains Mono — Philipp Nurullin /
  JetBrains.
- **Icons** are original geometry authored for this package, `currentColor` inline SVG, no icon font,
  no third-party set, so no additional licence attaches to them. Their provenance is stated in
  `assets/icons/icons.svg` itself and in section 11.
- **Version fields.** `meta.name` in the normalized source copy is *M.O.B Signal* at **source version 4.0.0**
  (unchanged, and not ours to bump). The package is at **1.6.0**, recorded in `CHANGELOG.md`,
  `package.json`, `tokens.measured.json` and the header of this file.
- **Original input digest (compressed file not bundled).** The recorded SHA-256 is `8d9e46cb6d28432e8b6808417b0770b227f81a2f425d9a1601993f06a25c50d1`
  (15,891 bytes), with per-file digests in `tokens.measured.json`. If the digest moves, every
  measured value here is suspect and must be re-derived — that is the whole reason it is recorded.

## 19. Open items

### 19.1 Product-specific additions

Combobox, tree view, date range, multi-select and virtualized table need separate specifications
when a product requires them. The existing gallery does not imply that these components exist.
Billing, team and domain-specific icons may be added when there is a real screen to support.

### 19.2 Scope boundaries

Dark-only, no decorative photography or illustration, no glow and no indeterminate shimmer.
English documentation; English and Vietnamese rendering. No CJK, translated documentation,
published framework library, backend deployment or infrastructure integration is included.

### 19.3 Verification and external dependencies

Screen-reader coverage, browser combinations and zoom behavior require their own evidence.
See `context/verification.md` for actual checked scope and pending checks. No statement here is
a blanket accessibility certification.

The host application can regenerate files independently. Project build and checks repair/detect
the known compatibility exports and remove known unused scaffold; they cannot modify host behavior.
Global app memory/registration is outside this local package build.

### 19.4 Distribution

Use the local HTTP server; `file://` does not reliably load external SVG sprites or modules.
After installing build dependencies, font and browser runtime assets are local. Keep `console.js`
and its license sidecar with the console. Compressed source archives are not bundled.

Original supplied logo PNGs are preserved as received; corrected full-frame raster exports are
under `logos/exports/`. Platform app-icon backing plates may have rounded geometry supplied by the
platform artwork. This exception does not permit rounded UI controls or modification of the mark.
Logo ownership and redistribution rights must be established before public distribution.

## 20. Build and generated layer

1. Edit canonical token values in `tokens.measured.json`; edit component behavior in `assets/components.js`.
2. Run `npm run build` to emit CSS, compatibility exports, local console and full-frame logo PNGs.
3. Run `npm run check:tokens`, `npm test` and `npm run test:browser` for the changed scope.
4. Start the loopback-only server with `npm start` and open the reported local address.

The compatibility sync reads semantic roles from the canonical JSON. Observed legacy literals have
explicit compatibility mappings; unknown values fail the build instead of being silently accepted.
It does not infer meaning by snapping arbitrary colors to the nearest green. Repeated builds write
the same source-derived outputs. Never run a script that copies derived engine CSS over canonical CSS.

The build removes only known unused scaffold paths, after project-containment checks. Supplied logo originals are retained; obsolete extracted references are excluded. No backup folders are created.

