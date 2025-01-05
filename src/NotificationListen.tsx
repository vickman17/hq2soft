import { useEffect } from "react";
import { useNotifications } from "./context/NotificationProvider";
import * as PusherPushNotifications from "@pusher/push-notifications-web";

const NotificationListener: React.FC = () => {
  const { addNotification } = useNotifications();

  useEffect(() => {
    // Initialize Pusher Beams client with your instance ID
    const beamsClient = new PusherPushNotifications.Client({
      instanceId: 'fef21ad9-18fb-4c2a-9bac-64eb6f197664', // Replace with your actual instance ID
    });

    // Start the Pusher Beams client
    beamsClient.start()
      .then(() => {
        console.log("Pusher Beams client started");

        // Subscribe to a device interest/topic
        beamsClient.addDeviceInterest('debug-hello') // Replace 'debug-hello' with your desired topic
          .then(() => {
            console.log('Successfully subscribed to topic: all-user');
          })
          .catch((err: Error) => {
            console.error('Error subscribing to topic:', err.message);
          });
      })
      .catch((err: Error) => {
        console.error('Error starting Pusher Beams:', err.message);
      });

    // Handle notification received (Notification events are delivered by the browser)
    // If you're using a service worker for notifications, handle the push events in the service worker

    return () => {
      // Clean up and stop the client when the component unmounts
      beamsClient.stop()
        .then(() => {
          console.log('Pusher Beams client stopped');
        })
        .catch((err: Error) => {
          console.error('Error stopping Pusher Beams client:', err.message);
        });
    };
  }, [addNotification]);

  return null;
};

export default NotificationListener;
