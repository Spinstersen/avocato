/* AVOCATO — Packs 14-18 : rappels régaliens (90j export, AG dividende, carte séjour, veille).
   Greffe Ops : échéances auto + Today. Offline, localStorage. */
(function () {
  'use strict';
  const { uid, toISODate: toISO, addDaysISO: addDays } = window.AvocatoCore;
  const PACK_RAPPELS = [
    { type: 'Change 90j', intitule: 'Registre 90j : rapprocher factures/SWIFT, alerte J-15 (05/09)', j: 75 },
    { type: 'AG dividende', intitule: 'Calendrier AG : simulation Oct-Nov, PV Jan-Fév (05/10)', j: 300 },
    { type: 'Carte séjour', intitule: 'Renouvellement carte : J-15 avant échéance + dossier (11/14)', j: 350 },
    { type: 'Veille', intitule: 'Veille mensuelle IGOC/CNDP/LF/OMPIC : 1 page (08/10)', j: 30 },
    { type: '09-08', intitule: 'Purge + test backup + revue sous-traitants (03/16)', j: 90 }
  ];
  function createPackRappels(dossier) {
    if (!dossier || !window.Cabinet || !window.Cabinet.STORE) return 0;
    const st = window.Cabinet.STORE;
    const base = dossier.provisionDate || toISO(new Date());
    const news = PACK_RAPPELS.map(r => ({ id: uid(), dossierId: dossier.id, date: addDays(base, r.j), type: r.type, intitule: r.intitule, done: false, auto: 'PACK' }));
    st.echeances = [...st.echeances, ...news];
    return news.length;
  }
  window.Packs1814 = { PACK_RAPPELS, createPackRappels };
})();
