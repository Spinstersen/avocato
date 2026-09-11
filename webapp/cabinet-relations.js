/* AVOCATO Relations -- Phase E (SUIVI_AUDIENCES_PLAN.md).
   Vue Clients + vue Finances + O1 relances + O2 frais-dans-solde + O3 lettre/PV + O6 sauvegarde.
   Offline-first, localStorage only. Se greffe sur window.Cabinet / Features / Cour.
   Nouvelles cles additives : clients, finPeriod, alertMutes-like backupNag.
   Statuts exacts respectes (regle dure) : 'À venir', 'Émise'/'Encaissée', 'Livré - solde dû',
   'Reçu provision'/'Facture solde', 'À facturer'/'Facturé', 'Convention signée', 'Clôturé'. */
(function () {
  'use strict';

  var LS = window.AvocatoStore.LS;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.from((r || document).querySelectorAll(s)); };
  var { esc, uid, pad, toISODate, todayISO, addDaysISO, diffDays, fmtMoney, fmtDate, calcTTC, provPct, normalize } = window.AvocatoCore;
  function toast(m, o) { if (window.Cabinet && window.Cabinet.toast) window.Cabinet.toast(m, o); }
  function dossiers() { return LS.arr('dossiers'); }
  function factures() { return LS.arr('factures'); }
  function echeances() { return LS.arr('echeances'); }
  function audiences() { return LS.arr('audiences'); }
  function fraisList() { return LS.arr('frais'); }
  function transitions() { return LS.arr('transitions'); }
  function dossierOf(id) { return dossiers().find(function (x) { return x.id === id; }); }
  function plaque() {
    try { return JSON.parse(localStorage.getItem('avocato:plaque') || '{}') || {}; } catch (e) { return {}; }
  }
  function nextNumLocal(prefix, list) {
    var year = new Date().getFullYear();
    var re = new RegExp('^' + prefix + '-' + year + '-(\\d+)$');
    var seqKey = 'numSeq:' + prefix + ':' + year;
    var max = Number(LS.get(seqKey, 0)) || 0;
    (list || []).forEach(function (it) { var m = re.exec(it.num || ''); if (m) max = Math.max(max, parseInt(m[1], 10)); });
    var n = max + 1;
    LS.set(seqKey, n);
    return prefix + '-' + year + '-' + String(n).padStart(3, '0');
  }
  /* LM/PV persistés : un document par (dossier, type). Le numéro est créé une
     seule fois, puis réutilisé à chaque réimpression. */
  function letters() { return LS.arr('letters'); }
  function ensureLetter(dossierId, type) {
    var arr = letters();
    var existing = arr.find(function (x) { return x.dossierId === dossierId && x.type === type; });
    if (existing) return existing;
    var rec = { id: uid(), type: type, num: nextNumLocal(type, arr), dossierId: dossierId, date: todayISO(), createdAt: new Date().toISOString() };
    arr.push(rec);
    LS.set('letters', arr);
    return rec;
  }

  /* ================= CLIENTS ================= */
  function groupClients() {
    var groups = {};
    dossiers().forEach(function (d) {
      var key = normalize(d.client) || 'sans-nom';
      if (!groups[key]) groups[key] = { key: key, label: d.client || '—', dossiers: [] };
      groups[key].dossiers.push(d);
    });
    var facts = factures();
    return Object.keys(groups).map(function (key) {
      var g = groups[key];
      var ids = g.dossiers.map(function (d) { return d.id; });
      var ff = facts.filter(function (f) { return ids.indexOf(f.dossierId) !== -1; });
      var facture = ff.reduce(function (s, f) { return s + (Number(f.ttc) || 0); }, 0);
      var encaisse = ff.filter(function (f) { return f.statut === 'Encaissée'; }).reduce(function (s, f) { return s + (Number(f.ttc) || 0); }, 0);
      var auds = audiences().filter(function (a) {
        return ids.indexOf(a.dossierId) !== -1 && (a.etat === 'À venir' || a.etat === 'Reportée') && a.date >= todayISO();
      }).sort(function (a, b) { return (a.date + (a.heure || '')).localeCompare(b.date + (b.heure || '')); });
      return {
        key: key, label: g.label, dossiers: g.dossiers,
        nDossiers: g.dossiers.length, facture: facture, encaisse: encaisse, soldeDu: facture - encaisse,
        nextAudience: auds[0] || null, nAudiences: auds.length
      };
    }).sort(function (a, b) { return a.label.localeCompare(b.label, 'fr'); });
  }
  function getContact(key) {
    return (LS.get('clients', []) || []).find(function (c) { return c.name_norm === key; }) || null;
  }
  function saveContact(obj) {
    var arr = LS.get('clients', []) || [];
    obj.updatedAt = new Date().toISOString();
    var i = arr.findIndex(function (c) { return c.name_norm === obj.name_norm; });
    if (i >= 0) arr[i] = Object.assign({}, arr[i], obj);
    else { obj.id = obj.id || uid(); obj.createdAt = obj.updatedAt; arr.push(obj); }
    LS.set('clients', arr);
    return obj;
  }
  function renderClients() {
    var content = $('#content');
    if (!content) return;
    var groups = groupClients();
    var totF = groups.reduce(function (s, g) { return s + g.facture; }, 0);
    var totE = groups.reduce(function (s, g) { return s + g.encaisse; }, 0);
    content.innerHTML =
      '<div class="cab"><div class="kicker">Tiers — facturé · encaissé · dû</div><h2>Clients</h2>' +
      '<p class="sub">' + groups.length + ' client(s) — regroupés par nom normalisé (insensible accents/casse) — ' +
      'facturé ' + fmtMoney(totF) + ' · encaissé ' + fmtMoney(totE) + ' · solde dû ' + fmtMoney(totF - totE) + '.</p>' +
      '<div class="cab-toolbar"><input id="clientSearch" placeholder="Rechercher client..." style="flex:1;min-width:180px"></div>' +
      '<div class="cab-table-wrap"><table class="cab-table"><thead><tr><th>Client</th><th>Dossiers</th><th>Facturé</th><th>Encaissé</th><th>Solde dû</th><th>Prochaine audience</th><th></th></tr></thead><tbody id="clientsBody">' +
      groups.map(function (g) {
        var c = getContact(g.key);
        return '<tr data-ckey="' + esc(g.key) + '"><td><span class="cell-title">' + esc(g.label) + '</span>' +
          (c && (c.tel || c.email) ? '<span class="cell-sub">' + esc([c.tel, c.email].filter(Boolean).join(' · ')) + '</span>' : '') + '</td>' +
          '<td class="mono">' + g.nDossiers + '</td>' +
          '<td class="num-money">' + fmtMoney(g.facture) + '</td>' +
          '<td class="num-money">' + fmtMoney(g.encaisse) + '</td>' +
          '<td class="num-money"' + (g.soldeDu > 0 ? ' style="color:var(--warn);font-weight:700"' : '') + '>' + fmtMoney(g.soldeDu) + '</td>' +
          '<td class="mono" title="' + esc(g.nextAudience ? g.nextAudience.date || '' : '') + '">' + (g.nextAudience ? esc(fmtDate(g.nextAudience.date)) + (g.nextAudience.heure ? ' ' + esc(g.nextAudience.heure) : '') : '—') + '</td>' +
          '<td style="white-space:nowrap"><button class="btn btn-sm" data-fiche="' + esc(g.key) + '">Fiche</button> ' +
          (g.soldeDu > 0 ? '<button class="btn btn-sm" data-relcl="' + esc(g.key) + '" title="Relancer">Relancer</button>' : '') + '</td></tr>';
      }).join('') + '</tbody></table>' +
      (groups.length === 0 ? '<div class="empty-state" style="padding:20px">Aucun client. Créez un dossier pour voir apparaître son client ici.</div>' : '') + '</div></div>';
    $('#crumbs').innerHTML = '<span class="cur">Cabinet — Clients</span>';
    var debC = null;
    $('#clientSearch').addEventListener('input', function () {
      clearTimeout(debC);
      debC = setTimeout(function () {
        var q = ($('#clientSearch').value || '').toLowerCase();
        $$('#clientsBody tr').forEach(function (tr) {
          tr.style.display = tr.textContent.toLowerCase().indexOf(q) !== -1 ? '' : 'none';
        });
      }, 120);
    });
    $$('[data-fiche]', content).forEach(function (b) {
      b.addEventListener('click', function () { renderFiche(b.dataset.fiche); });
    });
    $$('[data-relcl]', content).forEach(function (b) {
      b.addEventListener('click', function () {
        var g = groupClients().find(function (x) { return x.key === b.dataset.relcl; });
        if (!g) return;
        var f = factures().find(function (x) {
          return g.dossiers.some(function (d) { return d.id === x.dossierId; }) && x.statut === 'Émise' && x.type === 'Facture solde';
        }) || factures().find(function (x) {
          return g.dossiers.some(function (d) { return d.id === x.dossierId; }) && x.statut === 'Émise';
        });
        if (f) openRelance(f.dossierId, f.type === 'Reçu provision' ? 'provision' : 'solde', f.id);
        else {
          var d0 = g.dossiers[0];
          if (d0) openRelance(d0.id, 'provision', null);
        }
      });
    });
  }
  function renderFiche(key) {
    var content = $('#content');
    if (!content) return;
    var g = groupClients().find(function (x) { return x.key === key; });
    if (!g) { renderClients(); return; }
    var c = getContact(key) || { name_norm: key, label: g.label };
    var auds = audiences().filter(function (a) {
      return g.dossiers.some(function (d) { return d.id === a.dossierId; }) && (a.etat === 'À venir' || a.etat === 'Reportée');
    }).sort(function (a, b) { return a.date.localeCompare(b.date); }).slice(0, 5);
    function relanceBtns(d) {
      var out = [];
      var ff = factures().filter(function (f) { return f.dossierId === d.id; });
      var hasProv = ff.some(function (f) { return f.type === 'Reçu provision'; });
      if (!hasProv && ['Convention signée', 'En cours'].indexOf(d.statut) !== -1) {
        out.push('<button class="btn btn-sm" data-rel="provision|' + esc(d.id) + '">Relancer provision</button>');
      }
      ff.filter(function (f) { return f.statut === 'Émise' && f.type === 'Facture solde'; }).forEach(function (f) {
        out.push('<button class="btn btn-sm" data-rel="solde|' + esc(d.id) + '|' + esc(f.id) + '">Relancer solde ' + esc(f.num) + '</button>');
      });
      var m = (d.mission || '').toLowerCase();
      if (d.abonnementActif || m.indexOf('abonnement') !== -1) {
        out.push('<button class="btn btn-sm" data-rel="abo|' + esc(d.id) + '">Renouvellement</button>');
      }
      return out.join(' ');
    }
    content.innerHTML =
      '<div class="cab"><button class="btn" id="ficheBack">← Clients</button>' +
      '<h2 style="margin-top:12px">' + esc(g.label) + '</h2>' +
      '<p class="sub">' + g.nDossiers + ' dossier(s) · facturé ' + fmtMoney(g.facture) + ' · encaissé ' + fmtMoney(g.encaisse) + ' · solde dû ' + fmtMoney(g.soldeDu) + '</p>' +
      '<div class="dash-grid"><div class="dash-panel"><h3>Contacts</h3>' +
      '<div style="overflow-x:auto"><table class="cab-table" style="border:0"><tbody>' +
      '<tr><td>Tél / WhatsApp</td><td>' + esc(c.tel || '—') + '</td></tr>' +
      '<tr><td>E-mail</td><td>' + esc(c.email || '—') + '</td></tr>' +
      '<tr><td>Ville</td><td>' + esc(c.ville || '—') + '</td></tr>' +
      '<tr><td>ICE</td><td>' + esc(c.ice || '—') + '</td></tr>' +
      '<tr><td>Notes</td><td style="white-space:normal">' + esc(c.notes || '—') + '</td></tr>' +
      '</tbody></table></div><div class="cab-toolbar"><button class="btn btn-sm" id="ficheEditContact">Modifier les contacts</button></div></div>' +
      '<div class="dash-panel"><h3>Prochaines audiences (' + auds.length + ')</h3>' +
      (auds.length ? auds.map(function (a) {
        var d = dossierOf(a.dossierId);
        return '<div class="today-action"><span class="ta-ico">' + window.ico('scale') + '</span><span class="ta-date mono">' + esc(a.date) + (a.heure ? ' ' + esc(a.heure) : '') + '</span>' +
          '<span class="ta-body"><strong>' + esc(a.juridiction || '') + '</strong> — ' + esc(a.objet || '') + (d ? ' · ' + esc(d.client) : '') + '</span></div>';
      }).join('') : '<p class="today-clear">Aucune audience à venir.</p>') + '</div></div>' +
      '<div class="dash-panel" style="margin-top:16px"><h3>Historique dossiers</h3>' +
      '<div class="cab-table-wrap"><table class="cab-table"><thead><tr><th>Client (dossier)</th><th>Statut</th><th>Honoraires</th><th>Relance</th></tr></thead><tbody>' +
      g.dossiers.map(function (d) {
        var cc = calcTTC(d.honoraires, d.tva);
        return '<tr><td><strong>' + esc(d.client) + '</strong><br><span style="font-size:11px;color:var(--text-dim)">' + esc(d.mission || '') + '</span></td>' +
          '<td>' + esc(d.statut || '') + '</td><td class="mono">' + fmtMoney(cc.ttc) + ' TTC</td>' +
          '<td>' + (relanceBtns(d) || '<span style="color:var(--text-dim);font-size:12px">—</span>') + ' <button class="btn btn-sm" data-open-d="' + esc(d.id) + '">Ouvrir</button></td></tr>';
      }).join('') + '</tbody></table></div></div></div>';
    $('#crumbs').innerHTML = '<span style="cursor:pointer" id="crumbClients">Cabinet — Clients</span> <span>/</span> <span class="cur">' + esc(g.label) + '</span>';
    $('#ficheBack').addEventListener('click', renderClients);
    $('#crumbClients').addEventListener('click', renderClients);
    $('#ficheEditContact').addEventListener('click', function () { openContactDlg(key, g.label); });
    $$('[data-open-d]', content).forEach(function (b) {
      b.addEventListener('click', function () { if (window.Cabinet) window.Cabinet.viewDossier(b.dataset.openD); });
    });
    $$('[data-rel]', content).forEach(function (b) {
      b.addEventListener('click', function () {
        var p = b.dataset.rel.split('|');
        openRelance(p[1], p[0], p[2] || null);
      });
    });
  }
  function openContactDlg(key, label) {
    var dlg = $('#dlgContact');
    if (!dlg) {
      dlg = document.createElement('dialog');
      dlg.id = 'dlgContact';
      dlg.className = 'dlg';
      dlg.setAttribute('aria-labelledby', 'contactTitle');
      dlg.innerHTML = '<form method="dialog" id="formContact"><h3 id="contactTitle">Contacts client</h3>' +
        '<div class="form-grid"><label class="span-2">Client<input name="label" readonly></label>' +
        '<label>Tél / WhatsApp<input name="tel" placeholder="06 XX XX XX XX"></label>' +
        '<label>E-mail<input name="email" type="email" placeholder="client@exemple.ma"></label>' +
        '<label>Ville<input name="ville" placeholder="Casablanca"></label>' +
        '<label>ICE<input name="ice" placeholder="15 chiffres"></label>' +
        '<label class="span-2">Notes<textarea name="notes" rows="2"></textarea></label></div>' +
        '<div class="dlg-actions"><button type="button" class="btn" id="btnContactCancel">Annuler</button>' +
        '<button type="submit" class="btn btn-primary">Enregistrer</button></div></form>';
      document.body.appendChild(dlg);
      $('#btnContactCancel').addEventListener('click', function () { dlg.close(); });
      $('#formContact').addEventListener('submit', function (e) {
        e.preventDefault();
        var fd = new FormData(e.target);
        var obj = Object.fromEntries(fd.entries());
        obj.name_norm = e.target.dataset.key;
        saveContact(obj);
        dlg.close();
        toast('Contacts enregistrés.');
        renderFiche(e.target.dataset.key);
      });
    }
    var cur = getContact(key) || { label: label };
    var f = $('#formContact');
    f.dataset.key = key;
    f.label.value = cur.label || label || '';
    f.tel.value = cur.tel || '';
    f.email.value = cur.email || '';
    f.ville.value = cur.ville || '';
    f.ice.value = cur.ice || '';
    f.notes.value = cur.notes || '';
    dlg.showModal();
  }

  /* ================= FINANCES ================= */
  var charts = [];
  function destroyCharts() {
    charts.forEach(function (ch) { try { ch.destroy(); } catch (e) { console.warn('avocato', e); } });
    charts = [];
  }
  function chartCount() { return charts.length; }
  function cssVar(n, fb) { try { return (getComputedStyle(document.body).getPropertyValue(n) || '').trim() || fb; } catch (e) { return fb; } }
  function newChart(id, cfg) {
    destroyChartsFor(id);
    try {
      if (!window.Chart) return null;
      var el = document.getElementById(id);
      if (!el) return null;
      var ch = new window.Chart(el, cfg);
      charts.push(ch);
      return ch;
    } catch (e) { return null; }
  }
  function destroyChartsFor(id) {
    charts = charts.filter(function (ch) {
      try {
        if (ch && ch.canvas && ch.canvas.id === id) { ch.destroy(); return false; }
      } catch (e) { return false; }
      return true;
    });
  }
  function getFinPeriod() {
    var p = LS.get('finPeriod', null) || {};
    return { mode: p.mode === 'glissant' ? 'glissant' : 'annee' };
  }
  function setFinPeriod(mode) { LS.set('finPeriod', { mode: mode }); }
  function finMonths() {
    var now = new Date();
    var out = [];
    if (getFinPeriod().mode === 'glissant') {
      for (var i = 11; i >= 0; i--) {
        var d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        out.push(d.getFullYear() + '-' + pad(d.getMonth() + 1));
      }
    } else {
      for (var m = 1; m <= 12; m++) out.push(now.getFullYear() + '-' + pad(m));
    }
    return out;
  }
  function monthLabel(ym) {
    try {
      var d = new Date(Number(ym.slice(0, 4)), Number(ym.slice(5, 7)) - 1, 1);
      return d.toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' });
    } catch (e) { return ym; }
  }
  function buildRegister() {
    var months = finMonths();
    var inP = {};
    months.forEach(function (m) { inP[m] = 1; });
    var acc = {};
    months.forEach(function (m) {
      acc[m] = { mois: m, label: monthLabel(m), emisHT: 0, encHT: 0, tva: 0, nouveaux: 0, signes: 0, clotures: 0, ponct: 0, abo: 0, fraisTTC: 0, mom: null };
    });
    factures().forEach(function (f) {
      var m = (f.date || '').slice(0, 7);
      if (!inP[m]) return;
      var ht = Number(f.ht) || 0;
      acc[m].emisHT += ht;
      if (f.statut === 'Encaissée') {
        acc[m].encHT += ht;
        acc[m].tva += Number(f.tva) || 0;
        if (f.abonnement) acc[m].abo += ht; else acc[m].ponct += ht;
      }
    });
    dossiers().forEach(function (d) {
      var m = (d.createdAt || '').slice(0, 7);
      if (inP[m]) acc[m].nouveaux++;
    });
    transitions().forEach(function (t) {
      var m = (t.at || '').slice(0, 7);
      if (!inP[m]) return;
      if (t.to === 'Convention signée') acc[m].signes++;
      else if (t.to === 'Clôturé') acc[m].clotures++;
    });
    fraisList().forEach(function (x) {
      var m = (x.date || '').slice(0, 7);
      if (!inP[m] || x.statut === 'Facturé') return;
      acc[m].fraisTTC += (Number(x.montantHT) || 0) + (Number(x.tva) || 0);
    });
    var rows = months.map(function (m) { return acc[m]; });
    for (var i = 1; i < rows.length; i++) {
      var prev = rows[i - 1].encHT, curE = rows[i].encHT;
      rows[i].mom = prev > 0 ? Math.round(1000 * (curE - prev) / prev) / 10 : (curE > 0 ? 100 : null);
    }
    return rows;
  }
  function periodSums() {
    var months = finMonths();
    var facts = factures();
    var frs = fraisList();
    var encTTC = 0, fraisTTC = 0;
    facts.forEach(function (f) {
      if (f.statut !== 'Encaissée') return;
      if (months.indexOf((f.date || '').slice(0, 7)) === -1) return;
      encTTC += Number(f.ttc) || 0;
    });
    frs.forEach(function (f) {
      if (months.indexOf((f.date || '').slice(0, 7)) === -1) return;
      if (f.statut === 'Facturé') return;
      fraisTTC += (Number(f.montantHT) || 0) + (Number(f.tva) || 0);
    });
    return { encTTC: encTTC, fraisTTC: fraisTTC, net: encTTC - fraisTTC };
  }
  function mrrHT() {
    var tot = 0;
    dossiers().forEach(function (d) {
      var m = (d.mission || '').toLowerCase();
      var isAbo = d.abonnementActif || m.indexOf('abonnement') !== -1;
      if (!isAbo || d.abonnementActif === false) return;
      if (['Clôturé', 'Abandonné'].indexOf(d.statut) !== -1) return;
      var montant = Number(d.abonnementMontant) || Number(d.honoraires) || 0;
      if (!montant) return;
      tot += calcTTC(montant, d.tva).ht;
    });
    return tot;
  }
  function ytdProgress() {
    var obj = LS.get('objectifCA', null);
    if (!obj || !obj.targetHT) return null;
    var now = new Date();
    var elapsed = getFinPeriod().mode === 'glissant' ? 12 : (now.getMonth() + 1);
    var monthly = obj.period === 'annuel' ? (Number(obj.targetHT) || 0) / 12 : (Number(obj.targetHT) || 0);
    var target = Math.round(monthly * elapsed);
    var months = finMonths().slice(0, elapsed);
    var current = 0;
    factures().forEach(function (f) {
      if (f.statut !== 'Encaissée') return;
      if (months.indexOf((f.date || '').slice(0, 7)) === -1) return;
      current += Number(f.ht) || 0;
    });
    var pct = target ? Math.min(999, Math.round(100 * current / target)) : 0;
    var niveau = pct >= 100 ? 'Or' : (pct >= 70 ? 'Argent' : (pct >= 40 ? 'Bronze' : '—'));
    return { target: target, current: current, pct: pct, niveau: niveau, period: obj.period || 'mensuel' };
  }
  function renderFinances() {
    destroyCharts();
    var content = $('#content');
    if (!content) return;
    var mode = getFinPeriod().mode;
    var rows = buildRegister();
    var sums = periodSums();
    var curM = todayISO().slice(0, 7);
    var encMoisTTC = 0;
    factures().forEach(function (f) {
      if (f.statut === 'Encaissée' && (f.date || '').slice(0, 7) === curM) encMoisTTC += Number(f.ttc) || 0;
    });
    var relances = factures().filter(function (f) { return f.statut === 'Émise'; }).length;
    var ytd = ytdProgress();
    var tEmis = rows.reduce(function (s, r) { return s + r.emisHT; }, 0);
    var tEnc = rows.reduce(function (s, r) { return s + r.encHT; }, 0);
    var tTva = rows.reduce(function (s, r) { return s + r.tva; }, 0);
    content.innerHTML =
      '<div class="cab"><div class="kicker">Trésorerie — encaissé vs facturé</div><h2>Finances</h2>' +
      '<p class="sub">Encaissé vs facturé vs objectif — TVA collectée (art. 91 si 0 %) — registre mensuel vérifiable.</p>' +
      '<div class="cab-toolbar"><button class="btn' + (mode === 'annee' ? ' btn-primary' : '') + '" id="finAnnee">Année civile</button>' +
      '<button class="btn' + (mode === 'glissant' ? ' btn-primary' : '') + '" id="finGlissant">12 mois glissants</button></div>' +
      '<div class="dash-cards">' +
      '<div class="dash-card"><div class="num">' + fmtMoney(encMoisTTC) + '</div><div class="lbl">Encaissé du mois (TTC)</div></div>' +
      '<div class="dash-card"><div class="num">' + fmtMoney(mrrHT()) + '</div><div class="lbl">MRR abonnements (HT)</div></div>' +
      '<div class="dash-card"><div class="num">' + (ytd ? ytd.pct + ' % <span style="font-size:12px">· ' + esc(ytd.niveau) + '</span>' : '—') + '</div><div class="lbl">' +
      (ytd ? (mode === 'glissant' ? '12 mois vs objectif' : 'YTD vs objectif') + ' (' + fmtMoney(ytd.current) + ' / ' + fmtMoney(ytd.target) + ' HT)' : 'YTD vs objectif (définir l’objectif)') + '</div></div>' +
      '<div class="dash-card"><div class="num">' + fmtMoney(sums.net) + '</div><div class="lbl">Net encaissé − frais (' + (mode === 'glissant' ? '12 mois' : 'année') + ')</div></div>' +
      '<div class="dash-card"><div class="num">' + relances + '</div><div class="lbl">Factures à relancer</div></div>' +
      '</div>' +
      '<div class="dash-grid"><div class="dash-panel"><h3>Encaissé vs facturé vs objectif (HT)</h3>' +
      '<div class="chart-canvas-wrap" style="height:240px"><canvas id="finCurve"></canvas></div></div>' +
      '<div class="dash-panel"><h3>Ponctuel / abonnements + frais (HT/TTC)</h3>' +
      '<div class="chart-canvas-wrap" style="height:240px"><canvas id="finBars"></canvas></div></div></div>' +
      '<div class="dash-panel"><h3>Registre mensuel</h3>' +
      '<div class="cab-table-wrap"><table class="cab-table"><thead><tr><th>Mois</th><th>Émis HT</th><th>Encaissé HT</th><th>TVA collectée</th><th>Nouveaux</th><th>Signés</th><th>Clôturés</th><th>MoM %</th></tr></thead><tbody>' +
      rows.map(function (r) {
        return '<tr><td class="mono">' + esc(r.label) + '</td><td class="mono">' + fmtMoney(r.emisHT) + '</td>' +
          '<td class="mono">' + fmtMoney(r.encHT) + '</td>' +
          '<td class="mono">' + (r.tva === 0 ? '0 (art. 91)' : fmtMoney(r.tva)) + '</td>' +
          '<td class="mono">' + r.nouveaux + '</td><td class="mono">' + r.signes + '</td><td class="mono">' + r.clotures + '</td>' +
          '<td class="mono">' + (r.mom == null ? '—' : (r.mom > 0 ? '+' : '') + r.mom + ' %') + '</td></tr>';
      }).join('') +
      '<tr style="font-weight:700"><td>Total</td><td class="mono">' + fmtMoney(tEmis) + '</td><td class="mono">' + fmtMoney(tEnc) + '</td>' +
      '<td class="mono">' + fmtMoney(tTva) + '</td><td class="mono">' + rows.reduce(function (s, r) { return s + r.nouveaux; }, 0) + '</td>' +
      '<td class="mono">' + rows.reduce(function (s, r) { return s + r.signes; }, 0) + '</td>' +
      '<td class="mono">' + rows.reduce(function (s, r) { return s + r.clotures; }, 0) + '</td><td>—</td></tr>' +
      '</tbody></table></div></div></div>';
    $('#crumbs').innerHTML = '<span class="cur">Cabinet — Finances</span>';
    $('#finAnnee').addEventListener('click', function () { setFinPeriod('annee'); renderFinances(); });
    $('#finGlissant').addEventListener('click', function () { setFinPeriod('glissant'); renderFinances(); });
    try {
      var obj = LS.get('objectifCA', null);
      var monthly = obj && obj.targetHT ? (obj.period === 'annuel' ? (Number(obj.targetHT) || 0) / 12 : (Number(obj.targetHT) || 0)) : 0;
      var labels = rows.map(function (r) { return r.label; });
      newChart('finCurve', {
        type: 'line',
        data: { labels: labels, datasets: [
          { label: 'Encaissé HT', data: rows.map(function (r) { return r.encHT; }), borderColor: cssVar('--chart-1', '#0d535f'), backgroundColor: cssVar('--chart-1', '#0d535f') + '22', tension: 0.25 },
          { label: 'Facturé HT', data: rows.map(function (r) { return r.emisHT; }), borderColor: cssVar('--chart-2', '#e0641f'), backgroundColor: cssVar('--chart-2', '#e0641f') + '22', tension: 0.25 },
          { label: 'Objectif HT', data: rows.map(function () { return Math.round(monthly); }), borderColor: cssVar('--brass', '#a98a4b'), borderDash: [6, 4], pointRadius: 0 }
        ]},
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { font: { size: 10 } } } }, scales: { y: { beginAtZero: true } } }
      });
      var ponct = rows.map(function (r) { return r.ponct; });
      var abo = rows.map(function (r) { return r.abo; });
      var fr = rows.map(function (r) { return r.fraisTTC; });
      newChart('finBars', {
        data: { labels: labels, datasets: [
          { type: 'bar', label: 'Ponctuel HT', data: ponct, backgroundColor: cssVar('--chart-2', '#e0641f') + 'cc', stack: 'ca' },
          { type: 'bar', label: 'Abonnements HT', data: abo, backgroundColor: cssVar('--brass', '#a98a4b') + 'cc', stack: 'ca' },
          { type: 'line', label: 'Frais TTC', data: fr, borderColor: cssVar('--warn', '#9a5b12'), yAxisID: 'y1', tension: 0.25 }
        ]},
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { font: { size: 10 } } } }, scales: { y: { stacked: true, beginAtZero: true }, y1: { position: 'right', beginAtZero: true, grid: { drawOnChartArea: false } } } }
      });
    } catch (e) { console.warn('avocato', e); }
  }

  /* ================= O2 — frais dans la facture solde ================= */
  function fraisAFacturer(dossierId) {
    return fraisList().filter(function (f) { return f.dossierId === dossierId && f.remboursable && f.statut === 'À facturer'; });
  }
  function soldeParts(dossierId) {
    var d = dossierOf(dossierId);
    if (!d) return null;
    var c = calcTTC(d.honoraires, d.tva);
    var prov = Math.round(c.ttc * provPct(d) / 100);
    var ttc = c.ttc - prov;
    var ht = d.tva == 0 ? ttc : Math.round(ttc / (1 + (Number(d.tva) || 0) / 100));
    return { dossier: d, ht: ht, tva: ttc - ht, ttc: ttc };
  }
  function interceptSolde(dossierId) {
    var rest = fraisAFacturer(dossierId);
    if (!rest.length) return false;
    openSoldeDlg(dossierId, rest);
    return true;
  }
  function openSoldeDlg(dossierId, rest) {
    var dlg = $('#dlgSoldeFrais');
    if (!dlg) {
      dlg = document.createElement('dialog');
      dlg.id = 'dlgSoldeFrais';
      dlg.className = 'dlg';
      dlg.setAttribute('aria-labelledby', 'soldeTitle');
      dlg.innerHTML = '<form method="dialog" id="formSoldeFrais"><h3 id="soldeTitle">Facture solde + débours</h3>' +
        '<div id="soldeFraisList" style="margin:0 18px"></div>' +
        '<p class="mono" id="soldeTotal" style="margin:8px 18px;font-size:12.5px"></p>' +
        '<div class="dlg-actions"><button type="button" class="btn" id="btnSoldeCancel">Sans les frais</button>' +
        '<button type="button" class="btn btn-primary" id="btnSoldeOk">Créer la facture</button></div></form>';
      document.body.appendChild(dlg);
      $('#btnSoldeCancel').addEventListener('click', function () {
        dlg.close();
        var id = dlg.dataset.dossier;
        if (id && window.Relations) window.Relations.createSolde(id, []);
      });
      $('#btnSoldeOk').addEventListener('click', function () {
        var id = dlg.dataset.dossier;
        var sel = $$('#soldeFraisList input[type="checkbox"]:checked').map(function (cb) { return cb.value; });
        dlg.close();
        if (id && window.Relations) window.Relations.createSolde(id, sel);
      });
      $('#formSoldeFrais').addEventListener('submit', function (e) { e.preventDefault(); });
    }
    var parts = soldeParts(dossierId);
    if (!parts) return;
    dlg.dataset.dossier = dossierId;
    function refresh() {
      var sel = $$('#soldeFraisList input[type="checkbox"]:checked').map(function (cb) { return cb.value; });
      var dHT = 0, dTVA = 0;
      rest.forEach(function (f) {
        if (sel.indexOf(f.id) !== -1) { dHT += Number(f.montantHT) || 0; dTVA += Number(f.tva) || 0; }
      });
      $('#soldeTotal').textContent = 'Honoraires solde ' + fmtMoney(parts.ttc) + ' TTC + débours ' + fmtMoney(dHT + dTVA) + ' TTC = ' + fmtMoney(parts.ttc + dHT + dTVA) + ' TTC';
    }
    $('#soldeFraisList').innerHTML = '<p class="field-help" style="margin:0 0 8px">Frais remboursables non facturés — inclus en ligne débours, bascule en « Facturé » à l’encaissement uniquement.</p>' +
      rest.map(function (f) {
        var ttc = (Number(f.montantHT) || 0) + (Number(f.tva) || 0);
        return '<label class="daily-item"><input type="checkbox" value="' + esc(f.id) + '" checked> <span>' + esc(f.date || '') + ' — ' + esc(f.label || f.categorie || '') + ' — <strong>' + fmtMoney(ttc) + ' TTC</strong></span></label>';
      }).join('');
    $$('#soldeFraisList input[type="checkbox"]').forEach(function (cb) { cb.addEventListener('change', refresh); });
    refresh();
    dlg.showModal();
  }
  function createSolde(dossierId, fraisIds) {
    var parts = soldeParts(dossierId);
    if (!parts) return null;
    var dHT = 0, dTVA = 0;
    var valid = [];
    (fraisIds || []).forEach(function (id) {
      var f = fraisList().find(function (x) { return x.id === id && x.dossierId === dossierId && x.remboursable && x.statut === 'À facturer'; });
      if (f) { valid.push(id); dHT += Number(f.montantHT) || 0; dTVA += Number(f.tva) || 0; }
    });
    var arr = factures();
    var num = nextNumLocal('FH', arr);
    var f = {
      id: uid(), dossierId: dossierId, num: num, date: todayISO(), type: 'Facture solde',
      ht: parts.ht + dHT, tva: parts.tva + dTVA, ttc: parts.ttc + dHT + dTVA,
      statut: 'Émise', fraisIds: valid, deboursHT: dHT, deboursTVA: dTVA
    };
    arr.push(f);
    LS.set('factures', arr);
    if (window.Cabinet) {
      window.Cabinet.goView('factures');
      toast('Facture solde ' + num + ' créée' + (valid.length ? ' — débours ' + fmtMoney(dHT + dTVA) + ' inclus (' + valid.length + ' ligne(s)).' : '.'), {
        undo: function () {
          LS.set('factures', (LS.get('factures', []) || []).filter(function (x) { return x.id !== f.id; }));
          if (window.Cabinet) window.Cabinet.goView('factures');
          toast('Facture annulée.');
        }
      });
    }
    return f;
  }
  function onFactureStatut(id, statut) {
    var arr = factures();
    var f = arr.find(function (x) { return x.id === id; });
    if (!f || !f.fraisIds || !f.fraisIds.length) return;
    var frs = fraisList();
    var n = 0;
    if (statut === 'Encaissée') {
      frs.forEach(function (x) {
        if (f.fraisIds.indexOf(x.id) !== -1 && x.statut === 'À facturer') { x.statut = 'Facturé'; n++; }
      });
      if (n) toast(n + ' frais passé(s) en « Facturé » (encaissement ' + f.num + ').');
    } else if (statut === 'Émise') {
      frs.forEach(function (x) {
        if (f.fraisIds.indexOf(x.id) !== -1 && x.statut === 'Facturé') { x.statut = 'À facturer'; n++; }
      });
      if (n) toast(n + ' frais rouvert(s) en « À facturer » (' + f.num + ' rouverte).');
    }
    if (n) LS.set('frais', frs);
  }
  function onFactureDeleted(removed) {
    if (!removed || !removed.fraisIds || !removed.fraisIds.length) return;
    var frs = fraisList();
    var n = 0;
    frs.forEach(function (x) {
      if (removed.fraisIds.indexOf(x.id) !== -1 && x.statut === 'Facturé') { x.statut = 'À facturer'; n++; }
    });
    if (n) { LS.set('frais', frs); toast(n + ' frais libéré(s) (facture supprimée).'); }
  }

  /* ================= O3 — lettre de mission + PV ================= */
  function jalonsReels(dossier) {
    var rys = echeances().filter(function (e) { return e.dossierId === dossier.id && e.auto === 'RYTHME'; });
    function find(t) {
      var e = rys.find(function (x) { return (x.type || '').indexOf(t) === 0; });
      return e ? { date: e.date, intitule: e.intitule } : null;
    }
    var j0 = find('Rythme J0'), j2 = find('Rythme J2'), j5 = find('Rythme J5'), j7 = find('Rythme J7');
    if (j0 && j2 && j5 && j7) return [
      { j: 'J0', date: j0.date, label: j0.intitule },
      { j: 'J2', date: j2.date, label: j2.intitule },
      { j: 'J5', date: j5.date, label: j5.intitule },
      { j: 'J7', date: j7.date, label: j7.intitule }
    ];
    var base = (dossier.provisionDate || (dossier.createdAt || '').slice(0, 10) || todayISO());
    return [
      { j: 'J0', date: base, label: 'Kickoff — périmètre et calendrier annoncés' },
      { j: 'J2', date: addDaysISO(base, 2), label: 'Checkpoint « en mouvement »' },
      { j: 'J5', date: addDaysISO(base, 5), label: 'Checkpoint « presque fini »' },
      { j: 'J7', date: addDaysISO(base, 7), label: 'Paquet de quatre + restitution' }
    ];
  }
  function missionLivrables(mission, dossier) {
    if (window.Cabinet && window.Cabinet.missionDeliverables) {
      try { return window.Cabinet.missionDeliverables(mission, dossier); } catch (e) { console.warn('avocato', e); }
    }
    return 'Restitution + livrables de la mission';
  }
  var fmtRib = window.AvocatoCore.fmtRib;
  function openLM(dossierId) {
    var d = dossierOf(dossierId);
    if (!d) return null;
    var p = plaque();
    var num = ensureLetter(dossierId, 'LM').num;
    var c = calcTTC(d.honoraires, d.tva);
    var prov = Math.round(c.ttc * provPct(d) / 100);
    var jalons = jalonsReels(d);
    var canal = (d.canalRestitution || 'À convenir (Loom / Zoom / cabinet)');
    var content = $('#content');
    var html =
      '<div class="cab"><button class="btn" id="lmBack">← Retour dossier</button>' +
      '<div class="doc" style="max-width:750px;margin:16px auto"><div style="text-align:center;border-bottom:2px solid var(--accent);padding:14px 20px;margin-bottom:16px">' +
      '<div style="font-weight:700;font-size:16px">' + esc(p.nom || 'Maître [Nom]') + (p.barreau ? ' — Avocat au ' + esc(p.barreau) : '') + '</div>' +
      '<div style="font-size:12px;color:var(--text-dim)">' + (p.tel ? 'Tél ' + esc(p.tel) + ' — ' : '') + (d.ice || p.ice ? 'ICE ' + esc(d.ice || p.ice) : '') + '</div></div>' +
      '<div style="padding:0 36px 36px"><h2 style="text-align:center;margin:0">LETTRE DE MISSION N° ' + esc(num) + '</h2>' +
      '<p style="text-align:center;font-size:12px;color:var(--text-dim)">Jointe à la convention — jalons J0 / J2 / J5 / J7</p>' +
      '<p><strong>Client :</strong> ' + esc(d.client) + (d.ice ? ' (ICE ' + esc(d.ice) + ')' : '') + '<br>' +
      '<strong>Mission :</strong> ' + esc(d.mission || '') + '<br>' +
      '<strong>Honoraires :</strong> ' + fmtMoney(c.ht) + ' HT + TVA ' + (d.tva == 0 ? '0 % (art. 91 CGI)' : d.tva + ' %') + ' = ' + fmtMoney(c.ttc) + ' TTC<br>' +
      '<strong>Provision à la signature (' + provPct(d) + ' %) :</strong> ' + fmtMoney(prov) + ' TTC — exigible avant démarrage (art. 30).</p>' +
      '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:13px;margin:12px 0" border="1" cellpadding="8">' +
      '<tr style="background:var(--surface-2)"><th>Jalon</th><th>Date</th><th>Contenu</th></tr>' +
      jalons.map(function (j) { return '<tr><td><strong>' + esc(j.j) + '</strong></td><td>' + esc(fmtDate(j.date)) + '</td><td>' + esc(j.label) + '</td></tr>'; }).join('') +
      '</table></div>' +
      '<p><strong>Livrables :</strong> ' + esc(missionLivrables(d.mission, d)) + '</p>' +
      '<p><strong>Canal de restitution :</strong> ' + esc(canal) + '</p>' +
      '<p style="font-size:12px">Délai prévisionnel : 3 à 10 jours ouvrés à compter de la provision encaissée et des pièces complètes. Débours en sus, sur justificatifs.</p>' +
      '<div style="display:flex;justify-content:space-between;margin-top:30px;font-size:13px"><div>L’Avocat<br><br>__________________<br>Signature &amp; cachet</div>' +
      '<div>Le Client (lu et approuvé)<br><br>__________________<br>' + esc(d.client) + '</div></div>' +
      (p.rib ? '<p class="conv-rib">RIB' + (p.ribBanque ? ' — ' + esc(p.ribBanque) : '') + ' : <span class="mono">' + esc(fmtRib(p.rib)) + '</span></p>' : '') +
      '</div></div><div class="cab-toolbar" style="justify-content:center"><button class="btn btn-primary" id="lmPrint">Imprimer / PDF</button></div></div>';
    content.innerHTML = html;
    $('#crumbs').innerHTML = '<span class="cur">Lettre de mission ' + esc(num) + '</span>';
    $('#lmBack').addEventListener('click', function () { if (window.Cabinet) window.Cabinet.viewDossier(d.id); });
    $('#lmPrint').addEventListener('click', function () { window.print(); });
    return num;
  }
  function openPV(dossierId) {
    var d = dossierOf(dossierId);
    if (!d) return null;
    var p = plaque();
    var num = ensureLetter(dossierId, 'PV').num;
    var liv = missionLivrables(d.mission, d);
    var content = $('#content');
    content.innerHTML =
      '<div class="cab"><button class="btn" id="pvBack">← Retour dossier</button>' +
      '<div class="doc" style="max-width:750px;margin:16px auto"><div style="text-align:center;border-bottom:2px solid var(--accent);padding:14px 20px;margin-bottom:16px">' +
      '<div style="font-weight:700;font-size:16px">' + esc(p.nom || 'Maître [Nom]') + (p.barreau ? ' — Avocat au ' + esc(p.barreau) : '') + '</div></div>' +
      '<div style="padding:0 36px 36px"><h2 style="text-align:center;margin:0">PV DE REMISE N° ' + esc(num) + '</h2>' +
      '<p style="text-align:center;font-size:12px;color:var(--text-dim)">Fait le ' + esc(fmtDate(todayISO())) + ' — signature avant envoi final</p>' +
      '<p><strong>Client :</strong> ' + esc(d.client) + '<br><strong>Mission :</strong> ' + esc(d.mission || '') + '</p>' +
      '<p><strong>Livrables remis :</strong></p><p style="border:1px solid var(--line);border-radius:2px;padding:10px 14px;background:var(--surface-2)">' + esc(liv) + '</p>' +
      '<p style="font-size:12px">Le client reconnaît avoir reçu les livrables ci-dessus. La facture de solde est exigible à la signature du présent PV.</p>' +
      '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:13px;margin:16px 0" border="1" cellpadding="10">' +
      '<tr style="background:var(--surface-2)"><th></th><th>Nom</th><th>Date</th><th>Signature</th></tr>' +
      '<tr><td><strong>Le Client</strong></td><td>' + esc(d.client) + '</td><td style="height:44px"></td><td></td></tr>' +
      '<tr><td><strong>L’Avocat</strong></td><td>' + esc(p.nom || '') + '</td><td style="height:44px"></td><td></td></tr>' +
      '</table></div></div></div><div class="cab-toolbar" style="justify-content:center"><button class="btn btn-primary" id="pvPrint">Imprimer / PDF</button></div></div>';
    $('#crumbs').innerHTML = '<span class="cur">PV de remise ' + esc(num) + '</span>';
    $('#pvBack').addEventListener('click', function () { if (window.Cabinet) window.Cabinet.viewDossier(d.id); });
    $('#pvPrint').addEventListener('click', function () { window.print(); });
    return num;
  }

  /* ================= O1 — relances ================= */
  function toWAME(tel) {
    var digits = String(tel || '').replace(/\D/g, '');
    if (!digits) return '';
    if (digits.indexOf('212') === 0) return 'https://wa.me/' + digits;
    if (digits.charAt(0) === '0') return 'https://wa.me/212' + digits.slice(1);
    if (digits.length === 9) return 'https://wa.me/212' + digits;
    return 'https://wa.me/' + digits;
  }
  function relanceContact(dossierId) {
    var d = dossierOf(dossierId) || {};
    var c = getContact(normalize(d.client)) || {};
    return { tel: c.tel || d.contact || '', email: c.email || '' };
  }
  function buildRelance(kind, dossierId, factureId) {
    var d = dossierOf(dossierId) || {};
    var p = plaque();
    var f = factureId ? factures().find(function (x) { return x.id === factureId; }) : null;
    var ribTxt = p.rib ? 'RIB' + (p.ribBanque ? ' (' + p.ribBanque + ')' : '') + ' : ' + fmtRib(p.rib) : 'RIB communiqué sur demande';
    if (kind === 'provision') {
      var c = calcTTC(d.honoraires, d.tva);
      var prov = Math.round(c.ttc * provPct(d) / 100);
      return {
        subject: 'Provision — ' + (d.client || ''),
        body: 'Bonjour,\n\nPour information et conformément à notre convention d’honoraires, la provision de ' + fmtMoney(prov) + ' TTC (' + provPct(d) + ' %) est exigible avant le démarrage de la mission (art. 30). Dès son encaissement, le calendrier J0-J2-J5-J7 est lancé.\n\n' + ribTxt + '.\n\nCordialement,\n' + (p.nom || '')
      };
    }
    if (kind === 'abo') {
      var montant = Number(d.abonnementMontant) || Number(d.honoraires) || 0;
      var cc = calcTTC(montant, d.tva);
      return {
        subject: 'Renouvellement abonnement — ' + (d.client || ''),
        body: 'Bonjour,\n\nPour information, la mensualité d’abonnement de ' + fmtMoney(cc.ttc) + ' TTC (période ' + ((d.abonnementNext || '').slice(0, 7) || 'en cours') + ') arrive à échéance. Merci de procéder au règlement pour la continuité du suivi.\n\n' + ribTxt + '.\n\nCordialement,\n' + (p.nom || '')
      };
    }
    var montantS = f ? fmtMoney(f.ttc) + ' TTC' : fmtMoney(0);
    var refS = f ? (f.num + ' du ' + f.date) : '';
    return {
      subject: 'Solde facture ' + (f ? f.num : '') + ' — ' + (d.client || ''),
      body: 'Bonjour,\n\nPour information, la facture de solde ' + refS + ' d’un montant de ' + montantS + ', payable à réception, reste due à ce jour (J+15 dépassé). Merci de régulariser à réception du présent message.\n\n' + ribTxt + '.\n\nCordialement,\n' + (p.nom || '')
    };
  }
  function openRelance(dossierId, kind, factureId) {
    var dlg = $('#dlgRelance');
    if (!dlg) {
      dlg = document.createElement('dialog');
      dlg.id = 'dlgRelance';
      dlg.className = 'dlg';
      dlg.setAttribute('aria-labelledby', 'relanceTitle');
      dlg.innerHTML = '<form method="dialog" id="formRelance"><h3 id="relanceTitle">Relance — information juridique</h3>' +
        '<div class="form-grid"><label>Modèle<select name="tpl"><option value="provision">Provision — art. 30</option>' +
        '<option value="solde">Solde — J+15</option><option value="abo">Renouvellement abonnement</option></select></label>' +
        '<label>Destinataire<input name="dest" readonly></label>' +
        '<label class="span-2">Message<textarea name="body" rows="9"></textarea></label></div>' +
        '<div class="dlg-actions" style="flex-wrap:wrap"><button type="button" class="btn" id="btnRelCopy">Copier</button>' +
        '<button type="button" class="btn" id="btnRelMail">Ouvrir e-mail ' + window.ico('mail') + '</button>' +
        '<button type="button" class="btn btn-primary" id="btnRelWa">WhatsApp</button>' +
        '<button type="button" class="btn" id="btnRelClose">Fermer</button></div></form>';
      document.body.appendChild(dlg);
      $('#btnRelClose').addEventListener('click', function () { dlg.close(); });
      $('#formRelance').addEventListener('submit', function (e) { e.preventDefault(); });
      $('#btnRelCopy').addEventListener('click', function () {
        var t = $('#formRelance').body.value;
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(function () { toast('Message copié.'); });
          else { $('#formRelance').body.select(); document.execCommand('copy'); toast('Message copié.'); }
        } catch (e) { toast('Copie impossible.', { kind: 'error' }); }
      });
      $('#btnRelMail').addEventListener('click', function () {
        var fr = $('#formRelance');
        var email = fr.dataset.email || '';
        var url = 'mailto:' + email + '?subject=' + encodeURIComponent(fr.dataset.subject || '') + '&body=' + encodeURIComponent(fr.body.value);
        try { window.location.href = url; } catch (e) { console.warn('avocato', e); }
      });
      $('#btnRelWa').addEventListener('click', function () {
        var fr = $('#formRelance');
        var url = toWAME(fr.dataset.tel || '');
        if (!url) { toast('Numéro WhatsApp manquant — renseignez le contact.', { kind: 'error' }); return; }
        try { window.open(url + '?text=' + encodeURIComponent(fr.body.value), '_blank'); } catch (e) { console.warn('avocato', e); }
      });
    }
    var d = dossierOf(dossierId) || {};
    var ct = relanceContact(dossierId);
    var f = $('#formRelance');
    f.dataset.dossier = dossierId;
    f.dataset.tel = ct.tel;
    f.dataset.email = ct.email;
    function loadTpl(k) {
      var r = buildRelance(k, dossierId, factureId);
      f.tpl.value = k;
      f.body.value = r.body;
      f.dataset.subject = r.subject;
      f.dest.value = (ct.email || ct.tel || d.contact || '—') + ' — ' + (d.client || '');
    }
    f.tpl.onchange = function () { loadTpl(f.tpl.value); };
    loadTpl(kind || 'solde');
    dlg.showModal();
  }

  /* ================= O6 — rappel sauvegarde ================= */
  function backupState() {
    var last = LS.get('lastExport', null);
    var t = todayISO();
    if (!last) return { stale: true, last: null, days: null };
    var days = diffDays(t, last);
    return { stale: days > 7, last: last, days: days };
  }
  function checkBackup() { return backupState(); }
  function injectBackupBanner() {
    try {
      var cv = LS.get('cabinetView', '');
      if (cv !== 'dashboard' && cv !== 'today') return;
      var content = $('#content');
      if (!content) return;
      var cab = content.querySelector('.cab');
      if (!cab || cab.querySelector('[data-backup-nag]')) return;
      var st = backupState();
      if (!st.stale) return;
      if (LS.get('backupNag', null) === todayISO()) return;
      var bar = document.createElement('div');
      bar.className = 'verrou-banner';
      bar.setAttribute('data-backup-nag', '1');
      bar.innerHTML = '<span class="vb-ico">' + window.ico('cloud') + '</span><div class="vb-body"><strong>Sauvegarde : ' +
        (st.last ? 'dernier export il y a ' + st.days + ' j (' + esc(st.last) + ')' : 'aucun export enregistré') +
        '</strong><span class="vb-sub">Copier le JSON (ou avocato.db si le serveur tourne) = backup. Au-delà de 7 j, un oubli coûte un dossier.</span></div>' +
        '<button class="btn btn-sm btn-primary" data-backup-now>Exporter JSON</button> ' +
        '<button class="btn btn-sm" data-backup-later>Plus tard</button>';
      cab.insertBefore(bar, cab.firstChild);
      bar.querySelector('[data-backup-now]').addEventListener('click', function () {
        if (window.Cabinet && window.Cabinet.exportJSON) window.Cabinet.exportJSON();
        LS.set('backupNag', todayISO());
        bar.remove();
      });
      bar.querySelector('[data-backup-later]').addEventListener('click', function () {
        LS.set('backupNag', todayISO());
        bar.remove();
        toast('Rappel reporté à demain.');
      });
    } catch (e) { console.warn('avocato', e); }
  }

  /* ================= injections (MutationObserver) ================= */
  function injectDossierTools() {
    try {
      var content = $('#content');
      if (!content) return;
      var convBtn = content.querySelector('.cab [data-act="conv"]');
      if (!convBtn || content.querySelector('[data-rel-lm]')) return;
      var bar = convBtn.closest('.cab-toolbar');
      if (!bar) return;
      var id = convBtn.dataset.id;
      function mk(label, attr) {
        var b = document.createElement('button');
        b.className = 'btn';
        b.type = 'button';
        b.textContent = label;
        b.setAttribute(attr, id);
        return b;
      }
      bar.appendChild(mk('Lettre de mission', 'data-rel-lm'));
      bar.appendChild(mk('PV de remise', 'data-rel-pv'));
      bar.appendChild(mk('Relancer ' + window.ico('mail'), 'data-rel-go'));
      bar.querySelector('[data-rel-lm]').addEventListener('click', function () { openLM(id); });
      bar.querySelector('[data-rel-pv]').addEventListener('click', function () { openPV(id); });
      bar.querySelector('[data-rel-go]').addEventListener('click', function () { openRelance(id, 'solde', null); });
    } catch (e) { console.warn('avocato', e); }
  }
  function injectFactureRelance() {
    try {
      var cv = LS.get('cabinetView', '');
      if (cv !== 'factures') return;
      $$('#content [data-encaisse]').forEach(function (b) {
        if (b.dataset.relDone) return;
        b.dataset.relDone = '1';
        var f = factures().find(function (x) { return x.id === b.dataset.encaisse; });
        if (!f || f.statut !== 'Émise') return;
        var r = document.createElement('button');
        r.className = 'btn';
        r.title = 'Relancer par e-mail / WhatsApp';
        r.innerHTML = window.ico('mail');
        r.addEventListener('click', function () {
          openRelance(f.dossierId, f.type === 'Reçu provision' ? 'provision' : (f.abonnement ? 'abo' : 'solde'), f.id);
        });
        b.parentNode.insertBefore(r, b.nextSibling);
      });
    } catch (e) { console.warn('avocato', e); }
  }
  var observerDone = false;
  function initObserver() {
    if (observerDone) return;
    observerDone = true;
    try {
      var obs = new MutationObserver(function () {
        try { injectDossierTools(); injectFactureRelance(); injectBackupBanner(); } catch (e) { console.warn('avocato', e); }
      });
      obs.observe(document.documentElement, { childList: true, subtree: true });
    } catch (e) { console.warn('avocato', e); }
  }

  function init() {
    initObserver();
    setTimeout(function () { try { injectBackupBanner(); } catch (e) { console.warn('avocato', e); } }, 1500);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  setTimeout(init, 2000);

  window.Relations = {
    renderClients: renderClients,
    renderFiche: renderFiche,
    groupClients: groupClients,
    getContact: getContact,
    saveContact: saveContact,
    renderFinances: renderFinances,
    buildRegister: buildRegister,
    getFinPeriod: getFinPeriod,
    setFinPeriod: setFinPeriod,
    mrrHT: mrrHT,
    ytdProgress: ytdProgress,
    interceptSolde: interceptSolde,
    createSolde: createSolde,
    onFactureStatut: onFactureStatut,
    onFactureDeleted: onFactureDeleted,
    fraisAFacturer: fraisAFacturer,
    openLM: openLM,
    openPV: openPV,
    jalonsReels: jalonsReels,
    openRelance: openRelance,
    buildRelance: buildRelance,
    toWAME: toWAME,
    checkBackup: checkBackup,
    chartCount: chartCount,
    nextNumLocal: nextNumLocal
  };
})();
