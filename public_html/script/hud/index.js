// Manage the HUD, showing the number of balls, menus, and other things.
'use strict';

import Display from '../display';
import balls from '../data/balls';
import HUD_IMAGE from 'graphics/hud/hud.aag';

const [BUTTONS, DISPLAY, RENDER] = [Symbol(), Symbol(), Symbol()];

class Hud {
  // new Hud()
  constructor() {
    this[DISPLAY] = new Display(120, 8);

    balls.on('change', () => {
      this[DISPLAY].text(balls.toString(), 2, 1);
    });

    this[BUTTONS] = [];
  }

  // .unlock(button: HudButton): void
  //    adds a button to the Hud
  addButton(button) {
    this[BUTTONS].push(button);
    this[RENDER]();
  }

  // .[RENDER](): void
  //    re-renders the Hud on its display
  [RENDER]() {
    this[DISPLAY]
      .clear()
      .image(HUD_IMAGE, 0, 0)
      .text(balls.toString(), 2, 1);
    for(let button of this[BUTTONS]) {
      this[DISPLAY]
        .image(button.image, ...button.pos)
        .createButton({ click: button.click });
    }
  }

  // .hide(): this
  //    hides the Hud's display
  hide() {
    this[DISPLAY].hide();
    return this;
  }

  // .show(): this
  //    shows the Hud's display
  show() {
    this[DISPLAY].show();
    this[RENDER]();
    return this;
  }
}

export default Hud;
