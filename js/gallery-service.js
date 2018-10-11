
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
            'url',
            ['game', 'pacman'],
            'https://via.placeholder.com/400x300'),
        createProject(
            'Minesweeper',
            'Minesweeper homemade!',
            'My first sprint test. Made a minesweeper!',
            'https://boogeh.github.io/minesweeper/',
            ['game', 'minesweeper'],
            '/img/portfolio/minesweeper.jpg')

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