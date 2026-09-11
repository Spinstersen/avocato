/* AVOCATO service worker — PWA locale (partielle, hors Phase H).
   App shell en cache-first pour le mode offline ; l'API /v1 n'est JAMAIS
   mise en cache (miroir frais garanti) ; file:// non concerné (pas de SW). */
'use strict';
/* v5 (11/09/2026) : couche mobile v6 (mobile.js, barre basse, tables→fiches). */
const V = 'avocato-v14';
const CORE = [
  'index.html', 'fonts.css', 'styles.css', 'manifest.webmanifest',
  'fonts/cormorant.woff2', 'fonts/cormorant-italic.woff2', 'fonts/inter.woff2', 'fonts/mono.woff2',
  'avocato-core.js',
  'store.js',
  'app.js', 'cabinet.js', 'cabinet-ops.js', 'cabinet-features.js',
  'cabinet-cour.js', 'cabinet-agenda.js', 'cabinet-relations.js',
  'cabinet-mahakim.js', 'cabinet-packs-14-18.js', 'cabinet-registres.js', 'mock-data.js', 'sync.js', 'palette.js', 'mobile.js',
  'icons.js', 'data.js',
  'vendor/marked.min.js', 'vendor/chart.umd.min.js',
  'icons/icon-192.png', 'icons/icon-512.png'
];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(V).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== V).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const u = new URL(e.request.url);
  if (u.origin !== location.origin) return;
  if (u.pathname.indexOf('/v1/') === 0) return; /* API : réseau seul, jamais de cache */
  e.respondWith(
    caches.match(e.request).then(
      (hit) =>
        hit ||
        fetch(e.request).then((res) => {
          /* Ne jamais mettre en cache une erreur (404/500, page de
             maintenance, déploiement partiel) : une coquille en cache =
             shell cassé persistant jusqu'au hard-refresh. */
          if (!res || !res.ok) return res;
          const copy = res.clone();
          caches.open(V).then((c) => c.put(e.request, copy));
          return res;
        }).catch(() => caches.match('index.html'))
    )
  );
});
