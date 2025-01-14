import React, { useEffect, useState, useRef } from 'react';
import { IonContent, IonPage, IonList, IonItem, IonLabel, IonHeader, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import style from "./styles/Inbox.module.css";

const Inbox: React.FC = () => {
  const [chats, setChats] = useState<any[]>([]);
  const storedInfo = sessionStorage.getItem("Info");
  const info = storedInfo ? JSON.parse(storedInfo) : {};
  const sspId = info?.ssp_id
  const history = useHistory();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, []);

                                                          
  useEffect(() => {
    document.body.style.fontFamily = "Varela Round, sans-serif";
  }, []);


  useEffect(() => {
    if (sspId) {
      // Fetch chats with last message for the user
      fetch(`https://hq2soft.com/hq2sspapi/inbox.php?userId=${sspId}`, {
        method: 'GET',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch chats');
          }
          return response.json();
        })
        .then((data) => {
          if (Array.isArray(data)) {
            setChats(data);
          
          } else {
            console.error('Invalid data format:', data);
          }
        })
        .catch((error) => console.error('Error fetching chats:', error));
    }
  }, [sspId]);


  const openChat = (clientId: string, chatRoomId: string, jobId: string) => {
    history.push(`/chatpage/${clientId}/${chatRoomId}/${jobId}`);
  }



  const [showContent, setShowContent] = useState(false);
  const holdTimeout = useRef<NodeJS.Timeout | null>(null);

  // Duration required to trigger "hold" (e.g., 1 second)
  const holdDuration = 1000;

  const handlePressStart = () => {
    // Start a timer when pressing starts
    holdTimeout.current = setTimeout(() => {
      setShowContent(true); // Show content after holding for the duration
    }, holdDuration);
  };

  const handlePressEnd = () => {
    // Clear the timer when the press ends
    if (holdTimeout.current) {
      clearTimeout(holdTimeout.current);
      holdTimeout.current = null;
    }
  };


  return (
    <IonPage className={style.content}>
      <IonContent >
        <div className={style.head}>Inbox</div>
        <IonList lines="none">
          {chats.length > 0 ? (
            chats.map((chat) => (
              <div
              onPointerDown={handlePressStart}
              onPointerUp={handlePressEnd}
              onPointerLeave={handlePressEnd}
                key={chat.id}
                onClick={() => openChat(chat.sender_id, chat.id, chat.job_id)}
                className={style.chat}
              >
                
                <div style={{fontSize:"17px", width:"90%"}}>{chat.subcategory_name}</div>
                <div style={{display: "flex", justifyContent:"space-between", marginTop:"19px", alignItems: 'center', border:'0px solid black'}}>
                  <div>Press and hold to peep message</div>
                    <div style={{width:"40%", fontSize:"12.8px", textAlign:"right"}}>{chat.last_message_time}</div>
                  </div>
                  {showContent && (
                      <div
                        style={{
                          marginTop: "20px",
                          padding: "10px",
                          backgroundColor: "lightgreen",
                          borderRadius: "5px",
                        }}
                      >
                        <p className="last-message" style={{fontSize:"13px", textAlign:"center"}}>{chat.last_message}</p>
                      </div>
                    )}
                
              </div>
            ))
          ) : (
            <IonItem>
              <IonLabel>No chats available</IonLabel>
            </IonItem>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Inbox;
