import React, { useState } from "react";
import {
  IonModal,
  IonContent,
  IonToast,
} from "@ionic/react";
import style from "./PinModal.module.css";

type PinModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const PinModal: React.FC<PinModalProps> = ({ isOpen, onClose }) => {
  const [pin, setPin] = useState<string[]>(["", "", "", ""]);
  const [confirmPin, setConfirmPin] = useState<string[]>(["", "", "", ""]);
  const [step, setStep] = useState<"enter" | "confirm">("enter");
  const [showToast, setShowToast] = useState(false);
  const info = sessionStorage.getItem('Info');
  const parsed = info ? JSON.parse(info) : {};
  const ssp_id = parsed?.ssp_id;

  const handleInputChange = (value: string, index: number, isConfirm?: boolean) => {
    const targetPin = isConfirm ? confirmPin : pin;
    const newPin = [...targetPin];
    newPin[index] = value.slice(-1);
    if (isConfirm) {
      setConfirmPin(newPin);
    } else {
      setPin(newPin);
    }
    if (value.length === 1 && index < 3) {
      const nextInput = document.getElementById(
        `${isConfirm ? "confirm-pin" : "pin"}-${index + 1}`
      );
      nextInput?.focus();
    }
  };

  const handleSubmit = async () => {
    const enteredPin = pin.join("");
    if (step === "enter") {
      if (enteredPin.length === 4) {
        setStep("confirm");
      } else {
        alert("Please enter a 4-digit PIN");
      }
    } else {
      const enteredConfirmPin = confirmPin.join("");
      if (enteredPin === enteredConfirmPin) {
        try {
          const response = await fetch("https://hq2soft.com/hq2sspapi/savePin.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pin: enteredPin, ssp_id: ssp_id }),
          });

          const result = await response.json();
          if (result.success) {
            sessionStorage.setItem("Info", JSON.stringify(result.user));
            setShowToast(true);
            onClose();
          } else {
            alert("Error saving PIN. Please try again.");
          }
        } catch (error) {
          console.error("Error saving PIN:", error);
        }
      } else {
        alert("PINs do not match. Please try again.");
        setPin(["", "", "", ""]);
        setConfirmPin(["", "", "", ""]);
        setStep("enter");
      }
    }
  };

  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onClose}
      breakpoints={[0, 0.6]}
      initialBreakpoint={0.6}
      className={style.modal}
    >
      <IonContent className="ion-padding">
        <h2 className="ion-text-center">
          {step === "enter" ? "Set Your PIN" : "Confirm PIN"}
        </h2>
        <div style={{ fontSize: "13px", textAlign: "center" }}>
          {step === "enter" ? "Create security pin for your account" : "Re-enter your pin"}
        </div>
        <div className={style.inputCont}>
          {(step === "confirm" ? confirmPin : pin).map((digit, index) => (
            <div className={style.row} key={index}>
              <input
                id={`${step === "confirm" ? "confirm-pin" : "pin"}-${index}`}
                type="number"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(e.target.value, index, step === "confirm")}
                className={style.pinInput}
              />
            </div>
          ))}
        </div>
        <div className={style.butCont}>
          <button className={style.but} onClick={handleSubmit}>
            {step === "confirm" ? "Save PIN" : "Next"}
          </button>
        </div>
        <IonToast
          isOpen={showToast}
          message="PIN setup successful!"
          duration={2000}
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonModal>
  );
};

export default PinModal;
