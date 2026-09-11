/* AVOCATO — Palette de commandes Ctrl+K : docs + dossiers + actions, offline. */
(function () {
  'use strict';
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = window.AvocatoCore.esc;
  const LSd = window.AvocatoStore.LS.get;

  const dlg = $('#paletteDlg');
  const input = $('#palInput');
  const list = $('#palResults');
  let items = [], active = 0;

  function actions() {
    return [
      { kind: 'Action', icon: 'plus', label: 'Nouveau dossier', hint: 'Cabinet', run: () => { goCab(); window.Cabinet.newDossier(); } },
      { kind: 'Action', icon: 'bolt', label: "Aujourd'hui", hint: 'Cabinet', run: () => goCab('today') },
      { kind: 'Action', icon: 'flag', label: 'Pipeline', hint: 'Cabinet', run: () => goCab('pipeline') },
      { kind: 'Action', icon: 'gauge', label: 'Tableau de bord Cabinet', hint: 'Cabinet', run: () => goCab('dashboard') },
      { kind: 'Action', icon: 'card', label: 'Frais & Debours', hint: 'Cabinet', run: () => goCab('frais') },
      { kind: 'Action', icon: 'calendar', label: 'Calculateur delais CPC', hint: 'Cabinet', run: () => goCab('delais') },
      { kind: 'Action', icon: 'calendar', label: 'Calendrier', hint: 'Cabinet', run: () => goCab('calendrier') },
      { kind: 'Action', icon: 'scale', label: 'Audiences', hint: 'Cabinet', run: () => goCab('audiences') },
      { kind: 'Action', icon: 'card', label: 'Clients', hint: 'Cabinet', run: () => goCab('clients') },
      { kind: 'Action', icon: 'chart', label: 'Finances', hint: 'Cabinet', run: () => goCab('finances') },
      { kind: 'Action', icon: 'scale', label: 'Importer mahakim (TSV/JSON)', hint: 'Cabinet', run: () => { goCab('audiences'); if (window.Mahakim) window.Mahakim.openImport(); } },
      { kind: 'Action', icon: 'calendar', label: "Rôle d'audiences (imprimer)", hint: 'Cabinet', run: () => { goCab('audiences'); if (window.Agenda) window.Agenda.openRolePrint(); } },
      { kind: 'Action', icon: 'bolt', label: 'Données de démonstration (seed)', hint: 'Cabinet', run: () => { goCab('dashboard'); if (window.Mock) window.Mock.seed(); } },
      { kind: 'Action', icon: 'x', label: 'Supprimer la démo (wipe)', hint: 'Cabinet', run: () => { if (window.Mock) window.Mock.wipe(); } },
      { kind: 'Action', icon: 'calendar', label: "Pousser mes alertes au calendrier (ICS)", hint: 'Cabinet', run: () => { goCab('calendrier'); if (window.Agenda) window.Agenda.exportAlertsICS(); } },
      { kind: 'Action', icon: 'book', label: 'Veille juridique', hint: 'Cabinet', run: () => goCab('veille') },
      { kind: 'Action', icon: 'calendar', label: 'Registres 90j / 150j', hint: 'Cabinet', run: () => goCab('registres') },
      { kind: 'Action', icon: 'receipt', label: 'Dividendes / AG', hint: 'Cabinet', run: () => goCab('dividendes') },
      { kind: 'Action', icon: 'clock', label: 'Séjour & Veille packs', hint: 'Cabinet', run: () => goCab('sejours') },
      { kind: 'Action', icon: 'gear', label: 'Param\u00e8tres du cabinet', hint: 'Cabinet', run: () => { goCab(); window.Cabinet.openSettings(); } },
      { kind: 'Action', icon: 'gauge', label: 'Sync / serveur local', hint: 'Cabinet', run: () => { if (window.Sync) window.Sync.open(); } },
      { kind: 'Action', icon: 'book', label: 'Base — tableau de bord', hint: 'Base', run: () => { window.Cabinet.setMode('vault'); if (window.App) window.App.openDashboard(); } }
    ];
  }
  function goCab(view) {
    if (window.Cabinet.getMode() !== 'cabinet') window.Cabinet.setMode('cabinet');
    if (view) window.Cabinet.goView(view);
    document.body.classList.remove('sidebar-open');
  }

  function build(q) {
    const out = [];
    const t = q.trim().toLowerCase();
    const DATA = window.VAULT_DATA || [];
    const dossiers = LSd('dossiers', []);
    const echeances = LSd('echeances', []);
    const veille = LSd('veille', []);
    const frais = LSd('frais', []);
    const factures = LSd('factures', []);
    const registres = LSd('registres', []);
    const dividendes = LSd('dividendes', []);
    const sejours = LSd('sejours', []);
    const match = (s) => !t || String(s).toLowerCase().includes(t);

    actions().filter(a => match(a.label)).slice(0, 5).forEach(a => out.push(a));
    dossiers.filter(d => match(d.client + ' ' + (d.mission || '') + ' ' + (d.ice || '') + ' ' + (d.adverse||'') + ' ' + (d.notes||'') + ' ' + (d.contact||'')))
      .slice(0, 5)
      .forEach(d => out.push({ kind: 'Dossier', icon: 'folder', label: d.client, hint: d.statut || '', run: () => { goCab('dossiers'); window.Cabinet.viewDossier(d.id); } }));
    LSd('audiences', []).filter(a => match((a.date||'') + ' ' + (a.juridiction||'') + ' ' + (a.objet||'') + ' ' + (a.role||'')))
      .slice(0, 4)
      .forEach(a => out.push({ kind: 'Audience', icon: 'scale', label: (a.juridiction || 'Audience') + ' — ' + (a.objet || a.date || ''), hint: a.date || '', run: () => goCab('audiences') }));
    LSd('conventions', []).filter(c => match((c.num||'') + ' ' + (c.date||'') + ' ' + (c.client||'')))
      .slice(0, 3)
      .forEach(c => out.push({ kind: 'Convention', icon: 'nib', label: (c.num || 'Convention') + (c.client ? ' — ' + c.client : ''), hint: c.date || '', run: () => goCab('conventions') }));
    const contacts = LSd('clients', {});
    Object.keys(contacts).filter(k => match((k||'') + ' ' + (contacts[k].tel||'') + ' ' + (contacts[k].email||'')))
      .slice(0, 3)
      .forEach(k => out.push({ kind: 'Contact', icon: 'card', label: (contacts[k].tel || contacts[k].email || k), hint: k, run: () => { goCab('clients'); if (window.Relations && window.Relations.renderFiche) window.Relations.renderFiche(k); } }));
    echeances.filter(e => match((e.intitule||'') + ' ' + (e.type||'') + ' ' + (e.date||'')))
      .slice(0, 4)
      .forEach(e => {
        const d = dossiers.find(x=>x.id===e.dossierId);
        out.push({ kind: 'Echeance', icon: 'calendar', label: (e.intitule||e.type||'Echeance') + (d?' - '+d.client:''), hint: e.date || '', run: () => { goCab('echeances'); } });
      });
    veille.filter(v => match((v.title||'') + ' ' + (v.source||'') + ' ' + (v.tags||'')))
      .slice(0, 4)
      .forEach(v => out.push({ kind: 'Veille', icon: 'book', label: v.title, hint: v.source || '', run: () => { goCab('veille'); } }));
    frais.filter(f => match((f.label||'') + ' ' + (f.categorie||'')))
      .slice(0, 3)
      .forEach(f => {
        const d = dossiers.find(x=>x.id===f.dossierId);
        out.push({ kind: 'Frais', icon: 'card', label: f.label, hint: (d?d.client:'' ) + ' ' + f.categorie, run: () => { goCab('frais'); } });
      });
    factures.filter(f => match((f.num||'') + ' ' + (f.type||'')))
      .slice(0, 3)
      .forEach(f => {
        const d = dossiers.find(x=>x.id===f.dossierId);
        out.push({ kind: 'Facture', icon: 'receipt', label: f.num + ' ' + f.type, hint: d?d.client:f.statut||'', run: () => { goCab('factures'); } });
      });
    registres.filter(r => match((r.facture||'') + ' ' + (r.butoir||'') + ' ' + (r.exig||'')))
      .slice(0, 3)
      .forEach(r => {
        const d = dossiers.find(x=>x.id===r.dossierId);
        out.push({ kind: 'Registre 90j', icon: 'calendar', label: (r.facture || 'Registre') + ' → ' + (r.butoir || ''), hint: d?d.client:'', run: () => { goCab('registres'); } });
      });
    dividendes.filter(r => match((r.exo||'') + ' ' + (r.montant||'')))
      .slice(0, 3)
      .forEach(r => {
        const d = dossiers.find(x=>x.id===r.dossierId);
        out.push({ kind: 'Dividende', icon: 'receipt', label: 'AG ' + (r.exo || '') + ' ' + (r.montant || ''), hint: d?d.client:'', run: () => { goCab('dividendes'); } });
      });
    sejours.filter(r => match((r.titre||'') + ' ' + (r.expiry||'')))
      .slice(0, 3)
      .forEach(r => {
        const d = dossiers.find(x=>x.id===r.dossierId);
        out.push({ kind: 'Séjour', icon: 'clock', label: (r.titre || 'Titre') + ' ' + (r.expiry || ''), hint: d?d.client:'', run: () => { goCab('sejours'); } });
      });
    DATA.filter(d => match(d.title + ' ' + d.file + ' ' + d.folder))
      .slice(0, 8)
      .forEach(d => out.push({ kind: 'Doc', icon: 'nib', label: d.title, hint: d.folder.split('/').pop().replace(/^\d+_/, '').replace(/_/g, ' '), run: () => { window.Cabinet.setMode('vault'); window.App.openDoc(d.id); } }));
    return out;
  }

  function render() {
    list.innerHTML = items.map((it, i) =>
      `<li role="option" aria-selected="${i === active}" data-i="${i}" class="${i === active ? 'active' : ''}" id="pal-opt-${i}">
        <span class="pal-ico">${window.ico(it.icon)}</span>
        <span class="pal-title">${esc(it.label)}</span>
        <span class="pal-kind">${esc(it.kind)}${it.hint ? ' · ' + esc(it.hint) : ''}</span>
      </li>`).join('') || '<li class="pal-empty">Rien ne correspond — essaie un nom de client ou un mot du titre.</li>';
    const el = $(`#pal-opt-${active}`, list);
    if (el) el.scrollIntoView({ block: 'nearest' });
    if (items.length) input.setAttribute('aria-activedescendant', 'pal-opt-' + active);
    else input.removeAttribute('aria-activedescendant');
    const countEl = $('#palCount');
    if (countEl) countEl.textContent = items.length + ' résultat' + (items.length > 1 ? 's' : '');
  }

  let deb = null;
  function refresh() { items = build(input.value); active = 0; render(); }
  function refreshSoon() { clearTimeout(deb); deb = setTimeout(refresh, 120); }
  function runItem(i) { const it = items[i]; if (!it) return; close(); try { it.run(); } catch (e) { console.warn(e); } }
  function open() {
    if (dlg.open) return;
    input.value = '';
    refresh();
    dlg.showModal();
    input.focus();
  }
  function close() { if (dlg.open) dlg.close(); }

  input.addEventListener('input', refreshSoon);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); active = Math.min(items.length - 1, active + 1); render(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); active = Math.max(0, active - 1); render(); }
    else if (e.key === 'Enter') { e.preventDefault(); runItem(active); }
    else if (e.key === 'Escape') { e.preventDefault(); close(); }
  });
  list.addEventListener('click', (e) => {
    const li = e.target.closest('li[data-i]');
    if (li) runItem(Number(li.dataset.i));
  });
  dlg.addEventListener('click', (e) => { if (e.target === dlg) close(); });

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (dlg.open) close(); else open();
    }
  });
  $('#btnPalette').addEventListener('click', open);

  window.Palette = { open, close };
})();
