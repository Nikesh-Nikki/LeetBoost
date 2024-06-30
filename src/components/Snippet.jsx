import React from "react";
import edit from '../assets/edit.svg'
import deleteSVG from '../assets/delete.svg'

export default function Snippet({trigger,snippet,handleEdit,handleDelete}){
    return (
        <div className="snippet">
            <div className = 'snippet-top'>
                <h2 className="trigger"> { trigger } </h2>
                <div className = 'buttons'>
                    <button onClick = {()=>handleEdit(trigger)} className="edit-button">
                        <img src={edit} />
                    </button>
                    <button onClick = {()=>handleDelete(trigger)} className="delete-button">
                        <img src={deleteSVG} />
                    </button>
                </div>
            </div>
            <code>
                {snippet}
            </code>
        </div>
    )
}