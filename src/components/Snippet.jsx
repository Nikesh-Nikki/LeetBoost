import React from "react";

export default function Snippet({trigger,snippet}){
    return (
        <div className="snippet">
            <h2 className="trigger"> { trigger } </h2>
            <div>
                {snippet}
            </div>
        </div>
    )
}