import CPPKeyWords from "cppKeyWords.js";

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
    // the latest updated code is what we want
    // leetcode stores the updated times for each code in format 123_123456789_cpp-updated-time
    // so consider all the keys that end with updated-time and pick the maximum of them
    let maximumTime = 0 
    let reqKey
    for(let i in localStorage) {
        if(i.endsWith('updated-time')){
            if(+localStorage[i] > maximumTime){
                maximumTime = +localStorage[i]
                reqKey = i
            }
        }
    }
    return reqKey.substring(0,reqKey.length - '-updated-time'.length)
}

function getTokens(){

    if(! this.keyForSolution ) this.keyForSolution = findKeyForLocalStorage(getQuestionNumber())
    // tokens will be a object that contains word and frequency
    const tokens = {}
    let code = localStorage[this.keyForSolution]
    // deleting all new line chars
    code = code.replaceAll(/\\n/g,' ')
    const words = [...CPPKeyWords , ...code.matchAll(/[a-zA-Z_]\w*/g)]

    words.forEach(
        word => {
            if(tokens[word] === undefined) tokens[word] = 1
            else tokens[word]++
        }
    )

    return tokens
}

export default {
    getTokens
}