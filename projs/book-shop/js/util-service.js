function makeId() {
    var length = 6;
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}

function getFromStorage(key) {
    var val = localStorage.getItem(key);
    return JSON.parse(val)
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function getTime() {
    var time = new Date()
    return time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
}

function sortByKey(elements, key, direction) {
    return elements.sort(function(a, b) {
        var x = a[key];
        var y = b[key];
        return ((x < y) ? -1 * direction : ((x > y) ? 1 * direction : 0));
    });
}

function timeCreatedToTimeFormat(createdAt) {
    var options = {day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}
    var toTime = new Date(createdAt).toLocaleDateString('en-US', options)
    
    return toTime;
}

