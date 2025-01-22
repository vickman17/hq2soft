import React, { useEffect, useState } from 'react';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './components/Profile';
import Earning from './pages/Earning';
import Jobs from './pages/Jobs';
import Request from './pages/Request';
import Setting from './pages/Setting';
import EditProfile from './pages/EditProfile';
import CompleteProfile from './pages/CompleteProfile';
import FaceEnroll from './pages/FaceEnroll';
import BottomNav from './components/BottomNav';
import Onboarding from './pages/Onboarding';
import Inbox from './pages/Inbox';
import Finish from './pages/Finish';
import ResetPassword from './pages/ResetPassword';
import ConfirmEmail from './pages/ConfirmEmail';
import OtpPage from './pages/OtpPage';
import NotificationPage from './pages/NotificationPage';
//import { messaging } from '../firebase/firebaseConfig';
import { requestPermission, onMessageListener } from "./firebase/firebaseMessaging";
import { getMessaging, onMessage } from "firebase/messaging";
import { firebaseApp } from "./firebase/firebaseConfig"; 

/* CSS imports */
import '@ionic/react/css/core.css';
import './App.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '../src/theme/variables.css';
import ChatPage from './pages/ChatPage';
import Withdrawal from './pages/Withdrawal';
import Assets from "./pages/Assets";
import About from "./pages/About";

import Chat from "./pages/Chat";
import linkAccount from './pages/LinkAccount';
import SlidingCard from './components/Sliding';

setupIonicReact();

const App: React.FC = () => {


  useEffect(() => {
    const messaging = getMessaging(firebaseApp);

    // Request permission for notifications
    const requestPermission = async () => {
      try {
        const token = await Notification.requestPermission();
        if (token === "granted") {
          console.log("Notification permission granted.");
        } else {
          console.log("Notification permission denied.");
        }
      } catch (error) {
        console.error("Error requesting notification permission: ", error);
      }
    };

    requestPermission();

    // Listen for messages
    onMessage(messaging, (payload) => {
      console.log("Message received: ", payload);
    });
  }, []);

  // useEffect(() => {
  //   // Request permission for notifications
  //   const requestPermission = async () => {
  //     try {
  //       const permission = await Notification.requestPermission();
  //       if (permission === 'granted') {
  //         // Get the FCM token
  //         const token = await messaging.getToken({
  //           vapidKey: 'BKhchly4Dnm0NHV8rBdm1YIwuXI8A0IRAkkhTwO2sjByFskp4-Qef3UWIocHnu_uNjJ2pb4DLV3ZFOzv1HNOohQ' // Replace with your actual VAPID key
  //         });
  //         console.log('Token:', token);
  //       }
  //     } catch (error) {
  //       console.error('Error requesting notification permission:', error);
  //     }
  //   };

  //   // Register for messages while the app is in the foreground
  //   const handleMessages = () => {
  //     messaging.onMessage((payload) => {
  //       console.log('Message received. ', payload);
  //       // Customize this part based on how you want to handle the notification
  //     });
  //   };

  //   requestPermission();
  //   handleMessages(); // Listen for messages

  // }, []);


  const [showOnboarding, setShowOnboarding] = useState<boolean>(localStorage.getItem('hasSeenOnboarding') === null);

  const location = useLocation();
  const pagesWithBottomNav = ['/dashboard', '/inbox', '/setting'];

  useEffect(() => {
    document.body.style.fontFamily = 'Quicksand, sans-serif';
  }, []);

  return (
    <IonApp>
      <IonRouterOutlet>
            <Route exact path="/" component={showOnboarding ? Onboarding : Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/earning" component={Earning} />
            <Route exact path="/inbox" component={Inbox} />
            <Route exact path="/jobs" component={Jobs} />
            <Route exact path="/request" component={Request} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/setting" component={Setting} />
            <Route exact path="/editprofile" component={EditProfile} />
            <Route exact path="/completeprofile" component={CompleteProfile} />
            <Route exact path="/finish" component={Finish} />
            <Route exact path="/faceenroll" component={FaceEnroll} />
            <Route exact path="/resetpassword" component={ResetPassword} />
            <Route exact path="/confirmemail" component={ConfirmEmail} />
            <Route exact path="/otppage" component={OtpPage} />
            <Route exact path="/notificationpage" component={NotificationPage} />
            <Route path="/chatpage/:clientId/:chatRoomId/:jobId" component={ChatPage} />
            <Route exact path="/chat" component={Chat} />
            <Route exact path="/linkaccount" component={linkAccount} />
            <Route exact path="/withdrawal" component={Withdrawal} />
            <Route exact path="/slidingcard" component={SlidingCard} />
            <Route exact path="/assets" component={Assets} />
            <Route exact path="/about" component={About} />
      </IonRouterOutlet>
      {/* Bottom Nav visibility */}
      {pagesWithBottomNav.includes(location.pathname) && (
        <BottomNav />
      )}
    </IonApp>
  );
};

export default App;
