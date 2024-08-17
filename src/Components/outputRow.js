import React from "react";

const OutputRow = (props)=>{
    return(
        <div>
            <input type="text" readOnly value={props.value}></input>
        </div>
    )
}

export default OutputRow;