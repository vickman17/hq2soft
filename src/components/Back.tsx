import { IonIcon } from "@ionic/react";
import { chevronBackCircle, chevronBackOutline } from "ionicons/icons";
import React from "react";
import { useHistory } from "react-router";

interface BackProps {
    defaultLocation?: string;
}




const Back: React.FC<BackProps> = ({defaultLocation}) => {
    const history = useHistory();
    const handleBack = () => {
        if (history.length > 1) {
            history.goBack(); // Go to the previous page in the history stack
        } else if (defaultLocation) {
            history.push(defaultLocation); // Go to specified route if no history
        } else {
            history.push('/dashboard'); // Default to home page if no other options
        }
    }


    return(
        <div style={{margin:"auto", paddingBlock: ".3rem", fontSize: "1.8rem", border:"0px solid black"}}>
            <IonIcon onClick={handleBack} icon={chevronBackOutline} />
        </div>
    )
}

export default Back;