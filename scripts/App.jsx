import React from 'react'
import SuggestBox from './SuggestBox.jsx'
import { useState } from 'react'

export default function App(){

    const [isActive , setIsActive] = useState(false)

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
            left={textarea.getBoundingClientRect().x} 
            top={textarea.getBoundingClientRect().y+18}
            suggestedWords={['hello','nikki','bucky']}
            />
    )
}