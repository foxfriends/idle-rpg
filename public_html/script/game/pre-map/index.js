// The pre-map stage:
//  - Throw balls, eventually they form an arrow on the ground
//  - Dig where they point and find a guitar
'use strict';
import balls from '../../data/balls';
import inventory, { Items } from '../../data/items';
import Display from '../../display';
import { ButtonStyles } from '../../display/button';
import wait from '../../util/wait';
import arrow from '../../graphics/arrow.aag';
import hole from '../../graphics/hole.aag';

const DIG_BUTTON_LOCATION = [21, 13, 1, 1];

export default function*(display) {
  // TODO: rework all this because this was mostly to test the inventory thing
  display.text('Throw', 1, 1).createButton({ click() { balls.throw(); } }, ButtonStyles.Real);
  yield balls.when.thrown(balls.thrown + 10); // throw 10 more balls
  const dig = new Promise((resolve) => {
    // click at the end of the arrow to dig the hole
    display
      .image(arrow, 10, 7)
      .createButton({ click: resolve }, ButtonStyles.Ninja, DIG_BUTTON_LOCATION);
  });
  yield dig;
  display
    .image(hole, DIG_BUTTON_LOCATION[0], DIG_BUTTON_LOCATION[1] - 1)
    .removeButton()
    .text('*', DIG_BUTTON_LOCATION[0] + 1, DIG_BUTTON_LOCATION[1])
    .createButton({
      click() { inventory.add(Items.Guitar); }
    });
  // click the * in the hole and get the guitar
  yield inventory.when(Items.Guitar);
  display
    .image(hole, DIG_BUTTON_LOCATION[0], DIG_BUTTON_LOCATION[1] - 1, true)
    .removeButton();
}
