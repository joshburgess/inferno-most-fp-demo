import Type from 'union-type'
import { dispatch } from '../'
import * as actionTypes from '../constants/actionTypes'
// import { curry } from 'ramda'
// import { curry } from 'lodash/fp'

// Record types
const DefaultActionRecordType = { }
// const PayloadActionRecordType = { payload: Object }

// Actions
const Actions = Type({
  [actionTypes.INIT]: DefaultActionRecordType,
  [actionTypes.INCREMENT]: DefaultActionRecordType,
  [actionTypes.DECREMENT]: DefaultActionRecordType,
  [actionTypes.RESET]: DefaultActionRecordType,
})

// Action creators
export const init = () => dispatch(Actions[actionTypes.INIT]())
export const increment = () => dispatch(Actions[actionTypes.INCREMENT]())
export const decrement = () => dispatch(Actions[actionTypes.DECREMENT]())
export const reset = () => dispatch(Actions[actionTypes.RESET]())

export default Actions
