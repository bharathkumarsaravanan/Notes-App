import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NoteBox from "./noteBox";
import Header from "./header";

function DuePage(){

    const [notes, setNotes] = useState();
    var {userid, date} = useParams();

    useEffect(() => {
        axios.get('http://localhost:4000/'+userid+'/index/schedule/due/'+date)
        .then(response => setNotes(response.data.notes))
    },[])

    function insRemove(id){
        console.log(id)
        setNotes(prev => {
            return prev.filter(data => {
                return data.id !== id
            })
        })
    }

    function instantUpdate(updateNote){
        console.log(updateNote, 'jjsdnsdn')
        setNotes(prev => {
            return prev.map(datas => {
                if(datas.id === updateNote.id){
                    return updateNote
                }else{
                    return datas
                }
            })
        })
        
    }

    return(
        <div className="homeIndex">
            <Header dueDate={date}/>
            <div className="scheduleRouteBody">
                {notes&&notes.map(note => <NoteBox
                                                update={instantUpdate} 
                                                remove={insRemove}
                                                id={note.id}
                                                title={note.title} 
                                                note={note.note} 
                                                days={note.created_at}
                                                boxType='created' />)}
            </div>

        </div>
    )

}

export default DuePage;