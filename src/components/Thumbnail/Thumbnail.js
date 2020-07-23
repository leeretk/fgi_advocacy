import React from "react";

// This file exports both the List and ListItem components

function Thumbnail(props) {
    return (
        <div role="img">
            <img className="border border-info" alt={props.title} src={props.image}/>
        </div>
    )
    }
export default Thumbnail;
