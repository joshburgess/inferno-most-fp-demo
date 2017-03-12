import { createRenderer, createVNode } from 'inferno'
import { ComponentFunction } from 'inferno-vnode-flags'
import { delay, observe, tap } from 'most'
import { async } from 'most-subject'
import { drainScan, first, ready } from './utils'
import { init } from '../actions'
import { compose, curry } from 'ramda'

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

// Higher order component utility which applies a callback function
const withCallback = curry((callback, component, props) => createVNode(
  ComponentFunction, // flags
  component, // type
  props, // props
  null, // children
  null,  // events
  null, // key
  { onComponentDidMount: callback }, // refs
  false // isNormalized
))

export {
  createDispatch,
  createStream,
  ready,
  render,
  selectAction,
  withCallback,
}
