'use strict';

function createHtml(html) {
  var div = document.createElement("div");
  div.innerHTML = html;
  return div.children[0];
};

function main() {
  var canvasWidth = 800;
  var canvasHeight = 600;

  var container = document.querySelector('.container');
  var maxGoals = 3;

  var canvas = new Canvas(container, canvasWidth, canvasHeight);
  var game = new Game(canvas.ctx, canvasWidth, canvasHeight, gameEnded, maxGoals);

  // Build Splash
  function buildSplash() {
    game.buildSplash();
    canvas.canvasElement.addEventListener('click', startGame);
  }

  // Desktroy Splash and build Gthis.ended = false;ame
  function startGame() {
    canvas.canvasElement.removeEventListener('click', startGame);
    game.destroySplash();
    buildGame();
  }

  function handleKeyDown(event) {
    game.handleKeyDown(event.key);
  }

  function handleKeyUp(event) {
    game.handleKeyUp(event.key);
  }

  function buildGame() {
    game.ended = false;
    game.build();
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
  }

  function gameEnded(winner) {
    destroyGame(winner);
  }

  // Destroy Game and build Game Over
  function destroyGame(winner) {
    buildGameOverHTML(winner);
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
  }

  function buildGameOver(winner) {
    game.buildGameOver(winner);
    canvas.canvasElement.addEventListener('click', startGame);
  }

  function buildGameOverHTML(winner) {
    canvas.remove();
    var restartScreen = createHtml(`
    <div>
      <p>Game over</p>
      <p>The player on the ${winner} won</p>
      <button>Restart Game</button>
    </div>
    `)
    document.body.appendChild(restartScreen);

  }

  buildSplash();
}

window.addEventListener('load', main);
