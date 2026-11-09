---
name: mob-signal
description: Build dark-mode web interfaces, engineering consoles, dashboards, and data-dense UI using M.O.B Signal design tokens, Tailwind CSS v4 @theme, and square shadcn/ui components. Use whenever styling UI components, implementing forms, dense data tables, modal dialogs, status badges, or applying M.O.B Signal styling.
user-invocable: true
---

# M.O.B Signal Design System & shadcn/ui Guide

M.O.B Signal is an engineering-first, dark-only design system. It combines strict square geometry (0px radius), dense information architecture, and a disciplined single neon green accent (`#00cc5c`) reserved exclusively for primary actions, selection, focus, and healthy operational states.

---

## 1. Quickstart & Installation

### Option A: Modern Tailwind CSS v4 Project (Recommended)
In your global CSS file (e.g. `src/styles/globals.css` or `app/globals.css`):
```css
@import "tailwindcss";
@import "mob-signal/dist/tailwind.css";
@import "mob-signal/dist/colors_and_type.css";
```

### Option B: shadcn/ui Configuration
Ensure `components.json` is configured to use M.O.B Signal tokens:
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

### Option C: Vanilla HTML
```html
<link rel="stylesheet" href="node_modules/mob-signal/fonts/fonts.css" />
<link rel="stylesheet" href="node_modules/mob-signal/dist/colors_and_type.css" />
<link rel="stylesheet" href="node_modules/mob-signal/dist/components.css" />
```

---

## 2. Core Tokens & Utility Classes

| Role | Hex / Value | Tailwind v4 Class | Semantic Usage |
| :--- | :--- | :--- | :--- |
| **Primary** | `#00cc5c` | `bg-primary`, `text-primary`, `border-primary` | Primary action, active selection, focus ring, healthy status |
| **Primary Hover** | `#00e065` | `hover:bg-primary-hover` | Button hover state |
| **Primary Active**| `#00b853` | `active:bg-primary-active` | Button pressed state |
| **Primary Subtle**| `rgba(0,204,92,0.1)`| `bg-primary-subtle` | Table row selection, selected card fill |
| **Text on Primary**| `#000000`| `text-primary-foreground` | High-contrast black text on green buttons |
| **Background** | `#0a0a0a` | `bg-background` | Root canvas |
| **Surface** | `#121212` | `bg-surface` | Cards, panels, sidebars |
| **Surface Subtle**| `#181818` | `bg-surface-subtle` | Table headers, secondary buttons |
| **Surface Elevated**| `#202020`| `bg-surface-elevated` | Modal dialogs, dropdown popovers |
| **Border** | `#262626` | `border-border` | Default structural divider |
| **Border Strong** | `#383838` | `border-border-strong` | Active boundaries, card outlines |
| **Foreground** | `#ededed` | `text-foreground` | Primary body text, headings |
| **Text Secondary**| `#a1a1a1`| `text-text-secondary` | Labels, captions, table headers |
| **Muted** | `#737373` | `text-muted` | Disabled elements, non-essential metadata |
| **Success** | `#00cc5c` | `text-success` | Healthy operational status (aliases primary) |
| **Warning** | `#f59e0b` | `text-warning` | Pending, degrading, warning state |
| **Error** | `#ef4444` | `text-error`, `bg-error` | Critical errors, destructive actions |
| **Info** | `#38bdf8` | `text-info` | Informational callouts, links |

### Typography & Fonts
- **Display**: Space Grotesk (`font-display`) — headings, hero numbers.
- **Body**: Plus Jakarta Sans (`font-sans`) — interface labels, body text.
- **Monospace**: JetBrains Mono (`font-mono`) — console logs, metrics, code, status badges.

### Absolute Square Geometry
- **Rule**: Every element must have `rounded-none` (0px border-radius). Never use `rounded-sm`, `rounded-md`, or `rounded-full`.

---

## 3. Component Implementation Patterns (React + TypeScript)

### 3.1 Button Component
```tsx
import { Button } from "@/components/ui/button";

// Primary Action (Signal Green)
<Button variant="primary">Deploy Service</Button>

// Secondary Action (Subtle Surface)
<Button variant="secondary">Cancel</Button>

// Destructive Action
<Button variant="danger">Terminate Node</Button>

// Outline / Ghost
<Button variant="outline">Export Logs</Button>
<Button variant="ghost">Dismiss</Button>
```

### 3.2 Form Input & Field Layout
Always pair inputs with a high-contrast label and hint/error:
```tsx
import { Input } from "@/components/ui/input";

<div className="flex flex-col gap-1.5">
  <label htmlFor="service-name" className="text-xs font-mono uppercase tracking-wider text-text-secondary">
    Service Identifier
  </label>
  <Input
    id="service-name"
    placeholder="e.g. auth-gateway-sg"
    aria-describedby="service-hint"
  />
  <p id="service-hint" className="text-xs text-muted">
    Alphanumeric characters only. Stored locally in browser.
  </p>
</div>
```

### 3.3 Status Badges
Status indicators must always include a semantic label and dot marker:
```tsx
import { Badge } from "@/components/ui/badge";

<Badge variant="operational">HEALTHY</Badge>
<Badge variant="warning">DEGRADED</Badge>
<Badge variant="error">FAILED</Badge>
<Badge variant="info">SYNCHRONIZING</Badge>
<Badge variant="neutral">OFFLINE</Badge>
```

### 3.4 Dense Data Table
For console views and metric lists:
```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Cluster</TableHead>
      <TableHead>Region</TableHead>
      <TableHead className="text-right">Latency</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow selected>
      <TableCell className="font-mono font-medium">prod-us-east-1</TableCell>
      <TableCell className="text-text-secondary">Virginia</TableCell>
      <TableCell className="text-right font-mono">14ms</TableCell>
      <TableCell><Badge variant="operational">ACTIVE</Badge></TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-mono font-medium">prod-eu-west-1</TableCell>
      <TableCell className="text-text-secondary">Frankfurt</TableCell>
      <TableCell className="text-right font-mono">82ms</TableCell>
      <TableCell><Badge variant="warning">DRAINING</Badge></TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### 3.5 Modal Dialog
```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

<Dialog>
  <DialogTrigger asChild>
    <Button variant="primary">New Deployment</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Deploy New Service</DialogTitle>
      <DialogDescription>
        Configure target environment and container image parameters.
      </DialogDescription>
    </DialogHeader>
    <div className="py-4">
      {/* Form content */}
    </div>
    <DialogFooter>
      <Button variant="secondary">Cancel</Button>
      <Button variant="primary">Confirm Deploy</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

---

## 4. Accessibility & Quality Rules

1. **Contrast Compliance (WCAG 2.1 AA/AAA)**:
   - Body text on canvas: `#ededed` on `#0a0a0a` achieves **16.9:1** (exceeds AAA).
   - Secondary text: `#a1a1a1` on elevated surfaces achieves **6.3:1** (exceeds AA).
   - Text on Primary: `#000000` on `#00cc5c` achieves **9.8:1** (exceeds AAA).
   - Do NOT use `#737373` (muted) for small functional labels — it achieves 4.18:1 (fails 4.5:1 AA).
2. **Focus Rings in Forced-Colors**:
   - Interactive elements must retain transparent outline fallbacks for Windows High Contrast Mode:
     `forced-colors:focus-visible:outline forced-colors:focus-visible:outline-2 forced-colors:focus-visible:outline-[Highlight]`.
3. **Touch Targets**:
   - Controls must satisfy at least 24px for fine pointers and 44px for touch interfaces without distorting the square aesthetic.

---

## 5. Anti-Patterns (Do's and Don'ts)

- ❌ **DON'T**: Apply border radius (`rounded`, `rounded-md`, `rounded-full`). Square geometry is non-negotiable.
- ❌ **DON'T**: Use `transition: all`. Use scoped transitions (e.g. `transition-colors duration-150`).
- ❌ **DON'T**: Build a light theme. M.O.B Signal is strictly dark-only.
- ❌ **DON'T**: Use `#00cc5c` as a decorative or generic border. Reserve it for primary actions, active focus, and healthy status.
- ❌ **DON'T**: Rely on hue alone to convey status. Always combine colors with text labels (`HEALTHY`, `FAILED`) and dot markers.
