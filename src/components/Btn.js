import Inferno from 'inferno'

const Btn = ({
  text,
  clickHandler,
  style,
}) =>
  <div
    className='counter-btn'
    onClick={clickHandler}
    style={style}
  >
    {text}
  </div>

export default Btn
