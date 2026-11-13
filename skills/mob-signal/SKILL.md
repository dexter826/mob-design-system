---
name: mob-signal
description: Build dark-mode web interfaces, engineering consoles, dashboards, and data-dense UI using M.O.B Signal design tokens, Tailwind CSS v4 @theme, and square shadcn/ui components. Make sure to use this skill whenever the user mentions M.O.B, MOB Signal, engineering console, dark dashboard, telemetry, terminal-like web UI, dense data tables, square buttons or inputs, zero-radius UI, or green operational accent styling, even if they do not explicitly name the design system.
user-invocable: true
---

# M.O.B Signal

Dark-only UI system. 0px border radius, 4px spacing grid. Green (`#00cc5c`) is reserved for primary actions, selection, focus, and operational health.

## 1. Quickstart & Imports

### Standalone / Direct Usage (No npm package installed)
When `mob-signal` is not installed as an npm dependency in the target project, use the bundled reference files in `references/`:
- **Tailwind CSS v4 theme**: copy tokens and resets from `references/tailwind.css` into your CSS entrypoint (e.g., `globals.css`).
- **Design Tokens**: copy CSS custom properties from `references/colors_and_type.css`.
- **Utility Helper (`cn`)**: copy `references/utils.ts` to `@/lib/utils.ts` (requires `npm i clsx tailwind-merge`).
- **UI Components**: copy needed components directly from `references/components/<name>.tsx` into `@/components/ui/<name>.tsx`.
- **Dependencies**: consult `references/registry.json` for required Radix UI packages for each component.

### Package Imports (When `mob-signal` is installed via npm)
```css
@import "tailwindcss";
@import "mob-signal/dist/tailwind.css";
@import "mob-signal/dist/colors_and_type.css";
```

### shadcn/ui Configuration (`components.json`)
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "dist/tailwind.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui"
  }
}
```

### Vanilla HTML
```html
<link rel="stylesheet" href="node_modules/mob-signal/fonts/fonts.css" />
<link rel="stylesheet" href="node_modules/mob-signal/dist/colors_and_type.css" />
<link rel="stylesheet" href="node_modules/mob-signal/dist/components.css" />
<link rel="stylesheet" href="node_modules/mob-signal/dist/overlays.css" />
```

---

## 2. Tokens & Utilities

| Role | Hex | Tailwind v4 Class | Usage |
| :--- | :--- | :--- | :--- |
| **Primary** | `#00cc5c` | `bg-primary`, `text-primary`, `border-primary` | Action, selection, focus ring, healthy status |
| **Primary Hover** | `#00e065` | `hover:bg-primary-hover` | Button hover |
| **Primary Active**| `#00b853` | `active:bg-primary-active` | Button active |
| **Primary Subtle**| `rgba(0,204,92,0.1)`| `bg-primary-subtle` | Table row selection, selected fill |
| **Text on Primary**| `#000000`| `text-primary-foreground` | Black ink on primary green |
| **Background** | `#0a0a0a` | `bg-background` | Root canvas |
| **Surface** | `#121212` | `bg-surface` | Cards, panels |
| **Surface Subtle**| `#181818` | `bg-surface-subtle` | Table headers, secondary buttons |
| **Surface Elevated**| `#202020`| `bg-surface-elevated` | Modals, popovers, sheets |
| **Border** | `#262626` | `border-border` | Default structural border |
| **Border Strong** | `#383838` | `border-border-strong` | Card bounds, focus bounds |
| **Foreground** | `#ededed` | `text-foreground` | Body text, headings |
| **Text Secondary**| `#a1a1a1`| `text-text-secondary` | Labels, table headers |
| **Muted** | `#737373` | `text-muted` | Disabled elements, non-text hints |
| **Success** | `#00cc5c` | `text-success` | Healthy operational status (aliases primary) |
| **Warning** | `#f59e0b` | `text-warning` | Warning state |
| **Error** | `#ef4444` | `text-error`, `bg-error` | Errors, destructive actions |
| **Info** | `#38bdf8` | `text-info` | Informational callouts, links |

### Typography
- Space Grotesk (`font-display`): headings, metrics.
- Plus Jakarta Sans (`font-sans`): labels, body text.
- JetBrains Mono (`font-mono`): console, code, status badges.

### Geometry
- `rounded-none` (0px border-radius) on all elements. Rounded classes are strictly forbidden.

---

## 3. UI Primitive Catalog (28 Components)

| Component | Path | Category | Description |
| :--- | :--- | :--- | :--- |
| `Button` | `@/components/ui/button` | Actions | Triggers: primary, secondary, outline, ghost, danger, link |
| `Input` | `@/components/ui/input` | Forms | Text input field with green focus ring |
| `Textarea` | `@/components/ui/textarea` | Forms | Multiline input with optional error state |
| `Label` | `@/components/ui/label` | Forms | Accessible label in uppercase monospace |
| `Checkbox` | `@/components/ui/checkbox` | Forms | Square 16x16 checkbox with green fill |
| `RadioGroup` | `@/components/ui/radio-group` | Forms | Square radio buttons with square indicator |
| `Select` | `@/components/ui/select` | Forms | Dropdown select with options and scroll buttons |
| `Switch` | `@/components/ui/switch` | Forms | Square sliding toggle with green active track |
| `Slider` | `@/components/ui/slider` | Forms | Horizontal range track with square thumb |
| `Card` | `@/components/ui/card` | Display | Panel container with Header, Title, Content, Footer |
| `Table` | `@/components/ui/table` | Display | Dense operational data table with row selection |
| `Badge` | `@/components/ui/badge` | Display | Status badges: operational, warning, error, info, neutral |
| `Avatar` | `@/components/ui/avatar` | Display | Square profile container with fallback initials |
| `Skeleton` | `@/components/ui/skeleton` | Display | Loading placeholder pulse on dark surface |
| `Progress` | `@/components/ui/progress` | Display | Linear progress bar with green indicator |
| `Separator` | `@/components/ui/separator` | Display | Horizontal or vertical 1px divider rule |
| `AspectRatio` | `@/components/ui/aspect-ratio` | Display | Fixed aspect ratio container |
| `Tabs` | `@/components/ui/tabs` | Navigation | Accessible tablist with 2px active underline |
| `Accordion` | `@/components/ui/accordion` | Navigation | Collapsible disclosure sections |
| `Collapsible` | `@/components/ui/collapsible` | Navigation | Simple expandable container |
| `Breadcrumb` | `@/components/ui/breadcrumb` | Navigation | Navigation hierarchy path |
| `Alert` | `@/components/ui/alert` | Feedback | Status callout banner with colored border-left |
| `Tooltip` | `@/components/ui/tooltip` | Feedback | Instant contextual tooltip on elevated surface |
| `Dialog` | `@/components/ui/dialog` | Overlays | Modal dialog with scrim backdrop and focus trap |
| `AlertDialog` | `@/components/ui/alert-dialog` | Overlays | Confirmation dialog for destructive actions |
| `Sheet` | `@/components/ui/sheet` | Overlays | Slide-out side drawer from 4 screen edges |
| `Popover` | `@/components/ui/popover` | Overlays | Anchored floating container |
| `DropdownMenu` | `@/components/ui/dropdown-menu` | Overlays | Contextual action menu with submenus |

---

## 4. Component Patterns (React + TypeScript)

### Form Group (Label + Input + Hint)
```tsx
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

<div className="flex flex-col gap-1.5">
  <Label htmlFor="cluster-id">Cluster Identifier</Label>
  <Input id="cluster-id" placeholder="us-east-prod-01" />
  <span className="text-xs text-muted font-sans">Must match service naming convention.</span>
</div>
```

### Controls (Checkbox + Switch)
```tsx
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

<div className="flex items-center gap-2">
  <Checkbox id="auto-drain" />
  <Label htmlFor="auto-drain">Enable automated node draining</Label>
</div>

<div className="flex items-center gap-2">
  <Switch id="debug-logs" />
  <Label htmlFor="debug-logs">Stream verbose debug logs</Label>
</div>
```

### Metrics Card
```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

<Card>
  <CardHeader className="flex flex-row items-center justify-between pb-2">
    <CardTitle className="text-sm font-medium font-mono text-text-secondary">P99 LATENCY</CardTitle>
    <Badge variant="operational">HEALTHY</Badge>
  </CardHeader>
  <CardContent>
    <div className="text-2xl font-bold font-mono tracking-tight text-foreground">14.2ms</div>
    <p className="text-xs text-text-secondary mt-1">-1.8ms from previous interval</p>
  </CardContent>
</Card>
```

### Modal Drawer (Sheet)
```tsx
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

<Sheet>
  <SheetTrigger asChild>
    <Button variant="secondary">Open Diagnostics</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Node Telemetry</SheetTitle>
      <SheetDescription>Real-time socket streams and error traces.</SheetDescription>
    </SheetHeader>
    <div className="py-4">
      {/* Telemetry output */}
    </div>
  </SheetContent>
</Sheet>
```

---

## 5. Accessibility Invariants

- Normal text: minimum 4.5:1 against background (`#ededed` on `#0a0a0a` is 16.9:1).
- Accent text: `#000000` is the only permitted label color on `#00cc5c` fill (measures 9.8:1). White on accent is forbidden.
- Focus ring: `focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none`.
- Target size: minimum 24px for fine pointers, 44px for coarse pointers.
- Non-color indicator: Operational states must pair hue with explicit text and geometric markers.

---

## 6. Constraints

- Geometry: 0px border-radius (`rounded-none`). No rounded corners allowed anywhere.
- Transitions: scoped properties only (`transition-colors`). Never `transition: all`.
- Theme: dark-only (`color-scheme: dark`).
- Accent: `#00cc5c` is strictly reserved for action, selection, focus, and operational health.
