// Use JSX
import Inferno from 'inferno'

const Button = ({ id, style, text }) =>
  <div id={id} className='counter-btn' style={style}>
    {text}
  </div>

export default Button
