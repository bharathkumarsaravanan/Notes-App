import React from "react";
import ReactDOM from "react-dom";
import { Typography, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function Delete(props){

    var {userid} = useParams();
    console.log(props.id);

    function removeElement(){
        axios.post('http://localhost:4000/'+userid+'/index/home/deletenote',{id: props.removeId})
        .then(response =>{
            console.log(response.data.message);
            if(response.data.message !== 0){
                props.setVisible(false);
                props.removeInstant(props.removeId)
            }

        });
        if(props.closeMenu){
            props.closeMenu(false)
        }
    }

    function closePop(){
       props.setVisible(false) 
        if(props.closeMenu){
            props.closeMenu(false)
        }
    }


    if(!props.visible) return null
    return ReactDOM.createPortal(
        <div className="portal">
            <div className="popUp">
            <CloseIcon 
                className="closeIcon" 
                onClick={closePop} />
                <Typography variant="h6">Do you want to delete this note</Typography>
                <Button
                    onClick={removeElement} 
                    variant="contained" 
                    size="medium">Delete</Button>
            </div>

        </div>, document.getElementById('portal2')
    )
}

export default Delete;