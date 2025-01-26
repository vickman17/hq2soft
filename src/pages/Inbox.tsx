import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonList, IonItem, IonLabel, IonHeader, IonToolbar, IonText, IonIcon } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { locationOutline } from "ionicons/icons";
import style from "./styles/Inbox.module.css";
import { db } from '../firebase/firebaseConfig';
import { collection, query, where, getDocs, orderBy, limit, getDoc, doc, setDoc, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore';

// Define the ChatRoom interface
interface ChatRoom {
  roomId: string;
  jobId: string;
  userId: string;
  serviceProviderId: string;
  lastMessage: string; // Store last message content
  lastMessageTime: number; // Store timestamp of the last message
  isUnread: boolean; // Flag for unread messages
}

interface JobDetails {
  skill: string;
  address: string;
  local_government: string;
  state: string;
  additional_details: string;
  client_firstName: string;
  client_lastName: string;
}

const Inbox: React.FC = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [jobDetails, setJobDetails] = useState<{ [key: string]: JobDetails }>({}); // Store job details by jobId
  const storedInfo = sessionStorage.getItem('Info');
  const info = storedInfo ? JSON.parse(storedInfo) : {};
  const sspId = info?.ssp_id;
  const history = useHistory();

  useEffect(() => {
    document.body.style.fontFamily = 'Quicksand, sans-serif';
  }, []);

  const fetchChatRooms = async () => {
    try {
      const chatRoomsRef = collection(db, 'chatRooms');
      const q = query(chatRoomsRef, where('userId', '==', sspId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const rooms: ChatRoom[] = [];

        for (const docSnapshot of querySnapshot.docs) {
          const data = docSnapshot.data();

          const roomId = docSnapshot.id;

          const messagesRef = collection(doc(db, 'chatRooms', roomId), 'messages');
          const lastMessageListener = query(messagesRef, orderBy('timestamp', 'desc'), limit(1));

          // Set up a listener for real-time updates on the last message
          const unsubscribe = onSnapshot(lastMessageListener, (snapshot) => {
            if (!snapshot.empty) {
              const lastMessageDoc = snapshot.docs[0].data();
              const lastMessage = lastMessageDoc?.message || '';
              const lastMessageTime = lastMessageDoc?.timestamp?.seconds || 0;

              setChatRooms((prevRooms) => {
                const updatedRooms = [...prevRooms];
                const roomIndex = updatedRooms.findIndex((room) => room.roomId === roomId);
                if (roomIndex !== -1) {
                  updatedRooms[roomIndex] = {
                    ...updatedRooms[roomIndex],
                    lastMessage,
                    lastMessageTime,
                    isUnread: updatedRooms[roomIndex].lastMessageTime < lastMessageTime, // Set unread flag
                  };
                }
                return updatedRooms;
              });
            }
          });

          

          rooms.push({
            roomId,
            jobId: data.jobId,
            userId: data.userId,
            serviceProviderId: data.serviceProviderId,
            lastMessage: '',
            lastMessageTime: 0,
            isUnread: true, // Assume unread for demonstration; customize logic here
          });
        }

        rooms.sort((a, b) => b.lastMessageTime - a.lastMessageTime);

        setChatRooms(rooms);
        fetchJobDetailsForRooms(rooms);
      } else {
        console.log('No chat rooms found for you:', sspId);
      }
    } catch (error) {
      console.error('Error fetching chat rooms:', error);
    }
  };

  const fetchJobDetailsForRooms = async (rooms: ChatRoom[]) => {
    try {
      const jobDetailsMap: { [key: string]: JobDetails } = {};
      for (const room of rooms) {
        const response = await fetch('http://localhost/hq2sspapi/getJobDetails.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ jobId: room.jobId }),
        });

        if (response.ok) {
          const data = await response.json();
          const jobData = data.jobDetails;

          jobDetailsMap[room.jobId] = {
            skill: jobData?.skill || '',
            address: jobData?.address || '',
            local_government: jobData?.local_government || '',
            state: jobData?.state || '',
            additional_details: jobData?.additional_details || '',
            client_firstName: jobData?.client_firstName || '',
            client_lastName: jobData?.client_lastName || '',
          };
        } else {
          console.log('Error fetching job details for jobId:', room.jobId);
        }
      }
      setJobDetails(jobDetailsMap);
    } catch (error) {
      console.error('Error fetching job details:', error);
    }
  };

  const updateLastRead = async (roomId: string, userId: string) => {
    try {
      const docRef = doc(db, 'chatRooms', roomId, 'metadata', 'lastRead');
      const docSnap = await getDoc(docRef);

      // Check if the document exists
      if (docSnap.exists()) {
        // If it exists, update the document with server timestamp
        await updateDoc(docRef, { [userId]: serverTimestamp() });
      } else {
        // If the document doesn't exist, create it with server timestamp
        await setDoc(docRef, { [userId]: serverTimestamp() });
      }

      console.log('Last read timestamp successfully updated or created');
    } catch (error) {
      console.error('Error updating last read timestamp:', error.message);
    }
  };

  const openChat = async (chatRoomId: string, jobId: string) => {
    try {
      await updateLastRead(chatRoomId, sspId);
      history.push(`/chatpage/${chatRoomId}/${jobId}`);
    } catch (error) {
      console.error('Error navigating to chat page:', error);
    }
  };

  useEffect(() => {
    fetchChatRooms();
  }, [sspId]);

  return (
    <IonPage className={style.content}>
      <IonHeader className={style.header}>
        <div className={style.head}>Inbox</div>
      </IonHeader>
      <IonContent>
        <IonList lines="none">
          {chatRooms.map((chatRoom) => (
            <IonItem   
              style={{ "--backgroundColor": chatRoom.isUnread ? '#f0f8ff' : 'transparent'}}
              key={chatRoom.roomId} onClick={() => openChat(chatRoom.roomId, chatRoom.jobId)}>
              <IonLabel>
                {jobDetails[chatRoom.jobId] && (
                  <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <div style={{fontSize: "19px", fontWeight: "600"}}> {jobDetails[chatRoom.jobId].skill}</div>
                    <div style={{fontSize:"10px", alignItems:"center", display: "flex"}}> <IonIcon icon={locationOutline} /> {jobDetails[chatRoom.jobId].state}, {jobDetails[chatRoom.jobId].local_government}</div>
                  </div>
                )}
                {chatRoom.lastMessage && (
                  <div style={{display: "flex", justifyContent: "space-between", marginTop: "5px", alignItems: "center", border: "0px solid black"}}>
                    <div style={{fontSize: "16px"}}> {chatRoom.lastMessage}</div>
                    <div style={{fontSize: "10px", width: "40%", textAlign: "right"}}> {new Date(chatRoom.lastMessageTime * 1000).toLocaleString()}</div>
                  </div>
                )}
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Inbox;
