import Type from 'union-type'
import { debounce, fromEvent, observe } from 'most'
import { __, curry } from 'ramda'
import { dispatch } from '../'
import {
  INIT,
  OBSERVE_EVENT_STREAMS,
  INCREMENT,
  DECREMENT,
  RESET,
  EDIT_SUBTITLE,
} from '../constants/actionTypes'

// Record types
const DefaultActionRecordType = {
  // type: String,
}
const PayloadActionRecordType = {
  // type: String,
  payload: String,
}

// Actions
const Actions = Type({
  [INIT]: DefaultActionRecordType,
  [OBSERVE_EVENT_STREAMS]: DefaultActionRecordType,
  [INCREMENT]: DefaultActionRecordType,
  [DECREMENT]: DefaultActionRecordType,
  [RESET]: DefaultActionRecordType,
  [EDIT_SUBTITLE]: PayloadActionRecordType,
})

export default Actions

// Action creators
export const init = () => dispatch(Actions[INIT]())
const observeEventStreams = () => dispatch(Actions[OBSERVE_EVENT_STREAMS]())
const increment = () => dispatch(Actions[INCREMENT]())
const decrement = () => dispatch(Actions[DECREMENT]())
const reset = () => dispatch(Actions[RESET]())
const editSubtitle = ({ target }) =>
  dispatch(Actions[EDIT_SUBTITLE](target.value))

// Setup event handling
export const setupEventHandling = () => {
  const editSubtitleTextbox = document.getElementById('edit-subtitle')
  const resetButton = document.getElementById('reset-btn')
  const incrementButton = document.getElementById('increment-btn')
  const decrementButton = document.getElementById('decrement-btn')

  // Use ramda's __ "placeholder" to partially apply fromEvent's optional 3rd
  // argument (capture) in order to facilitate creating reusable functions that
  // only need to be passed a DOM element
  const fromEventCaptureFalse = curry(fromEvent)(__, __, false)
  const fromInput = fromEventCaptureFalse('input')
  const fromClick = fromEventCaptureFalse('click')

  const editSubtitleInput$ = fromInput(editSubtitleTextbox)
  const resetClick$ = fromClick(resetButton)
  const incrementClick$ = fromClick(incrementButton)
  const decrementClick$ = fromClick(decrementButton)

  const debounce400 = curry(debounce)(400)
  const debouncedEditSubtitleInput$ = debounce400(editSubtitleInput$)

  // NOTE: Effectful code must always disable fp/no-unused-expression
  // This is fine. Use the linter to stay disciplined.

  /* eslint-disable fp/no-unused-expression */

  observe(editSubtitle, debouncedEditSubtitleInput$)
  observe(reset, resetClick$)
  observe(increment, incrementClick$)
  observe(decrement, decrementClick$)

  /* eslint-enable fp/no-unused-expression */


  const toColor = num => parseInt(num * 255, 10)

  const windowResize$ = () => fromEvent(window, 'resize')
    .map({ target } => ({
      width: target.innerWidth,
      height: target.innerHeight,
    }))

  const ratioToRgb = ({ rRatio, gRatio, bRatio }) => ({
      r: toColor(rRatio),
      g: toColor(gRatio),
      b: toColor(bRatio),
    })

  const pointToRatioGivenWindowSize = ({ width, height }) =>
    ({ x, y }) => ({
      rRatio: x / width,
      gRatio: y / height,
      bRatio: 0.5,
    })

  const mouseColor$ = windowSize => {
    const pointToRatio = pointToRatioGivenWindowSize(windowSize)
    return fromEvent(window, 'mousemove')
      .map((clientX, clientY) => ({ x: clientX, y: clientY }))
      .map(pointToRatio)
      .map(ratioToRgbMouse)
  }

  return observeEventStreams()
}
