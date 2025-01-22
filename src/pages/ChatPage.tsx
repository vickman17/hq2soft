import React, { useEffect, useState, useRef } from 'react';
import {
  IonPage,
  IonHeader,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonModal,
  IonButton,
  IonTextarea,
} from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import { sendSharp, cameraSharp, arrowBack, informationSharp } from 'ionicons/icons';
import style from './styles/ChatPage.module.css';
import { getDatabase, ref, onValue, push, set } from 'firebase/database';
import {database, firebaseApp} from '../firebase/firebaseConfig'; // Your Firebase configuration file

interface Message {
  sender_id: string;
  receiver_id: string;
  message: string;
  timestamp: string;
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

const ChatPage: React.FC = () => {
  const { chatRoomId, clientId, jobId } = useParams<{ chatRoomId: string; clientId: string; jobId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [jobDetails, setJobDetails] = useState<JobDetails | null>(null);
  const [isJobModalOpen, setIsJobModalOpen] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const history = useHistory();

  const database = getDatabase(firebaseApp);
  const messagesRef = ref(database, `chatRooms/${chatRoomId}/messages`);

  const info = sessionStorage.getItem('Info');
  const parsedInfo = info ? JSON.parse(info) : {};
  const sspId = parsedInfo?.ssp_id;

  useEffect(() => {
    // Listen for new messages in the chat room
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedMessages: Message[] = data ? Object.values(data) : [];
      setMessages(loadedMessages);
    });

    return () => unsubscribe();
  }, [messagesRef]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (!newMessage || !chatRoomId || !sspId || !clientId) return;

    const message: Message = {
      sender_id: sspId,
      receiver_id: clientId,
      message: newMessage,
      timestamp: new Date().toISOString(),
    };

    try {
      const newMessageRef = push(messagesRef);
      await set(newMessageRef, message);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const fetchJobDetails = async () => {
    if (!jobId) return;

    try {
      const jobDetailsRef = ref(database, `jobs/${jobId}`);
      onValue(jobDetailsRef, (snapshot) => {
        const data = snapshot.val();
        setJobDetails(data || null);
      });
    } catch (error) {
      console.error('Error fetching job details:', error);
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, [jobId]);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = event.target.value;
    setNewMessage(inputText);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const openDetails = () => setIsJobModalOpen(true);

  return (
    <IonPage>
      <IonHeader className={style.head}>
        <div onClick={()=>history.push('/inbox')} className={style.back}>
          <IonIcon icon={arrowBack} />
        </div>

        <div className={style.chatName}>
          {jobDetails?.skill} - {jobDetails?.client_firstName}
        </div>

        <div onClick={openDetails} className={style.back}>
          <IonIcon icon={informationSharp} />
        </div>
      </IonHeader>
      <IonContent className={style.content} style={{  "--overflow": "hidden", position: "relative", marginTop:"14rem" }}>
        <div className={style.chatField}>
        <IonList lines="none">
          {messages.map((message, index) => (
            <IonItem key={index}>
              <div style={{border:"0px solid", width:"100%", marginTop:"12px"}}>
              <div
                style={{
                  padding: "0",
                  paddingBlock: "15px",
                  paddingInline: "10px",
                  fontSize: "16px",
                  textAlign: "left",
                  width: "fit-content",
                  color: "white",
                  maxWidth: "80%",
                  wordBreak: "break-word",
                  whiteSpace: 'pre-wrap',
                  background: message.sender_id === sspId ? "linear-gradient(320deg, var(--ion-company-secondary), var(--ion-company-primary))" : "var(--ion-company-secondary)",
                  borderTopLeftRadius: message.sender_id === sspId ? "1rem" : "1rem",
                  borderTopRightRadius: message.sender_id === sspId ? "1rem" : "1rem",
                  borderBottomLeftRadius: message.sender_id === sspId ? "1rem" : "0",
                  borderBottomRightRadius: message.sender_id === sspId ? "0" : "1rem",
                  margin: message.sender_id === sspId ? "7px 0 0 auto" : "7px auto 0 0",
                }}
              >
                {message.message}
              </div>
              <p style={{
                  fontSize: "11.5px",
                  width: "fit-content",
                  margin: message.sender_id === sspId ? "3px 0 0 auto" : "3px 0 auto 0",
                  border: "0px solid",
                  color: "grey"
                }}>
                  {new Date(message.timestamp).toLocaleTimeString(
                    [],{
                      hour: '2-digit', minute: '2-digit', second: '2-digit'
                    }
                  )}
                </p>
                </div>
            </IonItem>
          ))}
          <div ref={messagesEndRef}></div>
        </IonList>
        </div>
      <div className={style.bottomContent}>
        <div className={style.chatBox}>
        <textarea
          ref={textareaRef}
          value={newMessage}
          onInput={handleInput}
          className={style.textArea}
          style={{
            width: '100%',
            overflow: 'hidden', // Prevents scrollbar until maxHeight is reached
            resize: 'none', // Disables manual resizing
            boxSizing: 'border-box',
            outline: 'none',
            height: newMessage.includes('\n') ? `${Math.min(textareaRef.current?.scrollHeight || 20, 200)}px` : '20px', // Dynamic height based on newline
            minHeight: '32px', // Fixed initial single-line height
            maxHeight: '200px', // Maximum height before scrollbar
            border: '1px solid #ccc',
            padding: '5px',
            fontSize: '16px',
            lineHeight: '1.5',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        ></textarea>
     </div>
     <div className={style.sendButton}>
            {newMessage.trim().length > 0 ? (
              <div className={style.iconCont}>
                <IonIcon className={style.icon} onClick={sendMessage} icon={sendSharp} />
              </div>
            ) : (
              <div className={style.iconCont}>
                <IonIcon className={style.icon} icon={cameraSharp} />
              </div>
            )}
          </div>
        </div>
	      <IonModal isOpen={isJobModalOpen} className={style.modal} onDidDismiss={() => setIsJobModalOpen(false)}>
              {jobDetails ? (
                <div>
                  <div className={style.modalHead}>JOB DETAILS</div>
                  <div className={style.skill}>{jobDetails?.skill}</div>
                  <div className={style.set}>
                    <fieldset className={style.field}>
                      <legend className={style.add}>Address</legend>
                      <div className={style.row}>
                        <div className={style.colHead}>State</div>
                        <div className={style.colBody}>{jobDetails?.state}</div>
                      </div>
                      <div className={style.row}>
                        <div className={style.colHead}>LGA</div>
                        <div className={style.colBody}>{jobDetails?.local_government}</div>
                      </div>
                      <div className={style.row}>
                        <div className={style.colHead}>House / Street Address</div>
                        <div className={style.colBody}>{jobDetails?.address}</div>
                      </div>
                    </fieldset>
                  </div>
                  <div className={style.set}>
                    <fieldset className={style.field}>
                      <legend className={style.add}>Additional Details</legend>
                     <div>{jobDetails?.additional_details}</div>
                    </fieldset>
                  </div>
                </div>
              ) : (
                <p>Loading job details...</p>
              )}
              <IonButton className={style.closeModal} onClick={() => setIsJobModalOpen(false)} expand="block">
                Close
              </IonButton>
        </IonModal>
      </IonContent>
    </IonPage>
    );
};

export default ChatPage;
