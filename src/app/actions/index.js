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
  [INCREMENT]: DefaultActionRecordType,
  [DECREMENT]: DefaultActionRecordType,
  [RESET]: DefaultActionRecordType,
  [EDIT_SUBTITLE]: PayloadActionRecordType,
  [EDIT_TITLE]: PayloadActionRecordType,
})

// Action creators
export const init = () => dispatch(Actions[INIT]())
export const increment = () => dispatch(Actions[INCREMENT]())
export const decrement = () => dispatch(Actions[DECREMENT]())
export const reset = () => dispatch(Actions[RESET]())
export const editSubtitle = ({ target }) =>
    dispatch(Actions[EDIT_SUBTITLE](target.value))
export const editTitle = ({ target }) =>
  dispatch(Actions[EDIT_TITLE](target.value))

export default Actions
