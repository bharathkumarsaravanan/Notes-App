import React from "react";
import { Typography } from "@mui/material";
import { useState,useEffect } from "react";
import {useLongPress} from "use-long-press";
import { useAnimation, motion } from "framer-motion";

function NoteBubble(props){

    var animation = useAnimation();
    
    const deleteId = useLongPress(() => {
        // props.removeId(props.id)
        props.setSelect(true);
        console.log('pressed')
    })

    useEffect(() => {
        if(props.dance){
            animation.start({
                rotate: [10,-10,10],
                transition: {
                    duration: 1, repeat: Infinity, ease: 'linear'
                }
            });
        }
        if(!props.dance){
            animation.start({
                rotate: 0
            })
        }

    },[props.dance])

    function handleClick(){
        props.returnId(props.id)
    }


    return(
        <motion.div 
            animate={animation}
            style={{outline:props.select&&'2px solid #1976D2'}}
            className="noteBubble"
            {...deleteId()}
            onClick={handleClick}
            >
            <div></div>
            <Typography variant="h6" style={{borderBottom:'1px solid #7f8487', marginBottom:'2vh'}}>{props.title}</Typography>
            <Typography variant="h7">{props.note.split(' ').length > 20 ?
                                                                props.note.split(" ").slice(0,20).join(" ")+'...':
                                                                props.note}</Typography>
        </motion.div>
    )
}

export default NoteBubble;