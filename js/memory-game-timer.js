/* Written by Victor Asselta
  This file contains the basic, independant timer code for a basic stopwatch.

  This file does not have any dependencies and what adapted from a tutorial
  for use in this memory game. Please see the link below for the original
  tutorial.

  Please see the README file for overall description of the memory game.
 */

/* This code adapted from a video tutorial by Saad
  url: https://www.youtube.com/watch?v=jRhB1IG7uAw&t=1234s */

function GameTimer(domElement) {
  let time = 0;
  let interval;
  let offset;

  function update() {
    time += delta();
    domElement.textContent = timeFormatter(time);
  }

  function delta() {
    let now = Date.now()
    let timePassed = now - offset;
    offset = now;
    return timePassed;
  }

  function timeFormatter(timeInMilliseconds) {
    let time = new Date(timeInMilliseconds);
    let minutes = time.getMinutes().toString();
    let seconds = time.getSeconds().toString();
    let milliseconds = time.getMilliseconds().toString();

    if (minutes.length < 2) {
      minutes = `0${minutes}`;
    }

    if (seconds.length < 2){
      seconds = `0${seconds}`;
    }

    while (milliseconds.length < 3){
      milliseconds = `0${milliseconds}`;
    }

    return `${minutes} : ${seconds} . ${milliseconds}`;
  }

  this.isRunning = false;

  this.start = function() {
    if(!this.isRunning) {
      interval = setInterval(update, 10);
      offset = Date.now();
      this.isRunning = true;
    }
  }

  this.stop = function() {
    if(this.isRunning) {
      clearInterval(interval);
      interval = null;
      this.isRunning = false;
    }
  }

  this.reset = function() {
    time = 0;
    domElement.textContent = "00 : 00 . 00";
  }

  this.getCurrentTime = function() {
    return time;
  }

  this.getCurrentTimeSeconds = function() {
    let returnTime = new Date(time).getSeconds();
    return returnTime;
  }

  this.getCurrentTimeFormatted = function() {
    return timeFormatter(time);
  }

}
