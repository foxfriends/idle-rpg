// Manages the current location in the world and draws that location on the map
//     display
'use strict';

import {infoPopup as info} from '../display/button-action';

import HOUSE_NORMAL from 'graphics/town/house/normal.aag';
import HOUSE_REVERSE from 'graphics/town/house/reverse.aag';
import HOUSE_GARDEN from 'graphics/town/house/garden.aag';
import HOUSE_DOUBLE from 'graphics/town/house/double.aag';
import SHOPFRONT from 'graphics/town/shopfront.aag';

const [DISPLAY, LOCATION] = [Symbol(), Symbol()];

class MapView {
  // MapView(display: Display)
  constructor(display) {
    this[DISPLAY] = display;
    this[LOCATION] = 'town0x0';
    this.render();
  }

  // .location: string
  //      the player's current location on the map
  get location() {
    return this[LOCATION];
  }
  set location(location) {
    this[LOCATION] = location;
  }

  // .town0x0(): void
  //    draws the the north-west corner of the town
  town0x0() {
    this[DISPLAY]
      .text('_'.repeat(120), 0, 7)
      .text('_'.repeat(120), 0, 8)
      .image(HOUSE_NORMAL, 3, 1, false, '.')
        .button(info('A house'))
      .image(HOUSE_REVERSE, 22, 1, false, '.')
        .button(info('A house'))
      .image(HOUSE_GARDEN, 40, 0, false, '.')
        .button(info('A house with\na nice garden'))
      .image(HOUSE_DOUBLE, 58, 1, false, '.')
        .button(info('Two houses\nin one'))
      .image(HOUSE_NORMAL, 94, 1, false, '.')
        .button(info('A house'))
      .text('/ /', 41, 7)
      .image(SHOPFRONT, 5, 10)
        .button(info('Shop'));
  }

  // .render(): this
  //    updates what is currently shown on the display
  render() {
    this[this[LOCATION]]();
  }
}

export default MapView;
