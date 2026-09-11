/* AVOCATO — Tests Phase 1 : serveur durci (auth, crash-proof, limites, LWW).
   Lance le serveur sur un port libre + dossier de donnees temporaire (AVOCATO_DATA),
   aucune dependance externe. Usage : node tests/test-server.mjs (Node >= 22.5). */
import assert from 'node:assert';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import net from 'node:net';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PAIR = 'TESTPAIR1234';
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'avocato-test-'));

function freePort() {
  return new Promise((resolve, reject) => {
    const s = net.createServer();
    s.listen(0, '127.0.0.1', () => { const p = s.address().port; s.close(() => resolve(p)); });
    s.on('error', reject);
  });
}

const PORT = await freePort();
const BASE = 'http://127.0.0.1:' + PORT;

const child = spawn(process.execPath, [path.join(ROOT, 'server', 'index.js')], {
  env: { ...process.env, AVOCATO_PORT: String(PORT), AVOCATO_HOST: '127.0.0.1', AVOCATO_DATA: TMP, AVOCATO_PAIR: PAIR },
  stdio: ['ignore', 'pipe', 'pipe']
});
let serverLog = '';
child.stdout.on('data', d => { serverLog += d; });
child.stderr.on('data', d => { serverLog += d; });

async function waitHealth() {
  const deadline = Date.now() + 10000;
  while (Date.now() < deadline) {
    try { const r = await fetch(BASE + '/v1/health'); if (r.ok) return; } catch (e) { /* retry */ }
    await new Promise(r => setTimeout(r, 150));
  }
  throw new Error('serveur non demarre:\n' + serverLog);
}
await waitHealth();

function get(pathname, token) {
  const headers = token ? { 'x-avocato-token': token } : {};
  return fetch(BASE + pathname, { headers });
}
function postJson(pathname, body, token) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['x-avocato-token'] = token;
  return fetch(BASE + pathname, { method: 'POST', headers, body: JSON.stringify(body) });
}

let failures = 0;
async function step(name, fn) {
  try { await fn(); console.log('OK   ' + name); }
  catch (e) { failures++; console.log('FAIL ' + name + ' — ' + (e && e.message)); }
}

let token = null;

await step('health 200', async () => {
  const r = await get('/v1/health');
  assert.strictEqual(r.status, 200);
  assert.strictEqual((await r.json()).app, 'avocato-server');
});

await step('sequences refuse sans token (401)', async () => {
  const r = await postJson('/v1/sequences', { prefix: 'CH-2026' });
  assert.strictEqual(r.status, 401);
});

await step('entities refuse sans token (401)', async () => {
  const r = await get('/v1/entities');
  assert.strictEqual(r.status, 401);
});

await step('URI malformee -> 400, serveur toujours vivant', async () => {
  const r = await fetch(BASE + '/app/%E0%A4%A');
  assert.strictEqual(r.status, 400);
  const h = await get('/v1/health');
  assert.strictEqual(h.status, 200, 'serveur vivant apres URI invalide');
});

await step('traversee de chemin bloquee (403)', async () => {
  const r = await fetch(BASE + '/app/..%2F..%2Fserver%2Findex.js');
  assert.strictEqual(r.status, 403);
});

await step('fichier statique servi (index.html)', async () => {
  const r = await fetch(BASE + '/app/index.html');
  assert.strictEqual(r.status, 200);
  assert.ok((r.headers.get('content-type') || '').includes('text/html'));
});

await step('paire invalide -> 403', async () => {
  const r = await postJson('/v1/devices', { pair: 'WRONGCODE1', label: 'test' });
  assert.strictEqual(r.status, 403);
});

await step('appairage valide -> token', async () => {
  const r = await postJson('/v1/devices', { pair: PAIR, label: 'test-device' });
  assert.strictEqual(r.status, 201);
  const d = await r.json();
  assert.ok(d.token && d.token.length >= 32, 'token fort');
  token = d.token;
});

await step('JSON invalide -> 400', async () => {
  const r = await fetch(BASE + '/v1/sync/push', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-avocato-token': token },
    body: '{nope'
  });
  assert.strictEqual(r.status, 400);
});

await step('sequences authentifiees + increment', async () => {
  const r1 = await postJson('/v1/sequences', { prefix: 'CH-2026' }, token);
  assert.strictEqual(r1.status, 200);
  assert.strictEqual((await r1.json()).value, 1);
  const r2 = await postJson('/v1/sequences', { prefix: 'CH-2026' }, token);
  assert.strictEqual((await r2.json()).value, 2);
});

await step('push + snapshot + LWW (version ancienne rejetee)', async () => {
  const p1 = await postJson('/v1/sync/push', {
    changes: [{ scope: 'dossiers', id: 't1', op: 'upsert', payload: { id: 't1', client: 'Alpha' }, at: '2026-09-10T10:00:00.000Z' }]
  }, token);
  assert.strictEqual(p1.status, 200);
  assert.strictEqual((await p1.json()).applied, 1);

  const snap = await (await get('/v1/entities?scope=dossiers', token)).json();
  const row = snap.rows.find(r => r.id === 't1');
  assert.ok(row && row.payload.client === 'Alpha', 'snapshot contient t1');

  const p2 = await postJson('/v1/sync/push', {
    changes: [{ scope: 'dossiers', id: 't1', op: 'upsert', payload: { id: 't1', client: 'Stale' }, at: '2026-09-10T09:00:00.000Z' }]
  }, token);
  const d2 = await p2.json();
  assert.strictEqual(d2.applied, 0);
  assert.strictEqual(d2.conflicts.length, 1);
});

await step('timestamp futur borne (pas de verrou permanent)', async () => {
  const r = await postJson('/v1/sync/push', {
    changes: [{ scope: 'dossiers', id: 't2', op: 'upsert', payload: { id: 't2' }, at: '2999-01-01T00:00:00.000Z' }]
  }, token);
  assert.strictEqual(r.status, 200);
  const snap = await (await get('/v1/entities?scope=dossiers', token)).json();
  const row = snap.rows.find(x => x.id === 't2');
  assert.ok(row, 'ligne t2 presente');
  assert.ok(Date.parse(row.at) <= Date.now() + 6 * 60 * 1000, 'at borne, stocke=' + row.at);
});

await step('timestamp invalide -> applique (fallback now)', async () => {
  const r = await postJson('/v1/sync/push', {
    changes: [{ scope: 'dossiers', id: 't3', op: 'upsert', payload: { id: 't3' }, at: 'nimporte-quoi' }]
  }, token);
  assert.strictEqual(r.status, 200);
  assert.strictEqual((await r.json()).applied, 1);
});

await step('corps > 16 Mo -> 413, serveur vivant', async () => {
  const huge = JSON.stringify({ changes: [], pad: 'a'.repeat(17 * 1024 * 1024) });
  const r = await fetch(BASE + '/v1/sync/push', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-avocato-token': token },
    body: huge
  });
  assert.strictEqual(r.status, 413);
  const h = await get('/v1/health');
  assert.strictEqual(h.status, 200, 'serveur vivant apres corps trop grand');
});

await step('verrouillage apres 10 echecs d appairage (429)', async () => {
  let sawLock = false;
  for (let i = 0; i < 14 && !sawLock; i++) {
    const r = await postJson('/v1/devices', { pair: 'WRONGCODE' + i, label: 'brute' });
    if (r.status === 429) sawLock = true;
    else assert.strictEqual(r.status, 403, 'attendu 403 avant verrouillage, recu ' + r.status);
  }
  assert.ok(sawLock, '429 jamais recu');
});

child.kill('SIGTERM');
await new Promise(res => {
  child.once('exit', res);
  setTimeout(() => { try { child.kill('SIGKILL'); } catch (e) { /* deja mort */ } res(); }, 4000);
});
try { fs.rmSync(TMP, { recursive: true, force: true }); } catch (e) { /* nettoyage best effort */ }

console.log('\nSERVER TEST: ' + (failures ? failures + ' FAIL' : 'PASS'));
process.exitCode = failures ? 1 : 0;
