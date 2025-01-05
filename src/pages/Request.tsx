import { IonContent, IonPage, IonSegment, IonSegmentButton, IonLabel, IonHeader } from '@ionic/react';
import React, {useState} from 'react';
import Back from '../components/Back';
import style from './styles/Request.module.css'
import BottomNav from '../components/BottomNav';
import Accepted from "../components/Accepted";
import Declined from '../components/Declined';
import Incoming from '../components/Incomig';
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
        case 'Declined':
          return <Declined/>;
        default:
          return null;
      }
    };
  


    return(
        <IonPage>
            <Header title='Requests' />
            <IonContent className={style.pageCont}>
                <div className={style.seg}>
                <IonSegment className={style.segment} onIonChange={handleSegmentChange} value={selectedSegment} mode="ios" >
                    <IonSegmentButton value="Incoming">
                        <IonLabel>Incoming</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="Accepted">
                        <IonLabel>Accepted</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="Declined">
                        <IonLabel>Declined</IonLabel>
                    </IonSegmentButton>
                </IonSegment>
                </div>
                
        <div style={{ padding: '16px', border:"0px solid black" }}>
          {renderSegmentContent()}
        </div>

            </IonContent>
        </IonPage>
    )
}

export default Request;