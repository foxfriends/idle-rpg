// Manages the current state of the game (balls, progress, stats, etc.)
'use strict';
// initialize data
import balls from '../data/balls';
import inventory from  '../data/items';

// get the different states
import intro from './intro';
import ballPath from './ball-path';
import town from './town';

// game systems
import hud from '../hud';
import map from '../map';
import * as display from './displays';
// HUD button images
import HOME_BUTTON from 'graphics/hud/home.aag';
import INV_BUTTON from 'graphics/hud/inv.aag';
import MAP_BUTTON from 'graphics/hud/map.aag';

// put the states in order
(async function() {
  try {
    // create all the displays here, and pass them to the state functions as needed
    display.set(display.home);
    await intro();
    // create the hud and attach it to its display
    hud.attach(display.hud);
    balls.rate = 0.5;
    hud.show();
    await ballPath();
    hud
      .unlock(hud.Feature.HomeButton)
      .unlock(hud.Feature.MapButton);
    inventory.once('add', () => {
      // add inventory button once the inventory has something in it
      display.hud.unlock(hud.InvButton);
    });
    inventory.on('add', () => inventory.render(display.inv));
    balls.on('change', () => display.home.text(balls.thrownString(true), 1, 2));
    display.set(display.map);
    // create the map view and attach it to the display
    map.attach(display.map);
    await town();
  } catch(error) {
    // game over... how did you lose this game ><
    //  - throw away your only ball during the intro
    console.error("GAME OVER!");
    if(error) {
      console.error(error);
    }
  }
})();
