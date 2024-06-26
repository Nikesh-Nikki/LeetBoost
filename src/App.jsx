import React from "react";
import ToggleButton from "./components/ToggleButton.jsx";
import SnippetsContainer from "./components/SnippetsContainer.jsx";

export default function App(){
    return (
        <div id = "app">
            <SnippetsContainer />
            <ToggleButton />
        </div>
    )
}
