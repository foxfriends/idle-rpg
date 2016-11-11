// Manage the HUD, showing the number of balls, menus, and other things.
'use strict';

import * as display from '../game/displays';
import balls from '../data/balls';
import HudButton from './button';

import HUD_IMAGE from 'graphics/hud/hud.aag';
import HOME_BUTTON from 'graphics/hud/home.aag';
import INV_BUTTON from 'graphics/hud/inv.aag';
import MAP_BUTTON from 'graphics/hud/map.aag';

const [BUTTONS, DISPLAY, RENDER] = [Symbol(), Symbol(), Symbol()];

// the HUD features to be unlocked with hud.unlock()
const FEATURES = {
  HomeButton: Symbol(),
  MapButton: Symbol(),
  InvButton: Symbol()
};

class Hud {
  // new Hud(display: Display)
  constructor(display) {
    this[DISPLAY] = display;
    this[DISPLAY].remove().attach(true);

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
        .button({ click: button.click });
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

  // .unlock(feature: HudFeature): this
  //    unlocks a new feature of the HUD
  unlock(feature) {
    switch(feature) {
      case Hud.Feature.HomeButton:
        this.addButton(new HudButton([30, 1], HOME_BUTTON, display.set.bind(null, display.home)));
        break;
      case Hud.Feature.MapButton:
        this.addButton(new HudButton([40, 1], MAP_BUTTON, display.set.bind(null, display.map)));
        break;
      case Hud.Feature.InvButton:
        this.addButton(new HudButton([30, 4], INV_BUTTON, display.set.bind(null, display.inv)));
        break;
    }
    return this;
  }

  // Hud.Feature: { [string]: HudFeature }
  //    the features of the HUD that can be unlocked with .unlock()
  static get Feature() {
    return FEATURES;
  }
}

export default Hud;
