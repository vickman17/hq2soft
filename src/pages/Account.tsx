import React, {useState, useEffect} from "react";
import { IonPage, IonContent, IonToast } from "@ionic/react";
import {useHistory} from "react-router";
import axios from 'axios';
import style from "./styles/Withdrawal.module.css";
import Header from "../components/Header";

const Account: React.FC = () => {
    const [showToast, setShowToast] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>('');
    const storedInfo = sessionStorage.getItem("Info");
    const info = storedInfo ? JSON.parse(storedInfo) : {};
    const ssp_id = info?.ssp_id;
    const [accountDetails, setAccountDetails] = useState<any>(null);
    const history = useHistory();


    useEffect(() => {
        if (ssp_id) {
          const fetchAccountDetails = async () => {
            try {
              const response = await axios.get(`https://hq2soft.com/hq2sspapi/fetchBankDetails.php?ssp_id=${ssp_id}`);
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
    

    return(
        <IonPage>
            <Header title="Account Information" />
            <IonContent>
                <div className={style.note}>
                Please note all withdrawal will be paid into the below account!
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
                    <div className={style.row}>
                    <div className={style.col1}>
                        Updated at
                    </div>
                    <div className={style.col}>
                        {accountDetails?.created_at}
                    </div>
                    </div>
                    </>
                    ) : (
                    <p>No account details</p>
                )}
                </fieldset>
                <div className={style.conButCont}>
                <button onClick={()=>history.push('/updateaccount')}  className={style.conBut}>
                    Update Account
                </button>
                </div>

                <div className={style.conButCont} style={{marginTop: "2rem"}}>
                <button onClick={()=>{history.push('/setting')}} className={style.conBut} style={{background: "wheat", color:"red",}}>
                    Cancel
                </button>
                </div>
                <IonToast
          isOpen={showToast}
          message={toastMessage}
          className={style.toast}
          duration={3000}
          onDidDismiss={() => setShowToast(false)}
        />
            </IonContent>
        </IonPage>
    )
}

export default Account;