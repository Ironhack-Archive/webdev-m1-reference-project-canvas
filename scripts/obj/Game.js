'use strict';

function Game(ctx, canvasWidth, canvasHeight, cb, maxGoals) {
  this.ctx = ctx;
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;

  this.player1 = null;
  this.player2 = null;
  this.ball = null;

  // Ball Settings
  this.ballRadius = 10;
  this.ballSpeed = 2;

  // Player Settings
  this.playerWidth = 10;
  this.playerHeight = 120;
  this.writeScoreOffsetX = 100;
  this.writeScoreOffsetY = 150;

  this.players = [];
  this.balls = [];

  this.justScored = false;

  this.maxGoals = maxGoals;
  this.ended = false;
  this.endGameCallback = cb;

  this.restartButtonStartX = this.canvasWidth / 2 - 100;
  this.restartButtonStartY = this.canvasHeight - this.canvasHeight / 5;

  this.restartButtonTextY = 525;
  this.buttonWidth = 200;
  this.buttonHeight = 75;

  this.borderWidth = 20;

  this.gameOverTextWinnerY = this.canvasHeight - this.canvasHeight / 2 + 50;
}

Game.prototype.buildSplash = function () {
  this.ctx.fillStyle = 'black';
  this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

  this.ctx.font = '70px sans-serif';
  this.ctx.textAlign = 'center';
  this.ctx.fillStyle = '#eee';
  this.ctx.fillText('Pong', this.canvasWidth / 2, this.canvasHeight / 3);

  this.ctx.font = '25px sans-serif';
  this.ctx.fillStyle = '#white';
  this.ctx.textAlign = 'center';
  this.ctx.fillText('Click to start the game', this.canvasWidth / 2, this.canvasHeight - this.canvasHeight / 3);
  this.ctx.font = '20px sans-serif';
  this.ctx.textAlign = 'left';
  this.ctx.fillText('Click on the screen to start the game.', 10, this.canvasHeight - this.canvasHeight / 4);
  this.ctx.fillText('Player 1: W - up, S - Down.', 10, this.canvasHeight - this.canvasHeight / 4 + 25);
  this.ctx.fillText('Player 2: Arrow up - up, Arrow down - down', 10, this.canvasHeight - this.canvasHeight / 4 + 50);
  this.ctx.fillText('First player to 3 points wins!', 10, this.canvasHeight - this.canvasHeight / 4 + 75);
}

Game.prototype.destroySplash = function () {
  this.clearCanvas();
}

Game.prototype.build = function () {
  this.player1 = new Player(this.ctx, 'left', this.canvasWidth, this.canvasHeight, this.playerWidth, this.playerHeight, this.borderWidth, this.writeScoreOffsetX, this.writeScoreOffsetY);
  this.player2 = new Player(this.ctx, 'right', this.canvasWidth, this.canvasHeight, this.playerWidth, this.playerHeight, this.borderWidth, this.writeScoreOffsetX, this.writeScoreOffsetY);
  this.ball = new Ball(this.ctx, this.canvasWidth, this.canvasHeight, this.ballRadius, this.ballSpeed);

  this.players.push(this.player1);
  this.players.push(this.player2);

  this.balls.push(this.ball);

  this.doFrame();
}

Game.prototype.clearCanvas = function () {
  this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
}

Game.prototype.drawGame = function () {
  this.ctx.fillStyle = 'black';
  this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
  this.ctx.fillStyle = 'white';
  this.ctx.fillRect(10, 0, this.canvasWidth - this.borderWidth, this.borderWidth);
  this.ctx.fillRect(10, this.canvasHeight - this.borderWidth, this.canvasWidth - this.borderWidth, this.borderWidth);
  this.ctx.strokeStyle = 'white';
  this.ctx.beginPath();
  this.ctx.setLineDash([30, 15]);
  this.ctx.lineWidth = 15;
  this.ctx.moveTo(this.canvasWidth / 2, 0);
  this.ctx.lineTo(this.canvasWidth / 2, this.canvasHeight);
  this.ctx.stroke();
}

Game.prototype.handleKeyDown = function (key) {
  switch (key) {
    case 'w':
      this.player1.setSpeed(5);
      this.player1.setDirection('up');
      break;
    case 's':
      this.player1.setSpeed(5);
      this.player1.setDirection('down');
      break;
    case 'ArrowUp':
      this.player2.setSpeed(5);
      this.player2.setDirection('up');
      break;
    case 'ArrowDown':
      this.player2.setSpeed(5);
      this.player2.setDirection('down');
      break;
  }
}

Game.prototype.handleKeyUp = function (key) {
  switch (key) {
    case 'w':
      this.player1.setSpeed(0);
      break;
    case 's':
      this.player1.setSpeed(0);
      break;
    case 'ArrowUp':
      this.player2.setSpeed(0);
      break;
    case 'ArrowDown':
      this.player2.setSpeed(0);
      this.player2.setDirection('down');
      break;
  }
}

Game.prototype.doFrame = function () {
  this.clearCanvas();
  this.drawGame();
  this.checkPlayerCollisionWall();
  this.checkBallCollisionWall();
  this.checkBallCollisionPlayer(this.player1, 1);
  this.checkBallCollisionPlayer(this.player2, -1);
  this.checkHasScored();
  this.player1.update();
  this.player2.update();
  this.player1.draw();
  this.player2.draw();
  this.ball.draw();
  this.ball.update();
  this.checkGameEnded();
  window.requestAnimationFrame(() => {
    if (!this.ended) {
      this.doFrame();
    }
  });
}

Game.prototype.checkPlayerCollisionWall = function () {
  this.players.forEach(player => {
    if (player.y - player.height / 2 <= this.borderWidth) {
      player.setPosition('top');
    } else if (player.y + player.height / 2 >= this.canvasHeight - this.borderWidth) {
      player.setPosition('bottom');
    }
  });
}

Game.prototype.checkBallCollisionWall = function () {
  this.balls.forEach(ball => {
    if ((ball.centerY - ball.radius < this.borderWidth) && (ball.directionV !== 1)) {
      ball.swapVertDirection();
    } else if ((ball.centerY + ball.radius > this.canvasHeight - this.borderWidth) && (ball.directionV !== -1)) {
      ball.swapVertDirection();
    }
  });
}

Game.prototype.buildSplash = function () {
  this.ctx.fillStyle = 'black';
  this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

  this.ctx.font = '70px sans-serif';
  this.ctx.textAlign = 'center';
  this.ctx.fillStyle = '#eee';
  this.ctx.fillText('Pong', this.canvasWidth / 2, this.canvasHeight / 3);

  this.ctx.font = '25px sans-serif';
  this.ctx.fillStyle = '#white';
  this.ctx.textAlign = 'center';
  this.ctx.fillText('Click to start the game', this.canvasWidth / 2, this.canvasHeight - this.canvasHeight / 3);
  this.ctx.font = '20px sans-serif';
  this.ctx.textAlign = 'left';
  this.ctx.fillText('Click on the screen to start the game.', 10, this.canvasHeight - this.canvasHeight / 4);
  this.ctx.fillText('Player 1: W - up, S - Down.', 10, this.canvasHeight - this.canvasHeight / 4 + 25);
  this.ctx.fillText('Player 2: Arrow up - up, Arrow down - down', 10, this.canvasHeight - this.canvasHeight / 4 + 50);
  this.ctx.fillText('First player to 3 points wins!', 10, this.canvasHeight - this.canvasHeight / 4 + 75);
}

Game.prototype.destroySplash = function () {
  this.clearCanvas();
}

Game.prototype.build = function () {
  this.player1 = new Player(this.ctx, 'left', this.canvasWidth, this.canvasHeight);
  this.player2 = new Player(this.ctx, 'right', this.canvasWidth, this.canvasHeight);
  this.ball = new Ball(this.ctx, this.canvasWidth, this.canvasHeight);

  this.players.push(this.player1);
  this.players.push(this.player2);

  this.balls.push(this.ball);

  this.doFrame();
}

Game.prototype.clearCanvas = function () {
  this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
}

Game.prototype.drawGame = function () {
  this.ctx.fillStyle = 'black';
  this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
  this.ctx.fillStyle = 'white';
  this.ctx.fillRect(10, 0, this.canvasWidth - this.borderWidth, this.borderWidth);
  this.ctx.fillRect(10, this.canvasHeight - this.borderWidth, this.canvasWidth - this.borderWidth, this.borderWidth);
  this.ctx.strokeStyle = 'white';
  this.ctx.beginPath();
  this.ctx.setLineDash([30, 15]);
  this.ctx.lineWidth = 15;
  this.ctx.moveTo(this.canvasWidth / 2, 0);
  this.ctx.lineTo(this.canvasWidth / 2, this.canvasHeight);
  this.ctx.stroke();
}

Game.prototype.handleKeyDown = function (key) {
  switch (key) {
    case 'w':
      this.player1.setSpeed(5);
      this.player1.setDirection('up');
      break;
    case 's':
      this.player1.setSpeed(5);
      this.player1.setDirection('down');
      break;
    case 'ArrowUp':
      this.player2.setSpeed(5);
      this.player2.setDirection('up');
      break;
    case 'ArrowDown':
      this.player2.setSpeed(5);
      this.player2.setDirection('down');
      break;
  }
}

Game.prototype.handleKeyUp = function (key) {
  switch (key) {
    case 'w':
      this.player1.setSpeed(0);
      break;
    case 's':
      this.player1.setSpeed(0);
      break;
    case 'ArrowUp':
      this.player2.setSpeed(0);
      break;
    case 'ArrowDown':
      this.player2.setSpeed(0);
      this.player2.setDirection('down');
      break;
  }
}

Game.prototype.doFrame = function () {
  this.clearCanvas();
  this.drawGame();
  this.checkPlayerCollisionWall();
  this.checkBallCollisionWall();
  this.checkBallCollisionPlayer(this.player1, 1);
  this.checkBallCollisionPlayer(this.player2, -1);
  this.checkHasScored();
  this.player1.update();
  this.player2.update();
  this.player1.draw();
  this.player2.draw();
  this.ball.draw();
  this.ball.update();
  this.checkGameEnded();
  window.requestAnimationFrame(() => {
    if (!this.ended) {
      this.doFrame();
    }
  });
}

Game.prototype.checkPlayerCollisionWall = function () {
  this.players.forEach(player => {
    if (player.y - player.height / 2 <= this.borderWidth) {
      player.setPosition('top');
    } else if (player.y + player.height / 2 >= this.canvasHeight - this.borderWidth) {
      player.setPosition('bottom');
    }
  });
}

Game.prototype.checkBallCollisionWall = function () {
  this.balls.forEach(ball => {
    if ((ball.centerY - ball.radius < this.borderWidth) && (ball.directionV !== 1)) {
      ball.swapVertDirection();
    } else if ((ball.centerY + ball.radius > this.canvasHeight - this.borderWidth) && (ball.directionV !== -1)) {
      ball.swapVertDirection();
    }
  });
}

Game.prototype.checkBallCollisionPlayer = function (player) {
  this.balls.forEach(ball => {
    const collidesPlayerTop = ball.centerY - ball.radius > player.y - player.height / 2;
    const collidesPlayerBottom = ball.centerY + ball.radius < player.y + player.height / 2;
    let collidesPlayer;
    if (player.x > 50) {
      collidesPlayer = ball.centerX + ball.radius > player.x - player.width / 2;
    } else {
      collidesPlayer = ball.centerX - ball.radius < player.x + player.width / 2;
    }

    if (collidesPlayerTop && collidesPlayerBottom) {
      if (collidesPlayer) {
        ball.swapHoriDirection();
      }
    }
  });
}

Game.prototype.checkHasScored = function () {
  this.balls.forEach(ball => {
    if (ball.centerX < 20) {
      this.player2.score++;
      this.ball.updateSpeed();
      this.resetGameState();
    } else if (ball.centerX > this.canvasWidth - this.borderWidth - 1) {
      this.player1.score++;
      this.ball.updateSpeed();
      this.resetGameState();
    }
  });
}

Game.prototype.checkGameEnded = function () {
  this.players.forEach(player => {
    if (player.score >= this.maxGoals) {
      this.ended = true;
      this.destroy();
      this.endGameCallback(player);
    }
  });
}

Game.prototype.resetGameState = function () {
  this.balls.forEach(ball => {
    ball.resetPosition();
  });
}

Game.prototype.destroy = function () {
  this.clearCanvas();
}

Game.prototype.resetGame = function () {
  this.players = [];
  this.balls = [];
}

Game.prototype.buildGameOver = function (winner) {
  this.resetGame();
  this.ctx.font = '25px sans-serif';
  this.ctx.fillStyle = 'white';
  this.ctx.textAlign = 'center';
  this.ctx.fillText('Game Over', this.canvasWidth / 2, this.canvasHeight - this.canvasHeight / 2);
  this.ctx.fillText(`The player on the ${winner.side} has won!`, this.canvasWidth / 2, this.gameOverTextWinnerY);
  this.ctx.fillRect(this.restartButtonStartX, this.restartButtonStartY, this.buttonWidth, this.buttonHeight);
  this.ctx.fillStyle = 'black';
  this.ctx.fillText('Restart Game', this.canvasWidth / 2, this.restartButtonTextY);
}


Game.prototype.checkBallCollisionPlayer = function (player) {
  this.balls.forEach(ball => {
    const collidesPlayerTop = ball.centerY - ball.radius > player.y - player.height / 2;
    const collidesPlayerBottom = ball.centerY + ball.radius < player.y + player.height / 2;
    let collidesPlayer;
    if (player.x > 50) {
      collidesPlayer = ball.centerX + ball.radius > player.x - player.width / 2;
    } else {
      collidesPlayer = ball.centerX - ball.radius < player.x + player.width / 2;
    }

    if (collidesPlayerTop && collidesPlayerBottom) {
      if (collidesPlayer) {
        ball.swapHoriDirection();
      }
    }
  });
}

Game.prototype.checkHasScored = function () {
  this.balls.forEach(ball => {
    if (ball.centerX < 20) {
      this.player2.score++;
      this.ball.updateSpeed();
      this.resetGameState();
    } else if (ball.centerX > this.canvasWidth - this.borderWidth - 1) {
      this.player1.score++;
      this.ball.updateSpeed();
      this.resetGameState();
    }
  });
}

Game.prototype.checkGameEnded = function () {
  this.players.forEach(player => {
    if (player.score >= this.maxGoals) {
      this.ended = true;
      this.destroy();
      this.endGameCallback(player);
    }
  });
}

Game.prototype.resetGameState = function () {
  this.balls.forEach(ball => {
    ball.resetPosition();
  });
}

Game.prototype.destroy = function () {
  this.clearCanvas();
}

Game.prototype.resetGame = function () {
  this.players = [];
  this.balls = [];
}

Game.prototype.buildGameOver = function (winner) {
  this.resetGame();
  this.ctx.font = '25px sans-serif';
  this.ctx.fillStyle = 'white';
  this.ctx.textAlign = 'center';
  this.ctx.fillText('Game Over', this.canvasWidth / 2, this.canvasHeight - this.canvasHeight / 2);
  this.ctx.fillText(`The player on the ${winner.side} has won!`, this.canvasWidth / 2, this.gameOverTextWinnerY);
  this.ctx.fillRect(this.restartButtonStartX, this.restartButtonStartY, this.buttonWidth, this.buttonHeight);
  this.ctx.fillStyle = 'black';
  this.ctx.fillText('Restart Game', this.canvasWidth / 2, this.restartButtonTextY);
}