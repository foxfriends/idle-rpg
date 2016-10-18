// Creates a promise that resolves after a timed delay. This delay is cancellable
//    and skippable by use of the wait.skip and wait.cancel. wait.reset will restart
//    the timer.
'use strict';

const [TIMEOUT, RESOLVER, REJECTOR, TIME] = [Symbol(), Symbol(), Symbol(), Symbol()];

class Wait extends Promise {
  constructor(time) {
    if(typeof time === 'function') {
      super(time);
    } else {
      let resolve, reject;
      super((res, rej) => {
        resolve = res;
        reject = rej;
      });
      this[RESOLVER] = resolve;
      this[REJECTOR] = reject;
      this[TIME] = time;
      this[TIMEOUT] = window.setTimeout(resolve, this[TIME]);
    }
  }

  cancel() {
    this[REJECTOR]();
    window.clearTimeout(this[TIMEOUT]);
    return this;
  }

  skip() {
    this[RESOLVER]();
    window.clearTimeout(this[TIMEOUT]);
    return this;
  }

  reset() {
    window.clearTimeout(this[TIMEOUT]);
    this[TIMEOUT] = window.setTimeout(this[RESOLVER], this[TIME]);
    return this;
  }
}

export default Wait;
