// Creates a promise that resolves after a timed delay. This delay is cancellable
//    and skippable by use of the wait.skip and wait.cancel. wait.reset will restart
//    the timer.
'use strict';

function wait(time) {
  let timeout, res, rej;
  const pr = new Promise((resolve, reject) => {
    timeout = window.setTimeout(resolve, time);
    res = resolve;
    rej = reject;
  });
  pr.cancel = () => {
    window.clearTimeout(timeout);
    rej();
    return pr;
  };
  pr.skip = () => {
    window.clearTimeout(timeout);
    res();
    return pr;
  };
  pr.reset = () => {
    window.clearTimeout(timeout);
    timeout = window.setTimeout(res, time);
    return pr;
  };
  return pr;
}

export default wait;
