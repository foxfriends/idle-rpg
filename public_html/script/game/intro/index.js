// The intro scene:
//  - A button is on scren
//  - After 10 seconds of not pressing the button, your first ball falls from the sky
//  - Pressing throw button throws the only ball. You can't get any more
//  - After 10 more seconds, you can squeeze the ball and another one will come out
//  - Placing both balls in the room, they start to reproduce (1 ball/second)
'use strict';
import balls from '../data/balls';
import Display from '../../display';
import { ButtonStyles } from '../../display/button';
import wait from '../../util/wait';

function ballCount() {
  return `You have ${balls.amount} ball${balls.amount === 1 ? '' : 's'}.`;
}

export default function*() {
  const display = new Display();
  // wait 10 seconds for first ball
  const firstBall = wait(10000);
  display.text('Throw?', 0, 0).createButton( {
    click() { firstBall.reset(); }
  }, ButtonStyles.Real );
  yield firstBall;
  balls.amount = 1;
  // wait 10 seconds for more options
  const squeezeButton = wait(10000);
  display.clear()
    .text('A ball falls from the sky.', 0, 0)
    .text(ballCount(), 0, 1)
    .text('Throw', 0, 2).createButton( {
      click() {
        balls.throw();
        squeezeButton.cancel();
        display
          .text(ballCount(), 0, 1)
          .text('You have thrown away your only ball.', 0, 2).removeButton();
      } }, ButtonStyles.Real );
  yield squeezeButton;
  // show the squeeze button
  display.text('Squeeze', 0, 3).createButton( { click() { balls.amount = 2; } }, ButtonStyles.Real );
  yield balls.when(2);
  // place the two balls in a room and start reproduction
  display.clear()
    .text('You squeeze the ball, and another one pops out', 0, 0)
    .text(ballCount(), 0, 1)
    .text('Throw', 0, 2).createButton( {
      click() {
        balls.throw();
        display
          .fill(' ', 0, 1, display.width, 1)
          .text(ballCount(), 0, 1);
      } }, ButtonStyles.Real );
}
