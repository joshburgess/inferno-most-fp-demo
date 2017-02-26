import { dec, inc } from 'ramda'
import { get, hashMap, merge } from 'mori'
import Actions from '../actions'
import { COUNT_KEY } from '../constants'

// const reducer = (state, action) => Actions.case({
//   Increment: () => ({ ...state, count: inc(state.count) }),
//   Decrement: () => ({ ...state, count: dec(state.count) }),
//   Reset: () => ({ ...state, count: 0 }),
//   _: () => state,
// }, action)

const reducer = (state, action) => {
  const prevCount = get(state, COUNT_KEY)
  const hashMapWithCount = val => hashMap(COUNT_KEY, val)

  return Actions.case({
    Increment: () => merge(state, hashMapWithCount(inc(prevCount))),
    Decrement: () => merge(state, hashMapWithCount(dec(prevCount))),
    Reset: () => merge(state, hashMapWithCount(0)),
    _: () => state,
  }, action)
}

export default reducer
