import React from "react";
import SnippetHandler from "./components/SnippetHandler.jsx";
import './styles/style.css'
import Header from "./components/Header.jsx";

export default function App(){
    return (
        <div id = "app">
            <Header />
            <SnippetHandler />
        </div>
    )
}
