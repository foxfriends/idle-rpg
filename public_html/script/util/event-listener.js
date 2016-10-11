'use strict';
const [ON] = [Symbol()];

class EventListener {
  constructor() {
    this[ON] = {};
  }
  // .on(event: string, handler: function): function
  //    adds a handler for a given event. Returns the reference to the handler
  //    that was attached so it can be removed with off()
  on(event, handler) {
    this[ON][event] = this[ON][event] || [];
    this[ON][event].push(handler);
    return handler;
  }

  // .once(event: string, handler: function): function
  //    adds a handler for the given event, and removes it once it triggers.
  //    Returns the reference to the handler that was attached so it can be
  //    removed with off()
  once(event, handler) {
    const oncehandler = this.on(event, () => {
      handler();
      this.off(event, oncehandler);
    });
    return oncehandler;
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

export default EventListener;
