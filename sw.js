self.addEventListener('install', function(event) {
  console.log('Service Worker installed');
  // 调用 skipWaiting 来让 service worker 立即激活
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  console.log('Service Worker activated');
  // 清除旧缓存，只保留最新版本
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          // 删除除了当前版本的缓存之外的所有缓存
          return cacheName !== 'dynamic-cache';
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log(`Fetching resource: ${event.request.url}`);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // 查找缓存中的响应
      if (response) {
        return response;
      }

      // 如果缓存中没有，从网络获取数据
      return fetch(event.request).then(function(networkResponse) {
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }

        // 克隆响应以用于缓存
        let responseToCache = networkResponse.clone();
        caches.open('dynamic-cache').then(function(cache) {
          // 将响应添加到缓存中
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      });
    })
  );
});