function injectScript(scriptName) {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL(scriptName);
    document.documentElement.appendChild(script);
    script.onload = function() {
        script.remove();
    };
}

window.addEventListener('message' , async (event)=>{
    if(event.source !== window) return
    if(event.data.from == 'injected-script'){
        if(event.data.type == 'get-snippets') {
            const res = await chrome.runtime.sendMessage({event : 'get-snippets'})
            console.log('posting snippets')
            window.postMessage(
                {
                    from : 'content-script' , 
                    type : 'set-snippets',
                    snippets : res.snippets
                }
            )
        }
    }
})


async function main(){
    const active = await chrome.runtime.sendMessage({event : 'get-active'})
    console.log(active)
    if(active.active) injectScript('/scripts/enable.js')
}

console.log('helloo')
main()