var gQuests = createQuests()
var gCurrQuestIdx;

initGame()

function initGame() {
    gCurrQuestIdx = 0;
    renderQuest();
    document.querySelector('.winner').style.display = 'none'
}


function createQuests() {
    return [
        { id: 1, opts: ['Wow, what a cute dog!', 'Wow, what a cute rabbit!'], correctOptIdx: 1 },
        { id: 2, opts: ['The hat protects you from the sun', 'The hat protects you from the rain'], correctOptIdx: 0 },
        { id: 3, opts: ['The girl is playing Soccer', 'The girl is playing Tennis'], correctOptIdx: 1 }
    ]
}

function renderQuest() {
    var quest = gQuests[gCurrQuestIdx];
    var elImg = document.querySelector('.picture')
    var elOptions = document.querySelector('.options-container')
    // var elAnswer1 = document.querySelector('.answer1')
    // var elAnswer2 = document.querySelector('.answer2')
    elImg.innerHTML = `<img src="img/${gCurrQuestIdx + 1}.png"/>`
    var strHtml = '';
    for (var i = 0; i < quest.opts.length; i++) {
        strHtml += `
        <div class="answer answer${quest.id}" 
            onclick="checkAnswer(${i})">
            ${quest.opts[i]}
        </div>`
    }
    elOptions.innerHTML = strHtml

    // elAnswer1.innerText = gQuests[gCurrQuestIdx].opts[0]
    // elAnswer2.innerText = gQuests[gCurrQuestIdx].opts[1]

    // <div class="answer answer1" onclick="checkAnswer(0)"></div>
}

function checkAnswer(optIdx) {
    var correctAnswer = gQuests[gCurrQuestIdx].correctOptIdx
    if (correctAnswer === optIdx && gCurrQuestIdx < 2) {
        gCurrQuestIdx++
        renderQuest();
    } else if (correctAnswer === optIdx && gCurrQuestIdx === 2){
        document.querySelector('.winner').style.display = 'block'
    } else {
        changeBgColor()
    }
}

function changeBgColor() {
    document.querySelector('body').style.backgroundColor = 'orangered'
    
    setTimeout(function() {
        document.querySelector('body').style.backgroundColor = ''
    }, 250)
}