import React, { useState } from "react";
import {
  IonModal,
  IonButton,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonToast,
} from "@ionic/react";
import style from "./PinModal.module.css";

type PinModalProps = {
  isOpen: boolean;
  mode: "setup" | "validate"; // Determine the mode (setup or validate)
  onClose: () => void;
};

const PinModal: React.FC<PinModalProps> = ({ isOpen, mode, onClose }) => {
  const [pin, setPin] = useState<string[]>(["", "", "", ""]);
  const [confirmPin, setConfirmPin] = useState<string[]>(["", "", "", ""]);
  const [step, setStep] = useState<"enter" | "confirm">("enter"); // Tracks steps during setup
  const [showToast, setShowToast] = useState(false);
  const info = sessionStorage.getItem('Info');
  const parsed = info ? JSON.parse(info) : {};

  const ssp_id = parsed?.ssp_id;

  const handleInputChange = (
    value: string,
    index: number,
    isConfirm?: boolean
  ) => {
    const targetPin = isConfirm ? confirmPin : pin;
    const newPin = [...targetPin];
    newPin[index] = value.slice(-1); // Ensure only one digit is accepted
    if (isConfirm) {
      setConfirmPin(newPin);
    } else {
      setPin(newPin);
    }

    // Automatically focus the next input
    if (value.length === 1 && index < 3) {
      const nextInput = document.getElementById(
        `${isConfirm ? "confirm-pin" : "pin"}-${index + 1}`
      );
      nextInput?.focus();
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number,
    isConfirm?: boolean
  ) => {
    const targetPin = isConfirm ? confirmPin : pin;

    if (event.key === "Backspace" && targetPin[index] === "" && index > 0) {
      const prevInput = document.getElementById(
        `${isConfirm ? "confirm-pin" : "pin"}-${index - 1}`
      );
      prevInput?.focus();
    }
  };

  const handleSubmit = async () => {
    const enteredPin = pin.join("");

    if (mode === "setup") {
      if (step === "enter") {
        if (enteredPin.length === 4) {
          setStep("confirm");
        } else {
          alert("Please enter a 4-digit PIN");
        }
      } else {
        const enteredConfirmPin = confirmPin.join("");
        if (enteredPin === enteredConfirmPin) {
          // Save PIN to backend
          try {
            const response = await fetch("http://localhost/hq2sspapi/savePin.php", {
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
    } else if (mode === "validate") {
      if (enteredPin.length === 4) {
        try {
          const response = await fetch("http://localhost/hq2sspapi/validatePin.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pin: enteredPin, ssp_id: ssp_id }),
          });

          const result = await response.json();
          if (result.success) {

            setShowToast(true);
            onClose();
          } else {
            alert("Invalid PIN. Please try again.");
            setPin(["", "", "", ""]);
          }
        } catch (error) {
          console.error("Error validating PIN:", error);
        }
      } else {
        alert("Please enter a 4-digit PIN");
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
          {mode === "setup"
            ? step === "enter"
              ? "Set Your PIN"
              : "Confirm Your PIN"
            : "Enter Your PIN"}
        </h2>
        <div >
          <div className={style.inputCont}>
            {(step === "confirm" && mode === "setup" ? confirmPin : pin).map(
              (digit, index) => (
                <div className={style.row} key={index}>
                  <input
                    id={`${step === "confirm" ? "confirm-pin" : "pin"}-${index}`}
                    type="number"
                    maxLength={1}
                    value={digit}
                    onChange={(e) =>
                      handleInputChange(
                        e.target.value,
                        index,
                        step === "confirm"
                      )
                    }
                    onKeyDown={(e) =>
                      handleKeyDown(e, index, step === "confirm")
                    }
                    className={style.pinInput}
                  />
                </div>
              )
            )}
          </div>
        </div>
        <div className={style.butCont}>
            <button className={style.but} onClick={handleSubmit}>
            {mode === "setup" && step === "confirm" ? "Save PIN" : "Submit"}
            </button>
        </div>
        <IonToast
          isOpen={showToast}
          message={
            mode === "setup"
              ? "PIN setup successful!"
              : "Authentication successful!"
          }
          duration={2000}
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonModal>
  );
};

export default PinModal;
