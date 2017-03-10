// import Inferno from 'inferno'
import { createDispatch, createStream, render } from './framework'
import { map, scan } from 'most'
import { get, toClj } from 'mori'
import { partial } from 'ramda'
import { View } from './components'
import reducer from './reducers'
import { COUNT, SUBTITLE, TITLE } from './constants/stateKeys'

// Create stream of actions
export const action$ = createStream()

// Generate a dispatch function for emitting actions through actions$
export const dispatch = createDispatch(action$)

/******************************************************************************
  Using a mori hashMap to hold app state
*******************************************************************************/

const initialState = toClj({
  [COUNT]: 0,
  [SUBTITLE]: 'Counter Demo',
  [TITLE]: 'Inferno + Most',
})

const mapStateToView = state => {
  const getState = partial(get, [state])

  const subtitle = getState(SUBTITLE)
  const title = getState(TITLE)
  const count = getState(COUNT)

  return View({ count, subtitle, title })
  // return <View count={count} subtitle={subtitle} title={title} />
}

// Data flow for the entire app
const state$ = scan(reducer, initialState, action$)
const vTree$ = map(mapStateToView, state$)

// NOTE: Effectful code must always disable fp/no-unused-expression
// This is fine. Use the linter to stay disciplined.

/* eslint-disable fp/no-unused-expression */

// Mount app, track virtual DOM tree updates, & automatically render changes
render(vTree$, document.getElementById('root'))

/* eslint-enable fp/no-unused-expression */
