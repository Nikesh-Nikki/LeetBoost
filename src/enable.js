console.log('enabling')

const editorReadyInterval = setInterval(
    ()=>{
            const textarea = document.querySelector('#editor textarea')
            if(textarea && textarea == document.activeElement) {
                window.monaco.editor.getEditors()[0].updateOptions({
                    suggestOnTriggerCharacters: true,
                    quickSuggestions: true,
                    parameterHints: {
                        enabled: true
                    }
                })
                window.postMessage(
                    {
                        from : 'injected-script',
                        type : 'get-snippets'
                    }
                )
                window.addEventListener('message' , (event)=>{
                    if(event.source !== window) return
                    if(event.data.from == 'content-script'){
                        console.log('recieved snippets')
                        if(event.data.type == 'set-snippets')  makeItems(event.data.snippets)
                    }
                })
                clearInterval(editorReadyInterval) 
            }
        } ,
    100
)

async function makeItems(snippets){
    monaco.languages.registerCompletionItemProvider('*', {
        provideCompletionItems: () => {
            const suggestions = [
                ...snippets.map(
                    snippet => {
                        return {
                            label: snippet.trigger,
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: snippet.snippet,
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                        }
                    }
                )
            ];
            return { suggestions: suggestions };
        }
    });
}