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
  action$,
}) => {
  const decrement = () => dispatch(Actions.Decrement(), action$)
  const increment = () => dispatch(Actions.Increment(), action$)
  const reset = () => dispatch(Actions.Reset(), action$)
  const alert = () => dispatch(Actions.Alert(), action$)
  return (
    <div>
      <Button
        text='Alert!'
        clickHandler={alert}
        style={{ background: 'rgb(177, 136, 136)' }}
      />
    </div>
  )
}

export default Counter
