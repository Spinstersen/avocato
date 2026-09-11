/* AVOCATO Mock -- Phase G (SUIVI_AUDIENCES_PLAN.md).
   Jeu de demonstration coherent (~9 mois, 14 dossiers), 100 % tamponne mock:true.
   window.Mock = { seed, wipe, validate, hasMock }.
   seed() snapshotte via Cabinet.collectBackup() AVANT d'ecrire si donnees reelles.
   wipe() restaure le snapshot a l'octet pres, sinon filtre mock:true + recompute numSeq.
   Offline-first, localStorage only. Supprimable (un seul fichier + 2 actions palette). */
(function () {
  'use strict';

  var LS = window.AvocatoStore.LS;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.from((r || document).querySelectorAll(s)); };
  var { esc, pad, addDaysISO, calcTTC } = window.AvocatoCore;
  function D(n) { var d = new Date(); d.setDate(d.getDate() - n); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function AT(n, h) {
    var d = new Date(); d.setDate(d.getDate() - n); d.setHours(h == null ? 10 : h, 0, 0, 0);
    return d.toISOString();
  }
  function MON(back, day) { var t = new Date(); var d = new Date(t.getFullYear(), t.getMonth() - back, day); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function toast(m, o) { if (window.Cabinet && window.Cabinet.toast) window.Cabinet.toast(m, o); }
  function provSplit(honoraires, tva, pct) {
    var c = calcTTC(honoraires, tva);
    var provTTC = Math.round(c.ttc * (pct == null || pct === '' ? 50 : Number(pct)) / 100);
    var soldeTTC = c.ttc - provTTC;
    function brk(ttc) { var ht = (tva == 0) ? ttc : Math.round(ttc / (1 + Number(tva) / 100)); return { ht: ht, tva: ttc - ht, ttc: ttc }; }
    return { prov: brk(provTTC), solde: brk(soldeTTC) };
  }

  var SNAP_KEY = 'mock:snapshot';
  var MISSION = {
    diag: 'Diagnostic (600-900 DH HT)',
    contrats: 'Mission Contrats - Essentielle (2.500-5.000 DH HT)',
    eco: 'Mission Conformité e-commerce (3.500-6.000 DH HT)',
    loi: 'Mission Loi 09-08 (12.000-28.000 DH HT)',
    crea: 'Mission Création/Structuration (5.000-8.000 DH HT)',
    abo: 'Abonnement - Secrétariat juridique (2.500-6.000 DH HT/mois)'
  };

  /* ================= scenario ================= */
  function buildScenario() {
    var Y = new Date().getFullYear();
    var dossiers = [], conventions = [], factures = [], echeances = [], frais = [],
        veille = [], clients = [], audiences = [], jugements = [], transitions = [];
    var seq = { CH: 0, RP: 0, FH: 0 };
    function nx(prefix) { seq[prefix]++; return prefix + '-' + Y + '-' + String(seq[prefix]).padStart(3, '0'); }
    function tr(dossierId, client, from, to, atDaysAgo, motif) {
      transitions.push({ id: 'mock-tr-' + transitions.length, dossierId: dossierId, client: client, from: from, to: to, at: AT(atDaysAgo), force: false, motif: motif || '', mock: true });
    }
    function ry(dossierId, base) {
      var steps = [
        ['Rythme J0', 0, 'Kickoff — périmètre et calendrier annoncés'],
        ['Rythme J2', 2, 'Checkpoint « en mouvement »'],
        ['Rythme J5', 5, 'Checkpoint « presque fini »'],
        ['Rythme J7', 7, 'Paquet de quatre + restitution']
      ];
      steps.forEach(function (s, i) {
        echeances.push({ id: 'mock-ry-' + dossierId + '-' + i, dossierId: dossierId, date: addDaysISO(base, s[1]), type: s[0], intitule: s[2], done: s[1] === 0, auto: 'RYTHME', mock: true });
      });
    }
    function dossier(o) { o.mock = true; dossiers.push(o); return o; }
    function aud(o) { o.mock = true; o.updatedAt = o.updatedAt || AT(2); o.createdAt = o.createdAt || o.updatedAt; audiences.push(o); return o; }

    var M1 = MON(0, 1), M3 = MON(0, 3); // jours d'encaissement du mois courant

    // 1. Prospect stagnant (goulot > 7 j)
    dossier({ id: 'mock-d-prosp', client: 'M. Idrissi Yassine', type: 'Créateur / Infopreneur', mission: MISSION.diag, honoraires: 750, tva: 20, provisionPct: 50, statut: 'Prospect', contact: '06 61 00 00 01', notes: 'Démo : prospect sans suite depuis 20 j.', createdAt: D(20), updatedAt: D(20) });
    tr('mock-d-prosp', 'M. Idrissi Yassine', '', 'Prospect', 20);
    // 2. Convention envoyée stagnante (goulot > 10 j)
    dossier({ id: 'mock-d-env', client: 'SARL Nour Style', ice: '123456789012345', type: 'E-commerce / YouCan', mission: MISSION.contrats, honoraires: 3500, tva: 20, provisionPct: 50, statut: 'Convention envoyée', contact: '06 62 00 00 02', createdAt: D(40), updatedAt: D(15) });
    tr('mock-d-env', 'SARL Nour Style', 'Prospect', 'Convention envoyée', 15);
    // 3. Signée sans provision (verrou art. 30 ouvert)
    dossier({ id: 'mock-d-sign', client: 'Clinique Arrazi', ice: '234567890123456', type: 'Loi 09-08 / PME', mission: MISSION.loi, honoraires: 12000, tva: 20, provisionPct: 50, statut: 'Convention signée', contact: '05 22 00 00 03', createdAt: D(30), updatedAt: D(5) });
    conventions.push({ id: 'mock-ch-sign', dossierId: 'mock-d-sign', num: nx('CH'), date: D(5), mission: MISSION.loi, ht: 12000, tva: 2400, ttc: 14400, provision: 7200, provisionPct: 50, mock: true });
    tr('mock-d-sign', 'Clinique Arrazi', 'Prospect', 'Convention envoyée', 12);
    tr('mock-d-sign', 'Clinique Arrazi', 'Convention envoyée', 'Convention signée', 5);
    // 4. Provision encaissée SANS rythme (bouton « Créer le rythme »)
    var s4 = provSplit(750, 20, 50);
    dossier({ id: 'mock-d-nory', client: 'M. El Fassi Omar', type: 'Créateur / Infopreneur', mission: MISSION.diag, honoraires: 750, tva: 20, provisionPct: 50, provisionEncaissee: true, provisionDate: D(12), statut: 'En cours', contact: '06 64 00 00 04', createdAt: D(25), updatedAt: D(12) });
    conventions.push({ id: 'mock-ch-nory', dossierId: 'mock-d-nory', num: nx('CH'), date: D(13), mission: MISSION.diag, ht: 750, tva: 150, ttc: 900, provision: 450, provisionPct: 50, mock: true });
    factures.push({ id: 'mock-rp-nory', dossierId: 'mock-d-nory', num: nx('RP'), date: D(12), type: 'Reçu provision', ht: s4.prov.ht, tva: s4.prov.tva, ttc: s4.prov.ttc, statut: 'Encaissée', mock: true });
    tr('mock-d-nory', 'M. El Fassi Omar', 'Prospect', 'Convention signée', 13);
    tr('mock-d-nory', 'M. El Fassi Omar', 'Convention signée', 'En cours', 12);
    // 5. Loi 09-08 complète (rythme aligné, soldée ce mois)
    var s5 = provSplit(18000, 20, 50);
    dossier({ id: 'mock-d-loi', client: 'Sté Pharma Plus', ice: '345678901234567', type: 'Loi 09-08 / PME', mission: MISSION.loi, honoraires: 18000, tva: 20, provisionPct: 50, provisionEncaissee: true, provisionDate: M1, statut: 'En cours', contact: '06 65 00 00 05', createdAt: D(60), updatedAt: M1 });
    conventions.push({ id: 'mock-ch-loi', dossierId: 'mock-d-loi', num: nx('CH'), date: D(40), mission: MISSION.loi, ht: 18000, tva: 3600, ttc: 21600, provision: 10800, provisionPct: 50, mock: true });
    factures.push({ id: 'mock-rp-loi', dossierId: 'mock-d-loi', num: nx('RP'), date: M1, type: 'Reçu provision', ht: s5.prov.ht, tva: s5.prov.tva, ttc: s5.prov.ttc, statut: 'Encaissée', mock: true });
    factures.push({ id: 'mock-fh-loi', dossierId: 'mock-d-loi', num: nx('FH'), date: M3, type: 'Facture solde', ht: s5.solde.ht, tva: s5.solde.tva, ttc: s5.solde.ttc, statut: 'Encaissée', mock: true });
    ry('mock-d-loi', M1);
    tr('mock-d-loi', 'Sté Pharma Plus', 'Prospect', 'Convention signée', 40);
    tr('mock-d-loi', 'Sté Pharma Plus', 'Convention signée', 'En cours', 25);
    aud({ id: 'mock-a-loi1', dossierId: 'mock-d-loi', role: '1201/2026', juridiction: 'TPI (1re instance)', ville: 'Casablanca', date: D(-6), heure: '09:00', sens: 'Nous: demandeur', adverse: 'CNSS', objet: 'Contentieux affiliation', etat: 'À venir', source: 'manuel', compteRendu: '' });
    aud({ id: 'mock-a-loi2', dossierId: 'mock-d-loi', role: '1202/2026', juridiction: 'Cour d\u2019appel', ville: 'Casablanca', date: D(-30), heure: '10:00', sens: 'Nous: défendeur', adverse: '', objet: 'Appel provision', etat: 'À venir', source: 'mahakim', compteRendu: '' });
    // 6. E-commerce TVA 0 (art. 91)
    var s6 = provSplit(6000, 0, 50);
    dossier({ id: 'mock-d-eco', client: 'Boutique YouCan — Lina Shop', type: 'E-commerce / YouCan', mission: MISSION.eco, honoraires: 6000, tva: 0, provisionPct: 50, provisionEncaissee: true, provisionDate: M1, statut: 'En cours', contact: '06 66 00 00 06', createdAt: D(50), updatedAt: M1 });
    conventions.push({ id: 'mock-ch-eco', dossierId: 'mock-d-eco', num: nx('CH'), date: D(35), mission: MISSION.eco, ht: 6000, tva: 0, ttc: 6000, provision: 3000, provisionPct: 50, mock: true });
    factures.push({ id: 'mock-rp-eco', dossierId: 'mock-d-eco', num: nx('RP'), date: M1, type: 'Reçu provision', ht: s6.prov.ht, tva: s6.prov.tva, ttc: s6.prov.ttc, statut: 'Encaissée', mock: true });
    factures.push({ id: 'mock-fh-eco', dossierId: 'mock-d-eco', num: nx('FH'), date: M3, type: 'Facture solde', ht: s6.solde.ht, tva: s6.solde.tva, ttc: s6.solde.ttc, statut: 'Encaissée', mock: true });
    ry('mock-d-eco', M1);
    tr('mock-d-eco', 'Boutique YouCan', 'Prospect', 'Convention signée', 35);
    tr('mock-d-eco', 'Boutique YouCan', 'Convention signée', 'En cours', 30);
    aud({ id: 'mock-a-eco1', dossierId: 'mock-d-eco', role: '1301/2026', juridiction: 'Tribunal de commerce', ville: 'Casablanca', date: D(-9), heure: '11:00', sens: 'Nous: demandeur', adverse: 'Fournisseur X', objet: 'Référé provision', etat: 'À venir', source: 'mahakim', compteRendu: '' });
    aud({ id: 'mock-a-eco2', dossierId: 'mock-d-eco', role: '1302/2026', juridiction: 'Tribunal de commerce', ville: 'Casablanca', date: D(-2), heure: '09:00', sens: 'Nous: demandeur', adverse: 'Fournisseur X', objet: 'Référé provision', etat: 'Reportée', source: 'mahakim', compteRendu: '' });
    tr('mock-d-eco', 'Boutique YouCan', 'Audience ' + D(-2) + ' (1302/2026)', 'Report ' + D(-9), 2, 'import mahakim');
    // 7. Livré, solde impayé J+20 + appel en cours (cloche DELAI)
    var s7 = provSplit(5000, 20, 50);
    dossier({ id: 'mock-d-liv', client: 'SARL Atlas Digital', ice: '456789012345678', type: 'Freelance / Agence offshore', mission: MISSION.contrats, honoraires: 5000, tva: 20, provisionPct: 50, provisionEncaissee: true, provisionDate: D(70), statut: 'Livré - solde dû', contact: '06 67 00 00 07', createdAt: D(120), updatedAt: D(20) });
    conventions.push({ id: 'mock-ch-liv', dossierId: 'mock-d-liv', num: nx('CH'), date: D(100), mission: MISSION.contrats, ht: 5000, tva: 1000, ttc: 6000, provision: 3000, provisionPct: 50, mock: true });
    factures.push({ id: 'mock-rp-liv', dossierId: 'mock-d-liv', num: nx('RP'), date: D(60), type: 'Reçu provision', ht: s7.prov.ht, tva: s7.prov.tva, ttc: s7.prov.ttc, statut: 'Encaissée', mock: true });
    factures.push({ id: 'mock-fh-liv', dossierId: 'mock-d-liv', num: nx('FH'), date: D(20), type: 'Facture solde', ht: s7.solde.ht, tva: s7.solde.tva, ttc: s7.solde.ttc, statut: 'Émise', mock: true });
    ry('mock-d-liv', D(70));
    tr('mock-d-liv', 'SARL Atlas Digital', 'Prospect', 'Convention signée', 100);
    tr('mock-d-liv', 'SARL Atlas Digital', 'Convention signée', 'En cours', 70);
    tr('mock-d-liv', 'SARL Atlas Digital', 'En cours', 'Livré - solde dû', 20);
    aud({ id: 'mock-a-liv1', dossierId: 'mock-d-liv', role: '1401/2026', juridiction: 'Tribunal de commerce', ville: 'Casablanca', date: D(-4), heure: '09:30', sens: 'Nous: demandeur', adverse: 'Client débiteur', objet: 'Injonction de payer', etat: 'À venir', source: 'mahakim', compteRendu: '' });
    aud({ id: 'mock-a-liv2', dossierId: 'mock-d-liv', role: '1402/2026', juridiction: 'Tribunal de commerce', ville: 'Casablanca', date: D(-1), heure: '10:00', sens: 'Nous: demandeur', adverse: 'Client débiteur', objet: 'Fond', etat: 'Reportée', source: 'mahakim', compteRendu: '' });
    tr('mock-d-liv', 'SARL Atlas Digital', 'Audience ' + D(-1) + ' (1402/2026)', 'Report ' + D(-4), 1, 'import mahakim');
    aud({ id: 'mock-a-liv3', dossierId: 'mock-d-liv', role: '1400/2025', juridiction: 'TPI (1re instance)', ville: 'Casablanca', date: D(25), heure: '09:00', sens: 'Nous: demandeur', adverse: 'Client débiteur', objet: 'Fond — jugé', etat: 'Jugement rendu', dateJugement: D(10), source: 'manuel', compteRendu: 'Jugement partiellement favorable.' });
    aud({ id: 'mock-a-liv4', dossierId: 'mock-d-liv', role: '1403/2026', juridiction: 'TPI (1re instance)', ville: 'Casablanca', date: D(1), heure: '14:00', sens: 'Nous: demandeur', adverse: 'Autre partie', objet: 'Mise en état', etat: 'Tenue', source: 'manuel', compteRendu: '' });
    var jugDate = D(10);
    var delai = null;
    try {
      if (window.Features && window.Features.computeDelai) delai = JSON.parse(JSON.stringify(window.Features.computeDelai(jugDate, 30, 'calendaire')));
    } catch (e) { delai = null; }
    if (!delai || !delai.ajustee) { var br = addDaysISO(jugDate, 30); delai = { brut: br, ajustee: br, reporte: false }; }
    jugements.push({ id: 'mock-j-liv', audienceId: 'mock-a-liv3', dossierId: 'mock-d-liv', date: jugDate, sort: 'Contradictoire', issue: 'Partiellement gagné', dispositif: 'Condamnation partielle, 40 000 DH.', recours: { id: 'appel', label: 'Appel', jours: 30 }, delai: delai, createdAt: AT(10), mock: true });
    echeances.push({ id: 'mock-e-delai', dossierId: 'mock-d-liv', date: delai.ajustee, type: 'Voie de recours', kind: 'Recours', jugementId: 'mock-j-liv', intitule: 'Appel — SARL Atlas Digital (30 j dès le jugement du ' + jugDate + ')', done: false, auto: 'DELAI', mock: true });
    // 8. Clôturé modèle (O2 débours + LM/PV)
    var s8 = provSplit(3500, 20, 50);
    dossier({ id: 'mock-d-clo', client: 'M. Berrada Hicham', type: 'Freelance / Agence offshore', mission: MISSION.contrats, honoraires: 3500, tva: 20, provisionPct: 50, provisionEncaissee: true, provisionDate: D(50), statut: 'Clôturé', contact: '06 68 00 00 08', createdAt: D(260), updatedAt: M3 });
    conventions.push({ id: 'mock-ch-clo', dossierId: 'mock-d-clo', num: nx('CH'), date: D(200), mission: MISSION.contrats, ht: 3500, tva: 700, ttc: 4200, provision: 2100, provisionPct: 50, mock: true });
    factures.push({ id: 'mock-rp-clo', dossierId: 'mock-d-clo', num: nx('RP'), date: M1, type: 'Reçu provision', ht: s8.prov.ht, tva: s8.prov.tva, ttc: s8.prov.ttc, statut: 'Encaissée', mock: true });
    factures.push({ id: 'mock-fh-clo', dossierId: 'mock-d-clo', num: nx('FH'), date: M3, type: 'Facture solde', ht: s8.solde.ht + 1150, tva: s8.solde.tva + 190, ttc: s8.solde.ttc + 1340, statut: 'Encaissée', fraisIds: ['mock-fr-c1', 'mock-fr-c2', 'mock-fr-c3', 'mock-fr-c4'], deboursHT: 1150, deboursTVA: 190, mock: true });
    ry('mock-d-clo', D(50));
    tr('mock-d-clo', 'M. Berrada Hicham', 'Prospect', 'Convention signée', 200);
    tr('mock-d-clo', 'M. Berrada Hicham', 'Convention signée', 'En cours', 50);
    tr('mock-d-clo', 'M. Berrada Hicham', 'En cours', 'Livré - solde dû', 45);
    tr('mock-d-clo', 'M. Berrada Hicham', 'Livré - solde dû', 'Clôturé', 40);
    aud({ id: 'mock-a-clo1', dossierId: 'mock-d-clo', role: '1501/2025', juridiction: 'TPI (1re instance)', ville: 'Rabat', date: D(120), heure: '09:00', sens: 'Nous: défendeur', adverse: '', objet: 'Fond — jugé et clôturé', etat: 'Jugement rendu', dateJugement: D(120), source: 'manuel', compteRendu: 'Clôturé.' });
    // 9. Abandonné
    dossier({ id: 'mock-d-aban', client: 'Mme Slawi Khadija', type: 'MRE / Investisseur', mission: MISSION.diag, honoraires: 600, tva: 20, provisionPct: 50, statut: 'Abandonné', createdAt: D(100), updatedAt: D(90) });
    tr('mock-d-aban', 'Mme Slawi Khadija', 'Prospect', 'Abandonné', 90);
    // 10. Abonnement (next dépassé → auto-facturation au dashboard)
    dossier({ id: 'mock-d-abo', client: 'Résidence Les Fleurs', ice: '567890123456789', type: 'Loi 09-08 / PME', mission: MISSION.abo, honoraires: 3000, tva: 20, provisionPct: 0, statut: 'En cours', abonnementActif: true, abonnementMontant: 3000, abonnementDebut: MON(9, 1), abonnementNext: D(2), contact: '05 22 00 00 10', createdAt: D(270), updatedAt: D(2) });
    conventions.push({ id: 'mock-ch-abo', dossierId: 'mock-d-abo', num: nx('CH'), date: D(270), mission: MISSION.abo, ht: 3000, tva: 600, ttc: 3600, provision: 0, provisionPct: 0, mock: true });
    for (var mi = 8; mi >= 1; mi--) {
      var per = MON(mi, 3).slice(0, 7);
      factures.push({ id: 'mock-fh-abo' + mi, dossierId: 'mock-d-abo', num: nx('FH'), date: MON(mi, 3), type: 'Facture solde', ht: 3000, tva: 600, ttc: 3600, statut: 'Encaissée', abonnement: true, periode: per, mock: true });
    }
    tr('mock-d-abo', 'Résidence Les Fleurs', 'Prospect', 'Convention signée', 270);
    tr('mock-d-abo', 'Résidence Les Fleurs', 'Convention signée', 'En cours', 265);
    aud({ id: 'mock-a-abo1', dossierId: 'mock-d-abo', role: '1601/2026', juridiction: 'TPI (1re instance)', ville: 'Mohammedia', date: D(-12), heure: '09:00', sens: 'Partie civile', adverse: 'Syndic adverse', objet: 'Charges impayées', etat: 'À venir', source: 'manuel', compteRendu: '' });
    // 11-12. Multi-dossiers (vue Clients)
    var s11 = provSplit(8000, 20, 50);
    dossier({ id: 'mock-d-az1', client: 'Groupe Azur Holding', ice: '678901234567890', type: 'Créateur / Infopreneur', mission: MISSION.crea, honoraires: 8000, tva: 20, provisionPct: 50, provisionEncaissee: true, provisionDate: M1, statut: 'En cours', contact: '06 69 00 00 11', createdAt: D(55), updatedAt: M1 });
    conventions.push({ id: 'mock-ch-az1', dossierId: 'mock-d-az1', num: nx('CH'), date: D(45), mission: MISSION.crea, ht: 8000, tva: 1600, ttc: 9600, provision: 4800, provisionPct: 50, mock: true });
    factures.push({ id: 'mock-rp-az1', dossierId: 'mock-d-az1', num: nx('RP'), date: M1, type: 'Reçu provision', ht: s11.prov.ht, tva: s11.prov.tva, ttc: s11.prov.ttc, statut: 'Encaissée', mock: true });
    ry('mock-d-az1', M1);
    tr('mock-d-az1', 'Groupe Azur Holding', 'Prospect', 'Convention signée', 45);
    tr('mock-d-az1', 'Groupe Azur Holding', 'Convention signée', 'En cours', 40);
    dossier({ id: 'mock-d-az2', client: 'Groupe Azur Holding', ice: '678901234567890', type: 'E-commerce / YouCan', mission: MISSION.eco, honoraires: 4500, tva: 20, provisionPct: 50, statut: 'Prospect', contact: '06 69 00 00 11', createdAt: D(6), updatedAt: D(6) });
    tr('mock-d-az2', 'Groupe Azur Holding', '', 'Prospect', 6);
    aud({ id: 'mock-a-az1a', dossierId: 'mock-d-az1', role: '1701/2026', juridiction: 'Tribunal de commerce', ville: 'Tanger', date: D(-7), heure: '10:00', sens: 'Nous: demandeur', adverse: '', objet: 'Statuts contestés', etat: 'À venir', source: 'manuel', compteRendu: '' });
    aud({ id: 'mock-a-az1b', dossierId: 'mock-d-az1', role: '1702/2026', juridiction: 'Cour d\u2019appel', ville: 'Tanger', date: D(-40), heure: '09:00', sens: 'Nous: demandeur', adverse: '', objet: 'Appel incident', etat: 'À venir', source: 'mahakim', compteRendu: '' });
    clients.push({ id: 'mock-ct-az', name_norm: 'groupe azur holding', label: 'Groupe Azur Holding', tel: '06 69 00 00 11', email: 'contact@groupe-azur.ma', ville: 'Casablanca', ice: '678901234567890', notes: 'Démo : client multi-dossiers.', createdAt: AT(6), updatedAt: AT(6), mock: true });
    // 13-14. Conflits croisés (client A = adverse de B)
    dossier({ id: 'mock-d-confa', client: 'Karim Benali', type: 'Freelance / Agence offshore', mission: MISSION.contrats, honoraires: 4500, tva: 20, provisionPct: 50, statut: 'Convention envoyée', adverse: 'Société Atlas', contact: '06 70 00 00 13', createdAt: D(8), updatedAt: D(2) });
    conventions.push({ id: 'mock-ch-confa', dossierId: 'mock-d-confa', num: nx('CH'), date: D(2), mission: MISSION.contrats, ht: 4500, tva: 900, ttc: 5400, provision: 2700, provisionPct: 50, mock: true });
    tr('mock-d-confa', 'Karim Benali', 'Prospect', 'Convention envoyée', 2);
    dossier({ id: 'mock-d-confb', client: 'Société Atlas', type: 'E-commerce / YouCan', mission: MISSION.diag, honoraires: 900, tva: 20, provisionPct: 50, statut: 'Prospect', adverse: 'Karim Benali', createdAt: D(3), updatedAt: D(3) });
    tr('mock-d-confb', 'Société Atlas', '', 'Prospect', 3);
    clients.push({ id: 'mock-ct-kb', name_norm: 'karim benali', label: 'Karim Benali', tel: '06 70 00 00 13', email: '', ville: 'Rabat', ice: '', notes: 'Démo : conflit croisé avec Société Atlas.', createdAt: AT(3), updatedAt: AT(3), mock: true });
    aud({ id: 'mock-a-confa1', dossierId: 'mock-d-confa', role: '1801/2026', juridiction: 'TPI (1re instance)', ville: 'Rabat', date: D(-5), heure: '09:00', sens: 'Nous: demandeur', adverse: 'Société Atlas', objet: 'Facture impayée', etat: 'À venir', source: 'manuel', compteRendu: '' });
    aud({ id: 'mock-a-confa2', dossierId: 'mock-d-confa', role: '1802/2026', juridiction: 'Cour d\u2019appel', ville: 'Rabat', date: D(-50), heure: '09:00', sens: 'Nous: demandeur', adverse: 'Société Atlas', objet: 'Appel incident', etat: 'À venir', source: 'mahakim', compteRendu: '' });
    aud({ id: 'mock-a-sign1', dossierId: 'mock-d-sign', role: '1901/2026', juridiction: 'Tribunal administratif', ville: 'Rabat', date: D(-11), heure: '10:00', sens: 'Nous: défendeur', adverse: '', objet: 'Recours CNDP', etat: 'À venir', source: 'manuel', compteRendu: '' });
    aud({ id: 'mock-a-nory1', dossierId: 'mock-d-nory', role: '2001/2026', juridiction: 'Justice de paix', ville: 'Salé', date: D(-8), heure: '09:00', sens: 'Nous: demandeur', adverse: '', objet: 'Petit litige', etat: 'À venir', source: 'manuel', compteRendu: '' });
    aud({ id: 'mock-a-prosp1', dossierId: 'mock-d-prosp', role: '2101/2026', juridiction: 'TPI (1re instance)', ville: 'Fès', date: D(-14), heure: '09:00', sens: 'Nous: demandeur', adverse: '', objet: 'Premier contact tribunal', etat: 'À venir', source: 'manuel', compteRendu: '' });
    aud({ id: 'mock-a-env1', dossierId: 'mock-d-env', role: '2201/2026', juridiction: 'Tribunal de commerce', ville: 'Agadir', date: D(-13), heure: '10:30', sens: 'Nous: défendeur', adverse: '', objet: 'CGV contestées', etat: 'À venir', source: 'manuel', compteRendu: '' });

    // Frais (14) : 4 Facturé consommés par la solde du clôturé
    function fr(id, dossierId, date, categorie, label, ht, tva, remb, statut) {
      frais.push({ id: id, dossierId: dossierId, date: date, categorie: categorie, label: label, montantHT: ht, tva: tva, remboursable: remb, statut: statut, createdAt: AT(40), mock: true });
    }
    fr('mock-fr-c1', 'mock-d-clo', D(45), 'Greffe / Tribunal', 'Timbre greffe TPI', 500, 100, true, 'Facturé');
    fr('mock-fr-c2', 'mock-d-clo', D(45), 'Greffe / Tribunal', 'Droit de plaidoirie', 300, 60, true, 'Facturé');
    fr('mock-fr-c3', 'mock-d-clo', D(44), 'Déplacement', 'Déplacement Rabat', 200, 0, true, 'Facturé');
    fr('mock-fr-c4', 'mock-d-clo', D(44), 'Traduction', 'Traduction pièce', 150, 30, true, 'Facturé');
    fr('mock-fr-l1', 'mock-d-loi', D(20), 'Déplacement', 'Déplacement CNDP Rabat', 1200, 240, true, 'À facturer');
    fr('mock-fr-l2', 'mock-d-loi', D(18), 'Traduction', 'Traduction politique confidentialité', 600, 120, true, 'À facturer');
    fr('mock-fr-e1', 'mock-d-eco', D(15), 'Timbre / Droit', 'Timbre dépôt', 200, 0, true, 'À facturer');
    fr('mock-fr-e2', 'mock-d-eco', D(15), 'Greffe / Tribunal', 'Frais greffe commerce', 500, 100, true, 'À facturer');
    fr('mock-fr-a1', 'mock-d-abo', D(30), 'Autre', 'Documentation doctrine', 300, 60, false, 'Non remboursable');
    fr('mock-fr-z1', 'mock-d-az1', D(40), 'OMPIC / Dépôt', 'Dépôt marque OMPIC', 1800, 360, true, 'À facturer');
    fr('mock-fr-z2', 'mock-d-az1', D(40), 'OMPIC / Dépôt', 'Recherche antériorité OMPIC', 400, 80, true, 'À facturer');
    fr('mock-fr-v1', 'mock-d-liv', D(25), 'Greffe / Tribunal', 'Timbre appel', 1000, 200, true, 'À facturer');
    fr('mock-fr-n1', 'mock-d-nory', D(12), 'Timbre / Droit', 'Timbre dossier', 200, 40, true, 'À facturer');
    fr('mock-fr-s1', 'mock-d-sign', D(10), 'Autre', 'Ouverture administrative', 100, 20, false, 'Non remboursable');

    // Veille (6, sourcée)
    function vv(id, date, source, title, tags, statut, dossierId) {
      veille.push({ id: id, date: date, source: source, title: title, url: '', tags: tags, dossierId: dossierId || '', statut: statut, notes: 'Démo.', createdAt: AT(20), mock: true });
    }
    vv('mock-v-1', D(20), 'BO', 'BO 7536 — Loi 66-23 promulguée ( Dahir 1-26-75)', '66-23, barreau', 'Action requise', 'mock-d-loi');
    vv('mock-v-2', D(35), 'CNDP', 'CNDP — sanctions art. 64-65 : registre obligatoire', '09-08, sanctions', 'À lire', '');
    vv('mock-v-3', D(50), 'OMPIC', 'NOUR DAR — dépôt en ligne OMPIC', 'OMPIC, marque', 'Lu', '');
    vv('mock-v-4', D(70), 'Office des Changes', 'IGOC 2026 — instruction générale des changes', 'changes, IGOC', 'Lu', '');
    vv('mock-v-5', D(90), 'DGI / tax.gov.ma', 'Convergence TVA — notes DGI', 'TVA, CGI', 'Archivé', '');
    vv('mock-v-6', D(110), 'sgg.gov.ma', 'LF 2026 — projet, mesures PME', 'LF, fiscalité', 'Archivé', '');

    return {
      dossiers: dossiers, conventions: conventions, factures: factures, echeances: echeances,
      frais: frais, veille: veille, clients: clients, audiences: audiences, jugements: jugements,
      transitions: transitions,
      dossierChecks: { 'mock-d-clo': { kyc: true, conflit: true, conv: true, prov: true, j0: true, lettre: true, j2: true, j5: true, j7: true, solde: true, pv: true, cloture: true } },
      objectifCA: { targetHT: 45000, period: 'mensuel', updatedAt: new Date().toISOString() },
      seq: { CH: seq.CH, RP: seq.RP, FH: seq.FH, LM: 1, PV: 1 }
    };
  }

  /* ================= seed / wipe ================= */
  function hasMock() {
    return (LS.get('dossiers', []) || []).some(function (d) { return d.mock === true; });
  }
  function realCount() {
    return (LS.get('dossiers', []) || []).filter(function (d) { return !d.mock; }).length;
  }
  function seed() {
    if (!window.Cabinet || !window.Cabinet.collectBackup) return null;
    if (hasMock()) wipe({ silent: true });
    if (realCount() > 0 && !LS.get(SNAP_KEY, null)) {
      LS.set(SNAP_KEY, {
        v: 1, at: new Date().toISOString(),
        backup: window.Cabinet.collectBackup(),
        lastExport: LS.get('lastExport', null),
        backupNag: LS.get('backupNag', null)
      });
    }
    var sc = buildScenario();
    LS.set('dossiers', sc.dossiers);
    LS.set('conventions', sc.conventions);
    LS.set('factures', sc.factures);
    LS.set('echeances', sc.echeances);
    LS.set('frais', sc.frais);
    LS.set('veille', sc.veille);
    LS.set('clients', sc.clients);
    LS.set('audiences', sc.audiences);
    LS.set('jugements', sc.jugements);
    LS.set('transitions', sc.transitions);
    LS.set('dossierChecks', sc.dossierChecks);
    LS.set('objectifCA', sc.objectifCA);
    var Y = new Date().getFullYear();
    LS.set('numSeq:CH:' + Y, sc.seq.CH);
    LS.set('numSeq:RP:' + Y, sc.seq.RP);
    LS.set('numSeq:FH:' + Y, sc.seq.FH);
    LS.set('numSeq:LM:' + Y, sc.seq.LM);
    LS.set('numSeq:PV:' + Y, sc.seq.PV);
    LS.del('lastExport'); // bonus O6 : le rappel se déclenche après seed
    LS.del('backupNag');
    LS.del('alertMutes');
    toast('Jeu de démonstration chargé (' + sc.dossiers.length + ' dossiers, ' + sc.audiences.length + ' audiences). Données réelles ' + (LS.get(SNAP_KEY, null) ? 'sauvegardées.' : 'absentes — suppression = filtre.'));
    try { if (window.Cabinet) window.Cabinet.renderCabinet(); } catch (e) { console.warn('avocato', e); }
    return sc;
  }
  var MOCK_KEYS = ['dossiers', 'conventions', 'factures', 'echeances', 'frais', 'veille', 'clients', 'audiences', 'jugements', 'transitions', 'dossierChecks'];
  function stripMock() {
    MOCK_KEYS.forEach(function (k) {
      var v = LS.get(k, null);
      if (Array.isArray(v)) LS.set(k, v.filter(function (x) { return !(x && x.mock === true); }));
      else if (v && typeof v === 'object') {
        var out = {};
        Object.keys(v).forEach(function (kk) {
          var arr = v[kk];
          out[kk] = Array.isArray(arr) ? arr.filter(function (x) { return !(x && x.mock === true); }) : arr;
        });
        LS.set(k, out);
      }
    });
  }
  function recomputeSeq() {
    var Y = new Date().getFullYear();
    function maxSuffix(list, prefix) {
      var re = new RegExp('^' + prefix + '-' + Y + '-(\\d+)$'), mx = 0;
      (list || []).forEach(function (it) { var m = re.exec(it.num || ''); if (m) mx = Math.max(mx, parseInt(m[1], 10)); });
      return mx;
    }
    var convs = LS.get('conventions', []) || [], facts = LS.get('factures', []) || [];
    LS.set('numSeq:CH:' + Y, maxSuffix(convs, 'CH'));
    var rpMx = 0, fhMx = 0;
    facts.forEach(function (f) {
      var m1 = new RegExp('^RP-' + Y + '-(\\d+)$').exec(f.num || '');
      var m2 = new RegExp('^FH-' + Y + '-(\\d+)$').exec(f.num || '');
      if (m1) rpMx = Math.max(rpMx, parseInt(m1[1], 10));
      if (m2) fhMx = Math.max(fhMx, parseInt(m2[1], 10));
    });
    LS.set('numSeq:RP:' + Y, rpMx);
    LS.set('numSeq:FH:' + Y, fhMx);
  }
  function wipe(opts) {
    opts = opts || {};
    var snap = LS.get(SNAP_KEY, null);
    if (snap && snap.backup && window.Cabinet && window.Cabinet.applyBackup) {
      window.Cabinet.applyBackup(snap.backup);
      if (snap.lastExport != null) LS.set('lastExport', snap.lastExport); else LS.del('lastExport');
      if (snap.backupNag != null) LS.set('backupNag', snap.backupNag); else LS.del('backupNag');
      LS.del(SNAP_KEY);
    } else {
      stripMock();
      recomputeSeq();
    }
    if (!opts.silent) {
      toast('Démonstration supprimée — état restauré.');
      try { if (window.Cabinet) window.Cabinet.renderCabinet(); } catch (e) { console.warn('avocato', e); }
    }
    return true;
  }

  /* ================= validate ================= */
  function validate() {
    var errors = [], warnings = [];
    var dossiers = LS.get('dossiers', []) || [];
    var mocks = dossiers.filter(function (d) { return d.mock === true; });
    var facts = LS.get('factures', []) || [];
    var convs = LS.get('conventions', []) || [];
    var echs = LS.get('echeances', []) || [];
    var frs = LS.get('frais', []) || [];
    var auds = LS.get('audiences', []) || [];
    var jugs = LS.get('jugements', []) || [];
    var trs = LS.get('transitions', []) || [];
    function calc(ht, tva) { ht = Number(ht) || 0; tva = Number(tva) || 0; var tv = Math.round(ht * tva / 100); return { ht: ht, tva: tv, ttc: ht + tv }; }
    // unicité ids
    [['dossiers', dossiers], ['factures', facts], ['audiences', auds], ['echeances', echs]].forEach(function (pair) {
      var seen = {}, dup = false;
      pair[1].forEach(function (x) { if (x && x.id) { if (seen[x.id]) dup = true; seen[x.id] = 1; } });
      if (dup) errors.push('ids dupliqués dans ' + pair[0]);
    });
    // unicité numéros par préfixe
    var nums = {};
    convs.concat(facts).forEach(function (x) {
      if (!x.num) return;
      var p = String(x.num).split('-')[0];
      nums[p] = nums[p] || {};
      if (nums[p][x.num]) errors.push('numéro dupliqué : ' + x.num);
      nums[p][x.num] = 1;
    });
    // compteurs >= max observé
    var Y = new Date().getFullYear();
    [['CH', convs], ['RP', facts.filter(function (f) { return f.type === 'Reçu provision'; })], ['FH', facts.filter(function (f) { return f.type === 'Facture solde'; })]].forEach(function (pair) {
      var mx = 0;
      pair[1].forEach(function (x) {
        var m = new RegExp('^' + pair[0] + '-' + Y + '-(\\d+)$').exec(x.num || '');
        if (m) mx = Math.max(mx, parseInt(m[1], 10));
      });
      var key = LS.get('numSeq:' + pair[0] + ':' + Y, 0);
      if (Number(key) < mx) errors.push('compteur ' + pair[0] + ' (' + key + ') < max (' + mx + ')');
    });
    if (Number(LS.get('numSeq:LM:' + Y, 0)) < 1) errors.push('compteur LM manquant');
    if (Number(LS.get('numSeq:PV:' + Y, 0)) < 1) errors.push('compteur PV manquant');
    mocks.forEach(function (d) {
      var ff = facts.filter(function (f) { return f.dossierId === d.id; });
      var rp = ff.filter(function (f) { return f.type === 'Reçu provision'; });
      var so = ff.filter(function (f) { return f.type === 'Facture solde' && !f.abonnement; });
      // argent : reçu + (solde − débours) = TTC exact
      if (rp.length && so.length) {
        var sumRP = rp.reduce(function (s, f) { return s + (Number(f.ttc) || 0); }, 0);
        var sumSo = so.reduce(function (s, f) { return s + (Number(f.ttc) || 0) - (Number(f.deboursHT) || 0) - (Number(f.deboursTVA) || 0); }, 0);
        var dossierTTC = calc(d.honoraires, d.tva).ttc;
        if (sumRP + sumSo !== dossierTTC) errors.push('argent ' + d.client + ' : ' + sumRP + '+' + sumSo + ' ≠ ' + dossierTTC);
      }
      // statut ⟹ preuves
      var FORWARD = ['Convention signée', 'En cours', 'Livré - solde dû', 'Clôturé'];
      if (FORWARD.indexOf(d.statut) !== -1 && !convs.some(function (c) { return c.dossierId === d.id; })) errors.push(d.client + ' : ' + d.statut + ' sans convention');
      if (d.provisionEncaissee && !rp.length) errors.push(d.client + ' : provision cochée sans reçu');
      if (d.statut === 'Clôturé' && !ff.some(function (f) { return f.type === 'Facture solde' && f.statut === 'Encaissée'; })) errors.push(d.client + ' : clôturé sans solde encaissé');
      // rythmes : si J0-J7 partiel, erreur ; absent = alerte (cas pathologique voulu)
      var rys = echs.filter(function (e) { return e.dossierId === d.id && e.auto === 'RYTHME'; });
      if (d.provisionEncaissee && !/abonnement/i.test(d.mission || '') && d.abonnementActif !== true) {
        if (!rys.length) warnings.push(d.client + ' : provision sans rythme (garde-fou à créer)');
        else {
          var types = rys.map(function (e) { return e.type; });
          ['Rythme J0', 'Rythme J2', 'Rythme J5', 'Rythme J7'].forEach(function (t) {
            if (types.indexOf(t) === -1) errors.push(d.client + ' : rythme incomplet (' + t + ' manquant)');
          });
        }
      }
      // transitions : chaque dossier mock est tracé
      if (!trs.some(function (t) { return t.dossierId === d.id; })) errors.push(d.client + ' : sans transition');
      // verrou ouvert = alerte voulue
      if (['Convention signée', 'En cours', 'Livré - solde dû', 'Clôturé'].indexOf(d.statut) !== -1 && !d.provisionEncaissee) warnings.push(d.client + ' : verrou art. 30 ouvert (' + d.statut + ')');
      // stagnation
      var upd = (d.updatedAt || d.createdAt || '').slice(0, 10);
      if (upd && ['Clôturé', 'Abandonné'].indexOf(d.statut) === -1) {
        var age = Math.round((new Date().getTime() - new Date(upd + 'T12:00:00').getTime()) / 86400000);
        var seuil = d.statut === 'Prospect' ? 7 : (d.statut === 'Convention envoyée' ? 10 : 14);
        if (age > seuil) warnings.push(d.client + ' : stagnation ' + age + ' j (seuil ' + seuil + ')');
      }
    });
    // abonnement overdue = alerte voulue
    mocks.forEach(function (d) {
      var m = (d.mission || '').toLowerCase();
      if ((d.abonnementActif || m.indexOf('abonnement') !== -1) && d.abonnementActif !== false && ['Clôturé', 'Abandonné'].indexOf(d.statut) === -1) {
        var next = d.abonnementNext || '';
        if (next && next <= D(0)) warnings.push(d.client + ' : abonnement à facturer (' + next + ')');
      }
    });
    // intégrité audiences/jugements
    auds.filter(function (a) { return a.mock === true; }).forEach(function (a) {
      if (a.dossierId && !dossiers.some(function (d) { return d.id === a.dossierId; })) errors.push('audience orpheline ' + a.id);
    });
    jugs.filter(function (j) { return j.mock === true; }).forEach(function (j) {
      if (!auds.some(function (a) { return a.id === j.audienceId; })) errors.push('jugement orphelin ' + j.id);
      if (j.delai && j.delai.ajustee && j.delai.ajustee <= D(0)) warnings.push('délai recours échu (' + j.id + ')');
    });
    // réalisme montants : honoraires dans la fourchette du libellé
    mocks.forEach(function (d) {
      var m = d.mission || '';
      var mm = /\(([\d.]+)\s*-\s*([\d.]+)/.exec(m);
      if (mm) {
        var lo = Number(mm[1].replace(/\./g, '')), hi = Number(mm[2].replace(/\./g, ''));
        var h = Number(d.honoraires) || 0;
        if (h < lo || h > hi) errors.push(d.client + ' : honoraires ' + h + ' hors fourchette ' + lo + '-' + hi);
      }
    });
    // frais Facturé adossés à une solde
    frs.filter(function (f) { return f.mock === true && f.statut === 'Facturé'; }).forEach(function (f) {
      var ok = facts.some(function (x) { return x.type === 'Facture solde' && (x.fraisIds || []).indexOf(f.id) !== -1; });
      if (!ok) errors.push('frais Facturé sans solde : ' + f.label);
    });
    return { errors: errors, warnings: warnings };
  }

  /* ================= boutons dashboard ================= */
  function injectDemoButtons() {
    try {
      if (LS.get('cabinetView', '') !== 'dashboard') return;
      var content = $('#content');
      if (!content) return;
      var sample = content.querySelector('#cabSample');
      if (!sample || content.querySelector('[data-mock-seed]')) return;
      sample.style.display = 'none';
      var b1 = document.createElement('button');
      b1.className = 'btn btn-primary';
      b1.type = 'button';
      b1.textContent = 'Données de démonstration';
      b1.setAttribute('data-mock-seed', '1');
      b1.addEventListener('click', function () { seed(); });
      sample.parentNode.insertBefore(b1, sample.nextSibling);
      if (hasMock()) {
        var b2 = document.createElement('button');
        b2.className = 'btn btn-danger';
        b2.type = 'button';
        b2.textContent = 'Supprimer la démo';
        b2.setAttribute('data-mock-wipe', '1');
        b2.addEventListener('click', function () { wipe(); });
        b1.parentNode.insertBefore(b2, b1.nextSibling);
        var res = validate();
        var badge = document.createElement('span');
        badge.className = 'tag ' + (res.errors.length ? 'tag-bordeaux' : 'tag-green');
        badge.setAttribute('data-mock-badge', '1');
        badge.style.marginLeft = '8px';
        badge.textContent = res.errors.length ? ('✗ ' + res.errors.length + ' erreur(s)') : ('✓ démo cohérente' + (res.warnings.length ? ' · ' + res.warnings.length + ' alerte(s) voulue(s)' : ''));
        badge.title = res.errors.concat(res.warnings).slice(0, 8).join('\n');
        b2.parentNode.insertBefore(badge, b2.nextSibling);
      }
    } catch (e) { console.warn('avocato', e); }
  }
  var observerDone = false;
  function initObserver() {
    if (observerDone) return;
    observerDone = true;
    try {
      var obs = new MutationObserver(function () { try { injectDemoButtons(); } catch (e) { console.warn('avocato', e); } });
      obs.observe(document.documentElement, { childList: true, subtree: true });
    } catch (e) { console.warn('avocato', e); }
  }
  function init() { initObserver(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  setTimeout(init, 2000);

  window.Mock = { seed: seed, wipe: wipe, validate: validate, hasMock: hasMock };
})();
