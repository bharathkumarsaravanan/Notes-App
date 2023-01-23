import React from "react";
import ReactDOM from "react-dom";
import { TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';
import { useParams } from "react-router-dom";


function AddNote(props){

    const [data, setData] = useState({title:'', note:'',dueDate:''});
    var {userid} = useParams();

    function getData(item){
        var {name, value} = item.target;
        setData(prev => {
            return {
                ...prev,
                [name] : value,
            }
        })
    }

    function handleClick(){
        console.log(data);
        if(data.note !== ''){
            axios.post('http://localhost:4000/'+userid+'/index/home/createnote', data)
            .then(response => console.log(response.data));
            props.return(data);
            props.setVisible(false);
            setData({title:'', note:'',dueDate:''});
        }

    }

    if(!props.visible) return null
    return ReactDOM.createPortal(
        <div className="portal">
            <div className="popUp">
            <CloseIcon 
                onClick={() => props.setVisible(false)}
                className="closeIcon" />
                <TextField 
                    label="Title" 
                    variant="standard"
                    name="title"
                    value={data.title}
                    onChange={getData}
                    />
                <TextField 
                    label="Note" 
                    variant="standard"
                    name="note"
                    value={data.note}
                    onChange={getData}
                    />
                <div>
                    <Typography variant="h6" color='text.secondary'>Due</Typography>
                    <input type='date' name="dueDate" value={data.dueDate} onChange={getData} />
                </div>
                <Button 
                    variant="contained"
                    onClick={handleClick}>Add</Button>
                <Typography variant="caption" color='text.secondary' gutterBottom>
                    You can ignore title and due
                </Typography>
            </div>
        </div>, document.getElementById('portal1')
    )
}

export default AddNote;