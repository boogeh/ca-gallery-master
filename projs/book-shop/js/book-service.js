var gBooks;
var gCurrPageNo = 0;
var PAGE_SIZE = 4;


function createBooks() {
    gBooks = [
        createBook('Puki goes to school', 75),
        createBook('JS for toddles', 123),
        createBook('The complete guide to guides', 874),
        createBook('CSS3 for blind people', 54),
        createBook('Puki goes to school', 75),
        createBook('JS for toddles', 123),
        createBook('The complete guide to guides', 874),
        createBook('CSS3 for blind people', 54),
        createBook('Puki goes to school', 75),
        createBook('JS for toddles', 123),
        createBook('The complete guide to guides', 874),
        createBook('CSS3 for blind people', 54),
        createBook('Puki goes to school', 75),
        createBook('JS for toddles', 123),
        createBook('The complete guide to guides', 874),
        createBook('CSS3 for blind people', 54),
        createBook('Puki goes to school', 75),
        createBook('JS for toddles', 123),
        createBook('The complete guide to guides', 874),
        createBook('CSS3 for blind people', 54),
    ]
}

function getBooks() {
    var fromBookIdx = gCurrPageNo * PAGE_SIZE;
    return gBooks.slice(fromBookIdx, fromBookIdx + PAGE_SIZE)
}

function getBookById(bookId) {
    return gBooks.find(function (book) {
        return book.id === bookId
    })
}

function getBookIdx(bookId) {
    return gBooks.findIndex(function (book) {
        return book.id === bookId
    })
}

function createBook(name, price) {
    return {
        id: makeId(),
        name: name,
        price: price,
        imgUrl: 'img/book.png',
        rating: 1
    }
}

function updateBook(bookId, newPrice) {
    var book = getBookById(bookId)
    book.price = newPrice

}

function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return book.id === bookId
    })
    gBooks.splice(bookIdx, 1)
}

function addBook(name, price) {
    gBooks.push(createBook(name, price))
}

function ratingUp(bookId) {
    var book = getBookById(bookId)
    if (book.rating >= 10) {
        return
    } else {
        book.rating++
    }
}

function ratingDown(bookId) {
    var book = getBookById(bookId)
    if (book.rating <= 1) {
        return
    } else {
        book.rating--
    }
    
    
}

function sortByPrice(direction) {
    sortByKey(gBooks, 'price', direction)
}

function sortByName(direction) {
    sortByKey(gBooks, 'name', direction)
}

function goNextPage() {
    var lastBookIdx = getBooks().length - 1
    if (getBooks()[lastBookIdx] === gBooks[gBooks.length - 1]) return
    gCurrPageNo++;
}

function goLastPage() {
    if (gCurrPageNo === 0) return
    gCurrPageNo--
}