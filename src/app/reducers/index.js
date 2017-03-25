import { dec, inc } from 'ramda'
import Actions from '../actions'
import { COUNT, SUBTITLE, TITLE } from '../constants/stateKeys'
import {
  INCREMENT,
  DECREMENT,
  RESET,
  EDIT_SUBTITLE,
  EDIT_TITLE,
} from '../constants/actionTypes'
import { enableLogging } from '../../framework'

/******************************************************************************
  Using a plain JS object to hold app state
*******************************************************************************/

const reducer = (state, action) => Actions.case({
  [INCREMENT]: () => ({ ...state, [COUNT]: inc(state[COUNT]) }),
  [DECREMENT]: () => ({ ...state, [COUNT]: dec(state[COUNT]) }),
  [RESET]: () => ({ ...state, [COUNT]: 0 }),
  [EDIT_SUBTITLE]: () => ({ ...state, [SUBTITLE]: action.payload }),
  [EDIT_TITLE]: () => ({ ...state, [TITLE]: action.payload }),
  _: () => state,
}, action)

const reducerWithLogging = (state, action) =>
  enableLogging(state, action, reducer(state, action))

export default reducerWithLogging

// Or export the reducer directly to turn off logging
// export default reducer
