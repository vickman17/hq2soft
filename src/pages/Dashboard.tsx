import { IonContent, IonPage } from "@ionic/react";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import Profile from "../components/Profile";
import BottomNav from "../components/BottomNav";
import tool from "/assets/svg/tool-box.svg";
import wallets from "/assets/svg/wallet.svg";
import inbox from "/assets/svg/inbox-in.svg";
import style from "./styles/Dashboard.module.css";

const Dashboard: React.FC = () => {
  const history = useHistory();
  const storedInfo = sessionStorage.getItem("Info");
  const info = storedInfo ? JSON.parse(storedInfo) : {};

  // Capitalize the first letter and make the rest lowercase
  const capitalizeFirstLetter = (name: string) => {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const Name = `${capitalizeFirstLetter(info?.first_name || "")} ${capitalizeFirstLetter(info?.last_name || "")}`;
  const qualification = info?.qualification || "N/A";

  return (
    <IonPage>
      <IonContent className={style.content}>
        <div className={style.dash}>
          <Profile />
          <div className={style.info}>
            <div className={style.name}>{Name}</div>
            <div className={style.work + " qualification"}>{qualification}</div>
          </div>
        </div>
        <div className={style.pick}>
          <div
            onClick={() => { history.push('/earning'); }}
            className={style.item + ' earning'}
          >
            <img src={wallets} width={50} height={50} className={style.icon} />
            <div className={style.sub}>Earnings</div>
          </div>
          <div
            onClick={() => { history.push('/request'); }}
            className={style.item + ' request'}
          >
            <img src={inbox} className={style.icon} />
            <div className={style.sub}>Requests</div>
          </div>
          <div
            onClick={() => { history.push('/jobs'); }}
            className={style.item + ' jobs'}
          >
            <img src={tool} className={style.icon} />
            <div className={style.sub}>Jobs</div>
          </div>
        </div>
      </IonContent>
      <BottomNav />
    </IonPage>
  );
};

export default Dashboard;
