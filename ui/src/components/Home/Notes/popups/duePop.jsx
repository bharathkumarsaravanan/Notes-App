import React from "react";
import ReactDOM from "react-dom";
import { TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';


function DuePop(props){

    const [dates, setDates] = useState({id:'',created_at:'', dueDate:''});
    var {userid, noteid} = useParams();

    useEffect(() => {
        axios.get('http://localhost:4000/'+userid+'/index/home/view/'+noteid)
        .then(response => setDates(response.data.view[0]))
    },[]);

    function handleChange(datas){
        var {name, value} = datas.target;
        setDates(prev => {
            return{
                ...prev,
                dueDate: value
            }
        });
    }

    function handleClick(){
        console.log(dates);
        axios.post('http://localhost:4000/'+userid+'/index/home/update/'+noteid, dates)
        .then(response => {
            props.setVisible(false);
        })
    }

    if(!props.visible) return null
    return ReactDOM.createPortal(
        <div className="portal">
            <div className="duePop">
                <CloseIcon 
                    className="closeIcon" 
                    onClick={() => props.setVisible(false)} />
                <TextField variant="outlined" label='Created' value={dates.created_at} disabled />
                <TextField 
                    name="dueDate"
                    onChange={handleChange}
                    type='date'
                    variant="outlined" 
                    label='Due' 
                    value={dates.dueDate} />
                <Button variant="contained" onClick={handleClick}>Update</Button>
            </div>
        </div>, document.getElementById('portal2')
    )
}

export default DuePop;