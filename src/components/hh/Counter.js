// Use hyperscript + hyperscript-helpers
import h from 'inferno-hyperscript'
import hh from 'hyperscript-helpers'
const { div, h1 } = hh(h)
import { Button } from '../../components'

const resetStyle = {
  background: 'rgb(177, 136, 136)',
  margin: '40px 0',
}

const Counter = ({ title, subtitle, count }) =>
  div('.centered', [
    Button({ id: 'reset-btn', text: 'Reset', style: resetStyle }),
    Button({ id: 'decrement-btn', text: '-' }),
    h1('', [count]),
    Button({ id: 'increment-btn', text: '+' }),
  ])

export default Counter
