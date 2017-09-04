// Use hyperscript + hyperscript-helpers
import h from 'inferno-hyperscript'
import hh from 'hyperscript-helpers'
const { div, h1 } = hh(h)
import { Button } from '../../components'
import { CENTERED, RESET_BTN } from '../../styles'

const Counter = ({ title, subtitle, count }) =>
  div(`.${CENTERED}`, [
    Button({ id: 'reset-btn', text: 'Reset', className: RESET_BTN }),
    Button({ id: 'decrement-btn', text: '-' }),
    h1('', [count]),
    Button({ id: 'increment-btn', text: '+' }),
  ])

export default Counter
