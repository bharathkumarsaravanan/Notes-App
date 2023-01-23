import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "./header";
import NoteBox from "./noteBox";

function CreatedPage(){

    const [notes, setNotes] = useState();
    var {userid, date} = useParams();
    
    useEffect(() => {
        axios.get('http://localhost:4000/'+userid+'/index/schedule/created/'+date)
        .then(response => setNotes(response.data.notes))
        // console.log( new Date(date).toString().slice(4,11))
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
            <Header dueDate={date} />
            <div className="scheduleRouteBody">
                {notes&&notes.map(note => <NoteBox 
                                                update={instantUpdate} 
                                                remove={insRemove}
                                                id={note.id}
                                                title={note.title} 
                                                note={note.note} 
                                                days={note.dueDate}
                                                boxType='due' />)}

            </div>
        </div>
    )
}

export default CreatedPage;