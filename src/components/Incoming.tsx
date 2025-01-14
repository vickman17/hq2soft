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
import { checkmark, checkmarkDone, chevronUp, eyeSharp } from 'ionicons/icons';

const Incoming: React.FC = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedJobId, setExpandedJobId] = useState<number | null>(null);
  const empty = "/assets/empty.png";


  // Fetch service provider ID from session storage
  const info = sessionStorage.getItem('Info');
  const parsedInfo = info ? JSON.parse(info) : {};
  const sspId = parsedInfo?.ssp_id;

  useEffect(() => {
    const fetchJobsForProvider = async (providerId: string) => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get('http://localhost/hq2sspapi/jobHandler.php', {
          params: { ssp_id: providerId },
          headers: {
            'Accept': 'application/json',
          },
        });

        if (Array.isArray(response.data)) {
          // If the response is an array, set it as jobs
          setJobs(response.data);
        } else if (response.data?.message) {
          // If there's a message, handle it as an error or info
          setError(response.data.message);
          setJobs([]);
        } else {
          setError('Unexpected response format from server.');
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
    // If the job clicked is already expanded, collapse it by setting to null
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };

  const acceptJob = async (jobId: number) => {

    try {
      const response = await axios.post('http://localhost/hq2sspapi/acceptJob.php', {
        job_id: jobId,
        ssp_id: sspId,
      });

      if (response.data.success) {
        // Remove the accepted job from the current list
        setJobs((prevJobs) => prevJobs.filter((job) => job.job_assignment_id !== jobId));
      } else {
        alert(response.data.message || 'Failed to accept the job.');
      }
    } catch (err) {
      console.error('Error accepting job:', err);
      alert('An error occurred while accepting the job. Please try again.');
    }
  };

  return (
    <div className={style.content}>
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <IonSpinner name="crescent" />
        </div>
      )}
      {!loading && error && <div style={{ textAlign: 'center', color: 'grey' }}>
      <div><img src={empty} /></div>
      <div style={{ textAlign: 'center' }}>No incoming job at the moment.</div>
        </div>}
      {!loading && jobs.length > 0 && (
        <IonList lines='none'>
          {jobs.map((job, index) => (
            <IonItem key={index}>
              <div className={style.item}>
                <div className={style.top}>
                  <div className={style.skill}>
                    {job.skill}
                  </div>
                  <div className={style.tag}>
                    <IonBadge>{job.tag}</IonBadge>
                  </div>
                </div>
                <div className={style.time}>
                  <p>{job.job_assignment_created_at}</p>
                </div>
                <div className={style.butCont}>
                  <div className={style.but}>
                    <button 
                      style={{background: "var(--ion-company-secondary)"}}
                      onClick={() => toggleExpand(job.job_assignment_id)} 
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
                      onClick={() => acceptJob(job.job_request_id)}
                    >
                      <IonIcon className={style.icon} icon={checkmark} /> Accept
                    </button>
                  </div>
                </div>
                {expandedJobId === job.job_assignment_id && (
                  <div className={`${style.details} ${expandedJobId === job.job_assignment_id ? style.visible : ''}`}>
                    <p><strong>Client ID:</strong> {job.client_id}</p>
                    <p><strong>State:</strong> {job.state}</p>
                    <p><strong>Local Government:</strong> {job.local_government}</p>
                    <p><strong>Address:</strong> {job.address}</p>
                    <p><strong>Additional Details:</strong> {job.additional_details}</p>
                    <p><strong>Created At:</strong> {job.job_request_created_at}</p>
                    <p><strong>Status:</strong> {job.job_request_status}</p>
                  </div>
                )}
              </div>
            </IonItem>
          ))}
        </IonList>
      )}
      {!loading && !error && jobs.length === 0 && (
        <>

        </>
      )}
    </div>
  );
};

export default Incoming;
