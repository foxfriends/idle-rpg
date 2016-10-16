// A 'Deferred' promise is a Promise which can be resolved from the outside
'use strict';

class Deferred extends Promise {
  // new Deferred();
  constructor() {
    super((res, rej) => {
      this.resolve = res;
      this.reject = rej;
    });
  }
}

export default Deferred;
