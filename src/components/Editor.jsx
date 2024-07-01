import React, { useState ,  useEffect } from "react";

export default function Editor({snippets, editIndex, handleSubmit, handleDiscard}){
    const [triggerState , setTriggerState] = useState('')
    const [snippetState , setSnippetState] = useState('')
    const [errorState,setErrorState] = useState()

    useEffect(
        ()=>{
            if(editIndex !== undefined) {
                const snippet = snippets.find(s=>s.trigger===editIndex)
                setTriggerState(snippet.trigger)
                setSnippetState(snippet.snippet)
            }
        },
        []
    )

    function validate(){
        if(triggerState.length === 0) setErrorState('trigger cant be empty')
        else if(snippetState.length === 0) setErrorState('snippet cant be empty')
        else {
            if(
                editIndex === undefined
                ||
                triggerState !== editIndex
            ) {
                for(let i = 0; i < snippets.length; i++){
                    if(snippets[i].trigger === triggerState){
                        setErrorState(`${triggerState} trigger already exists..!!`) 
                        return
                    }
                }
            } 
            handleSubmit(editIndex,triggerState,snippetState)
        }
    }

    return (
        <div id = "editor">
            <h2>{((editIndex) ? 'Edit' : 'Add') + ' Snippet'}</h2>
            <div id = 'error'>{errorState || ' '}</div>
            <input type="text" value = {triggerState} onChange={(e)=>setTriggerState(e.target.value)} placeholder="Enter Trigger word"/>
            <textarea
            value = {snippetState}
            spellCheck = {false}
            onChange={e => setSnippetState(e.target.value)}
            placeholder="Enter Code here. Use $1, $2... in snippet to automatically place cursor at $1 and hit tab to move to next $.
                        Example : $1.push_back($2); when triggered, cursor automatically starts at $1 then when you hit tab, it shifts to $2 position"
            rows={8}
            >
            </textarea>
            <div style={{display : 'flex', justifyContent : 'space-around'}}>
                <button id = "save-button" onClick={validate}>
                    Save
                </button>
                <button id="discard-button" onClick={handleDiscard}>
                    Discard
                </button>
            </div>
        </div>
    )
}