import React, { useEffect } from "react"
import Switch from 'react-switch'
import { useState } from "react";
import sendMessageToAll from "../sendMessageToAll.js";

export default function ToggleButton(){
  const [checked, setChecked] = useState(true);

  function activeChanged(){
    sendMessageToAll( {event : 'refresh-active' , active : !checked})
    chrome.storage.local.set({
      active : ! checked
    })
    setChecked((c) => ! c)
  }

  useEffect(
    ()=>{
      chrome.storage.local.get('active').then(
        res => setChecked(res.active)
      )
    } , []
  )

  return (
    <div id = "toggle-active">
      <label>
        <span> AutoCorrect :  </span>
        <Switch
          onChange={activeChanged}
          checked={checked}
          offColor={"#FF0000"}
        />
      </label>
    </div>
  )
}