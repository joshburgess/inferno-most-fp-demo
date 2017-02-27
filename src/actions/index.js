import Type from 'union-type'
import { dispatch } from '../'

// Record types
const DefaultActionRecord = { type: String }
const PayloadActionRecord = { type: String, payload: Object }

// Actions
const Actions = Type({
  '@@app/START_APP': DefaultActionRecord,
  INCREMENT: DefaultActionRecord,
  DECREMENT: DefaultActionRecord,
  RESET: DefaultActionRecord,
})

// Action creators for default actions
// Apply first argument (type) to type constructor to assign a type property
// for users familiar with Redux, creating reusable action creator functions
// with a type property already assigned
export const startApp = () => dispatch(Actions['@@app/START_APP']('@@app/START_APP'))
export const increment = () => dispatch(Actions.INCREMENT('INCREMENT'))
export const decrement = () => dispatch(Actions.DECREMENT('DECREMENT'))
export const reset = () => dispatch(Actions.RESET('RESET'))

export default Actions
