/* AVOCATO Sync (Phase B) — local-first replication layer.
   localStorage remains the single write path of the app; this module only OBSERVES
   it (diff-polling), queues changes, pushes/pulls to the local server when enabled.
   Disabled by default: with cfg.enabled false, this file changes nothing in the app.
   See SUIVI_AUDIENCES_PLAN.md sections 1-2-3 Phase B. */
(function () {
  'use strict';

  var HASHKEY = 'syncHashes', QUEUEKEY = 'syncQueue', CONFLKEY = 'syncConflicts';
  var CAP = 5000;

  var LS = window.AvocatoStore.LS;

  var cfg = LS.get('sync', null) || { enabled: false, server: 'http://127.0.0.1:8790', token: null, deviceId: null, lastSync: null };
  var hashes = LS.get(HASHKEY, {});
  var queue = LS.get(QUEUEKEY, []);
  var conflicts = LS.get(CONFLKEY, []);
  var busy = false, offline = false, chip = null;

  function saveCfg() { LS.set('sync', cfg); }
  function saveQueue() { if (queue.length > CAP) queue = queue.slice(queue.length - CAP); LS.set(QUEUEKEY, queue); }
  function saveHashes() { LS.set(HASHKEY, hashes); }

  /* -------- scope registry: enumerate current records {id, payload, at} -------- */
  function arrayScope(name, key, atFn) {
    return {
      name: name,
      list: function () { return (LS.get(key, []) || []).map(function (x) { return { id: x && x.id, payload: x, at: (atFn && x && atFn(x)) || null }; }).filter(function (r) { return r.id; }); },
      apply: function (row) {
        var arr = LS.get(key, []) || [];
        var i = arr.findIndex(function (x) { return x && x.id === row.id; });
        if (row.deleted) { if (i >= 0) { arr.splice(i, 1); LS.set(key, arr); } return true; }
        if (i >= 0) arr[i] = row.payload; else arr.push(row.payload);
        LS.set(key, arr);
        return true;
      }
    };
  }
  function kvScope(name, key, singleId) {
    return {
      name: name,
      list: function () {
        var v = LS.get(key, null);
        return v == null ? [] : [{ id: singleId || '__all__', payload: v, at: null }];
      },
      apply: function (row) {
        if (row.deleted) { LS.del(key); return true; }
        LS.set(key, row.payload);
        return true;
      }
    };
  }
  function mapScope(name, key) { /* object map -> one record per key */
    return {
      name: name,
      list: function () {
        var m = LS.get(key, {}) || {};
        return Object.keys(m).map(function (k) { return { id: k, payload: m[k], at: null }; });
      },
      apply: function (row) {
        var m = LS.get(key, {}) || {};
        if (row.deleted) { if (!(row.id in m)) return false; delete m[row.id]; LS.set(key, m); return true; }
        m[row.id] = row.payload; LS.set(key, m);
        return true;
      }
    };
  }
  function settingsScope(name, keys) { /* several LS keys, one record each */
    return {
      name: name,
      list: function () {
        return keys.filter(function (k) { return localStorage.getItem('avocato:' + k) != null; })
          .map(function (k) { return { id: k, payload: LS.get(k, null), at: null }; });
      },
      apply: function (row) {
        if (row.deleted) { LS.del(row.id); return true; }
        LS.set(row.id, row.payload);
        return true;
      }
    };
  }
  function seqScope() { /* avocato:numSeq:* counters */
    var prefix = 'avocato:numSeq:';
    return {
      name: 'seq',
      list: function () {
        var out = [];
        for (var i = 0; i < localStorage.length; i++) {
          var k = localStorage.key(i);
          if (k && k.indexOf(prefix) === 0) {
            var id = k.slice('avocato:'.length);
            out.push({ id: id, payload: LS.get(id, null), at: null });
          }
        }
        return out;
      },
      apply: function (row) {
        if (row.deleted) { LS.del(row.id); return true; }
        LS.set(row.id, row.payload);
        return true;
      }
    };
  }

  var SCOPES = [
    arrayScope('dossiers', 'dossiers', function (x) { return x.updatedAt || x.createdAt; }),
    arrayScope('conventions', 'conventions', function (x) { return x.date; }),
    arrayScope('factures', 'factures', function (x) { return x.date; }),
    arrayScope('echeances', 'echeances', function (x) { return x.date; }),
    arrayScope('frais', 'frais', function (x) { return x.createdAt || x.date; }),
    arrayScope('veille', 'veille', function (x) { return x.createdAt || x.date; }),
    arrayScope('registres', 'registres', function (x) { return x.createdAt || x.exig; }),
    arrayScope('dividendes', 'dividendes', function (x) { return x.agDate || x.createdAt; }),
    arrayScope('sejours', 'sejours', function (x) { return x.expiry || x.createdAt; }),
    arrayScope('transitions', 'transitions', function (x) { return x.at; }),
    arrayScope('clients', 'clients', function (x) { return x.updatedAt; }),
    arrayScope('audiences', 'audiences', function (x) { return x.updatedAt || x.date; }),
    arrayScope('jugements', 'jugements', function (x) { return x.updatedAt || x.date; }),
    arrayScope('letters', 'letters', function (x) { return x.createdAt; }),
    mapScope('dossierChecks', 'dossierChecks'),
    kvScope('conflictList', 'conflictList', '__list__'),
    settingsScope('settings', ['plaque', 'objectifCA', 'dailyOS']),
    settingsScope('vault', ['read', 'checks', 'folders', 'last']),
    seqScope()
  ];

  /* ---------------- scan: diff localStorage vs hashes -> queue ---------------- */
  function scan() {
    var now = new Date().toISOString();
    var seen = {};
    SCOPES.forEach(function (sc) {
      var recs = sc.list();
      recs.forEach(function (r) {
        var key = sc.name + '|' + r.id;
        seen[key] = 1;
        var h = JSON.stringify(r.payload);
        var prev = hashes[key];
        if (!prev || prev.h !== h || prev.dirty) {
          queue.push({ scope: sc.name, id: r.id, op: 'upsert', payload: r.payload, at: (prev && prev.dirty && !r.at) ? now : (r.at || now) });
          hashes[key] = { h: h, at: r.at || now, dirty: false };
        }
      });
    });
    Object.keys(hashes).forEach(function (key) {
      if (seen[key]) return;
      var p = key.split('|');
      queue.push({ scope: p[0], id: p[1], op: 'del', payload: null, at: now });
      delete hashes[key];
    });
    saveQueue(); saveHashes();
    render();
  }

  /* ---------------- push ---------------- */
  function api(path, method, body) {
    var headers = { 'Content-Type': 'application/json' };
    if (cfg.token) headers['x-avocato-token'] = cfg.token;
    return fetch(cfg.server + path, { method: method, headers: headers, body: body ? JSON.stringify(body) : undefined })
      .then(function (r) {
        if (!r.ok) throw new Error('http ' + r.status);
        return r.json();
      });
  }
  function flush() {
    if (!cfg.enabled || !cfg.token || !queue.length || busy) return Promise.resolve();
    busy = true;
    var batch = queue.slice(0, 200);
    return api('/v1/sync/push', 'POST', { changes: batch })
      .then(function (res) {
        offline = false;
        queue = queue.slice(batch.length);
        if (res.conflicts && res.conflicts.length) {
          res.conflicts.forEach(function (c) {
            var key = c.scope + '|' + c.id;
            if (hashes[key]) { hashes[key].dirty = true; }
            conflicts.unshift({ scope: c.scope, id: c.id, serverAt: c.serverAt, at: new Date().toISOString() });
          });
          if (conflicts.length > 50) conflicts = conflicts.slice(0, 50);
          LS.set(CONFLKEY, conflicts);
        }
        cfg.lastSync = new Date().toISOString();
        saveCfg(); saveQueue(); saveHashes();
      })
      .catch(function () { offline = true; })
      .then(function () { busy = false; render(); });
  }

  /* ---------------- pull ---------------- */
  function pull() {
    if (!cfg.enabled || !cfg.token || busy) return Promise.resolve();
    busy = true;
    return api('/v1/sync/snapshot', 'GET')
      .then(function (res) {
        offline = false;
        var applied = 0;
        (res.rows || []).forEach(function (row) {
          var key = row.scope + '|' + row.id;
          var loc = hashes[key];
          var remoteNewer = !loc || (loc.at && row.at && String(row.at) > String(loc.at));
          if (loc && loc.dirty) {
            /* sale local + serveur plus recent : conflit a trancher, jamais d'ecrasement silencieux */
            if (remoteNewer && !conflicts.some(function (c) { return c.scope === row.scope && String(c.id) === String(row.id); })) {
              conflicts.unshift({ scope: row.scope, id: row.id, serverAt: row.at, at: new Date().toISOString(), local: true });
              if (conflicts.length > 50) conflicts = conflicts.slice(0, 50);
              LS.set(CONFLKEY, conflicts);
            }
            return;
          }
          if (!remoteNewer) return;
          var sc = SCOPES.find(function (s) { return s.name === row.scope; });
          if (!sc) return;
          if (sc.apply(row)) {
            hashes[key] = { h: JSON.stringify(row.deleted ? null : row.payload), at: row.at, dirty: false };
            queue = queue.filter(function (q) { return !(q.scope === row.scope && q.id === row.id); });
            applied++;
          }
        });
        cfg.lastSync = new Date().toISOString();
        saveCfg(); saveHashes(); saveQueue();
        if (applied && window.Cabinet && window.Cabinet.toast) {
          window.Cabinet.toast('Sync : ' + applied + ' enregistrement(s) tir(s) du serveur.');
          if (window.Cabinet.renderCabinet) window.Cabinet.renderCabinet();
        }
      })
      .catch(function () { offline = true; })
      .then(function () { busy = false; render(); });
  }

  function pushAllNow() {
    hashes = {}; saveHashes();
    queue = []; saveQueue();
    scan();
    return flush().then(pull);
  }

  /* ---------------- conflits : choix explicite (jamais d'ecrasement silencieux) ---------------- */
  function ntoast(m, o) { if (window.Cabinet && window.Cabinet.toast) window.Cabinet.toast(m, o); }
  function findConflict(scope, id) {
    for (var i = 0; i < conflicts.length; i++) {
      if (conflicts[i].scope === scope && String(conflicts[i].id) === String(id)) return i;
    }
    return -1;
  }
  function dropConflict(scope, id) {
    var i = findConflict(scope, id);
    if (i >= 0) { conflicts.splice(i, 1); LS.set(CONFLKEY, conflicts); }
  }
  function scopeByName(scope) {
    for (var i = 0; i < SCOPES.length; i++) { if (SCOPES[i].name === scope) return SCOPES[i]; }
    return null;
  }
  function resolveConflict(scope, id, keep) {
    var now = new Date().toISOString();
    var key = scope + '|' + id;
    if (keep === 'server') {
      return api('/v1/entities?scope=' + encodeURIComponent(scope), 'GET').then(function (res) {
        var row = null;
        (res.rows || []).forEach(function (r) { if (String(r.id) === String(id)) row = r; });
        if (!row) { dropConflict(scope, id); render(); openDialog(); return; }
        var sc = scopeByName(scope);
        if (sc && sc.apply({ scope: scope, id: id, payload: row.payload, deleted: !!row.deleted, at: row.at })) {
          hashes[key] = { h: JSON.stringify(row.deleted ? null : row.payload), at: row.at, dirty: false };
          queue = queue.filter(function (q) { return !(q.scope === scope && String(q.id) === String(id)); });
          dropConflict(scope, id);
          saveHashes(); saveQueue();
          ntoast('Version serveur reprise pour ' + scope + '/' + String(id).slice(0, 8) + '.');
          if (window.Cabinet && window.Cabinet.renderCabinet) window.Cabinet.renderCabinet();
        }
        render(); openDialog();
      }).catch(function () { ntoast('Serveur injoignable.', { kind: 'error' }); });
    }
    var sc2 = scopeByName(scope);
    if (!sc2) return Promise.resolve();
    var rec = null;
    sc2.list().forEach(function (r) { if (String(r.id) === String(id)) rec = r; });
    var op = rec ? 'upsert' : 'del';
    return api('/v1/sync/push', 'POST', { changes: [{ scope: scope, id: id, op: op, payload: rec ? rec.payload : null, at: now }] })
      .then(function (res) {
        if (res.conflicts && res.conflicts.length) { ntoast('Toujours en conflit : le serveur a encore plus récent.', { kind: 'error' }); render(); openDialog(); return; }
        hashes[key] = { h: JSON.stringify(op === 'del' ? null : (rec ? rec.payload : null)), at: now, dirty: false };
        queue = queue.filter(function (q) { return !(q.scope === scope && String(q.id) === String(id)); });
        dropConflict(scope, id);
        saveHashes(); saveQueue();
        ntoast('Ta version a gagné (' + scope + '/' + String(id).slice(0, 8) + ').');
        render(); openDialog();
      })
      .catch(function () { ntoast('Serveur injoignable.', { kind: 'error' }); });
  }

  /* ---------------- UI : pastille + dialog ---------------- */
  function render() {
    if (!cfg.enabled) { if (chip) chip.hidden = true; return; }
    ensureChip();
    if (!chip) return;
    var n = queue.length;
    chip.innerHTML = (offline ? window.ico('cloud') + ' hors-ligne' : (n ? window.ico('cloud') + ' ' + n + ' en attente' : window.ico('cloud') + ' à jour'));
    chip.title = offline ? 'Serveur injoignable (' + cfg.server + ') — les modifications restent en file' : 'Synchronisation locale AVOCATO — cliquer pour régler';
  }
  function ensureChip() {
    if (chip) { chip.hidden = false; return; }
    chip = document.createElement('button');
    chip.id = 'syncChip';
    chip.setAttribute('type', 'button');
    chip.style.cssText = 'position:fixed;bottom:14px;left:14px;z-index:70;background:var(--surface);color:var(--text);border:1px solid var(--line);border-radius:999px;padding:6px 12px;font:600 12px var(--font-body);cursor:pointer;box-shadow:0 2px 10px rgba(7,14,28,.14)';
    chip.addEventListener('click', openDialog);
    document.body.appendChild(chip);
  }
  function openDialog() {
    var dlg = document.getElementById('dlgSync');
    if (!dlg) {
      dlg = document.createElement('dialog');
      dlg.id = 'dlgSync';
      dlg.setAttribute('aria-labelledby', 'syncTitle');
      dlg.innerHTML =
        '<form method="dialog" id="formSync" style="min-width:min(560px,92vw)">' +
        '<h3 id="syncTitle" style="margin:0 0 4px">' + window.ico('cloud') + ' Synchronisation locale</h3>' +
        '<p class="field-help" style="margin:0 0 12px">Mode local-first : localStorage reste la source ; le miroir SQLite du serveur sert de backup et de fusion multi-appareils. Désactivé = comportement identique à avant. <strong>Pour synchroniser, ouvrez l’app via http://127.0.0.1:8790/app/</strong> (l’API n’accepte plus l’origine file://).</p>' +
        '<div class="form-grid">' +
        '<label class="span-2">Serveur<input name="server" placeholder="http://127.0.0.1:8790"></label>' +
        '<label class="span-2">Code d\u2019appairage<input name="pair" autocomplete="off" placeholder="affiché au démarrage de node server/index.js"></label>' +
        '<label class="chk span-2"><input type="checkbox" name="enabled"> Activer la sync sur cet appareil</label>' +
        '</div>' +
        '<p class="mono" id="syncState" style="font-size:11.5px;color:var(--text-dim,#6b6a63);margin:6px 18px 0"></p>' +
        '<div id="syncConflicts" style="margin:8px 18px;font-size:12px"></div>' +
        '<div class="dlg-actions" style="flex-wrap:wrap">' +
        '<button type="button" class="btn" id="btnSyncDevice">Créer un appareil (token)</button>' +
        '<button type="button" class="btn" id="btnSyncPush">Pousser tout</button>' +
        '<button type="button" class="btn" id="btnSyncPull">Tirer</button>' +
        '<button type="button" class="btn" id="btnSyncClear">Vider la file</button>' +
        '<button type="submit" class="btn btn-primary">Fermer</button>' +
        '</div></form>';
      document.body.appendChild(dlg);
      dlg.addEventListener('close', function () { stopPoll(); startPoll(); });
    }
    var f = dlg.form ? dlg.form : dlg.querySelector('form');
    f.server.value = cfg.server;
    f.enabled.checked = !!cfg.enabled;
    var st = document.getElementById('syncState');
    st.textContent = 'appareil: ' + (cfg.deviceId ? cfg.deviceId.slice(0, 8) : 'aucun — créer ci-dessous') +
      ' · dernière sync: ' + (cfg.lastSync || 'jamais') + ' · file: ' + queue.length;
    var cf = document.getElementById('syncConflicts');
    cf.innerHTML = conflicts.length
          ? '<strong style="color:var(--warn)">' + conflicts.length + ' conflit(s) — tranche :</strong>' +
        conflicts.slice(0, 8).map(function (c) {
          return '<div class="today-action"><span class="ta-body"><span class="mono">' + escTxt(c.scope + '/' + String(c.id).slice(0, 12)) + '</span>' +
            '<br><span style="font-size:11px;color:var(--text-dim)">serveur : ' + escTxt(String(c.serverAt || '?').slice(0, 19)).replace('T', ' ') + '</span></span>' +
            '<button type="button" class="btn btn-sm" data-res-mine="' + escTxt(c.scope + '|' + c.id) + '">Mien</button>' +
            '<button type="button" class="btn btn-sm" data-res-srv="' + escTxt(c.scope + '|' + c.id) + '">Serveur</button></div>';
        }).join('')
      : '<span style="color:var(--text-dim)">Aucun conflit — les deux côtés sont d’accord.</span>';
    if (!dlg.open) dlg.showModal();
  }
  function escTxt(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  document.addEventListener('click', function (e) {
    if (e.target && e.target.getAttribute) {
      var rm = e.target.getAttribute('data-res-mine') || e.target.getAttribute('data-res-srv');
      if (rm) {
        var keep = e.target.getAttribute('data-res-mine') ? 'mine' : 'server';
        var sep = rm.indexOf('|');
        resolveConflict(rm.slice(0, sep), rm.slice(sep + 1), keep);
        return;
      }
    }
    if (!e.target || !e.target.id) return;
    var dlg = document.getElementById('dlgSync');
    if (!dlg) return;
    if (e.target.id === 'btnSyncDevice') {
      var f = dlg.querySelector('form'); cfg.server = f.server.value.trim() || cfg.server; saveCfg();
      fetch(cfg.server + '/v1/devices', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ label: navigator.platform || 'device', pair: (f.pair && f.pair.value.trim()) || '' }) })
        .then(function (r) {
          return r.json().catch(function () { return {}; }).then(function (d) { return { ok: r.ok, d: d }; });
        })
        .then(function (x) {
          if (!x.ok || !x.d.token) {
            if (window.Cabinet) window.Cabinet.toast(x.d && x.d.error ? 'Appareil refusé — ' + x.d.error : 'Appareil refusé (' + (x.d && x.d.error) + ') — vérifier le code d\u2019appairage', { kind: 'error' });
            return;
          }
          cfg.token = x.d.token; cfg.deviceId = x.d.id; cfg.enabled = true; saveCfg();
          var g = dlg.querySelector('[name=enabled]'); if (g) g.checked = true;
          pushAllNow().then(function () { openDialog(); if (window.Cabinet) window.Cabinet.toast('Appareil synchronis\xe9 \u2014 token enregistr\xe9.'); });
        })
        .catch(function () { if (window.Cabinet) window.Cabinet.toast('Serveur injoignable \u2014 lancer: node server/index.js', { kind: 'error' }); });
    }
    if (e.target.id === 'btnSyncPush') { saveFromForm(dlg); pushAllNow().then(openDialog); }
    if (e.target.id === 'btnSyncPull') { saveFromForm(dlg); pull().then(openDialog); }
    if (e.target.id === 'btnSyncClear') { queue = []; conflicts = []; LS.set(CONFLKEY, conflicts); saveQueue(); openDialog(); }
  });
  function saveFromForm(dlg) {
    var f = dlg.querySelector('form');
    cfg.server = f.server.value.trim() || cfg.server;
    var was = cfg.enabled;
    cfg.enabled = !!f.enabled.checked;
    saveCfg();
    if (cfg.enabled && !was) pushAllNow();
  }

  /* ---------------- polling ---------------- */
  var timer = null, pullTimer = null;
  function startPoll() {
    stopPoll();
    timer = setInterval(function () {
      if (!cfg.enabled) return;
      scan();
      flush();
    }, 4000);
    pullTimer = setInterval(function () { if (cfg.enabled) pull(); }, 12000);
  }
  function stopPoll() { if (timer) clearInterval(timer); if (pullTimer) clearInterval(pullTimer); }

  document.addEventListener('visibilitychange', function () { if (!document.hidden && cfg.enabled) { scan(); flush(); pull(); } });
  window.addEventListener('beforeunload', function () {
    if (!cfg.enabled || !queue.length) return;
    try {
      /* keepalive fetch (not sendBeacon): the token stays in the header, never the body. */
      fetch(cfg.server + '/v1/sync/push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-avocato-token': cfg.token },
        body: JSON.stringify({ changes: queue.slice(0, 200) }),
        keepalive: true
      }).catch(function () {});
    } catch (e) { console.warn('avocato', e); }
  });

  render(); startPoll();
  if (cfg.enabled && cfg.token) { try { scan(); flush().then(pull); } catch (e) { console.warn('avocato', e); } }
  window.Sync = {
    config: function () { return Object.assign({}, cfg, { token: cfg.token ? cfg.token.slice(0, 6) + '…' : null }); },
    status: function () { return { enabled: !!cfg.enabled, offline: offline, queued: queue.length, conflicts: conflicts.length }; },
    now: function () { scan(); return flush().then(pull); },
    open: openDialog,
    resolve: resolveConflict,
    poll: function (on) { if (on === false) stopPoll(); else startPoll(); }
  };
})();
