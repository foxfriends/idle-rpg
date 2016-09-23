// Watch all elements matching 'span.fill', ensuring that they fill up the space
//    that they are supposed to fill up while showing some content of
//    potentially varying length
// Usage:
// <span class="fill" data-width="" data-content="" data-padding=""></span>
// data-width: number = the number of characters that must be filled
// data-content?: string = the content to show (best changed with JS)
// data-padding?: string = the string to use for the padding
'use strict';
import {pad} from './util';

function ensurePadding(node) {
  const width = node.getAttribute('data-width');
  const content = node.getAttribute('data-content') || '';
  const padding = node.getAttribute('data-padding') || ' ';
  node.innerHTML = pad(content, width, padding);
}

const padding = new window.MutationObserver((mutations) => {
  for(let {target} of mutations) { ensurePadding(target); }
});

export default () => {
  // drop all the old fillers
  padding.disconnect();
  // pick up all new fillers
  Array.prototype.forEach.call(document.querySelectorAll('span.fill'), (fill) => {
    padding.observe(fill, { attributes: true, attributeFilter: [ 'data-width', 'data-content' ] } );
    ensurePadding(fill);
  });
};
