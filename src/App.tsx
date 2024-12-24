import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { Route, Redirect, BrowserRouter as Router } from 'react-router-dom'; // Using BrowserRouter here
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'; // To programmatically handle navigation
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
import Finish from './pages/Finish';

setupIonicReact();

const App: React.FC = () => {
  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);

  const pagesWithBottomNav = ['/dashboard', '/inbox', '/setting'];
  const history = useHistory(); // To programmatically handle navigation

  useEffect(() => {
    // Apply the Nunito font globally
    document.body.style.fontFamily = 'Quicksand, sans-serif';
  }, []);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    setShowOnboarding(hasSeenOnboarding === null); // Show onboarding if not seen
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('hasSeenOnboarding', 'true'); // Mark onboarding as seen
    setShowOnboarding(false); // Transition to the main app
    history.push('/home'); // Navigate to home page after onboarding
  };

  return (
    <IonApp>
      <Router>
        <IonRouterOutlet>
          {/* Show onboarding only if it's not completed */}
          {showOnboarding ? (
            <>
              <Route exact path='/' component={Onboarding} />
              <Route exact path='/home' component={Home} />
            </>
            
          ) : (
            <>
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/" component={Home} />
              <Route exact path="/home" component={Home} />
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
              <Route exact path="/finish" component={Finish} />
              <Route exact path="/faceenroll" component={FaceEnroll} />
              
            </>
          )}
        </IonRouterOutlet>

        {/* Bottom Nav should only be visible on specific pages */}
        {showOnboarding === false && pagesWithBottomNav.includes(window.location.pathname) && (
          <BottomNav />
        )}
      </Router>
    </IonApp>
  );
};

export default App;
