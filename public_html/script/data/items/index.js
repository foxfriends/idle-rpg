// Manages the item system, and tracks the items that the player owns
'use strict';

import Item from './item';
import Inventory from './inventory';

import GUITAR from 'graphics/items/guitar.aag';

// All the Items that can be obtained
const Items = {
  Guitar: new Item('Guitar', 'An old guitar you\nfound in a hole.', GUITAR)
};

export default new Inventory();
export { Items };
