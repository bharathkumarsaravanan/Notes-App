import React from "react";
import ReactDOM from "react-dom";
import { Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';



function ViewNote(props){
    const [data, setData] = useState({title:'',note:''});
    const [dueDays, setDueDays] = useState();
    var {userid} = useParams();

    useEffect(() => {
        if(props.id){
            axios.get('http://localhost:4000/'+userid+'/index/home/view/'+props.id)
            .then(response => {
                setData(response.data.view[0])
                var due = new Date(response.data.view[0].dueDate);
                var tday = new Date();
                var diffTime =   due.getTime() - tday.getTime();
                var Difference_In_Days = diffTime / (1000 * 3600 * 24);
                setDueDays(Math.round(Difference_In_Days))
            })
        }
    },[props.id])

    function notesDone(){
        props.done(props.id)
        props.setVisible(false)
        axios.post('http://localhost:4000/'+userid+'/index/notes/done',{noteId: props.id})
        .then(response => console.log(response.data))
    }

    if(!props.visible) return null
    return ReactDOM.createPortal(
        <div className="portal">
            <CloseIcon 
                className="closeIcon" 
                style={{color:'white'}}
                onClick={() => props.setVisible(false)} />
            <div className="noteBubble" style={{maxWidth:'10rem', maxHeight:'20rem', top:'20%',padding:'2.6rem'}}>
                <Typography variant="h5" style={{borderBottom:'1px solid #7f8487', marginBottom:'2vh', color:'white'}}>{data.title}</Typography>
                <Typography variant="h6">{data.note}</Typography><br/>
                    <Typography variant="h7">due: {dueDays&&dueDays} days {dueDays&&Math.sign(dueDays) !== -1?'left' : 'before'}</Typography>
            </div>
            <div style={{position:'absolute', display:'flex', flexDirection:'column', bottom:'5vh',gap:'2vh'}}>
                <Typography variant="h6" style={{color:'white'}}>Are you done this?</Typography>
                <Button 
                    onClick={notesDone}
                    variant='contained' 
                    size="large">Yes!</Button>
            </div>
 
        </div>, document.getElementById('portal1')
    )
}

export default ViewNote;
