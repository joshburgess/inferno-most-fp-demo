// Use JSX
import Inferno from 'inferno'
import { Counter, Header, Textbox } from '../../components'

const View = ({ count, subtitle, title }) => {
  <div className={'counter-demo'}>
    <Header title={title} subtitle={subtitle} />
    <Counter count={count} />
    <Textbox
      id={'edit-subtitle'}
      label={'Edit subtitle'}
      placeholder={subtitle || 'Enter new subtitle here'}
    />
  </div>
}

export default View
