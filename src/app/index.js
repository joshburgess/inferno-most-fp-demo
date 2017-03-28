// Supply polyfills for older browsers
import 'babel-polyfill'
// Overwrite Promise implementation with Creed for better performance
import { shim } from 'creed'
shim() // eslint-disable-line fp/no-unused-expression

// import Inferno from 'inferno'
import { createDispatch, createStream, render } from '../framework'
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
  Using a plain JS object to hold app state
*******************************************************************************/

// const initialState = {
//   [COUNT]: 0,
//   [SUBTITLE]: 'Counter Demo',
//   [TITLE]: 'Inferno + Most + FP',
// }

// // Use mapStateToView if using JSX or just use the View function directly
// const mapStateToView = props => <View {...props} />

/******************************************************************************
  Using a mori hashMap to hold app state
*******************************************************************************/

const initialState = toClj({
  [COUNT]: 0,
  [SUBTITLE]: 'Counter Demo',
  [TITLE]: 'Inferno + Most + FP',
})

const mapStateToView = state => {
  const getState = partial(get, [state])

  const subtitle = getState(SUBTITLE)
  const title = getState(TITLE)
  const count = getState(COUNT)

  const props = { count, subtitle, title }

  // return <View {...props} />

  return View(props)
}

// Data flow for the entire app
const state$ = scan(reducer, initialState, action$)
const vTree$ = map(mapStateToView, state$)

// NOTE: Side effect causing code must disable fp/no-unused-expression
// This is fine. Use the linter to stay disciplined.

/* eslint-disable fp/no-unused-expression */

// Mount app, track virtual DOM tree updates, & automatically render changes
render(vTree$, document.getElementById('root'))

/* eslint-enable fp/no-unused-expression */
