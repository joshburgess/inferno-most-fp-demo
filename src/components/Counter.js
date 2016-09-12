import Inferno from 'inferno'
import { H1, H2, Btn } from './'

const Counter = ({ title, subtitle, decrement, increment }, state) =>
  <div className='counter'>
    <H1 text={title} />
    <H2 text={subtitle} />
    <br /><br />
    <Btn text='-' clickHandler={decrement} />
    <H1 text={state} />
    <Btn text='+' clickHandler={increment} />
  </div>

export default Counter
