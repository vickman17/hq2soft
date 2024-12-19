import { IonContent, IonPage } from '@ionic/react';
import React from 'react';
import Back from '../components/Back';
import style from './styles/Request.module.css'
import BottomNav from '../components/BottomNav';


const Request: React.FC = () =>{
    return(
        <IonPage>
            <IonContent>
                <Back/>
                <div className={style.head}>Jobs Requests</div>
            </IonContent>
        </IonPage>
    )
}

export default Request;