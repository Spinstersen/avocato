import assert from 'node:assert';

const BASE = (process.env.AVOCATO_TEST_URL || 'http://127.0.0.1:8790') + '/app';

const manRes = await fetch(BASE + '/manifest.webmanifest');
assert.strictEqual(manRes.status, 200, 'manifest servi');
assert.ok((manRes.headers.get('content-type') || '').includes('application/manifest+json'), 'MIME manifest');
const man = await manRes.json();
assert.ok(/AVOCATO/.test(man.name) && man.short_name === 'AVOCATO', 'nom');
assert.strictEqual(man.display, 'standalone', 'display standalone');
assert.ok(man.start_url && man.scope, 'start_url + scope');
assert.ok(Array.isArray(man.icons) && man.icons.some(i => i.sizes === '192x192') && man.icons.some(i => i.sizes === '512x512'), 'icones 192 + 512');
assert.strictEqual(man.theme_color, '#0b2e35', 'theme pétrole CMS (THEMES.md v4)');
console.log('1. manifest OK (nom, standalone, icones, theme)');

for (const s of [192, 512]) {
  const r = await fetch(BASE + '/icons/icon-' + s + '.png');
  assert.strictEqual(r.status, 200, 'icone ' + s);
  assert.ok((r.headers.get('content-type') || '').includes('image/png'), 'MIME png ' + s);
  const b = Buffer.from(await r.arrayBuffer());
  assert.strictEqual(b.slice(0, 8).toString('hex'), '89504e470d0a1a0a', 'signature PNG ' + s);
  assert.strictEqual(b.readUInt32BE(16), s, 'largeur ' + s);
  assert.strictEqual(b.readUInt32BE(20), s, 'hauteur ' + s);
}
console.log('2. icones PNG OK (192 + 512, dimensions)');

const swRes = await fetch(BASE + '/sw.js');
assert.strictEqual(swRes.status, 200, 'sw servi');
const sw = await swRes.text();
assert.ok(/avocato-v\d+/.test(sw), 'version cache');
assert.ok(sw.includes('skipWaiting'), 'activation immediate');
for (const f of ['cabinet.js', 'cabinet-mahakim.js', 'mock-data.js', 'vendor/chart.umd.min.js']) {
  assert.ok(sw.includes(f), 'shell contient ' + f);
}
assert.ok(sw.includes('/v1/') && /jamais de cache/i.test(sw), 'API exclue du cache');
assert.ok(!/VAPID|push|PushManager|showNotification/.test(sw), 'pas de push (hors perimetre partiel)');
console.log('3. service worker OK (shell versionne, API exclue, pas de push)');

const html = await fetch(BASE + '/index.html').then(r => r.text());
assert.ok(html.includes('rel="manifest"') && html.includes('manifest.webmanifest'), 'lien manifest');
assert.ok(html.includes('name="theme-color"'), 'theme-color');
assert.ok(html.includes('serviceWorker.register') && html.includes('https?'), 'enregistrement garde http(s)');
console.log('4. index.html OK (manifest + SW garde, file:// intact)');

console.log('\nPWA TEST: 4/4 PASS');
process.exitCode = 0; // pas de process.exit brutal : les sockets fetch keep-alive doivent se drainer (assertion libuv sous Windows)
