import { Counter } from './components'
import { map, scan, skipRepeats, skipRepeatsWith } from 'most'
import reducer from './reducers'
import {
  createStream,
  enableLogging,
  renderChanges,
  run,
} from './utils'
import Inferno from 'inferno'
import 'inferno-devtools'
import compose from 'ramda/src/compose'
// import curry from 'lodash/fp/curry'
// import compose from 'lodash/fp/compose'

// Create stream of actions
const actions$ = createStream()

// Apply props to Counter, returning a view function which takes a state
// const view = Counter({
//   title: 'Inferno + Most',
//   subtitle: 'Counter Demo',
//   actions$,
// })

// const view = state => Counter({
//   title: 'Inferno + Most',
//   subtitle: 'Counter Demo',
//   count: state,
//   actions$,
// })

const view = state =>
  <Counter
    title={'Inferno + Most'}
    subtitle={'Counter Demo'}
    count={state}
    actions$={actions$}
  />

// Set initial state of Counter
const initialState = 0

// Data flow for the entire app
const scanDistinct = compose(skipRepeats, scan)
const state$ = scan(reducer, initialState, actions$)
const vTree$ = map(view, state$)

// NOTE: Effectful code must always disable fp/no-unused-expression
// This is fine. Use the linter to stay disciplined.

/* eslint-disable fp/no-unused-expression */

// Logging
enableLogging(state$)

// Run app
run(renderChanges(vTree$), document.getElementById('root'))

/* eslint-enable fp/no-unused-expression */
