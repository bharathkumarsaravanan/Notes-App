import React from "react";
import ReactDOM from "react-dom";
import {NavLink} from "react-router-dom";
import { Typography } from "@mui/material";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArchiveIcon from '@mui/icons-material/Archive';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import SettingsIcon from '@mui/icons-material/Settings';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';

function SideBar(props){

    if(!props.visible) return null
    return ReactDOM.createPortal(
        <div className="portal" onClick={() => props.setVisible(false)}>
            <div className="sideBar">
                <div>
                    <NavLink><AutoStoriesIcon/><Typography variant='h6'>Home</Typography></NavLink>
                    <NavLink><CalendarMonthIcon/><Typography variant='h6'>Schedule</Typography></NavLink>
                    <NavLink><ArchiveIcon/><Typography variant='h6'>Archive</Typography></NavLink>
                    <NavLink><LeaderboardIcon/><Typography variant='h6'>Progress</Typography></NavLink>
                    <NavLink><SettingsIcon/><Typography variant='h6'>Settings</Typography></NavLink>
                    <NavLink><PrivacyTipIcon/><Typography variant='h6'>Help & Feedback</Typography></NavLink>
                </div>
            </div>
        </div>,document.getElementById('portal1')
    )
}

export default SideBar;