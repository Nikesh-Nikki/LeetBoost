chrome.runtime.onInstalled.addListener(
    async () => {
        await chrome.storage.local.set({active : true})
        await chrome.storage.local.set(
            {
                snippets : [
                    {
                        trigger : "fast" ,
                        snippet : "ios::sync_with_stdio(false);\ncin.tie(nullptr);\n"
                    },
                    {
                        trigger : "sort",
                        snippet : "sort($1.begin(),$1.end())"
                    }
                ]
            }
        )
    }
)

chrome.action.onClicked.addListener(
    async () => {
        const state = await chrome.storage.local.get(['active'])
        const newState = ! state
        await chrome.storage.local.set({active : newState})   
    }
)

chrome.runtime.onMessage.addListener(
    (message,sender,sendResponse) => {
        console.log(message)
        if(message.event == 'get-active') {
            chrome.storage.local.get(['active']).then(sendResponse)
            return true
        } else if(message.event == 'set-active'){
            chrome.storage.local.set({active : message.newActive})
            return true
        }
        else if(message.event == 'get-snippets'){
            chrome.storage.local.get(['snippets']).then(sendResponse)
            return true
        }
    }
)