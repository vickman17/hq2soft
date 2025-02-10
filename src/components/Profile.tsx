import React, { useEffect, useState } from "react";
import style from "./Profile.module.css";
import axios from "axios";

const Profile: React.FC = () => {
    const [profilePicture, setProfilePicture] = useState<string | null>(null);

    const storedInfo = sessionStorage.getItem("Info");
    const info = storedInfo ? JSON.parse(storedInfo) : {};
    const userId = info?.ssp_id;
    const place = "/assets/goldplace.jpg";  // Default image

    useEffect(() => {
        const fetchProfilePicture = async () => {
            try {
                const response = await axios.get('https://hq2soft.com/hq2sspapi/getProfile.php', {
                    params: { user_id: userId }, // Replace with actual user ID
                });

                if (response.data.success && response.data.profile_picture) {
                    setProfilePicture('https://hq2soft.com/hq2sspapi/' + response.data.profile_picture);
                } else {
                    setProfilePicture(null); // No profile picture, fallback to default
                }
            } catch (error) {
                console.error('Error fetching profile picture:', error);
                setProfilePicture(null); // Fallback in case of error
            }
        };

        if (userId) {
            fetchProfilePicture();
        }
    }, [userId]);

    return (
        <div className={style.proCont}>
            <div>
                <img 
                    className={style.image} 
                    src={profilePicture || place}  // Use place image if profilePicture is null or empty
                    alt="Profile" // Adding alt text for accessibility
                />
            </div>
        </div>
    );
};

export default Profile;
