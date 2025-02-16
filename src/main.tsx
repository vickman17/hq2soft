import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
// import firebase from 'firebase/app';
// import 'firebase/messaging';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWtlmXELswMiorT5_guBd-qDEQZezfmMA",
  authDomain: "hq2-soft.firebaseapp.com",
  projectId: "hq2-soft",
  storageBucket: "hq2-soft.firebasestorage.app",
  messagingSenderId: "1017953702184",
  appId: "1:1017953702184:web:c7326c54d22b432db6801d",
};

const Main: React.FC = () => {
  // useEffect(() => {
  //   // Initialize Firebase
  //   if (!firebase.apps.length) {
  //     firebase.initializeApp(firebaseConfig);
  //   } else {
  //     firebase.app(); // Use the existing app
  //   }

  //   const messaging = firebase.messaging();

  //   // Request notification permission and get the token
  //   const requestPermission = async () => {
  //     try {
  //       const permission = await Notification.requestPermission();
  //       if (permission === 'granted') {
  //         const token = await messaging.getToken({
  //           vapidKey: 'BKhchly4Dnm0NHV8rBdm1YIwuXI8A0IRAkkhTwO2sjByFskp4-Qef3UWIocHnu_uNjJ2pb4DLV3ZFOzv1HNOohQ', // Replace with your actual VAPID key
  //         });
  //         console.log('Token:', token);
  //       }
  //     } catch (error) {
  //       console.error('Error requesting notification permission:', error);
  //     }
  //   };

  //   // Register the service worker
  //   const registerServiceWorker = () => {
  //     if ('serviceWorker' in navigator) {
  //       navigator.serviceWorker
  //         .register('/firebase-messaging-sw.js')
  //         .then((registration) => {
  //           console.log('Service Worker registered with scope:', registration.scope);
  //         })
  //         .catch((error) => {
  //           console.error('Service Worker registration failed:', error);
  //         });
  //     }
  //   };

  //   // Run the functions
  //   requestPermission();
  //   registerServiceWorker();
  // }, []);

  return (
    <Router>
      <App />
    </Router>
  );
};

// React app initialization
const container = document.getElementById('root');
const root = createRoot(container!);

root.render(<Main />);
