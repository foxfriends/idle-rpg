'use strict';
import Display from '../display';
import ball from '../graphics/ball.aag';

const display = new Display();
display.image(ball, 5, 5).interactive({ click() { console.log('3'); } });
