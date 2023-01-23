import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import {useParams} from "react-router-dom"

function NoteCount(){

    const [count ,setCount] = useState({all: 0, pending:0})
    var {userid} = useParams();
    useEffect(() => {
        axios('http://localhost:4000/'+userid+'/progress/notescount')
        .then(response => {
            console.log(response.data);
            var resData = response.data;
            setCount({all: resData.allNoteCount[0].count, pending: resData.pendingCount[0].count})
        })
    },[])

    return(
        <div className="noteCountContainer">
            <div>
                <Typography variant="h7">All notes</Typography>
                <Typography variant="h6">{count.all}</Typography>
            </div>
            <div>
                <Typography variant="h7">Completed</Typography>
                <Typography variant="h6">{count.all - count.pending}</Typography>
            </div>
            <div>
                <Typography variant="h7">Pending</Typography>
                <Typography variant="h6">{count.pending}</Typography>
            </div>
        </div>
    )
}

export default NoteCount;