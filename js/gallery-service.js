
var gIdx = 1
var gProjects;


function createProjects() {
 gProjects = [createProject('PacMan', 'PacMan in a 2d array', 'The first really lousy pacman in the world!', 'url', ['game', 'pacman'])]
}


function createProject(name, title, desc, url, labels) {
    return {
        id: gIdx++,
        name: name,
        title: title,
        desc: desc,
        url: url,
        publishedAt: Date.now(),
        labels: labels
    }

}