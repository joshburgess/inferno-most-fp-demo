// Use hyperscript + hyperscript-helpers
import h from 'inferno-hyperscript'
import hh from 'hyperscript-helpers'
const { div } = hh(h)
import { COUNTER_BTN } from '../../styles'

const Button = ({ id, className = '', text }) =>
  div(`#${id}.${COUNTER_BTN}.${className}`, text)

export default Button
