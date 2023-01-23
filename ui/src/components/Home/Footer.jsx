import React from "react";
import {NavLink} from "react-router-dom";
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import InsertChartRoundedIcon from '@mui/icons-material/InsertChartRounded';

function Footer(){
    return(
        <div className="footer">
                <NavLink to={'notes'}><ImportContactsIcon/></NavLink>
                <NavLink to={'schedule'}><AccessTimeIcon/></NavLink>
                <NavLink to={'notifications'}><NotificationsRoundedIcon/></NavLink>
                <NavLink to={'progress'}><InsertChartRoundedIcon/></NavLink>
        </div>
    )
}

export default Footer;