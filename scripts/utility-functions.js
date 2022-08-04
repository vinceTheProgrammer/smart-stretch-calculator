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

function isVisualizerEnabled() {
    return document.getElementById('visualizer-checkbox').checked;
}

function isRoundingEnabled() {
    return document.getElementById('round-numbers-checkbox').checked;
}