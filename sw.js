const CACHE_NAME = 'receipt-calc-v2'; // ਵਰਜਨ ਬਦਲ ਦਿੱਤਾ ਹੈ ਤਾਂ ਜੋ ਨਵਾਂ ਅਪਡੇਟ ਚੁੱਕ ਲਵੇ
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png', // ਇਹ ਫਾਈਲ ਫੋਲਡਰ ਵਿੱਚ ਹੋਣੀ ਬਹੁਤ ਜਰੂਰੀ ਹੈ
  './icon-512.png'  // ਇਹ ਫਾਈਲ ਫੋਲਡਰ ਵਿੱਚ ਹੋਣੀ ਬਹੁਤ ਜਰੂਰੀ ਹੈ
];

// Install Event
self.addEventListener('install', (event) => {
  self.skipWaiting(); // ਨਵਾਂ ਸਰਵਿਸ ਵਰਕਰ ਤੁਰੰਤ ਚਾਲੂ ਕਰਨ ਲਈ
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch Event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Activate Event (Cleanup old caches)
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
