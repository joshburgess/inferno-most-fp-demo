import { createRenderer, createVNode } from 'inferno'
import { ComponentFunction } from 'inferno-vnode-flags'
import { filter, observe, tap } from 'most'
import { async } from 'most-subject'
import { drainScan, ready } from '../utils/streams'
import { compose, curry } from 'ramda'
import { init } from '../../app/actions'

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
  filter(({ type }) => type && type === actionType, stream))

/* eslint-disable fp/no-nil */

// Higher order component utility which applies lifecycle functions on refs
// (currently needed to add lifecycle events to hyperscript functional components)
const withLifecycle = curry((lifecycleEvents, component, props) => createVNode(
  ComponentFunction, // flags
  component, // type
  null, // className
  null, // children
  props, // props
  null, // key
  lifecycleEvents, // refs (lifecycle events are stored as refs)
  false // noNormalise
))

/* eslint-enable fp/no-nil */

export {
  createDispatch,
  createStream,
  ready,
  render,
  selectAction,
  withLifecycle,
}
