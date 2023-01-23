import React from "react";
import DailyAct from "./dailyActivity";
import NoteCount from "./noteCount";
import OverDue from "./overdue";

function ProgressPage(){

    return(
        <div className="notesBody">
            <DailyAct />
            <NoteCount />
            <OverDue />
        </div>
    )
}

export default ProgressPage;