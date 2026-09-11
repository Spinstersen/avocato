import { JSDOM } from 'jsdom';
import assert from 'node:assert';
import fs from 'node:fs';

/* URL fournie par le harness (tests/run-all.mjs) ; 8790 par défaut en manuel. */
const BASE = process.env.AVOCATO_TEST_URL || 'http://127.0.0.1:8790';

function deep() {
  const f = function () {};
  return new Proxy(f, {
    get(_, p) { if (p === Symbol.toPrimitive) return () => 0; return deep(); },
    apply() { return deep(); }, set() { return true; }, construct() { return deep(); }
  });
}
function shims(window) {
  window.fetch = (...a) => fetch(...a);
  window.HTMLCanvasElement.prototype.getContext = function () { return deep(); };
  window.scrollTo = function(){};
  window.URL.createObjectURL = window.URL.createObjectURL || function(){ return 'blob:test'; };
  window.URL.revokeObjectURL = window.URL.revokeObjectURL || function(){};
  const dp = window.HTMLDialogElement ? window.HTMLDialogElement.prototype : window.HTMLElement.prototype;
  if (typeof dp.showModal !== 'function') {
    dp.showModal = function(){ this.open = true; };
    dp.close = function(){ if (this.open) { this.open = false; this.dispatchEvent(new window.Event('close')); } };
  }
  const wrap = (el) => {
    if (!el || !el.tagName) return el;
    if (el.tagName === 'FORM') {
      if (el.__np) return el.__np;
      const proxy = new Proxy(el, {
        get(t, p, _r) {
          if (typeof p === 'string' && !(p in t)) {
            const n = t.elements.namedItem(p);
            if (n) return n;
          }
          return Reflect.get(t, p, t);
        },
        set(t, p, v) {
          if (typeof p === 'string' && !(p in t) && t.elements.namedItem(p)) { t.elements.namedItem(p).value = v; return true; }
          return Reflect.set(t, p, v, t);
        },
        has(t, p) { return p in t || (typeof p === 'string' && !!t.elements.namedItem(p)); }
      });
      Object.defineProperty(el, '__np', { value: proxy, configurable: true });
      return proxy;
    }
    return el;
  };
  const d = window.document;
  const gE = d.getElementById.bind(d);
  d.getElementById = (id) => wrap(gE(id));
  const qS = d.querySelector.bind(d);
  d.querySelector = (s) => wrap(qS(s));
  const eQS = window.Element.prototype.querySelector;
  window.Element.prototype.querySelector = function (s) { return wrap(eQS.call(this, s)); };
}
async function makePage() {
  const dom = await JSDOM.fromURL(BASE + '/app/index.html', {
    runScripts: 'dangerously', resources: 'usable', pretendToBeVisual: true,
    beforeParse(window) { shims(window); }
  });
  const w = dom.window;
  await new Promise(r => w.addEventListener('load', r));
  await new Promise(r => setTimeout(r, 1200));
  return w;
}
const wait = (ms) => new Promise(r => setTimeout(r, ms));
function ls(w, k) { return JSON.parse(w.localStorage.getItem('avocato:' + k)); }
function setDossiers(w, arr) { w.localStorage.setItem('avocato:dossiers', JSON.stringify(arr)); }
const PAIR = process.env.AVOCATO_TEST_PAIR || fs.readFileSync('server/data/pairing.txt', 'utf8').trim();
async function enableUI(w) {
  w.Sync.open();
  await wait(200);
  const dlg = w.document.getElementById('dlgSync');
  const pairField = dlg.querySelector('[name=pair]');
  assert.ok(pairField, 'dialog sync expose un champ code d appairage');
  { // refus sans code valide (regression pairing)
    const bad = await fetch(BASE + '/v1/devices', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ label: 'x', pair: 'WRONG0' }) });
    assert.strictEqual(bad.status, 403, 'devices exige le code appairage');
  }
  const srvField = dlg.querySelector('[name=server]');
  if (srvField) srvField.value = BASE;
  pairField.value = PAIR;
  w.document.getElementById('btnSyncDevice').click();
  await wait(3000);
  const cfg = JSON.parse(w.localStorage.getItem('avocato:sync'));
  assert.ok(cfg && cfg.token, 'appareil cree');
  w.Sync.poll(false);
  return cfg.token;
}

const w1 = await makePage();
const w2 = await makePage();
assert.ok(w1.Sync && w2.Sync && w1.Sync.resolve, 'Sync + resolve exposes');
console.log('1. deux profils OK (w1 + w2, resolve expose)');

const T1 = '2026-09-01T10:00:00.000Z', T2 = '2026-09-02T10:00:00.000Z', T3 = '2026-09-03T10:00:00.000Z';
const CLIENT = 'Client Sync Épreuve — accents éèçû ⚖';
const IDX = 'sync-x1-' + Date.now().toString(36); /* unique id per run: repeatable, LWW tombstones from prior runs can't poison it */
w1.localStorage.clear();
setDossiers(w1, [{ id: IDX, client: CLIENT, statut: 'Prospect', honoraires: 1000, tva: 20, createdAt: '2026-09-01', updatedAt: T1 }]);
const tok1 = await enableUI(w1);
await w1.Sync.now();
let ent = await fetch(BASE + '/v1/entities?scope=dossiers', { headers: { 'x-avocato-token': tok1 } }).then(r => r.json());
let row = ent.rows.find(r => r.id === IDX);
assert.ok(row && !row.deleted, 'SX pousse');
assert.strictEqual(row.payload.client, CLIENT, 'UTF-8 byte-identique via HTTP + SQLite');
console.log('2. push w1 OK (miroir + accents intacts)');

w2.localStorage.clear();
const tok2 = await enableUI(w2);
await w2.Sync.now();
let d2 = ls(w2, 'dossiers').find(d => d.id === IDX);
assert.ok(d2 && d2.client === CLIENT, 'w2 tire le seed (merge 2 profils)');
assert.strictEqual(w2.Sync.status().conflicts, 0, 'zero conflit au merge propre');
console.log('3. merge 2 profils OK (pull propre, 0 conflit)');

setDossiers(w2, ls(w2, 'dossiers').map(d => d.id === IDX ? Object.assign({}, d, { client: 'Version B' }) : d));
setDossiers(w1, ls(w1, 'dossiers').map(d => d.id === IDX ? Object.assign({}, d, { client: 'Version C', updatedAt: T2 }) : d));
await w1.Sync.now();
await w2.Sync.now();
assert.ok(w2.Sync.status().conflicts >= 1, 'conflit enregistre (serveur plus recent)');
d2 = ls(w2, 'dossiers').find(d => d.id === IDX);
assert.strictEqual(d2.client, 'Version B', 'pas d’ecrasement silencieux (local garde B)');
console.log('4. conflit LWW OK (enregistre, local intact)');

w2.Sync.open();
await wait(200);
assert.ok(w2.document.querySelector('[data-res-srv="dossiers|' + IDX + '"]'), 'boutons Mien/Serveur affiches');
w2.document.querySelector('[data-res-srv="dossiers|' + IDX + '"]').click();
await wait(1500);
d2 = ls(w2, 'dossiers').find(d => d.id === IDX);
assert.strictEqual(d2.client, 'Version C', 'choix Serveur applique');
assert.strictEqual(w2.Sync.status().conflicts, 0, 'conflit solde');
console.log('5. choix Serveur OK');

setDossiers(w1, ls(w1, 'dossiers').map(d => d.id === IDX ? Object.assign({}, d, { client: 'Version E', updatedAt: T3 }) : d));
await w1.Sync.now();
setDossiers(w2, ls(w2, 'dossiers').map(d => d.id === IDX ? Object.assign({}, d, { client: 'Version F' }) : d));
await w2.Sync.now();
assert.ok(w2.Sync.status().conflicts >= 1, 'second conflit (F stale)');
w2.Sync.open();
await wait(200);
w2.document.querySelector('[data-res-mine="dossiers|' + IDX + '"]').click();
await wait(1500);
ent = await fetch(BASE + '/v1/entities?scope=dossiers', { headers: { 'x-avocato-token': tok2 } }).then(r => r.json());
row = ent.rows.find(r => r.id === IDX);
assert.ok(row && !row.deleted && row.payload.client === 'Version F', 'choix Mien gagne malgre at stale (force)');
assert.strictEqual(w2.Sync.status().conflicts, 0, 'conflit solde apres Mien');
console.log('6. choix Mien OK (force push, serveur = F)');

await w2.Sync.now();
const localD = ls(w2, 'dossiers');
ent = await fetch(BASE + '/v1/entities?scope=dossiers', { headers: { 'x-avocato-token': tok2 } }).then(r => r.json());
const byId = {};
ent.rows.forEach(r => { if (!r.deleted) byId[r.id] = r.payload; });
localD.forEach(d => {
  assert.ok(byId[d.id], 'miroir contient ' + d.id);
  assert.strictEqual(JSON.stringify(byId[d.id]), JSON.stringify(d), 'miroir exact pour ' + d.id);
});
assert.ok(byId[IDX].client === 'Version F', 'miroir final = F');
console.log('7. miroir SQL = localStorage OK (' + localD.length + ' dossiers byte-identiques)');

console.log('\nSYNC TEST: 7/7 PASS');
process.exit(0);
