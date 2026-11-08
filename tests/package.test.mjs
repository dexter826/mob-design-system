import test from 'node:test';
import assert from 'node:assert/strict';
import {once} from 'node:events';
import fs from 'node:fs';
import {tokens,resolveToken,cssValues} from '../context/token-model.mjs';
import {checkPackage} from '../context/token-check.mjs';
import {contrast} from '../context/contrast.mjs';
import {createServer} from '../context/server.mjs';

test('canonical exports and page-loaded resources agree',()=>assert.deepEqual(checkPackage().failures,[]));
test('unknown token references are rejected',()=>assert.throws(()=>resolveToken('color.nonexistent'),/Unknown token/));
test('value drift produces a failing check',()=>{
 const original=tokens.color.primary.value;
 try{tokens.color.primary.value='#123456';assert.ok(checkPackage().failures.some(message=>message.includes('canonical')||message.includes('source')));}
 finally{tokens.color.primary.value=original;}
});
test('semantic aliases follow a changed primary token',()=>{
 const original=tokens.color.primary.value;
 try{tokens.color.primary.value='#123456';assert.equal(resolveToken('color.success'),'#123456');assert.equal(cssValues()['--mob-signal-primary'],'#123456');}
 finally{tokens.color.primary.value=original;}
});
test('contrast uses WCAG luminance, not font-size heuristics',()=>{
 assert.equal(contrast('#000000','#ffffff'),21);
 assert.ok(contrast('#737373','#0a0a0a')<4.5);
 assert.ok(contrast('#ef4444','#202020')<4.5);
 assert.ok(contrast(tokens.color['control-border'].value,'#202020')>=3);
 assert.ok(contrast(tokens.color['text-on-primary'].value,tokens.color.primary.value)>=7);
});
test('logo raster exports preserve SVG geometry',()=>{
 const exports=JSON.parse(fs.readFileSync('logos/exports/manifest.json','utf8'));
 const og=exports.find(item=>item.file.endsWith('/og-cover.png'));
 assert.deepEqual([og.width,og.height],[1200,630]);
 assert.ok(exports.find(item=>item.file.endsWith('/mob-lockup-dark.png')).width > exports.find(item=>item.file.endsWith('/mob-lockup-dark.png')).height);
});
test('local server serves assets and rejects protected paths',async()=>{
 const server=createServer();server.listen(0,'127.0.0.1');await once(server,'listening');
 const url='http://127.0.0.1:'+server.address().port;
 try{
  assert.equal((await fetch(url+'/')).status,200);
  assert.equal((await fetch(url+'/fonts/fonts.css')).headers.get('content-type'),'text/css; charset=utf-8');
  assert.equal((await fetch(url+'/.file-versions/')).status,403);
  assert.equal((await fetch(url+'/node_modules/react/package.json')).status,403);
  assert.equal((await fetch(url+'/missing-file')).status,404);
 }finally{server.closeAllConnections();await new Promise(resolve=>server.close(resolve));}
});
