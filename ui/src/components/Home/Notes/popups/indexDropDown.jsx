import React from "react";
import ReactDOM from "react-dom";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import axios from "axios";

function IndexDropMenu(props){
    var {userid} = useParams();




    if(!props.visible) return null
    return ReactDOM.createPortal(
        <div className="portal" onClick={() => props.setVisible(false)}>
            <div className="dropMenu">
                <Typography variant='h6' onClick={() => props.deleteFunc()}>Delete</Typography>
                <Typography variant='h6' onClick={() => props.completeFunc()}>Mark as Done</Typography>
                <Typography variant='h6'>Archive</Typography>
                {/* <Typography variant='h6' onClick={() => props.disableSelect()}>Close Selection</Typography> */}
            </div>
        </div>, document.getElementById('portal1')
    )
}

export default IndexDropMenu;
