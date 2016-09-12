import Inferno from 'inferno'

const Btn = ({ text, clickHandler }) =>
  <div className='counter-btn' onClick={clickHandler}>{text}</div>

export default Btn
