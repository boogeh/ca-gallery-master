var gArray = []
var gCurrNum = 1;
var gstartTime;
var gSetInterval;
var gTotalBoard = +prompt('Difficulty? (16 / 25 / 36')

init();

function init() {
    generateGArray();
    renderBoard();
    clearInterval(gSetInterval)
    gCurrNum = 1;
    gSetInterval = null;
    document.querySelector('.next-num').innerText = 'Next number: 1'
    document.querySelector('.stopwatch').innerText = '0.000'

}


function renderBoard() {
    var shflArr = shuffle(gArray) // shuffle the gArray inside the generateGArray function
    var elBoard = document.querySelector('.board')
    var strHTML = ''
    for (var i = 0; i < Math.sqrt(gTotalBoard); i++) { // math sqrt value in var somewhere else
        strHTML += '<tr>';
        for (var j = 0; j < Math.sqrt(gTotalBoard); j++) {
            var num = popRandomNumber(shflArr)
            strHTML += `<td class="${num}" onclick="cellClicked(this, ${num})">${num}</td>`
        }
        strHTML += '</tr>';
    }
    elBoard.innerHTML = strHTML;
}


function generateGArray() {
    for (var i = 0; i < gTotalBoard; i++) {
        gArray.push(i + 1)
    }
}

function cellClicked(elNum, num) {
    if (gCurrNum === num && gCurrNum <= gTotalBoard) {
        elNum.style.backgroundColor = 'green'
        ++gCurrNum
        document.querySelector('.next-num').innerText = 'Next number: ' + gCurrNum
    }
    if (!gSetInterval) {
        gStartTime = Date.now();
        gSetInterval = setInterval(stopwatch, 1); 
    }
    if (gCurrNum === (gTotalBoard + 1)) {
        clearInterval(gSetInterval)
        document.querySelector('.next-num').style.display = 'none';
    }
}

function popRandomNumber(array) {
    var num = array.pop()
    return num;
}

function shuffle(array) {
    var tmp, current, top = array.length;
    if (top) while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
    }
    return array;
}

function stopwatch() {
    var stopwatch = (Date.now() - gStartTime) / 1000
    var elStopwatch = document.querySelector('.stopwatch')
    elStopwatch.innerText = stopwatch
}