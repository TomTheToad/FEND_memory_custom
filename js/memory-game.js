// Fields - Themes //
let selectedTheme = carnivalTheme;

function setThemeBackground() {
  let body = document.querySelector('body');
  let bg = selectedTheme.backgroundImage;
  if (body && bg) {
    body.style.backgroundImage = `url(../images/themes/${bg})`;
  }
}

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

function addClock() {
  let clockDiv = document.getElementById('clock');
  if(clockDiv) {
    return new GameTimer(clockDiv);
  }
}

// clock
let clock = addClock();

// Time for last match made
let timeLastMatch = 0;

// TODO: use milliseconds in the case that a move takes more than a minute.
function resetTimeLastMatch() {
  let newTime = clock.getCurrentTimeSeconds();
  if (newTime) {
    timeLastMatch = newTime;
  }
}

function getTimeLastMatch() {
  let newTime = clock.getCurrentTimeSeconds();
  let returnTime = newTime - timeLastMatch;
  timeLastMatch = newTime;
  return returnTime;
}

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
// TODO: Shuffle not really working very well.
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
}

// reset button even listener
function addEventListenerResetButton() {
  const button = document.getElementById('resetButton');
  if (button) {
    button.addEventListener('click', resetGame, false );
  }
}

function addEventListenerPlayAgainButton() {
  const button = document.getElementById('play-again');
  if (button) {
    button.addEventListener('click', resetGame, false );
  }
}

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
/* Begin Game logic */

// Fields
let matchCount = 0;
let moveCount = 0;

// Stores the running active card list.
// This is an attempt at creating a queue
// This allows for the edge case in which rapid card selection occurs.
let clickedCards = [];

// SCORE
let score = 0;
let scoreBoard = document.getElementById('score');

// reset score
function resetScore() {
  score = 0;
  scoreBoard.textContent = "00";
}

// update score
function updateScore() {
  const elapsedTime = getTimeLastMatch();
  if (elapsedTime < 5) {
    score += 100;
  } else if (elapsedTime < 10) {
    score += 50;
  } else if (elapsedTime < 20) {
    score += 20;
  } else {
    score += 10;
  }

  if (scoreBoard) {
    scoreBoard.textContent = `${score}`;
  }
}

// win sequence
const gameBoard = document.getElementById('game-board');
const winScreenBg = document.getElementById('win-screen-bg');

// TODO: refactor and simplify
function setGameBoardOpacity(opacity) {
  gameBoard.style.opacity = opacity;
}

function setWinScreenOpacity(opacity) {
  winScreenBg.style.opacity = opacity;
  winScreenBg.childNodes[1].style.opacity = opacity;
}

function setWinScreenZIndex(zIndex) {
  winScreenBg.style.zIndex = zIndex;
}

function showWinScreen() {
  setGameBoardOpacity(0);
  setWinScreenOpacity(1);
  setWinScreenZIndex(1000);
}

// hide win screen() {
function hideWinScreen() {
  setGameBoardOpacity(1);
  setWinScreenOpacity(0);
  setWinScreenZIndex(-1000);
}

// TODO simplify with class element
// childNodes star1 = 1, star2 = 3, star3 = 5
function setStars(numStars) {
  let stars = document.getElementById('stars');
  if(stars) {
    if (numStars >= 3) {
      stars.childNodes[1].style.opacity = 1;
      stars.childNodes[3].style.opacity = 1;
      stars.childNodes[5].style.opacity = 1;
    } else if (numStars === 2 ) {
      stars.childNodes[1].style.opacity = 1;
      stars.childNodes[3].style.opacity = 1;
      stars.childNodes[5].style.opacity = 0.4;
    } else {
      stars.childNodes[1].style.opacity = 1;
      stars.childNodes[3].style.opacity = 0.4;
      stars.childNodes[5].style.opacity = 0.4;
    }
  } else {
    console.log("stars element not found");
  }
}

function setFinalScore(finalScore) {
  let finalScoreElement = document.getElementById('win-final-score');
  if(finalScoreElement) {
    finalScoreElement.textContent = `${finalScore}`;
  } else {
    console.log("final score element not found");
  }
}

function setWinMoves(minusPoints) {
  let winMoves = document.getElementById('win-moves');
  if (winMoves) {
    winMoves.textContent = `Moves: ${moveCount} (-${minusPoints})`;
  }
}

function setWinTime(plusPoints) {
  let winTime = document.getElementById('win-time');
  if (winTime) {
    winTime.textContent = `Time: ${clock.getCurrentTimeFormatted()} (+${plusPoints})`;
  }
}

// Final score (final score tally after win) calculator
function getFinalScore() {
  let minusMoves = moveCount * 5;
  setWinMoves(minusMoves);
  let finalScore = score - minusMoves;
  let totalTime = clock.getCurrentTime();
  if(totalTime < 60000) {
    finalScore += 300;
    setWinTime(300);
  } else if(totalTime < 120000) {
    finalScore += 100;
    setWInTime(100);
  } else {
    setWinTime(0);
  }

  if (finalScore > 650) {
    setStars(3);
  } else if (finalScore > 550) {
    setStars(2);
  } else {
    setStars(1);
  }

  setFinalScore(finalScore);
}

/* Card manipulation functions */
function showCard(card) {
  if (!card.classList.contains("flipped")) {
    card.classList.toggle("flipped");
  }
}

function hideCard(card) {
  if (card.classList.contains("flipped")) {
    card.classList.toggle("flipped");
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
  }
}

function checkForMatch() {
  // "Take" the two top cards
  let card1 = clickedCards.shift();
  let card2 = clickedCards.shift();

  // Check to make sure the card has not been double clicked
  if (card1.id === card2.id) {
    hideCard(card1);
  } else if (card1.childNodes[3].innerHTML === card2.childNodes[3].innerHTML) {
    updateScore();
    // assign matched
    assignCardMatched(card1);
    assignCardMatched(card2);
    // remove the cards from active play
    removeCardFromPlay(card1);
    removeCardFromPlay(card2);
    // check for win condition
    if (activeCards.length === 0) {
      clock.stop();
      showWinScreen();
      getFinalScore();
    }
  } else {
    hideCards(card1, card2);
  }
}

function cardClicked(card) {
  let index = activeCards.indexOf(`${card.id}`);
  clock.start();

  if (index !== null) {
    clickedCards.push(card);
    moveCount++;
    showCard(card);

    if (clickedCards.length >= 2) {
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

// Game reset
function resetGame() {
  clock.stop();
  clock.reset();
  resetScore();
  moveCount = 0;
  populateActiveCards();
  clickedCards = [];
  shuffleDeck();
  dealDeck();
  addEventListenersToCards();
  addEventListenerThemeButtons();
  hideWinScreen();
}
/* End Game Logic */

/* Main Runtime Function */
function setUpGameBoard() {
  gameItems = [];
  resetTimeLastMatch();
  addClock();
  createGameItems(selectedTheme.images);
  setThemeBackground();
  shuffleDeck();
  dealDeck();
  addEventListenersToCards();
  addEventListenerResetButton();
  addEventListenerPlayAgainButton();
  addEventListenerThemeButtons();
}

// Theme Button Actions
function setNewTheme(theme) {
  if (selectedTheme != theme) {
    selectedTheme = theme;
    setUpGameBoard();
    resetScore();
    clock.stop();
    clock.reset();
  }
}

/* Intialize Game */
setUpGameBoard();
