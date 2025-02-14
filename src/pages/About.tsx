import React from "react";
import {IonPage, IonContent, IonIcon} from "@ionic/react";
import Header from "../components/Header";
import style from "./styles/About.module.css";
import { chevronForwardOutline, locationOutline, lockClosedOutline, languageOutline, moon, moonOutline, notificationsCircleOutline, eyeOffOutline } from "ionicons/icons";
import {version} from "../../package.json";
import note from "/svgnew/contract.svg";
import safe from "/svgnew/safe.svg";
import update from "/svgnew/update.svg";
import { useHistory } from "react-router";

const About: React.FC = () => {
    const history = useHistory();


    return(
        <IonPage className="page">
            <Header title="About" />
            <IonContent style={{fontFamily: "Quicksand", fontWeight: "800"}}>
                <div className={style.logo}>
                    <div className={style.image}>
                        <img src="/assets/Icon.svg" />
                    </div>
                    <div className={style.version}>Version {version}</div>
                </div>
                <div>
                    <div className={style.sets}>
                        <div className={style.contSets}>
                            <div  className={style.demo}>
                                <div onClick={()=>history.push('/terms')} className={style.demoIn}>
                                    <div className={style.icon}>
                                        <img  src={note}/>
                                    </div>
                                    <div className={style.setName}>
                                        Service Agreement & Payment Terms
                                    </div>
                                </div>
                                <div className={style.enter}>
                                    <IonIcon icon={chevronForwardOutline} />
                                </div>
                            </div>
                            <div  className={style.demo}>
                                <div onClick={()=>history.push('/dataprivacy')} className={style.demoIn}>
                                    <div className={style.icon}>
                                        <img src={safe} />
                                    </div>
                                    <div className={style.setName}>
                                        Data Privacy
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
                            <div className={style.demo}>
                                <div className={style.demoIn}>
                                    <div className={style.icon}>
                                        <img src={update} />
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