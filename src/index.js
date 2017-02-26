import { Counter, Header } from './components'
import {
  map,
  scan,
  // skipRepeats,
  // skipRepeatsWith,
} from 'most'
import reducer from './reducers'
import { createStream, enableLogging, render } from './utils'
import Inferno from 'inferno'
import 'inferno-devtools'
// import { curry } from 'ramda'
// import { curry } from 'lodash/fp'
import { get, toClj } from 'mori'
import { COUNT_KEY, SUBTITLE_KEY, TITLE_KEY } from './constants'

// Create stream of actions
const actions$ = createStream()

// // Set the initial state of the app using a plain JS object to hold app state
// const initialState = {
//   'count': 0,
//   'subtitle': 'Counter Demo',
//   'title': 'Inferno + Most',
// }

// const view = ({ title, subtitle, count }) =>
//   <div className='counter'>
//     <Header title={title} subtitle={subtitle} />
//     <Counter count={count} actions$={actions$} />
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
    <div className='counter'>
      <Header title={getVal(TITLE_KEY)} subtitle={getVal(SUBTITLE_KEY)} />
      <Counter count={getVal(COUNT_KEY)} actions$={actions$} />
    </div>
  )
}

// Data flow for the entire app
const state$ = scan(reducer, initialState, actions$)
const vTree$ = map(view, state$)

// NOTE: Effectful code must always disable fp/no-unused-expression
// This is fine. Use the linter to stay disciplined.

/* eslint-disable fp/no-unused-expression */

// Logging
enableLogging(state$)

// Mount app, track virtual DOM tree updates, & automatically render changes
render(vTree$, document.getElementById('root'))

/* eslint-enable fp/no-unused-expression */
