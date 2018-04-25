// Themes
// TODO: add image sets for themes
// TODO: only 8 image items, make pairs

const carnivalTheme = {
  images: [
    "carnival/adventure-amusement-park-carnival-460055.jpg",
    "carnival/amusement-background-carnival-220137.jpg",
    "carnival/amusement-park-art-bright-137032.jpg",
    "carnival/amusement-park-background-bright-207248.jpg",
    "carnival/amusement-park-blue-sky-bottom-view-784727.jpg",
    "carnival/blur-candies-close-up-618918.jpg",
    "carnival/blur-carnival-carousel-225238.jpg",
    "carnival/carnival-cartoon-character-disney-203561.jpg",
  ],
  backgroundImage: "carnival/photo-1514031231291-fee925070a61.jpg",
  cardFront: "carnival/card-front-kevin-jarrett-561805-unsplash.jpg"
};

// Fields
let matchCount = 0;
let selectedTheme = carnivalTheme;
let gameItems = [];

// selected card
let previouslySelectedCard;

// gameItem constructor
// TODO: move this to it's own file and include
function GameItem(name, icon) {
  this.name = name;
  this.icon = icon;
  this.getHTML = function() {
    return `<div class="card" id="${this.name}">
      <div class="card-container">
        <img class="card-top" src="../images/themes/${selectedTheme.cardFront}" alt="top">
        <img class="card-bottom" src="../images/themes/${this.icon}" alt="hidden">
      </div>
    </div>`;
  }
}

// Populate gameItems
function createGameItems(array) {
  let index;
  // allow for duplicate items without array duplicates
  arraySize = array.length;
  for (let i = 0; i < (array.length * 2); i++) {
    index = i;
    // create the new gameItems
    if (i >= arraySize) {
      index = i - arraySize;
    }
    console.log(`index: ${index}`);
    const newGameItem = new GameItem(`card${i}`, array[index]);
    gameItems.push(newGameItem);
  }
}

function createGameBoardHTML() {
  let html = "";
  for(let item of gameItems) {
    console.log(item.name);
    html = html + item.getHTML();
  };
  return html;
}

// orginal function here: Shuffle function from http://stackoverflow.com/a/2450976
// This function was a given function in the Udacity starter code.
function shuffleDeck() {
    let currentIndex = gameItems.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = gameItems[currentIndex];
        gameItems[currentIndex] = gameItems[randomIndex];
        gameItems[randomIndex] = temporaryValue;
    }
}

function dealDeck() {
  let html = createGameBoardHTML();
  let targetClass = document.querySelector('#deck');
  targetClass.innerHTML = html;
  // console.log(`html: ${html}`);
}

function checkMatchCount() {
  if (matchCount === selectedTheme.images.length / 2) {
    console.log("Winner!");
    return true
  }
  return false
}

function checkSelectedMatch(card) {
  if (previouslySelectedCard[0].innerHTML === card[0].innerHTML) {
    console.log("We have a match!");
    previouslySelectedCard[1].classList.toggle('card-top-hide');
    card[1].classList.toggle('card-top-hide');
    matchCount++;
    checkMatchCount();
  } else {
    console.log("No match!");
    previouslySelectedCard[1].classList.toggle('card-open');
    card[1].classList.toggle('card-open');
  }
  previouslySelectedCard = undefined;
}

// TODO: is this better than an anonymous function?
function cardSelected(card){
  if (card[0].classList.contains('card-bottom-show') || checkMatchCount() == true) {
    return
  } else if (previouslySelectedCard != undefined && previouslySelectedCard.id != card[0].id) {
    card[1].classList.toggle("card-open");
    checkSelectedMatch(card);
  } else {
    card[1].classList.toggle("card-open");
    previouslySelectedCard = card;
  }
}

function addEventListenersToCards() {
  for (let i = 0; i < (selectedTheme.images.length * 2); i++) {
    let card = document.querySelector(`#card${i}`);
    let cardTop = document.querySelector(`#card${i} img[class="card-top"]`);
    card.addEventListener('click', function(){
      cardSelected([card, cardTop]);
    });
  }
}

function setUpGameBoard() {
  createGameItems(selectedTheme.images);
  shuffleDeck();
  dealDeck();
  addEventListenersToCards();
}

setUpGameBoard();
// flipCard('#card1');
