---
name: mob-signal
description: Build dark-mode web interfaces, engineering consoles, dashboards, and data-dense UI using M.O.B Signal design tokens, Tailwind CSS v4 @theme, and square shadcn/ui components. Use whenever styling UI components, implementing forms, dense data tables, modal dialogs, status badges, or applying M.O.B Signal styling.
user-invocable: true
---

# M.O.B Signal

Dark-only UI system. 0px border radius, 4px spacing grid. Green (`#00cc5c`) is reserved for primary actions, selection, focus, and operational health.

## 1. Quickstart & Imports

### Tailwind CSS v4
```css
@import "tailwindcss";
@import "mob-signal/dist/tailwind.css";
@import "mob-signal/dist/colors_and_type.css";
```

### shadcn/ui Config (`components.json`)
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
```

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
| **Surface Elevated**| `#202020`| `bg-surface-elevated` | Modals, popovers |
| **Border** | `#262626` | `border-border` | Default structural border |
| **Border Strong** | `#383838` | `border-border-strong` | Card bounds |
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
- `rounded-none` (0px border-radius) on all elements.

## 3. Component Patterns (React + TypeScript)

### Button
```tsx
import { Button } from "@/components/ui/button";

<Button variant="primary">Deploy Service</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="danger">Terminate Node</Button>
<Button variant="outline">Export Logs</Button>
<Button variant="ghost">Dismiss</Button>
```

### Form Input
```tsx
import { Input } from "@/components/ui/input";

<div className="flex flex-col gap-1.5">
  <label htmlFor="service-name" className="text-xs font-mono uppercase tracking-wider text-text-secondary">
    Service Identifier
  </label>
  <Input
    id="service-name"
    placeholder="auth-gateway-sg"
    aria-describedby="service-hint"
  />
  <p id="service-hint" className="text-xs text-muted">
    Stored locally in browser.
  </p>
</div>
```

### Status Badge
```tsx
import { Badge } from "@/components/ui/badge";

<Badge variant="operational">HEALTHY</Badge>
<Badge variant="warning">DEGRADED</Badge>
<Badge variant="error">FAILED</Badge>
<Badge variant="info">SYNCHRONIZING</Badge>
<Badge variant="neutral">OFFLINE</Badge>
```

### Data Table
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

### Dialog
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
      <DialogTitle>Deploy Service</DialogTitle>
      <DialogDescription>Configure environment and image parameters.</DialogDescription>
    </DialogHeader>
    <div className="py-4">
      {/* Form content */}
    </div>
    <DialogFooter>
      <Button variant="secondary">Cancel</Button>
      <Button variant="primary">Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## 4. Accessibility Rules

- Body text: `#ededed` on `#0a0a0a` (16.9:1).
- Secondary text: `#a1a1a1` on `#202020` (6.3:1).
- Text on primary: `#000000` on `#00cc5c` (9.8:1).
- `#737373` (muted) is 4.18:1 against `#0a0a0a`. Do not use for functional text smaller than 24px regular or 18.667px bold.
- Focus ring: `focus-visible:ring-2 focus-visible:ring-primary forced-colors:focus-visible:outline forced-colors:focus-visible:outline-2 forced-colors:focus-visible:outline-[Highlight]`.
- Target size: minimum 24px for fine pointers, 44px for touch.

## 5. Constraints

- Geometry: 0px border-radius (`rounded-none`). No rounded corners.
- Transitions: scoped properties only (`transition-colors`). Never `transition: all`.
- Theme: dark-only.
- Accent: `#00cc5c` is reserved for action, selection, focus, and healthy status. Do not use for generic borders or decoration.
- Status: pair color with visible text (`HEALTHY`, `FAILED`) and dot markers.
