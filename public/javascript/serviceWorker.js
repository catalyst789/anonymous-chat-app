const CACHE_NAME = 'NODE: VERSION:1';

const self = this;

//Install Service Worker
self.addEventListener('install', (event) => {
    caches.waitUntil(
        caches.open(CACHE_NAME)
        .then( cache => {
            console.log('--SW : cache open')
            return cache.addAll([
                '../../app.js',
                '../Offline.html'
            ]);
        })
    )
});


//Fetch the service Worker Request
self.addEventListener('fetch', (event) => {
   event.respondWith(
       caches.match(event.response)
       .then( () => {
            return fetch(event.response)
                .catch( () => caches.match('Offline.html'));

       })
   )
});


//Activates the service Worker
self.addEventListener('activate', (event) => {
   const cacheList = [];
    cacheList.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then( cacheName => Promise.all(
            cacheName.map( cacheName => {
                if(!cacheList.includes(cacheName)){
                    return caches.delete(cacheName);
                }
            })
        ))
    )
 });
