// Use JSX
import Inferno from 'inferno'
import { Button } from '../../components'
import { increment, decrement, reset } from '../../actions'
import { CENTERED, RESET_BTN } from '../../styles'

const Counter = ({ title, subtitle, count }) =>
  <div className={CENTERED}>
    <Button text='Reset' clickHandler={reset} className={RESET_BTN} />
    <Button text='-' clickHandler={decrement} />
    <h1>{count}</h1>
    <Button text='+' clickHandler={increment} />
  </div>

export default Counter
