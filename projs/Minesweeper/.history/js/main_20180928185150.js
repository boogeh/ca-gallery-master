// CR: no 'use strict'?
// CR: Very good project.
// CR: Sometimes you use ; at end of line and some other times you don't.

var gState;
var gLevel;
var gBoard;
// CR: Bad naming. isFirstClick should be init as true.
// CR: But in the code you use it as a notIsFirstClick.
// CR: Also, this is unnecessary variable. You can use one of the keys on gState instead.  
var isFirstClick = false;
var gIntervalTimer;

const MINE = '<img src="img/bomb.png">';
const UNCOVERED = '<img src="img/facingDown.png">';
const FLAG = '<img src="img/flagged.png">';
const EMOJIS = ['😵', '😎', '😊']
// CR: NUMINGS? what's wrong with 'NUMS'?
const NUMIMGS = [
    // CR: You never use '0.png' in the game.
    '<img src="img/0.png">',
    '<img src="img/1.png">',
    '<img src="img/2.png">',
    '<img src="img/3.png">',
    '<img src="img/4.png">',
    '<img src="img/5.png">',
    '<img src="img/6.png">',
    '<img src="img/7.png">',
    '<img src="img/8.png">',
]

function initGame() {
    gState = setGState();
    if (localStorage.getItem('lastDifficultySize') === null) {
        gLevel = setGLevel(6, 5);
    } else {
        gLevel = setGLevel(+localStorage.getItem('lastDifficultySize'), +localStorage.getItem('lastDifficultyMines'));
    }
    gBoard = buildBoard();
    isFirstClick = false;
    renderBoard(gBoard);
    clearInterval(gIntervalTimer);
    document.querySelector('.winner').style.display = 'none';
    document.querySelector('.loser').style.display = 'none';
    document.querySelector('.timer span').innerText = '0'
    document.querySelector('.best-time span').innerText = localStorage.getItem('recordTime')
    document.querySelector('.smiley').innerText = EMOJIS[2]
    showBestTime();

}


function setGState() {
    return {
        isGameOn: true,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    }
}

function setGLevel(size, mines) {
    return {
        SIZE: size,
        MINES: mines
    };

}

function setDifficulty(difficulty) {
    // debugger;
    switch (difficulty) {
        case 'easy':
            gLevel = setGLevel(4, 2);
            console.log('easy')
            localStorage.setItem('lastDifficultySize', 4)
            localStorage.setItem('lastDifficultyMines', 0)
            break;
        case 'medium':
            gLevel = setGLevel(6, 5);
            console.log('medium')
            localStorage.setItem('lastDifficultySize', 6)
            localStorage.setItem('lastDifficultyMines', 5)
            break;
        case 'expert':
            gLevel = setGLevel(8, 15);
            console.log('expert')
            localStorage.setItem('lastDifficultySize', 8)
            localStorage.setItem('lastDifficultyMines', 15)
            break;
        default:
            break;
    }

    initGame();
}

function buildBoard() {
    var board = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        board.push([])
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                // CR: What is the difference between 'isShown' and 'isAlreadyChecked'?
                // CR: The code works when you replace all 'isAlreadyChecked' > 'isShown'.
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
                isAlreadyChecked: false
            }
        }
    }
    return board;
}

function renderBoard(board) {
    var elBoard = document.querySelector('.board')
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n';
        for (var j = 0; j < board[0].length; j++) {
            var currValue = UNCOVERED
            var cellClass = getClassName({ i: i, j: j })
            strHTML += `\t<td class="cell ${cellClass}" onmousedown="cellClicked(this, event, ${i}, ${j})">${currValue}</td>\n`
        }
        strHTML += '</tr>\n'
    }
    // CR: Remember to comment out those console logs.
    console.log('strHTML is: ')
    console.log(strHTML)
    elBoard.innerHTML = strHTML;
}

function placeMines(cellI, cellJ) {
    for (var i = 0; i < gLevel.MINES; i++) {
        var randI = getRandomIntInclusive(0, gLevel.SIZE - 1)
        var randJ = getRandomIntInclusive(0, gLevel.SIZE - 1)
        // CR: I liked the code that you can not first click a mine.
        // CR: But you have better ways to do so without a while loop.
        // CR: You can use an array of all the table's {i, j} coords and splice out the one after mine placed.
        while (gBoard[cellI][cellJ] === gBoard[randI][randJ] || gBoard[randI][randJ].isMine) {
            randI = getRandomIntInclusive(0, gLevel.SIZE - 1)
            randJ = getRandomIntInclusive(0, gLevel.SIZE - 1)
        }
        gBoard[randI][randJ].isMine = true;
        console.log('mine place at i: ' + randI + ' j: ' + randJ)
    }
}

function getClassName(location) {
    var cellClass = 'cell-' + location.i + '-' + location.j;
    return cellClass;
}

function cellClicked(elCell, ev, i, j) {
    // debugger;
    var currCell = gBoard[i][j]
    // CR: NOT-isFirstClick and then run func firstClick()? 
    // CR: Bad naming.
    if (!isFirstClick) {
        firstClick(i, j);
        isFirstClick = true;
        console.log('firstclick i, j: ', i, j)
    }
    if (gState.isGameOn) {
        if (ev.button === 0) {
            if (currCell.isMine) {
                // CR: You wrote this line twice, here and in the else statement.
                // CR: You could move it before the currCell.isMine.
                if (currCell.isMarked) return;
                elCell.innerHTML = MINE;
                elCell.style.backgroundColor = 'red'
                gState.isGameOn = false;
                gameOver();

            } else {
                if (currCell.isMarked) return;
                revealCell(i, j)
                if (!currCell.minesAroundCount) expandShown(i, j)
                checkWin();
            }
        }
        if (ev.button === 2) {
            cellMarked(elCell, i, j)
            console.log(gState)
            checkWin();
        }
    }
}

function cellMarked(elCell, i, j) {
    if (gBoard[i][j].isShown) { return console.log('already uncovered') }

    if (gBoard[i][j].isMarked) {
        gBoard[i][j].isMarked = false;
        elCell.innerHTML = UNCOVERED
        gState.markedCount--
    } else {
        gBoard[i][j].isMarked = true;
        elCell.innerHTML = FLAG;
        gState.markedCount++
    }
}


function countNegs(board, cellI, cellJ) {
    // debugger;
    var negsCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= board[i].length) continue;
            if (board[i][j].isMine) negsCount++
        }
    }
    return negsCount;
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            board[i][j].minesAroundCount = countNegs(board, i, j)
        }
    }
}

// CR: You console log 'total nums left to mark' but you don't do anything with it.
// CR: it's so easy to use it if (totalNumsLeft === mines) so it's a win
// CR: without marking them by the player. 
// CR: Better to write it (if not.....) return false and then all the logic without else statement.
function checkWin() {
    var totalNumCells = gLevel.SIZE * gLevel.SIZE - gLevel.MINES
    console.log('total nums left to mark: ', totalNumCells - gState.shownCount)
    if (gState.shownCount === totalNumCells && gState.markedCount === gLevel.MINES) {
        gState.isGameOn = false;
        document.querySelector('.winner').style.display = 'block';
        document.querySelector('.smiley').innerText = EMOJIS[1]
        clearInterval(gIntervalTimer)
        setRecordTime();
        showBestTime();
    } else {
        return false;
    }
}

function revealCell(i, j) {
    var cell = gBoard[i][j]
    var elCell = document.querySelector(`.cell-${i}-${j}`)
    if (!cell.isShown) gState.shownCount++
    if (cell.isMarked) return;
    cell.isShown = true;
    elCell.innerHTML = NUMIMGS[cell.minesAroundCount]
}

function gameOver() {
    showAllMines()
    gState.isGameOn = false;
    document.querySelector('.loser').style.display = 'block';
    document.querySelector('.smiley').innerText = EMOJIS[0]
    clearInterval(gIntervalTimer)
}

function showAllMines() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var elCurrCell = document.querySelector(`.cell-${i}-${j}`)
            if (gBoard[i][j].isMine) {
                elCurrCell.innerHTML = MINE;
            }
        }
    }
}

function expandShown(cellI, cellJ) {
    // debugger;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i >= 0 && i < gBoard.length) {
            for (var j = cellJ - 1; j <= cellJ + 1; j++) {
                if ((i !== cellI || j !== cellJ) && j >= 0 && j < gBoard.length) {
                    if (!gBoard[i][j].isAlreadyChecked) {
                        if (gBoard[i][j].isMarked) {
                            gBoard[i][j].isAlreadyChecked = true;
                        }
                        else {
                            revealCell(i, j)
                            gBoard[i][j].isAlreadyChecked = true;
                        }
                        if (gBoard[i][j].minesAroundCount === 0) {
                            expandShown(i, j);
                        }
                    }
                }
            }
        }
    }
}

function firstClick(i, j) {
    placeMines(i, j);
    setMinesNegsCount(gBoard);
    gIntervalTimer = setInterval(timer, 1000)
    console.log('place mines i, j: ', i, j)
}

function timer() {
    gState.secsPassed++
    document.querySelector('.timer span').innerText = gState.secsPassed
}

function setRecordTime() {
    // debugger;
    var bestTime = gState.secsPassed
    if (gLevel.SIZE === 4) {
        if (bestTime < +localStorage.getItem('recordTimeEasy') || !+localStorage.getItem('recordTimeEasy')) {
            localStorage.setItem('recordTimeEasy', bestTime)
        }
    } else if (gLevel.SIZE === 6) {
        if (bestTime < +localStorage.getItem('recordTimeMedium') || !+localStorage.getItem('recordTimeMedium')) {
            localStorage.setItem('recordTimeMedium', bestTime)
        }
    } else if (gLevel.SIZE === 8) {
        if (bestTime < +localStorage.getItem('recordTimeExpert') || !+localStorage.getItem('recordTimeExpert')) {
            localStorage.setItem('recordTimeExpert', bestTime)
        }
    }
}

// CR: You dont need to change the entire innerText.
// CR: The 'Record time on' / 'No best score for' are constants,
// CR: then use span to change the level,
// CR: the 'difficulty is' / 'difficulty yet' are also constants
// CR: and use a 2nd span to change the time id needed. 
function showBestTime() {
    //    debugger;
    var elBestTime = document.querySelector('.best-time span')
    if (gLevel.SIZE === 4) {
        if (localStorage.getItem('recordTimeEasy') !== null) {
            elBestTime.innerText = 'Record time on easy is: ' + localStorage.getItem('recordTimeEasy')
        } else {
            elBestTime.innerText = 'No best score for easy difficulty yet!'
        }
    } else if (gLevel.SIZE === 6) {
        if (localStorage.getItem('recordTimeMedium') !== null) {
            elBestTime.innerText = 'Record time on medium is: ' + localStorage.getItem('recordTimeMedium')
        } else {
            elBestTime.innerText = 'No best score for medium difficulty yet!'
        }
    } else if (gLevel.SIZE === 8) {
        if (localStorage.getItem('recordTimeExpert') !== null) {
            elBestTime.innerText = 'Record time on expert is: ' + localStorage.getItem('recordTimeExpert')
        } else {
            elBestTime.innerText = 'No best score for expert difficulty yet!'
        }
    }
}