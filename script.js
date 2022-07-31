/******** 
 * OnClick functions
********/

// Called when user clicks calculate button
function calc() {
    let cStart = parseInt(document.getElementById("control-start").value);
    let cEnd = parseInt(document.getElementById("control-end").value);
    let nodes = document.querySelectorAll('.div');
    nodes.forEach(node => {
        let nodeIndex = node.id.split("-")[1];
        calcNode(nodeIndex, cStart, cEnd);
    });
}

// Called when user clicks add node button
function addNode() {
    let index = document.querySelectorAll('.start').length + 1;
    let div = document.createElement('div');
    div.id = "div-" + index;
    div.className = "div";
    let spaces = spaceIndexElement(index)
    let spanSpaceElement = createSpanSpace(spaces, index, index);
    let startElement = createStartElement(index);
    let endElement = createEndElement(index);
    let deleteNodeElement = createDeleteNodeElement(index);
    deleteNodeElement.addEventListener('click', () => {
        deleteNode(deleteNodeElement.id);
    });
    let spaceElement = document.createTextNode(' ');
    div.appendChild(spanSpaceElement);
    div.appendChild(startElement);
    div.appendChild(endElement);
    div.appendChild(spaceElement);
    div.appendChild(deleteNodeElement);
    insertAfter(div, document.getElementById("div-" + (index - 1)));
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
    updateTableIndexes();
}

// Called when user clicks delete node button
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
    updateTableIndexes();
}

/******** 
 * Create element helper functions
********/
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

/******** 
 * Calculation functions
********/

// Populates table with calculation for length and offset based on the values in the input at the given index
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

// Calculates length
function calcLength(cStart, cEnd, end, offset) {
    return -(cStart*(cEnd/cStart)+offset-end)/(cEnd/cStart)
}

// Calculates offset
function calcOffset(cStart, cEnd, start, end) {
    return -(((end-start)/((cEnd/cStart)-1))-start)
}

/******** 
 * Utility functions
********/

// Returns amount of padding amount (ch) that should be used so that spacing is consistent regardless of index
function spaceIndexElement(indexElement) {
    let text = indexElement.toString();
    let spaces = 0;
    while (text.length < 6) {
        text = text + " ";
        spaces += 1;
    }
    return spaces;
}

// Inserts an element after a reference element
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

// Recursively gets an array of all children elements
function getAllDescendants(element) {
    var children = [].slice.call(element.children), found = 0;
    while (children.length > found) {
        children = children.concat([].slice.call(children[found].children));
        found++;
    }
    return children;
}

function updateTableIndexes() {
    tData = document.querySelectorAll('td');
    tData.forEach(td => {
        if (td.id.split('-')[0] == 'index') {
            td.innerText = td.id.split('-')[1];
        }
    });
}