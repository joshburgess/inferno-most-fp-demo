import Actions from '../actions'

const reducer = (state, action) => Actions.case({
  Increment: _ => state + 1,
  Decrement: _ => state - 1,
}, action)

export default reducer
