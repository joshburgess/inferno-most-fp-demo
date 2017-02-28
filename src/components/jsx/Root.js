// Use JSX
import Inferno from 'inferno'
import {
  Counter,
  Header,
  // Textbox,
} from '../../components'
// import {  } from '../../actions'

const Root = ({ count, subtitle, title }) =>
  <div className={'counter-demo'}>
    <Header title={title} subtitle={subtitle} />
    <Counter count={count} />
    {/*
    <div>
      <Textbox label={'Edit title'} onKeyDown={x => alert(x)} />
      <Textbox label={'Edit subtitle'} onKeyDown={x => console.log(x)} />
    </div>
    */}
  </div>

export default Root
