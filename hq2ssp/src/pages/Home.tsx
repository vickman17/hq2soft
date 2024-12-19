import React, { useState } from "react";
import { IonContent, IonPage, IonModal, IonHeader } from "@ionic/react";
import style from "./styles/Home.module.css";
import { useHistory } from "react-router";

const Home: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showLogo, setShowLogo] = useState(false); // State to control logo visibility
  const history = useHistory();



  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
    setShowLogo(true); // Show the logo when the modal is opened
    console.log("modal opened");
  };

  const signup = () => {
    setShowModal(false);
    setShowLogo(false);
    history.push('/signup');
  }

  const login = () => {
    setShowModal(false);
    setShowLogo(false);
    history.push('/login')
  }



  const logo = "/assets/icon.png";

  return (
    <IonPage>
      <IonContent className={style.videoContainer}>
        {/* Video Background */}
        <video autoPlay muted loop className={style.videobg}>
          <source src="/assets/videoback.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Glass Container */}
        <div className={style.glass}>
          {/* Conditionally Rendered Logo */}
          <div
            className={`${style.logo} ${showLogo ? style.showLogo : ""}`}
          >
            <img src={logo} alt="Logo" />
          </div>

          {/* Content */}
          <div className={style.write}>
            <div className={style.writeup}>
              Your Skills, Our Platform - Seamless Opportunities Await.
            </div>
            <div className={style.butCov}>
              <button onClick={openModal} className={style.but}>
                Let's Go!
              </button>
            </div>
          </div>
        </div>
      </IonContent>

      {/* Modal */}
      <IonModal
        className={style.partialModal}
        isOpen={showModal}
        onDidDismiss={closeModal}
      >
        <div className={style.modalCont}>
          <div className={style.action}>
            <button
              onClick={signup}
              style={{ background: "#fef500"}}
              className={style.enter}
            >
              Sign Up
            </button>
          </div>
          <div className={style.or}>or</div>
          <div className={style.action}>
            <button
              style={{background:"white"}}
              onClick={login} 
              className={style.enter}>
              Login
            </button>
          </div>
          <div className={style.tag}>
          Powered by Strive inc.
        </div>
        </div>
      </IonModal>
    </IonPage>
  );
};

export default Home;
