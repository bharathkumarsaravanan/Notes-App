import React from "react";
import {TextField, Button} from "@mui/material";
import { useState } from "react";
import AlertPop from "./popups/Alerts";
import axious from "axios";

function Login(){

    const [auth, setauth] = useState({email:'', password:''});
    const [er, setEr] = useState(false)

    localStorage.setItem('Logged in',false);    

    function getData(data){
        setEr(false)
        var {name, value} = data.target;
        setauth(prev => {
            return{
                ...prev,
                [name] : value,
            }
        })
    }

    function handleClick(){
        axious.post('http://localhost:4000/login',auth)
        .then(response =>  {
            if(response.data.authentication){
                localStorage.setItem('Logged in',true);
                var userId = response.data.userId[0].id;
                window.location.href = "/"+userId+"/index/notes"
                console.log(response.data.userId[0])
            }else{
                setEr(true)
            }
        })
    }

    return(
        <div className="login">
            <AlertPop 
                visible={er}
                variant='filled' 
                severity='error' 
                message= 'Could not find this account!'
            /> 
            <TextField 
                name="email"
                label="Email"
                type= "email"
                value={auth.email}
                onChange={getData}
            />
            <TextField 
                name="password"
                label="Password"
                type= "password"
                value={auth.password}
                onChange={getData}
            />
            <Button variant="contained" onClick={handleClick}>Login</Button>
        </div>
    )
}

export default Login;