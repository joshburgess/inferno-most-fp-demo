import {
  observe,
  fromEvent,
  scan,
} from 'most'
import { async } from 'most-subject'
import { createRenderer } from 'inferno'

// Create stream of actions
const createStream = async

// Action dispatcher
const dispatch = (action, actions$) => actions$.next(action)

// Logging
const logState = state => console.log('Current state: ', state)
const enableLogging = state$ => observe(logState, state$)

// Run function (waits for initial DOM render)
const run = (f, mountNode) =>
  fromEvent('DOMContentLoaded', window).take(1).observe(_ => f(mountNode))

// Render virtual DOM node changes to the DOM as they stream in
const renderChanges = vTree$ =>
  mountNode => scan(createRenderer(), mountNode, vTree$).drain()

export {
  createStream,
  dispatch,
  enableLogging,
  renderChanges,
  run,
}
