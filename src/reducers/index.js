import Actions from '../actions'

const reducer = (state, action) => Actions.case({
  Increment: () => state + 1,
  Decrement: () => state - 1,
  Reset: () => 0,
  Alert: () => {
    /* eslint-disable fp/no-unused-expression */
    alert(state)
    /* eslint-disable fp/no-unused-expression */
    return state
  },
  _: () => state,
}, action)

export default reducer
