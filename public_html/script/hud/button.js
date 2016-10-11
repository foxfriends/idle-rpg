// A HudButton can be added to the HUD to allow for the user to interact with it
'use strict';

class HudButton {
  // new HudButton(position: number[2], image: string, click: function)
  constructor(position, image, click) {
    this.pos = position;
    this.image = image;
    this.click = click;
  }
}

export default HudButton;
