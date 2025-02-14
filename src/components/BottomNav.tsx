import React from 'react';
import {
  IonFooter,
  IonTabBar,
  IonTabButton,
} from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import edit from './BottomNav.module.css';
import homeSolid from "/svgnew/homeSolid.svg";
import homeOutline from "/svgnew/homeOutline.svg";
import chatSolid from '/svgnew/chatSolid.svg';
import chatOutline from '/svgnew/chatOutline.svg';
import bellOutline from '/svgnew/bellOutline.svg';
import bellSolid from '/svgnew/bellSolid.svg';
import userOutline from '/svgnew/userOutline.svg';
import userSolid from '/svgnew/userSolid.svg';

const BottomNav: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const currentPath = location.pathname;

  const getActiveTab = () => {
    if (currentPath === '/dashboard') return 'home';
    if (currentPath === '/inbox') return 'chat';
    if (currentPath === '/notificationpage') return 'notify';
    if (currentPath === '/setting') return 'settings';
    return '';
  };

  const activeTab = getActiveTab();

  const handleTabClick = (tabName: string, path: string) => {
    history.push(path);
  };

  return (
    <IonFooter className={edit.navbar + " bottom-nav"} style={{ '--background': 'transparent', '--boxShadow': 'none', border: 'none' }}>
      <IonTabBar
        slot="bottom"
        style={{ boxShadow: 'none', '--background': 'transparent', border: 'none' }}
      >
        {/* Home Tab */}
        <IonTabButton
          tab="home"
          className={edit.tab} // Added class for Joyride
          onClick={() => handleTabClick('home', '/dashboard')}
        >
          <div className="tab-home">
            <div className={activeTab === 'home' ? edit.activeTab : ''}>
              <img src={activeTab === 'home' ? homeSolid : homeOutline} width={20} height={20} />
            </div>
            <div style={{ fontWeight: activeTab === 'home' ? '700' : '', fontSize: '10px', color: "var(--ion-company-wood)" }}>Home</div>
          </div>
        </IonTabButton>

        {/* Chat Tab */}
        <IonTabButton
          tab="chat"
          className={edit.tab} // Added class for Joyride
          onClick={() => handleTabClick('chat', '/inbox')}
        >
          <div className="tab-chat">
            <div className={activeTab === 'chat' ? edit.activeTab : ''}>
              <img src={activeTab === 'chat' ? chatSolid : chatOutline} width={20} height={20} />
            </div>
            <div style={{ fontWeight: activeTab === 'chat' ? '700' : '', fontSize: '10px', color: "var(--ion-company-wood)" }}>Inbox</div>
          </div>
        </IonTabButton>

        {/* Notification Tab */}
        <IonTabButton
          tab="notify"
          className={edit.tab} // Added class for Joyride
          onClick={() => handleTabClick('notify', '/notificationpage')}
        >
          <div className="tab-notify">
            <div className={activeTab === 'notify' ? edit.activeTab : ''}>
              <img src={activeTab === 'notify' ? bellSolid : bellOutline} width={20} height={20} />
            </div>
            <div style={{ fontWeight: activeTab === 'notify' ? '700' : '', fontSize: '10px', color: "var(--ion-company-wood)" }}>Notification</div>
          </div>
        </IonTabButton>

        {/* Profile Tab */}
        <IonTabButton
          tab="settings"
          className={edit.tab} // Added class for Joyride
          onClick={() => handleTabClick('settings', '/setting')}
        >
          <div className="tab-settings">
            <div className={activeTab === 'settings' ? edit.activeTab : ''}>
              <img src={activeTab === 'settings' ? userSolid : userOutline} width={20} height={20} />
            </div>
            <div style={{ fontWeight: activeTab === 'settings' ? '700' : '', fontSize: '10px', color: "var(--ion-company-wood)" }}>Profile</div>
          </div>
        </IonTabButton>
      </IonTabBar>
    </IonFooter>
  );
};

export default BottomNav;
