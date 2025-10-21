// Service Worker simplificado para desenvolvimento
const CACHE_NAME = 'יְהוּדִי-v2';
const STATIC_CACHE = 'יְהוּדִי-static-v2';
const DYNAMIC_CACHE = 'יְהוּדִי-dynamic-v2';

// Apenas recursos essenciais para cache (reduzido para desenvolvimento)
const STATIC_ASSETS = [
  '/images/logo.png',
  '/manifest.json'
];

// Cache apenas para recursos pesados
const CACHEABLE_EXTENSIONS = ['.mp4', '.jpg', '.jpeg', '.png', '.gif', '.webp'];

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

// Interceptação de requisições - estratégia network-first para desenvolvimento
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Pular cache em desenvolvimento para localhost
  if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
    return; // Sempre busca da rede em desenvolvimento
  }

  // Cache apenas para recursos pesados (imagens, vídeos)
  if (request.method === 'GET') {
    const hasExtension = CACHEABLE_EXTENSIONS.some(ext => url.pathname.includes(ext));
    
    if (hasExtension || STATIC_ASSETS.some(asset => url.pathname === asset)) {
      event.respondWith(
        // Network-first: sempre tenta da rede primeiro
        fetch(request).then((response) => {
          if (response.ok) {
            // Só cacheia se a resposta for bem-sucedida
            caches.open(STATIC_CACHE).then((cache) => {
              cache.put(request, response.clone());
            });
          }
          return response;
        }).catch(() => {
          // Se falhar, tenta do cache
          return caches.match(request);
        })
      );
    }
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
            // Limpa todos os caches antigos
            return caches.delete(cacheName);
          })
        );
      })
    );
  }
});