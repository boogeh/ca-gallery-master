var gPacman;
var PACMAN = 'ᗧ';

function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5
    },
    isSuper: false
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(eventKeyboard) {
  // console.log('eventKeyboard:', eventKeyboard);

  if (gState.isGameDone) return;

  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j
  };

  switch (eventKeyboard.code) {

    case 'ArrowUp':
      //console.log('Arrow Up!');
      nextLocation.i--;
      PACMAN = 'ᗢ'
      break;
    case 'ArrowDown':
      //console.log('Arrow Down!');
      nextLocation.i++;
      PACMAN = 'ᗣ'
      break;
    case 'ArrowLeft':
      //console.log('Arrow Left!');
      nextLocation.j--;
      PACMAN = 'ᗤ'
      break;
    case 'ArrowRight':
      //console.log('Arrow Right!');
      nextLocation.j++;
      PACMAN = 'ᗧ'
      break;

  }

  var nextCell = gBoard[nextLocation.i][nextLocation.j];
  // console.log('Heading: row:', newLocation.i , ' col: ', newLocation.j );
  // console.log('Whats there:', gBoard[newLocation.i][newLocation.j]);

  // hitting a wall, not moving anywhere
  if (nextCell === WALL) return;

  // hitting FOOD
  if (nextCell === FOOD) {
    updateScore(1);
    gFoodCount--
    checkWinner(gBoard);
  }

  if (nextCell === SUPERFOOD) {
    superPacMan();
    for (var i = 0; i < gGhosts.length; i++) {
      renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]));
    }
  }

  if (nextCell === CHERRY) {
    updateScore(5)
  }

  if (nextCell === GHOST && gPacman.isSuper) {
    var deadGhostIdx = gGhosts.indexOf(getSpecificGhost(nextLocation))
    gGhosts.splice(deadGhostIdx, 1)
    setTimeout(createGhost, 5000, gBoard)
  }

  // update the model to reflect movement
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

  // render updated model to the DOM
  renderCell(gPacman.location, EMPTY);

  // Update the pacman MODEL to new location  
  gPacman.location = nextLocation;
  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;


  // render updated model to the DOM
  renderCell(gPacman.location, PACMAN);

  var isGameOver = checkEngage(nextCell, GHOST);
  if (isGameOver) return;
}

function superPacMan() {
  gPacman.isSuper = true;
  setTimeout(function () {
    gPacman.isSuper = false;
    for (var i = 0; i < gGhosts.length; i++) {
      renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]));
      // gGhosts[i].isDead = false;
    }
    moveGhosts();
  }, 5000)
}

function eatGhost() {

}