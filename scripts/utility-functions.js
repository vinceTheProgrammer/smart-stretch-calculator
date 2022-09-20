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

function relativeCoords(coord, cStart, cEnd) {
    let origin = cStart;

    //console.log(coord);

    const matchPlus = coord.match(/\+/gm) !== null;
    const matchMinus = coord.match(/\-/gm) !== null;
    const matchE = coord.match(/e/gmi) !== null;

    //console.log('+', coord.match(/\+/gm));
    //console.log('-', coord.match(/\-/gm));
    //console.log('E', coord.match(/e/gm));

    console.log(matchE);
    console.log("first", origin);
    if (matchE) origin = cEnd;
    console.log("second", origin);

    if (matchPlus) {
        coord = coord.replace(/[^0-9]/gm,'');
        coord = origin + parseInt(coord);
    } else if (matchMinus) {
        coord = coord.replace(/[^0-9]/gm,'');
        coord = origin - parseInt(coord);
    } else {
        coord = coord.replace(/[^0-9]/gm,'');
        coord = parseInt(coord);
    }
    //console.log(coord);
    return coord;
}