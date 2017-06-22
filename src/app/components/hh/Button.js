// Use hyperscript + hyperscript-helpers
import h from 'inferno-hyperscript'
import hh from 'hyperscript-helpers'
const { div } = hh(h)
import { COUNTER_BTN } from '../../styles'

const Button = ({ text, clickHandler, className = '' }) =>
  div(`.${COUNTER_BTN}.${className}`, { onClick: clickHandler }, text)

export default Button
