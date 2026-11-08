# M.O.B Signal

![M.O.B artwork](logos/mob-logo/vectors/mob-lockup-dark.svg)

A reusable dark-mode web design system with shared CSS and browser behaviors.
The package includes English documentation and English/Vietnamese UI examples.

## Features

- Canonical JSON tokens generate color, typography, shape and spacing variables.
- Shared controls, overlay recipes and keyboard-operated tabs.
- Interactive service console with clearly labelled local sample data.
- Three bundled variable fonts with Vietnamese glyph coverage and OFL notices.
- Supplied logo vectors and generated full-frame PNG exports.
- Targeted consistency, contrast and browser regression checks.

## Installation

Install Node.js 22 or 24 LTS and npm. In the project folder, run:

```sh
npm ci
npm run build
npm start
```

Open http://127.0.0.1:4173/ in a browser. The same commands work on Windows.
The server binds only to this computer. Stop it with Ctrl+C.

Installation needs internet. After installation and build, viewing the gallery
and console requires no CDN or internet connection. Keep the whole package
for offline use; local fonts, console.js and its license sidecar are required.
Use the local server rather than opening HTML with file://.

## Usage

Open index.html for the module gallery or ui_kits/app/index.html for the console.
The console changes sample data only; it does not deploy real services.
Demo settings persist in this browser. Do not enter secrets.

Load the shared styles in this order:

```html
<link rel="stylesheet" href="colors_and_type.css">
<link rel="stylesheet" href="components.css">
<link rel="stylesheet" href="overlays.css">
<script src="assets/components.js" defer></script>
```

Use the existing classes instead of duplicating button, field, badge and focus
recipes in each page. See BRAND.md section 4 for component ownership.

Edit token values in tokens.measured.json. Run npm run build to emit CSS,
compatibility tokens, console code and logo PNGs. Do not edit those outputs.
External generators can bypass this build: rebuild after external regeneration.
The package cannot modify the host application's generator or global memory.

## Checks

```sh
npm run check:tokens
npm test
npm run test:browser
```

The browser checks use installed Microsoft Edge. Install Edge or install the
Playwright Chromium browser with npx playwright install chromium beforehand.
Checks fail with a nonzero exit code; missing browser setup is not a pass.
Actual execution evidence and remaining limits are in context/verification.md.
A passing check is scoped evidence, not complete WCAG certification.

## Reference

| Path | Purpose |
| :--- | :--- |
| BRAND.md / guide.md | Specification and identical guide copy |
| DESIGN.md / brand.json | App-facing design-system description |
| tokens.measured.json | Canonical token values and provenance |
| colors_and_type.css | Generated token stylesheet |
| components.css / overlays.css | Shared component recipes |
| assets/components.js | Framework-neutral tab behavior |
| ui_kits/app/ | Editable React console source and local bundle |
| fonts/ | Local variable fonts, source hashes and font licenses |
| logos/mob-logo/ | Preserved supplied logo originals |
| logos/exports/ | Correctly proportioned generated PNGs |
| context/contrast-measured.md | Current token-pair measurements |

## API

MobSignal.initTabs(root) initializes tablists within a document or element.
Call it after dynamically inserting a tab group. Each tab needs role="tab";
provide aria-controls pointing to its labelled panel for production content.
If a panel is absent, the gallery helper creates explicitly labelled sample content.
Arrows and Home/End select enabled tabs; Tab leaves the group for its panel.

This private package is not a published framework library. Font and dependency
license notices remain bundled; logo redistribution requires ownership clearance.
