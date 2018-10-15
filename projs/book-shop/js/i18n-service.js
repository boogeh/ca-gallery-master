var gCurrency = {
    en: '$',
    he: '₪',
}

function formatNum(num) {
    // return new Intl.NumberFormat('he-IL',{ style: 'currency', currency: 'ILS' }).format(num);
    return new Intl.NumberFormat().format(num);
}

function formatDate(time) {

    options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat(gCurrLang,options).format(time);
}


function kmToMiles(km) {
    return km / 1.609;
}


var gTrans = {
    title: {
        en: 'Le Bookstore!',
        he: '!חנות הספרים'
    },
    'window-title': {
        en: 'Book Store',
        he: 'חנות ספרים',
    },
    'prev-btn': {
        en: 'Previous',
        he: 'הקודם',
    },
    'next-btn': {
        en: 'Next',
        he: 'הבא',
    },
    'table-title': {
        en: 'Title',
        he: 'שם הספר',
    },
    'table-price': {
        en: 'Price',
        he: 'מחיר',
    },
    'table-rating': {
        en: 'Rating',
        he: 'דירוג',
    },
    'table-actions': {
        en: 'Actions',
        he: 'פעולות',
    },
    id: {
        en: 'ID',
        he: 'מספר סידורי',
    },
    'intable-btn-delete': {
        en: 'Delete',
        he: 'מחק',
    },
    'intable-btn-read': {
        en: 'Read',
        he: 'קרא',
    },
    'intable-btn-update': {
        en: 'Update',
        he: 'עדכן',
    },
    'intable-btn-add': {
        en: 'Add',
        he: 'הוסף ספר',
    },
    'incollapse-price': {
        en: 'Price:',
        he: 'מחיר:',
    },
    name: {
       en: `What's the name of the book?`,
       he: 'מה שם הספר?',
    },
    price: {
        en: `What's the price of the book?`,
        he: 'מה מחיר הספר?'
    },
    update: {
        en: 'New price?',
        he: 'מחיר חדש?',
    },
    
}

var gCurrLang = 'en';

function doTrans() {
    var els = document.querySelectorAll('[data-trans]');

    for (var i = 0; i < els.length; i++) {
        var el = els[i];
        var transKey = el.getAttribute('data-trans');
        
        var txt = getTrans(transKey);

        // Translating is actually complex and needs a library
        if (el.nodeName === 'INPUT') {
            el.setAttribute('placeholder', txt);
        } else {
            el.innerText = txt;
        }
    }
}


function getTrans(transKey) {
    var keyTrans = gTrans[transKey];
    if (!keyTrans) return 'UNKNOWN';

    var txt = keyTrans[gCurrLang];

    // If not found - use english
    if (!txt) txt = keyTrans['en'];

    return txt;
}


function setLang(lang) {
    gCurrLang = lang;
    if (gCurrLang === 'he') {
        document.querySelector('table').classList.add('rtl')
        document.querySelector('thead').classList.add('rtl')
        document.querySelector('body').style.textAlign = 'right';
    } else {
        document.querySelector('table').classList.remove('rtl')
        document.querySelector('thead').classList.remove('rtl')
        document.querySelector('body').style.textAlign = 'left';

    }
    doTrans();
}

function getCurrency() {
    return gCurrency[gCurrLang]
}