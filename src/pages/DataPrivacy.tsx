import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
} from "@ionic/react";
import Header from "../components/Header";


const DataPrivacy: React.FC = () => {
  return (
    <IonPage>
        <Header title="Data Privacy" />
      <IonContent style={{fontFamily: "Quicksand"}}>
        <div style={{width: "95%", margin: "auto"}}>
            <h2>Introduction</h2>
            <p>
              HQ2 Soft Services ("we," "us," or "our") is committed to protecting the
              privacy and security of our service providers' personal and business data.
              This Data Privacy Policy explains how we collect, use, disclose, and protect the
              personal and business data of our service providers who subscribe to our
              service application online.
            </p>

            <h2>Scope</h2>
            <p>
              This policy applies to all service providers who subscribe to our service
              application online, including but not limited to:
            </p>
            <ul>
              <li>Individuals</li>
              <li>Businesses</li>
              <li>Partners</li>
              <li>Contractors</li>
            </ul>

            <h2>Data Collection</h2>
            <p>We collect the following types of data from our service providers:</p>
            <ul>
              <li><strong>Personal Data:</strong> name, email address, phone number, physical address</li>
              <li><strong>Business Data:</strong> business name, business address, tax identification number, business license information</li>
              <li><strong>Service Data:</strong> service offerings, pricing, availability</li>
              <li><strong>Technical Data:</strong> IP address, browser type, device type</li>
            </ul>

            <h2>Data Use</h2>
            <p>We use the collected data for the following purposes:</p>
            <ul>
              <li><strong>Service Provision:</strong> to provide our service application and facilitate online subscriptions</li>
              <li><strong>Communication:</strong> to communicate with our service providers regarding their subscriptions, services, and other relevant matters</li>
              <li><strong>Marketing:</strong> to promote our services and provide updates on new features and offerings</li>
              <li><strong>Analytics:</strong> to analyze and improve our service application and overall business operations</li>
            </ul>

            <h2>Data Disclosure</h2>
            <p>We may disclose our service providers' data to:</p>
            <ul>
              <li><strong>Third-Party Service Providers:</strong> who assist us in providing our service application and facilitating online subscriptions</li>
              <li><strong>Partners and Contractors:</strong> who work with us to provide services and support</li>
              <li><strong>Law Enforcement and Regulatory Agencies:</strong> as required by law or to comply with regulatory requirements</li>
            </ul>

            <h2>Data Protection</h2>
            <p>
              We implement reasonable and appropriate technical and organizational measures to
              protect our service providers' data from unauthorized access, disclosure, alteration, or destruction. These measures include:
            </p>
            <ul>
              <li><strong>Encryption:</strong> we encrypt our service providers' data in transit and at rest</li>
              <li><strong>Access Controls:</strong> we implement access controls to ensure that only authorized personnel can access our service providers' data</li>
              <li><strong>Data Backup and Recovery:</strong> we regularly back up our service providers' data and have a disaster recovery plan in place</li>
            </ul>

            <h2>Data Retention</h2>
            <p>
              We retain our service providers' data for as long as necessary to provide our
              services and to comply with applicable laws and regulations.
            </p>

            <h2>Data Subject Rights</h2>
            <p>Our service providers have the following rights:</p>
            <ul>
              <li><strong>Right to Access:</strong> to access their personal and business data</li>
              <li><strong>Right to Rectification:</strong> to correct any inaccuracies in their personal and business data</li>
              <li><strong>Right to Erasure:</strong> to request the deletion of their personal and business data</li>
              <li><strong>Right to Restrict Processing:</strong> to restrict the processing of their personal and business data</li>
              <li><strong>Right to Data Portability:</strong> to request the transfer of their personal and business data to another service provider</li>
            </ul>

            <h2>Changes to this Policy</h2>
            <p>
              We reserve the right to update this Data Privacy Policy at any time. We will
              notify our service providers of any changes by posting an updated version of this
              policy on our website.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions or concerns about this Data Privacy Policy, please contact
              us at <a href="mailto:Admin@hq2soft.com">Admin@hq2soft.com</a> or call +234 08032365280.
            </p>
            <p>
              By subscribing to our service application online, you acknowledge that you have read,
              understood, and agree to be bound by this Data Privacy Policy.
            </p>
            </div>
          </IonContent>
    </IonPage>
  );
};

export default DataPrivacy;
