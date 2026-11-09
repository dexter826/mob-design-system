# M.O.B Signal — Design System Technical Handoff (v2.0.0)

This document specifies the technical contract and architectural handoff for consumers implementing M.O.B Signal UI components and design tokens in production environments.

## 1. System Overview & Core Directives

M.O.B Signal is an enterprise-grade dark UI design system for engineering consoles, observability dashboards, and data-dense applications.

- **Theme**: Dark mode only (`color-scheme: dark`).
- **Geometry**: Strict 0px border-radius (`--radius: 0px`, `rounded-none`). Rounded corners are forbidden on all UI controls.
- **Palette Signal**: Single green accent `#00cc5c` (`--color-primary`) reserved for active triggers, selections, focus rings, and healthy operational states.
- **Base Grid**: 4px modular spacing rhythm (`--space-1` to `--space-12`).
- **Typography**: Localized fonts (Space Grotesk for display/headers, Plus Jakarta Sans for UI labels/body, JetBrains Mono for code/tabular metrics).

---

## 2. Architecture & File Locations

| Directory / File | Contract | Description |
| :--- | :--- | :--- |
| `dist/colors_and_type.css` | Output CSS | Canonical `:root` CSS custom properties (color tokens, typography, radii, spacing, elevation). |
| `dist/components.css` | Output CSS | Shared pure CSS component recipes (buttons, inputs, cards, tables, badges). |
| `dist/overlays.css` | Output CSS | Shared overlay surfaces (dialogs, drawers, popovers, tooltips). |
| `dist/tailwind.css` | Output CSS | Native Tailwind CSS v4 `@theme` export mapping all design tokens. |
| `dist/tokens/*.json` | Output JSON | W3C / DTCG token compatibility exports (default, compact, dark). |
| `src/styles/*.css` | Source CSS | Authoritative source stylesheets compiled to `dist/`. |
| `registry/registry.json` | Registry API | shadcn CLI compatible component distribution manifest. |
| `registry/default/ui/*.tsx` | React UI Kit | Pure Radix UI + CVA + Tailwind UI primitives (0px radius). |
| `showcase/index.html` | Portal | Centralized Showcase Hub and Interactive Component Catalog. |
| `showcase/pages/*.html` | Demos | 17 comprehensive specification and audit preview pages. |
| `showcase/app/` | Console | Applied React engineering console demonstrator. |
| `scripts/*.mjs` | Tooling | Build pipelines, token audit scripts, contrast calculations, and linters. |

---

## 3. Responsive & Viewport Matrix

Implementation must validate without document-level horizontal overflow across the following viewports:
- Mobile Compact: 320px – 375px
- Mobile Standard: 390px – 430px
- Tablet Portrait: 768px – 820px
- Laptop / Desktop: 1024px – 1440px
- Wide Console: 1920px+

Tables and code blocks must retain localized horizontal scrolling with labelled regions when viewport boundaries are constrained.

---

## 4. Accessibility & Contrast Invariants

- **Text Contrast**: AAA (16:1+) on canvas for primary text (`#ededed` on `#0a0a0a`).
- **Accent Contrast**: Black ink (`#000000`, `--color-primary-foreground`) is the only permitted foreground on `#00cc5c` (measures 9.8:1). White text on accent is strictly forbidden.
- **Focus Rings**: Mandatory 2px offset focus ring (`focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none`).
- **Touch Targets**: Minimum 24px for fine-pointer environments, 44px for coarse-pointer touch devices.
- **State Semantics**: Operational states must pair color with explicit text labels and geometric markers (never color alone).

---

## 5. Component Registry & Installation

Consumers in React / Next.js / Vite projects import components directly via the shadcn CLI:

```bash
# Add foundational primitives
npx shadcn add https://raw.githubusercontent.com/dexter826/mob-design-system/main/registry/registry.json/button
npx shadcn add https://raw.githubusercontent.com/dexter826/mob-design-system/main/registry/registry.json/input
npx shadcn add https://raw.githubusercontent.com/dexter826/mob-design-system/main/registry/registry.json/dialog
```

For vanilla web applications:
```html
<link rel="stylesheet" href="mob-signal/dist/colors_and_type.css" />
<link rel="stylesheet" href="mob-signal/dist/components.css" />
<link rel="stylesheet" href="mob-signal/dist/overlays.css" />
```
