/* global self, caches, fetch */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('cache-v1')
      .then(cache => cache.addAll([
        '/',
        '/main.js',
        '/osake_woman1_smile.png',
        '/osake_woman4_laugh.png',
      ])
  ));
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
