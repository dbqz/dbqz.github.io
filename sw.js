// sw.js
self.addEventListener('install', function(event) {
  // 安装阶段可以做一些初始化工作，但这里不指定任何静态资源
  console.log('Service Worker installed');
});

self.addEventListener('activate', function(event) {
  // 激活阶段可以清理旧的缓存
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName !== 'dynamic-cache';
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  // 监听每一个fetch事件，并尝试从缓存中获取资源
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // 如果缓存中有资源，则直接返回
      if (response) {
        return response;
      }

      // 否则，从网络获取，并将响应存储到缓存中
      return fetch(event.request).then(function(networkResponse) {
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }

        // 克隆响应，以便将克隆后的响应存储到缓存中
        var responseToCache = networkResponse.clone();
        caches.open('dynamic-cache').then(function(cache) {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      });
    })
  );
});