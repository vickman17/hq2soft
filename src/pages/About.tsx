import React from "react";
import {IonPage, IonContent, IonIcon} from "@ionic/react";
import Header from "../components/Header";
import style from "./styles/About.module.css";
import { chevronForwardOutline, locationOutline, lockClosedOutline, exclamationCirle, languageOutline, moon, moonOutline, notificationsCircleOutline, eyeOffOutline } from "ionicons/icons";
import logo from "/assets/icon.png";
import {version} from "/package.json";

const About: React.FC = () => {

    return(
        <IonPage className="page">
            <Header title="About" />
            <IonContent>
                <div className={style.logo}>
                    <div className={style.image}>
                        <img src={logo} />
                    </div>
                    <div className={style.version}>Version {version}</div>
                </div>
                <div>
                    <div className={style.sets}>
                        <div className={style.contSets}>
                            <div lines="none" className={style.demo}>
                                <div className={style.demoIn}>
                                    <div className={style.icon}>
                                        <IonIcon icon={moonOutline} />
                                    </div>
                                    <div className={style.setName}>
                                        Service Agreement & Payment Terms
                                    </div>
                                </div>
                                <div className={style.enter}>
                                    <IonIcon icon={chevronForwardOutline} />
                                </div>
                            </div>
                            <div lines="none" className={style.demo}>
                                <div className={style.demoIn}>
                                    <div className={style.icon}>
                                        <IonIcon icon={lockClosedOutline} />
                                    </div>
                                    <div className={style.setName}>
                                        Payment Account
                                    </div>
                                </div>
                                <div className={style.enter}>
                                    <IonIcon icon={chevronForwardOutline} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.sets}>
                        <div className={style.contSets}>
                            <div lines="none" className={style.demo}>
                                <div className={style.demoIn}>
                                    <div className={style.icon}>
                                        <IonIcon icon={moonOutline} />
                                    </div>
                                    <div className={style.setName}>
                                        Version Upgrade
                                    </div>
                                </div>
                                <div className={style.enter}>
                                    <IonIcon icon={chevronForwardOutline} />
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </IonContent>
        </IonPage>
    )
}

export default About;