import React from "react";
import logo from '../assets/logo.png';

export default function Header(){
    return (
        <div id = 'header'>
            <img src = {logo} />
            <h1>LeetBoost</h1>
        </div>
    )
}
