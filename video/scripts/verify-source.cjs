const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const {chromium} = require('C:/Users/izoto/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root = path.resolve(__dirname, '../..');
(async () => {
 const report = {commit:'1b03153711bc79092b1d3f9febfc11b6df0fbc92', files:[], browser:[]};
 const downloaded=new Map();
 for (const file of fs.readdirSync(path.join(root,'dist'))) {
  const local=fs.readFileSync(path.join(root,'dist',file));
  const response=await fetch('https://izootova76-lang1.github.io/ivan-workshop/'+file);
  const remote=Buffer.from(await response.arrayBuffer());
  downloaded.set(file,remote);
  const same=local.equals(remote);
  const normalized=!file.endsWith('.png') && local.toString().replace(/\r\n/g,'\n')===remote.toString().replace(/\r\n/g,'\n');
  report.files.push({file,status:response.status,same,normalized,sha256:crypto.createHash('sha256').update(remote).digest('hex')});
 }
 const browser=await chromium.launch({channel:'msedge',headless:true});
 for (const url of ['http://127.0.0.1:4173','https://izootova76-lang1.github.io/ivan-workshop/']) {
  const page=await browser.newPage({viewport:{width:390,height:844}});
  if(url.startsWith('https:')) await page.route('https://izootova76-lang1.github.io/ivan-workshop/**',route=>{
   const name=new URL(route.request().url()).pathname.split('/').pop()||'index.html';
   const body=downloaded.get(name);
   return body?route.fulfill({body,contentType:name.endsWith('.css')?'text/css':name.endsWith('.js')?'application/javascript':name.endsWith('.png')?'image/png':name.endsWith('.svg')?'image/svg+xml':'text/html'}):route.continue();
  });
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(url);await page.waitForTimeout(600);
  const blocks=await page.locator('#diagnostics > details').count();
  await page.locator('.zone-tabs button').nth(1).click();
  const yellow=await page.locator('#zone-panel').innerText();
  for(let i=0;i<6;i++) {
   await page.locator('label').filter({has:page.locator('input[name="q'+i+'"][value="1"]')}).click();
   if(i<5) await page.locator('.step-next').click();
  }
  await page.locator('#result-button').click();
  const result=await page.locator('#result').innerText();
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
  await page.screenshot({path:path.join(root,'video',url.startsWith('http://127')?'local-site.png':'published-site.png'),fullPage:true});
  report.browser.push({url,blocks,yellow,result,overflow,errors});await page.close();
 }
 await browser.close();
 fs.writeFileSync(path.join(root,'video','source-verification.json'),JSON.stringify(report,null,2));
 console.log(JSON.stringify(report,null,2));
 if(report.files.some(x=>!x.same&&!x.normalized)||report.browser.some(x=>x.blocks!==5||x.overflow||x.errors.length||!x.result.includes('Жёлтая')))process.exitCode=1;
})().catch(e=>{console.error(e);process.exit(1)});
