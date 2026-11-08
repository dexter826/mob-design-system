import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {build} from 'esbuild';
import {Resvg} from '@resvg/resvg-js';
import {renderTokens} from './token-model.mjs';
import {tokens,resolveToken} from './token-model.mjs';

function write(file,content){if(!fs.existsSync(file)||!fs.readFileSync(file).equals(Buffer.from(content)))fs.writeFileSync(file,content);}
const brand=JSON.parse(fs.readFileSync('brand.json','utf8'));
for(const color of brand.colors) if(tokens.engineRoles[color.role]) color.hex=resolveToken('engineRoles.'+color.role);
for(const [key,role] of Object.entries({colorPrimary:'primary',colorSuccess:'success',colorInfo:'info',colorWarning:'warning',colorError:'error',colorLink:'info'}))brand.seed[key]=resolveToken('color.'+role);
for(const font of Object.values(brand.typography)) delete font.googleFontsUrl;
write('brand.json',JSON.stringify(brand,null,2)+'\n');
write('system/seed.json',JSON.stringify(brand.seed,null,2)+'\n');
write('system/theme.json',JSON.stringify({token:brand.seed,algorithm:'dark'},null,2)+'\n');
write('colors_and_type.css',renderTokens());
execFileSync(process.execPath,['context/engine-token-sync.mjs'],{stdio:'inherit'});
execFileSync(process.execPath,['context/design-md-from-brand.mjs'],{stdio:'inherit'});
await build({entryPoints:['ui_kits/app/main.jsx'],bundle:true,format:'iife',platform:'browser',target:['es2020'],minify:true,define:{'process.env.NODE_ENV':'"production"'},outfile:'ui_kits/app/console.js',legalComments:'external'});
fs.mkdirSync('assets/vendor-licenses',{recursive:true});
for(const name of ['react','react-dom','scheduler'])write(`assets/vendor-licenses/${name}.LICENSE.txt`,fs.readFileSync(`node_modules/${name}/LICENSE`));
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
// Only known unused scaffold paths are removed, after containment checks.
const obsolete=['src','source-archive','system/scripts/apply-design-tokens.mjs',...['Sidebar','ChatArea','InputBar','MessageBubble','AssistantsList'].map(n=>`ui_kits/app/components/${n}.jsx`),'%SystemDrive%'];
for(const relative of obsolete){const absolute=path.resolve(relative);if(!absolute.startsWith(process.cwd()+path.sep))throw Error('Cleanup escaped project');if(fs.existsSync(absolute))fs.rmSync(absolute,{recursive:true});}
console.log('Built tokens, compatibility exports, local console and logo raster exports.');
