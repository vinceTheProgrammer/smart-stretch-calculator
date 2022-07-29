function calc() {
    let cStart = parseInt(document.getElementById("control-start").value);
    let cEnd = parseInt(document.getElementById("control-end").value);

    let start = parseInt(document.getElementById("start-1").value);
    let end = parseInt(document.getElementById("end-1").value);

    let index;
    let length;
    let offset;

    index = 1
    offset = calcOffset(cStart, cEnd, start, end);
    length = calcLength(cStart, cEnd, end, offset);

    document.getElementById("index-1").textContent = index;
    document.getElementById("length-1").textContent = length;
    document.getElementById("offset-1").textContent = offset;
    
    return false;
}

function calcLength(cStart, cEnd, end, offset) {
    // -($B$3*($D$3/$B$3)+D10-C10)/($D$3/$B$3)
    return -(cStart*(cEnd/cStart)+offset-end)/(cEnd/cStart)
}

function calcOffset(cStart, cEnd, start, end) {
    // -(((C8-B8)/(($D$3/$B$3)-1))-B8)
    return -(((end-start)/((cEnd/cStart)-1))-start)
}

function addNode() {
    let index = document.querySelectorAll('.start').length + 1;

    let deleteNode = "deleteNode-" + (index - 1);

    let indexText = spaceIndexElement(index)
    let indexElement = document.createTextNode(indexText);
    let startElement = createStartElement(index);
    let endElement = createEndElement(index);
    let breakElement = document.createElement('br');
    breakElement.id = "break-" + index;
    let deleteNodeElement = createDeleteNodeElement(index);
    let spaceElement = document.createTextNode(' ');


    insertAfter(breakElement, document.getElementById(deleteNode));
    insertAfter(indexElement, document.getElementById(breakElement.id));
    insertAfter(startElement, indexElement);
    insertAfter(endElement, document.getElementById(startElement.id));
    insertAfter(spaceElement, document.getElementById(endElement.id));
    insertAfter(deleteNodeElement, spaceElement);
}

function createStartElement(index) {
    let el = document.createElement('input');
    el.type = "number";
    el.className = "start";
    el.id = "start-" + index;
    el.required = true;
    el.value = "";
    return el;
}

function createEndElement(index) {
    let el = document.createElement('input');
    el.type = "number";
    el.className = "end";
    el.id = "end-" + index;
    el.required = true;
    el.value = "";
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

function spaceIndexElement(indexElement) {
    while (indexElement.toString().length < 6) {
        indexElement = indexElement + " ";
    }
    return indexElement;
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function deleteNode() {

}