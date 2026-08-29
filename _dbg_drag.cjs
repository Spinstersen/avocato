const http=require('http'),fs=require('fs'),path=require('path');const {chromium}=require('playwright');
const ROOT=path.join(__dirname,'webapp');const MIME={'.html':'text/html','.js':'text/javascript','.css':'text/css'};
const server=http.createServer((req,res)=>{let f=decodeURIComponent(req.url.split('?')[0]);if(f==='/')f='/index.html';fs.readFile(path.join(ROOT,f),(e,b)=>{if(e){res.writeHead(404);res.end();return;}res.writeHead(200,{'Content-Type':MIME[path.extname(f)]||'application/octet-stream'});res.end(b);});});
(async()=>{await new Promise(r=>server.listen(8766,r));
const b=await chromium.launch({channel:'msedge',headless:true});const p=await b.newPage({viewport:{width:1360,height:900}});
p.on('console',m=>console.log('[page]',m.text().slice(0,120)));
await p.goto('http://localhost:8766/index.html');await p.waitForTimeout(500);
await p.evaluate(()=>{const d=JSON.parse(localStorage.getItem('avocato:dossiers'));if(!d||!d.length)localStorage.setItem('avocato:dossiers',JSON.stringify([
 {id:'a1',client:'Prospect One',ice:'',type:'Autre',mission:'Diagnostic (600-900 DH HT)',honoraires:800,tva:20,provisionPct:50,statut:'Prospect',echeance:'',contact:'',notes:'',createdAt:'2026-08-01',updatedAt:'2026-08-01'},
 {id:'a2',client:'Signe Two',ice:'',type:'Autre',mission:'Mission Contrats - Essentielle (2.500-5.000 DH HT)',honoraires:3500,tva:20,provisionPct:50,statut:'Convention signée',echeance:'',contact:'',notes:'',createdAt:'2026-08-02',updatedAt:'2026-08-02'}]));
 localStorage.setItem('avocato:echeances','[]');localStorage.setItem('avocato:factures','[]');localStorage.setItem('mode','cabinet');localStorage.setItem('cabinetView','pipeline');
});
await p.reload();await p.waitForTimeout(700);
await p.evaluate(()=>window.Cabinet.goView('pipeline'));await p.waitForTimeout(300);
console.log('cards:', await p.$$eval('.pipe-card',e=>e.map(x=>x.dataset.id)));
// instrument
await p.evaluate(()=>{window.__droplog=[];document.querySelectorAll('.pipe-col').forEach(c=>c.addEventListener('drop',e=>window.__droplog.push('drop:'+c.dataset.statut+':'+(e.dataTransfer?e.dataTransfer.getData('text/plain'):'nodt')),true));});
const src=p.locator('.pipe-card[data-id="a1"]');
const dst=p.locator('.pipe-col[data-statut="En cours"] .pc-drop');
await src.hover();await p.mouse.down();
await dst.hover({force:true});await p.mouse.move(900,400,{steps:12});await dst.hover({force:true});await p.mouse.up();
await p.waitForTimeout(500);
console.log('droplog:', await p.evaluate(()=>window.__droplog));
console.log('statut a1:', await p.evaluate(()=>JSON.parse(localStorage.getItem('avocato:dossiers')).find(x=>x.id==='a1').statut));
console.log('toasts:', await p.$$eval('.toast',e=>e.map(x=>x.textContent)));
await b.close();server.close();})().catch(e=>{console.error('FATAL',e);server.close();process.exitCode=1;});
