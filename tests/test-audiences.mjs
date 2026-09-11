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
const TODAY = isoPlus(0), TMR = isoPlus(1), J5 = isoPlus(5), J20 = isoPlus(20);

assert.ok(w.Cabinet, 'Cabinet'); assert.ok(w.Cour, 'Cour'); assert.ok(w.Agenda, 'Agenda');
assert.ok(w.Agenda.openRolePrint && w.Agenda.renderRolePrint && w.Agenda.upcomingAudiences, 'API agenda audiences');
console.log('1. modules OK (Cabinet/Cour/Agenda + role API)');

w.localStorage.clear();
w.localStorage.setItem('avocato:dossiers', JSON.stringify([
  { id: 'd1', client: 'Client Test A', statut: 'En cours', honoraires: 3000, tva: 20, createdAt: TODAY, updatedAt: TODAY },
  { id: 'd2', client: 'Client Test B', statut: 'En cours', honoraires: 4000, tva: 20, createdAt: TODAY, updatedAt: TODAY }
]));
w.localStorage.setItem('avocato:audiences', JSON.stringify([
  { id: 'a-today', dossierId: 'd1', role: '1/2026', juridiction: 'TPI (1re instance)', ville: 'Casa', date: TODAY, heure: '09:00', sens: '', adverse: '', objet: 'Fond du jour', etat: 'À venir', source: 'manuel', compteRendu: '' },
  { id: 'a-tmr', dossierId: 'd1', role: '2/2026', juridiction: 'Cour d\u2019appel', ville: '', date: TMR, heure: '10:00', sens: '', adverse: '', objet: 'Appel', etat: 'Reportée', source: 'mahakim', compteRendu: '' },
  { id: 'a-j5', dossierId: 'd2', role: '3/2026', juridiction: 'Tribunal de commerce', ville: '', date: J5, heure: '11:00', sens: '', adverse: '', objet: 'Référé', etat: 'À venir', source: 'manuel', compteRendu: '' },
  { id: 'a-far', dossierId: 'd2', role: '4/2026', juridiction: 'TPI (1re instance)', ville: '', date: J20, heure: '09:00', sens: '', adverse: '', objet: 'Lointaine', etat: 'À venir', source: 'manuel', compteRendu: '' },
  { id: 'a-past', dossierId: 'd1', role: '0/2025', juridiction: 'TPI (1re instance)', ville: '', date: isoPlus(-3), heure: '09:00', sens: '', adverse: '', objet: 'Passée', etat: 'Tenue', source: 'manuel', compteRendu: 'CR.' }
]));
w.localStorage.setItem('avocato:transitions', JSON.stringify([]));
w.Cabinet.setMode('cabinet');
w.Cabinet.goView('audiences');
await new Promise(r => setTimeout(r, 300));

const up = JSON.parse(JSON.stringify(w.Agenda.upcomingAudiences()));
assert.strictEqual(up.length, 4, '4 audiences a venir (passee Tenue exclue)');
assert.ok(up[0].date <= up[1].date && up[1].date <= up[2].date, 'tri chronologique');
console.log('2. upcomingAudiences OK (4, triees, Tenue exclue)');

const panel = w.document.querySelector('[data-ag-agenda]');
assert.ok(panel, 'panneau agenda greffe');
const ptxt = panel.textContent;
assert.ok(ptxt.includes('aujourd') && ptxt.includes('demain') && ptxt.includes('J-5'), 'badges J (aujourd’hui/demain/J-5)');
assert.strictEqual(panel.querySelectorAll('[data-ag-det]').length, 4, '4 lignes avec Details');
assert.ok(w.document.querySelector('#agPrint') && w.document.querySelector('#agWeekICS') && w.document.querySelector('#agCal'), 'boutons role/ICS/calendrier');
assert.ok(w.document.querySelectorAll('[data-ag-icsrow]').length >= 4, 'boutons ICS sur les lignes du tableau');
console.log('3. agenda greffe OK (badges, lignes, ICS, boutons)');

panel.querySelector('[data-ag-det]').click();
await new Promise(r => setTimeout(r, 100));
assert.ok(w.document.getElementById('dlgAudience').open, 'Détails ouvre le dialogue Cour');
w.document.getElementById('dlgAudience').close();
console.log('4. Détails -> dialogue Cour OK');

let captured = null;
w.URL.createObjectURL = (b) => { captured = b; return 'blob:x'; };
w.document.getElementById('agWeekICS').click();
await new Promise(r => setTimeout(r, 150));
assert.ok(captured instanceof w.Blob, 'ICS 7j telecharge');
const ics = await new Promise((res, rej) => { const fr = new w.FileReader(); fr.onload = () => res(fr.result); fr.onerror = rej; fr.readAsText(captured); });
assert.strictEqual((ics.match(/BEGIN:VEVENT/g) || []).length, 3, '3 VEVENT (7j, pas la lointaine)');
assert.ok(ics.includes('TRIGGER:-P2D') && ics.includes('TRIGGER:-PT2H'), 'VALARM 48h/2h');
console.log('5. ICS 7 jours OK (3 VEVENT + VALARM)');

w.document.getElementById('agPrint').click();
await new Promise(r => setTimeout(r, 100));
assert.ok(w.document.getElementById('dlgRole').open, 'dialogue role');
w.document.getElementById('formRole').day.value = TODAY;
w.document.querySelector('#formRole [name="span"]').value = 'jour';
w.document.getElementById('btnRoleGo').click();
await new Promise(r => setTimeout(r, 150));
let doc = w.document.getElementById('content');
assert.ok(/Rôle d.audiences/.test(doc.textContent), 'titre role');
assert.ok(/Fond du jour/.test(doc.textContent), 'audience du jour imprimee');
assert.ok(!/Référé/.test(doc.textContent), 'jour seul (pas J+5)');
assert.ok(w.document.getElementById('rolePrint'), 'bouton Imprimer');
w.document.getElementById('roleBack').click();
await new Promise(r => setTimeout(r, 200));
assert.ok(w.document.querySelector('[data-ag-agenda]'), 'retour audiences');
console.log('6. role du jour imprimable OK (+ retour)');

w.Agenda.renderRolePrint(TODAY, 'semaine');
await new Promise(r => setTimeout(r, 100));
doc = w.document.getElementById('content');
assert.strictEqual(doc.querySelectorAll('.ag-day').length, 7, '7 jours');
assert.ok(/Référé/.test(doc.textContent), 'semaine inclut J+5');
w.document.getElementById('roleBack').click();
await new Promise(r => setTimeout(r, 200));
console.log('7. role semaine OK (7 jours)');

w.Agenda.refreshBell();
assert.ok(w.document.getElementById('bellBtn').getAttribute('aria-label').includes('Alertes'), 'aria-label cloche');
const css = await fetch(BASE + '/app/styles.css').then(r => r.text());
assert.ok(css.includes('@media print') && css.includes('button, .cab-toolbar, dialog') && css.includes('display:none !important'), 'print CSS masque les actions');
console.log('8. aria cloche + print CSS global OK');

w.Cabinet.goView('audiences');
await new Promise(r => setTimeout(r, 300));
const tabs = w.document.querySelector('[data-ag-tabs]');
assert.ok(tabs && tabs.querySelectorAll('.ag-tab').length === 3, '3 onglets');
assert.ok(tabs.querySelector('[data-tab="agenda"]').classList.contains('active'), 'onglet Agenda par defaut');
assert.ok(!w.document.querySelector('[data-ag-agenda]').hidden, 'agenda visible');
assert.ok(w.document.querySelector('[data-ag-day]').hidden, 'jour masque');
assert.ok(w.document.querySelector('[data-ag-tables]').hidden, 'tables masquees');
console.log('9. onglets OK (Agenda par defaut, autres masques)');

tabs.querySelector('[data-tab="jour"]').click();
await new Promise(r => setTimeout(r, 100));
const day = w.document.querySelector('[data-ag-day]');
assert.ok(!day.hidden && w.document.querySelector('[data-ag-agenda]').hidden, 'onglet jour affiche');
assert.ok(/Rôle du jour/.test(day.textContent) && /Fond du jour/.test(day.textContent), 'audience du jour detaillee');
assert.ok(day.textContent.includes('09:00') && /Client Test A/.test(day.textContent), 'heure + dossier');
w.document.getElementById('agDayPrint').click();
await new Promise(r => setTimeout(r, 150));
assert.ok(/Rôle d.audiences/.test(w.document.getElementById('content').textContent), 'impression du role du jour');
w.document.getElementById('roleBack').click();
await new Promise(r => setTimeout(r, 300));
assert.ok(!w.document.querySelector('[data-ag-day]').hidden, 'onglet jour conserve apres retour');
console.log('10. onglet Rôle du jour OK (detail + impression + memoire)');

w.document.querySelector('[data-tab="toutes"]').click();
await new Promise(r => setTimeout(r, 100));
assert.ok(!w.document.querySelector('[data-ag-tables]').hidden, 'tables visibles');
assert.ok(w.document.querySelector('[data-ag-agenda]').hidden && w.document.querySelector('[data-ag-day]').hidden, 'panneaux masques');
assert.strictEqual(JSON.parse(w.localStorage.getItem('avocato:audienceTab')), 'toutes', 'onglet persiste');
w.Cabinet.goView('audiences');
await new Promise(r => setTimeout(r, 300));
assert.ok(w.document.querySelector('[data-tab="toutes"]').classList.contains('active'), 'onglet restaure au retour');
assert.ok(!w.document.querySelector('[data-ag-tables]').hidden, 'tables restaurees');
console.log('11. onglet Toutes OK (tables + persistance)');

w.document.querySelector('[data-tab="agenda"]').click();
await new Promise(r => setTimeout(r, 100));
assert.ok(!w.document.querySelector('[data-ag-agenda]').hidden, 'retour agenda');
console.log('12. navigation onglets OK');

const sansJour = JSON.parse(w.localStorage.getItem('avocato:audiences')).filter(a => a.id !== 'a-today');
w.localStorage.setItem('avocato:audiences', JSON.stringify(sansJour));
w.Cabinet.goView('audiences');
await new Promise(r => setTimeout(r, 300));
const tabs3 = w.document.querySelector('[data-ag-tabs]');
assert.ok(/Prochain rôle/.test(tabs3.textContent), 'onglet = prochain rôle (pratique lendemain/lundi)');
tabs3.querySelector('[data-tab="jour"]').click();
await new Promise(r => setTimeout(r, 100));
const day3 = w.document.querySelector('[data-ag-day]');
assert.ok(!day3.hidden && /Prochain rôle/.test(day3.textContent), 'panneau = prochain rôle');
assert.ok(/Appel/.test(day3.textContent) && !/Fond du jour/.test(day3.textContent), 'rôle de demain, pas d’aujourd’hui');
console.log('13. prochain rôle OK (bascule lendemain si jour vide)');

console.log('\nAUDIENCES UX TEST: 13/13 PASS');
process.exit(0);
