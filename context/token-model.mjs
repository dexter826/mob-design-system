import fs from 'node:fs';
export const tokens = JSON.parse(fs.readFileSync(new URL('../tokens.measured.json', import.meta.url), 'utf8'));
export function resolveToken(path) {
  const result = path.split('.').reduce((value, key) => value?.[key], tokens);
  if (result === undefined) throw new Error(`Unknown token reference: ${path}`);
  if (result?.aliasOf) return resolveToken('color.' + result.aliasOf);
  return typeof result === 'object' && result !== null && 'value' in result ? result.value : result;
}
export function cssValues() {
  return Object.fromEntries(Object.entries(tokens.css).map(([key, value]) => [key,
    String(value).replace(/\{([^}]+)\}/g, (_, path) => resolveToken(path))]));
}
export function renderTokens() {
  return '/* Generated from tokens.measured.json. Run npm run build. */\n@import url("./fonts/fonts.css");\n:root {\n  color-scheme: dark;\n' +
    Object.entries(cssValues()).map(([key,value]) => `  ${key}: ${value};`).join('\n') + '\n  ' +
    fs.readFileSync(new URL('./token-aliases.css', import.meta.url), 'utf8');
}
export function renderTailwindTheme() {
  return `/* Generated from tokens.measured.json. Run npm run build. */
@theme {
  /* Semantic Colors */
  --color-primary: ${resolveToken('color.primary')};
  --color-primary-hover: ${resolveToken('color.primary-hover')};
  --color-primary-active: ${resolveToken('color.primary-active')};
  --color-primary-subtle: ${resolveToken('color.primary-subtle')};
  --color-accent-secondary: ${resolveToken('engineRoles.accent-secondary')};
  --color-text-on-primary: ${resolveToken('color.text-on-primary')};
  --color-background: ${resolveToken('engineRoles.background')};
  --color-surface: ${resolveToken('engineRoles.surface')};
  --color-surface-subtle: ${resolveToken('color.surface-subtle')};
  --color-surface-elevated: ${resolveToken('color.surface-elevated')};
  --color-surface-hover: ${resolveToken('color.surface-hover')};
  --color-border: ${resolveToken('engineRoles.border')};
  --color-border-strong: ${resolveToken('color.border-strong')};
  --color-border-focus: ${resolveToken('color.border-focus')};
  --color-foreground: ${resolveToken('engineRoles.foreground')};
  --color-text-secondary: ${resolveToken('color.text-secondary')};
  --color-muted: ${resolveToken('engineRoles.muted')};
  --color-success: ${resolveToken('color.success')};
  --color-success-subtle: ${resolveToken('color.success-subtle')};
  --color-warning: ${resolveToken('color.warning')};
  --color-error: ${resolveToken('color.error')};
  --color-info: ${resolveToken('color.info')};

  /* Typography */
  --font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  --font-display: 'Space Grotesk', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', SFMono-Regular, Consolas, monospace;

  /* Spacing Scale (4px base) */
  --spacing: 4px;

  /* Geometry Brand Trait: Reset all radius to 0px */
  --radius-*: initial;
  --radius-none: 0px;
  --radius-sm: 0px;
  --radius-md: 0px;
  --radius-lg: 0px;
  --radius-xl: 0px;
  --radius-full: 0px;
  --radius: 0px;
}
`;
}
