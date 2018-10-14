'use strict';
var SIZE = 10;
var WALL = '#';
var FOOD = '.';
var EMPTY = ' ';
var SUPERFOOD = '@';
var CHERRY = '$';

var gBoard;
var gState = {
  score: 0,
  isGameDone: false
};
var gFoodCount = 0;
var gIntervalCherry;

function init() {
  gFoodCount = 0;
  gBoard = buildBoard();

  createPacman(gBoard);
  createGhosts(gBoard);
  printMat(gBoard, '.board-container');
  console.table(gBoard);
  gState.isGameDone = false;
  // document.querySelector('.game-over').style.display = 'none';
  // document.querySelector('.winner').style.display = 'none';
  moveGhosts();
  if (gIntervalCherry) clearInterval(gIntervalCherry)
  gIntervalCherry = setInterval(addSuperFood, 15000)
}

function buildBoard() {
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;

      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j == 3 && i > 4 && i < SIZE - 2)) {

        board[i][j] = WALL;
      }
      if (i === 1 && j === 1) board[i][j] = SUPERFOOD
      if (i === 1 && j === SIZE - 2) board[i][j] = SUPERFOOD
      if (i === SIZE - 2 && j === 1) board[i][j] = SUPERFOOD
      if (i === SIZE - 2 && j === SIZE - 2) board[i][j] = SUPERFOOD
      if (board[i][j] === FOOD) gFoodCount++ // count food to know winning condition
    }
  }
  return board;
}

// This function is called from both pacman and ghost to check engage
function checkEngage(cell, opponent) {
  if (cell === opponent) {
    // TODO: basic support for eating power-ball (which is not in the game yet)
    if (gPacman.isSuper) {
      console.log('GULP')
    } else {
      clearInterval(gIntervalGhosts);
      gState.isGameDone = true;
      // TODO: GameOver popup with a play again button
      // alert('Game Over!');
      console.log('Game Over!');
      document.querySelector('.game-over').style.display = 'block';
      return true;
    }
  }
  return false;
}


// this function updates both the model and the dom for the score
function updateScore(value) {
  gState.score += value;
  document.querySelector('header > h3 > span').innerText = gState.score;
}

function checkWinner(board) {
  if (gFoodCount === 1) {
    document.querySelector('.winner').style.display = 'block';
    gState.isGameDone = true;
  }
}

function addSuperFood() {
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      var randI = getRandomIntInclusive(1,gBoard.length - 1)
      var randJ = getRandomIntInclusive(1,gBoard.length - 1)
      if (gBoard[randI][randJ] === EMPTY) {
        gBoard[randI][randJ] = CHERRY;
        renderCell({i: randI, j: randJ}, CHERRY)
        console.log('adding cherry at: ' + randI + randJ)
        return;
      }
    }
  }
}


