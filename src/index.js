import { map, scan } from 'most'
import reducer from './reducers'
import { createDispatch, createStream, render } from './utils'
import { Root } from './components'
// import { curry } from 'ramda'
// import { curry } from 'lodash/fp'
import { get, toClj } from 'mori'
import * as stateKeys from './constants/stateKeys'

// Create stream of actions
const action$ = createStream()

// Generate a dispatch function for emitting actions through actions$
export const dispatch = createDispatch(action$)

/******************************************************************************
  Using a mori hashMap to hold app state
*******************************************************************************/

const initialState = toClj({
  [stateKeys.COUNT]: 0,
  [stateKeys.SUBTITLE]: 'Counter Demo',
  [stateKeys.TITLE]: 'Inferno + Most',
})

const mapStateToView = state => {
  const getVal = key => get(state, key)
  const subtitle = getVal(stateKeys.SUBTITLE)
  const title = getVal(stateKeys.TITLE)
  const count = getVal(stateKeys.COUNT)
  return Root({ subtitle, title, count })
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
