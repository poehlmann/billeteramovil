
// Guardar  en el cache dinamico
function actualizaCacheDinamico( dynamicCache, req, res ) {
    if ( res.ok ) {
        if((res.request.url.indexOf('http') === 0)) {

            return caches.open(dynamicCache).then(cache => {
                cache.put(req, res.clone());
                return res.clone();
            });
        }
    } else {
        return res;
    }
}
