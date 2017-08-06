// The ball-path stage:
//  - Throw balls, which form a path
//  - Once enough balls are thrown, can walk down the path to a town
'use strict';
import balls from '../../data/balls';
import { ButtonStyles } from '../../display/button';
import { progress } from '../../display/button-action';
import { home as display } from '../displays';

import PATH_IMAGE from 'graphics/path.aag';

import Deferred from '../../util/deferred';

const pathParts = PATH_IMAGE.split(/[oO0]/);

export default async function() {
  // throw balls
  display.text('Throw', 1, 1).button({ click() { balls.throw(); } }, ButtonStyles.Real); // TODO#5: i18n
  const before = balls.thrown;
  const pathBuilder = balls.on('throw', () => {
    const parts = balls.thrown - before;
    display.image(pathParts.slice(0, parts + 1).join('o'), 0, 3);
  });
  await balls.when.thrown(before + pathParts.length); // throw enough balls to make the path
  balls.off('throw', pathBuilder);
  // TODO#1: create a helper function to make creating 'progress' buttons cleaner
  let followPath = new Deferred();
  display
    .text('-->', 117, 40)
    .button(progress(followPath), undefined, [117, 38, 3, 4]);
  await followPath;
  // remove the path from the home screen
  display
    .clear()
    .text('Throw', 1, 1).button({ click() { balls.throw(); } }, ButtonStyles.Real) // TODO#5: i18n
    .text(balls.thrownString(true), 1, 2);
}
