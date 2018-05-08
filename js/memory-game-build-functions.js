// Store individual game items
// A game item is an object
let gameItems = [];

/* Game build functions */
let activeCards = [];

// Add items to active
function populateActiveCards() {
  activeCards = [];
  if (gameItems) {
    for (item of gameItems) {
      activeCards.push(item.id);
    }
  }
}

// Populate gameItems
function createGameItems(array) {
  console.log(`array: ${array}`);
  let index;
  // allow for duplicate items without array duplicates
  let arraySize = array.length;
  for (let i = 0; i < (array.length * 2); i++) {
    index = i;
    // create the new gameItems
    if (i >= arraySize) {
      index = i - arraySize;
    }
    const newGameItem = new GameItem(`card${i}`, array[index]);
    gameItems.push(newGameItem);
  }
  populateActiveCards();
}

function createGameBoardHTML() {
  let html = "";
  for(let item of gameItems) {
    html = html + item.getHTML();
  };
  return html;
}

// TODO: one function for game setup.

// orginal function here: Shuffle function from http://stackoverflow.com/a/2450976
// This function was a given function in the Udacity starter code.
// TODO: Shuffle is not really working very well.
// Cards consistently appear in the same place.
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

// Send newly created deck to dom
function dealDeck() {
  let html = createGameBoardHTML();
  let targetClass = document.querySelector('#deck');
  targetClass.innerHTML = html;
}

// Reset button event listener
function addEventListenerResetButton() {
  const button = document.getElementById('resetButton');
  if (button) {
    button.addEventListener('click', resetGame, false );
  }
}

// Play again event listener
function addEventListenerPlayAgainButton() {
  const button = document.getElementById('play-again');
  if (button) {
    button.addEventListener('click', resetGame, false );
  }
}

// Theme buttons event listeners
function addEventListenerThemeButtons() {
  const carnivalButton = document.getElementById('theme1');
  const nycButton = document.getElementById('theme2');
  if (carnivalButton) {
    carnivalButton.addEventListener('click', function() {
      setNewTheme(carnivalTheme);
    }, false);
  }

  if (nycButton) {
    nycButton.addEventListener('click', function() {
      setNewTheme(nycTheme);
    }, false);
  }
}

/* End Game Build Functions */
