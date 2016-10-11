// An Inventory keeps track of the items currently owned by the player
'use strict';
import EventListener from '../../util/event-listener';

const [ITEMS] = [Symbol()];

class Inventory extends EventListener {
  // Events:
  //  add - when an item is acquired

  // new Inventory()
  constructor() {
    super();
    this[ITEMS] = new Set();
  }

  // .add(item: Item): void
  //    adds the item to the list of owned items
  add(item) {
    this[ITEMS].add(item);
    this.trigger('add');
  }

  // .when(item: Item): Promise<void>
  //    returns a promise that resolves when the required item is acquired
  when(item) {
    return new Promise((resolve, reject) => {
      const listener = this.on('add', () => {
        if(this[ITEMS].has(item)) {
          resolve();
          this.off('add', listener);
        }
      });
      listener();
    });
  }

  // .render(display: Display): void
  //    renders the Inventory on a display, showing the list of items owned
  render(display) {
    let [x, y] = [0, 0];
    for(let item of this[ITEMS]) {
      item.render(display, x, y);
      y += 8;
    }
  }
}

export default Inventory;
