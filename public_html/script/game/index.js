// Manages the current state of the game (balls, progress, stats, etc.)
'use strict';
import generate from '../util/generate';

// initialize data
import './data/balls';

// get the different states
import intro from './intro';

// put the states in order
generate(function*() {
  try {
    yield* intro();
  } catch(_) {
    // Game over... how did you lose this game ><
    //  - Throwing away your only ball during the intro
    console.error("GAME OVER!");
  }
});
