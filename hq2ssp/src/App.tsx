import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

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
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    const checkOnboardingStatus = () => {
      const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
      setShowOnboarding(!hasSeenOnboarding); // Show onboarding if not seen
    };

    checkOnboardingStatus();
  }, []);

  const handleOnboardingFinish = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setShowOnboarding(false);
  };

  if (showOnboarding === null) {
    return <div>Loading...</div>;
  }

  return (
    <IonApp>
      {showOnboarding ? (
        <Onboarding onFinish={handleOnboardingFinish} />
      ) : (
        <IonReactRouter>
          <AppWithBottomNav />
        </IonReactRouter>
      )}
    </IonApp>
  );
};

const AppWithBottomNav: React.FC = () => {
  const location = useLocation(); // Now safely inside the IonReactRouter context

  const pagesWithBottomNav = [
    '/dashboard',
    '/inbox',
    '/setting',
  ]; // Add all the routes where BottomNav should be displayed

  return (
    <>
      <IonRouterOutlet>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/earning" component={Earning} />
        <Route exact path="/inbox" component={Inbox} />
        <Route exact path="/jobs" component={Jobs} />
        <Route exact path="/request" component={Request} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/setting" component={Setting} />
        <Route exact path="/editprofile" component={EditProfile} />
        <Route exact path="/completeprofile" component={CompleteProfile} />
        <Route exact path="/faceenroll" component={FaceEnroll} />
        <Route exact path="/onboarding" component={Onboarding} />
      </IonRouterOutlet>
      {/* Conditionally Render BottomNav */}
      {pagesWithBottomNav.includes(location.pathname) && <BottomNav />}
    </>
  );
};

export default App;
