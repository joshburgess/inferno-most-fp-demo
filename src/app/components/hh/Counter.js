// Use hyperscript + hyperscript-helpers
import h from 'inferno-hyperscript'
import hh from 'hyperscript-helpers'
const { div, h1 } = hh(h)
import { Button } from '../../components'
import { increment, decrement, reset } from '../../actions'
import { CENTERED, RESET_BTN } from '../../styles'

const Counter = ({ title, subtitle, count }) =>
  div(`.${CENTERED}`, [
    Button({ text: 'Reset', clickHandler: reset, className: RESET_BTN }),
    Button({ text: '-', clickHandler: decrement }),
    h1('', [count]),
    Button({ text: '+', clickHandler: increment }),
  ])

export default Counter
