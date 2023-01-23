import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Notify from "./notify";

function Notifications(){

    var {userid} = useParams();
    const [notify, setNotify] = useState([{message: 'Have a nice day'}])

    useEffect(() => {
        axios.get('http://localhost:4000/'+userid+'/index/notifications')
        .then(response =>{
            console.log(response.data.overDue)
            var out = response.data.dueReminder 
            var overDue = response.data.overDue 

            overDue.map(output => {
                var due = new Date(output.date);
                var tday = new Date();
                var diffTime =  due.getTime() - tday.getTime();
                var Difference_In_Days = diffTime / (1000 * 3600 * 24);
                var inCompMsg = {message: `${output.count} tasks overdue ${Math.round(Difference_In_Days)} days ago`,
                                 link: 'schedule/due/'+output.date
                                }
                setNotify(prev => {
                    return [...prev, inCompMsg]
                })

            })

            out.map(output => {
            var msg = {message: 'Today is the last date for complete '+output.title+' note', 
                        link:'schedule/due/'+output.dueDate}
                setNotify(prev => {
                    return [...prev, msg]
                })
            })



        })
    },[])
    console.log(notify)

    return(
        <div className="notesBody">
            <div className="notifyContainer">
                {notify.map((datas, index) => <Notify notify={datas} index={index} />)}
            </div>
        </div>
    )
}

export default Notifications;