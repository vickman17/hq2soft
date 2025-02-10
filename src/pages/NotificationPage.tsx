import React, { useEffect, useState } from "react";
import { IonPage, IonContent, IonHeader } from "@ionic/react";
import Header from "../components/Header";
import style from "./styles/Notification.module.css";

const NotificationPage: React.FC = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [expandedNotificationIndex, setExpandedNotificationIndex] = useState<number | null>(null);
  const empty = "/assets/empty.png";

  useEffect(() => {
    const openDB = (): Promise<IDBDatabase> => {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open("notificationsDB", 1);

        request.onupgradeneeded = (event) => {
          const db = (event.target as IDBRequest).result as IDBDatabase;
          if (!db.objectStoreNames.contains("notifications")) {
            db.createObjectStore("notifications", { keyPath: "timestamp" });
          }
        };

        request.onsuccess = (event) => {
          const db = (event.target as IDBRequest).result as IDBDatabase;
          resolve(db);
        };

        request.onerror = () => {
          reject("Failed to open IndexedDB");
        };
      });
    };

    const fetchNotifications = async () => {
      try {
        const db = await openDB();
        const transaction = db.transaction("notifications", "readonly");
        const store = transaction.objectStore("notifications");
        const fetchedNotifications: any[] = [];

        store.openCursor().onsuccess = (event) => {
          const cursor = (event.target as IDBRequest).result as IDBCursorWithValue;
          if (cursor) {
            fetchedNotifications.push(cursor.value);
            cursor.continue();
          } else {
            const sortedNotifications = fetchedNotifications.sort((a, b) => b.timestamp - a.timestamp);
            setNotifications(sortedNotifications);
          }
        };
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const toggleNotification = (index: number) => {
    setExpandedNotificationIndex(index === expandedNotificationIndex ? null : index);
  };

  const truncateMessage = (message: string, maxLength: number): string => {
    return message.length > maxLength ? `${message.substring(0, maxLength)}...` : message;
  };

  return (
    <IonPage>
      <IonHeader className={style.header}>
        <div className={style.head} style={{color: "var(--ion-company-wood)"}}>Notification</div>
      </IonHeader>
      <IonContent className={style.content}>
        <div className={style.notificationList}>
          <ul className={style.ul}>
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <li key={index} className={style.notificationItem} onClick={() => toggleNotification(index)}>
                  <button
                    className={style.notificationTitle}
                    onClick={() => toggleNotification(index)}
                  >
                    {notification.notification.title}
                  </button>
                  <div className={style.notificationDetails}>
                    <p>
                      {expandedNotificationIndex === index
                        ? notification.notification.body // Show full message when expanded
                        : truncateMessage(notification.notification.body, 50)} {/* Show truncated message initially */}
                    </p>
                    {expandedNotificationIndex === index && (
                      <small>
                        {new Date(notification.timestamp).toLocaleString()}
                      </small>
                    )}
                  </div>
                </li>
              ))
            ) : (
              <div style={{color: "grey", textAlign: "center"}}>
                <img src={empty} />

                <div>
                  No notification
                </div>
              </div>
            )}
          </ul>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default NotificationPage;
