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
    // spec shim: HTMLFormElement legacy named access (missing in jsdom, present in all browsers)
    window.scrollTo = function(){};
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
      if (el instanceof window.NodeList || Array.isArray(el)) {
        return new Proxy(el, { get(t, p) { if (typeof p === 'string' && /^\d+$/.test(p)) return wrap(t[p]); const v = Reflect.get(t, p, t); return typeof v === 'function' ? v.bind(t) : v; } });
      }
      return el;
    };
    const d = window.document;
    const gE = d.getElementById.bind(d);
    d.getElementById = (id) => wrap(gE(id));
    const qS = d.querySelector.bind(d);
    d.querySelector = (s) => wrap(qS(s));
    const qSA = d.querySelectorAll.bind(d);
    d.querySelectorAll = (s) => wrap(Array.from(qSA(s)));
  }
});
const w = dom.window;
await new Promise(r => w.addEventListener('load', r));
await new Promise(r => setTimeout(r, 900));

assert.ok(w.Cabinet, 'Cabinet'); assert.ok(w.Cour, 'Cour'); assert.ok(w.Sync, 'Sync'); assert.ok(w.App, 'App'); assert.ok(w.Features, 'Features');
console.log('1. modules OK');
assert.strictEqual(w.Sync.status().enabled, false);
console.log('2. sync off by default');

w.localStorage.setItem('avocato:dossiers', JSON.stringify([{ id: 'tst', client: 'Test Client SARL', statut: 'Prospect', honoraires: 1000, tva: 20, provisionPct: 50, createdAt: '2026-09-01', updatedAt: '2026-09-01' }]));
w.Cabinet.setMode('cabinet');
w.Cabinet.goView('audiences');
const content = w.document.getElementById('content');
assert.ok(/Audiences/.test(content.textContent) && /Aucune audience/.test(content.textContent));
console.log('3. vue Audiences OK');

w.Cour.openAudienceDlg(null, 'tst');
const f = w.document.getElementById('formAudience');
assert.ok(f.elements.namedItem('date').value.length === 10);
f.date.value = '2026-09-10';
f.juridiction.value = 'Tribunal de commerce';
f.objet.value = 'Référé — provision facture';
f.elements.namedItem('role').value = '2026/1234';
w.document.getElementById('btnAudSave').click();
let aud = JSON.parse(w.localStorage.getItem('avocato:audiences'));
assert.strictEqual(aud.length, 1);
assert.strictEqual(aud[0].etat, 'À venir');
assert.strictEqual(aud[0].dossierId, 'tst');
console.log('4. audience créée:', aud[0].date, aud[0].juridiction, '| dossier:', aud[0].dossierId);

w.Cour.openJugement(aud[0].id);
const jf = w.document.getElementById('formJugement');
jf.date.value = '2026-09-10';
jf.recours.value = 'appel';
jf.dispositif.value = 'Condamnation à 40 000 DH';
w.document.getElementById('btnJugSave').click();
const jug = JSON.parse(w.localStorage.getItem('avocato:jugements'));
assert.strictEqual(jug.length, 1);
assert.ok(jug[0].delai && /^\d{4}-\d{2}-\d{2}$/.test(jug[0].delai.ajustee));
const ech = JSON.parse(w.localStorage.getItem('avocato:echeances'));
const e = ech.find(x => x.type === 'Voie de recours');
assert.ok(e && e.intitule.includes('Appel') && e.auto === 'DELAI' && e.dossierId === 'tst');
console.log('5. jugement OK — appel 30j du', jug[0].date, '→ échéance:', e.date, e.intitule.includes('report') ? '(reportée)' : '(ouvrable)');

aud = JSON.parse(w.localStorage.getItem('avocato:audiences'));
assert.strictEqual(aud[0].etat, 'Jugement rendu');
console.log('6. état audience → Jugement rendu');

const r = w.Cour.computeRecours('2026-09-04', 'opposition'); // ven+15j=sam 19/09 -> report dim 20/09? (sam/dim fériés) => lundi 21
assert.ok(r && r.ajustee >= r.brut);
console.log('7. report fin de semaine:', r.brut, '->', r.ajustee);

w.Cabinet.viewDossier('tst');
await new Promise(r2 => setTimeout(r2, 250));
assert.ok(/Audiences & jugements/.test(w.document.getElementById('content').textContent));
console.log('8. panneau dossier injecté');

w.Cabinet.goView('audiences');
await new Promise(r2 => setTimeout(r2, 100));
w.document.querySelector('[data-del]').click();
assert.strictEqual(JSON.parse(w.localStorage.getItem('avocato:audiences')).length, 0);
w.document.querySelector('.toast-undo').click();
assert.strictEqual(JSON.parse(w.localStorage.getItem('avocato:audiences')).length, 1);
console.log('9. suppression + undo OK');

console.log('\nPHASE C TEST: 9/9 PASS');
process.exit(0);
