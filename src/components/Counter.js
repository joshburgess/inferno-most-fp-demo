import Inferno from 'inferno'
import { Button } from './'
import { dispatch } from '../utils'
import Actions from '../actions'

const Counter = ({ title, subtitle, count, actions$ }) => {
  const decrement = () => dispatch(Actions.Decrement(), actions$)
  const increment = () => dispatch(Actions.Increment(), actions$)
  const reset = () => dispatch(Actions.Reset(), actions$)
  const styles = {
    reset: { background: 'rgb(177, 136, 136)' },
  }
  return (
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
  )
}

export default Counter
