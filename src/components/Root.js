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
