import { observe, fromEvent } from 'most'
import { holdSubject } from 'most-subject'

// Create stream of actions
const actions$ = holdSubject()

// Shared reference to actions$
const createStream = _ => actions$

// Action dispatcher
const dispatch = action => actions$.next(action)

// Logging
const logState = state => console.log('Current state: ', state)
const enableLogging = state$ => observe(logState, state$)

// Start function waits for initial DOM render and takes the app & mountNode
const run = (f, mountNode) =>
  fromEvent('DOMContentLoaded', window).take(1).observe(_ => f(mountNode))

export {
  createStream,
  dispatch,
  enableLogging,
  run,
}
