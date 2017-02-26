import Inferno from 'inferno'
import { Button } from './'
import { dispatch } from '../utils'
import Actions from '../actions'
// import curry from 'ramda'
// import curry from 'lodash/fp/curry'

const Counter = ({
  title,
  subtitle,
  count,
  actions$,
}) => {
  const decrement = () => dispatch(Actions.Decrement(), actions$)
  const increment = () => dispatch(Actions.Increment(), actions$)
  const reset = () => dispatch(Actions.Reset(), actions$)
  const alert = () => dispatch(Actions.Alert(), actions$)
  return (
    <div className='counter'>
      <h1>{title}</h1>
      <h1>{subtitle}</h1>
      <br />
      <br />
      <Button text='-' clickHandler={decrement} />
      <h1>{count}</h1>
      <Button text='+' clickHandler={increment} />
      <br />
      <br />
      <Button
        text='Reset'
        clickHandler={reset}
        style={{ background: 'rgb(177, 153, 136)' }}
      />
      <br />
      <br />
      <Button
        text='Alert!'
        clickHandler={alert}
        style={{ background: 'rgb(177, 136, 136)' }}
      />
    </div>
  )
}

export default Counter
