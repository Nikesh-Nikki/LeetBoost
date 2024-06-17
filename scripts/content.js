import React from 'react'
import ReactDOM from "react-dom/client"
import App from './App'

const domReadyCheckInterval = setInterval(
    ()=>{
        if(document.readyState == 'complete'){
            main()
            clearInterval(domReadyCheckInterval)
        }
    }
    , 100
)

function main(){
    const body = document.body
    //creating the root for my react component
    const myroot = document.createElement('div')
    myroot.setAttribute('id','my-root')
    //injecting element into body
    body.appendChild(myroot)
    
    ReactDOM.createRoot(document.getElementById("my-root")).render(
        <App />  
    )
}
    
console.log('heheyyyy this is nikkibucky')