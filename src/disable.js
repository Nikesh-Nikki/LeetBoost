editorReadyInterval = setInterval(
    ()=>{
        window.monaco.editor.getEditors()[0].updateOptions({
            suggestOnTriggerCharacters: false,
            quickSuggestions: false,
            parameterHints: {
                enabled: false
            }
        })
        clearInterval(editorReadyInterval) 
    },
    100
)