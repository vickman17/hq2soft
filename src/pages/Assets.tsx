import React from "react";
import { IonPage, IonContent, IonIcon} from "@ionic/react";
import { eyeOutline, eyeOffOutline, informationCircleSharp } from "ionicons/icons"; 
import style from "./styles/Assets.module.css";
import Header from "../components/Header";

const Assets: React.FC = () =>{

    return(
        <IonPage>
            <Header title="Assets" />
            <IonContent>
                <div className={style.total}>
                    <div className={style.totalHead}>Total Balance:</div>
                    <div className={style.totalBal}>₦ 2000000.00</div>
                </div>
                <div className={style.box}>
                    <div className={style.topBox}>
                        <div className={style.boxName}>
                            Active Income
                        </div>
                        <div className={style.boxInfo}>
                            <IonIcon className={style.infoIcon} icon={informationCircleSharp} />
                        </div>
                    </div>
                    <div className={style.bottomBox}>
                        <div className={style.bal}>
                        ₦ 2000
                        </div>
                        <div className={style.withdrawBut}>
                            Withdraw
                        </div>
                    </div>
                </div>
                <div className={style.box}>
                    <div className={style.topBox}>
                        <div className={style.boxName}>
                            Passive Income
                        </div>
                        <div className={style.boxInfo}>
                            <IonIcon className={style.infoIcon} icon={informationCircleSharp} />
                        </div>
                    </div>
                    <div className={style.bottomBox}>
                        <div className={style.bal}>
                        ₦ 2000
                        </div>
                        <div className={style.withdrawBut}>
                            Withdraw
                        </div>
                    </div>
                </div>
                <div className={style.box}>
                    <div className={style.topBox}>
                        <div className={style.boxName}>
                            Cumulative Income
                        </div>
                        <div className={style.boxInfo}>
                            <IonIcon className={style.infoIcon} icon={informationCircleSharp} />
                        </div>
                    </div>
                    <div className={style.bottomBox}>
                        <div className={style.bal}>
                        ₦ 2000
                        </div>
                        <div className={style.withdrawBut}>
                            Withdraw
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Assets;