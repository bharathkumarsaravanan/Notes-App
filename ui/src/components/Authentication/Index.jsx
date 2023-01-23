import React from "react";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";


function Index(){

    return(
        <div className="AuthenticationPage">
            <div className="AuthContainer">
                <div className="pin"></div>
                <Outlet />
                <div>
                    <NavLink to={'signup'}>SignUp</NavLink>
                    <NavLink to={'login'}>Back to login</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Index;