import React, { useState } from 'react';
import {
  IonFooter,
  IonTabBar,
  IonTabButton,
  IonSkeletonText,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import edit from './BottomNav.module.css';

// Define the type for dotLottie reference
type DotLottie = { play: () => void; stop: () => void; };

const BottomNav: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean[]>([false, false, false]);
  const [activeTab, setActiveTab] = useState<string>(''); // Keeps track of the active tab

  // Lottie animation paths
  const icons = {
    home: '/assets/Home.lottie',
    chat: '/assets/Chat.lottie',
    settings: '/assets/Settings.lottie',
  };

  // Handle tab click and animation
  const handleTabClick = (tabName: string, path: string) => {
    setActiveTab(tabName); // Set the active tab for animation
    history.push(path);
  };

  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null); // Explicitly type dotLottie

  const dotLottieRefCallback = (dotLottieInstance: DotLottie | null) => {
    setDotLottie(dotLottieInstance);
  };

  const play = () => {
    if (dotLottie) {
      dotLottie.play();
    }
  };

  return (
    <IonFooter style={{ '--background': 'transparent' }}>
      <IonTabBar
        slot="bottom"
        style={{ boxShadow: '1px 3px 19px grey', '--background': 'transparent' }}
      >
        {/* Home Tab */}
        <IonTabButton
          tab="home"
          onClick={() => handleTabClick('home', '/dashboard')}
        >
          {loading[0] ? (
            <IonSkeletonText
              animated
              className={edit.icon}
              style={{ width: '40px', height: '40px' }}
            />
          ) : (
            <DotLottieReact
              src={icons.home}
              loop={true} // Animate only when 'home' is active
              autoplay
              className={edit.icon}
              dotLottieRefCallback={dotLottieRefCallback}
            />
          )}
        </IonTabButton>

        {/* Chat Tab */}
        <IonTabButton
          tab="chat"
          onClick={() => handleTabClick('chat', '/inbox')}
        >
          {loading[1] ? (
            <IonSkeletonText
              animated
              className={edit.icon}
              style={{ width: '40px', height: '40px' }}
            />
          ) : (
            <DotLottieReact
              loop={activeTab === 'chat'} // Animate only when 'chat' is active
              autoplay={activeTab === 'chat'}
              className={edit.icon}
            />
          )}
        </IonTabButton>

        {/* Settings Tab */}
        <IonTabButton
          tab="settings"
          onClick={() => handleTabClick('settings', '/setting')}
        >
          {loading[2] ? (
            <IonSkeletonText
              animated
              className={edit.icon}
              style={{ width: '40px', height: '40px' }}
            />
          ) : (
            <DotLottieReact
              loop={activeTab === 'settings'} // Animate only when 'settings' is active
              autoplay={activeTab === 'settings'}
              className={edit.icon}
            />
          )}
        </IonTabButton>
      </IonTabBar>
    </IonFooter>
  );
};

export default BottomNav;
