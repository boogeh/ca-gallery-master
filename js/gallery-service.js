
var gIdx = 1
var gProjects;


function getProjects() {
    return gProjects
}

function createProjects() {
    gProjects = [
        createProject(
            'PacMan',
            'PacMan in a 2d array',
            'The first really lousy pacman in the world!',
            'projs/pacman/index.html',
            ['game', 'pacman'],
            'pacman.jpg'),
        createProject(
            'Minesweeper',
            'Minesweeper homemade!',
            'My first sprint test. Made a minesweeper!',
            'projs/Minesweeper/index.html',
            ['game', 'minesweeper'],
            'minesweeper.jpg'),
        createProject(
            'Touch Nums',
            'Are you fast enough?',
            'Click the numbers by order as fast as you can!',
            'projs/touch-nums/index.html',
            ['game', 'numbers'],
            'touch-the-nums.jpg'),
        createProject(
            'Book Store',
            'First attempt at a bit of UI',
            'Welcome to the bookstore! Not a very fancy one, but you can sort both ways!',
            'projs/book-shop/index.html',
            ['page', 'table', 'book store'],
            'book-store.jpg'),
        createProject(
            'Chess',
            'Moving chess pieces',
            'Moving chess pieces while learning 2d Arrays',
            'projs/chess/index.html',
            ['page', 'chess', '2d array'],
            'chess.jpg'),
        createProject(
            'In-Picture',
            'Can you get it right?',
            'A cute game for kids and first attempt with a bit of css',
            'projs/in-picture/index.html',
            ['game', 'css'],
            'in-picture.jpg')

    ]
}


function createProject(name, title, desc, url, labels, img) {
    return {
        id: gIdx++,
        name: name,
        title: title,
        desc: desc,
        url: url,
        publishedAt: Date.now(),
        labels: labels,
        img: img
    }

}

function getProjectById(projId) {
    var proj = gProjects.find(function (project) {
        return project.id === projId
    })
    return proj
}