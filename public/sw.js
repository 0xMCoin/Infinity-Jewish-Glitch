// Service Worker para otimizações de performance e cache
const CACHE_NAME = 'cyber-wolf-v1';
const STATIC_CACHE = 'cyber-wolf-static-v1';
const DYNAMIC_CACHE = 'cyber-wolf-dynamic-v1';

// Recursos para cache estático
const STATIC_ASSETS = [
  '/',
  '/globals.css',
  '/images/logo.png',
  '/images/logo-192.png',
  '/images/logo-512.png',
  '/videos/rat_meme1.mp4',
  '/videos/rat_meme2.mp4',
  '/manifest.json'
];

// Recursos para cache dinâmico (removidas URLs externas para evitar CORS)
const DYNAMIC_ASSETS = [
  '/api/',
  '/_next/static/'
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => {
        return cache.addAll(STATIC_ASSETS).catch((error) => {
          console.warn('Falha ao cachear alguns recursos estáticos:', error);
        });
      }),
      caches.open(DYNAMIC_CACHE)
    ]).then(() => {
      return self.skipWaiting();
    })
  );
});

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Interceptação de requisições
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Estratégia de cache para diferentes tipos de recursos
  if (request.method === 'GET') {
    // Cache para recursos estáticos
    if (STATIC_ASSETS.some(asset => url.pathname === asset)) {
      event.respondWith(
        caches.match(request).then((response) => {
          return response || fetch(request).then((fetchResponse) => {
            return caches.open(STATIC_CACHE).then((cache) => {
              cache.put(request, fetchResponse.clone());
              return fetchResponse;
            });
          });
        })
      );
      return;
    }

    // Cache para recursos dinâmicos
    if (DYNAMIC_ASSETS.some(asset => url.href.startsWith(asset))) {
      event.respondWith(
        caches.match(request).then((response) => {
          return response || fetch(request).then((fetchResponse) => {
            return caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(request, fetchResponse.clone());
              return fetchResponse;
            });
          });
        })
      );
      return;
    }

    // Estratégia network-first para APIs
    if (url.pathname.startsWith('/api/')) {
      event.respondWith(
        fetch(request).then((response) => {
          if (response.ok) {
            return caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(request, response.clone());
              return response;
            });
          }
          return response;
        }).catch(() => {
          return caches.match(request);
        })
      );
      return;
    }

    // Estratégia cache-first para outros recursos
    event.respondWith(
      caches.match(request).then((response) => {
        return response || fetch(request).then((fetchResponse) => {
          if (fetchResponse.ok) {
            return caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(request, fetchResponse.clone());
              return fetchResponse;
            });
          }
          return fetchResponse;
        });
      })
    );
  }
});

// Limpeza automática de cache antigo
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAN_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  }
});

// Otimizações de performance
self.addEventListener('fetch', (event) => {
  // Prefetch de recursos críticos
  if (event.request.destination === 'video' || event.request.destination === 'image') {
    event.waitUntil(
      caches.open(DYNAMIC_CACHE).then((cache) => {
        return fetch(event.request).then((response) => {
          if (response.ok) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    );
  }
}); 