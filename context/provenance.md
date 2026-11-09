# M.O.B Signal Source Context

Provenance for the values in `brand.json`, `DESIGN.md`, `BRAND.md` and `colors_and_type.css`.
Every value here comes from a source file or from measurement; none is inferred from prose.

Package **1.7.0**. The archive's own `meta.version` is **4.0.0** and stays 4.0.0: it describes the
source, not this package.

## Historical inputs

Original archives and extracted reference files are not bundled. Source names and digests are
historical attribution records in `context/provenance.json` and `tokens.measured.json`, not local
file dependencies. The current token contract and shared component sources are the implementation
authority. No source backup or extracted reference copy is retained in this package.

## Method

Values were read directly out of the archive files. Frequency-ranking, computed-style capture, and
DOM/CSS cross-checking were not available: there is no live site, no Figma file, no repository, and
no screenshot in the setup inputs (no external source is available). Every color in this system is therefore
**measured from a source file**, not observed in a browser.

Contrast ratios are computed, not quoted. `context/contrast.mjs` derives the WCAG 2.2 matrix from the
hex values and writes `context/contrast-measured.md`; that report is the reference for every ratio in
the package. All four ratios quoted in `design-system.md` differ from the measured values, and one of
them changes a rule: the muted demotion recorded in `BRAND.md` 15. What remains unmeasured is the part
that needs a live surface: computed styles, rendered font metrics and real interaction timing.

Per-file digests, recorded so a later run can tell whether the source moved:

| File | Bytes | sha256 |
| --- | --- | --- |
| `design-tokens.json` | 7394 | `cefcd0bc344e2ebf39ef8627421aad4688c95085df534eeff6b121dea32087c7` |
| `design-system.css` | 8625 | `09b9455b576dd65a1f795749d2e3b664f0492a3d745df01c104670fb02a40665` |
| `design-system.md` | 7191 | `a7ce64e64e037e96d8942128548b667143a4dbabfc077b5b39d6d13a036be1ab` |
| `design-system-preview.html` | 32242 | `9d154f0d7501e0a6ebaeab158950517769f3202c0282d8f2f7d052173e454048` |
| `design-system-neon-tech.rar` | 15891 | `8d9e46cb6d28432e8b6808417b0770b227f81a2f425d9a1601993f06a25c50d1` |

## Superseded input

The pasted input described a light, rounded placeholder rather than the supplied dark design system. It is not part of the active specification and its raw input notes are not bundled. The rejection is retained as structured metadata in `context/provenance.json`.

## Local fonts

Three variable WOFF2 fonts are bundled with English/Vietnamese glyph coverage. Their current
filenames, upstream URLs and hashes are in `fonts/manifest.json`; the local stylesheet is
`fonts/fonts.css`. License notices are under `fonts/licenses/`.

## Absences

- **Logo:** supplied M.O.B identity kit, localized in `logos/mob-logo/`; current inventory and hashes in `logos/manifest.json`. The original design-token archive did not contain a logo. `brand.json.logo.primary` selects the light-surface lockup for the viewer. `assets/logo.svg` is now a copy of the supplied dark lockup.

- **Imagery:** the system prohibits photography and illustration; `imagery.samples` is empty by design.
- **Compatibility exports:** the project build aligns generated files with the canonical token contract; run the build after external regeneration.

## Authored additions — the register

None of this is in the archive. Each item was written to close a gap the archive left open, is
labelled `authored`, and is reversible: deleting it returns the package to what the evidence
supports. Citing any of it as "what the brand says" overstates the evidence.

| Addition | Basis in the archive | Where |
| --- | --- | --- |
| Icon family, 65 glyphs, 24 grid, 1.5px stroke, butt/miter | The reset bans radius and the prose bans illustration; the square language is measured. The glyphs themselves are not. | `assets/icons/`, `BRAND.md` 11 |
| Ten control recipes (checkbox, radio, switch, slider, select, date, upload, segmented, accordion, progress) | `.btn`, `.card`, `.input`, `.table`, `.badge`, `.kbd` are measured; nothing else is | `components.css`, `BRAND.md` 4.1 |
| Thirteen overlay and feedback recipes | `.toast-box` is the only measured floating surface; `#202020` and `shadow-lg` are measured for elevation | `overlays.css`, `BRAND.md` 12 |
| Tooltip on the overlay sheet | `.tooltip` was defined in two sheets; the overlay sheet defines it and the control sheet defers | `BRAND.md` 4.1 |
| Overlay motion 0.12s in / 0.08s out, opacity only; progress 0.24s on width; stagger 0s | Modifies the archive sentence "No scale, no parallax, no entrance choreography" without touching its first two clauses | `BRAND.md` 13 |
| Chart ramp and geometry | Built only from registered hues plus the measured neutral steps; the accent exclusion follows pillar one | `BRAND.md` 14 |
| Grid, breakpoints, region widths, z-index ladder | 1200px container and 48px nav band are measured; everything else is authored on the 4px scale | `BRAND.md` 16 |
| Copy formulas, status map, formatting rules | Derived from the measured vocabulary list and the sentence-case rule | `BRAND.md` 5.1-5.3 |
| Provisional logo rules and the misuse list | Built from `.app-brand-mark` geometry and the ban on rounding/glow; **not** brand guidance | `BRAND.md` 17 |
| Target-size ruling (32 visual / 24 min / 44 touch) | Resolves the collision between the measured 32px module and the system's own AAA pillar | `BRAND.md` 15 |
| Dark-only declaration | The archive is dark throughout; the light surfaces in the package are engine chrome | `BRAND.md` 1 |
| Measured contrast matrix | Computed from the archive's own hex values, not from a new source | `context/contrast*` |
| OFL 1.1 licence text | Fetched from the upstream projects published in google/fonts | `fonts/licenses/` |

## Provenance summary

Three labels, used identically across `tokens.measured.json`, `context/provenance.json` and this
file. `authored` is the standard term for a gap the archive left open; the label this package used
earlier for that class is retired. No fourth label appears.

| Label | Meaning | Entries in `tokens.measured.json` |
| --- | --- | --- |
| `measured` | Recorded from a file in the archive. | 40 |
| `authored` | Written to close a gap the archive left open; reversible, and labelled wherever it appears. | 35 |
| `corrected` | An archive value replaced on measurement; the original is retained as a recorded value. | 11 |

Eleven entries carry `corrected` because one archive value fans out across dependent roles. The
archive-side corrections number three: two contrast claims and one color value. Each keeps its
original as a recorded value, and no recorded value is live in any role:

- **muted contrast claim** — `#737373` measures 4.18:1 on canvas, not the 4.6:1 the archive quotes, so
  it may not carry 12-14px text. The `.kbd` chip measured at `--color-text-muted` moves to
  `text-secondary`.
- **text-on-primary contrast claim** — `#000000` on the recorded archive volt measures 12.43:1, not the
  14.2:1 quoted; on the live accent it measures 9.79:1. AAA in both cases, so the recipe stands and
  only the number changes.
- **the accent value** — the one archive color this package does not keep. Live `#00cc5c`, with hover
  `#00e065`, active `#00b853`, tint `rgba(0, 204, 92, 0.1)`, and the focus ring and selected chart
  series following. Recorded values: archive `#10e569` and an interim `#00ff5c`; both are history and
  neither may be painted. The measurement behind each step: the archive volt sits at 87% HSL
  saturation (OKLCH C 0.223) at a lightness well above the rest of the palette, and raising chroma
  further on that axis only increases the light the accent emits. The live value holds hue 147° and
  100% sRGB saturation and is banded to the palette lightness range, where C 0.206 is the sRGB chroma
  ceiling for that luminance; relative luminance 0.4396 against info 0.4401 and warning 0.4389. Black
  ink on it stays AAA at 9.79:1, and accent as text on canvas measures 9.23:1. `success` is an alias
  of the accent rather than a second colour: two greens 2.8° apart measure 1.24:1, below the 3:1
  non-text floor, so a near-miss pair reads as a defect. The difference between an action and a health
  state is carried by word, shape and icon, which is what WCAG 1.4.1 requires. `BRAND.md` 1.1 carries
  the full argument.
