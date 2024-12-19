import React, {useEffect, useState} from "react";
import style from "./SmallProfile.module.css";
import axios from "axios";

const SmallProfile: React.FC = () => {

 
const [profilePicture, setProfilePicture] = useState<string | null>(null);

const storedInfo = sessionStorage.getItem("Info");
const info = storedInfo ? JSON.parse(storedInfo) : {};
const userId = info?.ssp_id;

useEffect(() => {
    const fetchProfilePicture = async () => {
        try {
            const response = await axios.get('http://localhost/hq2sspapi/getprofile.php', {
                params: { user_id: userId }, // Replace with actual user ID
            });

            if (response.data.success) {
                setProfilePicture('http://localhost/hq2sspapi/' + response.data.profile_picture);
            } else {
                console.error('Failed to fetch profile picture:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching profile picture:', error);
        }
    };

    fetchProfilePicture();
}, [userId]);



return (
    <div>
        {profilePicture ? (
            <img 
                className={style.image} 
                src={profilePicture} 
                alt="Profile" 
            />
        ) : (
            <div className={style.emptyImage}></div> // Empty div when no profile picture
        )}
    </div>
)
};


export default SmallProfile;