import { IonContent, IonFooter, IonIcon, IonItem, IonPage } from "@ionic/react";
import React, {useState} from "react";
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
import customer from "/svgnew/headset.svg";
import key from "/svgnew/key.svg";
import bank from "/svgnew/bank.svg";
import cog from "/svgnew/cogOutline.svg";
import tech from "/svgnew/robot.svg";
import PinInputModal from "../components/PinInputModal"; // Import the Pin Modal
//import {DotLottieReact} from "@lottie/dotlottie-react"
import useTawk from "../hooks/useTawk";


const Setting: React.FC = () => {
    // useTawk();
    const history = useHistory();
    const storedInfo = sessionStorage.getItem("Info");
    const [isPinModalOpen, setIsPinModalOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
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

    const handleProtectedNavigation = (destination: string) => {
        setPendingAction(() => () => history.push(destination));
        setIsPinModalOpen(true); // Open the PIN modal
      };
    
      const handlePinSubmit = (pin: string) => {
        console.log("Authenticated with PIN:", pin);
        if (pendingAction) {
          pendingAction(); // Execute the stored navigation action after authentication
        }
        setIsPinModalOpen(false);
      };

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
                        <div className={style.cog}>
                            <img style={{width: "100%"}} src={cog} />
                        </div>
                    </div>
                    <div className={style.sets}>
                        <div className={style.contSets}>
                            <div className={style.demo}>
                                <div className={style.demoIn}>
                                    <div className={style.icon}>
                                        <img src={key} />
                                    </div>
                                    <div onClick={()=>history.push('/security')} className={style.setName}>
                                        Security Settings
                                    </div>
                                </div>
                                <div className={style.enter}>
                                    <IonIcon icon={chevronForwardOutline} />
                                </div>
                            </div>
                            <div onClick={() => handleProtectedNavigation("/account")} className={style.demo}>
                                <div className={style.demoIn}>
                                    <div className={style.icon}>
                                        <img src={bank}/>
                                    </div>
                                    <div className={style.setName}>
                                        Beneficiary Account
                                    </div>
                                </div>
                                <div className={style.enter}>
                                    <IonIcon icon={chevronForwardOutline} />
                                </div>
                            </div>
                            <div onClick={()=>history.push('/support')} className={style.demo}>
                                <div className={style.demoIn}>
                                    <div className={style.icon}>
                                        <img src={tech} />
                                    </div>
                                    <div className={style.setName}>
                                        Support Center
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
            <PinInputModal 
                isOpen={isPinModalOpen}
                onClose={() => setIsPinModalOpen(false)}
                onSubmit={handlePinSubmit}
                ssp_id={userId}
            />      
        </IonPage>
    )
}

export default Setting;