# M.O.B Signal Bundled References

This directory contains standalone assets and implementations bundled with the `mob-signal` agent skill. Use these reference files to inspect, copy, or scaffold M.O.B Signal styling directly into any target application without requiring the npm package.

## Directory Structure

```text
references/
├── README.md             # This directory guide
├── tailwind.css          # Tailwind CSS v4 @theme configuration & 0px radius reset
├── colors_and_type.css   # Foundation CSS variables (:root) and font definitions
├── utils.ts              # Class merger helper (cn) using clsx + tailwind-merge
├── registry.json         # shadcn/ui component registry and dependency manifest
└── components/           # 28 zero-radius React/TypeScript UI primitives
```

## Reference Manifest

| File / Folder | Purpose | Consumer Setup |
| :--- | :--- | :--- |
| `tailwind.css` | Semantic color tokens, 4px spacing, zero-radius resets | Import or paste into `globals.css` after `@import "tailwindcss";` |
| `colors_and_type.css` | Hex tokens, surface hierarchy, font families | Import or paste into application CSS entry point |
| `utils.ts` | Exported `cn(...inputs)` utility function | Copy to `@/lib/utils.ts` (install `clsx` and `tailwind-merge`) |
| `registry.json` | Manifest declaring Radix dependencies for all 28 components | Inspect before adding components to know required npm packages |
| `components/` | 28 square UI primitives (`button.tsx`, `input.tsx`, `card.tsx`...) | Copy needed files directly to `@/components/ui/<name>.tsx` |

## 28 Bundled UI Primitives
- **Actions:** `button.tsx`
- **Forms:** `input.tsx`, `textarea.tsx`, `label.tsx`, `checkbox.tsx`, `radio-group.tsx`, `select.tsx`, `switch.tsx`, `slider.tsx`
- **Display:** `card.tsx`, `table.tsx`, `badge.tsx`, `avatar.tsx`, `skeleton.tsx`, `progress.tsx`, `separator.tsx`, `aspect-ratio.tsx`
- **Navigation:** `tabs.tsx`, `accordion.tsx`, `collapsible.tsx`, `breadcrumb.tsx`
- **Feedback:** `alert.tsx`, `tooltip.tsx`
- **Overlays:** `dialog.tsx`, `alert-dialog.tsx`, `sheet.tsx`, `popover.tsx`, `dropdown-menu.tsx`
