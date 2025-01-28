import React from 'react';
import {
  IonFooter,
  IonTabBar,
  IonTabButton,
  IonSkeletonText,
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
  const location = useLocation(); // Get current location
  const currentPath = location.pathname; // Get current URL path

  // Determine the active tab based on the current path
  const getActiveTab = () => {
    if (currentPath === '/dashboard') return 'home';
    if (currentPath === '/inbox') return 'chat';
    if (currentPath === '/notificationpage') return 'notify';
    if (currentPath === '/setting') return 'settings';
    return '';
  };

  const activeTab = getActiveTab();

  // Handle tab click
  const handleTabClick = (tabName: string, path: string) => {
    history.push(path);
  };

  return (
    <IonFooter className={edit.navbar} style={{ '--background': 'transparent', '--boxShadow': 'none', border: 'none' }}>
      <IonTabBar
        slot="bottom"
        style={{ boxShadow: 'none', '--background': 'transparent', border: 'none' }}
      >
        {/* Home Tab */}
        <IonTabButton
          tab="home"
          className={edit.tab}
          onClick={() => handleTabClick('home', '/dashboard')}
        >
          <div className={activeTab === 'home' ? edit.activeTab : ''}>
            <img src={activeTab === 'home' ? homeSolid : homeOutline} width={20} height={20} />
          </div>
          <div style={{ fontWeight: activeTab === 'home' ? '700' : '', fontSize: '10px' }}>Home</div>
        </IonTabButton>

        {/* Chat Tab */}
        <IonTabButton
          tab="chat"
          onClick={() => handleTabClick('chat', '/inbox')}
          className={edit.tab}
        >
          <div className={activeTab === 'chat' ? edit.activeTab : ''}>
            <img src={activeTab === 'chat' ? chatSolid : chatOutline} width={20} height={20} />
          </div>
          <div style={{ fontWeight: activeTab === 'chat' ? '700' : '', fontSize: '10px' }}>Inbox</div>
        </IonTabButton>

        {/* Notification Tab */}
        <IonTabButton
          tab="notify"
          onClick={() => handleTabClick('notify', '/notificationpage')}
          className={edit.tab}
        >
          <div className={activeTab === 'notify' ? edit.activeTab : ''}>
            <img src={activeTab === 'notify' ? bellSolid : bellOutline} width={20} height={20} />
          </div>
          <div style={{ fontWeight: activeTab === 'notify' ? '700' : '', fontSize: '10px' }}>Notification</div>
        </IonTabButton>

        {/* Profile Tab */}
        <IonTabButton
          tab="settings"
          onClick={() => handleTabClick('settings', '/setting')}
          className={edit.tab}
        >
          <div className={activeTab === 'settings' ? edit.activeTab : ''}>
            <img src={activeTab === 'settings' ? userSolid : userOutline} width={20} height={20} />
          </div>
          <div style={{ fontWeight: activeTab === 'settings' ? '700' : '', fontSize: '10px' }}>Profile</div>
        </IonTabButton>
      </IonTabBar>
    </IonFooter>
  );
};

export default BottomNav;
