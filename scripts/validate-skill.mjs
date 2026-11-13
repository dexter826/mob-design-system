import fs from 'node:fs';
import path from 'node:path';

function fail(msg) {
  console.error(`FAIL: ${msg}`);
  process.exit(1);
}

if (fs.existsSync('SKILL.md')) {
  fail('Root SKILL.md exists. It must be removed to avoid copying entire repo during npx skills add.');
}

const skillPath = 'skills/mob-signal/SKILL.md';
if (!fs.existsSync(skillPath)) {
  fail(`Missing skill definition at ${skillPath}`);
}

const content = fs.readFileSync(skillPath, 'utf8');
if (!content.includes('name: mob-signal')) {
  fail('SKILL.md missing name frontmatter (expected mob-signal)');
}
if (!content.includes('description:')) {
  fail('SKILL.md missing description frontmatter');
}

if (!fs.existsSync('skills.sh.json')) {
  fail('Missing skills.sh.json manifest');
}
const config = JSON.parse(fs.readFileSync('skills.sh.json', 'utf8'));
if (!Array.isArray(config.paths) || !config.paths.includes('./skills')) {
  fail('skills.sh.json missing ./skills in paths');
}

const refDir = 'skills/mob-signal/references';
if (!fs.existsSync(path.join(refDir, 'README.md'))) {
  fail('Missing references/README.md directory guide');
}

const evalsPath = 'skills/mob-signal/evals/evals.json';
if (!fs.existsSync(evalsPath)) {
  fail('Missing evals/evals.json benchmark suite');
}
const evalsData = JSON.parse(fs.readFileSync(evalsPath, 'utf8'));
if (evalsData.skill_name !== 'mob-signal' || !Array.isArray(evalsData.evals) || evalsData.evals.length === 0) {
  fail('Invalid evals/evals.json structure');
}

const expectedReferences = [
  { ref: 'tailwind.css', source: 'dist/tailwind.css' },
  { ref: 'colors_and_type.css', source: 'dist/colors_and_type.css' },
  { ref: 'registry.json', source: 'registry/registry.json' },
  { ref: 'utils.ts', source: 'src/lib/utils.ts' }
];

for (const { ref, source } of expectedReferences) {
  const refPath = path.join(refDir, ref);
  if (!fs.existsSync(refPath)) {
    fail(`Missing reference file: ${refPath}`);
  }
  if (fs.existsSync(source)) {
    const refBuf = fs.readFileSync(refPath);
    const srcBuf = fs.readFileSync(source);
    if (!refBuf.equals(srcBuf)) {
      fail(`Reference drift detected: '${refPath}' does not match '${source}'. Run npm run sync:skill.`);
    }
  }
}

const registry = JSON.parse(fs.readFileSync(path.join(refDir, 'registry.json'), 'utf8'));
if (!Array.isArray(registry.items) || registry.items.length === 0) {
  fail('Invalid or empty registry.json');
}

const compFiles = fs.readdirSync(path.join(refDir, 'components'));
if (compFiles.length !== registry.items.length) {
  fail(`Component count mismatch: references/components has ${compFiles.length} files, but registry.json declares ${registry.items.length} items`);
}

for (const item of registry.items) {
  if (!Array.isArray(item.files) || item.files.length === 0 || !item.files[0]?.path) {
    fail(`Invalid registry item declaration: ${JSON.stringify(item.name || item)}`);
  }
  const filename = path.basename(item.files[0].path);
  const compPath = path.join(refDir, 'components', filename);
  if (!fs.existsSync(compPath)) {
    fail(`Missing component in skill references: ${compPath}`);
  }
  const originalCompPath = path.join('registry/default/ui', filename);
  if (fs.existsSync(originalCompPath)) {
    if (!fs.readFileSync(compPath).equals(fs.readFileSync(originalCompPath))) {
      fail(`Component drift detected for ${filename}. Run npm run sync:skill.`);
    }
  }
}

console.log(`PASS: Skill layout, manifest, tokens, utils, and ${registry.items.length} components validated without drift.`);
