'use strict';

class Ball {
  constructor (ctx, canvasWidth, canvasHeight) {
    this.ctx = ctx;
    this.centerX = canvasWidth / 2;
    this.centerY = canvasHeight / 2;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.radius = 10;
    this.directionV = 1;
    this.directionH = 1;
    this.speed = 2;
  }

  draw () {
    this.ctx.fillStyle = 'white';
    this.ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  resetPosition () {
    this.centerX = this.canvasWidth / 2;
    this.centerY = this.canvasHeight / 2;
  }

  swapVertDirection () {
    this.directionV = -this.directionV;
  }

  swapHoriDirection () {
    this.directionH = -this.directionH;
  }

  update () {
    this.centerY = (this.directionV * this.speed) + this.centerY;
    this.centerX = (this.directionH * this.speed) + this.centerX;
  }

  updateSpeed () {
    this.speed++;
  }
}
