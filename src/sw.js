/* global self, caches, fetch */
const version = '%%hash%%';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(`cache-${version}`)
      .then(cache => cache.addAll([
        '/',
        '/main.js',
        '//cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css',
      ])
      ));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => Promise.all(
        cacheNames.map(cacheName =>
          cacheName !== `cache-${version}` && caches.delete(cacheName)
        )
      ))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true })
      .then(response => response || fetch(event.request))
  );
});
