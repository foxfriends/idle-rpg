// The intro scene:
//  - A button is on scren
//  - After 10 seconds of not pressing the button, your first ball appears
'use strict';
import balls from '../data/balls';
import Display from '../../display';
import { ButtonStyles } from '../../display/button';

export default function*() {
  const display = new Display();
  yield new Promise((resolve) => {
    let timer = 0;
    display.text('Throw', 0, 0).interactive( { click() { timer = 0; } }, ButtonStyles.Real );
    const interval = window.setInterval(() => {
      if(++timer == 10) { resolve(); }
    }, 1000);
  });
  balls.rate = 1;
  yield balls.when(1);
  display.clear()
    .text(`You have ${balls.amount} balls`, 0, 0)
    .text('Throw', 0, 1).interactive( { click: balls.throw.bind(balls) }, ButtonStyles.Real );
  const ballCounter = balls.on('change', () => {
    display.fill(' ', 0, 0, display.width, 1).text(`You have ${balls.amount} balls`, 0, 0);
  });
}
