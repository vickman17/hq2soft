import React from "react";
import style from "./Profile.module.css";

const Profile: React.FC = () => {

    const image = "/assets/cook.png";


    return(
        <div className={style.proCont}>
            <img className={style.image} src={image} />
        </div>
    )
}

export default Profile;