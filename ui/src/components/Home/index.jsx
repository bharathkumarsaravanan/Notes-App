import React from "react";
import { useState } from "react";

import Header from "./header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function Index(){

    return(
        <div className="homeIndex">
            <Header />
            <Outlet />
            <Footer />
   
        </div>
    )
}

export default Index;