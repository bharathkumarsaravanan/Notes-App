import React from "react";
import ReactDOM from "react-dom";
import { Typography } from "@mui/material";
import Delete from "../../Notes/popups/Menu";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Menu(props){

    const [deletePop, setDeletePop] = useState(false);
    var {userid} = useParams();

    function done(){
        props.remove(props.id);
        props.setVisible(false);
        axios.post('http://localhost:4000/'+userid+'/index/notes/done',{noteId: props.id})
        .then(response => console.log(response.data))
    }

    if(!props.visible) return null
    return ReactDOM.createPortal(
        <div className="portal">
            <div className="menu" >
                <Typography variant="h6" onClick={done} >Done this!</Typography>
                <Typography variant="h6" onClick={() =>  window.location.href = '/'+userid+'/index/notes/'+props.id+'/update'}>Update</Typography>
                <Typography variant="h6" onClick={() => setDeletePop(true)}>Delete</Typography>
                <Typography variant="h6" onClick={() => props.setVisible(false)}>Close</Typography>
            </div>
            <Delete 
                removeInstant={props.remove}
                visible={deletePop} 
                setVisible={setDeletePop} 
                removeId={props.id} 
                closeMenu={props.setVisible} />
        </div>, document.getElementById('portal1')
    )
}

export default Menu;