import React from "react"
import Switch from 'react-switch'
import { useState } from "react";

export default function ToggleButton(){
    const [checked, setChecked] = useState(true);
  return (
    <div id = "toggle-active">
      <label>
        <span> Enable/Disable AutoCorrect :  </span>
        <Switch
          onChange={() => setChecked((c) => !c)}
          checked={checked}
          offColor={"#FF0000"}
        />
      </label>
    </div>
  )
}