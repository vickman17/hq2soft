import { IonContent, IonIcon, IonPage } from '@ionic/react';
import React, { useRef, useState } from 'react';
import Profile from '../components/Profile';
import style from './styles/EditProfile.module.css';
import { cameraOutline } from 'ionicons/icons';
import Back from '../components/Back';
import axios from 'axios';
import { useHistory } from 'react-router';

const EditProfile: React.FC = () => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const storedInfo = sessionStorage.getItem("Info");
    const info = storedInfo ? JSON.parse(storedInfo) : {};
    const userId = info?.ssp_id;
    const history = useHistory();

    const discard = () => {
        setFirstName("")
        setLastName("")
        setEmail("")
        setPhone("")
        history.push("/setting")
    } 




    console.log(userId);

    // Helper function to capitalize the first letter and make the rest lowercase
    const capitalizeFirstLetter = (name: string) => {
        if (!name) return '';
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    };

    // Capitalize the first and last names
    const [firstName, setFirstName] = useState(capitalizeFirstLetter(info?.first_name || ""));
    const [lastName, setLastName] = useState(capitalizeFirstLetter(info?.last_name || ""));
    const [email, setEmail] = useState(info?.email || "");
    const [phone, setPhone] = useState(info?.phone1 || "");

    const handleIconClick = () => {
        console.log("file opened ");
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const formData = new FormData();
            formData.append('profile_image', file);
            formData.append('user_id', userId); 

            try {
                const response = await axios.post('http://localhost/hq2sspapi/uploadProfile.php', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.data.success) {
                    alert('Profile image uploaded successfully!');
                    console.log('Image Path:', response.data.path);
                } else {
                    alert('Upload failed: ' + response.data.message);
                }
            } catch (error) {
                console.error('Error uploading file:', error);
                alert('An error occurred while uploading the file.');
            }
        }
    };

    const handleSaveClick = async () => {
        const updatedData = {
            user_id: userId,
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: phone
        };

        try {
            console.log('Updating profile with data:', updatedData);  // Only log the necessary data
            const response = await axios.post('https://image.free.beeceptor.com', updatedData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

        
        } catch (error) {
            console.error('Error updating profile:', error); // Ensure only relevant error information is logged
            alert('An error occurred while updating your profile.');
        }
    };
    
    return (
        <IonPage>
            <IonContent>
                <Back />
                <div className={style.profile}>
                    <div className={style.proCont}>
                        <Profile />
                    </div>

                    <div className={style.iconCont}>
                        <IonIcon className={style.icon} icon={cameraOutline} onClick={handleIconClick} />
                        {/* Hidden file input */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                    </div>
                </div>
                <div className={style.details}>
                    <div className={style.inputCont}>
                        <input
                            className={style.input}
                            placeholder={firstName}
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(capitalizeFirstLetter(e.target.value))}
                        />
                    </div>
                    <div className={style.inputCont}>
                        <input
                            className={style.input}
                            placeholder={lastName}
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(capitalizeFirstLetter(e.target.value))}
                        />
                    </div>
                    <div className={style.inputCont}>
                        <input
                            className={style.input}
                            placeholder={email}
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={style.inputCont}>
                        <input
                            className={style.input}
                            placeholder={phone}
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                </div>
                <div className={style.below}>
                    <div className={style.butCont}>
                        <button
                            style={{ background: 'red', color: 'whitesmoke' }}
                            className={style.but}
                            onClick={discard}
                        >
                            Discard
                        </button>
                    </div>
                    <div className={style.butCont}>
                        <button
                            style={{ background: 'green', color: 'white' }}
                            className={style.but}
                            onClick={handleSaveClick}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default EditProfile;
