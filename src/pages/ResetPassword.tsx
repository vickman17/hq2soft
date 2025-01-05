import { IonContent, IonPage } from "@ionic/react";
import React, {useState} from "react";
import { IonIcon } from "@ionic/react";
import { atSharp, lockClosedOutline, eyeOffOutline, eyeOutline, lockOpenOutline } from "ionicons/icons";
import style from "./styles/ResetPassword.module.css";

const ResetPassword: React.FC = () => {

      const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
      
    return(
       <IonPage>
        <IonContent>
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
                    name="password"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    placeholder="Password"
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
                    name="password"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    placeholder="Confirm Password"
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
                    <button className={style.but}>Reset Password</button>
                </div>

            </div>
        </IonContent>
       </IonPage>
    )
}

export default ResetPassword;