import { observe } from 'most'
import { async } from 'most-subject'
import { drainScan, ready } from './custom-operators'
import { createRenderer } from 'inferno'

// Alias the async function name for users unfamiliar with most-subject
// This will create a Subject stream to imperatively dispatch actions through
const createStream = async

// Factory function which creates an alias for the Subject's next() method,
// giving Redux users the same API they are already familiar with
const createDispatch = action$ => action => action$.next(action)

// Render virtual DOM node changes to a DOM node as they stream in
const scanRenderer = vTree$ =>
  mountNode => drainScan(createRenderer(), mountNode, vTree$)

const render = (vTree$, mountNode) =>
  observe(() => scanRenderer(vTree$)(mountNode), ready())

export {
  createDispatch,
  createStream,
  render,
}
