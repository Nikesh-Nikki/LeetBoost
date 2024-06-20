// this funciton returns the span that user is currently editing
function getFocussedSpan(){
    // we need the view-line that has the same top value as the textarea
    const lines = document.querySelectorAll('#editor .view-line')
    const textarea = document.querySelector('#editor textarea')
    let focussedLine ;
    lines.forEach(
        (line)=> {
            if(line.getBoundingClientRect().y == textarea.getBoundingClientRect().y) focussedLine = line
        }
    )
    if(!focussedLine) return
    // now we need to find which span is being modified 
    const spans = focussedLine.childNodes[0].childNodes
    let focussedSpan;
    const cursorX = textarea.getBoundingClientRect().left
    Array.from(spans).every(
        (span) => {
            const {
                left : spanL,
                right : spanR
            } = span.getBoundingClientRect()
            if(spanL < cursorX && (spanR > cursorX || (Math.abs(spanR-cursorX) < 1))) {
                focussedSpan = span
                return false
            } else return true
        }
    )
    return focussedSpan
}

function getIndexOfCursor(span) {
    if(!span) return
    const textarea = document.querySelector('#editor textarea')
    const leftOfCursor = textarea.getBoundingClientRect().x - span.getBoundingClientRect().x
    const text = span.innerText
    // create a div with exact same styling as the span
    const div = document.createElement('div')
    const copyStyle = getComputedStyle(span)
    for( let prop of copyStyle){
        div.style[prop] = copyStyle[prop]
    }
    document.body.appendChild(div)
    for(let i = 0;i<=text.length;i++) {
        div.innerText = text.substring(0,i)
        if(Math.abs(div.getBoundingClientRect().width - leftOfCursor) < 1){
            document.body.removeChild(div)
            return i
        }
    }
}

export default function currentWord(){
    const span = getFocussedSpan()
    if(!span) return
    const index = getIndexOfCursor(span)
    const text = span.innerText
    const tokens = Array.from(text.matchAll(/\w+/g))
    for(let i = 0;i<tokens.length;i++){
        if(tokens[i].index <= index && tokens[i].index+tokens[i][0].length >= index) return tokens[i][0]
    }
}