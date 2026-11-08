import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {once} from 'node:events';
import {createServer} from '../context/server.mjs';
const server=createServer();server.listen(0,'127.0.0.1');await once(server,'listening');
let browser;
try{
 try{browser=await chromium.launch({channel:'msedge',headless:true});}
 catch{browser=await chromium.launch({headless:true});}
 const context=await browser.newContext();
 const errors=[],remote=[];
 await context.route('**/*',route=>{
  const url=route.request().url();
  if(!url.startsWith('http://127.0.0.1:')&&!url.startsWith('data:')){remote.push(url);return route.abort();}
  return route.continue();
 });
 const page=await context.newPage();page.on('pageerror',error=>errors.push(error.message));
 const base='http://127.0.0.1:'+server.address().port;
 await page.goto(base+'/ui_kits/app/');
 await page.getByRole('heading',{name:'Service console',exact:true}).waitFor();
 await page.getByRole('textbox',{name:'Filter deployments',exact:true}).fill('graphql');
 assert.equal(await page.locator('tbody tr').count(),1);
 await page.getByRole('button',{name:'New deployment',exact:true}).click();
 await page.keyboard.press('Escape');
 assert.equal(await page.getByRole('dialog').count(),0);
 assert.equal(await page.getByRole('button',{name:'New deployment',exact:true}).evaluate(element=>element===document.activeElement),true);
 await page.getByRole('button',{name:'New deployment',exact:true}).click();
 await page.getByLabel('Deployment name',{exact:true}).fill('vietnamese-demo');
 await page.getByRole('button',{name:'Create sample deployment',exact:true}).click();
 await page.getByRole('cell',{name:'vietnamese-demo',exact:true}).waitFor();
 await page.getByRole('button',{name:'Settings',exact:true}).click();
 await page.getByLabel('Project name',{exact:true}).fill('Cấu hình Nguyễn Đặng');
 await page.getByRole('button',{name:'Save changes',exact:true}).click();
 await page.reload();await page.getByRole('button',{name:'Settings',exact:true}).click();
 assert.equal(await page.getByLabel('Project name',{exact:true}).inputValue(),'Cấu hình Nguyễn Đặng');
 await page.getByRole('button',{name:'Reset demo settings',exact:true}).click();
 await page.getByRole('dialog').getByRole('button',{name:'Cancel',exact:true}).click();
 assert.equal(await page.getByLabel('Project name',{exact:true}).inputValue(),'Cấu hình Nguyễn Đặng');
 await page.goto(base+'/preview/accessibility.html');
 await page.getByRole('tab',{name:'English',exact:true}).focus();await page.keyboard.press('ArrowRight');
 assert.equal(await page.getByRole('tab',{name:'Tiếng Việt',exact:true}).getAttribute('aria-selected'),'true');
 assert.equal(await page.locator('#panel-vi').isVisible(),true);
 for(const width of [1440,768,320]){
  await page.setViewportSize({width,height:900});
  for(const file of ['/','/ui_kits/app/','/preview/accessibility.html','/preview/components-buttons.html','/preview/components-inputs.html']){
   await page.goto(base+file);await page.evaluate(()=>document.fonts.ready);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`Page overflows at ${width}px: ${file}`);
  }
 }
 await page.emulateMedia({reducedMotion:'reduce'});
 assert.equal(await page.evaluate(()=>getComputedStyle(document.documentElement).getPropertyValue('--mob-signal-motion').trim()),'0.01ms');
 await page.emulateMedia({colorScheme:'light'});
 assert.equal(await page.evaluate(()=>getComputedStyle(document.documentElement).colorScheme),'dark');
 assert.deepEqual(errors,[]);assert.deepEqual(remote,[]);
 console.log('PASS: local-only requests, filtering, sample creation, Vietnamese settings, dialog Escape/focus, canceled reset, keyboard tabs, 3 widths, reduced motion and dark-only policy.');
}finally{await browser?.close();server.closeAllConnections();await new Promise(resolve=>server.close(resolve));}
