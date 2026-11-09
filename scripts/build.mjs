import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {build} from 'esbuild';
import {Resvg} from '@resvg/resvg-js';
import {renderTokens,renderTailwindTheme} from './token-model.mjs';
import {tokens,resolveToken} from './token-model.mjs';

function write(file,content){
  fs.mkdirSync(path.dirname(file),{recursive:true});
  if(!fs.existsSync(file)||!fs.readFileSync(file).equals(Buffer.from(content)))fs.writeFileSync(file,content);
}

const brand=JSON.parse(fs.readFileSync('brand.json','utf8'));
for(const color of brand.colors) if(tokens.engineRoles[color.role]) color.hex=resolveToken('engineRoles.'+color.role);
for(const [key,role] of Object.entries({colorPrimary:'primary',colorSuccess:'success',colorInfo:'info',colorWarning:'warning',colorError:'error',colorLink:'info'}))brand.seed[key]=resolveToken('color.'+role);
for(const font of Object.values(brand.typography)) delete font.googleFontsUrl;
write('brand.json',JSON.stringify(brand,null,2)+'\n');
write('system/seed.json',JSON.stringify(brand.seed,null,2)+'\n');
write('system/theme.json',JSON.stringify({token:brand.seed,algorithm:'dark'},null,2)+'\n');

// 1. Compile tokens and theme into dist/
write('dist/colors_and_type.css',renderTokens());
write('dist/tailwind.css',renderTailwindTheme());

// 2. Synchronize src/styles to dist/
if(fs.existsSync('src/styles/components.css')) write('dist/components.css',fs.readFileSync('src/styles/components.css'));
if(fs.existsSync('src/styles/overlays.css')) write('dist/overlays.css',fs.readFileSync('src/styles/overlays.css'));

// 3. Run sync engines
execFileSync(process.execPath,['scripts/engine-token-sync.mjs'],{stdio:'inherit'});
execFileSync(process.execPath,['scripts/design-md-from-brand.mjs'],{stdio:'inherit'});

// 4. Copy compatibility tokens to dist/
if(fs.existsSync('system/variables.css')) write('dist/variables.css',fs.readFileSync('system/variables.css'));
for(const name of ['default','compact','dark']){
  const sysToken=`system/tokens.${name}.json`;
  if(fs.existsSync(sysToken)) write(`dist/tokens/tokens.${name}.json`,fs.readFileSync(sysToken));
}

// 5. Build React showcase application
if(fs.existsSync('showcase/app/main.jsx')){
  await build({entryPoints:['showcase/app/main.jsx'],bundle:true,format:'iife',platform:'browser',target:['es2020'],minify:true,define:{'process.env.NODE_ENV':'"production"'},outfile:'showcase/app/console.js',legalComments:'external'});
}
if(fs.existsSync('ui_kits/app/main.jsx')){
  await build({entryPoints:['ui_kits/app/main.jsx'],bundle:true,format:'iife',platform:'browser',target:['es2020'],minify:true,define:{'process.env.NODE_ENV':'"production"'},outfile:'ui_kits/app/console.js',legalComments:'external'});
}

// 6. Vendor licenses and logo exports
fs.mkdirSync('assets/vendor-licenses',{recursive:true});
for(const name of ['react','react-dom','scheduler']) if(fs.existsSync(`node_modules/${name}/LICENSE`)) write(`assets/vendor-licenses/${name}.LICENSE.txt`,fs.readFileSync(`node_modules/${name}/LICENSE`));
fs.mkdirSync('logos/exports',{recursive:true});
const exports=[];
for(const name of ['mob-lockup-dark','mob-lockup-light','mob-lockup-stacked','mob-symbol','mob-wordmark','og-cover']){
  const source=`logos/mob-logo/vectors/${name}.svg`;
  if(!fs.existsSync(source))continue;
  const png=new Resvg(fs.readFileSync(source,'utf8'),{fitTo:{mode:'width',value:1200}}).render();
  const file=`logos/exports/${name}.png`;
  write(file,png.asPng());
  exports.push({file,source,width:png.width,height:png.height,transformation:'SVG rasterization; full frame; no geometry changes'});
}
write('logos/exports/manifest.json',JSON.stringify(exports,null,2)+'\n');
write('guide.md',fs.readFileSync('BRAND.md'));

// 7. Cleanup obsolete artifacts (never delete src!)
const obsolete=['source-archive','system/scripts/apply-design-tokens.mjs','%SystemDrive%'];
for(const relative of obsolete){
  const absolute=path.resolve(relative);
  if(!absolute.startsWith(process.cwd()+path.sep))throw Error('Cleanup escaped project');
  if(fs.existsSync(absolute))fs.rmSync(absolute,{recursive:true});
}

// 8. Clean up root legacy CSS to keep root pure
for(const rootCss of ['colors_and_type.css','components.css','overlays.css','tailwind.css']){
  if(fs.existsSync(rootCss)) fs.rmSync(rootCss);
}

console.log('Built tokens, compatibility exports, local console and logo raster exports into dist/ and showcase/.');
