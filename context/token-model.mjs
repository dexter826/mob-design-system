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
