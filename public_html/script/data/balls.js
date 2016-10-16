// The main (regular) ball counter
'use strict';
import Counter from './counter';
const balls = new Counter();
export default balls;

window.setTimeout(() => window.debug.setBalls = x => balls.amount = x, 0);
