import React from "react";


const OutputRow = (props)=>{
    return(
        <div>
            <input type="text" className={props.className} readOnly value={props.value}></input>
        </div>
    )
}

export default OutputRow;