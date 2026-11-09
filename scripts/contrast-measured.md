# Contrast measurements

Generated from current tokens. Opaque color pairs only; this is not full WCAG certification. Composite states need browser checks.

Normal text requires 4.5:1 AA. Large text requires 3:1: at least 24 CSS px regular or 18.667 CSS px bold (700+). Essential non-text indicators require 3:1 against adjacent colors.

| Foreground | Background | Ratio | Small text AA |
|---|---|---:|---|
| foreground #ededed | canvas #0a0a0a | 16.91:1 | Pass |
| foreground #ededed | surface #121212 | 16.00:1 | Pass |
| foreground #ededed | elevated #202020 | 13.92:1 | Pass |
| foreground #ededed | hover #222222 | 13.59:1 | Pass |
| secondary #a1a1a1 | canvas #0a0a0a | 7.66:1 | Pass |
| secondary #a1a1a1 | surface #121212 | 7.25:1 | Pass |
| secondary #a1a1a1 | elevated #202020 | 6.31:1 | Pass |
| secondary #a1a1a1 | hover #222222 | 6.16:1 | Pass |
| muted #737373 | canvas #0a0a0a | 4.18:1 | Fail |
| muted #737373 | surface #121212 | 3.95:1 | Fail |
| muted #737373 | elevated #202020 | 3.44:1 | Fail |
| muted #737373 | hover #222222 | 3.36:1 | Fail |
| error #ef4444 | canvas #0a0a0a | 5.26:1 | Pass |
| error #ef4444 | surface #121212 | 4.98:1 | Pass |
| error #ef4444 | elevated #202020 | 4.33:1 | Fail |
| error #ef4444 | hover #222222 | 4.23:1 | Fail |
| error-text #ededed | canvas #0a0a0a | 16.91:1 | Pass |
| error-text #ededed | surface #121212 | 16.00:1 | Pass |
| error-text #ededed | elevated #202020 | 13.92:1 | Pass |
| error-text #ededed | hover #222222 | 13.59:1 | Pass |
| control-border #737373 | canvas #0a0a0a | 4.18:1 | Fail |
| control-border #737373 | surface #121212 | 3.95:1 | Fail |
| control-border #737373 | elevated #202020 | 3.44:1 | Fail |
| control-border #737373 | hover #222222 | 3.36:1 | Fail |

## Primary fill

| State | Ink | Fill | Ratio |
|---|---|---|---:|
| primary | #000000 | #00cc5c | 9.79:1 |
| primary-hover | #000000 | #00e065 | 11.85:1 |
| primary-active | #000000 | #00b853 | 7.98:1 |

## Required usage

- Small copy, placeholders and timestamps use foreground or text-secondary.
- Muted is for disabled/decorative content or qualifying large text.
- Error copy uses error-text on elevated surfaces, with a red marker and explicit words.
- Essential control boundaries use control-border; border and border-strong remain decorative.
- Primary buttons use text-on-primary.

## References

- [W3C text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [W3C non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)
