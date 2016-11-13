// The intro scene:
//  - A button is on scren
//  - After 10 seconds of not pressing the button, your first ball falls from the sky
//  - Pressing throw button throws the only ball. You can't get any more
//  - After 10 more seconds, you can squeeze the ball and another one will come out
//  - Placing both balls in the room, they start to reproduce (1 ball / 2 seconds)
//  - Click on each ball to pick them up
//  - Once you run out of space in your hands to hold the ball organize, button appears
//  - Clean up everything, intro is over!
'use strict';
import balls from '../../data/balls';
import Display from '../../display';
import { ButtonStyles } from '../../display/button';
import { infoPopup } from '../../display/button-action';
import Wait from '../../util/wait';
import pad from '../../util/pad';
import { home as display } from '../displays';

export default function*() {
  // wait 10 seconds for first ball
  const firstBall = new Wait(10000);
  display.text('Throw?', 0, 0).createButton( { // TODO#5: i18n
    click() { firstBall.reset(); }
  }, ButtonStyles.Real );
  yield firstBall;
  balls.amount = 1;
  // wait 10 seconds for more options
  const squeezeButton = new Wait(10000);
  display.clear()
    .text('A ball falls from the sky.', 0, 0) // TODO#5: i18n
    .text(balls.toString(true), 0, 1)
    .text('Throw', 0, 2).createButton( { // TODO#5: i18n
      click() {
        balls.throw();
        squeezeButton.cancel();
        display
          .clear()
          .text(balls.toString(true), 0, 1)
          .text('You have thrown away your only ball.', 0, 2).removeButton(); // TODO#5: i18n
      } }, ButtonStyles.Real );
  yield squeezeButton;
  // show the squeeze button
  // TODO#1: make this a 'progress' button when that helper is created
  display.text('Squeeze', 0, 3).createButton( { click() { balls.amount = 2; } }, ButtonStyles.Real ); // TODO#5: i18n
  yield balls.when(2);
  // wait for the player to throw away the balls
  display.clear()
    .text('You squeeze the ball, and another one pops out.', 0, 0) // TODO#5: i18n
    .text(balls.toString(true), 0, 1)
    .text('Throw', 0, 2).createButton( { // TODO#5: i18n
      click() {
        balls.throw();
        display
          .text(balls.toString(true), 0, 1)
          .text(balls.thrownString(true), 0, 3);
      } }, ButtonStyles.Real );
  yield balls.when(0);
  // all the balls have been thrown
  display.text('The balls roll away together.', 0, 4); // TODO#5: i18n
  // reproduction starts
  const ballsOnScreen = new Set();
  let makeBall = true;
  const ticker = balls.on('tick', () => {
    // make a ball on screen every 2 seconds
    if(!(makeBall = !makeBall)) { return; }
    if(ballsOnScreen.size >= 50) {
      // limit balls to 50 on the ground
      return display.text(pad('There are balls everywhere.', display.width), 0, 5); // TODO#5: i18n
    }
    display.text(pad('The balls start to reproduce.', display.width), 0, 5); // TODO#5: i18n
    // add a ball to the screen
    let pos;
    while(ballsOnScreen.has((pos = [
      Math.floor(Math.random() * 120),
      Math.floor(Math.random() * 35) + 10
    ]).join('x')));
    ballsOnScreen.add(pos.join('x'));
    display.text('o', pos[0], pos[1]);
    if(balls.amount < 10) {
      // can't pick up the new balls once you have 10
      display.createButton({
        click() {
          // pick up the balls on click
          ballsOnScreen.delete(pos.join('x'));
          balls.amount++;
          display.text(' ', pos[0], pos[1]).removeButton();
        }
      });
    }
  });
  const counter = balls.on('change', () => display.text(balls.toString(true), 0, 1));
  yield balls.when(10);
  // TODO#1: make this a 'progress' button when the helper function is created
  yield new Promise((resolve) => {
    display
      .text(`You can't carry any more balls.`, 0, 6)
      .text('Organize', 0, 2).removeButton().createButton({
        click() {
          // clear all the things
          balls.amount += ballsOnScreen.size;
          display.clear();
          resolve();
        }
      }, ButtonStyles.Real )
      // stop letting balls be picked up
      .removeButton([0, 10, display.width, 35]);
  });
  balls.off('change', counter);
  balls.off('tick', ticker);
  // intro is over!
}
