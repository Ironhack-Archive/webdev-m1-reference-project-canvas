'use strict';

function Canvas(container, width, height) {
  this.canvasElement = document.createElement('canvas');
  this.canvasElement.setAttribute('width', width);
  this.canvasElement.setAttribute('height', height);

  this.container = container;
  this.ctx = this.canvasElement.getContext('2d');
}

Canvas.prototype.addCanvasToScreen = function() {
  this.container.appendChild(this.canvasElement);
}