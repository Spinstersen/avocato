/* AVOCATO Cabinet -- local API server (Phase A)
   Zero-dependency: node:http + node:sqlite (Node >= 22.5; tested on 24).
   Local-first mirror of the browser localStorage. See SUIVI_AUDIENCES_PLAN.md.
   ASCII-only source (encoding-incident policy). Run: node server/index.js
   Env: AVOCATO_PORT (default 8790), AVOCATO_HOST (default 127.0.0.1)
*/
'use strict';

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { DatabaseSync } = require('node:sqlite');

const PORT = Number(process.env.AVOCATO_PORT || 8790);
const HOST = process.env.AVOCATO_HOST || '127.0.0.1';
const ROOT = path.resolve(__dirname);
const DATA_DIR = process.env.AVOCATO_DATA ? path.resolve(process.env.AVOCATO_DATA) : path.join(ROOT, 'data');
const MIGRATIONS_DIR = path.join(ROOT, 'migrations');
const WEBAPP_DIR = path.resolve(ROOT, '..', 'webapp');
const MAX_BODY = 16 * 1024 * 1024;
const MAX_FUTURE_SKEW_MS = 5 * 60 * 1000;

fs.mkdirSync(DATA_DIR, { recursive: true });
const db = new DatabaseSync(path.join(DATA_DIR, 'avocato.db'));
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA busy_timeout = 3000;');

/* pairing code: required to register a device (POST /v1/devices).
   Shown at startup, persisted, overridable via AVOCATO_PAIR.
   Rationale: server binds 127.0.0.1 by default but any local process (and,
   with AVOCATO_HOST=0.0.0.0, any host on the LAN) could otherwise register
   a device and read the whole client dataset.
   Entropy: 8 bytes (64 bits) hex. Old short codes are regenerated. */
const PAIR_FILE = path.join(DATA_DIR, 'pairing.txt');
let PAIR = process.env.AVOCATO_PAIR ? String(process.env.AVOCATO_PAIR).trim().toUpperCase() : null;
if (!PAIR) {
  try { PAIR = fs.readFileSync(PAIR_FILE, 'utf8').trim().toUpperCase(); } catch (e) {}
  if (!/^[A-Z0-9]{8,32}$/.test(PAIR || '')) {
    PAIR = crypto.randomBytes(8).toString('hex').toUpperCase();
    fs.writeFileSync(PAIR_FILE, PAIR + '\n');
  }
}
function safeEqual(a, b) {
  const ab = Buffer.from(String(a == null ? '' : a), 'utf8');
  const bb = Buffer.from(String(b == null ? '' : b), 'utf8');
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}
function checkPair(given) { return safeEqual(String(given || '').trim().toUpperCase(), PAIR); }

/* failed pairing attempts per IP: lockout after PAIR_MAX failures. */
const PAIR_MAX = 10, PAIR_WINDOW_MS = 15 * 60 * 1000, PAIR_LOCK_MS = 15 * 60 * 1000;
const pairAttempts = new Map();
function pairLockRemaining(ip) {
  const rec = pairAttempts.get(ip);
  const now = Date.now();
  if (rec && rec.blockedUntil > now) return rec.blockedUntil - now;
  return 0;
}
function pairFail(ip) {
  const now = Date.now();
  let rec = pairAttempts.get(ip);
  if (!rec || now > rec.resetAt) rec = { count: 0, resetAt: now + PAIR_WINDOW_MS, blockedUntil: 0 };
  rec.count++;
  if (rec.count >= PAIR_MAX) rec.blockedUntil = now + PAIR_LOCK_MS;
  pairAttempts.set(ip, rec);
}

/* CORS: only the app served from this exact origin. `null` (file://) is
   intentionally NOT allowed: open the app via http://127.0.0.1:PORT/app/ for sync. */
const ALLOWED_ORIGINS = new Set(['http://127.0.0.1:' + PORT, 'http://localhost:' + PORT, 'https://127.0.0.1:' + PORT, 'https://localhost:' + PORT]);
function corsHeaders(req) {
  const h = { 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, x-avocato-token' };
  const o = req && req.headers && req.headers.origin;
  if (o && ALLOWED_ORIGINS.has(o)) { h['Access-Control-Allow-Origin'] = o; h['Vary'] = 'Origin'; }
  return h;
}

/* DNS-rebinding defense: when bound to loopback, only accept loopback Host values. */
const ENFORCE_HOST = HOST === '127.0.0.1' || HOST === 'localhost';
const ALLOWED_HOSTS = new Set(['127.0.0.1:' + PORT, 'localhost:' + PORT, '[::1]:' + PORT, '127.0.0.1', 'localhost', '[::1]']);
function validHost(req) {
  if (!ENFORCE_HOST) return true;
  const h = String((req.headers && req.headers.host) || '').toLowerCase();
  return ALLOWED_HOSTS.has(h);
}

/* ---------------- migrations ---------------- */
function migrate() {
  db.exec('CREATE TABLE IF NOT EXISTS schema_version (version INTEGER PRIMARY KEY, applied_at TEXT NOT NULL);');
  const done = new Set(db.prepare('SELECT version FROM schema_version').all().map(r => r.version));
  const files = fs.readdirSync(MIGRATIONS_DIR).filter(f => /^\d+.*\.sql$/.test(f)).sort();
  for (const f of files) {
    const v = parseInt(f, 10);
    if (done.has(v)) continue;
    db.exec('BEGIN');
    try {
      db.exec(fs.readFileSync(path.join(MIGRATIONS_DIR, f), 'utf8'));
      db.prepare('INSERT INTO schema_version(version, applied_at) VALUES(?, ?)').run(v, new Date().toISOString());
      db.exec('COMMIT');
    } catch (e) {
      db.exec('ROLLBACK');
      throw e;
    }
    log('migration applied:', f);
  }
}
migrate();

/* ---------------- helpers ---------------- */
function log(...a) {
  const line = new Date().toISOString() + ' ' + a.join(' ');
  console.log(line);
  try { fs.appendFileSync(path.join(DATA_DIR, 'server.log'), line + '\n'); } catch (e) {}
}
function sha256(s) { return crypto.createHash('sha256').update(s).digest('hex'); }
function uid() { return Date.now().toString(36) + crypto.randomBytes(4).toString('hex'); }
function json(res, code, obj) {
  const body = JSON.stringify(obj);
  const h = corsHeaders(res.req);
  h['Content-Type'] = 'application/json; charset=utf-8';
  h['Content-Length'] = Buffer.byteLength(body);
  res.writeHead(code, h);
  res.end(body);
}
function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0; const chunks = [];
    let failed = false;
    req.on('data', c => {
      if (failed) return;
      size += c.length;
      if (size > MAX_BODY) {
        failed = true;
        const err = new Error('body too large');
        err.status = 413;
        reject(err);
        req.removeAllListeners('data');
        return;
      }
      chunks.push(c);
    });
    req.on('end', () => {
      if (failed) return;
      if (!chunks.length) return resolve({});
      try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8'))); }
      catch (e) { reject(new Error('invalid JSON')); }
    });
    req.on('error', reject);
  });
}
function authByToken(tok) {
  if (!tok) return null;
  const row = db.prepare('SELECT id, label FROM devices WHERE token_hash = ?').get(sha256(tok));
  if (row) db.prepare('UPDATE devices SET last_seen = ? WHERE id = ?').run(new Date().toISOString(), row.id);
  return row || null;
}
function auth(req) {
  return authByToken(req.headers['x-avocato-token']);
}
function parsePayload(s, where) {
  if (s == null) return null;
  try { return JSON.parse(s); }
  catch (e) { log('corrupt payload skipped (' + where + '):', e.message); return null; }
}
function normalizeAt(at) {
  const t = at ? Date.parse(at) : NaN;
  if (!Number.isFinite(t)) return new Date().toISOString();
  return new Date(Math.min(t, Date.now() + MAX_FUTURE_SKEW_MS)).toISOString();
}
function entityPut(scope, id, payload, at, device, deleted) {
  const ex = db.prepare('SELECT at, deleted FROM entities WHERE scope = ? AND id = ?').get(scope, id);
  const newAt = normalizeAt(at);
  const exT = ex ? Date.parse(ex.at) : NaN;
  const newT = Date.parse(newAt);
  if (ex && Number.isFinite(exT) && exT > newT) return { applied: false, serverAt: ex.at };
  db.prepare(`INSERT INTO entities(scope,id,payload,at,device,deleted) VALUES(?,?,?,?,?,?)
              ON CONFLICT(scope,id) DO UPDATE SET payload=excluded.payload, at=excluded.at,
              device=excluded.device, deleted=excluded.deleted`)
    .run(scope, id, payload == null ? null : JSON.stringify(payload), newAt, device || null, deleted ? 1 : 0);
  return { applied: true, at: newAt };
}

/* scopes of arrays in the JSON v2 backup, with the LWW "at" source per record */
const ARRAY_SCOPES = {
  dossiers: d => d.updatedAt || d.createdAt,
  conventions: d => d.date,
  factures: d => d.date,
  echeances: d => d.date,
  frais: d => d.date || d.createdAt,
  veille: d => d.date || d.createdAt,
  registres: d => d.createdAt || d.exig,
  dividendes: d => d.agDate || d.createdAt,
  sejours: d => d.expiry || d.createdAt,
  audiences: d => d.updatedAt || d.date,
  jugements: d => d.updatedAt || d.date,
  clients: d => d.updatedAt || d.createdAt,
  letters: d => d.createdAt
};

/* ---------------- routes ---------------- */
const routes = [];
function route(method, pattern, handler) { routes.push({ method, pattern, handler }); }

route('GET', /^\/v1\/health$/, (req, res) => {
  json(res, 200, { ok: true, ts: new Date().toISOString(), app: 'avocato-server', version: '1' });
});

route('POST', /^\/v1\/devices$/, async (req, res) => {
  const ip = req.socket.remoteAddress || '?';
  const locked = pairLockRemaining(ip);
  if (locked) {
    log('device registration throttled', ip, Math.ceil(locked / 1000) + 's remaining');
    return json(res, 429, { error: 'trop de tentatives — réessayez plus tard' });
  }
  const body = await readBody(req);
  if (!checkPair(body.pair)) {
    pairFail(ip);
    log('device registration refused (bad pairing code)', ip);
    return json(res, 403, { error: 'pairing code requis — voir le code affiché par le serveur' });
  }
  pairAttempts.delete(ip);
  const id = uid();
  const token = crypto.randomBytes(24).toString('hex');
  db.prepare('INSERT INTO devices(id,label,token_hash,created_at,last_seen) VALUES(?,?,?,?,?)')
    .run(id, String(body.label || 'device'), sha256(token), new Date().toISOString(), new Date().toISOString());
  log('device paired:', id, String(body.label || 'device'));
  json(res, 201, { id, token });
});

route('POST', /^\/v1\/sync\/push$/, async (req, res, dev) => {
  const body = await readBody(req);
  if (!dev) return json(res, 401, { error: 'missing or invalid x-avocato-token' });
  const changes = Array.isArray(body.changes) ? body.changes : [];
  let applied = 0; const conflicts = [];
  for (const ch of changes) {
    if (!ch || !ch.scope || !ch.id) continue;
    const deleted = ch.op === 'del';
    const r = entityPut(String(ch.scope), String(ch.id), deleted ? null : ch.payload, ch.at || null, dev.id, deleted);
    if (r.applied) applied++;
    else {
      conflicts.push({ scope: ch.scope, id: ch.id, serverAt: r.serverAt, incomingAt: ch.at || null });
      db.prepare('INSERT INTO conflicts(scope,rec_id,server_at,incoming_at,device,seen_at) VALUES(?,?,?,?,?,?)')
        .run(ch.scope, ch.id, String(r.serverAt), ch.at || null, dev.id, new Date().toISOString());
    }
  }
  json(res, 200, { applied, rejected: changes.length - applied, conflicts });
});

route('GET', /^\/v1\/sync\/snapshot$/, (req, res, dev) => {
  const rows = db.prepare('SELECT scope,id,payload,at,deleted FROM entities ORDER BY scope,id').all();
  json(res, 200, { ts: new Date().toISOString(), rows: rows.map(r => ({
    scope: r.scope, id: r.id, payload: parsePayload(r.payload, 'snapshot ' + r.scope + '/' + r.id), at: r.at, deleted: r.deleted
  })) });
});

route('POST', /^\/v1\/sequences$/, async (req, res) => {
  const body = await readBody(req);
  const prefix = String(body.prefix || '');
  if (!/^[A-Z]{1,4}-\d{4}$/.test(prefix)) return json(res, 400, { error: 'prefix must look like CH-2026' });
  db.prepare('INSERT INTO sequences(prefix,value) VALUES(?,0) ON CONFLICT(prefix) DO NOTHING').run(prefix);
  db.prepare('UPDATE sequences SET value = value + 1 WHERE prefix = ?').run(prefix);
  const { value } = db.prepare('SELECT value FROM sequences WHERE prefix = ?').get(prefix);
  json(res, 200, { prefix, value });
});

route('POST', /^\/v1\/imports\/mahakim$/, async (req, res, dev) => {
  const body = await readBody(req);
  const id = uid();
  db.prepare('INSERT INTO imports_batch(id,source,received_at,device,stats,payload) VALUES(?,?,?,?,?,?)')
    .run(id, 'mahakim', new Date().toISOString(), dev ? dev.id : null,
         JSON.stringify(body.stats || {}), JSON.stringify(body.rows || []));
  log('mahakim import batch', id, (body.rows || []).length, 'rows');
  json(res, 201, { id });
});

route('POST', /^\/v1\/import\/localstorage$/, async (req, res, dev) => {
  const body = await readBody(req);
  const counts = {};
  const fallbackAt = body.exportedAt || new Date().toISOString();
  if (!Array.isArray(body.dossiers)) return json(res, 400, { error: 'expected a JSON v2 backup (dossiers[] missing)' });
  for (const [scope, pickAt] of Object.entries(ARRAY_SCOPES)) {
    const arr = Array.isArray(body[scope]) ? body[scope] : [];
    let n = 0;
    for (const item of arr) {
      if (!item || !item.id) continue;
      entityPut(scope, item.id, item, pickAt(item) || fallbackAt, dev.id, false);
      n++;
    }
    counts[scope] = n;
  }
  if (body.settings && typeof body.settings === 'object') {
    let n = 0;
    for (const [k, v] of Object.entries(body.settings)) { if (v == null) continue; entityPut('settings', k, v, fallbackAt, dev.id, false); n++; }
    counts.settings = n;
  }
  if (body.vault && typeof body.vault === 'object') {
    let n = 0;
    for (const [k, v] of Object.entries(body.vault)) { if (v == null) continue; entityPut('vault', k, v, fallbackAt, dev.id, false); n++; }
    counts.vault = n;
  }
  if (body.ops && Array.isArray(body.ops.transitions)) {
    let n = 0;
    for (const tr of body.ops.transitions) {
      if (!tr || !tr.id) continue;
      entityPut('transitions', tr.id, tr, tr.at || fallbackAt, dev.id, false);
      db.prepare('INSERT OR IGNORE INTO transitions_log(id,dossier_id,payload,at) VALUES(?,?,?,?)')
        .run(tr.id, tr.dossierId || null, JSON.stringify(tr), tr.at || fallbackAt);
      n++;
    }
    counts.transitions = n;
  }
  if (body.ops && body.ops.dossierChecks && typeof body.ops.dossierChecks === 'object') {
    let n = 0;
    for (const [k, v] of Object.entries(body.ops.dossierChecks)) { entityPut('dossierChecks', k, v, fallbackAt, dev.id, false); n++; }
    counts.dossierChecks = n;
  }
  if (body.seq && typeof body.seq === 'object') {
    let n = 0;
    for (const [k, v] of Object.entries(body.seq)) { entityPut('seq', k, v, fallbackAt, dev.id, false); n++; }
    counts.seq = n;
  }
  log('localStorage import', dev.id, JSON.stringify(counts));
  json(res, 200, { ok: true, counts });
});

route('GET', /^\/v1\/entities$/, (req, res, dev, m, url) => {
  const scope = url.searchParams.get('scope');
  const rows = scope
    ? db.prepare('SELECT id,payload,at,deleted FROM entities WHERE scope=? ORDER BY id').all(scope)
    : db.prepare('SELECT scope,id,payload,at,deleted FROM entities ORDER BY scope,id').all();
  json(res, 200, { rows: rows.map(r => ({ ...r, payload: parsePayload(r.payload, 'entities ' + (scope || r.scope || '') + '/' + r.id) })) });
});

/* ---------------- static (serve the app from http://127.0.0.1:PORT/app/) ---------------- */
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json'
};
function serveStatic(req, res, url) {
  let rel;
  try { rel = decodeURIComponent(url.pathname.replace(/^\/app\/?/, '')) || 'index.html'; }
  catch (e) { return json(res, 400, { error: 'bad request' }); }
  const abs = path.resolve(WEBAPP_DIR, rel);
  if (!abs.startsWith(WEBAPP_DIR + path.sep) && abs !== WEBAPP_DIR) return json(res, 403, { error: 'forbidden' });
  let file = abs;
  try { if (fs.statSync(abs).isDirectory()) file = path.join(abs, 'index.html'); } catch (e) { return json(res, 404, { error: 'not found' }); }
  fs.readFile(file, (err, buf) => {
    if (err) return json(res, 404, { error: 'not found' });
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(buf);
  });
}

/* ---------------- server ---------------- */
const AUTHED = p => p.startsWith('/v1/sync') || p.startsWith('/v1/entities') || p.startsWith('/v1/imports') || p.startsWith('/v1/import/localstorage') || p.startsWith('/v1/sequences');

async function handle(req, res) {
  if (!validHost(req)) return json(res, 403, { error: 'invalid host' });
  const url = new URL(req.url, 'http://' + (req.headers.host || HOST));
  if (req.method === 'OPTIONS') {
    const h = corsHeaders(req);
    h['Access-Control-Max-Age'] = '86400';
    res.writeHead(204, h);
    return res.end();
  }
  if (req.method === 'GET' && (url.pathname === '/' || url.pathname === '/app')) {
    res.writeHead(302, { Location: '/app/index.html' });
    return res.end();
  }
  for (const r of routes) {
    if (r.method !== req.method) continue;
    const m = r.pattern.exec(url.pathname);
    if (!m) continue;
    const dev = auth(req);
    if (AUTHED(url.pathname) && !dev) return json(res, 401, { error: 'missing or invalid x-avocato-token' });
    try { return await r.handler(req, res, dev, m, url); }
    catch (e) {
      log('ERR', url.pathname, e.message);
      const code = e.status || (e.message === 'invalid JSON' ? 400 : 500);
      return json(res, code, { error: code >= 500 ? 'internal error' : e.message });
    }
  }
  if (url.pathname.startsWith('/app/')) {
    try { return serveStatic(req, res, url); }
    catch (e) { log('ERR static', e.message); return json(res, 500, { error: 'internal error' }); }
  }
  json(res, 404, { error: 'no such route' });
}

const server = http.createServer((req, res) => {
  handle(req, res).catch(e => {
    log('ERR unhandled', (e && e.message) || e);
    try { json(res, 500, { error: 'internal error' }); } catch (e2) { try { res.destroy(); } catch (e3) {} }
  });
});

server.on('clientError', (err, socket) => {
  try { socket.end('HTTP/1.1 400 Bad Request\r\nConnection: close\r\n\r\n'); } catch (e) {}
});

process.on('unhandledRejection', (e) => log('unhandledRejection', (e && e.message) || e));

function shutdown(sig) {
  log('shutting down (' + sig + ')');
  server.close(() => {
    try { db.close(); } catch (e) {}
    process.exit(0);
  });
  setTimeout(() => { try { db.close(); } catch (e) {} process.exit(0); }, 3000).unref();
}
['SIGINT', 'SIGTERM'].forEach(sig => process.on(sig, () => shutdown(sig)));

server.listen(PORT, HOST, () => {
  log('AVOCATO server listening on http://' + HOST + ':' + PORT + ' (db: ' + path.join(DATA_DIR, 'avocato.db') + ')');
  log('code d\'appairage appareil: ' + PAIR + ' (fichier: ' + PAIR_FILE + ')');
});
