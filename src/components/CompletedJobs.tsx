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


const CompletedJobs: React.FC = () => {
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
        const response = await axios.post('https://hq2soft.com/hq2sspapi/fetchCompletedJob.php', {
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


  const markAsCompleted = async (jobRequestId: string) => {
    setLoading(true);
    try {
      const response = await axios.post('https://hq2soft.com/hq2sspapi/jobUpdate.php', {
        job_request_id: jobRequestId,
      });
  
      if (response.data.status === 'success') {
        console.log('Job marked as completed.');
        // Optionally, refresh the jobs list
        // setJobs((prevJobs) =>
        //   prevJobs.map((job) =>
        //     job.job_request_id === jobRequestId
        //       ? { ...job, job_request_status: 'completed' }
        //       : job
        //   )
        // );
      } else {
        console.error('Error:', response.data.message);
      }
    } catch (err) {
      console.error('Failed to update job status.', err);
    }
    setLoading(false);
  };
  


  return (
    <div className={style.content}>
     
     {!loading && jobs.length === 0 && (
    <div style={{ textAlign: 'center', color: 'grey' }}>
      <div><img src={empty} alt="No jobs" /></div>
      <div>No completed jobs.</div>
    </div>
  )}
  {!loading && jobs.length > 0 && jobs.some(job => job.job_request_status === "completed") ? (
    <IonList lines='none'>
      {jobs.map((job) => (
        job.job_request_status === "completed" && (
          <IonItem key={job.job_request_id}>
            <div className={style.item}>
              <div className={style.top}>
                <div className={style.skill}>{job.skill}</div>
                <div className={style.tag}>
                  <IonBadge style={{ background: "var(--ion-company-wood)" }}>
                    Completed
                  </IonBadge>
                </div>
              </div>
              <div className={style.time}><p>{job.job_assignment_created_at}</p></div>
              <div className={style.butCont}>
                <button className={style.button}>Close</button>
              </div>

              {expandedJobId === job.job_assignment_id && (
                <div className={`${style.details} ${style.visible}`}>
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
        )
      ))}
    </IonList>
  ) : (
    !loading && jobs.length > 0 && (
      <div style={{ textAlign: 'center', color: 'grey' }}>
        <div><img src={empty} alt="No jobs" /></div>
        <div>No completed jobs.</div>
      </div>
    )
  )}

    </div>
  );
};

export default CompletedJobs;
