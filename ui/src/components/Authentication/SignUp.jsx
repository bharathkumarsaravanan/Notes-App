import React from "react";
import {TextField, Button} from "@mui/material";
import { useState } from "react";
import axious from "axios";
import AlertPop from "./popups/Alerts";

function SignUp(){

    const [auth, setauth] = useState({name:'',email:'', password:'', confirm:''});
    const [er, setEr] = useState(false);
    const [success , setSuccess] = useState(false);

    function getData(data){
        setEr(false);
        setSuccess(false);
        var {name, value} = data.target;
        setauth(prev => {
            return{
                ...prev,
                [name] : value,
            }
        })
    }

    function handleClick(){
        if(auth.password === auth.confirm){
            if(auth.password!==''&&auth.name!==''&&auth.email!==''){
                axious.post('http://localhost:4000/signup',auth)
                .then(response => console.log(response.data));
                setSuccess(true);
                setauth({name:'',email:'', password:'', confirm:''})
            }
        }
        else{
            setEr(true);
        }
    }

    return(
        <div className="login">
            <AlertPop 
                visible={success}
                setVisible= {setSuccess}
                variant='filled' 
                severity='success' 
                message= 'Account created successfully!'
            />
            <TextField 
                name="name"
                label="Name"
                type= "text"
                value={auth.name}
                onChange={getData}
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
            <TextField 
                error= {er}
                name="confirm"
                label="Confirm"
                type= "password"
                value={auth.confirm}
                onChange={getData}
            />
            <Button variant="contained" onClick={handleClick}>SignUp</Button>
        </div>
    )
}

export default SignUp;