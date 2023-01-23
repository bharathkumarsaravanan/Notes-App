import React from "react";
import { Routes, Route } from "react-router-dom";
import Index from "../Home/index";
import NotesPage from "../Home/Notes/NotesPage";
import SchedulePage from "../Home/Schedule/SchedulePage";
import DuePage from "../Home/Schedule/Route/duePage";
import CreatedPage from "../Home/Schedule/Route/createdPage";
import Notifications from "../Home/Notifications/notifications";
import ProgressPage from "../Home/Progress/progressPage";
import UpdatePage from '../Home/Notes/updateRoute';

function IndexRoute(){
    return(
        <Routes>
            <Route path="/:userid/index" element={<Index/>} >
                <Route path="notes" element={<NotesPage/>}/>
                <Route path="schedule" element={<SchedulePage/>} />
                <Route path="notifications" element={<Notifications/>} />
                <Route path="progress" element={<ProgressPage/>} />
            </Route>
            <Route path="/:userid/index/notes/:noteid/update" element={<UpdatePage/>} />
            <Route path="/:userid/index/schedule/due/:date" element={<DuePage/>} />
            <Route path="/:userid/index/schedule/created/:date" element={<CreatedPage/>} />
        </Routes>
    )
}

export default IndexRoute;