import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonPage, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Login from './pages/Login';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import Profile from './components/Profile';
import Earning from './pages/Earning';
import Jobs from './pages/Jobs';
import Request from './pages/Request';
import Setting from './pages/Setting';
import EditProfile from './pages/EditProfile';
import CompleteProfile from './pages/CompleteProfile';
import FaceEnroll from './pages/FaceEnroll';
import BottomNav from './components/BottomNav';


setupIonicReact();

const App: React.FC = () => {

return(
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/earning" component={Earning}/>
            <Route exact path="/jobs" component={Jobs}/>
            <Route exact path="/request" component={Request} />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/setting' component={Setting}/>
            <Route exact path='/editprofile' component={EditProfile}/>
            <Route exact path='/completeprofile' component={CompleteProfile}/>
            <Route exact path='/faceenroll' component={FaceEnroll} />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
)
};

export default App;
