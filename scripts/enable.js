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
                clearInterval(editorReadyInterval) 
            }
        } ,
    100
)