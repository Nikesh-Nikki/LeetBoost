console.log('injected script')

let itemProvider


const editorReadyInterval = setInterval(
    // before we configure monaco, the monaco editor should be ready
    // this interval checks if the textarea in editor is focussed or not
    // tried many checks but this turns out to be most safe and easy to implement
    ()=>{
        const textarea = document.querySelector('#editor textarea')
        if(textarea && textarea == document.activeElement) {
                clearInterval(editorReadyInterval)
                window.addEventListener('message' , (event)=>{
                    if(event.source !== window) return
                    if(event.data.from == 'content-script'){
                        // content-script sends set-snippets when injected script sends editor-ready and also when snippets are refreshed
                        if(event.data.type == 'set-snippets') {
                            console.log('recieved snippets from content-script')
                            makeItems(event.data.snippets)
                        } 
                    }
                }) 
                // injected script sends editor ready event
                window.postMessage(
                    {
                        from : 'injected-script',
                        type : 'editor-ready'
                    }
                )
            }
        } ,
    100
)

// this function adds the snippets to editor
async function makeItems(snippets){
    // when already there is item provider, you need to dispose it to prevent repition of snippets
    if(itemProvider) itemProvider.dispose()
    // using monaco api to register completion item provider
    itemProvider = monaco.languages.registerCompletionItemProvider('*', {
        provideCompletionItems: () => {
            const suggestions = [
                ...snippets.map(
                    snippet => {
                        return {
                            label: snippet.trigger,
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: snippet.snippet,
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            // setting sortText to '0000' makes them appear top in suggestions
                            sortText : '0000'
                        }
                    }
                )
            ];
            return { suggestions: suggestions };
        }
    });
}