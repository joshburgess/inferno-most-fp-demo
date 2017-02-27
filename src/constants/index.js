export const STATE_KEY_COUNT = 'count'
export const STATE_KEY_SUBTITLE = 'subtitle'
export const STATE_KEY_TITLE = 'title'
export const STATE_KEY_LAST_ACTION = 'lastAction'

export const NOOP = f => f

export const LOG_TYPES = {
  action: {
    color: '#03A9F4',
    label: 'action',
  },
  prevState: {
    color: '#9E9E9E',
    label: 'prev state',
  },
  nextState: {
    color: '#4CAF50',
    label: 'next state',
  },
  error: {
    color: '#F20404',
    label: 'error',
  },
}
