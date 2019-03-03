// declaring array for all cards
let card = document.getElementsByClassName("card");
let cards = [...card]

// declaring constant for deck of all cards in game
const deck = document.getElementById("card-deck");

// declaring variable for card moves
let moves = 0;
let counter = document.querySelector(".moves");

// declaring variable for matched cards
let matchedCard = document.getElementsByClassName("match");

// declaring array for opened cards
var openedCards = [];

// function for shuffle of cards
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// shuffles cards when page is refreshed or loads
document.body.onload = startGame();

// function to start a new play (remove all exisiting classes from each card and reset moves)
function startGame(){
    cards = shuffle(cards);
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    moves = 0;
    counter.innerHTML = moves;
}

// function for display cards
var displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
}

// function for japanese speech
function speech(e){
    var msg = new SpeechSynthesisUtterance();
    msg.rate = 10;
    msg.text = e.target.textContent;
    msg.lang = 'ja-JP';
    speechSynthesis.speak(msg);
}

// function for adding opened cards to OpenedCards list and check if cards are matched or not
function cardOpen() {
    openedCards.push(this);
    var len = openedCards.length;
    if(len === 2){
        moveCounter();
        if(openedCards[0].type === openedCards[1].type){
            matched();
        } else {
            unmatched();
        }
    }
}

// function for matched cards
function matched(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}

// function for unmatched cards
function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "no-event","unmatched");
        openedCards[1].classList.remove("show", "open", "no-event","unmatched");
        enable();
        openedCards = [];
    },1500);
}

// function for disable cards temporarily
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}

// function for enable unmatched cards and disable matched cards
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}

// function for counting moves
function moveCounter(){
    moves++;
    counter.innerHTML = moves;
}

// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", speech);
    card.addEventListener("click", cardOpen);
}
