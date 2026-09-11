/* AVOCATO Agenda -- Phase D (SUIVI_AUDIENCES_PLAN.md).
   Calendrier mensuel + semaine tribunal + moteur computeAlerts + cloche + ICS VALARM.
   Offline-first, localStorage only. Se greffe sur window.Cabinet / Features / Cour.
   Nouvelles cles additives : calMonth, reglages, alertMutes. */
(function () {
  'use strict';

  var LS = window.AvocatoStore.LS;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.from((r || document).querySelectorAll(s)); };
  var { esc, uid, pad, toISODate, todayISO, addDaysISO, diffDays, escapeICS } = window.AvocatoCore;
  function fmtCourt(iso) {
    if (!iso) return '';
    try { return new Date(iso + 'T12:00:00').toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' }); }
    catch (e) { return iso; }
  }
  function fmtDate(iso) {
    if (!iso) return '';
    try { return new Date(iso.length > 10 ? iso : iso + 'T12:00:00').toLocaleDateString('fr-FR'); }
    catch (e) { return iso; }
  }
  function toast(m, o) { if (window.Cabinet && window.Cabinet.toast) window.Cabinet.toast(m, o); else { try { alert(m); } catch (e) { console.warn('avocato', e); } } }
  function dossiers() { return LS.get('dossiers', []) || []; }
  function echeances() { return LS.get('echeances', []) || []; }
  function audiences() { return LS.get('audiences', []) || []; }
  function jugements() { return LS.get('jugements', []) || []; }
  function factures() { return LS.get('factures', []) || []; }
  function dossierOf(id) { return dossiers().find(function (x) { return x.id === id; }); }

  function isFerie(iso) {
    if (window.Features && window.Features.isFerie) { try { return window.Features.isFerie(iso); } catch (e) { console.warn('avocato', e); } }
    var d = new Date(iso + 'T12:00:00');
    var w = d.getDay();
    return w === 0 || w === 6;
  }

  /* ---------------- seuils + snooze ---------------- */
  function getReglages() {
    var r = LS.get('reglages', null) || {};
    return {
      audSoonH: Number(r.audSoonH) || 48,
      audUrgentH: Number(r.audUrgentH) || 24,
      delaiSoonJ: Number(r.delaiSoonJ) || 7,
      delaiUrgentJ: Number(r.delaiUrgentJ) || 3,
      soldeJ: Number(r.soldeJ) || 7
    };
  }
  function setReglages(patch) {
    var cur = LS.get('reglages', {}) || {};
    Object.keys(patch).forEach(function (k) { cur[k] = patch[k]; });
    LS.set('reglages', cur);
  }
  function getMutes() {
    var m = LS.get('alertMutes', {}) || {};
    var now = Date.now();
    var changed = false;
    Object.keys(m).forEach(function (k) {
      var t = new Date(m[k]).getTime();
      if (!isFinite(t) || t <= now) { delete m[k]; changed = true; }
    });
    if (changed) LS.set('alertMutes', m);
    return m;
  }
  function isMuted(id, nowMs) {
    var m = getMutes();
    if (!m[id]) return false;
    return new Date(m[id]).getTime() > nowMs;
  }
  function snooze(id) {
    var m = getMutes();
    var until = new Date(Date.now() + 24 * 3600000).toISOString();
    m[id] = until;
    LS.set('alertMutes', m);
    refreshBell();
    toast('Alerte masquee 24 h.');
  }

  /* ---------------- moteur computeAlerts ---------------- */
  function audienceDateMs(a) {
    if (!a || !a.date) return null;
    var t = a.heure || '09:00';
    var ms = new Date(a.date + 'T' + t + ':00').getTime();
    if (isNaN(ms)) ms = new Date(a.date + 'T12:00:00').getTime();
    return ms;
  }
  function computeAlerts(nowOpt) {
    getMutes(); /* purge des mutes expires a chaque recalcule */
    var nowMs = nowOpt ? new Date(nowOpt).getTime() : Date.now();
    var nowISO = toISODate(new Date(nowMs));
    var seuils = getReglages();
    var out = [];
    var echs = echeances();
    var auds = audiences();
    var facts = factures();
    var doss = dossiers();

    // 1. audiences a venir (etat A venir / Reportee), non passees de plus d'1j
    auds.forEach(function (a) {
      if (a.etat !== 'À venir' && a.etat !== 'Reportée') return;
      var ms = audienceDateMs(a);
      if (ms == null) return;
      var dh = (ms - nowMs) / 3600000;
      if (dh < -24) return; // trop ancienne, ignoree
      if (dh > seuils.audSoonH) return;
      var d = dossierOf(a.dossierId);
      var level = dh <= seuils.audUrgentH ? 'urgent' : 'soon';
      if (dh < 0) level = 'late';
      var id = 'aud-' + a.id;
      if (isMuted(id, nowMs)) return;
      out.push({
        id: id, kind: 'audience', level: level,
        date: a.date, heure: a.heure || '',
        title: 'Audience ' + (a.juridiction || '') + ' — ' + (d ? d.client : 'sans dossier'),
        detail: (a.objet || '') + (a.role ? ' · role ' + a.role : '') + (a.ville ? ' · ' + a.ville : ''),
        dossierId: a.dossierId || '', audienceId: a.id,
        hoursLeft: Math.round(dh)
      });
    });

    // 2. delais de recours (echeances auto DELAI non cochees) + jugements orphelins
    echs.forEach(function (e) {
      if (e.done) return;
      if (e.auto !== 'DELAI' && e.type !== 'Voie de recours') return;
      if (!e.date) return;
      var dj = diffDays(e.date, nowISO);
      if (dj > seuils.delaiSoonJ) return;
      var d = dossierOf(e.dossierId);
      var level = dj < 0 ? 'late' : (dj <= seuils.delaiUrgentJ ? 'urgent' : 'soon');
      var id = 'delai-' + e.id;
      if (isMuted(id, nowMs)) return;
      out.push({
        id: id, kind: 'delai', level: level,
        date: e.date,
        title: 'Delai recours : ' + (e.intitule || e.type || '') ,
        detail: (d ? d.client : '') + (dj < 0 ? ' · EXPIRE' : ' · J-' + dj),
        dossierId: e.dossierId || '', echeanceId: e.id,
        daysLeft: dj
      });
    });

    // 3. echeances en retard (toutes, non cochees, date < today)
    echs.forEach(function (e) {
      if (e.done || !e.date) return;
      if (e.auto === 'DELAI' || e.type === 'Voie de recours') return; // deja couvre ci-dessus
      if (e.date >= nowISO) return;
      var d = dossierOf(e.dossierId);
      var id = 'ech-' + e.id;
      if (isMuted(id, nowMs)) return;
      out.push({
        id: id, kind: 'echeance', level: 'late',
        date: e.date,
        title: 'En retard : ' + (e.intitule || e.type || ''),
        detail: (d ? d.client : '') + ' · prevu le ' + e.date,
        dossierId: e.dossierId || '', echeanceId: e.id,
        daysLeft: diffDays(e.date, nowISO)
      });
    });

    // 4. soldes > seuil (factures solde Emise anciennes)
    facts.forEach(function (f) {
      if (f.type !== 'Facture solde' || f.statut !== 'Émise') return;
      if (!f.date) return;
      var age = diffDays(nowISO, f.date);
      if (age <= seuils.soldeJ) return;
      var d = dossierOf(f.dossierId);
      var id = 'solde-' + f.id;
      if (isMuted(id, nowMs)) return;
      out.push({
        id: id, kind: 'solde', level: 'late',
        date: f.date,
        title: 'Solde impaye J+' + age + ' : ' + f.num + ' — ' + (Number(f.ttc) || 0).toLocaleString('fr-FR') + ' DH',
        detail: (d ? d.client : ''),
        dossierId: f.dossierId || '', factureId: f.id,
        daysLeft: -age
      });
    });
    // dossiers livres sans facture Emise recente (filet)
    doss.forEach(function (d) {
      if (d.statut !== 'Livré - solde dû') return;
      var hasOld = facts.some(function (f) { return f.dossierId === d.id && f.type === 'Facture solde' && f.statut === 'Émise'; });
      if (hasOld) return; // deja alerte ci-dessus
      var upd = (d.updatedAt || d.createdAt || '').slice(0, 10);
      if (!upd) return;
      var age = diffDays(nowISO, upd);
      if (age <= seuils.soldeJ) return;
      var id = 'solde-d-' + d.id;
      if (isMuted(id, nowMs)) return;
      out.push({
        id: id, kind: 'solde', level: 'late',
        date: upd,
        title: 'Solde a relancer : ' + d.client,
        detail: 'statut Livré - solde dû depuis le ' + upd,
        dossierId: d.id
      });
    });

    // 5. abonnements a facturer (next <= today)
    doss.forEach(function (d) {
      var m = (d.mission || '').toLowerCase();
      var isAbo = d.abonnementActif || m.indexOf('abonnement') !== -1;
      if (!isAbo) return;
      if (d.abonnementActif === false) return;
      if (['Clôturé', 'Abandonné'].indexOf(d.statut) !== -1) return;
      var next = d.abonnementNext || d.abonnementDebut || '';
      if (!next || next > nowISO) return;
      var id = 'abo-' + d.id + '-' + next.slice(0, 7);
      if (isMuted(id, nowMs)) return;
      out.push({
        id: id, kind: 'abo', level: next < nowISO ? 'late' : 'soon',
        date: next,
        title: 'Abonnement a facturer : ' + d.client,
        detail: 'mensualite ' + next.slice(0, 7),
        dossierId: d.id
      });
    });

    var order = { late: 0, urgent: 1, soon: 2 };
    out.sort(function (a, b) {
      if (order[a.level] !== order[b.level]) return order[a.level] - order[b.level];
      return String(a.date).localeCompare(String(b.date));
    });
    return out;
  }

  /* ---------------- ICS multi-VEVENT avec VALARM ---------------- */
  function icsDateOnly(iso) { return String(iso || '').replace(/-/g, ''); }
  function icsDateTime(dateISO, heure) {
    // heure locale flottante (sans Z) : le telephone applique son fuseau
    var h = heure || '09:00';
    return icsDateOnly(dateISO) + 'T' + h.replace(':', '') + '00';
  }
  function buildICS(events) {
    var now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    var lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//AVOCATO//Agenda//FR', 'CALSCALE:GREGORIAN'];
    events.forEach(function (ev, i) {
      var uidStr = (ev.uid || ('ag' + Date.now().toString(36) + '-' + i)) + '@avocato.local';
      var dtStart, dtEnd;
      if (ev.heure) {
        dtStart = 'DTSTART:' + icsDateTime(ev.date, ev.heure);
        dtEnd = 'DTEND:' + icsDateTime(ev.date, ev.heureFin || addHour(ev.heure, 1));
      } else {
        dtStart = 'DTSTART;VALUE=DATE:' + icsDateOnly(ev.date);
        dtEnd = 'DTEND;VALUE=DATE:' + icsDateOnly(addDaysISO(ev.date, 1));
      }
      lines.push('BEGIN:VEVENT');
      lines.push('UID:' + uidStr);
      lines.push('DTSTAMP:' + now);
      lines.push(dtStart);
      lines.push(dtEnd);
      lines.push('SUMMARY:' + escapeICS(ev.title || 'AVOCATO'));
      if (ev.desc) lines.push('DESCRIPTION:' + escapeICS(ev.desc));
      if (ev.lieu) lines.push('LOCATION:' + escapeICS(ev.lieu));
      lines.push('BEGIN:VALARM');
      lines.push('TRIGGER:-P2D');
      lines.push('ACTION:DISPLAY');
      lines.push('DESCRIPTION:' + escapeICS('Rappel 48 h : ' + (ev.title || '')));
      lines.push('END:VALARM');
      lines.push('BEGIN:VALARM');
      lines.push('TRIGGER:-PT2H');
      lines.push('ACTION:DISPLAY');
      lines.push('DESCRIPTION:' + escapeICS('Rappel 2 h : ' + (ev.title || '')));
      lines.push('END:VALARM');
      lines.push('END:VEVENT');
    });
    lines.push('END:VCALENDAR');
    return lines.join('\r\n');
  }
  function addHour(hhmm, n) {
    var p = String(hhmm || '09:00').split(':');
    var h = (Number(p[0]) || 9) + (n || 0);
    return pad(h % 24) + ':' + (p[1] || '00');
  }
  function downloadText(filename, text, mime) {
    var blob = new Blob([text], { type: mime || 'text/calendar;charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 400);
  }
  function alertToEvent(al) {
    var d = al.dossierId ? dossierOf(al.dossierId) : null;
    var lieu = '';
    var heure = al.heure || '';
    if (al.kind === 'audience') {
      var a = audiences().find(function (x) { return x.id === al.audienceId; });
      if (a) { lieu = [a.juridiction, a.ville].filter(Boolean).join(' — '); heure = a.heure || heure; }
    }
    return {
      uid: al.id, date: al.date, heure: heure,
      title: al.title,
      desc: al.detail + (d ? ' · Dossier: ' + d.client : ''),
      lieu: lieu
    };
  }
  function exportAlertsICS(list) {
    var alerts = list || computeAlerts();
    if (!alerts.length) { toast('Aucune alerte a pousser.'); return ''; }
    var ics = buildICS(alerts.map(alertToEvent));
    downloadText('avocato-alertes-' + todayISO() + '.ics', ics);
    toast(alerts.length + ' alertes poussees au calendrier (rappels 48 h / 2 h).');
    return ics;
  }
  function exportDayICS(dateISO) {
    var day = collectDay(dateISO);
    var evs = [];
    day.echeances.forEach(function (e) {
      var d = dossierOf(e.dossierId);
      evs.push({ uid: 'ech-' + e.id, date: e.date, heure: '', title: (e.intitule || e.type) + (d ? ' — ' + d.client : ''), desc: 'Type: ' + (e.type || '') });
    });
    day.audiences.forEach(function (a) {
      var d = dossierOf(a.dossierId);
      evs.push({ uid: 'aud-' + a.id, date: a.date, heure: a.heure || '', title: 'Audience ' + (a.juridiction || '') + (d ? ' — ' + d.client : ''), desc: a.objet || '', lieu: [a.juridiction, a.ville].filter(Boolean).join(' — ') });
    });
    if (!evs.length) { toast('Rien a exporter pour le ' + dateISO + '.'); return ''; }
    var ics = buildICS(evs);
    downloadText('avocato-' + dateISO + '.ics', ics);
    toast(evs.length + ' evenement(s) du ' + dateISO + ' exporte(s).');
    return ics;
  }

  /* ---------------- collecte jour ---------------- */
  function buildDayIndex() {
    var idx = {};
    function put(raw, bucket, item) {
      if (!raw) return;
      var k = String(raw).slice(0, 10);
      var e = idx[k] || (idx[k] = { echeances: [], audiences: [], factures: [], naissances: [] });
      e[bucket].push(item);
    }
    echeances().forEach(function (e) { put(e.date, 'echeances', e); });
    audiences().forEach(function (a) { put(a.date, 'audiences', a); });
    factures().forEach(function (f) { put(f.date, 'factures', f); });
    dossiers().forEach(function (d) { put(d.createdAt, 'naissances', d); });
    return idx;
  }
  function collectDay(dateISO, idx) {
    if (idx && idx[dateISO]) return idx[dateISO];
    if (idx) return { echeances: [], audiences: [], factures: [], naissances: [] };
    var echs = echeances().filter(function (e) { return e.date === dateISO; });
    var auds = audiences().filter(function (a) { return a.date === dateISO; });
    var facts = factures().filter(function (f) { return (f.date || '').slice(0, 10) === dateISO; });
    var births = dossiers().filter(function (d) { return (d.createdAt || '').slice(0, 10) === dateISO; });
    return { echeances: echs, audiences: auds, factures: facts, naissances: births };
  }
  function dotKind(e) {
    if (e.auto === 'RYTHME' || String(e.type || '').indexOf('Rythme') === 0 || String(e.type || '').indexOf('Garde-fou') === 0) return 'rythme';
    if (e.auto === 'ABO' || e.type === 'Renouvellement abonnement') return 'abo';
    if (e.auto === 'DELAI' || e.type === 'Voie de recours') return 'delai';
    return 'autre';
  }

  /* ---------------- calendrier ---------------- */
  function getCalMonth() {
    var m = LS.get('calMonth', null);
    if (m && /^\d{4}-\d{2}$/.test(m)) return m;
    return todayISO().slice(0, 7);
  }
  function setCalMonth(m) { LS.set('calMonth', m); }
  function getSelDay() {
    var s = LS.get('calDay', null);
    if (s && /^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
    return todayISO();
  }
  function setSelDay(d) { LS.set('calDay', d); }

  function monthCells(ym) {
    var y = Number(ym.slice(0, 4)), mo = Number(ym.slice(5, 7)) - 1;
    var first = new Date(y, mo, 1);
    var startOffset = (first.getDay() + 6) % 7; // lundi = 0
    var start = new Date(y, mo, 1 - startOffset);
    var cells = [];
    for (var i = 0; i < 42; i++) {
      var d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
      cells.push(toISODate(d));
    }
    return cells;
  }

  function renderCalendrier() {
    var content = $('#content');
    if (!content) return;
    var ym = getCalMonth();
    var sel = getSelDay();
    var cells = monthCells(ym);
    var y = Number(ym.slice(0, 4)), mo = Number(ym.slice(5, 7)) - 1;
    var monthLabel = new Date(y, mo, 1).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
    var weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    var dayIdx = buildDayIndex();

    var gridHtml = cells.map(function (iso) {
      var day = collectDay(iso, dayIdx);
      var inMonth = iso.slice(0, 7) === ym;
      var cls = ['cal-day'];
      if (!inMonth) cls.push('out');
      if (isFerie(iso)) cls.push('ferie');
      if (iso === todayISO()) cls.push('today');
      if (iso === sel) cls.push('sel');
      var late = day.echeances.some(function (e) { return !e.done && e.date < todayISO(); });
      if (late) cls.push('has-late');
      var dots = [];
      day.echeances.slice(0, 6).forEach(function (e) {
        dots.push('<span class="dot dot-' + dotKind(e) + '" draggable="true" data-kind="echeance" data-id="' + esc(e.id) + '" title="' + esc((e.intitule || e.type || '') + ' (' + e.date + ')') + '"></span>');
      });
      day.audiences.slice(0, 4).forEach(function (a) {
        dots.push('<span class="dot dot-aud" draggable="true" data-kind="audience" data-id="' + esc(a.id) + '" title="Audience ' + esc(a.juridiction || '') + ' ' + esc(a.heure || '') + '">' + window.ico('scale') + '</span>');
      });
      var more = (day.echeances.length + day.audiences.length) - dots.length;
      var fEmise = day.factures.filter(function (f) { return f.statut === 'Émise'; }).length;
      var fEnc = day.factures.filter(function (f) { return f.statut === 'Encaissée'; }).length;
      var badges = (fEmise ? '<span class="mini-badge" title="Facture emise">' + window.ico('coin') + '</span>' : '') + (fEnc ? '<span class="mini-badge ok" title="Facture encaissée">' + window.ico('check') + '</span>' : '');
      var birth = day.naissances.length ? '<span class="birth" title="' + day.naissances.length + ' dossier(s) cree(s)"><span class="dot dot-autre"></span></span>' : '';
      return '<div class="' + cls.join(' ') + '" data-day="' + iso + '" tabindex="0" role="button" aria-label="' + iso + '">' +
        '<span class="dnum">' + Number(iso.slice(8, 10)) + '</span>' + badges +
        '<span class="dots">' + dots.join('') + (more > 0 ? '<span class="more">+' + more + '</span>' : '') + '</span>' + birth + '</div>';
    }).join('');

    content.innerHTML =
      '<div class="cab">' +
      '<div class="kicker">Agenda — audiences, rythmes, abonnements</div><h2>Calendrier</h2>' +
      '<p class="sub">Dots : <span class="dot dot-rythme"></span> rythme J0-J7 · <span class="dot dot-abo"></span> abonnement · ' +
      '<span class="dot dot-delai"></span> delai recours · <span class="dot dot-aud">' + window.ico('scale') + '</span> audience · ' +
      '<span class="dot dot-autre"></span> autre — ' + window.ico('coin') + ' facture emise · ' + window.ico('check') + ' encaissée · <span class="dot dot-autre"></span> naissance dossier. Glisser-deposer pour reporter.</p>' +
      '<div class="cab-toolbar">' +
      '<button class="btn" id="calPrev" aria-label="Mois precedent">←</button>' +
      '<strong id="calLabel" style="align-self:center;min-width:170px;text-align:center;text-transform:capitalize">' + esc(monthLabel) + '</strong>' +
      '<button class="btn" id="calNext" aria-label="Mois suivant">→</button>' +
      '<button class="btn" id="calToday">Aujourd’hui (t)</button>' +
      '<button class="btn" id="calPush">Pousser mes alertes au calendrier</button>' +
      '</div>' +
      '<div class="cal-legend" aria-hidden="true"></div>' +
      '<div class="cal-grid" role="grid">' +
      weekDays.map(function (w) { return '<div class="cal-wd">' + w + '</div>'; }).join('') + gridHtml +
      '</div>' +
      '<div id="calDayPanel" style="margin-top:14px"></div>' +
      '<div id="calWeek" style="margin-top:14px"></div>' +
      '</div>';
    var crumbs = $('#crumbs');
    if (crumbs) crumbs.innerHTML = '<span class="cur">Cabinet — Calendrier</span>';

    $('#calPrev').addEventListener('click', function () { shiftMonth(-1); });
    $('#calNext').addEventListener('click', function () { shiftMonth(1); });
    $('#calToday').addEventListener('click', function () { var t = todayISO(); setCalMonth(t.slice(0, 7)); setSelDay(t); renderCalendrier(); });
    $('#calPush').addEventListener('click', function () { exportAlertsICS(); });

    $$('.cal-day', content).forEach(function (cell) {
      cell.addEventListener('click', function (ev) {
        if (ev.target && ev.target.draggable) return;
        setSelDay(cell.dataset.day);
        if (cell.dataset.day.slice(0, 7) !== getCalMonth()) setCalMonth(cell.dataset.day.slice(0, 7));
        renderCalendrier();
      });
      cell.addEventListener('keydown', function (ev) {
        if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); setSelDay(cell.dataset.day); renderCalendrier(); }
      });
      cell.addEventListener('dragover', function (ev) { ev.preventDefault(); cell.classList.add('over'); });
      cell.addEventListener('dragleave', function () { cell.classList.remove('over'); });
      cell.addEventListener('drop', function (ev) {
        ev.preventDefault(); cell.classList.remove('over');
        var raw = null;
        try { raw = ev.dataTransfer.getData('text/plain'); } catch (e) { console.warn('avocato', e); }
        if (!raw) return;
        var obj = null;
        try { obj = JSON.parse(raw); } catch (e) { return; }
        if (!obj || !obj.kind || !obj.id) return;
        dropOnDay(obj.kind, obj.id, cell.dataset.day);
      });
    });
    $$('.cal-day .dot[draggable="true"]', content).forEach(function (dot) {
      dot.addEventListener('dragstart', function (ev) {
        ev.dataTransfer.setData('text/plain', JSON.stringify({ kind: dot.dataset.kind, id: dot.dataset.id }));
        ev.dataTransfer.effectAllowed = 'move';
      });
    });

    renderDayPanel(sel);
    renderWeek(sel);
  }

  function shiftMonth(n) {
    var ym = getCalMonth();
    var y = Number(ym.slice(0, 4)), mo = Number(ym.slice(5, 7)) - 1 + n;
    var d = new Date(y, mo, 1);
    setCalMonth(d.getFullYear() + '-' + pad(d.getMonth() + 1));
    renderCalendrier();
  }

  function renderDayPanel(dateISO) {
    var host = $('#calDayPanel');
    if (!host) return;
    var day = collectDay(dateISO);
    function echRow(e) {
      var d = dossierOf(e.dossierId);
      return '<div class="today-action' + (!e.done && e.date < todayISO() ? ' late' : '') + '">' +
        '<input type="checkbox" data-ech-done="' + esc(e.id) + '"' + (e.done ? ' checked' : '') + ' aria-label="Marquer comme faite : ' + esc(e.intitule || e.type || 'échéance') + '">' +
        '<span class="ta-date mono">' + esc(e.date) + '</span>' +
        '<span class="ta-body"><span class="dot dot-' + dotKind(e) + '"></span> <strong>' + esc(e.intitule || e.type || '') + '</strong>' +
        (d ? ' — ' + esc(d.client) : '') + ' <span class="badge">' + esc(e.type || '') + '</span></span>' +
        '<button class="btn btn-sm" data-ech-open="' + esc(e.id) + '">Ouvrir</button>' +
        '<button class="btn btn-sm" data-ech-ics="' + esc(e.id) + '" title="Exporter .ics">ICS</button>' +
        '</div>';
    }
    function audRow(a) {
      var d = dossierOf(a.dossierId);
      return '<div class="today-action">' +
        '<span class="ta-ico">' + window.ico('scale') + '</span>' +
        '<span class="ta-date mono">' + esc(a.date) + (a.heure ? ' ' + esc(a.heure) : '') + '</span>' +
        '<span class="ta-body"><strong>' + esc(a.juridiction || 'Audience') + '</strong> — ' + esc(a.objet || '') +
        (d ? ' · ' + esc(d.client) : '') + ' <span class="badge">' + esc(a.etat || '') + '</span></span>' +
        '<button class="btn btn-sm" data-aud-edit="' + esc(a.id) + '">Détails</button>' +
        '<button class="btn btn-sm" data-aud-jug="' + esc(a.id) + '">Jugement</button>' +
        '<button class="btn btn-sm" data-aud-ics="' + esc(a.id) + '" title="Exporter .ics">ICS</button>' +
        '</div>';
    }
    host.innerHTML =
      '<div class="dash-panel"><h3>' + esc(fmtCourt(dateISO) || dateISO) + ' <span class="mono" style="color:var(--text-dim)">' + esc(dateISO) + '</span>' +
      (isFerie(dateISO) ? ' <span class="badge">férié / week-end</span>' : '') + '</h3>' +
      (day.echeances.length ? day.echeances.map(echRow).join('') : '<p class="today-clear">Aucune échéance.</p>') +
      (day.audiences.length ? '<h3 style="margin-top:10px">Audiences (' + day.audiences.length + ')</h3>' + day.audiences.map(audRow).join('') : '') +
      (day.factures.length ? '<p style="font-size:12.5px">Factures : ' + day.factures.map(function (f) { return esc(f.num + ' ' + f.statut); }).join(' · ') + '</p>' : '') +
      (day.naissances.length ? '<p style="font-size:12.5px"><span class="dot dot-autre" style="vertical-align:middle"></span> Dossiers créés : ' + day.naissances.map(function (d) { return esc(d.client); }).join(' · ') + '</p>' : '') +
      '<div class="cab-toolbar">' +
      '<button class="btn btn-sm" id="dayEchAdd">+ Échéance ce jour</button>' +
      '<button class="btn btn-sm" id="dayAudAdd">+ Audience ce jour</button>' +
      '<button class="btn btn-sm" id="dayICS">ICS du jour</button>' +
      '</div></div>';

    $$('[data-ech-done]', host).forEach(function (cb) {
      cb.addEventListener('change', function () {
        var arr = echeances();
        var e = arr.find(function (x) { return x.id === cb.dataset.echDone; });
        if (e) { e.done = cb.checked; LS.set('echeances', arr); refreshBell(); renderCalendrier(); }
      });
    });
    $$('[data-ech-open]', host).forEach(function (b) {
      b.addEventListener('click', function () {
        var e = echeances().find(function (x) { return x.id === b.dataset.echOpen; });
        if (e && e.dossierId && window.Cabinet) window.Cabinet.viewDossier(e.dossierId);
        else if (window.Cabinet) window.Cabinet.goView('echeances');
      });
    });
    $$('[data-ech-ics]', host).forEach(function (b) {
      b.addEventListener('click', function () {
        var e = echeances().find(function (x) { return x.id === b.dataset.echIcs; });
        if (!e) return;
        var ics = buildICS([{ uid: 'ech-' + e.id, date: e.date, heure: '', title: e.intitule || e.type, desc: 'Type: ' + (e.type || '') + ' · Dossier: ' + ((dossierOf(e.dossierId) || {}).client || '') }]);
        downloadText('avocato-' + e.date + '-' + e.id.slice(-4) + '.ics', ics);
      });
    });
    $$('[data-aud-edit]', host).forEach(function (b) {
      b.addEventListener('click', function () { if (window.Cour) window.Cour.openAudienceDlg(b.dataset.audEdit); });
    });
    $$('[data-aud-jug]', host).forEach(function (b) {
      b.addEventListener('click', function () { if (window.Cour) window.Cour.openJugement(b.dataset.audJug); });
    });
    $$('[data-aud-ics]', host).forEach(function (b) {
      b.addEventListener('click', function () {
        var a = audiences().find(function (x) { return x.id === b.dataset.audIcs; });
        if (!a) return;
        var d = dossierOf(a.dossierId);
        var ics = buildICS([{ uid: 'aud-' + a.id, date: a.date, heure: a.heure || '', title: 'Audience ' + (a.juridiction || '') + (d ? ' — ' + d.client : ''), desc: a.objet || '', lieu: [a.juridiction, a.ville].filter(Boolean).join(' — ') }]);
        downloadText('avocato-audience-' + a.date + '.ics', ics);
      });
    });
    $('#dayEchAdd').addEventListener('click', function () {
      openEcheanceForDay(dateISO);
    });
    $('#dayAudAdd').addEventListener('click', function () {
      if (window.Cour) {
        window.Cour.openAudienceDlg();
        setTimeout(function () {
          try {
            var f = document.getElementById('formAudience');
            if (f && f.elements && f.elements.namedItem('date')) f.elements.namedItem('date').value = dateISO;
          } catch (e) { console.warn('avocato', e); }
        }, 120);
      }
    });
    $('#dayICS').addEventListener('click', function () { exportDayICS(dateISO); });
  }

  function openEcheanceForDay(dateISO) {
    // Reutilise le dialog existant #dlgEcheance si present, sinon creation directe
    var dlg = document.getElementById('dlgEcheance');
    if (!dlg) {
      var arr = echeances();
      var e = { id: uid(), dossierId: '', date: dateISO, type: 'Autre', intitule: 'Échéance du ' + dateISO, done: false };
      arr.push(e); LS.set('echeances', arr); refreshBell(); renderCalendrier();
      return;
    }
    try {
      var sel = document.getElementById('echeanceDossierSel');
      if (sel) {
        sel.innerHTML = '<option value="">— Sans dossier —</option>' + dossiers().map(function (d) { return '<option value="' + esc(d.id) + '">' + esc(d.client) + '</option>'; }).join('');
      }
      var form = document.getElementById('formEcheance');
      if (form) {
        form.reset();
        var di = form.querySelector('[name="date"]');
        if (di) di.value = dateISO;
      }
      dlg.showModal();
      // A la soumission, cabinet.js re-rendera la vue echeances ; on revient au calendrier
      setTimeout(function () {
        try {
          var f2 = document.getElementById('formEcheance');
          if (f2 && !f2._agendaHook) {
            f2._agendaHook = true;
            f2.addEventListener('submit', function () {
              setTimeout(function () {
                try { if ((LS.get('cabinetView', '') === 'calendrier')) renderCalendrier(); } catch (e) { console.warn('avocato', e); }
                refreshBell();
              }, 150);
            });
          }
        } catch (e) { console.warn('avocato', e); }
      }, 50);
    } catch (e) { console.warn('avocato', e); }
  }

  function dropOnDay(kind, id, newDate) {
    if (kind === 'echeance') {
      var arr = echeances();
      var e = arr.find(function (x) { return x.id === id; });
      if (!e || e.date === newDate) return;
      var old = e.date;
      e.date = newDate;
      LS.set('echeances', arr);
      refreshBell();
      renderCalendrier();
      var isRythme = (e.auto === 'RYTHME');
      toast('Échéance déplacée au ' + newDate + '.' + (isRythme ? ' (rythme J0-J7 : vérifiez la cohérence)' : ''), {
        undo: function () {
          var a2 = echeances();
          var x = a2.find(function (y) { return y.id === id; });
          if (x) { x.date = old; LS.set('echeances', a2); }
          refreshBell(); renderCalendrier();
        }
      });
    } else if (kind === 'audience') {
      var list = audiences();
      var a = list.find(function (x) { return x.id === id; });
      if (!a || a.date === newDate) return;
      var prev = a.date;
      a.date = newDate;
      if (a.etat === 'À venir') a.etat = 'Reportée';
      a.updatedAt = new Date().toISOString();
      LS.set('audiences', list);
      // journalise le report dans les transitions du dossier
      try {
        var tr = LS.get('transitions', []) || [];
        tr.push({ id: uid(), dossierId: a.dossierId || '', client: (dossierOf(a.dossierId) || {}).client || '', from: 'Audience ' + prev, to: 'Report ' + newDate, at: new Date().toISOString(), force: false, motif: 'drag calendrier' });
        while (tr.length > 400) tr.shift();
        LS.set('transitions', tr);
      } catch (e) { console.warn('avocato', e); }
      refreshBell();
      renderCalendrier();
      toast('Audience reportée au ' + newDate + ' (ancien ' + prev + ' journalisé).', {
        undo: function () {
          var l2 = audiences();
          var y = l2.find(function (z) { return z.id === id; });
          if (y) { y.date = prev; LS.set('audiences', l2); }
          refreshBell(); renderCalendrier();
        }
      });
    }
  }

  /* ---------------- semaine de tribunal ---------------- */
  function weekRange(dateISO) {
    var d = new Date(dateISO + 'T12:00:00');
    var off = (d.getDay() + 6) % 7;
    var mon = new Date(d); mon.setDate(d.getDate() - off);
    var days = [];
    for (var i = 0; i < 7; i++) { var x = new Date(mon); x.setDate(mon.getDate() + i); days.push(toISODate(x)); }
    return days;
  }
  function renderWeek(selISO) {
    var host = $('#calWeek');
    if (!host) return;
    var days = weekRange(selISO || todayISO());
    var auds = audiences().filter(function (a) { return days.indexOf(a.date) !== -1; });
    var groups = {};
    auds.forEach(function (a) {
      var k = a.juridiction || 'Autre';
      groups[k] = groups[k] || [];
      groups[k].push(a);
    });
    var keys = Object.keys(groups).sort();
    var rows = keys.map(function (k) {
      var list = groups[k].sort(function (a, b) { return (a.date + (a.heure || '')).localeCompare(b.date + (b.heure || '')); });
      return '<div class="trib-group"><strong>' + esc(k) + ' <span class="mono">(' + list.length + ')</span></strong>' +
        list.map(function (a) {
          var d = dossierOf(a.dossierId);
          return '<div class="today-action"><span class="ta-date mono">' + esc(fmtCourt(a.date)) + (a.heure ? ' ' + esc(a.heure) : '') + '</span>' +
            '<span class="ta-body">' + esc(a.objet || '') + (d ? ' — ' + esc(d.client) : '') + (a.role ? ' <span class="mono">· ' + esc(a.role) + '</span>' : '') + '</span>' +
            '<button class="btn btn-sm" data-trib-open="' + esc(a.id) + '">Détails</button></div>';
        }).join('') + '</div>';
    }).join('');
    host.innerHTML = '<div class="dash-panel"><h3>Semaine de tribunal <span class="mono" style="color:var(--text-dim)">' + esc(days[0]) + ' → ' + esc(days[6]) + '</span>' +
      '<span class="mono" style="margin-left:auto">' + auds.length + ' audience(s)</span></h3>' +
      (auds.length ? rows : '<p class="today-clear">Aucune audience cette semaine.</p>') + '</div>';
    $$('[data-trib-open]', host).forEach(function (b) {
      b.addEventListener('click', function () { if (window.Cour) window.Cour.openAudienceDlg(b.dataset.tribOpen); });
    });
  }

  /* ---------------- cloche topbar ---------------- */
  var bellBtn = null, bellPanel = null;
  function ensureBell() {
    var actions = $('.topbar-actions');
    if (!actions) return;
    if (!bellBtn) {
      bellBtn = document.createElement('button');
      bellBtn.className = 'icon-btn';
      bellBtn.id = 'bellBtn';
      bellBtn.type = 'button';
      bellBtn.setAttribute('aria-label', 'Alertes');
      bellBtn.setAttribute('data-tip', 'Alertes');
      bellBtn.innerHTML = '<svg class="ico" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2a4 4 0 0 0-4 4v2.4L2.8 10h10.4L12 8.4V6a4 4 0 0 0-4-4Z"/><path d="M6.6 12.2a1.5 1.5 0 0 0 2.8 0"/></svg><span id="bellCount" class="bell-count" hidden></span>';
      bellBtn.addEventListener('click', function (ev) { ev.stopPropagation(); toggleBell(); });
      actions.insertBefore(bellBtn, actions.firstChild);
      document.addEventListener('click', function (ev) {
        if (!bellPanel || bellPanel.hidden) return;
        if (bellPanel.contains(ev.target) || bellBtn.contains(ev.target)) return;
        bellPanel.hidden = true;
      });
      document.addEventListener('keydown', function (ev) {
        if (ev.key === 'Escape' && bellPanel && !bellPanel.hidden) bellPanel.hidden = true;
      });
    }
    if (!bellPanel) {
      bellPanel = document.createElement('div');
      bellPanel.id = 'bellPanel';
      bellPanel.hidden = true;
      document.body.appendChild(bellPanel);
    }
    refreshBell();
  }
  function toggleBell() {
    if (!bellPanel) return;
    if (bellPanel.hidden) { renderBellPanel(); bellPanel.hidden = false; }
    else bellPanel.hidden = true;
  }
  function refreshBell() {
    if (!bellBtn) { ensureBell(); return; }
    try {
      var modeNow = (window.Cabinet && window.Cabinet.getMode) ? window.Cabinet.getMode() : 'cabinet';
      if (modeNow === 'vault' || modeNow === 'Base') { bellBtn.style.display = 'none'; if (bellPanel) bellPanel.hidden = true; return; }
      bellBtn.style.display = '';
    } catch (e) { console.warn('avocato', e); }
    var alerts = [];
    try { alerts = computeAlerts(); } catch (e) { alerts = []; }
    var badge = $('#bellCount');
    var n = alerts.filter(function (a) { return a.level === 'late' || a.level === 'urgent'; }).length || alerts.length;
    if (badge) {
      if (!alerts.length) { badge.hidden = true; }
      else {
        badge.hidden = false;
        badge.textContent = String(alerts.length > 9 ? '9+' : alerts.length);
        badge.classList.toggle('urgent', alerts.some(function (a) { return a.level === 'late' || a.level === 'urgent'; }));
      }
    }
    bellBtn.setAttribute('data-tip', alerts.length ? alerts.length + ' alerte(s)' : 'Alertes');
    bellBtn.setAttribute('aria-label', alerts.length ? ('Alertes : ' + alerts.length) : 'Alertes');
    bellBtn.classList.toggle('has-alert', alerts.length > 0);
    bellBtn.classList.toggle('has-urgent', alerts.some(function (a) { return a.level === 'late' || a.level === 'urgent'; }));
    if (bellPanel && !bellPanel.hidden) renderBellPanel();
    // badge audiences dans la nav ? (optionnel, discret)
    try {
      var navAud = document.querySelector('.cab-nav-item[data-view="audiences"]');
      if (navAud) {
        var tmr = new Date(); tmr.setDate(tmr.getDate() + 1);
        var tmrISO = toISODate(tmr);
        var nAud = audiences().filter(function (a) { return (a.etat === 'À venir' || a.etat === 'Reportée') && a.date === tmrISO; }).length;
        var ex = navAud.querySelector('.nav-count');
        if (nAud > 0) {
          if (!ex) { ex = document.createElement('span'); ex.className = 'nav-count'; navAud.appendChild(ex); }
          ex.textContent = String(nAud);
        } else if (ex) ex.remove();
      }
    } catch (e) { console.warn('avocato', e); }
  }
  function kindLabel(k) {
    return { audience: 'Audience', delai: 'Délai', echeance: 'Échéance', solde: 'Solde', abo: 'Abo' }[k] || k;
  }
  function renderBellPanel() {
    if (!bellPanel || !bellBtn) return;
    var alerts = computeAlerts();
    var seuils = getReglages();
    var r = bellBtn.getBoundingClientRect();
    bellPanel.style.top = (r.bottom + 8 + window.scrollY) + 'px';
    bellPanel.style.right = Math.max(8, document.documentElement.clientWidth - r.right) + 'px';
    var items = alerts.slice(0, 30).map(function (al) {
      return '<div class="bell-item lvl-' + al.level + '">' +
        '<span class="bell-kind">' + esc(kindLabel(al.kind)) + '</span>' +
        '<span class="bell-body"><strong>' + esc(al.title) + '</strong><span class="bell-detail">' + esc(al.detail || '') + ' · ' + esc(al.date) + '</span></span>' +
        '<span class="bell-btns">' +
        '<button class="btn btn-sm" data-bell-open="' + esc(al.id) + '">Ouvrir</button>' +
        '<button class="btn btn-sm" data-bell-ics="' + esc(al.id) + '" title="Exporter .ics">ICS</button>' +
        '<button class="btn btn-sm" data-bell-snooze="' + esc(al.id) + '" title="Masquer 24 h">+24 h</button>' +
        '</span></div>';
    }).join('');
    bellPanel.innerHTML =
      '<div class="bell-head"><strong>Alertes (' + alerts.length + ')</strong>' +
      '<span><button class="btn btn-sm" id="bellPush">Pousser au calendrier</button> ' +
      '<button class="btn btn-sm" id="bellCal">Calendrier</button></span></div>' +
      (alerts.length ? items : '<p class="today-clear" style="margin:10px 14px">Rien à signaler. Le cabinet tient.</p>') +
      '<div class="bell-seuils"><span>Seuils :</span>' +
      '<span>Aud. <label>proche <input id="seAudSoon" type="number" min="1" max="168" value="' + seuils.audSoonH + '" aria-label="Seuil audience proche (heures)">h</label> / <label>urgent <input id="seAudUrg" type="number" min="1" max="72" value="' + seuils.audUrgentH + '" aria-label="Seuil audience urgente (heures)">h</label></span>' +
      '<span>Délais <label>proche <input id="seDelSoon" type="number" min="1" max="30" value="' + seuils.delaiSoonJ + '" aria-label="Seuil délai proche (jours)">j</label> / <label>urgent <input id="seDelUrg" type="number" min="1" max="14" value="' + seuils.delaiUrgentJ + '" aria-label="Seuil délai urgent (jours)">j</label></span>' +
      '<span><label>Solde <input id="seSolde" type="number" min="1" max="60" value="' + seuils.soldeJ + '" aria-label="Seuil relance solde (jours)">j</label></span>' +
      '<button class="btn btn-sm" id="bellSaveSeuils">OK</button></div>';
    $$('[data-bell-open]', bellPanel).forEach(function (b) {
      b.addEventListener('click', function () {
        var al = computeAlerts().find(function (x) { return x.id === b.dataset.bellOpen; });
        if (!al) return;
        bellPanel.hidden = true;
        if (al.audienceId && window.Cour) window.Cour.openAudienceDlg(al.audienceId);
        else if (al.dossierId && window.Cabinet) window.Cabinet.viewDossier(al.dossierId);
        else if (window.Cabinet) window.Cabinet.goView('echeances');
      });
    });
    $$('[data-bell-ics]', bellPanel).forEach(function (b) {
      b.addEventListener('click', function () {
        var al = computeAlerts().find(function (x) { return x.id === b.dataset.bellIcs; });
        if (!al) return;
        var ics = buildICS([alertToEvent(al)]);
        downloadText('avocato-alerte-' + al.date + '.ics', ics);
        toast('Alerte exportée en .ics (rappels 48 h / 2 h).');
      });
    });
    $$('[data-bell-snooze]', bellPanel).forEach(function (b) {
      b.addEventListener('click', function () { snooze(b.dataset.bellSnooze); renderBellPanel(); });
    });
    $('#bellPush').addEventListener('click', function () { exportAlertsICS(); });
    $('#bellCal').addEventListener('click', function () {
      bellPanel.hidden = true;
      if (window.Cabinet) { if (window.Cabinet.getMode() !== 'cabinet') window.Cabinet.setMode('cabinet'); window.Cabinet.goView('calendrier'); }
    });
    $('#bellSaveSeuils').addEventListener('click', function () {
      setReglages({
        audSoonH: Number($('#seAudSoon').value) || 48,
        audUrgentH: Number($('#seAudUrg').value) || 24,
        delaiSoonJ: Number($('#seDelSoon').value) || 7,
        delaiUrgentJ: Number($('#seDelUrg').value) || 3,
        soldeJ: Number($('#seSolde').value) || 7
      });
      refreshBell(); renderBellPanel();
      toast('Seuils d’alerte enregistrés.');
    });
  }

  /* ---------------- Aujourd hui : audiences demain ---------------- */
  function injectToday() {
    try {
      var content = $('#content');
      if (!content) return;
      var host = content.querySelector('.cab.today');
      if (!host || host.querySelector('[data-agenda-tmr]')) return;
      var tmr = new Date(); tmr.setDate(tmr.getDate() + 1);
      var tmrISO = toISODate(tmr);
      var list = audiences().filter(function (a) { return (a.etat === 'À venir' || a.etat === 'Reportée') && a.date === tmrISO; });
      if (!list.length) return;
      var bar = document.createElement('div');
      bar.className = 'dash-panel';
      bar.setAttribute('data-agenda-tmr', '1');
      bar.style.borderLeft = '2px solid var(--brass)';
      bar.innerHTML = '<h3>' + window.ico('scale') + ' ' + list.length + ' audience(s) demain (' + esc(fmtCourt(tmrISO)) + ')</h3>' +
        list.slice(0, 5).map(function (a) {
          var d = dossierOf(a.dossierId);
          return '<div class="today-action"><span class="ta-ico">' + window.ico('scale') + '</span>' +
            '<span class="ta-date mono">' + esc(a.heure || a.date) + '</span>' +
            '<span class="ta-body"><strong>' + esc(a.juridiction || 'Audience') + '</strong> — ' + esc(a.objet || '') + (d ? ' · ' + esc(d.client) : '') + '</span>' +
            '<button class="btn btn-sm" data-tmr-open="' + esc(a.id) + '">Ouvrir</button></div>';
        }).join('') +
        '<div class="cab-toolbar"><button class="btn btn-sm" id="tmrCal">Voir le calendrier</button></div>';
      var h2 = host.querySelector('h2');
      var sub = host.querySelector('.sub');
      var anchor = sub || h2;
      if (anchor && anchor.nextSibling) host.insertBefore(bar, anchor.nextSibling);
      else host.prepend(bar);
      $$('[data-tmr-open]', bar).forEach(function (b) {
        b.addEventListener('click', function () { if (window.Cour) window.Cour.openAudienceDlg(b.dataset.tmrOpen); });
      });
      var tc = $('#tmrCal', bar);
      if (tc) tc.addEventListener('click', function () { if (window.Cabinet) window.Cabinet.goView('calendrier'); });
    } catch (e) { console.warn('avocato', e); }
  }

  /* ---------------- greffes ---------------- */
  /* Hooks par événement : cabinet.js et cabinet-cour.js émettent 'avocato:rendered'
     après chaque rendu (y compris les appels internes via goView, que les anciens
     monkey-patches de window.Cabinet/window.Cour ne voyaient jamais passer). */
  function initHooks() {
    document.addEventListener('avocato:rendered', function (e) {
      var d = (e && e.detail) || {};
      setTimeout(function () {
        try {
          if (d.view === 'today' || !d.view) injectToday();
          if (d.view === 'audiences') { injectAudienceAgenda(); injectAudienceICS(); }
          refreshBell();
        } catch (err) { console.warn('avocato', err); }
      }, 80);
    });
  }

  function onKey(e) {
    try {
      var cv = LS.get('cabinetView', '');
      if (cv !== 'calendrier') return;
      if (e.target && e.target.matches && e.target.matches('input, textarea, select')) return;
      if (document.querySelector('dialog[open]')) return;
      if (window.Cabinet.getMode() !== 'cabinet') return;
      if (e.key === 'ArrowLeft') { e.preventDefault(); shiftMonth(-1); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); shiftMonth(1); }
      else if (e.key === 't' || e.key === 'T') { e.preventDefault(); var t = todayISO(); setCalMonth(t.slice(0, 7)); setSelDay(t); renderCalendrier(); }
    } catch (err) { console.warn('avocato', err); }
  }

  function init() {
    initHooks();
    ensureBell();
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', function (e) {
      try {
        if (e.target && e.target.closest && (e.target.closest('.mode-btn') || e.target.closest('.cab-nav-item'))) {
          setTimeout(refreshBell, 150);
        }
      } catch (err) { console.warn('avocato', err); }
    });
    document.addEventListener('visibilitychange', function () { if (!document.hidden) refreshBell(); });
    setInterval(refreshBell, 60000);
    setTimeout(ensureBell, 800);
    setTimeout(ensureBell, 2000);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  /* ---------------- agenda audiences ---------------- */
  function upcomingAudiences() {
    var t = todayISO();
    return audiences().filter(function (a) {
      return (a.etat === 'À venir' || a.etat === 'Reportée') && a.date >= t;
    }).sort(function (a, b) { return (a.date + (a.heure || '')).localeCompare(b.date + (b.heure || '')); });
  }
  function jBadge(iso) {
    var d = diffDays(iso, todayISO());
    if (d < 0) return '<span class="badge j-late">en retard</span>';
    if (d === 0) return '<span class="badge j-today">aujourd’hui</span>';
    if (d === 1) return '<span class="badge j-tmr">demain</span>';
    return '<span class="badge">J-' + d + '</span>';
  }
  function injectAudienceAgenda() {
    var content = $('#content');
    if (!content) return;
    var cab = content.querySelector('.cab');
    if (!cab) return;
    var h2 = cab.querySelector('h2');
    if (!h2 || !/Audiences/.test(h2.textContent)) return;
    if (cab.querySelector('[data-ag-agenda]')) return;
    var list = upcomingAudiences();
    var shown = list.slice(0, 30);
    var rest = list.length - shown.length;
    var byDay = {};
    shown.forEach(function (a) { (byDay[a.date] = byDay[a.date] || []).push(a); });
    var days = Object.keys(byDay).sort().slice(0, 14);
    var html = days.map(function (day) {
      return '<div class="ag-day">' + esc(fmtCourt(day)) + ' <span class="mono">' + esc(day) + '</span> ' + jBadge(day) + '</div>' +
        byDay[day].map(function (a) {
          var d = dossierOf(a.dossierId);
          return '<div class="today-action"><span class="ta-ico">' + window.ico('scale') + '</span>' +
            '<span class="ta-date mono">' + esc(a.heure || '—') + '</span>' +
            '<span class="ta-body"><strong>' + esc(a.juridiction || 'Audience') + '</strong> — ' + esc(a.objet || '') +
            (d ? ' · ' + esc(d.client) : '') + (a.role ? ' <span class="mono">· ' + esc(a.role) + '</span>' : '') +
            ' <span class="badge">' + esc(a.etat || '') + '</span></span>' +
            '<button class="btn btn-sm" data-ag-det="' + esc(a.id) + '">Détails</button>' +
            '<button class="btn btn-sm" data-ag-suivi="' + esc(a.id) + '" title="Fiche de suivi mahakim">Suivi</button>' +
            '<button class="btn btn-sm" data-ag-ics="' + esc(a.id) + '" title="Exporter .ics (rappels 48 h / 2 h)">ICS</button></div>';
        }).join('');
    }).join('');
    var panel = document.createElement('div');
    panel.className = 'dash-panel';
    panel.setAttribute('data-ag-agenda', '1');
    panel.style.margin = '14px 0';
    panel.innerHTML = '<h3>Agenda — audiences à venir (' + list.length + ')</h3>' +
      (days.length ? html : '<p class="today-clear">Aucune audience à venir.</p>') +
      (rest > 0 ? '<p class="today-clear">+' + rest + ' au-delà (voir Calendrier).</p>' : '') +
      '<div class="cab-toolbar"><button class="btn btn-sm btn-primary" id="agPrint">Imprimer le rôle</button>' +
      '<button class="btn btn-sm" id="agWeekICS">ICS des 7 jours</button>' +
      '<button class="btn btn-sm" id="agCal">Voir le calendrier</button></div>';
    var sub = cab.querySelector('.sub');
    if (sub && sub.nextSibling) cab.insertBefore(panel, sub.nextSibling);
    else cab.insertBefore(panel, cab.children[1] || null);
    $$('[data-ag-det]', panel).forEach(function (b) {
      b.addEventListener('click', function () { if (window.Cour) window.Cour.openAudienceDlg(b.dataset.agDet); });
    });
    $$('[data-ag-suivi]', panel).forEach(function (b) {
      b.addEventListener('click', function () { if (window.Mahakim) window.Mahakim.openSuivi(b.dataset.agSuivi); });
    });
    $$('[data-ag-ics]', panel).forEach(function (b) {
      b.addEventListener('click', function () { downloadAudienceICS(b.dataset.agIcs); });
    });
    $('#agPrint').addEventListener('click', openRolePrint);
    $('#agWeekICS').addEventListener('click', function () {
      var evs = [];
      for (var i = 0; i < 7; i++) {
        var day = addDaysISO(todayISO(), i);
        collectDay(day).audiences.forEach(function (a) {
          var d = dossierOf(a.dossierId);
          evs.push({ uid: 'aud-' + a.id, date: a.date, heure: a.heure || '', title: 'Audience ' + (a.juridiction || '') + (d ? ' — ' + d.client : ''), desc: a.objet || '', lieu: [a.juridiction, a.ville].filter(Boolean).join(' — ') });
        });
      }
      if (!evs.length) { toast('Aucune audience ces 7 jours.'); return; }
      downloadText('avocato-audiences-7j-' + todayISO() + '.ics', buildICS(evs));
      toast(evs.length + ' audience(s) exportée(s) (rappels 48 h / 2 h).');
    });
    $('#agCal').addEventListener('click', function () { if (window.Cabinet) window.Cabinet.goView('calendrier'); });
    initAudienceTabs(cab);
  }
  function getAudienceTab() {
    var t = LS.get('audienceTab', null);
    return (t === 'jour' || t === 'toutes') ? t : 'agenda';
  }
  function nextAudienceDay() {
    var list = upcomingAudiences();
    return list.length ? list[0].date : todayISO();
  }
  function buildDayPanel(dayISO) {
    var t = dayISO || nextAudienceDay();
    var isToday = (t === todayISO());
    var list = audiences().filter(function (a) { return a.date === t; })
      .sort(function (a, b) { return (a.heure || '').localeCompare(b.heure || ''); });
    var el = document.createElement('div');
    el.className = 'dash-panel';
    el.setAttribute('data-ag-day', '1');
    el.style.margin = '14px 0';
    el.innerHTML = '<h3>' + (isToday ? 'Rôle du jour' : 'Prochain rôle') + ' — ' + esc(fmtCourt(t)) + ' <span class="mono">' + esc(t) + '</span> (' + list.length + ')</h3>' +
      (list.length ? list.map(function (a) {
        var d = dossierOf(a.dossierId);
        return '<div class="today-action"><span class="ta-ico">' + window.ico('scale') + '</span>' +
          '<span class="ta-date mono" style="font-size:14px;font-weight:700">' + esc(a.heure || '—') + '</span>' +
          '<span class="ta-body"><strong>' + esc(a.juridiction || 'Audience') + '</strong>' +
          (a.ville ? ' — ' + esc(a.ville) : '') + '<br>' +
          (d ? '<strong>' + esc(d.client) + '</strong> · ' : '') +
          (a.role ? '<span class="mono">Rôle ' + esc(a.role) + '</span> · ' : '') + esc(a.objet || '') +
          (a.adverse ? ' <span style="font-size:11px">· adverse : ' + esc(a.adverse) + '</span>' : '') +
          ((a.chambre || a.juge) ? '<br><span style="font-size:11px;color:var(--text-dim)">' + esc([a.chambre, a.juge].filter(Boolean).join(' · ')) + '</span>' : '') +
          ' <span class="badge">' + esc(a.etat || '') + '</span></span>' +
          '<button class="btn btn-sm" data-day-det="' + esc(a.id) + '">Détails</button>' +
          '<button class="btn btn-sm" data-day-suivi="' + esc(a.id) + '">Suivi</button>' +
          '<button class="btn btn-sm" data-day-ics="' + esc(a.id) + '">ICS</button></div>';
      }).join('') : '<p class="today-clear">Aucune audience à venir.</p>') +
      '<div class="cab-toolbar"><button class="btn btn-sm btn-primary" id="agDayPrint">Imprimer le rôle du jour</button>' +
      '<button class="btn btn-sm" id="agDayICS">ICS du jour</button></div>';
    $$('[data-day-det]', el).forEach(function (b) {
      b.addEventListener('click', function () { if (window.Cour) window.Cour.openAudienceDlg(b.dataset.dayDet); });
    });
    $$('[data-day-suivi]', el).forEach(function (b) {
      b.addEventListener('click', function () { if (window.Mahakim) window.Mahakim.openSuivi(b.dataset.daySuivi); });
    });
    $$('[data-day-ics]', el).forEach(function (b) {
      b.addEventListener('click', function () { downloadAudienceICS(b.dataset.dayIcs); });
    });
    return el;
  }
  function initAudienceTabs(cab) {
    if (!cab || cab.querySelector('[data-ag-tabs]')) return;
    var panel = cab.querySelector('[data-ag-agenda]');
    if (!panel) return;
    var newAudBtn = cab.querySelector('#btnNewAud');
    var toolbar = (newAudBtn && newAudBtn.closest) ? newAudBtn.closest('.cab-toolbar') : null;
    if (!toolbar) {
      var kids = cab.children;
      for (var ki = 0; ki < kids.length; ki++) {
        if (kids[ki].classList && kids[ki].classList.contains('empty-state')) { toolbar = kids[ki]; break; }
      }
    }
    var targetDay = nextAudienceDay();
    var nJour = audiences().filter(function (a) { return a.date === targetDay; }).length;
    var nToutes = audiences().length;
    var dayLabel = (targetDay === todayISO()) ? ('Rôle du jour (' + nJour + ')') : ('Prochain rôle · ' + fmtCourt(targetDay) + ' (' + nJour + ')');
    var tabs = document.createElement('div');
    tabs.className = 'ag-tabs';
    tabs.setAttribute('data-ag-tabs', '1');
    tabs.innerHTML = '<button class="btn btn-sm ag-tab" data-tab="agenda">Agenda</button>' +
      '<button class="btn btn-sm ag-tab" data-tab="jour">' + esc(dayLabel) + '</button>' +
      '<button class="btn btn-sm ag-tab" data-tab="toutes">Toutes (' + nToutes + ')</button>';
    cab.insertBefore(tabs, panel);
    var dayPanel = buildDayPanel(targetDay);
    dayPanel.hidden = true;
    cab.insertBefore(dayPanel, panel.nextSibling);
    var tablesBox = document.createElement('div');
    tablesBox.setAttribute('data-ag-tables', '1');
    if (toolbar) {
      cab.insertBefore(tablesBox, toolbar);
      var m = toolbar;
      while (m) { var nx = m.nextSibling; tablesBox.appendChild(m); m = nx; }
    }
    function setTab(name) {
      LS.set('audienceTab', name);
      $$('.ag-tab', tabs).forEach(function (b) { b.classList.toggle('active', b.dataset.tab === name); });
      panel.hidden = (name !== 'agenda');
      dayPanel.hidden = (name !== 'jour');
      tablesBox.hidden = (name !== 'toutes');
    }
    $$('.ag-tab', tabs).forEach(function (b) {
      b.addEventListener('click', function () { setTab(b.dataset.tab); });
    });
    setTab(getAudienceTab());
    var dp = $('#agDayPrint', dayPanel);
    if (dp) dp.addEventListener('click', function () { renderRolePrint(targetDay, 'jour'); });
    var di = $('#agDayICS', dayPanel);
    if (di) di.addEventListener('click', function () { exportDayICS(targetDay); });
  }
  function downloadAudienceICS(audId) {
    var a = audiences().find(function (x) { return x.id === audId; });
    if (!a) return;
    var d = dossierOf(a.dossierId);
    downloadText('avocato-audience-' + (a.date || 'sans-date') + '.ics', buildICS([{
      uid: 'aud-' + a.id, date: a.date, heure: a.heure || '',
      title: 'Audience ' + (a.juridiction || '') + (d ? ' — ' + d.client : ''),
      desc: [a.objet, a.role ? 'Rôle ' + a.role : '', a.adverse ? 'Adverse : ' + a.adverse : ''].filter(Boolean).join(' · '),
      lieu: [a.juridiction, a.ville].filter(Boolean).join(' — ')
    }]));
    toast('Audience exportée en .ics (rappels 48 h / 2 h).');
  }
  function injectAudienceICS() {
    try {
      var content = $('#content');
      if (!content) return;
      $$('tr[data-aid]', content).forEach(function (tr) {
        if (tr.querySelector('[data-ag-icsrow]')) return;
        var cell = tr.querySelector('td:last-child');
        if (!cell) return;
        var b = document.createElement('button');
        b.className = 'btn btn-sm';
        b.textContent = 'ICS';
        b.title = 'Exporter .ics';
        b.setAttribute('data-ag-icsrow', tr.dataset.aid);
        b.addEventListener('click', function () { downloadAudienceICS(tr.dataset.aid); });
        cell.appendChild(document.createTextNode(' '));
        cell.appendChild(b);
      });
    } catch (e) { console.warn('avocato', e); }
  }
  function openRolePrint() {
    var dlg = $('#dlgRole');
    if (!dlg) {
      dlg = document.createElement('dialog');
      dlg.id = 'dlgRole';
      dlg.className = 'dlg';
      dlg.setAttribute('aria-labelledby', 'roleTitle');
      dlg.innerHTML = '<form method="dialog" id="formRole"><h3 id="roleTitle">Rôle d’audiences — impression</h3>' +
        '<div class="form-grid"><label>Jour<input name="day" type="date"></label>' +
        '<label>Portée<select name="span"><option value="jour">Ce jour</option><option value="semaine">7 jours dès ce jour</option></select></label></div>' +
        '<div class="dlg-actions"><button type="button" class="btn" id="btnRoleCancel">Annuler</button>' +
        '<button type="button" class="btn btn-primary" id="btnRoleGo">Aperçu</button></div></form>';
      document.body.appendChild(dlg);
      $('#btnRoleCancel').addEventListener('click', function () { dlg.close(); });
      $('#formRole').addEventListener('submit', function (e) { e.preventDefault(); });
      $('#btnRoleGo').addEventListener('click', function () {
        var fr = $('#formRole');
        dlg.close();
        renderRolePrint(fr.day.value || todayISO(), fr.span.value);
      });
    }
    $('#formRole').day.value = todayISO();
    dlg.showModal();
  }
  function renderRolePrint(dateISO, span) {
    var content = $('#content');
    if (!content) return;
    var days = span === 'semaine' ? [0, 1, 2, 3, 4, 5, 6].map(function (i) { return addDaysISO(dateISO, i); }) : [dateISO];
    var total = 0;
    var body = days.map(function (day) {
      var list = audiences().filter(function (a) { return a.date === day; })
        .sort(function (a, b) { return (a.heure || '').localeCompare(b.heure || ''); });
      total += list.length;
      if (!list.length) return '<h4 class="ag-day">' + esc(fmtCourt(day)) + ' <span class="mono">' + esc(day) + '</span> — néant</h4>';
      return '<h4 class="ag-day">' + esc(fmtCourt(day)) + ' <span class="mono">' + esc(day) + '</span></h4>' +
        '<div class="cab-table-wrap"><table class="cab-table role-table"><thead><tr><th>Heure</th><th>Juridiction / Salle</th><th>Dossier</th><th>Rôle</th><th>Objet / Adverse</th><th>État</th></tr></thead><tbody>' +
        list.map(function (a) {
          var d = dossierOf(a.dossierId);
          return '<tr><td class="mono">' + esc(a.heure || '—') + '</td>' +
            '<td>' + esc(a.juridiction || '') + (a.ville ? '<br><span style="font-size:11px">' + esc(a.ville) + '</span>' : '') + '</td>' +
            '<td><strong>' + esc(d ? d.client : '—') + '</strong></td>' +
            '<td class="mono">' + esc(a.role || '—') + '</td>' +
            '<td style="white-space:normal">' + esc(a.objet || '') + (a.adverse ? '<br><span style="font-size:11px">Adverse : ' + esc(a.adverse) + '</span>' : '') + '</td>' +
            '<td>' + esc(a.etat || '') + '</td></tr>';
        }).join('') + '</tbody></table></div>';
    }).join('');
    content.innerHTML = '<div class="cab"><button class="btn" id="roleBack">← Audiences</button>' +
      '<div class="doc" style="max-width:860px;margin:16px auto"><div style="padding:0 36px 36px">' +
      '<h2 style="text-align:center;margin:0">Rôle d’audiences</h2>' +
      '<p style="text-align:center;font-size:12px;color:var(--text-dim)">' +
      (span === 'semaine' ? 'Semaine du ' + esc(fmtDate(days[0])) + ' au ' + esc(fmtDate(days[6])) : esc(fmtCourt(dateISO)) + ' ' + esc(dateISO)) +
      ' — ' + total + ' audience(s) — édité le ' + esc(fmtDate(todayISO())) + '</p>' + body +
      '</div></div><div class="cab-toolbar" style="justify-content:center"><button class="btn btn-primary" id="rolePrint">Imprimer / PDF</button></div></div>';
    $('#crumbs').innerHTML = '<span class="cur">Cabinet — Rôle d’audiences</span>';
    $('#roleBack').addEventListener('click', function () { if (window.Cour) window.Cour.renderList(); });
    $('#rolePrint').addEventListener('click', function () { window.print(); });
  }

  window.Agenda = {
    dropOnDay: dropOnDay,
    openRolePrint: openRolePrint,
    renderRolePrint: renderRolePrint,
    upcomingAudiences: upcomingAudiences,
    todayHook: injectToday,
    computeAlerts: computeAlerts,
    getReglages: getReglages,
    setReglages: setReglages,
    snooze: snooze,
    renderCalendrier: renderCalendrier,
    exportAlertsICS: exportAlertsICS,
    exportDayICS: exportDayICS,
    buildICS: buildICS,
    collectDay: collectDay,
    refreshBell: refreshBell
  };
})();
