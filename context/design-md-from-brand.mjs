// Regenerates DESIGN.md from brand.json in the engine's own document shape, so the
// canonical rules file stays coherent with the registry without `od brand finalize`
// (finalize also rewrites the hand-maintained reuse layer — see BRAND.md section 9).
// Run: node context/design-md-from-brand.mjs
import fs from 'node:fs';

const brand = JSON.parse(fs.readFileSync('brand.json', 'utf8'));
const b = brand;
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const L = [];

L.push('---');
L.push(`name: "${b.name}"`);
L.push('category: Brands');
L.push('surface: web');
L.push('colors:');
for (const c of b.colors) L.push(`  ${slug(c.name)}: "${c.hex}"`);
L.push('---');
L.push('');
L.push(`# ${b.name}`);
L.push('');
L.push('> Category: Brands');
L.push('');
L.push('> Surface: web');
L.push('');
L.push(`*${b.tagline}*`);
L.push('');
L.push(b.description);
L.push('');
L.push('## Color Palette');
L.push('');
L.push('| Role | Name | Hex | Usage |');
L.push('| --- | --- | --- | --- |');
for (const c of b.colors) L.push(`| ${c.role} | ${c.name} | \`${c.hex}\` | ${c.usage} |`);
L.push('');
L.push('## Typography');
for (const k of ['display', 'body', 'mono']) {
  const f = b.typography[k];
  const label = k === 'display' ? 'Display' : k === 'body' ? 'Body' : 'Mono';
  L.push(`- **${label}:** ${f.family} — weights ${f.weights.join(', ')} — fallbacks: ${f.fallbacks.join(', ')}`);
}
L.push('');
L.push('## Voice & Tone');
L.push('');
L.push(`- **Adjectives:** ${b.voice.adjectives.join(', ')}`);
L.push(`- **Tone:** ${b.voice.tone}`);
L.push('');
L.push('### Messaging pillars');
for (const p of b.voice.messagingPillars) L.push(`- ${p}`);
L.push('');
L.push('### Vocabulary');
L.push(`- **Use:** ${b.voice.vocabulary.use.join(', ')}`);
L.push(`- **Avoid:** ${b.voice.vocabulary.avoid.join(', ')}`);
L.push('');
L.push('## Imagery');
L.push('');
L.push(`- **Style:** ${b.imagery.style}`);
L.push(`- **Subjects:** ${b.imagery.subjects.join(', ')}`);
L.push(`- **Treatment:** ${b.imagery.treatment}`);
L.push(`- **Avoid:** ${b.imagery.avoid.join(', ')}`);
L.push('');
L.push('## Layout');
L.push('');
L.push(`- **Radius:** ${b.layout.radius}`);
L.push(`- **Border weight:** ${b.layout.borderWeight}`);
L.push(`- **Spacing:** ${b.layout.spacing}`);
L.push('');
L.push('### Posture rules');
for (const r of b.layout.postureRules) L.push(`- ${r}`);
L.push('');

fs.writeFileSync('DESIGN.md', L.join('\n'));
console.log(`DESIGN.md written from brand.json: ${b.colors.length} colors, ${b.layout.postureRules.length} posture rules.`);
