import {
  drain,
  fromEvent,
  observe,
  scan,
  take,
} from 'most'
import { async } from 'most-subject'
import { createRenderer } from 'inferno'
// import compose from 'ramda/src/compose'
import curry from 'lodash/fp/curry'
import compose from 'lodash/fp/compose'

// Create stream of actions
const createStream = async

// Action dispatcher
const dispatch = (action, actions$) => actions$.next(action)

// Logging
const logState = state => console.log('Current state: ', state)
const enableLogging = state$ => observe(logState, state$)

const once = curry(take)(1)
const onReady = compose(once, () => fromEvent('DOMContentLoaded', window))

// Run function (waits for initial DOM render)
const run = (f, mountNode) => observe(() => f(mountNode), onReady())

const startScanningForChanges = compose(drain, scan)

// Render virtual DOM node changes to the DOM as they stream in
const renderChanges = vTree$ =>
  mountNode => startScanningForChanges(createRenderer(), mountNode, vTree$)

export {
  createStream,
  dispatch,
  enableLogging,
  renderChanges,
  run,
}
