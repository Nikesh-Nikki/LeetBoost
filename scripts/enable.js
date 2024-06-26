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
                makeItems()
                clearInterval(editorReadyInterval) 
            }
        } ,
    100
)

function getSnippets() {
    return (
        [
            {
                trigger : "fast",
                snippet : "ahahahaaa"
            },
            {
                trigger : "cout",
                snippet : "hahahaa cout"
            }
        ]
    )
}

function makeItems(){
    const snippets = getSnippets()
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