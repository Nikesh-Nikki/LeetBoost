// represents if auto correct is on or off
let leetBoostActive = false
// editorReady is set to true when injected script sends editor ready event
let editorReady = false

// given scriptName. creates a script element, sets its src , injects it to DOM. 
// Then after script is loaded and executed, we remove script from DOM
function injectScript(scriptName) {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL(scriptName);
    document.documentElement.appendChild(script);
    script.onload = function() {
        script.remove();
    };
}

// given snippets posts snippets using window.postMessage to injected script
function postSnippetsToInjectedScript(snippets){
    window.postMessage(
        {
            from : 'content-script' , 
            type : 'set-snippets',
            snippets : snippets
        }
    )
}

// gets snippets from service-worker and then posts it to injected script. and then injects script to enable quickSuggestions.
async function enableAutoCorrect(){
    const res = await chrome.runtime.sendMessage({event : 'get-snippets'})
    postSnippetsToInjectedScript(res.snippets)
    injectScript('src/enable.js')
    leetBoostActive = true
}

// injects script that disables suggestions
function disableAutoCorrect(){
    injectScript('src/disable.js')
    leetBoostActive = false
}

window.addEventListener('message' , async (event)=>{
    if(event.source !== window) return
    if(event.data.from == 'injected-script'){
        // when editor sends editor-ready event, we check if autocorrect is on. if it is, then enableAutoCorrect()
        if(event.data.type == 'editor-ready') {
            console.log('editor is ready')
            const res = await chrome.runtime.sendMessage({event : 'get-active'})
            leetBoostActive = res.active
            if(res.active) enableAutoCorrect()
                editorReady = true
        }
        // this is required to keep connection open for async data transfers
        return true
    }
})

chrome.runtime.onMessage.addListener(
    (message,sender,sendResponse) => {
        if(message.event === 'refresh-snippets') {
            // if snippets are changed, then we send new snippets only when leetboost is active
            if(leetBoostActive)  {
                console.log('refreshing snippets')
                postSnippetsToInjectedScript(message.snippets)
            }
        } else if(message.event === 'refresh-active') {
            // if autocorrect active is changed then check if editor is ready, if it is only then activate or disable
            if(editorReady){
                console.log('refreshint active')
                if(message.active) enableAutoCorrect()
                else disableAutoCorrect()
            }
        }
    }
)

injectScript('/src/initialize.js')