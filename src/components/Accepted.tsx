import React, { useEffect, useState } from 'react';
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonList, 
  IonItem, 
  IonLabel, 
  IonSpinner, 
  IonBadge,
  IonIcon,
} from '@ionic/react';
import axios from 'axios';
import style from "./Incoming.module.css";
import { checkmark, chevronUp, eyeSharp } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';


const Accepted: React.FC = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedJobId, setExpandedJobId] = useState<number | null>(null);
  const empty = "/assets/empty.png";
  const role = "service_provider";
  const history = useHistory();



  // Fetch service provider ID from session storage
  const info = sessionStorage.getItem('Info');
  const parsedInfo = info ? JSON.parse(info) : {};
  const sspId = parsedInfo?.ssp_id;

  useEffect(() => {
    const fetchJobsForProvider = async (providerId: string) => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.post('https://hq2soft.com/hq2sspapi/fetchAcceptedJob.php', {
          ssp_id: providerId,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.data.status === 'success') {
          setJobs(response.data.jobs || []);
        } else {
          setError(response.data.message || 'Unexpected error occurred.');
        }
      } catch (err) {
        setError('Failed to fetch jobs. Please try again.');
      }

      setLoading(false);
    };

    if (sspId) {
      fetchJobsForProvider(sspId);
    } else {
      setLoading(false);
      setError('Service provider ID is missing.');
    }
  }, [sspId]);

  const toggleExpand = (jobId: number) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId); // Toggle the selected job details
  };

  // Updated contactClient function to use the correct chat room ID
  const contactClient = async (chatRoomId: number, clientId: string, jobId: string) => {

    history.push(`/chatpage/${clientId}/${chatRoomId}/${jobId}`);
  

    try {
      const response = await axios.post('https://hq2soft.com/hq2sspapi/joinChatRoom.php', {
        ssp_id: sspId,
        chat_room_id: chatRoomId,
      });

      if (response.data.success) {
        console.log('You have successfully joined the chat.');
      } else {
        console.log('Failed to join the chat.');
      }
    } catch (err) {
      console.log('An error occurred while joining the chat.');
    }

    setLoading(false);
  };

  return (
    <div className={style.content}>
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <IonSpinner name="crescent" />
        </div>
      )}
      {!loading && error && (
        <div style={{ textAlign: 'center', color: 'grey' }}>
          <div><img src={empty} alt="No jobs" /></div>
          <div>No Accepted job at the moment.</div>
        </div>
      )}
      {!loading && jobs.length > 0 && (
        <IonList lines='none'>
          {jobs.map((job) => (
            <IonItem key={job.job_request_id}>
              <div className={style.item}>
                <div className={style.top}>
                  <div className={style.skill}>{job.skill}</div>
                  <div className={style.tag}><IonBadge>{job.job_request_status}</IonBadge></div>
                </div>
                <div className={style.time}><p>{job.job_assignment_created_at}</p></div>
                <div className={style.butCont}>
                  <div className={style.but}>
                    <button 
                      style={{background: "var(--ion-company-wood)"}}
                      onClick={() => toggleExpand(job.job_assignment_id)} // Pass the job_assignment_id to toggle the specific job's details
                      className={style.button}
                    >
                      <IonIcon 
                        className={style.icon} 
                        icon={expandedJobId === job.job_assignment_id ? chevronUp : eyeSharp} 
                      />
                      {expandedJobId === job.job_assignment_id ? 'Hide' : 'View'}
                    </button>
                  </div>
                  <div className={style.but}>
                    <button 
                      style={{background: "var(--ion-company-primary)"}}
                      className={style.button}
                      onClick={() => contactClient(job.chat_room_id, job.client_id, job.job_request_id)}// Pass the specific chat room ID
                    >
                      Contact Client
                    </button>
                  </div>
                </div>

                {expandedJobId === job.job_assignment_id && (
                  <div className={`${style.details} ${expandedJobId === job.job_assignment_id ? style.visible : ''}`}>
                    <p><strong>Client ID:</strong> {job.client_id}</p>
                    <p><strong>State:</strong> {job.state}</p>
                    <p><strong>Local Government:</strong> {job.local_government}</p>
                    <p><strong>Address:</strong> {job.address}</p>
                    <p><strong>Details:</strong> {job.additional_details}</p>
                    <p><strong>Created At:</strong> {job.job_request_created_at}</p>
                  </div>
                )}
              </div>
            </IonItem>
          ))}
        </IonList>
      )}
    </div>
  );
};

export default Accepted;
