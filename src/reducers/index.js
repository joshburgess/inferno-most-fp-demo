import Actions from '../actions'
import { COUNT } from '../constants/stateKeys'
import { enableLogging } from '../utils/logger'
import { dec, inc } from 'ramda'

/******************************************************************************
  Using a plain JS object to hold app state
*******************************************************************************/

const reducer = (state, action) => Actions.case({
  INCREMENT: () => ({ ...state, [COUNT]: inc(state.count) }),
  DECREMENT: () => ({ ...state, [COUNT]: dec(state.count) }),
  RESET: () => ({ ...state, [COUNT]: 0 }),
  _: () => state,
}, action)

const reducerWithLogging = (state, action) =>
  enableLogging(state, action, reducer(state, action))

export default reducerWithLogging
