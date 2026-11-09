# Verification evidence

Scope: M.O.B Signal package remediation, unreleased changes on package 1.5.0.
This report records executed checks. It is not a certification of every product
that may use these tokens.

| Check | Result | Evidence |
| :--- | :--- | :--- |
| Project build | PASS | Canonical CSS, compatibility exports, local console bundle, PNG geometry and guide copy were emitted successfully |
| Static package regression | PASS | 8 tests: compatibility values, canonical CSS values, local page resources and loaded variables, font glyphs/hashes, essential contrast, preserved logo hashes, PNG geometry, obsolete scaffold |
| Node targeted regression | PASS | 7 tests, 0 failures/skips: canonical exports, unknown reference rejection, intentional drift rejection, semantic alias propagation, WCAG arithmetic, logo geometry, local server assets/private paths |
| Browser interaction | PASS | Chromium headless: local-only requests, filter, sample deployment creation, Vietnamese settings save/reload, Escape and focus return, canceled reset, keyboard tabs |
| Responsive scope | PASS | Gallery, console, accessibility, button and input pages at 1440, 768 and 320 CSS px; no document-level horizontal overflow |
| Motion/theme | PASS | Reduced-motion token and dark-only behavior under a light system preference |
| Supplied artwork | PASS | All 32 original file hashes remain equal to the supplied manifest |
| Running local server | PASS | npm start launched successfully; 2 HTTP regression tests passed for pages/assets, MIME types, protected paths and missing files |
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
npx playwright install chromium --only-shell
npm run test:browser
npm start
```

The browser test prefers installed Microsoft Edge, falling back to Playwright
Chromium. It rejects requests outside the local test server rather than relying
on an internet connection. The server binds to 127.0.0.1 only.

Tests in this execution used the required filtered test launcher. Windows crypto
and Winsock initially failed before any test ran. The project Windows runner
queries the Windows directory through the OS API and supplies only SystemRoot
in addition to the filtered platform keys. It does not restore parent secrets.
The native browser-control connector was unavailable; the successful browser
evidence above comes from the installed headless Chromium test runner.

The Python fallback static suite uses fontTools and Brotli from the existing
Python installation; these are maintenance-test dependencies, not browser runtime
dependencies. The main package and normal npm checks require Node, not Python.

## Boundaries

- Browser reflow evidence covers the five named pages, not every legacy demo.
- Color-pair measurements do not prove every composited or downstream state.
- The build repairs known compatibility exports and removes known unused scaffold.
  A host generator can overwrite project files independently; rebuild and check
  after such changes. This package does not modify global application memory.
- Original logo PNGs are retained as received. Corrected exports are separate
  files in logos/exports/; the source artwork is not distorted or redrawn.
