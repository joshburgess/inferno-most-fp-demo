import Type from 'union-type'
import { dispatch } from '../'
import {
  INIT,
  INCREMENT,
  DECREMENT,
  RESET,
  EDIT_SUBTITLE,
  EDIT_TITLE,
} from '../constants/actionTypes'

// Record types
const DefaultAction = {
  type: String,
}

const StringPayloadAction = {
  type: String,
  payload: String,
}

// Actions
const Actions = Type({
  [INIT]: DefaultAction,
  [INCREMENT]: DefaultAction,
  [DECREMENT]: DefaultAction,
  [RESET]: DefaultAction,
  [EDIT_SUBTITLE]: StringPayloadAction,
  [EDIT_TITLE]: StringPayloadAction,
})

// helper functions to decrease boilerplate when constructing actions
const createDefaultAction = action => Actions[action](action)
const createStringPayloadAction = action => payload => Actions[action](action)(payload)

// Action creators
export const init = () => dispatch(createDefaultAction(INIT))
export const increment = () => dispatch(createDefaultAction(INCREMENT))
export const decrement = () => dispatch(createDefaultAction(DECREMENT))
export const reset = () => dispatch(createDefaultAction(RESET))
export const editSubtitle =
  ({ target }) => dispatch(createStringPayloadAction(EDIT_SUBTITLE)(target.value))
export const editTitle =
  ({ target }) => dispatch(createStringPayloadAction(EDIT_TITLE)(target.value))

export default Actions
