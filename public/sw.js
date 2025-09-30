// Service Worker pour la mise en cache et l'optimisation des requêtes
const CACHE_NAME = 'eco-training-cache-v1';

// Liste des ressources à mettre en cache
const STATIC_RESOURCES = [
  '/',
  '/index.html',
  '/static/optimized/'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache ouvert');
        return cache.addAll(STATIC_RESOURCES);
      })
  );
});

// Stratégie de cache : Network First avec fallback sur le cache
self.addEventListener('fetch', (event) => {
  // Ne pas mettre en cache les requêtes WebSocket
  if (event.request.url.includes('/ws')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Mise en cache de la réponse
        const responseClone = response.clone();
        caches.open(CACHE_NAME)
          .then((cache) => {
            cache.put(event.request, responseClone);
          });
        return response;
      })
      .catch(() => {
        // Si offline, on utilise le cache
        return caches.match(event.request);
      })
  );
});
