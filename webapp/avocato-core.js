/* AVOCATO Core — helpers partagés, chargé en premier (après rien, avant store.js).
   Source unique pour : échappement HTML, ids, dates ISO, calcul HT/TVA/TTC,
   formatage monétaire/RB, normalisation de chaînes, similarité floue, ICS.
   Aucune dépendance : ne touche ni au DOM ni à localStorage. */
(function () {
  'use strict';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
  function pad(n) { return String(n).padStart(2, '0'); }
  function toISODate(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function todayISO() { return toISODate(new Date()); }
  function addDaysISO(iso, n) { var d = new Date(iso + 'T12:00:00'); d.setDate(d.getDate() + n); return toISODate(d); }
  function diffDays(aISO, bISO) {
    var a = new Date(aISO + 'T12:00:00'), b = new Date(bISO + 'T12:00:00');
    return Math.round((a - b) / 86400000);
  }
  function calcTTC(ht, tva) {
    ht = Number(ht) || 0;
    tva = Number(tva) || 0;
    var tv = Math.round(ht * tva / 100);
    return { ht: ht, tva: tv, ttc: ht + tv };
  }
  function fmtMoney(n) { return (Number(n) || 0).toLocaleString('fr-MA') + ' DH'; }
  function fmtDate(d) {
    if (!d) return '—';
    try { return new Date(typeof d === 'string' && d.length <= 10 ? d + 'T12:00:00' : d).toLocaleDateString('fr-MA'); }
    catch (e) { return d; }
  }
  function fmtRib(rib) { return String(rib || '').replace(/(\d{4})(?=\d)/g, '$1 ').trim(); }
  function stripAccents(s) { return String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }
  function normalize(s) { return stripAccents(s).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim(); }
  function tokens(s) { return normalize(s).split(/\s+/).filter(Boolean); }
  function jaccard(a, b) {
    var ta = {}, tb = {}, na = 0, nb = 0, inter = 0, k;
    tokens(a).forEach(function (t) { if (!ta[t]) { ta[t] = 1; na++; } });
    tokens(b).forEach(function (t) { if (!tb[t]) { tb[t] = 1; nb++; } });
    for (k in ta) if (tb[k]) inter++;
    return (na + nb - inter) ? inter / (na + nb - inter) : 0;
  }
  function isSimilar(a, b) {
    var na = normalize(a), nb = normalize(b);
    if (!na || !nb) return false;
    if (na === nb) return true;
    if (na.indexOf(nb) !== -1 || nb.indexOf(na) !== -1) return true;
    return jaccard(a, b) >= 0.5;
  }
  function escapeICS(s) {
    return String(s == null ? '' : s).replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/;/g, '\\;').replace(/,/g, '\\,');
  }
  /* Provision % : null/vide => 50 (défaut), 0 est une valeur légitime (abonnements). */
  function provPct(d) {
    var v = d ? d.provisionPct : null;
    if (v == null || v === '') return 50;
    var n = Number(v);
    return isFinite(n) ? n : 50;
  }
  /* Coercition numérique défensive pour les templates. */
  function num(v, dflt) {
    var n = Number(v);
    return isFinite(n) ? n : (dflt == null ? 0 : dflt);
  }

  window.AvocatoCore = {
    esc: esc, uid: uid, pad: pad,
    toISODate: toISODate, todayISO: todayISO, addDaysISO: addDaysISO, diffDays: diffDays,
    calcTTC: calcTTC, fmtMoney: fmtMoney, fmtDate: fmtDate, fmtRib: fmtRib,
    stripAccents: stripAccents, normalize: normalize, jaccard: jaccard, isSimilar: isSimilar,
    escapeICS: escapeICS, provPct: provPct, num: num
  };
})();
