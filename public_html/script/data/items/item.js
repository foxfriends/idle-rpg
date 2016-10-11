// An Item bundles related information about an item
'use strict';

import { infoPopup } from '../../display/button-action';

class Item {
  // new Item(name: string, description: string, image: string)
  constructor(name, description, image) {
    this.name = name;
    this.description = description;
    this.image = image;
  }

  // .render(display: Display): void
  //    renders the item on the given display
  render(display, x, y) {
    display
      .image(this.image, x + 1, y + 1)
      .createButton(infoPopup(this.name + '\n' + this.description));
  }
}

export default Item;
