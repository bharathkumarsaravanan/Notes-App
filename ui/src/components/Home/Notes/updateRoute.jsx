import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Typography, Button, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DropMenu from "./popups/dropMenu";
import DuePop from "./popups/duePop";

function UpdateRoute(){

    const [defaultData, setDefaultData] = useState({title:'', note:''});
    const [updateBtn, setUpdateBtn] = useState(false);
    const [dropMenu, setDropMenu] = useState(false);
    const [duePop, setDuePop] = useState(false);
    var {userid, noteid} = useParams();
    
    useEffect(() => {
            axios.get('http://localhost:4000/'+userid+'/index/home/view/'+noteid)
            .then(response => setDefaultData(response.data.view[0]))
            console.log(defaultData)
    },[])

    function getData(values){
        setUpdateBtn(true);
        var {name, value} = values.target;
        setDefaultData(prev =>{
            return{
                ...prev,
                [name] : value
            }
        })
    }

    function handleClick(){
        
        axios.post('http://localhost:4000/'+userid+'/index/home/update/'+noteid, defaultData)
        .then(response => {
            console.log(response.data);
        })
    }

    
    return(
        <div className="homeIndex">
            <DropMenu visible={dropMenu} setVisible={setDropMenu} openDuePop={setDuePop} />
            <DuePop visible={duePop} setVisible={setDuePop} />
            <div className="updatePage">
                <div className="ScheduleHeader">
                    <ArrowBackIcon fontSize="large" onClick={() => window.history.go(-1)} />
                    <MoreVertIcon fontSize="large" onClick={() => setDropMenu(true)} />
                </div>
                <div>
                    <TextField 
                        name="title"
                        value={defaultData.title}
                        onChange={getData}
                        variant="standard" 
                        placeholder="Title" />
                    <textarea 
                        name="note"
                        value={defaultData.note}
                        onChange={getData}
                    />
                    
                    {updateBtn&&<Button variant="outlined" size="large" onClick={handleClick}>Update</Button>}
                </div>
            </div>
        </div>
    )
}

export default UpdateRoute;