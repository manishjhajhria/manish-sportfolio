const CACHE_NAME = 'moi-portfolio-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/css/reset.css',
  '/css/variables.css',
  '/css/theme.css',
  '/css/typography.css',
  '/css/layout/grid.css',
  '/css/layout/navbar.css',
  '/css/layout/footer.css',
  '/css/components/buttons.css',
  '/css/components/cards.css',
  '/css/components/timeline.css',
  '/css/components/contact.css',
  '/css/sections/hero.css',
  '/css/sections/skills.css',
  '/css/sections/projects.css',
  '/js/data.js',
  '/js/lang.js',
  '/js/theme.js',
  '/js/three-scene.js',
  '/js/sections/hero.js',
  '/js/sections/timeline.js',
  '/js/sections/skills.js',
  '/js/sections/projects.js',
  '/js/sections/contact.js',
  '/js/sections/certs-testimonials.js',
  '/js/app.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cache if found, else fetch from network
        return response || fetch(event.request);
      })
  );
});
