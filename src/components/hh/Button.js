// Use hypercscript + hyperscript-helpers
import h from 'inferno-hyperscript'
import hh from 'hyperscript-helpers'
const { div } = hh(h)

const Button = ({ text, clickHandler, style }) =>
  div('.counter-btn', { onClick: clickHandler, style }, text)

export default Button
