// Use JSX
import Inferno from 'inferno'
import { COUNTER_BTN } from '../../styles'
import classNames from 'classnames'

const Button = ({ text, clickHandler, className = '' }) =>
  <div
    className={classNames(COUNTER_BTN, className)}
    onClick={clickHandler}
  >
    {text}
  </div>

export default Button
