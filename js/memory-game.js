/* Main game logic
dependencies:
  memory-game-theme-packs.js
  memory-game-theme-functions.js
  memory-game-item-constructor.js
  memory-game-timer.js
  memory-game-clock-functions.js
  memory-game-build-functions.js
*/

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

// Reset score
function resetScore() {
  score = 0;
  scoreBoard.textContent = "00";
}

// Update score
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

// Win sequence
// Constants to prevent multiple dom calls
const gameBoard = document.getElementById('game-board');
const winScreenBg = document.getElementById('win-screen-bg');

// Opacity and zIndex functions to support showing, make active win screen
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

// Show win screen macro
function showWinScreen() {
  setGameBoardOpacity(0);
  setWinScreenOpacity(1);
  setWinScreenZIndex(1000);
}

// Hide win screen macro {
function hideWinScreen() {
  setGameBoardOpacity(1);
  setWinScreenOpacity(0);
  setWinScreenZIndex(-1000);
}

// Set number of stars to display
// ChildNodes star1 = 1, star2 = 3, star3 = 5
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

// Set final score detail in the win screen
function setFinalScore(finalScore) {
  let finalScoreElement = document.getElementById('win-final-score');
  if(finalScoreElement) {
    finalScoreElement.textContent = `${finalScore}`;
  } else {
    console.log("final score element not found");
  }
}

// Set number of moves detail in the win screen
function setWinMoves(minusPoints) {
  let winMoves = document.getElementById('win-moves');
  if (winMoves) {
    winMoves.textContent = `Moves: ${moveCount} (-${minusPoints})`;
  }
}

// Set time detail in the win screen
function setWinTime(plusPoints) {
  let winTime = document.getElementById('win-time');
  if (winTime) {
    winTime.textContent = `Time: ${clock.getCurrentTimeFormatted()} (+${plusPoints})`;
  }
}

// Determine final score outcome
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

// Add css showing match which displays green border
function assignCardMatched(card) {
  if (!card.classList.contains("card-matched")) {
    card.classList.toggle("card-matched");
  }
}

// Hold cards open for better user experience
function hideCards(card1, card2) {
  setTimeout( function(){
    hideCard(card1)
  }, 1000);
  setTimeout( function(){
    hideCard(card2)
  }, 1000);
}

// Remove card from active play due to match
function removeCardFromPlay(card) {
  let index = activeCards.indexOf('card.id');
  if (index) {
    activeCards.splice(index, 1);
  }
}

// Check next two selected cards for match
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

// Triggered function for card being selected
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

// Basic event listener for all cards to react to a click from user
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

// Game reset macro
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
