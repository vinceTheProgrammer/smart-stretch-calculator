function calcLength(cStart, cEnd, end, offset) {
    return -(cStart*(cEnd/cStart)+offset-end)/(cEnd/cStart)
}
// Calculates offset
function calcOffset(cStart, cEnd, start, end) {
    return -(((end-start)/((cEnd/cStart)-1))-start)
}