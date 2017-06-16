// Use JSX
import Inferno from 'inferno'
import { Button } from '../../components'
import { increment, decrement, reset } from '../../actions'
import { CENTERED } from '../../styles'

const resetStyle = {
  background: 'rgb(177, 136, 136)',
  margin: '40px 0',
}

const Counter = ({ title, subtitle, count }) =>
  <div className={CENTERED}>
    <Button text='Reset' clickHandler={reset} style={resetStyle} />
    <Button text='-' clickHandler={decrement} />
    <h1>{count}</h1>
    <Button text='+' clickHandler={increment} />
  </div>

export default Counter
