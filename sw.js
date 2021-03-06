self.addEventListener('install', function(event) {
// Instalar de inmediato
    if (self.skipWaiting) { self.skipWaiting(); }
    event.waitUntil(
        caches.open('SOLI_CACHE_v1.4').then(function(cache) {
            return cache.addAll([
                './',
                'index.html',
                'assets/css/css_principal.min.css',
                'assets/css/smart-app-banner.min.css',
                'assets/js/jquery.min.js',
                'assets/js/bootstrap.min.js',
                'assets/js/menu.min.js',
                'assets/vendors/lazysizes.min.js',
                'assets/js/js_principal.min.js',
                'assets/vendors/owlcarousel/dist/owl.carousel.min.js',
                'assets/js/video_youtube.min.js',
                'assets/vendors/owlcarousel/dist/assets/owl.carousel.min.css',
                'assets/fonts/bariol_regular_italic-webfont.woff',
                'assets/vendors/font-awesome/webfonts/fa-brands-400.woff2',
                'assets/vendors/font-awesome/webfonts/fa-solid-900.woff2',
                'assets/fonts/bariol_bold-webfont.woff',
                'assets/fonts/bariol_bold_italic-webfont.woff',
                'assets/img/logo%20solisocios.png',
                'assets/img/apple-icon-57x57.png',
                'assets/img/apple-icon-60x60.png',
                'assets/img/apple-icon-72x72.png',
                'assets/img/apple-icon-76x76.png',
                'assets/img/apple-icon-114x114.png',
                'assets/img/apple-icon-120x120.png',
                'assets/img/apple-icon-144x144.png',
                'assets/img/apple-icon-152x152.png',
                'assets/img/apple-icon-180x180.png',
                'assets/img/android-icon-192x192.png',
                'assets/img/favicon-32x32.png',
                'assets/img/favicon-96x96.png',
                'assets/img/favicon-16x16.png',
                'assets/img/logo_plus.png',
                'assets/img/qr-code.svg',
                'assets/img/soli-bcp-movil.png',
                'assets/img/youtube-soli1.jpg',
                'assets/img/youtube-soli2.jpg',
                'assets/img/youtube-soli3.jpg',
                'assets/img/youtube-soli5.jpg',
                'assets/img/youtube-soli4.jpg',
                'assets/img/youtube-soli6.jpg',
                'assets/img/youtube-soli7.jpg',
                'assets/img/cliente1.png',
                'assets/img/cliente2.png',
                'assets/img/cliente3.png',
                'assets/img/cliente4.png',
                'assets/img/cliente5.png',
                'assets/img/cliente6.png',
                'assets/img/cliente7.png',
                'assets/img/soli1comercios.png',
                'assets/img/soli-05.svg',
                'assets/img/soli-02.svg',
                'assets/img/solisocios-bcp-fondo.jpg',
                'assets/img/soli-bcp-mobile.jpg',
                'assets/img/soli-bcp.jpg',
                'assets/img/Comercios-soli-pagos-bcp.jpg',
                'assets/img/Comercios-webop3.jpg',
                'assets/img/seguridad_soli.png',
                'assets/img/1.png',
                'assets/img/2.png',
                'assets/img/3.png',
                'assets/img/4.png',
                'assets/img/5.png',
                'assets/img/6.png',
                'assets/img/7.png',
                'assets/img/8.png',
                'assets/img/animacion1.png',
                'assets/img/soli-recargas.jpg',
                'assets/img/soli-recargas2.jpg',
                'assets/img/soli-recargas3.jpg',
                'assets/img/soli-recargas4.jpg',
                'assets/img/soli-recargas5.jpg',
                'assets/img/soli-recargas6.jpg',
                'assets/img/soli-recargas-creado.jpg',
                'assets/fonts/bariol_regular-webfont.woff',
                'assets/img/pasos-recargas-creado.jpg',
                'assets/img/solimegate-solisocios2v-parte1.jpg',
                'assets/img/solimegate-solisocios2v-parte2.jpg',
                'assets/img/soli.svg',
                'assets/img/agencia.svg',
                'assets/img/agente.svg',
                'assets/img/atm.svg'
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
// Elimina archivos de cache viejos
var cacheWhitelist = ['SOLI_CACHE_v1.4'];
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
    console.log('Versi??n SW: '+cacheKeys);
});
