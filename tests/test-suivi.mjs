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
});
const w = dom.window;
await new Promise(r => w.addEventListener('load', r));
await new Promise(r => setTimeout(r, 1200));

function isoPlus(n) {
  const d = new Date(); d.setDate(d.getDate() + n);
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
const D = (off) => isoPlus(off);

assert.ok(w.Cabinet && w.Cour && w.Mahakim, 'modules');
assert.ok(w.Mahakim.parseDossierJSON && w.Mahakim.importDossierLot && w.Mahakim.openSuivi, 'API suivi');
console.log('1. modules OK (Cabinet/Cour/Mahakim + suivi)');

assert.strictEqual(w.Mahakim.normRole('2026/1202/1233'), '2026/1202/1233', 'triple reel');
assert.strictEqual(w.Mahakim.normRole('2026 / 1202 / 1233'), '2026/1202/1233', 'espaces');
assert.strictEqual(w.Mahakim.normRole('1234/2026'), '1234/2026', 'double intact');
assert.strictEqual(w.Mahakim.normRole('abc'), '', 'invalide -> vide');
console.log('2. triple rôle OK');

const j1 = JSON.parse(JSON.stringify(w.Mahakim.parseJuridictionAR('المحكمة الابتدائية المدنية بالدار البيضاء')));
assert.strictEqual(j1.juridiction, 'TPI (1re instance)');
assert.strictEqual(j1.ville, 'Casablanca');
const j2 = JSON.parse(JSON.stringify(w.Mahakim.parseJuridictionAR('محكمة الاستئناف بالرباط')));
assert.strictEqual(j2.juridiction, 'Cour d\u2019appel');
assert.strictEqual(j2.ville, 'Rabat');
const j3 = JSON.parse(JSON.stringify(w.Mahakim.parseJuridictionAR('xyz inconnu')));
assert.strictEqual(j3.juridiction, 'Autre');
assert.strictEqual(j3.ville, '');
console.log('3. tribunaux arabes OK (TPI/Casa, Appel/Rabat, inconnu)');

const FIXTURE = JSON.stringify({
  card: {
    tribunal: 'المحكمة الابتدائية المدنية بالدار البيضاء',
    role: '2026/1202/1233', national: '206202612021233',
    typeDossier: 'مدني افتتاحي', chambre: 'المسؤولية التقصيرية', juge: 'وضاح هدى',
    enregistrement: '20/01/2026', sujet: '',
    dernierJugement: 'حكم قطعي رقم : 17650', dateJugement: '21/07/2026'
  },
  procedures: [
    { date: '21/07/2026 09:00', type: 'حكم قطعي رقم 17650', decision: 'تحميل المسؤولية', prochaine: '' },
    { date: '07/07/2026 09:00', type: 'المداولة أو التأمل', decision: 'التأمل', prochaine: '21/07/2026 09:00' },
    { date: '16/06/2026 09:00', type: 'التأخير وإدراجه بجلسة', decision: 'مهلة للتعقيب', prochaine: '07/07/2026 09:00' },
    { date: '20/01/2026', type: 'تعيين الملف لأول جلسة', decision: '', prochaine: '17/02/2026 09:00' },
    { date: '20/01/2026 00:00', type: 'تسجيل المقال', decision: '', prochaine: '' }
  ],
  parties: ['شركة التأمين', 'المدعي']
});
const parsed = JSON.parse(JSON.stringify(w.Mahakim.parseDossierJSON(FIXTURE)));
assert.ok(!parsed.error, 'pas d’erreur: ' + parsed.error);
assert.strictEqual(parsed.card.role, '2026/1202/1233');
assert.strictEqual(parsed.card.national, '206202612021233');
assert.strictEqual(parsed.card.chambre, 'المسؤولية التقصيرية');
assert.strictEqual(parsed.card.juge, 'وضاح هدى');
assert.strictEqual(parsed.card.juridiction, 'TPI (1re instance)');
assert.strictEqual(parsed.card.ville, 'Casablanca');
assert.strictEqual(parsed.card.enregistrement, '2026-01-20');
assert.strictEqual(parsed.card.dateJugement, '2026-07-21');
assert.strictEqual(parsed.procedures.length, 5);
assert.strictEqual(parsed.procedures[0].typeFr, 'Jugement définitif');
assert.strictEqual(parsed.procedures[1].prochaine, '2026-07-21');
assert.strictEqual(parsed.procedures[4].heure, '', '00:00 = date seule');
assert.strictEqual(parsed.procedures[4].date, '2026-01-20');
console.log('4. dossier réel parsé OK (carte + 5 actes + gloses)');

w.localStorage.clear();
w.localStorage.setItem('avocato:dossiers', JSON.stringify([
  { id: 'd1', client: 'Société Test', statut: 'En cours', honoraires: 5000, tva: 20, createdAt: D(0), updatedAt: D(0) }
]));
w.localStorage.setItem('avocato:audiences', JSON.stringify([]));
w.localStorage.setItem('avocato:transitions', JSON.stringify([]));
const r1 = JSON.parse(JSON.stringify(w.Mahakim.importDossierLot({ card: parsed.card, procedures: parsed.procedures, parties: parsed.parties, dossierId: 'd1', kind: 'decide', next: null })));
let auds = JSON.parse(w.localStorage.getItem('avocato:audiences'));
assert.strictEqual(auds.length, 1, '1 audience creee (affaire jugee, sans prochaine)');
assert.strictEqual(auds[0].etat, 'Jugement rendu', 'statut exact');
assert.strictEqual(auds[0].chambre, 'المسؤولية التقصيرية', 'chambre stockee');
assert.strictEqual(auds[0].procedures.length, 5, 'historique stocke');
assert.strictEqual(auds[0].dernierJugement.num, 'حكم قطعي رقم : 17650');
assert.ok(w.Mahakim.undoLot(r1.batchId), 'undo lot');
assert.strictEqual(JSON.parse(w.localStorage.getItem('avocato:audiences')).length, 0, 'annule');
console.log('5. import affaire jugée OK (création + carte + undo)');

w.localStorage.setItem('avocato:audiences', JSON.stringify([
  { id: 'a-old', dossierId: 'd1', role: '2027/1/5', date: D(5), heure: '09:00', juridiction: 'TPI (1re instance)', ville: '', etat: 'À venir', objet: 'Ancien', updatedAt: D(0) }
]));
const fut = { role: '2027/1/5', juridiction: 'TPI (1re instance)', ville: 'Rabat', national: '', typeDossier: '', chambre: 'Chambre X', juge: 'Juge Y', enregistrement: '', sujet: 'Suivi', dernierJugement: '', dateJugement: '' };
const r2 = JSON.parse(JSON.stringify(w.Mahakim.importDossierLot({ card: fut, procedures: [], parties: [], dossierId: 'd1', kind: 'report', next: { date: D(12), heure: '09:00' } })));
auds = JSON.parse(w.localStorage.getItem('avocato:audiences'));
assert.strictEqual(auds.find(a => a.id === 'a-old').date, D(12), 'report applique');
assert.strictEqual(auds.find(a => a.id === 'a-old').chambre, 'Chambre X', 'carte fusionnee');
const trs = JSON.parse(w.localStorage.getItem('avocato:transitions'));
assert.ok(trs.some(t => t.to === 'Report ' + D(12)), 'report journalise');
assert.ok(w.Mahakim.undoLot(r2.batchId), 'undo report');
auds = JSON.parse(w.localStorage.getItem('avocato:audiences'));
assert.strictEqual(auds.find(a => a.id === 'a-old').date, D(5), 'date restauree');
assert.ok(!auds.find(a => a.id === 'a-old').chambre, 'carte restauree (champ retire)');
console.log('6. import report OK (maj + journal + undo fidèle)');

const r3 = JSON.parse(JSON.stringify(w.Mahakim.importDossierLot({ card: parsed.card, procedures: parsed.procedures, parties: parsed.parties, dossierId: 'd1', kind: 'decide', next: null })));
w.Mahakim.openSuivi(r3.created[0]);
await new Promise(r => setTimeout(r, 100));
let content = w.document.getElementById('content');
assert.ok(/Suivi mahakim/.test(content.textContent), 'titre suivi');
assert.ok(content.querySelector('[dir="auto"]'), 'texte arabe en dir=auto');
assert.ok(w.document.getElementById('suiviPrint'), 'bouton Imprimer');
w.document.getElementById('suiviBack').click();
await new Promise(r => setTimeout(r, 200));
console.log('7. fiche Suivi OK (carte + RTL + retour)');

w.Cour.openAudienceDlg();
const fa = w.document.getElementById('formAudience');
fa.date.value = D(20);
fa.objet.value = 'Test champs';
fa.elements.namedItem('chambre').value = 'Chambre Boise';
fa.elements.namedItem('juge').value = 'Juge Test';
fa.elements.namedItem('numeroNational').value = '123';
fa.elements.namedItem('typeDossier').value = 'Civil';
w.document.getElementById('btnAudSave').click();
await new Promise(r => setTimeout(r, 100));
auds = JSON.parse(w.localStorage.getItem('avocato:audiences'));
const created = auds.find(a => a.objet === 'Test champs');
assert.ok(created && created.chambre === 'Chambre Boise' && created.juge === 'Juge Test' && created.numeroNational === '123' && created.typeDossier === 'Civil', 'champs suivi saisissables');
console.log('8. dialogue Cour étendu OK (4 champs persistés)');

w.Cabinet.setMode('cabinet');
w.Cabinet.goView('audiences');
await new Promise(r => setTimeout(r, 300));
assert.ok(w.document.querySelector('[data-ag-suivi]'), 'bouton Suivi dans agenda');
w.document.querySelector('[data-ag-suivi]').click();
await new Promise(r => setTimeout(r, 100));
assert.ok(/Suivi mahakim/.test(w.document.getElementById('content').textContent), 'Suivi depuis agenda');
console.log('9. greffe agenda OK (Suivi par ligne)');

const src = w.Mahakim.bookmarkletDossierSource();
assert.ok(src.includes('/v1/imports/mahakim') && src.includes('رقم الملف بالمحكمة') && src.includes('تاريخ الإجراء'), 'bookmarklet v2');
const txt = await fetch(BASE + '/app/tools/mahakim-bookmarklet.txt').then(r => r.text());
assert.ok(txt.includes('لائحة الإجراءات') && txt.includes('/v1/imports/mahakim'), 'guide v2 servi');
console.log('10. bookmarklet v2 + guide OK');

console.log('\nSUIVI TEST: 10/10 PASS');
process.exit(0);
