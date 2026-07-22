// Minimal service worker: enables notifications to be shown/managed even when
// the tab is in the background. Note: truly waking up a fully-closed browser
// requires a real push server sending messages — this static site doesn't have
// one, so this handles local/foreground-triggered notifications and is ready
// for real push messages to be wired in later if a backend is ever added.

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Placeholder for real push messages, if a push server is added later
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Сповіщення';
  const options = {
    body: data.body || '',
    icon: 'banner.jpg',
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clientList) => {
      if (clientList.length > 0) {
        return clientList[0].focus();
      }
      return self.clients.openWindow('./');
    })
  );
});
