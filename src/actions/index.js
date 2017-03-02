import Type from 'union-type'
import { dispatch } from '../'
import { INIT, INCREMENT, DECREMENT, RESET } from '../constants/actionTypes'

// Record types
const DefaultActionRecordType = { }
// const PayloadActionRecordType = { payload: Object }

// Actions
const Actions = Type({
  [INIT]: DefaultActionRecordType,
  [INCREMENT]: DefaultActionRecordType,
  [DECREMENT]: DefaultActionRecordType,
  [RESET]: DefaultActionRecordType,
})

// Action creators
export const init = () => dispatch(Actions[INIT]())
export const increment = () => dispatch(Actions[INCREMENT]())
export const decrement = () => dispatch(Actions[DECREMENT]())
export const reset = () => dispatch(Actions[RESET]())

export default Actions
