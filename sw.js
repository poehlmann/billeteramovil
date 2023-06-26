self.addEventListener('install', function(event) {
// Instalar de inmediato
    if (self.skipWaiting) { self.skipWaiting(); }
    event.waitUntil(
        caches.open('YAPE_CACHE_v1').then(function(cache) {
            return cache.addAll([
                './',
                './index.html',
                'assets/js/js_principal.min.js',
                'assets/css/css_principal.min.css',
                'assets/js/jquery.min.js',
                'assets/js/bootstrap.min.js',
                'assets/js/menu.min.js'
            ]);
        })
    );
});
// Cache, falling back to network
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
// Elimina archivos de caché viejos
var cacheWhitelist = ['YAPE_CACHE_v1.4'];
caches.keys().then(function(cacheNames) {
    return Promise.all(
        cacheNames.map(function(cacheName) {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
                return caches.delete(cacheName);
            }
        })
    );
});
caches.keys().then(function(cacheKeys) {
    // Muestra en la consola la caché instalada
    console.log('Versión SW: '+cacheKeys);
});
