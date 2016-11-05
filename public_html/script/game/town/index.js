// Go to the town?
'use strict';

import { map as display } from '../displays';
import TOWN_IMAGE from 'graphics/town-0-0.aag';

export default function*() {
  display.image(TOWN_IMAGE, 0, 0);
  yield;
}
