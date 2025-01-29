import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonToast, IonModal } from '@ionic/react';
import axios from 'axios';
import PinInputModal from '../components/PinInputModal';
import PinModal from '../components/PinModal';
import style from './styles/Withdrawal.module.css';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import { flash } from 'ionicons/icons';

const Withdrawal: React.FC = () => {
  const [amount, setAmount] = useState<any>(0);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [isSetupModalOpen, setIsSetupModalOpen] = useState<boolean>(false);
  const [toastColor, setToastColor] = useState<string>('danger');
  const info = sessionStorage.getItem('Info');
  const parsed = info ? JSON.parse(info) : {};
  const [bal, setBal] = useState<number>(0);
  const [previousAmount, setPreviousAmount] = useState<number>(0); // Track previous amount
  const [confirmModal, setConfirmModal] = useState<boolean>(false);
  const ssp_id = parsed?.ssp_id;
  const [accountDetails, setAccountDetails] = useState<any>(null);
  const pincode = parsed?.pin;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false)
  const history = useHistory();
  const [insufficient, setInsufficient] = useState<boolean>(false);

  const success = "/assets/success.png";


  useEffect(() => {
    if (!pincode) {
      setIsSetupModalOpen(true);
    }
  }, []);

  useEffect(() => {
    if (ssp_id) {
      const fetchAccountDetails = async () => {
        try {
          const response = await axios.get(`http://localhost/hq2sspapi/fetchBankDetails.php?ssp_id=${ssp_id}`);
          if (response.data.success) {
            setAccountDetails(response.data.data);
          }else{
            history.push("/linkaccount")
          }
        } catch (err) {
        setToastMessage('Error fetching account details. Please try again later.');
        setShowToast(true)
        } finally {
          
        }
      };

      fetchAccountDetails();
    } else {
      setToastMessage('ssp_id is not available');
      setShowToast(true);
    }
  }, [ssp_id]);


  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch(`http://localhost/hq2sspapi/fetchBal.php?ssp_id=${ssp_id}`);
        const data = await response.json();
        setBal(response.ok ? data.balance : 0);
      } catch {
        setBal(0);
      }
    };
    fetchBalance();
  }, [ssp_id]);

  const handleWithdraw = async (pin: string) => {


    setIsPinModalOpen(false)
    setIsLoading(true)
    setIsProcessed(true)


    try {
      // Validate PIN
      const pinValidationResponse = await axios.post('http://localhost/hq2sspapi/validatePin.php', {
        ssp_id: ssp_id,
        pin: pin,
      });

      if (!pinValidationResponse.data.success) {
        setToastMessage('Invalid PIN. Please try again.');
        setToastColor('danger');
        setIsPinModalOpen(false);
        setShowToast(true);
        return; // Stop if PIN validation fails
      }

      // Proceed with withdrawal
      const response = await axios.post('http://localhost/hq2sspapi/withdrawal.php', {
        amount: amount,
        ssp_id: ssp_id,
      });


      
      if (response.data.success) {
        setToastMessage(response.data.message);
        setToastColor('success');
        setBal((prevBal) => prevBal - amount); // Update balance after withdrawal
        setIsPinModalOpen(false);
        setStatus(true)
        setIsProcessed(false)
      } else {
        setToastMessage(response.data.message);
        setToastColor('danger');
        setIsPinModalOpen(false);
      }
    } catch (error) {
      setToastMessage('Error processing withdrawal. Please try again later.');
      setToastColor('danger');
      setIsPinModalOpen(false);
    }
    setShowToast(true);
    setIsPinModalOpen(false); // Close the modal
  };

  const openPinModal = () => {
    if (amount <= 4999.99 || !ssp_id) {
      setToastMessage('Withdrawal must be from minimun amount and above');
      setToastColor('danger');
      setShowToast(true);
    } else if(!pincode) {
        setIsSetupModalOpen(true);
    }else {
      setIsPinModalOpen(true); // Open the PIN modal
    }
  };

  const confirm = () =>{
    if (amount <= 4999.99 || !ssp_id) {
      setToastMessage('Withdrawal must be from minimun amount and above');
      setToastColor('danger');
      setShowToast(true);
      }else if(amount > accountDetails?.balance){
        setToastMessage('Insufficient funds');
        setToastColor('danger');
        setShowToast(true);
      }else{
        setConfirmModal(true)
      }
  }

const closeConfirm =()=>{
  setConfirmModal(false);
}


const close = ()=> {
  setConfirmModal(false);
  setIsPinModalOpen(false);
  setIsLoading(false);
  history.push("/earning");
}

  // Update balance dynamically when the user types or clears the input
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(e.target.value);

    // If the user enters a new value, calculate the difference and deduct
    if (inputValue > 0) {
      if (amount <= inputValue) {
        setBal((prevBal) => prevBal - (inputValue - previousAmount)); // Deduct the difference
        setPreviousAmount(inputValue); // Track the current amount
      }
      setAmount(inputValue); // Update the amount
    }else if(amount > inputValue){
      setInsufficient(true);
    }else {
      // If the input is cleared, add back the previously deducted amount
      setBal((prevBal) => prevBal + previousAmount);
      setPreviousAmount(0); // Reset the previous amount
      setAmount(0); // Clear the amount
    }
  };

  return (
    <IonPage className={style.page}>
      <Header title="Withdrawal" />
      <IonContent>
        <div className={style.head}>Input your withdrawal amount</div>
        <div className={style.inputCont}>
          <div className={style.naira}>&#8358;</div>
          <div>
            <input
              type="number"
              className={style.input}
              placeholder="5000 - Minimum"
              value={amount > 0 ? amount : ''}
              onChange={handleAmountChange} // Call handleAmountChange to update balance dynamically
            />
          </div>
        </div>
        <div className={style.bal}>Your active balance is : &#8358;{bal ? `${bal.toLocaleString()}` : 'Loading...'}</div>
        <div className={style.butCont}>
          <button disabled={insufficient ? true : false} className={style.but} onClick={confirm}>
            Withdraw
          </button>
        </div>
        <PinModal
          isOpen={isSetupModalOpen}
          mode="setup"
          onClose={() => setIsSetupModalOpen(false)}
        />
        <PinInputModal
          isOpen={isPinModalOpen}
          ssp_id={ssp_id}
          onClose={() => setIsPinModalOpen(false)}
          onSubmit={handleWithdraw}
        />
        <IonModal isOpen={confirmModal} onDidDismiss={()=>{setConfirmModal(false)}}>
          <IonContent className={style.modalContent}>
            <div className={style.conHead}>Confirm account details</div>
            <div className={style.amount}>
             &#8358; {amount}
            </div>
            <div className={style.note}>
              Please note withdrawal will be paid into the below account!
            </div>
            <fieldset className={style.field}>
              <legend className={style.legend}>Account details</legend>
              {accountDetails ? (
                <>
                <div className={style.row}>
                  <div className={style.col1}>
                    Account name 
                  </div>
                  <div className={style.col}>
                    {accountDetails?.account_name}
                  </div>
                </div>
                <div className={style.row}>
                  <div className={style.col1}>
                    Account number
                  </div>
                  <div className={style.col}>
                    {accountDetails?.account_number}
                  </div>
                </div>
                <div className={style.row}>
                  <div className={style.col1}>
                    Bank name
                  </div>
                  <div className={style.col}>
                    {accountDetails?.bank_name}
                  </div>
                </div>
                </>
                ) : (
                  <p>No account details</p>
              )}
            </fieldset>
            <div className={style.conButCont}>
              <button onClick={openPinModal} className={style.conBut}>
                Confirm
              </button>
            </div>

            <div className={style.conButCont} style={{marginTop: "2rem"}}>
              <button onClick={closeConfirm} className={style.conBut} style={{background: "wheat", color:"red",}}>
                Cancel
              </button>
            </div>
          </IonContent>
        </IonModal>
        <IonModal isOpen={isLoading} onDidDismiss={()=>{setIsLoading(false)}} >
              <IonContent className={style.loadModal}>
                { isProcessed ? (
                  <div>
                      loading
                  </div>
                ) : (
                  <div>
                    {status ? (
                    <div>
                      <div className={style.img}>
                        <img src={success} style={{width:"100%"}} />
                      </div>
                      <div className={style.successWrite}>
                        Your withdrawal of <span className={style.action}>&#8358;{amount}</span> to <span className={style.action}>{accountDetails?.account_name} {accountDetails?.bank_name}</span> was successful
                      </div> 
                    </div>) : (
                      <div>
                      <div className={style.img}>
                        <img src={success} style={{width:"100%"}} />
                      </div>
                      <div className={style.successWrite}>
                        Your withdrawal of <span className={style.action}>&#8358;{amount}</span> to <span className={style.action}>{accountDetails?.account_name} {accountDetails?.bank_name}</span> was unsuccessful
                      </div>
                      </div>
                    )}
                  </div>
                )
                
              }
              <div className={style.loadButCont}>
                <button onClick={close} className={style.loadBut}>Close</button>
              </div>
              </IonContent>
        </IonModal>
        <IonToast
          isOpen={showToast}
          message={toastMessage}
          className={style.toast}
          duration={3000}
          color={toastColor}
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Withdrawal;
