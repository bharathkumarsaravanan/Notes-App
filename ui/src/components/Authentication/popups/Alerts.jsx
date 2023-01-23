import React from "react";
import Alert from '@mui/material/Alert';
import ReactDOM from "react-dom";
import {motion} from "framer-motion";


function AlertPop(props){
    if(!props.visible) return null
    return ReactDOM.createPortal(
        <motion.div 
            animate={{y:[-25,0]}}
            transition={{duration:1}}
            className="alert">
            <Alert variant={props.variant} severity={props.severity}>
                {props.message}
            </Alert>
        </motion.div>, document.getElementById('portal1')  

    )
}

export default AlertPop;