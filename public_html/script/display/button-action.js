// Some common behaviours for buttons to have
'use strict';

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

function progress(deferred) {
  return { click: deferred.resolve };
}

export { infoPopup, progress };
