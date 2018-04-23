// gameItem constructor
// TODO: move this to it's own file and include
function GameItem(name, icon) {
  this.name = name;
  this.icon = icon;
  this.getHTML = function() {
    return `<div class="card" id="${this.name}">
      ${this.icon}
    </div>`;
  }
}

// Fields
let gridSize = 16;
let matchCount = 0;
let gameItems = [];

// selected card
let previouslySelectedCard;

// TODO: add image sets for themes
// TODO: only 8 image items, make pairs
const itemImages = [
  "item0", "item1", "item2", "item3",
  "item4", "item5", "item6", "item7",
  "item0", "item1", "item2", "item3",
  "item4", "item5", "item6", "item7",
];

// Populate gameItems
function createGameItems() {
  for (let i = 0; i < gridSize; i++) {
    // create the new gameItems
    const newGameItem = new GameItem(`card${i}`, itemImages[i]);
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
  if (matchCount === gameItems.length / 2) {
    console.log("Winner!");
    return true
  }
  return false
}

function checkSelectedMatch(card) {
  if (previouslySelectedCard.innerHTML === card.innerHTML) {
    console.log("We have a match!");
    previouslySelectedCard.classList.toggle('show');
    card.classList.toggle('show');
    matchCount++;
    checkMatchCount();
  } else {
    console.log("No match!");
    previouslySelectedCard.classList.toggle('open');
    card.classList.toggle('open');
  }
  previouslySelectedCard = undefined;
}

// TODO: is this better than an anonymous function?
function cardSelected(card){
  if (card.classList.contains('show') || checkMatchCount() == true) {
    return
  } else if (previouslySelectedCard != undefined && previouslySelectedCard.id != card.id) {
    card.classList.toggle("open");
    checkSelectedMatch(card);
  } else {
    card.classList.toggle("open");
    previouslySelectedCard = card;
  }
}

function addEventListenersToCards() {
  for (let i = 0; i < gridSize; i++) {
    let card = document.querySelector(`#card${i}`);
    card.addEventListener('click', function(){
      cardSelected(card);
    });
  }
}

function setUpGameBoard() {
  createGameItems();
  shuffleDeck();
  dealDeck();
  addEventListenersToCards();
}

setUpGameBoard();
// flipCard('#card1');
