/* Written by Victor Asselta
  This file contains the GameItem constructor. This object is necessary
  for building the array of items used to build and populate the memory
  game board.

  Please see the README file for overall description of the memory game.
 */

function GameItem(id, image) {
  this.id = id;
  this.image = image;
  this.getHTML = function() {
    return `<div class="card-container">
      <div class="card" id="${this.id}">
        <figure class="card-front">
          <img src="images/themes/${selectedTheme.cardFront}" alt="top">
        </figure>
        <figure class="card-back">
          <img src="images/themes/${this.image}" alt="hidden">
        </figure>
      </div>
    </div>`;
  }
}
