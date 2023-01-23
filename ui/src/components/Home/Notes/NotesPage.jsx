import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import AddNote from "../popups/addnote";
import { useParams } from "react-router-dom";
import NoteBubble from "./NoteBubble";
import ViewNote from "./popups/viewnote";
import Delete from "./popups/Menu";
import CustomSpeedDial from "./speeddial";
import SearchIcon from '@mui/icons-material/Search';
import IndexDropMenu from "./popups/indexDropDown";
import MoreVertIcon from '@mui/icons-material/MoreVert';


function NotesPage(){

    const [notes, setNotes] = useState();
    const [addPopUp, setAddPopUp] = useState(false);
    const [viewPopUp, setViewPopUp] = useState(false);
    const [menuPopUp, setMenuPopUp] = useState(false);
    const [enableEdit, setEnableEdit] = useState(false);
    const [selectNote, setSelectNote] = useState(false);
    const [tempId, setTempId] = useState();
    const [selectIds, setSelectIds] = useState([]);
    const [dropMenu, setDropMenu] = useState(false)
    var {userid} = useParams();

    useEffect(() => {
        axios.get('http://localhost:4000/'+userid+'/index/home/notes')
        .then(response => setNotes(response.data.datas));
    },[selectIds]);

    useEffect(() => {
        if(selectIds.length==0){
            setSelectNote(false)
        }
    },[selectIds])

    function instantAdd(newNote){
        console.log(newNote)
        setNotes(prev => {
            return [...prev, newNote]
        })
    }

    function instantDelete(deleteId){
        setNotes(prev => {
            return prev.filter(datas => {
                return datas.id !== deleteId
            })
        })
    }

    function getId(clickedId){
        setTempId(clickedId);
        if(!enableEdit){
            if(selectNote){
                if(selectIds.includes(clickedId)){
                    console.log('includes')
                    setSelectIds(prev => prev.filter(data => data !== clickedId))
                }else{
                    setSelectIds(prev=> [...prev,clickedId])
                }
            }else{
                setViewPopUp(true);
            }
        }else{
                window.location.href = '/'+userid+'/index/notes/'+clickedId+'/update'
        }
    }
    
    function deleteNote(){
        axios.post('http://localhost:4000/'+userid+'/index/home/deletenote',selectIds)
        .then(response => {
            console.log(response.data.message);
            setSelectIds([])
        })
    }

    function completedNote(){
        axios.post('http://localhost:4000/'+userid+'/index/notes/done',selectIds)
        .then(response => setSelectIds([]))
    }


    return(
        <div className="notesBody">
            <input type='text' placeholder='Search' classname='searchBar' />
            {selectNote&&
                        <MoreVertIcon 
                            fontSize="large" 
                            style={{color:'white', position:'absolute', right:'0%', top:'-7.5%'}}
                            onClick={() => {
                                console.log(selectIds)
                                setDropMenu(true)}} />}
            <IndexDropMenu 
                    visible={dropMenu} 
                    setVisible={setDropMenu} 
                    completeFunc={completedNote}
                    deleteFunc={deleteNote} />
            <SearchIcon 
                fontSize='medium'
                style={{position:'absolute', left:'7%',top:'3.5vh' ,color:'gray'}}
            />
            <CustomSpeedDial AddNote={setAddPopUp} editPop={setEnableEdit} />
            <div className="notesContainer">
                <div>
                    {notes&&notes.map((note, index) =>{
                        if((index+1) % 2 != 0){
                            console.log(note)
                        return(
                                        <NoteBubble key={index}
                                                    id={note.id}
                                                    title={note.title} 
                                                    note={note.note}
                                                    returnId={getId}
                                                    removeId={deleteNote}
                                                    dance={enableEdit}
                                                    setSelect={setSelectNote}
                                                    select={selectIds.includes(note.id)} />
                        )
                        }   
                    })}
                </div>
                <div>
                    {notes&&notes.map((note, index) =>{
                        if((index+1) % 2 == 0){
                        return(
                                        <NoteBubble 
                                                    id={note.id}
                                                    title={note.title} 
                                                    note={note.note}
                                                    returnId={getId}
                                                    removeId={deleteNote}
                                                    dance={enableEdit}
                                                    setSelect={setSelectNote}
                                                    select={selectIds.includes(note.id)} />
                        )
                        }
                    })}
                </div>

            </div>
            <AddNote visible={addPopUp} setVisible={setAddPopUp} return={instantAdd} /> 
            <ViewNote id={tempId} visible={viewPopUp&&!menuPopUp} setVisible={setViewPopUp} done={instantDelete} /> 
            {/* <Delete 
                visible={menuPopUp} 
                setVisible={setMenuPopUp} 
                removeId={tempDeleteId}
                removeInstant= {instantDelete} />    */}
        </div>
    )
}

export default NotesPage;