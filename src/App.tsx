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
import { LocalNotifications, LocalNotification } from '@capacitor/local-notifications';

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

setupIonicReact();

const App: React.FC = () => {

  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const permission = await LocalNotifications.requestPermissions();
    if (permission?.display === "granted") {
      console.log('Notification permission granted');
    } else {
      console.log('Notification permission denied');
    }
  };

  const sendTestNotification = async () => {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Test Notification',
          body: 'This is a test notification sent from your app!',
          id: new Date().getTime(),
          schedule: { at: new Date(Date.now()) }, // Immediate notification
          sound: 'default',
          attachments: [], // Updated to empty array instead of null
          extra: null,
        },
      ],
    });
  };

  useEffect(() => {
    // Notification event listeners
    const handleNotification = (notification: LocalNotification) => {
      console.log('Notification received:', notification);
    };

    LocalNotifications.addListener('localNotificationReceived', handleNotification);

    return () => {
      // Remove all listeners when the component unmounts
      LocalNotifications.removeAllListeners();
    };
  }, []);


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
      </IonRouterOutlet>
      {/* Bottom Nav visibility */}
      {!showOnboarding && pagesWithBottomNav.includes(location.pathname) && (
        <BottomNav />
      )}
    </IonApp>
  );
};

export default App;
