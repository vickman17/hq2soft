// // src/firebase-config.ts
// import firebase from 'firebase/app';  // Import the Firebase app module (without '*')
// import 'firebase/messaging';  // Import the messaging module from Firebase

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBWtlmXELswMiorT5_guBd-qDEQZezfmMA",
//   authDomain: "hq2-soft.firebaseapp.com",
//   projectId: "hq2-soft",
//   storageBucket: "hq2-soft.firebasestorage.app",
//   messagingSenderId: "1017953702184",
//   appId: "1:1017953702184:web:c7326c54d22b432db6801d",
// };

// // Initialize Firebase only once
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);  // Initialize Firebase if not already done
// } else {
//   firebase.app();  // Use the already initialized Firebase app
// }

// // Get Firebase Messaging service
// const messaging = firebase.messaging();  // Access the messaging feature

// export { messaging };  // Export messaging for use in other parts of the app
