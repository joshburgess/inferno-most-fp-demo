import { createRenderer, createVNode } from 'inferno'
import { ComponentFunction } from 'inferno-vnode-flags'
import { filter, observe, tap } from 'most'
import { async } from 'most-subject'
import { drainScan, ready } from './utils/streams'
import { compose, curry } from 'ramda'
import { init } from '../actions'

// Alias the async function name for users unfamiliar with most-subject
// This will create a Subject stream to imperatively dispatch actions through
const createStream = async

// Factory function which creates an alias for the Subject's next() method,
// giving Redux users the same API they are already familiar with
const createDispatch = action$ => action => action$.next(action)

// Dispatch INIT before rendering
const logInit = curry(tap)(init)
const logInitOnReady = compose(logInit, ready)

// Render virtual DOM node changes to a DOM node as they stream in
const infernoRenderer = createRenderer()
const render = (vTree$, mountNode) =>
  observe(() => drainScan(infernoRenderer, mountNode, vTree$), logInitOnReady())

// Utility function for filtering the action$ for a specific action
const selectAction = curry((actionType, stream) =>
  filter(({ _name }) => _name && _name === actionType, stream))

// Higher order component utility which applies lifecycle functions on refs
const withLifecycle = curry((refs, component, props) => createVNode(
  ComponentFunction, // flags
  component, // type
  props, // props
  false, // children
  false,  // events
  false, // key
  refs, // refs
  false // isNormalized
))

export {
  createDispatch,
  createStream,
  ready,
  render,
  selectAction,
  withLifecycle,
}
