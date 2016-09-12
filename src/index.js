import { Counter } from './components'
import { map, scan } from 'most'
import Actions from './actions'
import reducer from './reducers'
import {
  createStream,
  dispatch,
  enableLogging,
  renderChanges,
  run,
} from './utils'
import curry from 'lodash/fp/curry'

// Create stream of actions
const actions$ = createStream()

// Create counter props
const counterProps = ({
  title: 'Inferno + Most',
  subtitle: 'Counter Demo',
  decrement: _ => dispatch(Actions.Decrement(), actions$),
  increment: _ => dispatch(Actions.Increment(), actions$),
})

// Apply props to Counter, returning a view function which takes a state
const view = curry(Counter)(counterProps)

// Set initial state of Counter
const initialState = 0

// Data flow for the entire app
const state$ = scan(reducer, initialState, actions$)
const vTree$ = map(view, state$)

// Logging
enableLogging(state$)

// Run app
run(renderChanges(vTree$), document.getElementById('root'))
