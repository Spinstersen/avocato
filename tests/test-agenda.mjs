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
await new Promise(r => setTimeout(r, 1200));

function isoPlus(n) {
  const d = new Date(); d.setDate(d.getDate() + n);
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
const TODAY = isoPlus(0), TMR = isoPlus(1), D5 = isoPlus(5), D10 = isoPlus(10), M2 = isoPlus(-2), M10 = isoPlus(-10);

assert.ok(w.Cabinet, 'Cabinet'); assert.ok(w.Cour, 'Cour'); assert.ok(w.Agenda, 'Agenda'); assert.ok(w.Features, 'Features');
console.log('1. modules OK (Cabinet/Cour/Agenda/Features)');
assert.strictEqual(w.Sync.status().enabled, false);
console.log('2. sync off by default');

w.localStorage.clear();
w.localStorage.setItem('avocato:dossiers', JSON.stringify([
  { id: 'd1', client: 'Test Agenda SARL', statut: 'En cours', honoraires: 5000, tva: 20, provisionPct: 50, createdAt: TODAY, updatedAt: TODAY },
  { id: 'dAbo', client: 'Abo Client', mission: 'Abonnement - Secretariat juridique', statut: 'En cours', honoraires: 3000, tva: 20, abonnementActif: true, abonnementNext: M2, createdAt: M10, updatedAt: M10 }
]));
w.localStorage.setItem('avocato:echeances', JSON.stringify([
  { id: 'e-rythme', dossierId: 'd1', date: isoPlus(1), type: 'Rythme J2', intitule: 'Checkpoint J2', done: false, auto: 'RYTHME' },
  { id: 'e-abo', dossierId: 'dAbo', date: TODAY, type: 'Renouvellement abonnement', intitule: 'Abo mensuel', done: false, auto: 'ABO' },
  { id: 'e-delai', dossierId: 'd1', date: D5, type: 'Voie de recours', intitule: 'Appel - Test', done: false, auto: 'DELAI' },
  { id: 'e-late', dossierId: 'd1', date: M2, type: 'Remise livrables', intitule: 'Remise V1 en retard', done: false }
]));
w.localStorage.setItem('avocato:audiences', JSON.stringify([
  { id: 'a-tmr', dossierId: 'd1', date: TMR, heure: '09:00', juridiction: 'TPI (1re instance)', etat: 'À venir', objet: 'Fond', role: '2026/1' },
  { id: 'a-far', dossierId: 'd1', date: D10, heure: '10:00', juridiction: 'Cour d’appel', etat: 'À venir', objet: 'Lointaine' }
]));
w.localStorage.setItem('avocato:factures', JSON.stringify([
  { id: 'f-solde', dossierId: 'd1', num: 'FH-2026-001', date: M10, type: 'Facture solde', ht: 2500, tva: 500, ttc: 3000, statut: 'Émise' }
]));
w.localStorage.removeItem('avocato:alertMutes');
w.localStorage.removeItem('avocato:reglages');
w.Agenda.refreshBell();
console.log('3. seeds dates OK (today=' + TODAY + ')');

const alerts = w.Agenda.computeAlerts();
const kinds = new Set(alerts.map(a => a.kind));
for (const k of ['audience', 'delai', 'echeance', 'solde', 'abo']) assert.ok(kinds.has(k), 'alerte ' + k + ' manquante (got: ' + [...kinds] + ')');
assert.ok(!alerts.some(a => a.audienceId === 'a-far'), 'audience lointaine ne doit pas alerter');
console.log('4. computeAlerts 5 kinds OK (' + alerts.length + ' alertes: ' + alerts.map(a => a.kind + ':' + a.level).join(', ') + ')');

const firstId = alerts[0].id;
w.Agenda.snooze(firstId);
const after = w.Agenda.computeAlerts();
assert.ok(!after.some(a => a.id === firstId), 'snooze 24h doit masquer');
w.localStorage.removeItem('avocato:alertMutes');
assert.ok(w.Agenda.computeAlerts().some(a => a.id === firstId), 'demute restaure');
console.log('5. snooze 24h OK');

w.Cabinet.setMode('cabinet');
w.Cabinet.goView('calendrier');
await new Promise(r => setTimeout(r, 200));
const content = w.document.getElementById('content');
assert.ok(content.querySelector('.cal-grid'), 'grille calendrier');
assert.strictEqual(content.querySelectorAll('.cal-day').length, 42, '42 cases');
assert.ok(content.querySelector('.dot-rythme'), 'dot rythme');
assert.ok(content.querySelector('.dot-abo'), 'dot abo');
assert.ok(content.querySelector('.dot-delai'), 'dot delai');
assert.ok(content.querySelector('.dot-aud'), 'dot audience');
assert.ok(content.querySelector('#calDayPanel'), 'panneau jour');
assert.ok(content.querySelector('#calWeek'), 'semaine tribunal');
console.log('6. vue Calendrier OK (42 jours, dots rythme/abo/delai/audience)');

w.Agenda.dropOnDay('echeance', 'e-late', isoPlus(3));
let ech = JSON.parse(w.localStorage.getItem('avocato:echeances'));
assert.strictEqual(ech.find(e => e.id === 'e-late').date, isoPlus(3), 'drag reporte');
{ const u = w.document.querySelectorAll('.toast-undo'); u[u.length - 1].click(); }
ech = JSON.parse(w.localStorage.getItem('avocato:echeances'));
assert.strictEqual(ech.find(e => e.id === 'e-late').date, M2, 'undo restaure');
console.log('7. drag & drop echeance + Annuler OK');

w.Agenda.dropOnDay('audience', 'a-tmr', isoPlus(2));
let aud = JSON.parse(w.localStorage.getItem('avocato:audiences'));
assert.strictEqual(aud.find(a => a.id === 'a-tmr').date, isoPlus(2), 'audience reportee');
assert.strictEqual(aud.find(a => a.id === 'a-tmr').etat, 'Reportée', 'etat Reportee');
const tr = JSON.parse(w.localStorage.getItem('avocato:transitions') || '[]');
assert.ok(tr.some(t => t.to === 'Report ' + isoPlus(2)), 'report journalise');
{ const u = w.document.querySelectorAll('.toast-undo'); u[u.length - 1].click(); }
aud = JSON.parse(w.localStorage.getItem('avocato:audiences'));
assert.strictEqual(aud.find(a => a.id === 'a-tmr').date, TMR, 'undo audience');
console.log('8. drag audience -> Reportee + journal + undo OK');

const ics = w.Agenda.buildICS(w.Agenda.computeAlerts().slice(0, 3).map(a => ({ uid: a.id, date: a.date, heure: a.heure || '', title: a.title, desc: a.detail })));
assert.ok(ics.includes('BEGIN:VEVENT'), 'VEVENT');
assert.strictEqual((ics.match(/BEGIN:VEVENT/g) || []).length, 3, '3 VEVENT');
assert.ok(ics.includes('TRIGGER:-P2D'), 'VALARM 48h');
assert.ok(ics.includes('TRIGGER:-PT2H'), 'VALARM 2h');
console.log('9. ICS multi-VEVENT + VALARM -48h/-2h OK');

const bell = w.document.getElementById('bellBtn');
assert.ok(bell, 'cloche topbar');
assert.ok(!w.document.getElementById('bellCount').hidden, 'badge visible');
bell.click();
await new Promise(r => setTimeout(r, 100));
const panel = w.document.getElementById('bellPanel');
assert.ok(!panel.hidden && panel.querySelector('.bell-item'), 'panneau cloche liste');
assert.ok(panel.querySelector('#bellPush'), 'bouton pousser');
console.log('10. cloche topbar + panneau OK (' + panel.querySelectorAll('.bell-item').length + ' items)');

w.Cabinet.goView('today');
await new Promise(r => setTimeout(r, 250));
assert.ok(/audience\(s\) demain/.test(w.document.getElementById('content').textContent), 'bandeau audiences demain');
console.log('11. Aujourd hui affiche les audiences de demain');

console.log('\nPHASE D TEST: 11/11 PASS');
process.exit(0);
