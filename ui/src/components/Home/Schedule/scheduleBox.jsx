import React from "react";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ScheduleBox(props){

    const [daysLeft, setDaysLeft] = useState();
    const {userid} = useParams();

    useEffect(() => {
        var due = new Date(props.date);
        var tday = new Date();

        if(due.getDate() === tday.getDate()){
            setDaysLeft('Today')
        }else{
            var diffTime =  due.getTime() - tday.getTime();
            var Difference_In_Days = diffTime / (1000 * 3600 * 24);
            setDaysLeft(Math.round(Difference_In_Days))
        }


    },[props.dueDate])

    function handleClick(){
        if(props.boxType === 'due'){
            console.log(props.date, 'due');
            window.location.href = '/'+userid+'/index/schedule/due/'+props.date
        }else{
            window.location.href = '/'+userid+'/index/schedule/created/'+props.date
            console.log(props.date, 'created');
        }
    }

    return(
        <div onClick={handleClick}>
            <Typography variant="h4">
                {Math.sign(daysLeft)===-1 ? Math.abs(daysLeft) : daysLeft} 
                {Number.isInteger(daysLeft)&&Math.sign(daysLeft) !== -1&&'Days left'}
                {Math.sign(daysLeft) === -1&&'Days Before'}
            </Typography>
            <Typography variant="h6" gutterBottom>{props.count} notes</Typography>
        </div>
    )
}

export default ScheduleBox;