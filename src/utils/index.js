import {
  drain,
  fromEvent,
  map,
  observe,
  scan,
  skipRepeats,
  skipRepeatsWith,
  switchLatest,
  take,
} from 'most'
import { async } from 'most-subject'
import { createRenderer } from 'inferno'
import { compose, curry } from 'ramda'
// import { compose, curry} from 'lodash/fp'
import { toJs } from 'mori'

// Stream utilities built with Most.js built-ins & functional composition
const drainScan = compose(drain, scan)
const scanDistinct = compose(skipRepeats, scan)
const switchMap = compose(switchLatest, map)

// Create a Subject stream for imperatively dispatching actions
const createStream = async

// Action dispatcher
const dispatch = (action, actions$) => actions$.next(action)

// Logging
const noOp = f => f
const types = {
  action: { color: '#03A9F4', label: 'action' },
  prevState: { color: '#9E9E9E', label: 'prev state' },
  nextState: { color: '#4CAF50', label: 'next state' },
  error: { color: '#F20404', label: 'error' },
}
const log = (prevState, nextState) => {
  /* eslint-disable fp/no-unused-expression */
  console.log(
    `%c${types.prevState.label}`,
    `color: ${types.prevState.color}; font-weight: bold;`,
    toJs(prevState)
  )
  console.log(
    `%c${types.action.label}`,
    `color: ${types.action.color}; font-weight: bold;`,
    'some action'
  )
  console.log(
    `%c${types.nextState.label}`,
    `color: ${types.nextState.color}; font-weight: bold;`,
    toJs(nextState)
  )
  /* eslint-enable fp/no-unused-expression */

  // Return default equality test to preserve default skipRepeats functionality
  return prevState === nextState
}
const enableLogging = state$ => observe(noOp, skipRepeatsWith(log, state$))

// Waits for initial DOM render before mounting app
const onlyOnce = curry(take)(1)
const onReady = compose(onlyOnce, () => fromEvent('DOMContentLoaded', window))

// Render virtual DOM node changes to a DOM node as they stream in
const scanRenderer = vTree$ =>
  mountNode => drainScan(createRenderer(), mountNode, vTree$)
const render = (vTree$, mountNode) => observe(
  () => scanRenderer(vTree$)(mountNode),
  onReady()
)

export {
  createStream,
  dispatch,
  enableLogging,
  render,
}
