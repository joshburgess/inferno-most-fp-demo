import { Counter, Header } from './components'
import {
  map,
  scan,
  // skipRepeats,
  // skipRepeatsWith,
} from 'most'
import reducer from './reducers'
import { createDispatch, createStream, enableLogger, render } from './utils'
import { startApp } from './actions'
import Inferno from 'inferno'
import 'inferno-devtools'
// import { curry } from 'ramda'
// import { curry } from 'lodash/fp'
import { get, toClj } from 'mori'
import { STATE_KEY_COUNT, STATE_KEY_SUBTITLE, STATE_KEY_TITLE } from './constants'

// Create stream of actions
const action$ = createStream()
export const dispatch = createDispatch(action$)

// // Set the initial state of the app using a plain JS object to hold app state
// const initialState = {
//   'count': 0,
//   'subtitle': 'Counter Demo',
//   'title': 'Inferno + Most',
// }

// const view = ({ title, subtitle, count }) =>
//   <div className='counter'>
//     <Header title={title} subtitle={subtitle} />
//     <Counter count={count} action$={action$} />
//   </div>

// Set the initial state of the app using a mori hashMap to hold app state
const initialState = toClj({
  'count': 0,
  'subtitle': 'Counter Demo',
  'title': 'Inferno + Most',
})

const view = state => {
  const getVal = key => get(state, key)
  return (
    <div className='counter-demo'>
      <Header title={getVal(STATE_KEY_TITLE)} subtitle={getVal(STATE_KEY_SUBTITLE)} />
      <Counter count={getVal(STATE_KEY_COUNT)} />
    </div>
  )
}

// Data flow for the entire app
const state$ = scan(reducer, initialState, action$)
const vTree$ = map(view, state$)

// NOTE: Effectful code must always disable fp/no-unused-expression
// This is fine. Use the linter to stay disciplined.

/* eslint-disable fp/no-unused-expression */

// Logging
enableLogger(state$)

// Mount app, track virtual DOM tree updates, & automatically render changes
render(vTree$, document.getElementById('root'))
// dispatch(startApp)

/* eslint-enable fp/no-unused-expression */
