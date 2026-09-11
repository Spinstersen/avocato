/* AVOCATO Mahakim -- Phase F (SUIVI_AUDIENCES_PLAN.md).
   Import assiste depuis mahakim.ma : TSV/CSV colle, JSON (bookmarklet), mapping
   previsualise, diff nouvelle/report/inchangee, import par lot + annulation.
   Offline-first, localStorage only. Aucune automatisation du portail : la collecte
   se fait dans MA session, d'un clic humain (bookmarklet ou copier-coller).
   Statuts exacts respectes : 'À venir', 'Reportée'. */
(function () {
  'use strict';

  var LS = window.AvocatoStore.LS;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.from((r || document).querySelectorAll(s)); };
  var { esc, uid, pad, stripAccents, normalize, jaccard, isSimilar } = window.AvocatoCore;
  function toast(m, o) { if (window.Cabinet && window.Cabinet.toast) window.Cabinet.toast(m, o); }
  function dossiers() { return LS.get('dossiers', []) || []; }
  function audiences() { return LS.get('audiences', []) || []; }
  function saveAuds(a) { LS.set('audiences', a); }
  function dossierOf(id) { return dossiers().find(function (x) { return x.id === id; }); }

  /* Liste canonique : MÊMES chaînes que le dialogue audience (Cour).
     Note : 'Cour d\u2019appel' utilise l'échappement \u2019 comme cabinet-cour.js. */
  var JURIS = (window.Cour && window.Cour.JURIS) || ['TPI (1re instance)', 'Cour d\u2019appel', 'Tribunal de commerce', 'Tribunal administratif', 'Cour de cassation', 'Justice de paix', 'Autre'];
  var JURIS_KEYWORDS = ['cassation', 'commerce', 'administratif', 'appel', 'paix', 'tribunal'];

  /* ---------------- parseurs permissifs ---------------- */
  function normRole(s) {
    var str = String(s || '');
    var m3 = /(\d{4})\s*\/\s*(\d{1,7})\s*\/\s*(\d{1,7})/.exec(str);
    if (m3) return m3[1] + '/' + m3[2] + '/' + m3[3]; // format réel : 2026/1202/1233
    var m = /(\d{1,7})\s*\/\s*(\d{4})/.exec(str);
    return m ? (m[1] + '/' + m[2]) : '';
  }
  function parseRole(cell) { return normRole(cell) || null; }
  function parseDateFR(cell) {
    var s = String(cell || '').trim();
    if (!s) return null;
    var iso = /(\d{4})-(\d{2})-(\d{2})/.exec(s);
    if (iso) {
      var y = Number(iso[1]), mo = Number(iso[2]), d = Number(iso[3]);
      if (mo >= 1 && mo <= 12 && d >= 1 && d <= 31) return iso[1] + '-' + iso[2] + '-' + iso[3];
      return null;
    }
    var m = /(\d{1,2})\s*[\/\-.]\s*(\d{1,2})\s*[\/\-.]\s*(\d{2,4})/.exec(s);
    if (!m) return null;
    var dd = Number(m[1]), mm = Number(m[2]), yy = Number(m[3]);
    if (yy < 100) yy += 2000;
    if (mm < 1 || mm > 12 || dd < 1 || dd > 31) return null;
    return yy + '-' + pad(mm) + '-' + pad(dd);
  }
  function parseHeure(cell) {
    var m = /(\d{1,2})\s*[hH:]\s*(\d{2})/.exec(String(cell || ''));
    if (!m) return '';
    var h = Number(m[1]), mi = Number(m[2]);
    if (h > 23 || mi > 59) return '';
    return pad(h) + ':' + pad(mi);
  }
  function parseJuridiction(cell) {
    var low = stripAccents(String(cell || '').toLowerCase());
    if (low.indexOf('cassation') !== -1) return 'Cour de cassation';
    if (low.indexOf('commerce') !== -1) return 'Tribunal de commerce';
    if (low.indexOf('administratif') !== -1) return 'Tribunal administratif';
    if (low.indexOf('appel') !== -1) return 'Cour d\u2019appel';
    if (low.indexOf('paix') !== -1) return 'Justice de paix';
    if (low.indexOf('tpi') !== -1 || low.indexOf('premiere') !== -1 || low.indexOf('1re') !== -1 || low.indexOf('instance') !== -1) return 'TPI (1re instance)';
    if (low.indexOf('tribunal') !== -1) return 'TPI (1re instance)';
    return 'Autre';
  }
  function parseVille(cell) {
    var s = String(cell || '').trim();
    if (!s) return '';
    var m = /(?:\bde\b|\bd\u2019|\bd'|\bdu\b)\s+([A-ZÀ-Þ][\wÀ-ÿ'’\- ]*?)(?:\s*[,\-;\/].*)?$/.exec(s);
    if (!m) return '';
    var v = m[1].trim();
    var BAD_VILLE = ['commerce', 'appel', 'cassation', 'instance', 'paix', 'justice', 'tribunal', 'contentieux', 'refere', 'premiere', 'premiere instance'];
    if (!v || BAD_VILLE.indexOf(stripAccents(v.toLowerCase())) !== -1) return '';
    if (stripAccents(v.toLowerCase()) === 'casa') return 'Casablanca';
    return v;
  }

  /* ---------------- fiche suivi mahakim (contenu réel du portail, arabe) ----------------
     La carte (بطاقة الملف) + l'historique (لائحة الإجراءات) + parties.
     Les libellés arabes sont conservés tels quels (dir="auto" à l'affichage). */
  var AR_VILLES = [
    ['الدار البيضاء', 'Casablanca'], ['الرباط', 'Rabat'], ['فاس', 'Fès'],
    ['طنجة', 'Tanger'], ['أكادير', 'Agadir'], ['مراكش', 'Marrakech'],
    ['مكناس', 'Meknès'], ['وجدة', 'Oujda'], ['القنيطرة', 'Kénitra'],
    ['تطوان', 'Tétouan'], ['سلا', 'Salé'], ['المحمدية', 'Mohammedia'],
    ['الجديدة', 'El Jadida'], ['بني ملال', 'Béni Mellal'], ['الناظور', 'Nador'],
    ['الحسيمة', 'Al Hoceïma'], ['آسفي', 'Safi']
  ];
  function parseJuridictionAR(tribunalRaw) {
    var s = String(tribunalRaw || '');
    var ville = '';
    AR_VILLES.forEach(function (pair) { if (s.indexOf(pair[0]) !== -1) ville = pair[1]; });
    var juridiction = 'Autre';
    if (s.indexOf('نقض') !== -1) juridiction = 'Cour de cassation';
    else if (s.indexOf('استئناف') !== -1) juridiction = 'Cour d\u2019appel';
    else if (s.indexOf('تجارية') !== -1 || s.indexOf('التجارة') !== -1) juridiction = 'Tribunal de commerce';
    else if (s.indexOf('إدارية') !== -1 || s.indexOf('الادارية') !== -1) juridiction = 'Tribunal administratif';
    else if (s.indexOf('ابتدائية') !== -1) juridiction = 'TPI (1re instance)';
    return { juridiction: juridiction, ville: ville };
  }
  var AR_PROC_GLOSS = [
    ['حكم قطعي', 'Jugement définitif'], ['حكم تمهيدي', 'Jugement avant-dire droit'],
    ['تأخير', 'Report'], ['تأجيل', 'Report'], ['مداولة', 'Délibéré'], ['تأمل', 'Délibéré'],
    ['خبرة', 'Expertise'], ['تبليغ', 'Notification'], ['تعيين', 'Mise au rôle'],
    ['تغيير القاضي', 'Changement de composition'], ['تسجيل المقال', 'Enregistrement requête']
  ];
  function glossProcedure(typeAr) {
    var s = String(typeAr || '');
    for (var i = 0; i < AR_PROC_GLOSS.length; i++) {
      if (s.indexOf(AR_PROC_GLOSS[i][0]) !== -1) return AR_PROC_GLOSS[i][1];
    }
    return '';
  }
  function parseDateHeureAR(cell) {
    var s = String(cell || '').trim();
    var m = /(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})(?:\s+(\d{1,2})[h:](\d{2}))?/.exec(s);
    if (!m) return { date: null, heure: '' };
    var yy = Number(m[3]); if (yy < 100) yy += 2000;
    var dd = Number(m[1]), mm = Number(m[2]);
    if (mm < 1 || mm > 12 || dd < 1 || dd > 31) return { date: null, heure: '' };
    var heure = '';
    if (m[4] != null && !(m[4] === '00' && m[5] === '00')) heure = pad(Number(m[4])) + ':' + m[5];
    return { date: yy + '-' + pad(mm) + '-' + pad(dd), heure: heure };
  }
  function parseDossierJSON(text) {
    var data;
    try { data = JSON.parse(String(text || '')); }
    catch (e) { return { card: null, procedures: [], parties: [], error: 'JSON invalide : ' + e.message }; }
    if (!data || typeof data !== 'object' || (!data.card && !data.procedures)) {
      return { card: null, procedures: [], parties: [], error: 'Attendu : {card:{...}, procedures:[...]}' };
    }
    var c = data.card || {};
    function cv() {
      for (var i = 0; i < arguments.length; i++) {
        if (c[arguments[i]] != null && String(c[arguments[i]]).trim() !== '') return String(c[arguments[i]]).trim();
      }
      return '';
    }
    var tribRaw = cv('tribunal', 'court');
    var jv = parseJuridictionAR(tribRaw);
    var enr = parseDateHeureAR(cv('enregistrement'));
    var jug = parseDateHeureAR(cv('dateJugement'));
    var card = {
      tribunal: tribRaw,
      juridiction: cv('juridiction') || jv.juridiction,
      ville: cv('ville') || jv.ville,
      role: normRole(cv('role', 'numero')) || null,
      national: cv('national'),
      typeDossier: cv('typeDossier'),
      chambre: cv('chambre'),
      juge: cv('juge'),
      enregistrement: enr.date || '',
      sujet: cv('sujet'),
      dernierJugement: cv('dernierJugement'),
      dateJugement: jug.date || '',
      parties: [],
      raw: c
    };
    var procedures = [];
    (Array.isArray(data.procedures) ? data.procedures : []).forEach(function (p) {
      if (!p || typeof p !== 'object') return;
      function pv() {
        for (var i = 0; i < arguments.length; i++) {
          if (p[arguments[i]] != null && String(p[arguments[i]]).trim() !== '') return String(p[arguments[i]]).trim();
        }
        return '';
      }
      var d = parseDateHeureAR(pv('date', 'dateHeure'));
      var nx = parseDateHeureAR(pv('prochaine', 'prochaineHeure'));
      var typeAr = pv('type', 'typeAr');
      if (!d.date && !typeAr && !pv('decision')) return;
      procedures.push({
        date: d.date || '', heure: d.heure || '',
        typeAr: typeAr, typeFr: glossProcedure(typeAr),
        decision: pv('decision'),
        prochaine: nx.date || '', prochaineHeure: nx.heure || ''
      });
    });
    var parties = [];
    (Array.isArray(data.parties) ? data.parties : []).forEach(function (x) {
      var s = String((x && x.nom) || x || '').trim();
      if (s) parties.push(s);
    });
    card.parties = parties;
    return { card: card, procedures: procedures, parties: parties };
  }

  var HEADER_KEYS = ['role', 'n°', 'num', 'juridiction', 'tribunal', 'cour', 'date', 'heure', 'objet', 'affaire', 'ville', 'adverse', 'partie', 'dossier'];
  function splitLine(line, delim) {
    return line.split(delim).map(function (c) { return c.trim().replace(/^["“”']|["“”']$/g, '').trim(); });
  }
  function detectDelim(lines) {
    var head = lines.slice(0, 3).join('\n');
    if (head.indexOf('\t') !== -1) return '\t';
    var semis = (head.match(/;/g) || []).length, commas = (head.match(/,/g) || []).length;
    return semis >= commas ? ';' : ',';
  }
  function mapHeader(cells) {
    var map = {};
    cells.forEach(function (c, i) {
      var low = stripAccents(c.toLowerCase());
      if (!map.role && /(role|n.?°|num)/.test(low)) map.role = i;
      else if (map.juridiction == null && /(juridiction|tribunal|cour)/.test(low)) map.juridiction = i;
      else if (map.date == null && /(date|audience|renvoi)/.test(low)) map.date = i;
      else if (map.heure == null && /(heure|horaire)/.test(low)) map.heure = i;
      else if (map.objet == null && /(objet|affaire|matiere|nature)/.test(low)) map.objet = i;
      else if (map.ville == null && /ville/.test(low)) map.ville = i;
      else if (map.adverse == null && /(adverse|partie|defendeur|demandeur)/.test(low)) map.adverse = i;
    });
    return map;
  }
  function rowFromCells(cells, map) {
    function at(k, fb) { return cells[(map && map[k] != null) ? map[k] : fb] || ''; }
    var jurCell = at('juridiction', 1);
    var parsedVille = (map && map.ville != null) ? (cells[map.ville] || '') : parseVille(jurCell);
    return {
      role: parseRole(at('role', 0)),
      juridiction: parseJuridiction(jurCell),
      ville: parsedVille,
      date: parseDateFR(at('date', 2)),
      heure: parseHeure(at('heure', 3)),
      objet: at('objet', 4),
      adverse: at('adverse', 5),
      raw: cells.join(' | ')
    };
  }
  function parseTSV(text) {
    var lines = [];
    String(text || '').split(/\r?\n/).forEach(function (l) {
      var t = l.trim();
      if (!t || t.charAt(0) === '#') return;
      lines.push(l.replace(/\s+$/, '')); // garde les cellules vides de tête
    });
    var out = { rows: [], skipped: 0 };
    if (!lines.length) return out;
    var delim = detectDelim(lines);
    var first = splitLine(lines[0], delim);
    var hits = first.filter(function (c) {
      return HEADER_KEYS.some(function (k) { return stripAccents(c.toLowerCase()).indexOf(k) !== -1; });
    }).length;
    var map = null, start = 0;
    if (first.length > 1 && hits >= 2) { map = mapHeader(first); start = 1; }
    for (var i = start; i < lines.length; i++) {
      var cells = splitLine(lines[i], delim);
      if (!cells.length || (cells.length === 1 && !cells[0])) { out.skipped++; continue; }
      var row = rowFromCells(cells, map);
      if (!row.role && !row.date) { out.skipped++; continue; }
      out.rows.push(row);
    }
    return out;
  }
  function parseJSON(text) {
    var data;
    try { data = JSON.parse(String(text || '')); }
    catch (e) { return { rows: [], skipped: 0, error: 'JSON invalide : ' + e.message }; }
    var list = Array.isArray(data) ? data : (data.rows || data.data || []);
    if (!Array.isArray(list)) return { rows: [], skipped: 0, error: 'Attendu : tableau ou {rows:[...]}' };
    var out = { rows: [], skipped: 0 };
    list.forEach(function (it) {
      if (it && Array.isArray(it.cells)) {
        var r = rowFromCells(it.cells.map(String), null);
        if (r.role || r.date) out.rows.push(r); else out.skipped++;
        return;
      }
      if (!it || typeof it !== 'object') { out.skipped++; return; }
      function val() {
        for (var i = 0; i < arguments.length; i++) {
          var k = arguments[i];
          if (it[k] != null && String(it[k]).trim() !== '') return String(it[k]);
          var found = Object.keys(it).find(function (kk) { return stripAccents(kk.toLowerCase()) === stripAccents(k.toLowerCase()); });
          if (found && String(it[found]).trim() !== '') return String(it[found]);
        }
        return '';
      }
      var jurCell = val('juridiction', 'tribunal', 'court', 'jurisdiction');
      var r2 = {
        role: parseRole(val('role', 'numero', 'num', 'number', 'dossier')),
        juridiction: parseJuridiction(jurCell),
        ville: val('ville', 'city') || parseVille(jurCell),
        date: parseDateFR(val('date')),
        heure: parseHeure(val('heure', 'time', 'hour')),
        objet: val('objet', 'object', 'affaire', 'matter', 'motif'),
        adverse: val('adverse', 'opponent', 'partie'),
        raw: JSON.stringify(it).slice(0, 160)
      };
      if (r2.role || r2.date) out.rows.push(r2); else out.skipped++;
    });
    return out;
  }

  /* ---------------- MahakimAdapter (point d'extension API future) ----------------
     Brancher une API officielle = MahakimAdapter.register('api', {
       label: 'API mahakim (clé)', parse: async function(cfg){...return {rows, skipped}; }
     }) — le dialogue liste automatiquement l'adaptateur, sans toucher au reste. */
  var adapterReg = {};
  function registerAdapter(name, def) { adapterReg[name] = def; }
  function listAdapters() { return Object.keys(adapterReg); }
  registerAdapter('paste', { label: 'Texte collé (TSV / CSV auto)', parse: function (t) { return parseTSV(t); } });
  registerAdapter('json', { label: 'JSON (bookmarklet / fichier)', parse: function (t) { return parseJSON(t); } });
  registerAdapter('dossier', { label: 'JSON dossier suivi (carte + procédures)', parse: function (t) { var r = parseDossierJSON(t); r.isDossier = true; return r; } });

  /* ---------------- matching + diff ---------------- */
  function tokens(s) { return normalize(s).split(/\s+/).filter(Boolean); }
  function matchDossier(row) {
    if (row.role) {
      var hit = audiences().find(function (a) { return a.role && normRole(a.role) === row.role && a.dossierId; });
      if (hit) return { dossierId: hit.dossierId, how: 'role' };
    }
    var hay = [row.objet, row.adverse].filter(Boolean).join(' ');
    if (hay) {
      var ds = dossiers().find(function (d) { return d.client && isSimilar(d.client, hay); });
      if (ds) return { dossierId: ds.id, how: 'client' };
      var ds2 = dossiers().find(function (d) { return row.adverse && d.client && isSimilar(row.adverse, d.client); });
      if (ds2) return { dossierId: ds2.id, how: 'client' };
    }
    return { dossierId: '', how: 'aucun' };
  }
  function classify(row, dossierId) {
    if (!dossierId) return { kind: 'sans-dossier' };
    if (!row.role) return { kind: 'nouvelle', existing: null };
    var ex = audiences().find(function (a) { return a.dossierId === dossierId && a.role && normRole(a.role) === row.role; });
    if (!ex) return { kind: 'nouvelle', existing: null };
    if ((ex.date || '') !== (row.date || '')) return { kind: 'report', existing: ex };
    return { kind: 'inchangee', existing: ex };
  }

  /* ---------------- lots ---------------- */
  function getLots() { return LS.get('importLots', []) || []; }
  function saveLots(l) {
    while (l.length > 20) l.shift();
    LS.set('importLots', l);
  }
  function journalReport(dossierId, oldDate, newDate, role) {
    try {
      var tr = LS.get('transitions', []) || [];
      var d = dossierOf(dossierId) || {};
      tr.push({
        id: uid(), dossierId: dossierId || '', client: d.client || '',
        from: 'Audience ' + (oldDate || '?') + (role ? ' (' + role + ')' : ''),
        to: 'Report ' + (newDate || '?'),
        at: new Date().toISOString(), force: false, motif: 'import mahakim'
      });
      while (tr.length > 400) tr.shift();
      LS.set('transitions', tr);
    } catch (e) {}
  }
  function confirmImport(items) {
    var batchId = 'lot-' + uid();
    var created = [], updated = [], skipped = 0;
    var list = audiences();
    (items || []).forEach(function (it) {
      if (!it || !it.selected) { skipped++; return; }
      var row = it.row, dossierId = it.dossierId || '';
      if (!dossierId) { skipped++; return; }
      var cls = classify(row, dossierId);
      if (cls.kind === 'inchangee') { skipped++; return; }
      if (cls.kind === 'report' && cls.existing) {
        var ex = list.find(function (a) { return a.id === cls.existing.id; });
        if (ex) {
          updated.push({ id: ex.id, prevDate: ex.date, prevEtat: ex.etat });
          if (ex.date !== row.date) journalReport(dossierId, ex.date, row.date, row.role);
          ex.date = row.date || ex.date;
          ex.heure = row.heure || ex.heure;
          if (row.objet && !ex.objet) ex.objet = row.objet;
          if (row.ville && !ex.ville) ex.ville = row.ville;
          ex.source = 'mahakim';
          ex.importBatch = batchId;
          ex.updatedAt = new Date().toISOString();
        }
        return;
      }
      var obj = {
        id: uid(), dossierId: dossierId,
        role: row.role || '', juridiction: row.juridiction || 'Autre', ville: row.ville || '',
        date: row.date || '', heure: row.heure || '',
        sens: '', adverse: row.adverse || '', objet: row.objet || '',
        etat: 'À venir', source: 'mahakim', compteRendu: '',
        importBatch: batchId, updatedAt: new Date().toISOString()
      };
      obj.createdAt = obj.updatedAt;
      list.push(obj);
      created.push(obj.id);
    });
    saveAuds(list);
    var lots = getLots();
    lots.push({ id: batchId, at: new Date().toISOString(), source: 'mahakim', created: created, updated: updated, skipped: skipped });
    saveLots(lots);
    toast('Import mahakim : ' + created.length + ' nouvelle(s), ' + updated.length + ' report(s), ' + skipped + ' ignorée(s).', {
      undo: function () { undoLot(batchId); }
    });
    try { if (window.Cour && window.Cabinet && (LS.get('cabinetView', '') === 'audiences')) window.Cour.renderList(); } catch (e) {}
    return { batchId: batchId, created: created, updated: updated, skipped: skipped };
  }
  function undoLot(batchId) {
    var lots = getLots();
    var lot = lots.find(function (l) { return l.id === batchId; });
    if (!lot) return false;
    var list = audiences();
    (lot.created || []).forEach(function (id) {
      var i = list.findIndex(function (a) { return a.id === id; });
      if (i >= 0) list.splice(i, 1);
    });
    (lot.updated || []).forEach(function (u) {
      var a = list.find(function (x) { return x.id === u.id; });
      if (a) {
        a.date = u.prevDate; a.etat = u.prevEtat || a.etat;
        if (u.prevSuivi) {
          ['chambre', 'juge', 'numeroNational', 'typeDossier', 'dateEnregistrement', 'dernierJugement', 'procedures'].forEach(function (k) {
            if (u.prevSuivi[k] === undefined) delete a[k]; else a[k] = u.prevSuivi[k];
          });
        }
        a.updatedAt = new Date().toISOString();
      }
    });
    saveAuds(list);
    saveLots(lots.filter(function (l) { return l.id !== batchId; }));
    toast('Lot ' + batchId + ' annulé (' + (lot.created || []).length + ' retirée(s), ' + (lot.updated || []).length + ' restaurée(s)).');
    try { if (window.Cour && (LS.get('cabinetView', '') === 'audiences')) window.Cour.renderList(); } catch (e) {}
    return true;
  }

  /* ---------------- dialogue import ---------------- */
  function dossierOptions(sel) {
    return '<option value="">— Sans dossier —</option>' + dossiers().slice()
      .sort(function (a, b) { return (a.client || '').localeCompare(b.client || '', 'fr'); })
      .map(function (d) { return '<option value="' + esc(d.id) + '"' + (d.id === sel ? ' selected' : '') + '>' + esc(d.client || '') + '</option>'; }).join('');
  }
  function openImport() {
    var dlg = $('#dlgMahakim');
    if (!dlg) {
      dlg = document.createElement('dialog');
      dlg.id = 'dlgMahakim';
      dlg.className = 'dlg';
      dlg.setAttribute('aria-labelledby', 'mkTitle');
      dlg.style.maxWidth = '860px';
      dlg.innerHTML = '<form method="dialog" id="formMahakim"><h3 id="mkTitle">Importer depuis mahakim.ma</h3>' +
        '<div class="form-grid"><label>Source<select name="adapter" aria-label="Source d’import"></select></label>' +
        '<label class="span-2">Données à importer (TSV copié du portail ou JSON du bookmarklet)<textarea name="payload" rows="6" aria-label="Données à importer — tableau TSV ou JSON" placeholder="N° rôle	Juridiction	Date	Heure	Objet&#10;1234/2026	TPI de Casablanca	12/09/2026	09:30	Contestation facture"></textarea></label></div>' +
        '<div class="dlg-actions" style="justify-content:flex-start;flex-wrap:wrap"><button type="button" class="btn btn-primary" id="btnMkAnalyze">Analyser</button>' +
        '<button type="button" class="btn" id="btnMkGuide">Guide + bookmarklet</button>' +
        '<button type="button" class="btn" id="btnMkClose">Fermer</button></div>' +
        '<div id="mkPreview" style="padding:0 18px 6px"></div>' +
        '<div id="mkGuide" hidden style="padding:0 18px 16px;font-size:13px"></div></form>';
      document.body.appendChild(dlg);
      $('#btnMkClose').addEventListener('click', function () { dlg.close(); });
      $('#formMahakim').addEventListener('submit', function (e) { e.preventDefault(); });
      $('#btnMkAnalyze').addEventListener('click', function () {
        var fr = $('#formMahakim');
        renderPreview(fr.adapter.value, fr.payload.value);
      });
      $('#btnMkGuide').addEventListener('click', function () {
        var g = $('#mkGuide');
        g.hidden = !g.hidden;
        if (!g.hidden) renderGuide(g);
      });
    }
    var sel = dlg.querySelector('[name="adapter"]');
    if (sel) sel.innerHTML = listAdapters().map(function (n) { var d = adapterReg[n] || {}; return '<option value="' + esc(n) + '">' + esc(d.label || n) + '</option>'; }).join('');
    dlg.showModal();
  }
  function diffBadge(kind) {
    if (kind === 'nouvelle') return '<span class="badge badge-signee">nouvelle</span>';
    if (kind === 'report') return '<span class="badge badge-livre">report</span>';
    if (kind === 'inchangee') return '<span class="badge">inchangée</span>';
    return '<span class="badge badge-prospect">sans dossier</span>';
  }
  var previewRows = [];
  function renderPreview(adapterName, text) {
    var host = $('#mkPreview');
    if (!host) return;
    var ad = adapterReg[adapterName] || adapterReg.paste;
    var res = ad.parse(text || '');
    if (res.error) { host.innerHTML = '<p class="field-error">' + esc(res.error) + '</p>'; return; }
    if (res.isDossier) { renderDossierPreview(res); return; }
    previewRows = res.rows.map(function (row) {
      var m = matchDossier(row);
      return { row: row, dossierId: m.dossierId, how: m.how, selected: true };
    });
    if (!previewRows.length) {
      host.innerHTML = '<p class="today-clear">Rien d’importable (' + res.skipped + ' ligne(s) ignorée(s) : rôle et date introuvables).</p>';
      return;
    }
    host.innerHTML = '<p class="sub">' + previewRows.length + ' ligne(s) — ' + res.skipped + ' ignorée(s). Vérifiez le dossier proposé, décochez l’inutile, puis importez.</p>' +
      '<div class="cab-table-wrap"><table class="cab-table"><thead><tr><th></th><th>Rôle</th><th>Date</th><th>Juridiction</th><th>Objet</th><th>Dossier proposé</th><th>Diff</th></tr></thead><tbody>' +
      previewRows.map(function (pr, i) {
        var cls = classify(pr.row, pr.dossierId);
        return '<tr><td><input type="checkbox" data-mk-sel="' + i + '"' + (pr.selected && cls.kind !== 'inchangee' ? ' checked' : '') + ' aria-label="Importer la ligne rôle ' + esc(pr.row.role || (i + 1)) + '"></td>' +
          '<td class="mono">' + esc(pr.row.role || '—') + '</td>' +
          '<td class="mono">' + esc(pr.row.date || '—') + (pr.row.heure ? '<br>' + esc(pr.row.heure) : '') + '</td>' +
          '<td style="max-width:170px;white-space:normal">' + esc(pr.row.juridiction || '') + (pr.row.ville ? '<br><span style="font-size:11px;color:var(--text-dim)">' + esc(pr.row.ville) + '</span>' : '') + '</td>' +
          '<td style="max-width:200px;white-space:normal">' + esc(pr.row.objet || '') + '</td>' +
          '<td><select data-mk-dos="' + i + '">' + dossierOptions(pr.dossierId) + '</select>' +
          (pr.how !== 'aucun' ? '<br><span style="font-size:11px;color:var(--text-dim)">auto : ' + esc(pr.how) + '</span>' : '') + '</td>' +
          '<td data-mk-diff="' + i + '">' + diffBadge(cls.kind) + '</td></tr>';
      }).join('') + '</tbody></table></div>' +
      '<div class="cab-toolbar"><button type="button" class="btn btn-primary" id="btnMkImport">Importer la sélection</button></div>';
    $$('[data-mk-dos]', host).forEach(function (sel) {
      sel.addEventListener('change', function () {
        var i = Number(sel.dataset.mkDos);
        previewRows[i].dossierId = sel.value;
        previewRows[i].how = 'manuel';
        host.querySelector('[data-mk-diff="' + i + '"]').innerHTML = diffBadge(classify(previewRows[i].row, sel.value).kind);
      });
    });
    $('#btnMkImport').addEventListener('click', function () {
      $$('[data-mk-sel]', host).forEach(function (cb) { previewRows[Number(cb.dataset.mkSel)].selected = cb.checked; });
      var r = confirmImport(previewRows);
      var d = $('#dlgMahakim');
      if (d) d.close();
      if (window.Cabinet) {
        if (window.Cabinet.getMode() !== 'cabinet') window.Cabinet.setMode('cabinet');
        window.Cabinet.goView('audiences');
      }
      void r;
    });
  }
  function renderGuide(host) {
    host.innerHTML = '<div class="dash-panel"><h3>Bookmarklet mahakim — guide (2 min)</h3>' +
      '<ol class="rel-tpl-list">' +
      '<li>Glissez ce lien dans votre barre de favoris : <a id="mkBm" href="#">' + window.ico('scale') + ' mahakim → AVOCATO</a> (clic droit → copier l’adresse si le glisser-déposer est bloqué).</li>' +
      '<li>Démarrez le serveur : <span class="mono">node server/index.js</span> (http://127.0.0.1:8790).</li>' +
      '<li>Créez un appareil : Cabinet → Ctrl+K → « Sync / serveur local » → « Créer un appareil (token) » — gardez le token.</li>' +
      '<li>Connectez-vous sur mahakim.ma <strong>dans votre session</strong>, lancez une recherche d’affaires, puis cliquez le favori.</li>' +
      '<li>Collez le token à la première demande (mémorisé ensuite). Si le serveur est injoignable, un JSON est téléchargé : collez-le ici en source « JSON ».</li>' +
      '</ol>' +
      '<p class="field-help">Respect des CGU : le bookmarklet ne fait que lire le tableau <strong>déjà affiché</strong> par votre recherche manuelle, d’un seul clic humain — aucune navigation ni rafale automatisée, aucun contournement de session. En cas de doute, préférez le copier-coller manuel du tableau.</p>' +
      '<p class="field-help">Demande d’API officielle en cours (e-Participation data.gov.ma du 26/01/2026, sans réponse) — <span class="mono">MahakimAdapter.register()</span> est prêt pour la brancher sans toucher au reste.</p></div>';
    try {
      var code = bookmarkletDossierSource();
      $('#mkBm').href = 'javascript:' + encodeURI(code).replace(/#/g, '%23');
      $('#mkBm').title = 'Glissez-moi dans vos favoris';
    } catch (e) {}
  }
  function bookmarkletSource() {
    return "(function(){var E='http://127.0.0.1:8790/v1/imports/mahakim';"
      + "function tok(){try{var t=localStorage.getItem('avocato_bm_token');if(t)return t;"
      + "t=prompt('Token appareil AVOCATO (Ctrl+K > Sync / serveur local > Créer un appareil) :','');"
      + "if(t){localStorage.setItem('avocato_bm_token',t.trim());return t.trim();}}catch(e){}return '';}"
      + "function tx(el){return (el.innerText||el.textContent||'').replace(/\\s+/g,' ').trim();}"
      + "var rows=[];document.querySelectorAll('table').forEach(function(tb){"
      + "var heads=Array.from(tb.querySelectorAll('thead th')).map(tx);"
      + "if(!heads.length)heads=Array.from(tb.querySelectorAll('tr:first-child th')).map(tx);"
      + "var H=heads.join(' ').toLowerCase();"
      + "if(!/role|dossier|affaire/.test(H)||!/date|audience|renvoi/.test(H))return;"
      + "tb.querySelectorAll('tbody tr').forEach(function(tr){"
      + "var c=Array.from(tr.querySelectorAll('td')).map(tx).filter(function(x){return x;});"
      + "if(c.length)rows.push({cells:c});});});"
      + "if(!rows.length){alert('Aucun tableau d\\'affaires détecté sur cette page.');return;}"
      + "var payload={stats:{count:rows.length,url:location.href,at:new Date().toISOString()},rows:rows};"
      + "function dl(){var b=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});"
      + "var a=document.createElement('a');a.href=URL.createObjectURL(b);"
      + "a.download='mahakim-'+new Date().toISOString().slice(0,10)+'.json';a.click();}"
      + "var t=tok();if(!t){alert('Sans token : JSON téléchargé, à coller dans AVOCATO > Audiences > Importer.');dl();return;}"
      + "fetch(E,{method:'POST',headers:{'Content-Type':'application/json','x-avocato-token':t},body:JSON.stringify(payload)})"
      + ".then(function(r){if(!r.ok)throw 0;return r.json();})"
      + ".then(function(d){alert('Lot mahakim envoyé ('+rows.length+' lignes, lot '+d.id+').');})"
      + ".catch(function(){alert('Serveur injoignable : JSON téléchargé.');dl();});})();";
  }
  function bookmarkletDossierSource() {
    var parts = [
      "(function(){var E='http://127.0.0.1:8790/v1/imports/mahakim';",
      "function tok(){try{var t=localStorage.getItem('avocato_bm_token');if(t)return t;",
      "t=prompt('Token appareil AVOCATO (Ctrl+K > Sync / serveur local > Creer un appareil) :','');",
      "if(t){localStorage.setItem('avocato_bm_token',t.trim());return t.trim();}}catch(e){}return '';}",
      "function tx(el){return (el.innerText||el.textContent||'').replace(/\\s+/g,' ').trim();}",
      "function T(){return Array.from(document.querySelectorAll('table'));} ",
      "var MAP=[['رقم الملف بالمحكمة','role'],['الرقم الوطني','national'],['نوع الملف','typeDossier'],",
      "['الشعبة','chambre'],['القاضي المقرر','juge'],['المستشار','juge'],['تاريخ التسجيل','enregistrement'],",
      "['الموضوع','sujet'],['آخر حكم','dernierJugement'],['تاريخ آخر حكم','dateJugement'],['المحكمة','tribunal']];",
      "var card={};T().forEach(function(tb){Array.from(tb.querySelectorAll('tr')).forEach(function(tr){",
      "var cells=Array.from(tr.querySelectorAll('th,td')).map(tx);if(cells.length<2)return;",
      "MAP.forEach(function(kv){for(var i=0;i<cells.length-1;i++){",
      "if(cells[i].indexOf(kv[0])!==-1&&!card[kv[1]])card[kv[1]]=cells[i+1];}});});});",
      "var procedures=[];T().forEach(function(tb){",
      "var heads=Array.from(tb.querySelectorAll('thead th')).map(tx);",
      "if(!heads.length)heads=Array.from(tb.querySelectorAll('tr:first-child th')).map(tx);",
      "var H=heads.join('|');var isP=H.indexOf('تاريخ الإجراء')!==-1||H.indexOf('نوع الإجراء')!==-1;",
      "if(!isP)return;var rows=tb.querySelectorAll('tbody tr');if(!rows.length)rows=tb.querySelectorAll('tr');",
      "Array.from(rows).forEach(function(tr,i){",
      "if(!tb.querySelector('tbody')&&i===0&&tr.querySelector('th'))return;",
      "var c=Array.from(tr.querySelectorAll('td')).map(tx);if(!c.length)return;",
      "procedures.push({date:c[0]||'',type:c[1]||'',decision:c[2]||'',prochaine:c[3]||''});});});",
      "var parties=[];try{var h=document.evaluate(\"//*[contains(text(),'لائحة الأطراف')]\",document,null,4,null).singleNodeValue;",
      "if(h){var sec=h;for(var k=0;k<4&&sec;k++){sec=sec.parentElement;",
      "if(sec){var t2=sec.querySelector('table');if(t2){Array.from(t2.querySelectorAll('td')).map(tx).forEach(function(x){",
      "if(x&&x.length>2&&!/^[\\d\\/\\s:]+$/.test(x)&&parties.indexOf(x)===-1)parties.push(x);});break;}}}}catch(e){}",
      "if(!card.role){alert('Pas de carte dossier sur cette page : utilisez ce favori sur une fiche dossier, ou l\\'autre favori sur une page de resultats.');return;}",
      "var payload={card:card,procedures:procedures,parties:parties,stats:{url:location.href,at:new Date().toISOString()}};",
      "function dl(){var b=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});",
      "var a=document.createElement('a');a.href=URL.createObjectURL(b);",
      "a.download='mahakim-dossier-'+(card.role||'x').replace(/\\//g,'-')+'.json';a.click();}",
      "var t=tok();if(!t){alert('Sans token : JSON telecharge, a coller dans AVOCATO > Audiences > Importer (source dossier).');dl();return;}",
      "fetch(E,{method:'POST',headers:{'Content-Type':'application/json','x-avocato-token':t},body:JSON.stringify(payload)})",
      ".then(function(r){if(!r.ok)throw 0;return r.json();})",
      ".then(function(d){alert('Dossier envoye ('+procedures.length+' actes, lot '+d.id+'). Importez-le dans AVOCATO > Audiences > Importer.');})",
      ".catch(function(){alert('Serveur injoignable : JSON telecharge.');dl();});})();"
    ];
    return parts.join('');
  }

  /* ---------------- import dossier suivi (carte + procédures) ---------------- */
  var dossierPending = null;
  function nextFromProcedures(procedures) {
    var best = null;
    (procedures || []).forEach(function (p) {
      if (!p.prochaine) return;
      var k = p.prochaine + (p.prochaineHeure || '');
      if (!best || k > best.k) best = { k: k, date: p.prochaine, heure: p.prochaineHeure || '' };
    });
    return best;
  }
  function renderDossierPreview(res) {
    var host = $('#mkPreview');
    if (!host) return;
    var card = res.card || {};
    var procedures = res.procedures || [];
    var parties = res.parties || [];
    var m = matchDossier({ role: card.role, objet: card.sujet || '', adverse: parties.join(' ') });
    var next = nextFromProcedures(procedures);
    var cls = classify({ role: card.role, date: next ? next.date : null }, m.dossierId);
    var kind = cls.kind;
    if (kind === 'nouvelle' && !next && (card.dernierJugement || card.dateJugement)) kind = 'decide';
    dossierPending = { card: card, procedures: procedures, parties: parties, dossierId: m.dossierId, kind: kind, next: next };
    function cardRow(label, val, dir) {
      if (val == null || val === '') return '';
      return '<tr><td>' + esc(label) + '</td><td' + (dir ? ' dir="auto"' : '') + '>' + esc(val) + '</td></tr>';
    }
    host.innerHTML = '<p class="sub">Dossier mahakim — vérifiez le dossier proposé puis importez.</p>' +
      '<div class="dash-panel"><h3>' + esc(card.tribunal || 'Tribunal') + '</h3>' +
      '<div style="overflow-x:auto"><table class="cab-table" style="border:0"><tbody>' +
      cardRow('Rôle', card.role) +
      cardRow('N° national', card.national) +
      cardRow('Type', card.typeDossier, true) +
      cardRow('Chambre', card.chambre, true) +
      cardRow('Juge rapporteur', card.juge, true) +
      cardRow('Enregistrement', card.enregistrement) +
      cardRow('Dernier jugement', (card.dernierJugement || '') + (card.dateJugement ? ' du ' + card.dateJugement : ''), true) +
      cardRow('Procédures', procedures.length + ' acte(s), prochaine : ' + (next ? next.date + (next.heure ? ' ' + next.heure : '') : '—')) +
      cardRow('Parties', parties.slice(0, 4).join(' · '), true) +
      '</tbody></table></div>' +
      '<div class="cab-toolbar"><label style="align-self:center">Dossier <select id="mkDosSel">' + dossierOptions(m.dossierId) + '</select></label>' +
      '<span id="mkDosDiff">' + diffBadge(kind) + (m.how !== 'aucun' ? ' <span style="font-size:11px;color:var(--text-dim)">auto : ' + esc(m.how) + '</span>' : '') + '</span>' +
      '<button type="button" class="btn btn-primary" id="btnMkDosImport">Importer ce dossier</button></div></div>';
    $('#mkDosSel').addEventListener('change', function () {
      dossierPending.dossierId = $('#mkDosSel').value;
      var c2 = classify({ role: card.role, date: next ? next.date : null }, dossierPending.dossierId);
      var k2 = c2.kind;
      if (k2 === 'nouvelle' && !next && (card.dernierJugement || card.dateJugement)) k2 = 'decide';
      dossierPending.kind = k2;
      $('#mkDosDiff').innerHTML = diffBadge(k2);
    });
    $('#btnMkDosImport').addEventListener('click', function () {
      var r = importDossierLot(dossierPending);
      var d = $('#dlgMahakim');
      if (d) d.close();
      if (window.Cabinet) {
        if (window.Cabinet.getMode() !== 'cabinet') window.Cabinet.setMode('cabinet');
        window.Cabinet.goView('audiences');
      }
      void r;
    });
  }
  function snapshotSuivi(a) {
    if (!a) return null;
    return {
      chambre: a.chambre, juge: a.juge, numeroNational: a.numeroNational,
      typeDossier: a.typeDossier, dateEnregistrement: a.dateEnregistrement,
      dernierJugement: a.dernierJugement ? JSON.parse(JSON.stringify(a.dernierJugement)) : undefined,
      procedures: a.procedures ? JSON.parse(JSON.stringify(a.procedures)) : undefined
    };
  }
  function applySuivi(a, card, procedures, batchId) {
    a.chambre = card.chambre || '';
    a.juge = card.juge || '';
    a.numeroNational = card.national || '';
    a.typeDossier = card.typeDossier || '';
    a.dateEnregistrement = card.enregistrement || '';
    a.dernierJugement = (card.dernierJugement || card.dateJugement) ? { num: card.dernierJugement || '', date: card.dateJugement || '' } : null;
    a.procedures = (procedures || []).slice(0, 80);
    a.source = 'mahakim';
    a.importBatch = batchId;
    a.updatedAt = new Date().toISOString();
  }
  function importDossierLot(pending) {
    if (!pending || !pending.dossierId) { toast('Choisissez un dossier.', { kind: 'error' }); return null; }
    var card = pending.card, procedures = pending.procedures || [], next = pending.next;
    var batchId = 'lot-' + uid();
    var list = audiences();
    var created = [], updated = [];
    var sibs = list.filter(function (a) { return a.dossierId === pending.dossierId && card.role && a.role && normRole(a.role) === card.role; });
    var target = null;
    if (next) {
      target = sibs.find(function (a) { return a.date === next.date; }) || null;
      if (!target) {
        var ex = sibs.find(function (a) { return a.etat === 'À venir' || a.etat === 'Reportée'; });
        if (ex) {
          updated.push({ id: ex.id, prevDate: ex.date, prevEtat: ex.etat, prevSuivi: snapshotSuivi(ex) });
          if (ex.date !== next.date) journalReport(pending.dossierId, ex.date, next.date, card.role);
          ex.date = next.date; ex.heure = next.heure || ex.heure;
          target = ex;
        }
      }
      if (!target) {
        target = {
          id: uid(), dossierId: pending.dossierId, role: card.role || '',
          juridiction: card.juridiction || 'Autre', ville: card.ville || '',
          date: next.date, heure: next.heure || '', sens: '',
          adverse: (pending.parties || [])[0] || '', objet: card.sujet || ('Dossier ' + (card.role || '')),
          etat: 'À venir', source: 'mahakim', compteRendu: ''
        };
        target.createdAt = new Date().toISOString();
        list.push(target);
        created.push(target.id);
      }
    } else {
      target = sibs[0] || null;
      if (!target) {
        target = {
          id: uid(), dossierId: pending.dossierId, role: card.role || '',
          juridiction: card.juridiction || 'Autre', ville: card.ville || '',
          date: '', heure: '', sens: '', adverse: (pending.parties || [])[0] || '',
          objet: card.sujet || ('Dossier ' + (card.role || '')),
          etat: 'Jugement rendu', source: 'mahakim', compteRendu: ''
        };
        target.createdAt = new Date().toISOString();
        list.push(target);
        created.push(target.id);
      } else if (target.etat === 'À venir' || target.etat === 'Reportée') {
        updated.push({ id: target.id, prevDate: target.date, prevEtat: target.etat, prevSuivi: snapshotSuivi(target) });
        target.etat = 'Jugement rendu';
      }
    }
    applySuivi(target, card, procedures, batchId);
    sibs.forEach(function (a) {
      if (a.id === target.id) return;
      applySuivi(a, card, a.procedures && a.procedures.length ? a.procedures : procedures, batchId);
    });
    saveAuds(list);
    var lots = getLots();
    lots.push({ id: batchId, at: new Date().toISOString(), source: 'mahakim-dossier', created: created, updated: updated, skipped: 0 });
    saveLots(lots);
    toast('Dossier ' + (card.role || '') + ' importé (' + procedures.length + ' actes).', {
      undo: function () { undoLot(batchId); }
    });
    return { batchId: batchId, created: created, updated: updated };
  }
  function findThread(audience) {
    if (!audience) return null;
    var list = audiences();
    var sibs = list.filter(function (a) {
      return a.dossierId === audience.dossierId && audience.role && a.role && normRole(a.role) === normRole(audience.role);
    });
    var withProc = sibs.find(function (a) { return a.procedures && a.procedures.length; });
    return withProc || audience;
  }
  function openSuivi(audienceId) {
    var a = audiences().find(function (x) { return x.id === audienceId; });
    if (!a) return;
    var t = findThread(a);
    var d = dossierOf(a.dossierId);
    var procs = t.procedures || [];
    var content = $('#content');
    if (!content) return;
    function row(label, val, dir) {
      if (val == null || val === '') return '';
      return '<tr><td>' + esc(label) + '</td><td' + (dir ? ' dir="auto"' : '') + ' style="white-space:normal">' + esc(val) + '</td></tr>';
    }
    var dj = t.dernierJugement || {};
    content.innerHTML = '<div class="cab"><button class="btn" id="suiviBack">← Audiences</button>' +
      '<div class="doc" style="max-width:860px;margin:16px auto"><div style="padding:0 36px 36px">' +
      '<h2 style="text-align:center;margin:0">Suivi mahakim — ' + esc(t.role || '') + '</h2>' +
      '<p style="text-align:center;font-size:12px;color:var(--text-dim)">' + esc(t.juridiction || '') + (t.ville ? ' — ' + esc(t.ville) : '') + (d ? ' · ' + esc(d.client) : '') + '</p>' +
      '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:13px;margin:12px 0" border="1" cellpadding="8"><tbody>' +
      row('N° national', t.numeroNational) +
      row('Type', t.typeDossier, true) +
      row('Chambre', t.chambre, true) +
      row('Juge rapporteur', t.juge, true) +
      row('Enregistrement', t.dateEnregistrement) +
      row('Dernier jugement', (dj.num || '') + (dj.date ? ' du ' + dj.date : ''), true) +
      '</tbody></table></div>' +
      '<h3 style="font:700 12px var(--font-body);letter-spacing:.08em;text-transform:uppercase;color:var(--caption)">Historique des procédures (' + procs.length + ')</h3>' +
      (procs.length ? '<div class="cab-table-wrap"><table class="cab-table"><thead><tr><th>Date</th><th>Type</th><th>Décision</th><th>Prochaine</th></tr></thead><tbody>' +
        procs.map(function (p) {
          return '<tr><td class="mono">' + esc(p.date || '') + (p.heure ? '<br>' + esc(p.heure) : '') + '</td>' +
            '<td dir="auto" style="white-space:normal">' + esc(p.typeAr || '') + (p.typeFr ? '<br><span style="font-size:11px;color:var(--text-dim)">' + esc(p.typeFr) + '</span>' : '') + '</td>' +
            '<td dir="auto" style="white-space:normal;max-width:260px">' + esc(p.decision || '—') + '</td>' +
            '<td class="mono">' + esc(p.prochaine || '—') + (p.prochaineHeure ? '<br>' + esc(p.prochaineHeure) : '') + '</td></tr>';
        }).join('') + '</tbody></table></div>' : '<p class="today-clear">Aucun acte importé.</p>') +
      '</div></div><div class="cab-toolbar" style="justify-content:center"><button class="btn btn-primary" id="suiviPrint">Imprimer / PDF</button></div></div>';
    $('#crumbs').innerHTML = '<span class="cur">Cabinet — Suivi ' + esc(t.role || '') + '</span>';
    $('#suiviBack').addEventListener('click', function () { if (window.Cour) window.Cour.renderList(); });
    $('#suiviPrint').addEventListener('click', function () { window.print(); });
  }

  /* ---------------- bouton dans la vue Audiences ---------------- */
  function injectImportBtn() {
    try {
      if (LS.get('cabinetView', '') !== 'audiences') return;
      var content = $('#content');
      if (!content || content.querySelector('[data-mk-open]')) return;
      var btn = content.querySelector('#btnNewAud');
      if (!btn || !btn.parentNode) return;
      var b = document.createElement('button');
      b.className = 'btn';
      b.type = 'button';
      b.textContent = 'Importer mahakim';
      b.setAttribute('data-mk-open', '1');
      b.addEventListener('click', openImport);
      btn.parentNode.insertBefore(b, btn.nextSibling);
    } catch (e) {}
  }
  var observerDone = false;
  function initObserver() {
    if (observerDone) return;
    observerDone = true;
    try {
      var obs = new MutationObserver(function () { try { injectImportBtn(); } catch (e) {} });
      obs.observe(document.documentElement, { childList: true, subtree: true });
    } catch (e) {}
  }
  function init() { initObserver(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  setTimeout(init, 2000);

  window.Mahakim = {
    JURIS: JURIS,
    parseRole: parseRole, normRole: normRole,
    parseDateFR: parseDateFR, parseHeure: parseHeure,
    parseJuridiction: parseJuridiction, parseVille: parseVille,
    parseTSV: parseTSV, parseJSON: parseJSON,
    isSimilar: isSimilar, matchDossier: matchDossier, classify: classify,
    confirmImport: confirmImport, undoLot: undoLot, getLots: getLots,
    openImport: openImport, bookmarkletSource: bookmarkletSource, bookmarkletDossierSource: bookmarkletDossierSource,
    parseDossierJSON: parseDossierJSON, parseJuridictionAR: parseJuridictionAR,
    parseDateHeureAR: parseDateHeureAR, glossProcedure: glossProcedure,
    importDossierLot: importDossierLot, openSuivi: openSuivi, findThread: findThread
  };
  window.MahakimAdapter = { register: registerAdapter, list: listAdapters, get: function (n) { return adapterReg[n] || null; } };
})();
