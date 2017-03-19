import Type from 'union-type'
import {
  combine,
  debounce,
  map,
  observe,
  startWith,
  throttle,
} from 'most'
import {
  click,
  input,
  mousemove,
  resize,
} from '@most/dom-event'
import { curry } from '../framework/utils/fp'
import { dispatch } from '../'
import {
  INIT,
  OBSERVE_EVENT_STREAMS,
  INCREMENT,
  DECREMENT,
  RESET,
  EDIT_SUBTITLE,
  UPDATE_RGB,
} from '../constants/actionTypes'

// Record types
const DefaultAction = {
  // type: String,
}

const ActionWithStringPayload = {
  // type: String,
  payload: String,
}

const ActionWithObjectPayload = {
  // type: String,
  payload: Object,
}

// Actions
const Actions = Type({
  [INIT]: DefaultAction,
  [OBSERVE_EVENT_STREAMS]: DefaultAction,
  [INCREMENT]: DefaultAction,
  [DECREMENT]: DefaultAction,
  [RESET]: DefaultAction,
  [EDIT_SUBTITLE]: ActionWithStringPayload,
  [UPDATE_RGB]: ActionWithObjectPayload,
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
const updateRgb = rgb => dispatch(Actions[UPDATE_RGB](rgb))

// Setup event handling
export const setupEventHandling = () => {
  const editSubtitleTextbox = document.getElementById('edit-subtitle')
  const resetButton = document.getElementById('reset-btn')
  const incrementButton = document.getElementById('increment-btn')
  const decrementButton = document.getElementById('decrement-btn')

  const editSubtitleInput$ = input(editSubtitleTextbox)
  const resetClick$ = click(resetButton)
  const incrementClick$ = click(incrementButton)
  const decrementClick$ = click(decrementButton)

  const debounce400 = curry(debounce)(400)
  const debouncedEditSubtitleInput$ = debounce400(editSubtitleInput$)

  const getWindowSize = () => {
    const computedStyle = getComputedStyle(document.querySelector('body'))

    return {
      height: parseFloat(computedStyle.getPropertyValue('height')),
      width: parseFloat(computedStyle.getPropertyValue('width')),
    }
  }

  const resize$ = resize(window)

  const toDimensions = ({ target }) => ({
    height: target.innerHeight,
    width: target.innerWidth,
  })

  const initWindowSize = getWindowSize()

  const randomNumInRange = (min, max) =>
    parseFloat(Math.random() * (max - min) + min, 10)

  const toColor = num => parseInt(num * 255, 10)

  const ratioToRgb = ({ rRatio, gRatio, bRatio }) => ({
    r: toColor(rRatio),
    g: toColor(gRatio),
    b: toColor(bRatio),
  })

  // constant green ratio on each page refresh
  // const randomRatio = randomNumInRange(0, 1)

  const dimensionsToPointToRatio = ({ width, height }) =>
    ({ x, y }) => ({
      rRatio: x / width,
      gRatio: randomNumInRange(0, 1), // random ratio for all new coords
      bRatio: y / height,
    })

  const toCoords = ({ clientX, clientY }) => ({ x: clientX, y: clientY })

  const getRandomCoords = ({ width, height }) => ({
    x: randomNumInRange(0, width),
    y: randomNumInRange(0, height),
  })

  const randomCoords = getRandomCoords(initWindowSize)

  const dimensions$ = map(toDimensions, resize$)
  const dimensionsWithInit$ = startWith(initWindowSize, dimensions$)

  const mousemove$ = mousemove(document)

  const coords$ = map(toCoords, mousemove$)
  const coordsWithInit$ = startWith(randomCoords, coords$)

  const pointToRatio = (dimensions, coords) =>
    dimensionsToPointToRatio(dimensions)(coords)

  const ratio$ = combine(pointToRatio, dimensionsWithInit$, coordsWithInit$)
  const rgb$ = map(ratioToRgb, ratio$)

  const throttle150 = curry(throttle)(150)

  const throttledRgb$ = throttle150(rgb$)

  // NOTE: Side effect causing code must disable fp/no-unused-expression
  // This is fine. Use the linter to stay disciplined.

  /* eslint-disable fp/no-unused-expression */

  observe(editSubtitle, debouncedEditSubtitleInput$)
  observe(reset, resetClick$)
  observe(increment, incrementClick$)
  observe(decrement, decrementClick$)
  observe(updateRgb, throttledRgb$)

  /* eslint-enable fp/no-unused-expression */

  return observeEventStreams()
}
