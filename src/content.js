let initialized = false

function injectScript(scriptName) {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL(scriptName);
    document.documentElement.appendChild(script);
    script.onload = function() {
        script.remove();
    };
}

function postSnippetsToInjectedScript(snippets){
    window.postMessage(
        {
            from : 'content-script' , 
            type : 'set-snippets',
            snippets : snippets
        }
    )
}

window.addEventListener('message' , async (event)=>{
    if(event.source !== window) return
    if(event.data.from == 'injected-script'){
        if(event.data.type == 'get-snippets') {
            const res = await chrome.runtime.sendMessage({event : 'get-snippets'})
            console.log('posting snippets')
            postSnippetsToInjectedScript(res.snippets)
        }
        return true
    }
})

chrome.runtime.onMessage.addListener(
    (message,sender,sendResponse) => {
        console.log(message)
        if(message.event === 'refresh-snippets') {
            postSnippetsToInjectedScript(message.snippets)
        } else if(message.event === 'refresh-active') {
            console.log(initialized)
            if(message.active) {
                if(initialized) injectScript('/src/enable.js')
                else injectScript('/src/initialize.js')
                initialized = true
            } else injectScript('src/disable.js')
        }
    }
)


async function main(){
    const res = await chrome.runtime.sendMessage({event : 'get-active'})
    if(res.active){ 
        injectScript('/src/initialize.js')
        initialized = true
    }
}

console.log('helloo')
main()