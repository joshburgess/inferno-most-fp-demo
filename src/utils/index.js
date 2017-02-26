import {
  drain,
  fromEvent,
  observe,
  scan,
  skipRepeatsWith,
  take,
} from 'most'
import { async } from 'most-subject'
import { createRenderer } from 'inferno'
import curry from 'ramda/src/curry'
import compose from 'ramda/src/compose'
// import curry from 'lodash/fp/curry'
// import compose from 'lodash/fp/compose'

// Create a Subject stream for imperatively dispatching actions
const createStream = async

// Action dispatcher
const dispatch = (action, actions$) => actions$.next(action)

// Logging
const logState = (state, x) => console.log('Current state: ', state)
const logPrevCurr = (prev, curr) => {
  console.log('prev', prev)
  console.log('curr', curr)
  console.log('equality', prev === curr)
  return prev === curr
}
const enableLogging = state$ =>
  observe(logState, skipRepeatsWith(logPrevCurr, state$))

// Run function waits for initial DOM render
const once = curry(take)(1)
const onReady = compose(once, () => fromEvent('DOMContentLoaded', window))
const run = (f, mountNode) => observe(() => f(mountNode), onReady())

// Render virtual DOM node changes to the DOM as they stream in
const drainScan = compose(drain, scan)
const renderChanges = vTree$ =>
  mountNode => drainScan(createRenderer(), mountNode, vTree$)

export {
  createStream,
  dispatch,
  enableLogging,
  renderChanges,
  run,
}
