export default function getTokens(){
    const allLines = document.getElementsByClassName('view-line')
    
    const tokens = new Set()

    Array.from(allLines).forEach(
        (line) => {
            const text = line.textContent
            const words = Array.from(text.matchAll(/\w+/g))
            words.forEach(
                (word) => tokens.add(word[0])
            )
        }
    )

    return tokens
}