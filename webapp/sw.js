/* AVOCATO service worker — PWA offline (GitHub Pages / localhost)
   Stratégie :
   - data.js + pages : réseau d'abord (mises à jour rapides après push), repli cache
   - librairies/styles/icônes : cache d'abord, mise à jour en arrière-plan */
const CACHE = 'avocato-v3';
const PRECACHE = [
  './',
  './index.html',
  './cabinet.html',
  './styles.css',
  './glossary.js',
  './data.js',
  './manifest.webmanifest',
  './icons/icon.svg',
  './icons/icon-maskable.svg',
  './vendor/marked.min.js',
  './vendor/chart.umd.min.js'
];
const NETWORK_FIRST = [/data\.js$/i, /index\.html$/i, /cabinet\.html$/i];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  const nf = NETWORK_FIRST.some((re) => re.test(url.pathname));

  if (nf) {
    e.respondWith(
      fetch(req)
        .then((res) => {
          if (res && res.ok) {
            const cl = res.clone();
            caches.open(CACHE).then((c) => c.put(req, cl));
          }
          return res;
        })
        .catch(() => caches.match(req, { ignoreSearch: false }).then((h) => h || caches.match('./index.html')))
    );
    return;
  }

  e.respondWith(
    caches.match(req).then(
      (hit) =>
        hit ||
        fetch(req).then((res) => {
          if (res && res.ok) {
            const cl = res.clone();
            caches.open(CACHE).then((c) => c.put(req, cl));
          }
          return res;
        })
    )
  );
});
