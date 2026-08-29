/* AVOCATO — Palette de commandes Ctrl+K : docs + dossiers + actions, offline. */
(function () {
  'use strict';
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
  const LSd = (k, d) => { try { const v = localStorage.getItem('avocato:' + k); return v ? JSON.parse(v) : d; } catch { return d; } };

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
    const match = (s) => !t || String(s).toLowerCase().includes(t);

    actions().filter(a => match(a.label)).slice(0, 5).forEach(a => out.push(a));
    dossiers.filter(d => match(d.client + ' ' + (d.mission || '') + ' ' + (d.ice || '')))
      .slice(0, 5)
      .forEach(d => out.push({ kind: 'Dossier', icon: 'folder', label: d.client, hint: d.statut || '', run: () => { goCab('dossiers'); window.Cabinet.viewDossier(d.id); } }));
    DATA.filter(d => match(d.title + ' ' + d.file + ' ' + d.folder))
      .slice(0, 8)
      .forEach(d => out.push({ kind: 'Doc', icon: 'nib', label: d.title, hint: d.folder.split('/').pop().replace(/^\d+_/, '').replace(/_/g, ' '), run: () => { window.Cabinet.setMode('vault'); window.App.openDoc(d.id); } }));
    return out;
  }

  function render() {
    list.innerHTML = items.map((it, i) =>
      `<li role="option" data-i="${i}" class="${i === active ? 'active' : ''}" id="pal-opt-${i}">
        <span class="pal-ico">${window.ico(it.icon)}</span>
        <span class="pal-title">${esc(it.label)}</span>
        <span class="pal-kind">${esc(it.kind)}${it.hint ? ' · ' + esc(it.hint) : ''}</span>
      </li>`).join('') || '<li class="pal-empty">Rien ne correspond — essaie un nom de client ou un mot du titre.</li>';
    const el = $(`#pal-opt-${active}`, list);
    if (el) el.scrollIntoView({ block: 'nearest' });
  }

  function refresh() { items = build(input.value); active = 0; render(); }
  function runItem(i) { const it = items[i]; if (!it) return; close(); try { it.run(); } catch (e) { console.warn(e); } }
  function open() {
    if (dlg.open) return;
    input.value = '';
    refresh();
    dlg.showModal();
    input.focus();
  }
  function close() { if (dlg.open) dlg.close(); }

  input.addEventListener('input', refresh);
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
