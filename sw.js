//imports
importScripts('assets/js/sw-utils.js');


const cache_name = 'YAPE_CACHE_v1.0';
const static_cache = 'static-v1';
const dynamic_cache = 'dynamic-v1';
const inmutable_cache = 'inmutable-v1';
const app_shell = [
    '/',
    './index.html',
    'assets/css/css_principal.min.css',
    "assets/css/footer.min.css",
    "assets/css/menu.min.css",
    "assets/js/menu.min.js",
    "assets/js/js_principal.min.js",
    "assets/img/banner_principal.png",
    "assets/img/yape_phone.svg",
    "assets/img/yape_envio_otro_banco.svg",
    "assets/img/yape-pago-servicios.svg",
    "assets/img/yape-recarga-credito.svg",
    "assets/img/Logo_Bolivia.svg",
    "assets/img/yape-pago-qr.svg",
    "assets/img/yape-paga-nfc.svg",
    "assets/img/yape-envia-recibe-dinero.svg",
    "assets/img/yape_qr.svg",
    "assets/img/yape_agencia.svg",
    "assets/img/yape_agente.svg",
    "assets/img/video1.webp",
    "assets/img/video2.webp",
    "assets/img/video3.webp",
    "assets/img/video4.webp",
    "assets/img/video5.webp",
    "assets/img/yape-negocios.svg",
    "assets/img/yape_girl.png",
    "assets/img/agencia.svg",
    "assets/img/agente.svg",
    "assets/img/atm.svg",
    "assets/img/ic_social_facebook_b.svg",
    "assets/img/ic_social_instagram_b.svg",
    "assets/img/ic_social_youtube_b.svg",
    "assets/img/Contactos.svg",
    "assets/img/Conócenos.svg",
    "assets/img/ic_social_tiktok_b.svg",
    "assets/img/contactos-phone.svg",
    "assets/img/conocenos-phone.svg",
    "assets/img/Logo_Bolivia_footer.svg",
    "assets/img/angle-up-white.svg",
    "assets/img/Logo_Bolivia_2.svg",
    "assets/img/Logo_Bolivia_3.svg",
    "assets/img/yape_arrowmenu.svg",
    "assets/img/yape.png",
    "contrato-prestacion-servicio.html",
    "politica-privacidad.html",
    "assets/js/sw-utils.js"
];
const app_shell_inmutable = [
    "assets/css/bootstrap.min.css",
    "assets/css/flag-icon.min.css",
    "assets/css/youtube.min.css",
    "assets/vendors/lazysizes.min.js",
    "assets/js/sweetalert2.min.js",
    "assets/css/sweetalert2.min.css",
    "assets/js/jquery.min.js",
    "assets/js/bootstrap.min.js",
    "assets/js/youtube.min.js",
];
self.addEventListener('install', event=> {
// Instalar de inmediato
//     if (self.skipWaiting) { self.skipWaiting(); }

    const cacheStatic = caches.open(static_cache).then(cache=> {
        return cache.addAll(app_shell);
    })
    const cacheInmutable = caches.open(inmutable_cache).then(cache=> {
        return cache.addAll(app_shell_inmutable);
    })
    event.waitUntil(Promise.all([cacheStatic,cacheInmutable]));
});

//tomar el control de la aplicacion
self.addEventListener('activate',e=>{
    //borrar caché viejo
    const respuesta = caches.keys().then( keys => {
        keys.forEach( key => {
            if (  key !== static_cache && key.includes('static') ) {
                return caches.delete(key);
            }
            if (  key !== dynamic_cache && key.includes('dynamic') ) {
                return caches.delete(key);
            }
        });
    });
    e.waitUntil( respuesta );
})

// FETCH: Manejo de peticiones HTTP
self.addEventListener('fetch', e=> {
    // aplicar estrategias del cache
    // event.respondWith(
    //     caches.match(event.request).then(function(response) {
    //         return response || fetch(event.request).then( resp=>{ if(resp.ok)  return resp });
    //     })
    // );

    const respuesta = caches.match( e.request ).then( res => {
        if ( res ) {
            return res;
        } else {
            return fetch( e.request ).then( newRes => {
                return actualizaCacheDinamico( dynamic_cache, e.request, newRes );
            });
        }
    });
    e.respondWith( respuesta );
});

//SYNC: recuperamos la conexion a internet
self.addEventListener('sync',event=>{

});

//PUSH: Manejar el push notificacions
self.addEventListener('push',event=>{

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


