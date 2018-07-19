'use strict';

function Ball(ctx, canvasWidth, canvasHeight) {
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

Ball.prototype.draw = function () {
  this.ctx.fillStyle = 'white';
  this.ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI);
  this.ctx.fill();
}

Ball.prototype.resetPosition = function () {
  this.centerX = this.canvasWidth / 2;
  this.centerY = this.canvasHeight / 2;
}

Ball.prototype.swapVertDirection = function () {
  this.directionV = -this.directionV;
}

Ball.prototype.swapHoriDirection = function () {
  this.directionH = -this.directionH;
}

Ball.prototype.update = function () {
  this.centerY = (this.directionV * this.speed) + this.centerY;
  this.centerX = (this.directionH * this.speed) + this.centerX;
}

Ball.prototype.updateSpeed = function () {
  this.speed++;
}