import React, { useState, useEffect } from "react";
import { IonContent, IonFab, IonFabButton, IonIcon, IonBadge, IonPage } from "@ionic/react";
import { useHistory } from "react-router";
import { mailSharp } from "ionicons/icons";
import Profile from "../components/Profile";
import BottomNav from "../components/BottomNav";
import wallets from "/svgnew/wallet.svg";
import jobs from "/svgnew/briefcase.svg";
import request from "/svgnew/request.svg";
// import tool from "/assets/svg/tool-box.svg";
import style from "./styles/Dashboard.module.css";

const Dashboard: React.FC = () => {
  const history = useHistory();
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const storedInfo = sessionStorage.getItem("Info");
  const info = storedInfo ? JSON.parse(storedInfo) : {};
  const sspId = info?.ssp_id
  const empty = "/assets/empty.png";


  useEffect(()=>{
    if(!sspId){
      history.push("/home");
    }
  }, [])

  // Capitalize the first letter and make the rest lowercase
  const capitalizeFirstLetter = (name: string) => {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const Name = `${capitalizeFirstLetter(info?.first_name || "")} ${capitalizeFirstLetter(info?.last_name || "")}`;
  const qualification = info?.qualification || "N/A";

  // Fetch unread notification count from localStorage
  useEffect(() => {
    const count = localStorage.getItem("unreadNotificationCount");
    setUnreadCount(count ? parseInt(count, 10) : 0);
  }, []);

  const handleNotificationPageOpen = () => {
    // Reset unread count in localStorage
    localStorage.setItem("unreadNotificationCount", "0");
    setUnreadCount(0); // Reset unread count in state

    // Navigate to the notification page
    history.push("/notificationpage");
  };

  return (
    <IonPage>
      <IonContent className={style.content}>
        <div className={style.container}>
          <div className={style.dash}>
            <Profile />
            <div className={style.info}>
              <div className={style.name}>{Name}</div>
              <IonBadge className={style.work + " qualification"}>{qualification}</IonBadge>
            </div>
          </div>
          <div className={style.pick}>
            <div
              onClick={() => { history.push('/earning'); }}
              className={style.item + ' earning'}
            >
              <div className={style.iconCont}>
                <img src={wallets} className={style.icon}/>
              </div>
              <div className={style.sub}>Earnings</div>
            </div>
            <div
              onClick={() => { history.push('/request'); }}
              className={style.item + ' request'}
            >
              <div className={style.iconCont}>
                <img src={request} className={style.icon} />
              </div>
              <div className={style.sub}>Requests</div>
            </div>
            <div
              onClick={() => { history.push('/jobs'); }}
              className={style.item + ' jobs'}
            >
              <div className={style.iconCont}>
               <img src={jobs} className={style.icon} />
              </div>
              <div className={style.sub}>Jobs</div>
            </div>
          </div>
          <div className={style.nextSection}>Recent activity</div>
          <div className={style.recent}>
            <img src={empty} />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
