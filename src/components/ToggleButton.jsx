import React, { useEffect } from "react"
import Switch from 'react-switch'
import { useState } from "react";

export default function ToggleButton(){
  const [checked, setChecked] = useState(true);

  function activeChanged(){
    chrome.runtime.sendMessage(
      {
        event : 'set-active',
        newActive : !checked
      }
    )
    setChecked((c) => ! c)
  }

  useEffect(
    ()=>{
      chrome.runtime.sendMessage({event : 'get-active'}).then(
        res => setChecked(res.active)
      )
    } , []
  )

  return (
    <div id = "toggle-active">
      <label>
        <span> Enable/Disable AutoCorrect :  </span>
        <Switch
          onChange={activeChanged}
          checked={checked}
          offColor={"#FF0000"}
        />
      </label>
    </div>
  )
}