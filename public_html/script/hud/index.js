// Manage the HUD, showing the number of balls, menus, and other things.
'use strict';

import Display from '../display';
import hud from '../graphics/hud.aag';
const display = new Display(120, 8);
display.image(hud, 0, 0);
