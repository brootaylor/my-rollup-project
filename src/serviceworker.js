const version = '{{version}}';
const staticCacheName = 'staticfiles__' + version;
const imageCacheName = 'images';
const pagesCacheName = 'pages';
const cacheList = [
	staticCacheName,
	imageCacheName,
	pagesCacheName
];
const offlinePageGlobal = './offline/index.html';
const offlinePages = [
	'index.html'
];

function updateStaticCache() {
	return caches.open(staticCacheName).then(staticCache => {
		// These files don't block installation
		staticCache.addAll([
			'./static/images/logo.svg'
		].concat(offlinePages));
		// These files must be cached for installation
		return staticCache.addAll([
			// Static assets to use offline...
			'./scripts/main.js',
			// Offline page document...
			offlinePageGlobal
		]);
	});
}

function deleteOldCaches() {
	return caches.keys().then(keys => {
		return Promise.all(keys
			.filter(key => !cacheList.includes(key))
			.map(key => caches.delete(key))
		);
	});
}

function trimCache(cacheName, maxItems) {
	caches.open(cacheName).then(cache => {
		cache.keys().then(keys => {
			if (keys.length > maxItems) {
				cache.delete(keys[0]).then(trimCache(cacheName, maxItems));
			}
		});
	});
}

addEventListener('install', event => {
	// Update static cache
	event.waitUntil(
		updateStaticCache().then(() => {
			self.skipWaiting();
		})
	);
});

addEventListener('activate', event => {
	// Delete old caches
	event.waitUntil(
		deleteOldCaches().then(() => {
			self.clients.claim();
		})
	);
});

addEventListener('message', event => {
	// Trim size of caches on page load
	if (event.data.command === 'trimCaches') {
		trimCache(pagesCacheName, 25);
		trimCache(imageCacheName, 50);
	}
});

addEventListener('fetch', event => {
	const {request} = event;
	const url = new URL(request.url);

	// Ignore non-GET requests
	if (request.method !== 'GET') {
		return;
	}

	// HTML page requests (defer to network)
	if (request.headers.get('Accept').includes('text/html')) {
		event.respondWith(
			fetch(request).then(fetchResponse => {
				// Online strategy
				// Add named offline pages to static cache
				// Add other pages to pages cache
				// Fetch page from network
				const copy = fetchResponse.clone();

				if (offlinePages.includes(url.pathname)) {
					try {
						event.waitUntil(
							caches.open(staticCacheName).then(staticCache => {
								staticCache.put(request, copy);
							})
						);
					} catch (error) {
						console.error(error);
					}
				} else {
					try {
						event.waitUntil(
							caches.open(pagesCacheName).then(pagesCache => {
								return pagesCache.put(request, copy);
							})
						);
					} catch (error) {
						console.error(error);
					}
				}
				return fetchResponse;
			}).catch(fetchError => {
				// Offline strategy
				console.error(fetchError);

				// If file is cached serve that, else show cached offline page
				return caches.match(request).then(cacheResponse => {
					return cacheResponse || caches.match(offlinePageGlobal);
				});
			})
		);
		return;
	}

	// Other file requests (defer to cache)
	event.respondWith(
		// If file is cached, serve that
		caches.match(request).then(cacheResponse => {
			return cacheResponse || fetch(request).then(fetchResponse => {
				// Online strategy
				// Add images to cache
				// Fetch file from network
				if (request.url.match(/\.(gif|jpe?g|png|svg|webp)/)) {
					const copy = fetchResponse.clone();
					try {
						event.waitUntil(
							caches.open(imageCacheName).then(imageCache => {
								imageCache.put(request, copy);
							})
						);
					} catch (error) {
						console.error(error);
					}
				}
				return fetchResponse;
			}).catch(fetchError => {
				console.error(fetchError);
			});
		})
	);
});
