export default function sendMessageToAll(data) {
    const problems = "https://leetcode.com/problems/"
    const contest =  "https://leetcode.com/contest/"
    chrome.tabs.query({} , (tabs) => {
        for(let tab of tabs) {
            if(tab.url.startsWith(problems) || tab.url.startsWith(contest)) {
                try {
                    chrome.tabs.sendMessage(
                        tab.id , {
                            ...data
                        }
                    )
                } catch(err) {
                    console.log(err)
                }
            }
        }
    })
}