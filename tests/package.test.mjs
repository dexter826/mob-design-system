import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
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
  assert.ok(css.includes('--color-primary-foreground: #000000;'));
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

  assert.ok(fs.existsSync('registry/registry.json'));
  const registry = JSON.parse(fs.readFileSync('registry/registry.json', 'utf8'));
  assert.ok(registry.items.length >= 26);
  for (const item of registry.items) {
    for (const f of item.files) {
      assert.ok(fs.existsSync(f.path), `Missing registry file: ${f.path}`);
    }
  }
});

test('skill layout is isolated, complete, and not exposed at root', () => {
  assert.ok(!fs.existsSync('SKILL.md'), 'Root SKILL.md must not exist to prevent full repo copies by skills CLI');
  assert.ok(fs.existsSync('skills/mob-signal/SKILL.md'), 'skills/mob-signal/SKILL.md must exist');
  assert.ok(fs.existsSync('skills.sh.json'), 'skills.sh.json must exist');
  assert.ok(fs.existsSync('skills/mob-signal/references/tailwind.css'));
  assert.ok(fs.existsSync('skills/mob-signal/references/colors_and_type.css'));
  assert.ok(fs.existsSync('skills/mob-signal/references/registry.json'));
  assert.ok(fs.existsSync('skills/mob-signal/references/utils.ts'));
  assert.ok(fs.existsSync('skills/mob-signal/references/README.md'));
  assert.ok(fs.existsSync('skills/mob-signal/evals/evals.json'));

  const evals = JSON.parse(fs.readFileSync('skills/mob-signal/evals/evals.json', 'utf8'));
  assert.equal(evals.skill_name, 'mob-signal');
  assert.ok(evals.evals.length >= 3);

  assert.ok(
    fs.readFileSync('skills/mob-signal/references/tailwind.css').equals(fs.readFileSync('dist/tailwind.css')),
    'references/tailwind.css drifted from dist/tailwind.css'
  );
  assert.ok(
    fs.readFileSync('skills/mob-signal/references/utils.ts').equals(fs.readFileSync('src/lib/utils.ts')),
    'references/utils.ts drifted from src/lib/utils.ts'
  );

  const registry = JSON.parse(fs.readFileSync('skills/mob-signal/references/registry.json', 'utf8'));
  assert.ok(registry.items.length >= 26);
  assert.equal(fs.readdirSync('skills/mob-signal/references/components').length, registry.items.length);
  for (const item of registry.items) {
    const filename = path.basename(item.files[0].path);
    assert.ok(fs.existsSync(`skills/mob-signal/references/components/${filename}`), `Missing bundled component: ${filename}`);
  }
});
