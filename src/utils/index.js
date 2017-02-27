import {
  drain,
  fromEvent,
  observe,
  scan,
  // skipRepeats,
  // switchLatest,
  take,
} from 'most'
import { async } from 'most-subject'
import { createRenderer } from 'inferno'
import { compose, curry } from 'ramda'
// import { compose, curry} from 'lodash/fp'
import enableLogger from './logger'

// Stream utilities built with Most.js built-ins & functional composition
const drainScan = compose(drain, scan)
// const distinctScan = compose(skipRepeats, scan)
// const switchMap = compose(switchLatest, map)

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

export {
  createDispatch,
  createStream,
  enableLogger,
  render,
}
