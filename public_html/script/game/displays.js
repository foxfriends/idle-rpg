// Manages the displays and which is currently visible
'use strict';
import Hud from '../hud';
import Display from '../display';

let currentDisplay = null;
// set(display: Display): void
//    hides the previous display and shows the given one instead
function set(display) {
  if(currentDisplay) {
    currentDisplay.hide();
  }
  currentDisplay = display.show();
}

// the Displays (including the HUD, while technically not an actual Display)
const inv = new Display().hide();
const map = new Display().hide();
const home = new Display();

export default set;
export { inv, map, home, set };
