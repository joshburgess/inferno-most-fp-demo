// Use hypercscript + hyperscript-helpers
import h from 'inferno-hyperscript'
import hh from 'hyperscript-helpers'
const { br, div, h1 } = hh(h)
import { Button } from '../../components'
import { increment, decrement, reset } from '../../actions'

const resetStyle = { background: 'rgb(177, 136, 136)' }

const Counter = ({ title, subtitle, count }) =>
  div([
    Button({ text: 'Reset', clickHandler: reset, style: resetStyle }),
    br(),
    br(),
    br(),
    br(),
    Button({ text: '-', clickHandler: decrement }),
    h1(count),
    Button({ text: '+', clickHandler: increment }),
  ])

export default Counter
