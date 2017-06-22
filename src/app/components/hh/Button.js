// Use hyperscript + hyperscript-helpers
import h from 'inferno-hyperscript'
import hh from 'hyperscript-helpers'
const { div } = hh(h)
import { COUNTER_BTN } from '../../styles'

const Button = ({ text, clickHandler, style }) =>
  div(`.${COUNTER_BTN}`, { onClick: clickHandler, style }, text)

export default Button
