import React from "react";
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { useLongPress } from "use-long-press";
import Menu from "../Popups/menu";

function NoteBox(props){

    const [days, setDays] = useState();
    const [menu, setMenu] = useState(false)
    const enablePop = useLongPress(() => {
        console.log(props.id);  
        setMenu(true);
    })

    useEffect(() => {
        var today = new Date();
        var estDate = new Date(props.days);
        console.log(estDate)

        if(today.getDate() === estDate.getDate()){
            setDays('today')
        }else{
            var diffTime =  estDate.getTime() - today.getTime();
            var Difference_In_Days = diffTime / (1000 * 3600 * 24);
            setDays(Math.round(Difference_In_Days));
        }

    },[])

    return(
        <div 
            {...enablePop()}
            className="scheduleNoteBox">
            <Typography variant="h6">{props.title}</Typography>
            <Typography variant="h5">{props.note}</Typography><br/>
            <div>
                <Typography variant="h7">
                    {props.boxType + ' '}
                    {Math.sign(days)===-1 ? Math.abs(days)+' ' : days+ ' '} 
                    {Number.isInteger(days)&&Math.sign(days) !== -1&&'Days left'}
                    {Math.sign(days) === -1&&'Days Before'} 
                 </Typography>
            </div>
            <Menu visible={menu} setVisible={setMenu} id={props.id} remove={props.remove} update={props.update} />
        </div>
    )
}

export default NoteBox;