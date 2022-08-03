function createStartElement(index) {
    let el = document.createElement('input');
    el.type = "number";
    el.className = "start";
    el.id = "start-" + index;
    el.required = true;
    el.value = "";
    el.placeholder = "Start";
    return el;
}
function createEndElement(index) {
    let el = document.createElement('input');
    el.type = "number";
    el.className = "end";
    el.id = "end-" + index;
    el.required = true;
    el.value = "";
    el.placeholder = "End";
    return el;
}
function createDeleteNodeElement(index) {
    let el = document.createElement('input');
    el.type = "button";
    el.className = "deleteNode";
    el.id = "deleteNode-" + index;
    el.value = "x";
    return el;
}
function createSpanSpace(spaces, text, index) {
    let el = document.createElement('span');
    el.style = "padding-inline-end: " + spaces + "ch";
    el.innerText = text;
    el.id = "indexSpan-" + index;
    el.className = "indexSpan";
    return el;
}