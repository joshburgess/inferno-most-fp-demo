// Use JSX
import Inferno from 'inferno'
import { Button } from '../../components'

const resetStyle = {
  background: 'rgb(177, 136, 136)',
  margin: '40px 0',
}

const Counter = ({ title, subtitle, count }) =>
  <div>
    <Button text='Reset' id='reset-btn' style={resetStyle} />
    <Button text='-' id='increment-btn' />
    <h1>{count}</h1>
    <Button text='+' id='decrement-btn' />
  </div>

export default Counter
