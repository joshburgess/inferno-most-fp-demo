import {
  ACTION_LABEL,
  ACTION_COLOR,
  NEXT_STATE_LABEL,
  NEXT_STATE_COLOR,
  PREV_STATE_LABEL,
  PREV_STATE_COLOR,
} from '../constants/logTypes'
import { format } from 'date-fns'

// Logging
const enableLogging = (prevState, action, nextState) => {
  const { _name: type, payload } = action
  const timeFmt = 'HH:mm:ss.SSS'
  const timestamp = format(Date.now(), timeFmt)
  const bold = 'font-weight: bold;'

  // NOTE: Effectful code must always disable fp/no-unused-expression
  // This is fine. Use the linter to stay disciplined.

  /* eslint-disable fp/no-unused-expression */

  console.group(
    `%c${ACTION_LABEL} @ ${timestamp} ${type}`,
    bold
  )

  console.log(
    `%c${PREV_STATE_LABEL}`,
    `color: ${PREV_STATE_COLOR}; ${bold}`,
    prevState
  )

  console.log(
    `%c${ACTION_LABEL}`,
    `color: ${ACTION_COLOR}; ${bold}`,
    payload ? { type, payload } : { type }
  )

  console.log(
    `%c${NEXT_STATE_LABEL}`,
    `color: ${NEXT_STATE_COLOR}; ${bold}`,
    nextState
  )

  console.groupEnd()

  /* eslint-enable fp/no-unused-expression */

  return nextState
}

export {
  enableLogging,
}
