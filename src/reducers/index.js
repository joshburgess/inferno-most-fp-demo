import Actions from '../actions'
import inc from 'ramda/src/inc'
import dec from 'ramda/src/dec'

const reducer = (state, action) => Actions.case({
  Increment: () => inc(state),
  Decrement: () => dec(state),
  Reset: () => 0,
  Alert: () => {
    /* eslint-disable fp/no-unused-expression */
    console.log('alert', state)
    /* eslint-disable fp/no-unused-expression */
    return state
  },
  _: () => state,
}, action)

export default reducer
