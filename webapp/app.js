/* AVOCATO Learn — logique applicative (marqué + Chart.js, 100% offline)
   Navigation v4 : Domaine (grand titre) › Dossier (sous-titre) › Documents */
(function () {
  'use strict';

  const DATA = window.VAULT_DATA || [];
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const LS = {
    get(k, d) { try { const v = localStorage.getItem('avocato:' + k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem('avocato:' + k, JSON.stringify(v)); } catch {} }
  };

  /* ---------- état ---------- */
  const state = {
    current: null,
    themeIdx: 0,
    font: LS.get('font', 'md'),
    read: new Set(LS.get('read', [])),
    checks: LS.get('checks', {}),
    foldersOpen: LS.get('folders', {}),
    charts: [],
    spy: null,
    autoReadDone: false
  };
  const THEMES = ['system', 'light', 'dark'];

  /* ---------- domaines > dossiers ---------- */
  /* Grand titre = domaine ; sous-titre = dossier ; puis documents. */
  const DOMAINS = [
    { id: 'start',      label: 'Démarrage',               icon: '🚀', match: ['00_START_HERE', '(root)'] },
    { id: 'strategy',   label: 'Stratégie & déontologie', icon: '🧭', match: ['01_Strategy'] },
    { id: 'juris',      label: 'Jurisprudence citable',   icon: '⚖️', match: ['08_Jurisprudence'] },
    { id: 'niches',     label: 'Niches métier',           icon: '🎯', match: ['02_Niches_Deep_Dive'] },
    { id: 'acqui',      label: 'Acquisition sans pub',    icon: '📣', match: ['03_Acquisition_Without_Ads'] },
    { id: 'skills',     label: 'Compétences · 19 tracks', icon: '🧠', match: ['04_Skills_To_Learn'] },
    { id: 'bank',       label: 'Modèles & checklists',    icon: '🗂️', match: ['05_Document_Bank'] },
    { id: 'system',     label: 'Système & plan 90 jours', icon: '🗓️', match: ['06_ADHD_System', '07_90Day_Plan'] }
  ];
  const FOLDER_LABELS = {
    '(root)': 'Vue d\'ensemble',
    '00_START_HERE': 'Commencer ici'
  };
  function humanize(seg) { return seg.replace(/^\d+[_-]/, '').replace(/[_-]+/g, ' '); }
  function folderLabel(key) {
    if (FOLDER_LABELS[key]) return FOLDER_LABELS[key];
    const seg = key.split('/').pop();
    return humanize(seg).replace(/\b\w/g, c => c.toUpperCase());
  }
  function groupNum(key) { return (key.split('/').pop().match(/^(\d+)/) || [])[1] || ''; }

  function domainOf(groupKey) {
    const rootSeg = groupKey.split('/')[0];
    return DOMAINS.find(d => d.match.includes(rootSeg)) || DOMAINS[DOMAINS.length - 1];
  }

  /* Groupe = sous-dossier si profondeur ≥ 2, sinon dossier racine */
  function getGroupKey(d) {
    const parts = d.id.split('/');
    return parts.length > 2 ? parts.slice(0, 2).join('/') : d.folder;
  }

  const GROUPS = {};
  DATA.forEach(d => { const g = getGroupKey(d); (GROUPS[g] = GROUPS[g] || []).push(d); });
  Object.values(GROUPS).forEach(a => a.sort((x, y) => x.id.localeCompare(y.id, 'fr')));

  /* Ordre : domaines dans l'ordre pédagogique, dossiers triés dedans */
  const ORDERED_DOMAINS = DOMAINS
    .map(dom => ({
      ...dom,
      groups: Object.keys(GROUPS)
        .filter(g => domainOf(g).id === dom.id)
        .sort((a, b) => a.localeCompare(b, 'fr', { numeric: true }))
        .map(key => ({ key, docs: GROUPS[key] }))
    }))
    .filter(dom => dom.groups.length);
  const ORDERED = ORDERED_DOMAINS.flatMap(d => d.groups.flatMap(g => g.docs));

  /* ---------- helpers ---------- */
  function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
  function parseNum(s) {
    if (s == null) return NaN;
    let t = String(s).trim().replace(/\s/g, '').replace(/,/g, '.');
    const k = /k$/i.test(t); t = t.replace(/k$/i, '');
    t = t.replace(/[DH€$dh%dh]/g, '');
    const n = parseFloat(t);
    return isNaN(n) ? NaN : (k ? n * 1000 : n);
  }
  function docDomain(doc) { return domainOf(getGroupKey(doc)); }

  /* ---------- markdown ---------- */
  const renderer = {
    code(code, infostring) {
      const lang = (infostring || '').trim();
      if (lang.startsWith('chart')) {
        const type = (lang.split(':')[1] || 'bar').trim();
        return `<div class="chart-box" data-ctype="${esc(type)}" data-cdata="${encodeURIComponent(code)}"></div>`;
      }
      const cls = lang ? ` class="language-${esc(lang)}"` : '';
      return `<pre><code${cls}>${esc(code)}</code></pre>`;
    }
  };
  marked.use({ gfm: true, breaks: true, renderer });

  function enhanceQcm(tmp) {
    $$('blockquote', tmp).forEach(bq => {
      const txt = (bq.textContent || '').trim();
      if (/^(R[eé]ponse|Answer)\s*[:：]/i.test(txt)) {
        const det = document.createElement('details');
        det.className = 'qcm-answer';
        det.innerHTML = '<summary>Voir la réponse</summary>';
        const body = document.createElement('div');
        body.className = 'qcm-body';
        bq.parentNode.insertBefore(det, bq);
        det.appendChild(body);
        body.appendChild(bq);
      }
    });
  }

  function renderMarkdown(src) {
    let html = marked.parse(src);
    const tmp = document.createElement('div');
    tmp.innerHTML = html;

    const toc = [];
    $$('h2, h3', tmp).forEach((h, i) => {
      const id = 'sec-' + i;
      h.id = id;
      toc.push({ tag: h.tagName, text: h.textContent.trim(), id });
    });

    enhanceQcm(tmp);

    $$('table', tmp).forEach(t => {
      const wrap = document.createElement('div');
      wrap.className = 'table-scroll';
      t.parentNode.insertBefore(wrap, t);
      wrap.appendChild(t);
    });

    return { html: tmp.innerHTML, toc };
  }

  function bindContentEvents(root) {
    $$('input[type="checkbox"]', root).forEach((cb, i) => {
      cb.disabled = false;
      const key = (state.current || '') + '#' + i;
      if (state.checks[key]) cb.checked = true;
      if (cb.checked) { const li = cb.closest('li'); if (li) li.classList.add('checked'); }
      cb.addEventListener('change', () => {
        state.checks[key] = cb.checked;
        LS.set('checks', state.checks);
        const li = cb.closest('li');
        if (li) li.classList.toggle('checked', cb.checked);
      });
    });
    $$('a[href]', root).forEach(a => {
      const href = a.getAttribute('href');
      if (href && href.endsWith('.md')) {
        a.addEventListener('click', e => { e.preventDefault(); openDoc(href); });
        a.classList.add('doc-link');
      } else if (href && href.endsWith('/')) {
        a.addEventListener('click', e => { e.preventDefault(); openDoc(href + '00_INDEX.md'); });
        a.classList.add('doc-link');
      }
    });
  }

  /* ---------- graphiques ---------- */
  const CHART_COLORS = {
    light: { accent: '#0f766e', accent2: '#155e75', grid: 'rgba(22,32,42,.10)', ticks: '#5b6b7a' },
    dark: { accent: '#2dd4bf', accent2: '#7dd3fc', grid: 'rgba(228,232,236,.12)', ticks: '#9aa7b2' }
  };
  function chartTheme() { return CHART_COLORS[state.theme === 'dark' ? 'dark' : 'light']; }

  function parseCsvData(raw) {
    const lines = raw.trim().split('\n').map(l => l.trim()).filter(Boolean);
    if (!lines.length) return null;
    const rows = lines.map(l => l.split(',').map(c => c.trim()));
    const firstNumeric = !isNaN(parseNum(rows[0][1] || ''));
    const labels = rows.map(r => r[0]);
    const headers = firstNumeric ? null : rows[0];
    const dataRows = firstNumeric ? rows : rows.slice(1);
    const series = [];
    if (headers) headers.slice(1).forEach((h, si) => series.push({ label: h, data: dataRows.map(r => parseNum(r[si + 1])) }));
    else series.push({ label: 'Valeur', data: dataRows.map(r => parseNum(r[1])) });
    return { labels, series, label: firstNumeric ? 'Valeur' : rows[0][0] };
  }

  function baseChartOpts(type, th, legend) {
    return {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: legend ? { display: true, position: 'right', labels: { color: th.ticks, font: { size: 11 } } } : { display: false } },
      scales: (type === 'doughnut' || type === 'polarArea') ? undefined : {
        x: { ticks: { color: th.ticks }, grid: { color: th.grid } },
        y: { beginAtZero: true, ticks: { color: th.ticks }, grid: { color: th.grid } }
      }
    };
  }

  function renderChartBox(box) {
    const type = box.dataset.ctype || 'bar';
    const data = parseCsvData(decodeURIComponent(box.dataset.cdata));
    if (!data) { box.innerHTML = '<p class="chart-title">⚠️ Données invalides</p>'; return; }
    const th = chartTheme();
    const wrap = document.createElement('div'); wrap.className = 'chart-canvas-wrap';
    const canvas = document.createElement('canvas'); wrap.appendChild(canvas);
    box.innerHTML = ''; box.appendChild(wrap);
    const palette = [th.accent, th.accent2, '#b4552d', '#7a5aa8', '#3a7ca5'];
    state.charts.push(new Chart(canvas, {
      type,
      data: {
        labels: data.labels,
        datasets: data.series.map((s, i) => ({
          label: s.label, data: s.data,
          backgroundColor: type === 'doughnut' ? palette.slice(0, s.data.length) : (type === 'line' ? th.accent + '22' : th.accent + 'cc'),
          borderColor: type === 'doughnut' ? palette.slice(0, s.data.length) : th.accent,
          borderWidth: 2, tension: .35, pointRadius: 4, fill: type === 'line'
        }))
      },
      options: baseChartOpts(type, th, data.series.length > 1)
    }));
  }

  function setupTableCharts(container) {
    $$('table', container).forEach(table => {
      const rows = $$('tr', table);
      if (rows.length < 3) return;
      const headers = $$('th, td', rows[0]).map(c => c.textContent.trim());
      const body = rows.slice(1).map(r => $$('td, th', r).map(c => c.textContent.trim()));
      let bestCol = -1, bestScore = 0;
      for (let c = 1; c < headers.length; c++) {
        const vals = body.map(r => r[c] || '').filter(v => v && v !== '—');
        if (!vals.length) continue;
        const score = vals.filter(v => !isNaN(parseNum(v))).length / vals.length;
        if (score > .7 && vals.length >= 3 && score > bestScore) { bestScore = score; bestCol = c; }
      }
      if (bestCol < 0) return;
      const labels = body.map(r => (r[0] || '').slice(0, 28));
      const values = body.map(r => parseNum(r[bestCol] || ''));
      if (labels.filter((_, i) => !isNaN(values[i])).length < 3) return;
      const btn = document.createElement('button');
      btn.className = 'chart-toggle'; btn.textContent = '📊 Voir en graphique';
      const chartEl = document.createElement('div');
      chartEl.className = 'chart-box'; chartEl.style.display = 'none';
      const wrap = document.createElement('div'); wrap.className = 'chart-canvas-wrap';
      chartEl.appendChild(wrap);
      table.parentNode.insertBefore(btn, table.nextSibling);
      table.parentNode.insertBefore(chartEl, btn.nextSibling);
      let chart = null;
      btn.addEventListener('click', () => {
        if (chartEl.style.display === 'none') {
          chartEl.style.display = '';
          btn.textContent = '📋 Voir le tableau';
          if (!chart) {
            const th = chartTheme();
            const canvas = document.createElement('canvas'); wrap.appendChild(canvas);
            chart = new Chart(canvas, {
              type: 'bar',
              data: { labels, datasets: [{ label: headers[bestCol], data: values, backgroundColor: th.accent + 'cc', borderColor: th.accent, borderWidth: 1 }] },
              options: baseChartOpts('bar', th, false)
            });
            state.charts.push(chart);
          }
        } else {
          chartEl.style.display = 'none';
          btn.textContent = '📊 Voir en graphique';
        }
      });
    });
  }

  /* ---------- lecture : progression + scroll-spy + lu-auto ---------- */
  function onScroll() {
    const barEl = $('#readProgress');
    if (!state.current) { barEl.style.width = '0%'; return; }
    const art = $('.doc-col');
    if (!art) { barEl.style.width = '0%'; return; }
    const rect = art.getBoundingClientRect();
    const total = rect.height - window.innerHeight + Math.max(rect.top, 0);
    const done = Math.min(Math.max(-rect.top + Math.min(window.innerHeight - rect.top, 0), 0), total);
    const pct = total > 80 ? Math.round(100 * done / total) : 100;
    barEl.style.width = pct + '%';
    if (pct >= 90 && !state.autoReadDone && !state.read.has(state.current)) {
      state.read.add(state.current);
      LS.set('read', Array.from(state.read));
      state.autoReadDone = true;
      updateReadBtn();
      renderTree($('#searchInput').value.trim().toLowerCase());
    }
  }

  function mountSpy(toc) {
    if (state.spy) { state.spy.disconnect(); state.spy = null; }
    if (!toc.length) return;
    state.spy = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        $$('.toc-rail a').forEach(a => a.classList.toggle('current', a.getAttribute('href') === '#' + en.target.id));
      });
    }, { rootMargin: '-72px 0px -66% 0px' });
    toc.forEach(t => { const el = document.getElementById(t.id); if (el) state.spy.observe(el); });
  }

  /* ---------- rendu document ---------- */
  function neighbours(id) {
    const i = ORDERED.findIndex(d => d.id === id);
    return { prev: i > 0 ? ORDERED[i - 1] : null, next: i >= 0 && i < ORDERED.length - 1 ? ORDERED[i + 1] : null };
  }

  function openDoc(id) {
    const doc = DATA.find(d => d.id === id);
    if (!doc) return;
    state.current = id;
    state.autoReadDone = state.read.has(id);
    const main = $('#content');
    const { html, toc } = renderMarkdown(doc.content);
    const nb = neighbours(id);

    const railToc = toc.length > 1
      ? `<aside class="toc-rail"><h4>Sommaire</h4><ul>` +
        toc.map(t => `<li class="lvl-${t.tag}"><a href="#${t.id}">${esc(t.text)}</a></li>`).join('') +
        `</ul></aside>` : '';
    const inlineToc = toc.length > 1
      ? `<details class="toc" open><summary>📑 Sommaire (${toc.length})</summary><ul>` +
        toc.map(t => `<li class="lvl-${t.tag}"><a href="#${t.id}">${esc(t.text)}</a></li>`).join('') +
        `</ul></details>` : '';

    const dom = docDomain(doc);
    const gKey = getGroupKey(doc);
    const pos = `${GROUPS[gKey].findIndex(d => d.id === id) + 1}/${GROUPS[gKey].length}`;

    main.innerHTML = `
      <div class="doc-layout">
        <div class="doc-col">
          <article class="doc">
            <div class="doc-meta">
              <span class="pill folder">${esc(dom.label)}</span>
              <span class="pill">${esc(folderLabel(gKey))} · ${pos}</span>
              <span class="pill">${doc.words} mots · ~${Math.max(1, Math.round(doc.words / 180))} min</span>
            </div>
            ${inlineToc}
            <div class="doc-content">${html}</div>
            <div class="doc-footer-nav">
              ${nb.prev ? `<button data-go="${esc(nb.prev.id)}"><span class="dir">← Précédent</span><span class="ttl">${esc(nb.prev.title)}</span></button>` : '<span></span>'}
              ${nb.next ? `<button class="next" data-go="${esc(nb.next.id)}"><span class="dir">Suivant →</span><span class="ttl">${esc(nb.next.title)}</span></button>` : ''}
            </div>
          </article>
        </div>
        ${railToc}
      </div>`;

    bindContentEvents(main);
    $$('.chart-box', main).forEach(renderChartBox);
    setupTableCharts(main);
    $$('.doc-footer-nav [data-go]', main).forEach(b =>
      b.addEventListener('click', () => openDoc(b.dataset.go)));

    $('#crumbs').innerHTML =
      `${esc(dom.icon)} ${esc(dom.label)} <span aria-hidden="true">/</span> ${esc(folderLabel(gKey))} <span aria-hidden="true">/</span> <span class="cur">${esc(doc.title)}</span>`;
    highlightTree();
    updateReadBtn();
    if (location.hash !== '#' + encodeURIComponent(id)) {
      try { history.replaceState(null, '', '#' + encodeURIComponent(id)); } catch {}
    }
    window.scrollTo({ top: 0 });
    requestAnimationFrame(() => { onScroll(); mountSpy(toc); });
    LS.set('last', id);
  }

  function highlightTree() {
    $$('.tree-item').forEach(b => b.classList.toggle('active', b.dataset.id === state.current));
  }

  /* ---------- arbre : Domaine › Dossier › Documents ---------- */
  function renderTree(filter) {
    const tree = $('#tree');
    const f = (filter || '').toLowerCase();
    let html = '';

    ORDERED_DOMAINS.forEach(dom => {
      const domDocs = dom.groups.flatMap(g => g.docs);
      const domRead = domDocs.filter(d => state.read.has(d.id)).length;

      let domHtml = '';
      let domHasVisible = false;

      dom.groups.forEach(({ key, docs }) => {
        const items = !f ? docs : docs.filter(d =>
          d.title.toLowerCase().includes(f) ||
          d.file.toLowerCase().includes(f) ||
          d.content.toLowerCase().includes(f));
        if (f && !items.length) return;
        domHasVisible = true;
        const readCount = docs.filter(d => state.read.has(d.id)).length;
        const pct = docs.length ? Math.round(100 * readCount / docs.length) : 0;
        const isOpen = f ? true : state.foldersOpen[key] !== false;

        domHtml += `<div class="tree-section">
          <button class="tree-folder ${isOpen ? 'open' : ''}" data-folder="${esc(key)}">
            <span class="caret">▸</span><span>${esc(folderLabel(key))}</span>
            <span class="folder-meta">${readCount}/${docs.length}</span>
            <span class="progress-mini"><span class="fill" style="width:${pct}%"></span></span>
          </button>
          <div class="tree-items" style="display:${isOpen ? '' : 'none'}">
            ${items.map(d => `
              <button class="tree-item ${state.read.has(d.id) ? 'read' : ''} ${state.current === d.id ? 'active' : ''}" data-id="${esc(d.id)}">
                <span class="read-dot" aria-hidden="true"></span>
                <span class="fname">${esc(d.title)}</span>
              </button>`).join('')}
          </div>
        </div>`;
      });

      if (!domHasVisible && f) return;
      const pctAll = domDocs.length ? Math.round(100 * domRead / domDocs.length) : 0;

      html += `<div class="tree-domain">
        <div class="tree-domain-head" title="${pctAll}% lu">
          <span class="td-icon">${dom.icon}</span>
          <span class="td-label">${esc(dom.label)}</span>
          <span class="td-count">${domRead}/${domDocs.length}</span>
        </div>
        ${domHtml}
      </div>`;
    });

    tree.innerHTML = html || '<div class="empty-state">Aucun résultat 😕</div>';

    $$('.tree-folder', tree).forEach(btn => btn.addEventListener('click', () => {
      const fk = btn.dataset.folder;
      state.foldersOpen[fk] = !(btn.classList.contains('open'));
      LS.set('folders', state.foldersOpen);
      btn.classList.toggle('open');
      const items = btn.nextElementSibling;
      items.style.display = items.style.display === 'none' ? '' : 'none';
    }));
    $$('.tree-item', tree).forEach(btn => btn.addEventListener('click', () => {
      openDoc(btn.dataset.id);
      document.body.classList.remove('sidebar-open');
    }));

    renderPathChips();
  }

  function renderPathChips() {
    const wrap = $('#pathChips');
    if (!wrap) return;
    wrap.innerHTML = ORDERED_DOMAINS.map((dom, i) =>
      `<button class="path-chip" data-d="${esc(dom.id)}" title="${esc(dom.label)}">${i + 1}</button>`
    ).join('');
    $$('.path-chip', wrap).forEach(ch => ch.addEventListener('click', () => {
      const dom = ORDERED_DOMAINS.find(x => x.id === ch.dataset.d);
      const all = dom.groups.flatMap(g => g.docs);
      const target = all.find(d => !state.read.has(d.id)) || all[0];
      openDoc(target.id);
      document.body.classList.remove('sidebar-open');
    }));
  }

  /* ---------- accueil ---------- */
  function ringSvg(pct) {
    const r = 34, c = 2 * Math.PI * r, off = c * (1 - pct / 100);
    return `<svg width="86" height="86" viewBox="0 0 86 86" role="img" aria-label="${pct}% terminé">
      <circle cx="43" cy="43" r="${r}" fill="none" stroke="rgba(255,255,255,.22)" stroke-width="8"/>
      <circle cx="43" cy="43" r="${r}" fill="none" stroke="#fff" stroke-width="8"
        stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${off}" transform="rotate(-90 43 43)"/>
      <text x="43" y="49" text-anchor="middle" fill="#fff" font-size="19" font-weight="800" font-family="inherit">${pct}%</text>
    </svg>`;
  }

  function openDashboard() {
    state.current = null;
    if (state.spy) { state.spy.disconnect(); state.spy = null; }
    $('#readProgress').style.width = '0%';
    const main = $('#content');
    const total = DATA.length;
    const readCount = state.read.size;
    const pct = total ? Math.round(100 * readCount / total) : 0;
    const doneChecks = Object.values(state.checks).filter(Boolean).length;

    const lastId = LS.get('last', null);
    const lastDoc = DATA.find(d => d.id === lastId);
    const nextUp = ORDERED.find(d => !state.read.has(d.id)) || ORDERED[0];

    const cards = ORDERED_DOMAINS.map((dom, i) => {
      const docs = dom.groups.flatMap(g => g.docs);
      const n = docs.filter(d => state.read.has(d.id)).length;
      const p = Math.round(100 * n / docs.length);
      return `<button class="path-card" data-d="${esc(dom.id)}">
        <div class="pc-num">${dom.icon} DOMAINE ${i + 1}${groupNum(dom.groups[0].key) ? ' · ' + esc(dom.groups.map(g => groupNum(g.key)).filter(Boolean)[0] || '') : ''}</div>
        <div class="pc-title">${esc(dom.label)}</div>
        <div class="pc-desc">${dom.groups.length} dossier${dom.groups.length > 1 ? 's' : ''} · ${docs.length} documents · ${n} lus</div>
        <div class="pc-bar"><span class="fill" style="width:${p}%"></span></div>
      </button>`;
    }).join('');

    main.innerHTML = `
      <div class="dash">
        <div class="dash-hero">
          <h1>Bon retour 👋</h1>
          <p>Formation juridique Maroc — ${total} documents · FR fait foi · chaque ✓ compte.</p>
        </div>
        <div class="learn-grid">
          <div class="hero-card">
            <div class="over">Progression globale</div>
            <div class="ring-row">
              ${ringSvg(pct)}
              <div class="stat-line">
                📚 <strong>${readCount}</strong> / ${total} documents lus<br>
                ✅ ${doneChecks} tâches cochées<br>
                🗂️ ${ORDERED_DOMAINS.length} domaines de savoir
              </div>
            </div>
            <div style="margin-top:16px">
              <button class="btn btn-primary" id="btnContinue">${lastDoc && state.read.size ? '▶ Reprendre' : '▶ Commencer'}</button>
            </div>
          </div>
          <div class="panel" style="margin-bottom:0">
            <h3>${lastDoc && state.read.size ? '⏯️ Reprendre où vous étiez' : '🎯 Premier pas recommandé'}</h3>
            <p style="font-size:14px;color:var(--text-dim);margin:0 0 6px">${esc(lastDoc && state.read.size ? lastDoc.title : nextUp.title)}</p>
            <p style="font-size:12.5px;color:var(--text-faint);margin:0 0 14px">${esc(docDomain(lastDoc && state.read.size ? lastDoc : nextUp).label)} · ~${Math.max(1, Math.round((lastDoc || nextUp).words / 180))} min de lecture</p>
            <button class="btn btn-primary" id="btnResumeGo">${lastDoc && state.read.size ? 'Ouvrir le document' : 'Démarrer le module'}</button>
          </div>
        </div>

        <div class="panel" style="margin-top:16px">
          <h3>🗺️ Les 8 domaines — dans l'ordre du curriculum</h3>
          <div class="path-cards">${cards}</div>
        </div>

        <div class="dash-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:16px">
          <div class="panel" style="margin:0">
            <h3>🎯 Objectif de revenus (Plan 90 jours)</h3>
            <div class="chart-canvas-wrap"><canvas id="dashRevenue"></canvas></div>
          </div>
          <div class="panel" style="margin:0">
            <h3>⚡ Répartition par domaine</h3>
            <div class="chart-canvas-wrap"><canvas id="dashDistribution"></canvas></div>
          </div>
        </div>
      </div>`;

    $('#btnContinue').addEventListener('click', () => openDoc(lastDoc && state.read.size ? lastDoc.id : nextUp.id));
    $('#btnResumeGo').addEventListener('click', () => openDoc(lastDoc && state.read.size ? lastDoc.id : nextUp.id));
    $$('.path-card', main).forEach(c => c.addEventListener('click', () => {
      const dom = ORDERED_DOMAINS.find(x => x.id === c.dataset.d);
      const all = dom.groups.flatMap(g => g.docs);
      openDoc(all.find(d => !state.read.has(d.id)) || all[0].id);
    }));

    const th = chartTheme();
    state.charts.push(new Chart($('#dashRevenue'), {
      type: 'line',
      data: { labels: ['Sem. 2', 'Sem. 6', 'Sem. 10', 'Sem. 13'], datasets: [{ label: 'CA mensuel (kDH)', data: [0, 12, 30, 50], backgroundColor: th.accent + '22', borderColor: th.accent, borderWidth: 2, fill: true, tension: .35, pointRadius: 5 }] },
      options: baseChartOpts('line', th, false)
    }));
    state.charts.push(new Chart($('#dashDistribution'), {
      type: 'doughnut',
      data: {
        labels: ORDERED_DOMAINS.map(d => d.label),
        datasets: [{ data: ORDERED_DOMAINS.map(d => d.groups.flatMap(g => g.docs).length), backgroundColor: ['#0f766e', '#155e75', '#b4552d', '#7a5aa8', '#3a7ca5', '#c98f2e', '#5f8a52', '#a34d77'], borderColor: th.ticks, borderWidth: 1 }]
      },
      options: baseChartOpts('doughnut', th, true)
    }));

    $('#crumbs').innerHTML = '<span class="cur">Accueil — votre formation</span>';
    highlightTree();
    updateReadBtn();
    window.scrollTo({ top: 0 });
  }

  /* ---------- actions topbar ---------- */
  function updateReadBtn() {
    const btn = $('#readBtn');
    if (!state.current) { btn.classList.remove('active'); btn.title = 'Marquer lu'; return; }
    const isRead = state.read.has(state.current);
    btn.classList.toggle('active', isRead);
    btn.title = isRead ? 'Marquer non lu' : 'Marquer lu';
  }

  function toggleRead() {
    if (!state.current) return;
    if (state.read.has(state.current)) state.read.delete(state.current);
    else state.read.add(state.current);
    LS.set('read', Array.from(state.read));
    state.autoReadDone = state.read.has(state.current);
    updateReadBtn();
    renderTree($('#searchInput').value.trim().toLowerCase());
  }

  function step(dir) {
    if (!state.current) { openDoc(ORDERED[0].id); return; }
    const i = ORDERED.findIndex(d => d.id === state.current);
    openDoc(ORDERED[(i + dir + ORDERED.length) % ORDERED.length].id);
  }

  /* ---------- thème & police ---------- */
  function applyTheme() {
    document.body.dataset.theme = THEMES[state.themeIdx];
    $('#themeBtn').textContent = document.body.dataset.theme === 'dark' ? '☀️' : (document.body.dataset.theme === 'light' ? '🌙' : '💻');
    state.charts.forEach(c => { try { c.destroy(); } catch {} });
    state.charts = [];
    if (state.current) {
      const doc = DATA.find(d => d.id === state.current);
      if (!doc) return;
      const { html, toc } = renderMarkdown(doc.content);
      const main = $('#content');
      const contentEl = $('.doc-content', main);
      if (!contentEl) { openDashboard(); return; }
      contentEl.innerHTML = html;
      bindContentEvents(contentEl);
      $$('.chart-box', main).forEach(renderChartBox);
      setupTableCharts(main);
      requestAnimationFrame(() => { onScroll(); mountSpy(toc); });
    } else {
      openDashboard();
    }
  }

  function applyFont() { document.body.dataset.font = state.font; }

  /* ---------- boot ---------- */
  function init() {
    state.themeIdx = Math.max(0, THEMES.indexOf(LS.get('theme', 'system')));
    applyTheme();
    applyFont();
    renderTree('');

    $('#menuBtn').addEventListener('click', () => document.body.classList.add('sidebar-open'));
    $('#sidebarClose').addEventListener('click', () => document.body.classList.remove('sidebar-open'));
    $('#scrim').addEventListener('click', () => document.body.classList.remove('sidebar-open'));
    const sInput = $('#searchInput');
    sInput.addEventListener('input', e => renderTree(e.target.value.trim().toLowerCase()));
    sInput.addEventListener('keydown', e => { if (e.key === 'Escape') { e.target.value = ''; renderTree(''); e.target.blur(); } });
    $('#readBtn').addEventListener('click', toggleRead);
    $('#prevBtn').addEventListener('click', () => step(-1));
    $('#nextBtn').addEventListener('click', () => step(1));
    $('#fontDec').addEventListener('click', () => { const o = ['sm', 'md', 'lg']; state.font = o[Math.max(0, o.indexOf(state.font) - 1)]; applyFont(); LS.set('font', state.font); });
    $('#fontInc').addEventListener('click', () => { const o = ['sm', 'md', 'lg']; state.font = o[Math.min(o.length - 1, o.indexOf(state.font) + 1)]; applyFont(); LS.set('font', state.font); });
    $('#themeBtn').addEventListener('click', () => {
      state.themeIdx = (state.themeIdx + 1) % THEMES.length;
      LS.set('theme', THEMES[state.themeIdx]);
      applyTheme();
    });

    document.addEventListener('keydown', e => {
      if (e.target.matches('input, textarea')) return;
      if (e.key === '/') { e.preventDefault(); sInput.focus(); }
      else if (e.key === '[') step(-1);
      else if (e.key === ']') step(1);
      else if (e.key.toLowerCase() === 'd') { $('#themeBtn').click(); }
      else if (e.key.toLowerCase() === 'l') toggleRead();
      else if (e.key === 'Escape') document.body.classList.remove('sidebar-open');
    });

    let throttled = false;
    window.addEventListener('scroll', () => {
      if (throttled) return;
      throttled = true;
      requestAnimationFrame(() => { onScroll(); throttled = false; });
    }, { passive: true });

    const last = LS.get('last', null);
    if (location.hash && DATA.some(d => d.id === decodeURIComponent(location.hash.slice(1)))) {
      openDoc(decodeURIComponent(location.hash.slice(1)));
    } else {
      openDashboard();
    }

    window.addEventListener('hashchange', () => {
      if (location.hash && DATA.some(d => d.id === decodeURIComponent(location.hash.slice(1)))) {
        openDoc(decodeURIComponent(location.hash.slice(1)));
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.Learn = { openDoc, openDashboard };
})();
