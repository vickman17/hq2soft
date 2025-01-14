// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyBWtlmXELswMiorT5_guBd-qDEQZezfmMA",
  authDomain: "hq2-soft.firebaseapp.com",
  projectId: "hq2-soft",
  storageBucket: "hq2-soft.firebasestorage.app",
  messagingSenderId: "1017953702184",
  appId: "1:1017953702184:web:c7326c54d22b432db6801d",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Messaging
const messaging = firebase.messaging();

// Listen for background messages
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
  const { title, body } = payload.notification;
  self.registration.showNotification(title, {
    body,
    icon: '/firebase-logo.png',
  });
});
