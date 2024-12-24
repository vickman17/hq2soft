import { IonContent, IonHeader, IonPage } from "@ionic/react";
import React from "react";
import Back from "../components/Back";
import style from "./styles/Inbox.module.css";


const Inbox: React.FC = () => {

    const notext = "/assets/notext.jpeg"


    return(
        <IonPage>
            <IonContent>
            <Back/>     
            <div className={style.head}>Inbox</div>     
            <div className={style.messageCont}>
                <img src={notext} />
                </div>           
            </IonContent>
        </IonPage>
    )
}

export default Inbox;