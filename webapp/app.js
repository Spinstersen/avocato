/* AVOCATO Base Reader — app logic (no dependencies except marked + Chart.js) */
(function () {
  'use strict';

  const DATA = window.VAULT_DATA || [];
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  var LS = window.AvocatoStore.LS;

  const state = {
    current: null,
    theme: LS.get('theme', 'light'),
    font: LS.get('font', 'md'),
    read: new Set(LS.get('read', [])),
    checks: LS.get('checks', {}),
    foldersOpen: LS.get('folders', {}),
    charts: []
  };

  const FOLDER_LABELS = {
    '00_START_HERE': 'Commencer ici',
    '01_Strategy': 'Stratégie',
    '02_Niches_Deep_Dive': 'Niches — Vues générales',
    '02_Niches_Deep_Dive/01_Freelancers_Agencies_Offshore': 'Niche 01 · Freelances & Agences offshore',
    '02_Niches_Deep_Dive/02_Ecommerce_Dropshipping_YouCan': 'Niche 02 · E-commerce & YouCan',
    '02_Niches_Deep_Dive/03_Loi_09-08_GDPR_Compliance': 'Niche 03 · Conformité 09-08 & GDPR',
    '02_Niches_Deep_Dive/04_Content_Creators_Infopreneurs': 'Niche 04 · Créateurs & Infopreneurs',
    '02_Niches_Deep_Dive/05_MRE_Foreign_Investors': 'Niche 05 · MRE & Investisseurs étrangers',
    '02_Niches_Deep_Dive/06_Autoentrepreneur_to_SARL_Scaling': 'Niche 06 · AE → SARL',
    '02_Niches_Deep_Dive/07_Propriete_Intellectuelle': 'Niche 07 · PI — Marques & BMDA',
    '02_Niches_Deep_Dive/08_Fiscalite_Internationale_Rapatriement': 'Niche 08 · Fiscalité internationale & Rapatriement',
    '02_Niches_Deep_Dive/09_Office_Changes_Dotation_IGOC': 'Niche 09 · Office des Changes & Dotations (IGOC)',
    '02_Niches_Deep_Dive/10_MRE_Entrepreneurs': 'Niche 10 · MRE Entrepreneurs',
    '02_Niches_Deep_Dive/11_Nomads_Digital': 'Niche 11 · Nomades digitaux',
    '03_Acquisition_Without_Ads': 'Acquisition sans pub',
    '04_Skills_To_Learn': 'Compétences',
    '04_Skills_To_Learn/00_Learning_Roadmap_2Week_Sprints': 'Skill 00 · Roadmap & sprints',
    '04_Skills_To_Learn/01_Legal_Tech_Stack': 'Skill 01 · Stack technique',
    '04_Skills_To_Learn/02_AI_For_Lawyers_Prompts': 'Skill 02 · IA & prompts',
    '04_Skills_To_Learn/03_Sales_Without_Selling': 'Skill 03 · Vendre sans vendre',
    '04_Skills_To_Learn/04_Design_Canva_For_Legal': 'Skill 04 · Design Canva',
    '04_Skills_To_Learn/05_Deontologie_IA_Secret': 'Skill 05 · Déontologie IA & secret',
    '04_Skills_To_Learn/06_French_Communication_With_Clients': 'Skill 06 · Communication clients (FR)',
    '04_Skills_To_Learn/07_Sharp_Legal_Mind': 'Skill 07 · Acuité juridique',
    '04_Skills_To_Learn/08_Livres_Cours_Recommandes': 'Skill 08 · Livres & cours',
    '04_Skills_To_Learn/09_SEO_Content_Engine': 'Skill 09 · SEO & content',
    '04_Skills_To_Learn/10_Public_Speaking_Ateliers': 'Skill 10 · Prises de parole',
    '04_Skills_To_Learn/11_Negotiation_Psychology': 'Skill 11 · Négociation',
    '04_Skills_To_Learn/12_Finance_Cabinet_OS': 'Skill 12 · Finance du cabinet',
    '04_Skills_To_Learn/13_Legal_Drafting_FR_EN': 'Skill 13 · Rédaction FR/EN',
    '04_Skills_To_Learn/14_Litigation_Basics': 'Skill 14 · Procédure (bases)',
    '04_Skills_To_Learn/15_Recherche_Juridique_Veille': 'Skill 15 · Recherche juridique & veille',
    '04_Skills_To_Learn/16_Client_Ops_Experience': 'Skill 16 · Expérience client (Ops)',
    '04_Skills_To_Learn/17_Operations_SOP_Scaling': 'Skill 17 · Opérations & SOP',
    '04_Skills_To_Learn/18_Intelligence_Emotionnelle_Desescalade': 'Skill 18 · Intelligence émotionnelle',
    '04_Skills_To_Learn/19_Structuration_Transfrontaliere': 'Skill 19 · Structuration internationale',
    '04_Skills_To_Learn/20_Compta_Pour_Avocat': 'Skill 20 · Compta pour avocat',
    '05_Document_Bank': 'Banque de Documents',
    '06_ADHD_System': 'Système ADHD',
    '07_90Day_Plan': 'Plan 90 jours',
    '08_Jurisprudence': 'Jurisprudence',
    '(root)': 'Racine'
  };
  const FOLDER_ORDER = Object.keys(FOLDER_LABELS);

  const COHORTS = [
    { key: 'start', label: 'Commencer ici', match: f => f === '00_START_HERE' },
    { key: 'niches', label: 'Niches', match: f => f.indexOf('02_Niches') === 0 },
    { key: 'skills', label: 'Compétences', match: f => f === '04_Skills_To_Learn' || f.indexOf('04_Skills_To_Learn/') === 0 },
    { key: 'strategie', label: 'Stratégie & Acquisition', match: f => /^(01|03|04)_/.test(f) },
    { key: 'pratique', label: 'Pratique du cabinet', match: f => /^(05|06|07|08)_/.test(f) || f === '(root)' }
  ];
  function cohortOf(folder) {
    const c = COHORTS.find(x => x.match(folder));
    return c ? c.key : 'pratique';
  }

  /* ---------- helpers ---------- */
  const esc = window.AvocatoCore.esc;
  function parseNum(s) {
    if (s == null) return NaN;
    let t = String(s).trim().replace(/\s/g, '').replace(/,/g, '.');
    const k = /k$/i.test(t); t = t.replace(/k$/i, '');
    t = t.replace(/[DH$dh%dh]/g, '');
    const n = parseFloat(t);
    return isNaN(n) ? NaN : (k ? n * 1000 : n);
  }
  function folderLabel(f) {
    if (FOLDER_LABELS[f]) return FOLDER_LABELS[f];
    const last = f.split('/').pop();
    return last.replace(/^\d+_/, '').replace(/_/g, ' ');
  }

  /* Téléphone (≤ 680 px) : le sommaire reste replié, les graphiques respirent */
  function isNarrow() {
    try { return !!(window.matchMedia && window.matchMedia('(max-width:680px)').matches); }
    catch (e) { return false; }
  }
  function notifyRendered(view, extra) {
    try { document.dispatchEvent(new CustomEvent('avocato:rendered', { detail: Object.assign({ view: view }, extra || {}) })); }
    catch (e) { /* custom events indisponibles ? silencieux */ }
  }

  /* ---------- markdown render ---------- */
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

  function renderMarkdown(src) {
    let html = marked.parse(src);
    const tmp = document.createElement('div');
    tmp.innerHTML = html;

    // heading ids + collect toc
    const toc = [];
    $$('h2, h3', tmp).forEach((h, i) => {
      const id = 'sec-' + i;
      h.id = id;
      toc.push({ tag: h.tagName, text: h.textContent.trim(), id });
    });

    // checkboxes interactive
    $$('input[type="checkbox"]', tmp).forEach((cb, i) => {
      cb.disabled = false;
      const key = (state.current || '') + '#' + i;
      if (state.checks[key]) cb.checked = true;
      cb.addEventListener('change', () => {
        state.checks[key] = cb.checked;
        LS.set('checks', state.checks);
        const li = cb.closest('li');
        if (li) li.classList.toggle('checked', cb.checked);
      });
    });

    // wrap tables
    $$('table', tmp).forEach((t) => {
      const wrap = document.createElement('div');
      wrap.className = 'table-scroll';
      t.parentNode.insertBefore(wrap, t);
      wrap.appendChild(t);
    });

    // internal links
    $$('a[href]', tmp).forEach((a) => {
      const href = a.getAttribute('href');
      if (href && href.endsWith('.md')) {
        a.addEventListener('click', (e) => { e.preventDefault(); openDoc(href); });
        a.classList.add('doc-link');
      } else if (href && href.endsWith('/')) {
        a.addEventListener('click', (e) => { e.preventDefault(); openDoc(href + '00_INDEX.md'); });
        a.classList.add('doc-link');
      }
    });

    const htmlOut = tmp.innerHTML;
    return { html: htmlOut, toc };
  }

  /* ---------- charts ---------- */
  if (window.Chart) {
    Chart.defaults.font.family = getComputedStyle(document.body).getPropertyValue('--font-body').trim() || '"Inter", sans-serif';
    Chart.defaults.font.size = 11.5;
    Chart.defaults.color = '#6f7b7e';
  }
  const CHART_COLORS = {
    light: { accent: '#0d535f', accent2: '#e0641f', grid: 'rgba(18,38,43,.12)', ticks: '#6f7b7e' },
    dark: { accent: '#d3b578', accent2: '#e0641f', grid: 'rgba(197,164,106,.15)', ticks: '#9a958a' }
  };

  function parseCsvData(raw) {
    const lines = raw.trim().split('\n').map(l => l.trim()).filter(Boolean);
    if (!lines.length) return null;
    const rows = lines.map(l => l.split(',').map(c => c.trim()));
    const firstNumeric = !isNaN(parseNum(rows[0][1] || ''));
    const labels = rows.map(r => r[0]);
    const headers = firstNumeric ? null : rows[0];
    const dataRows = firstNumeric ? rows : rows.slice(1);
    const series = [];
    if (headers) {
      headers.slice(1).forEach((h, si) => {
        series.push({ label: h, data: dataRows.map(r => parseNum(r[si + 1])) });
      });
    } else {
      series.push({ label: 'Valeur', data: dataRows.map(r => parseNum(r[1])) });
    }
    const label = firstNumeric ? 'Valeur' : rows[0][0];
    return { labels, series, label };
  }

  function chartTheme() {
    const fb = CHART_COLORS[state.theme === 'dark' ? 'dark' : 'light'];
    const fbSeq = state.theme === 'dark'
      ? [fb.accent, fb.accent2, '#c5a46a', '#e0a44f', '#e08a95', '#7fd09a', '#7fb3bd', '#9a958a']
      : [fb.accent, fb.accent2, '#a98a4b', '#9a5b12', '#7f2d3a', '#2e6b46', '#12707e', '#6f7b7e'];
    try {
      const cs = getComputedStyle(document.body);
      const g = (n, f) => (cs.getPropertyValue(n) || '').trim() || f;
      const seq = [1, 2, 3, 4, 5, 6, 7, 8].map(i => g('--chart-' + i, fbSeq[i - 1]));
      return { accent: seq[0], accent2: seq[1], grid: fb.grid, ticks: g('--text-dim', fb.ticks), seq };
    } catch (e) { return Object.assign({ seq: fbSeq }, fb); }
  }

  function renderChartBox(box) {
    const type = box.dataset.ctype || 'bar';
    const data = parseCsvData(decodeURIComponent(box.dataset.cdata));
    if (!data) { box.innerHTML = '<p class="chart-title">' + ico('x') + ' Données de graphique invalides</p>'; return; }
    const th = chartTheme();
    const wrap = document.createElement('div');
    wrap.className = 'chart-canvas-wrap';
    wrap.setAttribute('role', 'img');
    wrap.setAttribute('aria-label', 'Graphique ' + type + ' : ' + data.series.map(s => s.label).join(', ') + ' — ' + data.labels.length + ' points');
    const canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    wrap.appendChild(canvas);
    box.innerHTML = '';
    box.appendChild(wrap);
    const details = document.createElement('details');
    details.className = 'chart-data';
    details.innerHTML = '<summary>Données du graphique</summary><table><thead><tr><th></th>' +
      data.series.map(s => '<th>' + esc(s.label) + '</th>').join('') + '</tr></thead><tbody>' +
      data.labels.map((l, i) => '<tr><th>' + esc(l) + '</th>' + data.series.map(s => '<td class="mono">' + (isNaN(s.data[i]) ? '' : s.data[i]) + '</td>').join('') + '</tr>').join('') +
      '</tbody></table>';
    box.appendChild(details);

    const palette = th.seq.slice(0, 5);
    const chart = new Chart(canvas, {
      type: type,
      data: {
        labels: data.labels,
        datasets: data.series.map((s, i) => ({
          label: s.label, data: s.data,
          backgroundColor: type === 'doughnut' ? palette.slice(0, s.data.length) : (type === 'line' ? 'transparent' : th.accent + 'cc'),
          borderColor: type === 'doughnut' ? palette.slice(0, s.data.length) : th.accent,
          borderWidth: 2, tension: 0.35, pointRadius: 4
        }))
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: data.series.length > 1, labels: { color: th.ticks } } },
        scales: (type === 'doughnut' || type === 'polarArea') ? undefined : {
          x: { ticks: { color: th.ticks }, grid: { color: th.grid } },
          y: { beginAtZero: true, ticks: { color: th.ticks }, grid: { color: th.grid } }
        }
      }
    });
    state.charts.push(chart);
  }

  function analyzeTableForChart(table) {
    const rows = $$('tr', table);
    if (rows.length < 3) return null;
    const headers = $$('th, td', rows[0]).map(c => c.textContent.trim());
    const body = rows.slice(1).map(r => $$('td, th', r).map(c => c.textContent.trim()));
    const colCount = headers.length;
    if (colCount < 2) return null;
    // find numeric columns (2nd col onwards)
    let bestCol = -1, bestScore = 0;
    for (let c = 1; c < colCount; c++) {
      const vals = body.map(r => r[c] || '').filter(v => v && v !== '');
      if (!vals.length) continue;
      const numeric = vals.filter(v => !isNaN(parseNum(v)));
      const score = numeric.length / vals.length;
      if (score > 0.7 && numeric.length >= 3 && score > bestScore) { bestScore = score; bestCol = c; }
    }
    if (bestCol < 0) return null;
    const labels = body.map(r => (r[0] || '').slice(0, 28));
    const values = body.map(r => parseNum(r[bestCol] || ''));
    const valid = labels.filter((_, i) => !isNaN(values[i]));
    if (valid.length < 3) return null;
    return { labels, values, header: headers[bestCol] };
  }

  function setupTableCharts(container) {
    $$('table', container).forEach((table) => {
      const info = analyzeTableForChart(table);
      if (!info) return;
      const btn = document.createElement('button');
      btn.className = 'chart-toggle';
      btn.innerHTML = ico('chart') + ' Voir en graphique';
      const chartEl = document.createElement('div');
      chartEl.className = 'chart-box';
      chartEl.style.display = 'none';
      const wrap = document.createElement('div');
      wrap.className = 'chart-canvas-wrap';
      wrap.setAttribute('role', 'img');
      wrap.setAttribute('aria-label', 'Graphique : ' + info.header + ' — ' + info.labels.length + ' lignes');
      chartEl.appendChild(wrap);
      table.parentNode.insertBefore(btn, table.nextSibling);
      table.parentNode.insertBefore(chartEl, btn.nextSibling);

      let chart = null;
      btn.addEventListener('click', () => {
        if (chartEl.style.display === 'none') {
          chartEl.style.display = '';
          btn.innerHTML = ico('table') + ' Voir le tableau';
          if (!chart) {
            const th = chartTheme();
            const canvas = document.createElement('canvas');
            wrap.appendChild(canvas);
            chart = new Chart(canvas, {
              type: 'bar',
              data: {
                labels: info.labels,
                datasets: [{
                  label: info.header, data: info.values,
                  backgroundColor: th.accent + 'cc', borderColor: th.accent, borderWidth: 1
                }]
              },
              options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  x: { ticks: { color: th.ticks }, grid: { color: th.grid } },
                  y: { beginAtZero: true, ticks: { color: th.ticks }, grid: { color: th.grid } }
                }
              }
            });
            state.charts.push(chart);
          }
        } else {
          chartEl.style.display = 'none';
          btn.innerHTML = ico('chart') + ' Voir en graphique';
        }
      });
    });
  }

  /* ---------- document rendering ---------- */
  const DOC_HINTS = {
    '00_START_HERE/00_READ_ME_FIRST.md': 'Commencez ici — 5 minutes',
    '07_90Day_Plan/00_Overview.md': 'Vue d\'ensemble du plan',
    '01_Strategy/03_Unsaturated_Niches_Overview/00_INDEX.md': 'Choisir une niche'
  };

  function destroyCharts() {
    state.charts.forEach(c => { try { c.destroy(); } catch (e) { console.warn('avocato', e); } });
    state.charts = [];
  }

  function openDoc(id) {
    const doc = DATA.find(d => d.id === id);
    if (!doc) return;
    destroyCharts();
    state.current = id;
    const main = $('#content');
    main.classList.remove('dash-mode');
    const { html, toc } = renderMarkdown(doc.content);

    const tocHtml = toc.length > 1
      ? `<details class="toc" ${(toc.length <= 4 && !isNarrow()) ? 'open' : ''}><summary>Sommaire (${toc.length})</summary><ul>` +
        toc.map(t => `<li class="lvl-${t.tag}"><a href="#${t.id}">${esc(t.text)}</a></li>`).join('') +
        `</ul></details>` : '';

    const hint = DOC_HINTS[id] ? `<div class="doc-meta"><span class="pill folder">${esc(DOC_HINTS[id])}</span></div>` : '';

    main.innerHTML = `
      <article class="doc" data-id="${esc(id)}">
        ${hint}
        ${tocHtml}
        <div class="doc-content">${html}</div>
      </article>`;

    // meta line
    const meta = document.createElement('div');
    meta.className = 'doc-meta';
    meta.innerHTML = `
      <span class="pill folder">${esc(folderLabel(doc.folder))}</span>
      <span class="pill">${doc.words} mots · ${Math.max(1, Math.round(doc.words / 180))} min</span>
      <span class="pill">${doc.file}</span>`;
    const article = $('.doc', main);
    article.insertBefore(meta, $('.toc, .doc-content', article) || null);

    // auto charts from fences
    $$('.chart-box', main).forEach(renderChartBox);
    setupTableCharts(main);

    updateCrumbs(doc);
    highlightTree();
    updateReadBtn();
    if (location.hash !== '#' + encodeURIComponent(id)) {
      try { history.replaceState(null, '', '#' + encodeURIComponent(id)); } catch (e) { console.warn('avocato', e); }
    }
    window.scrollTo({ top: 0 });
    LS.set('last', id);
    updateResumeChip();
    notifyRendered('base-doc', { id });
  }

  function updateCrumbs(doc) {
    $('#crumbs').innerHTML = `${esc(folderLabel(doc.folder))} <span aria-hidden="true">/</span> <span class="cur">${esc(doc.title)}</span>`;
  }

  /* ---------- tree ---------- */
  function docProgress(id) { return state.read.has(id) ? 1 : 0; }

  function getGroupKey(d) {
    const parts = d.id.split('/');
    if (parts.length > 2 && (parts[0] === '02_Niches_Deep_Dive' || parts[0] === '04_Skills_To_Learn')) return parts.slice(0, 2).join('/');
    return d.folder;
  }
  function folderIsOpen(folder, filter) {
    if (filter) return true;
    if (state.foldersOpen[folder] !== undefined) return !!state.foldersOpen[folder];
    return cohortOf(folder) === 'start';
  }

  function renderTree(filter) {
    const tree = $('#tree');
    if (filter && DATA.length && DATA[0]._lc === undefined) {
      DATA.forEach(d => { d._lc = (d.title + ' ' + d.file).toLowerCase(); d._lcC = d.content.toLowerCase(); });
    }
    const groups = {};
    DATA.forEach(d => { const g = getGroupKey(d); (groups[g] = groups[g] || []).push(d); });
    const folders = Object.keys(groups).sort((a, b) => {
      const ca = COHORTS.findIndex(x => x.match(a)), cb = COHORTS.findIndex(x => x.match(b));
      if (ca !== cb) return (ca === -1 ? 99 : ca) - (cb === -1 ? 99 : cb);
      const ia = FOLDER_ORDER.indexOf(a), ib = FOLDER_ORDER.indexOf(b);
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    });

    let html = '';
    let lastCohort = null;
    let collapsedCount = 0;
    folders.forEach(folder => {
      const items = groups[folder].filter(d =>
        !filter ||
        d._lc.includes(filter) ||
        d._lcC.includes(filter)
      );
      if (filter && !items.length) return;
      const cohort = cohortOf(folder);
      if (!filter && cohort !== lastCohort) {
        lastCohort = cohort;
        const cl = (COHORTS.find(c => c.key === cohort) || {}).label || '';
        html += `<div class="tree-cohort">${esc(cl)}</div>`;
      }
      const total = groups[folder].length;
      const readCount = groups[folder].filter(d => state.read.has(d.id)).length;
      const isOpen = folderIsOpen(folder, filter);
      if (!isOpen) collapsedCount++;
      const pct = total ? Math.round(100 * readCount / total) : 0;

      html += `<div class="tree-section">
        <button class="tree-folder ${isOpen ? 'open' : ''}" data-folder="${esc(folder)}" aria-expanded="${isOpen}">
          <span class="caret" aria-hidden="true"></span><span>${esc(folderLabel(folder))}</span>
          <span class="folder-meta">${readCount}/${total}</span>
          <span class="progress-mini"><span class="bar"><span class="fill" style="width:${pct}%"></span></span></span>
        </button>
        <div class="tree-items" style="display:${isOpen ? '' : 'none'}">
          ${items.map(d => `
            <button class="tree-item ${state.read.has(d.id) ? 'read' : ''} ${state.current === d.id ? 'active' : ''}" data-id="${esc(d.id)}"${state.current === d.id ? ' aria-current="page"' : ''}>
              <span class="read-dot" aria-hidden="true"></span>
              <span class="fname">${esc(d.title)}</span>
            </button>`).join('')}
        </div>
      </div>`;
    });
    if (!filter && collapsedCount > 0) {
      html += `<button class="tree-expand" id="treeExpandAll">Voir tout (${DATA.length} documents)</button>`;
    }
    tree.innerHTML = html || '<div class="empty-state">Aucun résultat</div>';

    $$('.tree-folder', tree).forEach(btn => btn.addEventListener('click', () => {
      const f = btn.dataset.folder;
      const open = !btn.classList.contains('open');
      state.foldersOpen[f] = open;
      LS.set('folders', state.foldersOpen);
      btn.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
      const items = btn.nextElementSibling;
      items.style.display = open ? '' : 'none';
      if (!$$('.tree-folder:not(.open)', tree).length && $('#treeExpandAll', tree)) $('#treeExpandAll', tree).hidden = true;
    }));
    $$('.tree-item', tree).forEach(btn => btn.addEventListener('click', () => {
      openDoc(btn.dataset.id);
      document.body.classList.remove('sidebar-open');
    }));
    const exp = $('#treeExpandAll', tree);
    if (exp) exp.addEventListener('click', () => {
      Object.keys(groups).forEach(f => { state.foldersOpen[f] = true; });
      LS.set('folders', state.foldersOpen);
      renderTree('');
    });
  }

  function updateResumeChip() {
    const chip = $('#resumeChip');
    if (!chip) return;
    const last = LS.get('last', null);
    const doc = last ? DATA.find(d => d.id === last) : null;
    if (!doc || (window.Cabinet && window.Cabinet.getMode && window.Cabinet.getMode() === 'cabinet')) { chip.hidden = true; return; }
    const pct = DATA.length ? Math.round(100 * state.read.size / DATA.length) : 0;
    $('#resumeName', chip).textContent = doc.file;
    $('#resumePct', chip).textContent = pct + '% lu';
    chip.hidden = false;
  }

  function highlightTree() {
    $$('.tree-item').forEach(b => b.classList.toggle('active', b.dataset.id === state.current));
  }

  /* ---------- dashboard ---------- */
  function openDashboard() {
    state.current = null;
    destroyCharts();
    const main = $('#content');
    main.classList.add('dash-mode');
    const total = DATA.length;
    const readCount = state.read.size;
    const pct = total ? Math.round(100 * readCount / total) : 0;
    const totalChecks = Object.keys(state.checks).length;
    const doneChecks = Object.values(state.checks).filter(Boolean).length;

    const groups = {};
    DATA.forEach(d => { const g = getGroupKey(d); (groups[g] = groups[g] || []).push(d); });
    const progressRows = Object.keys(groups)
      .sort((a, b) => (FOLDER_ORDER.indexOf(a) - FOLDER_ORDER.indexOf(b)))
      .map(f => {
        const g = groups[f];
        const n = g.filter(d => state.read.has(d.id)).length;
        const p = Math.round(100 * n / g.length);
        return `<div class="dash-progress-row">
          <div class="pl"><span>${esc(folderLabel(f))}</span><span>${n}/${g.length}</span></div>
          <div class="bar"><div class="fill" style="width:${p}%"></div></div>
        </div>`;
      }).join('');

    const quick = [
      '00_START_HERE/00_READ_ME_FIRST.md',
      '00_START_HERE/01_ADHD_QuickStart_Today.md',
      '01_Strategy/03_Unsaturated_Niches_Overview/00_INDEX.md',
      '02_Niches_Deep_Dive/01_Freelancers_Agencies_Offshore/00_INDEX.md',
      '03_Acquisition_Without_Ads/03_Partnerships_Comptables_Fiduciaires/00_INDEX.md',
      '07_90Day_Plan/00_Overview.md',
      '07_90Day_Plan/01_Phase1_Foundation_Weeks1-2.md',
      '06_ADHD_System/01_Daily_Operating_System.md'
    ].map(id => { const d = DATA.find(x => x.id === id); return d ? `<button class="btn" data-id="${esc(id)}">${esc(d.title)}</button>` : ''; }).join('');

    main.innerHTML = `
      <div class="dash">
        <div class="dash-hero">
          <h1>Tableau de bord AVOCATO</h1>
          <p>Votre Base client sans publicité, présenté proprement. Avancez à votre rythme — chaque ✓ compte.</p>
        </div>
        <div class="dash-cards">
          <div class="dash-card"><div class="num">${total}</div><div class="lbl">Documents</div></div>
          <div class="dash-card"><div class="num">${Object.keys(groups).length}</div><div class="lbl">Rubriques</div></div>
          <div class="dash-card"><div class="num">${readCount}</div><div class="lbl">Lus (${pct}%)</div></div>
          <div class="dash-card"><div class="num">${doneChecks}</div><div class="lbl">✓ Tâches cochées (${totalChecks})</div></div>
        </div>
        <div class="dash-grid">
          <div class="dash-panel">
            <h3>${ico('bolt')} Objectif de revenus (Plan 90 jours)</h3>
            <div class="chart-canvas-wrap" style="height:220px"><canvas id="dashRevenue"></canvas></div>
          </div>
          <div class="dash-panel">
            <h3>${ico('gauge')} Répartition du contenu</h3>
            <div class="chart-canvas-wrap" style="height:220px"><canvas id="dashDistribution"></canvas></div>
          </div>
        </div>
        <div class="dash-panel" style="margin-bottom:16px">
          <h3>${ico('book')} Progression par rubrique</h3>
          <div class="dash-progress">${progressRows}</div>
        </div>
        <div class="dash-panel">
          <h3>${ico('bolt')} Démarrage rapide</h3>
          <div class="dash-quick">${quick}</div>
        </div>
      </div>`;

    $$('.dash-quick .btn', main).forEach(b => b.addEventListener('click', () => openDoc(b.dataset.id)));

    // dashboard charts
    const th = chartTheme();
    const revenue = new Chart($('#dashRevenue'), {
      type: 'line',
      data: {
        labels: ['Sem. 2', 'Sem. 6', 'Sem. 10', 'Sem. 13'],
        datasets: [{
          label: 'CA mensuel (kDH)', data: [0, 12, 30, 50],
          backgroundColor: th.accent + '22', borderColor: th.accent, borderWidth: 2,
          fill: true, tension: 0.35, pointRadius: 5
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: th.ticks }, grid: { color: th.grid } },
          y: { beginAtZero: true, ticks: { color: th.ticks }, grid: { color: th.grid } }
        }
      }
    });
    const distribution = new Chart($('#dashDistribution'), {
      type: 'doughnut',
      data: {
        labels: Object.keys(groups).map(folderLabel),
        datasets: [{
          data: Object.keys(groups).map(f => groups[f].length),
          backgroundColor: th.seq,
          borderColor: th.ticks, borderWidth: 1
        }]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: isNarrow() ? 'bottom' : 'right', labels: { color: th.ticks, font: { size: 11 } } } } }
    });
    state.charts.push(revenue, distribution);

    $('#crumbs').innerHTML = '<span class="cur">Tableau de bord</span>';
    highlightTree();
    updateReadBtn();
    window.scrollTo({ top: 0 });
    notifyRendered('base-dashboard');
  }

  /* ---------- topbar actions ---------- */
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
    updateReadBtn();
    updateResumeChip();
    renderTree($('#searchInput').value.trim().toLowerCase());
  }

  function nextPrev(dir) {
    if (!state.current) return;
    const i = DATA.findIndex(d => d.id === state.current);
    const j = (i + dir + DATA.length) % DATA.length;
    openDoc(DATA[j].id);
  }

  /* ---------- theme & font ---------- */
  function applyTheme() {
    document.body.dataset.theme = state.theme;
    document.body.classList.toggle('dark', state.theme === 'dark');
    const meta = $('#metaThemeColor') || document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', state.theme === 'dark' ? '#070e1c' : '#fbfaf7');
    $('#themeBtn').innerHTML = window.ico(state.theme === 'dark' ? 'sun' : 'moon');
    destroyCharts();
    if (state.current) {
      const main = $('#content');
      const { html, toc } = renderMarkdown(DATA.find(d => d.id === state.current).content);
      const article = $('.doc', main);
      if (article) {
        const contentEl = $('.doc-content', article);
        contentEl.innerHTML = html;
        const tocEl = $('.toc', article);
        if (toc.length > 1 && !tocEl) {
          const d = document.createElement('details');
          d.className = 'toc';
          if (toc.length <= 4 && !isNarrow()) d.open = true;
          d.innerHTML = `<summary>Sommaire (${toc.length})</summary><ul>` + toc.map(t => `<li class="lvl-${t.tag}"><a href="#${t.id}">${esc(t.text)}</a></li>`).join('') + '</ul>';
          article.insertBefore(d, contentEl);
        }
        $$('.chart-box', contentEl).forEach(renderChartBox);
        setupTableCharts(contentEl);
      }
    } else {
      openDashboard();
    }
  }

  function applyFont() {
    document.body.dataset.font = state.font;
    const levels = { sm: 'petite', md: 'normale', lg: 'grande' };
    const status = $('#fontStatus');
    if (status) status.textContent = 'Taille du texte des documents : ' + levels[state.font];
    const dec = $('#fontDec');
    const inc = $('#fontInc');
    if (dec) dec.disabled = state.font === 'sm';
    if (inc) inc.disabled = state.font === 'lg';
  }

  /* ---------- search ---------- */
  let searchTimer = null;
  function onSearch(q) {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      if (window.Cabinet && window.Cabinet.getMode && window.Cabinet.getMode() === 'cabinet') return;
      renderTree(q.trim().toLowerCase());
    }, 120);
  }

  /* ---------- boot ---------- */
  function init() {
    /* Icônes gravées : hydrate les emplacements data-ico (nav, mode switch) */
    $$('[data-ico]').forEach((el) => { if (!el.firstChild) el.innerHTML = window.ico(el.getAttribute('data-ico')); });
    applyTheme();
    applyFont();
    renderTree('');
    updateResumeChip();
    $('#resumeBtn').addEventListener('click', () => {
      const last = LS.get('last', null);
      if (last && DATA.some(d => d.id === last)) openDoc(last);
    });
    $('#menuBtn').addEventListener('click', () => document.body.classList.add('sidebar-open'));
    $('#sidebarClose').addEventListener('click', () => document.body.classList.remove('sidebar-open'));
    $('#scrim').addEventListener('click', () => document.body.classList.remove('sidebar-open'));
    $('#searchInput').addEventListener('input', e => onSearch(e.target.value));
    $('#searchInput').addEventListener('keydown', e => { if (e.key === 'Escape') { e.target.value = ''; onSearch(''); e.target.blur(); } });
    $('#readBtn').addEventListener('click', toggleRead);
    $('#prevBtn').addEventListener('click', () => nextPrev(-1));
    $('#nextBtn').addEventListener('click', () => nextPrev(1));
    $('#fontDec').addEventListener('click', () => { const o = ['sm', 'md', 'lg']; state.font = o[Math.max(0, o.indexOf(state.font) - 1)]; applyFont(); LS.set('font', state.font); });
    $('#fontInc').addEventListener('click', () => { const o = ['sm', 'md', 'lg']; state.font = o[Math.min(o.length - 1, o.indexOf(state.font) + 1)]; applyFont(); LS.set('font', state.font); });
    $('#themeBtn').addEventListener('click', () => { state.theme = state.theme === 'dark' ? 'light' : 'dark'; LS.set('theme', state.theme); applyTheme(); });
    /* Topbar mobile : options (A−/A+/thème) repliées derrière "⋯" */
    const moreBtn = $('#topbarMore');
    if (moreBtn) {
      const closeMore = () => { document.body.classList.remove('topbar-more-open'); moreBtn.setAttribute('aria-expanded', 'false'); };
      moreBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const open = document.body.classList.toggle('topbar-more-open');
        moreBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      document.addEventListener('click', (e) => {
        if (!document.body.classList.contains('topbar-more-open')) return;
        if (e.target.closest('#topbarOpts, #topbarMore')) return;
        closeMore();
      });
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMore(); });
    }
    $('#btnDashboard').addEventListener('click', () => { openDashboard(); document.body.classList.remove('sidebar-open'); });
    const helpDlg = $('#dlgHelp');
    const openHelp = () => { if (helpDlg && !helpDlg.open) { helpDlg.showModal(); const c = $('#btnCloseHelp'); if (c) c.focus(); } };
    const helpBtn = $('#btnHelp');
    if (helpBtn) helpBtn.addEventListener('click', openHelp);
    const helpClose = $('#btnCloseHelp');
    if (helpClose) helpClose.addEventListener('click', () => { if (helpDlg && helpDlg.open) helpDlg.close(); });

    document.addEventListener('keydown', (e) => {
      if (e.target.matches('input, textarea, select')) return;
      if (e.key === '?') { e.preventDefault(); openHelp(); }
      else if (e.key === '/') { e.preventDefault(); $('#searchInput').focus(); }
      else if (e.key === '[') nextPrev(-1);
      else if (e.key === ']') nextPrev(1);
      else if (e.key.toLowerCase() === 'd') { state.theme = state.theme === 'dark' ? 'light' : 'dark'; LS.set('theme', state.theme); applyTheme(); }
      else if (e.key === 'Escape') { if (document.querySelector('dialog[open]')) return; document.body.classList.remove('sidebar-open'); }
    });

    const last = LS.get('last', null);
    if (location.hash && DATA.some(d => d.id === decodeURIComponent(location.hash.slice(1)))) {
      openDoc(decodeURIComponent(location.hash.slice(1)));
    } else if (last && DATA.some(d => d.id === last)) {
      openDoc(last);
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

  window.App = { renderTree, openDoc, openDashboard };
})();