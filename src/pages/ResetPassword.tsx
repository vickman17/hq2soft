import { IonContent, IonPage, IonIcon, IonToast, IonHeader } from "@ionic/react";
import React, { useState } from "react";
import {
  lockClosedOutline,
  eyeOffOutline,
  eyeOutline,
  lockOpenOutline,
} from "ionicons/icons";
import style from "./styles/ResetPassword.module.css";
import Back from "../components/Back";

const ResetPassword: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const info = sessionStorage.getItem('Info');
  const parsed = info ? JSON.parse(info) : {};
  const [load, setLoad] = useState<boolean>(false);

  const ssp_id = parsed?.ssp_id;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleResetPassword = async () => {
    setLoad(true);

    if (!ssp_id || !password || !confirmPassword) {
      setToastMessage("All fields are required.");
      setShowToast(true);
      setLoad(false)
      return;
    }

    if (password !== confirmPassword) {
      setToastMessage("Passwords do not match.");
      setShowToast(true);
      setLoad(false)
      return;
    }

    try {
      const response = await fetch("https://hq2soft.com/hq2sspapi/resetPassword.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ssp_id: ssp_id,
          new_password: password,
        }),
      });

      const data = await response.json();
      setLoad(false);
      setToastMessage(data.message);
      setShowToast(true);
    } catch (error) {
      setToastMessage("Error resetting password.");
      setShowToast(true);
    }finally{
      setLoad(false)
    }
  };

  return (
    <IonPage>
      <IonHeader style={{border: "none", boxShadow: "none", paddingBlock: "3px"}}>
        <Back/>
      </IonHeader>
      <IonContent style={{fontFamily: "Quicksand"}}>
        <div className={style.head}>
          <div className={style.bigHead}>Reset Password</div>
          <div className={style.smallHead}>Input your new password below</div>
        </div>
        <div className={style.cont}>
          <div className={style.input}>
            <div className={style.iconCont}>
              <IonIcon className={style.icon} icon={lockOpenOutline} />
            </div>
            <div className={style.passCont}>
              <input
                className={style.passDetails}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <IonIcon
                icon={showPassword ? eyeOffOutline : eyeOutline}
                className={style.passwordToggleIcon}
                onClick={togglePasswordVisibility}
              />
            </div>
          </div>
          <div className={style.input}>
            <div className={style.iconCont}>
              <IonIcon className={style.icon} icon={lockClosedOutline} />
            </div>
            <div className={style.passCont}>
              <input
                className={style.passDetails}
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <IonIcon
                icon={showPassword ? eyeOffOutline : eyeOutline}
                className={style.passwordToggleIcon}
                onClick={togglePasswordVisibility}
              />
            </div>
          </div>
          <div className={style.butCont}>
            <button className={style.but} style={{background: load === true ? "grey" : "", }} onClick={handleResetPassword}>
              { load === true ? "Processing" : "Reset Password"}
            </button>
          </div>
        </div>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
        />
      </IonContent>
    </IonPage>
  );
};

export default ResetPassword;
