import React, { useEffect, useState } from "react";
import style from "./Profile.module.css";
import axios from "axios";

const Profile: React.FC = () => {
    const [profilePicture, setProfilePicture] = useState<string | null>(null);

    const storedInfo = sessionStorage.getItem("Info");
    const info = storedInfo ? JSON.parse(storedInfo) : {};
    const userId = info?.ssp_id;

    useEffect(() => {
        const fetchProfilePicture = async () => {
            try {
                const response = await axios.get('https://hq2soft.com/hq2sspapi/getProfile.php', {
                    params: { user_id: userId }, // Replace with actual user ID
                });

                if (response.data.success) {
                    setProfilePicture('https://hq2soft.com/hq2sspapi/' + response.data.profile_picture);
                } else {
                    console.error('Failed to fetch profile picture:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching profile picture:', error);
            }
        };

        fetchProfilePicture();
    }, [userId]);


    console.log(userId)

    return (
        <div className={style.proCont}>
                          {profilePicture ? (
                <img 
                    className={style.image} 
                    src={profilePicture || ""} 
                    
                />
            ) : (
                <div className={style.emptyImage}></div> // Empty div when no profile picture
            )}
        </div>
    );
};

export default Profile;
