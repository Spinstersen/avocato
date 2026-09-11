/* AVOCATO — Tests Phase 2 : correctifs client (provisions 0%, TTC, conflits,
   numerotation LM/PV, garde-fous storage, URL veille, purge alertMutes).
   Necessite le serveur sur http://127.0.0.1:8790 (meme harness que test-relations). */
import { JSDOM } from 'jsdom';
import assert from 'node:assert';

function deep() {
  const f = function () {};
  return new Proxy(f, {
    get(_, p) { if (p === Symbol.toPrimitive) return () => 0; return deep(); },
    apply() { return deep(); }, set() { return true; }, construct() { return deep(); }
  });
}
/* URL fournie par le harness (tests/run-all.mjs) ; 8790 par défaut en manuel. */
const BASE = process.env.AVOCATO_TEST_URL || 'http://127.0.0.1:8790';
const dom = await JSDOM.fromURL(BASE + '/app/index.html', {
  runScripts: 'dangerously', resources: 'usable', pretendToBeVisual: true,
  beforeParse(window) {
    window.HTMLCanvasElement.prototype.getContext = function () { return deep(); };
    window.scrollTo = function () {};
    window.URL.createObjectURL = window.URL.createObjectURL || function () { return 'blob:test'; };
    window.URL.revokeObjectURL = window.URL.revokeObjectURL || function () {};
    window.open = function () { return null; };
    const dp = window.HTMLDialogElement ? window.HTMLDialogElement.prototype : window.HTMLElement.prototype;
    if (typeof dp.showModal !== 'function') {
      dp.showModal = function () { this.open = true; };
      dp.close = function () { if (this.open) { this.open = false; this.dispatchEvent(new window.Event('close')); } };
    }
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
await new Promise(r => w.addEventListener('load', r));
await new Promise(r => setTimeout(r, 1400));

assert.ok(w.Cabinet && w.Relations && w.Features && w.Agenda, 'modules charges');
console.log('1. modules OK (Cabinet/Relations/Features/Agenda)');

/* ---- 1b. noyau partage (Phase 3) ---- */
assert.ok(w.AvocatoCore, 'AvocatoCore charge');
assert.strictEqual(w.AvocatoCore.esc('<b>"x"</b>'), '&lt;b&gt;&quot;x&quot;&lt;/b&gt;', 'esc');
const ttcCore = w.AvocatoCore.calcTTC(100, 20);
assert.ok(ttcCore.ht === 100 && ttcCore.tva === 20 && ttcCore.ttc === 120, 'calcTTC');
assert.strictEqual(w.AvocatoCore.provPct({ provisionPct: 0 }), 0, 'provPct 0');
assert.strictEqual(w.AvocatoCore.provPct({}), 50, 'provPct defaut 50');
assert.strictEqual(w.AvocatoCore.addDaysISO('2026-09-10', 2), '2026-09-12', 'addDaysISO');
assert.strictEqual(w.AvocatoCore.diffDays('2026-09-12', '2026-09-10'), 2, 'diffDays');
assert.strictEqual(w.AvocatoCore.normalize('Éléonore  DUPONT'), 'eleonore dupont', 'normalize');
assert.ok(w.AvocatoCore.isSimilar('SARL Atlas', 'sarl atlas'), 'isSimilar');
console.log('1b. AvocatoCore OK (esc, calcTTC, provPct, dates, normalize, similarite)');

const norm = (s) => String(s).replace(/[\u202f\u00a0\u2009]/g, ' ');
const digits = (s) => String(s).replace(/[^\d]/g, '');
const click = (el) => el.dispatchEvent(new w.MouseEvent('click', { bubbles: true, cancelable: true }));

function seedDossiers(arr) { w.localStorage.setItem('avocato:dossiers', JSON.stringify(arr)); }
function statsBand() {
  const stats = Array.from(w.document.querySelectorAll('#content .stats-band .stat'));
  const out = {};
  stats.forEach(s => {
    const lbl = norm(s.querySelector('.stat-lbl').textContent).trim();
    out[lbl] = norm(s.querySelector('.stat-num').textContent).trim();
  });
  return out;
}

/* ---- 2. provision 0% respectee (et dashboard en TTC) ---- */
seedDossiers([{ id: 'd0', client: 'Zero Provision SARL', statut: 'En cours', honoraires: 10000, tva: 20, provisionPct: 0, createdAt: '2026-09-01', updatedAt: '2026-09-01' }]);
w.Cabinet.goView('dashboard');
await new Promise(r => setTimeout(r, 100));
let band = statsBand();
const provLabel = Object.keys(band).find(k => k.indexOf('Provisions attendues') !== -1);
assert.ok(provLabel, 'stat provisions presente');
assert.strictEqual(digits(band[provLabel]), '0', 'provision 0% => 0 DH (recu: ' + band[provLabel] + ')');
console.log('2. provision 0% => 0 DH (pas de conversion en 50%)');

seedDossiers([{ id: 'd0', client: 'Zero Provision SARL', statut: 'En cours', honoraires: 10000, tva: 20, provisionPct: 50, createdAt: '2026-09-01', updatedAt: '2026-09-01' }]);
w.Cabinet.goView('dashboard');
await new Promise(r => setTimeout(r, 100));
band = statsBand();
assert.strictEqual(digits(band[provLabel]), '6000', 'provision 50% sur TTC 12000 => 6000 (recu: ' + band[provLabel] + ')');
console.log('3. dashboard provisions calculees sur TTC (6000, pas 5000)');

/* ---- 4. table dossiers : cellule provision 0% ---- */
seedDossiers([{ id: 'd0', client: 'Zero Provision SARL', statut: 'En cours', honoraires: 10000, tva: 20, provisionPct: 0, createdAt: '2026-09-01', updatedAt: '2026-09-01' }]);
w.Cabinet.goView('dossiers');
await new Promise(r => setTimeout(r, 50));
const row = w.document.querySelector('#tblDossiers [data-id="d0"]');
assert.ok(row, 'ligne dossier rendue');
assert.ok(row.textContent.indexOf('0%') !== -1, 'cellule provision affiche 0%');
assert.ok(row.textContent.indexOf('0 DH') !== -1, 'cellule provision affiche 0 DH');
console.log('4. table dossiers : 0% affiche 0 DH / 0%');

/* ---- 5. garde-fou storage : valeur non-tableau => [] ---- */
w.localStorage.setItem('avocato:dossiers', JSON.stringify({ bogus: 1 }));
assert.ok(Array.isArray(w.Cabinet.STORE.dossiers), 'STORE.dossiers reste un tableau');
assert.strictEqual(w.Cabinet.STORE.dossiers.length, 0, 'valeur corrompue ignoree');
console.log('5. STORE.dossiers robuste aux donnees corrompues');

/* ---- 6. applyBackup refuse une sauvegarde invalide ---- */
assert.throws(() => w.Cabinet.applyBackup({ nope: true }), /dossiers/, 'applyBackup rejette');
assert.throws(() => w.Cabinet.applyBackup(null), /sauvegarde/, 'applyBackup rejette null');
console.log('6. applyBackup valide la structure (rejet sans corruption)');

/* ---- 7. numerotation LM/PV stable (un numero par document) ---- */
seedDossiers([{ id: 'd1', client: 'SARL Atlas', statut: 'En cours', honoraires: 10000, tva: 20, provisionPct: 50, mission: 'Mission test', createdAt: '2026-09-01', updatedAt: '2026-09-01' }]);
w.localStorage.removeItem('avocato:letters');
const lm1 = w.Relations.openLM('d1');
const lm2 = w.Relations.openLM('d1');
assert.strictEqual(lm1, lm2, 'LM : meme numero a la reimpression (' + lm1 + ' vs ' + lm2 + ')');
const pv1 = w.Relations.openPV('d1');
const pv2 = w.Relations.openPV('d1');
assert.strictEqual(pv1, pv2, 'PV : meme numero a la reimpression');
assert.ok(lm1.indexOf('LM-') === 0 && pv1.indexOf('PV-') === 0, 'prefixes LM/PV');
const letters = JSON.parse(w.localStorage.getItem('avocato:letters'));
assert.strictEqual(letters.length, 2, '2 documents lettres persistes');
console.log('7. LM/PV : numeros persistes et reutilises (' + lm1 + ' / ' + pv1 + ')');

/* ---- 8. conflit : pas d auto-detection en edition ---- */
w.Cabinet.goView('dossiers');
await new Promise(r => setTimeout(r, 50));
const editBtn = w.document.querySelector('#tblDossiers [data-act="edit"][data-id="d1"]');
assert.ok(editBtn, 'bouton editer');
click(editBtn);
await new Promise(r => setTimeout(r, 60));
const form = w.document.getElementById('formDossier');
const hint = w.document.getElementById('conflictHint');
assert.ok(form && hint, 'dialogue dossier + hint presents');
form.client.value = 'SARL Atlas';
form.client.dispatchEvent(new w.Event('input', { bubbles: true }));
assert.strictEqual(hint.style.display, 'none', 'pas de conflit du dossier avec lui-meme');
form.client.value = 'SARL Concurrente';
form.client.dispatchEvent(new w.Event('input', { bubbles: true }));
const selfHits = w.Features.checkConflitsFor('SARL Atlas', '', '', 'd1');
assert.strictEqual(selfHits.length, 0, 'excludeId respecte');
const otherHits = w.Features.checkConflitsFor('SARL Atlas', '', '', 'autre');
assert.ok(otherHits.length >= 1, 'conflit reel toujours detecte');
const dlg = w.document.getElementById('dlgDossier');
if (dlg && dlg.open && typeof dlg.close === 'function') dlg.close();
w.localStorage.setItem('avocato:conflictList', JSON.stringify(['SARL Concurrente']));
w.Cabinet.openSettings();
await new Promise(r => setTimeout(r, 40));
const taPlaque = w.document.querySelector('#dlgPlaque textarea[name="conflictList"]');
assert.ok(taPlaque && taPlaque.value.indexOf('SARL Concurrente') !== -1, 'liste noire pre-remplie a l ouverture des parametres');
w.document.getElementById('dlgPlaque').close();
console.log('8. conflits : exclusion du dossier en cours d edition + liste noire pre-remplie');

/* ---- 9. URL veille : javascript: filtre, https conserve ---- */
w.localStorage.setItem('avocato:veille', JSON.stringify([
  { id: 'v1', date: '2026-09-01', source: 'BO', title: 'Malicious', url: 'javascript:alert(1)', statut: 'A lire' },
  { id: 'v2', date: '2026-09-02', source: 'BO', title: 'Safe', url: 'https://sgg.gov.ma', statut: 'A lire' }
]));
w.Features.renderVeille();
await new Promise(r => setTimeout(r, 50));
const veilleHtml = w.document.getElementById('content').innerHTML;
assert.ok(veilleHtml.indexOf('javascript:') === -1, 'aucun lien javascript:');
assert.ok(veilleHtml.indexOf('href="https://sgg.gov.ma"') !== -1, 'lien https conserve');
assert.ok(/target="_blank" rel="noopener"/.test(veilleHtml), 'lien externe avec rel noopener');
console.log('9. veille : javascript: filtre, https + rel=noopener conserves');

/* ---- 10. alertMutes : purge des mutes expires ---- */
const past = new Date(Date.now() - 3600000).toISOString();
const future = new Date(Date.now() + 3600000).toISOString();
w.localStorage.setItem('avocato:alertMutes', JSON.stringify({ old: past, cur: future, bad: 'nimporte-quoi' }));
w.Agenda.computeAlerts();
const mutes = JSON.parse(w.localStorage.getItem('avocato:alertMutes'));
assert.deepStrictEqual(Object.keys(mutes), ['cur'], 'seuls les mutes futurs restent');
console.log('10. alertMutes purges (expires et invalides supprimes)');

/* ---- 11. export JSON ne jette pas + undo backup ---- */
const snap = { dossiers: [], conventions: [], letters: [] };
w.Cabinet.applyBackup(snap);
assert.strictEqual(w.Cabinet.STORE.dossiers.length, 0, 'backup vide applique');
w.Cabinet.exportJSON();
assert.ok(w.localStorage.getItem('avocato:lastExport'), 'lastExport ecrit');
console.log('11. export/import JSON : structure + lastExport OK');

console.log('\nPHASE 2 FIXES TEST: 11/11 PASS');
process.exit(0);
