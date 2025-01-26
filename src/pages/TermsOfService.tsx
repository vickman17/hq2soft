import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonText,
} from '@ionic/react';
import Header from '../components/Header';

const TermsOfService: React.FC = () => {
  return (
    <IonPage>
        <Header title='Terms of Services' />
      <IonContent className="ion-padding">
        <IonText>
          <h2>HQ2 SOFT Terms of Service</h2>
          <p>
            The Soft Service Provider (SSP) agrees to provide services in the area of expertise listed in the subscription/registration form.
          </p>
          <h3>Service Assignment</h3>
          <ul>
            <li>
              Services will be assigned by Soft Service Managers (SSM) and not directly by clients until SSP is certified and verified based on HQ2 Soft Verification and Certification policies.
            </li>
            <li>
              Assigned services must be accepted by SSP within 12 hours of job posting.
            </li>
            <li>
              All jobs accepted will be overseen by Soft Service Supervisors (SSS), who will interact with guests at all stages of the service/job until completion.
            </li>
            <li>
              Any deliberate attempt by SSP to circumvent the SSS to create formal interactions with clients/customers will be classified as a breach of agreement and could result in delisting from HQ2 Soft Portals.
            </li>
          </ul>

          <h3>Professional Conduct</h3>
          <ul>
            <li>
              All assigned jobs must be carried out using approved Personal Protective Equipment (PPE). If provided by HQ2 Soft, PPEs must be returned in good condition upon job completion.
            </li>
            <li>
              All services must adhere to standard operating procedures, prioritizing safety and environmental considerations.
            </li>
            <li>
              SSPs are expected to maintain professional conduct. Misconduct, such as noise, drug abuse, fighting, stealing, or intentional damage, will be reported to law enforcement.
            </li>
            <li>
              SSPs should avoid creating unrelated relationships with clients, customers, or their associates.
            </li>
          </ul>

          <h3>Mobility and Costs</h3>
          <ul>
            <li>
              Mobility costs will be added to the SSP service charge. If HQ2 Soft provides mobility cost, it will be deducted from the service charge before payment.
            </li>
            <li>
              SSPs are expected to arrive at the service location as agreed with the SSM.
            </li>
          </ul>

          <h3>Work Scope and Disputes</h3>
          <ul>
            <li>
              Any irregularities or changes in work scope at the service location should be reported to the SSS or SSM, not the client.
            </li>
            <li>
              All disputes must be resolved within 24 hours. Arguments or disagreements at the service site will not be tolerated by HQ2 Soft.
            </li>
          </ul>

          <h3>Tools and Equipment</h3>
          <ul>
            <li>
              SSPs are expected to use personal standard tools and equipment for regular assignments. If HQ2 Soft provides tools, the service charge percentage may be reduced by 5-10%.
            </li>
            <li>
              SSPs cannot reassign jobs to apprentices or third parties without explicit approval from HQ2 Soft.
            </li>
          </ul>

          <h3>Agreement Breach</h3>
          <p>
            Any breach of the above agreement could result in blacklisting or delisting from the HQ2 Soft Portal.
          </p>

          <h2>Payment Terms and Conditions</h2>
          <p>
            By checking the box, you have also agreed to HQ2 Soft terms of payments as follows:
          </p>
          <ul>
            <li>
              Amount payable for each service/job you have accepted will reflect on your job space account section as "Service Charge Due" in local currency, shown in amber color.
            </li>
            <li>
              The Service Charge Due will become active and available for withdrawal, shown in green color, upon successful job completion to guest satisfaction, as evident in the job completion form signed by the guest.
            </li>
            <li>
              You will also receive a passive income equivalent to 5% of your Active Service Charge, accruable from every job successfully completed and withdrawable after 7 days.
            </li>
            <li>
              The cost of a successfully completed job/service that develops an issue within 90 days due to SSP responsibility may be deducted from your passive income, which could result in a negative balance.
            </li>
            <li>
              Your Service Charge Due can be withheld for any breach of the SSP Service Agreement.
            </li>
            <li>
              You will create an account wallet for convenient money withdrawal or deposit.
            </li>
            <li>
              An annual bonus of 100% of your annual passive income will be paid to any SSP who successfully completes 100 services/jobs annually and maintains a 4-5 star rating based on customer feedback.
            </li>
            <li>
              Any payment error or transaction failure will be resolved within 48 hours on weekdays and 72 hours on weekends.
            </li>
          </ul>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default TermsOfService;
