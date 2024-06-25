function injectScript(scriptName) {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL(scriptName);
    document.documentElement.appendChild(script);
    script.onload = function() {
        script.remove();
    };
}


async function main(){
    const active = await chrome.runtime.sendMessage({event : 'get-active'})
    console.log(active)

    if(active.active) injectScript('/scripts/enable.js')
}

console.log('helloo')
main()