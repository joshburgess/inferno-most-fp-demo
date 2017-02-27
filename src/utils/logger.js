import { toJs } from 'mori'
import * as logTypes from '../constants/logTypes'
import { format } from 'date-fns'

// Logging
const enableLogging = (action, prevState, nextState) => {
  const prevStateJs = toJs(prevState)
  const nextStateJs = toJs(nextState)
  const { _name: type, payload } = action
  const timeFmt = 'HH:mm:ss.SSS'
  const bold = 'font-weight: bold;'

  // NOTE: Effectful code must always disable fp/no-unused-expression
  // This is fine. Use the linter to stay disciplined.

  /* eslint-disable fp/no-unused-expression */

  console.group(
    `%c${logTypes.ACTION_LABEL} @ ${format(Date.now(), timeFmt)} ${type}`,
    bold
  )
  console.log(
    `%c${logTypes.PREV_STATE_LABEL}`,
    `color: ${logTypes.PREV_STATE_COLOR}; ${bold}`,
    prevStateJs
  )
  console.log(
    `%c${logTypes.ACTION_LABEL}`,
    `color: ${logTypes.ACTION_COLOR}; ${bold}`,
    payload ? { type, payload } : { type }
  )
  console.log(
    `%c${logTypes.NEXT_STATE_LABEL}`,
    `color: ${logTypes.NEXT_STATE_COLOR}; ${bold}`,
    nextStateJs
  )
  console.groupEnd()

  /* eslint-enable fp/no-unused-expression */

  return nextState
}

export {
  enableLogging,
}
