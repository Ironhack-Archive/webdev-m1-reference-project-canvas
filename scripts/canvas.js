'use strict';

class Canvas {
  constructor (container, width, height) {
    this.canvasElement = document.createElement('canvas');
    this.canvasElement.setAttribute('width', width);
    this.canvasElement.setAttribute('height', height);

    this.container = container;
    this.container.appendChild(this.canvasElement);

    this.ctx = this.canvasElement.getContext('2d');
  }
}
