// Use JSX
import Inferno from 'inferno'
import { Button } from '../../components'
import { CENTERED, RESET_BTN } from '../../styles'

const Counter = ({ title, subtitle, count }) =>
  <div className={CENTERED}>
    <Button text='Reset' id='reset-btn' className={RESET_BTN} />
    <Button text='-' id='increment-btn' />
    <h1>{count}</h1>
    <Button text='+' id='decrement-btn' />
  </div>

export default Counter
