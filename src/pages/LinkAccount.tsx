import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonModal, IonContent, IonInput, IonButton, IonToast, IonList, IonItem, IonLabel, IonText, IonSearchbar } from '@ionic/react';
import axios from 'axios';
import style from "./styles/LinkAccount.module.css";
import Header from "../components/Header";
import {useHistory} from "react-router";

const LinkAccount: React.FC = () => {
    const [name, setName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [bankCode, setBankCode] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState<boolean>(false);
    const [banks, setBanks] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [bankName, setBankName] = useState('');
    const info = sessionStorage.getItem('Info');
    const parsed = info ? JSON.parse(info) : {};
    const [loading, setLoading] = useState<boolean>(false);
    const ssp_id = parsed?.ssp_id;
    const history = useHistory();

    console.log(ssp_id)

    useEffect(() => {
        fetchBanks(page);
    }, [page]);

    const fetchBanks = async (currentPage: number) => {
        try {
            const response = await axios.get('https://hq2soft.com/hq2sspapi/fetchBank.php');
            const data = response.data;
    
            console.log('API Response:', data); // Debugging to verify response structure
    
            if (data?.requestSuccessful && Array.isArray(data.responseBody)) {
                setBanks(data.responseBody); // Corrected to use 'responseBody'
                setTotalPages(Math.ceil((data.totalRecords || data.responseBody.length) / 10)); 
            } else {
                console.error('Invalid data format', data);
                setBanks([]); // Reset banks to an empty array
            }
        } catch (error) {
            console.error('Error fetching banks', error);
        }
    };


    const filteredBanks = banks?.filter(bank =>
        bank.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];
    

    const handleSubmit = async () => {
setLoading(true)

        const recipientData = {
            name: name,
            account_number: accountNumber,
            bank_code: bankCode,
            bank_name: bankName,
            ssp_id: ssp_id,
            currency: "NGN", 
        };
    
        try {
            const response = await fetch('https://hq2soft.com/hq2sspapi/linkAccount.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recipientData),
            });
    
            const result = await response.json();
            if (result.success) {
                setShowToast(true)
                setToastMessage('Account has been linked successfully');
                history.push('/earning')
            } else {
                setShowToast(true);
                setToastMessage('Account linking failed, Try again')
            }
        } catch (error) {
            setShowToast(true);
            setToastMessage('Error please contact our support!');
        }finally{
            setLoading(false);
        }
    };

    const openModal = () =>{
        setIsOpen(true);
    }

    const closeModal =()=>{
         setIsOpen(false);
    }

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <IonPage>
            <Header title="Link Accont" />
            <IonContent className={style.page}>
                <div className={style.info}>
                    <div style={{fontSize: "25px", fontWeight: "700"}}>Connect payout account</div>
                    <div>Account name must match name on profile</div>
                </div>
                <div className={style.chatBox}>
                <input
                    placeholder="Enter account Name"
                    value={name}
                    onChange={(e) => setName(e.target.value!)}
                    className={style.input}
                />
                </div>
                <div className={style.chatBox}>
                <input
                    placeholder="Enter account number"
                    type="number"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value!)}
                    className={style.input}
                />
                </div>
                <div className={style.chatBox}>
                <div onClick={openModal}>
                    {bankCode ? bankName : "Select your bank"}
                </div>
                </div>
                <div style={{border: "0px solid black", textAlign: "center", marginTop: "3rem"}}>
                    <button style={{width: "90%", paddingBlock: "12px", fontSize: "18px", borderRadius: "20px", background: loading === true ? "grey" : "var(--ion-company-wood)", color: loading === true ? "var(--ion-company-gold)" : "white", fontWeight: "600"}} onClick={handleSubmit}>
                        {loading === true ? "Processing" : "Add account"}
                    </button>
                </div>
                <IonToast
                    isOpen={showToast}
                    message={toastMessage}
                    duration={2000}
                    onDidDismiss={() => setShowToast(false)}
                />
                <IonModal className={style.modal} isOpen={isOpen} onDidDismiss={closeModal}>
                    <div className={style.head}>
                        <div style={{fontSize: "18px"}}>Select Bank</div>
                        <div className={style.close} onClick={() => setIsOpen(false)}>Close</div>
                    </div>
                    <IonSearchbar
                            value={searchTerm}
                            onIonInput={(e: any) => setSearchTerm(e.target.value)}
                            debounce={0}
                            showClearButton="focus"
                            placeholder="Search Banks"
                        />
                    <IonContent className={style.modal}>
                    <IonList>
                        {filteredBanks.length > 0 ? (
                            filteredBanks.map((bank) => (
                                <IonItem
                                    key={bank.code}
                                    button
                                    onClick={() => {
                                        setBankCode(bank.code);
                                        setIsOpen(false);
                                        setBankName(bank.name);
                                    }}
                                    className={style.modal}
                                >
                                    <IonLabel>
                                        <IonText className={style.modal}>{bank.name}</IonText>
                                    </IonLabel>
                                </IonItem>
                            ))
                        ) : (
                            <IonItem>
                                <IonLabel>No banks found</IonLabel>
                            </IonItem>
                        )}
                    </IonList>
                    </IonContent>
                </IonModal>
            </IonContent>
        </IonPage>
    );
};

export default LinkAccount;
