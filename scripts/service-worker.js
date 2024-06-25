chrome.runtime.onInstalled.addListener(
    async () => {
        await chrome.storage.local.set({active : true})
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
        }
    }
)