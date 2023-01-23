import React from "react";
import { Typography } from "@mui/material";
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import CelebrationRoundedIcon from '@mui/icons-material/CelebrationRounded';

function Notify(props){

    function notifyRedirect(){
        if(props.index !== 0){
            window.location.href = props.notify.link
        }
    }

    return(
        <div className="notify" onClick={notifyRedirect}>
            {props.index==0?
                <div style={{}}> 
                    <CelebrationRoundedIcon 
                        fontSize="large" />
                    <Typography variant="h6">{props.notify.message}</Typography>
                    <CelebrationRoundedIcon 
                        fontSize="large" />
                </div>
                :
                <Typography variant="h6">{props.notify.message}</Typography>
            }
            <NotificationsActiveRoundedIcon
                className="notifyicon"
                fontSize="medium"
             />
        </div>
    )
}

export default Notify;