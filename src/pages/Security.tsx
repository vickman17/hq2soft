import React, { useState } from "react";
import { IonPage, IonContent } from "@ionic/react";
import { useHistory } from "react-router";
import Header from "../components/Header";
import PinInputModal from "../components/PinInputModal"; // Import the Pin Modal
import style from "./styles/Security.module.css";
import mask from "/svgnew/mask.svg";
import password from "/svgnew/passwordSolid.svg";

const Security: React.FC = () => {
  const history = useHistory();
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  const info = sessionStorage.getItem('Info');
  const parsed = info ? JSON.parse(info) : {};

  const ssp_id = parsed?.ssp_id;

  const handleProtectedNavigation = (destination: string) => {
    setPendingAction(() => () => history.push(destination));
    setIsPinModalOpen(true); // Open the PIN modal
  };

  const handlePinSubmit = (pin: string) => {
    console.log("Authenticated with PIN:", pin);
    if (pendingAction) {
      pendingAction(); // Execute the stored navigation action after authentication
    }
    setIsPinModalOpen(false);
  };

  return (
    <IonPage>
      <Header title="Security Settings" />
      <IonContent>
        <div className={style.list}>
          <div className={style.but} onClick={() => handleProtectedNavigation("/resetpassword")}>
            <div className={style.butIcon}><img src={password} style={{width: "20px"}} /></div>
            <div className={style.word}>Password Reset</div>
          </div>
          <div className={style.but} onClick={() => handleProtectedNavigation("/report-activity")}>
            <div className={style.butIcon} style={{marginTop: "6px"}}><img src={mask} style={{width: "20px"}}/></div>
            <div className={style.word}>Report Suspicious Activity</div>
          </div>
        </div>

        <div className={style.del} onClick={() => handleProtectedNavigation("/delete-account")}>
          {/* <div style={style.butIcon}><img src={} /></div> */}
          <div>Account Deletion</div>
        </div>
      </IonContent>

      {/* PIN Modal for Verification */}
      <PinInputModal 
        isOpen={isPinModalOpen}
        onClose={() => setIsPinModalOpen(false)}
        onSubmit={handlePinSubmit}
        ssp_id={ssp_id}
      />
    </IonPage>
  );
};

export default Security;
