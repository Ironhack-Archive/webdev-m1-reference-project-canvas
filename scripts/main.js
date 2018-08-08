'use strict';

function createHtml(html) {
  var div = document.createElement("div");
  div.innerHTML = html;
  return div.children[0];
};

function main() {
  var canvasWidth = 800;
  var canvasHeight = 600;

  var restartScreen;

  var container = document.querySelector('.container');
  var maxGoals = 3;

  var canvas = new Canvas(container, canvasWidth, canvasHeight);
  var game = new Game(canvas.ctx, canvasWidth, canvasHeight, gameEnded, maxGoals);

  // Build Splash
  function buildSplash() {
    game.buildSplash();
    canvas.addCanvasToScreen()
    canvas.canvasElement.addEventListener('click', startGame);
  }

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
    buildGameOver(winner);
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
  }

  function buildGameOver(winner) {
    buildGameOverHTML(winner);
    canvas.canvasElement.addEventListener('click', startGame);
  }

  function buildGameOverHTML(winner) {
    canvas.canvasElement.remove();
    restartScreen = createHtml(`
    <div class="restart-game">
      <h1>Game over</h1>
      <p>The player on the ${winner.side} won</p>
      <button id="restart-button">Restart Game</button>
    </div>
    `)
    container.appendChild(restartScreen);

    var restartButton = document.getElementById('restart-button');
    restartButton.addEventListener('click', restartGame)
  }

  function restartGame() {
    restartScreen.remove();
    canvas.addCanvasToScreen();
    game.reset();
    game.build();
  }

  buildSplash();
}

window.addEventListener('load', main);
