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
    window.open = function(){ return null; };
    const dp = window.HTMLDialogElement ? window.HTMLDialogElement.prototype : window.HTMLElement.prototype;
    if (typeof dp.showModal !== 'function') {
      dp.showModal = function(){ this.open = true; };
      dp.close = function(){ if (this.open) { this.open = false; this.dispatchEvent(new window.Event('close')); } };
    }
    // spec shim: HTMLFormElement legacy named access (missing in jsdom, present in all browsers)
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
const TODAY = isoPlus(0), TMR = isoPlus(1), CURM = TODAY.slice(0, 7);
const D = (day) => CURM + '-' + String(day).padStart(2, '0');

assert.ok(w.Cabinet, 'Cabinet'); assert.ok(w.Relations, 'Relations'); assert.ok(w.Features, 'Features');
console.log('1. modules OK (Cabinet/Relations/Features)');

w.localStorage.clear();
w.localStorage.setItem('avocato:plaque', JSON.stringify({ nom: 'Maitre Test', barreau: 'Barreau de Casablanca', tel: '06 00 00 00 00', rib: '000111222333444555666777', ribBanque: 'Banque Test' }));
w.localStorage.setItem('avocato:dossiers', JSON.stringify([
  { id: 'd1', client: 'SARL Atlas — M. Benali', statut: 'En cours', honoraires: 10000, tva: 20, provisionPct: 50, provisionEncaissee: true, provisionDate: D('01'), contact: '06 12 34 56 78', mission: 'Mission Contrats - Essentielle', canalRestitution: 'Visio Zoom (30 min)', createdAt: D('01'), updatedAt: D('01') },
  { id: 'd2', client: 'sarl atlas m benali', statut: 'Livré - solde dû', honoraires: 5000, tva: 20, provisionPct: 50, createdAt: D('01'), updatedAt: D('10') },
  { id: 'dAbo', client: 'Clinique El Amal', mission: 'Abonnement - Secretariat juridique', statut: 'En cours', honoraires: 3000, tva: 20, abonnementActif: true, abonnementMontant: 3000, abonnementNext: D('01'), createdAt: D('02'), updatedAt: D('02') }
]));
w.localStorage.setItem('avocato:factures', JSON.stringify([
  { id: 'f-prov', dossierId: 'd1', num: 'RP-2026-001', date: D('05'), type: 'Reçu provision', ht: 5000, tva: 1000, ttc: 6000, statut: 'Encaissée' },
  { id: 'f-abo', dossierId: 'dAbo', num: 'FH-2026-002', date: D('03'), type: 'Facture solde', ht: 3000, tva: 600, ttc: 3600, statut: 'Encaissée', abonnement: true, periode: CURM },
  { id: 'f-solde', dossierId: 'd2', num: 'FH-2026-003', date: D('10'), type: 'Facture solde', ht: 2500, tva: 500, ttc: 3000, statut: 'Émise' }
]));
w.localStorage.setItem('avocato:echeances', JSON.stringify([
  { id: 'r0', dossierId: 'd1', date: D('01'), type: 'Rythme J0', intitule: 'Kickoff TEST', done: true, auto: 'RYTHME' },
  { id: 'r2', dossierId: 'd1', date: D('03'), type: 'Rythme J2', intitule: 'Checkpoint J2 TEST', done: false, auto: 'RYTHME' },
  { id: 'r5', dossierId: 'd1', date: D('06'), type: 'Rythme J5', intitule: 'Checkpoint J5 TEST', done: false, auto: 'RYTHME' },
  { id: 'r7', dossierId: 'd1', date: D('08'), type: 'Rythme J7', intitule: 'Remise TEST', done: false, auto: 'RYTHME' }
]));
w.localStorage.setItem('avocato:frais', JSON.stringify([
  { id: 'fr1', dossierId: 'd1', date: D('04'), categorie: 'Greffe / Tribunal', label: 'Timbre greffe', montantHT: 500, tva: 100, remboursable: true, statut: 'À facturer' },
  { id: 'fr2', dossierId: 'd1', date: D('04'), categorie: 'Déplacement', label: 'Deplacement Casa', montantHT: 200, tva: 0, remboursable: true, statut: 'À facturer' }
]));
w.localStorage.setItem('avocato:audiences', JSON.stringify([
  { id: 'a1', dossierId: 'd1', date: TMR, heure: '09:00', juridiction: 'TPI (1re instance)', etat: 'À venir', objet: 'Fond TEST' }
]));
w.localStorage.setItem('avocato:transitions', JSON.stringify([
  { id: 't1', dossierId: 'd1', client: 'SARL Atlas', from: 'Convention envoyée', to: 'Convention signée', at: D('12') + 'T10:00:00.000Z' },
  { id: 't2', dossierId: 'd2', client: 'sarl atlas', from: 'Livré - solde dû', to: 'Clôturé', at: D('15') + 'T10:00:00.000Z' }
]));
w.localStorage.setItem('avocato:objectifCA', JSON.stringify({ targetHT: 50000, period: 'mensuel' }));
w.localStorage.removeItem('avocato:lastExport');
w.localStorage.removeItem('avocato:backupNag');
console.log('2. seeds OK (mois=' + CURM + ')');

const groups = w.Relations.groupClients();
assert.strictEqual(groups.length, 2, '2 groupes (variantes fusionnees)');
const atlas = groups.find(g => g.nDossiers === 2);
assert.ok(atlas, 'groupe atlas x2 dossiers');
assert.strictEqual(atlas.facture, 9000, 'facture atlas = 6000+3000');
assert.strictEqual(atlas.encaisse, 6000, 'encaisse atlas = provision');
assert.strictEqual(atlas.soldeDu, 3000, 'solde atlas');
console.log('3. groupement clients + encours OK');

w.Relations.saveContact({ name_norm: atlas.key, label: atlas.label, tel: '06 12 34 56 78', email: 'atlas@exemple.ma', ville: 'Casablanca', ice: '', notes: 'Test' });
const ct = w.Relations.getContact(atlas.key);
assert.strictEqual(ct.tel, '06 12 34 56 78');
assert.strictEqual(ct.email, 'atlas@exemple.ma');
console.log('4. contacts store OK');

w.Cabinet.setMode('cabinet');
w.Cabinet.goView('clients');
await new Promise(r => setTimeout(r, 150));
let content = w.document.getElementById('content');
assert.ok(/Clients/.test(content.textContent) && content.querySelector('#clientsBody'), 'vue Clients');
assert.strictEqual(content.querySelectorAll('#clientsBody tr').length, 2, '2 lignes clients');
console.log('5. vue Clients OK');

w.Relations.renderFiche(atlas.key);
await new Promise(r => setTimeout(r, 100));
content = w.document.getElementById('content');
assert.ok(/Historique dossiers/.test(content.textContent), 'fiche historique');
assert.ok(/Fond TEST/.test(content.textContent), 'fiche audiences');
assert.ok(content.querySelector('[data-rel]'), 'fiche boutons relance');
console.log('6. fiche client OK (historique + audiences + relance)');

const rows = w.Relations.buildRegister();
assert.strictEqual(rows.length, 12, '12 mois');
const cur = rows.find(r => r.mois === CURM);
assert.ok(cur, 'ligne mois courant');
assert.strictEqual(cur.emisHT, 10500, 'emisHT = 5000+3000+2500');
assert.strictEqual(cur.encHT, 8000, 'encHT = 5000+3000');
assert.strictEqual(cur.tva, 1600, 'TVA collectee = 1000+600');
assert.strictEqual(cur.nouveaux, 3, '3 dossiers crees');
assert.strictEqual(cur.signes, 1, '1 signe (transitions)');
assert.strictEqual(cur.clotures, 1, '1 cloture (transitions)');
const totEmis = rows.reduce((s, r) => s + r.emisHT, 0);
assert.strictEqual(totEmis, 10500, 'total registre = somme factures (totaux = registres)');
console.log('7. registre mensuel OK (emis/enc/TVA/nouveaux/signes/clotures)');

w.__mk = [];
w.Chart = class { constructor(c) { this.canvas = c; this.destroyed = false; w.__mk.push(this); } destroy() { this.destroyed = true; } };
w.Cabinet.goView('finances');
await new Promise(r => setTimeout(r, 250));
content = w.document.getElementById('content');
assert.ok(content.querySelector('#finCurve') && content.querySelector('#finBars'), 'canvas finances');
assert.strictEqual(content.querySelectorAll('tbody tr').length, 13, '12 mois + total');
assert.ok(/MRR/.test(content.textContent) && /YTD|12 mois vs/.test(content.textContent), 'cartes MRR/YTD');
assert.strictEqual(w.__mk.length, 2, '2 charts crees');
w.Cabinet.goView('finances');
await new Promise(r => setTimeout(r, 250));
assert.strictEqual(w.__mk.length, 4, '2 charts recrees');
assert.ok(w.__mk[0].destroyed && w.__mk[1].destroyed, 'anciens charts destroy()');
assert.strictEqual(w.Relations.chartCount(), 2, 'registre featCharts stable');
w.Cabinet.goView('finances');
w.Relations.setFinPeriod('glissant');
w.Cabinet.goView('finances');
await new Promise(r => setTimeout(r, 250));
assert.ok(/glissants|12 mois/.test(w.document.getElementById('content').textContent), 'bascule glissant');
w.Relations.setFinPeriod('annee');
assert.strictEqual(w.Relations.mrrHT(), 3000, 'MRR = 3000 HT');
const ytd = w.Relations.ytdProgress();
const elapsed = new Date().getMonth() + 1;
assert.strictEqual(ytd.target, 50000 * elapsed, 'cible YTD proratee');
assert.strictEqual(ytd.current, 8000, 'YTD = encaisse HT annee');
console.log('8. vue Finances OK (cartes, courbe, barres, registre, bascule, destroy)');

assert.strictEqual(w.Relations.interceptSolde('dAbo'), false, 'pas de frais -> flux normal');
assert.strictEqual(w.Relations.interceptSolde('d1'), true, 'frais -> dialogue O2');
assert.ok(w.document.getElementById('dlgSoldeFrais').open, 'dialogue solde ouvert');
w.document.getElementById('dlgSoldeFrais').close();
const fA = w.Relations.createSolde('d1', ['fr1']);
assert.ok(/^FH-2026-\d{3}$/.test(fA.num), 'num FH unique: ' + fA.num);
assert.strictEqual(JSON.stringify(fA.fraisIds), '["fr1"]', 'fraisIds');
assert.strictEqual(fA.ttc, 6600, 'ttc = solde 6000 + debours 600');
assert.strictEqual(fA.ht, 5500, 'ht = 5000 + 500');
w.document.querySelector('[data-viewfact="' + fA.id + '"]').click();
await new Promise(r => setTimeout(r, 100));
assert.ok(/Débours refacturés/.test(w.document.getElementById('content').textContent), 'ligne debours sur facture');
w.Relations.onFactureStatut(fA.id, 'Encaissée');
let frs = JSON.parse(w.localStorage.getItem('avocato:frais'));
assert.strictEqual(frs.find(x => x.id === 'fr1').statut, 'Facturé', 'frais Facture a l’encaissement');
assert.strictEqual(frs.find(x => x.id === 'fr2').statut, 'À facturer', 'autre frais intact');
const tr = w.Features.computeTreasury();
assert.strictEqual(tr.frais.refactures, 600, 'tresorerie isole les refactures');
const fraisNet = frs.filter(x => x.statut !== 'Facturé').reduce((s, x) => s + Number(x.montantHT) + Number(x.tva), 0);
assert.strictEqual(tr.frais.ttc, fraisNet, 'pas de double-compte (frais nets hors refactures)');
w.Relations.onFactureStatut(fA.id, 'Émise');
frs = JSON.parse(w.localStorage.getItem('avocato:frais'));
assert.strictEqual(frs.find(x => x.id === 'fr1').statut, 'À facturer', 'reouverture si facture rouverte');
w.Relations.onFactureStatut(fA.id, 'Encaissée');
w.Relations.onFactureDeleted(JSON.parse(w.localStorage.getItem('avocato:factures')).find(x => x.id === fA.id));
frs = JSON.parse(w.localStorage.getItem('avocato:frais'));
assert.strictEqual(frs.find(x => x.id === 'fr1').statut, 'À facturer', 'frais libere si facture supprimee');
w.localStorage.setItem('avocato:factures', JSON.stringify(JSON.parse(w.localStorage.getItem('avocato:factures')).filter(x => x.id !== fA.id)));
console.log('9. O2 solde+débours OK (ligne, bascule encaissement, pas de double-compte, undo)');

const lm = w.Relations.openLM('d1');
assert.ok(/^LM-2026-\d{3}$/.test(lm), 'num LM: ' + lm);
content = w.document.getElementById('content');
assert.ok(/LETTRE DE MISSION/.test(content.textContent), 'titre LM');
assert.ok(/Kickoff TEST/.test(content.textContent), 'jalons reels (echeances RYTHME)');
assert.ok(/RIB/.test(content.textContent) && /Banque Test/.test(content.textContent), 'RIB en pied');
const pv = w.Relations.openPV('d1');
assert.ok(/^PV-2026-\d{3}$/.test(pv), 'num PV: ' + pv);
content = w.document.getElementById('content');
assert.ok(/PV DE REMISE/.test(content.textContent) && /Signature/.test(content.textContent), 'PV + emargement');
assert.ok(/drafts/.test(content.textContent), 'livrables mission');
const lm2 = w.Relations.openLM('d1');
assert.strictEqual(lm2, lm, 'reimpression = meme numero (numero persiste)');
const letters = JSON.parse(w.localStorage.getItem('avocato:letters') || '[]');
assert.strictEqual(letters.filter(x => x.type === 'LM' && x.dossierId === 'd1').length, 1, 'un seul enregistrement LM par dossier');
assert.strictEqual(letters.filter(x => x.type === 'PV' && x.dossierId === 'd1').length, 1, 'un seul enregistrement PV par dossier');
console.log('10. O3 lettre + PV OK (jalons reels, RIB, emargement, numeros stables)');

const rp = w.Relations.buildRelance('provision', 'd1', null);
assert.ok(/Provision/.test(rp.subject) && /art\. 30/.test(rp.body) && rp.body.replace(/\D/g, '').includes('6000'), 'template provision art.30 + montant');
const rs = w.Relations.buildRelance('solde', 'd2', 'f-solde');
assert.ok(rs.body.includes('FH-2026-003') && /J\+15/.test(rs.body), 'template solde J+15 + ref');
const ra = w.Relations.buildRelance('abo', 'dAbo', null);
assert.ok(/abonnement/i.test(ra.subject), 'template abo');
assert.strictEqual(w.Relations.toWAME('06 12 34 56 78'), 'https://wa.me/212612345678', '06 -> 212');
assert.strictEqual(w.Relations.toWAME('212612345678'), 'https://wa.me/212612345678', '212 inchange');
w.Relations.openRelance('d2', 'solde', 'f-solde');
assert.ok(w.document.getElementById('dlgRelance').open, 'dialogue relance');
assert.strictEqual(w.document.querySelectorAll('#formRelance [name="tpl"] option').length, 3, '3 templates');
w.document.getElementById('dlgRelance').close();
console.log('11. O1 relances OK (3 templates, wa.me, dialogue)');

assert.ok(w.Relations.checkBackup().stale, 'sans export -> perime');
w.Cabinet.goView('dashboard');
await new Promise(r => setTimeout(r, 400));
assert.ok(w.document.querySelector('[data-backup-nag]'), 'bandeau sauvegarde');
w.document.querySelector('[data-backup-now]').click();
await new Promise(r => setTimeout(r, 100));
assert.strictEqual(JSON.parse(w.localStorage.getItem('avocato:lastExport')), TODAY, 'export pose lastExport (O6)');
assert.ok(!w.Relations.checkBackup().stale, 'plus perime apres export');
console.log('12. O6 rappel sauvegarde OK (bandeau + export + lastExport)');

w.Cabinet.viewDossier('d1');
await new Promise(r => setTimeout(r, 400));
assert.ok(w.document.querySelector('[data-rel-lm]'), 'bouton Lettre dans fiche');
w.document.querySelector('[data-rel-lm]').click();
await new Promise(r => setTimeout(r, 100));
assert.ok(/LETTRE DE MISSION/.test(w.document.getElementById('content').textContent), 'lettre depuis fiche');
console.log('13. greffe fiche dossier OK (LM/PV/relance injectes)');

console.log('\nPHASE E TEST: 13/13 PASS');
process.exit(0);
