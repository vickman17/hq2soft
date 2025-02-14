import { IonContent, IonPage } from "@ionic/react";
import  React from "react";
import style from "./styles/Support.module.css";
import whatsapp from "/svgnew/whatsapp.svg";
import mail from "/svgnew/envelope.svg";
import phone from "/svgnew/phone.svg";
import Header from "../components/Header";

const Support: React.FC = () =>{

      const handleMail = () => {
    window.location.href = "mailto:support@hq2soft.com";
  };


    const handleWhatsApp = () => {
      const phoneNumber = "2348032365280"; // Replace with your WhatsApp number
      const message = encodeURIComponent("Good day, I want to make enquiry on...");
      window.location.href = `https://wa.me/${phoneNumber}?text=${message}`;
    };


  const handleCall = () => {
    const phoneNumber = "+2348032365280"; // Replace with your phone number
    window.location.href = `tel:${phoneNumber}`;
  };

    return(
        <IonPage>
            <Header title="Support Center" />
            <IonContent className={style.content}>
                <div onClick={handleMail} className={style.item}>
                    <div className={style.iconCont}>
                    <img src={mail} />
                    </div>
                    <div>
                    Contact us at support@hq2soft.com
                    </div>
                </div>
                <div onClick={handleWhatsApp} className={style.item}>
                    <div className={style.iconCont}>
                    <img src={whatsapp} />
                    </div>
                    <div>
                       Chat with us on whatsapp
                    </div>
                </div>
                <div onClick={handleCall} className={style.item}>
                    <div className={style.iconCont}>
                    <img src={phone} />
                    </div>
                    <div>
                        Call Support
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Support;