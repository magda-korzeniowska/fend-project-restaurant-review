/**
 * Cache URLs in cache named 'rr-static-v1'
 */

self.addEventListener('install', function(event) {
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
    caches.open('rr-static-v1').then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

/**
 * Show content from cache
 */

 self.addEventListener('fetch', function(event) {
   event.respondWith(
     caches.match(event.request).then(function(response) {
       if (response) return response;
       return fetch(event.request);
     })
   );
 });
