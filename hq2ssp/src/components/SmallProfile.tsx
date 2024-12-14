import React from "react";
import style from "./SmallProfile.module.css";

const SmallProfile: React.FC = () => {

    const image = "/assets/cook.png";


    return(
        <div className={style.proCont}>
            <img className={style.image} src={image} />
        </div>
    )
}

export default SmallProfile;