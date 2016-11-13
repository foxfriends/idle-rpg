// A Button can be placed over an area, making part of the map interactive to
//    mouse events.
'use strict';
import { FONT_HEIGHT } from '../const';
const [REGION, ACTIONS, ELEMENTS] = [Symbol(), Symbol(), Symbol()];

// Styles for buttons:
//  Normal - pointer cursor, no border/background
//  Ninja - text cursor: no border/background
//  Real - pointer cursor, background + border + hover state
const ButtonStyles = {
  Normal: 'normal',
  Ninja: 'ninja',
  Real: 'real'
};

// TODO#4: rethink how buttons work
class Button {
  // Button(actions: { enter?: function, move?: function: click?: function, leave?: function },
  //        region: number[4],
  //        style: ButtonStyle = Normal)
  constructor(actions, region, style = ButtonStyles.Normal) {
    this[REGION] = region;
    this[ACTIONS] = actions;
    const h = FONT_HEIGHT;
    this[ELEMENTS] = [];
    for(let i = 0; i < this[REGION][3]; ++i) {
      const el = document.createElement('SPAN');
      el.classList.add('button', style);
      el.addEventListener('mouseenter', (...args) => actions.enter && actions.enter(this, ...args) );
      el.addEventListener('mousemove', (...args) => actions.move && actions.move(this, ...args) );
      el.addEventListener('click', (...args) => actions.click && actions.click(this, ...args) );
      el.addEventListener('mouseleave', (...args) => actions.leave && actions.leave(this, ...args) );
      this[ELEMENTS].push(el);
    }
    this[ELEMENTS][0].classList.add('top');
    this[ELEMENTS][this[ELEMENTS].length - 1].classList.add('bot');
  }

  // .getElements(display: HTMLDivElement): [number, HTMLSpanElement][]
  //    sets the text contents of all the elements and returns them paired with
  //    their index in the raw text content string as an array
  getElements(display) {
    const lines = display.textContent.split('\n');
    for(let i = 0; i < this[ELEMENTS].length; ++i) {
      const el = this[ELEMENTS][i];
      el.textContent = lines[this[REGION][1] + i].substr(this[REGION][0], this[REGION][2]);
    }
    const lineLength = lines[0].length;
    return this[ELEMENTS].map((e, i) => [this[REGION][0] + (this[REGION][1] + i) * (lineLength + 1), e]);
  }

  // .intersects(region: number[4]): bool
  //    determines if this button's region intersects the given region
  intersects(region) {
    return (
      (this[REGION][0] < region[0] + region[2] && this[REGION][0] + this[REGION][2] > region[0]) &&
      (this[REGION][1] < region[1] + region[3] && this[REGION][1] + this[REGION][3] > region[1])
    );
  }
}

export { ButtonStyles, Button };
export default Button;
