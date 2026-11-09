# Verification evidence

Scope: M.O.B Signal design system package v2.0.0.
This report records executed checks. It is not a certification of every product
that may use these tokens.

| Check | Result | Evidence |
| :--- | :--- | :--- |
| Project build | PASS | Canonical CSS, compatibility exports, local console bundle, PNG geometry and guide copy emitted successfully |
| Static package regression | PASS | 8 tests: compatibility values, canonical CSS values, local page resources and loaded variables, font glyphs/hashes, essential contrast, preserved logo hashes, PNG geometry, obsolete scaffold |
| Node targeted regression | PASS | Canonical exports, unknown reference rejection, intentional drift rejection, semantic alias propagation, WCAG arithmetic, logo geometry, local server assets/private paths |
| Token contract | PASS | 37 showcase pages resolve 100% against declared tokens in tokens.measured.json |
| Google Labs designmd lint | PASS | 0 errors, 0 warnings across all 8 canonical DESIGN.md sections |
| Component registry integrity | PASS | All declared components exist, contain valid types, and strictly adhere to 0px border-radius |
| Motion/theme | PASS | Reduced-motion token and dark-only behavior enforced |
| Supplied artwork | PASS | All original file hashes remain equal to the supplied manifest |
| Running local server | PASS | npm start binds to 127.0.0.1; showcase hub and preview pages render without errors |
| Actual screen reader | PENDING | No NVDA, JAWS or VoiceOver session was run |
| Other browsers | PENDING | Firefox, WebKit and mobile devices were not tested |
| Visual review at zoom | PENDING | No manual visual or screen-magnifier review was performed |
| Public redistribution | N/A | The package remains private; supplied logo redistribution rights are not established here |

## Reproduction

```sh
npm ci
npm run build
npm run check:tokens
npm test
npm start
```

## Boundaries

- Color-pair measurements do not prove every composited or downstream state.
- The build repairs known compatibility exports and removes known unused scaffold.
- Original logo PNGs are retained as received. Corrected exports are separate
  files in logos/exports/; the source artwork is not distorted or redrawn.
