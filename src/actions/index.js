import Type from 'union-type'
import { dispatch } from '../'
import {
  INIT,
  INCREMENT,
  DECREMENT,
  RESET,
  EDIT_TITLE,
  EDIT_TITLE_DEBOUNCED,
} from '../constants/actionTypes'

// Record types
const DefaultActionRecordType = { }
const PayloadActionRecordType = { payload: String }

// Actions
const Actions = Type({
  [INIT]: DefaultActionRecordType,
  [INCREMENT]: DefaultActionRecordType,
  [DECREMENT]: DefaultActionRecordType,
  [RESET]: DefaultActionRecordType,
  [EDIT_TITLE]: PayloadActionRecordType,
  [EDIT_TITLE_DEBOUNCED]: PayloadActionRecordType,
})

// Action creators
export const init = () => dispatch(Actions[INIT]())
export const increment = () => dispatch(Actions[INCREMENT]())
export const decrement = () => dispatch(Actions[DECREMENT]())
export const reset = () => dispatch(Actions[RESET]())
export const editTitle = ({ target }) =>
    dispatch(Actions[EDIT_TITLE](target.value))
export const editTitleDebounced = ({ payload }) =>
  dispatch(Actions[EDIT_TITLE_DEBOUNCED](payload))

export default Actions
