/**
 * Cache URLs
 */

var staticCacheName = 'rr-static-v1';

self.addEventListener('install', function(event) {
  console.log("Service Worker installed");
  var urlsToCache = [
    '/',
    'index.html',
    'restaurant.html',
    'js/main.js',
    'js/dbhelper.js',
    'js/restaurant_info.js',
    'css/styles.css',
    'img/1.jpg',
    'img/2.jpg',
    'img/3.jpg',
    'img/4.jpg',
    'img/5.jpg',
    'img/6.jpg',
    'img/7.jpg',
    'img/8.jpg',
    'img/9.jpg',
    'img/10.jpg',
    'data/restaurants.json'
  ];

  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      console.log('Service Worker caching', urlsToCache);
      return cache.addAll(urlsToCache);
    })
  );
});

/**
 * Compare the cache names - if they are not equal, delete
 * the old caches
 */

self.addEventListener('activate', function(event) {
  console.log("Service Worker activated");
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('rr-') &&
              cacheName != staticCacheName;
        }).map(function(cacheName) {
          console.log('Service Worker remowing cached files from', cacheName);
          return cache.delete(cacheName);
        })
      );
    })
  );
});

/**
 * Show content from cache
 */

 self.addEventListener('fetch', function(event) {
   console.log('Service Worker fetching', event.request.url);
   event.respondWith(
     caches.match(event.request).then(function(response) {
       if (response) {
         console.log('Service Worker found in cache', event.request.url);
         return response;
       }
       return fetch(event.request);
     })
   );
 });
