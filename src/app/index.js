// Supply polyfills for older browsers
import 'babel-polyfill'
// Overwrite Promise implementation with Creed for better performance
import { shim } from 'creed'
shim() // eslint-disable-line fp/no-unused-expression

// import Inferno from 'inferno'
import {
  createDispatch,
  createStream,
  render,
  withLifecycle,
} from '../framework'
import { map, scan } from 'most'
import { partial } from '../framework/utils/fp'
import { get, toClj } from 'mori'
import { View } from './components'
import reducer from './reducers'
import {
  COUNT,
  RGB,
  SUBTITLE,
  TITLE,
} from './constants/stateKeys'
import { setupEventHandling } from './actions'
import { applyGlobalStyles } from './styles'

// Create stream of actions
const action$ = createStream()

// Generate a dispatch function for emitting actions through action$
export const dispatch = createDispatch(action$)

/******************************************************************************
  Using a plain JS object to hold app state
*******************************************************************************/

// const initialState = {
//   [COUNT]: 0,
//   [SUBTITLE]: 'Counter Demo',
//   [TITLE]: 'Inferno + Most + FP',
//   [RGB]: { r: 136, g: 139, b: 177 },
// }

// // const mapStateToView = (props) =>
// //  <View {...props} onComponentDidMount={setupEventHandling} />

// const lifecycleEvents = { onComponentDidMount: setupEventHandling }
// const ViewWithCallback = withLifecycle(lifecycleEvents)(View)

/******************************************************************************
  Using a mori hashMap to hold app state
*******************************************************************************/

const initialState = toClj({
  [COUNT]: 0,
  [SUBTITLE]: 'Counter Demo',
  [TITLE]: 'Inferno + Most + FP',
  [RGB]: { r: 136, g: 139, b: 177 },
})

const mapStateToView = state => {
  const getState = partial(get, state)

  const count = getState(COUNT)
  const rgb = getState(RGB)
  const subtitle = getState(SUBTITLE)
  const title = getState(TITLE)

  const props = { count, rgb, subtitle, title }

  // return <View {...props} onComponentDidMount={setupEventHandling} />

  const lifecycleEvents = { onComponentDidMount: setupEventHandling }
  const ViewWithCallback = withLifecycle(lifecycleEvents)(View)

  return ViewWithCallback(props)
}

// Data flow for the entire app
const state$ = scan(reducer, initialState, action$)
const vTree$ = map(mapStateToView, state$)

// NOTE: Side effect causing code must disable fp/no-unused-expression
// This is fine. Use the linter to stay disciplined.

/* eslint-disable fp/no-unused-expression */

// Mount app, track virtual DOM tree updates, & automatically render changes
render(vTree$, document.getElementById('root'))

// apply global cssRules (using TypeStyle)
applyGlobalStyles()

/* eslint-enable fp/no-unused-expression */
