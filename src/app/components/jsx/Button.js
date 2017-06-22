// Use JSX
import Inferno from 'inferno'
import { COUNTER_BTN } from '../../styles'

const Button = ({ text, clickHandler, style }) =>
  <div
    className={COUNTER_BTN}
    onClick={clickHandler}
    style={style}
  >
    {text}
  </div>

export default Button
