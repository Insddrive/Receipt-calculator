const CACHE_NAME = 'receipt-calc-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
  /* ਜੇਕਰ ਤੁਸੀਂ ਆਈਕਨ ਵਰਤ ਰਹੇ ਹੋ, ਤਾਂ ਉਹਨਾਂ ਨੂੰ ਵੀ ਇੱਥੇ ਸ਼ਾਮਲ ਕਰੋ: 
     './icon-192.png',
     './icon-512.png'
  */
];

// Install the Service Worker and Cache files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Serve cached files when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Update the Service Worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
