import React from "react"
import './styles/style.css'

export default function SuggestBox({left,top,suggestedWords,hide}){
    
    // suggestedWords contains list of words (strings)
    const position = {
        left : left + 'px',
        top : top + 'px'
    }
    return (
        <div id = "suggest-box" style={position} className = {(hide) ? 'hide' : ''}>
            {
                (suggestedWords?.map(
                    (word) => {
                        return (
                            <div class = "suggest-word">
                                {word}
                            </div>
                        )
                    }
                ))
            }
        </div>        
    )
}