'use strict';

function main () {
  var canvasWidth = 800;
  var canvasHeight = 600;

  var container = document.querySelector('.container');
  var maxGoals = 3;

  var canvas = new Canvas(container, canvasWidth, canvasHeight);
  var game = new Game(canvas.ctx, canvasWidth, canvasHeight, gameEnded, maxGoals);

  // Build Splash
  function buildSplash () {
    game.buildSplash();
    canvas.canvasElement.addEventListener('click', startGame);
  }

  // Desktroy Splash and build Gthis.ended = false;ame
  function startGame () {
    canvas.canvasElement.removeEventListener('click', startGame);
    game.destroySplash();
    buildGame();
  }

  function handleKeyDown (event) {
    game.handleKeyDown(event.key);
  }

  function handleKeyUp (event) {
    game.handleKeyUp(event.key);
  }

  function buildGame () {
    game.ended = false;
    game.build();
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
  }

  function gameEnded (winner) {
    destroyGame(winner);
  }

  // Destroy Game and build Game Over
  function destroyGame (winner) {
    buildGameOver(winner);
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
  }

  function buildGameOver (winner) {
    game.buildGameOver(winner);
    canvas.canvasElement.addEventListener('click', startGame);
  }

  buildSplash();
}

window.addEventListener('load', main);
