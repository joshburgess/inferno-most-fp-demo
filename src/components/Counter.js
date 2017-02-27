import Inferno from 'inferno'
import { Button } from './'
import { increment, decrement, reset } from '../actions'

const Counter = ({ title, subtitle, count }) => {
  // const decrement = () => dispatch(Actions.DECREMENT(), action$)
  // const increment = () => dispatch(Actions.INCREMENT(), action$)
  // const reset = () => dispatch(Actions.RESET(), action$)
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
