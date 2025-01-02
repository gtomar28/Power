// service-worker.js
self.addEventListener('push', function (event) {
    let options = {
        body: event.data.text(), // Message text from the push payload
        icon: 'path/to/icon.png', // Icon for notification
        badge: 'path/to/badge.png', // Badge icon
    };

    event.waitUntil(
        self.registration.showNotification('New Notification', options)
    );
});

// Handle notification clicks (optional)
self.addEventListener('notificationclick', function (event) {
    event.notification.close();

    event.waitUntil(
        clients.openWindow('your-web-app-url') // Open the web app when the user clicks the notification
    );
});
