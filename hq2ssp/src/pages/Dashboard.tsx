import { IonContent, IonPage, IonIcon } from "@ionic/react";
import React from "react";
import {calculator, calendarClear, walletOutline, journal, journalOutline, wallet, hammerOutline} from "ionicons/icons";
import style from "./styles/Dashboard.module.css";
import Profile from "../components/Profile";
import BottomNav from "../components/BottomNav";
import { useHistory } from "react-router";


const Dashboard: React.FC =()=>{

    const history = useHistory();


    return(
        <IonPage>
            <IonContent className={style.content}>
                <div className={style.dash}>
                    <Profile/>
                    <div className={style.info}>
                        <div className={style.name}>Victory Madumere</div>
                        <div className={style.work}>Software Engineer</div>
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
            <BottomNav/>
            
        </IonPage>
    )
}

export default Dashboard;