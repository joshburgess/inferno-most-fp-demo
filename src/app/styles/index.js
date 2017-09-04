import { cssRule, style } from 'typestyle'

/* eslint-disable fp/no-nil */
/* eslint-disable better/explicit-return */

export const applyGlobalStyles = () => {
  /* eslint-disable fp/no-unused-expression */

  cssRule('html, body, #root', {
    height: '100%',
    width: '100%',
  })

  cssRule('body', {
    color: 'rgb(255, 255, 255)',
    padding: 0,
    margin: 0,
  })

  /* eslint-enable fp/no-unused-expression */
}

/* eslint-enable fp/no-nil */
/* eslint-enable better/explicit-return */

export const LABEL = style({
  padding: '5px 10px',
  margin: '20px 0 0 0',
  fontSize: '24px',
  display: 'block',
})

export const INPUT = style({
  padding: '5px',
  margin: '10px 0 0 0',
  borderRadius: '5px',
})

export const COUNTER_DEMO = style({
  height: '100%',
  width: '100%',
  background: 'rgb(136, 139, 177)',
  padding: '30px 0',
  textAlign: 'center',
  '-webkit-box-sizing': 'border-box',
  '-moz-box-sizing': 'border-box',
  boxSizing: 'border-box',
})

export const COUNTER_BTN = style({
  width: '100%',
  fontSize: '24px',
  lineHeight: 1,
  padding: '10px 0',
  color: 'rgb(255, 255, 255)',
  border: '2px solid transparent',
  background: 'rgb(136, 177, 162)',
  borderRadius: '5px',
  opacity: 1,
  cursor: 'pointer',
  margin: '15px 0',
  $nest: {
    '&:active': {
      border: '2px solid rgba(255, 255, 255, 1)',
    },
    '&:hover': {
      border: '2px solid rgba(255, 255, 255, 0.6)',
    },
  },
})

export const RESET_BTN = style({
  background: 'rgb(177, 136, 136)',
  margin: '40px 0',
})

export const CENTERED = style({
  margin: '0 auto',
  width: '50%',
})
