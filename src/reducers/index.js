import { dec, inc } from 'ramda'
import { get, hashMap, merge } from 'mori'
import Actions from '../actions'
import { STATE_KEY_COUNT, STATE_KEY_LAST_ACTION } from '../constants'
import { enableReducerLogging } from '../utils/logger'

// const reducer = (state, action) => Actions.case({
//   Increment: () => ({ ...state, count: inc(state.count) }),
//   Decrement: () => ({ ...state, count: dec(state.count) }),
//   Reset: () => ({ ...state, count: 0 }),
//   _: () => state,
// }, action)

const reducer = (state, action) => {
  const prevCount = get(state, STATE_KEY_COUNT)
  const hashMapWithCount = val => hashMap(STATE_KEY_COUNT, val)

  return Actions.case({
    INCREMENT: () => merge(state, hashMapWithCount(inc(prevCount))),
    DECREMENT: () => merge(state, hashMapWithCount(dec(prevCount))),
    RESET: () => merge(state, hashMapWithCount(0)),
    _: () => state,
  }, action)
}

// const reducerWithActionLogging = (state, action) => {
//   // Always store last action fired under the lastAction state key for logging
//   const updatedState = merge(
//     state,
//     // hashMap(STATE_KEY_LAST_ACTION, { type: action._name })
//     hashMap(STATE_KEY_LAST_ACTION, action)
//   )
//   return reducer(updatedState, action)
// }

const reducerWithActionLogging = (state, action) =>
  enableReducerLogging(action, state, reducer(state, action))

export default reducerWithActionLogging
