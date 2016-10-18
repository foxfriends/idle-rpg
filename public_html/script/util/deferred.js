// A 'Deferred' promise is a Promise which can be resolved from the outside
'use strict';

const [RESOLVER, REJECTOR] = [Symbol(), Symbol()];

class Deferred extends Promise {
  // new Deferred();
  constructor(resolver = () => {}) {
    let resolve, reject;
    super((res, rej) => {
      resolve = res;
      reject = rej;
      resolver(resolve, reject);
    });
    this[RESOLVER] = resolve;
    this[REJECTOR] = reject;
  }

  get resolve() { return this[RESOLVER]; }
  get reject() { return this[REJECTOR]; }
}

export default Deferred;
