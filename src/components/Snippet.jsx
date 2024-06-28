import React from "react";

export default function Snippet({trigger,snippet,handleEdit,handleDelete}){
    return (
        <div className="snippet">
            <div className = 'snippet-top'>
                <h2 className="trigger"> { trigger } </h2>
                <div className = 'buttons'>
                    <button onClick = {()=>handleEdit(trigger)} className="edit-button">
                        Edit
                    </button>
                    <button onClick = {()=>handleDelete(trigger)} className="delete-button">
                        Delete
                    </button>
                </div>
            </div>
            <div>
                {snippet}
            </div>
        </div>
    )
}