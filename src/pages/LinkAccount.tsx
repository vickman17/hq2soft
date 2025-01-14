import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonModal, IonContent, IonInput, IonButton, IonToast, IonList, IonItem, IonLabel, IonText, IonSearchbar } from '@ionic/react';
import axios from 'axios';
import style from "./styles/LinkAccount.module.css";

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

    const ssp_id = parsed?.ssp_id;

    console.log(ssp_id)

    useEffect(() => {
        fetchBanks(page);
    }, [page]);

    const fetchBanks = async (currentPage: number) => {
        try {
            const response = await axios.get('http://localhost/hq2sspapi/fetchBank.php');
            const data = response.data;
            setBanks(data.data); 
            setTotalPages(Math.ceil(data.total / 10)); // Assuming 'total' is the total number of records
        } catch (error) {
            console.error('Error fetching banks', error);
        }
    };

    const filteredBanks = banks.filter(bank =>
        bank.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = async () => {
        const recipientData = {
            name: name,
            account_number: accountNumber,
            bank_code: bankCode,
            bank_name: bankName,
            ssp_id: ssp_id,
            currency: "NGN", 
        };
    
        try {
            const response = await fetch('http://localhost/hq2sspapi/linkAccount.php', {
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
            } else {
                setShowToast(true);
                setToastMessage('Account linking failed, Try again')
            }
        } catch (error) {
            setShowToast(true);
            setToastMessage('Error please contact our support!');
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
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Create Recipient</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonInput
                    placeholder="Name"
                    value={name}
                    onIonChange={(e) => setName(e.detail.value!)}
                />
                <IonInput
                    placeholder="Account number"
                    type="text"
                    value={accountNumber}
                    onIonChange={(e) => setAccountNumber(e.detail.value!)}
                />
                <div className={style.chatBox} onClick={openModal}>
                    {bankCode ? bankName : "Select your bank"}
                </div>
                <IonButton expand="block" onClick={handleSubmit}>
                    Submit
                </IonButton>
                <IonToast
                    isOpen={showToast}
                    message={toastMessage}
                    duration={2000}
                    onDidDismiss={() => setShowToast(false)}
                />
                <IonModal isOpen={isOpen} onDidDismiss={closeModal}>
                    <IonHeader>
                    <IonSearchbar
                            value={searchTerm}
                            onIonInput={(e: any) => setSearchTerm(e.target.value)}
                            debounce={0}
                            showClearButton="focus"
                            placeholder="Search Banks"
                        />
                    </IonHeader>
                    <IonContent>
                    <IonList>
                            {filteredBanks.map((bank) => (
                                <IonItem
                                    key={bank.id}
                                    button
                                    onClick={() => {
                                        setBankCode(bank.code); // Set the selected bank's code
                                        setIsOpen(false);
                                        setBankName(bank.name); // Close the modal after selection
                                    }}
                                >
                                    <IonLabel>
                                        <IonText>{bank.name}</IonText>
                                    </IonLabel>
                                </IonItem>
                            ))}
                        </IonList>
                        <div className="pagination">
                            <IonButton disabled={page === 1} onClick={() => handlePageChange(page - 1)}>Previous</IonButton>
                            <span>Page {page} of {totalPages}</span>
                            <IonButton disabled={page === totalPages} onClick={() => handlePageChange(page + 1)}>Next</IonButton>
                        </div>
                        <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
                    </IonContent>
                </IonModal>

            </IonContent>
        </IonPage>
    );
};

export default LinkAccount;
