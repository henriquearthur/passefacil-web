'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "/assets/LICENSE": "ffa0cd27d4a89004397835065964fa51",
"/assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"/assets/AssetManifest.json": "3ff076c105a1cebfcd3c01b1a138c75b",
"/assets/FontManifest.json": "580ff1a5d08679ded8fcf5c6848cece7",
"/assets/google_fonts/Montserrat-Medium.ttf": "c8b6e083af3f94009801989c3739425e",
"/assets/google_fonts/Montserrat-Light.ttf": "409c7f79a42e56c785f50ed37535f0be",
"/assets/google_fonts/Montserrat-Regular.ttf": "ee6539921d713482b8ccd4d0d23961bb",
"/icons/Icon-192.png": "812fe213f59c46c85764f5fcd890e4d4",
"/icons/Icon-512.png": "fc2d343b9cd48508fae73beb4c8d4350",
"/manifest.json": "441c3fa01f33de76e709598b213a088f",
"/index.html": "6353ce80b106d4abb0091214a69390a0",
"/main.dart.js": "e1db3a5b1384a8d0866662ad53a8e598"
};

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheName) {
      return caches.delete(cacheName);
    }).then(function (_) {
      return caches.open(CACHE_NAME);
    }).then(function (cache) {
      return cache.addAll(Object.keys(RESOURCES));
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request, {
          credentials: 'include'
        });
      })
  );
});
