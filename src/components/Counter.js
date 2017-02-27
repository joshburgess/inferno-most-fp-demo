import Inferno from 'inferno'
import { Button } from './'
import { increment, decrement, reset } from '../actions'

const resetStyle = { background: 'rgb(177, 136, 136)' }

const Counter = ({ title, subtitle, count }) =>
  <div>
    <Button text='Reset' clickHandler={reset} style={resetStyle} />
    <br />
    <br />
    <br />
    <br />
    <Button text='-' clickHandler={decrement} />
    <h1>{count}</h1>
    <Button text='+' clickHandler={increment} />
  </div>

export default Counter
