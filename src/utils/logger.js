import { observe, skipRepeatsWith } from 'most'
import { toJs } from 'mori'
import { LOG_TYPES, NOOP } from '../constants'
import { format } from 'date-fns'

// Logging
const logStates = (prevState, nextState) => {
  const prevStateJs = toJs(prevState)
  const nextStateJs = toJs(nextState)
  const { lastAction } = nextStateJs
  const { type } = lastAction

  /* eslint-disable fp/no-unused-expression */
  console.group(
    `%c${LOG_TYPES.action.label} @ ${format(Date.now())} ${type}`,
    `font-weight: bold;`,
    ''
  )
  console.log(
    `%c${LOG_TYPES.prevState.label}`,
    `color: ${LOG_TYPES.prevState.color}; font-weight: bold;`,
    prevStateJs
  )
  console.log(
    `%c${LOG_TYPES.action.label}`,
    `color: ${LOG_TYPES.action.color}; font-weight: bold;`,
    lastAction
  )
  console.log(
    `%c${LOG_TYPES.nextState.label}`,
    `color: ${LOG_TYPES.nextState.color}; font-weight: bold;`,
    nextStateJs
  )
  console.groupEnd()
  /* eslint-enable fp/no-unused-expression */

  // Return default equality test to preserve default skipRepeats functionality
  return prevState === nextState
}

const enableLogger = state$ => observe(NOOP, skipRepeatsWith(logStates, state$))

export default enableLogger
