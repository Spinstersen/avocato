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
    set echeances(v) { LS.set('echeances', v); },
    get settings() { return LS.get('cabSettings', {}); },
    set settings(v) { LS.set('cabSettings', v); },
    get counters() { return LS.get('cabCounters', {}); },
    set counters(v) { LS.set('cabCounters', v); },
    get journal() { return LS.get('cabJournal', []); },
    set journal(v) { LS.set('cabJournal', v); }
  };

  /* Journal / timeline — événements auto-loggés */
  function logEvent(dossierId, type, label) {
    const j = STORE.journal;
    j.push({ id: uid(), ts: new Date().toISOString().slice(0, 16).replace('T', ' '), dossierId: dossierId || '', type, label });
    if (j.length > 500) STORE.journal = j.slice(-400);
    else STORE.journal = j;
  }

  /* Numérotation séquentielle persistante (fin des collisions) */
  function nextNum(prefix) {
    const c = STORE.counters;
    const n = (c[prefix] || 0) + 1;
    STORE.counters = { ...c, [prefix]: n };
    return prefix + '-' + new Date().getFullYear() + '-' + String(n).padStart(3, '0');
  }

  /* En-tête cabinet dynamique (loi 66.23 — identité complète) */
  function settingsComplete() {
    const s = STORE.settings;
    return !!(s.nomAvocat && s.barreau);
  }
  function cabHeaderLines() {
    const s = STORE.settings;
    const l1 = s.nomAvocat ? ('Me ' + s.nomAvocat + ' — Avocat au Barreau de ' + s.barreau) : '[Compléter votre identité dans ⚙️ Paramètres]';
    const bits = [];
    if (s.ice) bits.push('ICE ' + s.ice);
    if (s.if_) bits.push('IF ' + s.if_);
    if (s.rc) bits.push('RC ' + s.rc);
    if (s.adresse) bits.push(s.adresse);
    if (s.tel) bits.push('Tél ' + s.tel);
    if (s.email) bits.push(s.email);
    return { l1, l2: bits.join(' — ') || '', ribLine: (s.rib && s.banque) ? ('RIB ' + s.rib + ' — ' + s.banque) : (s.rib ? 'RIB ' + s.rib : '') };
  }

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
    else if (cabView === 'pipeline') renderKanban();
    else if (cabView === 'dossiers') renderDossiers();
    else if (cabView === 'conventions') renderConventions();
    else if (cabView === 'factures') renderFactures();
    else if (cabView === 'echeances') renderEcheances();
    else if (cabView === 'bibliotheque') renderBibliotheque();
    else if (cabView === 'settings') renderSettings();
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
    const fin = financeAggregates();
    const anneeCourante = new Date().getFullYear();

    const content = $('#content');
    content.innerHTML = `
      <div class="cab">
        <h2>Tableau de bord Cabinet</h2>
        <p class="sub">Dossiers en localStorage — offline. Provision et solde suivent la convention d'honoraires (loi n° 66.23).</p>
        ${!settingsComplete() ? '<div class="dash-panel" style="border-left:4px solid var(--warn);margin-bottom:14px"><h3>⚙️ Configure ta fiche cabinet</h3><p style="font-size:13px;color:var(--text-dim)">Nom + Barreau requis pour que les conventions/factures sortent à ton nom (sinon placeholders).</p><button class="btn btn-primary" id="cabGoSettings">Ouvrir les Paramètres</button></div>' : ''}
        <div class="bento">
          <div class="dash-card bento-hero"><div class="num">${fmtMoney(fin.encaisse)}</div><div class="lbl">Encaissé réel TTC</div></div>
          <div class="dash-card" style="grid-column:span 3"><div class="num">${fmtMoney(fin.attendu)}</div><div class="lbl">Attendu — émis non encaissé</div></div>
          <div class="dash-card"><div class="num">${total}</div><div class="lbl">Dossiers</div></div>
          <div class="dash-card"><div class="num">${enCours}</div><div class="lbl">En cours / livrés</div></div>
          <div class="dash-card"><div class="num" style="${overdue ? 'color:var(--err)' : 'color:var(--ok)'}">${overdue}</div><div class="lbl">Échéances en retard</div></div>
        </div>
        <div class="dash-grid">
          <div class="dash-panel"><h3>Dossiers par statut</h3><div class="chart-canvas-wrap" style="height:220px"><canvas id="cabStatut"></canvas></div></div>
          <div class="dash-panel"><h3>CA par mission</h3><div class="chart-canvas-wrap" style="height:220px"><canvas id="cabMission"></canvas></div></div>
        </div>
        <div class="dash-grid">
          <div class="dash-panel">
            <h3>TVA collectée — ${anneeCourante} <select id="tvaYear" style="margin-left:auto;font-size:12px;padding:2px 6px"></select></h3>
            <table class="cab-table"><thead><tr><th>Trimestre</th><th>Base HT</th><th>TVA collectée</th></tr></thead><tbody id="tvaBody">
            ${tvaParTrimestre(anneeCourante).map(r => `<tr><td>${r.q}</td><td>${fmtMoney(r.ht)}</td><td class="mono">${fmtMoney(r.tva)}</td></tr>`).join('')}
            </tbody></table>
            <p style="font-size:11px;color:var(--text-faint);margin-top:8px">Base = factures émises (provisions + soldes). Vérifier le régime déclaratif avec ton comptable.</p>
          </div>
          <div class="dash-panel">
            <h3>Export comptable</h3>
            <p style="font-size:13px;color:var(--text-dim)">Fichier CSV (dossiers + factures) prêt à transmettre au comptable pour la déclaration.</p>
            <button class="btn btn-primary" id="btnExportCSV">⬇️ Exporter CSV ${anneeCourante}</button>
            <p style="font-size:11px;color:var(--text-faint);margin-top:8px">Colonnes : type, numéro, date, client, ICE, mission, HT, TVA, TTC, statut, encaissé le.</p>
          </div>
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
    const goSet = $('#cabGoSettings'); if (goSet) goSet.addEventListener('click', () => { cabView = 'settings'; LS.set('cabinetView', 'settings'); renderCabinet(); });
    $('#cabSample').addEventListener('click', loadSample);
    $('#cabExport').addEventListener('click', exportJSON);
    $('#cabImport').addEventListener('change', importJSON);
    $('#btnExportCSV').addEventListener('click', exportCSV);
    // sélecteur année TVA
    const ySel = $('#tvaYear');
    const years = [...new Set(STORE.factures.map(f => (f.date || '').slice(0, 4)).filter(Boolean))].sort().reverse();
    if (years.length) {
      ySel.innerHTML = years.map(y => `<option ${y === String(anneeCourante) ? 'selected' : ''}>${y}</option>`).join('');
      ySel.addEventListener('change', () => {
        const rows = tvaParTrimestre(Number(ySel.value));
        $('#tvaBody').innerHTML = rows.map(r => `<tr><td>${r.q}</td><td>${fmtMoney(r.ht)}</td><td class="mono">${fmtMoney(r.tva)}</td></tr>`).join('');
      });
    } else { ySel.disabled = true; }
  }

  function exportCSV() {
    const annee = new Date().getFullYear();
    const escCsv = (v) => '"' + String(v ?? '').replace(/"/g, '""') + '"';
    const lines = ['type;numero;date;client;ice;mission;ht;tva;ttc;statut;encaisse_le'];
    STORE.factures.forEach(f => {
      const d = STORE.dossiers.find(x => x.id === f.dossierId) || {};
      lines.push([escCsv(f.type), escCsv(f.num), escCsv(f.date), escCsv(d.client), escCsv(d.ice), escCsv(d.mission), f.ht, f.tva, f.ttc, escCsv(f.statut), escCsv(f.encaisseeLe || '')].join(';'));
    });
    STORE.dossiers.forEach(d => {
      lines.push(['DOSSIER', '', escCsv(d.createdAt), escCsv(d.client), escCsv(d.ice), escCsv(d.mission), d.honoraires, calcTTC(d.honoraires, d.tva).tva, calcTTC(d.honoraires, d.tva).ttc, escCsv(d.statut), ''].join(';'));
    });
    const blob = new Blob(['\uFEFF' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'comptable-' + annee + '.csv'; a.click(); URL.revokeObjectURL(a.href);
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

  /* ---------- Impression isolée : seul le document part au PDF ---------- */
  function printDoc(html) {
    const area = $('#printArea');
    area.innerHTML = html;
    document.body.classList.add('printing-doc');
    const done = () => { document.body.classList.remove('printing-doc'); window.removeEventListener('afterprint', done); };
    window.addEventListener('afterprint', done);
    setTimeout(() => { window.print(); setTimeout(done, 2000); }, 60);
  }

  /* ---------- Paramètres cabinet (identité injectée dans les documents) ---------- */
  const SETTINGS_FIELDS = [
    ['nomAvocat', 'Nom & prénom *', 'Ex: Yassine El Amrani', 'text'],
    ['barreau', 'Barreau *', 'Ex: Casablanca', 'text'],
    ['ice', 'ICE', '15 chiffres', 'text'],
    ['if_', 'Identifiant fiscal (IF)', 'IF 12345678', 'text'],
    ['rc', 'RC (si SCP)', 'Ex: RC Casa 123456', 'text'],
    ['adresse', 'Adresse cabinet', 'Rue, ville', 'text'],
    ['tel', 'Téléphone / WhatsApp', '06 XX XX XX XX', 'tel'],
    ['email', 'Email professionnel', 'contact@cabinet.ma', 'email'],
    ['rib', 'RIB (24 chiffres)', '', 'text'],
    ['banque', 'Banque', 'Ex: Attijariwafa Bank', 'text']
  ];

  function renderSettings() {
    const s = STORE.settings;
    const content = $('#content');
    const ok = settingsComplete();
    content.innerHTML = `
      <div class="cab" style="max-width:720px">
        <h2>Paramètres du cabinet</h2>
        <p class="sub">Ces informations sont injectées dans les conventions, reçus et factures générés. Stockées uniquement en localStorage (offline).</p>
        ${ok ? '<p style="color:var(--ok);font-weight:600;font-size:13px">✓ Identité configurée — vos documents sortent prêts à signer.</p>' : '<p style="color:var(--warn);font-weight:600;font-size:13px">⚠️ Nom et Barreau requis pour générer des documents propres.</p>'}
        <form id="formSettings" class="dash-panel" style="padding:18px">
          <h3>Identité & coordonnées</h3>
          <div class="form-grid">
            ${SETTINGS_FIELDS.map(([k, lbl, ph, type]) => `<label>${lbl}<input name="${esc(k)}" type="${type}" value="${esc(s[k] || '')}" placeholder="${ph}"></label>`).join('')}
          </div>
          <div class="cab-toolbar" style="margin-top:12px">
            <button type="submit" class="btn btn-primary">💾 Enregistrer</button>
            ${ok ? '<button type="button" class="btn btn-danger" id="btnResetSettings">Effacer</button>' : ''}
          </div>
        </form>
      </div>`;
    $('#crumbs').innerHTML = '<span class="cur">Cabinet — Paramètres</span>';
    $('#formSettings').addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const obj = Object.fromEntries(fd.entries());
      STORE.settings = obj;
      renderSettings();
    });
    const rst = $('#btnResetSettings');
    if (rst) rst.addEventListener('click', () => {
      if (!confirm('Effacer la fiche cabinet ?')) return;
      STORE.settings = {};
      renderSettings();
    });
  }

  /* ---------- Pipeline Kanban ---------- */
  const STATUTS = ['Prospect', 'Convention envoyée', 'Convention signée', 'En cours', 'Livré - solde dû', 'Clôturé', 'Abandonné'];

  function moveStatut(id, delta) {
    const d = STORE.dossiers.find(x => x.id === id);
    if (!d) return;
    const i = STATUTS.indexOf(d.statut || 'Prospect');
    const ni = Math.min(STATUTS.length - 1, Math.max(0, i + delta));
    if (ni === i) return;
    d.statut = STATUTS[ni];
    d.updatedAt = todayISO();
    STORE.dossiers = STORE.dossiers;
    logEvent(id, 'statut', 'Statut → ' + d.statut);
    renderKanban();
  }

  function setStatutDrop(id, statut) {
    const d = STORE.dossiers.find(x => x.id === id);
    if (!d || d.statut === statut) return;
    d.statut = statut;
    d.updatedAt = todayISO();
    STORE.dossiers = STORE.dossiers;
    logEvent(id, 'statut', 'Statut → ' + statut);
    renderKanban();
  }

  function renderKanban() {
    const dossiers = STORE.dossiers;
    const content = $('#content');
    const cards = (statut) => dossiers.filter(d => (d.statut || 'Prospect') === statut).map(d => {
      const overdueEch = STORE.echeances.some(e => e.dossierId === d.id && !e.done && e.date && e.date < todayISO());
      return `<div class="kan-card ${overdueEch ? 'kan-late' : ''}" draggable="true" data-kid="${esc(d.id)}">
        <button class="kan-move" data-mv="${esc(d.id)}" data-d="-1" title="Reculer" aria-label="Reculer">◀</button>
        <div class="kan-body" data-open="${esc(d.id)}" title="Ouvrir le dossier">
          <strong>${esc(d.client)}</strong>
          <span class="kan-meta">${esc((d.mission || '').split('(')[0].trim())}</span>
          <span class="kan-money">${fmtMoney(d.honoraires)} HT${d.echeance ? ' · ⏰ ' + esc(fmtDate(d.echeance)) : ''}${overdueEch ? ' · 🔴 retard' : ''}</span>
        </div>
        <button class="kan-move" data-mv="${esc(d.id)}" data-d="1" title="Avancer" aria-label="Avancer">▶</button>
      </div>`;
    }).join('') || '<div class="kan-empty">—</div>';

    content.innerHTML = `
      <div class="cab">
        <h2>Pipeline</h2>
        <p class="sub">${dossiers.length} dossier(s) — glisse les cartes sur desktop, ◀▶ sur mobile. Clique le centre pour ouvrir.</p>
      </div>
      <div class="kan-board">
        ${STATUTS.map(s => `<div class="kan-col" data-col="${esc(s)}"><div class="kan-head">${esc(s)}<span>${dossiers.filter(d => (d.statut || 'Prospect') === s).length}</span></div>${cards(s)}</div>`).join('')}
      </div>`;
    $('#crumbs').innerHTML = '<span class="cur">Cabinet — Pipeline</span>';

    $$('.kan-move').forEach(b => b.addEventListener('click', () => moveStatut(b.dataset.mv, Number(b.dataset.d))));
    $$('.kan-body').forEach(b => b.addEventListener('click', () => viewDossier(b.dataset.open)));
    // drag & drop desktop
    let dragId = null;
    $$('.kan-card').forEach(card => card.addEventListener('dragstart', () => { dragId = card.dataset.kid; card.classList.add('dragging'); }));
    cardDragEnd();
    function cardDragEnd() { $$('.kan-card').forEach(c => c.addEventListener('dragend', () => c.classList.remove('dragging'))); }
    $$('.kan-col').forEach(col => {
      col.addEventListener('dragover', (e) => { e.preventDefault(); col.classList.add('kan-over'); });
      col.addEventListener('dragleave', () => col.classList.remove('kan-over'));
      col.addEventListener('drop', (e) => {
        e.preventDefault(); col.classList.remove('kan-over');
        if (dragId) setStatutDrop(dragId, col.dataset.col);
        dragId = null;
      });
    });
  }

  /* ---------- Timeline (journal) ---------- */
  function renderTimeline(dossierId) {
    const events = STORE.journal.filter(e => e.dossierId === dossierId).slice(-20).reverse();
    if (!events.length) return '<p style="color:var(--text-dim);font-size:13px">Aucun événement encore. Le journal se remplit automatiquement (conventions, factures, changements de statut).</p>';
    const ICON = { convention: '📝', facture: '💳', statut: '🔄', echeance: '⏰', dossier: '📁' };
    return `<ul class="timeline">${events.map(e => `
      <li><span class="tl-icon">${ICON[e.type] || '•'}</span><span class="tl-ts mono">${esc(e.ts)}</span><span>${esc(e.label)}</span></li>`).join('')}</ul>`;
  }

  /* ---------- Dossiers ---------- */
  function renderDossiers() {
    const dossiers = STORE.dossiers.slice().sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''));
    const content = $('#content');
    content.innerHTML = `
      <div class="cab">
        <h2>Dossiers</h2>
        <p class="sub">${dossiers.length} dossier(s) — Honoraires HT, provision — loi n° 66.23 : reçu numéroté, paiement >10 000 DH par chèque/virement. Cliquez sur un dossier pour agir.</p>
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
                <td data-label="Client"><strong>${esc(d.client)}</strong><br><span style="color:var(--text-dim);font-size:11px">${esc(d.type || '')} ${d.ice ? '· ICE ' + esc(d.ice) : ''}</span></td>
                <td data-label="Mission" style="max-width:180px;white-space:normal;font-size:12px">${esc(d.mission || '')}</td>
                <td data-label="Honoraires" class="mono">${fmtMoney(c.ht)}<br><span style="color:var(--text-dim)">${d.tva == 0 ? 'TVA 0%' : 'TTC ' + fmtMoney(c.ttc)}</span></td>
                <td data-label="Provision" class="mono">${fmtMoney(prov)}<br><span style="color:var(--text-dim)">${d.provisionPct || 50}%</span></td>
                <td data-label="Statut">${badge(d.statut || 'Prospect')}</td>
                <td data-label="Échéance" class="mono">${esc(d.echeance ? fmtDate(d.echeance) : '—')}</td>
                <td data-label="Actions"><button class="btn" data-act="view" data-id="${esc(d.id)}">Voir</button> <button class="btn" data-act="edit" data-id="${esc(d.id)}">Éditer</button></td>
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
        <div class="dash-panel" style="margin-top:16px"><h3>Journal du dossier</h3>${renderTimeline(id)}</div>
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
      if (e) {
        e.done = cb.checked;
        STORE.echeances = STORE.echeances;
        logEvent(id, 'echeance', (cb.checked ? '✓ Échéance faite : ' : '↩ Échéance réouverte : ') + (e.intitule || e.type || ''));
        viewDossier(id);
      }
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
      const oldStatut = STORE.dossiers[idx]?.statut;
      if (idx >= 0) STORE.dossiers[idx] = { ...STORE.dossiers[idx], ...obj, updatedAt: now };
      if (oldStatut && obj.statut && obj.statut !== oldStatut) logEvent(editingId, 'statut', 'Statut → ' + obj.statut);
      else logEvent(editingId, 'dossier', 'Dossier modifié');
    } else {
      STORE.dossiers = [...STORE.dossiers, { id: uid(), ...obj, createdAt: now, updatedAt: now, statut: obj.statut || 'Prospect' }];
      // auto échéance if date provided
      const newId = STORE.dossiers[STORE.dossiers.length - 1].id;
      logEvent(newId, 'dossier', 'Dossier créé (' + fmtMoney(obj.honoraires) + ' HT)');
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
    if (!settingsComplete() && !confirm('Ta fiche cabinet (nom/barreau) est incomplète.\nGénérer quand même avec des placeholders ?')) return;
    const c = calcTTC(d.honoraires, d.tva);
    const prov = Math.round(c.ttc * (Number(d.provisionPct) || 50) / 100);
    const conv = { id: uid(), dossierId, num: nextNum('CH'), date: todayISO(), mission: d.mission, ht: c.ht, tva: c.tva, ttc: c.ttc, provision: prov, provisionPct: d.provisionPct || 50 };
    STORE.conventions = [...STORE.conventions, conv];
    logEvent(dossierId, 'convention', 'Convention ' + conv.num + ' générée');
    previewConvention(conv, d);
  }

  function previewConvention(conv, dossier) {
    const hd = cabHeaderLines();
    const content = $('#content');
    content.innerHTML = `
      <div class="cab">
        <button class="btn" id="backConv">← Retour</button>
        <div class="doc" id="convPrint" style="max-width:750px;margin:16px auto">
          <div style="text-align:center;border-bottom:2px solid #1d4ed8;padding-bottom:10px;margin-bottom:16px">
            <div style="font-weight:700;font-size:16px">${esc(hd.l1)}</div>
            <div style="font-size:12px;color:#5a6b7b">${esc(hd.l2)}</div>
          </div>
          <h2 style="text-align:center;margin:0">CONVENTION D'HONORAIRES N° ${esc(conv.num)}</h2>
          <p style="text-align:center;font-size:12px;color:#5a6b7b">Établie en application de la loi n° 66.23 relative à l'organisation de la profession d'avocat — Date : ${esc(conv.date)}</p>
          <p><strong>Entre :</strong> ${esc(hd.l1)}, ci-après "l'Avocat"<br>
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
          <p style="font-size:12px"><strong>Modalités de paiement :</strong> conformément à la loi n° 66.23, tout paiement supérieur à 10 000 DH est réglé par chèque ou moyen de paiement électronique. Un reçu daté, signé et numéroté est délivré pour toute somme reçue.</p>
          <p style="font-size:12px"><strong>Exécution :</strong> provision exigible à la signature. Solde exigible à la remise des livrables avant envoi final. Délai prévisionnel : 3-10 jours ouvrés à compter de la provision et des pièces complètes. Débours en sus. Résiliation : honoraires au prorata du travail accompli.</p>
          ${hd.ribLine ? `<p style="font-size:12px"><strong>Coordonnées bancaires :</strong> ${esc(hd.ribLine)}</p>` : ''}
          <div style="display:flex;justify-content:space-between;margin-top:30px;font-size:13px">
            <div>L'Avocat<br><br>__________________<br>Signature & cachet</div>
            <div>Le Client (lu et approuvé)<br><br>__________________<br>${esc(dossier.client)}</div>
          </div>
          <p style="font-size:9px;color:#5a6b7b;text-align:center;margin-top:20px">Document établi en application de la loi n° 66.23 relative à l'organisation de la profession d'avocat (BO n°7536 du 20/08/2026). Ne constitue pas une consultation sans diagnostic individuel.</p>
        </div>
        <div class="cab-toolbar" style="justify-content:center">
          <button class="btn btn-primary" id="btnPrintConv">🖨️ Imprimer / PDF</button>
          <button class="btn" id="btnBackConv2">Retour dossier</button>
        </div>
      </div>`;
    $('#crumbs').innerHTML = '<span class="cur">Convention ' + esc(conv.num) + '</span>';
    $('#backConv').addEventListener('click', renderConventions);
    $('#btnBackConv2').addEventListener('click', () => viewDossier(dossier.id));
    $('#btnPrintConv').addEventListener('click', () => printDoc($('#convPrint').outerHTML));
  }

  function renderConventions() {
    const convs = STORE.conventions.slice().sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    const dossiers = STORE.dossiers;
    const content = $('#content');
    content.innerHTML = `
      <div class="cab">
        <h2>Conventions d'honoraires</h2>
        <p class="sub">${convs.length} convention(s) — loi n° 66.23. Générez depuis un dossier.</p>
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
    if (!settingsComplete() && !confirm('Ta fiche cabinet (nom/barreau) est incomplète.\nGénérer quand même avec des placeholders ?')) return;
    const c = calcTTC(d.honoraires, d.tva);
    const prov = Math.round(c.ttc * (Number(d.provisionPct) || 50) / 100);
    const num = nextNum(type === 'provision' ? 'RP' : 'FH');
    const montant = type === 'provision' ? prov : c.ttc - prov;
    const ttc = montant;
    const ht = d.tva == 0 ? ttc : Math.round(ttc / (1 + d.tva / 100));
    const tva = ttc - ht;
    const f = { id: uid(), dossierId, num, date: todayISO(), type: type === 'provision' ? 'Reçu provision' : 'Facture solde', ht, tva, ttc, statut: 'Émise' };
    STORE.factures = [...STORE.factures, f];
    logEvent(dossierId, 'facture', f.type + ' ' + f.num + ' émis (' + fmtMoney(ttc) + ')');
    previewFacture(f, d);
  }

  function previewFacture(f, dossier) {
    const hd = cabHeaderLines();
    const content = $('#content');
    content.innerHTML = `
      <div class="cab">
        <button class="btn" id="backFact">← Retour</button>
        <div class="doc" id="factPrint" style="max-width:750px;margin:16px auto">
          <div style="display:flex;justify-content:space-between;border-bottom:2px solid #1d4ed8;padding-bottom:10px">
            <div><strong>${esc(hd.l1)}</strong><br><span style="font-size:11px;color:#5a6b7b">${esc(hd.l2)}</span></div>
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
          <p style="font-size:12px">Échéance : à réception.${hd.ribLine ? ' ' + esc(hd.ribLine) + '.' : ''} ${dossier.tva == 0 ? 'TVA non applicable, art. 91 CGI.' : ''}</p>
          <p style="font-size:11px;color:#5a6b7b">Reçu daté, signé et numéroté délivré conformément à la loi n° 66.23 relative à l'organisation de la profession d'avocat. Tout paiement supérieur à 10 000 DH par chèque ou moyen de paiement électronique.</p>
        </div>
        <div class="cab-toolbar" style="justify-content:center"><button class="btn btn-primary" id="btnPrintFact">🖨️ Imprimer / PDF</button> <button class="btn" id="btnBackFact2">Retour</button></div>
      </div>`;
    $('#crumbs').innerHTML = '<span class="cur">' + esc(f.type) + ' ' + esc(f.num) + '</span>';
    $('#backFact').addEventListener('click', renderFactures);
    $('#btnBackFact2').addEventListener('click', () => viewDossier(dossier.id));
    $('#btnPrintFact').addEventListener('click', () => printDoc($('#factPrint').outerHTML));
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
      return `<tr><td data-label="N°" class="mono">${esc(f.num)}</td><td data-label="Date">${esc(f.date)}</td><td data-label="Client">${esc(d ? d.client : '—')}</td><td data-label="Type">${esc(f.type)}</td><td data-label="TTC" class="mono">${fmtMoney(f.ttc)}</td><td data-label="Statut">${esc(f.statut)}${f.encaisseeLe ? ' · ' + esc(f.encaisseeLe) : ''}</td><td data-label="Actions"><button class="btn" data-viewfact="${esc(f.id)}">Voir</button> <button class="btn" data-encaisse="${esc(f.id)}">${f.statut === 'Encaissée' ? '↩' : 'Encaisser'}</button></td></tr>`;
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
      if (!f) return;
      if (f.statut === 'Encaissée') {
        f.statut = 'Émise'; f.encaisseeLe = '';
        logEvent(f.dossierId, 'facture', f.type + ' ' + f.num + ' repassée à Émise');
      } else {
        const d = prompt('Date d\'encaissement (AAAA-MM-JJ) :', todayISO());
        if (d === null) return;
        f.statut = 'Encaissée'; f.encaisseeLe = d || todayISO();
        logEvent(f.dossierId, 'facture', f.type + ' ' + f.num + ' ENCAISSÉE (' + fmtMoney(f.ttc) + ')');
      }
      STORE.factures = STORE.factures; renderFactures();
    }));
  }

  /* ---------- Finance : agrégats ---------- */
  function financeAggregates() {
    const facts = STORE.factures;
    const encaisse = facts.filter(f => f.statut === 'Encaissée').reduce((s, f) => s + (Number(f.ttc) || 0), 0);
    const attendu = facts.filter(f => f.statut !== 'Encaissée').reduce((s, f) => s + (Number(f.ttc) || 0), 0);
    const dossiers = STORE.dossiers.filter(d => !['Prospect', 'Abandonné'].includes(d.statut));
    const portefeuille = dossiers.reduce((s, d) => {
      const c = calcTTC(d.honoraires, d.tva);
      return s + c.ttc;
    }, 0);
    return { encaisse, attendu, portefeuille };
  }
  function tvaParTrimestre(annee) {
    const map = {};
    STORE.factures.forEach(f => {
      if (!f.date || !f.date.startsWith(String(annee))) return;
      const q = 'T' + Math.floor((Number(f.date.slice(5, 7)) - 1) / 3) + 1;
      map[q] = map[q] || { tva: 0, ht: 0 };
      map[q].tva += Number(f.tva) || 0;
      map[q].ht += Number(f.ht) || 0;
    });
    return ['T1', 'T2', 'T3', 'T4'].map(q => ({ q, ...(map[q] || { tva: 0, ht: 0 }) }));
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
                <td data-label="Date" class="mono">${esc(e.date || '')} ${overdue ? '⚠️' : ''}</td>
                <td data-label="Dossier">${esc(d ? d.client : '—')}</td>
                <td data-label="Type"><span class="badge">${esc(e.type || '')}</span></td>
                <td data-label="Intitulé" style="white-space:normal">${esc(e.intitule || '')}</td>
                <td data-label="Fait"><input type="checkbox" ${e.done ? 'checked' : ''} data-eid="${esc(e.id)}"></td>
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
  const BIBLIO = [
    ['01_Convention_Honoraires_Modele.md', "Convention d'honoraires", 'Obligatoire chaque mission — provision + HT/TTC'],
    ['02_Scripts_DM_WhatsApp.md', 'Scripts prise de contact', 'Comptables / prospects — déontologiques'],
    ['03_Pack_Freelance_Contrat.md', 'Contrat prestation FR/EN', 'Mission Contrats — 12 clauses + annexes'],
    ['04_Pack_Ecommerce_CGV.md', 'Trame CGV/CGU e-commerce', 'Mission Conformité — loi 31-08 + 09-08'],
    ['05_Registre_09-08_Modele.md', 'Registre Loi 09-08', 'Mission 09-08 — 5 onglets + CNDP'],
    ['06_Recu_Provision_Facture.md', 'Reçu provision & Facture solde', 'Reçu numéroté (loi 66.23) + facture finale'],
    ['07_Lettre_Mission_Planning.md', 'Lettre de mission & Planning', 'Jointe à la convention — jalons J0 à J+5'],
    ['08_PV_Remise_Cloture.md', 'PV de remise & Clôture', 'Preuve de remise des livrables'],
    ['09_Checklist_Review_Contrat_19pts.md', 'Checklist revue contrat 19 pts', 'Avant signature client'],
    ['10_Email_Recouvrement_Amiable_Modele.md', 'Email recouvrement amiable', 'Séquence J+7 / J+15 / J+30'],
    ['11_Calculateur_Provision_TVA_Offline.md', 'Calculateur provision / TVA', 'Chiffrage mission offline'],
    ['12_Politique_Confidentialite_09-08_Modele.md', 'Politique de confidentialité', 'Loi 09-08 · site/app client'],
    ['13_Contrat_Sous_Traitant_09-08_art24.md', 'Contrat sous-traitance art.24', 'Loi 09-08 · données'],
    ['14_DPIA_Modele_CNDP.md', 'Analyse d\u2019impact (DPIA)', 'Loi 09-08 · délib CNDP'],
    ['15_CGV_Formation_31-08_Modele.md', 'CGV formation en ligne', 'Rétractation 7 jours (loi 31-08)'],
    ['16_Contrat_Sponsor_PI_Loi2-00.md', 'Contrat sponsor / influenceur', 'Cession PI — loi 2-00 · d.o.c.'],
    ['17_Depot_Marque_OMPIC_Checklist.md', 'Checklist dépôt marque OMPIC', 'Loi 17-97 · opposition 2 mois'],
    ['18_Procuration_Apostille_MRE_Modele.md', 'Procuration apostillée MRE', 'Création société à distance'],
    ['19_Guide_Formulaire_5000-F_Dividende.md', 'Guide formulaire 5000-F', 'Dividende conventionnel FR→MA 10 %'],
    ['20_Radiation_AE_Quitus_Modele.md', 'Radiation AE & quitus DGI', 'Ordre strict avant SARL'],
    ['21_Devis_Pack_Modele.md', 'Devis / proposition pack', 'Avant convention d\u2019honoraires'],
    ['22_CGV_Ecommerce_31-08_Modele.md', 'CGV e-commerce clé en main', 'Loi 31-08 — rétractation 7 j, livraison ≤30 j']
  ];

  function renderBibliotheque() {
    const content = $('#content');
    content.innerHTML = `
      <div class="cab">
        <h2>Bibliothèque de modèles</h2>
        <p class="sub">${BIBLIO.length} modèles — cliquez pour ouvrir dans AVOCATO Learn.</p>
        <div class="dash-grid" style="grid-template-columns:repeat(auto-fill,minmax(250px,1fr))">
          ${BIBLIO.map(([file, title, desc]) => `
            <div class="dash-panel" style="cursor:pointer" data-open="05_Document_Bank/templates/${esc(file)}">
              <h3 style="font-size:13.5px;margin:0 0 6px">📄 ${esc(title)}</h3>
              <p style="font-size:12px;color:var(--text-dim);margin:0 0 8px">${esc(desc)}</p>
              <span style="font-size:11px;color:var(--accent-2)">${esc(file)} →</span>
            </div>`).join('')}
        </div>
        <div class="dash-grid" style="margin-top:16px;grid-template-columns:repeat(auto-fill,minmax(280px,1fr))">
          <div class="dash-panel" style="cursor:pointer" data-open="01_Strategy/13_Loi_66-23_Nouvelle_Loi_Avocats/00_INDEX.md">
            <h3 style="font-size:14px;margin:0 0 6px">⚖️ Loi 66.23 — nouvelle loi avocats</h3>
            <p style="font-size:12px;color:var(--text-dim);margin:0">En vigueur 20/08/2026 : cash interdit >10k, reçus numérotés, élections décembre. Checklist cabinet incluse.</p>
          </div>
          <div class="dash-panel"><h3>Doctrine & Jurisprudence</h3>
            <ul style="font-size:13px;margin:0;padding-left:18px">
              <li><a href="#" data-open-juris="08_Jurisprudence/01_Loi_09-08/00_INDEX.md">Loi 09-08 — décisions CNDP + grille sanctions</a></li>
              <li><a href="#" data-open-juris="08_Jurisprudence/02_Loi_31-08/00_INDEX.md">Loi 31-08 — CGV / rétractation 7 j</a></li>
              <li><a href="#" data-open-juris="08_Jurisprudence/03_Contrats_DOC/00_INDEX.md">Contrats DOC — arrêts Cass.</a></li>
              <li><a href="#" data-open-juris="01_Strategy/06_Deontologie_Pratique_Avocat_Maroc/00_INDEX.md">Déontologie pratique</a></li>
            </ul>
          </div>
        </div>
      </div>`;
    $('#crumbs').innerHTML = '<span class="cur">Cabinet — Bibliothèque</span>';
    $$('[data-open]').forEach(el => el.addEventListener('click', () => openInLearn(el.dataset.open)));
    $$('[data-open-juris]').forEach(a => a.addEventListener('click', (e) => { e.preventDefault(); openInLearn(a.dataset.openJuris); }));
  }

  /* ---------- Recherche globale ---------- */
  function initGlobalSearch() {
    const input = $('#globalSearch'), res = $('#gsResults');
    if (!input || !res) return;
    input.addEventListener('input', () => {
      const q = (input.value || '').trim().toLowerCase();
      if (q.length < 2) { res.hidden = true; res.innerHTML = ''; return; }
      const hits = [];
      STORE.dossiers.forEach(d => {
        if ([d.client, d.ice, d.mission, d.type].join(' ').toLowerCase().includes(q))
          hits.push({ grp: 'Dossiers', label: d.client, sub: d.mission, go: () => viewDossier(d.id) });
      });
      STORE.conventions.forEach(c => {
        const d = STORE.dossiers.find(x => x.id === c.dossierId);
        if ((c.num + ' ' + c.mission).toLowerCase().includes(q))
          hits.push({ grp: 'Conventions', label: c.num, sub: d ? d.client : '', go: () => { if (d) previewConvention(c, d); } });
      });
      STORE.factures.forEach(f => {
        const d = STORE.dossiers.find(x => x.id === f.dossierId);
        if ((f.num + ' ' + f.type).toLowerCase().includes(q))
          hits.push({ grp: 'Factures', label: f.type + ' ' + f.num, sub: d ? d.client : '' + ' · ' + fmtMoney(f.ttc), go: () => { if (d) previewFacture(f, d); } });
      });
      STORE.echeances.forEach(e => {
        if ((e.intitule + ' ' + e.type).toLowerCase().includes(q))
          hits.push({ grp: 'Échéances', label: e.intitule, sub: e.date, go: () => { cabView = 'echeances'; LS.set('cabinetView', 'echeances'); renderCabinet(); } });
      });
      res.innerHTML = hits.slice(0, 12).map((h, i) =>
        `<button class="gs-item" data-gs="${i}"><strong>${esc(h.label)}</strong><span>${esc(h.grp)}${h.sub ? ' · ' + esc(h.sub) : ''}</span></button>`
      ).join('') || '<div class="gs-item gs-none">Aucun résultat</div>';
      res.hidden = false;
      $$('.gs-item[data-gs]', res).forEach(b => b.addEventListener('click', () => {
        const h = hits[Number(b.dataset.gs)];
        res.hidden = true; input.value = '';
        document.body.classList.remove('sidebar-open');
        if (h) h.go();
      }));
    });
    document.addEventListener('click', (e) => { if (!$('#gsWrap').contains(e.target)) res.hidden = true; });
  }

  /* ---------- Init ---------- */
  function initCabinet() {
    applyTheme();
    const tb = $('#themeBtn');
    if (tb) tb.addEventListener('click', cycleTheme);
    $('#menuBtn').addEventListener('click', () => document.body.classList.add('sidebar-open'));
    $('#sidebarClose').addEventListener('click', () => document.body.classList.remove('sidebar-open'));
    $('#scrim').addEventListener('click', () => document.body.classList.remove('sidebar-open'));
    initGlobalSearch();
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