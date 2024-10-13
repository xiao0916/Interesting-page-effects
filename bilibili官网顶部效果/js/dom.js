import { isElement } from './utils.js'

export function render(root, dom) {
  if (!root) {
    throw new Error('root must be an element')
  }
  if (isElement(dom)) {
    root.appendChild(dom)
  }
}

export function createElement(tag, props, children) {
  const dom = document.createElement(tag)
  const _props = Object.assign({}, props)
  for (let k in _props) {
    if (k === 'style' && _props[k] && typeof _props[k] === 'object') {
      dom.style = Object.entries(_props[k]).map(([s_name, s_val]) => `${s_name}: ${s_val};`).join('')
    } else {
      dom[k] = _props[k]
    }
  }
  const _children = []
  if (isElement(children)) {
    _children.push(children)
  } else if (children && children.length) {
    children.forEach(el => isElement(el) && _children.push(el))
  }
  _children.forEach(el => dom.appendChild(el))
  return dom
}