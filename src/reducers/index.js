import ActionTypes from '../actions/actionTypes'

const reducer = (state, action) => ActionTypes.case({
  Increment: _ => state + 1,
  Decrement: _ => state - 1,
  Reset: _ => 0,
  Alert: _ => {
    /* eslint-disable fp/no-unused-expression */
    alert(state)
    /* eslint-disable fp/no-unused-expression */
    return state
  },
  _: _ => state,
}, action)

export default reducer
