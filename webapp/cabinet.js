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

  let mode = LS.get('mode', 'vault');
  if (mode === 'Base') { mode = 'vault'; LS.set('mode', 'vault'); }
  let cabView = LS.get('cabinetView', 'today');
  let editingId = null;
  let returnView = 'dossiers';

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

  /* Helpers: the STORE getters re-parse localStorage on every call, so a
     mutation must operate on one fetched array, then write that same array
     back. Never do `STORE.x = STORE.x` after mutating an item — it is a no-op. */
  function updDossier(id, patch) {
    const a = STORE.dossiers;
    const i = a.findIndex(x => x.id === id);
    if (i < 0) return;
    a[i] = Object.assign({}, a[i], typeof patch === 'function' ? patch(a[i]) : patch);
    STORE.dossiers = a;
  }
  function toggleEcheanceDone(eid, done) {
    const a = STORE.echeances;
    const e = a.find(x => x.id === eid);
    if (e) { e.done = done; STORE.echeances = a; }
  }
  function cycleFactureStatut(fid) {
    const a = STORE.factures;
    const f = a.find(x => x.id === fid);
    if (!f) return;
    f.statut = f.statut === 'Encaissée' ? 'Émise' : 'Encaissée';
    STORE.factures = a;
  }

  function calcTTC(ht, tva) {
    ht = Number(ht) || 0;
    tva = Number(tva) || 0;
    const tv = Math.round(ht * tva / 100);
    return { ht, tva: tv, ttc: ht + tv };
  }

  /* ---------- Toast feedback ---------- */
  function toast(msg, opts) {
    opts = opts || {};
    const region = $('#toastRegion');
    if (!region) return;
    const el = document.createElement('div');
    el.className = 'toast' + (opts.kind ? ' toast-' + opts.kind : '');
    el.innerHTML = `<span>${esc(msg)}</span>`;
    if (opts.undo) {
      const btn = document.createElement('button');
      btn.className = 'toast-undo';
      btn.textContent = 'Annuler';
      btn.addEventListener('click', () => {
        try { opts.undo(); } finally { remove(); }
      });
      el.appendChild(btn);
    }
    region.appendChild(el);
    requestAnimationFrame(() => el.classList.add('show'));
    let t = setTimeout(remove, opts.undo ? 6000 : 3000);
    function remove() {
      clearTimeout(t);
      el.classList.remove('show');
      setTimeout(() => el.remove(), 250);
    }
  }

  /* ---------- Plaque identity ---------- */
  function plaqueIdentity() {
    let p = {};
    try { p = JSON.parse(localStorage.getItem('avocato:plaque') || '{}') || {}; } catch {}
    let nom = p.nom || '';
    let ice = p.ice || '';
    const meta = $('.plaque-meta');
    if (meta) {
      const first = $('span', meta);
      if (!nom && first) nom = first.textContent.replace(/\s+/g, ' ').trim();
      if (!ice) { const m = meta.textContent.match(/ICE\s*(\d{15,16})/); if (m) ice = m[1]; }
    }
    const barreau = p.barreau || '';
    return {
      nom: nom || 'Maître [Nom]',
      barreau: barreau,
      ice: ice,
      tel: p.tel || ''
    };
  }

  function missionDeliverables(mission) {
    const m = (mission || '').toLowerCase();
    if (m.includes('diagnostic')) return '1 restitution Loom 15 min + 1 correctif sous J+7';
    if (m.includes('09-08')) return 'Registre 5 onglets + notice CNDP + dépôt du dossier';
    if (m.includes('contrat')) return '2 drafts + 1 révision sous 7 jours + Loom 15 min';
    if (m.includes('e-commerce')) return 'CGV/CGU conformes 31-08 + 09-08 + Loom 15 min';
    if (m.includes('création') || m.includes('structuration')) return 'Statuts + formalités CRI + Loom 15 min';
    if (m.includes('abonnement')) return 'Revue mensuelle + alertes échéances + Loom trimestriel';
    return '1 présentation Loom 15 min + 1 révision sous 7 jours';
  }

  /* ---------- Mode switch ---------- */
  function setMode(m) {
    mode = m;
    LS.set('mode', m);
    $$('.mode-btn').forEach(b => {
      const on = b.dataset.mode === m;
      b.classList.toggle('active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    const isBase = m === 'vault';
    const search = $('#searchInput');
    $('#tree').hidden = !isBase;
    const chip = $('#resumeChip');
    if (chip) chip.hidden = !isBase || !LS.get('last', null);
    $('#searchWrap').hidden = false;
    search.placeholder = isBase ? 'Rechercher… ( / )' : 'Rechercher dossier… ( / )';
    if (!isBase) search.value = '';
    $('#btnDashboard').hidden = !isBase;
    $('#cabinetNav').hidden = isBase;
    $('#fabNewDossier').hidden = isBase;
    $('#prevBtn').hidden = !isBase;
    $('#nextBtn').hidden = !isBase;
    $('#readBtn').hidden = !isBase;
    if (isBase) {
      const q = search.value.trim().toLowerCase();
      if (window.App && window.App.renderTree) window.App.renderTree(q);
      // restore Base view (trigger app.js to re-render tree if needed)
      const h = location.hash && decodeURIComponent(location.hash.slice(1));
      const data = window.VAULT_DATA || [];
      if (h && data.some(d => d.id === h)) {
        // let app.js handle via hashchange, or directly call openDoc if exposed
        // app.js exposes openDoc globally? No, so we dispatch hashchange
        window.dispatchEvent(new HashChangeEvent('hashchange'));
      } else {
        const last = LS.get('last', null);
        if (last && data.some(d => d.id === last)) {
          location.hash = '#' + encodeURIComponent(last);
        } else {
          // show Base dashboard via app.js: dispatch to trigger openDashboard
          // simplest: clear hash and reload Base dashboard by calling the global if available
          if (window.App && window.App.openDashboard) window.App.openDashboard();
          else location.hash = '';
        }
      }
    } else {
      // cabinet
      renderCabinet();
    }
  }

  function goView(v) { cabView = v; LS.set('cabinetView', v); renderCabinet(); }

  function renderCabinet() {
    $$('.cab-nav-item').forEach(b => b.classList.toggle('active', b.dataset.view === cabView));
    if (cabView === 'today') renderToday();
    else if (cabView === 'dashboard') renderCabDashboard();
    else if (cabView === 'pipeline') renderPipeline();
    else if (cabView === 'dossiers') renderDossiers();
    else if (cabView === 'conventions') renderConventions();
    else if (cabView === 'factures') renderFactures();
    else if (cabView === 'echeances') renderEcheances();
    else if (cabView === 'bibliotheque') renderBibliotheque();
    else if (cabView === 'new-dossier') { cabView = 'dossiers'; renderDossiers(); openDlgDossier(); }
    appendLastDocChip();
  }

  function appendLastDocChip() {
    const crumbs = $('#crumbs');
    if (!crumbs || mode !== 'cabinet') return;
    const last = LS.get('last', null);
    if (!last) return;
    const data = window.VAULT_DATA || [];
    const doc = data.find(d => d.id === last);
    if (!doc) return;
    const chip = document.createElement('button');
    chip.className = 'pill mono last-doc-chip';
    chip.id = 'lastDocChip';
    chip.type = 'button';
    chip.textContent = 'Dernier: ' + doc.file;
    chip.addEventListener('click', () => setMode('vault'));
    crumbs.appendChild(chip);
  }

  /* ---------- Aujourd'hui — poste de commande ---------- */
  const DAILY_RITUALS = [
    'Ouvrir le pipeline — 2 min',
    '1 relance polie (script déontologique)',
    '1 pas sur le plan 90 jours',
    'Lire 1 doc — 10 min chrono',
    'Vendredi : export JSON de sauvegarde'
  ];
  const RECO_DOCS = [
    '00_START_HERE/01_ADHD_QuickStart_Today.md',
    '07_90Day_Plan/01_Phase1_Foundation_Weeks1-2.md',
    '06_ADHD_System/01_Daily_Operating_System.md',
    '03_Acquisition_Without_Ads/03_Partnerships_Comptables_Fiduciaires/00_INDEX.md'
  ];

  function renderToday() {
    const dossiers = STORE.dossiers;
    const echeances = STORE.echeances;
    const facts = STORE.factures;
    const today = todayISO();
    const in7 = new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10);
    const dOf = id => dossiers.find(x => x.id === id);

    const overdue = echeances.filter(e => !e.done && e.date && e.date < today);
    const soon = echeances.filter(e => !e.done && e.date && e.date >= today && e.date <= in7)
      .sort((a, b) => a.date.localeCompare(b.date));
    const relances = facts.filter(f => f.statut === 'Émise');
    const provAFaire = dossiers.filter(d =>
      ['Convention signée', 'En cours'].includes(d.statut) &&
      !facts.some(f => f.dossierId === d.id && f.type === 'Reçu provision'));

    const actions = [];
    overdue.forEach(e => actions.push({
      date: e.date, late: true, icon: 'flag',
      label: e.intitule || e.type, client: dOf(e.dossierId) ? dOf(e.dossierId).client : '', dossierId: e.dossierId
    }));
    soon.forEach(e => actions.push({
      date: e.date, late: false, icon: 'clock',
      label: e.intitule || e.type, client: dOf(e.dossierId) ? dOf(e.dossierId).client : '', dossierId: e.dossierId
    }));
    relances.forEach(f => actions.push({
      date: f.date, late: false, icon: 'receipt',
      label: f.type + ' ' + f.num + ' — ' + fmtMoney(f.ttc) + ' à encaisser', client: dOf(f.dossierId) ? dOf(f.dossierId).client : '', dossierId: f.dossierId
    }));
    provAFaire.forEach(d => actions.push({
      date: '', late: false, icon: 'nib',
      label: 'Provision à encaisser (reçu à délivrer)', client: d.client, dossierId: d.id
    }));
    actions.sort((a, b) => (a.date || '9999').localeCompare(b.date || '9999'));

    const daily = LS.get('dailyOS', DAILY_RITUALS.map(() => false));
    const dailyDone = daily.filter(Boolean).length;
    const DATA = window.VAULT_DATA || [];
    const read = new Set(LS.get('read', []));
    const reco = DATA.find(d => RECO_DOCS.includes(d.id) && !read.has(d.id)) || DATA.find(d => !read.has(d.id));

    const content = $('#content');
    content.innerHTML = `
      <div class="cab today">
        <h2>Aujourd'hui</h2>
        <p class="sub">${new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} — ce qui compte aujourd'hui, rien de plus.</p>
        <div class="dash-cards">
          <div class="dash-card"><div class="num${overdue.length ? ' num-alert' : ''}">${overdue.length}</div><div class="lbl">En retard</div></div>
          <div class="dash-card"><div class="num">${soon.length}</div><div class="lbl">Échéances 7 j</div></div>
          <div class="dash-card"><div class="num">${relances.length}</div><div class="lbl">Factures à encaisser</div></div>
          <div class="dash-card"><div class="num">${provAFaire.length}</div><div class="lbl">Provisions à prendre</div></div>
        </div>
        <div class="dash-grid">
          <div class="dash-panel">
            <h3>${ico('bolt')} Actions urgentes</h3>
            ${actions.length ? actions.map(a => `
              <div class="today-action ${a.late ? 'late' : ''}">
                <span class="ta-ico">${ico(a.icon)}</span>
                <span class="ta-date mono">${esc(a.date || '—')}</span>
                <span class="ta-body"><strong>${esc(a.label)}</strong>${a.client ? ' · ' + esc(a.client) : ''}</span>
                ${a.dossierId ? `<button class="btn btn-sm" data-open-dossier="${esc(a.dossierId)}">Ouvrir</button>` : ''}
              </div>`).join('') : `
              <p class="today-clear">Rien de chaud. ${dossiers.length ? 'Le pipeline tient.' : 'Créez votre premier dossier pour démarrer.'}</p>`}
            ${dossiers.length ? `<button class="btn btn-ghost2 today-pipe" id="todayGoPipeline">Voir le pipeline →</button>` : `<button class="btn btn-primary" id="todayNewFirst">${ico('plus')} Nouveau dossier</button>`}
          </div>
          <div>
            <div class="dash-panel" style="margin-bottom:14px">
              <h3>${ico('check')} Rituel du jour</h3>
              ${DAILY_RITUALS.map((r, i) => `
                <label class="daily-item ${daily[i] ? 'done' : ''}">
                  <input type="checkbox" data-daily="${i}" ${daily[i] ? 'checked' : ''}> <span>${esc(r)}</span>
                </label>`).join('')}
              <div class="daily-progress"><span class="bar"><span class="fill" style="width:${Math.round(100 * dailyDone / DAILY_RITUALS.length)}%"></span></span><span class="mono dp-num">${dailyDone}/${DAILY_RITUALS.length}</span></div>
            </div>
            <div class="dash-panel">
              <h3>${ico('book')} Lecture recommandée</h3>
              ${reco ? `
                <p style="margin:2px 0 10px;font-size:13.5px">${esc(reco.title)}</p>
                <button class="btn btn-primary" data-reco-doc="${esc(reco.id)}">${ico('arrowR')} Ouvrir — ${Math.max(1, Math.round(reco.words / 180))} min</button>
              ` : '<p class="today-clear">Tout est lu. Brave.</p>'}
            </div>
          </div>
        </div>
      </div>`;
    $('#crumbs').innerHTML = '<span class="cur">Cabinet — Aujourd\'hui</span>';

    $$('[data-open-dossier]', content).forEach(b => b.addEventListener('click', () => { returnView = 'today'; viewDossier(b.dataset.openDossier); }));
    $$('[data-daily]', content).forEach(cb => cb.addEventListener('change', () => {
      const arr = LS.get('dailyOS', DAILY_RITUALS.map(() => false));
      arr[Number(cb.dataset.daily)] = cb.checked;
      LS.set('dailyOS', arr);
      cb.closest('.daily-item').classList.toggle('done', cb.checked);
      const done = arr.filter(Boolean).length;
      $('.dp-num', content).textContent = done + '/' + DAILY_RITUALS.length;
      $('.daily-progress .fill', content).style.width = Math.round(100 * done / DAILY_RITUALS.length) + '%';
      if (done === DAILY_RITUALS.length) toast('Journée tenue. Le cabinet avance.');
    }));
    const pipe = $('#todayGoPipeline', content); if (pipe) pipe.addEventListener('click', () => goView('pipeline'));
    const nf = $('#todayNewFirst', content); if (nf) nf.addEventListener('click', openDlgDossier);
    const recoBtn = $('[data-reco-doc]', content);
    if (recoBtn) recoBtn.addEventListener('click', () => {
      if (window.App && window.App.openDoc) { setMode('vault'); window.App.openDoc(recoBtn.dataset.recoDoc); }
    });
  }

  /* ---------- Pipeline — range de fichiers par statut ---------- */
  const PIPE_STATUTS = ['Prospect', 'Convention envoyée', 'Convention signée', 'En cours', 'Livré - solde dû', 'Clôturé'];

  function renderPipeline() {
    const dossiers = STORE.dossiers;
    const today = todayISO();
    const abandoned = dossiers.filter(d => d.statut === 'Abandonné');
    const content = $('#content');
    content.innerHTML = `
      <div class="cab pipeline">
        <h2>Pipeline</h2>
        <p class="sub">Glissez une fiche pour changer son statut — provision et solde suivent. ${dossiers.length} dossier(s).</p>
        <div class="pipe-cols">
          ${PIPE_STATUTS.map(st => {
      const cards = dossiers.filter(d => (d.statut || 'Prospect') === st);
      const totalHT = cards.reduce((s, d) => s + (Number(d.honoraires) || 0), 0);
      return `
            <section class="pipe-col" data-statut="${esc(st)}">
              <header><span class="pc-title">${esc(st)}</span><span class="pc-meta mono">${cards.length} · ${fmtMoney(totalHT)}</span></header>
              <div class="pc-drop">
                ${cards.map(d => {
        const c = calcTTC(d.honoraires, d.tva);
        const late = d.echeance && d.echeance < today && !['Clôturé', 'Abandonné'].includes(d.statut);
        return `
                      <article class="pipe-card" draggable="true" data-id="${esc(d.id)}" tabindex="0" role="button" aria-label="Ouvrir ${esc(d.client)}">
                        <strong>${esc(d.client)}</strong>
                        <span class="pc-mission">${esc((d.mission || '').split(' (')[0])}</span>
                        <span class="pc-money mono">${fmtMoney(c.ht)} HT · prov. ${Number(d.provisionPct) || 50}%${late ? ' <b class="pc-late">en retard</b>' : ''}</span>
                      </article>`;
      }).join('') || '<span class="pc-empty">vide</span>'}
              </div>
            </section>`;
    }).join('')}
        </div>
        ${abandoned.length ? `<p class="pipe-abandoned mono">${abandoned.length} dossier(s) abandonné(s) — visibles dans Dossiers, filtre statut.</p>` : ''}
      </div>`;
    $('#crumbs').innerHTML = '<span class="cur">Cabinet — Pipeline</span>';

    const cards = $$('.pipe-card', content);
    cards.forEach(el => {
      el.addEventListener('click', () => { returnView = 'pipeline'; viewDossier(el.dataset.id); });
      el.addEventListener('keydown', (e) => { if (e.key === 'Enter') { returnView = 'pipeline'; viewDossier(el.dataset.id); } });
      el.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', el.dataset.id);
        e.dataTransfer.effectAllowed = 'move';
        el.classList.add('dragging');
      });
      el.addEventListener('dragend', () => el.classList.remove('dragging'));
    });
    $$('.pipe-col', content).forEach(col => {
      col.addEventListener('dragover', (e) => { e.preventDefault(); col.classList.add('over'); });
      col.addEventListener('dragleave', () => col.classList.remove('over'));
      col.addEventListener('drop', (e) => {
        e.preventDefault(); col.classList.remove('over');
        moveStatut(e.dataTransfer.getData('text/plain'), col.dataset.statut);
      });
    });
  }

  function moveStatut(id, statut) {
    const d = STORE.dossiers.find(x => x.id === id);
    if (!d || d.statut === statut) return;
    const prev = d.statut;
    updDossier(id, { statut });
    renderPipeline();
    toast('« ' + d.client + ' » → ' + statut, {
      undo: () => { updDossier(id, { statut: prev }); renderPipeline(); toast('Statut restauré.'); }
    });
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
        <p class="sub">Dossiers en localStorage — offline. Provision et solde suivent la convention d'honoraires (art. 30).</p>
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
            <button class="btn btn-primary" id="cabNewDossier2">${ico('plus')} Nouveau dossier</button>
            <button class="btn" id="cabSample">Charger 3 dossiers d'exemple</button>
            <button class="btn" id="cabExport">Exporter JSON</button>
            <label class="btn" style="cursor:pointer">Importer JSON <input type="file" id="cabImport" accept=".json" hidden></label>
          </div>
          <p class="field-error" id="importErr" hidden></p>
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
    const prevDoss = STORE.dossiers, prevEch = STORE.echeances;
    const now = todayISO();
    const plus7 = new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10);
    const plus14 = new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10);
    STORE.dossiers = [
      { id: uid(), client: 'SARL Atlas Digital — M. Benali', ice: '001234567000012', type: 'Freelance / Agence offshore', mission: 'Mission Contrats - Essentielle (2.500-5.000 DH HT)', honoraires: 3500, tva: 20, provisionPct: 50, statut: 'Convention signée', echeance: plus7, contact: '06 12 34 56 78', notes: 'Upwork, impayé 1.800€, besoin clause réserve de propriété', createdAt: now, updatedAt: now },
      { id: uid(), client: 'Boutique YouCan — Lina Shop', ice: '002345678000034', type: 'E-commerce / YouCan', mission: 'Mission Conformité e-commerce (3.500-6.000 DH HT)', honoraires: 4200, tva: 0, provisionPct: 50, statut: 'En cours', echeance: plus14, contact: '06 98 76 54 32', notes: 'CGV manquantes, 3 litiges COD', createdAt: now, updatedAt: now },
      { id: uid(), client: 'Clinique El Amal', ice: '003456789000056', type: 'Loi 09-08 / PME', mission: 'Mission Loi 09-08 (12.000-28.000 DH HT)', honoraires: 18000, tva: 20, provisionPct: 50, statut: 'Prospect', echeance: '', contact: '05 22 11 22 33', notes: 'Données santé, pas de registre, transfert AWS', createdAt: now, updatedAt: now }
    ];
    STORE.echeances = STORE.dossiers.filter(d => d.echeance).map(d => ({ id: uid(), dossierId: d.id, date: d.echeance, type: 'Remise livrables', intitule: 'Remise V1 + Loom', done: false }));
    renderCabDashboard();
    toast('3 dossiers d\'exemple chargés — vos données précédentes restent récupérables.', {
      undo: () => { STORE.dossiers = prevDoss; STORE.echeances = prevEch; renderCabDashboard(); toast('Exemples annulés.'); }
    });
  }

  function exportJSON() {
    const data = { dossiers: STORE.dossiers, conventions: STORE.conventions, factures: STORE.factures, echeances: STORE.echeances, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'avocato-cabinet-' + todayISO() + '.json'; a.click(); URL.revokeObjectURL(a.href);
  }

  function importJSON(e) {
    const file = e.target.files[0]; if (!file) return;
    const errEl = $('#importErr');
    if (errEl) { errEl.hidden = true; errEl.textContent = ''; }
    const r = new FileReader();
    r.onload = () => {
      try {
        const data = JSON.parse(r.result);
        if (!data || typeof data !== 'object' || !Array.isArray(data.dossiers)) {
          throw new Error('structure attendue : { dossiers: [...] }');
        }
        const prevDoss = STORE.dossiers, prevConv = STORE.conventions, prevFact = STORE.factures, prevEch = STORE.echeances;
        STORE.dossiers = data.dossiers;
        if (data.conventions) STORE.conventions = data.conventions;
        if (data.factures) STORE.factures = data.factures;
        if (data.echeances) STORE.echeances = data.echeances;
        renderCabDashboard();
        toast('Import OK : ' + data.dossiers.length + ' dossiers', {
          undo: () => { STORE.dossiers = prevDoss; STORE.conventions = prevConv; STORE.factures = prevFact; STORE.echeances = prevEch; renderCabDashboard(); toast('Import annulé.'); }
        });
      } catch (err) {
        if (errEl) { errEl.textContent = 'Fichier illisible : JSON invalide — ' + err.message + '. Exportez à nouveau depuis AVOCATO.'; errEl.hidden = false; errEl.scrollIntoView({ block: 'nearest' }); }
        else toast('JSON invalide : ' + err.message, { kind: 'error' });
      }
      e.target.value = '';
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
        <p class="sub">${dossiers.length} dossier(s) — Honoraires HT, provision (art. 30). Cliquez sur un dossier pour agir.</p>
        <div class="cab-toolbar">
          <input id="dossierSearch" placeholder="Rechercher client, ICE, mission..." style="flex:1;min-width:180px">
          <select id="dossierFilterStatut"><option value="">Tous statuts</option><option>Prospect</option><option>Convention envoyée</option><option>Convention signée</option><option>En cours</option><option>Livré - solde dû</option><option>Clôturé</option><option>Abandonné</option></select>
          <button class="btn btn-primary" id="btnNewDossier">${ico('plus')} Nouveau dossier</button>
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
    $$('#tblDossiers [data-act="view"]').forEach(b => b.addEventListener('click', () => { returnView = 'dossiers'; viewDossier(b.dataset.id); }));
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
    const tlEvents = [
      { date: d.createdAt, icon: 'folder', label: 'Dossier créé' },
      ...convs.map(cc => ({ date: cc.date, icon: 'nib', label: 'Convention ' + cc.num + ' — ' + fmtMoney(cc.ht) + ' HT · provision ' + fmtMoney(cc.provision) })),
      ...facts.map(fa => ({ date: fa.date, icon: 'receipt', label: fa.type + ' ' + fa.num + ' · ' + fmtMoney(fa.ttc) + ' — ' + fa.statut })),
      ...echeances.map(e => ({ date: e.date, icon: e.done ? 'check' : 'calendar', label: (e.done ? 'Fait — ' : 'Échéance — ') + (e.intitule || e.type) })),
      { date: d.updatedAt, icon: 'pencil', label: 'Dernière modification' }
    ].filter(e => e.date).sort((a, b) => a.date.localeCompare(b.date));
    const content = $('#content');
    content.innerHTML = `
      <div class="cab">
        <button class="btn" id="backDossiers">${ico('chevL')} Retour</button>
        <h2 style="margin-top:12px">${esc(d.client)}</h2>
        <p class="sub">${esc(d.type || '')} ${d.ice ? '· ICE ' + esc(d.ice) : ''} · ${badge(d.statut)}</p>
        <div class="dash-cards">
          <div class="dash-card"><div class="num">${fmtMoney(c.ht)}</div><div class="lbl">Honoraires HT</div></div>
          <div class="dash-card"><div class="num">${fmtMoney(prov)}</div><div class="lbl">Provision (${d.provisionPct || 50}%)</div></div>
          <div class="dash-card"><div class="num">${fmtMoney(solde)}</div><div class="lbl">Solde</div></div>
          <div class="dash-card"><div class="num">${esc(fmtDate(d.echeance))}</div><div class="lbl">Échéance</div></div>
        </div>
        <div class="cab-toolbar">
          <button class="btn btn-primary" data-act="conv" data-id="${esc(d.id)}">${ico('nib')} Générer convention</button>
          <button class="btn" data-act="fact-prov" data-id="${esc(d.id)}">${ico('receipt')} Reçu provision</button>
          <button class="btn" data-act="fact-solde" data-id="${esc(d.id)}">${ico('receipt')} Facture solde</button>
          <button class="btn" data-act="echeance" data-id="${esc(d.id)}">${ico('calendar')} Échéance</button>
          <button class="btn" data-act="edit2" data-id="${esc(d.id)}">${ico('pencil')} Éditer</button>
          <button class="btn btn-danger" data-act="del" data-id="${esc(d.id)}">${ico('trash')} Supprimer</button>
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
        <div class="dash-panel" style="margin-top:16px"><h3>${ico('clock')} Fil du dossier</h3>
          <ol class="timeline">
            ${tlEvents.map(ev => `<li><span class="tl-ico">${ico(ev.icon)}</span><span class="tl-date mono">${esc(ev.date)}</span><span class="tl-label">${esc(ev.label)}</span></li>`).join('')}
          </ol>
        </div>
      </div>`;
    $('#crumbs').innerHTML = `<span style="cursor:pointer" id="crumbDossiers">Cabinet — Dossiers</span> <span>/</span> <span class="cur">${esc(d.client)}</span>`;
    appendLastDocChip();
    if (d.statut === 'Clôturé') {
      const seal = document.createElement('span');
      seal.className = 'seal';
      seal.title = 'Dossier clôturé — solde remis';
      const h2 = $('h2', content);
      if (h2) h2.appendChild(seal);
    }
    $('#backDossiers').addEventListener('click', () => goView(returnView || 'dossiers'));
    $('#crumbDossiers').addEventListener('click', () => goView('dossiers'));
    $$('[data-act="conv"]').forEach(b => b.addEventListener('click', () => genConvention(b.dataset.id)));
    $$('[data-act="fact-prov"]').forEach(b => b.addEventListener('click', () => genFacture(b.dataset.id, 'provision')));
    $$('[data-act="fact-solde"]').forEach(b => b.addEventListener('click', () => genFacture(b.dataset.id, 'solde')));
    $$('[data-act="echeance"]').forEach(b => b.addEventListener('click', () => openDlgEcheance(b.dataset.id)));
    $$('[data-act="edit2"]').forEach(b => b.addEventListener('click', () => openDlgDossier(b.dataset.id)));
    $$('[data-act="del"]').forEach(b => b.addEventListener('click', () => delDossier(b.dataset.id)));
    $$('input[data-eid]').forEach(cb => cb.addEventListener('change', () => {
      toggleEcheanceDone(cb.dataset.eid, cb.checked);
      viewDossier(id);
    }));
  }

  function delDossier(id) {
    const d = STORE.dossiers.find(x => x.id === id);
    if (!d) return;
    const removed = { dossier: d, echeances: STORE.echeances.filter(e => e.dossierId === id) };
    STORE.dossiers = STORE.dossiers.filter(x => x.id !== id);
    STORE.echeances = STORE.echeances.filter(e => e.dossierId !== id);
    renderDossiers();
    toast('Dossier « ' + d.client + ' » supprimé.', {
      undo: () => {
        STORE.dossiers = [...STORE.dossiers, removed.dossier];
        STORE.echeances = [...STORE.echeances, ...removed.echeances];
        renderDossiers();
        toast('Dossier restauré.');
      }
    });
  }

  function showDlgStep(step2) {
    $('#dlgStep1').hidden = step2;
    $('#dlgStep2').hidden = !step2;
  }

  function updateProvisionLive() {
    const form = $('#formDossier');
    const el = $('#provisionLive');
    if (!el) return;
    const ht = Number(form.honoraires.value);
    if (!ht || ht <= 0) { el.textContent = ''; el.classList.remove('ready'); return; }
    const pct = form.provisionPct.value === '' ? 50 : Number(form.provisionPct.value);
    const c = calcTTC(ht, form.tva.value);
    const prov = Math.round(c.ttc * pct / 100);
    const g = n => n.toLocaleString('fr-FR').replace(/\u202f|\u00a0/g, ' ');
    el.textContent = 'HT ' + g(c.ht) + ' → TTC ' + g(c.ttc) + ' · Provision ' + pct + '% = ' + g(prov) + ' TTC';
    el.classList.add('ready');
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
    showDlgStep(false);
    updateProvisionLive();
    $('#dlgDossier').showModal();
  }

  $('#btnDlgNext').addEventListener('click', () => {
    const form = $('#formDossier');
    const fields = $$('#dlgStep1 input, #dlgStep1 select');
    const bad = fields.find(f => !f.checkValidity());
    if (bad) { bad.reportValidity(); return; }
    showDlgStep(true);
    updateProvisionLive();
    const first = $('#dlgStep2 input, #dlgStep2 select');
    if (first) first.focus();
  });
  $('#btnDlgBack').addEventListener('click', () => {
    showDlgStep(false);
    $('#formDossier').client.focus();
  });
  ['honoraires', 'tva', 'provisionPct'].forEach(n => {
    const f = $('#formDossier')[n];
    f.addEventListener('input', updateProvisionLive);
    f.addEventListener('change', updateProvisionLive);
  });

  $('#formDossier').addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const obj = Object.fromEntries(fd.entries());
    obj.honoraires = Number(obj.honoraires) || 0;
    obj.tva = Number(obj.tva) || 0;
    obj.provisionPct = Number(obj.provisionPct) || 50;
    const now = todayISO();
    let createdId = null;
    if (editingId) {
      updDossier(editingId, { ...obj, updatedAt: now });
    } else {
      const newD = { id: uid(), ...obj, createdAt: now, updatedAt: now, statut: obj.statut || 'Prospect' };
      createdId = newD.id;
      STORE.dossiers = [...STORE.dossiers, newD];
      // auto échéance if date provided
      if (obj.echeance) {
        STORE.echeances = [...STORE.echeances, { id: uid(), dossierId: newD.id, date: obj.echeance, type: 'Remise livrables', intitule: 'Remise V1 + Loom', done: false }];
      }
    }
    $('#dlgDossier').close();
    if (returnView === 'today') goView('today'); else renderDossiers();
    const c = calcTTC(obj.honoraires, obj.tva);
    const prov = Math.round(c.ttc * obj.provisionPct / 100);
    toast(editingId ? 'Dossier mis à jour.' : 'Dossier enregistré · provision ' + prov.toLocaleString('fr-FR').replace(/\u202f|\u00a0/g, ' ') + ' DH TTC encaissable dès signature.', {
      undo: editingId ? null : (() => {
        const id = createdId;
        return () => {
          STORE.dossiers = STORE.dossiers.filter(x => x.id !== id);
          STORE.echeances = STORE.echeances.filter(x => x.dossierId !== id);
          renderDossiers();
          toast('Enregistrement annulé.');
        };
      })()
    });
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
    const p = plaqueIdentity();
    const tel = dossier.contact || p.tel || '';
    const del = missionDeliverables(conv.mission || dossier.mission);
    const avocate = p.barreau ? 'Avocat au ' + p.barreau : 'Avocat';
    const content = $('#content');
    content.innerHTML = `
      <div class="cab">
        <button class="btn" id="backConv">← Retour</button>
        <div class="doc" id="convPrint" style="max-width:750px;margin:16px auto">
          <div style="text-align:center;border-bottom:2px solid #0f2a44;padding-bottom:10px;margin-bottom:16px">
            <div style="font-weight:700;font-size:16px">${esc(p.nom)} — ${esc(avocate)}</div>
            <div style="font-size:12px;color:#5a6b7b">Avocat d'Affaires | Droit de l'Entreprise & Numérique${dossier.ice || p.ice ? ' — ICE ' + esc(dossier.ice || p.ice) : ''}${tel ? ' — Tél ' + esc(tel) : ''}</div>
          </div>
          <h2 style="text-align:center;margin:0">CONVENTION D'HONORAIRES N° ${esc(conv.num)}</h2>
          <p style="text-align:center;font-size:12px;color:#5a6b7b">Art. 30 — Date : ${esc(conv.date)}</p>
          <p><strong>Entre :</strong> ${esc(p.nom)}, ${esc(avocate)}, ci-après "l'Avocat"<br>
          <strong>Et :</strong> ${esc(dossier.client)} ${dossier.ice ? '(ICE ' + esc(dossier.ice) + ')' : ''}${tel ? ', ' + esc(tel) : ''}, ci-après "le Client"</p>
          <p><strong>Objet :</strong> ${esc(conv.mission || dossier.mission || '')}</p>
          <table style="width:100%;border-collapse:collapse;font-size:13px;margin:12px 0" border="1" cellpadding="8">
            <tr style="background:#efece4"><th>Désignation</th><th>Honoraires HT</th></tr>
            <tr><td>${esc(conv.mission || '')}<br><span style="font-size:11px;color:#5a6b7b">${esc(del)}</span></td><td style="text-align:right">${fmtMoney(conv.ht)} HT</td></tr>
            <tr><td>TVA ${dossier.tva == 0 ? '0% (art. 91 CGI)' : dossier.tva + '%'}</td><td style="text-align:right">${fmtMoney(conv.tva)}</td></tr>
            <tr style="font-weight:700"><td>TOTAL TTC</td><td style="text-align:right">${fmtMoney(conv.ttc)} TTC</td></tr>
            <tr style="background:#e4f2f0"><td>Provision à la signature (${conv.provisionPct}%)</td><td style="text-align:right;font-weight:700">${fmtMoney(conv.provision)} TTC</td></tr>
            <tr><td>Solde à la remise</td><td style="text-align:right">${fmtMoney(conv.ttc - conv.provision)} TTC</td></tr>
          </table>
          <p class="conv-prov-note">Provision encaissée à la signature — protège l'engagement des deux parties (art. 30), solde verrouillé à la remise. Reçu délivré immédiatement. RIB communiqué en pied de reçu.</p>
          <p style="font-size:12px"><strong>Modalités :</strong> Provision exigible à la signature (reçu délivré). Solde exigible à la remise des livrables avant envoi final. Délai prévisionnel : 3-10 jours ouvrés à compter de la provision + pièces complètes. Débours en sus. Résiliation : honoraires au prorata du travail accompli.</p>
          <div style="display:flex;justify-content:space-between;margin-top:30px;font-size:13px">
            <div>L'Avocat<br><br>__________________<br>Signature & cachet</div>
            <div>Le Client (lu et approuvé)<br><br>__________________<br>${esc(dossier.client)}</div>
          </div>
          <p style="font-size:9px;color:#5a6b7b;text-align:center;margin-top:20px">Convention établie en application de l'article 30. Ne constitue pas une consultation sans diagnostic individuel.</p>
        </div>
        <div class="cab-toolbar" style="justify-content:center">
          <button class="btn btn-primary" id="btnPrintConv">${ico('receipt')} Imprimer / PDF</button>
          <button class="btn" id="btnBackConv2">Retour dossier</button>
        </div>
      </div>`;
    $('#crumbs').innerHTML = '<span class="cur">Convention ' + esc(conv.num) + '</span>';
    appendLastDocChip();
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
        <p class="sub">${convs.length} convention(s) — Art. 30. Générez depuis un dossier.</p>
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
      if (!id) return toast("Choisissez d'abord un dossier.", { kind: 'error' });
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
    const p = plaqueIdentity();
    const content = $('#content');
    content.innerHTML = `
      <div class="cab">
        <button class="btn" id="backFact">← Retour</button>
        <div class="doc" style="max-width:750px;margin:16px auto">
          <div style="display:flex;justify-content:space-between;border-bottom:2px solid #0f2a44;padding-bottom:10px">
            <div><strong>${esc(p.nom)}</strong><br><span style="font-size:11px;color:#5a6b7b">${p.barreau ? 'Avocat au ' + esc(p.barreau) : 'Avocat'}${dossier.ice || p.ice ? ' — ICE ' + esc(dossier.ice || p.ice) : ''}</span></div>
            <div style="text-align:right"><strong>${esc(f.type)} N° ${esc(f.num)}</strong><br><span style="font-size:12px">${esc(f.date)}</span></div>
          </div>
          <p><strong>Client :</strong> ${esc(dossier.client)} ${dossier.ice ? '(ICE ' + esc(dossier.ice) + ')' : ''}</p>
          <p><strong>Dossier :</strong> ${esc(dossier.mission || '')}</p>
          <table style="width:100%;border-collapse:collapse;font-size:13px" border="1" cellpadding="8">
            <tr style="background:#efece4"><th>Désignation</th><th style="text-align:right">Montant</th></tr>
            <tr><td>${esc(f.type)} — ${esc(dossier.mission || '')}</td><td style="text-align:right">${fmtMoney(f.ht)} HT</td></tr>
            <tr><td>TVA ${dossier.tva == 0 ? '0% (art. 91 CGI)' : dossier.tva + '%'}</td><td style="text-align:right">${fmtMoney(f.tva)}</td></tr>
            <tr style="font-weight:700;background:#e4f2f0"><td>${f.type === 'Reçu provision' ? 'Provision encaissée' : 'Net à payer (solde)'}</td><td style="text-align:right">${fmtMoney(f.ttc)} TTC</td></tr>
          </table>
          <p style="font-size:12px">Échéance : à réception — RIB communiqué au bas du présent document. ${dossier.tva == 0 ? 'TVA non applicable, art. 91 CGI.' : ''}</p>
        </div>
        <div class="cab-toolbar" style="justify-content:center"><button class="btn btn-primary" onclick="window.print()">${ico('receipt')} Imprimer / PDF</button> <button class="btn" id="btnBackFact2">Retour</button></div>
      </div>`;
    $('#crumbs').innerHTML = '<span class="cur">' + esc(f.type) + ' ' + esc(f.num) + '</span>';
    appendLastDocChip();
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
    $('#btnFactProv').addEventListener('click', () => { const id = $('#factDossierSel').value; if (!id) return toast("Choisissez d'abord un dossier.", { kind: 'error' }); genFacture(id, 'provision'); });
    $('#btnFactSolde').addEventListener('click', () => { const id = $('#factDossierSel').value; if (!id) return toast("Choisissez d'abord un dossier.", { kind: 'error' }); genFacture(id, 'solde'); });
    $$('[data-viewfact]').forEach(b => b.addEventListener('click', () => {
      const f = STORE.factures.find(x => x.id === b.dataset.viewfact);
      const d = STORE.dossiers.find(x => x.id === f.dossierId);
      if (f && d) previewFacture(f, d);
    }));
    $$('[data-encaisse]').forEach(b => b.addEventListener('click', () => {
      const f = STORE.factures.find(x => x.id === b.dataset.encaisse);
      if (!f) return;
      cycleFactureStatut(f.id);
      const now = STORE.factures.find(x => x.id === f.id);
      renderFactures();
      toast(f.type + ' ' + f.num + ' — ' + (now ? now.statut : ''));
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
          <button class="btn btn-primary" id="btnNewEcheance">${ico('plus')} Nouvelle échéance</button>
          <select id="echFilter"><option value="">Toutes</option><option value="todo">À faire</option><option value="done">Faites</option><option value="overdue">En retard</option></select>
        </div>
        <div class="cab-table-wrap"><table class="cab-table"><thead><tr><th>Date</th><th>Dossier</th><th>Type</th><th>Intitulé</th><th>Fait</th><th></th></tr></thead><tbody id="echBody">
          ${echeances.map(e => {
      const d = dossiers.find(x => x.id === e.dossierId);
      const overdue = !e.done && e.date && e.date < todayISO();
      return `<tr data-eid="${esc(e.id)}" data-done="${e.done ? '1' : '0'}" data-overdue="${overdue ? '1' : '0'}" style="${overdue ? 'background:#fff1f1' : ''}">
                <td class="mono">${esc(e.date || '')} ${overdue ? '<span class="ech-late" title="En retard">' + ico('flag') + '</span>' : ''}</td>
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
      const eid = cb.dataset.eid;
      const e = STORE.echeances.find(x => x.id === eid);
      if (e) { toggleEcheanceDone(eid, cb.checked); renderEcheances(); toast(cb.checked ? 'Échéance « ' + (e.intitule || e.type) + ' » cochée.' : 'Échéance rouverte.'); }
    }));
    $$('[data-del-eid]').forEach(b => b.addEventListener('click', () => {
      const removed = STORE.echeances.find(x => x.id === b.dataset.delEid);
      if (!removed) return;
      STORE.echeances = STORE.echeances.filter(x => x.id !== b.dataset.delEid);
      renderEcheances();
      toast('Échéance supprimée.', {
        undo: () => { STORE.echeances = [...STORE.echeances, removed]; renderEcheances(); toast('Échéance restaurée.'); }
      });
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
    if (!obj.date || !obj.intitule) { toast('Date et intitulé requis.', { kind: 'error' }); return; }
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
              <h3 style="font-size:14px;margin:0 0 6px">${ico('nib')} ${esc(t.title)}</h3>
              <p style="font-size:12px;color:var(--text-dim);margin:0 0 10px">${esc(t.desc)}</p>
              <span style="font-size:11px;color:var(--accent-2)">${esc(t.file)} →</span>
            </div>`).join('')}
        </div>
        <div class="dash-panel" style="margin-top:16px">
          <h3>Doctrine & Jurisprudence</h3>
          <p style="font-size:13px;color:var(--text-dim)">3 fiches prêtes à citer en diagnostic :</p>
          <ul style="font-size:13px">
            <li><a href="#" data-open-juris="08_Jurisprudence/01_Loi_09-08_CNDP_Sanctions.md">Loi 09-08 — 4 décisions CNDP + grille sanctions</a></li>
            <li><a href="#" data-open-juris="08_Jurisprudence/02_Loi_31-08_Protection_Consommateur.md">Loi 31-08 — 3 jugements CGV / rétractation</a></li>
            <li><a href="#" data-open-juris="08_Jurisprudence/03_Contrats_Commerce.md">Contrats — 3 arrêts Cass. (pénale, réserve, force majeure)</a></li>
            <li><a href="#" data-open-juris="01_Strategy/06_Deontologie_Pratique_Avocat_Maroc/00_INDEX.md">Déontologie pratique — loi 66-23 (checklist)</a></li>
          </ul>
        </div>
      </div>`;
    $('#crumbs').innerHTML = '<span class="cur">Cabinet — Bibliothèque</span>';
    $$('[data-open]').forEach(el => el.addEventListener('click', () => {
      const id = el.dataset.open;
      // switch to Base and open doc
      setMode('vault');
      setTimeout(() => { location.hash = '#' + encodeURIComponent(id); window.dispatchEvent(new HashChangeEvent('hashchange')); }, 50);
    }));
    $$('[data-open-juris]').forEach(a => a.addEventListener('click', (e) => {
      e.preventDefault();
      const id = a.dataset.openJuris;
      setMode('vault');
      setTimeout(() => { location.hash = '#' + encodeURIComponent(id); window.dispatchEvent(new HashChangeEvent('hashchange')); }, 50);
    }));
  }

  /* ---------- Init ---------- */
  function initCabinet() {
    $$('.mode-btn').forEach(b => b.addEventListener('click', () => setMode(b.dataset.mode)));
    $$('.cab-nav-item').forEach(b => b.addEventListener('click', () => {
      const v = b.dataset.view;
      if (v === 'new-dossier') { openDlgDossier(); return; }
      cabView = v;
      LS.set('cabinetView', v);
      renderCabinet();
    }));
    $('#fabNewDossier').addEventListener('click', openDlgDossier);

    // cross-mode search: sidebar input filters dossiers when in Cabinet
    $('#searchInput').addEventListener('input', (e) => {
      if (mode !== 'cabinet') return;
      const q = e.target.value.trim();
      if (!q) return;
      if (!$('#tblDossiers')) { cabView = 'dossiers'; renderCabinet(); }
      const local = $('#dossierSearch');
      if (local) { local.value = q; filterDossiers(); }
    });

    document.addEventListener('keydown', (e) => {
      if (mode !== 'cabinet') return;
      if (e.target.matches('input, textarea, select')) return;
      if (!$('dialog[open]') && (e.key === 'n' || e.key === 'N')) { e.preventDefault(); openDlgDossier(); }
    });

    // restore mode
    setMode(mode);
    // ensure cabinet nav reflects view
    if (mode === 'cabinet') renderCabinet();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initCabinet);
  else initCabinet();

  // expose for app.js mode sync
  window.Cabinet = { setMode, renderCabinet, goView, getMode: () => mode, newDossier: () => openDlgDossier(), viewDossier };
})();