// Use hyperscript + hyperscript-helpers
import h from 'inferno-hyperscript'
import hh from 'hyperscript-helpers'
const { div, h1 } = hh(h)
import { Button } from '../../components'
import { increment, decrement, reset } from '../../actions'
import { CENTERED } from '../../styles'

const resetStyle = {
  background: 'rgb(177, 136, 136)',
  margin: '40px 0',
}

const Counter = ({ title, subtitle, count }) =>
  div(`.${CENTERED}`, [
    Button({ text: 'Reset', clickHandler: reset, style: resetStyle }),
    Button({ text: '-', clickHandler: decrement }),
    h1('', [count]),
    Button({ text: '+', clickHandler: increment }),
  ])

export default Counter
