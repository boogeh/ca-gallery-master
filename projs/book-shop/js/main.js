
function init() {
    createBooks()
    renderBooks()
}

function renderBooks() {
    var books = getBooks()
    var strHtmls = books.map(function (book) {
        return `
        <tr>
          <th class="medium ids" scope="row">${book.id}</th>
          <td>${book.name}</td>
          <td>${book.price}<span>${gCurrency[gCurrLang]}</span></td>
          <td>${book.rating}</td>
          <td>
          <button type="button" data-trans="intable-btn-delete" class="btn btn-outline-primary delete-btn"
          onclick="onDeleteBook('${book.id}')">Delete</button>
          
          <button type="button" data-trans="intable-btn-add" class="btn btn-outline-secondary add-book-btn"
          onclick="readAndAddNewBook()">Add Book</button>

          <button type="button" data-trans="intable-btn-update" class="btn btn-outline-success"
          onclick="readAndUpdateBook('${book.id}')">Update Price</button>
          
          <button type="button" class="btn btn-outline-light"
          onclick="onReadBook('${book.id}')"
          data-toggle="collapse" data-target="#collapseExample" data-trans="intable-btn-read" 
          aria-expanded="false" aria-controls="collapseExample">Read</button></td>

        </tr>
        `
    })
    $('tbody').html(strHtmls.join(''))
    doTrans()
}

function onDeleteBook(bookId) {
    deleteBook(bookId)
    renderBooks()
}

function readAndAddNewBook() {
    var name = prompt(getTrans('name'))
    var price = +prompt(getTrans('price'))
    addBook(name, price)
    renderBooks()
}

function readAndUpdateBook(bookId) {
    var newPrice = +prompt(getTrans('price'))
    updateBook(bookId, newPrice)
    renderBooks()
}

function onReadBook(bookId) {
    var $bookCollapse = $('.book-collapse')
    var book = getBookById(bookId)
    $bookCollapse.html(`<img src="${book.imgUrl}"/>
                        <h4>${book.name}<h4>
                        <h6 class="lead"><span data-trans="incollapse-price">${getTrans('incollapse-price')}</span>${gCurrency[gCurrLang]}${book.price}</h6>
                        <div class="rate-control btn-toolbar mb-9">
                        <div class="input-group">
                          <div class="input-group-prepend">
                          <button type="button" class="btn btn-secondary" onclick="onRatingDown('${book.id}')">-</button>
                          </div>
                          <input type="text" class="rate-control-text form-control" value="${book.rating}" style="width:50px;text-align:center;"disabled>
                          <button type="button" class="btn btn-secondary" onclick="onRatingUp('${book.id}')">+</button>            
                        </div>
                      </div>`)
}

function onRatingUp(bookId) {
    ratingUp(bookId)
    onReadBook(bookId)
    renderBooks()
}

function onRatingDown(bookId) {
    ratingDown(bookId)
    onReadBook(bookId)
    renderBooks()
}

function onSortByPrice(elTh, direction) {
    elTh.onclick = function () {
        onSortByPrice(elTh, -direction)
    }
    sortByPrice(direction)
    renderBooks()
}

function onSortByName(direction) {
    sortByName()
    renderBooks()
}

function onNextPage() {
    goNextPage()
    renderBooks()
}

function onLastPage() {
    goLastPage()
    renderBooks()
}

function onSetLang(lang) {
    setLang(lang)
    renderBooks()
}