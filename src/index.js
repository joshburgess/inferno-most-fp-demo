import { Counter, Header } from './components'
import { map, scan } from 'most'
import reducer from './reducers'
import { createDispatch, createStream, render } from './utils'
import Inferno from 'inferno'
import 'inferno-devtools'
// import { curry } from 'ramda'
// import { curry } from 'lodash/fp'
import { get, toClj } from 'mori'
import * as stateKeys from './constants/stateKeys'

// Create stream of actions
const action$ = createStream()

// Generate a dispatch function for emitting actions through actions$
export const dispatch = createDispatch(action$)

// // Set the initial state of the app using a plain JS object to hold app state
// const initialState = {
//   [stateKeys.COUNT]: 0,
//   [stateKeys.SUBTITLE]: 'Counter Demo',
//   [stateKeys.TITLE]: 'Inferno + Most',
// }

// const view = ({ title, subtitle, count }) =>
//   <div className='counter'>
//     <Header title={title} subtitle={subtitle} />
//     <Counter count={count} action$={action$} />
//   </div>

// Set the initial state of the app using a mori hashMap to hold app state
const initialState = toClj({
  [stateKeys.COUNT]: 0,
  [stateKeys.SUBTITLE]: 'Counter Demo',
  [stateKeys.TITLE]: 'Inferno + Most',
})

const view = state => {
  const getVal = key => get(state, key)
  return (
    <div className='counter-demo'>
      <Header
        title={getVal(stateKeys.TITLE)}
        subtitle={getVal(stateKeys.SUBTITLE)}
      />
      <Counter count={getVal(stateKeys.COUNT)} />
    </div>
  )
}

// Data flow for the entire app
const state$ = scan(reducer, initialState, action$)
const vTree$ = map(view, state$)

// NOTE: Effectful code must always disable fp/no-unused-expression
// This is fine. Use the linter to stay disciplined.

/* eslint-disable fp/no-unused-expression */

// Mount app, track virtual DOM tree updates, & automatically render changes
render(vTree$, document.getElementById('root'))

/* eslint-enable fp/no-unused-expression */
