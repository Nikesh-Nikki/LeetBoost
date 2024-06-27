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
            <div id = 'error'>{errorState}</div>
            <input type="text" value = {triggerState} onChange={(e)=>setTriggerState(e.target.value)}/>
            <textarea
            value = {snippetState}
            onChange={e => setSnippetState(e.target.value)}
            >
            </textarea>
            <button id = "submit" onClick={validate}>
                Submit
            </button>
            <button id="discard" onClick={handleDiscard}>
                Discard
            </button>
        </div>
    )
}