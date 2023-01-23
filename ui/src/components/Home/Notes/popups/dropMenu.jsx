import React from "react";
import ReactDOM from "react-dom";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import axios from "axios";

function DropMenu(props){
    var {userid, noteid} = useParams();

    function deleteNote(){
        axios.post('http://localhost:4000/'+userid+'/index/home/deletenote',[noteid])
        .then(response => {
            console.log(response.data.message);
            window.location.href = '/'+userid+'/index/notes'
        })
    }

    function completenote(){
        axios.post('http://localhost:4000/'+userid+'/index/notes/done',[noteid])
        .then(response => console.log(response.data))
    }

    function duenote(){
        props.openDuePop(true)
    }

    if(!props.visible) return null
    return ReactDOM.createPortal(
        <div className="portal" onClick={() => props.setVisible(false)}>
            <div className="dropMenu">
                <Typography variant='h6' onClick={deleteNote}>Delete</Typography>
                <Typography variant='h6' onClick={completenote}>Mark as Done</Typography>
                <Typography variant='h6' onClick={duenote}>Due</Typography>
                <Typography variant='h6'>Archive</Typography>
            </div>
        </div>, document.getElementById('portal1')
    )
}

export default DropMenu;
