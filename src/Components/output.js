import React from "react";
import OutputRow from "./outputRow";

const Output = (props) =>{
    return(
        <>
            <OutputRow value ={props.answer} />
            <OutputRow value ={props.user} className={props.className}/>
        </>
    )
}

export default Output