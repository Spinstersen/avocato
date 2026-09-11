/* AVOCATO — Registres 90j / Dividendes / Sejours (packs 14-18).
   Offline localStorage via window.Cabinet.STORE. Butoirs auto IGOC 2026. */
(function () {
  'use strict';
  var LS = window.AvocatoStore.LS;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const { esc, uid, todayISO, addDaysISO: addDays } = window.AvocatoCore;
  function STORE() { return window.Cabinet ? window.Cabinet.STORE : null; }
  function dossiers() { const st = STORE(); return st ? st.dossiers : []; }
  function dName(id) { const d = dossiers().find(x => x.id === id); return d ? d.client : '—'; }

  function butoir(exig, kind) {
    if (!exig) return '';
    return addDays(exig, kind === 'Biens' ? 150 : 90);
  }
  function statutReg(r) {
    const t = todayISO();
    if (r.creditDate) return { lbl: 'OK', cls: '' };
    if (!r.butoir) return { lbl: '—', cls: '' };
    if (r.butoir < t) return { lbl: 'DÉPASSÉ', cls: 'late' };
    if (addDays(t, 15) >= r.butoir) return { lbl: 'J-15', cls: 'late' };
    return { lbl: 'En cours', cls: '' };
  }

  function dlg(html) {
    let d = $('#dlgReg');
    if (!d) {
      d = document.createElement('dialog');
      d.id = 'dlgReg';
      d.className = 'dlg';
      document.body.appendChild(d);
    }
    d.innerHTML = html;
    if (!d.open) d.showModal();
    return d;
  }
  function dossierOpts(sel) {
    return dossiers().map(d => `<option value="${esc(d.id)}"${sel === d.id ? ' selected' : ''}>${esc(d.client)}</option>`).join('');
  }

  /* ---------- REGISTRES ---------- */
  function renderRegistres() {
    const st = STORE();
    const rows = (st.registres || []).slice().sort((a, b) => (a.butoir || '').localeCompare(b.butoir || ''));
    const content = $('#content');
    content.innerHTML = `<div class="cab"><div class="kicker">Change · IGOC 2026</div><h2>Registres 90j / 150j</h2>
      <p class="sub">${rows.length} ligne(s) — exigibilité → butoir auto (90j services / 150j biens) → SWIFT. Alerte J-15. Modèle <span class="mono">05/09</span>.</p>
      <div class="cab-toolbar"><button class="btn btn-primary" id="btnNewReg">+ Ligne registre</button></div>
      <div class="cab-table-wrap"><table class="cab-table"><thead><tr><th>Dossier</th><th>Facture</th><th>Exigibilité</th><th>Type</th><th>Butoir</th><th>Crédit SWIFT</th><th>Statut</th><th></th></tr></thead><tbody>
      ${rows.map(r => { const s = statutReg(r); return `<tr><td>${esc(dName(r.dossierId))}</td><td class="mono">${esc(r.facture || '')}</td><td class="mono">${esc(r.exig || '')}</td><td>${esc(r.kind || 'Services')}</td><td class="mono">${esc(r.butoir || '')}</td><td class="mono">${esc(r.creditDate || '')}</td><td><b class="${s.cls === 'late' ? 'pc-late' : ''}">${s.lbl}</b></td><td><button class="btn btn-sm" data-credit="${esc(r.id)}">Crédité</button> <button class="btn btn-sm" data-delreg="${esc(r.id)}">×</button></td></tr>`; }).join('') || '<tr><td colspan="8" style="color:var(--text-dim)">Aucune ligne. Créez la première depuis un dossier export.</td></tr>'}
      </tbody></table></div></div>`;
    $('#crumbs').innerHTML = '<span class="cur">Cabinet — Registres 90j</span>';
    $('#btnNewReg').addEventListener('click', () => {
      const d = dlg(`<form method="dialog" id="fReg"><h3>Nouvelle ligne registre</h3><div class="form-grid">
        <label>Dossier<select name="dossierId">${dossierOpts('')}</select></label>
        <label>Facture N°<input name="facture" placeholder="F-2026-001"></label>
        <label>Exigibilité *<input name="exig" type="date" required></label>
        <label>Type<select name="kind"><option>Services</option><option>Biens</option></select></label>
        <label>Montant devise<input name="montant" placeholder="10 000 EUR"></label>
        </div><div class="dlg-actions"><button class="btn" value="cancel">Annuler</button><button class="btn btn-primary" id="okReg" value="default">Ajouter</button></div></form>`);
      d.querySelector('#okReg').addEventListener('click', () => {
        const fd = new FormData(d.querySelector('#fReg'));
        const o = Object.fromEntries(fd.entries());
        if (!o.exig) return;
        const st2 = STORE();
        st2.registres = [...(st2.registres || []), { id: uid(), dossierId: o.dossierId, facture: o.facture, exig: o.exig, kind: o.kind, montant: o.montant, butoir: butoir(o.exig, o.kind), creditDate: '', createdAt: todayISO() }];
        // échéance butoir auto
        st2.echeances = [...st2.echeances, { id: uid(), dossierId: o.dossierId, date: butoir(o.exig, o.kind), type: 'Change 90j', intitule: 'Butoir rapatriement ' + (o.facture || '') + ' — rapprocher SWIFT', done: false, auto: 'PACK' }];
        renderRegistres();
        if (window.Cabinet) window.Cabinet.toast('Ligne registre + échéance butoir créées.');
      });
    });
    $$('[data-credit]').forEach(b => b.addEventListener('click', () => {
      const st2 = STORE();
      const r = st2.registres.find(x => x.id === b.dataset.credit);
      if (r) { r.creditDate = todayISO(); st2.registres = st2.registres.slice(); renderRegistres(); }
    }));
    $$('[data-delreg]').forEach(b => b.addEventListener('click', () => {
      const st2 = STORE();
      st2.registres = st2.registres.filter(x => x.id !== b.dataset.delreg);
      renderRegistres();
    }));
  }

  /* ---------- DIVIDENDES ---------- */
  function renderDividendes() {
    const st = STORE();
    const rows = (st.dividendes || []).slice().sort((a, b) => (a.agDate || '').localeCompare(b.agDate || ''));
    const content = $('#content');
    content.innerHTML = `<div class="cab"><div class="kicker">Calendrier annuel</div><h2>Dividendes / AG</h2>
      <p class="sub">${rows.length} dossier(s) suivi(s) — simulation Oct-Nov → PV Jan-Fév → RAS → attestation → transfert. Modèle <span class="mono">05/10</span>.</p>
      <div class="cab-toolbar"><button class="btn btn-primary" id="btnNewDiv">+ Suivi dividende</button></div>
      <div class="cab-table-wrap"><table class="cab-table"><thead><tr><th>Dossier</th><th>Exercice</th><th>AG prévue</th><th>Montant</th><th>RAS</th><th>Transfert</th><th></th></tr></thead><tbody>
      ${rows.map(r => `<tr><td>${esc(dName(r.dossierId))}</td><td class="mono">${esc(r.exo || '')}</td><td class="mono">${esc(r.agDate || '')}</td><td class="mono">${esc(r.montant || '')}</td><td>${r.rasPayee ? 'Payée' : 'À payer'}</td><td>${r.transfere ? 'Transféré' : '—'}</td><td><button class="btn btn-sm" data-ras="${esc(r.id)}">RAS ✓</button> <button class="btn btn-sm" data-trf="${esc(r.id)}">Transfert ✓</button> <button class="btn btn-sm" data-deldiv="${esc(r.id)}">×</button></td></tr>`).join('') || '<tr><td colspan="7" style="color:var(--text-dim)">Aucun suivi. Créez le calendrier annuel.</td></tr>'}
      </tbody></table></div></div>`;
    $('#crumbs').innerHTML = '<span class="cur">Cabinet — Dividendes / AG</span>';
    $('#btnNewDiv').addEventListener('click', () => {
      const d = dlg(`<form method="dialog" id="fDiv"><h3>Nouveau suivi dividende</h3><div class="form-grid">
        <label>Dossier<select name="dossierId">${dossierOpts('')}</select></label>
        <label>Exercice<input name="exo" placeholder="2026"></label>
        <label>AG prévue<input name="agDate" type="date"></label>
        <label>Montant<input name="montant" placeholder="600 000 DH"></label>
        </div><div class="dlg-actions"><button class="btn" value="cancel">Annuler</button><button class="btn btn-primary" id="okDiv" value="default">Créer + échéances</button></div></form>`);
      d.querySelector('#okDiv').addEventListener('click', () => {
        const fd = new FormData(d.querySelector('#fDiv'));
        const o = Object.fromEntries(fd.entries());
        const st2 = STORE();
        const id = uid();
        st2.dividendes = [...(st2.dividendes || []), { id, dossierId: o.dossierId, exo: o.exo, agDate: o.agDate, montant: o.montant, rasPayee: false, transfere: false }];
        if (o.agDate) st2.echeances = [...st2.echeances,
          { id: uid(), dossierId: o.dossierId, date: o.agDate, type: 'AG / Formalité', intitule: 'AG distribution ' + (o.exo || '') + ' — PV daté + RAS + attestation', done: false, auto: 'PACK' }];
        renderDividendes();
      });
    });
    $$('[data-ras]').forEach(b => b.addEventListener('click', () => { const st2 = STORE(); const r = st2.dividendes.find(x => x.id === b.dataset.ras); if (r) { r.rasPayee = true; st2.dividendes = st2.dividendes.slice(); renderDividendes(); } }));
    $$('[data-trf]').forEach(b => b.addEventListener('click', () => { const st2 = STORE(); const r = st2.dividendes.find(x => x.id === b.dataset.trf); if (r) { r.transfere = true; st2.dividendes = st2.dividendes.slice(); renderDividendes(); } }));
    $$('[data-deldiv]').forEach(b => b.addEventListener('click', () => { const st2 = STORE(); st2.dividendes = st2.dividendes.filter(x => x.id !== b.dataset.deldiv); renderDividendes(); }));
  }

  /* ---------- SEJOURS ---------- */
  function renderSejours() {
    const st = STORE();
    const rows = (st.sejours || []).slice().sort((a, b) => (a.expiry || '').localeCompare(b.expiry || ''));
    const t = todayISO();
    const content = $('#content');
    content.innerHTML = `<div class="cab"><div class="kicker">Loi 02-03 — séjour des étrangers</div><h2>Séjour & Veille</h2>
      <p class="sub">${rows.length} titre(s) — renouvellement J-15 + veille mensuelle IGOC/CNDP/LF/OMPIC. Modèles <span class="mono">11/14, 08/10</span>.</p>
      <div class="cab-toolbar"><button class="btn btn-primary" id="btnNewSej">+ Titre / veille</button></div>
      <div class="cab-table-wrap"><table class="cab-table"><thead><tr><th>Dossier</th><th>Titre</th><th>Échéance carte</th><th>Statut</th><th></th></tr></thead><tbody>
      ${rows.map(r => { const late = r.expiry && r.expiry < t; const soon = r.expiry && !late && addDays(t, 15) >= r.expiry; return `<tr><td>${esc(dName(r.dossierId))}</td><td>${esc(r.titre || '')}</td><td class="mono">${esc(r.expiry || '')}</td><td><b class="${late || soon ? 'pc-late' : ''}">${late ? 'DÉPASSÉ' : soon ? 'J-15' : 'OK'}</b></td><td><button class="btn btn-sm" data-delsej="${esc(r.id)}">×</button></td></tr>`; }).join('') || '<tr><td colspan="5" style="color:var(--text-dim)">Aucun titre suivi.</td></tr>'}
      </tbody></table></div></div>`;
    $('#crumbs').innerHTML = '<span class="cur">Cabinet — Séjour & Veille</span>';
    $('#btnNewSej').addEventListener('click', () => {
      const d = dlg(`<form method="dialog" id="fSej"><h3>Nouveau suivi séjour</h3><div class="form-grid">
        <label>Dossier<select name="dossierId">${dossierOpts('')}</select></label>
        <label>Titre<input name="titre" placeholder="Carte immatriculation 1 an"></label>
        <label>Échéance carte<input name="expiry" type="date"></label>
        </div><div class="dlg-actions"><button class="btn" value="cancel">Annuler</button><button class="btn btn-primary" id="okSej" value="default">Créer + rappel J-15</button></div></form>`);
      d.querySelector('#okSej').addEventListener('click', () => {
        const fd = new FormData(d.querySelector('#fSej'));
        const o = Object.fromEntries(fd.entries());
        const st2 = STORE();
        st2.sejours = [...(st2.sejours || []), { id: uid(), dossierId: o.dossierId, titre: o.titre, expiry: o.expiry }];
        if (o.expiry) st2.echeances = [...st2.echeances, { id: uid(), dossierId: o.dossierId, date: addDays(o.expiry, -15), type: 'Séjour', intitule: 'Renouvellement carte J-15 — dossier + récépissé', done: false, auto: 'PACK' }];
        renderSejours();
      });
    });
    $$('[data-delsej]').forEach(b => b.addEventListener('click', () => { const st2 = STORE(); st2.sejours = st2.sejours.filter(x => x.id !== b.dataset.delsej); renderSejours(); }));
  }

  function todayHook(host) {
    try {
      const st = STORE();
      if (!st || !host) return;
      const t = todayISO();
      const regs = (st.registres || []).filter(r => !r.creditDate && r.butoir && (r.butoir < t || addDays(t, 15) >= r.butoir));
      const sejs = (st.sejours || []).filter(r => r.expiry && (r.expiry < t || addDays(t, 15) >= r.expiry));
      if (!regs.length && !sejs.length) return;
      const el = document.createElement('div');
      el.className = 'dash-panel ops-panel';
      el.style.marginTop = '14px';
      el.innerHTML = `<h3>Rappels packs 14-18</h3>` +
        regs.map(r => `<div class="today-action late"><span class="ta-date mono">${esc(r.butoir)}</span><span class="ta-body"><strong>Butoir 90j/150j</strong> — ${esc(r.facture || '')} (${esc(dName(r.dossierId))})</span></div>`).join('') +
        sejs.map(r => `<div class="today-action late"><span class="ta-date mono">${esc(r.expiry)}</span><span class="ta-body"><strong>Carte séjour</strong> — ${esc(r.titre || '')} (${esc(dName(r.dossierId))})</span></div>`).join('');
      host.appendChild(el);
    } catch (e) { console.warn('avocato', e); }
  }

  window.Registres = { renderRegistres, renderDividendes, renderSejours, todayHook, butoir };
})();
