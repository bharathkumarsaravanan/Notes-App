import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Typography } from "@mui/material";

function Header(props){

    return(
        <div className="ScheduleHeader">
            <ArrowBackIcon fontSize="large" onClick={() => window.history.go(-1)} />
            <Typography variant="h5">{new Date(props.dueDate).toString().slice(4,11)}</Typography>
        </div>
    )
}

export default Header;