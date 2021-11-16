const staticCacheName = 'app-static-v1.0';

const staticCacheFileNames = [
  'img/icon-144x144.png',
  'img/icon-192x192.png',
  'img/icon-256x256.png',
  'img/icon-384x384.png',
  'img/icon-512x512.png',
  'css/stylesheet.css',
  'js/app.js',
  'js/jquery.min.js',
  'js/qrcode.js',
  'js/qrcode.min.js'
];


self.addEventListener('install', (event) => {
  //self.skipWaiting();
  event.waitUntil(
    caches.open(staticCacheName)
    .then((cache) => {
      cache.addAll([
        '/',
        'manifest.json',
        ...staticCacheFileNames
      ]);
    })
    .catch((error) => {
      console.log(`Error caching static assets: ${error}`);
    })
  );
});

//
self.addEventListener('activate', (event) => {
  //self.skipWaiting();
  event.waitUntil(
    caches.keys().then(keys => {
      keys.forEach(key => {
        if (key !== staticCacheName && key.includes('app-static-')) {
          return caches.delete(key);
        }
      });
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request));
});


self.addEventListener('push', event => {
  console.log('Notificación recibida');
})
