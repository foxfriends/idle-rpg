// Manages the current state of the game (balls, progress, stats, etc.)
'use strict';
import generate from '../util/generate';

// initialize data
import balls from '../data/balls';
import inventory from  '../data/items';

// get the different states
import intro from './intro';
import ballPath from './ball-path';

// game systems
import * as display from './displays';
import Hud from '../hud';
// HUD button images
import HOME_BUTTON from 'graphics/hud/home.aag';
import INV_BUTTON from 'graphics/hud/inv.aag';
import MAP_BUTTON from 'graphics/hud/map.aag';

// put the states in order
generate(function*() {
  try {
    const hud = new Hud().hide();
    // create all the displays here, and pass them to the state functions as needed
    display.set(display.home);
    yield* intro();
    balls.rate = 0.5;
    hud.show();
    yield* ballPath();
    hud
      .unlock(Hud.Feature.HomeButton)
      .unlock(Hud.Feature.MapButton);
    inventory.once('add', () => {
      // add inventory button once the inventory has something in it
      hud.unlock(Hud.InvButton);
    });
    inventory.on('add', () => inventory.render(display.inv));
    balls.on('change', () => display.home.text(balls.thrownString(true), 1, 2));
    display.set(display.map);
  } catch(error) {
    // game over... how did you lose this game ><
    //  - throw away your only ball during the intro
    console.error("GAME OVER!");
    if(error) {
      console.error(error);
    }
  }
});
