function getQuestionNumber(){
    const allAnchors = document.querySelectorAll('a')
    let questionNumber;
    Array.from(allAnchors).forEach(
        anchor => {
            if(/[0-9]+\. [a-zA-Z ]+/.test(anchor.innerText))
                questionNumber = anchor.innerText.match(/[0-9]+/)
        }
    )
    return questionNumber[0]
}

function findKeyForLocalStorage( questionNumber ){
    for(let i in localStorage) {
        if(i.startsWith(questionNumber+'_') && /[0-9]+_[0-9]+_\w+$/.test(i))
            return i
    }
}

function getTokens(){

    if(! this.keyForSolution ) this.keyForSolution = findKeyForLocalStorage(getQuestionNumber())

    const tokens = new Set()
    let code = localStorage[this.keyForSolution]
    // deleting all new line chars
    code = code.replaceAll(/\\n/g,' ')
    const words = code.matchAll(/[a-zA-Z_]+/g)

    words.forEach(
        word => tokens.add(word[0])
    )

    return tokens
}