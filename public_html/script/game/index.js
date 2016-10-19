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
import Hud from '../hud';
import HudButton from '../hud/button';
import Display from '../display';
// HUD button images
import HOME_BUTTON from 'graphics/hud/home.aag';
import INV_BUTTON from 'graphics/hud/inv.aag';
import MAP_BUTTON from 'graphics/hud/map.aag';

// TODO#2: create a display state management module
let currentDisplay = null;
// setCurrentDisplay(display: Display): void
//    hides the previous display and shows the given one instead
function setCurrentDisplay(display) {
  if(currentDisplay) {
    currentDisplay.hide();
  }
  currentDisplay = display.show();
}

// put the states in order
generate(function*() {
  try {
    // create all the displays here, and pass them to the state functions as needed
    // TODO#2: move display creation to the state management module
    const hud = new Hud().hide();
    const invDisplay = new Display().hide();
    const mapDisplay = new Display().hide();
    const homeDisplay = new Display();
    setCurrentDisplay(homeDisplay);
    yield* intro(homeDisplay);
    hud.show();
    yield* ballPath(homeDisplay);
    hud.addButton(new HudButton([30, 1], HOME_BUTTON, setCurrentDisplay.bind(null, homeDisplay)));
    hud.addButton(new HudButton([40, 1], MAP_BUTTON, setCurrentDisplay.bind(null, mapDisplay)));
    inventory.once('add', () => {
      // add inventory button once the inventory has something in it
      hud.addButton(new HudButton([30, 4], INV_BUTTON, setCurrentDisplay.bind(null, invDisplay)));
    });
    inventory.on('add', () => inventory.render(invDisplay));
    balls.on('change', () => homeDisplay.text(balls.thrownString(true), 1, 2));
    setCurrentDisplay(mapDisplay);
  } catch(error) {
    // game over... how did you lose this game ><
    //  - throw away your only ball during the intro
    console.error("GAME OVER!");
    if(error) {
      console.error(error);
    }
  }
});
