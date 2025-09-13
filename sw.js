// This is the service worker script, which listens for background events.

const CACHE_NAME = 'gitty-mag-cache-v1';
// These are the files that will be cached for offline use.
const urlsToCache = [
  '.', // This is an alias for the root URL, which typically serves index.html.
  'index.html',
  'logo-gitty-mag.png',
  'logo-gitty-mag-creator.png'
];

// The 'install' event is fired when the service worker is first installed.
self.addEventListener('install', event => {
  // We use event.waitUntil to ensure the service worker doesn't move on
  // from the installing phase until the promise passed to it has resolved.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // Add all the assets we want to cache to the opened cache.
        return cache.addAll(urlsToCache);
      })
  );
});

// The 'fetch' event is fired for every network request made by the page.
self.addEventListener('fetch', event => {
  event.respondWith(
    // We look for a matching request in the cache.
    caches.match(event.request)
      .then(response => {
        // If a response is found in the cache, we return it.
        if (response) {
          return response;
        }
        // If the request is not in the cache, we fetch it from the network.
        return fetch(event.request);
      }
    )
  );
});
