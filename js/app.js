// Themes
// TODO: add image sets for themes


/* Begin Theme Coding */

// Theme packs //
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

/* End Theme Coding */
/* Begin Game Constructors */

// Fields - Themes //
let selectedTheme = carnivalTheme;

// gameItem constructor
// TODO: move this to it's own file and include
function GameItem(id, image) {
  this.id = id;
  this.image = image;
  this.getHTML = function() {
    return `<div class="card-container">
      <div class="card" id="${this.id}">
        <figure class="card-front">
          <img src="../images/themes/${selectedTheme.cardFront}" alt="top">
        </figure>
        <figure class="card-back">
          <img src="../images/themes/${this.image}" alt="hidden">
        </figure>
      </div>
    </div>`;
  }
}

/* End Game Custructors */
/* Begin Game Setup */

// clock
let clock;

function addClock() {
  let clockDiv = document.getElementById('clock');
  if(clockDiv) {
    clock = new GameTimer(clockDiv);
  }
}

// Store individual game items
// A game item is an object
let gameItems = [];

/* Game build functions */
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
    const newGameItem = new GameItem(`card${i}`, array[index]);
    gameItems.push(newGameItem);
    activeCards.push(newGameItem.id);
  }
}

function createGameBoardHTML() {
  let html = "";
  for(let item of gameItems) {
    html = html + item.getHTML();
  };
  return html;
}

// orginal function here: Shuffle function from http://stackoverflow.com/a/2450976
// This function was a given function in the Udacity starter code.
function shuffleDeck() {
    let currentIndex = selectedTheme.images.length, temporaryValue, randomIndex;

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

/* End Game Build Functions */
/* Begin Game logic */

// Fields
let matchCount = 0;
let moveCount = 0;

// Stores the running active card list.
// This is an attempt at creating a queue
// This allows for the edge case in which rapid card selection occurs.
let activeCards = [];
let clickedCards = [];

/* Card manipulation function */
function showCard(card) {
  if (!card.classList.contains("flipped")) {
    card.classList.toggle("flipped");
    console.log(`show card: ${card.id}`);
  }
}

function hideCard(card) {
  if (card.classList.contains("flipped")) {
    card.classList.toggle("flipped");
    console.log(`hiding ${card.id}`);
  }
}

function assignCardMatched(card) {
  if (!card.classList.contains("card-matched")) {
    card.classList.toggle("card-matched");
  }
}

function hideCards(card1, card2) {
  setTimeout( function(){
    hideCard(card1)
  }, 1000);
  setTimeout( function(){
    hideCard(card2)
  }, 1000);
}

function removeCardFromPlay(card) {
  let index = activeCards.indexOf('card.id');
  if (index) {
    activeCards.splice(index, 1);
    console.log(`${card.id} removed from play`);
  }
}

function checkForMatch() {
  // "Take" the two top cards
  let card1 = clickedCards.shift();
  let card2 = clickedCards.shift();

  console.log(`checking cards ${card1.id} and ${card2.id}`);
  // Check to make sure the card has not been double clicked
  if (card1.id === card2.id) {
    hideCard(card1);
  } else if (card1.childNodes[3].innerHTML === card2.childNodes[3].innerHTML) {
    // assign matched
    assignCardMatched(card1);
    assignCardMatched(card2);
    // remove the cards from active play
    removeCardFromPlay(card1);
    removeCardFromPlay(card2);
    console.log(activeCards);
    // check for win condition
    if (activeCards.length === 0) {
      clock.stop();
      console.log("WINNER!");
    }
  } else {
    console.log("no match");
    hideCards(card1, card2);
  }
}

function cardClicked(card) {
  console.log(`card clicked: ${card.id}`);
  let index = activeCards.indexOf(`${card.id}`);
  console.log(`index: ${index}`);
  clock.start();

  if (index !== null) {
    clickedCards.push(card);
    console.log(`card added to clickedCards ${card.id}`);
    showCard(card);

    if (clickedCards.length >= 2) {
      console.log('checking for match');
      checkForMatch();
    }
  }
}

function addEventListenersToCards() {
  for (let i = 0; i < (selectedTheme.images.length * 2); i++) {
    let card = document.querySelector(`#card${i}`);
    card.addEventListener('click', function(){
      if (!card.classList.contains("card-matched")) {
        cardClicked(card);
      }
    });
  }
}

/* End Game Logic */

/* Runtime Function */
function setUpGameBoard() {
  addClock();
  createGameItems(selectedTheme.images);
  shuffleDeck();
  dealDeck();
  addEventListenersToCards();
}

// TODO: Better name?
/* Intialize Game */
setUpGameBoard();
