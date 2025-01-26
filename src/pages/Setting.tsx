import { IonContent, IonFooter, IonIcon, IonItem, IonPage } from "@ionic/react";
import React from "react";
import style from "./styles/Setting.module.css";
import Profile from "../components/Profile";
import SmallProfile from "../components/SmallProfile";
import { chevronForwardOutline, locationOutline, lockClosedOutline, languageOutline, moon, moonOutline, notificationsCircleOutline, eyeOffOutline } from "ionicons/icons";
import BottomNav from "../components/BottomNav";
import {useHistory} from "react-router-dom";
import Back from "../components/Back";
import Header from "../components/Header";
import {version} from "../../package.json";
import exclamation from "/assets/svg/exclamation.svg";
import customer from "/assets/svg/headset.svg";
import key from "/assets/svg/key.svg";
//import {DotLottieReact} from "@lottie/dotlottie-react"



const Setting: React.FC = () => {

    const history = useHistory();
    const storedInfo = sessionStorage.getItem("Info");

    const info = storedInfo ? JSON.parse(storedInfo) : {};

    const userId = info?.ssp_id || "";

    const signOut = () => {
        sessionStorage.clear();
        history.push("/home")
    }

    const capitalizeFirstLetter = (name: string) => {
        if (!name) return '';
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    };

    const Name = `${capitalizeFirstLetter(info?.first_name || "")} ${capitalizeFirstLetter(info?.last_name || "")}`;
    const qualification = info?.qualification || "N/A";


    return(
        <IonPage className="page">
            <IonContent className={style.cont}>
                {/* <div style={{width: "90%", margin: "auto", fontSize: "30px"}}>Profile</div> */}
                <div className={style.all}>
                    <div onClick={()=>{history.push('/editprofile')}} className={style.profile}>
                        <div className={style.image}>
                            <SmallProfile/>
                        </div>
                        <div className={style.identity}>
                            <div className={style.name}>{Name}</div>
                            <div className={style.badge}>{qualification}</div>
                        </div>
                        <div className={style.chevron}>
                            <IonIcon icon={chevronForwardOutline} />
                        </div>
                    </div>
                    <div className={style.sets}>
                        <div className={style.contSets}>
                            <div className={style.demo}>
                                <div className={style.demoIn}>
                                    <div className={style.icon}>
                                        <img src={key} />
                                    </div>
                                    <div className={style.setName}>
                                        Security Settings
                                    </div>
                                </div>
                                <div className={style.enter}>
                                    <IonIcon icon={chevronForwardOutline} />
                                </div>
                            </div>
                            <div className={style.demo}>
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
                            <div className={style.demo}>
                                <div className={style.demoIn}>
                                    <div className={style.icon}>
                                        <img src={customer} />
                                    </div>
                                    <div className={style.setName}>
                                        Customer Service
                                    </div>
                                </div>
                                <div className={style.enter}>
                                    <IonIcon icon={chevronForwardOutline} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.setBelow}>
                        <div onClick={()=>history.push("/about")} className={style.demo}>
                            <div className={style.demoIn}>
                                <div className={style.icon}>
                                    <img src={exclamation} />
                                </div>
                                <div className={style.setName}>
                                    About
                                </div>
                            </div>
                            <div className={style.enter}>
                                <div style={{paddingRight: "2px"}}>
                                    Version {version}
                                </div>
                                <IonIcon icon={chevronForwardOutline} />
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{marginTop: "4rem"}} className={style.setBelow}>
                        <div className={style.demo}>
                        <div className={style.signOut} onClick={signOut}>{userId ? "Sign Out" : "Login"}</div>
                        </div>
                    </div>
                
            </IonContent>            
        </IonPage>
    )
}

export default Setting;