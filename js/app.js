// gameItem constructor
// TODO: move this to it's own file and include
function GameItem(name, icon) {
  this.name = name;
  this.icon = icon;
  this.getHTML = function() {
    return `<div class="card" id="${this.name}">
      <div class="card-container">
        <img class="card-top" src="../images/eyes.png" alt="top">
        <img class="card-bottom" src="../images/${this.icon}" alt="hidden">
      </div>
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
  "robotBg.png", "item1", "item2", "item3",
  "item4", "item5", "item6", "item7",
  "item0", "item1", "item2", "item3",
  "item4", "item5", "item6", "item7",
];
const itemImages2 = [
  "robotBg.png", "robotBg.png", "robotBg.png", "robotBg.png",
  "robotBg.png", "robotBg.png", "robotBg.png", "robotBg.png",
  "robotBg.png", "robotBg.png", "robotBg.png", "robotBg.png",
  "robotBg.png", "robotBg.png", "robotBg.png", "robotBg.png",
];

// Populate gameItems
function createGameItems() {
  for (let i = 0; i < gridSize; i++) {
    // create the new gameItems
    const newGameItem = new GameItem(`card${i}`, itemImages2[i]);
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
  for (let i = 0; i < gridSize; i++) {
    let card = document.querySelector(`#card${i}`);
    let cardTop = document.querySelector(`#card${i} img[class="card-top"]`);
    card.addEventListener('click', function(){
      cardSelected([card, cardTop]);
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
