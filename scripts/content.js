import React from 'react'
import ReactDOM from "react-dom/client"

const domReadyCheckInterval = setInterval(
    ()=>{
        const tabbar = document.getElementById('code_tabbar_outer')
        if(tabbar){
            main()
            clearInterval(domReadyCheckInterval)
        }
    }
    , 100
)

function main(){
    const tabbar = document.getElementById('code_tabbar_outer')
    const myroot = document.createElement('div')
    myroot.setAttribute('id','my-root')
    myroot.classList.add('flexlayout__tab_toolbar')
    tabbar.appendChild(myroot)
    
    ReactDOM.createRoot(document.getElementById("my-root")).render(
        <button>Hellooo</button>    
    )
}
    
console.log('heheyyyy this is nikkibucky')