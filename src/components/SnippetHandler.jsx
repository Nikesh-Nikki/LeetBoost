import React, { useEffect, useState } from "react";
import Snippet from "./Snippet.jsx";
import Editor from "./Editor.jsx";
import addSVG from '../assets/add.svg'

export default function SnippetsContainer(){

    const [snippets,setSnippets] = useState([])
    const [edit , setEdit] = useState(
        {
            editing : false
        }
    )

    useEffect(
        () => {
            chrome.storage.local.get('snippets').then(
                (res) => setSnippets(res.snippets)
            )
        } , 
        []
    )

    function handleSubmit(editIndex, newTrigger, newSnippet){
        let newSnippets = [...snippets]
        if(editIndex !== undefined) newSnippets.splice(newSnippets.map(s=>s.trigger).indexOf(editIndex),1)
        newSnippets.push({
            trigger : newTrigger,
            snippet : newSnippet
        })
        setSnippets(newSnippets)
        chrome.storage.local.set({snippets : newSnippets})
        setEdit(
            {
                editing : false
            }
        )
    }

    function handleDiscard(){
        setEdit(
            {
                editing : false
            }
        )
    }

    function handleEdit(trigger){
        setEdit(
            {
                editing : true,
                editIndex : trigger
            }
        )
    }

    function handleDelete(trigger){
        console.log('deleting '+trigger)
        let newSnippets = [...snippets]
        newSnippets.splice(newSnippets.map(s=>s.trigger).indexOf(trigger),1)
        console.log('after delete')
        console.log(newSnippets)
        chrome.storage.local.set({snippets : newSnippets})
        setSnippets(newSnippets)
    }

    return (
        <div id = "snippet-handler">
            {
                edit.editing ? <Editor editIndex={edit.editIndex} snippets={snippets} handleSubmit={handleSubmit} handleDiscard={handleDiscard}/> 
                : 
                (
                    <>
                        <div id = 'snippet-header'>
                            <h2>Snippets</h2>
                            <button onClick={()=>setEdit({editing : true})} id = "add-button">
                                <img src={addSVG}></img>
                            </button>
                        </div>
                        <div id = 'snippet-container'>
                            {
                                snippets.map(
                                    (snippet) => {
                                        console.log(snippet)
                                    return <Snippet key={snippet.trigger} trigger={snippet.trigger} snippet={snippet.snippet}
                                            handleDelete = {handleDelete} handleEdit = {handleEdit}
                                        />
                                    }
                                )
                            }
                        </div>
                    </>
                )
            }
        </div>
    )
}