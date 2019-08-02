

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDEcYgPEbASS0acjP1mnkADyXEY-vFSNtU",
    authDomain: "vocal-inquiry-248305.firebaseapp.com",
    databaseURL: "https://vocal-inquiry-248305.firebaseio.com",
    projectId: "vocal-inquiry-248305",
    storageBucket: "",
    messagingSenderId: "112997265358",
    appId: "1:112997265358:web:4a779011f6e7a469"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Retrieve Firebase Messaging object.
const messaging = firebase.messaging();

// Add the public key generated from the console here.
messaging.usePublicVapidKey("BCypzzCdsj0oi2DNgBCLmBPNL9-IJwxl7aCk5giDH-a7a87J1bw-mJ_mgxUZfZdr4tCQDHGZpXpdkHAVNKX-Hvk");

Notification.requestPermission().then(function (permission) {
    if (permission === 'granted') {
        console.log('Notification permission granted.');
    } else {
        console.log('Unable to get permission to notify.');
    }
});


messaging.getToken().then(function (currentToken) {
    console.log(currentToken);
    document.querySelector('.token').innerHTML = currentToken;
}).catch(function (err) {
});

messaging.onTokenRefresh(function() {
    messaging.getToken().then(function(refreshedToken) {
        document.querySelector('.token').innerHTML = refreshedToken;
    }).catch(function(err) {
    });
});



messaging.onMessage(function (payload) {
    console.log(payload);
    showNotification(payload.notification);
});

function showNotification(body) {
    const n = new Notification(
        body.title,
        {
            body: body.body,
            tag: body.tag,
            icon: body.icon,
            data: {
                url: 'https://www.baidu.com'
            },
            sticky: true,
        }
    );
}