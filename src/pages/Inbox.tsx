import { IonContent, IonHeader, IonPage } from "@ionic/react";
import React from "react";
import Back from "../components/Back";
import BottomNav from "../components/BottomNav";


const Inbox: React.FC = () => {

    return(
        <IonPage>
            <IonContent>
            <Back/>     
            <div>Inbox</div>                
            </IonContent>
        </IonPage>
    )
}

export default Inbox;