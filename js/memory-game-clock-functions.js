// Clock functions
// - Game timer used to display game elapse time to user and determine points
function addClock() {
  let clockDiv = document.getElementById('clock');
  if(clockDiv) {
    return new GameTimer(clockDiv);
  }
}

// Global clock field
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
// End clock functions
