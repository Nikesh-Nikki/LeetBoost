import React from "react";

export default function Snippet({trigger,snippet,handleEdit,handleDelete}){
    return (
        <div className="snippet">
            <h2 className="trigger"> { trigger } </h2>
            <div>
                {snippet}
            </div>
            <button onClick = {()=>handleEdit(trigger)}>
                Edit
            </button>
            <button onClick = {()=>handleDelete(trigger)}>
                Delete
            </button>
        </div>
    )
}