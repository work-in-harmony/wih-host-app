// firebase-messaging-sw.js

importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyAkoEma7pfnSLO80njh6Z4TKRv6wq8UPpk",
  authDomain: "wih-videocall-service.firebaseapp.com",
  projectId: "wih-videocall-service",
  messagingSenderId: "1016242551603",
  appId: "1:1016242551603:web:d416e400ae8b18db8b5c46",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);

  const { title, body } = payload.notification;
  self.registration.showNotification(title, {
    body,
    icon: "/logo.png", // optional
  });
});
