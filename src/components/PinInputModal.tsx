import React, { useState } from 'react';
import { IonModal, IonContent, IonToast } from '@ionic/react';
import style from './PinModal.module.css';

interface PinInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (pin: string) => void;
  ssp_id: string; // Add ssp_id as a prop
}

const PinInputModal: React.FC<PinInputModalProps> = ({ isOpen, onClose, onSubmit, ssp_id }) => {
  const [inputPin, setInputPin] = useState<string[]>(['', '', '', '']);
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const info = sessionStorage.getItem('Info');
  const parsed = info ? JSON.parse(info) : {};
  const [toastMessage, setToastMessage] = useState<string>('');
  const [status, setStatus] = useState<boolean>(false);
  const [bal, setBal] = useState<number>(0);



  const handleInputChange = (value: string, index: number) => {
    if (value.length <= 1) {
      const newPin = [...inputPin];
      newPin[index] = value;
      setInputPin(newPin);

      // Focus the next input if the current input is filled
      if (value && index < 3) {
        const nextInput = document.getElementById(`pin-input-${index + 1}`) as HTMLInputElement;
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !inputPin[index] && index > 0) {
      // Focus the previous input if the current one is empty and backspace is pressed
      const prevInput = document.getElementById(`pin-input-${index - 1}`) as HTMLInputElement;
      prevInput?.focus();
    }
  };

  const handleSubmit = async () => {
    const pin = inputPin.join('');
    if (pin.trim().length === 4) {
      setLoading(true);
      
      try {
        // Send PIN and ssp_id to the backend for validation
        const response = await fetch('http://localhost/hq2sspapi/validatePin.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pin, ssp_id }),
        });

        const data = await response.json();
        
        if (data.success) {
          onSubmit(pin);
          setInputPin(['', '', '', '']);
          setStatus(true);
          onClose
        } else {
          setShowToast(true)
          setToastMessage('Invalid PIN');
        }
      } catch (error) {
        console.error('Error during PIN validation:', error);
        setShowToast(true);
        setToastMessage('An error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please enter a valid 4-digit PIN.');
    }
  };

  return (
    <IonModal onDidDismiss={onClose} isOpen={isOpen} breakpoints={[0, 0.7]} initialBreakpoint={0.7} className={style.modal}>
      <IonContent className={style.content}>
        <h2 className="ion-text-center">Enter Your PIN</h2>
        <div className={style.inputCont}>
            {inputPin.map((digit, index) => (
              <input
                key={index}
                id={`pin-input-${index}`}
                type="number"
                maxLength={1}
                value={digit}
                onInput={(e) => handleInputChange(e.currentTarget.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={style.pinInput}
                inputMode="numeric"
                autoFocus={index === 0} // Autofocus the first input
              />
            ))}
        </div>
        <div className={style.butCont}>
          <button className={style.but} onClick={handleSubmit} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
        <IonToast
          isOpen={showToast}
          message={toastMessage}
          duration={2000}
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonModal>
  );
};

export default PinInputModal;
