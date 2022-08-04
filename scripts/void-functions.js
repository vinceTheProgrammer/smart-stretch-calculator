function calcNode(index, cStart, cEnd) {
    let start = parseInt(document.getElementById("start-" + index).value);
    let end = parseInt(document.getElementById("end-" + index).value);
    let length;
    let offset;
    offset = calcOffset(cStart, cEnd, start, end);
    length = calcLength(cStart, cEnd, end, offset);
    if (isRoundingEnabled()){
        offset = Math.round(offset);
        length = Math.round(length);
    }
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

function updateCanvasArgumentless(calledFromCalc) {
    if (isVisualizerEnabled() == false) return;
    let cStart = parseInt(document.getElementById("control-start").value);
    let cEnd = parseInt(document.getElementById("control-end").value);
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let index = canvas.parentElement.id.split('-')[1];
    let start = parseInt(document.getElementById("start-" + index).value);
    let end = parseInt(document.getElementById("end-" + index).value);
    updateCanvas(cStart, cEnd, start, end, canvas, ctx);
    if (calledFromCalc) return;
    calc();
}

function updateCanvas(cStart, cEnd, start, end, canvas, ctx) {

    canvas.width = document.getElementById('node-div-container').offsetWidth;

    let xAxisY = (canvas.height / 6) * 5;
    let tickBottomY = xAxisY + 10;
    let tickTopY = xAxisY - 10;
    let offset = calcOffset(cStart, cEnd, start, end);
    let length = calcLength(cStart, cEnd, end, offset);


    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw root line
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#00FF0055';
    ctx.stroke();

    // // draw x axis
    // ctx.beginPath();
    // ctx.moveTo(0, xAxisY);
    // ctx.lineTo(canvas.width, xAxisY);
    // ctx.lineWidth = 2;
    // ctx.strokeStyle = '#000000';
    // ctx.stroke();

    // get control node length to node length ratio
    let cNodeLength = Math.abs(cEnd - cStart);
    let nodeLength = Math.abs(end - start);
    let ratio = cNodeLength / nodeLength;

    // get max/min domain
    let max = Math.max(cStart, cEnd, start, end, (start - length), (cStart +offset));
    let min = Math.min(cStart, cEnd, start, end);

    // get reasonable increment for greater side
    let intervals = 7;
    intervals += 1;
    let fullLength = Math.abs(max) * 2 + 100;
    let axisToCanvasRatio = fullLength / canvas.width;
    let increment = fullLength / intervals;
    let canvasIncrement = (increment / axisToCanvasRatio);

    // // draw tick marks at canvas increments
    // for (i=1;i<intervals;i++) {
    //     let origin = fullLength / 2;
    //     let canvasX = canvasIncrement * i;
    //     let currentX = canvasX * axisToCanvasRatio;
    //     currentX = (Math.round((currentX) / 10) * 10)
    //     if (currentX < origin) {
    //         currentX = (origin - currentX) * -1
    //     } else {
    //         currentX = currentX - origin;
    //     }

    //     if (canvasX > canvas.width / 2 - 10 && canvasX < canvas.width / 2 + 10) continue;
    //     ctx.beginPath();
    //     ctx.moveTo(canvasX, tickBottomY);
    //     ctx.lineTo(canvasX, tickTopY);
    //     ctx.lineWidth = 2;
    //     ctx.strokeStyle = '#000000';
    //     ctx.stroke();

    //     ctx.font = "10px Arial";
    //     ctx.fillStyle = "black";
    //     ctx.textAlign = "center";
    //     ctx.fillText(Math.round(currentX), canvasX, tickBottomY + 10); 
    // }

    let cNodeY = (canvas.height / 6) * 1;
    let cNodeTextY = (canvas.height / 6) * 0.5;
    let offsetY = (canvas.height / 6) * 3;
    let offsetTextY = (canvas.height / 6) * 2.5;
    let nodeY = (canvas.height / 6) * 5;
    let nodeTextY = (canvas.height / 6) * 4.5;


    function toCanvasSpace(x) {
        return x / axisToCanvasRatio + canvas.width / 2
    }

    // draw control node end
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, cNodeY);
    ctx.lineTo(toCanvasSpace(cEnd), cNodeY);
    ctx.lineWidth = 20;
    ctx.strokeStyle = '#FF000080';
    ctx.stroke();
    ctx.font = "10px Arial";
    ctx.fillStyle = "#FF000080";
    ctx.textAlign = "center";
    ctx.fillText(Math.round(cEnd), toCanvasSpace(cEnd), cNodeTextY);

    // draw control node start
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, cNodeY);
    ctx.lineTo(toCanvasSpace(cStart), cNodeY);
    ctx.lineWidth = 20;
    ctx.strokeStyle = '#FF0000';
    ctx.stroke();
    ctx.font = "10px Arial";
    ctx.fillStyle = "#FF0000";
    ctx.textAlign = "center";
    ctx.fillText(cStart, toCanvasSpace(cStart), cNodeTextY);


    // ctx.font = "10px Arial";
    // ctx.fillStyle = "#FFFFFF";
    // ctx.textAlign = "center";
    // ctx.fillText(Math.round(cStart), toCanvasSpace(cStart / 2), cNodeY + 3);

    // ctx.font = "10px Arial";
    // ctx.fillStyle = "#000000EE";
    // ctx.textAlign = "center";
    // ctx.fillText(Math.round(cEnd), toCanvasSpace(cEnd / 2), cNodeY + 3);

    // draw offset
    ctx.beginPath();
    ctx.moveTo(toCanvasSpace(cStart), offsetY);
    ctx.lineTo(toCanvasSpace(cStart + offset), offsetY);
    ctx.lineWidth = 15;
    ctx.strokeStyle = '#000000';
    ctx.stroke();
    ctx.font = "10px Arial";
    if (Math.round(offset) < 1 && Math.round(offset) > -1)
        ctx.fillStyle = "black";
    else
        ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(Math.round(offset), toCanvasSpace((offset + cStart + cStart) / 2), offsetY + 3); 
    
    // draw node end
    ctx.beginPath();
    ctx.moveTo(toCanvasSpace(start - length), nodeY);
    ctx.lineTo(toCanvasSpace(end), nodeY);
    ctx.lineWidth = 20;
    ctx.strokeStyle = '#0000FF80';
    ctx.stroke();
    ctx.font = "10px Arial";
    ctx.fillStyle = "#0000FF80";
    ctx.textAlign = "center";
    ctx.fillText(Math.round(end), toCanvasSpace(end), nodeTextY);

    // draw node start
    ctx.beginPath();
    ctx.moveTo(toCanvasSpace(start), nodeY);
    ctx.lineTo(toCanvasSpace(start - length), nodeY);
    ctx.lineWidth = 20;
    ctx.strokeStyle = '#0000FF';
    ctx.stroke();
    ctx.font = "10px Arial";
    ctx.fillStyle = "#0000FF";
    ctx.textAlign = "center";
    ctx.fillText(Math.round(start), toCanvasSpace(start), nodeTextY);
    ctx.font = "10px Arial";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    ctx.fillText(Math.round(start - length), toCanvasSpace(start - length), nodeTextY);

    ctx.font = "10px Arial";
    ctx.fillStyle = "#000000EE";
    ctx.textAlign = "center";
    ctx.fillText(Math.round(Math.abs((start - length) - end)), toCanvasSpace(((start - length) + end) /  2), nodeY + 3);

    ctx.font = "10px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "center";
    ctx.fillText(Math.round(Math.abs(start - (start - length))), toCanvasSpace(((start - length) + start) / 2), nodeY + 3);

}

function moveCanvas(index) {

    let oldCanvas = document.getElementById('canvas') ?? false;
    if (oldCanvas != false) oldCanvas.remove();

    if (isVisualizerEnabled() == false) return;

    let canvas = document.createElement('canvas');
    canvas.id = 'canvas';

    insertAfter(canvas, document.getElementById('deleteNode-' + index));

    updateCanvasArgumentless();
}