import { IonContent, IonHeader, IonPage } from "@ionic/react";
import React from "react";
import Back from "../components/Back";
import style from "./styles/Inbox.module.css";
import Header from "../components/Header";

const Inbox: React.FC = () => {

    const notext = "/assets/notext.jpeg"


    return(
        <IonPage>
            <Header title="Messages" />
            <IonContent>
            <div className={style.messageCont}>
                <img src={notext} />
                </div>           
            </IonContent>
        </IonPage>
    )
}

export default Inbox;