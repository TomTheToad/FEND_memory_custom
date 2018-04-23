// gameItem constructor
// TODO: move this to it's own file and include
function GameItem(name, icon) {
  this.name = name;
  this.icon = icon;
  this.isMatched = false;
  this.getHTML = function() {
    return `<div class="card" id="card${this.name}">
      ${this.icon}
    </div>`;
  }
}

// Fields
let gridSize = 16;
let gameItems = [];

// TODO: add image sets for themes
// TODO: only 8 image items, make pairs
const itemImages = [
  "item1", "item2", "item3", "item4",
  "item5", "item6", "item7", "item8",
  "item9", "item10", "item11", "item12",
  "item13", "item14", "item15", "item16",
];

// Populate gameItems
function createGameItems() {
  for (let i = 0; i < gridSize; i++) {
    // create the new gameItems
    const newGameItem = new GameItem(`item${i}`, itemImages[i]);
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

function setUpGameBoard() {
  createGameItems();
  shuffleDeck();
  dealDeck();
}

setUpGameBoard();
