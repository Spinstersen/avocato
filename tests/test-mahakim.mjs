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
  }
});
const w = dom.window;
await new Promise(r => w.addEventListener('load', r));
await new Promise(r => setTimeout(r, 1200));

function isoPlus(n) {
  const d = new Date(); d.setDate(d.getDate() + n);
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
const D = (off) => isoPlus(off);
const CURM = isoPlus(0).slice(0, 7);

assert.ok(w.Cabinet, 'Cabinet'); assert.ok(w.Cour, 'Cour'); assert.ok(w.Mahakim, 'Mahakim'); assert.ok(w.MahakimAdapter, 'Adapter');
console.log('1. modules OK (Cabinet/Cour/Mahakim/Adapter)');

assert.strictEqual(w.Mahakim.parseRole('1234/2026'), '1234/2026');
assert.strictEqual(w.Mahakim.parseRole('Rôle n°  5678 / 2025'), '5678/2025');
assert.strictEqual(w.Mahakim.parseRole('sans numero'), null);
assert.strictEqual(w.Mahakim.parseDateFR('12/09/2026'), '2026-09-12');
assert.strictEqual(w.Mahakim.parseDateFR('5-9-26'), '2026-09-05');
assert.strictEqual(w.Mahakim.parseDateFR('2026-09-12'), '2026-09-12');
assert.strictEqual(w.Mahakim.parseDateFR('32/13/2026'), null);
assert.strictEqual(w.Mahakim.parseHeure('09:30'), '09:30');
assert.strictEqual(w.Mahakim.parseHeure('9h30'), '09:30');
assert.strictEqual(w.Mahakim.parseHeure(''), '');
console.log('2. parseurs role/date/heure OK (dont invalides -> null)');

w.Cour.openAudienceDlg();
const jurOpts = Array.from(w.document.querySelector('#dlgAudience select[name="juridiction"]').options).map(o => o.value || o.text);
w.document.getElementById('dlgAudience').close();
for (const cell of ['TPI de Casablanca', 'Cour d\u2019appel de Rabat', 'Tribunal de commerce de Casa', 'Tribunal administratif', 'Cour de cassation', 'Justice de paix', 'XY bizarre']) {
  const j = w.Mahakim.parseJuridiction(cell);
  assert.ok(jurOpts.includes(j), 'juridiction canonique: ' + cell + ' -> ' + j);
}
assert.strictEqual(w.Mahakim.parseVille('TPI de Casablanca'), 'Casablanca');
assert.strictEqual(w.Mahakim.parseVille('Tribunal de commerce'), '', 'pas de ville fantome');
assert.strictEqual(w.Mahakim.parseVille('Tribunal de commerce de Casa'), 'Casablanca');
console.log('3. juridictions canoniques OK (== options dialogue Cour, ’ U+2019) + villes');

const TSV = 'N° rôle\tJuridiction\tDate\tHeure\tObjet\n'
  + '1234/2026\tTPI de Casablanca\t' + D(7) + '\t09:30\tContestation facture\n'
  + '5678/2025\tCour d\u2019appel de Rabat\t' + D(10) + '\t10h00\tAppel jugement\n'
  + '9012/2026\tTribunal de commerce de Casa\t' + D(15) + '\t\tRéféré provision\n'
  + '\t\t' + D(17) + '\t\tAtlas SARL — suivi';
const parsed = w.Mahakim.parseTSV(TSV);
assert.strictEqual(parsed.rows.length, 4, '4 lignes');
assert.strictEqual(parsed.rows[0].role, '1234/2026');
assert.strictEqual(parsed.rows[0].date, D(7));
assert.strictEqual(parsed.rows[0].heure, '09:30');
assert.strictEqual(parsed.rows[0].ville, 'Casablanca');
assert.strictEqual(parsed.rows[1].juridiction, 'Cour d\u2019appel');
assert.strictEqual(parsed.rows[1].heure, '10:00');
assert.strictEqual(parsed.rows[3].role, null);
console.log('4. TSV reel parse OK (header auto, roles, dates, heures, villes)');

w.localStorage.clear();
w.localStorage.setItem('avocato:dossiers', JSON.stringify([
  { id: 'd1', client: 'Atlas SARL', statut: 'En cours', honoraires: 5000, tva: 20, createdAt: D(-30), updatedAt: D(-30) }
]));
w.localStorage.setItem('avocato:audiences', JSON.stringify([
  { id: 'a-old', dossierId: 'd1', role: '1234/2026', date: D(5), heure: '09:00', juridiction: 'TPI (1re instance)', ville: '', etat: 'À venir', objet: 'Ancien', updatedAt: D(-5) + 'T10:00:00' },
  { id: 'a-same', dossierId: 'd1', role: '5678/2025', date: D(10), heure: '10:00', juridiction: 'Cour d\u2019appel', ville: 'Rabat', etat: 'À venir', objet: 'Appel', updatedAt: D(-5) + 'T10:00:00' }
]));
w.localStorage.setItem('avocato:transitions', JSON.stringify([]));
const m1 = w.Mahakim.matchDossier(parsed.rows[0]);
assert.strictEqual(JSON.parse(JSON.stringify(m1)).dossierId, 'd1');
assert.strictEqual(JSON.parse(JSON.stringify(m1)).how, 'role');
const m4 = w.Mahakim.matchDossier(parsed.rows[3]);
assert.strictEqual(JSON.parse(JSON.stringify(m4)).dossierId, 'd1', 'match client flou sans role');
const c1 = JSON.parse(JSON.stringify(w.Mahakim.classify(parsed.rows[0], 'd1')));
assert.strictEqual(c1.kind, 'report', 'date differente -> report');
const c2 = JSON.parse(JSON.stringify(w.Mahakim.classify(parsed.rows[1], 'd1')));
assert.strictEqual(c2.kind, 'inchangee', 'meme date -> inchangee');
const c3 = JSON.parse(JSON.stringify(w.Mahakim.classify(parsed.rows[2], '')));
assert.strictEqual(c3.kind, 'sans-dossier');
console.log('5. matching (role exact + client flou) + diff OK');

const items = parsed.rows.map(r => {
  const m = JSON.parse(JSON.stringify(w.Mahakim.matchDossier(r)));
  return { row: JSON.parse(JSON.stringify(r)), dossierId: m.dossierId, selected: true };
});
items[2].dossierId = 'd1';
const res = JSON.parse(JSON.stringify(w.Mahakim.confirmImport(items)));
assert.strictEqual(res.created.length, 2, '2 nouvelles');
assert.strictEqual(res.updated.length, 1, '1 report');
assert.strictEqual(res.skipped, 1, '1 inchangee ignoree');
let auds = JSON.parse(w.localStorage.getItem('avocato:audiences'));
assert.strictEqual(auds.find(a => a.id === 'a-old').date, D(7), 'report applique');
const created = auds.filter(a => (res.created || []).includes(a.id));
assert.ok(created.length === 2 && created.every(a => a.etat === 'À venir' && a.source === 'mahakim' && a.importBatch === res.batchId), 'statuts exacts + source + lot');
const trs = JSON.parse(w.localStorage.getItem('avocato:transitions'));
assert.ok(trs.some(t => t.to === 'Report ' + D(7) && t.motif === 'import mahakim'), 'report journalise');
assert.ok(w.Mahakim.getLots().some(l => l.id === res.batchId), 'lot memorise');
assert.ok(w.Mahakim.undoLot(res.batchId), 'undo lot');
auds = JSON.parse(w.localStorage.getItem('avocato:audiences'));
assert.strictEqual(auds.find(a => a.id === 'a-old').date, D(5), 'date restauree');
assert.strictEqual(auds.length, 2, 'creations retirees');
assert.ok(!w.Mahakim.getLots().some(l => l.id === res.batchId), 'lot retire');
console.log('6. import par lot + journal + annulation OK');

const bm = { stats: { count: 1 }, rows: [{ cells: ['1234/2026', 'TPI de Casablanca', D(7), '09:30', 'Test JSON'] }] };
const pj = w.Mahakim.parseJSON(JSON.stringify(bm));
assert.strictEqual(pj.rows.length, 1);
assert.strictEqual(JSON.parse(JSON.stringify(pj.rows[0])).role, '1234/2026');
assert.strictEqual(JSON.parse(JSON.stringify(pj.rows[0])).ville, 'Casablanca');
assert.ok(w.Mahakim.parseJSON('{pas json').error, 'JSON invalide signale');
assert.ok(w.MahakimAdapter.list().includes('paste') && w.MahakimAdapter.list().includes('json'), 'adaptateurs natifs');
w.MahakimAdapter.register('api-test', { label: 'API test', parse: () => ({ rows: [], skipped: 0 }) });
assert.ok(w.MahakimAdapter.list().includes('api-test'), 'register() extensible sans toucher au reste');
console.log('7. JSON bookmarklet + interface MahakimAdapter OK');

const txt = await fetch(BASE + '/app/tools/mahakim-bookmarklet.txt').then(r => r.text());
assert.ok(txt.includes('/v1/imports/mahakim'), 'endpoint POST documente');
assert.ok(txt.includes('avocato_bm_token'), 'token documente');
assert.ok(txt.includes('CGU') || txt.includes('cgu') || txt.includes('Respect'), 'note CGU presente');
assert.ok(w.Mahakim.bookmarkletSource().includes('/v1/imports/mahakim'), 'code embarque coherent');
console.log('8. bookmarklet + guide servis OK');

w.Cabinet.setMode('cabinet');
w.Cabinet.goView('audiences');
await new Promise(r => setTimeout(r, 300));
const openBtn = w.document.querySelector('[data-mk-open]');
assert.ok(openBtn, 'bouton Importer dans vue Audiences');
openBtn.click();
await new Promise(r => setTimeout(r, 100));
assert.ok(w.document.getElementById('dlgMahakim').open, 'dialogue import');
w.document.getElementById('formMahakim').payload.value = TSV;
w.document.getElementById('btnMkAnalyze').click();
await new Promise(r => setTimeout(r, 100));
const prevTxt = w.document.getElementById('mkPreview').textContent;
for (const b of ['report', 'nouvelle', 'inchangée', 'sans dossier']) assert.ok(prevTxt.includes(b), 'badge ' + b);
const selRow3 = w.document.querySelector('[data-mk-dos="2"]');
selRow3.value = 'd1';
selRow3.dispatchEvent(new w.Event('change', { bubbles: true }));
await new Promise(r => setTimeout(r, 100));
assert.ok(w.document.querySelector('[data-mk-diff="2"]').textContent.includes('nouvelle'), 'remap manuel -> nouvelle');
w.document.getElementById('btnMkImport').click();
await new Promise(r => setTimeout(r, 200));
auds = JSON.parse(w.localStorage.getItem('avocato:audiences'));
assert.strictEqual(auds.length, 4, '2 audiences creees via UI (report maj sur place)');
console.log('9. dialogue complet OK (analyse, mapping manuel, import UI)');

console.log('\nPHASE F TEST: 9/9 PASS');
process.exit(0);
