import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography } from "@mui/material";

function OverDue(){

    const [values, setValues] = useState([]);
    var {userid} = useParams();
    

    useEffect(() => {
        axios.get('http://localhost:4000/'+userid+'/progress/overdue')
        .then(response => {
            setValues(response.data.values);
        })
    },[])

    return(
        <div className="overDueContainer">
            <Typography variant='h4'>Overdue</Typography>
            <table>
                    <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>Created</th>
                        <th>Due</th>
                    </tr>
                  {values.length!==0&& values.map((value, index) =>   
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{value.title}</td>
                        <td>{value.created}</td>
                        <td>{value.due}</td>
                    </tr>
                    )}
            </table>
        </div>
    )
}

export default OverDue;