// Field which stores current theme object
let selectedTheme = carnivalTheme;

// Helper function to set background image for current theme
function setThemeBackground() {
  let body = document.querySelector('body');
  let bg = selectedTheme.backgroundImage;
  if (body && bg) {
    body.style.backgroundImage = `url(../images/themes/${bg})`;
  }
}
