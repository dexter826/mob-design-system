import fs from 'node:fs';
import path from 'node:path';
import { buildSync } from 'esbuild';

console.log('Validating M.O.B Signal shadcn/ui Registry...');

const registryFile = 'registry/registry.json';
if (!fs.existsSync(registryFile)) {
  console.error('FAIL: Missing registry/registry.json');
  process.exit(1);
}

const registry = JSON.parse(fs.readFileSync(registryFile, 'utf8'));
const items = registry.items || [];
console.log(`Found ${items.length} items declared in registry.json`);

if (items.length < 26) {
  console.error(`FAIL: Expected at least 26 components in registry, found ${items.length}`);
  process.exit(1);
}

const registeredPaths = new Set();
let failures = 0;

// 1. Verify all registry entries point to valid files on disk and have correct structure
for (const item of items) {
  if (!item.name || !item.files || item.files.length === 0) {
    console.error(`FAIL: Invalid registry entry structure for ${JSON.stringify(item)}`);
    failures++;
    continue;
  }

  for (const file of item.files) {
    registeredPaths.add(file.path.replace(/\\/g, '/'));
    if (!fs.existsSync(file.path)) {
      console.error(`FAIL: Declared file does not exist on disk: ${file.path}`);
      failures++;
    }
  }

  // Check forbidden dependencies
  const forbidden = ['recharts', 'chart.js', 'zod', 'react-hook-form', 'date-fns', 'react-day-picker', 'embla-carousel-react', 'cmdk'];
  for (const dep of item.dependencies || []) {
    if (forbidden.includes(dep)) {
      console.error(`FAIL: Component '${item.name}' imports forbidden app-level dependency '${dep}'`);
      failures++;
    }
  }
}

// 2. Verify all UI files in registry/default/ui are indexed
const uiDir = 'registry/default/ui';
const diskFiles = fs.readdirSync(uiDir).filter(f => f.endsWith('.tsx'));

for (const diskFile of diskFiles) {
  const normPath = `${uiDir}/${diskFile}`.replace(/\\/g, '/');
  if (!registeredPaths.has(normPath)) {
    console.error(`FAIL: File on disk not indexed in registry.json: ${normPath}`);
    failures++;
  }

  // 3. Syntax and parse check via esbuild
  try {
    buildSync({
      entryPoints: [normPath],
      bundle: false,
      write: false,
      format: 'esm',
      loader: { '.tsx': 'tsx' }
    });
  } catch (err) {
    console.error(`FAIL: Syntax error compiling ${normPath}: ${err.message}`);
    failures++;
  }

  // 4. Zero-radius constraint audit
  const code = fs.readFileSync(normPath, 'utf8');
  const roundedMatch = code.match(/rounded-(sm|md|lg|xl|2xl|3xl|full)/g);
  if (roundedMatch) {
    console.error(`FAIL: Non-zero border radius detected in ${normPath}: ${roundedMatch.join(', ')}`);
    failures++;
  }
}

if (failures > 0) {
  console.error(`\nRegistry validation FAILED with ${failures} error(s).`);
  process.exit(1);
}

console.log(`PASS: All ${items.length} components indexed, verified on disk, syntax-clean, and strictly zero-radius.`);
