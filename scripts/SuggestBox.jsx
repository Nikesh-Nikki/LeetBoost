import React from "react"
import './styles/style.css'
import { useState } from "react"

export default function SuggestBox({left,top,suggestedWords}){
    
    // suggestedWords contains list of words (strings)
    const position = {
        left : left + 'px',
        top : top + 'px'
    }
    return (
        <div id = "suggest-box" style={position}>
            {
                (suggestedWords.map(
                    (word) => {
                        <div class = "suggest-word">
                            {word}
                        </div>
                    }
                ))
            }
        </div>        
    )
}