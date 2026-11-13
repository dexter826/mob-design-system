import fs from 'node:fs';
import path from 'node:path';

const refDir = 'skills/mob-signal/references';

const requiredSources = [
  'dist/tailwind.css',
  'dist/colors_and_type.css',
  'registry/registry.json',
  'registry/default/ui',
  'src/lib/utils.ts'
];

for (const src of requiredSources) {
  if (!fs.existsSync(src)) {
    throw new Error(`Cannot sync skill references: prerequisite '${src}' is missing. Run npm run build first.`);
  }
}

fs.mkdirSync(refDir, { recursive: true });
fs.copyFileSync('dist/tailwind.css', `${refDir}/tailwind.css`);
fs.copyFileSync('dist/colors_and_type.css', `${refDir}/colors_and_type.css`);
fs.copyFileSync('registry/registry.json', `${refDir}/registry.json`);
fs.copyFileSync('src/lib/utils.ts', `${refDir}/utils.ts`);

// Clean and recreate components directory to avoid orphaned files
fs.rmSync(`${refDir}/components`, { recursive: true, force: true });
fs.mkdirSync(`${refDir}/components`, { recursive: true });

const uiFiles = fs.readdirSync('registry/default/ui');
for (const file of uiFiles) {
  fs.copyFileSync(path.join('registry/default/ui', file), path.join(refDir, 'components', file));
}

console.log(`PASS: Synchronized tokens, utils, registry manifest, and ${uiFiles.length} components to ${refDir}/`);
