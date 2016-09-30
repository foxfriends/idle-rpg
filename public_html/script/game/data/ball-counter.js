// A BallCounter manages the available balls
'use strict';

const [RATE, AMOUNT, THROWN, ON] = [Symbol(), Symbol(), Symbol(), Symbol()];

class BallCounter {
  // new BallCounter()
  constructor() {
    this[RATE] = 0;
    this[AMOUNT] = 0;
    this[THROWN] = 0;
    this[ON] = {};
    window.setInterval(() => {
      this[AMOUNT] += this.rate;
      this.trigger('tick');
      this.trigger('change');
    }, 1000);
  }

  // .amount: number
  //    the number of balls currently available to be used
  get amount() { return Math.floor(this[AMOUNT]); }
  set amount(amount) {
    this[AMOUNT] = amount;
    this.trigger('change');
  }
  // .rate: number
  //    the number of balls that are gained per second
  get rate() { return this[RATE]; }
  set rate(rate) { this[RATE] = rate; }

  // .throw(): void
  //    throws a ball away ( -1 ball, +1 thrown )
  throw() {
    if(this.amount) {
      --this.amount;
      ++this.thrown;
      this.trigger('throw');
      this.trigger('change');
    }
  }

  // .thrown: number
  //    the number of balls that have been thrown away
  get thrown() { return this[THROWN]; }
  set thrown(thrown) { this[THROWN] = thrown; }

  // .when(amount: number): Promise<void>
  // .when(min: number, max: number): Promise<void>
  //    returns a promise that resolves when the required amount of balls is
  //    reached, or when the number of balls lies within a range
  when(min, max = min) {
    return new Promise((resolve) => {
      const checker = () => {
        if(this.amount >= min && this.amount <= max) {
          this.off('change', checker);
          resolve();
        }
      };
      this.on('change', checker);
    });
  }

  // Events:
  //  tick - synchronized when the ball count goes up
  //  throw - when the throw button is clicked
  //  change - any time the ball count changes

  // .on(event: string, handler: function): [handler]
  //    adds a handler for a given event
  on(event, handler) {
    this[ON][event] = this[ON][event] || [];
    this[ON][event].push(handler);
    return handler;
  }

  // .off(event: string, handler: function): void
  //    removes a specific handler from a given event
  off(event, handler) {
    this[ON][event] = this[ON][event].filter((fn) => fn !== handler);
  }

  // .trigger(event: string): void
  //    triggers an event, calling all handlers
  trigger(event) {
    for(let f of this[ON][event] || []) { f(); }
  }
}

export default BallCounter;
