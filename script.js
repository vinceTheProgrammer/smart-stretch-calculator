function calc() {
    let cStart = parseInt(document.getElementById("control-start").value);
    let cEnd = parseInt(document.getElementById("control-end").value);

    let start = parseInt(document.getElementById("start-1").value);
    let end = parseInt(document.getElementById("end-1").value);

    let startElements = document.querySelectorAll('.start');

    startElements.forEach(el => {
        elIndex = el.id.split("-")[1];
        calcNode(elIndex, cStart, cEnd);
    });

    return false;
}

function calcNode(index, cStart, cEnd) {
    let start = parseInt(document.getElementById("start-" + index).value);
    let end = parseInt(document.getElementById("end-" + index).value);

    let length;
    let offset;

    offset = calcOffset(cStart, cEnd, start, end);
    length = calcLength(cStart, cEnd, end, offset);

    document.getElementById("index-" + index).textContent = index;
    document.getElementById("length-" + index).textContent = length;
    document.getElementById("offset-" + index).textContent = offset;
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

    let div = document.createElement('div');
    div.id = "div-" + index;
    div.className = "div";

    let spaces = spaceIndexElement(index)
    let spanSpaceElement = createSpanSpace(spaces, index, index);
    // let indexElement = document.createTextNode(index);
    let startElement = createStartElement(index);
    let endElement = createEndElement(index);
    // let breakElement = document.createElement('br');
    // breakElement.id = "break-" + index;
    let deleteNodeElement = createDeleteNodeElement(index);
    deleteNodeElement.addEventListener('click', () => {
        let index = deleteNodeElement.id.split('-')[1];
        let elements = document.querySelectorAll(".div");
        if (elements.length < 2) return;
        document.getElementById("div-" + index).remove();
        document.getElementById("result-table").deleteRow(index);
        Array.from(document.getElementById("result-table").rows).forEach(row => {
            let rowId = row.id.split('-');
            let rowIdName = rowId[0];
            let rowIndex = rowId[1];
            if (rowIndex > index) {
                rowIndex -= 1;
                document.getElementById(row.id).id = rowIdName + "-" + rowIndex;
                let descendants = getAllDescendants(row);
                descendants.forEach(des => {
                    let nodeId = des.id.split('-');
                    let nodeIdName = nodeId[0];
                    let nodeIndex = nodeId[1];
                    nodeIndex -= 1;
                    if (nodeIdName == "index")
                        document.getElementById(des.id).innerText = nodeIndex;
                    if (des.id.length > 0)
                        document.getElementById(des.id).id = nodeIdName + "-" + nodeIndex;
                });
            }
        });
        elements.forEach(el => {
            let elId = el.id.split('-');
            let elIdName = elId[0];
            let elIndex = elId[1];
            if (elIndex > index) {
                elIndex -= 1;
                document.getElementById(el.id).id = elIdName + "-" + elIndex;
                let descendants = getAllDescendants(el);
                descendants.forEach(des => {
                    let nodeId = des.id.split('-');
                    let nodeIdName = nodeId[0];
                    let nodeIndex = nodeId[1];
                    nodeIndex -= 1;
                    if (nodeIdName == "indexSpan")
                        document.getElementById(des.id).innerText = nodeIndex;
                    if (des.id.length > 0)
                        document.getElementById(des.id).id = nodeIdName + "-" + nodeIndex;
                });
            }
        });
    });
    let spaceElement = document.createTextNode(' ');

    // div.appendChild(breakElement);
    // div.appendChild(indexElement);
    div.appendChild(spanSpaceElement);
    div.appendChild(startElement);
    div.appendChild(endElement);
    div.appendChild(spaceElement);
    div.appendChild(deleteNodeElement);

    insertAfter(div, document.getElementById("div-" + (index - 1)));


    // insertAfter(breakElement, document.getElementById(deleteNode));
    // insertAfter(indexElement, document.getElementById(breakElement.id));
    // insertAfter(spanSpaceElement, indexElement);
    // insertAfter(startElement, spanSpaceElement);
    // insertAfter(endElement, document.getElementById(startElement.id));
    // insertAfter(spaceElement, document.getElementById(endElement.id));
    // insertAfter(deleteNodeElement, spaceElement);

    let row = document.createElement('tr');
    row.id = "row-" + index;
    let indexTd = document.createElement('td');
    indexTd.id = "index-"+ index;
    let lengthTd = document.createElement('td');
    lengthTd.id = "length-"+ index;
    let offsetTd = document.createElement('td');
    offsetTd.id = "offset-"+ index;

    row.appendChild(indexTd);
    row.appendChild(lengthTd);
    row.appendChild(offsetTd);

    insertAfter(row, document.getElementById("row-" + (index - 1)));
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

function createSpanSpace(spaces, text, index) {
    let el = document.createElement('span');
    el.style = "padding-inline-end: " + spaces + "ch";
    el.innerText = text;
    el.id = "indexSpan-" + index;
    el.className = "indexSpan";
    return el;
}

function spaceIndexElement(indexElement) {
    let text = indexElement.toString();
    let spaces = 0;
    while (text.length < 6) {
        text = text + " ";
        spaces += 1;
    }
    return spaces;
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function deleteNode(id) {
    let index = id.split('-')[1];
    let elements = document.querySelectorAll(".div");
    if (elements.length < 2) return;
    document.getElementById("div-" + index).remove();
    document.getElementById("result-table").deleteRow(index);
    Array.from(document.getElementById("result-table").rows).forEach(row => {
        let rowId = row.id.split('-');
        let rowIdName = rowId[0];
        let rowIndex = rowId[1];
        if (rowIndex > index) {
            rowIndex -= 1;
            document.getElementById(row.id).id = rowIdName + "-" + rowIndex;
            let descendants = getAllDescendants(row);
            descendants.forEach(des => {
                let nodeId = des.id.split('-');
                let nodeIdName = nodeId[0];
                let nodeIndex = nodeId[1];
                nodeIndex -= 1;
                if (nodeIdName == "index")
                        document.getElementById(des.id).innerText = nodeIndex;
                if (des.id.length > 0)
                    document.getElementById(des.id).id = nodeIdName + "-" + nodeIndex;
            });
        }
    });
    elements.forEach(el => {
        let elId = el.id.split('-');
        let elIdName = elId[0];
        let elIndex = elId[1];
        if (elIndex > index) {
            elIndex -= 1;
            document.getElementById(el.id).id = elIdName + "-" + elIndex;
            let descendants = getAllDescendants(el);
            descendants.forEach(des => {
                let nodeId = des.id.split('-');
                let nodeIdName = nodeId[0];
                let nodeIndex = nodeId[1];
                nodeIndex -= 1;
                if (nodeIdName == "indexSpan")
                    document.getElementById(des.id).innerText = nodeIndex;
                if (des.id.length > 0)
                    document.getElementById(des.id).id = nodeIdName + "-" + nodeIndex;
            });
        }
    });
}

function getAllDescendants(element) {
    var children = [].slice.call(element.children), found = 0;
    while (children.length > found) {
        children = children.concat([].slice.call(children[found].children));
        found++;
    }
    return children;
};