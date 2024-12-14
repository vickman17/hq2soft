import { IonContent, IonIcon, IonItem, IonPage } from "@ionic/react";
import React from "react";
import style from "./styles/Setting.module.css";
import Profile from "../components/Profile";
import SmallProfile from "../components/SmallProfile";
import { chevronForwardOutline, moon } from "ionicons/icons";
import BottomNav from "../components/BottomNav";
import {useHistory} from "react-router-dom";
//import {DotLottieReact} from "@lottie/dotlottie-react"



const Setting: React.FC = () => {

    const history = useHistory();


    return(
        <IonPage>
            <IonContent>
                <div className={style.head}>Settings</div>
                <div className={style.all}>
                    <div onClick={()=>{history.push('/editprofile')}} className={style.profile}>
                        <div className={style.image}>
                            <SmallProfile/>
                        </div>
                        <div className={style.identity}>
                            <div className={style.name}>Victory Madumere</div>
                            <div className={style.badge}>Certified</div>
                        </div>
                        <div className={style.chevron}>
                            <IonIcon icon={chevronForwardOutline} />
                        </div>
                    </div>
                    <div className={style.sets}>
                        <div className={style.contSets}>
                            <IonItem lines="none" className={style.demo}>
                                <div className={style.icon}>
                                    <IonIcon icon={moon} />
                                </div>
                                <div className={style.setName}>
                                    Dark mode
                                </div>
                            </IonItem>
                            <IonItem lines="none" className={style.demo}>
                                <div className={style.icon}>
                                    <IonIcon icon={moon} />
                                </div>
                                <div className={style.setName}>
                                    Notification
                                </div>
                            </IonItem>
                            <IonItem lines="none" className={style.demo}>
                                <div className={style.icon}>
                                    <IonIcon icon={moon} />
                                </div>
                                <div className={style.setName}>
                                    Security
                                </div>
                            </IonItem>
                            <IonItem lines="none" className={style.demo}>
                                <div className={style.icon}>
                                    <IonIcon icon={moon} />
                                </div>
                                <div className={style.setName}>
                                    Language
                                </div>
                            </IonItem>
                            <IonItem lines="none" className={style.demo}>
                                <div className={style.icon}>
                                    <IonIcon icon={moon} />
                                </div>
                                <div className={style.setName}>
                                    Work address
                                </div>
                            </IonItem>
                        </div>
                    </div>
                </div>
                <div className={style.signOut}>Sign out</div>
            </IonContent>
            
        </IonPage>
    )
}

export default Setting;