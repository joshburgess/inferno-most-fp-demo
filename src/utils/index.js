import {
  observe,
  fromEvent,
  scan,
} from 'most'
import { holdSubject } from 'most-subject'
import { createRenderer } from 'inferno-dom'

// Create stream of actions
const createStream = holdSubject

// Action emitter helper
const dispatch = (stream, action) => stream.next(action)

// Logging
const logState = state => console.log('Current state: ', state)
const enableLogging = state$ => observe(logState, state$)

// Start function waits for initial DOM render and takes the app & mountNode
const run = (f, mountNode) =>
  fromEvent('DOMContentLoaded', window).take(1).observe(_ => f(mountNode))

const createViewRenderer = vTree$ =>
  mountNode => scan(createRenderer(), mountNode, vTree$).drain()

export {
  dispatch,
  enableLogging,
  createStream,
  createViewRenderer,
  run,
}
