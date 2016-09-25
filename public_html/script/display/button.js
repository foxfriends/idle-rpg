// A Button can be placed over an area, making part of the map interactive to
//    mouse events.
'use strict';

const [REGION, ACTIONS, ELEMENT] = [Symbol(), Symbol(), Symbol()];

class Button {
  // Button(region: number[4], actions: { click: function, enter: function, leave: function });
  constructor(actions, region) {
    this[REGION] = region;
    this[ACTIONS] = actions;
    this[ELEMENT] = document.createElement('SPAN');
    this[ELEMENT].classList.add('button');
    this[ELEMENT].addEventListener('mouseover', (...args) => actions.enter && actions.enter(...args) );
    this[ELEMENT].addEventListener('click', (...args) => actions.click && actions.click(...args) );
    this[ELEMENT].addEventListener('mouseout', (...args) => actions.leave && actions.leave(...args) );
    this[ELEMENT].style.width = `${region[2]}ch`;
    this[ELEMENT].style.height = `${region[3]}em`;
    this[ELEMENT].style.left = `${region[0]}ch`;
    this[ELEMENT].style.top = `${region[1]}em`;
  }

  // .attach(display: HTMLDivElement)
  //    creates the actual interactive areas for this button over the text in
  //    the given div
  attach(display) {
    display.appendChild(this[ELEMENT]);
  }
}

export default Button;
