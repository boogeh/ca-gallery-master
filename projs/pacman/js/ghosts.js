var GHOST = '&#9781;';

var gIntervalGhosts;
var gGhosts;

function createGhost(board) {

    var ghost = {
        color: getRandomColor(),
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        isDead: false
    };


    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST;
}


function createGhosts(board) {
    gGhosts = [];
    var ghostCount = 3;
    for (var i = 0; i < ghostCount; i++) {
        createGhost(board);

    }
    gIntervalGhosts = setInterval(moveGhosts, 1000);
}

function moveGhosts() {
    // TODO, if there are less than 3 ghosts, create one
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        if (gGhosts[i].isDead) continue;
            var nextLocation = {
                i: ghost.location.i + getRandomIntInclusive(-1, 1),
                j: ghost.location.j + getRandomIntInclusive(-1, 1)
            }
            // console.log('nextLocation', nextLocation);

            if (gBoard[nextLocation.i][nextLocation.j] === WALL) return;
            if (gBoard[nextLocation.i][nextLocation.j] === GHOST) return;

            var isGameOver = checkEngage(gBoard[nextLocation.i][nextLocation.j], PACMAN);
            if (isGameOver) {
            }

            // set back what we stepped on
            gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
            renderCell(ghost.location, ghost.currCellContent);

            // move the ghost
            ghost.location = nextLocation;

            // keep the contnet of the cell we are going to
            ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j];

            // move the ghost model and update dom
            gBoard[ghost.location.i][ghost.location.j] = GHOST;
            renderCell(ghost.location, getGhostHTML(ghost));
    }
}


function getGhostHTML(ghost) {
    if (gPacman.isSuper) {
        return `<span style="color:red;">${GHOST}</span>`
    } else {
        return `<span style="color:${ghost.color};">${GHOST}</span>`
    }
}

function getSpecificGhost(location) {
    for (var c = 0; c < gGhosts.length; c++) {
        if (location.i === gGhosts[c].location.i && location.j === gGhosts[c].location.j) return gGhosts[c]
    }
}

