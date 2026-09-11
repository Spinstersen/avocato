/* AVOCATO — harness de tests isolé (Phase 4).
   1. démarre UN serveur sur un port libre + dossier de données temporaire ;
   2. exécute chaque test dans un processus séparé avec AVOCATO_TEST_URL/PAIR ;
   3. arrête le serveur, nettoie le dossier temporaire, résume.
   Usage : node tests/run-all.mjs  (aucun serveur manuel requis). */
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import net from 'node:net';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(DIR, '..');
const TZ = process.env.TZ || 'Africa/Casablanca';
process.env.TZ = TZ;

function freePort() {
  return new Promise((resolve, reject) => {
    const s = net.createServer();
    s.listen(0, '127.0.0.1', () => { const p = s.address().port; s.close(() => resolve(p)); });
    s.on('error', reject);
  });
}

const PORT = await freePort();
const BASE = 'http://127.0.0.1:' + PORT;
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'avocato-run-'));
const PAIR = 'TESTPAIR' + Math.random().toString(36).slice(2, 8).toUpperCase();

/* data.js requis par test-packs : rebuild si absent. */
if (!fs.existsSync(path.join(ROOT, 'webapp', 'data.js'))) {
  await run(process.execPath, [path.join(ROOT, 'webapp', 'scripts', 'build.js')], ROOT, process.env, 60000);
}

const server = spawn(process.execPath, [path.join(ROOT, 'server', 'index.js')], {
  cwd: ROOT,
  env: { ...process.env, TZ, AVOCATO_PORT: String(PORT), AVOCATO_HOST: '127.0.0.1', AVOCATO_DATA: TMP, AVOCATO_PAIR: PAIR },
  stdio: ['ignore', 'pipe', 'pipe']
});
let serverLog = '';
server.stdout.on('data', d => { serverLog += d; });
server.stderr.on('data', d => { serverLog += d; });

async function waitHealth() {
  const deadline = Date.now() + 15000;
  while (Date.now() < deadline) {
    try { const r = await fetch(BASE + '/v1/health'); if (r.ok) return; } catch (e) { /* retry */ }
    await new Promise(r => setTimeout(r, 150));
  }
  throw new Error('serveur de test non démarré:\n' + serverLog);
}

function run(cmd, args, cwd, env, timeoutMs) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, { cwd, env, stdio: ['ignore', 'pipe', 'pipe'] });
    let out = '';
    child.stdout.on('data', d => { out += d; });
    child.stderr.on('data', d => { out += d; });
    const timer = setTimeout(() => { try { child.kill('SIGKILL'); } catch (e) { /* déjà fini */ } }, timeoutMs);
    child.on('exit', (code) => { clearTimeout(timer); resolve({ code: code == null ? 1 : code, out }); });
    child.on('error', (e) => { clearTimeout(timer); resolve({ code: 1, out: out + '\n' + e.message }); });
  });
}

function lines(out) {
  return out.split(/\r?\n/).filter(Boolean);
}

const tests = fs.readdirSync(DIR).filter(f => /^test-.*\.mjs$/.test(f) && f !== 'run-all.mjs').sort();
const results = [];

try {
  await waitHealth();
  console.log('harness: serveur ' + BASE + ' (data ' + TMP + ', TZ ' + TZ + ')\n');

  for (const t of tests) {
    const started = Date.now();
    const r = await run(process.execPath, [path.join(DIR, t)], ROOT, {
      ...process.env, TZ, AVOCATO_TEST_URL: BASE, AVOCATO_TEST_PAIR: PAIR
    }, 180000);
    const secs = ((Date.now() - started) / 1000).toFixed(1);
    const summary = lines(r.out).filter(l => /TEST: (\d+\/\d+ (PASS|FAIL)|PASS|FAIL)/.test(l)).pop();
    const ok = r.code === 0;
    console.log((ok ? 'PASS ' : 'FAIL ') + t.padEnd(22) + ' ' + secs + 's  ' + (summary || ('exit ' + r.code)));
    if (!ok) {
      lines(r.out).slice(-25).forEach(l => console.log('  | ' + l));
    }
    results.push({ test: t, ok, code: r.code });
  }
} finally {
  try { server.kill('SIGTERM'); } catch (e) { /* déjà arrêté */ }
  await new Promise(resolve => {
    let done = false;
    const finish = () => { if (!done) { done = true; resolve(); } };
    server.once('exit', finish);
    setTimeout(() => { try { server.kill('SIGKILL'); } catch (e) { /* déjà mort */ } finish(); }, 4000);
  });
  try { fs.rmSync(TMP, { recursive: true, force: true }); } catch (e) { /* best effort */ }
}

const failed = results.filter(r => !r.ok).length;
console.log('\n' + '='.repeat(56));
console.log('RUN-ALL: ' + (results.length - failed) + '/' + results.length + ' fichiers verts' + (failed ? ' — ' + failed + ' échec(s)' : ''));
process.exit(failed ? 1 : 0);
