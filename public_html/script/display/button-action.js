// Some common behaviours for buttons to have
'use strict';

// infoPopup(text: string): ButtonAction
//    makes a button action that shows some text in a popup when the mouse is
//    over the button
function infoPopup(text) {
  const box = document.createElement('span');
  box.classList.add('popup');
  box.innerHTML = text;
  return {
    enter(_, event) {
      event.target.parentNode.appendChild(box);
    },
    move(_, event) {
      box.style.left = event.clientX - event.target.parentNode.getBoundingClientRect().left + 'px';
      box.style.top = event.clientY - event.target.parentNode.getBoundingClientRect().top + 'px';
    },
    leave() { box.parentNode.removeChild(box); }
  };
}

// progress(deferred: Deferred): ButtonAction
//    makes a button action that resolves the given deferred Promise
function progress(deferred) {
  return { click: deferred.resolve };
}

// combine(...buttons: ButtonAction[]): ButtonAction
//    combines multiple button actions into one
function combine(...buttons) {
  return new Proxy({}, {
    get(target, prop) {
      return () => {
        for(let button of buttons) {
          const noop = () => {};
          (button[prop] || noop)();
        }
      };
    }
  });
}

export { infoPopup, progress };
