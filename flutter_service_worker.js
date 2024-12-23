'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "e3ddaae70d8a44f225951a84bc25044e",
"assets/AssetManifest.bin.json": "5b036c4875135cea3889e99ea74ac3d3",
"assets/AssetManifest.json": "9bebde46385f397daf234f026e808c6a",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "4a086d0c7f58bd1fdcbda3d6d45ecc11",
"assets/images/all.jpg": "295a0cf3aa5d7f25ead9575c57da0422",
"assets/images/beauty.jpg": "e1d5a434f6d8f551f6c41dac95fe92e2",
"assets/images/beauty1.jpg": "a480c492abf062034293faafefc26032",
"assets/images/beauty2.jpg": "a93900acfb551160215277330a24dcd7",
"assets/images/beauty3.jpg": "7d89fdac374ecdcf1edd993a81ffd87b",
"assets/images/beauty4.jpg": "c8a1673037b7a0fd86a1c8f4dec1cb99",
"assets/images/Cosplay1.jpg": "164abc59530a5f35b7fcbf58c639a51e",
"assets/images/Cosplay2.jpg": "b38f7851a30b63b4aa759190a2de9c34",
"assets/images/Cosplay3.jpg": "3c57a8b99fbcd4927503c179a31f230a",
"assets/images/Cosplay4.jpg": "20527634593556d946d4d75d7bf13678",
"assets/images/Cosplay5.jpg": "e8fe984545250100a763e6040a518c34",
"assets/images/Cosplay6.jpg": "69ccdf2826fec61c33871f830bf1f34f",
"assets/images/icon.png": "03febbc6484a00562c1ff310adefc170",
"assets/images/image1.png": "fb7aac6adc9cdfadb1e4de1fc129236f",
"assets/images/images.rar": "2fc55b461b90940ac708406d9d533fd4",
"assets/images/man1.jpg": "e06cab9b20d853b91134aaf423dec63a",
"assets/images/man2.jpg": "7afca07305d271f68c1490b3350d6b57",
"assets/images/man3.jpg": "aae7344ee3c03aee103a242a3cceb185",
"assets/images/man4.jpg": "8b8d9e7cbb14379862f46fe8f43377c8",
"assets/images/national1.jpg": "836e301b4a8bb9a424b5037df6d90784",
"assets/images/national2.jpg": "9c737da4884eea12a6204c2707270ccf",
"assets/images/national3.png": "e81130b038e41c61f6f1b45834e2ec57",
"assets/images/national4.png": "65da608dee7f6a93b8c0b0ce91fe0c29",
"assets/images/profile3.jpg": "214dbf3fe501409ca86927ffcdb42332",
"assets/images/profile4.jpg": "2df572e2f9409574f5775795310c65c1",
"assets/images/profile5.jpg": "e67804a05cf0202ac918fe41a26ed9b2",
"assets/images/shoes.png": "c4b3d0079a5dc3a1f7a2d59413adfaac",
"assets/images/slider.png": "6fa5985344939c4b1cc565f26f3c17ff",
"assets/images/slider1.png": "5613e94375e2dd50d6aa206bbe034a8f",
"assets/images/slider2.png": "c15cd42f4ce8e0709dc9dfdf665beae5",
"assets/NOTICES": "428f2bf9221f4b8009ee54b3692887ce",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/shaders/ink_sparkle.frag": "4096b5150bac93c41cbc9b45276bd90f",
"canvaskit/canvaskit.js": "eb8797020acdbdf96a12fb0405582c1b",
"canvaskit/canvaskit.wasm": "73584c1a3367e3eaf757647a8f5c5989",
"canvaskit/chromium/canvaskit.js": "0ae8bbcc58155679458a0f7a00f66873",
"canvaskit/chromium/canvaskit.wasm": "143af6ff368f9cd21c863bfa4274c406",
"canvaskit/skwasm.js": "87063acf45c5e1ab9565dcf06b0c18b8",
"canvaskit/skwasm.wasm": "2fc47c0a0c3c7af8542b601634fe9674",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "59a12ab9d00ae8f8096fffc417b6e84f",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "53e83464c271d8769e9c585dbdd98a81",
"/": "53e83464c271d8769e9c585dbdd98a81",
"main.dart.js": "8f2caee644446a53e1bf3146e32a4d6d",
"manifest.json": "e1f8829127711a2871169d078ea684b5",
"version.json": "6f5731ae7166c79dbc55c49ca4a7f9ff"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
