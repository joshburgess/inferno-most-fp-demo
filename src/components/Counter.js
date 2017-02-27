import Inferno from 'inferno'
import { Button } from './'
import { increment, decrement, reset } from '../actions'

const styles = {
  reset: { background: 'rgb(177, 136, 136)' },
}

const Counter = ({ title, subtitle, count }) =>
  <div>
    <Button text='Reset' clickHandler={reset} style={styles.reset} />
    <br />
    <br />
    <br />
    <br />
    <Button text='-' clickHandler={decrement} />
    <h1>{count}</h1>
    <Button text='+' clickHandler={increment} />
  </div>

export default Counter
