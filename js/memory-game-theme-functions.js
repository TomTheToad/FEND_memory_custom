/* Written by Victor Asselta
  This file contains the field for tracking the users selected theme and
  a helper function for setting the background them image.

  Please see the README file for overall description of the memory game.
 */

 // TODO: Is this file needed? Should this be moved back to main?

// Field which stores current theme object
let selectedTheme = carnivalTheme;

// Helper function to set background image for current theme
function setThemeBackground() {
  let body = document.querySelector('body');
  let bg = selectedTheme.backgroundImage;
  if (body && bg) {
    body.style.backgroundImage = `url(images/themes/${bg})`;
  }
}
