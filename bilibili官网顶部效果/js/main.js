import { SLICE_LIST } from './constants.js'
import { render, createElement } from './dom.js'

const dom_ul = createElement(
  'ul',
  { className: 'top_nav' },
  SLICE_LIST.map(i => (
    createElement('li', { className: 'top_nav_item' }, createElement('img', { src: i.img, style: i.style, __CUSTOM__: i.custom }))
  ))
)

dom_ul.addEventListener('mousemove', e => {

})

render(document.getElementById('root'), dom_ul)