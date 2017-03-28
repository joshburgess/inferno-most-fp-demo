// Use hyperscript + hyperscript-helpers
import h from 'inferno-hyperscript'
import hh from 'hyperscript-helpers'
const { div } = hh(h)

const Button = ({ id, style, text }) =>
  div(`#${id}.counter-btn`, { style }, text)

export default Button
