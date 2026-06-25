console.log('injected script')

let itemProvider
function getEditorInstances() {
    return window.monaco?.editor?.getEditors?.() || []
}

function waitForEditor(callback) {
    const editors = getEditorInstances()
    if (editors.length > 0) {
        callback(editors)
        return
    }

    setTimeout(() => waitForEditor(callback), 100)
}

waitForEditor((editors) => {
    window.addEventListener('message', (event) => {
        if (event.source !== window) return
        if (event.data.from === 'content-script') {
            // content-script sends set-snippets when injected script sends editor-ready and also when snippets are refreshed
            if (event.data.type === 'set-snippets') {
                console.log('recieved snippets from content-script')
                makeItems(event.data.snippets)
            }
        }
    })

    // injected script sends editor ready event
    window.postMessage(
        {
            from: 'injected-script',
            type: 'editor-ready'
        }
    )
})

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