import { IonContent, IonPage, IonSegment, IonSegmentButton, IonLabel, IonHeader } from '@ionic/react';
import React, {useState} from 'react';
import Back from '../components/Back';
import style from './styles/Request.module.css'
import BottomNav from '../components/BottomNav';
import Accepted from "../components/Accepted";
import Declined from '../components/Declined';
import Incoming from '../components/Incoming';
import Header from '../components/Header';


const Request: React.FC = () =>{


    const [selectedSegment, setSelectedSegment] = useState<string>('Incoming');
    const [segmentColor, setSegmentColor] = useState<string>("");
  
    const handleSegmentChange = (event: CustomEvent) => {
      setSelectedSegment(event.detail.value);
    };
  
    const renderSegmentContent = () => {
      switch (selectedSegment) {
        case 'Incoming':
          return <Incoming/>;
        case 'Accepted':
          return <Accepted/>;
        default:
          return null;
      }
    };
  


    return(
        <IonPage>
            <Header title='Requests' />
            <IonContent className={style.pageCont}>
                {/* <div className={style.seg}>
                  <IonSegment className={style.segment} onIonChange={handleSegmentChange} value={selectedSegment} mode="ios" >
                      <IonSegmentButton class={style.segBut} value="Incoming">
                          <IonLabel>Incoming</IonLabel>
                      </IonSegmentButton>
                      <IonSegmentButton class={style.segBut} value="Accepted">
                          <IonLabel>Accepted</IonLabel>
                      </IonSegmentButton>
                  </IonSegment>
                </div>            
                <div className={style.content}>
                <div style={{ padding: '5px', border:"0px solid black" }}>
                    {renderSegmentContent()}
                  </div>
                </div> */}

                <Incoming />

            </IonContent>
        </IonPage>
    )
}

export default Request;