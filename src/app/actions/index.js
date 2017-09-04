import Type from 'union-type'
import {
  combine,
  debounce,
  map,
  observe,
  startWith,
} from 'most'
import {
  click,
  input,
  mousemove,
  resize,
} from '@most/dom-event'
import { curry } from 'ramda'
import { dispatch } from '../'
import {
  INIT,
  OBSERVE_EVENT_STREAMS,
  INCREMENT,
  DECREMENT,
  RESET,
  EDIT_SUBTITLE,
  EDIT_TITLE,
  UPDATE_RGB,
} from '../constants/actionTypes'

// Record types
const DefaultAction = {
  type: String,
}

const StringPayloadAction = {
  type: String,
  payload: String,
}

const ObjectPayloadAction = {
  type: String,
  payload: Object,
}

// Actions
const Actions = Type({
  [INIT]: DefaultAction,
  [OBSERVE_EVENT_STREAMS]: DefaultAction,
  [INCREMENT]: DefaultAction,
  [DECREMENT]: DefaultAction,
  [RESET]: DefaultAction,
  [EDIT_SUBTITLE]: StringPayloadAction,
  [EDIT_TITLE]: StringPayloadAction,
  [UPDATE_RGB]: ObjectPayloadAction,
})

export default Actions

// helper functions to decrease boilerplate when constructing actions
const createDefaultAction = action => Actions[action](action)
const createPayloadAction = action => payload => Actions[action](action)(payload)

// Action creators
export const init = () => dispatch(createDefaultAction(INIT))
const observeEventStreams = () => dispatch(createDefaultAction(OBSERVE_EVENT_STREAMS))
const increment = () => dispatch(createDefaultAction(INCREMENT))
const decrement = () => dispatch(createDefaultAction(DECREMENT))
const reset = () => dispatch(createDefaultAction(RESET))
const editSubtitle =
  ({ target }) => dispatch(createPayloadAction(EDIT_SUBTITLE)(target.value))
export const editTitle =
  ({ target }) => dispatch(createPayloadAction(EDIT_TITLE)(target.value))
const updateRgb = rgb => dispatch(createPayloadAction(UPDATE_RGB)(rgb))

/* eslint-disable better/explicit-return  */
/* eslint-disable fp/no-nil */

// Setup event handling
export const setupEventHandling = () => {
  const editTitleTextbox = document.getElementById('edit-title')
  const editSubtitleTextbox = document.getElementById('debounced-edit-subtitle')
  const resetButton = document.getElementById('reset-btn')
  const incrementButton = document.getElementById('increment-btn')
  const decrementButton = document.getElementById('decrement-btn')

  const editTitleInput$ = input(editTitleTextbox)
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

  // constant random ratio on each page refresh
  // const randomRatio = randomNumInRange(0, 1)

  const dimensionsToPointToRatio = ({ width, height }) =>
    ({ x, y }) => {
      // different random ratio for every new set of coordinates
      const randomRatio = randomNumInRange(0, 1)
      return {
        rRatio: x / width,
        gRatio: randomRatio,
        bRatio: y / height,
      }
    }

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

  // NOTE: Side effect causing code must disable fp/no-unused-expression
  // This is fine. Use the linter to stay disciplined.

  /* eslint-disable fp/no-unused-expression */

  observe(editTitle, editTitleInput$)
  observe(editSubtitle, debouncedEditSubtitleInput$)
  observe(reset, resetClick$)
  observe(increment, incrementClick$)
  observe(decrement, decrementClick$)
  observe(updateRgb, rgb$)

  observeEventStreams()

  /* eslint-enable fp/no-unused-expression */
}

/* eslint-enable better/explicit-return  */
/* eslint-enable fp/no-nil */
