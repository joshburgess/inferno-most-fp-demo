import { map, scan } from 'most'
import reducer from './reducers'
import { createDispatch, createStream, render } from './utils'
import { Root } from './components'
import { COUNT, SUBTITLE, TITLE } from './constants/stateKeys'

// Create stream of actions
const action$ = createStream()

// Generate a dispatch function for emitting actions through actions$
export const dispatch = createDispatch(action$)

/******************************************************************************
  Using a plain JS object to hold app state
*******************************************************************************/

const initialState = {
  [COUNT]: 0,
  [SUBTITLE]: 'Counter Demo',
  [TITLE]: 'Inferno + Most',
}

const mapStateToView = ({ title, subtitle, count }) => Root({ subtitle, title, count })

// Data flow for the entire app
const state$ = scan(reducer, initialState, action$)
const vTree$ = map(mapStateToView, state$)

// NOTE: Effectful code must always disable fp/no-unused-expression
// This is fine. Use the linter to stay disciplined.

/* eslint-disable fp/no-unused-expression */

// Mount app, track virtual DOM tree updates, & automatically render changes
render(vTree$, document.getElementById('root'))

/* eslint-enable fp/no-unused-expression */
