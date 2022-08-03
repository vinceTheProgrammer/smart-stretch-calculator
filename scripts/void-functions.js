function calcNode(index, cStart, cEnd) {
    let start = parseInt(document.getElementById("start-" + index).value);
    let end = parseInt(document.getElementById("end-" + index).value);
    let length;
    let offset;
    offset = calcOffset(cStart, cEnd, start, end);
    length = calcLength(cStart, cEnd, end, offset);
    document.getElementById("index-" + index).innerText = document.getElementById('indexSpan-' + index).innerText;
    document.getElementById("length-" + index).innerText = length;
    document.getElementById("offset-" + index).innerText = offset;
}

function updateTableIndexes() {
    tData = document.querySelectorAll('td');
    tData.forEach(td => {
        let name = td.id.split('-')[0];
        let index = td.id.split('-')[1]
        if (name == 'index') {
            indexSpanText = document.getElementById('indexSpan-' + index).innerText;
            if (indexSpanText == index || indexSpanText == "") {
                td.innerText = index;
            } else {
                td.innerText = indexSpanText;
            }
        }
    });
}