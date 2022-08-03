function onPageLoad() {
    document.getElementById('custom-index-checkbox').checked = false;
    let version = pageConfig.version;
    document.getElementById("version-h4").innerHTML = version + " - " + document.getElementById("version-h4").innerHTML;
    const targetNode = document.getElementById('node-div-container');
    const config = { characterData: true, subtree: true };
    const observer = new MutationObserver(updateTableIndexes);
    observer.observe(targetNode, config);
}

function calc() {
    let cStart = parseInt(document.getElementById("control-start").value);
    let cEnd = parseInt(document.getElementById("control-end").value);
    let nodes = document.querySelectorAll('.div');
    nodes.forEach(node => {
        let nodeIndex = node.id.split("-")[1];
        calcNode(nodeIndex, cStart, cEnd);
    });
}

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
    if(document.getElementById('custom-index-checkbox').checked == true) {
        spanSpaceElement.contentEditable = true;
        spanSpaceElement.style['backgroundColor'] = "white";
    }
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
    row.appendChild(offsetTd);
    row.appendChild(lengthTd);
    insertAfter(row, document.getElementById("row-" + (index - 1)));
    updateTableIndexes();
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
        let rowIndex = Number(rowId[1]);
        if (rowIndex > index) {
            rowIndex -= 1;
            document.getElementById(row.id).id = rowIdName + "-" + rowIndex;
            let descendants = getAllDescendants(row);
            descendants.forEach(des => {
                let nodeId = des.id.split('-');
                let nodeIdName = nodeId[0];
                let nodeIndex = Number(nodeId[1]);
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
        let elIndex = Number(elId[1]);
        if (elIndex > index) {
            elIndex -= 1;
            document.getElementById(el.id).id = elIdName + "-" + elIndex;
            let descendants = getAllDescendants(el);
            descendants.forEach(des => {
                let nodeId = des.id.split('-');
                let nodeIdName = nodeId[0];
                let nodeIndex = Number(nodeId[1]);
                nodeIndex -= 1;
                if (nodeIdName == "indexSpan")
                    if (document.getElementById(des.id).innerText == nodeIndex + 1) {
                        document.getElementById(des.id).innerText = nodeIndex;
                    }
                if (des.id.length > 0)
                    document.getElementById(des.id).id = nodeIdName + "-" + nodeIndex;
            });
        }
    });
    updateTableIndexes();
}

function setEditable(checked) {
    indexSpans = document.querySelectorAll('.indexSpan');
    if (checked) {
        indexSpans.forEach(indexSpan => {
            indexSpan.contentEditable = true;
            indexSpan.style['backgroundColor'] = "white";
        });
    } else {
        indexSpans.forEach(indexSpan => {
            indexSpan.contentEditable = false;
            indexSpan.style['backgroundColor'] = "transparent";
        });
    }
}