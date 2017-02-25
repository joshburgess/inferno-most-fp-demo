import Inferno from 'inferno'
import { Btn } from './'

const Counter = ({
  title,
  subtitle,
  decrement,
  increment,
  reset,
  alert,
}, state) =>
  <div className='counter'>
    <h1>{title}</h1>
    <h1>{subtitle}</h1>
    <br />
    <br />
    <Btn text='-' clickHandler={decrement} />
    <h1>{state}</h1>
    <Btn text='+' clickHandler={increment} />
    <br />
    <br />
    <Btn
      text='Reset'
      clickHandler={reset}
      style={{ background: 'rgb(177, 153, 136)' }}
    />
    <br />
    <br />
    <Btn
      text='Alert!'
      clickHandler={alert}
      style={{ background: 'rgb(177, 136, 136)' }}
    />
  </div>

export default Counter
