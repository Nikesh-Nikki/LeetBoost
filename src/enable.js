editorReadyInterval = setInterval(
    ()=>{
        window.monaco.editor.getEditors()[0].updateOptions({
            suggestOnTriggerCharacters: true,
            quickSuggestions: true,
            parameterHints: {
                enabled: true
            }
        })
        clearInterval(editorReadyInterval) 
    },
    100
)