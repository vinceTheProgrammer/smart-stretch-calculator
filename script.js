document.getElementById("main-form").onsubmit = function () {
    let cStart = parseInt(document.getElementById("control-start").value);
    let cEnd = parseInt(document.getElementById("control-end").value);

    let start = parseInt(document.getElementById("control-start").value);
    let end = parseInt(document.getElementById("control-end").value);

    let length;
    let offset;

    offset = calcOffset(cStart, cEnd, start, end);
    length = calcLength(cStart, cEnd, offset);

    document.getElementById("length").textContent = length;
    document.getElementById("offset").textContent = offset;

    return false;
}

function calcLength(cStart, cEnd, offset) {
    // -($B$3*($D$3/$B$3)+D10-C10)/($D$3/$B$3)
    return -(cStart*(cEnd/cStart)+offset-End)/(cEnd/cStart)
}

function calcOffset(cStart, cEnd, start, end) {
    // -(((C8-B8)/(($D$3/$B$3)-1))-B8)
    return -(((end-start)/((cEnd/cStart)-1))-start)
}
