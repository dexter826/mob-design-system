# Changelog

All notable changes to the M.O.B Signal package are documented in this file. The format
follows Keep a Changelog.

**Version scheme.** The *package* version belongs to this bundle and moves when its rules or files
move. The *source* version is `meta.version` inside `design-tokens.json`; it is never bumped here
and currently reads 4.0.0. The archive digest is the tie between them: `design-system-neon-tech.rar`,
`8d9e46cb…c50d1`, with per-file digests in `scripts/provenance.md`.

**Provenance tags.** `measured` = copied out of the archive. `authored` = written to close a gap the archive left open, reversible. `corrected` = the archive states something measurement disproved. Every ratio in
this file is the value recorded in `scripts/contrast-measured.md`.

## 2.0.0 - 2026-11-09

### Breaking Changes
- Move source CSS to `src/styles/` and compiled exports to `dist/`.
- Remove compiled CSS from root; update `package.json` `exports` to resolve from `./dist/*`.

### Added
- Add shadcn/ui custom registry (`components.json`, `src/lib/utils.ts`, `registry/default/ui/*.tsx`).
- Consolidate preview and showcase pages into `showcase/`.
- Update `SKILL.md` with component templates and token usage guidelines.

### Removed
- Remove `playwright` dependency and browser mock tests.

## 1.7.0 - 2026-11-09

### Added
- Standardized `DESIGN.md` conforming 100% to Google Labs specification (`google-labs-code/design.md`).
- Automated `DESIGN.md` generator in `scripts/design-md-from-brand.mjs` emitting YAML frontmatter tokens and canonical 8 sections.
- Google Labs official linter tooling `@google/design.md` via `npm run lint:design`.
- Automated test coverage in `tests/package.test.mjs` verifying canonical outline and token definitions.

## 1.6.0 - 2026-11-08

### Added
- Native Tailwind CSS v4 `@theme` design tokens in `tailwind.css` with 0px radius reset and 4px spacing scale.
- Package export `./tailwind.css` in `package.json` for seamless Tailwind v4 integration.

### Fixed
- Preserve focus ring visibility in Windows High Contrast Mode (`forced-colors`) via transparent outline fallbacks on interactive elements and icon buttons.
- Expand touch target area for 16px checkbox, radio, and switch inputs to meet 24px fine and 44px coarse pointer standards without breaking brand square geometry.
- Replace `transition: all` anti-pattern with scoped property transitions across showcase kit and artifacts.
- Convert fake `<a role="button">` links in component kit to native `<button type="button">`.

### Fixed
- Generate canonical CSS and synchronize compatibility values from one token contract; fail on unknown compatibility colors.
- Correct large-text thresholds, small metadata contrast, error copy and essential control boundaries.
- Share component recipes in the console and provide linked tab panels with keyboard navigation.
- Replace runtime CDNs with local fonts and a precompiled console bundle; include Vietnamese glyph coverage.
- Export full-frame logo PNGs with correct aspect ratios; preserve supplied originals.

### Added
- Windows-compatible loopback server, reproducible dependency lockfile and targeted regression checks.
- Interactive local-data console actions, storage error handling and English/Vietnamese examples.


### Removed
- Obsolete extracted source reference folder and its local-path dependencies; compact historical attribution metadata is retained.
- Compressed design and logo input archives, superseded pasted-input notes, unused template scaffold, and project-local Windows cache files. Supplied logo assets remain available.

### Added
- Supplied M.O.B logo kit, asset provenance and local web-icon integration for M.O.B Signal.

### Changed
- Replace provisional square logo guidance with the supplied geometry, spacing, minimum sizes and monochrome variants.
- Use SVG lockups and social cover; supplied PNG exports are square rather than the intended horizontal/social canvases.

## 1.5.0 - 2026-11-08

### Changed
- Display identity is M.O.B Signal; registered design-system id remains `user:product`.
- Package slug is `mob-signal`, CSS token prefix is `--mob-signal-`, and authored component prefix is `mob-`. Consumers of the former prefixes must update their references together.
- Preserve the exact M.O.B Signal spelling in wordmarks and interface copy. Original archive metadata retains its source identity.

## 1.4.0 - 2026-11-08

Normalization pass over the documentation layer; no live token value changed.

### Changed
- Package documentation (`BRAND.md`, `README.md`, `DESIGN.md`, `SKILL.md`, `guide.md`,
  `scripts/provenance.md`, `CHANGELOG.md`) rewritten as impersonal change records: what changed and
  the measured reason. Editorial narration and editing-session timestamps are removed from the
  package text.
- Retired values moved out of live tables. `#00ff5c` (interim 1.2.0 accent) and `#10e569` (the
  archive volt) appear only as history: `interimValue` / `archiveValue` in `tokens.measured.json`
  and the history rows of `scripts/contrast-measured.md`. Neither may be painted by a recipe.
- `scripts/contrast-measured.md` recorded as the single authority for ratios; other documents quote
  it instead of restating numbers independently.
- Section numbering 1–20 in `BRAND.md` is unchanged, so existing section cross-references in every
  document continue to resolve.
- Provenance vocabulary unified to three labels — `measured`, `authored`, `corrected`. `extrapolated`
  is no longer used as a label anywhere in the package, including the generated documentation layer.
- `BRAND.md` 19 restructured into open items, exclusions by decision, mechanisms to watch and shipped
  limitations; a part map added to the header. Sections 11, 12, 14 and 16 are labelled AUTHORED.
- The eight app-side scoring rules rewritten as impersonal checks with the measured figures, so no
  rubric item describes a conversation or names a decision-maker.
- Hue separation between the accent and the information colour recorded as 83.2 degrees; 86 degrees
  described the retired interim accent.
- White on the accent added to the measured report at 2.14:1, alongside the existing 1.83:1 for the
  foreground colour, so the prohibition on light ink is measured rather than asserted.
- `scripts/engine-token-sync.mjs` snaps any derived green to the nearest published accent stop in
  OKLab instead of enumerating hexes, so a ten-step derived ramp collapses onto `#00b853`, `#00cc5c`
  and `#00e065` and a future seed change needs no new mapping row.
- The same pass now reports any 6-digit hex in the generated layer that is neither a brand value nor
  listed viewer chrome, and names what it does not recolour. `system/artifacts/email.html` keeps a
  template call-to-action with white ink and a 2px border; the audit reports it and BRAND.md 19.4
  records it rather than the pass silently restyling a generated page.
- `BRAND.md` 8 records the derived values measured from the layer written by the latest finalize
  (`#1fba60` primary, `#daa02d` warning, `#d86460` error, `#56b6da` info, radius steps 1px and 2px)
  and the two `grep` commands that re-measure them, replacing numbers carried over from older seeds.
- Dead scaffold removed again: `src/`, `system/scripts/apply-design-tokens.mjs` and the five orphan
  chat components under `ui_kits/app/components/` (verified unreferenced by the kit entry point).

### Fixed
- Ratios and counts in the documentation re-checked against `scripts/contrast-measured.md` and
  `scripts/token-check.mjs`; where prose disagreed with the report, the report wins.
- `scripts/engine-token-sync.mjs` extended: it now re-asserts the brand description, the first
  messaging pillar and the icon geometry contract (butt caps, miter joins, 1.5px stroke) over the
  generated pages, which previously kept template copy and round-capped glyphs. Run the same way;
  `npm run sync:engine` wraps it.
- `scripts/design-md-from-brand.mjs` added: regenerates `DESIGN.md` from `brand.json` in the
  engine's document shape, so the canonical rules file stays coherent with the registry without
  `od brand finalize`, which also rewrites the hand-maintained reuse layer.

### Removed
- Regenerated dead scaffold re-deleted: `src/`, `system/scripts/apply-design-tokens.mjs`, and the
  five orphan chat components under `ui_kits/app/components/`. The generation pass recreates them,
  so deletion is a standing step after every finalize rather than a closed item (`BRAND.md` 19).
- Conversation-derived history removed from `BRAND.md` 1.1, 1.2 and the open-items table; the value
  changes those paragraphs described are recorded here and under 1.3.0 and 1.2.0 below.

## 1.3.0 - 2026-11-08

Accent moved onto the palette's luminance band; the second green retired.

### Changed
- Accent `#00ff5c` → `#00cc5c` to bring the role colour onto the same luminance band as info and
  warning: 0.4396 against info 0.4401 and warning 0.4389. `#00ff5c` was the only role colour outside
  its band at 0.7229 — 64% more light than anything else on the canvas, on a filled 32px CTA that is
  the largest single area of accent in the system.
- `#00cc5c` holds hue 147 (HSL) and 100% sRGB saturation at OKLCH 0.738, C 0.206 — the gamut ceiling
  at that lightness, so no chroma was traded for grey; 9.23:1 on canvas. For green in sRGB chroma and
  luminance are coupled at this hue, so glare falls only with lightness.
- Stops recomputed against the new base rather than inherited: hover `#00e065`, active `#00b853`,
  tint `rgba(0, 204, 92, 0.1)`, focus ring `0 0 0 2px #0a0a0a, 0 0 0 4px #00cc5c`, selected chart
  series `#00cc5c`.
- `--color-success` declared `var(--mob-signal-primary)` — an alias, so it cannot drift back
  into a second hue. Recipes still name `--color-success` for health: the name declares intent, while
  the word, the 6px square and the icon carry the distinction WCAG 1.4.1 asks for.
- Sources: `colors_and_type.css`, `tokens.measured.json` (history rows `accent-band`, `success-merge`),
  `brand.json` (accent hex and oklch, usage text, `accent-secondary` renamed System Info Blue, seed
  `colorPrimary`/`colorSuccess`, pillar 1, logo ink, focus and status posture rules).
- Generated layer: `scripts/engine-token-sync.mjs` ROLES and LITERALS re-pointed, then re-run over
  `system/**` and `brand.html`; `brand.html` re-rendered through `od brand preview`; the brand
  description and messaging pillar patched in the six artifact pages and `system/index.html`.
- Cards and kit: 485 accent-family literals and 67 volt declarations swept across 37 files, then 53
  stale ratio literals and 31 narrative sentences rewritten.
- Specs: `BRAND.md` 1.1 rewritten around the two corrections, new 1.2 on the green-and-blue chromatic
  pair, sections 4/5/7/8/10/14/15/17/19/20 aligned; `DESIGN.md`, `README.md`, `SKILL.md`, `guide.md`,
  `scripts/provenance.md`, `scripts/provenance.json` and `scripts/contrast-measured.md` regenerated.
- Known limit: `od brand finalize` derives 218 tokens from a 20-key seed, so the generated layer is
  off-brand the moment it is written and `scripts/engine-token-sync.mjs` must run after it. The
  derived green for the 1.3.0 seed is unmeasured, because measuring it requires finalize, which
  overwrites the hand-kept reuse layer; the LITERALS table still records 1.2.1 observations and must
  be re-measured after any future finalize.

### Fixed
- Hover `#26ff7a` measured 1.01:1 against its own base, leaving every primary button with no visible
  hover state. A state step must now clear 1.2:1, and `scripts/contrast.mjs` prints all four pairs
  so the retired step stays checkable.
- The two-green pair measured against itself: `#00ff5c` against `#10e569` at 1.24:1 and 2.8 degrees of
  hue, and the active state `#00e04e` at 1.06:1 from the Operational volt — a pressed button was the
  same colour as a healthy service. Clearing the 3:1 non-text floor between two greens is unavailable
  in principle: it needs luminance 0.157 or below (a muddy `#007d00`) or 1.815, which sRGB does not
  emit. The second green was retired rather than re-tuned.
- Black ink on the accent measured 9.79:1 base, 11.85:1 hover, 7.98:1 active — AAA at every stop.
- White on the accent is 1.83:1 and illegal at any size. Deepening improved it from 1.16:1, but no
  neon green admits white ink: white would need the fill below 0.157 luminance. `#000000` remains the
  only label colour on an accent fill.

### Removed
- `#00ff5c` as a live value; retained as `interimValue` in `tokens.measured.json` so a later run can
  tell which package a file was written against. The historical input remained intact in that release and `#10e569`
  stays recorded as the archive value.

## 1.2.1 - 2026-11-08

Engine layer re-asserted; dead files deleted a second time.

### Added
- `scripts/engine-token-sync.mjs`, which re-asserts `tokens.measured.json` over 16 generated files.
  Idempotent, so it runs after every `od brand finalize` in place of documenting the drift. The open
  item "engine color derivation" moves from open to post-passed (`BRAND.md` 19, `BRAND.md` 20).

### Changed
- Audit at that release: 121 files at the project root scope, one copy of the archive, no dead
  scaffold.
- `brand.html`'s light viewer chrome is not converted — panel, rules and status pill are the app's
  surface, not a brand mode (`BRAND.md` 20).

### Fixed
- 41 of 42 `--brand-color-*` definitions in the generated layer were off-brand, because the reuse
  layer was corrected in 1.2.0 while everything the app previews (`system/kit.html`,
  `kit.dark.html`, `system/index.html`, the six artifact pages, the token dumps) still rendered the
  engine's derivation: accent `#24da60`, hover `#4be779`, active `#1ea94c`, success `#31cf6d`, text
  `#cbcbcb`, secondary text `#9e9e9e`, tertiary `#707070`, border `#333333`, elevated `#1c1c1c`,
  layout `#131313`, info and link `#56b6da`, warning `#daa02d`, error `#d86460`. All now resolve to
  measured values.
- `colorBgLayout`/`colorBgContainer` were inverted — cards sat on the canvas and the page above them.
  Now canvas `#0a0a0a`, surface `#121212`.
- `borderRadiusXS/SM/LG` shipped as `1/2/2` against a strict 0px rule → all `0`.
- 27 inline sites set `color:#fff` on an accent fill, which the brand disallows at any size. Scoped
  swap to `#000000`, the only ink the brand allows on the accent.

### Removed
- antd's `presets` object (13 hue ramps × 10 steps, `#1677ff` among them) and the `--brand-presets-*`
  declarations: zero consumers, no value in the brand set.
- `src/`, `system/scripts/apply-design-tokens.mjs` and the five orphan chat components, regenerated by
  the generation pass after 1.2.0 deleted them; `BRAND.md` 19 records the recurrence as a standing
  cost.
- The 16-file memory backup under `%LOCALAPPDATA%/Temp/od-memory-backup-20261108-121005/`; no file in
  this package depends on it.

## 1.2.0 - 2026-11-08

Accent corrected, success split out of it, dead files removed.

### Added
- `scripts/contrast.mjs` rewritten for two greens, plus an OKLCH colour-geometry table stating the
  chroma argument in numbers; `scripts/contrast-measured.md` regenerated from it.
- `BRAND.md` 17 rewritten as an 18-file logo deliverable manifest — names, canvases, formats, usage,
  the technical gate (outlined text, no filter or glow, 0px, 1.5px stroke floor, accent ink) and the
  wiring list for when the files land. `brand.json.logo.notes` carries the same in short.
  `logo.primary` stays `null`: no mark was drawn.
- Binding use rule: at 100% saturation and L 0.871 the accent halates, so it never carries text below
  14px, never a wash, never a glow.

### Changed
- `corrected`: accent `#10e569` → `#00ff5c`, hover → `#26ff7a`, active → `#00e04e`, tint →
  `rgba(0, 255, 92, 0.1)`, focus ring and selected chart series with it. The archive volt read as
  pale, and measurement located the cause in chroma rather than contrast: OKLCH C 0.223 → 0.262 at a
  held hue of 147°, while the volt already sat at 11.72:1 on canvas. Black on the accent measured
  15.46:1 and the accent on canvas 14.57:1, both AAA.
- Hover and active recomputed rather than inherited, since a hover lifted from the old volt would have
  fallen below the other stops; all three button stops kept a black label above 11.77:1.
- `success` split out as its own token keeping the archive volt `#10e569`, with `success-subtle`
  `rgba(16, 229, 105, 0.1)` — operational volt, action neon. Reversed by 1.3.0.
- `components.css` and `overlays.css` header contracts no longer list "healthy status" as an accent
  use; the pillar sentence is reworded in `brand.json`, `DESIGN.md` and `SKILL.md`.
- Extracted source references were retained in that release; they are excluded from the current package.
- The reuse layer was hand-corrected; `od brand finalize` was not run, because it regenerates the
  placeholder layer this package repairs.

### Fixed
- Five status/action colour confusions of that class: `ui_kits/app` `.badge-success`,
  `preview/icons` `.badge--operational`, `preview/content-patterns` `.badge--operational`,
  `preview/accessibility` `.b-ops`, and `MetricsRow` trend tone.
- Three 12px `.eyebrow` labels were accent-coloured without being action, selection or focus;
  repainted `text-secondary`.
- The selected-row tint is below the 3:1 needed to convey state alone, so the 2px leading accent edge
  stays mandatory and the tint remains decoration.

### Removed
- 9 paths, ~30 KB: `src/` (`assets/README.md` plus an unreferenced `design-system-reference.tsx`, zero
  references anywhere), `system/scripts/apply-design-tokens.mjs` (zero references, and it copied the
  *derived* `system/variables.css` onto a target sheet — a mechanism for injecting off-brand colour),
  and `assets/design-system-neon-tech.rar`, md5-identical to the root copy. The archive now exists
  once, at the project root, and every document points at that path.
- Five orphan chat components from `ui_kits/app/components/` (`Sidebar`, `ChatArea`, `InputBar`,
  `MessageBubble`, `AssistantsList`): unreachable, off-brand, and previously restored by the engine
  template — `BRAND.md` 19 keeps that as a watch item.

## 1.1.0 - 2026-11-08

The eleven gaps closed. Nothing previously measured changed except where measurement contradicted it;
each such case is marked `corrected`.

### Added
- `scripts/contrast.mjs` and `scripts/contrast-measured.md`: the WCAG 2.2 matrix for every text and
  ground pair, including alpha-composited badge fills and row hover.
- `colors_and_type.css`: grid and region widths, a z-index ladder, the overlay motion pair, chart
  tokens, icon metrics, target sizes, status geometry, `--scrim`, `--stagger`, public aliases for all
  of it, a `prefers-color-scheme: light` guard and a `prefers-reduced-motion` block.
- `tokens.measured.json`: hand-kept source of truth, every entry tagged measured / authored /
  corrected and carrying the archive digest, which resolves the two-sources-of-truth problem.
- `scripts/token-check.mjs`: proves every `var(--x)` in the package resolves — 204 properties defined
  and 163 referenced in that release, zero unresolved.
- `authored` — `assets/icons/icons.svg` (65 symbols on a 24 grid, 1.5px stroke, butt caps, miter
  joins, `currentColor`) and `assets/icons/icons.css` (`.mob-icon`, three sizes, pairing and naming
  rules), with `preview/icons.html` as the gallery and the status-glyph map.
- `authored` — `components.css` adds checkbox, radio (square), switch (square), slider, select,
  date picker, file upload, tabs, segmented control, accordion, progress, the tooltip trigger and the
  invalid/required/disabled field trio, each with default / hover / focus-visible / pressed / disabled
  and error where applicable. `overlays.css` adds modal, destructive confirm, drawer, menu, popover,
  tooltip bubble, toast, command palette, pagination, breadcrumbs, avatar, skeleton and empty state,
  each on its z-index step with a focus contract. `preview/components-controls.html` and
  `preview/components-overlays.html` demonstrate them operably.
- `authored` — motion: overlays fade on opacity only, 0.12s in and 0.08s out, reading the source's
  "no entrance choreography" as banning staged motion rather than a fade; progress determinate at 0.24s
  on `width`; stagger 0s, recorded as a departure from the general baseline. No spinner, shimmer, slide
  or scale.
- `authored` — charts: a four-step ramp on secondary blue plus the neutrals, accent reserved for
  the selected series or a threshold crossing. 2px lines, 4px square markers, ≤4 y ticks, direct end
  labels; `preview/data-viz.html` renders line, bar and sparkline.
- `authored` — layout: 12 columns, 24px gap, breakpoints 640/768/1024/1280/1536, container
  1200/920, nav 48px with matching content reserve, sidebar 240, drawer 360, modal 480/640/880, popover
  320, tooltip 240, and the z ladder; `preview/layout-grid.html` shows them to scale.
- `authored` — copy: sentence formulas for empty state, field error, action failure, destructive
  confirm, success, long wait and unknown state; the status map binding word + marker + shape + icon;
  formatting rules for hashes, latency, quotas, counts, timestamps, regions, sizes and plurals.
- Brand assets: provisional lockup rules (18px clear space, 14px minimum, 96px minimum width, 1:1,
  monochrome means name-only, no inverted variant) and a misuse list in which each item names the rule
  it breaks. `logo.primary` remains `null`: a mark cannot be authored from evidence.
- Licensing and versioning: SIL OFL 1.1 text fetched for all three faces into `fonts/licenses/`, with
  `fonts/licenses.json` recording authors, upstreams and the reserved-name obligation. Package version
  recorded in `package.json`, `CHANGELOG.md`, `tokens.measured.json` and `BRAND.md`; archive digest
  `8d9e46cb…c50d1` with per-file digests, so a later run can tell whether the source moved.
- Dark-only declared as a rule with a CSS guard.
- Component ownership split across files — tokens / controls / overlays, one stylesheet defining each
  component.
- Commitments stated: AAA contrast, AA plus touch target. Target size split — 32px visual, ≥24px
  pointer target with 8px clear space, 44px on a coarse pointer through an invisible extension
  (`authored`).

### Changed
- `corrected`: `#737373` on `#0a0a0a` measures 4.18:1, not the 4.6:1 the source claims, so it fails AA
  for body text. `muted` is demoted to placeholders, disabled text, 18px+ metadata and non-text
  markers.
- `authored`: a 1px rule measures 1.31:1 and a selected-row tint does not reach 3:1, so a control
  must also differ from its surrounding fill and selection requires a 2px accent edge.
- `brand.html`'s light surfaces are named as engine chrome rather than a mode.

### Fixed
- Quoted ratios replaced with measured ones: `#000000` on the accent 12.43:1 (claimed 14.2:1, still
  AAA), `#ededed` 16.91:1 and `#a1a1a1` 7.66:1, both above the claimed values.
- `components.css` and `overlays.css` both defined `.tooltip`; found while integrating the ownership
  split. The bubble belongs to `overlays.css` alone and the controls card points at it.

## 1.0.0 - 2026-11-08

The reuse layer corrected.

### Changed
- Programmatic finalize had written the reusable layer with generic defaults: white surfaces, cream
  panels, radius 6/10/16, Inter, an uppercase eyebrow, `#fff` on the accent fill, a rounded "KS"
  monogram and vietnamese-subset font faces reused across weights. Replaced by hand.
- `colors_and_type.css` rewritten to measured values; ten faces re-downloaded as latin subsets; nine
  review cards restated on the dark canvas; `ui_kits/app` rebuilt as the service console the source
  actually renders, with five chat files removed; `assets/logo.svg` reduced to a labelled placeholder;
  `BRAND.md` sections 9–10 added.
- `od brand finalize` was not re-run: it regenerates and overwrites that whole layer from templates.
  `od brand preview` is safe and was run.
