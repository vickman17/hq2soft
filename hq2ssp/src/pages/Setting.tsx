import { IonContent, IonFooter, IonIcon, IonItem, IonPage } from "@ionic/react";
import React from "react";
import style from "./styles/Setting.module.css";
import Profile from "../components/Profile";
import SmallProfile from "../components/SmallProfile";
import { chevronForwardOutline, locationOutline, lockClosedOutline, languageOutline, moon, moonOutline, notificationsCircleOutline, eyeOffOutline } from "ionicons/icons";
import BottomNav from "../components/BottomNav";
import {useHistory} from "react-router-dom";
import Back from "../components/Back";
//import {DotLottieReact} from "@lottie/dotlottie-react"



const Setting: React.FC = () => {

    const history = useHistory();


    return(
        <IonPage>
            <IonContent>
                <Back/>
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
                                <div className={style.demoIn}>
                                    <div className={style.icon}>
                                        <IonIcon icon={moonOutline} />
                                    </div>
                                    <div className={style.setName}>
                                        Theme
                                    </div>
                                </div>
                                <div className={style.enter}>
                                    <IonIcon icon={chevronForwardOutline} />
                                </div>
                            </IonItem>
                            <IonItem lines="none" className={style.demo}>
                                <div className={style.demoIn}>
                                    <div className={style.icon}>
                                        <IonIcon icon={lockClosedOutline} />
                                    </div>
                                    <div className={style.setName}>
                                        Security
                                    </div>
                                </div>
                                <div className={style.enter}>
                                    <IonIcon icon={chevronForwardOutline} />
                                </div>
                            </IonItem>
                            <IonItem lines="none" className={style.demo}>
                                <div className={style.demoIn}>
                                    <div className={style.icon}>
                                        <IonIcon icon={eyeOffOutline} />
                                    </div>
                                    <div className={style.setName}>
                                        Privacy
                                    </div>
                                </div>
                                <div className={style.enter}>
                                    <IonIcon icon={chevronForwardOutline} />
                                </div>
                            </IonItem>
                            <IonItem lines="none" className={style.demo}>
                                <div className={style.demoIn}>
                                    <div className={style.icon}>
                                        <IonIcon icon={languageOutline} />
                                    </div>
                                    <div className={style.setName}>
                                        Language
                                    </div>
                                </div>
                                <div className={style.enter}>
                                    <IonIcon icon={chevronForwardOutline} />
                                </div>
                            </IonItem>
                            <IonItem lines="none" className={style.demo}>
                                <div className={style.demoIn}>
                                    <div className={style.icon}>
                                        <IonIcon icon={locationOutline} />
                                    </div>
                                    <div className={style.setName}>
                                        Work Address
                                    </div>
                                </div>
                                <div className={style.enter}>
                                    <IonIcon icon={chevronForwardOutline} />
                                </div>
                            </IonItem>
                        </div>
                    </div>
                </div>
                <div className={style.signOut}>Sign out</div>
            </IonContent>
            <IonFooter className={style.foot}>
                <p style={{width: "fit-content", border:"0px solid", margin:"auto"}}>&copy; Powered by strive inc</p>
            </IonFooter>
            
        </IonPage>
    )
}

export default Setting;