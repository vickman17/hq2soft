importScripts("https://js.pusher.com/beams/service-worker.js");

// Open IndexedDB and create object store if needed
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("notificationsDB", 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      console.log("Opening DB, upgrading schema...");
      if (!db.objectStoreNames.contains("notifications")) {
        db.createObjectStore("notifications", { keyPath: "timestamp" });
      }
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      console.log("DB opened successfully:", db);
      resolve(db);
    };

    request.onerror = (event) => {
      console.error("Error opening IndexedDB:", event);
      reject("Error opening IndexedDB");
    };
  });
}

// Store notification in IndexedDB
function storeNotification(notificationData) {
  openDB().then((db) => {
    const transaction = db.transaction("notifications", "readwrite");
    const store = transaction.objectStore("notifications");

    // If the notification data doesn't contain a timestamp, create one
    const notificationWithTimestamp = {
      ...notificationData,
      timestamp: notificationData.timestamp || Date.now(), // Create timestamp if not present
    };

    console.log("Storing notification:", notificationWithTimestamp);

    // Add notification data to the object store
    const request = store.put(notificationWithTimestamp); // 'timestamp' is the key

    request.onsuccess = () => {
      console.log("Notification successfully stored in IndexedDB");
    };

    request.onerror = (err) => {
      console.error("Error storing notification in IndexedDB:", err);
    };
  }).catch((err) => {
    console.error("Error opening DB or storing notification:", err);
  });
}

// Fetch unread notifications count from IndexedDB
function getUnreadNotificationCount() {
  return new Promise((resolve, reject) => {
    openDB().then((db) => {
      const transaction = db.transaction("notifications", "readonly");
      const store = transaction.objectStore("notifications");
      const request = store.getAll(); // Get all notifications

      request.onsuccess = (event) => {
        const notifications = event.target.result;
        const unreadCount = notifications.filter(notification => !notification.read).length; // Assuming 'read' field exists
        resolve(unreadCount);
      };

      request.onerror = (err) => {
        console.error("Error fetching notifications from IndexedDB:", err);
        reject("Error fetching notifications from IndexedDB");
      };
    }).catch((err) => {
      console.error("Error opening DB:", err);
      reject("Error opening DB");
    });
  });
}

// Push event listener to handle incoming push messages
self.addEventListener('push', (event) => {
  console.log("Push event received:", event);

  if (event.data) {
    const notificationData = event.data.json();
    console.log("Parsed notification data:", notificationData);

    // Store notification in IndexedDB
    storeNotification(notificationData);

    // Customize the notification options
    const options = {
      body: notificationData.body,
      icon: '/assets/icon.png',
      badge: '/assets/icon.png', // Optional: icon for the notification badge
      data: notificationData, // Optional: store additional data with the notification
    };

    // Show the notification
    event.waitUntil(self.registration.showNotification(notificationData.title, options));
  } else {
    console.warn("No data received in push event");
  }
});

// Notification click event listener
self.addEventListener('notificationclick', (event) => {
  console.log("Notification clicked:", event);
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/notificationpage') // Open your desired path in your app
  );
});

// Activate event listener
self.addEventListener('activate', (event) => {
  console.log("Service Worker activated");
  event.waitUntil(self.clients.claim());
});

// Handle postMessage from the frontend to fetch unread count
self.addEventListener('message', (event) => {
  if (event.data === 'getUnreadCount') {
    getUnreadNotificationCount().then((count) => {
      // Send the unread count back to the frontend
      event.ports[0].postMessage(count);
      console.log("Unread count sent to frontend:", count);

    }).catch((error) => {
      event.ports[0].postMessage(0); // Return 0 in case of error
      console.error("Error fetching unread count:", error);
    });
  }
});
