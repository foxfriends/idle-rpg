// The main (regular) ball counter
'use strict';
import Counter from './counter';
const balls = new Counter();
export default balls;

// HACK: debug functions
window.setTimeout(() => window.debug.setBalls = x => balls.amount = x, 0);
window.setTimeout(() => window.debug.setThrown = x => balls.thrown = x, 0);
