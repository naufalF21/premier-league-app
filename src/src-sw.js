import { StaleWhileRevalidate, NetworkFirst } from 'workbox-strategies';
import { registerRoute } from 'workbox-routing';
import { precacheAndRoute } from 'workbox-precaching';
import { skipWaiting, clientsClaim } from 'workbox-core';

skipWaiting();
clientsClaim();

registerRoute(
	new RegExp('https://api\\.football-data\\.org/v2/'),
	new NetworkFirst({
		cacheName: 'api',
	})
);

registerRoute(
	new RegExp('/src/.*\\.html'),
	new StaleWhileRevalidate({
		cacheName: 'fetch',
	})
);

self.addEventListener('push', (event) => {
	let body;
	if (event.data) {
		body = event.data.text();
	} else {
		body = 'Push message no payload';
	}
	var options = {
		body: body,
		vibrate: [100, 50, 100],
		data: {
			dateOfArrival: Date.now(),
			primaryKey: 1,
		},
	};
	event.waitUntil(
		self.registration.showNotification('Push Notification', options)
	);
});

precacheAndRoute(self.__precacheManifest || [], {
	// Ignore all URL parameters.
	ignoreURLParametersMatching: [/.*/],
});
precacheAndRoute(self.__WB_MANIFEST);
