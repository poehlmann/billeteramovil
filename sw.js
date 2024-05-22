//imports
importScripts('assets/js/sw-utils.js');
const cache_name = 'YAPE_CACHE_v1.7';
const app_shell = [
    "./index.html",
    "assets/js/menu.min.js",
    "assets/js/js_principal.min.js",
    "assets/vendors/lazysizes.min.js",
    "assets/js/sweetalert2.min.js",
    "assets/js/jquery.min.js",
    "assets/js/bootstrap.min.js",
    "manifest.json",
    "assets/css/sweetalert2.min.css",
    "assets/css/css_principal.min.css",
    "assets/css/footer.min.css",
    "assets/css/menu.min.css",
    "assets/css/bootstrap.min.css"
];
self.addEventListener('install', e=> {
    e.waitUntil(
        caches.open(cache_name)
            .then(cache => {
                return cache.addAll(app_shell)
                    .then(() => self.skipWaiting())
            })
            .catch(err => console.log('Falló registro de cache', err))
    )
});

self.addEventListener('activate',e=>{
    var cacheWhitelist = [cache_name];
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
        console.log('Versión SW: '+cacheKeys);
    });
})

self.addEventListener('fetch', e=> {
    e.respondWith(
        caches.match(e.request)
            .then(res => {
                if (res) {
                    return res
                }
                return fetch(e.request)
            })
    )
});
self.addEventListener('sync',event=>{

});
self.addEventListener('push',event=>{
    event.waitUntil(
        self.clients.matchAll().then(function(clientList) {
            var focused = clientList.some(function(client) {
                return client.focused;
            });
            var notificationMessage;
            if (focused) {
                notificationMessage = 'Gracias por seguir con nosotros';
            } else if (clientList.length > 0) {
                notificationMessage = 'No cerraste aún Yape Bolivia Web' +
                    'Haz click aquí!';
            } else {
                notificationMessage = 'No cerraste Yape Bolivia Web, ' +
                    'Haz click aquí para re abrirlo!';
            }
            return self.registration.showNotification('Yape Bolivia', {
                body: notificationMessage,
            });
        })
    );
});
self.addEventListener('notificationclick', function(event) {
    event.waitUntil(
        self.clients.matchAll().then(function(clientList) {
            if (clientList.length > 0) {
                return clientList[0].focus();
            }
            return self.clients.openWindow('../push-clients_demo.html');
        })
    );
});
