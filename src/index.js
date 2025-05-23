console.log('js is running')
console.log(navigator.serviceWorker)
// check have serviceWorker
if('serviceWorker' in navigator){
    console.log("serviceWorker is working here")
    //regiter in serviceWorker : that is use for offline works anf file cach in memory
    navigator.serviceWorker.register('service-worker.js',{scope:'/'}).then((registration)=>{
        console.log('ragistration :',registration)
    })

//Registers your service worker located at service-worker.js.
// The { scope: '/' } means this service worker will control all files on the site from the root path (/) down. So it can intercept requests to any file in the app.
// .then(...) runs after successful registration and logs the registration object, which contains details about the status, scope, and active worker.

}else{
    console.log("serviceWorker is not working here")
}

if('Notification' in window){
    Notification.requestPermission().then((permission)=>{
        console.log('Notification Permission',permission)
    })
}