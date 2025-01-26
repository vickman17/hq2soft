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
import homeSolid from "/assets/svg/homeSolid.svg";
import homeOutline from "/assets/svg/homeOutline.svg";
import chatSolid from '/assets/svg/chatSolid.svg';
import chatOutline from '/assets/svg/chatOutline.svg';
import bellOutline from '/assets/svg/bellOutline.svg';
import bellSolid from '/assets/svg/bellSolid.svg';
import userOutline from '/assets/svg/userOutline.svg';
import userSolid from '/assets/svg/userSolid.svg';
// import setting from '/assets/svg/setting.svg';


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
    settings: '/assets/setting.lottie',
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
    <IonFooter className={edit.navbar} style={{ '--background': 'transparent', "--boxShadow": "none", border:"none" }}>
      <IonTabBar
        slot="bottom"
        style={{ boxShadow: 'none', '--background': 'transparent', border:"none" }}
      >
        {/* Home Tab */}
        <IonTabButton
          tab="home"
          className={edit.tab}
          onClick={() => handleTabClick('home', '/dashboard')}
           // Apply active class
        >
          <div className={activeTab === 'home' ? edit.activeTab : ''}>
          {loading[0] ? (
            <IonSkeletonText
              animated
              className={edit.icon}
              style={{ width: '40px', height: '40px' }}
            />
          ) : (
            
            <img src={ activeTab === 'home' ? homeSolid : homeOutline}  width={25} height={25}/>
          )}
          </div>
          <div style={{fontWeight: activeTab === 'home' ? "700" : ""}}>Home</div>
        </IonTabButton>

        {/* Chat Tab */}
        <IonTabButton
          tab="chat"
          onClick={() => handleTabClick('chat', '/inbox')}
          className={edit.tab}
          
        >
          <div className={activeTab === 'chat' ? edit.activeTab : ''}>
          {loading[1] ? (
            <IonSkeletonText
              animated
              className={edit.icon}
              style={{ width: '40px', height: '40px' }}
            />
          ) : (
            
            <img src={activeTab === "chat" ? chatSolid : chatOutline} width={25} height={25} />
          )}
          </div>
          <div style={{fontWeight: activeTab === 'chat' ? "700" : ""}}>Inbox</div>
        </IonTabButton>

        {/* Settings Tab */}
        <IonTabButton
          tab="settings"
          onClick={() => handleTabClick('notify', '/notificationpage')}
          className={edit.tab}
        >
          <div className={activeTab === 'notify' ? edit.activeTab : ''}>
          {loading[2] ? (
            <IonSkeletonText
              animated
              className={edit.icon}
              style={{ width: '40px', height: '40px' }}
            />
          ) : (
            
          <img src={activeTab === 'notify' ? bellSolid : bellOutline} width={25} height={25}  />
          )}
          </div>
          <div style={{fontWeight: activeTab === 'notify' ? "700" : ""}}>Notification</div>
        </IonTabButton>

        {/* Settings Tab */}
        <IonTabButton
          tab="settings"
          onClick={() => handleTabClick('settings', '/setting')}
          className={edit.tab}
        >
          <div className={activeTab === 'settings' ? edit.activeTab : ''}>
          {loading[2] ? (
            <IonSkeletonText
              animated
              className={edit.icon}
              style={{ width: '40px', height: '40px' }}
            />
          ) : (
            
          <img src={activeTab === 'settings' ? userSolid : userOutline} width={25} height={25}  />
          )}
          </div>
          <div style={{fontWeight: activeTab === 'settings' ? "700" : ""}}>Profile</div>
        </IonTabButton>
      </IonTabBar>
    </IonFooter>
  );
};

export default BottomNav;
