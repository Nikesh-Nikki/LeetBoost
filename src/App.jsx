import React from "react";
import ToggleButton from "./components/ToggleButton.jsx";
import SnippetsContainer from "./components/SnippetsContainer.jsx";
import './styles/style.css'
import Header from "./components/Header.jsx";

export default function App(){
    return (
        <div id = "app">
            <Header />
            <SnippetsContainer />
            <ToggleButton />
        </div>
    )
}
