
// Nome do cache
const CACHE_NAME = 'jph-contract-cache-v1';

// Lista de arquivos para cache inicial
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/lovable-uploads/340c9b38-0cac-4c58-a897-54ee0dd2412b.png', // Assinatura
  '/lovable-uploads/d8c57a49-926b-4fd9-bae2-9e73c7385732.png'  // Logo
];

// Instalação do Service Worker e cache de recursos iniciais
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Estratégia de cache: Network First, fallback para cache
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Se a resposta for válida, armazene em cache
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
        }
        return response;
      })
      .catch(() => {
        // Se falhar a rede, tente o cache
        return caches.match(event.request);
      })
  );
});

// Limpeza de caches antigos quando o SW é atualizado
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
