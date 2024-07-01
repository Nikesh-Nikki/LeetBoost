export default function sendMessageToAll(data) {
    const problems = "https://leetcode.com/problems/"
    const contest =  "https://leetcode.com/contest/"
    // iterating over all tabs and sending message to only urls that have a content-script
    chrome.tabs.query({} , (tabs) => {
        for(let tab of tabs) {
            if(tab.url.startsWith(problems) || tab.url.startsWith(contest)) {
                chrome.tabs.sendMessage(
                    tab.id , {
                        ...data
                    },
                    (res) => {
                        const lastError = chrome.runtime.lastError
                        if(lastError){
                            console.log(lastError.message)
                            return
                        }
                    }
                )
            }
        }
    })
}