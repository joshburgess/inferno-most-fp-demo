import { dec, inc, compose, partial } from 'ramda'
import { get, hashMap, merge } from 'mori'
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

// const reducer = (state, action) => Actions.case({
//   [INCREMENT]: () => ({ ...state, [COUNT]: inc(state[COUNT]) }),
//   [DECREMENT]: () => ({ ...state, [COUNT]: dec(state[COUNT]) }),
//   [RESET]: () => ({ ...state, [COUNT]: 0 }),
//   [EDIT_SUBTITLE]: () => ({ ...state, [SUBTITLE]: action.payload }),
//   _: () => state,
// }, action)

/******************************************************************************
  Using a mori hashMap to hold app state
*******************************************************************************/

const reducer = (state, action) => {
  // get prev count value from existing state hashMap
  const prevCount = get(state, COUNT)

  // partially apply state argument to make a reusable merge function
  const mergeState = partial(merge, [state])

  // partially apply key argument to make reusable set functions
  const setCount = partial(hashMap, [COUNT])
  const setSubtitle = partial(hashMap, [SUBTITLE])
  const setTitle = partial(hashMap, [TITLE])

  // alternatively, we could have defined the same functionality like this
  // const mergeState = x => merge(state, x)
  // const setCount = x => toClj({ [COUNT]: x })
  // const setSubtitle = x => toClj({ [SUBTITLE]: x })

  // create reusable merge variants via functional composition
  const mergeSetCount = compose(mergeState, setCount)
  const mergeIncCount = compose(mergeSetCount, inc)
  const mergeDecCount = compose(mergeSetCount, dec)
  const mergeSetSubtitle = compose(mergeState, setSubtitle)
  const mergeSetTitle = compose(mergeState, setTitle)

  return Actions.case({
    [INCREMENT]: () => mergeIncCount(prevCount),
    [DECREMENT]: () => mergeDecCount(prevCount),
    [RESET]: () => mergeSetCount(0),
    [EDIT_SUBTITLE]: () => mergeSetSubtitle(action.payload),
    [EDIT_TITLE]: () => mergeSetTitle(action.payload),
    _: () => state,
  }, action)
}

const reducerWithLogging = (state, action) =>
  enableLogging(state, action, reducer(state, action))

export default reducerWithLogging

// Or export the reducer directly to turn off logging
// export default reducer
