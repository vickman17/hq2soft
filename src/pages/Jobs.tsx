import { IonContent, IonHeader, IonPage, IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";
import React, { useState, useEffect } from "react";
import BottomNav from "../components/BottomNav";
import style from "./styles/Jobs.module.css";
import CancelledJobs from "../components/CancelledJobs";
import PendingJobs from "../components/PendingJobs";
import CompletedJobs from "../components/CompletedJobs";
import Back from '../components/Back';
import Header from "../components/Header";

const Jobs: React.FC = () => {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, []);
  const [selectedSegment, setSelectedSegment] = useState<string>('Completed');
  const [segmentColor, setSegmentColor] = useState<string>("");

  const handleSegmentChange = (event: CustomEvent) => {
    setSelectedSegment(event.detail.value);
  };

  const renderSegmentContent = () => {
    switch (selectedSegment) {
      case 'Completed':
        return <CompletedJobs/>;
      case 'Pending':
        return <PendingJobs/>;
      default:
        return null;
    }
  };


  
  return (
    <IonPage>
      <Header title='Jobs' />
      <IonContent className={style.content}>
        <div className={style.seg}>
          <IonSegment className={style.segment} onIonChange={handleSegmentChange} value={selectedSegment} mode="ios" >
            <IonSegmentButton  value="Completed">
              <IonLabel>Completed</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="Pending">
              <IonLabel>Pending</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </div>

        <div style={{ padding: '16px', border:"0px solid black" }}>
          {renderSegmentContent()}
        </div>
  
      </IonContent>
    </IonPage>
  );
};

export default Jobs;
