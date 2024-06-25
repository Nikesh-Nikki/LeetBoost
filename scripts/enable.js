console.log('enabling')

const editorReadyInterval = setInterval(
    ()=>{
        try {
            window.monaco.editor.getEditors()[0].updateOptions({
                suggestOnTriggerCharacters: true,
                quickSuggestions: true,
                parameterHints: {
                    enabled: true
                }
            })
            clearInterval(editorReadyInterval) 
        } catch(err) {

        }
    },
    100
)