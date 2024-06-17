import React from 'react'
import SuggestBox from './SuggestBox.jsx'
import { useState } from 'react'
import { useEffect } from 'react'

export default function App(){

    const [isActive , setIsActive] = useState(false)
    const [position,setPosition] = useState()

    useEffect(
        () => {
            const textarea = document.querySelector('#editor textarea')
            const interval = setInterval(
                ()=>{
                    setPosition(
                        {
                            x : textarea?.getBoundingClientRect().x , 
                            y : textarea?.getBoundingClientRect().y
                        }
                    )
                }
                ,
                100
            )
            return (()=>clearInterval(interval))
        }
        ,
        []
    )

    // display suggestbox only when active element is editor

    const textarea = document.querySelector('#editor textarea')

    textarea.addEventListener(
        'focus' , ()=>setIsActive(true)
    )

    textarea.addEventListener(
        'blur' , ()=>setIsActive(false)
    )

    

    return (
        <SuggestBox 
            hide={!isActive} 
            left={position?.x} 
            top={((position?.y) ? position.y+18 : undefined)}
            suggestedWords={['hello','nikki','bucky']}
            />
    )
}