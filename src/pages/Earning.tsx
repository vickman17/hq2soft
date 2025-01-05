import { IonContent, IonHeader, IonIcon, IonPage } from "@ionic/react";
import React from "react";
import Back from "../components/Back";
import style from './styles/Earning.module.css';
import { eyeOutline } from "ionicons/icons";
import Header from "../components/Header";



const Earning: React.FC = () => {

    return(
        <IonPage>
            <IonContent className={style.content}>
            <div className={style.earnings}>
                <Header title="Wallet" />
                <div className={style.acct}>
                    <div className={style.earnHead}>Earnings</div>
                    <div className={style.place}>
                        <div className={style.bal}>
                            &#8358; 0.00
                        </div>    

                        <div className={style.eye}>
                            <IonIcon icon={eyeOutline}/>
                        </div>
                    </div>
                </div>        

                <div className={style.option}>
                    <div className={style.withdraw}>
                        Withdraw
                    </div>

                    <div className={style.add}>
                        Add fund
                    </div>
                </div>
            </div>
            <div className={style.transaction}>
                <div className={style.transHead}>Transaction activity</div>
            </div>
            </IonContent>
        </IonPage>
    )
}

export default Earning;