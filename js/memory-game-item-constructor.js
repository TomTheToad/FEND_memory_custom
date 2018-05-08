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
