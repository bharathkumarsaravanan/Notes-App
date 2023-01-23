import React from "react";
import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import ScheduleBox from "./scheduleBox";

function SchedulePage(){

    const [scheduleDatas, setScheduleDatas] = useState();
    const [createdCount, setCreatedCount] = useState();

    useEffect(() => {
        axios.get('http://localhost:4000/6/index/schedule')
        .then(response =>{
            setScheduleDatas(response.data.scheduleData)
            setCreatedCount(response.data.createdCount)
        })
    },[])

    return(
        <div className="schedulePage">
                <Typography variant="h5">Due</Typography>
            <div className="scheduleBody">
                {scheduleDatas&&scheduleDatas.map((data,index) => <ScheduleBox 
                                                                        key={index} 
                                                                        date={data.date} 
                                                                        count={data.count}
                                                                        boxType='due' />)}
            </div>
            <Typography variant="h5">Created</Typography>
            <div className="scheduleBody">
                {createdCount&&createdCount.map((data,index) => <ScheduleBox 
                                                                        key={index} 
                                                                        date={data.date} 
                                                                        count={data.count} 
                                                                        boxType= 'created' />)}
            </div>
        </div>
    )
}

export default SchedulePage;