// @flow
import Inferno from 'inferno'
import { Btn } from './'

const Counter = ({ title, subtitle, decrement, increment }, state) =>
  <div className='counter'>
    <h1>{title}</h1>
    <h1>{subtitle}</h1>
    <br /><br />
    <Btn text='-' clickHandler={decrement} />
    <h1>{state}</h1>
    <Btn text='+' clickHandler={increment} />
  </div>

export default Counter
