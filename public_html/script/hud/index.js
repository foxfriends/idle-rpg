// Manage the HUD, showing the number of balls, menus, and other things.
'use strict';

import Display from '../display';
import balls from '../data/balls';
import HUD_IMAGE from '../graphics/hud.aag';

class Hud {
  constructor() {
    this.display = new Display(120, 8);
    this.display
      .image(HUD_IMAGE, 0, 0)
      .text(balls.toString(), 2, 1);
    balls.on('change', () => {
      this.display.text(balls.toString(), 2, 1);
    });
  }
}

export default Hud;
