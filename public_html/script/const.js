'use strict';
// FONT_HEIGHT: number
//    the height of the font in pixels
export let FONT_HEIGHT = (() => {
  const div = document.createElement('DIV');
  document.body.appendChild(div);
  div.classList.add('pre');
  div.innerHTML = 'A';
  const h = div.clientHeight;
  div.parentNode.removeChild(div);
  return h;
})();
