---
name: mob-signal
description: Build dark-mode web interfaces using M.O.B Signal design tokens, CSS variables, and shared components. Use when building dark UI layouts, applying M.O.B styling, or implementing token-driven interfaces.
user-invocable: true
---

# M.O.B Signal implementation guidance

Read BRAND.md and the relevant component recipe before editing. Use the supplied
M.O.B artwork; the product name is M.O.B Signal. Never retype or extend the logo.

## Tokens

- tokens.measured.json is the authority. Edit values there, then run npm run build.
- Load colors_and_type.css, components.css and overlays.css in that order.
- The build emits compatibility tokens and local assets. Run npm run check:tokens
  after external generation; the host can overwrite files outside this build.
- Dark-only. Square UI geometry; supplied platform icon backing plates are an
  artwork exception. Use the spacing scale, semantic roles and z-index ladder.
- Use primary for action, selection, focus and selected chart series. Success
  aliases primary; show its visible status word and semantic marker.
- Info is an independent semantic role. Do not derive meaning from hue alone.

## Components and behavior

- Reuse shared classes; keep page CSS limited to composition and intentional examples.
- Use native inputs, selects, radios, checkboxes and dialogs when their behavior fits.
- assets/components.js initializes tabs. Supply linked tab panels for product
  content; generated gallery panels are explicitly labelled sample content.
- The local React console is an editable example, not a backend integration or
  published framework library. Actions modify sample data only.
- Serve pages with npm start. Do not rely on file:// SVG sprite loading.

## Readability and accessibility

- Normal text needs 4.5:1 AA; large text needs 3:1 at 24 CSS px regular or
  18.667 CSS px bold (700+). Font size alone does not repair a failing small label.
- Use secondary for small metadata, placeholders and kbd. Reserve muted for
  disabled/decorative content or qualifying large text with measured contrast.
- Error messages use error-text with an error marker; essential control
  boundaries use control-border. Low-contrast decorative rules are insufficient.
- Primary fills use text-on-primary. Preserve the shared visible focus ring.
- Fine-pointer targets are at least 24px; coarse-pointer controls grow to 44px
  without overlapping hit areas. Respect reduced motion and content reflow.
- English and Vietnamese are supported by the bundled variable fonts. Keep the
  font licenses. Documentation remains English; CJK is outside the scope.

## Delivery

Run the targeted checks for the change. Record what actually ran, what passed
and what remains pending. Do not claim complete WCAG compliance or browser
verification from a token-name scan. See context/verification.md for evidence.
Do not put conversation history or personal preferences in the specification.
