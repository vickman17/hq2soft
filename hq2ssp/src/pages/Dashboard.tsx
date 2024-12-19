import { IonContent, IonPage, IonIcon } from "@ionic/react";
import React from "react";
import {calculator, calendarClear, walletOutline, journal, journalOutline, wallet, hammerOutline} from "ionicons/icons";
import style from "./styles/Dashboard.module.css";
import Profile from "../components/Profile";
import BottomNav from "../components/BottomNav";
import { useHistory } from "react-router";


const Dashboard: React.FC =()=>{

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



    
    return(
        <IonPage>
            <IonContent className={style.content}>
                <div className={style.dash}>
                    <Profile/>
                    <div className={style.info}>
                        <div className={style.name}>{Name}</div>
                        <div className={style.work}>{qualification}</div>
                    </div>
                </div>
                <div className={style.pick}>
                    <div onClick={()=>{history.push('/earning')}} className={style.item}>
                        <IonIcon className={style.icon} icon={walletOutline} />
                        <div className={style.sub}>Earnings</div>
                    </div>
                    <div onClick={()=>{history.push('/request')}} className={style.item}>
                        <IonIcon className={style.icon} icon={journalOutline} />
                        <div className={style.sub}>Requests</div>
                    </div>
                    <div onClick={()=>{history.push('/jobs')}} className={style.item}>
                        <IonIcon className={style.icon} icon={hammerOutline} />
                        <div className={style.sub}>Jobs</div>
                    </div>
                </div>
                <div className={style.recent}>
                    <div className={style.recentHead}>
                        Recent activity
                    </div>
                    <div className={style.activity}>

                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Dashboard;