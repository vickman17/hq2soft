// src/firebase-config.ts
import { initializeApp } from "firebase/app";
import { getMessaging, Messaging } from "firebase/messaging";
import { getDatabase } from 'firebase/database';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWtlmXELswMiorT5_guBd-qDEQZezfmMA",
  authDomain: "hq2-soft.firebaseapp.com",
  projectId: "hq2-soft",
  storageBucket: "hq2-soft.firebasestorage.app",
  messagingSenderId: "1017953702184",
  appId: "1:1017953702184:web:c7326c54d22b432db6801d",
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);
// Initialize Firebase Messaging
const messaging: Messaging = getMessaging(firebaseApp);

export { firebaseApp, messaging, database };
