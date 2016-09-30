// A Button can be placed over an area, making part of the map interactive to
//    mouse events.
'use strict';
import { FONT_HEIGHT } from '../const';
const [REGION, ACTIONS, ELEMENT] = [Symbol(), Symbol(), Symbol()];

// Styles for buttons:
//  Normal - pointer cursor, no border/background
//  Ninja - text cursor: no border/background
//  Real - pointer cursor, background + border + hover state
const ButtonStyles = {
  Normal: 'normal',
  Ninja: 'ninja',
  Real: 'real'
};

class Button {
  // Button(actions: { enter: function, click: function, leave: function }, region: number[4], style: ButtonStyle = Normal);
  constructor(actions, region, style = ButtonStyles.Normal) {
    this[REGION] = region;
    this[ACTIONS] = actions;
    this[ELEMENT] = document.createElement('SPAN');
    this[ELEMENT].classList.add('button', style);
    this[ELEMENT].addEventListener('mouseover', (...args) => actions.enter && actions.enter(...args) );
    this[ELEMENT].addEventListener('click', (...args) => actions.click && actions.click(...args) );
    this[ELEMENT].addEventListener('mouseout', (...args) => actions.leave && actions.leave(...args) );
    const h = FONT_HEIGHT;
    this[ELEMENT].style.width = `${region[2]}ch`;
    this[ELEMENT].style.height = `${region[3] * h}px`;
    this[ELEMENT].style.left = `${region[0]}ch`;
    this[ELEMENT].style.top = `${region[1] * h}px`;
  }

  // .attach(display: HTMLDivElement): void
  //    adds the actual interactive area for this button over the text as an
  //    overlay on the given div
  attach(display) {
    if(this[ELEMENT].classList.contains('real')) {
      const lines = display.textContent.split('\n');
      this[ELEMENT].textContent = '';
      for(let i = 0; i < this[REGION][3]; ++i) {
        this[ELEMENT].textContent += lines[this[REGION][1] + i].substr(this[REGION][0], this[REGION][2]) + '\n';
      }
    }
    display.appendChild(this[ELEMENT]);
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
