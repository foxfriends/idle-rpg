// Manages the state of what's being displayed on screen
'use strict';
import normalizeNewline from 'normalize-newline';
import Button from './button';
const [DIMENSIONS, CONTENT, ELEMENT, PREV_LOC, BUTTONS] = [Symbol(), Symbol(), Symbol(), Symbol(), Symbol()];

// A Display represents a new "display area" on the screen in which to draw the
//    images and text
class Display {
  // new Display(width: number = 120, height: number = 120)
  //    creates a new display area with the given dimensions.
  constructor(width = 120, height = 60) {
    this[DIMENSIONS] = { width: width, height: height };
    this[PREV_LOC] = [0, 0, 0, 0];
    this[CONTENT] = [];
    for(let i = 0; i < height; ++i) {
      this[CONTENT][i] = [];
      for(let j = 0; j < width; ++j) {
        this[CONTENT][i][j] = ' ';
      }
    }
    this[ELEMENT] = document.createElement('DIV');
    this[ELEMENT].classList.add('pre');
    this[BUTTONS] = [];
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
    const lines = img.split('\n');
    const width = lines.reduce((longest, line) => Math.max(longest, line.length), 0);
    this[PREV_LOC] = [x, y, width, y + lines.length];
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

  // .text(str: string, x: number, y: number): this
  //    draws the string str at the given location
  text(str, x, y) { return this.image(str, x, y); }

  // .repaint(): void
  //    refreshes the screen with the current content
  repaint() {
    this[ELEMENT].textContent = this[CONTENT].map((row) => row.join('')).join('\n');
    for(let button of this[BUTTONS]) { button.attach(this[ELEMENT]); }
  }

  // .destroy(): void
  //    removes the display element from the DOM
  destroy() {
    this[ELEMENT].parentNode.removeChild(this[ELEMENT]);
  }

  // .interactive(
  //    actions: { enter: function, click: function, leave: function },
  //    region: number[4] = this[PREV_LOC]
  // ): this
  //    creates a button over the given region, or the most recently drawn image
  //    or block of text if a region is not specified, which performs the
  //    actions on mouseover, click, and mouseout
  interactive(actions, region = this[PREV_LOC]) {
    this[BUTTONS].push(new Button(actions, region));
    this.repaint();
    return this;
  }

  // TODO: overlays, colours, etc
}

export default Display;
