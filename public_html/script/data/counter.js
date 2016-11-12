// A Counter manages the number of balls you have, how fast they are growing,
//    and how many have been thrown, providing events to react to changes in
//    the ball count
'use strict';
import EventListener from '../util/event-listener';

const [UNIT, RATE, AMOUNT, THROWN] = [Symbol(), Symbol(), Symbol(), Symbol()];

class Counter extends EventListener {
  // Events:
  //  tick - synchronized when the ball count goes up
  //  throw - when the throw button is clicked
  //  change - any time the ball count changes

  // new Counter(unit: string = 'ball')
  constructor(unit = 'ball') { // TODO#5: i18n
    super();
    this[UNIT] = unit;
    this[RATE] = 0;
    this[AMOUNT] = 0;
    this[THROWN] = 0;
    window.setInterval(() => {
      const prev = this.amount;
      this[AMOUNT] += this.rate;
      this.trigger('tick');
      if(prev !== this.amount) {
        this.trigger('change');
      }
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
  // .when.thrown(amount: number): Promise<void>
  // .when.thrown(min: number, max: number): Promise<void>
  //    returns a promise that resolves when the required amount of balls is
  //    reached, or when the number of balls lies within a range. Calling the
  //    thrown version will do the same but with the number of balls thrown
  //    rather than owned.
  get when() {
    const fn = (type, min, max = min) => {
      return new Promise((resolve) => {
        const checker = this.on('change', () => {
          if(this[type] >= min && this[type] <= max) {
            this.off('change', checker);
            resolve();
          }
        });
        checker();
      });
    };
    const when = fn.bind(this, 'amount');
    when.thrown = fn.bind(this, 'thrown');
    return when;
  }

  // .toString(longForm: boolean = false): string
  //    returns a human readable description of how many balls you have. The
  //    long form is even more human readable.
  toString(longForm = false) {
    // TODO#5: i18n
    return longForm ?
      `You have ${this.amount} ${this[UNIT]}${this.amount === 1 ? '' : 's'}. ` :
      `${this[UNIT][0].toUpperCase()}${this[UNIT].slice(1)}s: ${this.amount} `;
  }

  // .thrownString(longForm: boolean = false): string
  //    returns a human readable description of how many balls you have thrown.
  //    The long form is even more human readable.
  thrownString(longForm = false) {
    // TODO#5: i18n
    return longForm ?
      `You have thrown away ${this.thrown} ${this[UNIT]}${this.thrown === 1 ? '' : 's'}. ` :
      `${this[UNIT][0].toUpperCase()}${this[UNIT].slice(1)}s thrown: ${this.thrown} `;
  }
}

export default Counter;
