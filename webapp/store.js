/* AVOCATO store.js — passerelle unique vers localStorage, chargée en premier.
   get: tolère les valeurs corrompues (retourne le défaut + warn).
   set: remonte les échecs (quota saturé, mode privé…) au lieu de les avaler —
   une sauvegarde qui échoue silencieusement est une perte de données. */
(function () {
  'use strict';

  var quotaWarned = false;

  function notify(msg) {
    console.error('[avocato] ' + msg);
    try {
      if (window.Cabinet && window.Cabinet.toast) window.Cabinet.toast(msg, { kind: 'error' });
    } catch (e) { /* toast indisponible: console suffit */ }
  }

  function isQuota(e) {
    return !!e && (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED' || e.code === 22 || e.code === 1014);
  }

  var LS = {
    get: function (k, d) {
      try {
        var v = localStorage.getItem('avocato:' + k);
        return v ? JSON.parse(v) : d;
      } catch (e) {
        console.warn('[avocato] LS.get "' + k + '" illisible — défaut appliqué', e);
        return d;
      }
    },
    set: function (k, v) {
      try {
        localStorage.setItem('avocato:' + k, JSON.stringify(v));
        return true;
      } catch (e) {
        if (isQuota(e)) {
          if (!quotaWarned) {
            quotaWarned = true;
            notify('Stockage saturé : les dernières modifications ne sont pas enregistrées. Exportez un JSON (Tableau de bord → Exporter JSON) puis supprimez la démo.');
          }
        } else {
          notify('Échec de sauvegarde « ' + k + ' » : ' + (e && e.message ? e.message : e));
        }
        return false;
      }
    },
    del: function (k) {
      try { localStorage.removeItem('avocato:' + k); return true; }
      catch (e) { notify('Échec de suppression « ' + k + ' » : ' + (e && e.message ? e.message : e)); return false; }
    },
    arr: function (k) {
      var v = LS.get(k, []);
      return Array.isArray(v) ? v : [];
    }
  };

  window.AvocatoStore = { LS: LS };
})();
