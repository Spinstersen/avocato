import { JSDOM } from 'jsdom';
import assert from 'node:assert';

/* URL fournie par le harness (tests/run-all.mjs) ; 8790 par défaut en manuel. */
const BASE = process.env.AVOCATO_TEST_URL || 'http://127.0.0.1:8790';

function deep() {
  const f = function () {};
  return new Proxy(f, {
    get(_, p) { if (p === Symbol.toPrimitive) return () => 0; return deep(); },
    apply() { return deep(); }, set() { return true; }, construct() { return deep(); }
  });
}
const dom = await JSDOM.fromURL(BASE + '/app/index.html', {
  runScripts: 'dangerously', resources: 'usable', pretendToBeVisual: true,
  beforeParse(window) {
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
    const eQSA = window.Element.prototype.querySelectorAll;
    window.Element.prototype.querySelectorAll = function (s) { return Array.from(eQSA.call(this, s)).map(wrap); };
  }
});
const w = dom.window;
await new Promise(r => w.addEventListener('load', r));
await new Promise(r => setTimeout(r, 1200));

const Y = new Date().getFullYear();
const CURM = (() => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0'); })();
function ls(k) { return JSON.parse(w.localStorage.getItem('avocato:' + k)); }
function mockCount(k) { const v = ls(k); return Array.isArray(v) ? v.filter(x => x && x.mock === true).length : 0; }

assert.ok(w.Cabinet, 'Cabinet'); assert.ok(w.Mock, 'Mock'); assert.ok(w.Relations, 'Relations'); assert.ok(w.Agenda, 'Agenda'); assert.ok(w.Features, 'Features');
assert.ok(w.Cabinet.collectBackup && w.Cabinet.applyBackup, 'backup expose');
console.log('1. modules OK (Cabinet/Mock/Relations/Agenda/Features)');

w.localStorage.clear();
w.Mock.seed();
assert.strictEqual(ls('dossiers').length, 14, '14 dossiers');
assert.ok(ls('dossiers').every(d => d.mock === true), 'tout tamponne mock:true');
assert.strictEqual(mockCount('audiences'), 18, '18 audiences');
assert.strictEqual(mockCount('frais'), 14, '14 frais');
assert.strictEqual(mockCount('veille'), 6, '6 veille');
assert.strictEqual(mockCount('conventions'), 9, '9 conventions');
assert.strictEqual(mockCount('jugements'), 1, '1 jugement');
assert.strictEqual(mockCount('echeances'), 21, '20 rythmes (5x4) + 1 delai');
assert.ok((ls('transitions') || []).length >= 20, 'transitions chronologiques');
assert.strictEqual(JSON.parse(JSON.stringify(ls('objectifCA'))).targetHT, 45000, 'objectif 45000');
assert.strictEqual(w.localStorage.getItem('avocato:mock:snapshot'), null, 'pas de snapshot (aucune donnee reelle)');
assert.strictEqual(w.localStorage.getItem('avocato:lastExport'), null, 'lastExport absent (bonus O6)');
console.log('2. seed sur vide OK (volumes + snapshot absent + lastExport absent)');

const nums = ls('conventions').map(c => c.num).concat(ls('factures').map(f => f.num));
assert.strictEqual(new Set(nums).size, nums.length, 'numeros uniques');
assert.strictEqual(ls('numSeq:LM:' + Y), 1, 'compteur LM');
assert.strictEqual(ls('numSeq:PV:' + Y), 1, 'compteur PV');
const v0 = JSON.parse(JSON.stringify(w.Mock.validate()));
assert.strictEqual(v0.errors.length, 0, 'validate 0 erreur (got: ' + JSON.stringify(v0.errors) + ')');
assert.ok(v0.warnings.length >= 4, 'pathologies signalees en warnings (' + v0.warnings.length + ')');
console.log('3. unicite + compteurs + validate 0 erreur, ' + v0.warnings.length + ' warnings voulus');

const prog = JSON.parse(JSON.stringify(w.Features.computeObjectifProgress()));
assert.ok(prog.pct >= 69 && prog.pct <= 80, 'objectif mensuel ~70% (got ' + prog.pct + ')');
console.log('4. YTD mensuel ' + prog.pct + '% (fourchette Argent)');

w.Cabinet.setMode('cabinet');
w.Cabinet.goView('clients');
await new Promise(r => setTimeout(r, 150));
let groups = JSON.parse(JSON.stringify(w.Relations.groupClients()));
assert.ok(groups.find(g => g.nDossiers === 2), 'client multi-dossiers groupe');
w.Cabinet.goView('calendrier');
await new Promise(r => setTimeout(r, 150));
assert.ok(w.document.querySelector('.cal-grid'), 'calendrier rempli');
w.Cabinet.goView('finances');
await new Promise(r => setTimeout(r, 250));
assert.ok(/Registre mensuel/.test(w.document.getElementById('content').textContent), 'finances bougent');
w.Cabinet.goView('audiences');
await new Promise(r => setTimeout(r, 150));
assert.ok(/Audiences/.test(w.document.getElementById('content').textContent), 'audiences listees');
console.log('5. tour des vues OK (clients, calendrier, finances, audiences)');

(function rearmAbo() {
  // le timer d'init Features auto-facture ~3 s apres le chargement : on remet
  // l'abo en retard pour des asserts deterministes (comportement app inchange)
  const ds = JSON.parse(w.localStorage.getItem('avocato:dossiers'));
  const d = ds.find(x => x.id === 'mock-d-abo');
  const daysAgo2 = (() => { const t = new Date(); t.setDate(t.getDate() - 2); return t.getFullYear() + '-' + String(t.getMonth() + 1).padStart(2, '0') + '-' + String(t.getDate()).padStart(2, '0'); })();
  d.abonnementNext = daysAgo2;
  w.localStorage.setItem('avocato:dossiers', JSON.stringify(ds));
  const fs = JSON.parse(w.localStorage.getItem('avocato:factures')).filter(f => !(f.abonnement && (f.date || '').slice(0, 7) === CURM));
  w.localStorage.setItem('avocato:factures', JSON.stringify(fs));
})();
const alerts = JSON.parse(JSON.stringify(w.Agenda.computeAlerts()));
assert.ok(alerts.length >= 3, 'la cloche sonne (' + alerts.length + ')');
assert.ok(alerts.some(a => a.kind === 'solde'), 'alerte solde');
assert.ok(alerts.some(a => a.kind === 'abo'), 'alerte abo');
console.log('6. cloche OK (' + alerts.length + ' alertes: solde + abo + retards)');

const aboBefore = ls('factures').filter(f => f.abonnement && (f.date || '').slice(0, 7) === CURM).length;
assert.strictEqual(aboBefore, 0, 'pas de facture abo du mois avant dashboard');
w.Cabinet.goView('dashboard');
await new Promise(r => setTimeout(r, 300));
const aboAfter = ls('factures').filter(f => f.abonnement && (f.date || '').slice(0, 7) === CURM);
assert.strictEqual(aboAfter.length, 1, 'auto-facturation live au dashboard');
assert.strictEqual(aboAfter[0].statut, 'Émise', 'facture auto = Émise');
let dashTxt = w.document.getElementById('content').textContent;
assert.ok(/Données de démonstration/.test(dashTxt) || w.document.querySelector('[data-mock-seed]'), 'bouton demo (remplace loadSample)');
assert.ok(/démo cohérente/.test(dashTxt), 'badge validate ✓');
w.Cabinet.renderCabinet();
await new Promise(r => setTimeout(r, 300));
dashTxt = w.document.getElementById('content').textContent;
assert.ok(/Argent/.test(dashTxt), 'niveau Argent affiche (objectif 73%)');
console.log('7. dashboard OK (auto-facturation abo + demo + badge + Argent)');

assert.ok(w.document.querySelector('[data-backup-nag]'), 'bandeau O6 (lastExport absent)');
console.log('8. bonus O6 OK (rappel declenche apres seed)');

w.Mock.wipe();
assert.strictEqual((ls('dossiers') || []).length, 0, 'dossiers vides apres wipe');
assert.strictEqual(mockCount('audiences'), 0, 'audiences nettoyees');
const restFH = (ls('factures') || []).map(f => (/^FH-\d{4}-(\d+)$/.exec(f.num || '') || [])[1]).map(Number).filter(Boolean);
assert.strictEqual(ls('numSeq:FH:' + Y), Math.max.apply(null, [0].concat(restFH)), 'compteurs recomputes au max restant (high-water, jamais reutilise)');
assert.ok(!w.Mock.hasMock(), 'plus de mock');
console.log('9. wipe sans snapshot OK (filtre mock:true + numSeq recomputes)');

const real = [{ id: 'real-1', client: 'Vrai Client', statut: 'Prospect', honoraires: 1000, tva: 20, createdAt: '2026-01-05', updatedAt: '2026-01-05' }];
w.localStorage.setItem('avocato:dossiers', JSON.stringify(real));
w.localStorage.setItem('avocato:lastExport', JSON.stringify('2026-08-01'));
w.Mock.seed();
assert.ok(w.localStorage.getItem('avocato:mock:snapshot') !== null, 'snapshot pris (donnees reelles)');
assert.ok(ls('dossiers').every(d => d.mock === true), 'mock remplace pendant la demo');
w.Mock.wipe();
assert.strictEqual(JSON.stringify(ls('dossiers')), JSON.stringify(real), 'byte-identique apres wipe');
assert.strictEqual(JSON.parse(w.localStorage.getItem('avocato:lastExport')), '2026-08-01', 'lastExport restaure');
assert.strictEqual(w.localStorage.getItem('avocato:mock:snapshot'), null, 'snapshot consomme');
assert.ok(!w.Mock.hasMock(), 'aucun residu mock');
console.log('10. snapshot/restore byte-identique OK (donnees + lastExport)');

w.Mock.seed();
w.Sync.open();
await new Promise(r => setTimeout(r, 200));
{
  const fs = await import('node:fs');
  const pair = process.env.AVOCATO_TEST_PAIR || fs.readFileSync('server/data/pairing.txt', 'utf8').trim();
  w.document.querySelector('#dlgSync [name=server]').value = BASE;
  w.document.querySelector('#dlgSync [name=pair]').value = pair;
}
w.document.getElementById('btnSyncDevice').click();
await new Promise(r => setTimeout(r, 3000));
const syncCfg = JSON.parse(w.localStorage.getItem('avocato:sync'));
assert.ok(syncCfg && syncCfg.token, 'appareil cree (vrai parcours UI)');
const ent = await fetch(BASE + '/v1/entities?scope=dossierChecks', { headers: { 'x-avocato-token': syncCfg.token } }).then(r => r.json());
assert.ok(ent.rows.some(r => !r.deleted && r.id === 'mock-d-clo'), 'miroir SQLite recoit le seed (scope frais)');
const entD = await fetch(BASE + '/v1/entities?scope=dossiers', { headers: { 'x-avocato-token': syncCfg.token } }).then(r => r.json());
assert.ok(entD.rows.filter(r => r.id.indexOf('mock-') === 0).every(r => r.deleted === 0), 'seed pousse vers le miroir (deleted=0)');
w.Mock.wipe();
await w.Sync.now();
assert.ok(!w.Mock.hasMock(), 'wipe local apres sync');
const entD2 = await fetch(BASE + '/v1/entities?scope=dossiers', { headers: { 'x-avocato-token': syncCfg.token } }).then(r => r.json());
assert.ok(entD2.rows.filter(r => r.id.indexOf('mock-') === 0).every(r => r.deleted === 1), 'wipe pousse les tombstones (LWW, pas de resurrection)');
w.Sync.open();
await new Promise(r => setTimeout(r, 200));
w.document.querySelector('#dlgSync [name="enabled"]').checked = false;
w.document.getElementById('btnSyncPush').click();
await new Promise(r => setTimeout(r, 1500));
assert.strictEqual(JSON.parse(w.localStorage.getItem('avocato:sync')).enabled, false, 'sync redesactivee');
console.log('11. miroir sync SQLite OK (seed pousse, wipe nettoie, parcours UI)');

console.log('\nPHASE G TEST: 11/11 PASS');
process.exit(0);
