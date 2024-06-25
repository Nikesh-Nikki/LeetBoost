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
                const editor = document.getElementById('editor')
                editor.onkeyup = ()=> makeItems()
                clearInterval(editorReadyInterval) 
            }
        } ,
    100
)

function getTokens(){
    const editor = window.monaco.editor.getEditors()[0]
    const currentLangauge = editor.getModel().getLanguageId()
    // they have a good default context aware intellisense, i dont have to create items
    if(currentLangauge == 'javascript' || currentLangauge == 'typescript') return []
    // get the entire code and the extract tokens
    const code = editor.getValue()
    const words = Array.from(code.matchAll(/\b[a-zA-Z\_]\w+\b/g))
    // also get current word and exclude it from the list
    const currentPosition = editor.getPosition()
    let wordAtPosition = editor.getModel().getWordAtPosition(currentPosition)
    // ahaa now lets filter out
    const set = new Set()
    words.forEach(
        (word) => {
            if(wordAtPosition == null || word[0] != wordAtPosition.word) set.add(word[0])
            else wordAtPosition.word = '-'
        }
    )
    return Array.from(set)
}

function makeItems(){
    const tokens = getTokens()
    monaco.languages.registerCompletionItemProvider('*', {
        provideCompletionItems: () => {
            const suggestions = [
                tokens.map(
                    token => {
                        return {
                            label: token,
                            kind: monaco.languages.CompletionItemKind.Text,
                            insertText: token,
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'Recomending because it is already typed by you'
                        }
                    }
                )
            ];
            return { suggestions: suggestions };
        }
    });
}