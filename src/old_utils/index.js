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
import { LOG_TYPES, NOOP } from '../constants'

// Stream utilities built with Most.js built-ins & functional composition
const drainScan = compose(drain, scan)
const distinctScan = compose(skipRepeats, scan)
const switchMap = compose(switchLatest, map)

// Alias the async function name for users unfamiliar with most-subject
// This will create a Subject stream for imperatively dispatching actions
const createStream = async

// Factory function which creates an alias for the Subject's next() method,
// giving Redux users the same API they are already familiar with
const createDispatch = action$ => action => action$.next(action)

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

// Logging
const logStates = (prevState, nextState) => {
  const prevStateJs = toJs(prevState)
  const nextStateJs = toJs(nextState)
  const { lastAction } = nextStateJs
  const { type } = lastAction

  /* eslint-disable fp/no-unused-expression */
  console.group(
    `%c${LOG_TYPES.action.label} ${type} fired @ ${Date.now().toString()}`,
    `font-weight: bold;`,
    ''
  )
  console.log(
    `%c${LOG_TYPES.prevState.label}`,
    `color: ${LOG_TYPES.prevState.color}; font-weight: bold;`,
    prevStateJs
  )
  console.log(
    `%c${LOG_TYPES.action.label}`,
    `color: ${LOG_TYPES.action.color}; font-weight: bold;`,
    type
  )
  console.log(
    `%c${LOG_TYPES.nextState.label}`,
    `color: ${LOG_TYPES.nextState.color}; font-weight: bold;`,
    nextStateJs
  )
  console.groupEnd()
  /* eslint-enable fp/no-unused-expression */

  // Return default equality test to preserve default skipRepeats functionality
  return prevState === nextState
}

const enableLogger = state$ => observe(NOOP, skipRepeatsWith(logStates, state$))

export {
  createDispatch,
  createStream,
  enableLogger,
  render,
}
