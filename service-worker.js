self.addEventListener('install',(event)=>{
     console.log('ServiceWorker install success') //catch the event
      event.waitUntil(caches.open('static').then((cache)=>{
        cache.addAll(['offline.html','src/style.css']) // stor flie in cache memory 
      }))
})

// What it does:
// install event is triggered when the service worker is being installed.
// event.waitUntil(...) ensures the service worker won't finish installing until the caching is done.
// caches.open('static') opens (or creates) a cache storage with the name 'static'.
// cache.addAll([...]) stores specified files (offline.html and a CSS file) into that cache.


self.addEventListener('fetch',(event)=>{
    console.log('fetch',event)
    const url=event.request.url;
    console.log(url)

    event.respondWith(
        caches.match(event.request).then((response)=>{
            return response || fetch(event.request).catch(()=>{
                if(event.request.mode==='navigate'){
                    return caches.match('/offline.html')
                }
            })
        })
    )
})

// What it does:
// fetch event is triggered every time the browser makes a request (like loading an image, CSS, or page).
// caches.match(event.request) checks if the requested file is already in the cache.
// ✅ If found → return it.
// ❌ If not → try fetch() from the network.
// If fetch() fails (like when offline), and the request was a navigation request (i.e., user trying to visit a page), then serve offline.html from cache.

self.addEventListener('push',(event)=>{
    const pushData=event.data.json();

    const title=pushData.title ||'Default Title';
    const options={
        body:pushData.body || 'Default body',
        icon:pushData.icon
    }
   // event.waitUntil(self.registration.showNotification(title,options))
     if (Notification.permission === 'granted') {
        event.waitUntil(self.registration.showNotification(title, options));
    } else {
        console.warn('Notification permission not granted.');
    }
})