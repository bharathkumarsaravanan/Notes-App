import React from "react";
import { Routes, Route } from "react-router-dom";
import Index from "../Authentication/Index";
import Login from "../Authentication/login";
import SignUp from "../Authentication/SignUp";


function AuthRoute(){
    return(
        <Routes>
            <Route path="/" element={<Index/>}>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
            </Route>
        </Routes>
    )
}

export default AuthRoute;