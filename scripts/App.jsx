import React from 'react'
import SuggestBox from './SuggestBox.jsx'
import { useState } from 'react'
import { useEffect } from 'react'
import tokenHandler from './tokens.js'
import Fuse from 'fuse.js'
import currentWord from './currentWord.js'

export default function App(){

    const [boxState,setBoxState] = useState()

    useEffect(
        () => {
            const textarea = document.querySelector('#editor textarea')
            const editor = document.getElementById('editor')
        
            textarea.addEventListener(
                'blur' , ()=>setBoxState(
                    {
                        isActive : false
                    }
                )
            )

            editor.addEventListener(
                'click' , 
                ()=> {
                    setBoxState(
                        {
                            isActive : false
                        }
                    )
                }
            )

            editor.addEventListener(
                'keyup' , 
                ()=> {
                    // when user types something
                    // get all the tokens
                    const tokens = tokenHandler.getTokens()
                    //get the word that user is typing now
                    const userTyping = currentWord()
                    if(userTyping === undefined) {
                        setBoxState(
                            {
                                isActive : false
                            }
                        )
                        return
                    }
                    if(tokens[userTyping] === 1) delete tokens[userTyping]
                    // use fuse and get suggested words
                    const fuse = new Fuse(Object.keys(tokens) , {threshold : 0.4})
                    const suggestions = fuse.search(userTyping)
                    // set the state
                    setBoxState(
                        {
                            isActive : true,
                            x : textarea?.getBoundingClientRect().x ,
                            y : textarea?.getBoundingClientRect().y,
                            suggestedWords : suggestions?.map(sug => sug.item)
                        }
                    )
                }
            )
        }
        ,
        []
    )

    // display suggestbox only when active element is editor

    return (
        <SuggestBox 
            hide={!boxState?.isActive} 
            left={boxState?.x} 
            top={((boxState?.y) ? boxState.y+18 : undefined)}
            suggestedWords={boxState?.suggestedWords}
            />
    )
}