import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {renderTokens,renderTailwindTheme,tokens} from './token-model.mjs';
const text=file=>fs.readFileSync(file,'utf8');
const strip=s=>s.replace(/\/\*[\s\S]*?\*\//g,'').replace(/<!--[\s\S]*?-->/g,'');
export function checkPackage(root=process.cwd()) {
 const failures=[];const check=(condition,message)=>{if(!condition)failures.push(message);};
 check(fs.existsSync(path.join(root,'dist/colors_and_type.css'))&&text(path.join(root,'dist/colors_and_type.css'))===renderTokens(),'Generated dist/colors_and_type.css differs from canonical tokens; run npm run build.');
 check(fs.existsSync(path.join(root,'dist/tailwind.css'))&&text(path.join(root,'dist/tailwind.css'))===renderTailwindTheme(),'Generated dist/tailwind.css differs from canonical tokens; run npm run build.');
 for(const name of ['default','dark','compact']){
  const file=`dist/tokens/tokens.${name}.json`;
  if(fs.existsSync(path.join(root,file))){
    const obj=JSON.parse(text(path.join(root,file)));
    for(const [key,value] of Object.entries({colorPrimary:tokens.color.primary.value,colorText:tokens.engineRoles.foreground.value,colorBgContainer:tokens.engineRoles.surface.value,borderRadius:0,borderRadiusSM:0,borderRadiusLG:0}))check(obj[key]===value,`${file}: ${key} differs from source (${obj[key]}).`);
  }
 }
 const html = [];
 for (const dir of ['showcase', 'preview', 'system', 'ui_kits/app']) {
   const dirPath = path.join(root, dir);
   if (fs.existsSync(dirPath)) {
     const found = fs.readdirSync(dirPath, { recursive: true }).filter(f => f.endsWith('.html')).map(f => path.join(dir, f).replace(/\\/g, '/'));
     html.push(...found);
   }
 }
 if (fs.existsSync(path.join(root, 'index.html'))) html.push('index.html');
 if (fs.existsSync(path.join(root, 'brand.html'))) html.push('brand.html');

 for(const file of html){
  const contents=text(path.join(root,file)),chunks=[strip(contents)],visited=new Set();
  const load=(relative,from)=>{
   if(/^(?:https?:)?\/\//.test(relative)){failures.push(`${file}: remote runtime asset ${relative}`);return;}
   if(/^(data:|#|mailto:)/.test(relative))return;
   const absolute=path.resolve(path.dirname(from),relative.split(/[?#]/)[0]);
   if(!fs.existsSync(absolute)){failures.push(`${file}: missing ${relative}`);return;}
   if(path.extname(absolute)!=='.css'||visited.has(absolute))return;
   visited.add(absolute);const css=strip(text(absolute));chunks.push(css);
   for(const match of css.matchAll(/@import\s+(?:url\()?['"]([^'"]+)/g))load(match[1],absolute);
  };
  for(const match of contents.matchAll(/<(?:script|link|img)\b[^>]*?(?:src|href)=["']([^"']+)["'][^>]*>/gi)){
   if(match[0].startsWith('<link')&&!/rel=["'](?:stylesheet|icon|apple-touch-icon)/.test(match[0]))continue;
   load(match[1],path.join(root,file));
  }
  const source=chunks.join('\n'),definitions=new Set([...source.matchAll(/(--[\w-]+)\s*:/g)].map(m=>m[1]));
  for(const m of source.matchAll(/var\(\s*(--[\w-]+)\s*\)/g))check(definitions.has(m[1]),`${file}: unresolved ${m[1]} in loaded styles.`);
 }
 for(const obsolete of ['system/scripts/apply-design-tokens.mjs','ui_kits/app/components/Sidebar.jsx','ui_kits/app/components/ChatArea.jsx','ui_kits/app/components/InputBar.jsx','ui_kits/app/components/MessageBubble.jsx','ui_kits/app/components/AssistantsList.jsx'])check(!fs.existsSync(path.join(root,obsolete)),`Unused scaffold returned: ${obsolete}`);
 for(const font of JSON.parse(text(path.join(root,'fonts/manifest.json'))))check(fs.existsSync(path.join(root,'fonts',font.file)),`Missing local font ${font.file}`);
 return {pages:html.length,failures:[...new Set(failures)]};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const result=checkPackage();console.log(`Checked canonical values, loaded styles, local assets and cleanup across ${result.pages} pages.`);
 if(result.failures.length){console.error(result.failures.join('\n'));process.exitCode=1;}else console.log('PASS');
}
