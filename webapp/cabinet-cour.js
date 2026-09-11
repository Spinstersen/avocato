/* AVOCATO Cour -- audiences & jugements (Phase C du SUIVI_AUDIENCES_PLAN.md).
   localStorage: avocato:audiences, avocato:jugements (scopes sync déjà déclarés).
   Offline-first ; ne dépend d'aucune vue existante à part window.Cabinet/Features. */
(function () {
  'use strict';

  var LS = window.AvocatoStore.LS;
  var $ = (s, r) => (r || document).querySelector(s);
  var $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  var { esc, uid, todayISO, toISODate, addDaysISO } = window.AvocatoCore;
  function fmtD(iso) { if (!iso) return '—'; try { return new Date(iso + 'T12:00:00').toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' }); } catch { return iso; } }
  function daysLeft(iso) { if (!iso) return null; var a = new Date(iso + 'T12:00:00'), b = new Date(todayISO() + 'T12:00:00'); return Math.round((a - b) / 86400000); }
  function dossierOf(id) { return (LS.get('dossiers', []) || []).find(function (x) { return x.id === id; }); }
  function toast(m, o) { if (window.Cabinet && window.Cabinet.toast) window.Cabinet.toast(m, o); }

  var JURIS = ['TPI (1re instance)', 'Cour d\u2019appel', 'Tribunal de commerce', 'Tribunal administratif', 'Cour de cassation', 'Justice de paix', 'Autre'];
  var ETATS = ['À venir', 'Reportée', 'Tenue', 'Jugement rendu', 'Désistement'];
  var SENS = ['Nous: demandeur', 'Nous: défendeur', 'Partie civile', 'Intervention volontaire'];
  var SORTS = ['Contradictoire', 'Par défaut', 'Réputé contradictoire', 'Avant-dire droit', 'Interlocutoire', 'Sur requête'];
  var ISSUES = ['Gagné', 'Partiellement gagné', 'Perdu', 'Avant-dire / mesure'];
  var RECOURS = [
    { id: 'appel', label: 'Appel', jours: 30 },
    { id: 'pourvoi', label: 'Pourvoi en cassation', jours: 30 },
    { id: 'opposition', label: 'Opposition', jours: 15 },
    { id: 'tierce', label: 'Tierce opposition', jours: 30 },
    { id: 'aucun', label: 'Aucune voie de recours', jours: 0 }
  ];

  /* ---------------- store ---------------- */
  function auds() { return LS.get('audiences', []); }
  function saveAuds(a) { LS.set('audiences', a); }
  function jugs() { return LS.get('jugements', []); }
  function saveJugs(j) { LS.set('jugements', j); }
  function upsertAudience(obj) {
    var a = auds(); var i = a.findIndex(x => x.id === obj.id);
    obj.updatedAt = new Date().toISOString();
    if (i >= 0) a[i] = Object.assign({}, a[i], obj); else { obj.id = obj.id || uid(); obj.createdAt = obj.updatedAt; a.push(obj); }
    saveAuds(a); return obj;
  }
  function delAudience(id) {
    var rem = auds().find(x => x.id === id);
    saveAuds(auds().filter(x => x.id !== id));
    saveJugs(jugs().filter(j => j.audienceId !== id));
    return rem;
  }
  function audience(id) { return auds().find(x => x.id === id); }
  function nextFor(dossierId) {
    var t = todayISO();
    return auds().filter(a => a.dossierId === dossierId && a.etat === 'À venir' && a.date >= t)
      .sort((a, b) => a.date.localeCompare(b.date));
  }
  /* delai de recours: reutilise computeDelai (Features) avec fallback naive */
  function computeRecours(dateJug, recoursId) {
    var r = RECOURS.find(x => x.id === recoursId) || { jours: 0 };
    if (!r.jours || !dateJug) return null;
    if (window.Features && window.Features.computeDelai) return window.Features.computeDelai(dateJug, r.jours, 'calendaire');
    return { brut: addDaysISO(dateJug, r.jours), ajustee: addDaysISO(dateJug, r.jours), reporte: false };
  }

  /* ---------------- dialogs (crees a la volee) ---------------- */
  function ensureDlgAudience() {
    if ($('#dlgAudience')) return;
    var d = document.createElement('dialog'); d.id = 'dlgAudience'; d.className = 'dlg'; d.setAttribute('aria-labelledby', 'audienceTitle');
    d.innerHTML = '<form method="dialog" id="formAudience"><h3 id="audienceTitle">Nouvelle audience</h3>' +
      '<div class="form-grid">' +
      '<label>Dossier<select name="dossierId" id="audDossierSel"></select></label>' +
      '<label>Date d\u2019audience *<input name="date" type="date" required></label>' +
      '<label>Heure<input name="heure" type="time" placeholder="09:00"></label>' +
      '<label>Juridiction<select name="juridiction">' + JURIS.map(j => '<option>' + esc(j) + '</option>').join('') + '</select></label>' +
      '<label>Ville / salle<input name="ville" placeholder="Ex: Casablanca — 4e chambre"></label>' +
      '<label>N° de rôle<input name="role" placeholder="Ex: 2026/1234"></label>' +
      '<label>Chambre<input name="chambre" placeholder="Ex: Responsabilité délictuelle"></label>' +
      '<label>Juge rapporteur<input name="juge" placeholder="Nom du juge"></label>' +
      '<label>N° national<input name="numeroNational" placeholder="Ex: 206202612021233"></label>' +
      '<label>Type de dossier<input name="typeDossier" placeholder="Ex: Civil"></label>' +
      '<label>Qualité<select name="sens">' + SENS.map(s => '<option>' + esc(s) + '</option>').join('') + '</select></label>' +
      '<label>Partie adverse<input name="adverse" placeholder="Nom de la partie adverse"></label>' +
      '<label>État<select name="etat">' + ETATS.map(s => '<option>' + esc(s) + '</option>').join('') + '</select></label>' +
      '<label class="span-2">Objet / affaire<input name="objet" placeholder="Ex: Contestation facture — référé provision"></label>' +
      '<label class="span-2">Compte rendu (si tenue)<textarea name="compteRendu" rows="2"></textarea></label>' +
      '</div><div class="dlg-actions">' +
      '<button type="button" class="btn" id="btnAudCancel">Annuler</button>' +
      '<button type="button" class="btn" id="btnAudSave">Enregistrer</button></div></form>';
    document.body.appendChild(d);
    $('#btnAudCancel').addEventListener('click', () => d.close());
    $('#formAudience').addEventListener('submit', e => e.preventDefault());
    $('#btnAudSave').addEventListener('click', () => {
      var f = $('#formAudience');
      if (!f.date.value) { toast('Date requise.', { kind: 'error' }); return; }
      var fd = new FormData(f); var obj = Object.fromEntries(fd.entries());
      if (f.dataset.editId) obj.id = f.dataset.editId;
      upsertAudience(obj);
      d.close();
      var cv = LS.get('cabinetView', null);
      if (cv === 'audiences') renderList();
      toast('Audience enregistrée.');
    });
  }
  function openAudienceDlg(prefillId, prefillDossier) {
    ensureDlgAudience();
    var f = $('#formAudience'); var a = prefillId ? audience(prefillId) : null;
    f.reset(); f.dataset.editId = a ? a.id : '';
    $('#audienceTitle').textContent = a ? 'Modifier audience' : 'Nouvelle audience';
    var dossiers = (LS.get('dossiers', []) || []).slice().sort((x, y) => (x.client || '').localeCompare(y.client || ''));
    $('#audDossierSel').innerHTML = '<option value="">— Sans dossier —</option>' + dossiers.map(x =>
      '<option value="' + esc(x.id) + '"' + ((a ? a.dossierId : prefillDossier) === x.id ? ' selected' : '') + '>' + esc(x.client) + '</option>').join('');
    if (a) {
      ['dossierId', 'role', 'juridiction', 'ville', 'heure', 'date', 'sens', 'adverse', 'etat', 'objet', 'compteRendu', 'chambre', 'juge', 'numeroNational', 'typeDossier'].forEach(k => {
        var elx = f.elements.namedItem(k);
        if (elx && a[k] != null) elx.value = a[k];
      });
    } else {
      f.elements.namedItem('date').value = todayISO();
    }
    $('#dlgAudience').showModal();
  }
  function ensureDlgJugement() {
    if ($('#dlgJugement')) return;
    var d = document.createElement('dialog'); d.id = 'dlgJugement'; d.className = 'dlg'; d.setAttribute('aria-labelledby', 'jugementTitle');
    d.innerHTML = '<form method="dialog" id="formJugement"><h3 id="jugementTitle">Enregistrer le jugement</h3>' +
      '<p class="field-help" id="jugCtx" style="margin:0 18px"></p>' +
      '<div class="form-grid">' +
      '<label>Date du jugement *<input name="date" type="date" required></label>' +
      '<label>Sort<select name="sort">' + SORTS.map(s => '<option>' + esc(s) + '</option>').join('') + '</select></label>' +
      '<label>Issue<select name="issue">' + ISSUES.map(s => '<option>' + esc(s) + '</option>').join('') + '</select></label>' +
      '<label>Voie de recours<select name="recours">' + RECOURS.map(r => '<option value="' + r.id + '">' + esc(r.label + (r.jours ? ' (' + r.jours + ' j)' : '')) + '</option>').join('') + '</select></label>' +
      '<label class="span-2">Dispositif / résumé<textarea name="dispositif" rows="3" placeholder="Ce qui a été décidé, condamnations, chef par chef..."></textarea></label>' +
      '<div class="span-2" id="jugDelai" style="font:600 12.5px/1.5 &quot;Cascadia Code&quot;,monospace;color:var(--caption)"></div>' +
      '</div><div class="dlg-actions">' +
      '<button type="button" class="btn" id="btnJugCancel">Annuler</button>' +
      '<button type="button" class="btn btn-primary" id="btnJugSave">Enregistrer + échéance recours</button></div></form>';
    document.body.appendChild(d);
    var f = $('#formJugement');
    function upd() {
      var del = computeRecours(f.date.value, f.recours.value);
      $('#jugDelai').textContent = del
        ? 'Délai: ' + del.ajustee + ' (' + (daysLeft(del.ajustee) != null ? Math.max(0, daysLeft(del.ajustee)) + ' j restants' : '') + ')' + (del.reporte ? ' — brut ' + del.brut + ' reporté (férié/week-end, art. 512 CPC)' : '')
        : 'Aucun délai de recours calculé.';
    }
    f.date.addEventListener('input', upd); f.recours.addEventListener('change', upd);
    $('#btnJugCancel').addEventListener('click', () => d.close());
    f.addEventListener('submit', e => e.preventDefault());
    $('#btnJugSave').addEventListener('click', () => {
      var a = audience(f.dataset.audId);
      if (!a || !f.date.value) { toast('Date du jugement requise.', { kind: 'error' }); return; }
      var fd = new FormData(f); var obj = Object.fromEntries(fd.entries());
      obj.id = uid(); obj.audienceId = a.id; obj.dossierId = a.dossierId;
      var r = RECOURS.find(x => x.id === obj.recours) || RECOURS[0];
      obj.recours = { id: r.id, label: r.label, jours: r.jours };
      obj.delai = computeRecours(obj.date, obj.recours.id);
      obj.createdAt = new Date().toISOString();
      saveJugs([obj].concat(jugs()));
      var arr = auds(); var i = arr.findIndex(x => x.id === a.id);
      if (i >= 0) { arr[i] = Object.assign({}, arr[i], { etat: 'Jugement rendu', dateJugement: obj.date }); saveAuds(arr); }
      if (obj.delai) {
        var dossier = dossierOf(a.dossierId);
        var ech = LS.get('echeances', []) || [];
        ech.push({
          id: uid(), dossierId: a.dossierId || '', date: obj.delai.ajustee,
          type: 'Voie de recours', kind: 'Recours', jugementId: obj.id,
          intitule: obj.recours.label + ' — ' + (dossier ? dossier.client : '') + ' (30 j dès le jugement du ' + obj.date + (obj.delai.reporte ? ', report art.512' : '') + ')',
          done: false, auto: 'DELAI'
        });
        LS.set('echeances', ech);
      }
      d.close();
      toast('Jugement enregistré' + (obj.delai ? ' — échéance de recours créée pour le ' + obj.delai.ajustee + '.' : '.'));
      if (window.Cabinet) window.Cabinet.renderCabinet();
    });
  }
  function openJugement(audId) {
    ensureDlgJugement();
    var a = audience(audId); if (!a) return;
    var f = $('#formJugement'); f.reset(); f.dataset.audId = audId;
    f.date.value = todayISO();
    var dossier = dossierOf(a.dossierId);
    $('#jugCtx').innerHTML = '<strong>' + esc(a.objet || 'Audience') + '</strong> — ' + esc(dossier ? dossier.client : 'sans dossier') + ' — audience du ' + esc(a.date) + (a.heure ? ' ' + esc(a.heure) : '');
    $('#dlgJugement').showModal();
  }

  /* ---------------- vue liste ---------------- */
  function renderList() {
    var content = $('#content'); if (!content) return;
    var list = auds().slice().sort((a, b) => (a.date || '').localeCompare(b.date || ''));
    var today = todayISO();
    var upcoming = list.filter(a => a.etat === 'À venir' && a.date >= today);
    var passed = list.filter(a => !(a.etat === 'À venir' && a.date >= today)).reverse();
    var dossiers = LS.get('dossiers', []) || [];
    var dName = id => { var x = dossiers.find(d => d.id === id); return x ? x.client : '—'; };
    function rows(arr) {
      return arr.map(a => {
        var late = a.etat === 'À venir' && a.date < today;
        return '<tr data-aid="' + esc(a.id) + '"' + (late ? ' style="background:var(--danger-soft)"' : '') + '>' +
          '<td class="mono">' + esc(a.date || '') + (a.heure ? '<br>' + esc(a.heure) : '') + '</td>' +
          '<td style="max-width:170px;white-space:normal"><strong>' + esc(dName(a.dossierId)) + '</strong></td>' +
          '<td style="max-width:180px;white-space:normal">' + esc(a.juridiction || '') + (a.ville ? '<br><span style="font-size:11px;color:var(--text-dim)">' + esc(a.ville) + '</span>' : '') + '</td>' +
          '<td class="mono">' + esc(a.role || '—') + '</td>' +
          '<td style="max-width:200px;white-space:normal">' + esc(a.objet || '') + (a.adverse ? '<br><span style="font-size:11px;color:var(--text-dim)">adverse: ' + esc(a.adverse) + '</span>' : '') + '</td>' +
          '<td><span class="badge">' + esc(a.etat || 'À venir') + '</span></td>' +
          '<td style="white-space:nowrap">' +
          (a.etat === 'À venir' || a.etat === 'Reportée' || a.etat === 'Tenue' ? '<button class="btn btn-sm" data-jug="' + esc(a.id) + '">Jugement</button> ' : '') +
          '<button class="btn btn-sm" data-edit="' + esc(a.id) + '">Éditer</button> ' +
          '<button class="btn btn-sm btn-danger" data-del="' + esc(a.id) + '" aria-label="Supprimer l’audience du ' + esc(a.date || '') + '">' + (window.ico ? window.ico('trash') : '') + '</button>' +
          '</td></tr>';
      }).join('');
    }
    content.innerHTML = '<div class="cab">' +
      '<div class="kicker">Greffe — reports journalisés</div><h2>Audiences</h2>' +
      '<p class="sub">' + upcoming.length + ' à venir · ' + (list.length - upcoming.length) + ' passées — les reports et délais de recours sont journalisés sur les dossiers.</p>' +
      '<div class="cab-toolbar"><button class="btn btn-primary" id="btnNewAud">+ Audience</button>' +
      '<span style="font-size:11.5px;color:var(--text-dim);align-self:center">Astuce: après import mahakim (phase F), les dates se mettent à jour ici.</span></div>' +
      (upcoming.length ? '<h3 style="font:700 11px/1 &quot;Inter&quot;;letter-spacing:.12em;text-transform:uppercase;color:var(--caption);margin:16px 0 6px">À venir</h3><div class="cab-table-wrap"><table class="cab-table"><thead><tr><th>Date</th><th>Dossier</th><th>Juridiction</th><th>Rôle</th><th>Objet</th><th>État</th><th></th></tr></thead><tbody>' + rows(upcoming) + '</tbody></table></div>' : '') +
      (passed.length ? '<h3 style="font:700 11px/1 &quot;Inter&quot;;letter-spacing:.12em;text-transform:uppercase;color:var(--caption);margin:16px 0 6px">Passées / jugées</h3><div class="cab-table-wrap"><table class="cab-table"><thead><tr><th>Date</th><th>Dossier</th><th>Juridiction</th><th>Rôle</th><th>Objet</th><th>État</th><th></th></tr></thead><tbody>' + rows(passed) + '</tbody></table></div>' : '') +
      (!list.length ? '<div class="empty-state" style="padding:30px">Aucune audience. <button class="btn btn-primary" id="btnFirstAud">Créer la première</button></div>' : '') +
      '</div>';
    $('#crumbs').innerHTML = '<span class="cur">Cabinet — Audiences</span>';
    var bn = $('#btnNewAud'); if (bn) bn.addEventListener('click', () => openAudienceDlg());
    var bf = $('#btnFirstAud'); if (bf) bf.addEventListener('click', () => openAudienceDlg());
    $$('[data-edit]', content).forEach(b => b.addEventListener('click', () => openAudienceDlg(b.dataset.edit)));
    $$('[data-jug]', content).forEach(b => b.addEventListener('click', () => openJugement(b.dataset.jug)));
    $$('[data-del]', content).forEach(b => b.addEventListener('click', () => {
      var rem = delAudience(b.dataset.del);
      renderList();
      toast('Audience supprimée.', { undo: function () { if (rem) saveAuds(auds().concat([rem])); renderList(); } });
    }));
    try { document.dispatchEvent(new CustomEvent('avocato:rendered', { detail: { view: 'audiences' } })); } catch (e) { console.warn('avocato', e); }
  }

  /* ---------------- panneau injecte dans la fiche dossier ---------------- */
  function injectCour(dossierId) {
    var content = $('#content'); if (!content) return;
    var cab = content.querySelector('.cab'); if (!cab) return;
    if ($('.cour-panel', cab)) return;
    var nx = nextFor(dossierId);
    var jj = jugs().filter(j => j.dossierId === dossierId);
    var html = '';
    if (nx.length) {
      html += nx.slice(0, 3).map(a => '<div class="today-action"><span class="ta-ico">' + (window.ico ? window.ico('scale') : '') + '</span>' +
        '<span class="ta-date mono">' + esc(fmtD(a.date)) + (a.heure ? ' ' + esc(a.heure) : '') + '</span>' +
        '<span class="ta-body"><strong>' + esc(a.juridiction || 'Audience') + '</strong> — ' + esc(a.objet || '') + '</span>' +
        '<button class="btn btn-sm" data-aud-open="' + esc(a.id) + '">Détails</button></div>').join('');
    } else {
      html += '<p style="font-size:13px;color:var(--text-dim);margin:4px 0">Aucune audience à venir.</p>';
    }
    html += jj.slice(0, 3).map(j => {
      var dl = j.delai ? daysLeft(j.delai.ajustee) : null;
      var cls = dl == null ? '' : dl < 0 ? 'color:var(--warn,#9a5b12);font-weight:700' : dl <= 7 ? 'color:var(--warn,#9a5b12)' : '';
      return '<div class="today-action"><span class="ta-ico">' + window.ico('scale') + '</span><span class="ta-date mono">' + esc(j.date) + '</span>' +
        '<span class="ta-body"><strong>Jugement</strong> — ' + esc(j.sort || '') + ' · ' + esc(j.issue || '') +
        (j.recours && j.delai ? ' · <span style="' + cls + '">' + esc(j.recours.label) + ' : ' + esc(j.delai.ajustee) + (dl != null && dl >= 0 ? ' (' + dl + ' j)' : (dl != null ? ' (EXPIRÉ)' : '')) + '</span>' : '') +
        '</span></div>';
    }).join('');
    var panel = document.createElement('div');
    panel.className = 'dash-panel cour-panel'; panel.style.marginTop = '16px';
    panel.innerHTML = '<h3>Audiences & jugements</h3>' + html +
      '<div class="cab-toolbar"><button class="btn" id="btnCourAdd">+ Audience pour ce dossier</button></div>';
    var anchor = cab.querySelector('.timeline');
    var host = anchor ? anchor.closest('.dash-panel') : null;
    if (host) cab.insertBefore(panel, host.nextSibling); else cab.appendChild(panel);
    $('#btnCourAdd').addEventListener('click', () => openAudienceDlg(null, dossierId));
    $$('[data-aud-open]', panel).forEach(b => b.addEventListener('click', () => openAudienceDlg(b.dataset.audOpen)));
  }

  /* ---------------- hook fiche dossier (événement, pas de monkey-patch : les
     appels internes à viewDossier contournaient le wrapper window.Cabinet) ---------------- */
  function initCourHooks() {
    document.addEventListener('avocato:rendered', function (e) {
      var d = (e && e.detail) || {};
      if (d.dossierId) setTimeout(function () { try { injectCour(d.dossierId); } catch (err) { console.warn('avocato', err); } }, 90);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initCourHooks); else initCourHooks();

  window.Cour = { renderList, openAudienceDlg, openJugement, computeRecours, nextFor, JURIS };
})();
