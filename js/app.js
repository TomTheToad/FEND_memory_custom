const itemImages = [
  "item1", "item2", "item3", "item4",
  "item5", "item6", "item7", "item8",
  "item9", "item10", "item11", "item12",
  "item13", "item14", "item15", "item16",
];

// TODO: add image argument
// TODO: add css template areas?
function buildCard(imageItem, position) {
    let cardHTML = `<div class="card" id="card${position}">
      ${imageItem}
    </div>`;
    return cardHTML;
}

// TODO: figure out theme and dimension argument
function createGrid(itemImages) {
  let gridItems = "";
  let count = 0;
  for(let item of itemImages) {
    count = count++
    gridItems = gridItems + buildCard(item, count);
  };
  return gridItems;
}

function dealDeck() {
  // TODO: if let?
  let html = createGrid(itemImages);
  let targetClass = document.querySelector('#deck');
  targetClass.innerHTML = html;
}

dealDeck();
