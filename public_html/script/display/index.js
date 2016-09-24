// Manages the state of what's being displayed on screen
'use strict';
import normalizeNewline from 'normalize-newline';
const [DIMENSIONS, CONTENT, ELEMENT] = [Symbol(), Symbol(), Symbol()];

// A Display represents a new "display area" on the screen in which to draw the
//    images and text
class Display {
  // new Display(width: number, height: number)
  //    creates a new display area with the given dimensions.
  constructor(width, height) {
    this[DIMENSIONS] = { width: width, height: height };
    this[CONTENT] = [];
    for(let i = 0; i < height; ++i) {
      this[CONTENT][i] = [];
      for(let j = 0; j < width; ++j) {
        this[CONTENT][i][j] = ' ';
      }
    }
    this[ELEMENT] = document.createElement('DIV');
    this[ELEMENT].classList.add('pre');
    document.querySelector('#game').appendChild(this[ELEMENT]);
    this.repaint();
  }

  // .image(img: ASCIIArt, x: number, y: number): this
  //    places the img at the specified position in the display area,
  //    overwriting previous content. The background character is not drawn
  //    by default. Ensure images are saved with Unix file endings (LF, not
  //    CRLF) or there will be too much spacing.
  image(img, x, y, showBack = false, background = ' ') {
    img = normalizeNewline(img);
    const width = img.split('\n').reduce((longest, line) => Math.max(longest, line.length), 0);
    for(let line of img.split('\n')) {
      for(let i = 0; i < width; ++i) {
        if(x + i >= this[DIMENSIONS].width) { break; }
        const char = line[i] || background;
        if(showBack || char !== background) {
          this[CONTENT][y][x + i] = char;
        }
      }
      if(++y >= this[DIMENSIONS].height) { break; }
    }
    this.repaint();
    return this;
  }

  // .repaint(): void
  //    refreshes the screen with the current content
  repaint() {
    this[ELEMENT].innerHTML = this[CONTENT].map((row) => row.join('')).join('\n');
  }

  // .destroy(): void
  //    removes the display element from the DOM
  destroy() {
    this[ELEMENT].parentNode.removeChild(this[ELEMENT]);
  }

  // TODO: interactive areas (clickable, hoverable, etc)
  // TODO: overlays, colours, etc
  // TODO: dynamic text
}

export default Display;
