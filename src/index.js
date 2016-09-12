import { createRenderer } from 'inferno-dom'
import { Counter } from './components'
import { map, scan } from 'most'
import Actions from './actions'
import reducer from './reducers'
import { createStream, dispatch, enableLogging, run } from './utils'
import fp from 'lodash/fp'

// Create stream of actions
const actions$ = createStream()

// Create counter props
const counterProps = ({
  title: 'Inferno + Most',
  subtitle: 'Counter Demo',
  decrement: _ => dispatch(Actions.Decrement()),
  increment: _ => dispatch(Actions.Increment()),
})

// Apply props to Counter, returning a view function which takes a state
const view = fp.curry(Counter)(counterProps)

// Set initial state of Counter
const initialState = 0

// Data flow for the entire app
const state$ = scan(reducer, initialState, actions$)
const vTree$ = map(view, state$)
const app = mountNode => scan(createRenderer(), mountNode, vTree$).drain()

// Logging
enableLogging(state$)

// Run app
run(app, document.getElementById('root'))
