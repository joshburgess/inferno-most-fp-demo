import { dec, inc, compose, partial } from 'ramda'
import { get, hashMap, merge, toClj } from 'mori'
import Actions from '../actions'
import { COUNT, SUBTITLE } from '../constants/stateKeys'
import {
  INCREMENT,
  DECREMENT,
  RESET,
  EDIT_SUBTITLE,
} from '../constants/actionTypes'
import { enableLogging } from '../framework'

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

  // alternatively, we could have defined the same reusable functions like this
  // const mergeState = x => merge(state, x)
  // const setCount = x => toClj({ [COUNT]: x })
  // const setSubtitle = x => toClj({ [SUBTITLE]: x })

  // create reusable merge variants via functional composition
  const mergeSetCount = compose(mergeState, setCount)
  const mergeIncCount = compose(mergeSetCount, inc)
  const mergeDecCount = compose(mergeSetCount, dec)
  const mergeSetSubtitle = compose(mergeState, setSubtitle)

  return Actions.case({
    [INCREMENT]: () => mergeIncCount(prevCount),
    [DECREMENT]: () => mergeDecCount(prevCount),
    [RESET]: () => mergeSetCount(0),
    [EDIT_SUBTITLE]: () => mergeSetSubtitle(action.payload),
    _: () => state,
  }, action)
}

const reducerWithLogging = (state, action) =>
  enableLogging(state, action, reducer(state, action))

export default reducerWithLogging
