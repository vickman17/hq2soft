import { IonContent, IonIcon, IonPage } from '@ionic/react';
import React from 'react';
import Profile from '../components/Profile';
import style from './styles/EditProfile.module.css';
import { cameraOutline } from 'ionicons/icons';
import Back from '../components/Back';

const EditProfile: React.FC=()=>{

    return(
        <IonPage>
            <IonContent>
                <Back/>
                <div className={style.profile}>
                    <div className={style.proCont}>
                        <Profile/>
                    </div>
                    
                    <div className={style.iconCont}>
                        <IonIcon className={style.icon} icon={cameraOutline} />
                    </div>
                </div>
                <div className={style.details}>
                    <div className={style.inputCont}>
                        <input className={style.input} placeholder='Victory' type="text" />
                    </div>
                    <div className={style.inputCont}>
                        <input className={style.input} placeholder='Madumere' type="text" />
                    </div>
                    <div className={style.inputCont}>
                        <input className={style.input} placeholder='victorymadumere6@gmail.com' type="text" />
                    </div>
                    <div className={style.inputCont}>
                        <input className={style.input} placeholder='09037146462' type="text" />
                    </div>
                </div>
                <div className={style.below}>
                    <div className={style.butCont}>
                        <button style={{background: "red", color:"whitesmoke"}} className={style.but}>Discard</button>
                    </div>
                    <div className={style.butCont}>
                        <button style={{background: "#e0cc91", color:"white"}} className={style.but}>Save</button>
                    </div>
                </div>
                
            </IonContent>
        </IonPage>
    )
}


export default EditProfile;