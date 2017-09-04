// Use JSX
import Inferno from 'inferno'
import { COUNTER_BTN } from '../../styles'
import classNames from 'classnames'

const Button = ({ id, text, className = '' }) =>
  <div
    id={id}
    className={classNames(COUNTER_BTN, className)}
  >
    {text}
  </div>

export default Button
