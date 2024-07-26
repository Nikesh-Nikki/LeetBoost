chrome.runtime.onInstalled.addListener(
    // this function is called after extension is installed by user
    async () => {
        // setting active to be true at the time of installation
        await chrome.storage.local.set({active : true})
        const res = await chrome.storage.local.get('snippets')
        // if there are snippets already, then dont replace.
        if(res.snippets) return
        // some default snippets
        await chrome.storage.local.set(
            {
                snippets : [
                    {
                        trigger : "fast" ,
                        snippet : "ios::sync_with_stdio(false);\ncin.tie(nullptr);\n"
                    },
                    {
                        trigger : "sort",
                        snippet : "sort($1.begin(),$1.end());"
                    },
                    {
                        trigger : "pb",
                        snippet : "$1.push_back($2);"
                    }
                ]
            }
        )
    }
)

chrome.runtime.onMessage.addListener(
    (message,sender,sendResponse) => {
        console.log(message)
        if(message.event == 'get-active') {
            chrome.storage.local.get(['active']).then(sendResponse)
            return true
        } 
        else if(message.event == 'get-snippets'){
            chrome.storage.local.get(['snippets']).then(sendResponse)
            return true
        }
    }
)