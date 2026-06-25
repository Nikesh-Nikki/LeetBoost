function applyEditorOptions(options) {
    const editors = window.monaco?.editor?.getEditors?.() || []
    if (editors.length === 0) {
        setTimeout(() => applyEditorOptions(options), 100)
        return
    }

    editors.forEach((editor) => editor.updateOptions(options))
}

applyEditorOptions({
    suggestOnTriggerCharacters: true,
    quickSuggestions: true,
    parameterHints: {
        enabled: true
    }
})