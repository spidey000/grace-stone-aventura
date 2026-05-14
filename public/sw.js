const CACHE_NAME = 'bravestone-aventura-v2';
const APP_SHELL = ['/manifest.webmanifest', '/bravestone-icon.svg'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  const isSameOrigin = url.origin === self.location.origin;

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(
        () => new Response('Sin conexión.', { status: 503, headers: { 'content-type': 'text/plain' } }),
      ),
    );
    return;
  }

  if (!isSameOrigin) {
    event.respondWith(fetch(event.request));
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((response) => {
          if (!response.ok) return response;

          const contentType = response.headers.get('content-type') || '';
          if (contentType.includes('text/html')) return response;

          const copy = response.clone();

          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));

          return response;
        });
    }),
  );
});
