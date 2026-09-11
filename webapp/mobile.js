/* AVOCATO Mobile UX v6 — couche téléphone (≤ 680 px) :
   1. barre de navigation basse (Base / Cabinet) pilotée par les événements rendered ;
   2. tiroir latéral : gestes bord-gauche / balayage gauche, focus et fermeture ;
   3. tables du cabinet → fiches : attributs data-label dérivés du thead.
   Contrat : DESIGN.md § Mobile. Aucun impact > 680 px (la barre est masquée en CSS) ;
   le décor des tables est idempotent et inoffensif pour les tests JSDOM. */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function mode() {
    try { return (window.Cabinet && window.Cabinet.getMode && window.Cabinet.getMode()) || 'vault'; }
    catch (e) { return 'vault'; }
  }
  function lsGet(key, fb) {
    try { return window.AvocatoStore.LS.get(key, fb); } catch (e) { return fb; }
  }

  /* ---------------- tiroir latéral ---------------- */
  function openDrawer() {
    document.body.classList.add('sidebar-open');
    setTimeout(function () {
      var b = $('#sidebarClose');
      if (b) { try { b.focus(); } catch (e) { /* jsdom */ } }
    }, 80);
  }
  function closeDrawer(restoreFocus) {
    var wasOpen = document.body.classList.contains('sidebar-open');
    document.body.classList.remove('sidebar-open');
    if (wasOpen && restoreFocus !== false) {
      var m = $('#menuBtn');
      if (m) { try { m.focus(); } catch (e) { /* jsdom */ } }
    }
  }

  /* ---------------- barre basse ---------------- */
  var CAB_TABS = ['today', 'dossiers', 'calendrier', 'factures'];

  function vaultView() {
    var c = $('#content');
    return c && c.classList.contains('dash-mode') ? 'base' : 'doc';
  }
  function cabView() {
    var active = $('.cab-nav-item.active');
    if (active && active.dataset.view) return active.dataset.view;
    return lsGet('cabinetView', 'today');
  }

  function refreshTabs() {
    if (!document.body.dataset.mode) document.body.dataset.mode = mode();
    var isCab = mode() === 'cabinet';
    $$('#mobBar .mob-tab').forEach(function (b) {
      var active = false;
      if (b.dataset.mobView) active = isCab && cabView() === b.dataset.mobView;
      else if (b.dataset.mob === 'base') active = !isCab && vaultView() === 'base';
      else if (b.dataset.mob === 'cabinet') active = isCab;
      else if (b.dataset.mob === 'menu') active = isCab && CAB_TABS.indexOf(cabView()) === -1;
      b.classList.toggle('active', active);
      if (active) b.setAttribute('aria-current', 'page');
      else b.removeAttribute('aria-current');
    });
  }

  function wireTabs() {
    $$('#mobBar .mob-tab').forEach(function (b) {
      b.addEventListener('click', function () {
        if (b.dataset.mob === 'base') {
          if (mode() !== 'vault' && window.Cabinet) window.Cabinet.setMode('vault');
          if (window.App && window.App.openDashboard) window.App.openDashboard();
        } else if (b.dataset.mob === 'search') {
          if (window.Palette) window.Palette.open();
        } else if (b.dataset.mob === 'cabinet') {
          if (window.Cabinet) window.Cabinet.setMode('cabinet');
        } else if (b.dataset.mob === 'menu') {
          openDrawer();
        } else if (b.dataset.mobView && window.Cabinet) {
          window.Cabinet.goView(b.dataset.mobView);
        }
        refreshTabs();
      });
    });
  }

  /* ---------------- tables → fiches (data-label) ---------------- */
  var raf = null;
  function scheduleDecorate() {
    if (raf) return;
    if (window.requestAnimationFrame) {
      raf = window.requestAnimationFrame(function () { raf = null; decorate(); });
    } else {
      raf = setTimeout(function () { raf = null; decorate(); }, 30);
    }
  }

  function headerLabels(table) {
    var head = table.querySelector('thead tr');
    if (!head) return null;
    return Array.prototype.map.call(head.children, function (c) { return (c.textContent || '').trim(); });
  }

  function decorate() {
    var root = $('#content');
    if (!root || !root.querySelectorAll) return;
    $$('table.cab-table', root).forEach(function (table) {
      if (table.closest('dialog, #printArea, .keep-table')) return;
      var labels = headerLabels(table);
      if (!labels) return;
      var body = table.querySelector('tbody');
      if (!body) return;
      var any = false;
      $$('tr', body).forEach(function (tr) {
        Array.prototype.forEach.call(tr.children, function (cell, i) {
          if (cell.tagName !== 'TD') return;
          if (i >= labels.length) return;
          if (cell.getAttribute('data-label') !== labels[i]) cell.setAttribute('data-label', labels[i]);
          any = true;
        });
      });
      if (any) table.classList.add('mtable');
    });
  }

  var mo = null;
  function watch() {
    if (mo || !window.MutationObserver) return;
    var root = $('#content');
    if (!root) return;
    mo = new MutationObserver(function () { scheduleDecorate(); });
    mo.observe(root, { childList: true, subtree: true });
  }

  /* ---------------- gestes du tiroir ---------------- */
  var tStart = null;
  function wireGestures() {
    document.addEventListener('touchstart', function (e) {
      if (e.touches.length !== 1) { tStart = null; return; }
      var t = e.touches[0];
      var isOpen = document.body.classList.contains('sidebar-open');
      var inSidebar = e.target && e.target.closest && e.target.closest('.sidebar');
      if (!isOpen && t.clientX <= 24) tStart = { x: t.clientX, y: t.clientY, intent: 'open' };
      else if (isOpen && inSidebar) tStart = { x: t.clientX, y: t.clientY, intent: 'close' };
      else tStart = null;
    }, { passive: true });
    document.addEventListener('touchmove', function (e) {
      if (!tStart || !e.touches.length) return;
      var t = e.touches[0];
      var dx = t.clientX - tStart.x;
      var dy = t.clientY - tStart.y;
      if (Math.abs(dx) <= Math.abs(dy)) { tStart = null; return; }
      if (tStart.intent === 'open' && dx > 48) { openDrawer(); tStart = null; }
      else if (tStart.intent === 'close' && dx < -48) { closeDrawer(); tStart = null; }
    }, { passive: true });
    document.addEventListener('touchend', function () { tStart = null; }, { passive: true });
    document.addEventListener('touchcancel', function () { tStart = null; }, { passive: true });
  }

  function wireFocus() {
    var sm = $('#btnSearchMobile');
    if (sm) sm.addEventListener('click', function () { if (window.Palette) window.Palette.open(); });
    var mb = $('#menuBtn');
    if (mb) mb.addEventListener('click', function () {
      setTimeout(function () {
        var c = $('#sidebarClose');
        if (c) { try { c.focus(); } catch (e) { /* jsdom */ } }
      }, 80);
    });
    document.addEventListener('click', function (e) {
      var t = e.target;
      if (!t || !t.closest) return;
      if (t.closest('#scrim') || t.closest('#sidebarClose')) { closeDrawer(); return; }
      if (!document.body.classList.contains('sidebar-open')) return;
      if (t.closest('.tree-item') || t.closest('.cab-nav-item') || t.closest('.mode-btn') || t.closest('.sidebar-foot .btn')) closeDrawer();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('sidebar-open')) closeDrawer();
    });
  }

  /* ---------------- boot ---------------- */
  function init() {
    document.body.dataset.mode = mode();
    wireTabs();
    wireGestures();
    wireFocus();
    watch();
    decorate();
    refreshTabs();
    document.addEventListener('avocato:rendered', function () { scheduleDecorate(); refreshTabs(); });
    window.addEventListener('hashchange', refreshTabs);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.Mobile = { refresh: refreshTabs, decorate: decorate, openDrawer: openDrawer, closeDrawer: closeDrawer };
})();
