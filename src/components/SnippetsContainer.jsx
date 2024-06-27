import React, { useEffect, useState } from "react";
import Snippet from "./Snippet.jsx";

export default function SnippetsContainer(){

    const [snippets,setSnippets] = useState([])

    useEffect(
        () => {
            chrome.storage.local.get('snippets').then(
                (res) => setSnippets(res.snippets)
            )
        } , 
        []
    )

    return (
        <div id = "snippets-container">
            {
                snippets.map(
                    (snippet) => {
                        console.log(snippet)
                       return <Snippet key={snippet.trigger} trigger={snippet.trigger} snippet={snippet.snippet} />
                    }
                )
            }
        </div>
    )
}