//imports
importScripts('assets/js/sw-utils.js');


const cache_name = 'YAPE_CACHE_v1.7';
// const static_cache = 'static-v2';
// const dynamic_cache = 'dynamic-v2';
// const inmutable_cache = 'inmutable-v2';
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
// const app_shell_inmutable = [
//     "assets/css/bootstrap.min.css",
//     "assets/css/flag-icon.min.css",
//     "assets/vendors/lazysizes.min.js",
//     "assets/js/sweetalert2.min.js",
//     "assets/css/sweetalert2.min.css",
//     "assets/js/jquery.min.js",
//     "assets/js/bootstrap.min.js",
//     "manifest.json",
//     "https://www.yape.com.bo/assets/img/favicon.ico"
// ];
self.addEventListener('install', e=> {
// Instalar de inmediato
//     if (self.skipWaiting) { self.skipWaiting(); }
    e.waitUntil(
        caches.open(cache_name)
            .then(cache => {
                return cache.addAll(app_shell)
                    .then(() => self.skipWaiting())
            })
            .catch(err => console.log('Falló registro de cache', err))
    )

    // const cacheStatic = caches.open(static_cache).then(cache=> {
    //     return cache.addAll(app_shell)
    //         .then(() => self.skipWaiting());
    // })
    // const cacheInmutable = caches.open(inmutable_cache).then(cache=> {
    //     return cache.addAll(app_shell_inmutable)
    //         .then(() => self.skipWaiting());
    // })
    // e.waitUntil(Promise.all([cacheStatic,cacheInmutable]));
});

//tomar el control de la aplicacion
self.addEventListener('activate',e=>{
    //borrar caché viejo
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
        // Muestra en la consola la cache instalada
        console.log('Versión SW: '+cacheKeys);
    });
})

// FETCH: Manejo de peticiones HTTP
self.addEventListener('fetch', e=> {
    // aplicar estrategias del cache
    e.respondWith(
        caches.match(e.request)
            .then(res => {
                if (res) {
                    //recuperar del cache
                    return res
                }
                //recuperar de la petición a la url
                return fetch(e.request)
            })
    )
});
//SYNC: recuperamos la conexion a internet
self.addEventListener('sync',event=>{

});

//PUSH: Manejar el push notificacions
self.addEventListener('push',event=>{
    event.waitUntil(
        // Retrieve a list of the clients of this service worker.
        self.clients.matchAll().then(function(clientList) {
            // Check if there's at least one focused client.
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

            // Show a notification with title 'ServiceWorker Cookbook' and body depending
            // on the state of the clients of the service worker (three different bodies:
            // 1, the page is focused; 2, the page is still open but unfocused; 3, the page
            // is closed).
            return self.registration.showNotification('Yape Bolivia', {
                body: notificationMessage,
            });
        })
    );
});
// Register event listener for the 'notificationclick' event.
self.addEventListener('notificationclick', function(event) {
    event.waitUntil(
        // Retrieve a list of the clients of this service worker.
        self.clients.matchAll().then(function(clientList) {
            // If there is at least one client, focus it.
            if (clientList.length > 0) {
                return clientList[0].focus();
            }

            // Otherwise, open a new page.
            return self.clients.openWindow('../push-clients_demo.html');
        })
    );
});

// Elimina archivos de caché viejos
// var cacheWhitelist = [cache_name];
//
// caches.keys().then(cacheNames=> {
//     return Promise.all(
//         cacheNames.map(function(cacheName) {
//             if (cacheWhitelist.indexOf(cacheName) === -1) {
//                 return caches.delete(cacheName);
//             }
//         })
//     );
// });

// caches.keys().then(function(cacheKeys) {
//     // Muestra en la consola la caché instalada
//     console.log('Versión SW: '+cacheKeys);
// });


