// Supply polyfills for older browsers
import 'babel-polyfill'
// Overwrite Promise implementation with Creed for better performance
import { shim } from 'creed'
shim() // eslint-disable-line fp/no-unused-expression

import Inferno from 'inferno'
import { createDispatch, createStream, render, withCallback } from './framework'
import { delay, map, observe, scan } from 'most'
import { curry } from 'ramda'
import { View } from './components'
import reducer from './reducers'
import { COUNT, SUBTITLE, TITLE } from './constants/stateKeys'
import { setupEventHandling } from './actions'

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

// const mapStateToView = (props) =>
//   <View {...props} onComponentDidMount={setupEventHandling} />

const mapStateToView = withCallback(setupEventHandling)(View)

// Data flow for the entire app
const state$ = scan(reducer, initialState, action$)
const vTree$ = map(mapStateToView, state$)

// NOTE: Effectful code must always disable fp/no-unused-expression
// This is fine. Use the linter to stay disciplined.

/* eslint-disable fp/no-unused-expression */

// Mount app, track virtual DOM tree updates, & automatically render changes
render(vTree$, document.getElementById('root'))

/* eslint-enable fp/no-unused-expression */
