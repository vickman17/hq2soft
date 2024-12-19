import { IonContent, IonHeader, IonPage } from "@ionic/react";
import React from "react";
import Back from "../components/Back";
import BottomNav from "../components/BottomNav";


const Inbox: React.FC = () => {

    return(
        <IonPage>
            <IonHeader>
                <Back/>     
                <div>Inbox</div>
            </IonHeader>
            <IonContent>
                
            </IonContent>
        </IonPage>
    )
}

export default Inbox;