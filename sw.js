/* English Effect — service worker
   Network first: online thakle shob shomoy notun version dekhabe.
   Offline hole shesh dekha version (ba offline.html) dekhabe.
   Boro change er por VERSION number barale purono cache muche jabe. */
var VERSION = "ee-v2";
var CORE = ["/", "/offline.html", "/assets/css/style.css", "/assets/js/main.js", "/assets/images/logo.png", "/assets/images/icons/icon-192.png"];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(CORE); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return; // forms, fonts, WhatsApp etc. untouched
  e.respondWith(
    fetch(req).then(function (res) {
      if (res && res.ok) { var copy = res.clone(); caches.open(VERSION).then(function (c) { c.put(req, copy); }); }
      return res;
    }).catch(function () {
      return caches.match(req).then(function (hit) {
        return hit || (req.mode === "navigate" ? caches.match("/offline.html") : undefined);
      });
    })
  );
});
