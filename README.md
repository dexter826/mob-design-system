<div align="center">

<img src="logos/mob-logo/vectors/mob-lockup-dark.svg" alt="M.O.B Signal" width="420" />

# M.O.B Signal

[![Node.js](https://img.shields.io/badge/node-%3E%3D24.0.0-brightgreen.svg)](https://nodejs.org)
[![React](https://img.shields.io/badge/react-18.3.1-blue.svg)](https://react.dev)
[![Version](https://img.shields.io/badge/version-1.6.0-black.svg)](package.json)
[![License](https://img.shields.io/badge/license-Proprietary-red.svg)](LICENSE)

<p>A dark, square UI system for engineering consoles, built around dense data, operational states, and one disciplined green signal.</p>

</div>

## Design Showcase

| Buttons & Actions | Form Controls |
| :---: | :---: |
| ![Buttons](preview/sections/01-buttons.png) | ![Form Controls](preview/sections/02-form-controls.png) |
| **Cards & Pricing** | **Navigation & Tabs** |
| ![Cards & Pricing](preview/sections/03-cards.png) | ![Navigation](preview/sections/05-navigation.png) |
| **Data Display & Tables** | **Color Palette** |
| ![Data Display](preview/sections/06-data-display.png) | ![Color Palette](preview/sections/04-colors.png) |

## Features

- JSON tokens that compile to CSS variables for color, typography, shape, and spacing.
- Component stylesheets for buttons, inputs, controls, cards, and modal dialogs.
- Three bundled variable fonts covering Latin and Vietnamese text.
- Standalone tab script with WAI-ARIA keyboard navigation.
- Local test suite for token consistency, WCAG contrast ratios, and browser regressions.
- React service console running against local sample data.

## Installation

Prerequisites: Node.js 24 LTS and npm.

```bash
git clone https://github.com/dexter826/mob-design-system.git
cd mob-design-system
npm ci
npm run build
npm start
```

Install as an AI agent skill:

```bash
npx skills add dexter826/mob-design-system
```

The local development server serves previews at `http://127.0.0.1:4173/`.

## Usage

Load the stylesheets in this order:

```html
<link rel="stylesheet" href="colors_and_type.css">
<link rel="stylesheet" href="components.css">
<link rel="stylesheet" href="overlays.css">
<script src="assets/components.js" defer></script>
```

Edit tokens in `tokens.measured.json`, then run `npm run build` to update the CSS variables, compatibility tokens, and logo assets.

### Tailwind CSS v4

Import `tailwind.css` into your application stylesheet:

```css
@import "tailwindcss";
@import "mob-signal/tailwind.css";
```

This exports all canonical semantic colors (`bg-primary`, `text-foreground`, `bg-surface`, `border-border`), font families (`font-sans`, `font-display`, `font-mono`), 4px spacing scale, and resets all radius utilities (`--radius-*`) to `0px`.

## API

### `MobSignal.initTabs(root)`

Initializes tablist elements within the document or a given DOM node.

**Parameters:**
- `root` (`Document | HTMLElement`, optional): Target container. Defaults to `document`.

**Behavior:**
Binds arrow and navigation keys to elements with `role="tab"`, links panels via `aria-controls`, and handles `aria-selected` attributes.

## Verification

```bash
npm run check:tokens   # Validate canonical tokens and local asset paths
npm run contrast       # Verify WCAG AA and AAA color luminance ratios
npm test               # Run native Node.js unit and regression tests
npm run test:browser   # Run Playwright browser integration checks
```

## Reference

| Path | Purpose |
| :--- | :--- |
| `tokens.measured.json` | Token source values and measurements |
| `colors_and_type.css` | Generated token custom properties |
| `tailwind.css` | Generated Tailwind CSS v4 `@theme` design tokens |
| `components.css` | Shared component styles |
| `overlays.css` | Modal dialog, tooltip, and popover styles |
| `assets/components.js` | Framework-neutral tab navigation script |
| `fonts/` | Local variable fonts, manifest, and licenses |
| `logos/` | Vector SVG sources and raster PNG exports |
| `ui_kits/app/` | React service console demo |
