<div align="center">

<img src="logos/mob-logo/vectors/mob-lockup-dark.svg" alt="M.O.B Signal" width="420" />

# M.O.B Signal

[![Node.js](https://img.shields.io/badge/node-%3E%3D24.0.0-brightgreen.svg)](https://nodejs.org)
[![React](https://img.shields.io/badge/react-18.3.1-blue.svg)](https://react.dev)
[![Version](https://img.shields.io/badge/version-1.5.0-black.svg)](package.json)
[![License](https://img.shields.io/badge/license-Proprietary-red.svg)](LICENSE)

<p>A reusable dark-mode web design system providing canonical token variables, shared component stylesheets, and local variable fonts with Vietnamese glyph coverage.</p>

</div>

## Key Features

- Canonical JSON tokens generating color, typography, shape, and spacing CSS custom properties.
- Shared component stylesheets for buttons, fields, controls, cards, and modal overlays.
- Three bundled variable fonts (Space Grotesk, Plus Jakarta Sans, JetBrains Mono) with full Latin and Vietnamese coverage.
- Standalone tab initialization helper with WAI-ARIA keyboard navigation support.
- Local verification test suite for token integrity, WCAG contrast ratios, and browser regressions.
- Interactive service console application demonstrating component composition with local sample data.

## Installation

Prerequisites: Node.js 24 LTS and npm.

```bash
git clone <repository-url>
cd mob-design-system
npm ci
npm run build
npm start
```

The local development server serves module galleries and component previews at `http://127.0.0.1:4173/`.

## Usage

Import the stylesheets in the designated cascade sequence:

```html
<link rel="stylesheet" href="colors_and_type.css">
<link rel="stylesheet" href="components.css">
<link rel="stylesheet" href="overlays.css">
<script src="assets/components.js" defer></script>
```

To modify design tokens, update values in `tokens.measured.json` and execute `npm run build`. The build pipeline regenerates CSS variables, compatibility tokens, and logo assets.

## API Reference

### `MobSignal.initTabs(root)`

Initializes tablist elements within the document or a specified DOM node.

**Parameters:**
- `root` (`Document | HTMLElement`, optional): Target DOM container. Defaults to `document`.

**Behavior:**
Binds keyboard navigation (`ArrowLeft`, `ArrowRight`, `Home`, `End`) to elements with `role="tab"`, associates panels through `aria-controls`, and manages `aria-selected` state.

## Verification

```bash
npm run check:tokens   # Validate canonical tokens and local asset references
npm run contrast       # Verify WCAG AA and AAA luminance contrast ratios
npm test               # Execute native Node.js unit and regression tests
npm run test:browser   # Run Playwright browser integration checks
```

## Project Structure

| Path | Purpose |
| :--- | :--- |
| `tokens.measured.json` | Source of truth for token values and measurements |
| `colors_and_type.css` | Generated token custom properties stylesheet |
| `components.css` | Shared component recipes and layouts |
| `overlays.css` | Modal dialog, tooltip, and popover styling |
| `assets/components.js` | Framework-neutral tab navigation script |
| `fonts/` | Local variable fonts, manifest, and font licenses |
| `logos/` | Source vector SVGs and exported raster PNG assets |
| `ui_kits/app/` | Interactive React service console demo |
