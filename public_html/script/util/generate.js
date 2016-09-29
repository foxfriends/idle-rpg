/* (generator: Generator([...T]) => S, thisArg: any, ...args: [, ...T]) => Promise<S>

  Automatically progresses Promise based generators as their values become
  available.

  Basically a wrapper around generators to make them work like async functions.
*/
'use strict';
export default (generator, that, ...args) => new Promise((resolve, reject) => {
    const run = generator.call(that, ...args);
    // run the next step of the generator
    const pass = (args) => run.next(args);
    const fail = (error) => run.throw(error);
    // prepare for the next result
    const next = ({done, value}) => {
      if(done) { return resolve(value); }
      value
        .then(pass, fail)
        .then(next, reject);
    };
    // start the generator
    next(run.next());
  });
