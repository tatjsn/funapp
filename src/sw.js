/* global self, caches, fetch */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('cache-v1')
      .then(cache => cache.addAll([
        '/',
        '/main.js',
        '/main.js',
        '//cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css',
      ])
  ));
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
