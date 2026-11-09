import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {tokens,resolveToken,cssValues} from '../scripts/token-model.mjs';
import {checkPackage} from '../scripts/token-check.mjs';
import {contrast} from '../scripts/contrast.mjs';

test('canonical exports and showcase resources agree', () => {
  const result = checkPackage();
  assert.deepEqual(result.failures, []);
});

test('unknown token references are rejected', () => {
  assert.throws(() => resolveToken('color.nonexistent'), /Unknown token/);
});

test('contrast uses WCAG luminance, not font-size heuristics', () => {
  assert.equal(contrast('#000000', '#ffffff'), 21);
  assert.ok(contrast('#737373', '#0a0a0a') < 4.5);
  assert.ok(contrast('#ef4444', '#202020') < 4.5);
  assert.ok(contrast(tokens.color['control-border'].value, '#202020') >= 3);
  assert.ok(contrast(tokens.color['text-on-primary'].value, tokens.color.primary.value) >= 7);
});

test('dist/tailwind.css emits valid Tailwind v4 theme and 0px radius reset', () => {
  const css = fs.readFileSync('dist/tailwind.css', 'utf8');
  assert.ok(css.includes('@theme {'));
  assert.ok(css.includes(`--color-primary: ${tokens.color.primary.value};`));
  assert.ok(css.includes('--radius: 0px;'));
  assert.ok(css.includes('--radius-*: initial;'));
  assert.ok(css.includes('--spacing: 4px;'));
});

test('DESIGN.md follows canonical google-labs-code/design.md spec', () => {
  const md = fs.readFileSync('DESIGN.md', 'utf8');
  const expectedSections = [
    '## Overview',
    '## Colors',
    '## Typography',
    '## Layout',
    '## Elevation & Depth',
    '## Shapes',
    '## Components',
    "## Do's and Don'ts"
  ];
  let lastIdx = -1;
  for (const section of expectedSections) {
    const idx = md.indexOf(section);
    assert.ok(idx > lastIdx, `Section missing or out of order: ${section}`);
    lastIdx = idx;
  }
  assert.ok(md.includes('primary: "#00cc5c"'));
  assert.ok(md.includes('none: "0px"'));
});

test('shadcn/ui registry and components.json are valid', () => {
  assert.ok(fs.existsSync('components.json'));
  const config = JSON.parse(fs.readFileSync('components.json', 'utf8'));
  assert.equal(config.style, 'default');
  assert.equal(config.tailwind.css, 'dist/tailwind.css');

  const components = ['button.tsx', 'input.tsx', 'table.tsx', 'badge.tsx', 'dialog.tsx', 'tabs.tsx'];
  for (const file of components) {
    assert.ok(fs.existsSync(`registry/default/ui/${file}`), `Missing registry component: ${file}`);
  }
});
