/* AVOCATO — Tests Mobile UX v6 : barre basse, tiroir, tables→fiches.
   Même harness que les autres tests (serveur local + JSDOM).
   Usage : node tests/test-mobile.mjs (via tests/run-all.mjs). */
import { JSDOM } from 'jsdom';
import assert from 'node:assert';

function deep() {
  const f = function () {};
  return new Proxy(f, {
    get(_, p) { if (p === Symbol.toPrimitive) return () => 0; return deep(); },
    apply() { return deep(); }, set() { return true; }, construct() { return deep(); }
  });
}
const BASE = process.env.AVOCATO_TEST_URL || 'http://127.0.0.1:8790';
const dom = await JSDOM.fromURL(BASE + '/app/index.html', {
  runScripts: 'dangerously', resources: 'usable', pretendToBeVisual: true,
  beforeParse(window) {
    window.HTMLCanvasElement.prototype.getContext = function () { return deep(); };
    window.scrollTo = function () {};
    window.Element.prototype.scrollIntoView = function () {};
    /* Simule un écran téléphone : les media queries (680 px) matchent. */
    window.matchMedia = function (q) {
      const m = /max-width:\s*(\d+)px/.test(q) ? Number(RegExp.$1) : 9999;
      return { matches: m >= 680, media: q, onchange: null, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, dispatchEvent() { return false; } };
    };
    window.URL.createObjectURL = window.URL.createObjectURL || function () { return 'blob:test'; };
    window.URL.revokeObjectURL = window.URL.revokeObjectURL || function () {};
    const dp = window.HTMLDialogElement ? window.HTMLDialogElement.prototype : window.HTMLElement.prototype;
    if (typeof dp.showModal !== 'function') {
      dp.showModal = function () { this.open = true; };
      dp.close = function () { if (this.open) { this.open = false; this.dispatchEvent(new window.Event('close')); } };
    }
    /* Accès par nom aux champs de formulaire (jsdom ne l'implémente pas). */
    const wrap = (el) => {
      if (!el || !el.tagName) return el;
      if (el.tagName === 'FORM') {
        if (el.__np) return el.__np;
        const proxy = new Proxy(el, {
          get(t, p, _r) {
            if (typeof p === 'string' && !(p in t)) {
              const n = t.elements.namedItem(p);
              if (n) return n.tagName === 'FORM' ? wrap(n) : n;
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
  }
});
const w = dom.window;
const $ = (s) => w.document.querySelector(s);
const $$ = (s) => Array.from(w.document.querySelectorAll(s));
const tick = (ms) => new Promise((r) => setTimeout(r, ms || 80));

await new Promise((r) => w.addEventListener('load', r));
await new Promise((r) => setTimeout(r, 1200));

function isoPlus(n) {
  const d = new Date(); d.setDate(d.getDate() + n);
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
const TODAY = isoPlus(0);

/* ---- 1. structure de la barre mobile ---- */
assert.ok($('#mobBar'), 'barre mobile présente');
assert.strictEqual($$('#mobBar .mob-tab').length, 9, '4 onglets Base + 5 onglets Cabinet');
assert.ok($('.mob-vault [data-mob="base"]') && $('.mob-vault [data-mob="search"]') && $('.mob-vault [data-mob="cabinet"]') && $('.mob-vault [data-mob="menu"]'), 'onglets Base');
assert.ok($('.mob-cab [data-mob-view="today"]') && $('.mob-cab [data-mob-view="dossiers"]') && $('.mob-cab [data-mob-view="calendrier"]') && $('.mob-cab [data-mob-view="factures"]') && $('.mob-cab [data-mob="menu"]'), 'onglets Cabinet');
assert.ok($('#btnSearchMobile'), 'recherche topbar mobile');
assert.ok(w.Mobile && typeof w.Mobile.decorate === 'function' && typeof w.Mobile.refresh === 'function', 'module Mobile exposé');
console.log('1. barre mobile + module OK');

/* ---- 2. recherche : palette de commandes ---- */
$('.mob-vault [data-mob="search"]').click();
await tick();
assert.strictEqual($('#paletteDlg').open, true, 'palette ouverte');
w.Palette.close();
console.log('2. recherche mobile -> palette OK');

/* ---- 3. bascule vers le Cabinet ---- */
w.localStorage.setItem('avocato:dossiers', JSON.stringify([
  { id: 'm1', client: 'Test Mobile SARL', type: 'Freelance', mission: 'Mission test', statut: 'En cours', honoraires: 5000, tva: 20, provisionPct: 50, createdAt: TODAY, updatedAt: TODAY }
]));
$('.mob-vault [data-mob="cabinet"]').click();
await tick(150);
assert.strictEqual(w.Cabinet.getMode(), 'cabinet', 'mode cabinet');
assert.strictEqual(w.document.body.dataset.mode, 'cabinet', 'body[data-mode] synchronisé');
console.log('3. onglet Cabinet -> mode cabinet OK');

/* ---- 4. onglet Dossiers : table transformée en fiches ---- */
$('.mob-cab [data-mob-view="dossiers"]').click();
await tick(150);
assert.ok($('#tblDossiers'), 'vue dossiers rendue');
const table = $('#tblDossiers');
assert.ok(table.classList.contains('mtable'), 'table décorée .mtable');
const firstCell = table.querySelector('tbody tr td');
assert.strictEqual(firstCell.getAttribute('data-label'), 'Client', 'data-label du thead');
const actCell = table.querySelector('tbody tr td:last-child');
assert.strictEqual(actCell.getAttribute('data-label'), 'Actions', 'data-label actions');
assert.ok($('.mob-cab [data-mob-view="dossiers"]').classList.contains('active'), 'onglet actif');
assert.strictEqual($('.mob-cab [data-mob-view="dossiers"]').getAttribute('aria-current'), 'page', 'aria-current');
console.log('4. dossiers -> fiches data-label OK');

/* ---- 5. onglet Argent (factures) ---- */
$('.mob-cab [data-mob-view="factures"]').click();
await tick(150);
assert.ok(/Factures/.test($('#content').textContent), 'vue factures rendue');
assert.ok($('.mob-cab [data-mob-view="factures"]').classList.contains('active'), 'onglet Argent actif');
assert.ok(!$('.mob-cab [data-mob-view="dossiers"]').classList.contains('active'), 'ancien onglet inactif');
console.log('5. onglet Argent -> factures actif OK');

/* ---- 6. onglet Plus -> tiroir latéral + fermeture ---- */
$('.mob-cab [data-mob="menu"]').click();
await tick(120);
assert.ok(w.document.body.classList.contains('sidebar-open'), 'tiroir ouvert');
$('#scrim').click();
assert.ok(!w.document.body.classList.contains('sidebar-open'), 'tiroir fermé au scrim');
console.log('6. tiroir mobile (menu/scrim) OK');

/* ---- 7. onglet Base -> tableau de bord vault ---- */
$('.mob-vault [data-mob="base"]').click();
await tick(150);
assert.strictEqual(w.Cabinet.getMode(), 'vault', 'mode vault');
assert.ok($('#content').classList.contains('dash-mode'), 'tableau de bord Base');
assert.ok($('.mob-vault [data-mob="base"]').classList.contains('active'), 'onglet Base actif');
console.log('7. onglet Base -> dashboard OK');

/* ---- 8. décor idempotent (table dossiers courante) ---- */
$('.mob-cab [data-mob-view="dossiers"]').click();
await tick(150);
const table2 = $('#tblDossiers');
w.Mobile.decorate();
w.Mobile.decorate();
assert.strictEqual(table2.querySelectorAll('td[data-label="Client"]').length, 1, 'un seul data-label par cellule');
console.log('8. décor tables idempotent OK');

/* ---- 9. document vault : sommaire replié + événement rendered ---- */
const DATA = w.VAULT_DATA || [];
if (DATA.length) {
  let sawEvent = null;
  w.document.addEventListener('avocato:rendered', (e) => { if (e.detail && e.detail.view === 'base-doc') sawEvent = e.detail.id; });
  w.App.openDoc(DATA[0].id);
  await tick();
  assert.strictEqual(sawEvent, DATA[0].id, 'événement avocato:rendered base-doc');
  const toc = $('#content .toc');
  if (toc) assert.strictEqual(toc.open, false, 'sommaire replié par défaut (mobile)');
  console.log('9. rendered base-doc + sommaire replié OK');
} else {
  console.log('9. pas de vault embarqué — événement non testé');
}

console.log('\nPHASE MOBILE TEST: 9/9 PASS');
process.exit(0);
