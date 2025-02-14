import React, { useEffect, useState } from 'react';
import { IonApp, IonRouterOutlet, setupIonicReact, useIonRouter, useIonViewWillEnter } from '@ionic/react';
import { Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
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
import { messaging, getToken } from './firebase/firebaseConfig';
import Security from "./pages/Security";
import Account from './pages/Account';
import SplashScreen from "./components/SplashScreen";
import { PluginListenerHandle } from '@capacitor/core';
import OfflineBanner from "./components/OfflineBanner";


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
import DataPrivacy from './pages/DataPrivacy';
import {useHistory} from 'react-router';
import { App as CapacitorApp} from '@capacitor/app';

import Chat from "./pages/Chat";
import linkAccount from './pages/LinkAccount';
import SlidingCard from './components/Sliding';
import TermsOfService from './pages/TermsOfService';
import UpdateAccount from './pages/UpdateAccount';
import Support from './pages/Support';

setupIonicReact();

const App: React.FC = () => {

  // const requestPushNotificationPermission = async () => {
  //   try {
  //     const currentToken = await getToken(messaging, {
  //       vapidKey: "BKhchly4Dnm0NHV8rBdm1YIwuXI8A0IRAkkhTwO2sjByFskp4-Qef3UWIocHnu_uNjJ2pb4DLV3ZFOzv1HNOohQ" // Get this key from Firebase Console > Cloud Messaging > Web Push certificates
  //     });
  
  //     if (currentToken) {
  //       console.log("FCM Token:", currentToken); // Send this token to your server for sending notifications
  //       // Save the token in the database or local storage
  //     } else {
  //       console.log("No registration token available.");
  //     }
  //   } catch (error) {
  //     console.error("Error getting FCM token:", error);
  //   }
  // };
  
  // // Call this function when the component mounts
  // requestPushNotificationPermission();


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
  const pagesWithBottomNav = ['/dashboard', '/inbox', '/notificationpage', '/setting'];

  useEffect(() => {
    document.body.style.fontFamily = 'Quicksand, sans-serif';
  }, []);

  const history = useHistory();
  const ionRouter = useIonRouter();

  useEffect(() => {
    const setupBackButtonListener = async () => {
      const backButtonListener = await CapacitorApp.addListener("backButton", () => {
        if (!ionRouter.canGoBack()) {
          CapacitorApp.exitApp(); // Exit app if no previous page
        } else {
          history.goBack(); // Go back to the previous page
        }
      });
  
      return backButtonListener;
    };
  
    let listenerHandle: PluginListenerHandle | null = null;
    setupBackButtonListener().then(handle => listenerHandle = handle);
  
    return () => {
      if (listenerHandle) {
        listenerHandle.remove();
      }
    };
  }, [history, ionRouter]);
  

  const [showSplash, setShowSplash] = useState(true);

  return (
    <IonApp>
       {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
      <IonRouterOutlet>
            <Route exact path="/" component={showOnboarding ? Onboarding : Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/earning" component={Earning} />
            <Route exact path="/inbox" component={Inbox} />
            <Route exact path="/jobs" component={Jobs} />
            <Route exact path="/splash" component={SplashScreen} />
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
            <Route path="/chatpage/:chatRoomId/:jobId" component={ChatPage} />
            <Route exact path="/chat" component={Chat} />
            <Route exact path="/linkaccount" component={linkAccount} />
            <Route exact path="/withdrawal" component={Withdrawal} />
            <Route exact path="/slidingcard" component={SlidingCard} />
            <Route exact path="/assets" component={Assets} />
            <Route exact path="/about" component={About} />
            <Route exact path="/terms" component={TermsOfService} />
            <Route exact path="/dataprivacy" component={DataPrivacy} />
            <Route exact path="/security" component={Security} />
            <Route exact path="/updateaccount" component={UpdateAccount} />
            <Route exact path="/account" component={Account} />
            <Route exact path="/support" component={Support} />
      </IonRouterOutlet>
      )}
      {/* Bottom Nav visibility */}
      {pagesWithBottomNav.includes(location.pathname) && (
        <BottomNav />
      )}
      <OfflineBanner />
    </IonApp>
  );
};

export default App;
