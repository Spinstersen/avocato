/* Cabinet OS — Dossiers / Conventions / Factures / Échéances / Bibliothèque
   Offline, localStorage only. No server. */
(function () {
  'use strict';

  const LS = {
    get(k, d) { try { const v = localStorage.getItem('avocato:' + k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem('avocato:' + k, JSON.stringify(v)); } catch {} }
  };
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
  function fmtMoney(n) { return (Number(n) || 0).toLocaleString('fr-MA') + ' DH'; }
  function fmtDate(d) { if (!d) return '—'; try { return new Date(d).toLocaleDateString('fr-MA'); } catch { return d; } }
  function todayISO() { return new Date().toISOString().slice(0, 10); }

  const STORE = {
    get dossiers() { return LS.get('dossiers', []); },
    set dossiers(v) { LS.set('dossiers', v); },
    get conventions() { return LS.get('conventions', []); },
    set conventions(v) { LS.set('conventions', v); },
    get factures() { return LS.get('factures', []); },
    set factures(v) { LS.set('factures', v); },
    get echeances() { return LS.get('echeances', []); },
    set echeances(v) { LS.set('echeances', v); }
  };

  let mode = 'cabinet';
  let cabView = LS.get('cabinetView', 'dashboard');
  let editingId = null;

  const BADGE = {
    'Prospect': 'badge-prospect',
    'Convention envoyée': 'badge-envoyee',
    'Convention signée': 'badge-signee',
    'En cours': 'badge-encours',
    'Livré - solde dû': 'badge-livre',
    'Clôturé': 'badge-cloture',
    'Abandonné': 'badge-cloture'
  };

  function badge(statut) {
    const cls = BADGE[statut] || 'badge-prospect';
    return `<span class="badge ${cls}">${esc(statut)}</span>`;
  }

  function calcTTC(ht, tva) {
    ht = Number(ht) || 0;
    tva = Number(tva) || 0;
    const tv = Math.round(ht * tva / 100);
    return { ht, tva: tv, ttc: ht + tv };
  }

  /* ---------- Thème (indépendant de l'app Learn) ---------- */
  function applyTheme() {
    const t = localStorage.getItem('avocato:cabTheme') || 'system';
    document.body.dataset.theme = t;
    const btn = $('#themeBtn');
    if (btn) btn.textContent = t === 'dark' ? '☀️' : (t === 'light' ? '🌙' : '💻');
  }
  function cycleTheme() {
    const order = ['light', 'dark'];
    const cur = localStorage.getItem('avocato:cabTheme') || 'system';
    const next = order[(order.indexOf(cur) + 1) % order.length] || 'light';
    try { localStorage.setItem('avocato:cabTheme', next); } catch {}
    document.body.dataset.theme = next;
    const btn = $('#themeBtn');
    if (btn) btn.textContent = next === 'dark' ? '☀️' : '🌙';
  }

  function openInLearn(id) {
    location.href = 'index.html#' + encodeURIComponent(id);
  }

  function renderCabinet() {
    $$('.cab-nav-item').forEach(b => b.classList.toggle('active', b.dataset.view === cabView));
    if (cabView === 'dashboard') renderCabDashboard();
    else if (cabView === 'dossiers') renderDossiers();
    else if (cabView === 'conventions') renderConventions();
    else if (cabView === 'factures') renderFactures();
    else if (cabView === 'echeances') renderEcheances();
    else if (cabView === 'bibliotheque') renderBibliotheque();
    else if (cabView === 'new-dossier') { cabView = 'dossiers'; renderDossiers(); openDlgDossier(); }
  }

  /* ---------- Cabinet Dashboard ---------- */
  function renderCabDashboard() {
    const dossiers = STORE.dossiers;
    const echeances = STORE.echeances;
    const total = dossiers.length;
    const caHT = dossiers.reduce((s, d) => s + (Number(d.honoraires) || 0), 0);
    const provEnc = dossiers.filter(d => !['Prospect', 'Abandonné'].includes(d.statut)).reduce((s, d) => s + Math.round((Number(d.honoraires) || 0) * (Number(d.provisionPct) || 50) / 100), 0);
    const soldeDu = caHT - provEnc;
    const enCours = dossiers.filter(d => ['Convention signée', 'En cours', 'Livré - solde dû'].includes(d.statut)).length;
    const overdue = echeances.filter(e => !e.done && e.date && e.date < todayISO()).length;

    const content = $('#content');
    content.innerHTML = `
      <div class="cab">
        <h2>Tableau de bord Cabinet</h2>
        <p class="sub">Dossiers en localStorage — offline. Provision et solde suivent la convention d'honoraires (art. 30 Loi 28-08).</p>
        <div class="dash-cards">
          <div class="dash-card"><div class="num">${total}</div><div class="lbl">Dossiers</div></div>
          <div class="dash-card"><div class="num">${fmtMoney(caHT)}</div><div class="lbl">CA HT total (missions)</div></div>
          <div class="dash-card"><div class="num">${fmtMoney(provEnc)}</div><div class="lbl">Provisions (50% théorique)</div></div>
          <div class="dash-card"><div class="num">${enCours}</div><div class="lbl">En cours / livrés</div></div>
          <div class="dash-card"><div class="num">${overdue}</div><div class="lbl">Échéances en retard</div></div>
        </div>
        <div class="dash-grid">
          <div class="dash-panel"><h3>Dossiers par statut</h3><div class="chart-canvas-wrap" style="height:220px"><canvas id="cabStatut"></canvas></div></div>
          <div class="dash-panel"><h3>CA par mission</h3><div class="chart-canvas-wrap" style="height:220px"><canvas id="cabMission"></canvas></div></div>
        </div>
        <div class="dash-panel" style="margin-bottom:16px">
          <h3>Actions rapides</h3>
          <div class="cab-toolbar">
            <button class="btn btn-primary" id="cabNewDossier2">＋ Nouveau dossier</button>
            <button class="btn" id="cabSample">Charger 3 dossiers d'exemple</button>
            <button class="btn" id="cabExport">Exporter JSON</button>
            <label class="btn" style="cursor:pointer">Importer JSON <input type="file" id="cabImport" accept=".json" hidden></label>
          </div>
          ${total === 0 ? '<div class="empty-state" style="padding:20px"><p>Aucun dossier. Créez votre premier dossier pour générer une convention d\'honoraires.</p></div>' : ''}
        </div>
        <div class="dash-panel">
          <h3>Échéances à venir (7 jours)</h3>
          <div id="cabUpcoming"></div>
        </div>
      </div>`;

    $('#crumbs').innerHTML = '<span class="cur">Cabinet — Tableau de bord</span>';
    // charts
    setTimeout(() => {
      const th = getComputedStyle(document.body).getPropertyValue('--accent').trim() || '#0f2a44';
      const th2 = getComputedStyle(document.body).getPropertyValue('--accent-2').trim() || '#1fa89e';
      try {
        const statutCounts = {};
        dossiers.forEach(d => { statutCounts[d.statut] = (statutCounts[d.statut] || 0) + 1; });
        const labels = Object.keys(statutCounts);
        const vals = labels.map(l => statutCounts[l]);
        if (labels.length) new Chart($('#cabStatut'), { type: 'doughnut', data: { labels, datasets: [{ data: vals, backgroundColor: ['#1fa89e', '#0f2a44', '#b4552d', '#7a5aa8', '#3a7ca5', '#c98f2e', '#5f8a52'] }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { font: { size: 11 } } } } } });

        const missionCA = {};
        dossiers.forEach(d => { const k = (d.mission || 'Autre').split('(')[0].trim(); missionCA[k] = (missionCA[k] || 0) + (Number(d.honoraires) || 0); });
        const mLabels = Object.keys(missionCA);
        const mVals = mLabels.map(l => missionCA[l]);
        if (mLabels.length) new Chart($('#cabMission'), { type: 'bar', data: { labels: mLabels, datasets: [{ label: 'CA HT', data: mVals, backgroundColor: th2 + 'cc', borderColor: th2, borderWidth: 1 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } } });
      } catch (e) { console.warn(e); }

      const upcoming = echeances.filter(e => !e.done).sort((a, b) => (a.date || '').localeCompare(b.date || '')).slice(0, 6);
      const el = $('#cabUpcoming');
      if (!upcoming.length) el.innerHTML = '<p style="color:var(--text-dim);font-size:13px">Aucune échéance. Ajoutez-en depuis Dossiers ou Échéances.</p>';
      else el.innerHTML = '<table class="cab-table"><thead><tr><th>Date</th><th>Dossier</th><th>Intitulé</th></tr></thead><tbody>' + upcoming.map(e => {
        const d = dossiers.find(x => x.id === e.dossierId);
        return `<tr><td class="mono">${esc(e.date || '')}</td><td>${esc(d ? d.client : '—')}</td><td>${esc(e.intitule || e.type || '')}</td></tr>`;
      }).join('') + '</tbody></table>';
    }, 30);

    $('#cabNewDossier2').addEventListener('click', openDlgDossier);
    $('#cabSample').addEventListener('click', loadSample);
    $('#cabExport').addEventListener('click', exportJSON);
    $('#cabImport').addEventListener('change', importJSON);
  }

  function loadSample() {
    if (STORE.dossiers.length) { if (!confirm('Remplacer les dossiers existants par 3 exemples ?')) return; }
    const now = todayISO();
    const plus7 = new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10);
    const plus14 = new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10);
    STORE.dossiers = [
      { id: uid(), client: 'SARL Atlas Digital — M. Alami', ice: '001234567000012', type: 'Freelance / Agence offshore', mission: 'Mission Contrats - Essentielle (2.500-5.000 DH HT)', honoraires: 3500, tva: 20, provisionPct: 50, statut: 'Convention signée', echeance: plus7, contact: '06 12 34 56 78', notes: 'Upwork, impayé 1.800€, besoin clause réserve de propriété', createdAt: now, updatedAt: now },
      { id: uid(), client: 'Boutique YouCan — Lina Shop', ice: '002345678000034', type: 'E-commerce / YouCan', mission: 'Mission Conformité e-commerce (3.500-6.000 DH HT)', honoraires: 4200, tva: 0, provisionPct: 50, statut: 'En cours', echeance: plus14, contact: '06 98 76 54 32', notes: 'CGV manquantes, 3 litiges COD', createdAt: now, updatedAt: now },
      { id: uid(), client: 'Clinique El Amal', ice: '003456789000056', type: 'Loi 09-08 / PME', mission: 'Mission Loi 09-08 (12.000-28.000 DH HT)', honoraires: 18000, tva: 20, provisionPct: 50, statut: 'Prospect', echeance: '', contact: '05 22 11 22 33', notes: 'Données santé, pas de registre, transfert AWS', createdAt: now, updatedAt: now }
    ];
    STORE.echeances = STORE.dossiers.filter(d => d.echeance).map(d => ({ id: uid(), dossierId: d.id, date: d.echeance, type: 'Remise livrables', intitule: 'Remise V1 + Loom', done: false }));
    renderCabDashboard();
  }

  function exportJSON() {
    const data = { dossiers: STORE.dossiers, conventions: STORE.conventions, factures: STORE.factures, echeances: STORE.echeances, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'avocato-cabinet-' + todayISO() + '.json'; a.click(); URL.revokeObjectURL(a.href);
  }

  function importJSON(e) {
    const file = e.target.files[0]; if (!file) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        const data = JSON.parse(r.result);
        if (data.dossiers) STORE.dossiers = data.dossiers;
        if (data.conventions) STORE.conventions = data.conventions;
        if (data.factures) STORE.factures = data.factures;
        if (data.echeances) STORE.echeances = data.echeances;
        alert('Import OK : ' + (data.dossiers || []).length + ' dossiers');
        renderCabDashboard();
      } catch (err) { alert('JSON invalide: ' + err.message); }
    };
    r.readAsText(file);
  }

  /* ---------- Dossiers ---------- */
  function renderDossiers() {
    const dossiers = STORE.dossiers.slice().sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''));
    const content = $('#content');
    content.innerHTML = `
      <div class="cab">
        <h2>Dossiers</h2>
        <p class="sub">${dossiers.length} dossier(s) — Honoraires HT, provision (art. 30 Loi 28-08). Cliquez sur un dossier pour agir.</p>
        <div class="cab-toolbar">
          <input id="dossierSearch" placeholder="Rechercher client, ICE, mission..." style="flex:1;min-width:180px">
          <select id="dossierFilterStatut"><option value="">Tous statuts</option><option>Prospect</option><option>Convention envoyée</option><option>Convention signée</option><option>En cours</option><option>Livré - solde dû</option><option>Clôturé</option><option>Abandonné</option></select>
          <button class="btn btn-primary" id="btnNewDossier">＋ Nouveau dossier</button>
        </div>
        <div class="cab-table-wrap">
          <table class="cab-table" id="tblDossiers">
            <thead><tr><th>Client</th><th>Mission</th><th>Honoraires</th><th>Provision</th><th>Statut</th><th>Échéance</th><th>Actions</th></tr></thead>
            <tbody>${dossiers.map(d => {
      const c = calcTTC(d.honoraires, d.tva);
      const prov = Math.round(c.ttc * (Number(d.provisionPct) || 0) / 100);
      return `<tr data-id="${esc(d.id)}">
                <td><strong>${esc(d.client)}</strong><br><span style="color:var(--text-dim);font-size:11px">${esc(d.type || '')} ${d.ice ? '· ICE ' + esc(d.ice) : ''}</span></td>
                <td style="max-width:180px;white-space:normal;font-size:12px">${esc(d.mission || '')}</td>
                <td class="mono">${fmtMoney(c.ht)}<br><span style="color:var(--text-dim)">${d.tva == 0 ? 'TVA 0%' : 'TTC ' + fmtMoney(c.ttc)}</span></td>
                <td class="mono">${fmtMoney(prov)}<br><span style="color:var(--text-dim)">${d.provisionPct || 50}%</span></td>
                <td>${badge(d.statut || 'Prospect')}</td>
                <td class="mono">${esc(d.echeance ? fmtDate(d.echeance) : '—')}</td>
                <td><button class="btn" data-act="view" data-id="${esc(d.id)}">Voir</button> <button class="btn" data-act="edit" data-id="${esc(d.id)}">Éditer</button></td>
              </tr>`;
    }).join('')}</tbody>
          </table>
          ${dossiers.length === 0 ? '<div class="empty-state" style="padding:30px">Aucun dossier. <button class="btn btn-primary" id="btnFirstDossier">Créer le premier</button></div>' : ''}
        </div>
      </div>`;
    $('#crumbs').innerHTML = '<span class="cur">Cabinet — Dossiers</span>';
    $('#dossierSearch').addEventListener('input', filterDossiers);
    $('#dossierFilterStatut').addEventListener('change', filterDossiers);
    $('#btnNewDossier').addEventListener('click', openDlgDossier);
    const first = $('#btnFirstDossier'); if (first) first.addEventListener('click', openDlgDossier);
    $$('#tblDossiers [data-act="view"]').forEach(b => b.addEventListener('click', () => viewDossier(b.dataset.id)));
    $$('#tblDossiers [data-act="edit"]').forEach(b => b.addEventListener('click', () => openDlgDossier(b.dataset.id)));
  }

  function filterDossiers() {
    const q = ($('#dossierSearch').value || '').toLowerCase();
    const f = $('#dossierFilterStatut').value;
    $$('#tblDossiers tbody tr').forEach(tr => {
      const d = STORE.dossiers.find(x => x.id === tr.dataset.id);
      const hitQ = !q || [d.client, d.ice, d.mission, d.type].join(' ').toLowerCase().includes(q);
      const hitF = !f || d.statut === f;
      tr.style.display = (hitQ && hitF) ? '' : 'none';
    });
  }

  function viewDossier(id) {
    const d = STORE.dossiers.find(x => x.id === id);
    if (!d) return;
    const c = calcTTC(d.honoraires, d.tva);
    const prov = Math.round(c.ttc * (Number(d.provisionPct) || 50) / 100);
    const solde = c.ttc - prov;
    const echeances = STORE.echeances.filter(e => e.dossierId === id);
    const convs = STORE.conventions.filter(x => x.dossierId === id);
    const facts = STORE.factures.filter(x => x.dossierId === id);
    const content = $('#content');
    content.innerHTML = `
      <div class="cab">
        <button class="btn" id="backDossiers">← Retour dossiers</button>
        <h2 style="margin-top:12px">${esc(d.client)}</h2>
        <p class="sub">${esc(d.type || '')} ${d.ice ? '· ICE ' + esc(d.ice) : ''} · ${badge(d.statut)}</p>
        <div class="dash-cards">
          <div class="dash-card"><div class="num">${fmtMoney(c.ht)}</div><div class="lbl">Honoraires HT</div></div>
          <div class="dash-card"><div class="num">${fmtMoney(prov)}</div><div class="lbl">Provision (${d.provisionPct || 50}%)</div></div>
          <div class="dash-card"><div class="num">${fmtMoney(solde)}</div><div class="lbl">Solde</div></div>
          <div class="dash-card"><div class="num">${esc(fmtDate(d.echeance))}</div><div class="lbl">Échéance</div></div>
        </div>
        <div class="cab-toolbar">
          <button class="btn btn-primary" data-act="conv" data-id="${esc(d.id)}">📝 Générer convention</button>
          <button class="btn" data-act="fact-prov" data-id="${esc(d.id)}">💳 Reçu provision</button>
          <button class="btn" data-act="fact-solde" data-id="${esc(d.id)}">💳 Facture solde</button>
          <button class="btn" data-act="echeance" data-id="${esc(d.id)}">⏰ + Échéance</button>
          <button class="btn" data-act="edit2" data-id="${esc(d.id)}">✏️ Éditer</button>
          <button class="btn btn-danger" data-act="del" data-id="${esc(d.id)}">🗑 Supprimer</button>
        </div>
        <div class="dash-grid">
          <div class="dash-panel"><h3>Informations</h3>
            <table class="cab-table" style="border:0"><tbody>
              <tr><td>Contact</td><td>${esc(d.contact || '—')}</td></tr>
              <tr><td>Mission</td><td>${esc(d.mission || '—')}</td></tr>
              <tr><td>Honoraires</td><td>${fmtMoney(c.ht)} HT + TVA ${d.tva}% = ${fmtMoney(c.ttc)} TTC</td></tr>
              <tr><td>Créé</td><td>${esc(fmtDate(d.createdAt))}</td></tr>
              <tr><td>Notes</td><td style="white-space:normal">${esc(d.notes || '—')}</td></tr>
            </tbody></table>
          </div>
          <div class="dash-panel"><h3>Échéances (${echeances.length})</h3>
            ${echeances.length ? '<table class="cab-table"><thead><tr><th>Date</th><th>Intitulé</th><th>✓</th></tr></thead><tbody>' + echeances.map(e => `<tr><td class="mono">${esc(e.date || '')}</td><td>${esc(e.intitule || e.type)}</td><td><input type="checkbox" ${e.done ? 'checked' : ''} data-eid="${esc(e.id)}"></td></tr>`).join('') + '</tbody></table>' : '<p style="color:var(--text-dim);font-size:13px">Aucune échéance.</p>'}
          </div>
        </div>
        <div class="dash-panel" style="margin-top:16px"><h3>Conventions (${convs.length})</h3>
          ${convs.length ? '<table class="cab-table"><thead><tr><th>N°</th><th>Date</th><th>Honoraires</th><th>Provision</th></tr></thead><tbody>' + convs.map(cc => `<tr><td class="mono">${esc(cc.num)}</td><td>${esc(cc.date)}</td><td>${fmtMoney(cc.ht)} HT</td><td>${fmtMoney(cc.provision)}</td></tr>`).join('') + '</tbody></table>' : '<p style="color:var(--text-dim);font-size:13px">Aucune convention générée.</p>'}
        </div>
        <div class="dash-panel" style="margin-top:16px"><h3>Factures (${facts.length})</h3>
          ${facts.length ? '<table class="cab-table"><thead><tr><th>N°</th><th>Type</th><th>Montant</th><th>Statut</th></tr></thead><tbody>' + facts.map(fa => `<tr><td class="mono">${esc(fa.num)}</td><td>${esc(fa.type)}</td><td>${fmtMoney(fa.ttc)}</td><td>${esc(fa.statut)}</td></tr>`).join('') + '</tbody></table>' : '<p style="color:var(--text-dim);font-size:13px">Aucune facture.</p>'}
        </div>
      </div>`;
    $('#crumbs').innerHTML = `<span style="cursor:pointer" id="crumbDossiers">Cabinet — Dossiers</span> <span>/</span> <span class="cur">${esc(d.client)}</span>`;
    $('#backDossiers').addEventListener('click', renderDossiers);
    $('#crumbDossiers').addEventListener('click', renderDossiers);
    $$('[data-act="conv"]').forEach(b => b.addEventListener('click', () => genConvention(b.dataset.id)));
    $$('[data-act="fact-prov"]').forEach(b => b.addEventListener('click', () => genFacture(b.dataset.id, 'provision')));
    $$('[data-act="fact-solde"]').forEach(b => b.addEventListener('click', () => genFacture(b.dataset.id, 'solde')));
    $$('[data-act="echeance"]').forEach(b => b.addEventListener('click', () => openDlgEcheance(b.dataset.id)));
    $$('[data-act="edit2"]').forEach(b => b.addEventListener('click', () => openDlgDossier(b.dataset.id)));
    $$('[data-act="del"]').forEach(b => b.addEventListener('click', () => delDossier(b.dataset.id)));
    $$('input[data-eid]').forEach(cb => cb.addEventListener('change', () => {
      const e = STORE.echeances.find(x => x.id === cb.dataset.eid);
      if (e) { e.done = cb.checked; STORE.echeances = STORE.echeances; viewDossier(id); }
    }));
  }

  function delDossier(id) {
    if (!confirm('Supprimer ce dossier et ses échéances ?')) return;
    STORE.dossiers = STORE.dossiers.filter(d => d.id !== id);
    STORE.echeances = STORE.echeances.filter(e => e.dossierId !== id);
    renderDossiers();
  }

  function openDlgDossier(editId) {
    editingId = editId || null;
    const d = editingId ? STORE.dossiers.find(x => x.id === editingId) : null;
    const form = $('#formDossier');
    form.reset();
    $('#dlgDossierTitle').textContent = d ? 'Modifier dossier' : 'Nouveau dossier';
    if (d) {
      form.client.value = d.client || '';
      form.ice.value = d.ice || '';
      form.type.value = d.type || '';
      form.mission.value = d.mission || '';
      form.honoraires.value = d.honoraires || '';
      form.tva.value = String(d.tva ?? 20);
      form.provisionPct.value = d.provisionPct ?? 50;
      form.statut.value = d.statut || 'Prospect';
      form.echeance.value = d.echeance || '';
      form.contact.value = d.contact || '';
      form.notes.value = d.notes || '';
    }
    $('#dlgDossier').showModal();
  }

  $('#formDossier').addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const obj = Object.fromEntries(fd.entries());
    obj.honoraires = Number(obj.honoraires) || 0;
    obj.tva = Number(obj.tva) || 0;
    obj.provisionPct = Number(obj.provisionPct) || 50;
    const now = todayISO();
    if (editingId) {
      const idx = STORE.dossiers.findIndex(d => d.id === editingId);
      if (idx >= 0) STORE.dossiers[idx] = { ...STORE.dossiers[idx], ...obj, updatedAt: now };
    } else {
      STORE.dossiers = [...STORE.dossiers, { id: uid(), ...obj, createdAt: now, updatedAt: now, statut: obj.statut || 'Prospect' }];
      // auto échéance if date provided
      const newId = STORE.dossiers[STORE.dossiers.length - 1].id;
      if (obj.echeance) {
        STORE.echeances = [...STORE.echeances, { id: uid(), dossierId: newId, date: obj.echeance, type: 'Remise livrables', intitule: 'Remise V1 + Loom', done: false }];
      }
    }
    STORE.dossiers = STORE.dossiers;
    $('#dlgDossier').close();
    renderDossiers();
  });
  $('#btnCancelDossier').addEventListener('click', () => $('#dlgDossier').close());

  /* ---------- Conventions ---------- */
  function genConvention(dossierId) {
    const d = STORE.dossiers.find(x => x.id === dossierId);
    if (!d) return;
    const c = calcTTC(d.honoraires, d.tva);
    const prov = Math.round(c.ttc * (Number(d.provisionPct) || 50) / 100);
    const num = 'CH-' + new Date().getFullYear() + '-' + String(STORE.conventions.length + 1).padStart(3, '0');
    const conv = { id: uid(), dossierId, num, date: todayISO(), mission: d.mission, ht: c.ht, tva: c.tva, ttc: c.ttc, provision: prov, provisionPct: d.provisionPct || 50 };
    STORE.conventions = [...STORE.conventions, conv];
    previewConvention(conv, d);
  }

  function previewConvention(conv, dossier) {
    const content = $('#content');
    content.innerHTML = `
      <div class="cab">
        <button class="btn" id="backConv">← Retour</button>
        <div class="doc" id="convPrint" style="max-width:750px;margin:16px auto">
          <div style="text-align:center;border-bottom:2px solid #0f2a44;padding-bottom:10px;margin-bottom:16px">
            <div style="font-weight:700;font-size:16px">Me [Nom Prénom] — Avocat au Barreau de [Ville]</div>
            <div style="font-size:12px;color:#5a6b7b">Avocat d'Affaires | Droit de l'Entreprise & Numérique — ICE [X] — Tél [06 XX XX XX XX]</div>
          </div>
          <h2 style="text-align:center;margin:0">CONVENTION D'HONORAIRES N° ${esc(conv.num)}</h2>
          <p style="text-align:center;font-size:12px;color:#5a6b7b">Art. 30 Loi 28-08 — Date : ${esc(conv.date)}</p>
          <p><strong>Entre :</strong> Me [Nom], Avocat au Barreau de [Ville], ci-après "l'Avocat"<br>
          <strong>Et :</strong> ${esc(dossier.client)} ${dossier.ice ? '(ICE ' + esc(dossier.ice) + ')' : ''}, ci-après "le Client"</p>
          <p><strong>Objet :</strong> ${esc(conv.mission || dossier.mission || '')}</p>
          <table style="width:100%;border-collapse:collapse;font-size:13px;margin:12px 0" border="1" cellpadding="8">
            <tr style="background:#efece4"><th>Désignation</th><th>Honoraires HT</th></tr>
            <tr><td>${esc(conv.mission || '')}<br><span style="font-size:11px;color:#5a6b7b">1 présentation Loom 15 min + 1 révision sous 7 jours</span></td><td style="text-align:right">${fmtMoney(conv.ht)} HT</td></tr>
            <tr><td>TVA ${dossier.tva}%</td><td style="text-align:right">${fmtMoney(conv.tva)}</td></tr>
            <tr style="font-weight:700"><td>TOTAL TTC</td><td style="text-align:right">${fmtMoney(conv.ttc)} TTC</td></tr>
            <tr style="background:#e4f2f0"><td>Provision à la signature (${conv.provisionPct}%)</td><td style="text-align:right;font-weight:700">${fmtMoney(conv.provision)} TTC</td></tr>
            <tr><td>Solde à la remise</td><td style="text-align:right">${fmtMoney(conv.ttc - conv.provision)} TTC</td></tr>
          </table>
          <p style="font-size:12px"><strong>Modalités :</strong> Provision exigible à la signature (reçu délivré). Solde exigible à la remise des livrables avant envoi final. Délai prévisionnel : 3-10 jours ouvrés à compter de la provision + pièces complètes. Débours en sus. Résiliation : honoraires au prorata du travail accompli.</p>
          <div style="display:flex;justify-content:space-between;margin-top:30px;font-size:13px">
            <div>L'Avocat<br><br>__________________<br>Signature & cachet</div>
            <div>Le Client (lu et approuvé)<br><br>__________________<br>${esc(dossier.client)}</div>
          </div>
          <p style="font-size:9px;color:#5a6b7b;text-align:center;margin-top:20px">Document établi en application de la Loi 28-08. Ne constitue pas une consultation sans diagnostic individuel.</p>
        </div>
        <div class="cab-toolbar" style="justify-content:center">
          <button class="btn btn-primary" id="btnPrintConv">🖨️ Imprimer / PDF</button>
          <button class="btn" id="btnBackConv2">Retour dossier</button>
        </div>
      </div>`;
    $('#crumbs').innerHTML = '<span class="cur">Convention ' + esc(conv.num) + '</span>';
    $('#backConv').addEventListener('click', renderConventions);
    $('#btnBackConv2').addEventListener('click', () => viewDossier(dossier.id));
    $('#btnPrintConv').addEventListener('click', () => window.print());
  }

  function renderConventions() {
    const convs = STORE.conventions.slice().sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    const dossiers = STORE.dossiers;
    const content = $('#content');
    content.innerHTML = `
      <div class="cab">
        <h2>Conventions d'honoraires</h2>
        <p class="sub">${convs.length} convention(s) — Art. 30 Loi 28-08. Générez depuis un dossier.</p>
        <div class="cab-toolbar">
          <select id="convDossierSel"><option value="">— Choisir un dossier —</option>${dossiers.map(d => `<option value="${esc(d.id)}">${esc(d.client)} — ${esc(d.mission || '')}</option>`).join('')}</select>
          <button class="btn btn-primary" id="btnGenConv">Générer convention</button>
        </div>
        <div class="cab-table-wrap"><table class="cab-table"><thead><tr><th>N°</th><th>Date</th><th>Client</th><th>Mission</th><th>HT</th><th>Provision</th><th>Actions</th></tr></thead><tbody>
          ${convs.map(c => {
      const d = dossiers.find(x => x.id === c.dossierId);
      return `<tr><td class="mono">${esc(c.num)}</td><td>${esc(c.date)}</td><td>${esc(d ? d.client : '—')}</td><td style="max-width:180px;white-space:normal;font-size:12px">${esc(c.mission || '')}</td><td>${fmtMoney(c.ht)}</td><td>${fmtMoney(c.provision)}</td><td><button class="btn" data-viewconv="${esc(c.id)}">Voir</button></td></tr>`;
    }).join('')}
        </tbody></table>${convs.length === 0 ? '<div class="empty-state" style="padding:20px">Aucune convention. Sélectionnez un dossier puis Générer.</div>' : ''}</div>
      </div>`;
    $('#crumbs').innerHTML = '<span class="cur">Cabinet — Conventions</span>';
    $('#btnGenConv').addEventListener('click', () => {
      const id = $('#convDossierSel').value;
      if (!id) return alert('Choisissez un dossier');
      genConvention(id);
    });
    $$('[data-viewconv]').forEach(b => b.addEventListener('click', () => {
      const c = STORE.conventions.find(x => x.id === b.dataset.viewconv);
      const d = STORE.dossiers.find(x => x.id === c.dossierId);
      if (c && d) previewConvention(c, d);
    }));
  }

  /* ---------- Factures ---------- */
  function genFacture(dossierId, type) {
    const d = STORE.dossiers.find(x => x.id === dossierId);
    if (!d) return;
    const c = calcTTC(d.honoraires, d.tva);
    const prov = Math.round(c.ttc * (Number(d.provisionPct) || 50) / 100);
    const num = (type === 'provision' ? 'RP-' : 'FH-') + new Date().getFullYear() + '-' + String(STORE.factures.length + 1).padStart(3, '0');
    const montant = type === 'provision' ? prov : c.ttc - prov;
    const ttc = montant;
    const ht = d.tva == 0 ? ttc : Math.round(ttc / 1.2);
    const tva = ttc - ht;
    const f = { id: uid(), dossierId, num, date: todayISO(), type: type === 'provision' ? 'Reçu provision' : 'Facture solde', ht, tva, ttc, statut: 'Émise' };
    STORE.factures = [...STORE.factures, f];
    previewFacture(f, d);
  }

  function previewFacture(f, dossier) {
    const content = $('#content');
    content.innerHTML = `
      <div class="cab">
        <button class="btn" id="backFact">← Retour</button>
        <div class="doc" style="max-width:750px;margin:16px auto">
          <div style="display:flex;justify-content:space-between;border-bottom:2px solid #0f2a44;padding-bottom:10px">
            <div><strong>Me [Nom]</strong><br><span style="font-size:11px;color:#5a6b7b">Avocat au Barreau de [Ville] — ICE [X]</span></div>
            <div style="text-align:right"><strong>${esc(f.type)} N° ${esc(f.num)}</strong><br><span style="font-size:12px">${esc(f.date)}</span></div>
          </div>
          <p><strong>Client :</strong> ${esc(dossier.client)} ${dossier.ice ? '(ICE ' + esc(dossier.ice) + ')' : ''}</p>
          <p><strong>Dossier :</strong> ${esc(dossier.mission || '')}</p>
          <table style="width:100%;border-collapse:collapse;font-size:13px" border="1" cellpadding="8">
            <tr style="background:#efece4"><th>Désignation</th><th style="text-align:right">Montant</th></tr>
            <tr><td>${esc(f.type)} — ${esc(dossier.mission || '')}</td><td style="text-align:right">${fmtMoney(f.ht)} HT</td></tr>
            <tr><td>TVA ${dossier.tva}%</td><td style="text-align:right">${fmtMoney(f.tva)}</td></tr>
            <tr style="font-weight:700;background:#e4f2f0"><td>${f.type === 'Reçu provision' ? 'Provision encaissée' : 'Net à payer (solde)'}</td><td style="text-align:right">${fmtMoney(f.ttc)} TTC</td></tr>
          </table>
          <p style="font-size:12px">Échéance : à réception — RIB [24 chiffres]. ${dossier.tva == 0 ? 'TVA non applicable, art. 91 CGI.' : ''}</p>
        </div>
        <div class="cab-toolbar" style="justify-content:center"><button class="btn btn-primary" onclick="window.print()">🖨️ Imprimer / PDF</button> <button class="btn" id="btnBackFact2">Retour</button></div>
      </div>`;
    $('#crumbs').innerHTML = '<span class="cur">' + esc(f.type) + ' ' + esc(f.num) + '</span>';
    $('#backFact').addEventListener('click', renderFactures);
    $('#btnBackFact2').addEventListener('click', () => viewDossier(dossier.id));
  }

  function renderFactures() {
    const facts = STORE.factures.slice().sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    const dossiers = STORE.dossiers;
    const content = $('#content');
    content.innerHTML = `
      <div class="cab">
        <h2>Factures & Provisions</h2>
        <p class="sub">${facts.length} document(s) — Reçus de provision (art. 30) + factures solde.</p>
        <div class="cab-toolbar">
          <select id="factDossierSel"><option value="">— Dossier —</option>${dossiers.map(d => `<option value="${esc(d.id)}">${esc(d.client)}</option>`).join('')}</select>
          <button class="btn" id="btnFactProv">Reçu provision</button>
          <button class="btn" id="btnFactSolde">Facture solde</button>
        </div>
        <div class="cab-table-wrap"><table class="cab-table"><thead><tr><th>N°</th><th>Date</th><th>Client</th><th>Type</th><th>TTC</th><th>Statut</th><th>Actions</th></tr></thead><tbody>
          ${facts.map(f => {
      const d = dossiers.find(x => x.id === f.dossierId);
      return `<tr><td class="mono">${esc(f.num)}</td><td>${esc(f.date)}</td><td>${esc(d ? d.client : '—')}</td><td>${esc(f.type)}</td><td>${fmtMoney(f.ttc)}</td><td>${esc(f.statut)}</td><td><button class="btn" data-viewfact="${esc(f.id)}">Voir</button> <button class="btn" data-encaisse="${esc(f.id)}">${f.statut === 'Encaissée' ? '✓' : 'Encaisser'}</button></td></tr>`;
    }).join('')}
        </tbody></table>${facts.length === 0 ? '<div class="empty-state" style="padding:20px">Aucune facture. Générez depuis un dossier.</div>' : ''}</div>
      </div>`;
    $('#crumbs').innerHTML = '<span class="cur">Cabinet — Factures</span>';
    $('#btnFactProv').addEventListener('click', () => { const id = $('#factDossierSel').value; if (!id) return alert('Choisissez un dossier'); genFacture(id, 'provision'); });
    $('#btnFactSolde').addEventListener('click', () => { const id = $('#factDossierSel').value; if (!id) return alert('Choisissez un dossier'); genFacture(id, 'solde'); });
    $$('[data-viewfact]').forEach(b => b.addEventListener('click', () => {
      const f = STORE.factures.find(x => x.id === b.dataset.viewfact);
      const d = STORE.dossiers.find(x => x.id === f.dossierId);
      if (f && d) previewFacture(f, d);
    }));
    $$('[data-encaisse]').forEach(b => b.addEventListener('click', () => {
      const f = STORE.factures.find(x => x.id === b.dataset.encaisse);
      if (f) { f.statut = f.statut === 'Encaissée' ? 'Émise' : 'Encaissée'; STORE.factures = STORE.factures; renderFactures(); }
    }));
  }

  /* ---------- Échéances ---------- */
  function renderEcheances() {
    const echeances = STORE.echeances.slice().sort((a, b) => (a.date || '').localeCompare(b.date || ''));
    const dossiers = STORE.dossiers;
    const content = $('#content');
    content.innerHTML = `
      <div class="cab">
        <h2>Échéances</h2>
        <p class="sub">${echeances.length} échéance(s) — Retards en rouge. Cochez quand fait.</p>
        <div class="cab-toolbar">
          <button class="btn btn-primary" id="btnNewEcheance">＋ Nouvelle échéance</button>
          <select id="echFilter"><option value="">Toutes</option><option value="todo">À faire</option><option value="done">Faites</option><option value="overdue">En retard</option></select>
        </div>
        <div class="cab-table-wrap"><table class="cab-table"><thead><tr><th>Date</th><th>Dossier</th><th>Type</th><th>Intitulé</th><th>Fait</th><th></th></tr></thead><tbody id="echBody">
          ${echeances.map(e => {
      const d = dossiers.find(x => x.id === e.dossierId);
      const overdue = !e.done && e.date && e.date < todayISO();
      return `<tr data-eid="${esc(e.id)}" data-done="${e.done ? '1' : '0'}" data-overdue="${overdue ? '1' : '0'}" style="${overdue ? 'background:#fff1f1' : ''}">
                <td class="mono">${esc(e.date || '')} ${overdue ? '⚠️' : ''}</td>
                <td>${esc(d ? d.client : '—')}</td>
                <td><span class="badge">${esc(e.type || '')}</span></td>
                <td style="white-space:normal">${esc(e.intitule || '')}</td>
                <td><input type="checkbox" ${e.done ? 'checked' : ''} data-eid="${esc(e.id)}"></td>
                <td><button class="btn btn-danger" data-del-eid="${esc(e.id)}">×</button></td>
              </tr>`;
    }).join('')}
        </tbody></table>${echeances.length === 0 ? '<div class="empty-state" style="padding:20px">Aucune échéance. Ajoutez depuis un dossier ou ici.</div>' : ''}</div>
      </div>`;
    $('#crumbs').innerHTML = '<span class="cur">Cabinet — Échéances</span>';
    $('#btnNewEcheance').addEventListener('click', () => openDlgEcheance());
    $('#echFilter').addEventListener('change', () => {
      const v = $('#echFilter').value;
      $$('#echBody tr').forEach(tr => {
        const done = tr.dataset.done === '1';
        const overdue = tr.dataset.overdue === '1';
        let show = true;
        if (v === 'todo') show = !done;
        else if (v === 'done') show = done;
        else if (v === 'overdue') show = overdue && !done;
        tr.style.display = show ? '' : 'none';
      });
    });
    $$('input[data-eid]').forEach(cb => cb.addEventListener('change', () => {
      const e = STORE.echeances.find(x => x.id === cb.dataset.eid);
      if (e) { e.done = cb.checked; STORE.echeances = STORE.echeances; renderEcheances(); }
    }));
    $$('[data-del-eid]').forEach(b => b.addEventListener('click', () => {
      if (!confirm('Supprimer cette échéance ?')) return;
      STORE.echeances = STORE.echeances.filter(x => x.id !== b.dataset.delEid);
      renderEcheances();
    }));
  }

  function openDlgEcheance(prefillDossierId) {
    const sel = $('#echeanceDossierSel');
    sel.innerHTML = '<option value="">— Sans dossier —</option>' + STORE.dossiers.map(d => `<option value="${esc(d.id)}" ${d.id === prefillDossierId ? 'selected' : ''}>${esc(d.client)}</option>`).join('');
    $('#formEcheance').reset();
    if (prefillDossierId) $('#echeanceDossierSel').value = prefillDossierId;
    $('#formEcheance').querySelector('[name="date"]').value = todayISO();
    $('#dlgEcheance').showModal();
  }
  $('#formEcheance').addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const obj = Object.fromEntries(fd.entries());
    if (!obj.date || !obj.intitule) return alert('Date et intitulé requis');
    STORE.echeances = [...STORE.echeances, { id: uid(), dossierId: obj.dossierId || '', date: obj.date, type: obj.type || 'Autre', intitule: obj.intitule, done: false }];
    $('#dlgEcheance').close();
    renderEcheances();
  });
  $('#btnCancelEcheance').addEventListener('click', () => $('#dlgEcheance').close());

  /* ---------- Bibliothèque ---------- */
  function renderBibliotheque() {
    const templates = [
      { file: '01_Convention_Honoraires_Modele.md', title: 'Convention d\'honoraires (art. 30)', desc: 'Obligatoire pour chaque mission — provision + honoraires HT/TTC', folder: '05_Document_Bank/templates' },
      { file: '06_Recu_Provision_Facture.md', title: 'Reçu provision & Facture solde', desc: 'Reçu à l\'encaissement + facture finale', folder: '05_Document_Bank/templates' },
      { file: '07_Lettre_Mission_Planning.md', title: 'Lettre de mission & Planning', desc: 'Jointe à la convention — jalons J0 à J+5', folder: '05_Document_Bank/templates' },
      { file: '08_PV_Remise_Cloture.md', title: 'PV de remise & Clôture', desc: 'Preuve de remise des livrables', folder: '05_Document_Bank/templates' },
      { file: '03_Pack_Freelance_Contrat.md', title: 'Trame Contrat prestation FR/EN', desc: 'Mission Contrats — 12 clauses + annexes', folder: '05_Document_Bank/templates' },
      { file: '04_Pack_Ecommerce_CGV.md', title: 'Trame CGV/CGU e-commerce', desc: 'Mission Conformité — Loi 31-08 + 09-08', folder: '05_Document_Bank/templates' },
      { file: '05_Registre_09-08_Modele.md', title: 'Registre Loi 09-08 (Excel/Notion)', desc: 'Mission 09-08 — 5 onglets + CNDP', folder: '05_Document_Bank/templates' },
      { file: '02_Scripts_DM_WhatsApp.md', title: 'Scripts prise de contact', desc: 'Messages comptables / prospects — déontologiques', folder: '05_Document_Bank/templates' }
    ];
    const content = $('#content');
    content.innerHTML = `
      <div class="cab">
        <h2>Bibliothèque de modèles</h2>
        <p class="sub">8 modèles — cliquez pour ouvrir dans le Base. Tous avec mention déontologique en pied de page.</p>
        <div class="dash-grid" style="grid-template-columns:repeat(auto-fill,minmax(260px,1fr))">
          ${templates.map(t => `
            <div class="dash-panel" style="cursor:pointer" data-open="${esc(t.folder + '/' + t.file)}">
              <h3 style="font-size:14px;margin:0 0 6px">📄 ${esc(t.title)}</h3>
              <p style="font-size:12px;color:var(--text-dim);margin:0 0 10px">${esc(t.desc)}</p>
              <span style="font-size:11px;color:var(--accent-2)">${esc(t.file)} →</span>
            </div>`).join('')}
        </div>
        <div class="dash-panel" style="margin-top:16px">
          <h3>Doctrine & Jurisprudence</h3>
          <p style="font-size:13px;color:var(--text-dim)">3 fiches prêtes à citer en diagnostic :</p>
          <ul style="font-size:13px">
            <li><a href="#" data-open-juris="08_Jurisprudence/01_Loi_09-08/00_INDEX.md">Loi 09-08 — 4 décisions CNDP + grille sanctions</a></li>
            <li><a href="#" data-open-juris="08_Jurisprudence/02_Loi_31-08/00_INDEX.md">Loi 31-08 — 3 jugements CGV / rétractation</a></li>
            <li><a href="#" data-open-juris="08_Jurisprudence/03_Contrats_DOC/00_INDEX.md">Contrats — 3 arrêts Cass. (pénale, réserve, force majeure)</a></li>
            <li><a href="#" data-open-juris="01_Strategy/06_Deontologie_Pratique_Avocat_Maroc/00_INDEX.md">Déontologie pratique — Loi 28-08 (checklist)</a></li>
          </ul>
        </div>
      </div>`;
    $('#crumbs').innerHTML = '<span class="cur">Cabinet — Bibliothèque</span>';
    $$('[data-open]').forEach(el => el.addEventListener('click', () => {
      openInLearn(el.dataset.open);
    }));
    $$('[data-open-juris]').forEach(a => a.addEventListener('click', (e) => {
      e.preventDefault();
      openInLearn(a.dataset.openJuris);
    }));
  }

  /* ---------- Init ---------- */
  function initCabinet() {
    applyTheme();
    const tb = $('#themeBtn');
    if (tb) tb.addEventListener('click', cycleTheme);
    $('#menuBtn').addEventListener('click', () => document.body.classList.add('sidebar-open'));
    $('#sidebarClose').addEventListener('click', () => document.body.classList.remove('sidebar-open'));
    $('#scrim').addEventListener('click', () => document.body.classList.remove('sidebar-open'));
    $$('.cab-nav-item').forEach(b => b.addEventListener('click', () => {
      const v = b.dataset.view;
      if (v === 'new-dossier') { openDlgDossier(); return; }
      cabView = v;
      LS.set('cabinetView', v);
      renderCabinet();
      document.body.classList.remove('sidebar-open');
    }));
    renderCabinet();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initCabinet);
  else initCabinet();
})();