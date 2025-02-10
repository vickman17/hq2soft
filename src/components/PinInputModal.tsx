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
  const [toastMessage, setToastMessage] = useState<string>('');

  const handleInputChange = (value: string, index: number) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
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
    if (pin.length === 4) {
      setLoading(true);
      
      try {
        const response = await fetch('https://hq2soft.com/hq2sspapi/validatePin.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pin, ssp_id }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.success) {
          onSubmit(pin);
          setInputPin(['', '', '', '']);
          onClose(); // Properly close the modal
        } else {
          setShowToast(true);
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
      setShowToast(true);
      setToastMessage('Please enter a valid 4-digit PIN.');
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
              type="tel"
              pattern="\d*"
              maxLength={1}
              value={digit}
              onInput={(e) => handleInputChange(e.currentTarget.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={style.pinInput}
              inputMode="numeric"
              autoFocus={index === 0}
            />
          ))}
        </div>
        <div className={style.butCont}>
          <button className={style.but} onClick={handleSubmit} disabled={loading || inputPin.includes('')}>
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
