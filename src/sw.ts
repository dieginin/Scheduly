import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching"

declare let self: ServiceWorkerGlobalScope

cleanupOutdatedCaches()

precacheAndRoute([
  ...self.__WB_MANIFEST,
  {
    url: "/images/favicon.ico",
    revision: null,
  },
  {
    url: "/images/logo.svg",
    revision: null,
  },
])

self.skipWaiting()
