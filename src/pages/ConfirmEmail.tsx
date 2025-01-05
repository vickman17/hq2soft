import React from "react";
import { IonContent, IonPage, IonIcon } from "@ionic/react";
import style from "./styles/ConfirmEmail.module.css";
import { atSharp } from "ionicons/icons";


const ConfirmEmail: React.FC = () => {

    return(
        <IonPage>
            <IonContent>
            <div className={style.head}>
                <div className={style.bigHead}>Confirm Email</div>
                <div className={style.smallHead}>Input your email address for verification</div>
            </div>
            <div className={style.cont}>
                <div className={style.input}>
                    <div className={style.iconCont}>
                        <IonIcon className={style.icon} icon={atSharp} />
                    </div>
                    <div className={style.passCont}>
                        <input
                            className={style.passDetails}
                            type="email"
                            name="email"
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                            placeholder="Email address"
                            required
                        />
                    </div>
                </div>
            </div>
            <div className={style.butCont}>
                    <button className={style.but}>Send verification</button>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default ConfirmEmail;